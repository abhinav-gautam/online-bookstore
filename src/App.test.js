import { render, screen, within } from "@testing-library/react"
import App from "./App"
import TestComponent from "./components/Helpers/TestComponent"

it('checks that categories are loaded', async () => {
    render(
        <TestComponent>
            <App />
        </TestComponent>
    )
    // Finding the list that contains all the categories
    const categoriesList = screen.getByRole("list", { name: /categoriesList/i })
    // Finding list items within the list
    const categories = await within(categoriesList).findAllByRole("listitem")
    // Length og categories should be valid
    expect(categories.length).toBeTruthy()
})