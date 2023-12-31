import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import List from "./items/List";
import ViewItem from "./items/ViewItem";
import InvoiceList from "./invoices/InvoiceList";
import ViewInvoice from "./invoices/ViewInvoice";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<List/>}></Route>
        <Route path="/items/:id" element={<ViewItem/>}></Route>
        <Route path="/invoices/:id" element={<ViewInvoice/>}></Route>
        <Route path="/invoices" element={<InvoiceList/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
