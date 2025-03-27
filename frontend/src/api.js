import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend
const SIGN_LANGUAGE_URL = "http://127.0.0.1:3000"; // Sign-language server

// Transcribe audio file
export const transcribeAudio = async (formData) => {
  // const formData = new FormData();
  // formData.append("audioFile", file);

  try {

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(`${API_BASE_URL}/api/transcribe`, formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
};

// Stitch videos
export const stitchVideos = async (videos, language) => {
  try {

    console.log("Sending videos:", videos); // Debug: Log the videos
    console.log("Sending language:", language); // Debug: Log the language

    const response = await axios.post(`${SIGN_LANGUAGE_URL}/stitch`, {
      videos,
      language,
    });

    return response.data;
  } catch (error) {
    console.error("Error stitching videos:", error);
    throw error;
  }
};