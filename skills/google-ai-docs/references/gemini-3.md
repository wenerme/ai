> [!CAUTION]
> **Deprecation notice:** This page is deprecated and will be removed. See the [What's new
> in Gemini 3.5 Flash](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.5) guide for the latest developer guidance, including migration instructions, prompting best practices, and an updated feature overview for all Gemini 3.x models.

Gemini 3 is our most intelligent model family to date, built on a foundation of
state-of-the-art reasoning. It is designed to bring any idea to life by
mastering agentic workflows, autonomous coding, and complex multimodal tasks.
This guide covers key features of the Gemini 3 model family and how to get the
most out of it.

Explore our [collection of Gemini 3 apps](https://aistudio.google.com/app/apps?source=showcase&showcaseTag=gemini-3) to
see how the model handles advanced reasoning, autonomous coding, and complex
multimodal tasks.

Get started with a few lines of code:

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.1-pro-preview",
        input="Find the race condition in this multi-threaded C++ snippet: [code here]",
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    async function run() {
      const interaction = await client.interactions.create({
        model: "gemini-3.1-pro-preview",
        input: "Find the race condition in this multi-threaded C++ snippet: [code here]",
      });

      console.log(interaction.output_text);
    }

    run();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.FunctionResultSubcontent;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(getImageTool))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    FunctionCallStep fcStep = null;
    for (Step step : interaction1.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep) {
        fcStep = (FunctionCallStep) step;
        break;
      }
    }

    if (fcStep != null) {
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      List<FunctionResultSubcontent> subcontents = new ArrayList<>();
      subcontents.add(TextContent.builder().text("instrument.jpg").build());
      subcontents.add(
          ImageContent.builder()
              .mimeType(ImageContentMimeType.IMAGE_JPEG)
              .data(base64ImageData)
              .build());

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(FunctionResultStepResultUnion.of(subcontents))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(getImageTool))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("Final model response: " + interaction2.outputText().orElse(""));
    }
    ```bash
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.1-pro-preview",
        "input": "Find the race condition in this multi-threaded C++ snippet: [code here]"
      }'

## Meet the Gemini 3 series

Gemini 3.1 Pro is best for complex tasks that
require broad world knowledge and advanced reasoning across modalities.

Gemini 3 Flash is our latest 3-series model, with Pro-level intelligence at the
speed and pricing of Flash.

Nano Banana Pro (also known as Gemini 3 Pro Image) is our highest quality image
generation model, and Nano Banana 2 (also known as Gemini 3.1 Flash Image) is
the high-volume, high-efficiency, lower price-point equivalent.

Gemini 3.1 Flash-Lite is our workhorse model built for cost-efficiency model and
high-volume tasks.

All Gemini 3 models are currently in preview.

| Model ID | Context Window (In / Out) | Knowledge Cutoff | Pricing (Input / Output)\* |
|---|---|---|---|
| **gemini-3.1-flash-lite** | 1M / 64k | Jan 2025 | $0.25 (text, image, video), $0.50 (audio) / $1.50 |
| **gemini-3.1-flash-image-preview** | 128k / 32k | Jan 2025 | $0.25 (Text Input) / $0.067 (Image Output)\*\* |
| **gemini-3.1-pro-preview** | 1M / 64k | Jan 2025 | $2 / $12 (\<200k tokens) $4 / $18 (\>200k tokens) |
| **gemini-3-flash-preview** | 1M / 64k | Jan 2025 | $0.50 / $3 |
| **gemini-3-pro-image-preview** | 65k / 32k | Jan 2025 | $2 (Text Input) / $0.134 (Image Output)\*\* |

*\* Pricing is per 1 million tokens unless otherwise noted.*
*\*\* Image pricing varies by resolution. See the [pricing page](https://ai.google.dev/gemini-api/docs/pricing) for details.*

For detailed limits, pricing, and additional information, see the
[models page](https://ai.google.dev/gemini-api/docs/models/gemini).

## New API features in Gemini 3

Gemini 3 introduces new parameters designed to give developers more control over
latency, cost, and multimodal fidelity.

### Level of thinking

Gemini 3 series models use dynamic thinking by default to reason through
prompts. You can use the `thinking_level` parameter, which controls the
**maximum** depth of the model's internal reasoning process before it produces a
response. Gemini 3 treats these levels as relative allowances for thinking
rather than strict token guarantees.

If `thinking_level` is not specified, Gemini 3 will default to `high`. For
faster, lower-latency responses when complex reasoning isn't required, you can
constrain the model's thinking level to `low`.

| Thinking Level | Gemini 3.1 Pro | Gemini 3.1 Flash-Lite | Gemini 3 Flash | Description |
|---|---|---|---|---|
| **`minimal`** | Not supported | Supported (Default) | Supported | Matches the "no thinking" setting for most queries. The model may think very minimally for complex coding tasks. Minimizes latency for chat or high throughput applications. Note, `minimal` does not guarantee that thinking is off. |
| **`low`** | Supported | Supported | Supported | Minimizes latency and cost. Best for simple instruction following, chat, or high-throughput applications. |
| **`medium`** | Supported | Supported | Supported | Balanced thinking for most tasks. |
| **`high`** | Supported (Default, Dynamic) | Supported (Dynamic) | Supported (Default, Dynamic) | Maximizes reasoning depth. The model may take significantly longer to reach a first (non thinking) output token, but the output will be more carefully reasoned. |

### Python

    from google import genai

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.1-pro-preview",
        input="How does AI work?",
        generation_config={"thinking_level": "low"},
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    const interaction = await client.interactions.create({
        model: "gemini-3.1-pro-preview",
        input: "How does AI work?",
        generation_config: {
          thinking_level: "low",
        },
      });

    console.log(interaction.output_text);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.FunctionResultSubcontent;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(getImageTool))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    FunctionCallStep fcStep = null;
    for (Step step : interaction1.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep) {
        fcStep = (FunctionCallStep) step;
        break;
      }
    }

    if (fcStep != null) {
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      List<FunctionResultSubcontent> subcontents = new ArrayList<>();
      subcontents.add(TextContent.builder().text("instrument.jpg").build());
      subcontents.add(
          ImageContent.builder()
              .mimeType(ImageContentMimeType.IMAGE_JPEG)
              .data(base64ImageData)
              .build());

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(FunctionResultStepResultUnion.of(subcontents))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(getImageTool))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("Final model response: " + interaction2.outputText().orElse(""));
    }
    ```bash
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.1-pro-preview",
        "input": "How does AI work?",
        "generation_config": {
          "thinking_level": "low"
        }
      }'

