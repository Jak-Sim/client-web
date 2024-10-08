'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from './TextField';
import SignUpAgree from './SignUpAgree';

type SignUpFormData = {
  username: string;
};

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      username: '',
    },
  });

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const username = watch('username');

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  const handleAgreeChange = () => setIsAgree(!isAgree);

  const checkUsername = useCallback(
    (username: string) => {
      if (username.length > 12) return '닉네임은 2자 이상 12자 이하여야 합니다.';
      if (username.length > 1) return true;
      return false;
    },
    [username],
  );

  const checkUsernameUnique = useCallback(
    async (username: string) => {
      try {
        // TODO: 닉네임 중복 검사
        const isUnique = username !== 'test';
        if (isUnique) {
          return true;
        } else {
          throw new Error('중복된 닉네임이에요. 다른 닉네임은 어떠신가요?');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError('username', {
            type: 'manual',
            message: error.message,
          });
        }
      }
    },
    [setError],
  );

  useEffect(() => {
    const validateUsername = async () => {
      const validationResult = checkUsername(username);

      if (typeof validationResult === 'string') {
        setError('username', {
          type: 'manual',
          message: validationResult,
        });
        setIsUsernameValid(false);
        return;
      }

      clearErrors('username');

      const isUnique = await checkUsernameUnique(username);
      if (validationResult && isUnique === true) {
        setIsUsernameValid(true);
      } else {
        setIsUsernameValid(false);
      }
    };

    validateUsername();
  }, [username, checkUsername, setError, clearErrors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='h-full py-20 px-4 flex flex-col gap-4'>
        <div className='flex-1'>
          <label htmlFor='username' className='block font-bold text-[1.25rem] mb-4'>
            <strong className='text-primary'>닉네임</strong>
            <span className='text-white'>을 입력해주세요.</span>
          </label>

          <Controller
            name='username'
            control={control}
            rules={{
              validate: checkUsername,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                isError={!!errors.username}
                isValid={isUsernameValid}
                errorMessage={errors.username?.message}
                validMessage='좋은 닉네임이네요!'
                autoFocus={true}
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
        </div>
      </form>
    </>
  );
}
