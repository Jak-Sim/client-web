import { useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import { Input, TextArea } from '@/components/input/Input';
import useTempSave from '@/hooks/useTempSave';
import type { FunnelProps, RewardDescription } from './_context/context';


interface RewardDescriptionProps {
  onNext: (props: RewardDescription) => void;
  goBack: () => void;
  name?: RewardDescription['name'];
  description?: RewardDescription['description'];
  updateDraftTempData: ReturnType<typeof useTempSave<FunnelProps>>['updateDraftTempData'];
}

const { Title, FieldWrapper, ButtonWrapper, Label } = FunnelUi;

export default function RewardDescription({ onNext, updateDraftTempData, ...props }: RewardDescriptionProps) {
  const [name, setName] = useState<string>(props.name ?? '');
  const [description, setDescription] = useState<string>(props.description ?? '');

  useEffect(() => {
    updateDraftTempData({ name, description });
  }, [name, description, updateDraftTempData]);

  return (
    <FunnelUi>
      <Title>
        <strong>리워드 상품</strong>을
        <br />
        등록해 주세요!
      </Title>
      <FieldWrapper>
        <Label htmlFor='name'>리워드(보상) 상품 제목</Label>
        <Input
          type='text'
          placeholder='리워드 상품 (최대 10자)'
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={15}
        >
          <Input.LengthCounter />
        </Input>
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor='description'>리워드(보상) 한 소개를 입력해 주세요</Label>
        <TextArea
          className='break-keep'
          placeholder='리워드를 한줄로 소개해 주세요 (최대 30자)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={30}
        >
          <TextArea.LengthCounter />
        </TextArea>
      </FieldWrapper>
      <ButtonWrapper>
        <Button onClick={() => onNext({ name, description })} disabled={!name || !description}>
          다음
        </Button>
      </ButtonWrapper>
    </FunnelUi>
  );
}