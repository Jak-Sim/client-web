import { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
});

const nimbusSans = localFont({
  src: '../assets/fonts/NimbusSansBeckerPBla.woff2',
  variable: '--font-nimbus-sans',
  weight: 'normal',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={` ${pretendard.className} ${nimbusSans.variable} antialiased`}>
        <div className={'m-auto flex h-screen max-w-[400px] flex-col'}>{children}</div>
        <div id={'modal-root'}></div>
      </body>
    </html>
  );
}
