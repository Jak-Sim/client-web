import { PropsWithChildren } from 'react';
import Footer from '@/components/layout/Footer';
import Header, { HeaderProps } from '@/components/layout/Header';

interface PageLayoutProps {
  className?: string;
  header: HeaderProps;
}

const PageLayout = ({ children, className, header }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <>
      <Header {...header} />
      <main className={'flex-1 overflow-auto ' + className}>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
