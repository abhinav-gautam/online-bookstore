/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AdminDashboardMain from "./components/AdminDashboard/AdminDashboardMain";
import BookDetailsPage from "./components/BookDetailsPage/BookDetailsPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
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
import { loadWishlist } from "./redux/wishlistReducers";

function App() {
  const { books } = useSelector(state => state.books)
  const { authors } = useSelector(state => state.authors)
  const { cartItems } = useSelector(state => state.cart)
  const { wishlistItems } = useSelector(state => state.wishlist)
  const { categories } = useSelector(state => state.category)
  const { user, isAuth } = useSelector(state => state.user)

  const dispatch = useDispatch()


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
    if (!cartItems.length && isAuth) {
      dispatch(loadCart())
    }
  }, [user])

  // Loading wishlist from db
  useEffect(() => {
    if (!wishlistItems.length && isAuth) {
      dispatch(loadWishlist())
    }
  }, [user])

  return (
    <div >
      {/* First Navigation bar */}
      <FirstNavigation />

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
