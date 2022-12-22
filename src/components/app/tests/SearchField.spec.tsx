import { fireEvent, render, screen } from "@testing-library/react";
import SearchField from "../SearchField";
import { withTestQueryProvider } from "../../../utils/testingUtils";
import userEvent from '@testing-library/user-event'


describe('SearchField', () => {
  it('should not render dropdown when length < 3', () => {

    const user = userEvent.setup()

    const fetcher = () => [
      {
        rspo: '123',
        name: 'School123',
        projectId: 'someProject'
      }
    ]

    render(withTestQueryProvider(
      fetcher,
      <SearchField onInstitutionSelect={() => {}} onSubmit={() => {}} />
    ))

    user.type(screen.getByRole('textbox'), 'Sc')

    expect(screen.queryByText('School123')).toBeNull()
  })

  it('should render dropdown when length >= 3', async () => {

    const user = userEvent.setup()

    const fetcher = () => [
      {
        rspo: '123',
        name: 'School123',
        projectId: 'someProject'
      }
    ]

    const {container } = render(withTestQueryProvider(
      fetcher,
      <SearchField onInstitutionSelect={() => {}} onSubmit={() => {}} />
    ))

    await user.type(screen.getByRole('textbox'), 'School')

    console.log(container.innerHTML)

    expect(screen.queryByText('School123')).not.toBeNull()
  })
})
