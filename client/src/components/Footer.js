import React from 'react'
import {MdEmail } from "react-icons/md";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="max-w-[2480px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-gray-500">
      <div>
        <h1 className="w-full text-3xl font-bold text-white">
          ABC Pharmacy
        </h1>
        <p className="py-4">
          Welcome to ABC Pharmacy, where your health is our priority. As your
          trusted health partner, we are dedicated to providing top-notch
          pharmaceutical services, personalized care, and a wide range of
          quality products.{" "}
        </p>
        <div className="flex md:w-[75%] my-6 justify-between">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <MdEmail size={30} />
        </div>
      </div>
      <div className="flex justify-between mt-6 lg:col-span-2">
        <div>
          <h6 className="font-medium text-gray-400">Quick Access</h6>
          <ul>
            <li className="py-2 text-sm">Home</li>
            <li className="py-2 text-sm">Item</li>
            <li className="py-2 text-sm">Invoice</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Support</h6>
          <ul>
            <li className="py-2 text-sm">Doctors</li>
            <li className="py-2 text-sm">Reviews</li>
            <li className="py-2 text-sm">Blogs</li>
          </ul>
        </div> 
        <div>
          <h6 className="font-medium text-gray-400">Legal</h6>
          <ul>
            <li className="py-2 text-sm">Claim</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div> 
        <div>
          <h6 className="font-medium text-gray-400">Company</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="py-2 text-sm">Careers</li>
            <li className="py-2 text-sm">Policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer
