import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import SingleInvoice from "./SingleInvoice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoChevronBackSharp } from "react-icons/io5";

export default function InvoiceList() {
  const [invoices, setInvoice] = useState([]);
  const [pages, setPages] = useState(0);
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();

  const fetchData = async () => {
    const page = searchParams.get("page")
      ? "&page=" + searchParams.get("page")
      : "";
    try {
      const response = await fetch(
        `${API_URL}/invoices?sort=-id&size=5${page}`
      );
      const json = await response.json();
      setInvoice(json.data.items);
      setPages(json.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const opneModal = () => {
    document.getElementById("new-modal").classList.remove("hidden");
  };

  const closeModal = () => {
    document.getElementById("new-modal").classList.add("hidden");
  };

  const completeForm = (form) => {
    closeModal();
    form.reset();
    fetchData();
    navigate("/invoices");

    toast.success("Invoice added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleHomeClick = () => {
    // Redirect to the Invoices component
    navigate("/");
  };

  const storeInvoice = (e) => {
    e.preventDefault();
    var form = document.getElementById("newform");
    var formData = new FormData(form);

    // Validate required fields
    const name = formData.get("Iname");
    const mobile = formData.get("Mobile");
    const email = formData.get("Email");
    const address = formData.get("Address");
    const billingType = formData.get("Billing");

    if (!name || !mobile || !email || !address || !billingType) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone number validation regex (assuming it's a 10-digit number)
    const phoneNumberRegex = /^\d{10}$/;

    const emailaddress = formData.get("Email");
    const phoneNumber = formData.get("Mobile");

    if (!emailRegex.test(emailaddress)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    axios
      .post(`${API_URL}/invoices`, formData)
      .then((res) => completeForm(form))
      .catch((error) => {
        console.log(error.response);

        toast.error("Error adding invoice. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  let myPage = searchParams.get("page") ? searchParams.get("page") : 0;

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <div className="w-full lg:w-1/3 ">
        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center justify-between mb-0">
              <Link to="/dashboard" className="flex items-center">
                <IoChevronBackSharp />
                <h1 className="ml-2 font-bold">Go back</h1>
              </Link>
            </div>
            {/* <h1 className="font-bold">ABC Pharmacy</h1> */}
            <button
              className="px-3 text-white bg-orange-600 py-1.5 rounded"
              onClick={handleHomeClick}
            >
              Home
            </button>

            <button
              className="px-3 text-white bg-orange-600 py-1.5 rounded"
              onClick={opneModal}
            >
              Add invoices
            </button>
          </div>
          <div>
            {invoices.length > 0
              ? invoices.map((invoice, key) => (
                  <SingleInvoice
                    key={key}
                    invoice={invoice}
                    fetchData={fetchData}
                  />
                ))
              : "No invoices available."}
          </div>
          <div className="mt-10">
            {Array.from({ length: pages }, (_, index) => index + 1).map(
              (pg, key) => (
                <Link
                  key={key}
                  className={`border px-3 py-1 mr-3 ${
                    myPage === key ? "bg-orange-600 text-orange-100" : ""
                  }`}
                  to={`?page=${key}`}
                >
                  {key + 1}
                </Link>
              )
            )}
          </div>
          {/* Modal Start */}
          <div
            className="relative z-10 hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            id="new-modal"
          >
            <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70">
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-start justify-center text-center min-h-screenpt-4 sm:block sm:p-0">
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                  </span>
                  <div className="relative inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg">
                    <form id="newform" action="">
                      <div className="bg-white">
                        <div className="flex justify-between px-8 py-4 border-b">
                          <h1 className="font-medium">Create new Invoice</h1>
                          <button type="button" onClick={closeModal}>
                            Close
                          </button>
                        </div>
                        <div className="px-8 py-8">
                          <div className="mb-5">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                              Name
                            </label>
                            <input
                              type="text"
                              name="Iname"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              required
                            />
                          </div>
                          <div className="mb-5">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              name="Mobile"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              required
                            />
                          </div>
                          <div className="mb-5">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                              Email
                            </label>
                            <input
                              type="text"
                              name="Email"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              required
                            />
                          </div>
                          <div className="mb-5">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                              Address
                            </label>
                            <input
                              type="text"
                              name="Address"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              required
                            />
                          </div>
                          <div className="mb-5">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                              Billing Type
                            </label>
                            <input
                              type="text"
                              name="Billing"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              required
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={storeInvoice}
                              type="submit"
                              className="text-white bg-blue-500 py-1.5 px-4 rounded"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal End */}
        </div>
      </div>
    </div>
  );
}
