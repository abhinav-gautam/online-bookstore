import { rest } from "msw"

export const authorsHandlers = [
    rest.get("http://localhost:4000/authors/", (req, res, ctx) => {
        return res(ctx.json({
            status: "success",
            payload: {
                authors: [
                    { _id: 1, authorName: "author" },
                    { _id: 2, authorName: "author" },
                    { _id: 3, authorName: "author" }
                ]
            }
        }), ctx.delay())
    })
]
