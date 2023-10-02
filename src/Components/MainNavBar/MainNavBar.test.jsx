import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils.jsx';
import NavBar from './MainNavBar.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route    
  } from 'react-router-dom';

const mockRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<NavBar />} />
  )
)


const MockNavBar = () => {
  return (
    <RouterProvider router={mockRouter} />
  )
}

describe('MainNavBar', () => {
  it('Renders a nav bar with the site logo', () => {
  renderWithProviders(<MockNavBar/>)  
    const navLogo = screen.getByRole('img');
    expect(navLogo).toBeInTheDocument();
  })      
})    