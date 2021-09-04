import { Route, Switch } from "react-router";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import FirstNavigation from "./components/HomePage/FirstNavigation";
import Footer from "./components/HomePage/Footer";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/Search Page/SearchPage";

function App() {
  return (
    <div >
      {/* First Navigation bar */}
      <FirstNavigation />

      <Switch>
        <Route exact path="/">
          {/* Homepage */}
          <HomePage />
        </Route>
        <Route exact path="/search">
          {/* Search Page */}
          <SearchPage />
        </Route>
        <Route exact path="/:category">
          {/* Category Page */}
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
