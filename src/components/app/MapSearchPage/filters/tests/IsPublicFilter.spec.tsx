import { render, screen } from '@testing-library/react';
import IsPublicFilter from '../IsPublicFilter';

describe('isPublicFilter', () => {
  it('markes values as unchecked correctly', async () => {
    render(<IsPublicFilter name="is_public" value={null} setValue={() => {}} />);
    expect(screen.getByText('Publiczna').getAttribute('aria-checked')).toEqual('false');
    expect(screen.getByText('Niepubliczna').getAttribute('aria-checked')).toEqual('false');
  });

  it('markes values as checked correctly', async () => {
    render(<IsPublicFilter name="is_public" value="true" setValue={() => {}} />);
    expect(screen.getByText('Publiczna').getAttribute('aria-checked')).toEqual('true');
    expect(screen.getByText('Niepubliczna').getAttribute('aria-checked')).toEqual('false');
    screen.getByText('Publiczna').click();
    expect(screen.getByText('Publiczna').getAttribute('aria-checked')).toEqual('true');
  });

  it('calls setValue with checked value', async () => {
    const setValue = jest.fn();
    render(<IsPublicFilter name="is_public" value={null} setValue={setValue} />);
    screen.getByText('Publiczna').click();
    expect(setValue).toHaveBeenCalledWith('true');
  });

  it('calls setValue with null', async () => {
    const setValue = jest.fn();
    render(<IsPublicFilter name="is_public" value="false" setValue={setValue} />);
    screen.getByText('Niepubliczna').click();
    expect(setValue).toHaveBeenCalledWith(null);
  });
});
