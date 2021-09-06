import { Route, Switch } from "react-router";
import BookDetailsPage from "./components/BookDetailsPage/BookDetailsPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import FirstNavigation from "./components/HomePage/FirstNavigation";
import Footer from "./components/HomePage/Footer";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
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
        {/* Register */}
      </Switch>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
