import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleInvoice({ invoice, fetchData }) {
  const [inameValue, setInameValue] = useState(invoice.Iname);
  const [mobileValue, setMobileValue] = useState(invoice.Mobile);
  const [emailValue, setEmailValue] = useState(invoice.Email);
  const [addressValue, setAddressValue] = useState(invoice.Address);
  const [billingValue, setBillingValue] = useState(invoice.Billing);

  const openModal = () => {
    document
      .getElementById("new-modal-" + invoice.ID)
      .classList.remove("hidden");
  };

  const closeModal = () => {
    document.getElementById("new-modal-" + invoice.ID).classList.add("hidden");
  };

  const completeForm = () => {
    closeModal();
    fetchData();
    toast.success("Invoice updated successfully!", {
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

  const updateInvoice = (e) => {
    e.preventDefault();
    var form = document.getElementById(`editform-${invoice.ID}`);
    var formData = new FormData(form);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone number validation regex (assuming it's a 10-digit number)
    const phoneNumberRegex = /^\d{10}$/;

    const email = formData.get("Email");
    const phoneNumber = formData.get("Mobile");

    if (!emailRegex.test(email)) {
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
      .patch(`${API_URL}/invoices/${invoice.ID}`, formData)
      .then((res) => completeForm(form))
      .catch((error) => {
        console.log(error.response);

        toast.error("Error updating invoice. Please try again.", {
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

  const deleteInvoice = () => {
    if (
      window.confirm("Are you sure you want to delete this Invoice?") === true
    ) {
      axios
        .delete(`${API_URL}/invoices/${invoice.ID}`)
        .then((res) => {
          fetchData();

          toast.success("Invoice deleted successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.log(error.response);

          toast.error("Error deleting invoice. Please try again.", {
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
    } else {
      console.log("You canceled!");
    }
  };

  return (
    <div className="p-4 mb-4 rounded-lg bg-slate-100 hover:border hover:border-orange-700">
      <ToastContainer />
      <div>
        <div>
          <div className="font-medium">{invoice.Iname}</div>
          <div className="text-slate-400">{invoice.Mobile}</div>
          <div className="text-slate-400">{invoice.Email}</div>
          <div className="text-slate-400">{invoice.Address}</div>
          <div className="text-slate-400">{invoice.Billing}</div>
        </div>
        <div className="flex mt-4 space-x-4 text-sm">
          <Link to={`/invoices/${invoice.ID}`}> View Invoice </Link>
          <button className="text-green-600" onClick={openModal}>
            Edit
          </button>
          <button onClick={deleteInvoice} className="text-red-600">
            Delete
          </button>
        </div>
      </div>
      {/* Modal Start */}
      <div
        className="relative z-10 hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        id={`new-modal-${invoice.ID}`}
      >
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-start justify-center text-center min-h-screenpt-4 sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203
              </span>
              <div className="relative inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg">
                <form
                  id={`editform-${invoice.ID}`}
                  onSubmit={updateInvoice}
                  action=""
                >
                  <div className="bg-white">
                    <div className="flex justify-between px-8 py-4 border-b">
                      <h1 className="font-medium">
                        Update Invoice No {invoice.ID}
                      </h1>
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
                          value={inameValue}
                          onChange={(e) => setInameValue(e.target.value)}
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
                          value={mobileValue}
                          onChange={(e) => setMobileValue(e.target.value)}
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
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
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
                          value={addressValue}
                          onChange={(e) => setAddressValue(e.target.value)}
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
                          value={billingValue}
                          onChange={(e) => setBillingValue(e.target.value)}
                          type="text"
                          name="Billing"
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="text-white bg-green-600 py-1.5 px-4 rounded"
                        >
                          Update
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
  );
}
