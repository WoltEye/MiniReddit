import { renderWithProviders } from "../../../utils/test-utils";
import { screen } from "@testing-library/react";
import Error from './Error.jsx';


describe('Error', () => {
  describe('Renders the error in a correct format when the fetch request was rejected', () => {
    test('429 error')
    renderWithProviders(<Error error={{error: 429}}/>);
    const error = screen.getByText("Reddit's ratelimit exceeded please wait a couple of minutes before using this page again");
    expect(error).toBeInTheDocument();
  })
   test('Random/Made up Error', () => {
    renderWithProviders(<Error error={{name: 'iamerror343', message: 'made up error'}}/>);
    const errorName = screen.getByText('iamerror343');
    const errorMessage = screen.getByText('made up error');
    expect(errorName).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
   })
})