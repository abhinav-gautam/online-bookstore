import { render, screen } from '@testing-library/react';
import TestComponent from '../Helpers/TestComponent';
import Register from './Register';

test('renders login page', () => {
    render(
        <TestComponent>
            <Register />
        </TestComponent>
    );
    const loginHeading = screen.getAllByText("Register")
    expect(loginHeading[0]).toBeInTheDocument();
});
