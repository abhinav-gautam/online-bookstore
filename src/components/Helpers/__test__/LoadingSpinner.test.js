import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

it('checks loading spinner renders correct message', () => {
    render(<LoadingSpinner message=" Loading" />)
    expect(screen.getByText(/loading/i)).toBeVisible()
});
