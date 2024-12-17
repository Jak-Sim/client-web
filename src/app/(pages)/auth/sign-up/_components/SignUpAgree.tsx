export default function SignUpAgree({
  isAgree,
  handleAgreeChange,
  enable = true,
}: {
  isAgree: boolean;
  handleAgreeChange: () => void;
  enable?: boolean;
}) {
  return (
    <div className='mb-4'>
      <input
        id='agree'
        type='checkbox'
        className='hidden rounded-full border bg-transparent'
        checked={isAgree}
        onChange={handleAgreeChange}
      />

      <label
        htmlFor='agree'
        className='flex cursor-pointer select-none items-center text-[0.75rem] text-v1-text-primary-500'
      >
        <div
          className={`mr-1 h-4 w-4 rounded-full border p-1 ${enable || isAgree ? 'border-primary' : 'border-v1-grey-500'}`}
        >
          <div className={`h-full w-full rounded-full ${isAgree ? 'bg-primary' : ''}`} />
        </div>
        <span>개인 정보 제공 약관에 동의합니다.</span>
      </label>
    </div>
  );
}
