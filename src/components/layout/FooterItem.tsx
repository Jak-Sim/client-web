'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface FooterItemProps {
  text: string;
  name: string;
  activeIcon: string;
  inActiveIcon: string;
}

const FooterItem = ({ text, name, activeIcon, inActiveIcon }: FooterItemProps) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(`/${name}`)!;

  return (
    <li className='flex-1'>
      <Link href={`/${name}`} className='flex flex-col justify-center items-center'>
        <Image src={isActive ? activeIcon : inActiveIcon} alt={name} />
        <button className={'min-w-[28px] h-[22px] text-[10px] font-semibold'}>{text}</button>
      </Link>
    </li>
  );
};

export default FooterItem;
