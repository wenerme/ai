This tutorial shows you how to connect to Gemini Live API by using
WebSockets. In this tutorial, you build a real-time multimodal application
with a vanilla JavaScript frontend and a Python server handling the
authentication and proxying.

## Before you begin

Complete the following steps to set up your environment.

1. [Install Git](https://git-scm.com/downloads).
2. [Install Python 3](https://www.python.org/downloads/).

## Clone the demo app

Clone the demo app repository and navigate to that directory:

    git clone https://github.com/GoogleCloudPlatform/generative-ai.git &&
    cd generative-ai/gemini/multimodal-live-api/native-audio-websocket-demo-apps/plain-js-demo-app

### Project structure

The application includes the following files:

    /
    ├── server.py            # WebSocket proxy + HTTP server
    ├── requirements.txt     # Python dependencies
    └── frontend/
        ├── index.html       # UI
        ├── geminilive.js    # Gemini API client
        ├── mediaUtils.js    # Audio/video streaming
        ├── tools.js         # Custom tool definitions
        └── script.js        # App logic

## Run the backend server

The backend (`server.py`) handles the authentication and acts as a WebSocket
proxy between the client and Gemini Live API.

To run the backend server, run the following commands:

1. Install dependencies:

       pip3 install -r requirements.txt

2. Authenticate with Google Cloud:

       gcloud auth application-default login

3. Start the server:

       python3 server.py

## Open the frontend UI and connect with Gemini

The frontend manages audio and video capture and playback. The
`geminilive.js` file handles the WebSocket connection to the backend.

    const client = new GeminiLiveAPI(proxyUrl, projectId, model);
    client.addFunction(toolInstance); // Add custom tools
    client.connect(accessToken); // Connect (token optional with proxy)

To open the frontend UI and connect with Gemini, do the following:

1. Open your browser and navigate to <http://localhost:8000>.
2. In the **Project ID** field, enter the ID of your Google Cloud project.
3. Click **Connect**.

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
