import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./layouts/SideBar";
import ResultsPage from "./pages/ResultsPage";
import DetailResult from "./pages/DetailResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/result/:nameProfile" element={<DetailResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
