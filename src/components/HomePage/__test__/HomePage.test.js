import { render, screen } from '@testing-library/react';
import TestComponent from '../../Helpers/TestComponent';
import HomePage from '../HomePage';

it('renders home page', () => {
    render(
        <TestComponent>
            <HomePage />
        </TestComponent>
    );
    const categoriesComponents = screen.getAllByText("Categories")
    expect(categoriesComponents.length).toBeTruthy();
});
