import { render, screen } from '@testing-library/react';
import TestComponent from '../../../Helpers/TestComponent';
import EditCategory from '../EditCategory';

describe('Edit Category Tests', () => {
    it('checks if EditCategory Modal is visible when show is true', () => {
        render(
            <TestComponent>
                <EditCategory show={true} />
            </TestComponent>
        );
        const editHeading = screen.getByText(/edit/i)
        expect(editHeading).toBeVisible();
    });

    it("checks update button is present in the modal when updateIndex is passed", () => {
        render(
            <TestComponent>
                <EditCategory show={true} updateIndex={1} />
            </TestComponent>
        )
        const updateButton = screen.getByRole("button", { name: /update/i })
        expect(updateButton).toBeVisible()
    })
});

