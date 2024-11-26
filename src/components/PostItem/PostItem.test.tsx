import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostItem from './PostItem';
import { vi } from 'vitest';

describe('PostItem Component', () => {
  const mockPost = {
    id: 1,
    title: 'Test Title',
    body: 'Test body content.'
  };

  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the post title and body', () => {
      render(<PostItem post={mockPost} onDelete={mockOnDelete} />);

      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });

    it('should render the "Remove" button', () => {
      render(<PostItem post={mockPost} onDelete={mockOnDelete} />);

      const button = screen.getByRole('button', { name: /remove/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Functionality', () => {
    it('should call onDelete with the correct id when "Remove" button is clicked', () => {
      render(<PostItem post={mockPost} onDelete={mockOnDelete} />);

      const button = screen.getByRole('button', { name: /remove/i });
      fireEvent.click(button);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith(mockPost.id);
    });
  });
});
