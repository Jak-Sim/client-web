import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const MAX_HASHTAG_LENGTH = 50;

export default function HashTags({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const [hashtags, setHashtags] = useState<Set<string>>(new Set(value));

  const {
    register,
    setValue,
    watch,
    getValues,
    formState: { dirtyFields },
  } = useForm({ defaultValues: { hashtagInput: '', rules: { hashtagInput: { maxLength: MAX_HASHTAG_LENGTH } } } });

  const handleAddHashtag = (hashtag: string) => {
    if (hashtag.trim()) {
      setHashtags(new Set(hashtags.add('#' + hashtag)));
      onChange(Array.from(hashtags));
    }
  };

  const handleRemoveHashtag = (hashtag: string) => {
    hashtags.delete(hashtag);
    setHashtags(new Set(hashtags));
    onChange(Array.from(hashtags));
  };

  const hashtagTextLength = Array.from(hashtags).join('').length;
  const hashtagInputLength = watch('hashtagInput').length;
  const hashtagCount = hashtagTextLength + hashtagInputLength;

  useEffect(() => {
    setHashtags(new Set(value));
  }, [value]);

  return (
    <div className='relative w-full'>
      <span className='absolute right-0 text-sm text-v1-text-primary-200'>{hashtagCount}/50</span>

      <div className='flex flex-wrap items-center gap-2 pr-10'>
        {Array.from(hashtags).map((hashtag, index) => (
          <span
            key={index}
            className='cursor-pointer break-all rounded-xl border bg-v1-text-primary-50 px-2 py-[2px] text-sm text-v1-text-primary-400'
            onClick={() => handleRemoveHashtag(hashtag)}
          >
            {hashtag}
          </span>
        ))}

        <div
          className={`mt-[1px] flex flex-1 items-center text-v1-text-primary-200 ${hashtagTextLength < MAX_HASHTAG_LENGTH && dirtyFields.hashtagInput ? '' : ''} ${hashtagTextLength >= MAX_HASHTAG_LENGTH ? 'invisible h-0' : ''}`}
        >
          <label htmlFor='hashtag-input'>#</label>
          <input
            placeholder={!dirtyFields.hashtagInput ? '해시태그로#챌린지를#소개해요' : ''}
            id='hashtag-input'
            type='text'
            className='w-full min-w-20 bg-transparent outline-none'
            autoComplete='off'
            maxLength={MAX_HASHTAG_LENGTH - hashtagTextLength - 1}
            disabled={hashtagTextLength >= MAX_HASHTAG_LENGTH}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
              if (e.key === 'Backspace' && hashtagInputLength === 0) {
                const lastHashtag = Array.from(hashtags).pop();
                if (lastHashtag) {
                  handleRemoveHashtag(lastHashtag);
                }
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleAddHashtag(getValues('hashtagInput'));
                setValue('hashtagInput', '');
              }
            }}
            {...register('hashtagInput')}
          />
        </div>
      </div>
    </div>
  );
}
