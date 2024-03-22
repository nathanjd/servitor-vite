import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ModelCard } from './model-card';

describe('<ModelCard />', () => {
    it('should render name in a heading', async () => {
        // Arrange
        const name = 'Foo';

        // Act
        render(<ModelCard name={name} />);
        await screen.findByRole('heading');

        // Assert
        expect(screen.getByRole('heading')).toHaveTextContent(name);
    });

    it('should render name in a heading sync', () => {
        // Arrange
        const name = 'Foo';

        // Act
        render(<ModelCard name={name} />);

        // Assert
        const headline = screen.getByText(name);
        expect(headline).toBeInTheDocument;
    });
});
