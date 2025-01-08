'use client';

import React from 'react';
import { ko } from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './inputDate.css';
import 'react-datepicker/dist/react-datepicker.css';


registerLocale('ko', ko);

const InputDate = ({
  value,
  onChange,
  className,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}) => {
  return (
    <DatePicker
      className={`w-full rounded-2xl bg-v1-text-primary-50 p-3 text-center text-lg outline-none ${className}`}
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
      dateFormat={'yyyy/MM/dd'}
      onChange={onChange}
    />
  );
};

export default InputDate;