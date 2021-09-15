import { render, screen } from '@testing-library/react';
import TestComponent from '../../Helpers/TestComponent';
import Register from '../Register';

it('renders register page', () => {
    render(
        <TestComponent>
            <Register />
        </TestComponent>
    );
    const registerComponents = screen.getAllByText("Register")
    expect(registerComponents.length).toBeTruthy()
});
