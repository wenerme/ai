# Combine built-in tools and function calling

> [!WARNING]
> **Preview:** Built-in and custom tools combinations are in [Preview](https://cloud.google.com/products#product-launch-stages) and supported for [Gemini 3](https://ai.google.dev/gemini-api/docs/models#gemini-3) models only.

Gemini allows the combination of [built-in tools](https://ai.google.dev/gemini-api/docs/tools), such
as `google_search`, and [function calling](https://ai.google.dev/gemini-api/docs/function-calling)
(also known as *custom tools*) in a single generation by preserving and exposing
the context history of tool calls. Built-in and custom tool combinations allow
for complex, agentic workflows where, for example, the model can ground itself
in real-time web data before calling your specific business logic.

Here's an example that enables built-in and custom tool combinations with
`google_search` and a custom function `getWeather`:

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    getWeather = {
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

    # Turn 1: Initial request with Google Search (built-in) and getWeather (custom) tools enabled
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="What is the northernmost city in the United States? What's the weather like there today?",
        config=types.GenerateContentConfig(
          tools=[
            types.Tool(
              google_search=types.ToolGoogleSearch(),  # Built-in tool
              function_declarations=[getWeather]       # Custom tool
            ),
          ],
          include_server_side_tool_invocations=True
        ),
    )

    for part in response.candidates[0].content.parts:
        if part.tool_call:
            print(f"Tool call: {part.tool_call.tool_type} (ID: {part.tool_call.id})")
        if part.tool_response:
            print(f"Tool response: {part.tool_response.tool_type} (ID: {part.tool_response.id})")
        if part.function_call:
            print(f"Function call: {part.function_call.name} (ID: {part.function_call.id})")

    # Turn 2: Manually build history to circulate both tool and function context
    history = [
        types.Content(
            role="user",
            parts=[types.Part(text="What is the northernmost city in the United States? What's the weather like there today?")]
        ),
        # Response from Turn 1 includes tool_call, tool_response, and thought_signatures
        response.candidates[0].content,
        # Return the function_response
        types.Content(
            role="user",
            parts=[types.Part(
                function_response=types.FunctionResponse(
                    name="getWeather",
                    response={"response": "Very cold. 22 degrees Fahrenheit."},
                    id=response.candidates[0].content.parts[2].function_call.id # Match the ID from the function_call
                )
            )]
        )
    ]

    response_2 = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=history,
        config=types.GenerateContentConfig(
          tools=[
            types.Tool(
              google_search=types.ToolGoogleSearch(),
              function_declarations=[getWeather]
            ),
          ],
          # This flag needs to be enabled for built-in tool context circulation and tool combination
          include_server_side_tool_invocations=True
        ),
    )

    for part in response_2.candidates[0].content.parts:
        if part.text:
            print(part.text)

### Javascript

    import { GoogleGenAI } from '@google/genai';

    const client = new GoogleGenAI({});

    const getWeather = {
        name: "getWeather",
        description: "Get the weather in a given location",
        parameters: {
            type: "OBJECT",
            properties: {
                location: {
                    type: "STRING",
                    description: "The city and state, e.g. San Francisco, CA"
                }
            },
            required: ["location"]
        }
    };

    async function run() {
        const model = client.getGenerativeModel({
            model: "gemini-3.5-flash",
        });

        const tools = [
          { googleSearch: {} },
          { functionDeclarations: [getWeather] }
        ];
        // This flag needs to be enabled for built-in tool context circulation and tool combination
        const toolConfig = { includeServerSideToolInvocations: true };

        // Turn 1: Initial request with Google Search (built-in) and getWeather (custom) tools enabled
        const result1 = await model.generateContent({
            contents: [{role: "user", parts: [{text: "What is the northernmost city in the United States? What's the weather like there today?"}]}],
            tools: tools,
            toolConfig: toolConfig,
        });

        const response1 = result1.response;

        for (const part of response1.candidates[0].content.parts) {
            if (part.toolCall) {
                console.log(`Tool call: ${part.toolCall.toolType} (ID: ${part.toolCall.id})`);
            }
            if (part.toolResponse) {
                console.log(`Tool response: ${part.toolResponse.toolType} (ID: ${part.toolResponse.id})`);
            }
            if (part.functionCall) {
                console.log(`Function call: ${part.functionCall.name} (ID: ${part.functionCall.id})`);
            }
        }

        const functionCallId = response1.candidates[0].content.parts.find(p => p.functionCall)?.functionCall?.id;

        // Turn 2: Manually build history to circulate both tool and function context
        const history = [
            {
                role: "user",
                parts:[{text: "What is the northernmost city in the United States? What's the weather like there today?"}]
            },
            // Response from Turn 1 includes tool_call, tool_response, and thought_signatures
            response1.candidates[0].content,
            // Return the function_response
            {
                role: "user",
                parts: [{
                    functionResponse: {
                        name: "getWeather",
                        response: {response: "Very cold. 22 degrees Fahrenheit."},
                        id: functionCallId // Match the ID from the function_call
                    }
                }]
            }
        ];

        const result2 = await model.generateContent({
            contents: history,
            tools: tools,
            toolConfig: toolConfig,
        });

        for (const part of result2.response.candidates[0].content.parts) {
            if (part.text) {
                console.log(part.text);
            }
        }
    }

    run();

### Go

    package main

    import (
        "context"
        "fmt"
        "log"
        "os"

        "github.com/google/generative-ai-go/genai"
        "google.golang.org/api/option"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
        if err != nil {
            log.Exit(err)
        }
        defer client.Close()

        getWeather := &genai.FunctionDeclaration{
            Name:        "getWeather",
            Description: "Get the weather in a given location",
            Parameters: &genai.Schema{
                Type: genai.Object,
                Properties: map[string]*genai.Schema{
                    "location": {
                        Type:        genai.String,
                        Description: "The city and state, e.g. San Francisco, CA",
                    },
                },
                Required: []string{"location"},
            },
        }

        model := client.GenerativeModel("gemini-3.5-flash")
        model.Tools = []*genai.Tool{
            {GoogleSearch: &genai.GoogleSearch{}}, // Built-in tool
            {FunctionDeclarations: []*genai.FunctionDeclaration{getWeather}}, // Custom tool
        }
        ist := true
        model.ToolConfig = &genai.ToolConfig{
            IncludeServerSideToolInvocations: &ist, // This flag needs to be enabled for built-in tool context circulation and tool combination
        }

        chat := model.StartChat()

        // Turn 1: Initial request with Google Search (built-in) and getWeather (custom) tools enabled
        prompt := genai.Text("What is the northernmost city in the United States? What's the weather like there today?")
        resp1, err := chat.SendMessage(ctx, prompt)
        if err != nil {
            log.Exitf("SendMessage failed: %v", err)
        }

        if resp1 == nil || len(resp1.Candidates) == 0 || resp1.Candidates[0].Content == nil {
            log.Exit("empty response from model")
        }

        var functionCallID string
        for _, part := range resp1.Candidates[0].Content.Parts {
            switch p := part.(type) {
            case genai.FunctionCall:
                fmt.Printf("Function call: %s (ID: %s)\n", p.Name, p.ID)
                if p.Name == "getWeather" {
                    functionCallID = p.ID
                }
            case genai.ToolCallPart:
                fmt.Printf("Tool call: %s (ID: %s)\n", p.ToolType, p.ID)
            case genai.ToolResponsePart:
                fmt.Printf("Tool response: %s (ID: %s)\n", p.ToolType, p.ID)
            }
        }

        if functionCallID == "" {
            log.Exit("no getWeather function call in response")
        }

        // Turn 2: Provide function result back to model.
        // Chat history automatically includes tool_call, tool_response, and thought_signatures from Turn 1.
        fr := genai.FunctionResponse{
            Name: "getWeather",
            ID:   functionCallID,
            Response: map[string]any{
                "response": "Very cold. 22 degrees Fahrenheit.",
            },
        }

        resp2, err := chat.SendMessage(ctx, fr)
        if err != nil {
            log.Exitf("SendMessage for turn 2 failed: %v", err)
        }

        if resp2 == nil || len(resp2.Candidates) == 0 || resp2.Candidates[0].Content == nil {
            log.Exit("empty response from model in turn 2")
        }

        for _, part := range resp2.Candidates[0].Content.Parts {
            if txt, ok := part.(genai.Text); ok {
                fmt.Println(string(txt))
            }
        }
    }

### REST

    # Turn 1: Initial request with Google Search (built-in) and getWeather (custom) tools enabled
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
      "contents": [{
        "role": "user",
        "parts": [{
          "text": "What is the northernmost city in the United States? What'\''s the weather like there today?"
        }]
      }],
      "tools": [{
        "googleSearch": {}
      }, {
        "functionDeclarations": [{
          "name": "getWeather",
          "description": "Get the weather in a given location",
          "parameters": {
              "type": "OBJECT",
              "properties": {
                  "location": {
                      "type": "STRING",
                      "description": "The city and state, e.g. San Francisco, CA"
                  }
              },
              "required": ["location"]
          }
        }]
      }],
      "toolConfig": {
        "includeServerSideToolInvocations": true
      }
    }'

    # Turn 2: Manually build history to circulate both tool and function context
    # The following request assumes you have captured candidates[0].content from Turn 1 response,
    # and extracted function_call.id for getWeather.
    # Replace FUNCTION_CALL_ID and insert candidate content from turn 1.
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
      "contents": [
        {
          "role": "user",
          "parts": [{"text": "What is the northernmost city in the United States? What'\''s the weather like there today?"}]
        },
        YOUR_CANDIDATE_CONTENT_FROM_TURN_1_RESPONSE,
        {
          "role": "user",
          "parts": [{
            "functionResponse": {
              "name": "getWeather",
              "id": "FUNCTION_CALL_ID",
              "response": {"response": "Very cold. 22 degrees Fahrenheit."}
            }
          }]
        }
      ],
      "tools": [{
        "googleSearch": {}
      }, {
        "functionDeclarations": [{
          "name": "getWeather",
          "description": "Get the weather in a given location",
          "parameters": {
              "type": "OBJECT",
              "properties": {
                  "location": {
                      "type": "STRING",
                      "description": "The city and state, e.g. San Francisco, CA"
                  }
              },
              "required": ["location"]
          }
        }]
      }],
      "toolConfig": {
        "includeServerSideToolInvocations": true
      }
    }'

