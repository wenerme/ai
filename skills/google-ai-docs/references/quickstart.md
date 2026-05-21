# Gemini API quickstart

> [!IMPORTANT]
> We have updated our [Terms of Service](https://ai.google.dev/gemini-api/terms).

> [!NOTE]
> This page covers the `generateContent` API. For new projects, we recommend the new **Interactions API** (Beta), which offers server-side history, built-in support for agentic workflows, and future new Gemini capabilities. Use the **API switcher toggle** at the top of the page to switch to the Interactions API quickstart.

This quickstart shows you how to install our
[libraries](https://ai.google.dev/gemini-api/docs/libraries) and make your first request, stream
responses, build multi-turn conversations, and use tools using the standard
`generateContent` method.

## Before you begin

To use the Gemini API, you need to have an API key to authenticate your requests, enforce security limits, and track usage to your account.

Create one on AI Studio for free to get started:

[Create a Gemini API Key](https://aistudio.google.com/app/apikey)

## Install the Google GenAI SDK

### Python

Using [Python 3.9+](https://www.python.org/downloads/), install the
[`google-genai` package](https://pypi.org/project/google-genai/)
using the following
[pip command](https://packaging.python.org/en/latest/tutorials/installing-packages/):

    pip install -q -U google-genai

### JavaScript

Using [Node.js v18+](https://nodejs.org/en/download/package-manager),
install the
[Google Gen AI SDK for TypeScript and JavaScript](https://www.npmjs.com/package/@google/genai)
using the following
[npm command](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

    npm install @google/genai

## Generate text

Use the `models.generate_content` method to
[generate a text response](https://ai.google.dev/gemini-api/docs/text-generation).

### Python

    from google import genai

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="Explain how AI works in a few words"
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Explain how AI works in a few words",
      });

      console.log(response.text);
    }

    main();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works in a few words"
              }
            ]
          }
        ]
      }'

## Stream responses

By default, the model returns a response only after the entire generation
process is complete. For a faster, more interactive experience, you can
[stream the response](https://ai.google.dev/gemini-api/docs/text-generation#stream) chunks as they
are generated.

### Python

    response = client.models.generate_content_stream(
        model="gemini-3.5-flash",
        contents="Explain how AI works in detail"
    )

    for chunk in response:
        print(chunk.text, end="", flush=True)

### JavaScript

    async function main() {
      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.5-flash",
        contents: "Explain how AI works in detail",
      });

      for await (const chunk of responseStream) {
        process.stdout.write(chunk.text);
      }
    }

    main();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:streamGenerateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      --no-buffer \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works in detail"
              }
            ]
          }
        ]
      }'

## Multi-turn conversations

For multi-turn conversations, the SDKs provide a stateful `chats` helper to
build a [multi-turn chat experience](https://ai.google.dev/gemini-api/docs/text-generation#chat)
that automatically manages conversation history.

### Python

    chat = client.chats.create(model="gemini-3.5-flash")

    response1 = chat.send_message("I have 2 dogs in my house.")
    print("Response 1:", response1.text)

    response2 = chat.send_message("How many paws are in my house?")
    print("Response 2:", response2.text)

### JavaScript

    async function main() {
      const chat = ai.chats.create({ model: "gemini-3.5-flash" });

      let response = await chat.sendMessage({ message: "I have 2 dogs in my house." });
      console.log("Response 1:", response.text);

      response = await chat.sendMessage({ message: "How many paws are in my house?" });
      console.log("Response 2:", response.text);
    }

    main();

### REST

    # REST is stateless. You must pass the full conversation history in the request.
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "role": "user",
            "parts": [{"text": "I have 2 dogs in my house."}]
          },
          {
            "role": "model",
            "parts": [{"text": "That is nice! Two dogs mean you have plenty of company."}]
          },
          {
            "role": "user",
            "parts": [{"text": "How many paws are in my house?"}]
          }
        ]
      }'

## Use tools

Extend the model's capabilities by
[grounding responses with Google Search](https://ai.google.dev/gemini-api/docs/google-search)
to access real-time web content. The model automatically decides when to
search, executes queries, and synthesizes a response.

### Python

    from google import genai
    from google.genai import types

    config = types.GenerateContentConfig(
        tools=[types.Tool(google_search=types.GoogleSearch())]
    )

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="Who won the euro 2024?",
        config=config
    )

    print(response.text)

    metadata = response.candidates[0].grounding_metadata
    if metadata.web_search_queries:
        print("\nSearch queries executed:")
        for query in metadata.web_search_queries:
            print(f" - {query}")

    if metadata.grounding_chunks:
        print("\nSources:")
        for chunk in metadata.grounding_chunks:
            print(f" - [{chunk.web.title}]({chunk.web.uri})")

