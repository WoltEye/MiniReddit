import { screen, render, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils.jsx';
import App from './App.jsx';

describe('App', () => {
  describe('It should render', () => {
    describe('The root component always when the url is valid', () => {
      test('Default path', async () => {
        await act( async () => renderWithProviders(<App />));
        const NavBars = await screen.findAllByRole('navigation');
        const Footer = await screen.findByRole('contentinfo');
        expect(NavBars.length).toStrictEqual(2);
        expect(Footer).toBeInTheDocument();
      })
    })  
  })
  // TODO: Maybe make this couldn't figure out in 5 hours
  it('Should render the error component when the url is invalid', async () => {
    renderWithProviders(<App />)
  });
})