> [!IMPORTANT]
> **Important:** You cannot use both `thinking_level` and the legacy `thinking_budget` parameter in the same request. Doing so will return a 400 error.

### Temperature

For all Gemini 3 models, we strongly recommend keeping the temperature parameter
at its default value of `1.0`.

While previous models often benefited from tuning temperature to control
creativity versus determinism, Gemini 3's reasoning capabilities are optimized
for the default setting. Changing the temperature (setting it below 1.0) may
lead to unexpected behavior, such as looping or degraded performance,
particularly in complex mathematical or reasoning tasks.

### Thought signatures

Gemini 3 models use thought signatures to maintain reasoning context across API calls. These signatures are encrypted representations of the model's internal thought process.

- **Stateful Mode (Recommended)** : When using the Interactions API in stateful mode (providing `previous_interaction_id`), the server automatically manages conversation history and thought signatures.
- **Stateless Mode**: If you are managing conversation history manually, you must include thought blocks with their signatures in subsequent requests to validate authenticity.

For detailed information, see the [Thought Signatures](https://ai.google.dev/gemini-api/docs/thinking) page.\`

### Structured Outputs with tools

Gemini 3 models allow you to combine [Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output) with built-in tools, including
[Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search), [URL Context](https://ai.google.dev/gemini-api/docs/url-context), [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution), and [Function Calling](https://ai.google.dev/gemini-api/docs/function-calling).

### Python

    from google import genai
    from pydantic import BaseModel, Field
    from typing import List

    class MatchResult(BaseModel):
        winner: str = Field(description="The name of the winner.")
        final_match_score: str = Field(description="The final match score.")
        scorers: List[str] = Field(description="The name of the scorer.")

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3.1-pro-preview",
        input="Search for all details for the latest Euro.",
        tools=[
            {"type": "google_search"},
            {"type": "url_context"}
        ],
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": MatchResult.model_json_schema()
        },
    )

    result = MatchResult.model_validate_json(interaction.output_text)
    print(result)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as z from "zod";

    const matchJsonSchema = {
      type: "object",
      properties: {
        winner: { type: "string", description: "The name of the winner." },
        final_match_score: { type: "string", description: "The final score." },
        scorers: {
          type: "array",
          items: { type: "string" },
          description: "The name of the scorer."
        }
      },
      required: ["winner", "final_match_score", "scorers"]
    };

    const matchSchema = z.fromJSONSchema(matchJsonSchema);

    const client = new GoogleGenAI({});

    async function run() {
      const interaction = await client.interactions.create({
        model: "gemini-3.1-pro-preview",
        input: "Search for all details for the latest Euro.",
        tools: [
          { type: "google_search" },
          { type: "url_context" }
        ],
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: matchJsonSchema
        },
      });

      const match = matchSchema.parse(JSON.parse(interaction.output_text));
      console.log(match);
    }

    run();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.FunctionResultSubcontent;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(getImageTool))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    FunctionCallStep fcStep = null;
    for (Step step : interaction1.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep) {
        fcStep = (FunctionCallStep) step;
        break;
      }
    }

    if (fcStep != null) {
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      List<FunctionResultSubcontent> subcontents = new ArrayList<>();
      subcontents.add(TextContent.builder().text("instrument.jpg").build());
      subcontents.add(
          ImageContent.builder()
              .mimeType(ImageContentMimeType.IMAGE_JPEG)
              .data(base64ImageData)
              .build());

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(FunctionResultStepResultUnion.of(subcontents))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(getImageTool))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("Final model response: " + interaction2.outputText().orElse(""));
    }
    ```bash
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.1-pro-preview",
        "input": "Search for all details for the latest Euro.",
        "tools": [
          {"type": "google_search"},
          {"type": "url_context"}
        ],
        "response_format": {
            "type": "text",
            "mime_type": "application/json",
            "schema": {
                "type": "object",
                "properties": {
                    "winner": {"type": "string", "description": "The name of the winner."},
                    "final_match_score": {"type": "string", "description": "The final score."},
                    "scorers": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "The name of the scorer."
                    }
                },
                "required": ["winner", "final_match_score", "scorers"]
            }
        }
      }'

### Image generation

Gemini 3.1 Flash Image and Gemini 3 Pro Image let you generate and edit images
from text prompts. It uses
reasoning to "think" through a prompt and can retrieve real-time data---such as
weather forecasts or stock charts---before using [Google Search](https://ai.google.dev/gemini-api/docs/google-search) grounding before generating high-fidelity
images.

**New \& improved capabilities:**

- **4K \& text rendering:** Generate sharp, legible text and diagrams with up to 2K and 4K resolutions.
- **Grounded generation:** Use the `google_search` tool to verify facts and generate imagery based on real-world information. Grounding with Google *Image* Search available for Gemini 3.1 Flash Image.
- **Conversational editing:** Multi-turn image editing by simply asking for changes (e.g., "Make the background a sunset"). This workflow relies on **Thought Signatures** to preserve visual context between turns.

For complete details on aspect ratios, editing workflows, and configuration
options, see the [Image Generation guide](https://ai.google.dev/gemini-api/docs/image-generation).

### Python

    from google import genai
    import base64

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3-pro-image-preview",
        input="Generate an infographic of the current weather in Tokyo.",
        tools=[{"type": "google_search"}],
        response_format={
            "type": "image",
            "aspect_ratio": "16:9",
            "image_size": "4K"
        }
    )

    from PIL import Image
    import io

    generated_image = interaction.output_image
    if generated_image:
        image_data = base64.b64decode(generated_image.data)
        image = Image.open(io.BytesIO(image_data))
        image.save('weather_tokyo.png')
        image.show()

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from "node:fs";

    const client = new GoogleGenAI({});

    async function run() {
      const interaction = await client.interactions.create({
        model: "gemini-3-pro-image-preview",
        input: "Generate a visualization of the current weather in Tokyo.",
        tools: [{ type: "google_search" }],
        response_format: {
          type: "image",
          aspect_ratio: "16:9",
          image_size: "4K"
        }
      });

      const buffer = Buffer.from(interaction.output_image.data, 'base64');

      fs.writeFileSync('weather_tokyo.png', buffer);
    }

    run();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.FunctionResultSubcontent;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(getImageTool))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    FunctionCallStep fcStep = null;
    for (Step step : interaction1.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep) {
        fcStep = (FunctionCallStep) step;
        break;
      }
    }

    if (fcStep != null) {
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      List<FunctionResultSubcontent> subcontents = new ArrayList<>();
      subcontents.add(TextContent.builder().text("instrument.jpg").build());
      subcontents.add(
          ImageContent.builder()
              .mimeType(ImageContentMimeType.IMAGE_JPEG)
              .data(base64ImageData)
              .build());

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(FunctionResultStepResultUnion.of(subcontents))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(getImageTool))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("Final model response: " + interaction2.outputText().orElse(""));
    }
    ```bash
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3-pro-image-preview",
        "input": "Generate a visualization of the current weather in Tokyo.",
        "tools": [{"type": "google_search"}],
        "response_format": {
            "type": "image",
            "aspect_ratio": "16:9",
            "image_size": "4K"
        }
      }'

