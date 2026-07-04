This tutorial shows you how to create an agent and use the Agent Development Kit
(ADK) Streaming to enable voice and video communication. You install the ADK,
set up a basic agent that uses Google Search, and run the agent with the `adk
web` tool.

## Before you begin

This guide assumes you have experience using a terminal in Windows, macOS, or
Linux environments.

## Set up your environment and install the ADK

This section shows you how to prepare your local environment.

1. Create and activate a virtual environment. Using a virtual environment is a
   recommended practice.

       # Create the environment
       python -m venv .venv

       # Activate the environment in each new terminal
       # For macOS or Linux:
       source .venv/bin/activate
       # For Windows CMD:
       .venv\Scripts\activate.bat
       # For Windows PowerShell:
       .venv\Scripts\Activate.ps1

2. Install the ADK.

       pip install google-adk

## Create the project structure

Create the necessary directories and files for your agent.

1. Create the following folder structure with empty files:

   ![Diagram of project structure: adk-streaming folder contains app folder, which contains .env file and google_search_agent folder, which contains __init__.py and agent.py files.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/live-api/project-structure-diagram.png)
2. Add the following code to the `app/google_search_agent/agent.py` file. This
   file defines your agent's logic. You must define a `root_agent`. In the
   following code, update the `model` field with a supported model name.

       from google.adk.agents import Agent
       from google.adk.tools import google_search  # Import the tool

       root_agent = Agent(
         # A unique name for the agent.
         name="basic_search_agent",
         # The Large Language Model (LLM) that agent will use.
         # Please fill in the latest model id that supports live from
         # https://google.github.io/adk-docs/get-started/streaming/quickstart-streaming/#supported-models
         model="...",  # for example: model="gemini-live-2.5-flash-native-audio"
         # A short description of the agent's purpose.
         description="Agent to answer questions using Google Search.",
         # Instructions to set the agent's behavior.
         instruction="You are an expert researcher. You always stick to the facts.",
         # Add google_search tool to perform grounding with Google search.
         tools=[google_search]
       )

3. Add the following code to the `app/google_search_agent/__init__.py` file:

       from . import agent

## Set up the platform

To run the agent, configure it to use Google Cloud Gemini Enterprise Agent Platform.

1. Open the `.env` file located in the `app/` directory.

2. Add the following content to the file. Replace `PROJECT_ID` with your Google Cloud project ID and replace `LOCATION` with your Google Cloud location.

       GOOGLE_CLOUD_PROJECT=PROJECT_ID
       GOOGLE_CLOUD_LOCATION=LOCATION
       GOOGLE_GENAI_USE_ENTERPRISE=True

## Run the agent with the dev UI

Launch the development user interface to interact with your agent.

1. Change your current directory to `app`.

       cd app

2. Set the `SSL_CERT_FILE` environment variable. This step is required for
   voice and video tests.

   ### macOS/Linux

   ```bash
   export SSL_CERT_FILE=$(python -m certifi)

   ```

   ### Windows

   ```bash
   $env:SSL_CERT_FILE = (python -m certifi)

   ```
3. Run the dev UI.

       adk web

   > [!NOTE]
   > **Note:** If you use Windows and encounter a `NotImplementedError`, run `adk web
   > --no-reload` instead.

4. Open the URL provided in the terminal, which is typically
   `http://localhost:8000` or `http://127.0.0.1:8000`.

5. Select `google_search_agent`.

The following diagram shows how user input flows to the agent, how the agent uses
the Google Search tool, and how the agent returns a response:

![Diagram showing user input going to agent, agent using Google Search tool to get information, and agent returning a response to the user.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/live-api/agent-google-search-flow.png)

## Interact with the agent

After you launch the dev UI, you can interact with your agent by using text,
voice, or video.

### Use text input

Enter the following prompts in the UI to test the agent's text-based responses.
The agent uses the `google_search` tool to get the latest information to answer
these questions.

- What is the weather in New York?
- What is the time in New York?
- What is the weather in Paris?
- What is the time in Paris?

### Use voice and video input

To use voice input, reload the web browser and click the microphone button. Ask
a question, and you hear the answer in real time.

To use video input, reload the web browser and click the camera button. Ask a
question like "What do you see?", and the agent describes what it sees from the
video input.

> [!NOTE]
> **Note:** Click the microphone or camera button only once to start streaming. Clicking the buttons multiple times is not supported.

## Stop the dev UI

To stop the `adk web` tool, press `Ctrl+C` in the terminal where it is running.

## What's next

- To learn more about Live API development using ADK, see the [ADK documentation](https://google.github.io/adk-docs/streaming/).
- See the [Bidi-streaming demo](https://github.com/google/adk-samples/tree/main/python/agents/bidi-demo).
- [Get started using the Google Gen AI SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/get-started-sdk).
- [Get started using WebSockets](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/get-started-websocket).
- Learn how to [configure language and voice](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice).
- Learn how to [configure Gemini capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities).
- Learn about [Gemini Live API best practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices).
