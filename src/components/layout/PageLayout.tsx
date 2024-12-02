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
      <main className={`relative flex-1 overflow-auto bg-v1-background ${className || ''}`}>{children}</main>
      {footer ? footer : <Footer />}
    </>
  );
};

export default PageLayout;
