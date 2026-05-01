import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const DashboardPage = lazy(() => import("./components/Dashboard/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center text-sm text-white/60">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
