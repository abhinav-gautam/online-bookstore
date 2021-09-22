import { screen } from '@testing-library/react';
import { renderWithContainer } from '../../Helpers/renderWithContainer';
import HomePage from '../HomePage';

it('renders home page', () => {
    renderWithContainer(<HomePage />)
    const categoriesComponents = screen.getAllByText("Categories")
    expect(categoriesComponents.length).toBeTruthy();
});

