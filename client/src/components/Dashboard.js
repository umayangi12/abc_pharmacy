import React from "react";
import invoice from "../assets/invoice.jpg";
import items from "../assets/items.avif";
import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";

function Dashboard() {
  let navigate = useNavigate();

  const itembtn = () => {
    // Redirect to the Invoices component
    navigate("/items");
  };
  const invoicebtn = () => {
    // Redirect to the Invoices component
    navigate("/invoices");
  };
  return (
    <div>
        <Header/>
      <div className="flex items-center justify-center h-screen bg-gray-600">
        <div className="max-w-[1240px] grid md:grid-cols-2 gap-12">
          <div className="p-2 transition-all duration-300 transform bg-white shadow-lg w-60 rounded-x1 hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover h-40 rounded-x1"
              src={items}
              alt="Experts"
            />
            <div className="p-2">
              <h2 className="text-lg font-bold">Items</h2>
              <p className="text-sm text-gray-600">
                Explore a wide range of high-quality pharmaceutical products at
                our pharmacy. From over-the-counter medications to health and
                wellness essentials, we've got you covered.
              </p>
            </div>
            <div className="m-2">
              <button
                onClick={itembtn}
                className="px-3 py-1 text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-2 transition-all duration-300 transform bg-white shadow-lg w-60 rounded-x1 hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover h-40 rounded-x1"
              src={invoice}
              alt="Experts"
            />
            <div className="p-2">
              <h2 className="text-lg font-bold">Invoices</h2>
              <p className="text-sm text-gray-600">
                Explore our comprehensive list of invoices to stay organized and
                manage transactions seamlessly. Stay organized and keep track of
                your transactions with our user-friendly invoice system.
              </p>
            </div>
            <div className="m-2">
              <button
                onClick={invoicebtn}
                className="px-3 py-1 text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;
