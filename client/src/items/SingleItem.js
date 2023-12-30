import React from "react";
import { Link } from "react-router-dom";

export default function SingleItem({ item, fetchData }) {
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
          <button className="text-green-600">Edit</button>
          <button className="text-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}
