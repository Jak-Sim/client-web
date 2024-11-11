'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CustomSession, JaksimOAuthProviderType } from '@/app/api/auth/[...nextauth]/route';
import { signOut, useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { api } from '@/lib/axios/axios';
import TextField from './TextField';
import SignUpAgree from './SignUpAgree';

export interface UserSignUpDto {
  AT: string | null;
  RT: string | null;
  userUniqueId: string;
  nickname: string;
  social: JaksimOAuthProviderType;
}

export default function SignUp() {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionWithAccount = session as CustomSession;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    watch,
  } = useForm<UserSignUpDto>({
    defaultValues: { nickname: sessionWithAccount?.user?.name ?? '' },
  });

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const isValidating = useRef(true);
  const username = watch('nickname');

  const onSubmit = async (data: UserSignUpDto) => {
    if (!sessionWithAccount) return;

    const user = {
      AT: sessionWithAccount.auth.AT,
      RT: sessionWithAccount.auth.RT,
      nickname: data.nickname,
      social: sessionWithAccount.account.provider.toUpperCase(),
      userUniqueId: sessionWithAccount.account.providerAccountId,
    };
    const response = (await api.post('/sign-up', user)) as {
      data: { data: UserSignUpDto };
    };
    const { AT, RT } = response.data.data;
    setCookie('AT', AT);
    setCookie('RT', RT);
    router.push('/');
  };

  const handleAgreeChange = () => setIsAgree(!isAgree);

  const checkUsername = useCallback((username: string) => {
    if (username?.length > 12) return '닉네임은 2자 이상 12자 이하여야 합니다.';
    if (username?.length > 1) return true;
    return false;
  }, []);

  const checkUsernameUnique = useCallback(
    async (username: string) => {
      if (username?.length < 2) return;

      try {
        await api.post('/sign-up/nick-check', { nickname: username });
        return true;
      } catch (error) {
        if (error instanceof Error) {
          // TODO: 중복된 닉네임 오류 특정하기, statusCode 확인
          setError('nickname', {
            type: 'manual',
            message: error.message ?? '중복된 닉네임이에요. 다른 닉네임은 어떠신가요?',
          });
        }
        return false;
      }
    },
    [setError],
  );

  useEffect(() => {
    if (sessionWithAccount) {
      setValue('nickname', sessionWithAccount.user.name ?? '');
    }
  }, [sessionWithAccount, setValue]);

  useEffect(() => {
    const validateUsername = async () => {
      const validationResult = checkUsername(username);

      if (typeof validationResult === 'string') {
        setError('nickname', {
          type: 'manual',
          message: validationResult,
        });
        setIsUsernameValid(false);
        return;
      }

      clearErrors('nickname');

      const isUnique = await checkUsernameUnique(username);
      if (validationResult && isUnique === true) {
        setIsUsernameValid(true);
      } else {
        setIsUsernameValid(false);
      }
    };

    const handler = setTimeout(() => {
      isValidating.current = true;
      validateUsername();
    }, 300);

    return () => {
      clearTimeout(handler);
      isValidating.current = false;
    };
  }, [checkUsername, setError, clearErrors, checkUsernameUnique, username]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='h-full py-20 px-4 flex flex-col gap-4'>
        <div className='flex-1'>
          <label htmlFor='nickname' className='block font-bold text-[1.25rem] mb-4'>
            <strong className='text-primary'>닉네임</strong>
            <span className='text-white'>을 입력해주세요.</span>
          </label>

          <Controller
            name='nickname'
            control={control}
            rules={{
              validate: checkUsername,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                isError={!!errors.nickname}
                isValid={isUsernameValid}
                errorMessage={errors.nickname?.message}
                validMessage='좋은 닉네임이네요!'
                autoFocus={true}
                autoComplete='off'
                maxLength={12}
              />
            )}
          />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <SignUpAgree isAgree={isAgree} handleAgreeChange={handleAgreeChange} enable={isUsernameValid} />

          <button
            type='submit'
            className='button button-primary w-[13rem] h-[3.5rem] rounded-[3.125rem] font-bold'
            disabled={!isUsernameValid || !isAgree}
          >
            가입하기
          </button>

          <TempLogOutButton />
        </div>
      </form>
    </>
  );
}

function TempLogOutButton() {
  const { data: session } = useSession();

  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
        className='absolute bottom-0 right-1/2 translate-x-1/2 py-6 text-sm text-red-500 underline'
      >
        {session ? '테스트용 세션 로그아웃' : ''}
      </button>
    </div>
  );
}
