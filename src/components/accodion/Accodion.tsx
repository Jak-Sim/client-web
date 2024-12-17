import { createContext, ReactNode, useContext, useState } from 'react';
import { ChevronDown } from '@/assets/images/icons';
import { cn } from '@/lib/shadcn/utils';

interface AccodionProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

interface AccodionContextProps extends Omit<AccodionProps, 'children'> {
  isOpen: boolean;
  toggleAccodion: () => void;
}

const AccodionContext = createContext<AccodionContextProps | undefined>(undefined);

function Accodion({ children, defaultOpen = false }: AccodionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccodion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccodionContext.Provider value={{ isOpen, toggleAccodion }}>
      <Item>{children}</Item>
    </AccodionContext.Provider>
  );
}

function Trigger({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen, toggleAccodion } = useContext(AccodionContext)!;

  return (
    <div className={cn('flex items-center justify-between cursor-pointer', className)} onClick={toggleAccodion}>
      {children}
      <ChevronDown
        className={cn(`${isOpen ? 'rotate-180' : ''} transition-transform duration-300`, 'h-6 w-6')}
        role='button'
      />
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(AccodionContext)!;

  return (
    <div className={cn({ 'overflow-visible': isOpen, 'h-0 overflow-hidden': !isOpen }, 'transition-all duration-300')}>
      {children}
    </div>
  );
}

function Item({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}

Accodion.Trigger = Trigger;
Accodion.Content = Content;
Accodion.Item = Item;
export default Accodion;
