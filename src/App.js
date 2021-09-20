/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import AdminDashboardMain from "./components/AdminDashboard/AdminDashboardMain";
import BookDetailsPage from "./components/BookDetailsPage/BookDetailsPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import { decrypt } from "./components/Helpers/encryption";
import Message from "./components/Helpers/Message";
import resetAllState from "./components/Helpers/resetAllState";
import { unAuthReqFallback } from "./components/Helpers/unAuthReqFallback";
import FirstNavigation from "./components/HomePage/FirstNavigation";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import SearchPage from "./components/SearchPage/SearchPage";
import UserDashboardMain from "./components/UserDashboard/UserDashboardMain";
import { getAuthors } from "./redux/authorsReducers";
import { getBooks } from "./redux/booksReducers";
import { loadCart } from "./redux/cartReducers";
import { getCategories } from "./redux/categoryReducers";
import { setError } from "./redux/errorSlice";
import { getUsers } from "./redux/userReducers";
import { setUser } from "./redux/userSlice";
import { loadWishlist } from "./redux/wishlistReducers";

function App() {
  const { books, booksError } = useSelector(state => state.books)
  const { authors } = useSelector(state => state.authors)
  const { cartItems, cartError } = useSelector(state => state.cart)
  const { wishlistItems, wishlistError } = useSelector(state => state.wishlist)
  const { categories, categoryError } = useSelector(state => state.category)
  const { user, isAuth, allUsers, userErrors } = useSelector(state => state.user)
  const { error } = useSelector(state => state.error)

  const dispatch = useDispatch()
  const history = useHistory()


  // Loading categories from db 
  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories())
    }
  }, []);

  // Loading books from db 
  useEffect(() => {
    if (!books.length) {
      dispatch(getBooks())
    }
  }, []);

  // Loading authors from db
  useEffect(() => {
    if (!authors.length) {
      dispatch(getAuthors())
    }
  }, []);

  // Loading cart from db
  useEffect(() => {
    if (!cartItems.length && isAuth && user.role === "user") {
      dispatch(loadCart())
    }
  }, [user])

  // Loading wishlist from db
  useEffect(() => {
    if (!wishlistItems.length && isAuth && user.role === "user") {
      dispatch(loadWishlist())
    }
  }, [user])

  // Loading all users from db
  useEffect(() => {
    if (!allUsers.length && isAuth && user.role === "admin") {
      dispatch(getUsers())
    }
  }, [user])

  // For user session and unauth access
  useEffect(() => {
    let storedUser = localStorage.getItem("user")
    try {
      storedUser = decrypt(storedUser)
    } catch (err) {
      unAuthReqFallback(dispatch, history)
    }
    const token = localStorage.getItem("token")
    if (storedUser && token) {
      dispatch(setUser(storedUser))
    }
  }, []);

  // For session expired and token not available errors
  useEffect(() => {
    if (["jwt expired", "token not available"].indexOf(userErrors || cartError || wishlistError || booksError || categoryError) >= 0) {
      resetAllState(dispatch)
      dispatch(setError("Session expired. Please login again."))
      history.push("/")
    }
  }, [userErrors, cartError, wishlistError, booksError, categoryError]);

  return (
    <div >
      {
        error && <Message message={error} variant="danger" />
      }
      {/* First Navigation bar */}
      <FirstNavigation />

      {/* Account Blocked Alert */}
      {
        user.status === "blocked" &&
        <div className={`alert alert-danger text-center p-0`} role="alert">
          Your account is blocked. Contact Administrator to unblock and continue shopping.
        </div>
      }

      <Switch>
        {/* Homepage */}
        <Route exact path="/">
          <HomePage />
        </Route>
        {/* Search Page */}
        <Route exact path="/search">
          <SearchPage />
        </Route>
        {/* Book Details Page */}
        <Route exact path="/book/:bookId">
          <BookDetailsPage />
        </Route>
        {/* Category Page */}
        <Route exact path="/category/:category">
          <CategoryPage />
        </Route>
        {/* Login */}
        <Route exact path="/login">
          <Login />
        </Route>
        {/* Register */}
        <Route exact path="/register">
          <Register />
        </Route>
        {/* Userdashboard */}
        <Route path="/userdashboard">
          <UserDashboardMain />
        </Route>
        {/* Amdindashboard */}
        <Route path="/admindashboard">
          <AdminDashboardMain />
        </Route>
      </Switch>


    </div>
  );
}

export default App;
