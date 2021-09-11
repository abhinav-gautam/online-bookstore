import { resetCart } from "../../redux/cartSlice"
import { resetUser } from "../../redux/userSlice"
import { resetWishlist } from "../../redux/wishlistSlice"

const resetAllState = (dispatch) => {
    localStorage.clear()
    dispatch(resetUser())
    dispatch(resetCart())
    dispatch(resetWishlist())
}

export default resetAllState
