import { render, screen } from '@testing-library/react';
import sections from '../sections';

describe('sections', () => {
  test('renders correctly', () => {
    render(<sections />);
    expect(screen.getByTestId('sections')).toBeInTheDocument();
  });
});