**Example Response**

![Weather Tokyo](https://ai.google.dev/static/gemini-api/docs/images/weather-tokyo.jpg)

### Code Execution with images

Gemini 3 Flash can treat vision as an active investigation, not just a static
glance. By combining reasoning with [code execution](https://ai.google.dev/gemini-api/docs/code-execution), the model formulates a plan, then writes and
executes Python code to zoom in, crop, annotate, or otherwise manipulate images
step-by-step to visually ground its answers.

**Use cases:**

- **Zoom and inspect:** The model implicitly detects when details are too small (e.g., reading a distant gauge or serial number) and writes code to crop and re-examine the area at higher resolution.
- **Visual math and plotting:** The model can run multi-step calculations using code (e.g., summing line items on a receipt, or generating a Matplotlib chart from extracted data).
- **Image annotation:** The model can draw arrows, bounding boxes, or other annotations directly onto images to answer spatial questions like "Where should this item go?".

To enable visual thinking, configure [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution) as a tool. The model will automatically use
code to manipulate images when needed.

### Python

    from google import genai
    from google.genai import types
    import requests
    from PIL import Image
    import io
    import base64

    image_path = "https://goo.gle/instrument-img"
    image_bytes = requests.get(image_path).content
    image = types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")

    client = genai.Client()

    interaction = client.interactions.create(
        model="gemini-3-flash-preview",
        input=[
            image,
            "Zoom into the expression pedals and tell me how many pedals are there?"
        ],
        tools=[{"type": "code_execution"}],
    )

    from IPython.display import display
    from PIL import Image
    import io

    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.type == "text":
                    print(content_block.text)
                elif content_block.type == "image":
                     display(Image.open(io.BytesIO(base64.b64decode(content_block.data))))
        elif step.type == "code_execution_call":
            print(step.code)
        elif step.type == "code_execution_result":
            print(step.output)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({});

    async function main() {
      const imageUrl = "https://goo.gle/instrument-img";
      const response = await fetch(imageUrl);
      const imageArrayBuffer = await response.arrayBuffer();
      const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

      const interaction = await client.interactions.create({
        model: "gemini-3-flash-preview",
        input: [
          {
            type: "image",
            mime_type: "image/jpeg",
            data: base64ImageData,
          },
          {
            type: "text",
            text: "Zoom into the expression pedals and tell me how many pedals are there?",
          },
        ],
        tools: [{ type: "code_execution" }],
      });

      for (const step of interaction.steps) {
        if (step.type === "model_output") {
          for (const contentBlock of step.content) {
            if (contentBlock.type === "text") {
              console.log("Text:", contentBlock.text);
            }
          }
        } else if (step.type === "code_execution_call") {
          console.log("Code:", step.code);
        } else if (step.type === "code_execution_result") {
          console.log("Output:", step.output);
        }
      }
    }

    main();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.FunctionResultSubcontent;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(getImageTool))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    FunctionCallStep fcStep = null;
    for (Step step : interaction1.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep) {
        fcStep = (FunctionCallStep) step;
        break;
      }
    }

    if (fcStep != null) {
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      List<FunctionResultSubcontent> subcontents = new ArrayList<>();
      subcontents.add(TextContent.builder().text("instrument.jpg").build());
      subcontents.add(
          ImageContent.builder()
              .mimeType(ImageContentMimeType.IMAGE_JPEG)
              .data(base64ImageData)
              .build());

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(FunctionResultStepResultUnion.of(subcontents))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(getImageTool))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("Final model response: " + interaction2.outputText().orElse(""));
    }
    ```bash
    IMG_URL="https://goo.gle/instrument-img"
    MODEL="gemini-3-flash-preview"

    MIME_TYPE=$(curl -sIL "$IMG_URL" | grep -i '^content-type:' | awk -F ': ' '{print $2}' | sed 's/\r$//' | head -n 1)
    if [[ -z "$MIME_TYPE" || ! "$MIME_TYPE" == image/* ]]; then
      MIME_TYPE="image/jpeg"
    fi

    if [[ "$(uname)" == "Darwin" ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -b 0)
    elif [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64)
    else
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -w0)
    fi

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -d '{
          "model": "'$MODEL'",
          "input": [
                {
                  "type": "image",
                  "mime_type":"'"$MIME_TYPE"'",
                  "data": "'"$IMAGE_B64"'"
                },
                {"type": "text", "text": "Zoom into the expression pedals and tell me how many pedals are there?"}
          ],
          "tools": [{"type": "code_execution"}]
        }'

For more details on code execution with images, see [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution#images).

### Multimodal function responses

[Multimodal function calling](https://ai.google.dev/gemini-api/docs/function-calling#multimodal)
allows users to have function responses containing
multimodal objects allowing for improved utilization of function calling
capabilities of the model. Standard function calling only supports text-based
function responses:

### Python

    # This will only work for SDK newer than 2.0.0
    from google import genai
    import requests
    import base64

    client = genai.Client()

    # 1. Define the tool
    get_image_tool = {
        "type": "function",
        "name": "get_image",
        "description": "Retrieves the image file reference for a specific order item.",
        "parameters": {
            "type": "object",
            "properties": {
                "item_name": {
                    "type": "string",
                    "description": "The name or description of the item ordered (e.g., 'instrument')."
                }
            },
            "required": ["item_name"],
        },
    }

    # 2. Send the request with tools
    interaction_1 = client.interactions.create(
        model="gemini-3-flash-preview",
        input="Show me the instrument I ordered last month.",
        tools=[get_image_tool],
    )

    # 3. Find the function call step
    fc_step = next(s for s in interaction_1.steps if s.type == "function_call")
    print(f"Tool Call: {fc_step.name}({fc_step.arguments})")

    # Execute tool (fetch image)
    image_path = "https://goo.gle/instrument-img"
    image_bytes = requests.get(image_path).content
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    # 4. Send multimodal function result back
    interaction_2 = client.interactions.create(
        model="gemini-3-flash-preview",
        previous_interaction_id=interaction_1.id,
        input=[{
            "type": "function_result",
            "name": fc_step.name,
            "call_id": fc_step.id,
            "result": [
                {"type": "text", "text": "instrument.jpg"},
                {
                    "type": "image",
                    "mime_type": "image/jpeg",
                    "data": image_b64,
                }
            ]
        }],
        tools=[get_image_tool]
    )

    print(f"\nFinal model response: {interaction_2.output_text}")

### JavaScript

    import { GoogleGenAI } from '@google/genai';

    const client = new GoogleGenAI({});

    const getImageTool = {
        type: 'function',
        name: 'get_image',
        description: 'Retrieves the image file reference for a specific order item.',
        parameters: {
            type: 'object',
            properties: {
                item_name: {
                    type: 'string',
                    description: "The name or description of the item ordered (e.g., 'instrument').",
                },
            },
            required: ['item_name'],
        },
    };

    const interaction1 = await client.interactions.create({
        model: 'gemini-3-flash-preview',
        input: 'Use the get_image tool to show me the instrument I ordered last month.',
        tools: [getImageTool],
    });

    const fcStep = interaction1.steps.find(s => s.type === 'function_call');
    console.log(`Tool Call: ${fcStep.name}(${JSON.stringify(fcStep.arguments)})`);

    const imageUrl = 'https://goo.gle/instrument-img';
    const response = await fetch(imageUrl);
    const imageArrayBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

    const interaction2 = await client.interactions.create({
        model: 'gemini-3-flash-preview',
        previous_interaction_id: interaction1.id,
        input: [{
            type: 'function_result',
            name: fcStep.name,
            call_id: fcStep.id,
            result: [
                { type: 'text', text: 'instrument.jpg' },
                {
                    type: 'image',
                    mime_type: 'image/jpeg',
                    data: base64ImageData,
                }
            ]
        }],
        tools: [getImageTool]
    });

    console.log(`\nFinal model response: ${interaction2.output_text}`);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.FunctionResultSubcontent;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.ImageContentMimeType;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(getImageTool))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    FunctionCallStep fcStep = null;
    for (Step step : interaction1.steps().orElse(Collections.emptyList())) {
      if (step instanceof FunctionCallStep) {
        fcStep = (FunctionCallStep) step;
        break;
      }
    }

    if (fcStep != null) {
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      List<FunctionResultSubcontent> subcontents = new ArrayList<>();
      subcontents.add(TextContent.builder().text("instrument.jpg").build());
      subcontents.add(
          ImageContent.builder()
              .mimeType(ImageContentMimeType.IMAGE_JPEG)
              .data(base64ImageData)
              .build());

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(FunctionResultStepResultUnion.of(subcontents))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(getImageTool))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("Final model response: " + interaction2.outputText().orElse(""));
    }
    ```shell
    IMG_URL="https://goo.gle/instrument-img"

    MIME_TYPE=$(curl -sIL "$IMG_URL" | grep -i '^content-type:' | awk -F ': ' '{print $2}' | sed 's/\r$//' | head -n 1)
    if [[ -z "$MIME_TYPE" || ! "$MIME_TYPE" == image/* ]]; then
      MIME_TYPE="image/jpeg"
    fi

    # Check for macOS
    if [[ "$(uname)" == "Darwin" ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -b 0)
    elif [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64)
    else
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -w0)
    fi

    # 1. First interaction (triggers function call)
    # curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    #   -H "x-goog-api-key: $GEMINI_API_KEY" \
    #   -H 'Content-Type: application/json' \
    #   -d '{ "model": "gemini-3-flash-preview", "input": "Show me the instrument I ordered last month.", "tools": [...] }'

    # 2. Send multimodal function result back (Replace INTERACTION_ID and CALL_ID)
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3-flash-preview",
        "previous_interaction_id": "INTERACTION_ID",
        "input": [{
          "type": "function_result",
          "name": "get_image",
          "call_id": "CALL_ID",
          "result": [
            { "type": "text", "text": "instrument.jpg" },
            {
              "type": "image",
              "mime_type": "'"$MIME_TYPE"'",
              "data": "'"$IMAGE_B64"'"
            }
          ]
        }]
      }'

### Combine built-in tools and function calling

Gemini 3 allows the use of built-in tools (like Google Search, URL
context, and [more](https://ai.google.dev/gemini-api/docs/tools)) and custom [function calling](https://ai.google.dev/gemini-api/docs/function-calling) tools in the same API call, allowing for
more complex workflows.

### Python

    from google import genai
    from google.genai import types

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

    interaction = client.interactions.create(
        model="gemini-3-flash-preview",
        input="What is the northernmost city in the United States? What's the weather like there today?",
        tools=[
            {"type": "google_search"},
            getWeather
        ],
    )

    fc_step = next((s for s in interaction.steps if s.type == "function_call"), None)

    if fc_step:
        result = {"response": "Very cold. 22 degrees Fahrenheit."}

        final_interaction = client.interactions.create(
            model="gemini-3-flash-preview",
            input=[
                {"type": "function_result", "name": fc_step.name, "call_id": fc_step.id, "result": result}
            ],
            tools=[
                {"type": "google_search"},
                getWeather
            ],
            previous_interaction_id=interaction.id,
        )

        print(final_interaction.output_text)

### JavaScript

    import { GoogleGenAI, Type } from '@google/genai';

    const client = new GoogleGenAI({});

    const getWeatherDeclaration = {
      type: 'function',
      name: 'getWeather',
      description: 'Gets the weather for a requested city.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          city: {
            type: Type.STRING,
            description: 'The city and state, e.g. Utqiaġvik, Alaska',
          },
        },
        required: ['city'],
      },
    };

    const interaction = await client.interactions.create({
      model: 'gemini-3-flash-preview',
      input: "What is the northernmost city in the United States? What's the weather like there today?",
      tools: [
        { type: "google_search" },
        getWeatherDeclaration
      ],
    });

    const fcStep = interaction.steps.find(s => s.type === 'function_call');

    if (fcStep) {
      const result = { response: "Very cold. 22 degrees Fahrenheit." };

      const finalInteraction = await client.interactions.create({
        model: 'gemini-3-flash-preview',
        input: [
          { type: 'function_result', name: fcStep.name, call_id: fcStep.id, result: result }
        ],
        tools: [
          { type: "google_search" },
          getWeatherDeclaration
        ],
        previous_interaction_id: interaction.id,
      });

      console.log(finalInteraction.output_text);
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Function;
    import com.google.genai.gaos.models.interactions.FunctionCallStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStep;
    import com.google.genai.gaos.models.interactions.FunctionResultStepResultUnion;
    import com.google.genai.gaos.models.interactions.ImageContent;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.Tool;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.io.InputStream;
    import java.net.URL;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.Map;
    import java.util.Optional;

    Client client = new Client();

    Map<String, Object> itemProp = new HashMap<>();
    itemProp.put("type", "string");
    itemProp.put("description", "The name or description of the item ordered (e.g., 'instrument').");

    Map<String, Object> properties = new HashMap<>();
    properties.put("item_name", itemProp);

    Map<String, Object> parameters = new HashMap<>();
    parameters.put("type", "object");
    parameters.put("properties", properties);
    parameters.put("required", Arrays.asList("item_name"));

    Function getImageTool =
        Function.builder()
            .name("get_image")
            .description("Retrieves the image file reference for a specific order item.")
            .parameters(parameters)
            .build();

    CreateModelInteraction req1 =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3-flash-preview"))
            .input(InteractionsInput.of("Use the get_image tool to show me the instrument I ordered last month."))
            .tools(Arrays.asList(Tool.of(getImageTool)))
            .build();

    Interaction interaction1 =
        client.interactions.create(CreateInteractionRequestBody.of(req1)).interaction().get();

    Optional<FunctionCallStep> fcStepOpt =
        interaction1.steps().orElse(Collections.emptyList()).stream()
            .filter(Step::isFunctionCall)
            .map(Step::asFunctionCall)
            .findFirst();

    if (fcStepOpt.isPresent()) {
      FunctionCallStep fcStep = fcStepOpt.get();
      System.out.println("Tool Call: " + fcStep.name().orElse(""));

      URL url = new URL("https://goo.gle/instrument-img");
      byte[] imageBytes;
      try (InputStream is = url.openStream()) {
        imageBytes = is.readAllBytes();
      }
      String base64ImageData = Base64.getEncoder().encodeToString(imageBytes);

      FunctionResultStep funcResult =
          FunctionResultStep.builder()
              .name(fcStep.name().orElse(""))
              .callId(fcStep.id().orElse(""))
              .result(
                  FunctionResultStepResultUnion.of(
                      Arrays.asList(
                          TextContent.builder().text("instrument.jpg").build(),
                          ImageContent.builder()
                              .mimeType("image/jpeg")
                              .data(base64ImageData)
                              .build())))
              .build();

      CreateModelInteraction req2 =
          CreateModelInteraction.builder()
              .model(Model.of("gemini-3-flash-preview"))
              .input(InteractionsInput.ofStep(Arrays.asList(funcResult)))
              .tools(Arrays.asList(Tool.of(getImageTool)))
              .previousInteractionId(interaction1.id().orElse(""))
              .build();

      Interaction interaction2 =
          client.interactions.create(CreateInteractionRequestBody.of(req2)).interaction().get();
      System.out.println("
    Final model response: " + interaction2.outputText().orElse(""));
    }

## Migration from Gemini 2.5

Gemini 3 is our most capable model family to date and offers a stepwise
improvement over Gemini 2.5. When migrating, consider the following:

- **Thinking:** If you were previously using complex prompt engineering (like chain of thought) to force Gemini 2.5 to reason, try Gemini 3 with `thinking_level: "high"` and simplified prompts.
- **Temperature settings:** If your existing code explicitly sets temperature (especially to low values for deterministic outputs), we recommend removing this parameter and using the Gemini 3 default of 1.0 to avoid potential looping issues or performance degradation on complex tasks.
- **PDF \& document understanding:** If you relied on specific behavior for dense document parsing, test the new `media_resolution_high` setting to ensure continued accuracy.
- **Token consumption:** Migrating to Gemini 3 defaults may **increase** token usage for PDFs but **decrease** token usage for video. If requests now exceed the context window due to higher default resolutions, we recommend explicitly reducing the media resolution.
- **Image segmentation:** Image segmentation capabilities (returning pixel-level masks for objects) are not supported in Gemini 3 Pro or Gemini 3 Flash. For workloads requiring built-in image segmentation, we recommend continuing to use Gemini 2.5 Flash with thinking turned off.
- **Computer Use:** Gemini 3 Pro and Gemini 3 Flash support [Computer
  Use](https://ai.google.dev/gemini-api/docs/computer-use). Unlike the 2.5 series, you don't need to use a separate model to access the Computer Use tool.
- **Tool support** : [Combining built-in tools with function calling](https://ai.google.dev/gemini-api/docs/tool-combination) is now supported for Gemini 3 models. [Maps
  grounding](https://ai.google.dev/gemini-api/docs/maps-grounding) is also now supported for Gemini 3 models.

## OpenAI compatibility

For users utilizing the [OpenAI compatibility layer](https://ai.google.dev/gemini-api/docs/openai),
standard parameters (OpenAI's `reasoning_effort`) are automatically mapped to
Gemini (`thinking_level`) equivalents.

## Prompting best practices

Gemini 3 is a reasoning model, which changes how you should prompt.

- **Precise instructions:** Be concise in your input prompts. Gemini 3 responds best to direct, clear instructions. It may over-analyze verbose or overly complex prompt engineering techniques used for older models.
- **Output verbosity:** By default, Gemini 3 is less verbose and prefers providing direct, efficient answers. If your use case requires a more conversational or "chatty" persona, you must explicitly steer the model in the prompt (e.g., "Explain this as a friendly, talkative assistant").
- **Context management:** When working with large datasets (e.g., entire books, codebases, or long videos), place your specific instructions or questions at the end of the prompt, after the data context. Anchor the model's reasoning to the provided data by starting your question with a phrase like, "Based on the preceding information...".

Learn more about prompt design strategies in the [prompt engineering guide](https://ai.google.dev/gemini-api/docs/prompting-strategies).

## FAQ

1. **What is the knowledge cutoff for Gemini 3?** Gemini 3 models have a
   knowledge cutoff of January 2025. For more recent information, use the
   [Search Grounding](https://ai.google.dev/gemini-api/docs/google-search) tool.

2. **What are the context window limits?** Gemini 3 models support a 1 million
   token input context window and up to 64k tokens of output.

3. **Is there a free tier for Gemini 3?** Gemini 3 Flash
   `gemini-3-flash-preview` has a free tier in the Gemini API. You can try
   Gemini 3.1 Pro and 3 Flash at no cost in Google AI Studio, but there
   is no free tier available for `gemini-3.1-pro-preview` in the Gemini API.

4. **Will my old `thinking_budget` code still work?** Yes, `thinking_budget` is
   still supported for backward compatibility, but we recommend migrating to
   `thinking_level` for more predictable performance. Don't use both in the same
   request.

5. **Does Gemini 3 support the Batch API?** Yes, Gemini 3 supports the
   [Batch API](https://ai.google.dev/gemini-api/docs/batch-api).

6. **Is Context Caching supported?** Yes, [Context Caching](https://ai.google.dev/gemini-api/docs/caching) is supported for Gemini 3.

7. **Which tools are supported in Gemini 3?** Gemini 3 supports
   [Google Search](https://ai.google.dev/gemini-api/docs/google-search),
   [Grounding with Google Maps](https://ai.google.dev/gemini-api/docs/maps-grounding),
   [File Search](https://ai.google.dev/gemini-api/docs/file-search),
   [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution), and
   [URL Context](https://ai.google.dev/gemini-api/docs/url-context). It also supports
   standard [Function Calling](https://ai.google.dev/gemini-api/docs/function-calling) for
   your own custom tools, and in
   [combination with built-in tools](https://ai.google.dev/gemini-api/docs/tool-combination).

8. **What is `gemini-3.1-pro-preview-customtools`?** If you are using
   `gemini-3.1-pro-preview` and the model ignores your custom tools in favor of
   bash commands, try the `gemini-3.1-pro-preview-customtools` model instead.
   More info \[here\]\[customtools-model\].