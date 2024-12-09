import { fireEvent, render, screen } from '@testing-library/react';
import HashTags from './HashTags';


describe('HashTags Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(<HashTags value={[]} onChange={mockOnChange} />);
  });

  test('default: renders input and displays hashtag count', () => {
    const input = screen.getByTestId('hashtag-input');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('adds a hashtag when Enter is pressed', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(['test']);
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('4/50')).toBeInTheDocument();
  });

  test('adds a hashtag when space is pressed', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'space' } });
    fireEvent.keyDown(input, { key: ' ' });

    expect(mockOnChange).toHaveBeenCalledWith(['space']);
    expect(screen.getByText('#space')).toBeInTheDocument();
    expect(screen.getByText('5/50')).toBeInTheDocument();
  });

  test('adds a hashtag when any of "#" is pressed', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'hashtag' } });
    fireEvent.keyDown(input, { key: '#' });

    expect(mockOnChange).toHaveBeenCalledWith(['hashtag']);
    expect(screen.getByText('#hashtag')).toBeInTheDocument();
    expect(screen.getByText('7/50')).toBeInTheDocument();
  });

  test('adds a hashtag when comma is pressed', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'comma' } });
    fireEvent.keyDown(input, { key: ',' });

    expect(mockOnChange).toHaveBeenCalledWith(['comma']);
    expect(screen.getByText('#comma')).toBeInTheDocument();
    expect(screen.getByText('5/50')).toBeInTheDocument();
  });

  test('does not add hashtags when the input is empty', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: undefined } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('removes a hashtag when clicked', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const hashtag = screen.getByText('#test');
    fireEvent.click(hashtag);

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText('#test')).not.toBeInTheDocument();
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('removes a hashtag when Backspace is pressed', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText('#test')).not.toBeInTheDocument();
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('does not add empty hashtags', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByText('0/50')).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  test('does not add sperator characters as hashtags', () => {
    const input = screen.getByTestId('hashtag-input');
    fireEvent.change(input, { target: { value: '#' } });
    fireEvent.keyDown(input, { key: '#' });

    expect(input).toHaveValue('');
  });

  test('input is invisible when the hashtag count is over 50', () => {
    const input = screen.getByTestId('hashtag-input');
    const inputContainer = screen.getByTestId('hashtag-input-container');

    fireEvent.change(input, { target: { value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWY' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.queryByText('#abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWY')).toBeInTheDocument();
    expect(inputContainer).toHaveClass('invisible h-0');
  });
});