import { setError } from "../../redux/errorSlice"
import resetAllState from "./resetAllState"

export const unAuthReqFallback = (dispatch, history) => {
    resetAllState(dispatch)
    dispatch(setError("Unauthorized access detected. Please login again."))
    history.push("/")
}