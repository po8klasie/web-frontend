import { render, screen } from '@testing-library/react';
import TestFormProvider from '../../tests/TestFormProvider';
import IsPublicFilter from '../IsPublicFilter';

describe('isPublicFilter', () => {
  it('markes values as checked correctly', async () => {
    render(
      <TestFormProvider renderField={({ control }) => <IsPublicFilter control={control} />} />,
    );
    screen.getByText('Publiczna').click();
    expect(screen.getByText('Publiczna').getAttribute('aria-checked')).toEqual('true');
  });

  it('marks values as unchecked correctly', async () => {
    render(
      <TestFormProvider
        defaultValues={{ is_public: false }}
        renderField={({ control }) => <IsPublicFilter control={control} />}
      />,
    );

    expect(screen.getByText('Niepubliczna').getAttribute('aria-checked')).toEqual('true');

    screen.getByText('Niepubliczna').click();

    expect(screen.getByText('Niepubliczna').getAttribute('aria-checked')).toEqual('false');
  });
});
