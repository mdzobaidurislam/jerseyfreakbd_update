import React from "react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import MiddleNav from "./MiddleNav";

export default function Header({ setting }) {
  return (
    <header className="header_section bg-white ">
      <TopHeader setting={setting} />
      {/* <div id="headerTops"> */}
      <MiddleNav setting={setting} />
      <Navbar setting={setting} />
      {/* </div> */}
    </header>
  );
}
