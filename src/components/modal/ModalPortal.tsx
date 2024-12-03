import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !modalRoot) return null;
  return createPortal(children, modalRoot);
};

export default Portal;
