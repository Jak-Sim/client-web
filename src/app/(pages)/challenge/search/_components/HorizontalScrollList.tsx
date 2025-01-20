export default function HorizontalScrollList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={`-mx-6 flex gap-2 overflow-x-scroll px-6 pb-2 ${className}`}>{children}</ul>;
}
