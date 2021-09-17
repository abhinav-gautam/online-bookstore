import { render, screen, fireEvent } from '@testing-library/react';
import TestComponent from '../../Helpers/TestComponent';
import Login from '../Login';

it('should render login page', () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    );
    const loginComponents = screen.getAllByText("Login")
    expect(loginComponents.length).toBeTruthy();
});

it("should check input field is working properly", () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    )
    const usernameInput = screen.getByLabelText("Username")
    fireEvent.change(usernameInput, { target: { value: "testuser" } })
    expect(usernameInput.value).toBe("testuser")
})
