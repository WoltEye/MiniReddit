import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils.jsx';
import Footer from './Footer.jsx';
import store from '../../App/store.js';
import { Provider } from 'react-redux';

describe('Footer', () => {
  it('Renders a footer with a text "Made by Eetu Mäenpää"', async () => {
    renderWithProviders(<Footer />); 
    const targetText = screen.getByText('Made by Eetu Mäenpää');
    expect(targetText).toBeInTheDocument();
  })
});