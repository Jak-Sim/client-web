'use client';

import React, { useState } from 'react';
import { ko } from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Calendar from '@/assets/images/icons/calendar.svg';
import './MissionDate.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

const MissionDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
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
      selected={startDate}
      locale='ko'
      dateFormat={'yyyy.MM.dd'}
      showIcon
      icon={<Calendar />}
      onChange={(date) => setStartDate(date as Date)}
    />
  );
};

export default MissionDate;
