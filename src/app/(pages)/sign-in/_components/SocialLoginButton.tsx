import Image from 'next/image';

export default function SocialLoginButton({
  iconSrc,
  alt,
  onClick,
  className,
}: {
  iconSrc: string;
  alt: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button className={`w-[3.5rem] h-[3.5rem] rounded-full bg-[#fee502] ${className}`} onClick={onClick}>
      <Image src={iconSrc} width={55} height={55} alt={alt} />
    </button>
  );
}
