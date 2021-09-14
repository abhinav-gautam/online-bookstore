import { render, screen } from '@testing-library/react';
import TestComponent from '../Helpers/TestComponent';
import Login from './Login';

test('renders login page', () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    );
    const loginHeading = screen.getAllByText("Login")
    expect(loginHeading[0]).toBeInTheDocument();
});
