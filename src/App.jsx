import React from "react";
import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import DetailsPage from "./pages/Details";
// import IndexPage from "./pages/Index";
import AdoptedPetContext from "./contexts/AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Infinity,
      // cacheTime: Infinity,
      staleTime: 10000,
      cacheTime: 60000,
    },
  },
});

const Detail_Page = lazy(() => import("./pages/Details"));
const Index_Page = lazy(() => import("./pages/Index"));

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🌀</h2>
                </div>
              }
            >
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-900 via-orange-500 to-red-500">
                <Link
                  className="text-6xl text-white hover:text-gray-400"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/" element={<Index_Page />} />
                <Route path="/index" element={<Index_Page />} />
                <Route path="/home" element={<Index_Page />} />
                <Route path="/home/index" element={<Index_Page />} />
                <Route path="/details/:id" element={<Detail_Page />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
