import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import ImageFileInput from '@/components/input/ImageFileInput';
import { TextArea } from '@/components/input/Input';

const MAX_PICTURES = 3;
const { Title, FieldWrapper, ButtonWrapper, GrayText, Label, TextRow } = FunnelUi;

const SubmissionDescription = () => {
  const router = useRouter();
  const { id } = useParams();
  const [description, setDescription] = useState<string>('');
  const [pictures, setPictures] = useState<FileList | null>(null);
  return (
    <div>
      <Title>
        미션 완료! 🔥
        <br />
        증명해 볼까요?
      </Title>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='picture'>사진 등록 (선택)</Label>
          <GrayText>미션 예시가 있으면 보여주세요 (최대 3장)</GrayText>
        </TextRow>
        <ImageFileInput value={pictures} setValue={setPictures} maxLength={MAX_PICTURES} />
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor='description'>미션 후기를 써주세요</Label>
        <TextArea
          placeholder='미션 진행할때 느낀점을 써주세요!'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
        >
          <TextArea.LengthCounter />
        </TextArea>
      </FieldWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => router.push(`/chat/${id}`)}
          disabled={!description || (pictures !== null && pictures.length > MAX_PICTURES)}
        >
          제출하기
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default SubmissionDescription;
