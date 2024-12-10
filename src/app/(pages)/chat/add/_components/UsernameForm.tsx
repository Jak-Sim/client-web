'use client';

import { UseFormReturn } from 'react-hook-form';
import { Username } from '@/app/(pages)/chat/add/_components/ChatAddPage';
import { Search } from '@/assets/images/icons';
import InputWithError from '@/components/input/InputWithErrorMsg';

interface UsernameFormProps {
  formData: UseFormReturn<Username, any, undefined>;
}

const UsernameForm = ({ formData }: UsernameFormProps) => {
  const {
    register,
    formState: { errors },
  } = formData;

  return (
    <>
      <div className={'relative'}>
        <Search className='absolute left-6 top-3' />
        <InputWithError
          {...register('username', {
            required: true,
          })}
          placeholder='유저 닉네임을 검색해주세요.'
          hasError={!!errors.username}
          errorMessage={errors.username?.message || ''}
          autoComplete='off'
          style={{ paddingLeft: '3.5rem' }}
          maxLength={12}
        />
      </div>
    </>
  );
};

export default UsernameForm;
