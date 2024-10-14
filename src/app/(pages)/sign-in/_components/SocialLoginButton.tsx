import { ComponentType, SVGProps } from 'react';

export default function SocialLoginButton({
  icon: Icon,
  onClick,
  className,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button className={`w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden ${className}`} onClick={onClick}>
      <Icon />
    </button>
  );
}
