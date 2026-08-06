<br />

This guide gets you started with the Gemini API using the [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview). You'll make your first API call in under a minute and explore text generation, multimodal understanding, image generation, structured output, tools, function calling, agents, and background execution.

> [!NOTE]
> **Building with an AI coding agent?** Install the skill and then paste the prompt to get started with the Gemini API using Interactions:
>
> ```
> npx skills add google-gemini/gemini-skills --skill gemini-interactions-api
> ```

The Interactions API is available through the [Python](https://github.com/googleapis/python-genai) and [JavaScript](https://github.com/googleapis/js-genai) SDKs, as well as through REST.

## 1. Get an API key

To use the Gemini API, you need to have an API key to authenticate your requests, enforce security limits, and track usage to your account.

- Google AI Studio automatically creates a project and API key for new users. You can copy it from the [API keys page](https://aistudio.google.com/api-keys).
- If you need a new key, click **Create API key** in AI Studio and follow the dialog to add a new key-project pair.

[Create a Gemini API Key](https://aistudio.google.com/apikey)

Set your key as an environment variable:

    export GEMINI_API_KEY="YOUR_API_KEY"

### Upgrade to the paid tier

Upgrading to the paid tier increases your rate limits and requires setting up
Cloud Billing.

- Click **Set up billing** on the AI Studio [API keys](https://aistudio.google.com/api-keys) or [Projects](https://aistudio.google.com/projects) pages.
- Follow the Cloud Billing dialog to create or link a billing account, add a payment method, and prepay a minimum of $10 (or currency equivalent) in paid credits.
- View your API usage in [Google AI Studio](https://aistudio.google.com/usage) under **Dashboard** \> **Usage**.

See the [Billing page](https://ai.google.dev/gemini-api/docs/billing) for more information.

## 2. Install the SDK and make your first call

Install the SDK and generate text with a single API call.

### Python

Install the SDK:

    pip install -U google-genai

Initialize the client and make a request:

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input="Explain how AI works in a few words"
    )
    print(interaction.output_text)

### JavaScript

Install the SDK:

    npm install @google/genai

Initialize the client and make a request:

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "Explain how AI works in a few words",
    });
    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "Explain how AI works in a few words"
      }'

**Response:**

    {
      "id": "v1_ChdpQUFvYXI...",
      "status": "completed",
      "usage": {
        "total_tokens": 197,
        "total_input_tokens": 8,
        "total_output_tokens": 12
      },
      "created": "2026-06-09T12:01:25Z",
      "steps": [
        {
          "type": "thought",
          "signature": "EvEFCu4FAQw..."
        },
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "AI learns patterns from data, then uses those patterns to make predictions or decisions on new data."
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash",
    }

When using REST, the API returns the full `Interaction` resource containing metadata, usage statistics, and the step-by-step history of the turn.

While the SDKs expose the full response, they also provide convenience properties like `interaction.output_text` and `interaction.output_image` to access final outputs directly. Learn more about the response structure in the [Interactions overview](https://ai.google.dev/gemini-api/docs/interactions-overview) or read the [text generation guide](https://ai.google.dev/gemini-api/docs/text-generation) for details on system instructions and generation config.

## 3. Stream the response

For more fluid interactions, stream the response as it's generated. Each `step.delta` event delivers a chunk of text you can display immediately.

### Python

    from google import genai

    client = genai.Client()

    stream = client.interactions.create(
        model="gemini-3.6-flash",
        input="Explain how AI works",
        stream=True
    )
    for event in stream:
        print(event)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const stream = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "Explain how AI works",
      stream: true,
    });

    for await (const event of stream) {
      console.log(event);
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      --no-buffer \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "Explain how AI works",
        "stream": true
      }'

When streaming, the server responds with a stream of server-sent events (SSE). Each event includes a type and JSON data.

**Response:**

    event: interaction.created
    data: {"interaction":{"id":"v1_Chd...","status":"in_progress","model":"gemini-3.6-flash"},"event_type":"interaction.created"}

    event: step.start
    data: {"index":0,"step":{"type":"thought"},"event_type":"step.start"}

    event: step.delta
    data: {"index":0,"delta":{"signature":"EvEFCu4F...","type":"thought_signature"},"event_type":"step.delta"}

    event: step.stop
    data: {"index":0,"event_type":"step.stop"}

    event: step.start
    data: {"index":1,"step":{"type":"model_output"},"event_type":"step.start"}

    event: step.delta
    data: {"index":1,"delta":{"text":"AI ","type":"text"},"event_type":"step.delta"}

    event: step.delta
    data: {"index":1,"delta":{"text":"works ","type":"text"},"event_type":"step.delta"}

    event: step.stop
    data: {"index":1,"event_type":"step.stop"}

    event: interaction.completed
    data: {"interaction":{"id":"v1_Chd...","status":"completed","usage":{"total_tokens":197}},"event_type":"interaction.completed"}

For a detailed look at handling streaming events and delta types, see the [streaming interactions guide](https://ai.google.dev/gemini-api/docs/streaming).

## 4. Multi-turn conversations

The Interactions API supports multi-turn conversations with two approaches:

- **Stateful (recommended)** : Continue a conversation on the server using `previous_interaction_id`. Ideal for most chat and agentic workflows where you want the server to manage history and optimize caching.
- **Stateless**: Manage the conversation history on the client by passing all previous turns (including intermediate model thought and tool steps) in each request.

### Stateful (recommended)

Chain interactions by passing `previous_interaction_id`. The server manages the full conversation history for you.

### Python

    from google import genai

    client = genai.Client()

    # Server-side state (recommended)
    interaction1 = client.interactions.create(
        model="gemini-3.6-flash",
        input="I have 2 dogs in my house.",
    )
    print("Response 1:", interaction1.output_text)

    interaction2 = client.interactions.create(
        model="gemini-3.6-flash",
        input="How many paws are in my house?",
        previous_interaction_id=interaction1.id,
    )
    print("Response 2:", interaction2.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    // Server-side state (recommended)
    const interaction1 = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "I have 2 dogs in my house.",
    });
    console.log("Response 1:", interaction1.output_text);

    const interaction2 = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "How many paws are in my house?",
      previous_interaction_id: interaction1.id,
    });
    console.log("Response 2:", interaction2.output_text);

