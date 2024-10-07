export default function SignUpAgree({
  isAgree,
  handleAgreeChange,
}: {
  isAgree: boolean;
  handleAgreeChange: () => void;
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

      <label htmlFor='agree' className='text-white text-[0.75rem] flex items-center cursor-pointer select-none'>
        <div className={`w-4 h-4 p-1 rounded-full border border-primary mr-1`}>
          <div className={`w-full h-full rounded-full ${isAgree ? 'bg-primary' : ''}`} />
        </div>
        <span>개인 정보 제공 약관에 동의합니다.</span>
      </label>
    </div>
  );
}
