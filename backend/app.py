from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from preprocess import preprocess_audio, reduce_noise
from transcribe import transcribe_audio

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'm4a'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/transcribe', methods=['POST'])
def upload():
    if "audioFile" not in request.files:
        print("No file uploaded")
        return jsonify({"error": "No file uploaded", "transcription": ""}), 400

    file = request.files["audioFile"]

    if file.filename == "":
        print("No file selected")
        return jsonify({"error": "No file selected", "transcription": ""}), 400

    if not allowed_file(file.filename):
        print("Invalid file type")
        return jsonify({"error": "Invalid file type. Allowed types: wav, mp3, ogg, m4a", "transcription": ""}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    print(f"File saved at: {file_path}")

    try:
        processed_file = preprocess_audio(file_path)
        processed_file = reduce_noise(processed_file)
        transcription, words = transcribe_audio(processed_file)

        # Clean up the uploaded file
        os.remove(file_path)

        return jsonify({"transcription": transcription, "words": words}), 200
    except Exception as e:
        # Clean up the uploaded file in case of error
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e), "transcription": ""}), 500

if __name__ == '__main__':
    app.run(debug=True)
