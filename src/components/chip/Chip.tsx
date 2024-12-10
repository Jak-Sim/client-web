type ChipVarient = 'light-grey' | 'red' | 'green' | 'orange' | 'grey' | 'light-orange';

export default function Chip({
  tag,
  onClick,
  prefix,
  varient,
  fontSize = 'sm',
}: {
  tag: string;
  onClick?: () => void;
  prefix?: string;
  varient?: ChipVarient;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
  const varientClass: Record<ChipVarient, string> = {
    'light-orange': 'light-orange-bg-text',
    orange: 'orange-bg-text',
    grey: 'grey-bg-text',
    'light-grey': 'light-grey-bg-text',
    red: 'red-bg-text',
    green: 'green-bg-text',
  };

  const chipClass = varient ? varientClass[varient] : 'light-grey-bg-text';

  return (
    <span
      className={`${chipClass} cursor-pointer break-all rounded-xl px-[6px] py-[1px] text-${fontSize}`}
      onClick={onClick}
    >
      {prefix ? `${prefix}${tag}` : tag}
    </span>
  );
}
