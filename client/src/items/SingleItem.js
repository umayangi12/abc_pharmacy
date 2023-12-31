import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";

export default function SingleItem({ item, fetchData }) {
  const [nameValue, setNameValue] = useState(item.Name);
  const [priceValue, setPriceValue] = useState(item.Price);
  const [categoryValue, setCategoryValue] = useState(item.Category);
  
    const openModal = () => {
      document.getElementById("new-modal-" + item.ID).classList.remove("hidden");
    };

    const closeModal = () => {
      document.getElementById("new-modal-" + item.ID).classList.add("hidden");
    };

     const completeForm = () => {
       closeModal();
       fetchData();
     };

      const updateItem = (e) => {
        e.preventDefault();
        var form = document.getElementById(`editform-${item.ID}`);
        var formData = new FormData(form);
        axios
          .patch(`${API_URL}/items/${item.ID}`, formData)
          .then((res) => completeForm(form))
          .catch((error) => console.log(error.response));
      };

       const deleteItem = () => {
         if (
           window.confirm("Are you sure you want to delete this Item?") === true
         ) {
           axios
             .delete(`${API_URL}/items/${item.ID}`)
             .then((res) => fetchData())
             .catch((error) => console.log(error.response));
         } else {
           console.log("You canceled!");
         }
       };

  return (
    <div className="p-4 mb-4 rounded-lg bg-slate-100 hover:border hover:border-orange-700">
      <div>
        <div>
          <div className="font-medium">{item.Name}</div>
          <div className="text-slate-400">{item.Price}</div>
          <div className="text-slate-400">{item.Category}</div>
        </div>
        <div className="flex mt-4 space-x-4 text-sm">
          <Link to={`/items/${item.ID}`}> View Item </Link>
          <button className="text-green-600" onClick={openModal}>
            Edit
          </button>
          <button onClick={deleteItem} className="text-red-600">
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
        id={`new-modal-${item.ID}`}
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
                  id={`editform-${item.ID}`}
                  onSubmit={updateItem}
                  action=""
                >
                  <div className="bg-white">
                    <div className="flex justify-between px-8 py-4 border-b">
                      <h1 className="font-medium">Update Item No {item.ID}</h1>
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
                          value={nameValue}
                          onChange={(e) => setNameValue(e.target.value)}
                          type="text"
                          name="Name"
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-5">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Unit Price
                        </label>
                        <input
                          value={priceValue}
                          onChange={(e) => setPriceValue(e.target.value)}
                          type="text"
                          name="Price"
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-5">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Item Category
                        </label>
                        <input
                          value={categoryValue}
                          onChange={(e) => setCategoryValue(e.target.value)}
                          type="text"
                          name="Category"
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
