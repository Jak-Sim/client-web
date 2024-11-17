'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginCheck() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/sign-in');
    } else {
      router.push('/challenge');
    }
  }, [session, router]);

  return null;
}
