import { resetCart } from "../../redux/cartSlice"
import { resetUser } from "../../redux/userSlice"


const resetAllState = (dispatch) => {
    localStorage.clear()
    dispatch(resetUser())
    dispatch(resetCart())
}

export default resetAllState
