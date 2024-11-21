import { useState } from 'react';
import Slider from '@/components/input/Slider';

export default function TwoWaySlider() {
  const min = 1;
  const max = 10;
  const defaultTwoWayValue: [number, number] = [2, 4];

  const getSliderValue = (value: number) => {
    return ((value - 1) / (max - 1)) * 100;
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
      } else {
        event.target.value = inputValue[1].toString();
      }
    } else {
      if (value >= inputValue[0]) {
        setSliderValue([sliderValue[0], getSliderValue(value)]);
        setInputValue([inputValue[0], value]);
      } else {
        event.target.value = inputValue[0].toString();
      }
    }
  };

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