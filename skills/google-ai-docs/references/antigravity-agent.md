The Antigravity agent is a general-purpose managed agent on the Gemini API. A single API call gives you an agent that reasons, executes code, manages files, and browses the web inside your own secure Linux sandbox, hosted by Google.

It is powered by Gemini 3.5 Flash and uses the same harness as the Antigravity IDE. Available through the [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview) and [Google AI Studio](https://aistudio.google.com).

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Read Hacker News, summarize the top 10 stories, and save the results as a PDF.",
        environment="remote",
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Read Hacker News, summarize the top 10 stories, and save the results as a PDF.",
        environment: "remote",
    }, { timeout: 300000 });

    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "agent": "antigravity-preview-05-2026",
        "input": "Read Hacker News, summarize the top 10 stories, and save the results as a PDF.",
        "environment": "remote"
    }'

## Capabilities

Each call can provision a Linux sandbox and starts a tool-use loop. The agent plans, acts, observes results, and repeats until the task is done.

- **Code execution:** Run Bash, Python, and Node.js commands. Install packages, run tests, build apps.
- **File management:** Read, write, edit, search, and list files in the sandbox. Files persist across interactions.
- **Web access:** Google Search and URL fetching for data.
- **Context compaction:** Automatic context compaction (triggered at \~135k tokens) to support long-running, multi-turn sessions without losing context or hitting token limits.

See the [Quickstart](https://ai.google.dev/gemini-api/docs/managed-agents-quickstart) for multi-turn usage and streaming.

## Supported tools

By default, the agent has access to `code_execution`, `google_search`, and `url_context`. Filesystem tools are enabled automatically when you specify the `environment` parameter. You can also define **custom functions** to connect the agent to your own APIs and tools. You only need to specify the `tools` parameter when customizing or restricting the default set, or when adding custom functions.

| Tool | Type value | Description |
|---|---|---|
| Code Execution | `code_execution` | Run shell commands (bash, Python, Node) with stdout/stderr capture. |
| Google Search | `google_search` | Search the public web. |
| URL Context | `url_context` | Fetch and read web pages. |
| Filesystem | *(enabled via `environment`)* | Read, write, edit, search, and list files in the sandbox. No separate tool type; enabled automatically when `environment` is set. |
| Custom Functions | `function` | Define custom functions that the agent can request to execute. See [Function calling](https://ai.google.dev/gemini-api/docs/antigravity-agent#function-calling). |
| Remote MCP Server | `mcp_server` | Register external Model Context Protocol (MCP) servers as tools. See [MCP servers](https://ai.google.dev/gemini-api/docs/antigravity-agent#mcp-servers). |

To limit the agent to specific tools, pass only the ones you need:

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Search for the latest AI research papers on reasoning and summarize them.",
        environment="remote",
        tools=[
            {"type": "google_search"},
            {"type": "url_context"},
        ],
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Search for the latest AI research papers on reasoning and summarize them.",
        environment: "remote",
        tools: [
            { type: "google_search" },
            { type: "url_context" },
        ],
    }, { timeout: 300000 });

    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "agent": "antigravity-preview-05-2026",
        "input": "Search for the latest AI research papers on reasoning and summarize them.",
        "environment": "remote",
        "tools": [
            {"type": "google_search"},
            {"type": "url_context"}
        ]
    }'

## Multimodal Input

The Antigravity agent supports multimodal inputs. Currently, only `text` and `image` inputs are supported. Images must be supplied as inline base64-encoded strings (`data`).

### Python

    import base64
    from google import genai

    client = genai.Client()

    with open("path/to/chart.png", "rb") as f:
        image_bytes = f.read()

    interaction_inline = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input=[
            {"type": "text", "text": "Analyze this chart and summarize the trends."},
            {
                "type": "image",
                "data": base64.b64encode(image_bytes).decode("utf-8"),
                "mime_type": "image/png",
            },
        ],
        environment="remote",
    )

