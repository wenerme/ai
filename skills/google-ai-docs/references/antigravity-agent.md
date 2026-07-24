The Antigravity agent is a general-purpose managed agent on the Gemini API. A single API call gives you an agent that reasons, executes code, manages files, and browses the web inside your own secure Linux sandbox, hosted by Google.

It is powered by Gemini 3.6 Flash and uses the same harness as the Antigravity IDE. You can configure the underlying Gemini model using `agent_config`. Available through the [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview) and [Google AI Studio](https://aistudio.google.com).

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
| Filesystem | *(enabled via `environment`)* | Read, write, edit, search, and list files in the sandbox. The system enables these tools automatically when you set the `environment`. |
| Custom Functions | `function` | Define custom functions that the agent can request to execute. See [Function calling](https://ai.google.dev/gemini-api/docs/antigravity-agent#function-calling). |
| Remote MCP Server | `mcp_server` | Register external Model Context Protocol (MCP) servers as tools. See [MCP servers](https://ai.google.dev/gemini-api/docs/antigravity-agent#mcp-servers). |

You can intercept and validate `code_execution` and `filesystem` tool execution right inside the remote sandbox using synchronous [Hooks](https://ai.google.dev/gemini-api/docs/agent-hooks).

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

## Model selection

For `antigravity-preview-05-2026`, the default model is **Gemini 3.6 Flash** (`gemini-3.6-flash`). If you omit `agent_config`, the agent defaults to `gemini-3.6-flash`.

You can configure the underlying Gemini model using `agent_config` to optimize for speed, cost, or reasoning capability.

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Summarize the key differences between functional and object-oriented programming.",
        environment="remote",
        agent_config={
            "type": "antigravity",
            "model": "gemini-3.5-flash-lite",
        },
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Summarize the key differences between functional and object-oriented programming.",
        environment: "remote",
        agent_config: {
            type: "antigravity",
            model: "gemini-3.5-flash-lite",
        },
    }, { timeout: 300000 });

    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
          "agent": "antigravity-preview-05-2026",
          "input": "Summarize the key differences between functional and object-oriented programming.",
          "environment": "remote",
          "agent_config": {
              "type": "antigravity",
              "model": "gemini-3.5-flash-lite"
          }
      }'

The supported values for `agent_config.model` are:

| Model | Value in `agent_config.model` | Description |
|---|---|---|
| **Gemini 3.6 Flash** (default) | `gemini-3.6-flash` | Default balanced model for reasoning, coding, and tool use. |
| **Gemini 3.5 Flash** | `gemini-3.5-flash` | Previous generation Flash model for general agentic workflows. |
| **Gemini 3.5 Flash-Lite** | `gemini-3.5-flash-lite` | Lightweight model optimized for low latency and cost-sensitive tasks. |

When creating a managed agent with `agents.create`, you configure the model in the exact same way by passing `base_agent` and `agent_config`. Notice that you cannot override the model at interaction time for a managed agent created with `agents.create`. The model is locked to what was set when the agent was created. This ensures predictable tool calling behavior, consistent debugging, and adherence to security boundaries.

## Customizing the agent

You can extend the Antigravity agent by customizing its instructions, tools, and environment. The agent supports a filesystem-native approach to customization: you can mount files like `AGENTS.md` for instructions and skills under `.agents/skills/` directly into the sandbox, or pass configuration inline at interaction time. You can iterate on your configuration inline and then save it as a managed agent when you are ready.

For full details on how to build custom agents, see [Building Managed Agents](https://ai.google.dev/gemini-api/docs/custom-agents).

## Background execution

Agent tasks that involve multi-step reasoning, code execution, or file operations can take minutes to complete. Use `background=True` to run the interaction asynchronously. The API returns immediately with an interaction ID that you poll until the status is `completed` or `failed`.

### Python

    import time
    from google import genai

    client = genai.Client()

    # 1. Start the interaction in the background
    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Run a complex analysis on the repository.",
        environment="remote",
        background=True,
    )

    print(f"Interaction started in background: {interaction.id}")

    # 2. Poll for completion
    while interaction.status == "in_progress":
        time.sleep(5)
        interaction = client.interactions.get(id=interaction.id)

    if interaction.status == "completed":
        print(interaction.output_text)
    else:
        print(f"Finished with status: {interaction.status}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Run a complex analysis on the repository.",
        environment: "remote",
        background: true,
    });

    console.log(`Interaction started in background: ${interaction.id}`);

    let result = interaction;
    while (result.status === "in_progress") {
        await new Promise(resolve => setTimeout(resolve, 5000));
        result = await client.interactions.get(interaction.id);
    }

    if (result.status === "completed") {
        console.log(result.output_text);
    } else {
        console.log(`Finished with status: ${result.status}`);
    }