## How it works

Gemini 3 models use *tool context circulation* to enable built-in and custom
tool combinations. Tool context circulation makes it possible to preserve and
expose the context of built-in tools and share it with custom tools in the same
call from turn to turn.

### Enable tool combination

- You must set the `include_server_side_tool_invocations` flag to `true` to enable tool context circulation.
- Include the [`function_declarations`](https://ai.google.dev/gemini-api/docs/function-calling#function-declarations), along with the built-in tools you want to use, to trigger the combination behavior.
  - If you don't include `function_declarations`, tool context circulation will still act on the included built-in tools, as long as the flag is set.

### API returns parts

In a single response, the API returns the `toolCall` and `toolResponse`
parts for the built-in tool call. For the function (custom tool) call, the API
returns the `functionCall` call part, to which the user provides the
`functionResponse` part in the next turn.

- `toolCall` and `toolResponse`: The API returns these parts to preserve the context of which tools are run on the server side, and the result of their execution, for the next turn.
- `functionCall` and `functionResponse`: The API sends the function call to the user to fill out, and the user sends the result back in the function response (these parts are standard to all [function calling](https://ai.google.dev/gemini-api/docs/function-calling) in the Gemini API, not unique to the tool combination feature).
- ([Code execution](https://ai.google.dev/gemini-api/docs/code-execution) tool only) `executableCode` and `codeExecutionResult`: When using the Code Execution tool, instead of `functionCall` and `functionResponse`, the API returns `executableCode` (the code generated by the model that's meant to be executed) and `codeExecutionResult` (the result of the executable code).

You must return all parts, including all the [fields](https://ai.google.dev/gemini-api/docs/tool-combination#critical-fields) they
contain, back to the model on each turn to maintain context and enable tool
combinations.

### Critical fields in returned parts

Certain [parts returned by the API](https://ai.google.dev/gemini-api/docs/tool-combination#api-returns-parts) will include `id`,
`tool_type`, and `thought_signature` fields. These fields are critical to
maintaining tool context (and therefore critical to tool combinations); you need
to return all parts *as given in the response* in your subsequent requests.

- `id`: A unique identifier that maps a call to its response. `id` is **set on
  all function call responses** , regardless of tool context circulation. You *must* provide the same `id` in the function response that the API provides in the function call. Built-in tools automatically share the `id` between the tool call and tool response.
  - Found in all tool-related parts: `toolCall`, `toolResponse`, `functionCall`, `functionResponse`, `executableCode`, `codeExecutionResult`
- `tool_type`: Identifies the specific tool being used; the literal built-in tool or (e.g. `URL_CONTEXT`) or function (e.g. `getWeather`) name.
  - Found in `toolCall` and `toolResponse` parts.
- `thought_signature`: The actual encrypted context embedded in **each
  part returned by the API** . Context can't be reconstructed without thought signatures; if you don't return the thought signatures for all parts in every turn, the model will error out.
  - Found in *all* parts.

### Tool-specific data

Some built-in tools return user-visible data arguments specific to the tool
type.

| Tool | User visible tool call args (if any) | User visible tool response (if any) |
|---|---|---|
| **GOOGLE_SEARCH** | `queries` | `search_suggestions` |
| **GOOGLE_MAPS** | `queries` | `places` `google_maps_widget_context_token` |
| **URL_CONTEXT** | `urls` URLs to be browsed | `urls_metadata` `retrieved_url`: URLs browsed `url_retrieval_status`: Browse status |
| **FILE_SEARCH** | None | None |

## Example tool combination request structure

The following request structure shows the request structure of the prompt: "What
is the northernmost city in the United States? What's the weather like there
today?". It combines three tools: the built-in Gemini tools `google_search`
and `code_execution`, and a custom function `get_weather`.

    {
      "model": "models/gemini-3.5-flash",
      "contents": [{
        "parts": [{
          "text": "What is the northernmost city in the United States? What's the weather like there today?"
        }],
        "role": "user"
      }, {
        "parts": [{
          "thoughtSignature": "...",
          "toolCall": {
            "toolType": "GOOGLE_SEARCH_WEB",
            "args": {
              "queries": ["northernmost city in the United States"]
            },
            "id": "a7b3k9p2"
          }
        }, {
          "thoughtSignature": "...",
          "toolResponse": {
            "toolType": "GOOGLE_SEARCH_WEB",
            "response": {
              "search_suggestions": "..."
            },
            "id": "a7b3k9p2"
          }
        }, {
          "functionCall": {
            "name": "getWeather",
            "args": {
              "city": "Utqiaġvik, Alaska"
            },
            "id": "m4q8z1v6"
          },
          "thoughtSignature": "..."
        }],
        "role": "model"
      }, {
        "parts": [{
          "functionResponse": {
            "name": "getWeather",
            "response": {
              "response": "Very cold. 22 degrees Fahrenheit."
            },
            "id": "m4q8z1v6"
          }
        }],
        "role": "user"
      }],
      "tools": [{
        "functionDeclarations": [{
          "name": "getWeather"
        }]
      }, {
        "googleSearch": {
        }
      }, {
        "codeExecution": {
        }
      }],
      "toolConfig": {
        "includeServerSideToolInvocations": true
      }
    }

## Tokens and pricing

Note that `toolCall` and `toolResponse` parts in requests are counted towards
`prompt_token_count`. Since these intermediate tool steps are now visible and
returned to you, they are part of the conversation history. This is only the
case for *requests* , not *responses*.

The Google Search tool is an exception to this rule. Google Search already
applies its own pricing model at the query level, so tokens are not
double-charged (see the [Pricing](https://ai.google.dev/gemini-api/docs/pricing) page).

Read the [Tokens](https://ai.google.dev/gemini-api/docs/tokens) page for more information.

## Limitations

- Default to `VALIDATED` mode (`AUTO` mode is not supported) when `include_server_side_tool_invocations` flag is enabled
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
| [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution) | Server-side | Supported (built in, uses `executableCode` and `codeExecutionResult` parts) |
| [Computer Use](https://ai.google.dev/gemini-api/docs/computer-use) | Client-side | Supported (built in, uses `functionCall` and `functionResponse` parts) |
| [Custom functions](https://ai.google.dev/gemini-api/docs/function-calling) | Client-side | Supported (built in, uses `functionCall` and `functionResponse` parts) |

## What's next

- Learn more about [Function calling](https://ai.google.dev/gemini-api/docs/function-calling) in the Gemini API.
- Explore the supported tools:
  - [Google Search](https://ai.google.dev/gemini-api/docs/google-search)
  - [Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding)
  - [URL Context](https://ai.google.dev/gemini-api/docs/url-context)
  - [File Search](https://ai.google.dev/gemini-api/docs/file-search)