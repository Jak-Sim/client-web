import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  isValid: boolean;
  errorMessage?: string;
  validMessage?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, onChange, isError, isValid, errorMessage, validMessage, ...props }, ref) => {
    const style = isError ? 'tw-outline-error-dark' : isValid ? 'tw-outline-submit-dark' : 'tw-outline-primary';

    return (
      <>
        <input
          type='text'
          value={value}
          onChange={onChange}
          ref={ref}
          className={`mb-1 h-[3.125rem] w-full rounded-[3.125rem] border bg-transparent px-4 font-semibold outline-none ${style}`}
          {...props}
        />
        {isError && <p className='text-right text-[12px] text-error-dark'>{errorMessage}</p>}
        {isValid && <p className='text-right text-[12px] text-submit-dark'>{validMessage}</p>}
      </>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
