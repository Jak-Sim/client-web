'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { Search } from '@/assets/images/icons';
import Button from '@/components/button/Button';
import InputWithError from '@/components/input/InputWithErrorMsg';
import ChallengeCard from '../../_components/ChallengeCard';
import { Challenge, DummyChallenge } from '../../_components/ChallengeList';


export default function CodeForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const codeLength = 6;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({ defaultValues: { code: '' } });

  const onSubmit = (data: FieldValues) => {
    if (!data.code) return;
    const response = true;

    if (response) {
      router.push(`/challenge/code/success?challengeId=${challenge?.challengeId}`);
    } else {
      setError('code', { message: '챌린지에 참여할 수 없어요' });
    }
  };
  const code = watch('code');

  useEffect(() => {
    const checkCode = async () => {
      if (!code) return;

      try {
        console.log(code);
        if (code === '123456') {
          setChallenge(DummyChallenge);
        } else {
          setChallenge(null);
          setError('code', { message: '해당 코드로는 챌린지가 확인되지 않아요' });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError('code', { message: error.message });
        } else {
          setError('code', { message: '해당 코드로는 챌린지가 확인되지 않아요' });
        }
      }
    };

    if (code.length === codeLength) {
      checkCode();
    } else {
      clearErrors();
      setChallenge(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-full flex-col justify-between p-4'>
      <InputWithError
        {...register('code', {
          required: '코드를 입력해주세요',
          pattern: { value: /^[A-Z0-9]+$/, message: '대문자와 숫자만 입력해 주세요' },
        })}
        placeholder='대문자와 숫자만 입력해 주세요'
        hasError={!!errors.code}
        errorMessage={errors.code?.message || ''}
        autoComplete='off'
      />
      <div className='flex-1'>{challenge && <ChallengeCard challenge={challenge} />}</div>
      <Button type='submit' disabled={!challenge}>
        {challenge ? '챌린지 참여하기' : '해당 코드를 확인해 주세요'}
      </Button>
    </form>
  );
}