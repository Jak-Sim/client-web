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
          className={`w-full h-[3.125rem] mb-1 px-4 bg-transparent border rounded-[3.125rem] font-semibold outline-none ${style}`}
          {...props}
        />
        {isError && <p className='text-error-dark text-right text-[12px]'>{errorMessage}</p>}
        {isValid && <p className='text-submit-dark text-right text-[12px]'>{validMessage}</p>}
      </>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