### JavaScript


    import { GoogleGenAI } from "@google/genai";

    import * as fs from "node:fs";

    const client = new GoogleGenAI({});
    const base64Image = fs.readFileSync("path/to/chart.png", { encoding: "base64" });

    const interactionInline = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: [
            { type: "text", text: "Analyze this chart and summarize the trends." },
            {
                type: "image",
                data: base64Image,
                mime_type: "image/png",
            },
        ],
        environment: "remote",
    }, { timeout: 300000 });

### REST

    BASE64_IMAGE=$(base64 -w0 /path/to/chart.png)

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d "{
        \"agent\": \"antigravity-preview-05-2026\",
        \"input\": [
            {\"type\": \"text\", \"text\": \"Analyze this chart and summarize the trends.\"},
            {
                \"type\": \"image\",
                \"mime_type\": \"image/png\",
                \"data\": \"$BASE64_IMAGE\"
            }
        ],
        \"environment\": \"remote\"
    }"

## Function calling

Function calling allows you to connect the Antigravity agent to external APIs and databases by defining custom tools the agent can invoke. For general concepts, see [Function calling with the Gemini API](https://ai.google.dev/gemini-api/docs/interactions/function-calling).

The following example demonstrates a 2-turn interaction. The agent first requests a custom `get_weather` function call, and the client executes it and returns the result in the second turn.

### Python

    from google import genai

    client = genai.Client()

    # 1. Define the custom function
    get_weather_tool = {
        "type": "function",
        "name": "get_weather",
        "description": "Gets the current weather for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and country, e.g. San Francisco, USA",
                }
            },
            "required": ["location"],
        },
    }

    # 2. Call the agent with the custom tool (Turn 1)
    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="What is the weather in Tokyo?",
        environment="remote",
        tools=[
            {"type": "code_execution"},  # Enable default code execution
            get_weather_tool,            # Add custom function
        ],
    )

    # Check if the agent requested a function call
    if interaction.status == "requires_action":
        # Find function calls that do not have a matching function result.
        # Filesystem tools (like write_file) are also represented as function calls
        # but are executed automatically by the environment.
        executed_calls = {step.call_id for step in interaction.steps if step.type == "function_result"}
        pending_calls = [step for step in interaction.steps if step.type == "function_call" and step.id not in executed_calls]

        if pending_calls:
            fc_step = pending_calls[0]
            print(f"Function to call: {fc_step.name} (ID: {fc_step.id})")
            print(f"Arguments: {fc_step.arguments}")

            # 3. Execute the function locally (simulated get_weather()) and send the result back (Turn 2)
            function_result = {
                "temperature": 23,
                "unit": "celsius"
            }

            final_interaction = client.interactions.create(
                agent="antigravity-preview-05-2026",
                previous_interaction_id=interaction.id,  # Reference the interaction ID
                environment=interaction.environment_id,
                input=[
                    {
                        "type": "function_result",
                        "name": fc_step.name,
                        "call_id": fc_step.id,
                        "result": function_result,
                    }
                ],
            )

            print(final_interaction.output_text)
            # Output: The current weather in Tokyo, Japan is 23°C (Celsius).
        else:
            print("No pending function calls.")
    else:
        print(f"Interaction completed with status: {interaction.status}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    // 1. Define the custom function
    const get_weather_tool = {
      type: "function",
      name: "get_weather",
      description: "Gets the current weather for a given location.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and country, e.g. San Francisco, USA",
          },
        },
        required: ["location"],
      },
    };

    // 2. Call the agent with the custom tool (Turn 1)
    const interaction = await client.interactions.create({
      agent: "antigravity-preview-05-2026",
      input: "What is the weather in Tokyo?",
      environment: "remote",
      tools: [
        { type: "code_execution" },
        get_weather_tool,
      ],
    }, { timeout: 300000 });

    if (interaction.status === "requires_action") {
      // Find function calls that do not have a matching function result.
      // Filesystem tools (like write_file) are also represented as function calls
      // but are executed automatically by the environment.
      const executedCalls = new Set(
        interaction.steps
          .filter(s => s.type === "function_result")
          .map(s => s.call_id)
      );
      const pendingCalls = interaction.steps.filter(
        s => s.type === "function_call" && !executedCalls.has(s.id)
      );

      if (pendingCalls.length > 0) {
        const fcStep = pendingCalls[0];
        console.log(`Function to call: ${fcStep.name} (ID: ${fcStep.id})`);

        // 3. Execute the function locally (simulated get_weather()) and send the result back (Turn 2)
        const functionResult = {
          temperature: 23,
          unit: "celsius"
        };

        const finalInteraction = await client.interactions.create({
          agent: "antigravity-preview-05-2026",
          previous_interaction_id: interaction.id, // Reference the interaction ID
          environment: interaction.environment_id,
          input: [
            {
              type: "function_result",
              name: fcStep.name,
              call_id: fcStep.id,
              result: functionResult,
            }
          ],
        }, { timeout: 300000 });

        console.log(finalInteraction.output_text);
      } else {
        console.log("No pending function calls.");
      }
    } else {
      console.log(`Interaction completed with status: ${interaction.status}`);
    }

