import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { MdLocalPharmacy } from "react-icons/md";

import "./header.scss";

const Header = () => {
  const [active, setActive] = useState("navBar");

  //show navbar
  const showNavBar = () => {
    setActive("navBar activeNavBar");
  };

  //close navbar
  const removeNavBar = () => {
    setActive("navBar");
  };

  //adding bgcolor to the header
  const [transparent, setTransparent] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader");
    } else {
      setTransparent("header");
    }
  };

  window.addEventListener("scroll", addBg);

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <a href="/" className="logo">
            <h1 className="flex">
              <MdLocalPharmacy className="icon" />
              ABC Pharmacy
            </h1>
          </a>
        </div>
        <div className={active}>
          <ul className="flex navLists">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="/items" className="navLink">
                Items
              </a>
            </li>
            <li className="navItem">
              <a href="/invoices" className="navLink">
                Invoices
              </a>
            </li>
            <div className="flex headerBtns">
              <button className="btn loginBtn">
                <a href="/login">Login</a>
              </button>
              <button className="btn loginBtn">
                <a href="/register">Sign up</a>
              </button>
            </div>
          </ul>
          <div onClick={removeNavBar} className="closeNavBar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNavBar} className="toggleNavBar">
          <TbGridDots className="icon" />
        </div>
      </div>
    </section>
  );
};

export default Header;
