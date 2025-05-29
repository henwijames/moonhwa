import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar1 } from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Trending from "./pages/Trending";

function App() {
  return (
    <Router>
      <div className="w-full bg-background text-foreground">
        <div className="container mx-auto w-full">
          <Navbar1 />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/trending" element={<Trending />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