### REST

    # 1. Turn 1: Request function call
    RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
          "agent": "antigravity-preview-05-2026",
          "input": "What is the weather in Tokyo?",
          "environment": "remote",
          "tools": [
              {"type": "code_execution"},
              {
                  "type": "function",
                  "name": "get_weather",
                  "description": "Gets the current weather for a given location.",
                  "parameters": {
                      "type": "object",
                      "properties": {
                          "location": {"type": "string"}
                      },
                      "required": ["location"]
                  }
              }
          ]
      }')

    # Extract interaction ID, environment ID, and call ID (requires jq)
    INTERACTION_ID=$(echo $RESPONSE | jq -r '.id')
    ENVIRONMENT_ID=$(echo $RESPONSE | jq -r '.environment_id')
    CALL_ID=$(echo $RESPONSE | jq -r '.steps[] | select(.type=="function_call") | .id')

    # 2. Turn 2: Send function result back using variables
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d "{
          \"agent\": \"antigravity-preview-05-2026\",
          \"previous_interaction_id\": \"$INTERACTION_ID\",
          \"environment\": \"$ENVIRONMENT_ID\",
          \"input\": [
              {
                  \"type\": \"function_result\",
                  \"name\": \"get_weather\",
                  \"call_id\": \"$CALL_ID\",
                  \"result\": {
                      \"temperature\": 23,
                      \"unit\": \"celsius\"
                  }
              }
          ]
      }"

## MCP servers

You can connect the Antigravity agent to external tools by registering remote Model Context Protocol (MCP) servers. The agent supports remote MCP servers over streamable HTTP.

When registering an MCP server, you must specify the following fields in the `tools` array:

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | string | Yes | Must be `"mcp_server"`. |
| `name` | string | Yes | A unique identifier for the server. Must be strictly lowercase and alphanumeric (matching `^[a-z0-9_-]+$`). |
| `url` | string | Yes | The endpoint URL of the remote MCP server. |
| `headers` | object | No | Custom headers (e.g., authentication) sent with requests. |
| `allowed_tools` | array | No | List of tool names allowed to be executed. If omitted, all tools are allowed. |

### Python

    from google import genai

    client = genai.Client()

    # Register a remote HTTP MCP server
    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="What is the weather in Tokyo?",
        environment="remote",
        tools=[{
            "type": "mcp_server",
            "name": "weather", # Must be lowercase
            "url": "https://gemini-api-demos.uc.r.appspot.com/mcp"
        }]
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "What is the weather in Tokyo?",
        environment: "remote",
        tools: [{
            type: "mcp_server",
            name: "weather", // Must be lowercase
            url: "https://gemini-api-demos.uc.r.appspot.com/mcp"
        }]
    }, { timeout: 300000 });

    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
          "agent": "antigravity-preview-05-2026",
          "input": "What is the weather in Tokyo?",
          "environment": "remote",
          "tools": [{
              "type": "mcp_server",
              "name": "weather",
              "url": "https://gemini-api-demos.uc.r.appspot.com/mcp"
          }]
      }'

## Customizing the agent

You can extend the Antigravity agent by customizing its instructions, tools, and environment. The agent supports a filesystem-native approach to customization: you can mount files like `AGENTS.md` for instructions and skills under `.agents/skills/` directly into the sandbox, or pass configuration inline at interaction time. You can iterate on your configuration inline and then save it as a managed agent when you are ready.

