import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import List from "./items/List";
import ViewItem from "./items/ViewItem";
import InvoiceList from "./invoices/InvoiceList";
import ViewInvoice from "./invoices/ViewInvoice";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Home/>
              <AboutUs/>
              <Services/>
              <Footer/>
              
            </div>
          }
        />
        <Route path="/items/:id" element={<ViewItem />}></Route>
        <Route path="/invoices/:id" element={<ViewInvoice />}></Route>
        <Route path="/invoices" element={<InvoiceList />}></Route>
        <Route path="/items" element={<List />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
