import { ReactNode } from 'react';
import { ModalProvider } from '@/app/(pages)/_components/ModalProvider';
import SessionProvider from './_components/SessionProvider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
}
