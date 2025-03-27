import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ videoUrl, onEnded }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const videoElement = videoRef.current;

    const handleLoadedData = () => {
      videoElement.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    };

    // Add event listener for the 'loadeddata' event
    videoElement.addEventListener("loadeddata", handleLoadedData);

    // Set the video source
    videoElement.src = videoUrl;

    // Add event listener for the 'ended' event
    if (onEnded) {
      videoElement.addEventListener("ended", onEnded);
    }

    // Cleanup function
    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      if (onEnded) {
        videoElement.removeEventListener("ended", onEnded);
      }
    };
  }, [videoUrl, onEnded]);

  if (!videoUrl) {
    return null; // Do not render the video element if videoUrl is empty
  }

  return (
    <div id="videoContainer">
      <video ref={videoRef} id="signVideo" controls autoPlay muted>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  onEnded: PropTypes.func
};

export default VideoPlayer;