const DAYS_ENG_TO_KOR_MAP = {
  Monday: '월',
  Tuesday: '화',
  Wednesday: '수',
  Thursday: '목',
  Friday: '금',
  Saturday: '토',
  Sunday: '일',
};
const day_index = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export type Days = keyof typeof DAYS_ENG_TO_KOR_MAP;

export function getKoreanDayName(day: Days) {
  return DAYS_ENG_TO_KOR_MAP[day];
}

interface Options {
  hasYoil: boolean;
}

export function getKoreanDayString(days: Days[], options?: Options) {
  let daysString = days
    .sort((a, b) => day_index.indexOf(a) - day_index.indexOf(b))
    .map((day) => getKoreanDayName(day))
    .join('');

  return formatKoreanDayString(daysString, options);
}

export function formatKoreanDayString(string: string, options?: Options) {
  switch (string) {
    case '월화수목금':
      return '주중';
    case '토일':
      return '주말';
    case '':
    case '월화수목금토일':
      return '매일';
    default:
      if (string.length > 3) {
        return '특정요일';
      } else {
        if (options?.hasYoil) {
          return string + (string.length > 1 ? ' 요일' : '요일');
        } else {
          return string;
        }
      }
  }
}
