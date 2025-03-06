import { Link } from "react-router-dom";
import React from "react";
import Devider from "../pages/AboutUs/Devider";
import Info from "../pages/AboutUs/Info";
import History from "../pages/AboutUs/History";
import Video from "../pages/AboutUs/Video";
function AboutUs() {
  return (
    <>
    <div className="flex flex-col gap-5">
   <Devider />
   <Info />
   <div className="flex gap-5">
   <History />
   <Video />
   </div>
   </div>
    </>
  );
}

export default AboutUs;
