import React, { useState } from "react";
import PropTypes from "prop-types";
import TranscriptionForm from "./TranscriptionForm";
import { stitchVideos } from "../api";
import "../App.css";

const SignLanguagePage = ({ language, title }) => {
  const [videoList, setVideoList] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [stitchedVideoUrl, setStitchedVideoUrl] = useState(null);
  const [currentTranscription, setCurrentTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranscription = async (transcription, videoList) => {
    setVideoList(videoList);
    setCurrentVideoIndex(0);
    setStitchedVideoUrl(null);
    setCurrentTranscription(transcription);
    
    try {
      setIsLoading(true);
      const response = await stitchVideos(videoList, language);
      setStitchedVideoUrl(response.url);
    } catch (error) {
      console.error("Error stitching videos:", error);
      setStitchedVideoUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoEnd = () => {
    if (!stitchedVideoUrl && currentVideoIndex < videoList.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className={`generate-${language}-page`}>
      <h1 className="page-title">{title}</h1>
      
      <div className="content-container">
        <div className="input-section">
          <TranscriptionForm 
            onTranscription={handleTranscription} 
            language={language}
          />
        </div>

        <div className="translation-section">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="video-container">
              {stitchedVideoUrl ? (
                <video
                  src={stitchedVideoUrl}
                  controls
                  autoPlay
                  className="video-player"
                />
              ) : videoList.length > 0 ? (
                <video
                  key={currentVideoIndex}
                  src={videoList[currentVideoIndex]}
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                  className="video-player"
                />
              ) : null}
            </div>
          )}

          {currentTranscription && (
            <div className="transcription-display">
              <h3>Transcription</h3>
              <p>{currentTranscription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SignLanguagePage.propTypes = {
  language: PropTypes.oneOf(['asl', 'isl']).isRequired,
  title: PropTypes.string.isRequired,
};

export default SignLanguagePage; 