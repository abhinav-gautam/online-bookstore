import { screen } from '@testing-library/react';
import { renderWithContainer } from '../../../Helpers/renderWithContainer';
import EditCategory from '../EditCategory';

describe('Edit Category Tests', () => {
    it('checks if EditCategory Modal is visible when show is true', () => {
        renderWithContainer(<EditCategory show={true} />)
        const editHeading = screen.getByText(/edit/i)
        expect(editHeading).toBeVisible();
    });

    it("checks update button is present in the modal when updateIndex is passed", () => {
        renderWithContainer(<EditCategory show={true} updateIndex={1} />)
        const updateButton = screen.getByRole("button", { name: /update/i })
        expect(updateButton).toBeVisible()
    })
});

