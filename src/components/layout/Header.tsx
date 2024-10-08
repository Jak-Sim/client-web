import { ReactNode } from 'react';

export interface HeaderProps {
  left?: ReactNode;
  title: string;
  right?: ReactNode;
}

const Header = ({ title, left, right }: HeaderProps) => {
  return (
    <div className={'relative p-[10px] h-[44px] flex justify-between items-center border-b border-[#e2e2e2]'}>
      <div className={'flex justify-center items-center'}>{left}</div>
      <h1 className='absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-center'>{title}</h1>
      <div className={'flex justify-center items-center'}>{right}</div>
    </div>
  );
};

export default Header;
