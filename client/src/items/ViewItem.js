import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config";

export default function ViewItem() {
  let { id } = useParams();
  const [items, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/items/${id}`);
        const json = await response.json();
        setItem(json.data);
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
                <Link to="/">
                  <h1 className="font-bold">Go back</h1>
                </Link>
              </div>
              <div className="px-5 rounded-lg bg-slate-100">
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Name</div>
                  <div className="font-medium text-slate-800">{items.Name}</div>
                </div>
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Unit Price</div>
                  <div className="font-medium text-slate-800">
                    {items.Price}
                  </div>
                </div>
                <div className="flex py-4 border-b">
                  <div className="mr-4 text-slate-400">Item Category</div>
                  <div className="font-medium text-slate-800">
                    {items.Category}
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
