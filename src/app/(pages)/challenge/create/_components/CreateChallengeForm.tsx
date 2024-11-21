import { useState } from 'react';
import Button from '@/components/button/Button';
import InputUnderline from '@/components/input/InputUnderline';
import { Switch } from '@/components/ui/switch';
import HashTags from './HashTags';
import TwoWaySlider from './TwoWaySlider';

export default function CreateChallengeForm() {
  const [challengeName, setChallengeName] = useState('');
  const [hashtags, setHashtags] = useState<Set<string>>(new Set());

  return (
    <div className='flex h-full flex-col justify-between px-6 pb-8'>
      <div className='flex flex-1 flex-col gap-8 py-10'>
        <div>
          <InputUnderline
            value={challengeName}
            placeholder='챌린지 이름을 입력해 주세요'
            onChange={(e) => setChallengeName(e.target.value)}
            hasMaxLength={true}
            maxLength={20}
          />
          <HashTags hashtags={hashtags} setHashtags={setHashtags} />
        </div>

        <div>
          <FieldTitleAndDescription
            title='챌린지 참여 인원 수'
            description='참여할 수 있는 최대의 인원 수를 설정해요.'
          />
          <div className='mt-4'>
            <TwoWaySlider />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <FieldTitleAndDescription
              title='챌린지 공개하기'
              description='공개되지 않은 챌린지는 코드로 참여 할수 있어요'
            />
          </div>
          <div>
            <Switch />
          </div>
        </div>
      </div>

      <Button>챌린지 생성 완료</Button>
    </div>
  );
}

const FieldTitleAndDescription = ({ title, description }: { title: string; description: string }) => {
  return (
    <>
      <p className='mb-1 text-xl text-v1-text-primary-400'>{title}</p>
      <p className='break-keep text-sm text-v1-text-primary-200'>{description}</p>
    </>
  );
};
