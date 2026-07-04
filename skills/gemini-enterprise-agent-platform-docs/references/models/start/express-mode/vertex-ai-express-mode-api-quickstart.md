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

> [!NOTE]
> To see an example of Agent Platform in Express Mode,
> run the "Getting started with Gemini using Agent Platform in Express Mode" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_express.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_express.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_express.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_express.ipynb)

Gemini Enterprise Agent Platform in [express mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview) lets you quickly try out core
generative AI features that are available on Gemini Enterprise Agent Platform. This tutorial
shows you how to perform the following tasks by using the Agent Platform API
in express mode:

- Install and initialize the Google Gen AI SDK for express mode.
- Send a request to the Gemini for Google Cloud API, including the
  following:

  - Non-streaming request
  - Streaming request
  - Function calling request

## Before you begin

Before performing the tasks described on this page, [sign up for express mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview#eligibility).

## Install and initialize the Google Gen AI SDK for express mode

The Google Gen AI SDK lets you use Google generative AI models and
features to build AI-powered applications. When using Gemini Enterprise Agent Platform in
express mode, install and initialize the `google-genai` package to
authenticate using your generated API key.

### Install

To install the Google Gen AI SDK for express mode, run the following
commands:

    # Developer TODO: If you're using Colab, uncomment the following lines:
    # from google.colab import auth
    # auth.authenticate_user()

    !pip install google-genai

    !pip install --force-reinstall -qq "numpy<2.0"

If you're using Colab, ignore any dependency conflicts and restart the runtime
after installation.

### Initialize

Configure the API key for express mode and environment variables. For details on
getting an API key, see [Gemini Enterprise Agent Platform in express mode overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview).

    from google import genai
    from google.genai import types

    # Developer TODO: Replace YOUR_API_KEY with your API key.
    API_KEY = "YOUR_API_KEY"

    client = genai.Client(
        vertexai=True, api_key=API_KEY
    )

## Send a request to the Gemini for Google Cloud API

You can send either streaming or non-streaming requests to the
Gemini for Google Cloud API. Streaming requests return the response in chunks as
the request is being processed. To a human user, streamed responses reduce the
perception of latency. Non-streaming requests return the response in one chunk
after the request is processed.

### Streaming request

To send a streaming request, set `stream=True` and print the response in chunks.

    from google import genai
    from google.genai import types

    def generate():
      client = genai.Client(vertexai=True, api_key=YOUR_API_KEY)

      config=types.GenerateContentConfig(
          temperature=0,
          top_p=0.95,
          top_k=20,
          candidate_count=1,
          seed=5,
          max_output_tokens=100,
          stop_sequences=["STOP!"],
          presence_penalty=0.0,
          frequency_penalty=0.0,
          safety_settings=[
              types.SafetySetting(
                  category="HARM_CATEGORY_HATE_SPEECH",
                  threshold="BLOCK_ONLY_HIGH",
              )
          ],
      )
      for chunk in client.models.generate_content_stream(
        model="gemini-2.5-flash-lite",
        contents="Explain bubble sort to me",
        config=config,
      ):
        print(chunk.text)

    generate()

### Non-streaming request

The following code sample defines a function that sends a non-streaming request
to the `gemini-2.5-flash-lite`. It shows you how to configure basic request
parameters and safety settings.

    from google import genai
    from google.genai import types

    def generate():
      client = genai.Client(vertexai=True, api_key=YOUR_API_KEY)

      config=types.GenerateContentConfig(
          temperature=0,
          top_p=0.95,
          top_k=20,
          candidate_count=1,
          seed=5,
          max_output_tokens=100,
          stop_sequences=["STOP!"],
          presence_penalty=0.0,
          frequency_penalty=0.0,
          safety_settings=[
              types.SafetySetting(
                  category="HARM_CATEGORY_HATE_SPEECH",
                  threshold="BLOCK_ONLY_HIGH",
              )
          ],
      )
      response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents="Explain bubble sort to me",
        config=config,
      )
      print(response.text)

    generate()

### Function calling request

The following code sample declares a function and passes it as a tool, and then
receives a function call part in the response. After you receive the function
call part from the model, you can invoke the function and get the response, and
then pass the response to the model.

    function_response_parts = [
        {
            'function_response': {
                'name': 'get_current_weather',
                'response': {
                    'name': 'get_current_weather',
                    'content': {'weather': 'super nice'},
                },
            },
        },
    ]
    manual_function_calling_contents = [
        {'role': 'user', 'parts': [{'text': 'What is the weather in Boston?'}]},
        {
            'role': 'model',
            'parts': [{
                'function_call': {
                    'name': 'get_current_weather',
                    'args': {'location': 'Boston'},
                }
            }],
        },
        {'role': 'user', 'parts': function_response_parts},
    ]
    function_declarations = [{
        'name': 'get_current_weather',
        'description': 'Get the current weather in a city',
        'parameters': {
            'type': 'OBJECT',
            'properties': {
                'location': {
                    'type': 'STRING',
                    'description': 'The location to get the weather for',
                },
                'unit': {
                    'type': 'STRING',
                    'enum': ['C', 'F'],
                },
            },
        },
    }]

    response = client.models.generate_content(
        model="gemini-2.0-flash-001",
        contents=manual_function_calling_contents,
        config=dict(tools=[{'function_declarations': function_declarations}]),
    )
    print(response.text)

## Clean up

This tutorial does not create any Google Cloud resources, so no clean up is
needed to avoid charges.

## What's next

- Try the [Agent Studio tutorial](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/vertex-ai-studio-express-mode-quickstart) for Gemini Enterprise Agent Platform in express mode.
- See the complete [API reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/express-mode/api-reference) for Gemini Enterprise Agent Platform in express mode.
