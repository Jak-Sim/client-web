import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from '@/assets/images/icons';

function UploadThumbnail({ backgroundImage }: { backgroundImage: string | null }) {
  const [thumbnailInput, setThumbnailInput] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setThumbnailInput(event.target.files[0]);
    }
  };

  return (
    <div className='mb-2 flex justify-center'>
      <input type='file' onChange={handleFileChange} className='hidden' id='thumbnail' accept='image/*' />
      <label
        htmlFor='thumbnail'
        className='relative h-[150px] w-full max-w-[200px] cursor-pointer overflow-hidden rounded-3xl bg-v1-grey-700'
      >
        {thumbnailInput ? (
          <Image src={URL.createObjectURL(thumbnailInput)} alt='Thumbnail' fill style={{ objectFit: 'cover' }} />
        ) : backgroundImage ? (
          <Image src={backgroundImage} alt='Thumbnail' fill style={{ objectFit: 'cover' }} />
        ) : null}
        <Camera className='absolute left-1/2 top-1/2 z-1 -translate-x-1/2 -translate-y-1/2' />
      </label>
    </div>
  );
}

export default React.memo(UploadThumbnail);
