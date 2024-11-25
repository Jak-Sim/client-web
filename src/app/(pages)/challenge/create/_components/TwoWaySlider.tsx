import Slider from '@/components/input/Slider';

const MIN = 2;
const MAX = 10;

export default function TwoWaySlider({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  return (
    <Slider defaultValue={value} max={MAX} min={MIN} onChange={onChange}>
      <Slider.TipWrapper>
        <Slider.FromTip label='최소' />
        <Slider.ToTip label='최대' />
      </Slider.TipWrapper>

      <Slider.TwoWaySlider />
      <Slider.Indicator />
    </Slider>
  );
}
