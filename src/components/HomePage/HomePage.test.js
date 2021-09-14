import { render, screen } from '@testing-library/react';
import TestComponent from '../Helpers/TestComponent';
import HomePage from './HomePage';

test('renders login page', () => {
    render(
        <TestComponent>
            <HomePage />
        </TestComponent>
    );
    const loginHeading = screen.getAllByText("Categories")
    expect(loginHeading[0]).toBeInTheDocument();
});