### REST

    RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "I have 2 dogs in my house."
      }')

    INTERACTION_ID=$(echo "$RESPONSE1" | jq -r '.id')
    echo "Interaction 1 ID: $INTERACTION_ID"

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "How many paws are in my house?",
        "previous_interaction_id": "'$INTERACTION_ID'"
      }'

### Stateless

Set `store=false` and manage conversation history on the client side. You must preserve and resend all model-generated steps (including `thought` and `function_call` steps) exactly as received.

### Python

    from google import genai

    client = genai.Client()

    history = [
        {
            "type": "user_input",
            "content": [{"type": "text", "text": "I have 2 dogs in my house."}]
        }
    ]

    interaction1 = client.interactions.create(
        model="gemini-3.6-flash",
        store=False,
        input=history
    )
    print("Response 1:", interaction1.steps[-1].content[0].text)

    for step in interaction1.steps:
        history.append(step.model_dump())

    history.append({
        "type": "user_input",
        "content": [{"type": "text", "text": "How many paws are in my house?"}]
    })

    interaction2 = client.interactions.create(
        model="gemini-3.6-flash",
        store=False,
        input=history
    )
    print("Response 2:", interaction2.steps[-1].content[0].text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const history = [
      {
        type: "user_input",
        content: [{ type: "text", text: "I have 2 dogs in my house." }]
      }
    ];

    const interaction1 = await ai.interactions.create({
      model: "gemini-3.6-flash",
      store: false,
      input: history
    });
    console.log("Response 1:", interaction1.steps.at(-1).content[0].text);

    history.push(...interaction1.steps);

    history.push({
      type: "user_input",
      content: [{ type: "text", text: "How many paws are in my house?" }]
    });

    const interaction2 = await ai.interactions.create({
      model: "gemini-3.6-flash",
      store: false,
      input: history
    });
    console.log("Response 2:", interaction2.steps.at(-1).content[0].text);

### REST

    # Turn 1: Send with store: false
    RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "store": false,
        "input": [
          {
            "type": "user_input",
            "content": "I have 2 dogs in my house."
          }
        ]
      }')

    MODEL_STEPS=$(echo "$RESPONSE1" | jq '.steps')

    # Turn 2: Build full history
    HISTORY=$(jq -n \
      --argjson first_input '[{"type": "user_input", "content": "I have 2 dogs in my house."}]' \
      --argjson model_steps "$MODEL_STEPS" \
      --argjson second_input '[{"type": "user_input", "content": "How many paws are in my house?"}]' \
      '$first_input + $model_steps + $second_input')

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d "{
        \"model\": \"gemini-3.6-flash\",
        \"store\": false,
        \"input\": $HISTORY
      }"

