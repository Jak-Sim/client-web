import { ReactNode } from 'react';
import { cn } from '@/lib/shadcn/utils';


interface SliderProps {
  children: ReactNode;
}

const SliderWrapper = ({ children }: SliderProps) => {
  return <div className='relative'>{children}</div>;
};

const OneWaySlider = ({
  min,
  max,
  defaultValue,
  sliderValue,
  onChange,
}: {
  min: number;
  max: number;
  defaultValue: number;
  sliderValue: [number, number];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='relative mb-5 mt-4 h-[6px]'>
      <SliderTrack>
        <SliderProgress style={{ left: `${sliderValue[0]}%`, right: `${100 - sliderValue[1]}%` }} />
      </SliderTrack>

      <div className='absolute top-1/2 -mt-[2px] w-full -translate-y-1/2'>
        <SliderInput min={min} max={max} onChange={onChange} defaultValue={defaultValue} />
      </div>
    </div>
  );
};

const TwoWaySlider = ({
  min,
  max,
  defaultValue,
  sliderValue,
  onChange,
}: {
  min: number;
  max: number;
  defaultValue: [number, number];
  sliderValue: [number, number];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => void;
}) => {
  return (
    <div className='relative my-4 w-full'>
      <SliderTrack>
        <SliderProgress style={{ left: `${sliderValue[0]}%`, right: `${100 - sliderValue[1]}%` }} />
      </SliderTrack>

      <div className='absolute top-1/2 -mt-[2px] w-full -translate-y-[calc(50%-12px)]'>
        <SliderInput min={min} max={max} onChange={(event) => onChange(event, 'from')} defaultValue={defaultValue[0]} />
        <SliderInput
          min={min}
          max={max}
          onChange={(event) => onChange(event, 'to')}
          defaultValue={defaultValue[1]}
          className='-translate-y-6'
        />
      </div>
    </div>
  );
};

const SliderTrack = ({ children }: { children: ReactNode }) => {
  return <div className='relative h-[6px] w-full rounded-md bg-v1-orange-200'>{children}</div>;
};

const SliderProgress = ({ style }: { style: React.CSSProperties }) => {
  return <div className='-z-1 absolute h-full rounded-md bg-v1-orange-400' style={style} />;
};

const SliderInput = ({
  min,
  max,
  onChange,
  defaultValue,
  className,
}: {
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: number;
  className?: string;
}) => {
  return (
    <input
      type='range'
      className={cn(
        'slider thumb:appearance-none thumb:w-4 thumb:h-4 relative h-[6px] w-full appearance-none rounded-md bg-transparent outline-none',
        className,
      )}
      step='1'
      min={min}
      max={max}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

const SliderIndicator = ({ length }: { length: number }) => {
  return (
    <div className='flex h-[6px] justify-between px-2'>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className='h-full w-[2px] rounded-full bg-v1-grey-400' />
      ))}
    </div>
  );
};

const SliderTip = ({ left, label, value }: { left: number; label: string; value: number }) => {
  return (
    <div className='absolute left-0 mb-4 w-full'>
      <div className='absolute w-10 -translate-x-1/2' style={{ left: `${left}%` }}>
        <p className='mb-1 bg-v1-background text-center text-xs text-v1-text-primary-400'>{label}</p>
        <div className='flex h-[30px] w-10 items-center justify-center rounded-lg bg-v1-orange-500 text-sm font-semibold text-white'>
          {value}
        </div>
      </div>
    </div>
  );
};

const SliderTipWrapper = ({ children }: { children: ReactNode }) => {
  return <div className='relative mx-[10px] h-[50px]'>{children}</div>;
};

function Slider({ children }: { children: ReactNode }) {
  return <SliderWrapper>{children}</SliderWrapper>;
}

Slider.OneWaySlider = OneWaySlider;
Slider.TwoWaySlider = TwoWaySlider;
Slider.Indicator = SliderIndicator;
Slider.Tip = SliderTip;
Slider.TipWrapper = SliderTipWrapper;

export default Slider;