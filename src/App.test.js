import { screen, within } from "@testing-library/react"
import { setupServer } from "msw/node"
import App from "./App"
import { renderWithContainer } from './components/Helpers/renderWithContainer';
import { authorsHandlers } from "./mocks/authorsHandlers";
import { booksHandlers } from "./mocks/booksHandlers";
import { categoryHandlers } from "./mocks/categoryHandlers";

const server = setupServer(...categoryHandlers, ...booksHandlers, ...authorsHandlers)

beforeAll(() => server.listen())
afterAll(() => server.close)

it('checks that categories are loaded', async () => {
    renderWithContainer(<App />)
    // Finding the list that contains all the categories
    const categoriesList = screen.getByRole("list", { name: /categoriesList/i })
    // Finding list items within the list
    const categories = await within(categoriesList).findAllByRole("listitem")
    // Length of categories should be 3
    expect(categories.length).toBe(3)
})

it('checks that books are loaded', async () => {
    renderWithContainer(<App />)
    // Getting all add to cart buttons
    const addButtons = await screen.findAllByRole("button", { name: /add to cart/i })
    // Length of add to cart button array should be 3
    expect(addButtons.length).toBe(3)
})
it('checks that authors are loaded', async () => {
    renderWithContainer(<App />)
    // Getting all author names
    const authors = await screen.findAllByText("author")
    // Length of authors array should be 3
    expect(authors.length).toBe(3)
})