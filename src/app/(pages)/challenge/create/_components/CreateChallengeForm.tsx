import { useState } from 'react';
import Button from '@/components/button/Button';
import InputUnderline from '@/components/input/InputUnderline';
import HashTags from './HashTags';

export default function CreateChallengeForm() {
  const [challengeName, setChallengeName] = useState('');
  const [hashtags, setHashtags] = useState<Set<string>>(new Set());

  return (
    <div className='flex h-full flex-col justify-between px-6 pb-8'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <InputUnderline
          value={challengeName}
          placeholder='챌린지 이름을 입력해 주세요'
          onChange={(e) => setChallengeName(e.target.value)}
          hasMaxLength={true}
          maxLength={20}
        />
        <HashTags hashtags={hashtags} setHashtags={setHashtags} />
      </div>

      <Button>챌린지 생성 완료</Button>
    </div>
  );
}
