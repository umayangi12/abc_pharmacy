import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

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
    <div>{items.length > 0 ? items.map((item, key) => <div key={key}>{item.Name}</div>) : ""}</div>
  );
}
