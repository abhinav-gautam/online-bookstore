import { rest } from "msw"

export const categoryHandlers = [
    rest.get("http://localhost:4000/category/", (req, res, ctx) => {
        return res(ctx.json({
            status: "success",
            payload: {
                categories: [
                    { _id: 1, categoryName: "cat" },
                    { _id: 2, categoryName: "cat" },
                    { _id: 3, categoryName: "cat" }
                ]
            }
        }), ctx.delay())
    })
]
