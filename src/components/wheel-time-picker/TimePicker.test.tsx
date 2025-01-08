import { render, screen } from '@testing-library/react';
import TimePicker, { isTimeValid, updateTimeLike } from './TimePicker';

// mocks from: https://github.com/davidjerleke/embla-carousel/tree/master/packages/embla-carousel/src/__tests__/mocks
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

describe('타임피커 컴포넌트', () => {
  it('컴포넌트가 정상적으로 렌더링된다', () => {
    const { container } = render(<TimePicker value='14:30' onChange={() => {}} maxTime={'00:00'} minTime={'24:00'} />);
    expect(container).toBeInTheDocument();
  });

  it('시간이 올바르게 표시된다', () => {
    const time = '14:30';
    render(<TimePicker onChange={() => {}} maxTime={'00:00'} minTime={'24:00'} value={time} />);

    expect(screen.getByTestId('hour-display-2')).toHaveClass('selected');
    expect(screen.getByTestId('minute-display-30')).toHaveClass('selected');
    expect(screen.getByTestId('period-display-PM')).toHaveClass('selected');
  });

  it('maxTime이 설정되면 최대값을 넘어갈 수 없다', () => {
    render(<TimePicker onChange={() => {}} maxTime={'07:00'} minTime={'04:00'} value='08:00' />);

    expect(screen.getByTestId('hour-display-8')).toHaveClass('invalid');
  });

  it('최대 시간보다 큰 값을 선택하면 invalid 상태가 된다', () => {
    render(<TimePicker value='08:00' onChange={() => {}} maxTime='07:00' />);

    expect(screen.getByTestId('hour-display-8')).toHaveClass('invalid');
  });
});

describe('유효한 시간인지 검증하는 함수: isTimeValid', () => {
  it('최대/최소 시간 제약이 없을 때는 true를 반환한다', () => {
    expect(isTimeValid({ value: '13:30' })).toBe(true);
  });

  it('유효하지 않은 시간 형식이 입력되면 에러가 발생한다', () => {
    try {
      isTimeValid({ value: 0 });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('시간 형식이 올바르지 않습니다.');
      }
    }
    try {
      isTimeValid({ value: new Date() });
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('시간 형식이 올바르지 않습니다.');
      }
    }
  });

  it('최대 시간을 초과하면 false를 반환한다', () => {
    expect(isTimeValid({ value: '13:30', maxTime: '13:00' })).toBe(false);
    expect(isTimeValid({ value: '12:59', maxTime: '13:00' })).toBe(true);
  });

  it('최소 시간보다 작으면 false를 반환한다', () => {
    expect(isTimeValid({ value: '09:00', minTime: '10:00' })).toBe(false);
    expect(isTimeValid({ value: '10:30', minTime: '10:00' })).toBe(true);
  });

  it('PM일 때 24시 이후는 false를 반환한다', () => {
    expect(isTimeValid({ value: '24:01', period: 'PM' })).toBe(false);
    expect(isTimeValid({ value: '24:00', period: 'PM' })).toBe(true);
  });

  it('올바르지 않은 시간 문자열 형식이 입력되면 에러가 발생한다', () => {
    const invalidFormats = [
      '1430', // 콜론(:) 없음
      '14-30', // 잘못된 구분자
      '14:', // 분 없음
      ':30', // 시간 없음
      ' 14:30', // 앞 공백
      '14:30 ', // 뒤 공백
      '14:30:00', // 초 포함
      '', // 빈 문자열
      '  ', // 공백만 있는 문자열
    ];

    invalidFormats.forEach((format) => {
      try {
        isTimeValid({ value: format });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe('시간 형식이 올바르지 않습니다.');
        }
      }
    });
  });
});

describe('상태값을 시간 문자열로 변환하는 함수: updateTimeLike', () => {
  it('올바른 시간 상태가 입력되면 시간 문자열을 반환한다', () => {
    expect(updateTimeLike({ hourIdx: 13, minuteIdx: 29, period: 'AM' })).toBe('14:30');
    expect(updateTimeLike({ hourIdx: 13, minuteIdx: 29, period: 'PM' })).toBe('26:30');
  });
});
