import { useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import { Input } from '@/components/input/Input';
import useTempSave from '@/hooks/useTempSave';
import type { FunnelProps, RewardPoint } from './_context/context';

interface RewardPointProps {
  onNext: (props: RewardPoint) => void;
  goBack: () => void;
  point?: RewardPoint['point'];
  count?: RewardPoint['count'];
  updateDraftTempData: ReturnType<typeof useTempSave<FunnelProps>>['updateDraftTempData'];
}

const { Title, FieldWrapper, ButtonWrapper, GrayText, Label } = FunnelUi;
const MAX_POINT = 100;
const MIN_POINT = 1;
const MAX_COUNT = 10;
const MIN_COUNT = 1;

export default function RewardPoint({ onNext, updateDraftTempData, ...props }: RewardPointProps) {
  const [point, setPoint] = useState<number | undefined>(props.point);
  const [count, setCount] = useState<number | undefined>(props.count);

  useEffect(() => {
    updateDraftTempData({ point, count });
  }, [point, count, updateDraftTempData]);

  return (
    <FunnelUi>
      <Title>
        리워드 상품과 교환할 <br />
        포인트를 등록해 주세요!
      </Title>
      <FieldWrapper>
        <div>
          <Label htmlFor='point'>소모 포인트</Label>
          <GrayText>포인트를 설정하고 리워드와 교환 할수 있어요</GrayText>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            type='numberpad'
            placeholder='1~10000'
            value={point}
            onChange={(e) => setPoint(Number(e.target.value) > MAX_POINT ? MAX_POINT : Number(e.target.value))}
            maxLength={3}
            max={MAX_POINT}
            min={MIN_POINT}
            className='text-center'
            maxWidth='230px'
          />{' '}
          포인트
        </div>
      </FieldWrapper>
      <FieldWrapper>
        <div>
          <Label htmlFor='count'>리워드(보상) 개수 설정</Label>
          <GrayText>리워드 개수를 설정</GrayText>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <Input
            type='numberpad'
            placeholder='1~10'
            value={count}
            onChange={(e) => setCount(Number(e.target.value) > MAX_COUNT ? MAX_COUNT : Number(e.target.value))}
            className='text-center'
            maxWidth='230px'
            max={MAX_COUNT}
            min={MIN_COUNT}
          />{' '}
          개
        </div>
      </FieldWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => onNext({ point, count })}
          disabled={point === undefined || point < MIN_POINT || point > MAX_POINT}
        >
          {point === undefined ? '포인트를 입력해주세요' : '미션 생성 완료'}
        </Button>
      </ButtonWrapper>
    </FunnelUi>
  );
}