**Response:**

    {
      "id": "v2_Chd...",
      "status": "completed",
      "usage": {
        "total_tokens": 240,
        "total_input_tokens": 60,
        "total_output_tokens": 20
      },
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "There are 8 paws in your house. 2 dogs \u00d7 4 paws = 8 paws."
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash"
    }

The second interaction returns a complete response object that includes only the new steps, but is grounded in the previous turn's context. Learn more about maintaining state in the [multi-turn conversations guide](https://ai.google.dev/gemini-api/docs/text-generation#multi-turn-conversations), or explore [stateless mode](https://ai.google.dev/gemini-api/docs/text-generation#stateless-conversations) for client-side history management.

## 5. Multimodal understanding

Gemini models understand images, audio, video, and documents natively. Pass media alongside text in a single request.

### Python

    import base64
    from google import genai

    client = genai.Client()

    # Load a local image
    with open("sample.jpg", "rb") as f:
        image_bytes = f.read()
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=[
            {"type": "text", "text": "Compare this local image and this remote audio file."},
            {
                "type": "image",
                "data": image_b64,
                "mime_type": "image/jpeg"
            },
            {
                "type": "audio",
                "uri": "https://storage.googleapis.com/generativeai-downloads/data/sample.mp3",
                "mime_type": "audio/mp3"
            }
        ]
    )
    print(interaction.output_text)

### JavaScript

    import fs from "fs";
    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    // Load a local image
    const imageBytes = fs.readFileSync("sample.jpg");
    const imageB64 = imageBytes.toString("base64");

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: [
        { type: "text", text: "Compare this local image and this remote audio file." },
        {
          type: "image",
          data: imageB64,
          mime_type: "image/jpeg"
        },
        {
          type: "audio",
          uri: "https://storage.googleapis.com/generativeai-downloads/data/sample.mp3",
          mime_type: "audio/mp3"
        }
      ],
    });
    console.log(interaction.output_text);

### REST

    # Base64-encode local image
    BASE64_IMAGE=$(base64 -w 0 sample.jpg)

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions"   -H "x-goog-api-key: $GEMINI_API_KEY"   -H 'Content-Type: application/json'   -H "Api-Revision: 2026-05-20"   -d '{
        "model": "gemini-3.6-flash",
        "input": [
          {
            "type": "text",
            "text": "Compare this local image and this remote audio file."
          },
          {
            "type": "image",
            "data": "'$BASE64_IMAGE'",
            "mime_type": "image/jpeg"
          },
          {
            "type": "audio",
            "uri": "https://storage.googleapis.com/generativeai-downloads/data/sample.mp3",
            "mime_type": "audio/mp3"
          }
        ]
      }'

**Response:**

    {
      "id": "v1_Chd...",
      "status": "completed",
      "usage": {
        "total_tokens": 300
      },
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "The local image displays a pipe organ while the remote audio file is a sample MP3 clip..."
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash",
    }

Explore how to pass images, video, and audio files in the [image understanding guide](https://ai.google.dev/gemini-api/docs/image-understanding).
[Audio understanding
Transcribe, summarize, or answer questions about audio files.](https://ai.google.dev/gemini-api/docs/audio) [Video understanding
Analyze video content, locate events, and describe actions.](https://ai.google.dev/gemini-api/docs/video-understanding) [Document processing
Extract information from PDFs and other document formats.](https://ai.google.dev/gemini-api/docs/document-processing)

## 6. Multimodal generation

Gemini can generate images natively using the [Nano Banana](https://ai.google.dev/gemini-api/docs/image-generation) image models.

### Python

    import base64
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.1-flash-image",
        input="Generate an image of a futuristic city skyline at sunset",
    )

    with open("generated_image.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-image",
      input: "Generate an image of a futuristic city skyline at sunset",
    });

    const generatedImage = interaction.output_image;
    if (generatedImage) {
      const buffer = Buffer.from(generatedImage.data, "base64");
      fs.writeFileSync("generated_image.png", buffer);
    }

### REST

    curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.1-flash-image",
        "input": [
          {"type": "text", "text": "Generate an image of a futuristic city skyline at sunset"}
        ]
      }'

