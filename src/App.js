import LandingPage from "./Pages/LandingPage";
import Pricing from "./Pages/Pricing";
import CoinInfo from "./Pages/CoinInfo/CoinInfo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/CoinInfo/:id" element={<CoinInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
