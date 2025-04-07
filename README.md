# SignMate - Sign Language Translation Tool

SignMate is a comprehensive toolkit for American Sign Language (ASL) and Indian Sign Language (ISL) translation. It provides a user-friendly interface for converting text and voice input into sign language videos.

## Features

- **Multiple Input Methods**
  - Text input
  - Voice recording
  - Audio file upload (WAV/MP3)

- **Language Support**
  - American Sign Language (ASL)
  - Indian Sign Language (ISL)

- **Real-time Processing**
  - Instant video generation
  - Live transcription
  - Video stitching

- **User Interface**
  - Modern, responsive design
  - Intuitive navigation
  - Loading indicators
  - Error handling

## Project Structure

```
SignMate-React/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── SignLanguagePage.js
│   │   │   ├── TranscriptionForm.js
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── ASL.js
│   │   │   ├── ISL.js
│   │   │   └── GetStarted.js
│   │   ├── utils/          # Utility functions
│   │   │   └── utils.js
│   │   ├── api.js          # API integration
│   │   ├── App.js          # Main application component
│   │   └── App.css         # Global styles
│   └── public/             # Static files
│
├── sign-language/          # Backend server
│   ├── server.js          # Express server
│   ├── assets/            # Video assets
│   │   ├── asl/          # ASL videos
│   │   └── isl/          # ISL videos
│   └── output/            # Generated videos
│
└── README.md              # Project documentation
```

## Components

### Frontend Components

1. **SignLanguagePage**
   - Main component for sign language translation
   - Handles video display and transcription
   - Manages state for videos and text input

2. **TranscriptionForm**
   - Text input functionality
   - Voice recording capability
   - File upload for audio
   - Converts input to sign language videos

3. **Header**
   - Site navigation
   - Logo display
   - Consistent header across pages

4. **Footer**
   - Site information
   - Additional links
   - Copyright information

### Pages

1. **Home**
   - Landing page
   - Welcome section
   - Get started button
   - Service overview

2. **ASL**
   - American Sign Language page
   - ASL-specific configuration
   - Translation interface

3. **ISL**
   - Indian Sign Language page
   - ISL-specific configuration
   - Translation interface

4. **GetStarted**
   - Introduction page
   - Service description
   - Links to ASL and ISL pages

## Backend

### Server Features

1. **Video Processing**
   - Video stitching using FFmpeg
   - Multiple language support
   - File management

2. **API Endpoints**
   - `/stitch`: Video combination
   - `/delete`: File management
   - Static file serving

3. **File Management**
   - Video storage
   - Asset organization
   - Output handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- FFmpeg installed on the system

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SignMate-React.git
   cd SignMate-React
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../sign-language
   npm install
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

6. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Usage

1. **Text Input**
   - Enter text in the input field
   - Click "Translate" to generate sign language videos

2. **Voice Input**
   - Click "Start Recording" to begin voice input
   - Speak clearly into your microphone
   - Click "Stop Recording" when finished

3. **File Upload**
   - Click "Upload Audio File"
   - Select a WAV or MP3 file
   - Click "Translate" to process

4. **View Results**
   - Generated videos appear in the video player
   - Transcription is displayed below
   - Videos can be played, paused, and controlled

## Technologies Used

- **Frontend**
  - React
  - React Router
  - WebSpeech API
  - Axios
  - CSS3

- **Backend**
  - Node.js
  - Express
  - FFmpeg
  - File System

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FFmpeg for video processing
- WebSpeech API for voice recognition
- React community for components and tools
