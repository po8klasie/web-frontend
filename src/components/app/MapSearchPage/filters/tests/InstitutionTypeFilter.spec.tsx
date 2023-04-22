import { render, screen } from '@testing-library/react';
import InstitutionTypeFilter from '../InstitutionTypeFilter';

describe('InstitutionTypeFilter', () => {
  it('can call setValue with multiple institution types', () => {
    const setValue = jest.fn();
    const { rerender } = render(
      <InstitutionTypeFilter name="institution_type" value={[]} setValue={setValue} />,
    );
    screen.getByText('LO').click();
    expect(setValue).toHaveBeenLastCalledWith(['14']);

    rerender(<InstitutionTypeFilter name="institution_type" value={['14']} setValue={setValue} />);

    screen.getByText('Technikum').click();
    expect(setValue).toHaveBeenLastCalledWith(['14', '16']);
  });
  it('selects predefined institution types', () => {
    const setValue = jest.fn();
    render(<InstitutionTypeFilter name="institution_type" value={['16']} setValue={setValue} />);
    expect(screen.getByText(/LO/).closest('button').getAttribute('aria-checked')).toEqual('false');
    expect(
      screen
        .getByText(/Technikum/)
        .closest('button')
        .getAttribute('aria-checked'),
    ).toEqual('true');
  });
});
