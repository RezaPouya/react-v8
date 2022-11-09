import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "../src/pages/Details";
import { createRoot } from "react-dom/client";
import SearchParams from "./components/SearchParams";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">
          <h1>Adopt Me!</h1>
        </Link>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
          <Route path="/index" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
