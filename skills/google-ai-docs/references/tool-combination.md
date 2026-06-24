# Combine built-in tools and function calling

> [!NOTE]
> **Note:** This version of the page covers the **Interactions API** . You can use the toggle on this page to switch to the [generateContent API version of this page](https://ai.google.dev/gemini-api/docs/generate-content/tool-combination).

> [!NOTE]
> **Preview** : Built-in and custom tools combinations are in [Preview](https://cloud.google.com/products#product-launch-stages) and supported for [Gemini 3](https://ai.google.dev/gemini-api/docs/models#gemini-3) models only.

Gemini allows the combination of [built-in tools](https://ai.google.dev/gemini-api/docs/tools), such
as `google_search`, and [function calling](https://ai.google.dev/gemini-api/docs/function-calling)
(also known as *custom tools*) in a single interaction by preserving and exposing
the context history of tool calls. Built-in and custom tool combinations allow
for complex, agentic workflows where, for example, the model can ground itself
in real-time web data before calling your specific business logic.

Here's an example that enables built-in and custom tool combinations with
`google_search` and a custom function `getWeather`:

### Python

    # This will only work for SDK newer than 2.0.0
    from google import genai

    client = genai.Client()

    getWeather = {
        "type": "function",
        "name": "getWeather",
        "description": "Gets the weather for a requested city.",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "The city and state, e.g. Utqiaġvik, Alaska",
                },
            },
            "required": ["city"],
        },
    }

    # The Interactions API manages context automatically across tool calls.
    # The model will first use Google Search, then call getWeather.
    interaction = client.interactions.create(
        model="gemini-3.5-flash",
        input="What is the northernmost city in the United States? What's the weather like there today?",
        tools=[
            {"type": "google_search"},
            getWeather,
        ],
    )

    # Process steps: the interaction contains search results and a function call
    for step in interaction.steps:
        if step.type == "function_call":
            print(f"Function call: {step.name} with args: {step.arguments}")
            # In a real application, you would execute the function here
            # and provide the result back to the model.

### JavaScript

    // This will only work for SDK newer than 2.0.0
    import { GoogleGenAI } from '@google/genai';

    const client = new GoogleGenAI({});

    const getWeather = {
        type: "function",
        name: "getWeather",
        description: "Get the weather in a given location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA"
                }
            },
            required: ["location"]
        }
    };

    // The Interactions API manages context automatically across tool calls.
    // The model will first use Google Search, then call getWeather.
    const interaction = await client.interactions.create({
        model: "gemini-3.5-flash",
        input: "What is the northernmost city in the United States? What's the weather like there today?",
        tools: [
            { type: "google_search" },
            getWeather,
        ],
    });

    // Process steps: the interaction contains search results and a function call
    for (const step of interaction.steps) {
        if (step.type === "function_call") {
            console.log(`Function call: ${step.name} with args: ${JSON.stringify(step.arguments)}`);
            // In a real application, you would execute the function here
            // and provide the result back to the model.
        }
    }

### REST

    # Specifies the API revision to avoid breaking changes when they become default
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
      "model": "gemini-3.5-flash",
      "input": "What is the northernmost city in the United States? What'\''s the weather like there today?",
      "tools": [
        { "type": "google_search" },
        {
          "type": "function",
          "name": "getWeather",
          "description": "Get the weather in a given location",
          "parameters": {
              "type": "object",
              "properties": {
                  "location": {
                      "type": "string",
                      "description": "The city and state, e.g. San Francisco, CA"
                  }
              },
              "required": ["location"]
          }
        }
      ]
    }'

## How it works

Gemini 3 models use *tool context circulation* to enable built-in and custom
tool combinations. Tool context circulation makes it possible to preserve and
expose the context of built-in tools and share it with custom tools in the same
interaction.

### Enable tool combination

