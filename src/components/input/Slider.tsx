import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/shadcn/utils';


interface SliderProps {
  min: number;
  max: number;
  defaultValue: [number, number];
  onChange: (value: [number, number]) => void;
  children: ReactNode;
}

interface SliderContextProps extends Omit<SliderProps, 'children'> {
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => void;
  sliderPercentage: [number, number];
  inputValue: [number, number];
}

const SliderContext = createContext<SliderContextProps | undefined>(undefined);

const getSliderValue = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

const SliderWrapper = ({ children, ...props }: SliderProps) => {
  const { min, max, defaultValue, onChange } = props;
  const [inputValue, setInputValue] = useState<[number, number]>(defaultValue as [number, number]);
  const [sliderPercentage, setSliderPercentage] = useState<[number, number]>([
    getSliderValue((defaultValue as [number, number])[0], min, max),
    getSliderValue((defaultValue as [number, number])[1], min, max),
  ]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => {
    const value = parseInt(event.target.value);

    if (type === 'from') {
      if (value <= inputValue[1]) {
        setSliderPercentage([getSliderValue(value, min, max), sliderPercentage[1]]);
        setInputValue([value, inputValue[1]]);
        onChange([value, inputValue[1]]);
      } else {
        event.target.value = inputValue[1].toString();
      }
    } else {
      if (value >= inputValue[0]) {
        setSliderPercentage([sliderPercentage[0], getSliderValue(value, min, max)]);
        setInputValue([inputValue[0], value]);
        onChange([inputValue[0], value]);
      } else {
        event.target.value = inputValue[0].toString();
      }
    }
  };

  useEffect(() => {
    setSliderPercentage([
      getSliderValue((defaultValue as [number, number])[0], min, max),
      getSliderValue((defaultValue as [number, number])[1], min, max),
    ]);
  }, [defaultValue]);

  return (
    <SliderContext.Provider value={{ ...props, sliderPercentage, handleSliderChange, inputValue }}>
      {children}
    </SliderContext.Provider>
  );
};

const OneWaySlider = () => {
  const { min, max, defaultValue, sliderPercentage, handleSliderChange } = useContext(SliderContext)!;

  return (
    <div className='relative mb-5 mt-4 h-[6px]'>
      <SliderTrack>
        <SliderProgress style={{ left: 0, right: `${100 - sliderPercentage[1]}%` }} />
      </SliderTrack>

      <div className='absolute top-1/2 -mt-[2px] w-full -translate-y-1/2'>
        <SliderInput
          min={min}
          max={max}
          onChange={(event) => handleSliderChange(event, 'to')}
          defaultValue={(defaultValue as [number, number])[1]}
        />
      </div>
    </div>
  );
};

const TwoWaySlider = () => {
  const { min, max, defaultValue, sliderPercentage, handleSliderChange } = useContext(SliderContext)!;

  return (
    <div className='relative my-4 w-full'>
      <SliderTrack>
        <SliderProgress style={{ left: `${sliderPercentage[0]}%`, right: `${100 - sliderPercentage[1]}%` }} />
      </SliderTrack>

      <div className='absolute top-1/2 -mt-[2px] w-full -translate-y-[calc(50%-12px)]'>
        <SliderInput
          min={min}
          max={max}
          onChange={(event) => handleSliderChange(event, 'from')}
          defaultValue={(defaultValue as [number, number])[0]}
        />
        <SliderInput
          min={min}
          max={max}
          onChange={(event) => handleSliderChange(event, 'to')}
          defaultValue={(defaultValue as [number, number])[1]}
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
  return <div className='-z-1 absolute h-full rounded-md bg-v1-orange-400 transition-transform' style={style} />;
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

const SliderIndicator = () => {
  const { min, max } = useContext(SliderContext)!;
  const indicatorLength = max - min + 1;

  return (
    <div className='flex h-[6px] justify-between px-2'>
      {Array.from({ length: indicatorLength }).map((_, index) => (
        <div key={index} className='h-full w-[2px] rounded-full bg-v1-grey-400' />
      ))}
    </div>
  );
};

const FromSliderTip = ({ label }: { label: string }) => {
  return <SliderTip label={label} type='from' />;
};

const ToSliderTip = ({ label }: { label: string }) => {
  return <SliderTip label={label} type='to' />;
};

const SliderTip = ({ label, type }: { label: string; type: 'from' | 'to' }) => {
  const { sliderPercentage, inputValue } = useContext(SliderContext)!;

  return (
    <div className='absolute left-0 mb-4 w-full'>
      <div className='absolute w-10 -translate-x-1/2' style={{ left: `${sliderPercentage[type === 'from' ? 0 : 1]}%` }}>
        <p className='mb-1 bg-v1-background text-center text-xs text-v1-text-primary-400'>{label}</p>
        <div className='flex h-[30px] w-10 items-center justify-center rounded-lg bg-v1-orange-500 text-sm font-semibold text-white'>
          {type === 'from' ? inputValue[0] : inputValue[1]}
        </div>
      </div>
    </div>
  );
};

const SliderTipWrapper = ({ children }: { children: ReactNode }) => {
  return <div className='relative mx-[10px] h-[50px]'>{children}</div>;
};

function Slider({ children, ...props }: SliderProps) {
  return <SliderWrapper {...props}>{children}</SliderWrapper>;
}

Slider.OneWaySlider = OneWaySlider;
Slider.TwoWaySlider = TwoWaySlider;
Slider.Indicator = SliderIndicator;
Slider.TipWrapper = SliderTipWrapper;
Slider.Tip = SliderTip;
Slider.FromTip = FromSliderTip;
Slider.ToTip = ToSliderTip;

export default Slider;