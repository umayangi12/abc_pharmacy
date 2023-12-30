import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import SingleItem from "./SingleItem";

export default function List() {
  const [items, setItem] = useState([]);
  const [pages, setPages] = useState(0);
  const [searchParams, setSearchPArams] = useSearchParams();
  let navigate = useNavigate();

  const fetchData = async () => {
    const page = searchParams.get("page")
      ? "&page=" + searchParams.get("page")
      : "";
    try {
      const response = await fetch(`${API_URL}/items?sort=-id&size=5${page}`);
      const json = await response.json();
      setItem(json.data.items);
      setPages(json.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-1/3">
        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-bold">ABC Pharmacy</h1>
            <button className="px-3 text-white bg-orange-600 py-1.5 rounded">
              Add Items
            </button>
          </div>
          <div>
            {items.length > 0
              ? items.map((item, key) => (
                  <SingleItem key={key} item={item} fetchData={fetchData} />
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
