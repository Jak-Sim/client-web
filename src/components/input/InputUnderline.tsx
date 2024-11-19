import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  validMessage?: string;
  hasMaxLength?: boolean;
}

const InputUnderline = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, onChange, hasMaxLength = false, isError = false, isValid = false, errorMessage, validMessage, className, ...props }, ref) => {
    const style = isError ? 'border-error-dark' : isValid ? 'border-submit-dark' : 'border-v1-grey-400';

    return (
      <>
        <div className={`w-full mb-3 flex items-end gap-2 border-b-[2px] pb-2 ${style} ${className}`}>
          <input
            type='text'
            value={value}
            onChange={onChange}
            ref={ref}
            className={`w-full bg-transparent outline-none text-2xl`}
            {...props}
          />
          {hasMaxLength && props.maxLength && <div className='mb-0 text-sm text-v1-text-primary-200'>{value.length}/{props.maxLength}</div>}
        </div>
        {isError && <p className='text-sm text-error-dark'>{errorMessage}</p>}
        {isValid && <p className='text-sm text-submit-dark'>{validMessage}</p>}
      </>
    );
  },
);

InputUnderline.displayName = 'TextField';

export default InputUnderline;
