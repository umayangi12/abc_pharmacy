import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import List from "./items/List";
import ViewItem from "./items/ViewItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<List/>}></Route>
        <Route path="/items/:id" element={<ViewItem/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
