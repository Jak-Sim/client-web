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
      className={`w-full h-[3.5rem] rounded-xl overflow-hidden flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <div className='rounded-full overflow-hidden w-[3rem] h-[3rem] flex items-center justify-center'>
        <div>
          <Icon />
        </div>
      </div>
      <span className='w-[6rem] text-left font-semibold mt-[1px]'>{buttonText}</span>
    </button>
  );
}
