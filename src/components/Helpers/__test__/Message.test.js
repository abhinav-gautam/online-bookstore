import { render, screen } from "@testing-library/react";
import Message from "../Message";

it('checks message render correct text', () => {
    render(<Message message="some message" />)
    expect(screen.getByText(/some message/i)).toBeVisible()
});
