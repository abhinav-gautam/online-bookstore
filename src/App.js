/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import AdminDashboardMain from "./components/AdminDashboard/AdminDashboardMain";
import BookDetailsPage from "./components/BookDetailsPage/BookDetailsPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import FeaturedPageAuthor from "./components/FeaturedPage/FeaturedPageAuthor";
import FeaturedPageTags from "./components/FeaturedPage/FeaturedPageTags";
import { decrypt } from "./components/Helpers/encryption";
import LoadingSpinner from "./components/Helpers/LoadingSpinner";
import Message from "./components/Helpers/Message";
import resetAllState from "./components/Helpers/resetAllState";
import { unAuthReqFallback } from "./components/Helpers/unAuthReqFallback";
import FirstNavigation from "./components/HomePage/FirstNavigation";
import HomePage from "./components/HomePage/HomePage";
import SecondNavbar from "./components/HomePage/SecondNavbar";
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

// Dynamic Imports
const ContactUs = React.lazy(() => import("./components/MislPages/ContactUs"))
const Terms = React.lazy(() => import("./components/MislPages/Terms"))
const PageNotFound = React.lazy(() => import("./components/MislPages/PageNotFound"))

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
          <SecondNavbar />
          <HomePage />
        </Route>
        {/* Search Page */}
        <Route exact path="/search">
          <SecondNavbar />
          <SearchPage />
        </Route>
        {/* Book Details Page */}
        <Route exact path="/book/:bookId">
          <BookDetailsPage />
        </Route>
        {/* Category Page */}
        <Route exact path="/category/:category">
          <SecondNavbar />
          <CategoryPage />
        </Route>
        {/* Featured Page - Tag */}
        <Route exact path="/featured/:feature">
          <SecondNavbar />
          <FeaturedPageTags />
        </Route>
        {/* Featured Page - Author */}
        <Route exact path="/author/:author">
          <SecondNavbar />
          <FeaturedPageAuthor />
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
        {/* Contact Us */}
        <Route exact path="/contactus">
          <Suspense fallback={<div className="container mt-5 text-center"> <LoadingSpinner message=" Loading..." /> </div>}>
            <ContactUs />
          </Suspense>
        </Route>
        {/* Contact Us */}
        <Route exact path="/terms">
          <Suspense fallback={<div className="container mt-5 text-center"> <LoadingSpinner message=" Loading..." /> </div>}>
            <Terms />
          </Suspense>
        </Route>
        {/* Page Not Found */}
        <Route path="*">
          <Suspense fallback={<div className="container mt-5 text-center"> <LoadingSpinner message=" Loading..." /> </div>}>
            <PageNotFound />
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
