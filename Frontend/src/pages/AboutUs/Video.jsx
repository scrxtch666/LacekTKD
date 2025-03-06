import { Link } from "react-router-dom";
import React from "react";
function Video() {
  return (
    <>
  <div className="bg-customWhite w-full rounded-lg">
            <iframe
              width="560"
              height="315"
              src="https://youtu.be/Dsg9SzoDNPM?si=YdfoX1vkI8eKlKf3"
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
