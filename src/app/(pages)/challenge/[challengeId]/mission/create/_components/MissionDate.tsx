'use client';

import React from 'react';
import { ko } from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './MissionDate.css';
import 'react-datepicker/dist/react-datepicker.css';


registerLocale('ko', ko);

const MissionDate = ({ value, onChange }: { value: Date | null; onChange: (date: Date | null) => void }) => {
  return (
    <DatePicker
      className='w-full max-w-[140px] rounded-[20px] border-[1px] border-[#907D78] px-4 py-3'
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className={'flex items-center justify-between px-3 py-1'}>
          <button type='button' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <FaAngleLeft size={20} />
          </button>
          <span className={'text-base font-semibold'}>
            {date.getFullYear()}년 {date.getMonth() + 1}월
          </span>
          <button type='button' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <FaAngleRight size={20} />
          </button>
        </div>
      )}
      selected={value}
      locale='ko'
      dateFormat={'yyyy.MM.dd'}
      onChange={onChange}
    />
  );
};

export default MissionDate;