import { rest } from "msw";
import { decrypt, encrypt } from "../../helpers/encryption";

const baseURL = "http://localhost:4000/users"
export const usersHandlers = [
    rest.post(`${baseURL}/login`, (req, res, ctx) => {
        const user = decrypt(req.body.user);
        if (user.username === "testuser") {
            if (user.password === "testuser") {
                return res(ctx.json({
                    status: "success",
                    token: "dummy_token",
                    user: encrypt({ username: "testuser", role: "user" })
                }))
            } else {
                return res(ctx.json({ status: "failed", message: "invalid password" }), ctx.delay())
            }
        } else {
            return res(ctx.json({ status: "failed", message: "invalid username" }), ctx.delay())
        }
    }),
    rest.put(`${baseURL}/update`, (req, res, ctx) => {
        const user = decrypt(req.body.user)
        console.log(user);
        return res(ctx.json({
            status: "success",
            message: "user updated",
            user
        }))
    })
]