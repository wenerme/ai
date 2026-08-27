This guide walks you through creating and using Managed Agents on the Gemini API, using the [Antigravity agent](https://ai.google.dev/gemini-api/docs/agents/antigravity-agent). You'll make your first agent call, continue a multi-turn conversation, stream the response, download files from the sandbox, and work with the Antigravity managed agent.

## Run your first agent interaction

A single call to the [Interactions API](https://ai.google.dev/gemini-api/docs) provisions a Linux sandbox, runs the agent loop, and returns the result. You'll define three parameters:

- Pass in the `agent` as `"antigravity-preview-05-2026",` which is the current version of our predefined and general purpose managed agent.
- Define `environment="remote"`, to provision a new, fresh sandbox environment.
- Create an input, defining what you want the agent to do.

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
        environment="remote",
    )

    # Print the agent's final output
    print(f"Interaction ID: {interaction.id}")
    print(f"Environment ID: {interaction.environment_id}")
    print(f"Output: {interaction.output_text}")

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
        environment: "remote",
    });

    console.log(`Interaction ID: ${interaction.id}`);
    console.log(`Environment ID: ${interaction.environment_id}`);

    console.log(`Output: ${interaction.output_text}`);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionEnvironment;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction req =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.7-flash"))
            .input(InteractionsInput.of("Summarize the project structure."))
            .environment(CreateModelInteractionEnvironment.of("remote"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "agent": "antigravity-preview-05-2026",
        "input": [{"type": "text", "text": "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents."}],
        "environment": {"type": "remote"}
    }'

The response returns an `Interaction` object. Store `interaction.id` and `interaction.environment_id` to continue the conversation in the same sandbox. Use `interaction.output_text` to access the agent's final response. `interaction.steps` lists each step the agent took (reasoning, tool calls, code execution).

## Continue the conversation (multi-turn)

The API tracks two independent state dimensions:

- **Conversation context:** chat history, reasoning trace, tool use, using `previous_interaction_id`.
- [**Environment state:**](https://ai.google.dev/gemini-api/docs/agent-environment) files, installed packages and sandbox state, using `environment`.

Pass both in their respective place to resume:

### Python

    interaction_2 = client.interactions.create(
        agent="antigravity-preview-05-2026",
        previous_interaction_id=interaction.id,
        environment=interaction.environment_id,
        input="Now plot the Fibonacci sequence as a line chart and save it as chart.png.",
    )

    print(interaction_2.output_text)

### JavaScript

    const interaction2 = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        previous_interaction_id: interaction.id,
        environment: interaction.environment_id,
        input: "Now plot the Fibonacci sequence as a line chart and save it as chart.png.",
    }, { timeout: 300_000 });

    console.log(interaction2.output_text);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionEnvironment;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction req =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.7-flash"))
            .input(InteractionsInput.of("Summarize the project structure."))
            .environment(CreateModelInteractionEnvironment.of("remote"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "agent": "antigravity-preview-05-2026",
        "previous_interaction_id": "interaction_id_from_step_1",
        "environment": "environment_id_from_step_1",
        "input": [{"type": "text", "text": "Now plot the Fibonacci sequence as a line chart and save it as chart.png."}]
    }'

Files from turn 1 (`fibonacci.txt`) persist in turn 2. The agent also retains conversation context.

You can mix and match these independently:

- **Clear conversation, keep files:** Omit `previous_interaction_id`, only pass the environment ID using `environment` for a fresh conversation in the same workspace.
- **Keep conversation, new workspace:** Pass `previous_interaction_id`, set `environment="remote"` for a fresh sandbox.

### Automatic context compaction

In long-running, multi-turn conversations, the raw history of reasoning steps, tool calls, and large file contents can quickly grow and consume significant context space. To prevent token limit errors and maintain the agent's focus (preventing "context rot"), the Managed Agents API features a native context compaction step at around 135k tokens. This happens automatically.

## Stream the response

For long-running tasks, you can stream the response to see the agent work in real time:

### Python

    from google import genai

    client = genai.Client()

    stream = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Read Hacker News, summarize the top 5 stories, and save the results as a PDF.",
        environment="remote",
        stream=True,
    )

    for event in stream:
        print(event)
        if event.event_type == "step.stop" and event.usage:
            print(event.usage)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const stream = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Read Hacker News, summarize the top 5 stories, and save the results as a PDF.",
        environment: "remote",
        stream: true,
    });

    for await (const event of stream) {
        console.log(event);
        if (event.event_type === "step.stop" && event.usage) {
            console.log(event.usage);
        }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionEnvironment;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction req =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.7-flash"))
            .input(InteractionsInput.of("Summarize the project structure."))
            .environment(CreateModelInteractionEnvironment.of("remote"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -N -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "agent": "antigravity-preview-05-2026",
        "input": "Read Hacker News, summarize the top 5 stories, and save the results as a PDF.",
        "environment": "remote",
        "stream": true
    }'

Streaming returns step deltas with incremental updates. When a step completes,
the `step.stop` event includes accumulated usage stats. Learn more in the
[Streaming guide](https://ai.google.dev/gemini-api/docs/streaming).

## Download files from the environment

When the agent creates files inside the sandbox. Download them using the Files API with a direct HTTP request (no SDK method yet):

### Python

    import os
    import requests
    import tarfile

    env_id = interaction.environment_id
    api_key = os.environ["GEMINI_API_KEY"]

    response = requests.get(
        f"https://generativelanguage.googleapis.com/v1beta/files/environment-{env_id}:download",
        params={"alt": "media"},
        headers={"x-goog-api-key": api_key},
        allow_redirects=True,
    )

    with open("snapshot.tar", "wb") as f:
        f.write(response.content)

    with tarfile.open("snapshot.tar") as tar:
        tar.extractall(path="extracted_snapshot")

### JavaScript

    import fs from "fs";
    import { execSync } from "child_process";

    const envId = interaction.environment_id;
    const apiKey = process.env.GEMINI_API_KEY || "";

    const url = `https://generativelanguage.googleapis.com/v1beta/files/environment-${envId}:download?alt=media`;
    const response = await fetch(url, {
        headers: {
            "x-goog-api-key": apiKey,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync("snapshot.tar", buffer);

    if (!fs.existsSync("extracted_snapshot")) {
        fs.mkdirSync("extracted_snapshot");
    }
    execSync("tar -xf snapshot.tar -C extracted_snapshot");

    console.log(fs.readdirSync("extracted_snapshot"));

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionEnvironment;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction req =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.7-flash"))
            .input(InteractionsInput.of("Summarize the project structure."))
            .environment(CreateModelInteractionEnvironment.of("remote"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -L -X GET "https://generativelanguage.googleapis.com/v1beta/files/environment-$ENV_ID:download?alt=media" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -o snapshot.tar

    tar -xf snapshot.tar -C extracted_snapshot

## Save a managed agent

In the previous steps, we used the default Antigravity agent and customized it inline. Once you have iterated on your configuration (instructions, skills, model selection, and environment), you can save it as a reusable managed agent. This allows you to invoke it by ID without repeating the configuration.

When you save an agent, notice the architectural symmetry with inline interactions: you specify `base_agent: "antigravity-preview-05-2026"` and can pass an `agent_config` with your chosen `model` just as you would on `interactions.create`. You also define a `base_environment` (either from sources or by forking an existing environment). The agent will use this environment and model configuration for every new interaction.

**From sources:** Define sources inline, or from other sources such as GitHub or Cloud Storage.

### Python

    agent = client.agents.create(
        id="fibonacci-analyst",
        base_agent="antigravity-preview-05-2026",
        agent_config={
            "type": "antigravity",
            "model": "gemini-3.7-flash",
        },
        system_instruction="You are a math analysis agent. Generate sequences, visualize them, and export results as PDF reports.",
        base_environment={
            "type": "remote",
            "sources": [
                {
                    "type": "inline",
                    "target": ".agents/AGENTS.md",
                    "content": "Always include a chart and a summary table in your reports.",
                },
                {
                    "type": "repository",
                    "source": "https://github.com/your-org/skills",
                    "target": ".agents/skills"
                }
            ],
        },
    )

    print(f"Saved agent: {agent.id}")

### JavaScript

    const agent = await client.agents.create({
        id: "fibonacci-analyst",
        base_agent: "antigravity-preview-05-2026",
        agent_config: {
            type: "antigravity",
            model: "gemini-3.7-flash",
        },
        system_instruction: "You are a math analysis agent. Generate sequences, visualize them, and export results as PDF reports.",
        base_environment: {
            type: "remote",
            sources: [
                {
                    type: "inline",
                    target: ".agents/AGENTS.md",
                    content: "Always include a chart and a summary table in your reports.",
                },
                {
                    type: "repository",
                    source: "https://github.com/your-org/skills",
                    target: ".agents/skills"
                }
            ],
        },
    });

    console.log(`Saved agent: ${agent.id}`);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionEnvironment;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction req =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.7-flash"))
            .input(InteractionsInput.of("Summarize the project structure."))
            .environment(CreateModelInteractionEnvironment.of("remote"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/agents" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "id": "fibonacci-analyst",
        "base_agent": "antigravity-preview-05-2026",
        "agent_config": {
            "type": "antigravity",
            "model": "gemini-3.7-flash"
        },
        "system_instruction": "You are a math analysis agent. Generate sequences, visualize them, and export results as PDF reports.",
        "base_environment": {
            "type": "remote",
            "sources": [
                {
                    "type": "inline",
                    "target": ".agents/AGENTS.md",
                    "content": "Always include a chart and a summary table in your reports."
                },
                {
                    "type": "repository",
                    "source": "https://github.com/your-org/skills",
                    "target": ".agents/skills"
                }
            ]
        }
    }'

## Invoke the managed agent

Once you've saved a managed agent, you can invoke it by ID. Each invocation forks the base environment, so every run starts clean:

### Python

    result = client.interactions.create(
        agent="fibonacci-analyst",
        input="Generate the first 50 prime numbers, plot their distribution, and save a PDF report.",
        environment="remote",
    )

    print(result.output_text)

### JavaScript

    const result = await client.interactions.create({
        agent: "fibonacci-analyst",
        input: "Generate the first 50 prime numbers, plot their distribution, and save a PDF report.",
        environment: "remote",
    }, {
        timeout: 300_000,
    });

    console.log(result.output_text);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionEnvironment;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

    Client client = new Client();

    CreateModelInteraction req =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.7-flash"))
            .input(InteractionsInput.of("Summarize the project structure."))
            .environment(CreateModelInteractionEnvironment.of("remote"))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
        "agent": "fibonacci-analyst",
        "environment": "remote",
        "input": "Generate the first 50 prime numbers, plot their distribution, and save a PDF report."
    }'

## What's next

- [Antigravity Agent](https://ai.google.dev/gemini-api/docs/antigravity-agent): capabilities, supported tools, multimodal input, pricing, and limitations.
- [Building Managed Agents](https://ai.google.dev/gemini-api/docs/custom-agents): extend Antigravity with your own instructions, skills, and data.
- [Environments](https://ai.google.dev/gemini-api/docs/agent-environment): sources, networking, lifecycle, resource limits.
- [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview): the underlying API for models and agents.