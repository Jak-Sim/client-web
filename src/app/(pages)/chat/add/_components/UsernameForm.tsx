'use client';

import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Search } from '@/assets/images/icons';
import InputWithError from '@/components/input/InputWithErrorMsg';

interface UsernameFormProps {
  formData: UseFormReturn<{ username: string }, any, undefined>;
}

const UsernameForm = ({ formData }: UsernameFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formData;

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'relative'}>
        <Search className='absolute left-6 top-3' />
        <InputWithError
          {...register('username', {
            required: '유저 이름은 필수 입력요소 입니다.',
          })}
          placeholder='유저 이름을 검색해주세요.'
          hasError={!!errors.username}
          errorMessage={errors.username?.message || ''}
          autoComplete='off'
          style={{ paddingLeft: '3.5rem' }}
          maxLength={12}
        />
      </div>
    </form>
  );
};

export default UsernameForm;
