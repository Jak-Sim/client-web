import { createContext, useContext } from 'react';

const PROGRESS_STEP = [
  {
    minPercent: 80,
    tag: '열정🔥',
    color: {
      progress: 'bg-v1-orange-500',
      tag: 'bg-v1-orange-200',
    },
  },
  {
    minPercent: 50,
    tag: '성실👍',
    color: {
      progress: 'bg-v1-blue-500',
      tag: 'bg-v1-blue-200',
    },
  },
  {
    minPercent: 0,
    tag: '부족😓',
    color: {
      progress: 'bg-v1-subtext-800',
      tag: 'bg-v1-grey-300',
    },
  },
];

const currentProgressColor = (progress: number) => {
  const currentStep = PROGRESS_STEP.find((step) => progress >= step.minPercent);
  return currentStep?.color.progress;
};

const ProgressContext = createContext<{ progress: number }>({ progress: 0 });

function Progress({ progress, children }: { progress: number; children: React.ReactNode }) {
  return (
    <ProgressContext.Provider value={{ progress }}>
      <div className='flex items-center gap-3'>{children}</div>
    </ProgressContext.Provider>
  );
}

function ProgressBar() {
  const { progress } = useContext(ProgressContext);

  return (
    <div className='h-[6px] w-full rounded-full bg-v1-orange-50'>
      <div className={`h-[6px] rounded-full ${currentProgressColor(progress)}`} style={{ width: `${progress}%` }}></div>
    </div>
  );
}

function ProgressTag() {
  const { progress } = useContext(ProgressContext);
  const currentStep = PROGRESS_STEP.find((step) => progress >= step.minPercent);
  return (
    <div
      className={`w-[50px] rounded-full py-1 ${currentStep?.color.tag} flex shrink-0 items-center justify-center text-xs font-semibold text-v1-grey-700`}
    >
      {currentStep?.tag}
    </div>
  );
}

Progress.ProgressBar = ProgressBar;
Progress.Tag = ProgressTag;

export default Progress;
