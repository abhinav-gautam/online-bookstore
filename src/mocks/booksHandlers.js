import { rest } from "msw"

export const booksHandlers = [
    rest.get("http://localhost:4000/books/", (req, res, ctx) => {
        return res(ctx.json({
            status: "success",
            payload: {
                books: [
                    { _id: 1, bookTitle: "book", tags: "bestseller" },
                    { _id: 2, bookTitle: "book", tags: "bestseller" },
                    { _id: 3, bookTitle: "book", tags: "bestseller" }
                ]
            }
        }), ctx.delay())
    })
]
