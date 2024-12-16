'use client';

import { Plus } from '@/assets/images/icons';

const colors = {
  blue: '#5479F8',
  orange: '#FF7338FF',
};

export default function AddItemButton({ color, onClick }: { color: 'blue' | 'orange'; onClick: () => void }) {
  const currentColor = colors[color];

  return (
    <button
      className='relative flex h-[80px] items-center justify-center rounded-xl'
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100%25" height="100%25" fill="none" rx="20" ry="20" stroke="%23FF7338FF" stroke-width="3" stroke-dasharray="6%2c 14" stroke-dashoffset="0" stroke-linecap="square"/%3e%3c/svg%3e")',
      }}
      onClick={onClick}
      type='button'
    >
      <Plus className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`} style={{ color: currentColor }} />
      <svg width='100%' height='80' xmlns='http://www.w3.org/2000/svg'>
        <rect
          width='100%'
          height='100%'
          fill='none'
          stroke={currentColor}
          strokeWidth='3'
          strokeDasharray='6, 12'
          strokeDashoffset='0'
          strokeLinecap='square'
        />
      </svg>
    </button>
  );
}
