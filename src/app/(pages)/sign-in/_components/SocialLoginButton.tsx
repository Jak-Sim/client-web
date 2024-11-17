import { ComponentType, SVGProps } from 'react';

export default function SocialLoginButton({
  icon: Icon,
  onClick,
  className,
  buttonText,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
  className?: string;
  buttonText?: string;
}) {
  return (
    <button
      className={`flex h-[3.5rem] w-full items-center justify-center overflow-hidden rounded-xl ${className}`}
      onClick={onClick}
    >
      <div className='flex h-[3rem] w-[3rem] items-center justify-center overflow-hidden rounded-full'>
        <div>
          <Icon />
        </div>
      </div>
      <span className='mt-[1px] w-[6rem] text-left font-semibold'>{buttonText}</span>
    </button>
  );
}
