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
    const style = isError ? 'border-error-dark' : isValid ? 'border-submit-dark' : 'border-v1-grey-400';

    return (
      <>
        <input
          type='text'
          value={value}
          onChange={onChange}
          ref={ref}
          className={`mb-3 h-[3.125rem] w-full border-b-[2px] bg-transparent py-4 text-[2rem] font-semibold outline-none ${style}`}
          {...props}
        />
        {isError && <p className='text-sm text-error-dark'>{errorMessage}</p>}
        {isValid && <p className='text-sm text-submit-dark'>{validMessage}</p>}
      </>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
