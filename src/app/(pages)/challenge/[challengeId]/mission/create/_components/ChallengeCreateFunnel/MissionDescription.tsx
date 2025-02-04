import { useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import ImageFileInput from '@/components/input/ImageFileInput';
import { Input, TextArea } from '@/components/input/Input';
import useTempSave from '@/hooks/useTempSave';
import type { FunnelProps, MissionDescription } from './_context/context';

interface MissionDescriptionProps {
  onNext: (props: MissionDescription) => void;
  goBack: () => void;
  name?: MissionDescription['name'];
  description?: MissionDescription['description'];
  pictures?: MissionDescription['pictures'];
  updateDraftTempData: ReturnType<typeof useTempSave<FunnelProps>>['updateDraftTempData'];
}

const MAX_PICTURES = 3;
const { Title, FieldWrapper, ButtonWrapper, GrayText, Label, TextRow } = FunnelUi;

export default function MissionDescription({ onNext, updateDraftTempData, ...props }: MissionDescriptionProps) {
  const [name, setName] = useState<string>(props.name ?? '');
  const [description, setDescription] = useState<string>(props.description ?? '');
  const [pictures, setPictures] = useState<FileList | null>(props.pictures || null);

  useEffect(() => {
    updateDraftTempData({ name, description, pictures });
  }, [name, description, pictures, updateDraftTempData]);

  return (
    <FunnelUi>
      <Title>
        미션 제목과 방식을
        <br />
        적어볼까요?
      </Title>
      <FieldWrapper>
        <Label htmlFor='name'>미션 이름</Label>
        <Input
          type='text'
          placeholder='미션 이름 (최대 15자)'
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={15}
        >
          <Input.LengthCounter />
        </Input>
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor='description'>미션 방식 소개</Label>
        <TextArea
          placeholder='미션을 어떻게 진행 하는지 설명해 주세요 (최대 100자)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
        >
          <TextArea.LengthCounter />
        </TextArea>
      </FieldWrapper>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='picture'>사진 등록 (선택)</Label>
          <GrayText>미션 예시가 있으면 보여주세요 (최대 3장)</GrayText>
        </TextRow>
        <ImageFileInput value={pictures} setValue={setPictures} maxLength={MAX_PICTURES} />
      </FieldWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => onNext({ name, description, pictures })}
          disabled={!name || !description || (pictures !== null && pictures.length > MAX_PICTURES)}
        >
          다음
        </Button>
      </ButtonWrapper>
    </FunnelUi>
  );
}