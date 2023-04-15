const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const multer = require('multer');
const mime = require('mime-types');

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // originalname
    }
});
const upload = multer({ storage: storage });
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// Step 1: Set up middleware for CORS and request body parsing
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Step 2: Create an endpoint for the whisper transcription request
app.post('/whisper', upload.single('audio'), async (req, res) => {
    try {
        // Step 3: Extract the audio file path from the request body
        const audioFile = req.file;
        // Step 4: Validate that the audio file path is provided
        if (!audioFile) {
            throw new Error('Missing audioFile parameter');
        }
        // Step 5: Call the requestWhisper function to transcribe the audio
        const transcription = await requestWhisper(audioFile);
        // Step 6: Return the transcribed text as a JSON response
        res.json({ transcription });
    } catch (error) {
        console.error(`Error processing request: ${error}`);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

// Function to transcribe audio using OpenAI's Whisper API
async function requestWhisper(audioFile) {
    try {
        // Step 7: Get the file path of the audio file
        const filePath = path.join(__dirname, audioFile.path);

        // Step 8: Set the OpenAI Whisper model
        const model = 'whisper-1';

        // Step 9: Create a new FormData object and append the model and audio file to it
        const formData = new FormData();
        formData.append('model', model);
        formData.append('file', fs.createReadStream(filePath), {
            filename: audioFile.filename,
            contentType: mime.lookup(audioFile.mimetype)
        });

        // Step 10: Make a POST request to OpenAI's audio transcription API with the FormData object
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });

        // Step 11: Get the transcribed text from the response data
        const text = response.data.text;

        // Step 12: Delete the audio file from the uploads folder 
        fs.unlinkSync(filePath);
        
        // Step 13: Return the transcribed text
        return text;
    } catch (error) {
        console.error(`Error transcribing audio file: ${error}`);
        throw error;
    }
}

// Step 14: Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});