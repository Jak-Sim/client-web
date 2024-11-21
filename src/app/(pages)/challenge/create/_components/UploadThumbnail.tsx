import { useState } from 'react';
import Image from 'next/image';
import { Camera } from '@/assets/images/icons';

export default function UploadThumbnail() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setThumbnail(event.target.files[0]);
    }
  };

  return (
    <div className='mb-2 flex justify-center'>
      <input type='file' onChange={handleFileChange} className='hidden' id='thumbnail' accept='image/*' />
      <label
        htmlFor='thumbnail'
        className='relative h-[150px] w-full max-w-[200px] cursor-pointer overflow-hidden rounded-3xl bg-v1-grey-700'
      >
        {thumbnail && (
          <Image src={URL.createObjectURL(thumbnail)} alt='Thumbnail' fill style={{ objectFit: 'cover' }} />
        )}
        <Camera className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2' />
      </label>
    </div>
  );
}
