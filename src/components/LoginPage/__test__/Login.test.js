import { render, screen } from '@testing-library/react';
import TestComponent from '../../Helpers/TestComponent';
import Login from '../Login';

it('renders login page', () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    );
    const loginComponents = screen.getAllByText("Login")
    expect(loginComponents.length).toBeTruthy();
});
