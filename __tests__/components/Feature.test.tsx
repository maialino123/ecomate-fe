import { render, screen } from '@testing-library/react';
import { Feature } from '@/components/presentation/Feature';

describe('Feature Component', () => {
  const mockProps = {
    icon: '✨',
    title: 'Premium Quality',
    description: 'High quality products from international brands',
  };

  it('renders feature information', () => {
    render(<Feature {...mockProps} />);

    expect(screen.getByText('✨')).toBeInTheDocument();
    expect(screen.getByText('Premium Quality')).toBeInTheDocument();
    expect(screen.getByText('High quality products from international brands')).toBeInTheDocument();
  });

  it('renders with different icon', () => {
    render(<Feature {...mockProps} icon="🎁" />);

    expect(screen.getByText('🎁')).toBeInTheDocument();
  });

  it('has correct structure', () => {
    const { container } = render(<Feature {...mockProps} />);

    expect(container.querySelector('h3')).toHaveTextContent('Premium Quality');
    expect(container.querySelector('p')).toHaveTextContent('High quality products');
  });
});
