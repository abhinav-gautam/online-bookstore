import CategorySidebar from "./components/HomePage/CategorySidebar";
import FeaturedAuthors from "./components/HomePage/FeaturedAuthors";
import FeaturedBooks from "./components/HomePage/FeaturedBooks";
import FirstNavigation from "./components/HomePage/FirstNavigation";
import Footer from "./components/HomePage/Footer";
import HomeCarousel from "./components/HomePage/HomeCarousel";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div >
      {/* First Navigation bar */}
      <FirstNavigation />

      {/* Homepage */}
      <HomePage />

      <Footer />
    </div>
  );
}

export default App;
