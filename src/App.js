import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemeExplorer from "./pages/MemeExplorer";
import MemeUpload from "./pages/MemeUpload";
import MemeDetails from "./pages/MemeDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import UserProfile from "./pages/UserProfile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ThemeProvider> {/* ThemeProvider must wrap everything */}
      <div className="flex flex-col min-h-screen w-full"> {/* Ensure full width */}
        <Router>
          <Navbar />
          <div className="flex-grow w-full min-h-[calc(100vh-64px)] overflow-auto"> {/* Fix overflow & height */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<MemeExplorer />} />
              <Route path="/upload" element={<MemeUpload />} />
              <Route path="/meme/:id" element={<MemeDetails />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer className="mt-auto w-full" /> {/* Footer stays at the bottom */}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
