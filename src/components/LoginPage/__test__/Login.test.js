import { screen, fireEvent } from '@testing-library/react';
import { renderWithContainer } from '../../Helpers/renderWithContainer';
import Login from '../Login';
import { setupServer } from 'msw/node';
import { act } from 'react-dom/test-utils';
import { usersHandlers } from '../../../mocks/usersHandler';

const login = (username, password) => {
    // Finding username input field and giving incorrect username
    const usernameInput = screen.getByLabelText("Username")
    fireEvent.change(usernameInput, { target: { value: username } })
    // Finding passowrd input field and giving incorrect password
    const passwordInput = screen.getByLabelText("Password")
    fireEvent.change(passwordInput, { target: { value: password } })
    // Finding and clicking on login button
    const loginButton = screen.getByRole("button", { name: /login/i })
    fireEvent.click(loginButton)
}

describe('Login Tests', () => {
    const server = setupServer(...usersHandlers)

    beforeAll(() => server.listen())
    afterAll(() => server.close)

    it('should render login page', () => {
        // Rendering login component
        renderWithContainer(<Login />)
        // Finding all the components with login text
        const loginComponents = screen.getAllByText("Login")
        // There must be some elements with login text
        expect(loginComponents.length).toBeTruthy();
    });

    it("should check input field is working properly", () => {
        // Rendering login component
        renderWithContainer(<Login />)
        // Finding username field and firing change event
        const usernameInput = screen.getByLabelText("Username")
        fireEvent.change(usernameInput, { target: { value: "testuser" } })
        // The change should be reflected in the input field
        expect(usernameInput.value).toBe("testuser")
    })

    it("should check proper error message is displayed when fields are empty", async () => {
        // Rendering login component
        renderWithContainer(<Login />)
        // Finding and clicking on login button
        const loginButton = screen.getByRole("button", { name: /login/i })
        fireEvent.click(loginButton)
        // Finding alert msg with required text
        const reqAlert = await screen.findAllByText(/required/i)
        // Two alert messages must be there for username and password
        expect(reqAlert.length).toBe(2)
    })

    it("should check for invalid username error", async () => {
        // Rendering login component
        renderWithContainer(<Login />)
        // Logging in
        login("something", "something")
        // There must be invalid username alert
        expect(await screen.findByText(/invalid username/i)).toBeInTheDocument()
    })

    it("should check for invalid password error", async () => {
        // Rendering login component
        renderWithContainer(<Login />)
        // Logging in
        login("testuser", "something")
        // There must be invalid username alert
        expect(await screen.findByText(/invalid password/i)).toBeInTheDocument()
    })

    it('should check loading spinner is visible after clicking on login', async () => {
        renderWithContainer(<Login />)
        // Logging in
        login("testuser", "testuser")
        // Finding loading spinner
        const loadingSpinner = await screen.findByText(/logging/i)
        // Expecting loading spinner is visible
        expect(loadingSpinner).toBeVisible()
    });

    it('should check token is stored in local storage after successfull login', async () => {
        // Rendering login component
        renderWithContainer(<Login />)
        // Logging in
        login("testuser", "testuser")
        // Giving delay
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000))
        })
        // Getting token from local storage
        const dummyToken = localStorage.getItem("token")
        // Token must be "dummy_token"
        expect(dummyToken).toBe("dummy_token")
    });

});