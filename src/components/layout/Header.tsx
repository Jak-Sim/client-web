import { ReactNode } from 'react';

export interface HeaderProps {
  left?: ReactNode;
  title: string;
  right?: ReactNode;
}

const Header = ({ title, left, right }: HeaderProps) => {
  return (
    <div
      className={
        'relative flex h-[44px] items-center justify-between border-b border-[#e2e2e2] p-[10px] font-bold shadow-black'
      }
    >
      <div className={'flex items-center justify-center'}>{left}</div>
      <h1 className='absolute left-1/2 -translate-x-1/2 transform text-center text-lg font-semibold'>{title}</h1>
      <div className={'flex items-center justify-center'}>{right}</div>
    </div>
  );
};

export default Header;
