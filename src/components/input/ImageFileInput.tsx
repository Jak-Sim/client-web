import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { PlusNormal } from '@/assets/images/icons';
import { cn } from '@/lib/shadcn/utils';

type ImageInputProps = {
  className?: string;
  children?: React.ReactNode;
  value: FileList | null;
  setValue: Dispatch<SetStateAction<FileList | null>>;
  maxLength: number;
};

export default function ImageFileInput({ className, setValue, maxLength }: ImageInputProps) {
  const [currentFiles, setCurrentFiles] = useState<FileList | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const curr = e.target.files;
    if (!curr) return;

    const filesArray = Array.from(curr);
    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => dataTransfer.items.add(file));

    setCurrentFiles(dataTransfer.files);
    setValue(dataTransfer.files);
  };

  const removeImage = (file: File) => {
    const newFiles = Array.from(currentFiles || []).filter((f) => f !== file);
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));

    setCurrentFiles(dataTransfer.files);
    setValue(dataTransfer.files);
  };

  return (
    <div className='flex flex-wrap gap-2'>
      {(!currentFiles || (currentFiles?.length !== undefined && currentFiles.length < maxLength)) && (
        <label
          htmlFor='image'
          className={cn(
            'flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-v1-text-primary-50 text-v1-text-primary-300',
            className,
          )}
        >
          <PlusNormal />
          <input
            type='file'
            id='image'
            accept='image/*'
            className='hidden'
            onChange={handleImageChange}
            multiple
            maxLength={maxLength - (currentFiles?.length || 0)}
          />
        </label>
      )}
      {Array.from(currentFiles || []).map((file) => (
        <img
          key={file.name}
          src={URL.createObjectURL(file)}
          alt='Preview'
          className={cn(
            'h-20 w-20 shrink-0 cursor-pointer rounded-2xl object-cover',
            currentFiles?.length !== undefined && currentFiles.length > maxLength
              ? 'border-2 border-v1-red-500 hover:border-v1-red-600'
              : '',
            className,
          )}
          onClick={() => removeImage(file)}
        />
      ))}
    </div>
  );
}
