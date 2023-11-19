import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";

const Tube = ({ videoId, handleVideoComplete, title, subject, index }) => {
  const opts = {
    width: "590",
    height: "355",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      'origin': window.location.origin,
    },
  };

  return (
    <>
      <Youtube
        videoId={videoId}
        opts={opts}
        onEnd={() => handleVideoComplete(videoId, title, subject, index)}
      />
    </>
  );
};

export default Tube;
