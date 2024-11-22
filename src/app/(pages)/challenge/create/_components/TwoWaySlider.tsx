import { useEffect, useState } from 'react';
import Slider from '@/components/input/Slider';

export default function TwoWaySlider({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const defaultTwoWayValue: [number, number] = [value[0], value[1]];
  const min = 2;
  const max = 10;

  const getSliderValue = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const [inputValue, setInputValue] = useState<[number, number]>(defaultTwoWayValue);
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    getSliderValue(defaultTwoWayValue[0]),
    getSliderValue(defaultTwoWayValue[1]),
  ]);

  const handleTwoWaySliderChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => {
    const value = parseInt(event.target.value);

    if (type === 'from') {
      if (value <= inputValue[1]) {
        setSliderValue([getSliderValue(value), sliderValue[1]]);
        setInputValue([value, inputValue[1]]);
        onChange([value, inputValue[1]]);
      } else {
        event.target.value = inputValue[1].toString();
      }
    } else {
      if (value >= inputValue[0]) {
        setSliderValue([sliderValue[0], getSliderValue(value)]);
        setInputValue([inputValue[0], value]);
        onChange([inputValue[0], value]);
      } else {
        event.target.value = inputValue[0].toString();
      }
    }
  };

  useEffect(() => {
    setInputValue(value);
    setSliderValue([getSliderValue(value[0]), getSliderValue(value[1])]);
  }, [value]);

  return (
    <Slider>
      <Slider.TipWrapper>
        <Slider.Tip left={sliderValue[0]} label='최소' value={inputValue[0]} />
        <Slider.Tip left={sliderValue[1]} label='최대' value={inputValue[1]} />
      </Slider.TipWrapper>

      <Slider.TwoWaySlider
        min={min}
        max={max}
        defaultValue={defaultTwoWayValue}
        sliderValue={sliderValue}
        onChange={handleTwoWaySliderChange}
      />
      <Slider.Indicator length={max - min + 1} />
    </Slider>
  );
}
