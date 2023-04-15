# OpenAI Whisper API Audio-to-Text Converter
This project is an API that utilizes OpenAI's Whisper API to convert audio files to text. The code is built with Node.js and utilizes frameworks like Express.js and Multer to handle HTTP requests and file uploading.

## How it Works
- The client sends a request with an audio file to the server.
The server extracts the audio file and creates a `FormData` object.
The `FormData` object is configured with the OpenAI Whisper model and the selected audio file.
- A `POST` request is sent to the OpenAI API to convert the audio file to text.
- The server extracts the resulting text from the OpenAI API response.
- The text is sent back to the client in the response body.
- The uploaded audio file is deleted from the server.

## Getting Started

### Prerequisites
- Node.js v14 or later
- OpenAI API Key

### Installation
- Clone the repository to your local machine.
```sh
    git clone https://github.com/KuNDevQ/OpenAI-Whisper-API.git
```

- Navigate to the project directory in your terminal.
```sh
    cd OpenAI-Whisper-API
```

- Install the project dependencies.
```sh
    npm install
```

* Set the value for the OPENAI_API_KEY environment variable:
    * For Windows: set OPENAI_API_KEY=your_api_key_here
    * For macOS or Linux: export OPENAI_API_KEY=your_api_key_here

- Start the server.
```sh
    npm start
```

- Use a tool like Postman to send a `POST` request to `http://localhost:5000/whisper`, with a `multipart/form-data` body containing an audio file.

## Customization
* Change the port number by setting the value of the `PORT` environment variable.
* Change the OpenAI model by modifying the `model` value in the `FormData` object.
* Change the audio file size limit by modifying the `limits` object in the `Multer` configuration.

## Contributors
Abdulmalik Al-Qahtani (@kundevq)
