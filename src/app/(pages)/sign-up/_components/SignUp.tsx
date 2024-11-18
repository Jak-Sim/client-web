'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { Controller, useForm } from 'react-hook-form';
import { CustomSession, JaksimOAuthProviderType } from '@/app/api/auth/[...nextauth]/route';
import Button from '@/components/button/Button';
import { api } from '@/lib/axios/axios';
import SignUpAgree from './SignUpAgree';
import TextField from './v1/TextField';

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
      <form onSubmit={handleSubmit(onSubmit)} className='flex h-full flex-col gap-4 px-6 py-20'>
        <div className='flex-1'>
          <p className='mb-20 block text-2xl leading-9'>
            <span>활동할 멋진</span>
            <br />
            <strong className='font-bold'>닉네임</strong>
            <span>을 정해보세요!</span>
          </p>

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
                placeholder='...닉네임'
              />
            )}
          />
        </div>

        <div className='flex flex-col items-center justify-center'>
          <SignUpAgree isAgree={isAgree} handleAgreeChange={handleAgreeChange} enable={isUsernameValid} />

          <Button disabled={!isUsernameValid || !isAgree} type='submit'>
            {!isUsernameValid || !isAgree ? '입력을 완료해 주세요' : '시작하기'}
          </Button>
        </div>
      </form>
    </>
  );
}