**Response:**

    {
      "id": "v1_Chd...",
      "status": "completed",
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "image",
              "data": "BASE64_ENCODED_IMAGE",
              "mime_type": "image/png"
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.1-flash-image",
    }

When the model generates an image, it returns the base64-encoded image data in a step within the `steps` array, as well as via the `output_image` convenience property. Check out the [image generation guide](https://ai.google.dev/gemini-api/docs/image-generation) to learn about aspect ratios, image editing, and references.
[Speech generation
Generate expressive, multi-speaker speech with Gemini 3.1 Flash TTS.](https://ai.google.dev/gemini-api/docs/speech-generation) [Music generation
Create clips and full-length songs with Lyria 3.](https://ai.google.dev/gemini-api/docs/music-generation)

## 7. Use structured output

Configure the model to return JSON that matches a schema you define. Structured output works with [Pydantic](https://docs.pydantic.dev/latest/) (Python) and [Zod](https://zod.dev/) (JavaScript).

### Python

    from google import genai
    from pydantic import BaseModel, Field
    from typing import List, Optional

    class Recipe(BaseModel):
        recipe_name: str = Field(description="Name of the recipe.")
        ingredients: List[str] = Field(description="List of ingredients.")
        prep_time_minutes: Optional[int] = Field(description="Prep time in minutes.")

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input="Give me a recipe for banana bread",
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": Recipe.model_json_schema()
        },
    )

    recipe = Recipe.model_validate_json(interaction.output_text)
    print(recipe)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as z from "zod";

    const ai = new GoogleGenAI({});

    const recipeJsonSchema = {
      type: "object",
      properties: {
        recipe_name: { type: "string", description: "Name of the recipe." },
        ingredients: {
          type: "array",
          items: { type: "string" },
          description: "List of ingredients."
        },
        prep_time_minutes: {
          type: "integer",
          description: "Prep time in minutes."
        }
      },
      required: ["recipe_name", "ingredients"]
    };

    const recipeSchema = z.fromJSONSchema(recipeJsonSchema);

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "Give me a recipe for banana bread",
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: recipeJsonSchema
      },
    });

    const recipe = recipeSchema.parse(JSON.parse(interaction.output_text));
    console.log(recipe);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "Give me a recipe for banana bread",
        "response_format": {
          "type": "text",
          "mime_type": "application/json",
          "schema": {
            "type": "object",
            "properties": {
              "recipe_name": { "type": "string", "description": "Name of the recipe." },
              "ingredients": {
                "type": "array",
                "items": { "type": "string" },
                "description": "List of ingredients."
              },
              "prep_time_minutes": {
                "type": "integer",
                "description": "Prep time in minutes."
              }
            },
            "required": ["recipe_name", "ingredients"]
          }
        }
      }'

**Response:**

    {
      "id": "v1_Chd...",
      "status": "completed",
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "{\n  \"recipe_name\": \"Classic Banana Bread\",\n  \"ingredients\": [\n    \"3 ripe bananas, mashed\",\n    \"1/3 cup melted butter\",\n    \"3/4 cup sugar\",\n    \"1 egg, beaten\",\n    \"1 teaspoon vanilla extract\",\n    \"1 teaspoon baking soda\",\n    \"Pinch of salt\",\n    \"1.5 cups all-purpose flour\"\n  ],\n  \"prep_time_minutes\": 15\n}"
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash",
    }

