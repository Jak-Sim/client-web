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
        className='text-v1-text-primary-500 text-[0.75rem] flex items-center cursor-pointer select-none'
      >
        <div
          className={`w-4 h-4 p-1 rounded-full border mr-1 ${enable || isAgree ? 'border-primary' : 'border-v1-grey-500'}`}
        >
          <div className={`w-full h-full rounded-full ${isAgree ? 'bg-primary' : ''}`} />
        </div>
        <span>개인 정보 제공 약관에 동의합니다.</span>
      </label>
    </div>
  );
}
