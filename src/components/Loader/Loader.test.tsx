import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  describe('Rendering', () => {
    it('should render the loader with the appropriate role', () => {
      render(<Loader />);
      const loader = screen.getByRole('status');
      expect(loader).toBeInTheDocument();
    });

    it('should have a visible spinner', () => {
      render(<Loader />);
      const spinner = screen.getByRole('status').querySelector('div');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should include an accessible loading message', () => {
      render(<Loader />);
      const srText = screen.getByText('Loading...');
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveClass('sr-only');
    });
  });
});