The output text block contains a valid JSON string conforming exactly to the requested schema. To learn how to define more complex structures and recursive schemas, see the [structured output guide](https://ai.google.dev/gemini-api/docs/structured-output).

## 8. Use tools

Ground the model's response in real-time information with Google Search. The API automatically searches, processes results, and returns citations.

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input="Who won the euro 2024?",
        tools=[{"type": "google_search"}]
    )

    print(interaction.output_text)

    # Print citations
    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.type == "text" and content_block.annotations:
                    print("\nCitations:")
                    for annotation in content_block.annotations:
                        if annotation.type == "url_citation":
                            print(f"  [{annotation.title}]({annotation.url})")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "Who won the euro 2024?",
      tools: [{ type: "google_search" }]
    });

    console.log(interaction.output_text);

    // Print citations
    for (const step of interaction.steps) {
      if (step.type === "model_output") {
        for (const contentBlock of step.content) {
          if (contentBlock.type === "text" && contentBlock.annotations) {
            console.log("\nCitations:");
            for (const annotation of contentBlock.annotations) {
              if (annotation.type === "url_citation") {
                console.log(`  [${annotation.title}](${annotation.url})`);
              }
            }
          }
        }
      }
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "Who won the euro 2024?",
        "tools": [{"type": "google_search"}]
      }'

**Response:**

    {
      "id": "v1_Chd...",
      "status": "completed",
      "steps": [
        {
          "type": "thought",
          "signature": "EvEFCu4F..."
        },
        {
          "type": "google_search_call",
          "arguments": {
            "queries": ["UEFA Euro 2024 winner"]
          }
        },
        {
          "type": "google_search_result",
          "call_id": "search_001",
          "result": [
            {
              "search_suggestions": "<!-- HTML and CSS search widget -->"
            }
          ]
        },
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "Spain won Euro 2024, defeating England 2-1 in the final.",
              "annotations": [
                {
                  "type": "url_citation",
                  "url": "https://www.uefa.com/euro2024",
                  "title": "uefa.com",
                  "start_index": 0,
                  "end_index": 56
                }
              ]
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash",
    }

The search steps are detailed within the interaction history, and the final output includes inline citations pointing to web sources.

You can learn how to extract search citations in the [Google Search grounding guide](https://ai.google.dev/gemini-api/docs/google-search), or see how to combine multiple tools in the [tool combination guide](https://ai.google.dev/gemini-api/docs/tool-combination).
[Code execution
Run Python code in a secure sandboxed Borg environment.](https://ai.google.dev/gemini-api/docs/code-execution) [URL context
Pass public web URLs directly to ground responses in webpage content.](https://ai.google.dev/gemini-api/docs/url-context) [File search
Index and search across uploaded documents and media files.](https://ai.google.dev/gemini-api/docs/file-search) [Google Maps
Ground responses in real-world geospatial and location data.](https://ai.google.dev/gemini-api/docs/maps-grounding) [Computer use
Browser automation and screen interaction.](https://ai.google.dev/gemini-api/docs/computer-use)

## 9. Call your own functions

Function calling lets you connect the model to your code. You declare a function's name and parameters, the model decides when to call it and returns structured arguments, and you execute it locally and send the result back.

### Stateful (recommended)

### Python

    import json
    from google import genai

    client = genai.Client()

    weather_tool = {
        "type": "function",
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

    available_functions = {
        "get_current_temperature": lambda location: {
            "location": location, "temperature": "22", "unit": "celsius"
        },
    }

    user_input = "What is the temperature in London?"
    previous_id = None

    while True:
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=user_input,
            tools=[weather_tool],
            previous_interaction_id=previous_id,
        )

        function_results = []
        for step in interaction.steps:
            if step.type == "function_call":
                result = available_functions[step.name](**step.arguments)
                print(f"Called {step.name}({step.arguments}) → {result}")
                function_results.append({
                    "type": "function_result",
                    "name": step.name,
                    "call_id": step.id,
                    "result": [{"type": "text", "text": json.dumps(result)}],
                })

        if not function_results:
            break

        user_input = function_results
        previous_id = interaction.id

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const weatherTool = {
      type: "function",
      name: "get_current_temperature",
      description: "Gets the current temperature for a given location.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city name, e.g. San Francisco",
          },
        },
        required: ["location"],
      },
    };

    const availableFunctions = {
      get_current_temperature: ({ location }) => ({
        location, temperature: "22", unit: "celsius"
      }),
    };

    let input = "What is the temperature in London?";
    let previousId = null;
    let interaction;

    while (true) {
      interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input,
        tools: [weatherTool],
        previous_interaction_id: previousId,
      });

      const functionResults = [];
      for (const step of interaction.steps) {
        if (step.type === "function_call") {
          const result = availableFunctions[step.name](step.arguments);
          console.log(`Called ${step.name}(${JSON.stringify(step.arguments)}) →`, result);
          functionResults.push({
            type: "function_result",
            name: step.name,
            call_id: step.id,
            result: [{ type: "text", text: JSON.stringify(result) }],
          });
        }
      }

      if (functionResults.length === 0) break;

      input = functionResults;
      previousId = interaction.id;
    }

    console.log(interaction.output_text);

