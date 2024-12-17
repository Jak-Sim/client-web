'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LoginCheck() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/auth/sign-in');
    } else {
      router.push('/challenge');
    }
  }, [session, router]);

  return null;
}