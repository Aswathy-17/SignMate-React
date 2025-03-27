import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { transcribeAudio } from "../api";
import { getVideosFromInput } from "../utils/utils";

const TranscriptionForm = ({ onTranscription, language }) => {
  const [inputMethod, setInputMethod] = useState('text');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        const { videoList } = getVideosFromInput(transcript, language);
        onTranscription(transcript, videoList);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        // Only show error message for actual errors, not for normal stops
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          showPopupMessage('Error with speech recognition. Please try again.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onTranscription]);

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleLiveSpeech = () => {
    if (!recognitionRef.current) {
      showPopupMessage('Speech recognition is not supported in your browser');
      return;
    }

    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'audio/wav' || file.type === 'audio/mp3' || file.type === 'audio/mpeg') {
        setSelectedFile(file);
        showPopupMessage('Audio file selected successfully');
      } else {
        alert('Please upload a WAV or MP3 file');
        fileInputRef.current.value = '';
        setSelectedFile(null);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audioFile', selectedFile);

    try {
      const transcriptionResult = await transcribeAudio(formData);
      const { videoList } = getVideosFromInput(transcriptionResult.transcription, language);
      onTranscription(transcriptionResult.transcription, videoList);
      fileInputRef.current.value = '';
      setSelectedFile(null);
      showPopupMessage('Audio processed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      showPopupMessage('Error processing audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    const { videoList } = getVideosFromInput(inputText, language);
    onTranscription(inputText, videoList);
  };

  return (
    <div className="transcription-form">
      <div className="input-method-selector">
        <button
          className={`method-button ${inputMethod === 'text' ? 'active' : ''}`}
          onClick={() => setInputMethod('text')}
        >
          Text Input
        </button>
        <button
          className={`method-button ${inputMethod === 'voice' ? 'active' : ''}`}
          onClick={() => setInputMethod('voice')}
        >
          Voice Input
        </button>
      </div>

      {inputMethod === 'text' && (
        <div className="text-input-section">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
          />
          <button 
            onClick={handleTextSubmit}
            disabled={!inputText.trim()}
            className="translate-button"
          >
            Translate
          </button>
        </div>
      )}

      {inputMethod === 'voice' && (
        <div className="voice-input-container">
          <div className="voice-controls">
            <button
              className={`voice-button ${isListening ? 'recording' : ''}`}
              onClick={handleLiveSpeech}
            >
              <span className="material-icons">
                {isListening ? 'mic' : 'mic_none'}
              </span>
              {isListening ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>

          <div className="voice-status">
            {isListening ? 'Listening... Speak now' : 'Click the button to start speaking'}
          </div>

          <div className="file-upload-section">
            <p className="upload-label">Or upload an audio file (WAV or MP3)</p>
            <div className="upload-controls">
              <label className="custom-file-upload">
                <span className="material-icons">upload_file</span>
                <input
                  type="file"
                  id="audioFile"
                  accept=".wav,.mp3"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                Upload Audio File
              </label>
              <button 
                onClick={handleFileUpload}
                disabled={!selectedFile || isProcessing}
                className="translate-button"
              >
                {isProcessing ? 'Processing...' : 'Translate'}
              </button>
            </div>
            {selectedFile && (
              <div className="selected-file">
                <span className="material-icons">attachment</span>
                {selectedFile.name}
              </div>
            )}
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

TranscriptionForm.propTypes = {
  onTranscription: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default TranscriptionForm;