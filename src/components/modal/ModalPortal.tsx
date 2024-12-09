import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};

export default Portal;
