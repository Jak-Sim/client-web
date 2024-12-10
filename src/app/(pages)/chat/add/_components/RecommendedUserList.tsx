const RecommendedUserList = () => {
  return (
    <div className={'pt-6'}>
      <p className={'py-4 font-medium'}>추천 대화 상대</p>
      <ul className={'flex gap-2 overflow-auto'}>
        <li
          className={
            'flex h-[200px] min-w-[160px] flex-col items-center justify-center gap-1 rounded-[20px] bg-v1-text-primary-50 px-2 py-8'
          }
        >
          <div className={'h-[84px] w-[84px] rounded-full bg-v1-text-primary-300'}></div>
          <p className={'w-full text-center font-medium text-v1-text-primary-700'}>봄보미</p>
          <p className={'w-full truncate text-center text-sm text-v1-text-primary-400'}>3개 이상 같은 챌린지</p>
        </li>
        <li
          className={
            'flex h-[200px] min-w-[160px] flex-col items-center justify-center gap-1 rounded-[20px] bg-v1-text-primary-50 px-2 py-8'
          }
        >
          <div className={'h-[84px] w-[84px] rounded-full bg-v1-text-primary-300'}></div>
          <p className={'w-full text-center font-medium text-v1-text-primary-700'}>김작심</p>
          <p className={'w-full truncate text-center text-sm text-v1-text-primary-400'}>독서 습관러</p>
        </li>
        <li
          className={
            'flex h-[200px] min-w-[160px] flex-col items-center justify-center gap-1 rounded-[20px] bg-v1-text-primary-50 px-2 py-8'
          }
        >
          <div className={'h-[84px] w-[84px] rounded-full bg-v1-text-primary-300'}></div>
          <p className={'w-full text-center font-medium text-v1-text-primary-700'}>종범띠</p>
          <p className={'w-full truncate text-center text-sm text-v1-text-primary-400'}>2개 이상 같은 챌린지</p>
        </li>
      </ul>
    </div>
  );
};

export default RecommendedUserList;
