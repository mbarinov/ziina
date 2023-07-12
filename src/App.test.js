import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';
import { drawInitialBackground, countRedPixels, drawImageFromSvg } from './utils/canvas';
import useDragAndDrop from './hooks/useDragAndDrop';

jest.mock('./hooks/useDragAndDrop');
jest.mock('./utils/canvas');

describe('Render App', () => {
  beforeEach(() => {
    (useDragAndDrop).mockReturnValue({
      handleDragStart: jest.fn(),
      handleDragOver: jest.fn(),
      handleDrop: jest.fn(),
    });

    (drawInitialBackground).mockImplementation(() => {});
    (countRedPixels).mockImplementation(() => 250000);
    (drawImageFromSvg).mockImplementation(() => Promise.resolve());
  });

  test('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Total Visible Pixels: 250,000')).toBeInTheDocument();
    expect(screen.getByText('Total Background Pixels: 250,000')).toBeInTheDocument();
    expect(screen.getByText('Visible percentage: 100%')).toBeInTheDocument();
  });

  test('handles onDrop correctly', async () => {
    const handleDrop = jest.fn().mockReturnValue({
      draggableElement: { querySelector: () => 'svg' },
    });

    (useDragAndDrop).mockReturnValue({
      handleDragStart: jest.fn(),
      handleDragOver: jest.fn(),
      handleDrop,
    });

    render(<App />);

    const canvas = screen.getByTestId('canvas');
    fireEvent.drop(canvas);

    await waitFor(() => expect(handleDrop).toHaveBeenCalled());
  });
});
