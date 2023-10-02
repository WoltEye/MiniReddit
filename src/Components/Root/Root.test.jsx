import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils.jsx';
import Root from './Root.jsx';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route    
    } from 'react-router-dom';
  
  const mockRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} />
    )
  )
  
  
  const MockRoot = () => {
    return (
      <RouterProvider router={mockRouter} />
    )
  }


describe('Root', () => {
it('Renders both navbars', () => {
  renderWithProviders(<MockRoot/>);
  const navBar = screen.getAllByRole('navigation');
  expect(navBar.length).toStrictEqual(2);
})
it('the footer', () => {
  renderWithProviders(<MockRoot />);
  // contentinfo = footer acccording to react testing library
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
})
});