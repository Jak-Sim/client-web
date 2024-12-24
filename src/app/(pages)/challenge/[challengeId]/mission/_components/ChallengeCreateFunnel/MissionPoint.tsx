import { useState } from 'react';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import { Input } from '@/components/input/Input';

interface MissionPointProps {
  onNext: ({ point }: { point?: number }) => void;
  goBack: () => void;
  point?: number;
}

const { Title, FieldWrapper, ButtonWrapper, GrayText, Label } = FunnelUi;
const MAX_POINT = 100;
const MIN_POINT = 1;

export default function MissionPoint({ onNext, goBack, ...props }: MissionPointProps) {
  const [point, setPoint] = useState<number>(props.point ?? 0);
  return (
    <FunnelUi>
      <Title>
        성공 보상으로 줄 <br />
        포인트를 정해주세요!
      </Title>
      <FieldWrapper>
        <div>
          <Label htmlFor='point'>보상 포인트</Label>
          <GrayText>
            보상 포인트는 최소 {MIN_POINT}~{MAX_POINT} 포인트가 가능해요
          </GrayText>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            value={point}
            onChange={(e) => setPoint(Number(e.target.value))}
            maxLength={3}
            max={MAX_POINT}
            min={MIN_POINT}
            className='w-full'
          />{' '}
          포인트
        </div>
      </FieldWrapper>
      <ButtonWrapper>
        <Button onClick={() => onNext({ point })} disabled={point < MIN_POINT || point > MAX_POINT}>
          {point === 0 ? '포인트를 입력해주세요' : '미션 생성 완료'}
        </Button>
      </ButtonWrapper>
    </FunnelUi>
  );
}
