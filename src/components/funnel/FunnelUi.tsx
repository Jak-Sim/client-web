import { cn } from '@/lib/shadcn/utils';

function FunnelUi({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('pb-24', className)}>{children}</div>;
}

function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('mb-12 mt-10 text-2xl font-medium leading-9', className)}>{children}</h2>;
}

function FieldWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mb-8 flex flex-col gap-2 font-medium text-v1-text-primary-400', className)}>{children}</div>
  );
}

function ButtonWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('fixed bottom-20 left-1/2 flex w-full max-w-[400px] -translate-x-1/2 gap-2 px-6', className)}>
      {children}
    </div>
  );
}

function TextRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div>{children}</div>;
}

function Label({ children, htmlFor, className }: { children: React.ReactNode; htmlFor: string; className?: string }) {
  return (
    <label className={cn('text-sm font-medium text-v1-text-primary-400', className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function GrayText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('my-0.5 text-sm font-normal text-v1-text-primary-300', className)}>{children}</p>;
}

FunnelUi.Title = Title;
FunnelUi.FieldWrapper = FieldWrapper;
FunnelUi.ButtonWrapper = ButtonWrapper;
FunnelUi.GrayText = GrayText;
FunnelUi.Label = Label;
FunnelUi.TextRow = TextRow;
export default FunnelUi;
