'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/button/Button';
import InputUnderline from '@/components/input/InputUnderline';
import { Switch } from '@/components/ui/switch';
import { Challenge, ChallengeCreateDTO } from '@/models/challenge/Challenge';
import HashTags from './HashTags';
import TwoWaySlider from './TwoWaySlider';
import UploadThumbnail from './UploadThumbnail';

const schema = z.object({
  challengeName: z.string().min(1).max(20),
  backgroundImage: z.string(),
  isPublic: z.boolean(),
  minParticipants: z.number().min(3).max(10),
  maxParticipants: z.number().min(3).max(10),
  tags: z.array(z.string()),
});

export default function CreateChallengeForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ChallengeCreateDTO>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      backgroundImage: '',
      isPublic: false,
      minParticipants: 3,
      maxParticipants: 10,
      tags: [],
    },
  });

  const challengeName = useWatch({ control, name: 'name' });
  const minParticipants = useWatch({ control, name: 'minParticipants' });
  const maxParticipants = useWatch({ control, name: 'maxParticipants' });
  const backgroundImage = useWatch({ control, name: 'backgroundImage' });

  const participantsChange = (value: [number, number]) => {
    if (getValues('minParticipants') !== value[0]) setValue('minParticipants', value[0]);
    if (getValues('maxParticipants') !== value[1]) setValue('maxParticipants', value[1]);
  };

  const onSubmit = async (data: ChallengeCreateDTO) => {
    try {
      const response = await Challenge.createChallenge(data);
      const challengeId = response.challengeId;
      router.push(`/challenge/create/success?challengeId=${challengeId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='flex h-full flex-col justify-between px-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-1 flex-col gap-8 py-10'>
        <UploadThumbnail backgroundImage={backgroundImage} />

        <div>
          <InputUnderline
            placeholder='챌린지 이름을 입력해 주세요'
            hasMaxLength={true}
            maxLength={20}
            currentLength={challengeName.length}
            isError={!!errors.name}
            {...register('name')}
          />

          <Controller
            control={control}
            name='tags'
            render={({ field }) => <HashTags value={field.value} onChange={field.onChange} />}
          />
        </div>

        <div className='mb-6 mt-2'>
          <FieldTitleAndDescription
            title='챌린지 참여 인원 수'
            description='참여할 수 있는 최대의 인원 수를 설정해요.'
          />
          <div className='mt-2'>
            <TwoWaySlider value={[minParticipants, maxParticipants]} onChange={participantsChange} />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <FieldTitleAndDescription
              title='챌린지 공개하기'
              description='공개되지 않은 챌린지는 코드로 참여 할수 있어요'
            />
          </div>
          <Controller
            control={control}
            name='isPublic'
            render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
          />
        </div>
      </div>

      <div className='pb-6'>
        <Button disabled={!challengeName}>챌린지 생성 완료</Button>
      </div>
    </form>
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