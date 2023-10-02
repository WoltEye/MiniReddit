import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import RouterError from './RouterError.jsx';

describe('RouterError', () => {
  it('Should render a error message', () => {
    render(<RouterError/>)
    const errorCode = screen.getByText('404');
    expect(errorCode).toBeInTheDocument();
  })
});