### REST

    # Turn 1: Send prompt with function declaration
    RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "What is the temperature in London?",
        "tools": [{
          "type": "function",
          "name": "get_current_temperature",
          "description": "Gets the current temperature for a given location.",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string", "description": "The city name"}
            },
            "required": ["location"]
          }
        }]
      }')

    INTERACTION_ID=$(echo "$RESPONSE1" | jq -r '.id')
    FC_NAME=$(echo "$RESPONSE1" | jq -r '.steps[] | select(.type=="function_call") | .name')
    FC_ID=$(echo "$RESPONSE1" | jq -r '.steps[] | select(.type=="function_call") | .id')
    echo "Function: $FC_NAME, Call ID: $FC_ID"

    # Turn 2: Send function result back
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "previous_interaction_id": "'$INTERACTION_ID'",
        "input": [{
          "type": "function_result",
          "name": "'$FC_NAME'",
          "call_id": "'$FC_ID'",
          "result": [{"type": "text", "text": "{\"location\": \"London\", \"temperature\": \"22\", \"unit\": \"celsius\"}"}]
        }],
        "tools": [{
          "type": "function",
          "name": "get_current_temperature",
          "description": "Gets the current temperature for a given location.",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string", "description": "The city name"}
            },
            "required": ["location"]
          }
        }]
      }'

### Stateless

You can also use function calling in stateless mode by managing the conversation history on the client side and setting `store=false`. In stateless mode, you must pass the full history of the conversation in the `input` field of each subsequent request. This history must include:

1. The initial `user_input` step.
2. All model-generated steps returned in Turn 1 (including `thought` and `function_call` steps) exactly as received.
3. The `function_result` step containing the output of your executed function.

### Python

    import json
    from google import genai

    client = genai.Client()

    weather_tool = {
        "type": "function",
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

    available_functions = {
        "get_current_temperature": lambda location: {
            "location": location, "temperature": "22", "unit": "celsius"
        },
    }

    history = [
        {
            "type": "user_input",
            "content": [{"type": "text", "text": "What is the temperature in London?"}]
        }
    ]

    while True:
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            store=False,
            input=history,
            tools=[weather_tool],
        )

        function_results = []
        for step in interaction.steps:
            history.append(step.model_dump())
            if step.type == "function_call":
                result = available_functions[step.name](**step.arguments)
                print(f"Called {step.name}({step.arguments}) → {result}")
                fn_result = {
                    "type": "function_result",
                    "name": step.name,
                    "call_id": step.id,
                    "result": [{"type": "text", "text": json.dumps(result)}],
                }
                function_results.append(fn_result)
                history.append(fn_result)

        if not function_results:
            break

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const weatherTool = {
      type: "function",
      name: "get_current_temperature",
      description: "Gets the current temperature for a given location.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city name, e.g. San Francisco",
          },
        },
        required: ["location"],
      },
    };

    const availableFunctions = {
      get_current_temperature: ({ location }) => ({
        location, temperature: "22", unit: "celsius"
      }),
    };

    const history = [
      {
        type: "user_input",
        content: [{ type: "text", text: "What is the temperature in London?" }]
      }
    ];

    let interaction;

    while (true) {
      interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        store: false,
        input: history,
        tools: [weatherTool],
      });

      const functionResults = [];
      for (const step of interaction.steps) {
        history.push(step);
        if (step.type === "function_call") {
          const result = availableFunctions[step.name](step.arguments);
          console.log(`Called ${step.name}(${JSON.stringify(step.arguments)}) →`, result);
          const fnResult = {
            type: "function_result",
            name: step.name,
            call_id: step.id,
            result: [{ type: "text", text: JSON.stringify(result) }],
          };
          functionResults.push(fnResult);
          history.push(fnResult);
        }
      }

      if (functionResults.length === 0) break;
    }

    console.log(interaction.output_text);