For full details on how to build custom agents, see [Building Managed Agents](https://ai.google.dev/gemini-api/docs/custom-agents).

## Environments

Each call creates or reuses a Linux sandbox. The `environment` parameter takes three forms:

| Form | Description |
|---|---|
| `"remote"` | Provision a fresh sandbox with default settings. |
| `"env_abc123"` | Reuse an existing environment by ID, preserving all files and state. |
| `{...}` | Full `EnvironmentConfig` with custom sources and network rules. |

See [Environments](https://ai.google.dev/gemini-api/docs/agent-environment) for details on sources (Git, GCS, inline), networking, lifecycle, and resource limits.

## Availability and pricing

Antigravity agent is available in preview through the [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview) in Google AI Studio and the Gemini API.

Pricing follows a [pay-as-you-go model](https://ai.google.dev/gemini-api/docs/pricing#pricing-for-agents) based on the underlying Gemini model tokens and the tools the agent uses. Unlike a standard chat request that produces a single output, an Antigravity interaction is an agentic workflow. A single request triggers an autonomous loop of reasoning, tool execution, code running, and file management.

> [!NOTE]
> **Note:** Unlike standard Gemini models, the Antigravity agent runs through multiple autonomous loops per interaction and can accumulate a high number of tokens. You can monitor your agent runs (through [SSE streaming](https://ai.google.dev/gemini-api/docs/streaming)) and cancel the request if the agent appears to be stuck or is running longer than expected.

### Estimated costs

Costs vary based on task complexity. The agent autonomously determines how many tool calls, code executions, and file operations are needed. The following estimates are based on runs.

| Task category | Input tokens | Output tokens | Typical cost |
|---|---|---|---|
| **Research \& information synthesis** | 100k--500k | 10k--40k | $0.30--$1.00 |
| **Document \& content generation** | 100k--500k | 15k--50k | $0.30--$1.30 |
| **Process \& system design** | 100k--400k | 10k--30k | $0.25--$0.80 |
| **Data processing \& analysis** | 300k--3M | 30k--150k | $0.70--$3.25 |

50--70% of input tokens are typically cached. Complex agentic workflows with many tool calls can accumulate 3--5 million tokens in a single interaction, with costs up to \~$5.

**Environment compute** (CPU, memory, sandbox execution) is **not billed** during the preview period.

## Limitations

- **Preview status:** The Antigravity agent and the Interactions API. Features and schemas may change.
- **Unsupported generation config:** The following parameters are not supported and return a 400 error: `temperature`, `top_p`, `top_k`, `stop_sequences`, `max_output_tokens`.
- **Structured output:** The Antigravity agent does not support structured outputs.
- **Unavailable tools:** `file_search`, `computer_use`, and `google_maps` are not yet supported.
- **Remote MCP limitations:** Server-Sent Events (SSE) transport is not supported (use Streamable HTTP). Additionally, the server `name` must be strictly lowercase and alphanumeric (using uppercase letters triggers a generic `400 Bad Request` error).
- **Filesystem tool:** There is no filesystem tool at the moment. It is part of the `environment`.
- **Background:** Agent does not support using `background=True` and requires `store=True`.
- **Stateful only function calling:** Function calling is only supported in stateful mode. You must use `previous_interaction_id` to continue the turn; reconstructing history manually (stateless mode) is not supported.
- **Unsupported multimodal types.** Audio, video, and document inputs are not supported at the moment. Only text and image are allowed.

## What's next

- [Quickstart](https://ai.google.dev/gemini-api/docs/managed-agents-quickstart): multi-turn conversations and streaming.
- [Building Custom Agents](https://ai.google.dev/gemini-api/docs/custom-agents): custom instructions, skills, and saving agents.
- [Environments](https://ai.google.dev/gemini-api/docs/agent-environment): sandbox configuration, sources, networking.
- [Deep Research Agent](https://ai.google.dev/gemini-api/docs/deep-research): long-form research tasks.
- [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview): the underlying API.