import { PropsWithChildren, ReactNode } from 'react';
import Footer from '@/components/layout/Footer';

interface PageLayoutProps {
  className?: string;
  header: ReactNode;
  footer?: ReactNode;
}

const PageLayout = ({ header, footer, children, className }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <>
      {header}
      <main className={`flex-1 overflow-auto bg-[#F2E7E2] ${className || ''}`}>{children}</main>
      {footer ? footer : <Footer />}
    </>
  );
};

export default PageLayout;
