import { MutableRefObject, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Button from '@/components/button/Button';
import InputUnderline from '@/components/input/InputUnderline';
import { Switch } from '@/components/ui/switch';
import { api } from '@/lib/axios/axios';
import HashTags from './HashTags';
import TwoWaySlider from './TwoWaySlider';
import UploadThumbnail from './UploadThumbnail';

interface CreateChallengeFormProps {
  tempSaved: MutableRefObject<Challenge | null>;
  removeTempChallenge: () => void;
  updateChallenge: (challenge: Challenge) => void;
}

export interface Challenge {
  challengeName: string;
  backgroundImage: string;
  isPublic: boolean;
  minParticipants: number;
  maxParticipants: number;
  tags: string[];
}

export default function CreateChallengeForm({
  tempSaved,
  removeTempChallenge,
  updateChallenge,
}: CreateChallengeFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Challenge>({
    defaultValues: {
      challengeName: '',
      backgroundImage: '',
      isPublic: false,
      minParticipants: 3,
      maxParticipants: 10,
      tags: [],
    },
  });

  useEffect(() => {
    if (tempSaved.current) {
      const tempSavedChallenge = tempSaved.current;

      for (const key in tempSavedChallenge) {
        setValue(key as keyof Challenge, tempSavedChallenge[key as keyof Challenge]);
      }
    }
  }, [tempSaved.current]);

  const challengeName = useWatch({ control, name: 'challengeName' });
  const minParticipants = useWatch({ control, name: 'minParticipants' });
  const maxParticipants = useWatch({ control, name: 'maxParticipants' });
  const watchedValues = useWatch({ control });

  const participantsChange = (value: [number, number]) => {
    if (getValues('minParticipants') !== value[0]) setValue('minParticipants', value[0]);
    if (getValues('maxParticipants') !== value[1]) setValue('maxParticipants', value[1]);
  };

  const onSubmit = (data: Challenge) => {
    const { challengeName, ...rest } = data;
    const newData = {
      name: challengeName,
      ...rest,
    };
    api.post('/challenge/create', newData);

    removeTempChallenge();
  };

  useEffect(() => {
    if (watchedValues) {
      updateChallenge(getValues());
    }
  }, [watchedValues]);

  return (
    <form className='flex h-full flex-col justify-between px-6 pb-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-1 flex-col gap-8 py-10'>
        <UploadThumbnail />

        <div>
          <InputUnderline
            placeholder='챌린지 이름을 입력해 주세요'
            hasMaxLength={true}
            maxLength={20}
            currentLength={challengeName.length}
            isError={!!errors.challengeName}
            {...register('challengeName', { required: true, maxLength: 20 })}
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

      <Button>챌린지 생성 완료</Button>
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
