import { screen } from '@testing-library/react';
import { renderWithContainer } from '../../Helpers/renderWithContainer';
import Register from '../Register';

it('renders register page', () => {
    renderWithContainer(<Register />)
    const registerComponents = screen.getAllByText("Register")
    expect(registerComponents.length).toBeTruthy()
});