### REST

    # Turn 1: Send request with tools and store: false
    RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "store": false,
        "input": [
          {
            "type": "user_input",
            "content": "What is the temperature in London?"
          }
        ],
        "tools": [{
          "type": "function",
          "name": "get_current_temperature",
          "description": "Gets the current temperature for a given location.",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string", "description": "The city name"}
            },
            "required": ["location"]
          }
        }]
      }')

    # Extract model steps (thought, function_call)
    MODEL_STEPS=$(echo "$RESPONSE1" | jq '.steps')
    FC_NAME=$(echo "$RESPONSE1" | jq -r '.steps[] | select(.type=="function_call") | .name')
    FC_ID=$(echo "$RESPONSE1" | jq -r '.steps[] | select(.type=="function_call") | .id')
    echo "Function: $FC_NAME, Call ID: $FC_ID"

    # Assume local execution returns:
    RESULT="{\"location\": \"London\", \"temperature\": \"22\", \"unit\": \"celsius\"}"

    # Reconstruct history for Turn 2
    HISTORY=$(jq -n \
      --argjson first_input '[{"type": "user_input", "content": "What is the temperature in London?"}]' \
      --argjson model_steps "$MODEL_STEPS" \
      --arg fc_name "$FC_NAME" \
      --arg fc_id "$FC_ID" \
      --arg result "$RESULT" \
      '$first_input + $model_steps + [{"type": "function_result", "name": $fc_name, "call_id": $fc_id, "result": [{"type": "text", "text": $result}]}]')

    # Turn 2: Send the full history
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d "{
        \"model\": \"gemini-3.6-flash\",
        \"store\": false,
        \"input\": $HISTORY,
        \"tools\": [{
          \"type\": \"function\",
          \"name\": \"get_current_temperature\",
          \"description\": \"Gets the current temperature for a given location.\",
          \"parameters\": {
            \"type\": \"object\",
            \"properties\": {
              \"location\": {\"type\": \"string\", \"description\": \"The city name\"}
            },
            \"required\": [\"location\"]
          }
        }]
      }"

**Response:**

During Turn 1, the model returns a response with status `requires_action` and the `function_call` step:

    {
      "id": "v1_Chd...",
      "status": "requires_action",
      "steps": [
        {
          "type": "function_call",
          "id": "call_abc123",
          "name": "get_current_temperature",
          "arguments": {
            "location": "London"
          }
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash"
    }

After you run the function locally and submit the result (Turn 2), the final completed interaction returns:

    {
      "id": "v1_Chd...",
      "status": "completed",
      "steps": [
        {
          "type": "function_call",
          "id": "call_abc123",
          "name": "get_current_temperature",
          "arguments": {
            "location": "London"
          }
        },
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "The temperature in London is currently 22°C."
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash",
    }

For advanced features like parallel function calling or function choice modes, see the [function calling guide](https://ai.google.dev/gemini-api/docs/function-calling).

## 10. Run a managed agent

Managed agents run in a remote sandbox with access to tools like code execution and file management. Pass an `agent` instead of a `model` and set `environment="remote"`.

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
        environment="remote",
    )
    print(f"Environment: {interaction.environment_id}")
    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      agent: "antigravity-preview-05-2026",
      input: "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
      environment: "remote",
    });
    console.log(`Environment: ${interaction.environment_id}`);
    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "agent": "antigravity-preview-05-2026",
        "input": "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
        "environment": "remote"
      }'

