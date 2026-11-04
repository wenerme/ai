> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Getting started

This guide gets you started with the Gemini API using the [Interactions
API](/docs/interactions-overview). You'll make your first API call in under a
minute and explore text generation, multimodal understanding, image generation,
structured output, tools, function calling, agents, and background execution.

The Interactions API is available through the
[Python](https://github.com/googleapis/python-genai) and
[JavaScript](https://github.com/googleapis/js-genai) SDKs, as well as through
REST.

## Choose the right Gemini tool  {% id="choose-tool" %}

Use the [Google GenAI SDKs](/docs/libraries) and [coding agent setup](/docs/coding-agents) when you are **building** Gemini into an application. Use the [Gemini API CLI](/docs/cli) (`gemini-api`) when an agent or script needs to **call** Gemini directly from the shell without adding SDK code to your project:

| Tool | What it does | When to use it |
| :--- | :--- | :--- |
| **[Google GenAI SDKs](/docs/libraries)** | Imports Gemini client libraries into Python, TypeScript, JavaScript, Go, Java, or C# code. | You are building Gemini features into your application, backend service, or real-time [Live API](/docs/live-api) session. |
| **[Gemini Docs MCP & skills](/docs/coding-agents)** | Gives coding agents live documentation search and current SDK rules. | Your coding agent is writing application code that imports a Google GenAI SDK. |
| **[Gemini API CLI](/docs/cli)** (`gemini-api`) | Calls Gemini models and managed agents from any shell. | Your coding agent, shell script, or CI job needs to generate media, analyze files, or run a background research agent with zero project dependencies. |

{% callout type="note" %}
  `gemini-api` is a stateless API client, not an interactive coding agent like `@google/gemini-cli`. You can run `gemini-api` inside any coding agent.

{% /callout %}

## 1. Get an API key  {% id="get-api-key" %}

To use the Gemini API, you need to have an API key to authenticate your
requests, enforce security limits, and track usage to your account.

*   Google AI Studio automatically creates a project and API key for new users.
  You can copy it from the [API keys
  page](https://aistudio.google.com/api-keys).
*   If you need a new key, click **Create API key** in AI Studio and follow the
  dialog to add a new key-project pair.

{% button href="https://aistudio.google.com/apikey" variant="ais" %}Create a Gemini API Key{% /button %}

Set your key as an environment variable:

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

### Upgrade to the paid tier  {% id="upgrade-paid-tier" %}

Upgrading to the paid tier increases your rate limits and requires setting up
Cloud Billing.

*   Click **Set up billing** on the AI Studio [API
  keys](https://aistudio.google.com/api-keys) or
  [Projects](https://aistudio.google.com/projects) pages.
*   Follow the Cloud Billing dialog to create or link a billing account, add a
  payment method, and prepay a minimum of $5 (or currency equivalent) in paid
  credits.
*   View your API usage in [Google AI Studio](https://aistudio.google.com/usage)
  under **Dashboard** > **Usage**.

See the [Billing page](/docs/billing) for more information.

## 2. Install the SDK and make your first call  {% id="2-install-the-sdk-and-make-your-first-call" %}

Install the SDK and generate text with a single API call.

{% tabs %}
  {% tab label="Python" %}
  Install the SDK:

  ```bash
  pip install -U google-genai
  ```

  Initialize the client and make a request:

  ```python
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Explain how AI works in a few words"
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  Install the SDK:

  ```bash
  npm install @google/genai
  ```

  Initialize the client and make a request:

  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Explain how AI works in a few words",
  });
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  
  Client client = new Client();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.of("Explain how AI works in a few words"))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Explain how AI works in a few words."),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Explain how AI works in a few words"
    }'
  ```

  **Response:**

  ```json
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
    "model": "gemini-3.8-flash",
  }
  ```

  When using REST, the API returns the full `Interaction` resource containing
    metadata, usage statistics, and the step-by-step history of the turn.

  {% /tab %}

{% /tabs %}

While the SDKs expose the full response, they also provide convenience
properties like `interaction.output_text` and `interaction.output_image` to
access final outputs directly. Learn more about the response structure in the
[Interactions overview](/docs/interactions-overview) or read the [text
generation guide](/docs/text-generation) for details on system instructions and
generation config.

{% callout type="info" %}
  **Building with an AI coding agent?** Install the skill and then paste the
  prompt to get started with the Gemini API using Interactions:

{% /callout %}

{% tabs %}
  {% tab label="Install" %}
  ```bash
  npx skills add google-gemini/gemini-skills --skill gemini-api-dev
  ```

  {% /tab %}

  {% tab label="Prompt" %}
  ```none
  Based on what you know about me and my learning style, interactively guide me through the concepts Getting Started for the Gemini API at https://aistudio.google.com/docs/get-started.md using the Interactions API
  ```

  {% /tab %}

{% /tabs %}

## 3. Stream the response  {% id="3-stream-the-response" %}

For more fluid interactions, stream the response as it's generated. Each
`step.delta` event delivers a chunk of text you can display immediately.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  stream = client.interactions.create(
      model="gemini-3.8-flash",
      input="Explain how AI works",
      stream=True
  )
  for event in stream:
      print(event)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const stream = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Explain how AI works",
    stream: true,
  });
  
  for await (const event of stream) {
    console.log(event);
  }
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.InteractionSSEStreamEvent;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.gaos.models.operations.CreateInteractionResponse;
  import com.google.genai.gaos.utils.EventStream;
  
  Client client = new Client();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.of("Explain how AI works"))
          .stream(true)
          .build();
  
  CreateInteractionResponse response =
      client.interactions.create(CreateInteractionRequestBody.of(params));
  
  try (EventStream<InteractionSSEStreamEvent> stream = response.events()) {
    for (InteractionSSEStreamEvent event : stream) {
      System.out.println(event);
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Write a haiku about coding."),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    --no-buffer \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Explain how AI works",
      "stream": true
    }'
  ```

  When streaming, the server responds with a stream of server-sent events (SSE).
    Each event includes a type and JSON data.

  **Response:**

  ```json
  event: interaction.created
  data: {"interaction":{"id":"v1_Chd...","status":"in_progress","model":"gemini-3.8-flash"},"event_type":"interaction.created"}
  
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
  ```

  {% /tab %}

{% /tabs %}

For a detailed look at handling streaming events and delta types, see the
[streaming interactions guide](/docs/streaming).

## 4. Multi-turn conversations  {% id="4-multi-turn-conversations" %}

The Interactions API supports multi-turn conversations with two approaches:

*   **Stateful (recommended)**: Continue a conversation on the server using
  `previous_interaction_id`. Ideal for most chat and agentic workflows where
  you want the server to manage history and optimize caching.
*   **Stateless**: Manage the conversation history on the client by passing all
  previous turns (including intermediate model thought and tool steps) in each
  request.

{% tabs %}
  {% tab title=Stateful (recommended) %}
  Chain interactions by passing `previous_interaction_id`. The server manages the
    full conversation history for you.

  {% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  # Server-side state (recommended)
  interaction1 = client.interactions.create(
      model="gemini-3.8-flash",
      input="I have 2 dogs in my house.",
  )
  print("Response 1:", interaction1.output_text)
  
  interaction2 = client.interactions.create(
      model="gemini-3.8-flash",
      input="How many paws are in my house?",
      previous_interaction_id=interaction1.id,
  )
  print("Response 2:", interaction2.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  // Server-side state (recommended)
  const interaction1 = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "I have 2 dogs in my house.",
  });
  console.log("Response 1:", interaction1.output_text);
  
  const interaction2 = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "How many paws are in my house?",
    previous_interaction_id: interaction1.id,
  });
  console.log("Response 2:", interaction2.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  
  Client client = new Client();
  
  // Server-side state (recommended)
  CreateModelInteraction params1 =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.of("I have 2 dogs in my house."))
          .build();
  
  Interaction interaction1 =
      client.interactions.create(CreateInteractionRequestBody.of(params1)).interaction().get();
  System.out.println("Response 1: " + interaction1.outputText().orElse(""));
  
  CreateModelInteraction params2 =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.of("How many paws are in my house?"))
          .previousInteractionId(interaction1.id().orElse(""))
          .build();
  
  Interaction interaction2 =
      client.interactions.create(CreateInteractionRequestBody.of(params2)).interaction().get();
  System.out.println("Response 2: " + interaction2.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model:  interactions.Model("gemini-3.8-flash"),
              Input:  interactions.NewInteractionsInput("Explain quantum computing in simple terms."),
              Stream: genai.Ptr(true),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      stream := res.InteractionSSEStreamEvent
      defer stream.Close()
  
      for stream.Next() {
          event := stream.Value()
          if stepDelta := event.GetDataStepDelta(); stepDelta != nil {
              if textDelta := stepDelta.GetDeltaText(); textDelta != nil {
                  fmt.Print(textDelta.GetText())
              }
          }
      }
      if err := stream.Err(); err != nil {
          log.Fatal(err)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "I have 2 dogs in my house."
    }')
  
  INTERACTION_ID=$(echo "$RESPONSE1" | jq -r '.id')
  echo "Interaction 1 ID: $INTERACTION_ID"
  
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "How many paws are in my house?",
      "previous_interaction_id": "'$INTERACTION_ID'"
    }'
  ```

  {% /tab %}

  {% /tabs %}

  {% /tab %}

  {% tab title="Stateless" %}
  Set `store=false` and manage conversation history on the client side. You must
    preserve and resend all model-generated steps (including `thought` and
    `function_call` steps) exactly as received.

  {% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  history = [
      {
          "type": "user_input",
          "content": [{"type": "text", "text": "I have 2 dogs in my house."}]
      }
  ]
  
  interaction1 = client.interactions.create(
      model="gemini-3.8-flash",
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
      model="gemini-3.8-flash",
      store=False,
      input=history
  )
  print("Response 2:", interaction2.steps[-1].content[0].text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const history = [
    {
      type: "user_input",
      content: [{ type: "text", text: "I have 2 dogs in my house." }]
    }
  ];
  
  const interaction1 = await ai.interactions.create({
    model: "gemini-3.8-flash",
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
    model: "gemini-3.8-flash",
    store: false,
    input: history
  });
  console.log("Response 2:", interaction2.steps.at(-1).content[0].text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.interactions.UserInputStep;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.List;
  
  Client client = new Client();
  
  List<Step> history = new ArrayList<>();
  history.add(
      UserInputStep.builder()
          .content(Arrays.asList(TextContent.builder().text("I have 2 dogs in my house.").build()))
          .build());
  
  CreateModelInteraction params1 =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .store(false)
          .input(InteractionsInput.ofStep(history))
          .build();
  
  Interaction interaction1 =
      client.interactions.create(CreateInteractionRequestBody.of(params1)).interaction().get();
  System.out.println("Response 1: " + interaction1.outputText().orElse(""));
  
  interaction1.steps().ifPresent(history::addAll);
  
  history.add(
      UserInputStep.builder()
          .content(Arrays.asList(TextContent.builder().text("How many paws are in my house?").build()))
          .build());
  
  CreateModelInteraction params2 =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .store(false)
          .input(InteractionsInput.ofStep(history))
          .build();
  
  Interaction interaction2 =
      client.interactions.create(CreateInteractionRequestBody.of(params2)).interaction().get();
  System.out.println("Response 2: " + interaction2.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      // 1. First turn
      res1, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Hi, my name is Alex."),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res1.Interaction.OutputText != nil {
          fmt.Println(*res1.Interaction.OutputText)
      }
  
      // 2. Second turn (passing PreviousInteractionID)
      res2, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model:                 interactions.Model("gemini-3.8-flash"),
              Input:                 interactions.NewInteractionsInput("What's my name?"),
              PreviousInteractionID: res1.Interaction.ID,
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res2.Interaction.OutputText != nil {
          fmt.Println(*res2.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  # Turn 1: Send with store: false
  RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
    -H "Api-Revision: 2026-05-20" \
    -d "{
      \"model\": \"gemini-3.8-flash\",
      \"store\": false,
      \"input\": $HISTORY
    }"
  ```

  **Response:**

  ```json
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
    "model": "gemini-3.8-flash"
  }
  ```

  The second interaction returns a complete response object that includes only the
        new steps, but is grounded in the previous turn's context. Learn more about
        maintaining state in the [multi-turn conversations
        guide](/docs/text-generation#multi-turn-conversations), or explore [stateless
        mode](/docs/text-generation#stateless-conversations) for client-side history
        management.

  {% /tab %}

  {% /tabs %}

  {% /tab %}

{% /tabs %}

## 5. Multimodal understanding  {% id="5-multimodal-understanding" %}

Gemini models understand images, audio, video, and documents natively. Pass
media alongside text in a single request.

{% tabs %}
  {% tab label="Python" %}
  ```python
  import base64
  from google import genai
  
  client = genai.Client()
  
  # Load a local image
  with open("sample.jpg", "rb") as f:
      image_bytes = f.read()
  image_b64 = base64.b64encode(image_bytes).decode("utf-8")
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import fs from "fs";
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  // Load a local image
  const imageBytes = fs.readFileSync("sample.jpg");
  const imageB64 = imageBytes.toString("base64");
  
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.AudioContent;
  import com.google.genai.gaos.models.interactions.AudioContentMimeType;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.nio.file.Files;
  import java.nio.file.Path;
  import java.util.Arrays;
  import java.util.Base64;
  
  Client client = new Client();
  
  // Load a local image
  byte[] imageBytes = Files.readAllBytes(Path.of("sample.jpg"));
  String imageB64 = Base64.getEncoder().encodeToString(imageBytes);
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(
              InteractionsInput.ofContent(
                  Arrays.asList(
                      TextContent.builder()
                          .text("Compare this local image and this remote audio file.")
                          .build(),
                      ImageContent.builder()
                          .data(imageB64)
                          .mimeType(ImageContentMimeType.IMAGE_JPEG)
                          .build(),
                      AudioContent.builder()
                          .uri("https://storage.googleapis.com/generativeai-downloads/data/sample.mp3")
                          .mimeType(AudioContentMimeType.AUDIO_MP3)
                          .build())))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "encoding/base64"
      "fmt"
      "log"
      "os"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      imageBytes, err := os.ReadFile("path/to/organ.jpg")
      if err != nil {
          log.Fatal(err)
      }
      base64Image := base64.StdEncoding.EncodeToString(imageBytes)
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: "What is in this image?",
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      Data:     genai.Ptr(base64Image),
                      MimeType: interactions.ImageContentMimeTypeImageJpeg.ToPointer(),
                  }),
              }),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  # Base64-encode local image
  BASE64_IMAGE=$(base64 -w 0 sample.jpg)
  
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
  ```

  **Response:**

  ```json
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
    "model": "gemini-3.8-flash",
  }
  ```

  {% /tab %}

{% /tabs %}

Explore how to pass images, video, and audio files in the [image understanding
guide](/docs/image-understanding).

{% card-grid %}
  {% card description="Transcribe, summarize, or answer questions about audio files." href="/docs/audio" icon="hearing" title="Audio understanding" /%}

  {% card description="Analyze video content, locate events, and describe actions." href="/docs/video-understanding" icon="videocam" title="Video understanding" /%}

  {% card description="Extract information from PDFs and other document formats." href="/docs/document-processing" icon="description" title="Document processing" /%}

{% /card-grid %}

## 6. Multimodal generation  {% id="6-multimodal-generation" %}

Gemini can generate images natively using the [Nano
Banana](/docs/image-generation) image models.

{% tabs %}
  {% tab label="Python" %}
  ```python
  import base64
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.1-flash-image",
      input="Generate an image of a futuristic city skyline at sunset",
  )
  
  with open("generated_image.png", "wb") as f:
      f.write(base64.b64decode(interaction.output_image.data))
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  const ai = new GoogleGenAI({});
  
  const interaction = await ai.interactions.create({
    model: "gemini-3.1-flash-image",
    input: "Generate an image of a futuristic city skyline at sunset",
  });
  
  const generatedImage = interaction.output_image;
  if (generatedImage && generatedImage.data) {
    const buffer = Buffer.from(generatedImage.data, "base64");
    fs.writeFileSync("generated_image.png", buffer);
  }
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.nio.file.Files;
  import java.nio.file.Path;
  import java.util.Base64;
  
  Client client = new Client();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.1-flash-image"))
          .input(InteractionsInput.of("Generate an image of a futuristic city skyline at sunset"))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  if (interaction.outputImage().isPresent()) {
    ImageContent generatedImage = interaction.outputImage().get();
    if (generatedImage.data().isPresent()) {
      byte[] imageBytes = Base64.getDecoder().decode(generatedImage.data().get());
      Files.write(Path.of("generated_image.png"), imageBytes);
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      weatherTool := interactions.NewTool(interactions.Function{
          Name:        genai.Ptr("get_current_weather"),
          Description: genai.Ptr("Gets the current weather for a given location."),
          Parameters: map[string]any{
              "type": "object",
              "properties": map[string]any{
                  "location": map[string]any{
                      "type":        "string",
                      "description": "The city and state, e.g. San Francisco, CA",
                  },
              },
              "required": []string{"location"},
          },
      })
  
      // 1. Send prompt with tool declaration
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("What is the weather like in Boston?"),
              Tools: []interactions.Tool{weatherTool},
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      // 2. Check if the model requested a function call
      for _, step := range res.Interaction.Steps {
          if call := step.FunctionCallStep; call != nil {
              fmt.Printf("Function to call: %s\n", call.Name)
              fmt.Printf("Arguments: %v\n", call.Arguments)
  
              // 3. Execute your local function and send the result back
              finalRes, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
                  Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
                      Model:                 interactions.Model("gemini-3.8-flash"),
                      PreviousInteractionID: res.Interaction.ID,
                      Input: interactions.NewInteractionsInput([]interactions.Step{
                          interactions.NewStep(interactions.FunctionResultStep{
                              Name:   genai.Ptr(call.Name),
                              CallID: call.ID,
                              Result: interactions.NewFunctionResultStepResultUnion(`{"temperature": "72F", "condition": "Sunny"}`),
                          }),
                      }),
                  }),
              })
              if err != nil {
                  log.Fatal(err)
              }
  
              if finalRes.Interaction.OutputText != nil {
                  fmt.Println(*finalRes.Interaction.OutputText)
              }
          }
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.1-flash-image",
      "input": [
        {"type": "text", "text": "Generate an image of a futuristic city skyline at sunset"}
      ]
    }'
  ```

  **Response:**

  ```json
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
  ```

  {% /tab %}

{% /tabs %}

When the model generates an image, it returns the base64-encoded image data in a
step within the `steps` array, as well as via the `output_image` convenience
property. Check out the [image generation guide](/docs/image-generation) to
learn about aspect ratios, image editing, and references.

{% card-grid %}
  {% card description="Generate expressive, multi-speaker speech with Gemini 3.1 Flash TTS." href="/docs/speech-generation" icon="record_voice_over" title="Speech generation" /%}

  {% card description="Create clips and full-length songs with Lyria 3.5." href="/docs/music-generation" icon="music_note" title="Music generation" /%}

{% /card-grid %}

## 7. Use structured output  {% id="7-use-structured-output" %}

Configure the model to return JSON that matches a schema you define. Structured
output works with [Pydantic](https://docs.pydantic.dev/latest/) (Python) and
[Zod](https://zod.dev/) (JavaScript).

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from pydantic import BaseModel, Field
  from typing import List, Optional
  
  class Recipe(BaseModel):
      recipe_name: str = Field(description="Name of the recipe.")
      ingredients: List[str] = Field(description="List of ingredients.")
      prep_time_minutes: Optional[int] = Field(description="Prep time in minutes.")
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input="Give me a recipe for banana bread",
      response_format={
          "type": "text",
          "mime_type": "application/json",
          "schema": Recipe.model_json_schema()
      },
  )
  
  recipe = Recipe.model_validate_json(interaction.output_text)
  print(recipe)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
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
    model: "gemini-3.8-flash",
    input: "Give me a recipe for banana bread",
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: recipeJsonSchema
    },
  });
  
  const recipe = recipeSchema.parse(JSON.parse(interaction.output_text));
  console.log(recipe);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.ResponseFormat;
  import com.google.genai.gaos.models.interactions.TextResponseFormat;
  import com.google.genai.gaos.models.interactions.TextResponseFormatMimeType;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.HashMap;
  import java.util.Map;
  
  Client client = new Client();
  
  Map<String, Object> recipeNameProp = new HashMap<>();
  recipeNameProp.put("type", "string");
  recipeNameProp.put("description", "Name of the recipe.");
  
  Map<String, Object> itemsProp = new HashMap<>();
  itemsProp.put("type", "string");
  
  Map<String, Object> ingredientsProp = new HashMap<>();
  ingredientsProp.put("type", "array");
  ingredientsProp.put("items", itemsProp);
  ingredientsProp.put("description", "List of ingredients.");
  
  Map<String, Object> prepTimeProp = new HashMap<>();
  prepTimeProp.put("type", "integer");
  prepTimeProp.put("description", "Prep time in minutes.");
  
  Map<String, Object> properties = new HashMap<>();
  properties.put("recipe_name", recipeNameProp);
  properties.put("ingredients", ingredientsProp);
  properties.put("prep_time_minutes", prepTimeProp);
  
  Map<String, Object> recipeJsonSchema = new HashMap<>();
  recipeJsonSchema.put("type", "object");
  recipeJsonSchema.put("properties", properties);
  recipeJsonSchema.put("required", Arrays.asList("recipe_name", "ingredients"));
  
  CreateModelInteractionResponseFormat format =
      CreateModelInteractionResponseFormat.of(
          ResponseFormat.of(
              TextResponseFormat.builder()
                  .mimeType(TextResponseFormatMimeType.APPLICATION_JSON)
                  .schema(recipeJsonSchema)
                  .build()));
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.of("Give me a recipe for banana bread"))
          .responseFormat(format)
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Who won the latest Super Bowl and what was the score?"),
              Tools: []interactions.Tool{
                  interactions.NewTool(interactions.GoogleSearch{}),
              },
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  
      // Optional: Inspect search queries and citations
      for _, step := range res.Interaction.Steps {
          if searchCall := step.GoogleSearchCallStep; searchCall != nil {
              fmt.Printf("Search queries: %v\n", searchCall.Arguments.Queries)
          } else if modelOut := step.ModelOutputStep; modelOut != nil {
              for _, part := range modelOut.Content {
                  if textPart := part.TextContent; textPart != nil {
                      for _, annotation := range textPart.Annotations {
                          if citation := annotation.URLCitation; citation != nil {
                              var title, url string
                              if citation.Title != nil {
                                  title = *citation.Title
                              }
                              if citation.URL != nil {
                                  url = *citation.URL
                              }
                              fmt.Printf("Source: %s (%s)\n", title, url)
                          }
                      }
                  }
              }
          }
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
  ```

  **Response:**

  ```json
  {
    "id": "v1_Chd...",
    "status": "completed",
    "steps": [
      {
        "type": "model_output",
        "content": [
          {
            "type": "text",
            "text": "{\n \"recipe_name\": \"Classic Banana Bread\",\n \"ingredients\": [\n \"3 ripe bananas, mashed\",\n \"1/3 cup melted butter\",\n \"3/4 cup sugar\",\n \"1 egg, beaten\",\n \"1 teaspoon vanilla extract\",\n \"1 teaspoon baking soda\",\n \"Pinch of salt\",\n \"1.5 cups all-purpose flour\"\n ],\n \"prep_time_minutes\": 15\n}"
          }
        ]
      }
    ],
    "object": "interaction",
    "model": "gemini-3.8-flash",
  }
  ```

  {% /tab %}

