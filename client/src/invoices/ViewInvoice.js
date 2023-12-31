import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config";
import { IoChevronBackSharp } from "react-icons/io5";


export default function ViewItem() {
  let { id } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/invoices/${id}`);
        const json = await response.json();
        setInvoices(json.data);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);
  return (
    <div>
      {!loading ? (
        <div className="flex justify-center">
          <div className="w-full lg:w-1/3">
            <div className="p-10">
              <div className="flex items-center justify-between mb-10">
                <Link to="/invoices" className="flex items-center">
                  <IoChevronBackSharp />
                  <h1 className="ml-2 font-bold">Go back</h1>
                </Link>
              </div>
              <div>
                <h1 className="font-medium"> Invoice No {invoices.ID}</h1>
              </div>
              <br />
              <div className="px-5 rounded-lg bg-slate-100">
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Name</div>
                  <div className="font-medium text-slate-800">
                    {invoices.Iname}
                  </div>
                </div>
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Mobile Number</div>
                  <div className="font-medium text-slate-800">
                    {invoices.Mobile}
                  </div>
                </div>
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Email</div>
                  <div className="font-medium text-slate-800">
                    {invoices.Email}
                  </div>
                </div>
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Address</div>
                  <div className="font-medium text-slate-800">
                    {invoices.Address}
                  </div>
                </div>{" "}
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Billing Type</div>
                  <div className="font-medium text-slate-800">
                    {invoices.Billing}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