### REST

    # 1. Start the interaction in the background
    RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Api-Revision: 2026-05-20" \
      -d '{
          "agent": "antigravity-preview-05-2026",
          "input": "Run a complex analysis on the repository.",
          "environment": "remote",
          "background": true
      }')

    INTERACTION_ID=$(echo $RESPONSE | jq -r '.id')

    # 2. Poll for results (repeat until status is "completed")
    curl -s -X GET "https://generativelanguage.googleapis.com/v1beta/interactions/$INTERACTION_ID" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

Background execution requires `store=True`, which is the default. For real-time progress updates during background execution, see [Streaming background interactions](https://ai.google.dev/gemini-api/docs/interactions/streaming#streaming-background).

You can cancel a running background interaction using the `cancel` method.

### Python

    client.interactions.cancel(id="INTERACTION_ID")

### JavaScript

    await client.interactions.cancel("INTERACTION_ID");

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions/INTERACTION_ID:cancel" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

**Multi-turn with background execution**

When a background interaction involves stateful tools (like code execution in a sandbox), use the `environment_id` from the completed interaction to continue in the same environment. This ensures the agent picks up where it left off with all files and state intact.

### Python

    import time
    from google import genai

    client = genai.Client()

    # First turn: run a task in the background
    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Clone https://github.com/google/generative-ai-python and run its tests.",
        environment="remote",
        background=True,
    )

    while interaction.status == "in_progress":
        time.sleep(5)
        interaction = client.interactions.get(id=interaction.id)

    # Second turn: continue in the same environment
    followup = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Fix any failing tests and re-run them.",
        previous_interaction_id=interaction.id,
        environment=interaction.environment_id,
        background=True,
    )

    while followup.status == "in_progress":
        time.sleep(5)
        followup = client.interactions.get(id=followup.id)

    print(followup.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    // First turn: run a task in the background
    let interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Clone https://github.com/google/generative-ai-python and run its tests.",
        environment: "remote",
        background: true,
    });

    while (interaction.status === "in_progress") {
        await new Promise(resolve => setTimeout(resolve, 5000));
        interaction = await client.interactions.get(interaction.id);
    }

    // Second turn: continue in the same environment
    let followup = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Fix any failing tests and re-run them.",
        previous_interaction_id: interaction.id,
        environment: interaction.environment_id,
        background: true,
    });

    while (followup.status === "in_progress") {
        await new Promise(resolve => setTimeout(resolve, 5000));
        followup = await client.interactions.get(followup.id);
    }

    console.log(followup.output_text);

### REST

    # 1. Start first interaction in the background
    RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Api-Revision: 2026-05-20" \
      -d '{
          "agent": "antigravity-preview-05-2026",
          "input": "Clone https://github.com/google/generative-ai-python and run its tests.",
          "environment": "remote",
          "background": true
      }')

    INTERACTION_ID=$(echo $RESPONSE | jq -r '.id')

    # 2. Poll until completed (repeat until status is "completed")
    RESULT=$(curl -s -X GET "https://generativelanguage.googleapis.com/v1beta/interactions/$INTERACTION_ID" \
      -H "x-goog-api-key: $GEMINI_API_KEY")

    ENVIRONMENT_ID=$(echo $RESULT | jq -r '.environment_id')

    # 3. Continue in the same environment
    curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Api-Revision: 2026-05-20" \
      -d "{
          \"agent\": \"antigravity-preview-05-2026\",
          \"input\": \"Fix any failing tests and re-run them.\",
          \"previous_interaction_id\": \"$INTERACTION_ID\",
          \"environment\": \"$ENVIRONMENT_ID\",
          \"background\": true
      }"

## Environments

Each call creates or reuses a Linux sandbox. The `environment` parameter takes three forms:

| Form | Description |
|---|---|
| `"remote"` | Provision a fresh sandbox with default settings. |
| `"env_abc123"` | Reuse an existing environment by ID, preserving all files and state. |
| `{...}` | Full `EnvironmentConfig` with custom sources and network rules. |

