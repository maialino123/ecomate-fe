import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';

describe('Card', () => {
  it('renders card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('border-border');
  });

  it('renders with elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('shadow-lg');
  });

  it('renders with hover effect', () => {
    const { container } = render(<Card hover="lift">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-md');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('renders CardTitle as h3', () => {
    render(
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
    );
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H3');
  });
});