{% /tabs %}

The output text block contains a valid JSON string conforming exactly to the
requested schema. To learn how to define more complex structures and recursive
schemas, see the [structured output guide](/docs/structured-output).

## 8. Use tools  {% id="8-use-tools" %}

Ground the model's response in real-time information with Google Search. The API
automatically searches, processes results, and returns citations.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
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
                          print(f" [{annotation.title}]({annotation.url})")
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Who won the euro 2024?",
    tools: [{ type: "google_search" }]
  });
  
  console.log(interaction.output_text);
  
  // Print citations
  for (const step of interaction.steps) {
    if (step.type === "model_output") {
      for (const contentBlock of step.content || []) {
        if (contentBlock.type === "text" && contentBlock.annotations) {
          console.log("\nCitations:");
          for (const annotation of contentBlock.annotations) {
            if (annotation.type === "url_citation") {
              console.log(` [${annotation.title}](${annotation.url})`);
            }
          }
        }
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Annotation;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.GoogleSearch;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.ModelOutputStep;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.interactions.URLCitation;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.Collections;
  
  Client client = new Client();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.of("Who won the euro 2024?"))
          .tools(Arrays.asList(new GoogleSearch()))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
  System.out.println(interaction.outputText().orElse(""));
  
  // Print citations
  for (Step step : interaction.steps().orElse(Collections.emptyList())) {
    if (step instanceof ModelOutputStep outputStep) {
      for (Content contentBlock : outputStep.content().orElse(Collections.emptyList())) {
        if (contentBlock instanceof TextContent textContent && textContent.annotations().isPresent()) {
          System.out.println("\nCitations:");
          for (Annotation annotation : textContent.annotations().get()) {
            if (annotation instanceof URLCitation citation) {
              System.out.printf("  [%s](%s)%n", citation.title().orElse(""), citation.url().orElse(""));
            }
          }
        }
      }
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Calculate the 20th Fibonacci number and verify if it is prime."),
              Tools: []interactions.Tool{
                  interactions.NewTool(interactions.CodeExecution{}),
              },
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      for _, step := range res.Interaction.Steps {
          if codeCall := step.CodeExecutionCallStep; codeCall != nil {
              fmt.Printf("Generated Code:\n%s\n", codeCall.Arguments.Code)
          } else if codeRes := step.CodeExecutionResultStep; codeRes != nil {
              fmt.Printf("Execution Output:\n%s\n", codeRes.Result)
          }
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Who won the euro 2024?",
      "tools": [{"type": "google_search"}]
    }'
  ```

  **Response:**

  ```json
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
    "model": "gemini-3.8-flash",
  }
  ```

  {% /tab %}

{% /tabs %}

The search steps are detailed within the interaction history, and the final
output includes inline citations pointing to web sources.

You can learn how to extract search citations in the [Google Search grounding
guide](/docs/google-search), or see how to combine multiple tools in the [tool
combination guide](/docs/tool-combination).

{% card-grid %}
  {% card description="Run Python code in a secure sandboxed Borg environment." href="/docs/code-execution" icon="code" title="Code execution" /%}

  {% card description="Pass public web URLs directly to ground responses in webpage content." href="/docs/url-context" icon="link" title="URL context" /%}

  {% card description="Index and search across uploaded documents and media files." href="/docs/file-search" icon="search" title="File search" /%}

  {% card description="Ground responses in real-world geospatial and location data." href="/docs/maps-grounding" icon="map" title="Google Maps" /%}

  {% card description="Browser automation and screen interaction." href="/docs/computer-use" icon="computer" title="Computer use" /%}

{% /card-grid %}

## 9. Call your own functions  {% id="9-call-your-own-functions" %}

Function calling lets you connect the model to your code. You declare a
function's name and parameters, the model decides when to call it and returns
structured arguments, and you execute it locally and send the result back.

{% tabs %}
  {% tab title=Stateful (recommended) %}
  {% tabs %}
  {% tab label="Python" %}
  ```python
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
          model="gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
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
      model: "gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.FunctionResultStep;
  import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;
  
  Client client = new Client();
  
  Map<String, Object> locationProp = new HashMap<>();
  locationProp.put("type", "string");
  locationProp.put("description", "The city name, e.g. San Francisco");
  
  Map<String, Object> properties = new HashMap<>();
  properties.put("location", locationProp);
  
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  parameters.put("properties", properties);
  parameters.put("required", Arrays.asList("location"));
  
  Function weatherTool =
      Function.builder()
          .name("get_current_temperature")
          .description("Gets the current temperature for a given location.")
          .parameters(parameters)
          .build();
  
  InteractionsInput userInput = InteractionsInput.of("What is the temperature in London?");
  String previousId = null;
  Interaction interaction = null;
  
  while (true) {
    CreateModelInteraction.Builder paramsBuilder =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(userInput)
            .tools(Arrays.asList(weatherTool));
    if (previousId != null) {
      paramsBuilder.previousInteractionId(previousId);
    }
  
    interaction =
        client.interactions.create(CreateInteractionRequestBody.of(paramsBuilder.build())).interaction().get();
  
    List<Step> functionResults = new ArrayList<>();
    for (Step step : interaction.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep fcStep) {
        String resultJson = "{\"location\": \"London\", \"temperature\": \"22\", \"unit\": \"celsius\"}";
        System.out.printf(
            "Called %s(%s) -> %s%n",
            fcStep.name().orElse(""), fcStep.arguments().orElse(Collections.emptyMap()), resultJson);
        functionResults.add(
            FunctionResultStep.builder()
                .name(fcStep.name().orElse(""))
                .callId(fcStep.id().orElse(""))
                .result(
                    FunctionResultStepResultUnion.of(
                        Arrays.asList(TextContent.builder().text(resultJson).build())))
                .build());
      }
    }
  
    if (functionResults.isEmpty()) {
      break;
    }
  
    userInput = InteractionsInput.ofStep(functionResults);
    previousId = interaction.id().orElse(null);
  }
  
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      // Turn 1: Create a CSV file in the sandbox
      turn1, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Write a Python script to save a CSV file 'sales.csv' with 5 rows of sample data."),
              Tools: []interactions.Tool{
                  interactions.NewTool(interactions.CodeExecution{}),
              },
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      var env *interactions.CreateModelInteractionEnvironment
      if turn1.Interaction.EnvironmentID != nil {
          env = genai.Ptr(interactions.NewCreateModelInteractionEnvironment(*turn1.Interaction.EnvironmentID))
      }
  
      // Turn 2: Reuse the sandbox environment to analyze the file created in Turn 1
      turn2, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model:                 interactions.Model("gemini-3.8-flash"),
              PreviousInteractionID: turn1.Interaction.ID,
              Environment:           env,
              Input:                 interactions.NewInteractionsInput("Now read 'sales.csv' and compute the total revenue."),
              Tools: []interactions.Tool{
                  interactions.NewTool(interactions.CodeExecution{}),
              },
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      if turn2.Interaction.OutputText != nil {
          fmt.Println(*turn2.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  # Turn 1: Send prompt with function declaration
  RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% /tabs %}

  {% /tab %}

  {% tab title="Stateless" %}
  You can also use function calling in stateless mode by managing the conversation
    history on the client side and setting `store=false`. In stateless mode, you
    must pass the full history of the conversation in the `input` field of each
    subsequent request. This history must include:

  1.  The initial `user_input` step.
  2.  All model-generated steps returned in Turn 1 (including `thought` and
      `function_call` steps) exactly as received.
  3.  The `function_result` step containing the output of your executed function.

  {% tabs %}
  {% tab label="Python" %}
  ```python
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
          model="gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
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
      model: "gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Function;
  import com.google.genai.gaos.models.interactions.FunctionCallStep;
  import com.google.genai.gaos.models.interactions.FunctionResultStep;
  import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.Step;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.interactions.UserInputStep;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;
  
  Client client = new Client();
  
  Map<String, Object> locationProp = new HashMap<>();
  locationProp.put("type", "string");
  locationProp.put("description", "The city name, e.g. San Francisco");
  
  Map<String, Object> properties = new HashMap<>();
  properties.put("location", locationProp);
  
  Map<String, Object> parameters = new HashMap<>();
  parameters.put("type", "object");
  parameters.put("properties", properties);
  parameters.put("required", Arrays.asList("location"));
  
  Function weatherTool =
      Function.builder()
          .name("get_current_temperature")
          .description("Gets the current temperature for a given location.")
          .parameters(parameters)
          .build();
  
  List<Step> history = new ArrayList<>();
  history.add(
      UserInputStep.builder()
          .content(Arrays.asList(TextContent.builder().text("What is the temperature in London?").build()))
          .build());
  
  Interaction interaction = null;
  
  while (true) {
    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .store(false)
            .input(InteractionsInput.ofStep(history))
            .tools(Arrays.asList(weatherTool))
            .build();
  
    interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  
    List<Step> functionResults = new ArrayList<>();
    for (Step step : interaction.steps().orElse(Collections.emptyList())) {
      history.add(step);
      if (step instanceof FunctionCallStep fcStep) {
        String resultJson = "{\"location\": \"London\", \"temperature\": \"22\", \"unit\": \"celsius\"}";
        System.out.printf(
            "Called %s(%s) -> %s%n",
            fcStep.name().orElse(""), fcStep.arguments().orElse(Collections.emptyMap()), resultJson);
        FunctionResultStep fnResult =
            FunctionResultStep.builder()
                .name(fcStep.name().orElse(""))
                .callId(fcStep.id().orElse(""))
                .result(
                    FunctionResultStepResultUnion.of(
                        Arrays.asList(TextContent.builder().text(resultJson).build())))
                .build();
        functionResults.add(fnResult);
        history.add(fnResult);
      }
    }
  
    if (functionResults.isEmpty()) {
      break;
    }
  }
  
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      recipeSchema := map[string]any{
          "type": "object",
          "properties": map[string]any{
              "recipe_name":       map[string]any{"type": "string"},
              "prep_time_minutes": map[string]any{"type": "integer"},
              "ingredients": map[string]any{
                  "type":  "array",
                  "items": map[string]any{"type": "string"},
              },
          },
          "required": []string{"recipe_name", "prep_time_minutes", "ingredients"},
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput("Give me a quick recipe for chocolate chip cookies."),
              ResponseFormat: genai.Ptr(interactions.NewCreateModelInteractionResponseFormat(
                  interactions.NewResponseFormat(interactions.TextResponseFormat{
                      MimeType: interactions.TextResponseFormatMimeTypeApplicationJSON.ToPointer(),
                      Schema:   recipeSchema,
                  }),
              )),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  # Turn 1: Send request with tools and store: false
  RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
    -H "Api-Revision: 2026-05-20" \
    -d "{
      \"model\": \"gemini-3.8-flash\",
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
  ```

  **Response:**

  During Turn 1, the model returns a response with status `requires_action` and
        the `function_call` step:

  ```json
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
    "model": "gemini-3.8-flash"
  }
  ```

  After you run the function locally and submit the result (Turn 2), the final
        completed interaction returns:

  ```json
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
    "model": "gemini-3.8-flash",
  }
  ```

  {% /tab %}

  {% /tabs %}

  {% /tab %}

{% /tabs %}

For advanced features like parallel function calling or function choice modes,
see the [function calling guide](/docs/function-calling).

## 10. Run a managed agent  {% id="10-run-a-managed-agent" %}

Managed agents run in a remote sandbox with access to tools like code execution
and file management. Pass an `agent` instead of a `model` and set
`environment="remote"`.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      agent="antigravity-preview-09-2026",
      input="Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
      environment="remote",
  )
  print(f"Environment: {interaction.environment_id}")
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const interaction = await ai.interactions.create({
    agent: "antigravity-preview-09-2026",
    input: "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
    environment: "remote",
  });
  console.log(`Environment: ${interaction.environment_id}`);
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateAgentInteraction;
  import com.google.genai.gaos.models.interactions.CreateAgentInteractionEnvironment;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  
  Client client = new Client();
  
  CreateAgentInteraction params =
      CreateAgentInteraction.builder()
          .agent("antigravity-preview-09-2026")
          .input(
              InteractionsInput.of(
                  "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents."))
          .environment(CreateAgentInteractionEnvironment.of("remote"))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println("Environment: " + interaction.environmentId().orElse(""));
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-pro"),
              Input: interactions.NewInteractionsInput("Solve this logic puzzle: Three gods A, B, and C are called True, False, and Random..."),
              GenerationConfig: &interactions.GenerationConfig{
                  ThinkingLevel:     interactions.ThinkingLevelHigh.ToPointer(),
                  ThinkingSummaries: interactions.ThinkingSummariesAuto.ToPointer(),
              },
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      // Print thought summaries if returned
      for _, step := range res.Interaction.Steps {
          if thought := step.ThoughtStep; thought != nil {
              for _, part := range thought.Summary {
                  if part.TextContent != nil {
                      fmt.Printf("Thought Summary: %s\n", part.TextContent.Text)
                  }
              }
          }
      }
  
      if res.Interaction.OutputText != nil {
          fmt.Printf("Answer: %s\n", *res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "agent": "antigravity-preview-09-2026",
      "input": "Write a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt. Then read the file and print its contents.",
      "environment": "remote"
    }'
  ```

  {% /tab %}

{% /tabs %}

You can also define and save [custom agents](/docs/custom-agents) with your own
instructions, skills, and data sources.

{% card-grid %}
  {% card description="Make your first agent call, stream responses, and build a custom agent." href="/docs/managed-agents-quickstart" icon="rocket_launch" title="Quickstart" /%}

  {% card description="Capabilities, tools, multimodal input, and pricing for the default agent." href="/docs/antigravity-agent" icon="smart_toy" title="Antigravity Agent" /%}

  {% card description="Visual playground for prototyping agents without writing code." href="/docs/aistudio-agents" icon="experiment" title="Agents in AI Studio" /%}

{% /card-grid %}

## 11. Run tasks in the background  {% id="11-run-tasks-in-the-background" %}

Set `background=True` to run long tasks asynchronously. Poll for results with
`interactions.get()`.

{% tabs %}
  {% tab label="Python" %}
  ```python
  import time
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
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
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
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
      console.log(`Failed: ${JSON.stringify(result.errors)}`);
      break;
    }
    await new Promise(r => setTimeout(r, 5000));
  }
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionStatus;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.gaos.models.operations.GetInteractionByIdRequest;
  
  Client client = new Client();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(
              InteractionsInput.of(
                  "Write a detailed analysis of the impact of artificial intelligence on modern healthcare."))
          .background(true)
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  String interactionId = interaction.id().orElse("");
  System.out.println("Started background task: " + interactionId);
  System.out.println("Status: " + interaction.status().map(InteractionStatus::value).orElse(""));
  
  // Poll for completion
  while (true) {
    Interaction result =
        client.interactions.get(new GetInteractionByIdRequest(interactionId)).interaction().get();
    String status = result.status().map(InteractionStatus::value).orElse("");
    System.out.println("Status: " + status);
    if ("completed".equals(status)) {
      System.out.println("\nResult:\n" + result.outputText().orElse(""));
      break;
    } else if ("failed".equals(status)) {
      System.out.println("Failed: " + result.errors().orElse(null));
      break;
    }
    Thread.sleep(5000);
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
      "time"
  
      "google.golang.org/genai"
      "google.golang.org/genai/interactions/models/interactions"
      "google.golang.org/genai/interactions/models/operations"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      // Start a Deep Research agent in the background
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateAgentInteraction{
              Agent:      interactions.AgentOption("deep-research-preview-04-2026"),
              Input:      interactions.NewInteractionsInput("Research the competitive landscape of solid-state EV batteries in 2026."),
              Background: genai.Ptr(true),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
  
      interaction := res.Interaction
      fmt.Printf("Started research job: %s\n", *interaction.ID)
  
      // Poll until completion
      for interaction.Status != interactions.InteractionStatusCompleted && interaction.Status != interactions.InteractionStatusFailed {
          time.Sleep(10 * time.Second)
          getRes, err := client.Interactions.Get(ctx, operations.GetInteractionByIDRequest{
              ID: *interaction.ID,
          })
          if err != nil {
              log.Fatal(err)
          }
          interaction = getRes.Interaction
          fmt.Printf("Current status: %s\n", interaction.Status)
      }
  
      if interaction.Status == interactions.InteractionStatusCompleted {
          if interaction.OutputText != nil {
              fmt.Println(*interaction.OutputText)
          }
      } else {
          fmt.Printf("Research failed: %v\n", interaction.Errors)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  # Start a background task
  RESPONSE=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-3.8-flash",
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
  ```

  **Response:**

  The initial response returns immediately with status `in_progress`:

  ```json
  {
    "id": "v1_abc123",
    "status": "in_progress",
    "object": "interaction",
    "model": "gemini-3.8-flash"
  }
  ```

  Once the background task is fully executed, checking the interaction state
    returns:

  ```json
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
    "model": "gemini-3.8-flash",
  }
  ```

  {% /tab %}

{% /tabs %}

Read about running models and agents asynchronously in the [background execution
guide](/docs/background-execution).

## What's next  {% id="whats-next" %}

-   [Text generation](/docs/text-generation): System instructions, generation
  config, and advanced text patterns.
-   [Image generation](/docs/image-generation): Aspect ratios, image editing,
  and style references.
-   [Image understanding](/docs/image-understanding): Classification, object
  detection, and visual Q&A.
-   [Thinking](/docs/thinking): Use chain-of-thought reasoning for complex
  tasks.
-   [Function calling](/docs/function-calling): Parallel, compositional, and
  constrained function modes.
-   [Google Search](/docs/google-search): Grounding, citations, and search
  suggestions.
-   [Managed Agents](/docs/managed-agents-quickstart): Pre-built agents with
  code execution and file management.
-   [Deep Research](/docs/deep-research): Autonomous multi-step research with
  planning and synthesis.
-   [Structured output](/docs/structured-output): JSON schemas, enums, and
  recursive type definitions.