- Include the [`function_declarations`](https://ai.google.dev/gemini-api/docs/function-calling#function-declarations), along with the built-in tools you want to use, to trigger the combination behavior.

### API returns steps

In an interaction response, the API returns separate steps for built-in tool
calls and function (custom tool) calls:

- **Built-in tool steps**: The API manages these automatically, preserving context across turns.
- **Function call steps** : The API returns `function_call` steps for your custom functions. You execute the function and provide the result back.

### Critical fields in returned steps

Certain fields in the returned steps are critical to maintaining tool context and enabling tool combinations:

- **`id`** : Found on `function_call` and `function_response` steps. A unique identifier that maps a call to its response.
- **`signature`** : Found on `thought` steps, as well as all tool call (e.g., `function_call`) and result (e.g., `function_response`) steps for Gemini 3+ models. This encrypted context enables **tool context circulation** across interactions.

**Managing these fields:**

- **Stateful Mode (Recommended)** : When you use `previous_interaction_id`, the server automatically handles both `id` and `signature` fields.
- **Stateless Mode** : When managing conversation history manually, you must ensure that you pass both the `id` and the `signature` fields back to the model in subsequent requests to validate authenticity and maintain context. The official SDKs handle this automatically if you pass the full response object back to history.

### Tool-specific data

Some built-in tools return user-visible data arguments specific to the tool
type.

| Tool | User visible tool call args (if any) | User visible tool response (if any) |
|---|---|---|
| **google_search** | `queries` | `search_suggestions` |
| **google_maps** | `queries` | `places` `google_maps_widget_context_token` |
| **url_context** | `urls` URLs to be browsed | `status`: Browse status `retrieved_url`: URLs browsed |
| **file_search** | None | None |

## Tokens and pricing

Note that built-in tool call parts in requests are counted towards
`prompt_token_count`. Since these intermediate tool steps are now visible and
returned to you, they are part of the conversation history. This is only the
case for *requests* , not *responses*.

The Google Search tool is an exception to this rule. Google Search already
applies its own pricing model at the query level, so tokens are not
double-charged (see the [Pricing](https://ai.google.dev/gemini-api/docs/pricing) page).

Read the [Tokens](https://ai.google.dev/gemini-api/docs/tokens) page for more information.

## Limitations

- Default to `validated` mode (`auto` mode is not supported) when tool context circulation is enabled.
- Built-in tools like `google_search` rely on location and current time information, so if your `system_instruction` or `function_declaration.description` has conflicting location and time information, the tool combination feature might not work well.

## Supported tools

Standard tool context circulation applies to server-side (built-in) tools.
Code Execution is also a server-side tool, but has its own built-in solution to
context circulation. Computer Use and function calling are client-side tools,
and also have built-in solutions to context circulation.

| Tool | Execution side | Context Circulation Support |
|---|---|---|
| [Google Search](https://ai.google.dev/gemini-api/docs/google-search) | Server-side | Supported |
| [Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding) | Server-side | Supported |
| [URL Context](https://ai.google.dev/gemini-api/docs/url-context) | Server-side | Supported |
| [File Search](https://ai.google.dev/gemini-api/docs/file-search) | Server-side | Supported |
| [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution) | Server-side | Supported (built in, uses `code_execution` and `code_execution_result` steps) |
| [Computer Use](https://ai.google.dev/gemini-api/docs/computer-use) | Client-side | Supported (built in, uses `function_call` and `function_response` steps) |
| [Custom functions](https://ai.google.dev/gemini-api/docs/function-calling) | Client-side | Supported (built in, uses `function_call` and `function_response` steps) |

## What's next

- Learn more about [Function calling](https://ai.google.dev/gemini-api/docs/function-calling) in the Gemini API.
- Explore the supported tools:
  - [Google Search](https://ai.google.dev/gemini-api/docs/google-search)
  - [Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding)
  - [URL Context](https://ai.google.dev/gemini-api/docs/url-context)
  - [File Search](https://ai.google.dev/gemini-api/docs/file-search)