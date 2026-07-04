This document shows you how to configure various capabilities of
Gemini models when using Gemini Live API. You can configure tool use
such as function calling and grounding, and native audio capabilities such as
affective dialog and proactive audio.

> [!NOTE]
> To learn more,
> run the following notebooks in the environment of your choice:
>
> - "Introduction to the Multimodal Live API (WebSocket)":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_multimodal_live_api.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fmultimodal-live-api%2Fintro_multimodal_live_api.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/multimodal-live-api/intro_multimodal_live_api.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_multimodal_live_api.ipynb)
> - "Introduction to the Multimodal Live API (Google Gen AI SDK)":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_multimodal_live_api_genai_sdk.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fmultimodal-live-api%2Fintro_multimodal_live_api_genai_sdk.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/multimodal-live-api/intro_multimodal_live_api_genai_sdk.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_multimodal_live_api_genai_sdk.ipynb)

## Configure tool use

Several tools are compatible with various versions of
Gemini Live API-supported models, including:

- [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities#function-calling)
- [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities#grounding-google-search)
- [Grounding with RAG Engine on Gemini Enterprise Agent Platform (Preview)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities#use-rag-with-live-api)

To enable a particular tool for usage in returned responses, include the name of
the tool in the `tools` list when you initialize the model. The following
sections provide examples of how to use each of the built-in tools in your code.

### Function calling

Use [function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) when you want the model to
interact with external systems or APIs that you manage. Use this for tasks like
checking a database, sending an email, or interacting with a custom API.

The model generates a function call, and your application executes the code and
sends the results back to the model.

All functions must be declared at the start of the session by sending tool
definitions as part of the `LiveConnectConfig` message.

To enable function calling, include `function_declarations` in the `tools` list
in the setup message:

### Python

```python
import asyncio

from google import genai
from google.genai.types import (
    Content,
    LiveConnectConfig,
    Part,
)

# Initialize the client.
client = genai.Client(
    vertexai=True,
    project="GOOGLE_CLOUD_PROJECT",  # Replace with your project ID
    location="LOCATION",  # Replace with your location
)

MODEL_ID = "gemini-live-2.5-flash-native-audio"

def get_current_weather(location: str) -> str:
    """Example method. Returns the current weather.

    Args:
        location: The city and state, e.g. San Francisco, CA
    """
    weather_map: dict[str, str] = {
        "Boston, MA": "snowing",
        "San Francisco, CA": "foggy",
        "Seattle, WA": "raining",
        "Austin, TX": "hot",
        "Chicago, IL": "windy",
    }
    return weather_map.get(location, "unknown")

async def main():
    config = LiveConnectConfig(
        response_modalities=["AUDIO"],
        tools=[get_current_weather],
    )

    async with client.aio.live.connect(
        model=MODEL_ID,
        config=config,
    ) as session:
        text_input = "Get the current weather in Boston."
        print(f"Input: {text_input}")

        await session.send_client_content(
            turns=Content(role="user", parts=[Part(text=text_input)])
        )

        async for message in session.receive():
            if message.tool_call:
                function_responses = []
                for function_call in message.tool_call.function_calls:
                    print(f"FunctionCall > {function_call}")
                    # Execute the tool and send the response back to the model.
                    result = get_current_weather(**function_call.args)
                    function_responses.append(
                        {
                            "name": function_call.name,
                            "response": {"result": result},
                            "id": function_call.id,
                        }
                    )
                if function_responses:
                    await session.send_tool_response(function_responses=function_responses)

if __name__ == "__main__":
    asyncio.run(main())

```

For examples using function calling in system instructions, see our
[best practices example](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices#best-practices-example).

### Grounding with Google Search

Use [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) when you want
the model to provide more accurate and factual responses by anchoring them to
verifiable sources of information. Use this for tasks like searching the web.

Unlike function calling, the server-side integration handles the retrieval of
information automatically.

To enable Grounding with Google Search, include `google_search` in the
`tools` list in the setup message:

### Python

```python
import asyncio

from google import genai
from google.genai.types import (
    Content,
    LiveConnectConfig,
    Part,
)

# Initialize the client.
client = genai.Client(
    vertexai=True,
    project="GOOGLE_CLOUD_PROJECT",  # Replace with your project ID
    location="LOCATION",  # Replace with your location
)

MODEL_ID = "gemini-live-2.5-flash-native-audio"

async def main():
    config = LiveConnectConfig(
        response_modalities=["AUDIO"],
        tools=[{"google_search": {}}],
    )

    async with client.aio.live.connect(
        model=MODEL_ID,
        config=config,
    ) as session:
        text_input = "What is the current weather in Toronto, Canada?"
        print(f"Input: {text_input}")

        await session.send_client_content(
            turns=Content(role="user", parts=[Part(text=text_input)])
        )

        async for message in session.receive():
            # Consume the messages from the model.
            # In native audio, the model response is in audio format.
            pass

if __name__ == "__main__":
    asyncio.run(main())

```

### Grounding with RAG Engine on Gemini Enterprise Agent Platform

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

You can use RAG Engine with the Live API for grounding,
storing, and retrieving contexts. Use this for tasks like retrieving
information from a document corpus. Like Grounding with Google Search,
RAG grounding is handled server-side and automatically retrieves information
from your specified corpus:

### Python

```python
import asyncio

from google import genai
from google.genai.types import (
    Content,
    LiveConnectConfig,
    Part,
    Retrieval,
    Tool,
    VertexRagStore,
    VertexRagStoreRagResource,
)

# Initialize the client.
client = genai.Client(
    vertexai=True,
    project="GOOGLE_CLOUD_PROJECT",  # Replace with your project ID
    location="LOCATION",  # Replace with your location
)

MODEL_ID = "gemini-live-2.5-flash-native-audio"

async def main():
    rag_store = VertexRagStore(
        rag_resources=[
            VertexRagStoreRagResource(
                rag_corpus="RESOURCE_NAME"  # Replace with your corpus resource name
            )
        ],
        # Set `store_context` to true to allow Live API sink context into your memory corpus.
        store_context=True,
    )

    config = LiveConnectConfig(
        response_modalities=["AUDIO"],
        tools=[Tool(retrieval=Retrieval(vertex_rag_store=rag_store))],
    )

    async with client.aio.live.connect(
        model=MODEL_ID,
        config=config,
    ) as session:
        text_input = "YOUR_TEXT_INPUT"
        print(f"Input: {text_input}")

        await session.send_client_content(
            turns=Content(role="user", parts=[Part(text=text_input)])
        )

        async for message in session.receive():
            # Consume the messages from the model.
            # In native audio, the model response is in audio format.
            pass

if __name__ == "__main__":
    asyncio.run(main())

```

For more information, see [Use RAG Engine on Gemini Enterprise Agent Platform in Gemini
Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-rag-in-multimodal-live).

## Configure native audio capabilities

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Models that have native audio capabilities support the following features:

- [30 HD voices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice#voices_supported)
- [24 languages](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice#languages_supported)
- [Proactive Audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities#use-proactive-audio)
- [Affective Dialog](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities#use-affective-dialog)

> [!NOTE]
> **Note:** Native Audio doesn't support `response_modalities=["TEXT"]`.

### Configure Affective Dialog

> [!IMPORTANT]
> **Important:** Affective Dialog can produce unexpected results.

When **Affective Dialog** is enabled, the model attempts to
understand and respond based on the tone of voice and emotional expressions of
the user.

To enable Affective Dialog, set `enable_affective_dialog` to
`true` in the setup message:

### Python

```python
config = LiveConnectConfig(
    response_modalities=["AUDIO"],
    enable_affective_dialog=True,
)

```

### Configure Proactive Audio

Proactive Audio lets you control when the model responds. For
example, you can ask Gemini to only respond when prompted or when
specific topics are discussed. To see a video demonstration of
Proactive Audio, see
[Gemini LiveAPI Native Audio Preview](https://youtu.be/ZsB33Tr-P3c).

To enable Proactive Audio, configure the `proactivity` field
in the setup message and set `proactive_audio` to `true`:

### Python

```python
config = LiveConnectConfig(
    response_modalities=["AUDIO"],
    proactivity=ProactivityConfig(proactive_audio=True),
)

```

**Example conversation**

The following is a sample of what a conversation with Gemini about
cooking might look like:

    Prompt: "You are an AI assistant in Italian cooking; only chime in when the topic is about Italian cooking."

    Speaker A: "I really love cooking!" (No response from Gemini.)

    Speaker B: "Oh yes, me too! My favorite is French cuisine." (No response from
    Gemini.)

    Speaker A: "I really like Italian food; do you know how to make a pizza?"

    (Italian cooking topic will trigger response from Gemini.)
    Gemini Live API: "I'd be happy to help! Here's a recipe for a pizza."

#### Common use cases

When using Proactive Audio, Gemini performs as follows:

- **Responds with minimal latency**: Gemini responds after the user is done speaking, reducing interruptions and helping Gemini not lose context if an interruption happens.
- **Avoids interruptions**: Proactive Audio helps Gemini avoid interruptions from background noise or external chatter, and prevents Gemini from responding if external chatter is introduced during a conversation.
- **Handles interruptions** : If the user needs to interrupt during a response from Gemini, Proactive Audio makes it easier for Gemini to appropriately back-channel (meaning appropriate interruptions are handled), rather than if a user uses filler words such as *umm* or *uhh*.
- **Co-listens to audio**: Gemini can co-listen to an audio file that's not the speaker's voice and subsequently answer questions about that audio file later in the conversation.

#### Billing

While Gemini is listening to a conversation, input audio tokens will be
charged.

For output audio tokens, you're only charged when Gemini responds. If
Gemini does not respond or stays silent, there will be no charge to
your output audio tokens.

For more information, see [Gemini Enterprise Agent Platform pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## What's next

For more information on using Gemini Live API, see:

- [Gemini Live API overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api)
- [Gemini Live API reference guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/multimodal-live)
- [Start and manage live sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session)
