> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# API versions explained

This document provides a high-level overview of the differences between the `v1`
and `v1beta` versions of the Gemini API.

* **v1**: Stable version of the API. Features in the stable version are
  fully supported over the lifetime of the major version. If there are any
  breaking changes, a new major version of the API will be created and the
  existing version will be deprecated after a reasonable period of time.
  Non-breaking changes may be introduced to the API without changing the
  major version. The **Interactions API** and its core features are
  generally available in `v1`.
* **v1beta**: This version includes early features and capabilities that are
  actively being developed. While features in `v1beta` may be subject to
  changes as we refine them based on feedback, it lets you try new
  capabilities before they are promoted to stable.

{% callout type="warning" %}
  **The latest SDKs default to `v1`.** Starting with the November 2026 major
  releases, the Google Gen AI SDKs call `v1` unless you set a version. Earlier
  releases defaulted to `v1beta`. If you upgrade and use any `v1beta`-only feature in the
  [table below](/api-reference/api-versions#feature-support), such as the Live API, explicit context
  caching, or managed agents, those calls fail until you set the API version to
  `v1beta`. See [Configure API version in an SDK](/api-reference/api-versions#configure-api-version).

{% /callout %}

## Capability and feature support  {% id="feature-support" %}

The following table details the availability of capabilities across `v1` (GA)
and `v1beta` (Beta). Core API capabilities and tools apply to both
the Interactions API and `generateContent` unless specified otherwise:

{% callout type="note" %}
  All models are supported in both `v1` and `v1beta`. This table tracks the availability of features across the `v1` and `v1beta` **API versions** (endpoint routes and schema parameters).

{% /callout %}

| Feature | v1 | v1beta |
| :--- | :---: | :---: |
| **Core API capabilities** |  |  |
| [Interactions API](/docs/get-started) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Function Calling](/docs/function-calling) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Structured Output](/docs/structured-output) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Thinking / Reasoning](/docs/thinking) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [System Instructions](/docs/text-generation#system-instructions) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Audio Output (Speech Config)](/docs/speech-generation) |  | {% badge type="supported" /%} |
| [Audio Transcription (Transcription Config)](/docs/transcribe) |  | {% badge type="supported" /%} |
| [Service Tier (Priority / Flex)](/docs/optimization#inference-tiers) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| **Tools** |  |  |
| [Code Execution Tool](/docs/code-execution) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Google Search Grounding](/docs/google-search) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Google Maps Grounding](/docs/maps-grounding) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [URL Context Tool](/docs/url-context) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [File Search Tool](/docs/file-search) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Computer Use Tool](/docs/computer-use) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [MCP Servers Tool](/docs/function-calling#mcp) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| **Realtime APIs** |  |  |
| [Live API (WebSockets)](/docs/live-api) |  | {% badge type="supported" /%} |
| [Live Music API](/docs/realtime-music-generation) |  | {% badge type="supported" /%} |
| [Ephemeral Tokens (Live API)](/docs/live-api/ephemeral-tokens) |  | {% badge type="supported" /%} |
| **Platform APIs** |  |  |
| [Models API](/docs/models) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Files Service Route](/docs/files) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [File Search Stores Route](/docs/file-search#file-search-stores) | {% badge type="supported" /%} | {% badge type="supported" /%} |
| [Agents API](/docs/agents) |  | {% badge type="supported" /%} |
| [Webhooks API](/docs/webhooks) |  | {% badge type="supported" /%} |
| [Explicit Context Caching](/docs/caching?generate-content=true#explicit-caching) |  | {% badge type="supported" /%} |

## Configure API version in an SDK  {% id="configure-api-version" %}

The latest Gemini API SDKs default to `v1`. Earlier SDK releases defaulted to
`v1beta`. To use `v1beta`-only features, set the API version explicitly, as
shown in the following code samples. You can also set the
`GOOGLE_GENAI_API_VERSION` environment variable (for example,
`GOOGLE_GENAI_API_VERSION=v1beta`). A version set in code takes precedence
over the environment variable.

{% tabs %}
  {% tab filename="api_version.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client(http_options={"api_version": "v1beta"})
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input="Explain how AI works",
  )
  
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="api_version.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({
    httpOptions: { apiVersion: "v1beta" },
  });
  
  async function main() {
    const interaction = await ai.interactions.create({
      model: "gemini-4-hydrogen",
      input: "Explain how AI works",
    });
    console.log(interaction.output_text);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab filename="api_version.sh" label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": "Explain how AI works"
    }'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.HttpOptions;
  
  Client client = Client.builder()
      .httpOptions(HttpOptions.builder().apiVersion("v1beta").build())
      .build();
  
  CreateModelInteraction req = CreateModelInteraction.builder()
      .model(Model.of("gemini-3.6-flash"))
      .input(InteractionsInput.of("Explain how AI works"))
      .build();
  var interaction = client.interactions.create(CreateInteractionRequestBody.of(req)).interaction().get();
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
      client, err := genai.NewClient(ctx, &genai.ClientConfig{
          HTTPOptions: genai.HTTPOptions{
              APIVersion: "v1beta",
          },
      })
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.6-flash"),
              Input: interactions.NewInteractionsInput("Explain how AI works"),
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

{% /tabs %}

