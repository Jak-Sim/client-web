import { Refresh } from '@/assets/images/icons';
import Button from '@/components/button/Button';

export default function DrawButtonBox({
  handleReset,
  setOpen,
  isSelected,
  buttonText,
}: {
  handleReset: () => void;
  setOpen: (open: boolean) => void;
  isSelected: boolean;
  buttonText: {
    selected: string;
    unselected: string;
  };
}) {
  return (
    <div className='flex justify-between px-4'>
      {isSelected && (
        <button onClick={handleReset} className='w-10'>
          <Refresh />
        </button>
      )}
      <Button variant='secondary' size='md' disabled={!isSelected} onClick={() => setOpen(false)}>
        {isSelected ? buttonText.selected : buttonText.unselected}
      </Button>
    </div>
  );
}