You can also define and save [custom agents](https://ai.google.dev/gemini-api/docs/custom-agents) with your own instructions, skills, and data sources.
[Quickstart
Make your first agent call, stream responses, and build a custom agent.](https://ai.google.dev/gemini-api/docs/managed-agents-quickstart) [Antigravity Agent
Capabilities, tools, multimodal input, and pricing for the default agent.](https://ai.google.dev/gemini-api/docs/antigravity-agent) [Agents in AI Studio
Visual playground for prototyping agents without writing code.](https://ai.google.dev/gemini-api/docs/aistudio-agents)

## 11. Run tasks in the background

Set `background=True` to run long tasks asynchronously. Poll for results with `interactions.get()`. For more details, see the [Background execution guide](https://ai.google.dev/gemini-api/docs/background-execution).

### Python

    import time
    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input="Write a detailed analysis of the impact of artificial intelligence on modern healthcare.",
        background=True,
    )
    print(f"Started background task: {interaction.id}")
    print(f"Status: {interaction.status}")

    # Poll for completion
    while True:
        result = client.interactions.get(interaction.id)
        print(f"Status: {result.status}")
        if result.status == "completed":
            print(f"\nResult:\n{result.output_text}")
            break
        elif result.status == "failed":
            print(f"Failed: {result.error}")
            break
        time.sleep(5)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "Write a detailed analysis of the impact of artificial intelligence on modern healthcare.",
      background: true,
    });
    console.log(`Started background task: ${interaction.id}`);
    console.log(`Status: ${interaction.status}`);

    // Poll for completion
    while (true) {
      const result = await ai.interactions.get(interaction.id);
      console.log(`Status: ${result.status}`);
      if (result.status === "completed") {
        console.log(`\nResult:\n${result.output_text}`);
        break;
      } else if (result.status === "failed") {
        console.log(`Failed: ${result.error}`);
        break;
      }
      await new Promise(r => setTimeout(r, 5000));
    }

### REST

    # Start a background task
    RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.6-flash",
        "input": "Write a detailed analysis of the impact of artificial intelligence on modern healthcare.",
        "background": true
      }')

    INTERACTION_ID=$(echo "$RESPONSE" | jq -r '.id')
    echo "Started background task: $INTERACTION_ID"

    # Poll for completion
    while true; do
      RESULT=$(curl -s "https://generativelanguage.googleapis.com/v1beta/interactions/$INTERACTION_ID" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H "Api-Revision: 2026-05-20")
      STATUS=$(echo "$RESULT" | jq -r '.status')
      echo "Status: $STATUS"
      if [ "$STATUS" = "completed" ]; then
        echo "$RESULT" | jq -r '.steps[] | select(.type=="model_output") | .content[] | select(.type=="text") | .text'
        break
      elif [ "$STATUS" = "failed" ]; then
        echo "Failed"
        break
      fi
      sleep 5
    done

**Response:**

The initial response returns immediately with status `in_progress`:

    {
      "id": "v1_abc123",
      "status": "in_progress",
      "object": "interaction",
      "model": "gemini-3.6-flash"
    }

Once the background task is fully executed, checking the interaction state returns:

    {
      "id": "v1_abc123",
      "status": "completed",
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "Artificial intelligence has transformed modern healthcare in several..."
            }
          ]
        }
      ],
      "object": "interaction",
      "model": "gemini-3.6-flash",
    }

Read about running models and agents asynchronously in the [background execution guide](https://ai.google.dev/gemini-api/docs/background-execution).

## What's next

- [Background execution](https://ai.google.dev/gemini-api/docs/background-execution): Run long-running tasks asynchronously and manage state.
- [Text generation](https://ai.google.dev/gemini-api/docs/text-generation): System instructions, generation config, and advanced text patterns.
- [Image generation](https://ai.google.dev/gemini-api/docs/image-generation): Aspect ratios, image editing, and style references.
- [Image understanding](https://ai.google.dev/gemini-api/docs/image-understanding): Classification, object detection, and visual Q\&A.
- [Thinking](https://ai.google.dev/gemini-api/docs/thinking): Use chain-of-thought reasoning for complex tasks.
- [Function calling](https://ai.google.dev/gemini-api/docs/function-calling): Parallel, compositional, and constrained function modes.
- [Google Search](https://ai.google.dev/gemini-api/docs/google-search): Grounding, citations, and search suggestions.
- [Managed Agents](https://ai.google.dev/gemini-api/docs/managed-agents-quickstart): Pre-built agents with code execution and file management.
- [Deep Research](https://ai.google.dev/gemini-api/docs/deep-research): Autonomous multi-step research with planning and synthesis.
- [Structured output](https://ai.google.dev/gemini-api/docs/structured-output): JSON schemas, enums, and recursive type definitions.