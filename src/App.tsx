import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const DashboardPage = lazy(() => import("./components/Dashboard/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
