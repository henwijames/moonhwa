import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Trending from "./pages/Trending";
import ManhwaDetail from "@/pages/ManhwaDetail";
import ManhwaChapter from "./pages/ManhwaChapter";

function App() {
  return (
    <Router>
      <div className="w-full bg-background text-foreground">
        <div className="container mx-auto w-full">
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/categories" element={<Categories />} />
              <Route path="/trending" element={<Trending />} /> */}
              <Route path="/manhwa/:id" element={<ManhwaDetail />} />
              <Route
                path="/manhwa/:id/chapter/:chapter"
                element={<ManhwaChapter />}
              />
            </Routes>
          </AppLayout>
        </div>
      </div>
    </Router>
  );
}

export default App;
