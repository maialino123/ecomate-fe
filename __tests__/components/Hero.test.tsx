import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/presentation/Hero';

describe('Hero Component', () => {
  it('renders title and subtitle', () => {
    render(
      <Hero
        title="Test Title"
        subtitle="Test subtitle description"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle description')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(
      <Hero
        badge="NEW FEATURE"
        title="Title"
        subtitle="Subtitle"
      />
    );

    expect(screen.getByText('NEW FEATURE')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    render(
      <Hero
        title="Title"
        subtitle="Subtitle"
      />
    );

    expect(screen.queryByText('NEW FEATURE')).not.toBeInTheDocument();
  });

  it('renders stats when provided', () => {
    const stats = [
      { value: '50K', label: 'Users' },
      { value: '99', label: 'Rating' },
    ];

    render(
      <Hero
        title="Title"
        subtitle="Subtitle"
        stats={stats}
      />
    );

    expect(screen.getByText('50K')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Hero
        title="Title"
        subtitle="Subtitle"
      >
        <button>CTA Button</button>
      </Hero>
    );

    expect(screen.getByRole('button', { name: 'CTA Button' })).toBeInTheDocument();
  });

  it('applies correct variant className', () => {
    const { container } = render(
      <Hero
        title="Title"
        subtitle="Subtitle"
        variant="gradient"
      />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-br');
  });
});