See [Environments](https://ai.google.dev/gemini-api/docs/agent-environment) for details on sources (Git, GCS, inline), networking, lifecycle, and resource limits.

## Triggers

Triggers let you schedule an agent to run automatically on a cron schedule. A trigger binds an agent, environment, prompt, and schedule into a persistent resource that fires without manual intervention. Each execution reuses the same environment, so files created in one run persist and are visible to the next.

### Create a trigger

Create a trigger by specifying a cron schedule, time zone, and the interaction configuration. The trigger starts in `active` status and will fire on the next matching cron time. Save the returned `id` to manage the trigger in subsequent calls.

### Python

    from google import genai

    client = genai.Client()

    trigger = client.triggers.create(
        schedule="0 9 * * *",
        time_zone="America/Argentina/Buenos_Aires",
        display_name="issue-solver",
        interaction={
            "agent": "antigravity-preview-05-2026",
            "input": "Review open PRs in my-org/my-app for new comments and address feedback. Close issues whose PRs were merged. Then check for new issues labeled 'accepted', skip any already tracked in /workspace/solved-issues/, fix the rest, and open a PR for each. Save reports to /workspace/solved-issues/.",
            "environment": {
                "type": "remote",
                "network": {
                    "allowlist": [
                        {
                            "domain": "api.github.com",
                            "transform": {
                                "Authorization": "Bearer ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            },
                        },
                        {"domain": "github.com"},
                    ]
                },
            },
        },
    )

    print(f"Trigger created: {trigger.id}")
    print(f"Next run: {trigger.next_run_time}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const trigger = await client.triggers.create({
        schedule: "0 9 * * *",
        time_zone: "America/Argentina/Buenos_Aires",
        display_name: "issue-solver",
        interaction: {
            agent: "antigravity-preview-05-2026",
            input: [{
                type: "text",
                text: "Review open PRs in my-org/my-app for new comments and address feedback. Close issues whose PRs were merged. Then check for new issues labeled 'accepted', skip any already tracked in /workspace/solved-issues/, fix the rest, and open a PR for each. Save reports to /workspace/solved-issues/.",
            }],
            environment: {
                type: "remote",
                network: {
                    allowlist: [
                        {
                            domain: "api.github.com",
                            transform: {
                                "Authorization": "Bearer ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                            },
                        },
                        { domain: "github.com" },
                    ],
                },
            },
        },
    });

    console.log(`Trigger created: ${trigger.id}`);
    console.log(`Next run: ${trigger.next_run_time}`);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/triggers" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
          "schedule": "0 9 * * *",
          "time_zone": "America/Argentina/Buenos_Aires",
          "display_name": "issue-solver",
          "interaction": {
              "agent": "antigravity-preview-05-2026",
              "input": [{"type": "text", "text": "Review open PRs in my-org/my-app for new comments and address feedback. Close issues whose PRs were merged. Then check for new issues labeled accepted, skip any already tracked in /workspace/solved-issues/, fix the rest, and open a PR for each. Save reports to /workspace/solved-issues/."}],
              "environment": {
                  "type": "remote",
                  "network": {
                      "allowlist": [
                          {
                              "domain": "api.github.com",
                              "transform": {
                                  "Authorization": "Bearer ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                              }
                          },
                          {"domain": "github.com"}
                      ]
                  }
              }
          }
      }'

The `CreateTrigger` request accepts the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `schedule` | string | Yes | Cron expression (e.g., `0 * * * *` for hourly, `0 9 * * 1-5` for weekday mornings). |
| `time_zone` | string | Yes | IANA time zone (e.g., `UTC`, `America/Argentina/Buenos_Aires`). |
| `display_name` | string | No | Human-readable name for the trigger. |
| `max_consecutive_failures` | integer | No | Max failures before the trigger is automatically paused. Default: 5. |
| `execution_timeout_seconds` | integer | No | Timeout per execution in seconds. Default: 600. |
| `interaction` | object | Yes | A `CreateInteractionRequest` defining the agent, input, tools, and environment. |

The response includes the following key fields:

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the trigger. Use this in all subsequent operations. |
| `status` | string | Current state: `active`, `paused`, or `disabled`. |
| `next_run_time` | string | ISO 8601 timestamp of the next scheduled execution. |
| `consecutive_failure_count` | integer | Number of consecutive failed executions since the last success. |

### List triggers

Retrieve all triggers associated with your project.

### Python

    triggers = client.triggers.list()
    for trigger in triggers.triggers:
        print(f"{trigger.id}: {trigger.display_name} ({trigger.status})")

### JavaScript

    const triggers = await client.triggers.list();
    for (const trigger of triggers.triggers) {
        console.log(`${trigger.id}: ${trigger.display_name} (${trigger.status})`);
    }

### REST

    curl -X GET "https://generativelanguage.googleapis.com/v1beta/triggers" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### Get a trigger

Fetch the full configuration and current state of a single trigger.

### Python

    trigger = client.triggers.get(id="TRIGGER_ID")
    print(f"Schedule: {trigger.schedule}")
    print(f"Next run: {trigger.next_run_time}")

### JavaScript

    const trigger = await client.triggers.get("TRIGGER_ID");
    console.log(`Schedule: ${trigger.schedule}`);
    console.log(`Next run: ${trigger.next_run_time}`);

### REST

    curl -X GET "https://generativelanguage.googleapis.com/v1beta/triggers/TRIGGER_ID" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### Pause and resume

You can pause a trigger to stop scheduled executions, and resume it to reactivate the schedule. Pausing does not affect manual executions.

### Python

    # Pause
    client.triggers.update(id="TRIGGER_ID", status="paused")

    # Resume
    client.triggers.update(id="TRIGGER_ID", status="active")

### JavaScript

    // Pause
    await client.triggers.update("TRIGGER_ID", { status: "paused" });

    // Resume
    await client.triggers.update("TRIGGER_ID", { status: "active" });

### REST

    # Pause
    curl -X PATCH "https://generativelanguage.googleapis.com/v1beta/triggers/TRIGGER_ID" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{"status": "paused"}'

    # Resume
    curl -X PATCH "https://generativelanguage.googleapis.com/v1beta/triggers/TRIGGER_ID" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{"status": "active"}'

### Delete a trigger

Permanently remove a trigger. Past execution history is not deleted.

### Python

    client.triggers.delete(id="TRIGGER_ID")

### JavaScript

    await client.triggers.delete("TRIGGER_ID");

### REST

    curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/triggers/TRIGGER_ID" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### Run a trigger immediately

Fire a trigger on demand without waiting for the next scheduled time. This works even if the trigger is paused.

### Python

    client.triggers.run(trigger_id="TRIGGER_ID")

### JavaScript

    await client.triggers.run("TRIGGER_ID");

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/triggers/TRIGGER_ID/executions" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

### List executions

View the execution history for a trigger. Each execution includes a `status`, timestamps, an `interaction_id` you can use to fetch the full interaction output, and an `environment_id` confirming that all runs share the same sandbox.

### Python

    executions = client.triggers.list_executions(trigger_id="TRIGGER_ID")
    for ex in executions.trigger_executions:
        print(f"{ex.id}: {ex.status} ({ex.start_time} - {ex.end_time})")

    # Fetch the full interaction for an execution
    interaction = client.interactions.get(id=ex.interaction_id)
    print(interaction.output_text)

### JavaScript

    const executions = await client.triggers.listExecutions("TRIGGER_ID");
    for (const ex of executions.trigger_executions) {
        console.log(`${ex.id}: ${ex.status} (${ex.start_time} - ${ex.end_time})`);
    }

    // Fetch the full interaction for an execution
    const interaction = await client.interactions.get(ex.interaction_id);
    console.log(interaction.output_text);

### REST

    curl -X GET "https://generativelanguage.googleapis.com/v1beta/triggers/TRIGGER_ID/executions" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

## Availability and pricing

Antigravity agent is available in preview through the
[Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview) in Google AI Studio
and the Gemini API for both free tier and paid tier projects.

Pricing follows a [pay-as-you-go model](https://ai.google.dev/gemini-api/docs/pricing#pricing-for-agents)
based on the underlying Gemini model tokens and the tools the agent uses. Unlike a
standard chat request that produces a single output, an Antigravity interaction is an
agentic workflow. A single request triggers an autonomous loop of reasoning, tool
execution, code running, and file management. Free tier projects include a free rate limit
and usage quota.

Antigravity interactions run multi-turn autonomous loops and can consume
significant tokens. Set [budget controls](https://ai.google.dev/gemini-api/docs/antigravity-agent#budget-controls) on your request to
limit token usage. You can also monitor progress in real time with
[SSE streaming](https://ai.google.dev/gemini-api/docs/streaming), or cancel running requests.

### Budget controls

In addition to [model selection](https://ai.google.dev/gemini-api/docs/antigravity-agent#model-selection), set `max_total_tokens` inside `agent_config` (with `"type": "antigravity"`) to limit
the total number of tokens (input + output + thinking) an interaction can consume.
Cached tokens do not count toward this limit. When the agent reaches the limit, the
interaction stops and returns with `status: "incomplete"`. The limit is best-effort:
actual usage may slightly exceed it depending on when the agent checks the budget
between steps.

Set the budget on the interaction request in `agent_config` alongside `agent` and `input`.

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Analyze the dataset in /workspace/data.csv and generate a summary report.",
        agent_config={
            "type": "antigravity",
            "max_total_tokens": 50000
        },
        environment={
            "type": "remote",
            "sources": [
                {
                    "type": "inline",
                    "target": "/workspace/data.csv",
                    "content": "id,name,value\n1,alpha,100\n2,beta,200\n",
                }
            ],
        }
    )
    print(f"Status: {interaction.status}")  # "incomplete" if budget was hit
    print(f"Tokens used: {interaction.usage.total_tokens}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Analyze the dataset in /workspace/data.csv and generate a summary report.",
        agent_config: {
            type: "antigravity",
            max_total_tokens: 50000
        },
        environment: {
            type: "remote",
            sources: [
                {
                    type: "inline",
                    target: "/workspace/data.csv",
                    content: "id,name,value\n1,alpha,100\n2,beta,200\n",
                },
            ],
        },
    });
    console.log(`Status: ${interaction.status}`);
    console.log(`Tokens used: ${interaction.usage.total_tokens}`);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
        "agent": "antigravity-preview-05-2026",
        "input": "Analyze the dataset in /workspace/data.csv and generate a summary report.",
        "agent_config": {
          "type": "antigravity",
          "max_total_tokens": 50000
        },
        "environment": {
          "type": "remote",
          "sources": [
            {
              "type": "inline",
              "target": "/workspace/data.csv",
              "content": "id,name,value\n1,alpha,100\n2,beta,200\n"
            }
          ]
        }
      }'

#### Continuing an incomplete interaction

When an interaction returns `status: "incomplete"`, the agent's work and context
are preserved. Send a new interaction referencing the original interaction `id` and
`environment_id` to pick up where it left off. The new interaction gets its own
`max_total_tokens` budget.

### Python

    # Continue from where the agent stopped
    continuation = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="continue",
        previous_interaction_id=interaction.id,
        environment=interaction.environment_id,
        agent_config={
            "type": "antigravity",
            "max_total_tokens": 50000
        }
    )
    print(f"Status: {continuation.status}")

### JavaScript

    const continuation = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "continue",
        previous_interaction_id: interaction.id,
        environment: interaction.environment_id,
        agent_config: {
            type: "antigravity",
            max_total_tokens: 50000
        }
    });
    console.log(`Status: ${continuation.status}`);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
        "agent": "antigravity-preview-05-2026",
        "input": "continue",
        "previous_interaction_id": "INTERACTION_ID",
        "environment": "ENVIRONMENT_ID",
        "agent_config": {
          "type": "antigravity",
          "max_total_tokens": 50000
        }
      }'

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
- **Store requirement:** Agent execution using `background=True` requires `store=True`.
- **Stateful only function calling:** Function calling is only supported in stateful mode. You must use `previous_interaction_id` to continue the turn; reconstructing history manually (stateless mode) is not supported.
- **Unsupported multimodal types.** Audio, video, and document inputs are not supported at the moment. Only text and image are allowed.

## What's next

- [Quickstart](https://ai.google.dev/gemini-api/docs/managed-agents-quickstart): multi-turn conversations and streaming.
- [Building Custom Agents](https://ai.google.dev/gemini-api/docs/custom-agents): custom instructions, skills, and saving agents.
- [Environments](https://ai.google.dev/gemini-api/docs/agent-environment): sandbox configuration, sources, networking.
- [Hooks](https://ai.google.dev/gemini-api/docs/agent-hooks): enforce security gates and side-effect validation inside the sandbox.
- [Deep Research Agent](https://ai.google.dev/gemini-api/docs/deep-research): long-form research tasks.
- [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview): the underlying API.