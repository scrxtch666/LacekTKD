import { Link } from "react-router-dom";
import React from "react";
import Devider from "../pages/AboutUs/Devider";
import Info from "../pages/AboutUs/Info";

function AboutUs() {
  return (
    <>
    <div className="flex flex-col gap-5">
   <Devider />
   <Info />
   </div>
    </>
  );
}

export default AboutUs;
