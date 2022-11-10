import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailsPage from "./pages/Details";
import IndexPage from "./pages/Index";
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

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/index" element={<IndexPage />} />
              <Route path="/home" element={<IndexPage />} />
              <Route path="/home/index" element={<IndexPage />} />
              <Route path="/details/:id" element={<DetailsPage />} />
            </Routes>
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
