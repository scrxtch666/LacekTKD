import { Link } from "react-router-dom";
import React from "react";
import Info from "../pages/AboutUs/Info";
import History from "../pages/AboutUs/History";
import Video from "../pages/AboutUs/Video";
import Review from "../pages/AboutUs/Review";
function AboutUs() {
  return (
    <>
      <div className="devider">náš oddíl</div>
      <Info />
      <div className="flex gap-5">
        <History />
        <Video />
      </div>
      <Review />
    </>
  );
}

export default AboutUs;
