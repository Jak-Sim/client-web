import { SubMissionImageProps } from '@/app/(pages)/chat/[id]/_components/OtherChat';

const SubmissionDetailModal = (props: SubMissionImageProps) => {
  return (
    <div>
      <button onClick={() => props.close()}>닫기</button>
    </div>
  );
};

export default SubmissionDetailModal;
