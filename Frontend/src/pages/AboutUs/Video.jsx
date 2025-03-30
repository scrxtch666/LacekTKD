import { Link } from "react-router-dom";
import React from "react";
function Video() {
  return (
    <>
  <div className="bg-customWhite w-full rounded-lg">
            <iframe
              width="560"
              height="315"
              src="https://youtu.be/u-XdW4NbmBM?si=eVoz1lg1LhjucnR_"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto max-h-64 w-full rounded-lg"
            ></iframe>
          </div>
    </>
  );
}

export default Video;
