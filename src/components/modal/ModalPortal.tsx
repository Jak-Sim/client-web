import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const modalRoot = document.getElementById('modal-root')!;
  console.assert(modalRoot, 'modal-root not found');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return createPortal(children, modalRoot);
};

export default Portal;
