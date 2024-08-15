import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Feedpage from "./pages/Feedpage";
import Protectedroute from "./pages/Protectedroute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authpage />} />

        <Route element={<Protectedroute/>}>
        <Route path="/home" element={<Feedpage />} />
        <Route path="/1" element={  <h1> Özel sayfa  </h1>} />
        <Route path="/2" element={  <h1> Likte sayfa  </h1>} />
        <Route path="/3" element={  <h1>Ana sayfa</h1> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
