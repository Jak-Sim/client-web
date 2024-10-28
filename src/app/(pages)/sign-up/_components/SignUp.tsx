'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { useUserStore } from '@/store/userStore';
import { type UserData } from '@/types/user';
import TextField from './TextField';
import SignUpAgree from './SignUpAgree';
import { api } from '@/lib/axios/axios';

export default function SignUp() {
  const router = useRouter();
  const { userData, setUserData } = useUserStore();
  const { data: session } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<UserData>({
    defaultValues: userData ?? { nickname: session?.user?.name ?? '' },
  });

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const isValidating = useRef(true);
  const username = watch('nickname');

  const onSubmit = async (data: UserData) => {
    if (!userData) return;
    const user = { ...userData, nickname: data.nickname, social: data.social };

    const response = (await api.post('/sign-up', { ...user, social: user.social.toUpperCase() })) as {
      data: { data: UserData };
    };
    const { AT, RT } = response.data.data;
    setUserData({ ...user, AT, RT });
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
        // await api.post('/sign-up/nick-check', { nickname: username });
        return true;
      } catch (error) {
        if (error instanceof Error) {
          setError('nickname', {
            type: 'manual',
            message: error.message ?? '중복된 닉네임이에요. 다른 닉네임은 어떠신가요?',
          });
        }
        return false;
      }
    },
    [username, setError],
  );

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
