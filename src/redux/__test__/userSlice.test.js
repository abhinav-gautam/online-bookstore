import reducer, { initialUserState, resetUser, setUser } from '../userSlice';

it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialUserState)
})

it("should set the user", () => {
    expect(reducer(initialUserState, setUser({ name: "testUser", email: "test@test.com" }))).toEqual({
        user: { name: "testUser", email: "test@test.com" }, isAuth: true,
        isUserLoading: false,
        userErrors: "", allUsers: []
    })
})

it("should reset the user", () => {
    expect(reducer({
        user: { name: "testUser", email: "test@test.com" }, isAuth: true,
        isUserLoading: false,
        userErrors: "", allUsers: []
    }, resetUser)).toEqual(initialUserState)
})