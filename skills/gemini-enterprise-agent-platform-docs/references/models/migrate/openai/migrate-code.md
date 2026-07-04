This page explains how to migrate code designed for the OpenAI SDK to the Google Gen AI SDK to utilize Gemini models on Gemini Enterprise Agent Platform.

> [!NOTE]
> **Note:** If you prefer to continue using OpenAI libraries without rewriting your code, see [Using OpenAI libraries with Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview).

## Migration Overview

The following notebook demonstrates a practical migration from the `openai` library to the `google-genai` library:

> [!NOTE]
> To see an example of migrating from OpenAI SDK to Google GenAI SDK,
> run the "Migrate OpenAI SDK code to Google GenAI SDK code" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/migration/migrate_from_openai_to_gemini.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fmigration%2Fmigrate_from_openai_to_gemini.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/migration/migrate_from_openai_to_gemini.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/migration/migrate_from_openai_to_gemini.ipynb)

### API \& Syntax Mapping

The following table compares the core components, methods, and parameters of the OpenAI SDK with the Google Gen AI SDK.

| Feature | OpenAI SDK (`openai`) | Google Gen AI SDK (`google-genai`) |
|---|---|---|
| **Client Initialization** | `client = OpenAI(api_key=...)` | `client = genai.Client(vertexai=True, ...)` |
| **Generation Method** | `client.chat.completions.create` | `client.models.generate_content` |
| **Streaming Method** | `stream=True` (parameter) | `client.models.generate_content_stream` (method) |
| **User Input** | `messages=[{"role": "user", "content": "..."}]` | `contents="..."` (str) or `contents=[...]` (list) |
| **System Instructions** | `messages=[{"role": "system", "content": "..."}]` | `config=types.GenerateContentConfig(system_instruction=...)` |
| **Response Access** | `response.choices[0].message.content` | `response.text` |
| **Chat History** | Manual list management (`messages.append`) | `client.chats.create()` (Stateful object) |
| **Max Tokens** | `max_tokens` | `max_output_tokens` (inside `config`) |
| **Temperature** | `temperature` | `temperature` (inside `config`) |
| **JSON Mode** | `response_format={"type": "json_object"}` | `response_mime_type="application/json"` (inside `config`) |

### Installation and Setup

Uninstall the OpenAI library and install the Google Gen AI SDK.

    pip install google-genai

### 2. Authentication \& Initialization

While OpenAI uses an API Key, Agent Platform uses [Identity and Access Management (IAM) credentials (Application Default Credentials)](https://docs.cloud.google.com/docs/authentication/application-default-credentials). You must explicitly define your Project ID and Location.

| OpenAI SDK | Google Gen AI SDK |
|---|---|
| ```` ```python from openai import OpenAI import os # Relies on OPENAI_API_KEY environment variable client = OpenAI() ``` ```` | ```` ```python from google import genai # Use vertexai=True to use Agent Platform client = genai.Client( vertexai=True, project='your-project-id', location='us-central1' ) ``` ```` |

**Tip:** You can also set environment variables to initialize the client without arguments, similar to how the OpenAI client reads the API key from the environment.

Set `GOOGLE_GENAI_USE_ENTERPRISE`, `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION`, as shown:

    export GOOGLE_GENAI_USE_ENTERPRISE=true
    export GOOGLE_CLOUD_PROJECT='your-project-id'
    export GOOGLE_CLOUD_LOCATION='global'

Once configured, you can initialize the client without passing parameters:

    from google import genai

    client = genai.Client()

### Code Examples

The following code samples show the differences between the OpenAI SDK and Google Gen AI SDK for common tasks.

#### Single-turn text generation

The following code samples show how to generate text. Note that in the Google Gen AI SDK, system instructions are handled as a configuration parameter rather than a message role in the input list.

| OpenAI SDK | Google Gen AI SDK |
|---|---|
| ```` ```python response = client.chat.completions.create( model="gpt-4", messages=[ {"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Explain quantum physics."} ] ) print(response.choices[0].message.content) ``` ```` | ```` ```python from google.genai import types response = client.models.generate_content( model="gemini-2.5-flash", contents="Explain quantum physics.", config=types.GenerateContentConfig( system_instruction="You are a helpful assistant." ) ) print(response.text) ``` ```` |

#### Text generation with parameters

The following code samples show the differences in defining configuration parameters. In the Google Gen AI SDK, parameters like `temperature`, `max_output_tokens` (previously `max_tokens`), and JSON formatting are grouped into a `GenerateContentConfig` object.

| OpenAI SDK | Google Gen AI SDK |
|---|---|
| ```` ```python response = client.chat.completions.create( model="gpt-4", messages=[ {"role": "user", "content": "List 3 types of apples in JSON."} ], temperature=0.7, max_tokens=1000, response_format={"type": "json_object"} ) print(response.choices[0].message.content) ``` ```` | ```` ```python from google.genai import types config = types.GenerateContentConfig( temperature=0.7, max_output_tokens=1000, response_mime_type="application/json" ) response = client.models.generate_content( model="gemini-2.5-flash", contents="List 3 types of apples in JSON.", config=config ) print(response.text) ``` ```` |

#### Chat (Multi-turn)

The following code samples show the differences in managing chat history. Google Gen AI SDK simplifies this by providing a stateful `chat` object, whereas OpenAI requires manually appending messages to a list.

| OpenAI SDK | Google Gen AI SDK |
|---|---|
| ```` ```python # You must manually manage the list state messages = [{"role": "user", "content": "Hi"}] response = client.chat.completions.create( model="gpt-4", messages=messages ) # Append the response to history manually messages.append(response.choices[0].message) messages.append({"role": "user", "content": "Next question"}) response2 = client.chat.completions.create( model="gpt-4", messages=messages ) print(response2.choices[0].message.content) ``` ```` | ```` ```python # The SDK manages history for you chat = client.chats.create( model="gemini-2.5-flash", config=types.GenerateContentConfig( system_instruction="You are a helpful assistant." ) ) response1 = chat.send_message("Hi") print(response1.text) # History is retained automatically in the chat object response2 = chat.send_message("Next question") print(response2.text) ``` ```` |

#### Streaming

The following code samples show the differences in streaming responses. Google Gen AI SDK uses a specific method (`generate_content_stream`) rather than a boolean flag.

| OpenAI SDK | Google Gen AI SDK |
|---|---|
| ```` ```python stream = client.chat.completions.create( model="gpt-4", messages=[{"role": "user", "content": "Write a story."}], stream=True ) for chunk in stream: if chunk.choices[0].delta.content: print(chunk.choices[0].delta.content, end="") ``` ```` | ```` ```python stream = client.models.generate_content_stream( model="gemini-2.5-flash", contents="Write a story." ) for chunk in stream: print(chunk.text, end="") ``` ```` |

## What's next

- Learn how to [Use OpenAI libraries with Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview).
- See code examples for [OpenAI compatibility](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/openai).
- Get started with [Google Gen AI SDK quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/quickstart-multimodal).
