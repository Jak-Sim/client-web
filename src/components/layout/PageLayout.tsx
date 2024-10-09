import { PropsWithChildren, ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import Header, { HeaderProps } from '@/components/layout/Header';

interface PageLayoutProps {
  className?: string;
  header: HeaderProps;
  footer?: ReactNode;
}

const PageLayout = ({ header, footer, children, className }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <>
      <Header {...header} />
      <main className={`flex-1 overflow-auto ${className || ''}`}>{children}</main>
      {footer ? footer : <Footer />}
    </>
  );
};

export default PageLayout;
