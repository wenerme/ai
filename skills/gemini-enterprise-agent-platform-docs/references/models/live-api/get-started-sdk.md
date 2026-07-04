This tutorial shows you how to connect to Gemini Live API by using the
Google Gen AI SDK for Python. In this tutorial, you build a real-time
multimodal application with a robust Python backend handling the API connection.

## Before you begin

Complete the following steps to set up your environment.

1. [Install Git](https://git-scm.com/downloads).
2. [Install Python 3](https://www.python.org/downloads/).

## Clone the demo app

Clone the demo app repository and navigate to that directory:

    git clone https://github.com/GoogleCloudPlatform/generative-ai.git &&
    cd generative-ai/gemini/multimodal-live-api/native-audio-websocket-demo-apps/plain-js-python-sdk-demo-app

### Project structure

The application includes the following files:

    /
    ├── main.py                 # FastAPI server and WebSocket endpoint
    ├── gemini_live.py          # Gemini Live API wrapper using Gen AI SDK
    ├── requirements.txt        # Python dependencies
    └── frontend/
        ├── index.html          # User Interface
        ├── main.js             # Application logic
        ├── gemini-client.js    # WebSocket client for backend communication
        ├── media-handler.js    # Audio/Video capture and playback
        └── pcm-processor.js    # AudioWorklet for PCM processing

## Configure environment variables

For the purposes of this demo, the only environment variable that we need to
configure is the one that defines the ID of your Google Cloud project. The following
command creates an `.env` file that sets the environment variable `PROJECT_ID`.
Replace <var translate="no">PROJECT_ID</var> with the project ID of your Google Cloud project.

    echo "PROJECT_ID=PROJECT_ID" > .env

## Run the backend server

The backend (`main.py`) handles the connection between the client and the
Gemini Live API. The entry point is a FastAPI server that exposes a WebSocket
endpoint. It accepts audio and video chunks from the frontend and forwards them
to the `GeminiLive` session. The `GeminiLive` class in `gemini_live.py` wraps
the `genai.Client` to manage the session.

    # Connects using the SDK
    async with self.client.aio.live.connect(model=self.model, config=config) as session:
        # Manages input/output queues
        await asyncio.gather(
            send_audio(),
            send_video(),
            receive_responses()
        )

To run the backend server, run the following commands:

1. Install dependencies:

       pip3 install -r requirements.txt

2. Authenticate with Google Cloud:

       gcloud auth application-default login

3. Start the server:

       python3 main.py

## Open the frontend UI and connect with Gemini

The frontend manages audio and video capture and playback. The
`gemini-client.js` file handles the WebSocket connection to the backend. It
sends base64-encoded media chunks to the backend and receives audio responses
from Gemini Live API, which are then played back to the user.

To open the frontend UI and connect with Gemini, do the following:

1. Open your browser and navigate to <http://localhost:8000>.
2. Click **Connect**.

## Interact with Gemini

Try to do the following:

- **Text input** : You can write a text message to Gemini by entering your message in the message field and clicking **Send**. Gemini responds to the message using audio.
- **Voice input** : To speak to Gemini, click **Start mic**. Gemini responds to the prompt using audio.
- **Video input** : To let Gemini see through your camera, click **Start
  camera**. You can talk to Gemini about what it sees through your camera.

## What's next

- Learn how to [configure language and voice](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice).
- Learn how to [configure Gemini capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities).
- Learn about [Gemini Live API best practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices).
