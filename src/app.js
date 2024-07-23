import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import Name from "./components/name/name";

import { nameContext } from "./nameContext/nameContext";
import Chat from "./components/chat/chat";
import './index.css'
const App = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Router>
        <nameContext.Provider value={{ value, setValue }}>
          <Routes>
            <Route exact element={<Welcome />} path="/" />
            <Route path="/name" element={<Name />} />
            <Route element={<Chat />} path="/chat" />
          </Routes>
        </nameContext.Provider>
      </Router>
    </>
  );
};

export default App;
