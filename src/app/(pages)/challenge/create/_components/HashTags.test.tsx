import { fireEvent, render, screen } from '@testing-library/react';
import HashTags from './HashTags';


describe('HashTags 컴포넌트', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(<HashTags value={[]} onChange={mockOnChange} />);
  });

  test('기본: 입력 필드와 해시태그 개수를 렌더링한다', () => {
    const input = screen.getByTestId('hashtag-input');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('Enter 키를 누르면 해시태그를 추가한다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(['test']);
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('4/50')).toBeInTheDocument();
  });

  test('Space 키를 누르면 해시태그를 추가한다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'space' } });
    fireEvent.keyDown(input, { key: ' ' });

    expect(mockOnChange).toHaveBeenCalledWith(['space']);
    expect(screen.getByText('#space')).toBeInTheDocument();
    expect(screen.getByText('5/50')).toBeInTheDocument();
  });

  test('# 키를 누르면 해시태그를 추가한다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'hashtag' } });
    fireEvent.keyDown(input, { key: '#' });

    expect(mockOnChange).toHaveBeenCalledWith(['hashtag']);
    expect(screen.getByText('#hashtag')).toBeInTheDocument();
    expect(screen.getByText('7/50')).toBeInTheDocument();
  });

  test(', 키를 누르면 해시태그를 추가한다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'comma' } });
    fireEvent.keyDown(input, { key: ',' });

    expect(mockOnChange).toHaveBeenCalledWith(['comma']);
    expect(screen.getByText('#comma')).toBeInTheDocument();
    expect(screen.getByText('5/50')).toBeInTheDocument();
  });

  test('입력이 비어 있으면 해시태그를 추가하지 않는다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: undefined } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('해시태그를 클릭하면 삭제된다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const hashtag = screen.getByText('#test');
    fireEvent.click(hashtag);

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText('#test')).not.toBeInTheDocument();
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('Backspace 키를 누르면 마지막 해시태그를 삭제한다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText('#test')).not.toBeInTheDocument();
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('빈 값을 해시태그로 추가하지 않는다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByText('0/50')).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('구분자 문자를 해시태그로 추가하지 않는다', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: '#' } });
    fireEvent.keyDown(input, { key: '#' });

    expect(input).toHaveValue('');
  });

  test('총 해시태그 문자열의 길이가 50을 초과하면 입력 필드가 숨겨진다', () => {
    const input = screen.getByTestId('hashtag-input');
    const inputContainer = screen.getByTestId('hashtag-input-container');

    fireEvent.change(input, { target: { value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWY' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.queryByText('#abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWY')).toBeInTheDocument();
    expect(inputContainer).toHaveClass('invisible h-0');
  });
});