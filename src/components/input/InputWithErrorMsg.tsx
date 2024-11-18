import { forwardRef, LegacyRef } from "react";
import { Input } from "../ui/input";

type InputWithErrorProps = {
  errorMessage?: string;
  hasError: boolean;
} & React.ComponentProps<"input">;

const InputWithError = forwardRef(function InputWithError({
  errorMessage,
  hasError,
  ...props
}: InputWithErrorProps, ref) {
  const errorStyle = hasError ? "text-red-500 border-v1-red-700" : "";

  return (
    <div className="flex flex-col gap-2">
      <Input {...props} className={errorStyle} ref={ref as LegacyRef<HTMLInputElement>} />
      <div className="h-8">
        {hasError && <p className="text-v1-red-700 text-sm text-right">{errorMessage}</p>}
      </div>
    </div>
  );
})
InputWithError.displayName = "InputWithError";

export default InputWithError;