### JavaScript

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Who won the euro 2024?",
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      console.log(response.text);

      const metadata = response.candidates[0]?.groundingMetadata;
      if (metadata?.webSearchQueries) {
        console.log("\nSearch queries executed:");
        for (const query of metadata.webSearchQueries) {
          console.log(` - ${query}`);
        }
      }
      if (metadata?.groundingChunks) {
        console.log("\nSources:");
        for (const chunk of metadata.groundingChunks) {
          console.log(` - [${chunk.web.title}](${chunk.web.uri})`);
        }
      }
    }

    main();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {"text": "Who won the euro 2024?"}
            ]
          }
        ],
        "tools": [
          {
            "google_search": {}
          }
        ]
      }'

The Gemini API also supports other built-in tools:

- **[Code execution](https://ai.google.dev/gemini-api/docs/code-execution)**: Lets the model write and run Python code to solve complex math problems.
- **[URL context](https://ai.google.dev/gemini-api/docs/url-context)**: Lets you ground responses in specific web page URLs you provide.
- **[File search](https://ai.google.dev/gemini-api/docs/file-search)**: Lets you upload files and ground responses in their content using semantic search.
- **[Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding)**: Lets you ground responses in location data and search for places, directions, and maps.
- **[Computer use](https://ai.google.dev/gemini-api/docs/computer-use)**: Lets the model interact with a virtual computer screen, keyboard, and mouse to perform tasks.

## Call custom functions

Use **[function calling](https://ai.google.dev/gemini-api/docs/function-calling)** to connect
models to your custom tools and APIs. The model determines when to call your
function and returns a `functionCall` in the response for your application
to execute.

This example declares a mock temperature function and checks if the model
wants to call it.

### Python

    from google import genai
    from google.genai import types

    weather_function = {
        "name": "get_current_temperature",
        "description": "Gets the current temperature for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city name, e.g. San Francisco",
                },
            },
            "required": ["location"],
        },
    }

    tools = types.Tool(function_declarations=[weather_function])
    config = types.GenerateContentConfig(tools=[tools])

    contents = ["What's the temperature in London?"]

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=contents,
        config=config,
    )

    part = response.candidates[0].content.parts[0]
    if part.function_call:
        fc = part.function_call
        print(f"Model requested function: {fc.name} with args {fc.args}")

        mock_result = {"temperature": "15C", "condition": "Cloudy"}

        contents.append(response.candidates[0].content)

        fn_response_part = types.Part.from_function_response(
            name=fc.name,
            response=mock_result,
            id=fc.id
        )
        contents.append(types.Content(role="user", parts=[fn_response_part]))

        final_response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=contents,
            config=config,
        )
        print("Final Response:", final_response.text)

### JavaScript

    import { GoogleGenAI, Type } from '@google/genai';

    async function main() {
      const weatherFunction = {
        name: 'get_current_temperature',
        description: 'Gets the current temperature for a given location.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            location: {
              type: Type.STRING,
              description: 'The city name, e.g. San Francisco',
            },
          },
          required: ['location'],
        },
      };

      const contents = [{
        role: 'user',
        parts: [{ text: "What's the temperature in London?" }]
      }];

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          tools: [{ functionDeclarations: [weatherFunction] }],
        },
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        const fc = response.functionCalls[0];
        console.log(`Model requested function: ${fc.name}`);

        const mockResult = { temperature: "15C", condition: "Cloudy" };

        contents.push(response.candidates[0].content);

        contents.push({
          role: 'user',
          parts: [{
            functionResponse: {
              name: fc.name,
              response: mockResult,
              id: fc.id
            }
          }]
        });

        const finalResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: contents,
          config: {
            tools: [{ functionDeclarations: [weatherFunction] }],
          },
        });
        console.log("Final Response:", finalResponse.text);
      }
    }

    main();

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "role": "user",
            "parts": [{"text": "What'\''s the temperature in London?"}]
          }
        ],
        "tools": [
          {
            "functionDeclarations": [
              {
                "name": "get_current_temperature",
                "description": "Gets the current temperature for a given location.",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "location": {
                      "type": "string",
                      "description": "The city name, e.g. San Francisco"
                    }
                  },
                  "required": ["location"]
                }
              }
            ]
          }
        ]
      }'

## What's next

Now that you've got started with the Gemini API, explore the following
guides to build more advanced applications:

- [Text generation](https://ai.google.dev/gemini-api/docs/text-generation)
- [Image generation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Image understanding](https://ai.google.dev/gemini-api/docs/image-understanding)
- [Thinking](https://ai.google.dev/gemini-api/docs/thinking)
- [Function calling](https://ai.google.dev/gemini-api/docs/function-calling)
- [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search)
- [Long context](https://ai.google.dev/gemini-api/docs/long-context)
- [Embeddings](https://ai.google.dev/gemini-api/docs/embeddings)