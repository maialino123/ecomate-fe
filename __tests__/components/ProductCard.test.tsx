import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/presentation/ProductCard';

describe('ProductCard Component', () => {
  const mockProps = {
    name: 'Test Product',
    price: '1.000.000đ',
    image: 'https://example.com/image.jpg',
  };

  it('renders product information', () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('1.000.000đ')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProps.image);
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockProps.name);
  });

  it('renders tag badge when provided', () => {
    render(<ProductCard {...mockProps} tag="Best Seller" />);

    expect(screen.getByText('Best Seller')).toBeInTheDocument();
  });

  it('does not render tag when not provided', () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.queryByText('Best Seller')).not.toBeInTheDocument();
  });

  it('calls onViewDetails when button clicked', () => {
    const handleViewDetails = jest.fn();
    render(<ProductCard {...mockProps} onViewDetails={handleViewDetails} />);

    const button = screen.getByRole('button', { name: /xem chi tiết/i });
    fireEvent.click(button);

    expect(handleViewDetails).toHaveBeenCalledTimes(1);
  });

  it('does not render button when onViewDetails not provided', () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
