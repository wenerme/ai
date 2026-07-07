> [!NOTE]
> **Beta** : You are viewing the beta version of the Interactions API. Endpoints are under `/v1beta/`. The stable [v1 version](https://ai.google.dev/api/interactions-api-v1) is also available.

The Gemini Interactions API allows developers to build generative AI applications using Gemini models. Gemini is our most capable model, built from the ground up to be multimodal. It can generalize and seamlessly understand, operate across, and combine different types of information including language, images, audio, video, and code. You can use the Gemini API for use cases like reasoning across text and images, content generation, dialogue agents, summarization and classification systems, and more.
[View as markdown](https://ai.google.dev/static/api/interactions.md.txt) [View the OpenAPI Spec](https://ai.google.dev/static/api/interactions.openapi.json) API version: v1beta [v1](https://ai.google.dev/api/interactions-api-v1)

## Creating an interaction

post https://generativelanguage.googleapis.com/v1beta/interactions Creates a new interaction.
- [Path / Query parameters](https://ai.google.dev/api/interactions-api#CreateInteraction.PATH_PARAMETERS)
- [Request body](https://ai.google.dev/api/interactions-api#CreateInteraction.request_body)
- [Response](https://ai.google.dev/api/interactions-api#CreateInteraction.response)

### Path / Query Parameters

api_version string (required) Which version of the API to use.

### Request body

The request body contains data with the following structure:
model ModelOption (optional) The name of the \`Model\` used for generating the interaction.   
**Required if \`agent\` is not provided.**
The model that will complete your prompt.\\n\\nSee \[models\](https://ai.google.dev/gemini-api/docs/models) for additional details.

#### Possible values

- `gemini-2.5-computer-use-preview-10-2025`

  An agentic capability model designed for direct interface interaction, allowing Gemini to perceive and navigate digital environments.
- `gemini-2.5-flash`

  Our first hybrid reasoning model which supports a 1M token context window and has thinking budgets.
- `gemini-2.5-flash-image`

  Our native image generation model, optimized for speed, flexibility, and contextual understanding. Text input and output is priced the same as 2.5 Flash.
- `gemini-2.5-flash-lite`

  Our smallest and most cost effective model, built for at scale usage.
- `gemini-2.5-flash-lite-preview-09-2025`

  The latest model based on Gemini 2.5 Flash lite optimized for cost-efficiency, high throughput and high quality.
- `gemini-2.5-flash-native-audio-preview-12-2025`

  Our native audio models optimized for higher quality audio outputs with better pacing, voice naturalness, verbosity, and mood.
- `gemini-2.5-flash-preview-09-2025`

  The latest model based on the 2.5 Flash model. 2.5 Flash Preview is best for large scale processing, low-latency, high volume tasks that require thinking, and agentic use cases.
- `gemini-2.5-flash-preview-tts`

  Our 2.5 Flash text-to-speech model optimized for powerful, low-latency controllable speech generation.
- `gemini-2.5-pro`

  Our state-of-the-art multipurpose model, which excels at coding and complex reasoning tasks.
- `gemini-2.5-pro-preview-tts`

  Our 2.5 Pro text-to-speech audio model optimized for powerful, low-latency speech generation for more natural outputs and easier to steer prompts.
- `gemini-3-flash-preview`

  Our most intelligent model built for speed, combining frontier intelligence with superior search and grounding.
- `gemini-3-pro-image-preview`

  State-of-the-art image generation and editing model.
- `gemini-3-pro-preview`

  Our most intelligent model with SOTA reasoning and multimodal understanding, and powerful agentic and vibe coding capabilities.
- `gemini-3.1-pro-preview`

  Our latest SOTA reasoning model with unprecedented depth and nuance, and powerful multimodal understanding and coding capabilities.
- `gemini-3.1-flash-image-preview`

  Pro-level visual intelligence with Flash-speed efficiency and reality-grounded generation capabilities.
- `gemini-3.1-flash-lite`

  Our most cost-efficient model, optimized for high-volume agentic tasks, translation, and simple data processing.
- `gemini-3.1-flash-lite-preview`

  Our most cost-efficient model, optimized for high-volume agentic tasks, translation, and simple data processing.
- `gemini-3.1-flash-tts-preview`

  Gemini 3.1 Flash TTS: Powerful, low-latency speech generation. Enjoy natural outputs, steerable prompts, and new expressive audio tags for precise narration control.
- `gemini-3.5-flash`

  Our most intelligent model for sustained frontier performance in agentic and coding tasks.
- `lyria-3-clip-preview`

  Our low-latency, music generation model optimized for high-fidelity audio clips and precise rhythmic control.
- `lyria-3-pro-preview`

  Our advanced, full-song generative model with deep compositional understanding, optimized for precise structural control and complex transitions across diverse musical styles.
agent AgentOption (optional) The name of the \`Agent\` used for generating the interaction.   
**Required if \`model\` is not provided.**
The agent to interact with.

#### Possible values

- `deep-research-pro-preview-12-2025`

  Gemini Deep Research Agent
- `deep-research-preview-04-2026`

  Gemini Deep Research Agent
- `deep-research-max-preview-04-2026`

  Gemini Deep Research Max Agent
- `antigravity-preview-05-2026`

  Use the Antigravity managed agent to perform multi-step tasks that require reasoning, file operations, and tool use.
input [Content](https://ai.google.dev/api/interactions-api#Resource:Content) or array ([Content](https://ai.google.dev/api/interactions-api#Resource:Content)) or array ([Step](https://ai.google.dev/api/interactions-api#Resource:Step)) or array (Turn) or string (required) The inputs for the interaction (common to both Model and Agent).
system_instruction string (optional) System instruction for the interaction.
tools array ([Tool](https://ai.google.dev/api/interactions-api#Resource:Tool)) (optional) A list of tool declarations the model may call during interaction.
response_format [ResponseFormat](https://ai.google.dev/api/interactions-api#Resource:ResponseFormat) or array ([ResponseFormat](https://ai.google.dev/api/interactions-api#Resource:ResponseFormat)) (optional) Enforces that the generated response is a JSON object that complies with the JSON schema specified in this field.
stream boolean (optional) Input only. Whether the interaction will be streamed.
store boolean (optional) Input only. Whether to store the response and request for later retrieval.
background boolean (optional) Input only. Whether to run the model interaction in the background.
generation_config GenerationConfig (optional) **Model Configuration**   
Configuration parameters for the model interaction.   
*Alternative to \`agent_config\`. Only applicable when \`model\` is set.*
Configuration parameters for model interactions.

#### Fields

temperature number (optional) Controls the randomness of the output.
top_p number (optional) The maximum cumulative probability of tokens to consider when sampling.
seed integer (optional) Seed used in decoding for reproducibility.
stop_sequences array (string) (optional) A list of character sequences that will stop output interaction.
thinking_level ThinkingLevel (optional) The level of thought tokens that the model should generate.
<br />

#### Possible values

- `minimal`

  Little to no thinking.
- `low`

  Low thinking level.
- `medium`

  Medium thinking level.
- `high`

  High thinking level.
thinking_summaries ThinkingSummaries (optional) Whether to include thought summaries in the response.
<br />

#### Possible values

- `auto`

  Auto thinking summaries.
- `none`

  No thinking summaries.
max_output_tokens integer (optional) The maximum number of tokens to include in the response.
speech_config SpeechConfig (optional) Configuration for speech interaction.
The configuration for speech interaction.

#### Fields

voice string (optional) The voice of the speaker.
language string (optional) The language of the speech.
speaker string (optional) The speaker's name, it should match the speaker name given in the prompt.
video_config VideoConfig (optional) Configuration for video generation.
Configuration options for video generation.

#### Fields

task enum (string) (optional) Optional task mode for video generation. If not specified, the model
automatically determines the appropriate mode based on the provided text
prompt and input media.

Possible
values:

- `text_to_video`

  Generates video solely from a text prompt.
- `image_to_video`

  Generates video from one or two source images. The first image defines
  the starting frame, and the optional second image defines the ending
  frame.
- `reference_to_video`

  Generates video using reference media (such as images, audio, or video).
- `edit`

  Modifies an existing input video.
presence_penalty number (optional) Penalizes tokens that have already appeared in the generated
text. A positive value encourages the model to generate more diverse and
less repetitive text. Valid values can range from \[-2.0, 2.0\].
frequency_penalty number (optional) Penalizes tokens based on their frequency in the generated text.
A positive value helps to reduce the repetition of words and phrases.
Valid values can range from \[-2.0, 2.0\].
tool_choice [ToolChoiceConfig](https://ai.google.dev/api/interactions-api#Resource:ToolChoiceConfig) or enum (string) (optional) The tool choice configuration.

Possible
values:

- `auto`

  Auto tool choice.
- `any`

  Any tool choice.
- `none`

  No tool choice.
- `validated`

  Validated tool choice.
agent_config object (optional) **Agent Configuration**   
Configuration for the agent.   
*Alternative to \`generation_config\`. Only applicable when \`agent\` is set.*

#### Possible Types

Polymorphic discriminator: `type`
DynamicAgentConfig Configuration for dynamic agents.
type object (required) No description provided.

Always set to `"dynamic"`.
DeepResearchAgentConfig Configuration for the Deep Research agent.
type object (required) No description provided.

Always set to `"deep-research"`.
thinking_summaries ThinkingSummaries (optional) Whether to include thought summaries in the response.
<br />

#### Possible values

- `auto`

  Auto thinking summaries.
- `none`

  No thinking summaries.
visualization enum (string) (optional) Whether to include visualizations in the response.

Possible
values:

- `off`

  Do not include visualizations.
- `auto`

  Automatically include visualizations.
collaborative_planning boolean (optional) Enables human-in-the-loop planning for the Deep Research agent. If set to
true, the Deep Research agent will provide a research plan in its response.
The agent will then proceed only if the user confirms the plan in the next
turn.
enable_bigquery_tool boolean (optional) Enables bigquery tool for the Deep Research agent.
cached_content string (optional) The name of the cached content used as context to serve the prediction.
Note: only used in explicit caching, where users can have control over
caching (e.g. what content to cache) and enjoy guaranteed cost savings.
Format:
\`projects/{project}/locations/{location}/cachedContents/{cachedContent}\`
environment [EnvironmentConfig](https://ai.google.dev/api/interactions-api#Resource:EnvironmentConfig) or string (optional) The environment configuration for the interaction. Can be an object specifying remote environment sources or a string referencing an existing environment ID.
previous_interaction_id string (optional) The ID of the previous interaction, if any.
response_modalities ResponseModality (optional) The requested modalities of the response (TEXT, IMAGE, AUDIO).
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
service_tier ServiceTier (optional) The service tier for the interaction.
<br />

#### Possible values

- `flex`

  Flex service tier.
- `standard`

  Standard service tier.
- `priority`

  Priority service tier.
webhook_config WebhookConfig (optional) Optional. Webhook configuration for receiving notifications when the
interaction completes.
Message for configuring webhook events for a request.

#### Fields

uris array (string) (optional) Optional. If set, these webhook URIs will be used for webhook events instead of the
registered webhooks.
user_metadata object (optional) Optional. The user metadata that will be returned on each event emission to the
webhooks.

### Response

Returns an [Interaction](https://ai.google.dev/api/interactions-api#Resource:Interaction) resource.

### Simple Request

<iframe src="https:///frame/api/interactions-api_bdb8a5fb90ab28111a40cf0b74f8124bbb2a91b305348b8debc193f51636a0c8.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "created": "2025-11-26T12:25:15Z",
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "model": "gemini-3.5-flash",
  "object": "interaction",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "Hello! I'm functioning perfectly and ready to assist you.\n\nHow are you doing today?"
        }
      ]
    }
  ],
  "status": "completed",
  "updated": "2025-11-26T12:25:15Z",
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 7
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 7,
    "total_output_tokens": 20,
    "total_thought_tokens": 22,
    "total_tokens": 49,
    "total_tool_use_tokens": 0
  }
}
```

### Multi-turn

<iframe src="https:///frame/api/interactions-api_cca063a47faf9a9d055ed6c22e0561b7550c3244e70b03180e9a20dfb8449a7e.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "model": "gemini-3.5-flash",
  "status": "completed",
  "object": "interaction",
  "created": "2025-11-26T12:22:47Z",
  "updated": "2025-11-26T12:22:47Z",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "The capital of France is Paris."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 50
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 50,
    "total_output_tokens": 10,
    "total_thought_tokens": 0,
    "total_tokens": 60,
    "total_tool_use_tokens": 0
  }
}
```

### Image Input

<iframe src="https:///frame/api/interactions-api_7ed8f2a83b0ba197747a8f87cf382225e1932358f593f2000f54f6f1afecf0af.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "model": "gemini-3.5-flash",
  "status": "completed",
  "object": "interaction",
  "created": "2025-11-26T12:22:47Z",
  "updated": "2025-11-26T12:22:47Z",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "A white humanoid robot with glowing blue eyes stands holding a red skateboard."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 10
      },
      {
        "modality": "image",
        "tokens": 258
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 268,
    "total_output_tokens": 20,
    "total_thought_tokens": 0,
    "total_tokens": 288,
    "total_tool_use_tokens": 0
  }
}
```

### Function Calling

<iframe src="https:///frame/api/interactions-api_9300e1783438cdb77436aa5ced7e3f9df92a7cb670fd8538cb955118a40d1c38.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "model": "gemini-3.5-flash",
  "status": "requires_action",
  "object": "interaction",
  "created": "2025-11-26T12:22:47Z",
  "updated": "2025-11-26T12:22:47Z",
  "steps": [
    {
      "type": "function_call",
      "id": "gth23981",
      "name": "get_weather",
      "arguments": {
        "location": "Boston, MA"
      }
    }
  ],
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 100
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 100,
    "total_output_tokens": 25,
    "total_thought_tokens": 0,
    "total_tokens": 125,
    "total_tool_use_tokens": 50
  }
}
```

### Deep Research

<iframe src="https:///frame/api/interactions-api_6e9e40d1fdd53a1caf36a27f98803a7cc1dbff8b5d35ea570a8b05866b382e9e.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "agent": "deep-research-pro-preview-12-2025",
  "status": "completed",
  "object": "interaction",
  "created": "2025-11-26T12:22:47Z",
  "updated": "2025-11-26T12:22:47Z",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "Here is a comprehensive research report on the current state of cancer research..."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 20
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 20,
    "total_output_tokens": 1000,
    "total_thought_tokens": 500,
    "total_tokens": 1520,
    "total_tool_use_tokens": 0
  }
}
```

### Antigravity Agent

<iframe src="https:///frame/api/interactions-api_d5e284b32f711b199788c8787e65497df64916db13b781f4a5abf5413868ce1d.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "agent": "antigravity-preview-05-2026",
  "status": "completed",
  "environment_id": "env_abc123",
  "object": "interaction",
  "created": "2025-11-26T12:22:47Z",
  "updated": "2025-11-26T12:22:47Z",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "I've summarized the top 5 Hacker News stories and saved the results to /workspace/summary.md."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 50
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 50,
    "total_output_tokens": 500,
    "total_thought_tokens": 200,
    "total_tokens": 750,
    "total_tool_use_tokens": 0
  }
}
```

### Reuse Environment

<iframe src="https:///frame/api/interactions-api_0534d7cbdb505dec061064c223e126662db0640787801627468ba00ed8bcfc9d.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_Chd2ZTJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkwMTIzNDU2Nzg",
  "agent": "antigravity-preview-05-2026",
  "status": "completed",
  "environment_id": "env_abc123",
  "object": "interaction",
  "created": "2025-11-26T12:23:00Z",
  "updated": "2025-11-26T12:23:00Z",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "I've updated /workspace/hello.py to accept a name argument and greet the user."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 80
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 80,
    "total_output_tokens": 200,
    "total_thought_tokens": 100,
    "total_tokens": 380,
    "total_tool_use_tokens": 0
  }
}
```

### With Sources

<iframe src="https:///frame/api/interactions-api_069fcd8f10491f30e6fbe90bff508230b2724e390ca0c0b288629f387cdedc33.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### Custom Agent

<iframe src="https:///frame/api/interactions-api_4028269ad31b050f85efa21f808f20559de199ec9e250a9c7d94c3faefd5cef0.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

## Canceling an interaction

post https://generativelanguage.googleapis.com/v1beta/interactions/{id}/cancel Cancels an interaction by id. This only applies to background interactions that are still running.
- [Path / Query parameters](https://ai.google.dev/api/interactions-api#cancelInteractionById.PATH_PARAMETERS)
- [Response](https://ai.google.dev/api/interactions-api#cancelInteractionById.response)

### Path / Query Parameters

api_version string (required) Which version of the API to use.
id string (required) The unique identifier of the interaction to cancel.

### Response

Returns an [Interaction](https://ai.google.dev/api/interactions-api#Resource:Interaction) resource.

### Cancel Interaction

<iframe src="https:///frame/api/interactions-api_e54e2c334265d40d3c88df9a66b80d91e556fdc3189c7f8b2f0f53fc96b92780.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdVc0E0YXJTYk1zYlV6N0lQcXRXVG1BYxIXVXNBNGFyU2JNc2JVejdJUHF0V1RtQWM",
  "agent": "deep-research-pro-preview-12-2025",
  "status": "cancelled",
  "created": "2026-06-22T04:55:47Z",
  "updated": "2026-06-22T04:55:47Z",
  "steps": [
    {
      "type": "user_input",
      "content": [
        {
          "type": "text",
          "text": "Research the history of the Google TPUs with a focus on 2025 specs."
        }
      ]
    }
  ]
}
```

## Retrieving an interaction

get https://generativelanguage.googleapis.com/v1beta/interactions/{id} Retrieves the full details of a single interaction based on its \`Interaction.id\`.
- [Path / Query parameters](https://ai.google.dev/api/interactions-api#getInteractionById.PATH_PARAMETERS)
- [Response](https://ai.google.dev/api/interactions-api#getInteractionById.response)

### Path / Query Parameters

api_version string (required) Which version of the API to use.
id string (required) The unique identifier of the interaction to retrieve.
last_event_id string (optional) Optional. If set, resumes the interaction stream from the next chunk after the event marked by the event id. Can only be used if \`stream\` is true.
stream boolean (optional) If set to true, the generated content will be streamed incrementally.

*Defaults to: `False`*

### Response

Returns an [Interaction](https://ai.google.dev/api/interactions-api#Resource:Interaction) resource.

### Get Interaction

<iframe src="https:///frame/api/interactions-api_9bfb93c53dbd222e441c5dffd6bb0d7bfcc20c1d20451ee44ca7a9b94878f06f.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

#### Example Response

```json
{
  "id": "v1_ChdPU0F4YWFtNkFwS2kxZThQZ05lbXdROBIXT1NBeGFhbTZBcEtpMWU4UGdOZW13UTg",
  "model": "gemini-3.5-flash",
  "status": "completed",
  "object": "interaction",
  "created": "2025-11-26T12:25:15Z",
  "updated": "2025-11-26T12:25:15Z",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "I'm doing great, thank you for asking! How can I help you today?"
        }
      ]
    }
  ]
}
```

## Deleting an interaction

delete https://generativelanguage.googleapis.com/v1beta/interactions/{id} Deletes the interaction by id.
- [Path / Query parameters](https://ai.google.dev/api/interactions-api#deleteInteraction.PATH_PARAMETERS)
- [Response](https://ai.google.dev/api/interactions-api#deleteInteraction.response)

### Path / Query Parameters

api_version string (required) Which version of the API to use.
id string (required) The unique identifier of the interaction to delete.

### Response

If successful, the response is empty.

### Delete

<iframe src="https:///frame/api/interactions-api_0fc2bd340016691664f848e973e53332506ebccc55dfe5a005735e2cd9b3bc83.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

## Resources

### Interaction

The Interaction resource.

#### Fields

model ModelOption (optional) The name of the \`Model\` used for generating the interaction.
The model that will complete your prompt.\\n\\nSee \[models\](https://ai.google.dev/gemini-api/docs/models) for additional details.

#### Possible values

- `gemini-2.5-computer-use-preview-10-2025`

  An agentic capability model designed for direct interface interaction, allowing Gemini to perceive and navigate digital environments.
- `gemini-2.5-flash`

  Our first hybrid reasoning model which supports a 1M token context window and has thinking budgets.
- `gemini-2.5-flash-image`

  Our native image generation model, optimized for speed, flexibility, and contextual understanding. Text input and output is priced the same as 2.5 Flash.
- `gemini-2.5-flash-lite`

  Our smallest and most cost effective model, built for at scale usage.
- `gemini-2.5-flash-lite-preview-09-2025`

  The latest model based on Gemini 2.5 Flash lite optimized for cost-efficiency, high throughput and high quality.
- `gemini-2.5-flash-native-audio-preview-12-2025`

  Our native audio models optimized for higher quality audio outputs with better pacing, voice naturalness, verbosity, and mood.
- `gemini-2.5-flash-preview-09-2025`

  The latest model based on the 2.5 Flash model. 2.5 Flash Preview is best for large scale processing, low-latency, high volume tasks that require thinking, and agentic use cases.
- `gemini-2.5-flash-preview-tts`

  Our 2.5 Flash text-to-speech model optimized for powerful, low-latency controllable speech generation.
- `gemini-2.5-pro`

  Our state-of-the-art multipurpose model, which excels at coding and complex reasoning tasks.
- `gemini-2.5-pro-preview-tts`

  Our 2.5 Pro text-to-speech audio model optimized for powerful, low-latency speech generation for more natural outputs and easier to steer prompts.
- `gemini-3-flash-preview`

  Our most intelligent model built for speed, combining frontier intelligence with superior search and grounding.
- `gemini-3-pro-image-preview`

  State-of-the-art image generation and editing model.
- `gemini-3-pro-preview`

  Our most intelligent model with SOTA reasoning and multimodal understanding, and powerful agentic and vibe coding capabilities.
- `gemini-3.1-pro-preview`

  Our latest SOTA reasoning model with unprecedented depth and nuance, and powerful multimodal understanding and coding capabilities.
- `gemini-3.1-flash-image-preview`

  Pro-level visual intelligence with Flash-speed efficiency and reality-grounded generation capabilities.
- `gemini-3.1-flash-lite`

  Our most cost-efficient model, optimized for high-volume agentic tasks, translation, and simple data processing.
- `gemini-3.1-flash-lite-preview`

  Our most cost-efficient model, optimized for high-volume agentic tasks, translation, and simple data processing.
- `gemini-3.1-flash-tts-preview`

  Gemini 3.1 Flash TTS: Powerful, low-latency speech generation. Enjoy natural outputs, steerable prompts, and new expressive audio tags for precise narration control.
- `gemini-3.5-flash`

  Our most intelligent model for sustained frontier performance in agentic and coding tasks.
- `lyria-3-clip-preview`

  Our low-latency, music generation model optimized for high-fidelity audio clips and precise rhythmic control.
- `lyria-3-pro-preview`

  Our advanced, full-song generative model with deep compositional understanding, optimized for precise structural control and complex transitions across diverse musical styles.
agent AgentOption (optional) The name of the \`Agent\` used for generating the interaction.
The agent to interact with.

#### Possible values

- `deep-research-pro-preview-12-2025`

  Gemini Deep Research Agent
- `deep-research-preview-04-2026`

  Gemini Deep Research Agent
- `deep-research-max-preview-04-2026`

  Gemini Deep Research Max Agent
- `antigravity-preview-05-2026`

  Use the Antigravity managed agent to perform multi-step tasks that require reasoning, file operations, and tool use.
id string (optional) Required. Output only. A unique identifier for the interaction completion.

*Defaults to:*
status enum (string) (optional) Required. Output only. The status of the interaction.

Possible
values:

- `in_progress`

  The interaction is in progress.
- `requires_action`

  The interaction requires action/input from the user.
- `completed`

  The interaction is completed.
- `failed`

  The interaction failed.
- `cancelled`

  The interaction was cancelled.
- `incomplete`

  The interaction is completed, but contains incomplete results (e.g.
  hitting max_tokens).
- `budget_exceeded`

  The interaction was halted because the token budget was exceeded.
created string (optional) Output only. The time at which the response was created in ISO 8601 format
(YYYY-MM-DDThh:mm:ssZ).
updated string (optional) Output only. The time at which the response was last updated in ISO 8601 format
(YYYY-MM-DDThh:mm:ssZ).
system_instruction string (optional) System instruction for the interaction.
tools array ([Tool](https://ai.google.dev/api/interactions-api#Resource:Tool)) (optional) A list of tool declarations the model may call during interaction.
usage Usage (optional) Output only. Statistics on the interaction request's token usage.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
response_modalities ResponseModality (optional) The requested modalities of the response (TEXT, IMAGE, AUDIO).
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
previous_interaction_id string (optional) The ID of the previous interaction, if any.
environment_id string (optional) Output only. The environment ID for the interaction. Only populated if environment
config is set in the request.
service_tier ServiceTier (optional) The service tier for the interaction.
<br />

#### Possible values

- `flex`

  Flex service tier.
- `standard`

  Standard service tier.
- `priority`

  Priority service tier.
webhook_config WebhookConfig (optional) Optional. Webhook configuration for receiving notifications when the
interaction completes.
Message for configuring webhook events for a request.

#### Fields

uris array (string) (optional) Optional. If set, these webhook URIs will be used for webhook events instead of the
registered webhooks.
user_metadata object (optional) Optional. The user metadata that will be returned on each event emission to the
webhooks.
steps array ([Step](https://ai.google.dev/api/interactions-api#Resource:Step)) (optional) Output only. The steps that make up the interaction, when included in the response.
response_format [ResponseFormat](https://ai.google.dev/api/interactions-api#Resource:ResponseFormat) or array ([ResponseFormat](https://ai.google.dev/api/interactions-api#Resource:ResponseFormat)) (optional) Enforces that the generated response is a JSON object that complies with the JSON schema specified in this field.
environment [EnvironmentConfig](https://ai.google.dev/api/interactions-api#Resource:EnvironmentConfig) or string (optional) The environment configuration for the interaction. Can be an object specifying remote environment sources or a string referencing an existing environment ID.
cached_content string (optional) The name of the cached content used as context to serve the prediction.
Note: only used in explicit caching, where users can have control over
caching (e.g. what content to cache) and enjoy guaranteed cost savings.
Format:
\`projects/{project}/locations/{location}/cachedContents/{cachedContent}\`
agent_config object (optional) Configuration parameters for the agent interaction.

#### Possible Types

Polymorphic discriminator: `type`
DynamicAgentConfig Configuration for dynamic agents.
type object (required) No description provided.

Always set to `"dynamic"`.
DeepResearchAgentConfig Configuration for the Deep Research agent.
type object (required) No description provided.

Always set to `"deep-research"`.
thinking_summaries ThinkingSummaries (optional) Whether to include thought summaries in the response.
<br />

#### Possible values

- `auto`

  Auto thinking summaries.
- `none`

  No thinking summaries.
visualization enum (string) (optional) Whether to include visualizations in the response.

Possible
values:

- `off`

  Do not include visualizations.
- `auto`

  Automatically include visualizations.
collaborative_planning boolean (optional) Enables human-in-the-loop planning for the Deep Research agent. If set to
true, the Deep Research agent will provide a research plan in its response.
The agent will then proceed only if the user confirms the plan in the next
turn.
enable_bigquery_tool boolean (optional) Enables bigquery tool for the Deep Research agent.
input [Content](https://ai.google.dev/api/interactions-api#Resource:Content) or array ([Content](https://ai.google.dev/api/interactions-api#Resource:Content)) or array ([Step](https://ai.google.dev/api/interactions-api#Resource:Step)) or array (Turn) or string (optional) The input for the interaction.
output_text string (optional) Concatenated text from the last model output in response to the current request.

Note: this is added by the SDK.
output_image [ImageContent](https://ai.google.dev/api/interactions-api#Resource:ImageContent) (optional) The last image generated by the model in response to the current request.

Note: this is added by the SDK.
output_audio AudioContent (optional) The last audio generated by the model in response to the current request.

Note: this is added by the SDK.
An audio content block.

#### Fields

type object (optional) No description provided.

Always set to `"audio"`.
data string (optional) The audio content.
uri string (optional) The URI of the audio.
mime_type enum (string) (optional) The mime type of the audio.

Possible
values:

- `audio/wav`

  WAV audio format
- `audio/mp3`

  MP3 audio format
- `audio/aiff`

  AIFF audio format
- `audio/aac`

  AAC audio format
- `audio/ogg`

  OGG audio format
- `audio/flac`

  FLAC audio format
- `audio/mpeg`

  MPEG audio format
- `audio/m4a`

  M4A audio format
- `audio/l16`

  L16 audio format
- `audio/opus`

  OPUS audio format
- `audio/alaw`

  ALAW audio format
- `audio/mulaw`

  MULAW audio format
channels integer (optional) The number of audio channels.
sample_rate integer (optional) The sample rate of the audio.
output_video VideoContent (optional) The last video generated by the model in response to the current request.

Note: this is added by the SDK.
A video content block.

#### Fields

type object (optional) No description provided.

Always set to `"video"`.
data string (optional) The video content.
uri string (optional) The URI of the video.
mime_type enum (string) (optional) The mime type of the video.

Possible
values:

- `video/mp4`

  MP4 video format
- `video/mpeg`

  MPEG video format
- `video/mpg`

  MPG video format
- `video/mov`

  MOV video format
- `video/avi`

  AVI video format
- `video/x-flv`

  FLV video format
- `video/webm`

  WebM video format
- `video/wmv`

  WMV video format
- `video/3gpp`

  3GPP video format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.

### Examples

### Example

```bash
{
  "created": "2025-12-04T15:01:45Z",
  "id": "v1_ChdXS0l4YWZXTk9xbk0xZThQczhEcmlROBIXV0tJeGFmV05PcW5NMWU4UHM4RHJpUTg",
  "model": "gemini-3.5-flash",
  "object": "interaction",
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "Hello! I'm doing well, functioning as expected. Thank you for asking! How are you doing today?"
        }
      ]
    }
  ],
  "status": "completed",
  "updated": "2025-12-04T15:01:45Z",
  "usage": {
    "input_tokens_by_modality": [
      {
        "modality": "text",
        "tokens": 7
      }
    ],
    "total_cached_tokens": 0,
    "total_input_tokens": 7,
    "total_output_tokens": 23,
    "total_thought_tokens": 49,
    "total_tokens": 79,
    "total_tool_use_tokens": 0
  }
}
```

## Data Models

### Content

The content of the response.

### Possible Types

Polymorphic discriminator: `type`
TextContent A text content block.
type object (required) No description provided.

Always set to `"text"`.
text string (required) Required. The text content.
annotations Annotation (optional) Citation information for model-generated content.
Citation information for model-generated content.

#### Possible Types

Polymorphic discriminator: `type`
UrlCitation A URL citation annotation.
type object (required) No description provided.

Always set to `"url_citation"`.
url string (optional) The URL.
title string (optional) The title of the URL.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
FileCitation A file citation annotation.
type object (required) No description provided.

Always set to `"file_citation"`.
document_uri string (optional) The URI of the file.
file_name string (optional) The name of the file.
source string (optional) Source attributed for a portion of the text.
custom_metadata object (optional) User provided metadata about the retrieved context.
page_number integer (optional) Page number of the cited document, if applicable.
media_id string (optional) Media ID in-case of image citations, if applicable.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
PlaceCitation A place citation annotation.
type object (required) No description provided.

Always set to `"place_citation"`.
place_id string (optional) The ID of the place, in \`places/{place_id}\` format.
name string (optional) Title of the place.
url string (optional) URI reference of the place.
review_snippets ReviewSnippet (optional) Snippets of reviews that are used to generate answers about the
features of a given place in Google Maps.
Encapsulates a snippet of a user review that answers a question about
the features of a specific place in Google Maps.

#### Fields

title string (optional) Title of the review.
url string (optional) A link that corresponds to the user review on Google Maps.
review_id string (optional) The ID of the review snippet.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
ImageContent An image content block.
type object (required) No description provided.

Always set to `"image"`.
data string (optional) The image content.
uri string (optional) The URI of the image.
mime_type enum (string) (optional) The mime type of the image.

Possible
values:

- `image/png`

  PNG image format
- `image/jpeg`

  JPEG image format
- `image/webp`

  WebP image format
- `image/heic`

  HEIC image format
- `image/heif`

  HEIF image format
- `image/gif`

  GIF image format
- `image/bmp`

  BMP image format
- `image/tiff`

  TIFF image format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.
AudioContent An audio content block.
type object (required) No description provided.

Always set to `"audio"`.
data string (optional) The audio content.
uri string (optional) The URI of the audio.
mime_type enum (string) (optional) The mime type of the audio.

Possible
values:

- `audio/wav`

  WAV audio format
- `audio/mp3`

  MP3 audio format
- `audio/aiff`

  AIFF audio format
- `audio/aac`

  AAC audio format
- `audio/ogg`

  OGG audio format
- `audio/flac`

  FLAC audio format
- `audio/mpeg`

  MPEG audio format
- `audio/m4a`

  M4A audio format
- `audio/l16`

  L16 audio format
- `audio/opus`

  OPUS audio format
- `audio/alaw`

  ALAW audio format
- `audio/mulaw`

  MULAW audio format
channels integer (optional) The number of audio channels.
sample_rate integer (optional) The sample rate of the audio.
DocumentContent A document content block.
type object (required) No description provided.

Always set to `"document"`.
data string (optional) The document content.
uri string (optional) The URI of the document.
mime_type enum (string) (optional) The mime type of the document.

Possible
values:

- `application/pdf`

  PDF document format
- `text/csv`

  CSV document format
VideoContent A video content block.
type object (required) No description provided.

Always set to `"video"`.
data string (optional) The video content.
uri string (optional) The URI of the video.
mime_type enum (string) (optional) The mime type of the video.

Possible
values:

- `video/mp4`

  MP4 video format
- `video/mpeg`

  MPEG video format
- `video/mpg`

  MPG video format
- `video/mov`

  MOV video format
- `video/avi`

  AVI video format
- `video/x-flv`

  FLV video format
- `video/webm`

  WebM video format
- `video/wmv`

  WMV video format
- `video/3gpp`

  3GPP video format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.

### Examples

### Text

```json
{
  "type": "text",
  "text": "Hello, how are you?"
}
```

### Image

```json
{
  "type": "image",
  "data": "BASE64_ENCODED_IMAGE",
  "mime_type": "image/png"
}
```

### Audio

```json
{
  "type": "audio",
  "data": "BASE64_ENCODED_AUDIO",
  "mime_type": "audio/wav"
}
```

### Document

```json
{
  "type": "document",
  "data": "BASE64_ENCODED_DOCUMENT",
  "mime_type": "application/pdf"
}
```

### Video

```json
{
  "type": "video",
  "uri": "https://www.youtube.com/watch?v=9hE5-98ZeCg"
}
```

### Tool

A tool that can be used by the model.

### Possible Types

Polymorphic discriminator: `type`
Function A tool that can be used by the model.
type object (required) No description provided.

Always set to `"function"`.
name string (optional) The name of the function.
description string (optional) A description of the function.
parameters object (optional) The JSON Schema for the function's parameters.
CodeExecution A tool that can be used by the model to execute code.
type object (required) No description provided.

Always set to `"code_execution"`.
UrlContext A tool that can be used by the model to fetch URL context.
type object (required) No description provided.

Always set to `"url_context"`.
ComputerUse A tool that can be used by the model to interact with the computer.
type object (required) No description provided.

Always set to `"computer_use"`.
environment enum (string) (optional) The environment being operated.

Possible
values:

- `browser`

  Operates in a web browser.
- `mobile`

  Operates in a mobile environment.
- `desktop`

  Operates in a desktop environment.
excluded_predefined_functions array (string) (optional) The list of predefined functions that are excluded from the model call.
enable_prompt_injection_detection boolean (optional) Whether enable the prompt injection detection check on computer-use
request.
disabled_safety_policies array (enum (string)) (optional) Optional. Disabled safety policies for computer use.

Possible
values:

- `financial_transactions`

  Safety policy for financial transactions.
- `sensitive_data_modification`

  Safety policy for sensitive data modification.
- `communication_tool`

  Safety policy for communication tools (e.g. Gmail, Chat, Meet).
- `account_creation`

  Safety policy for account creation.
- `data_modification`

  Safety policy for data modification.
- `user_consent_management`

  Safety policy for user consent management.
- `legal_terms_and_agreements`

  Safety policy for legal terms and agreements.
McpServer A MCPServer is a server that can be called by the model to perform actions.
type object (required) No description provided.

Always set to `"mcp_server"`.
name string (optional) The name of the MCPServer.
url string (optional) The full URL for the MCPServer endpoint.
Example: "https://api.example.com/mcp"
headers object (optional) Optional: Fields for authentication headers, timeouts, etc., if needed.
allowed_tools AllowedTools (optional) The allowed tools.
The configuration for allowed tools.

#### Fields

mode enum (string) (optional) The mode of the tool choice.

Possible
values:

- `auto`

  Auto tool choice.
- `any`

  Any tool choice.
- `none`

  No tool choice.
- `validated`

  Validated tool choice.
tools array (string) (optional) The names of the allowed tools.
GoogleSearch A tool that can be used by the model to search Google.
type object (required) No description provided.

Always set to `"google_search"`.
search_types array (enum (string)) (optional) The types of search grounding to enable.

Possible
values:

- `web_search`

  Setting this field enables web search. Only text results are returned.
- `image_search`

  Setting this field enables image search. Image bytes are returned.
- `enterprise_web_search`

  Setting this field enables enterprise web search.
FileSearch A tool that can be used by the model to search files.
type object (required) No description provided.

Always set to `"file_search"`.
file_search_store_names array (string) (optional) The file search store names to search.
top_k integer (optional) The number of semantic retrieval chunks to retrieve.
metadata_filter string (optional) Metadata filter to apply to the semantic retrieval documents and chunks.
GoogleMaps A tool that can be used by the model to call Google Maps.
type object (required) No description provided.

Always set to `"google_maps"`.
enable_widget boolean (optional) Whether to return a widget context token in the tool call result of the
response.
latitude number (optional) The latitude of the user's location.
longitude number (optional) The longitude of the user's location.
Retrieval A tool that can be used by the model to retrieve files.
type object (required) No description provided.

Always set to `"retrieval"`.
retrieval_types array (enum (string)) (optional) The types of file retrieval to enable.

Possible
values:

- `rag_store`
- `exa_ai_search`
- `parallel_ai_search`
exa_ai_search_config ExaAISearchConfig (optional) Used to specify configuration for ExaAISearch.
Used to specify configuration for ExaAISearch.

#### Fields

api_key string (optional) Required. The API key for ExaAiSearch.
custom_config object (optional) Optional. This field can be used to pass any parameter from the Exa.ai Search API.
parallel_ai_search_config ParallelAISearchConfig (optional) Used to specify configuration for ParallelAISearch.
Used to specify configuration for ParallelAISearch.

#### Fields

api_key string (optional) Optional. The API key for ParallelAiSearch.
custom_config object (optional) Optional. Custom configs for ParallelAiSearch.
rag_store_config RagStoreConfig (optional) Used to specify configuration for RagStore.
Use to specify configuration for RAG Store.

#### Fields

rag_resources RagResource (optional) Optional. The representation of the rag source.
The definition of the Rag resource.

#### Fields

rag_corpus string (optional) Optional. RagCorpora resource name.
rag_file_ids array (string) (optional) Optional. rag_file_id. The files should be in the same rag_corpus set in
rag_corpus field.
rag_retrieval_config RagRetrievalConfig (optional) Optional. The retrieval config for the Rag query.
Specifies the context retrieval config.

#### Fields

top_k integer (optional) Optional. The number of contexts to retrieve.
hybrid_search HybridSearch (optional) Optional. Config for Hybrid Search.
Config for Hybrid Search.

#### Fields

alpha number (optional) Optional. Alpha value controls the weight between dense and sparse vector search
results.
filter Filter (optional) Optional. Config for filters.
Config for filters.

#### Fields

vector_distance_threshold number (optional) Optional. Only returns contexts with vector distance smaller than the
threshold.
vector_similarity_threshold number (optional) Optional. Only returns contexts with vector similarity larger than the
threshold.
metadata_filter string (optional) Optional. String for metadata filtering.
ranking Ranking (optional) Optional. Config for ranking and reranking.
Config for ranking and reranking.

### Examples

### Function

<iframe src="https:///frame/api/interactions-api_0a6381f4cffe2dc59a56a64244d52be8e858f7dd6f17f2a8c5f9d7a1ea561371.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### CodeExecution

<iframe src="https:///frame/api/interactions-api_a2bd1e03c31299e539505550d6ed1850439811d5727ce06231de0a42c345257a.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### UrlContext

<iframe src="https:///frame/api/interactions-api_0c0201b2282186dc9b05eaf38f3f2d088e543cdb1a7f7555f263e57dd57e7e10.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### ComputerUse

<iframe src="https:///frame/api/interactions-api_6a3fb91cf8770fd2b668ec6269e8968fc17e2df7a50d4005f68ded26fb829ab9.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### McpServer

<iframe src="https:///frame/api/interactions-api_30abb3c4809edc7bf616b3b270e797cd5b5096dca0c6eb3a5e0b1f0aa22cd2e4.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### GoogleSearch

<iframe src="https:///frame/api/interactions-api_244c3923aa8f2f5224b1a239850f5e404d7abfdca7160c56400c8f296c05bb82.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### FileSearch

<iframe src="https:///frame/api/interactions-api_6e3c5c705244cb360c2c008e9f1c24f5206f39d9ee74701c793492379981d61f.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### GoogleMaps

<iframe src="https:///frame/api/interactions-api_639b871738010ddc9946e54bb46ef8890623289feeefeaa2bf4296c317a74ca2.frame" class="framebox inherit-locale " allow="clipboard-write https://" allowfullscreen is-upgraded></iframe>

### Retrieval

No examples available for this type.

### InteractionSseEvent

<br />

### Possible Types

Polymorphic discriminator: `event_type`
InteractionCreatedEvent <br />

event_type object (required) No description provided.

Always set to `"interaction.created"`.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StreamMetadata (optional) Optional metadata accompanying ANY streamed event.
<br />

#### Fields

total_usage Usage (optional) No description provided.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
interaction InteractionSseEventInteraction (required) Partial interaction resource emitted when the stream is created.
Partial interaction resource emitted by interaction lifecycle SSE events.
Streaming lifecycle payloads may omit fields that are only available on
full non-streaming Interaction responses.

#### Fields

id string (optional) Required. Output only. A unique identifier for the interaction completion.
object string (optional) Output only. The resource type.
model string (optional) The model that will complete your prompt.
agent string (optional) The agent to interact with.
status enum (string) (optional) Required. Output only. The status of the interaction.

Possible
values:

- `in_progress`

  The interaction is in progress.
- `requires_action`

  The interaction requires action/input from the user.
- `completed`

  The interaction is completed.
- `failed`

  The interaction failed.
- `cancelled`

  The interaction was cancelled.
- `incomplete`

  The interaction is completed, but contains incomplete results (e.g. hitting max_tokens).
created string (optional) Output only. The time at which the response was created in ISO 8601 format.
updated string (optional) Output only. The time at which the response was last updated in ISO 8601 format.
service_tier ServiceTier (optional) The service tier for the interaction.
<br />

#### Possible values

- `flex`

  Flex service tier.
- `standard`

  Standard service tier.
- `priority`

  Priority service tier.
usage Usage (optional) Output only. Statistics on the interaction request's token usage.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
steps array ([Step](https://ai.google.dev/api/interactions-api#Resource:Step)) (optional) Output only. The steps that make up the interaction, if included in this event.
InteractionCompletedEvent <br />

event_type object (required) No description provided.

Always set to `"interaction.completed"`.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StreamMetadata (optional) Optional metadata accompanying ANY streamed event.
<br />

#### Fields

total_usage Usage (optional) No description provided.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
interaction InteractionSseEventInteraction (required) Partial completed interaction resource emitted at the end of the stream.
Partial interaction resource emitted by interaction lifecycle SSE events.
Streaming lifecycle payloads may omit fields that are only available on
full non-streaming Interaction responses.

#### Fields

id string (optional) Required. Output only. A unique identifier for the interaction completion.
object string (optional) Output only. The resource type.
model string (optional) The model that will complete your prompt.
agent string (optional) The agent to interact with.
status enum (string) (optional) Required. Output only. The status of the interaction.

Possible
values:

- `in_progress`

  The interaction is in progress.
- `requires_action`

  The interaction requires action/input from the user.
- `completed`

  The interaction is completed.
- `failed`

  The interaction failed.
- `cancelled`

  The interaction was cancelled.
- `incomplete`

  The interaction is completed, but contains incomplete results (e.g. hitting max_tokens).
created string (optional) Output only. The time at which the response was created in ISO 8601 format.
updated string (optional) Output only. The time at which the response was last updated in ISO 8601 format.
service_tier ServiceTier (optional) The service tier for the interaction.
<br />

#### Possible values

- `flex`

  Flex service tier.
- `standard`

  Standard service tier.
- `priority`

  Priority service tier.
usage Usage (optional) Output only. Statistics on the interaction request's token usage.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
steps array ([Step](https://ai.google.dev/api/interactions-api#Resource:Step)) (optional) Output only. The steps that make up the interaction, if included in this event.
InteractionStatusUpdate <br />

event_type object (required) No description provided.

Always set to `"interaction.status_update"`.
interaction_id string (required) No description provided.
status enum (string) (required) No description provided.

Possible
values:

- `in_progress`

  The interaction is in progress.
- `requires_action`

  The interaction requires action/input from the user.
- `completed`

  The interaction is completed.
- `failed`

  The interaction failed.
- `cancelled`

  The interaction was cancelled.
- `incomplete`

  The interaction is completed, but contains incomplete results (e.g.
  hitting max_tokens).
- `budget_exceeded`

  The interaction was halted because the token budget was exceeded.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StreamMetadata (optional) Optional metadata accompanying ANY streamed event.
<br />

#### Fields

total_usage Usage (optional) No description provided.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
ErrorEvent <br />

event_type object (required) No description provided.

Always set to `"error"`.
error Error (optional) No description provided.
Error message from an interaction.

#### Fields

code string (optional) A URI that identifies the error type.
message string (optional) A human-readable error message.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StreamMetadata (optional) Optional metadata accompanying ANY streamed event.
<br />

#### Fields

total_usage Usage (optional) No description provided.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
StepStart <br />

event_type object (required) No description provided.

Always set to `"step.start"`.
index integer (required) No description provided.
step [Step](https://ai.google.dev/api/interactions-api#Resource:Step) (required) No description provided.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StreamMetadata (optional) Optional metadata accompanying ANY streamed event.
<br />

#### Fields

total_usage Usage (optional) No description provided.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
StepDelta <br />

event_type object (required) No description provided.

Always set to `"step.delta"`.
index integer (required) No description provided.
delta StepDeltaData (required) No description provided.
<br />

#### Possible Types

Polymorphic discriminator: `type`
TextDelta <br />

type object (required) No description provided.

Always set to `"text"`.
text string (required) No description provided.
ImageDelta <br />

type object (required) No description provided.

Always set to `"image"`.
data string (optional) No description provided.
uri string (optional) No description provided.
mime_type enum (string) (optional) No description provided.

Possible
values:

- `image/png`

  PNG image format
- `image/jpeg`

  JPEG image format
- `image/webp`

  WebP image format
- `image/heic`

  HEIC image format
- `image/heif`

  HEIF image format
- `image/gif`

  GIF image format
- `image/bmp`

  BMP image format
- `image/tiff`

  TIFF image format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.
AudioDelta <br />

type object (required) No description provided.

Always set to `"audio"`.
data string (optional) No description provided.
uri string (optional) No description provided.
mime_type enum (string) (optional) No description provided.

Possible
values:

- `audio/wav`

  WAV audio format
- `audio/mp3`

  MP3 audio format
- `audio/aiff`

  AIFF audio format
- `audio/aac`

  AAC audio format
- `audio/ogg`

  OGG audio format
- `audio/flac`

  FLAC audio format
- `audio/mpeg`

  MPEG audio format
- `audio/m4a`

  M4A audio format
- `audio/l16`

  L16 audio format
- `audio/opus`

  OPUS audio format
- `audio/alaw`

  ALAW audio format
- `audio/mulaw`

  MULAW audio format
sample_rate integer (optional) The sample rate of the audio.
channels integer (optional) The number of audio channels.
DocumentDelta <br />

type object (required) No description provided.

Always set to `"document"`.
data string (optional) No description provided.
uri string (optional) No description provided.
mime_type enum (string) (optional) No description provided.

Possible
values:

- `application/pdf`

  PDF document format
- `text/csv`

  CSV document format
VideoDelta <br />

type object (required) No description provided.

Always set to `"video"`.
data string (optional) No description provided.
uri string (optional) No description provided.
mime_type enum (string) (optional) No description provided.

Possible
values:

- `video/mp4`

  MP4 video format
- `video/mpeg`

  MPEG video format
- `video/mpg`

  MPG video format
- `video/mov`

  MOV video format
- `video/avi`

  AVI video format
- `video/x-flv`

  FLV video format
- `video/webm`

  WebM video format
- `video/wmv`

  WMV video format
- `video/3gpp`

  3GPP video format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.
ThoughtSummaryDelta <br />

type object (required) No description provided.

Always set to `"thought_summary"`.
content [Content](https://ai.google.dev/api/interactions-api#Resource:Content) (optional) A new summary item to be added to the thought.
ThoughtSignatureDelta <br />

type object (required) No description provided.

Always set to `"thought_signature"`.
signature string (optional) Signature to match the backend source to be part of the generation.
TextAnnotationDelta <br />

type object (required) No description provided.

Always set to `"text_annotation_delta"`.
annotations Annotation (optional) Citation information for model-generated content.
Citation information for model-generated content.

#### Possible Types

Polymorphic discriminator: `type`
UrlCitation A URL citation annotation.
type object (required) No description provided.

Always set to `"url_citation"`.
url string (optional) The URL.
title string (optional) The title of the URL.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
FileCitation A file citation annotation.
type object (required) No description provided.

Always set to `"file_citation"`.
document_uri string (optional) The URI of the file.
file_name string (optional) The name of the file.
source string (optional) Source attributed for a portion of the text.
custom_metadata object (optional) User provided metadata about the retrieved context.
page_number integer (optional) Page number of the cited document, if applicable.
media_id string (optional) Media ID in-case of image citations, if applicable.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
PlaceCitation A place citation annotation.
type object (required) No description provided.

Always set to `"place_citation"`.
place_id string (optional) The ID of the place, in \`places/{place_id}\` format.
name string (optional) Title of the place.
url string (optional) URI reference of the place.
review_snippets ReviewSnippet (optional) Snippets of reviews that are used to generate answers about the
features of a given place in Google Maps.
Encapsulates a snippet of a user review that answers a question about
the features of a specific place in Google Maps.

#### Fields

title string (optional) Title of the review.
url string (optional) A link that corresponds to the user review on Google Maps.
review_id string (optional) The ID of the review snippet.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
ArgumentsDelta <br />

type object (required) No description provided.

Always set to `"arguments_delta"`.
arguments string (optional) No description provided.
CodeExecutionCallDelta <br />

type object (required) No description provided.

Always set to `"code_execution_call"`.
arguments CodeExecutionCallArguments (required) No description provided.
The arguments to pass to the code execution.

#### Fields

language enum (string) (optional) Programming language of the \`code\`.

Possible
values:

- `python`

  Python \>= 3.10, with numpy and simpy available.
code string (optional) The code to be executed.
signature string (optional) A signature hash for backend validation.
UrlContextCallDelta <br />

type object (required) No description provided.

Always set to `"url_context_call"`.
arguments UrlContextCallArguments (required) No description provided.
The arguments to pass to the URL context.

#### Fields

urls array (string) (optional) The URLs to fetch.
signature string (optional) A signature hash for backend validation.
GoogleSearchCallDelta <br />

type object (required) No description provided.

Always set to `"google_search_call"`.
arguments GoogleSearchCallArguments (required) No description provided.
The arguments to pass to Google Search.

#### Fields

queries array (string) (optional) Web search queries for the following-up web search.
signature string (optional) A signature hash for backend validation.
McpServerToolCallDelta <br />

type object (required) No description provided.

Always set to `"mcp_server_tool_call"`.
name string (required) No description provided.
server_name string (required) No description provided.
arguments object (required) No description provided.
FileSearchCallDelta <br />

type object (required) No description provided.

Always set to `"file_search_call"`.
signature string (optional) A signature hash for backend validation.
GoogleMapsCallDelta <br />

type object (required) No description provided.

Always set to `"google_maps_call"`.
arguments GoogleMapsCallArguments (optional) The arguments to pass to the Google Maps tool.
The arguments to pass to the Google Maps tool.

#### Fields

queries array (string) (optional) The queries to be executed.
signature string (optional) A signature hash for backend validation.
CodeExecutionResultDelta <br />

type object (required) No description provided.

Always set to `"code_execution_result"`.
result string (required) No description provided.
is_error boolean (optional) No description provided.
signature string (optional) A signature hash for backend validation.
UrlContextResultDelta <br />

type object (required) No description provided.

Always set to `"url_context_result"`.
result UrlContextResult (required) No description provided.
The result of the URL context.

#### Fields

url string (optional) The URL that was fetched.
status enum (string) (optional) The status of the URL retrieval.

Possible
values:

- `success`

  Url retrieval is successful.
- `error`

  Url retrieval is failed due to error.
- `paywall`

  Url retrieval is failed because the content is behind paywall.
- `unsafe`

  Url retrieval is failed because the content is unsafe.
is_error boolean (optional) No description provided.
signature string (optional) A signature hash for backend validation.
GoogleSearchResultDelta <br />

type object (required) No description provided.

Always set to `"google_search_result"`.
result GoogleSearchResult (required) No description provided.
The result of the Google Search.

#### Fields

search_suggestions string (optional) Web content snippet that can be embedded in a web page or an app webview.
is_error boolean (optional) No description provided.
signature string (optional) A signature hash for backend validation.
McpServerToolResultDelta <br />

type object (required) No description provided.

Always set to `"mcp_server_tool_result"`.
name string (optional) No description provided.
server_name string (optional) No description provided.
result array ([ImageContent](https://ai.google.dev/api/interactions-api#Resource:ImageContent) or [TextContent](https://ai.google.dev/api/interactions-api#Resource:TextContent)) or object or string (required) No description provided.
FileSearchResultDelta <br />

type object (required) No description provided.

Always set to `"file_search_result"`.
result FileSearchResult (required) No description provided.
The result of the File Search.
signature string (optional) A signature hash for backend validation.
GoogleMapsResultDelta <br />

type object (required) No description provided.

Always set to `"google_maps_result"`.
result GoogleMapsResult (optional) The results of the Google Maps.
The result of the Google Maps.

#### Fields

places Places (optional) The places that were found.
<br />

#### Fields

place_id string (optional) The ID of the place, in \`places/{place_id}\` format.
name string (optional) Title of the place.
url string (optional) URI reference of the place.
review_snippets ReviewSnippet (optional) Snippets of reviews that are used to generate answers about the
features of a given place in Google Maps.
Encapsulates a snippet of a user review that answers a question about
the features of a specific place in Google Maps.

#### Fields

title string (optional) Title of the review.
url string (optional) A link that corresponds to the user review on Google Maps.
review_id string (optional) The ID of the review snippet.
widget_context_token string (optional) Resource name of the Google Maps widget context token.
signature string (optional) A signature hash for backend validation.
FunctionResultDelta <br />

type object (required) No description provided.

Always set to `"function_result"`.
name string (optional) No description provided.
is_error boolean (optional) No description provided.
call_id string (required) Required. ID to match the ID from the function call block.
result array ([ImageContent](https://ai.google.dev/api/interactions-api#Resource:ImageContent) or [TextContent](https://ai.google.dev/api/interactions-api#Resource:TextContent)) or object or string (required) No description provided.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StepDeltaMetadata (optional) Optional metadata accompanying ANY streamed event.
Optional metadata accompanying ANY streamed event.

#### Fields

total_usage Usage (optional) Statistics on the interaction request's token usage.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
StepStop <br />

event_type object (required) No description provided.

Always set to `"step.stop"`.
index integer (required) No description provided.
usage Usage (optional) Cumulative model usage stats from the start of the session.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
step_usage Usage (optional) Model usage stats for this specific step.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.
event_id string (optional) The event_id token to be used to resume the interaction stream, from
this event.
metadata StreamMetadata (optional) Optional metadata accompanying ANY streamed event.
<br />

#### Fields

total_usage Usage (optional) No description provided.
Statistics on the interaction request's token usage.

#### Fields

total_input_tokens integer (optional) Number of tokens in the prompt (context).
input_tokens_by_modality ModalityTokens (optional) A breakdown of input token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_cached_tokens integer (optional) Number of tokens in the cached part of the prompt (the cached content).
cached_tokens_by_modality ModalityTokens (optional) A breakdown of cached token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_output_tokens integer (optional) Total number of tokens across all the generated responses.
output_tokens_by_modality ModalityTokens (optional) A breakdown of output token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_tool_use_tokens integer (optional) Number of tokens present in tool-use prompt(s).
tool_use_tokens_by_modality ModalityTokens (optional) A breakdown of tool-use token usage by modality.
The token count for a single response modality.

#### Fields

modality ResponseModality (optional) The modality associated with the token count.
<br />

#### Possible values

- `text`

  Indicates the model should return text.
- `image`

  Indicates the model should return images.
- `audio`

  Indicates the model should return audio.
- `video`

  Indicates the model should return video.
- `document`

  Indicates the model should return documents.
tokens integer (optional) Number of tokens for the modality.
total_thought_tokens integer (optional) Number of tokens of thoughts for thinking models.
total_tokens integer (optional) Total token count for the interaction request (prompt + responses + other
internal tokens).
grounding_tool_count GroundingToolCount (optional) Grounding tool count.
The number of grounding tool counts.

#### Fields

type enum (string) (optional) The grounding tool type associated with the count.

Possible
values:

- `google_search`

  Grounding with Google Web Search and Image Search, \& Web Grounding
  for Enterprise.
- `google_maps`

  Grounding with Google Maps.
- `retrieval`

  Grounding with customer's data, for example, VertexAISearch.
count integer (optional) The number of grounding tool counts.

### Examples

### Interaction Created

```json
{
  "event_type": "interaction.created",
  "interaction": {
    "id": "v1_ChdXS0l4YWZXTk9xbk0xZThQczhEcmlROBIXV0tJeGFmV05PcW5NMWU4UHM4RHJpUTg",
    "model": "gemini-3.5-flash",
    "status": "in_progress",
    "created": "2025-12-04T15:01:45Z",
    "updated": "2025-12-04T15:01:45Z"
  },
  "event_id": "evt_123"
}
```

### Interaction Created

```json
{
  "event_type": "interaction.created",
  "interaction": {
    "id": "v1_ChdXS0l4YWZXTk9xbk0xZThQczhEcmlROBIXV0tJeGFmV05PcW5NMWU4UHM4RHJpUTg",
    "model": "gemini-3-flash-preview",
    "object": "interaction",
    "status": "in_progress"
  },
  "event_id": "evt_123"
}
```

### Interaction Completed

```json
{
  "event_type": "interaction.completed",
  "interaction": {
    "id": "v1_ChdXS0l4YWZXTk9xbk0xZThQczhEcmlROBIXV0tJeGFmV05PcW5NMWU4UHM4RHJpUTg",
    "model": "gemini-3.5-flash",
    "status": "completed",
    "created": "2025-12-04T15:01:45Z",
    "updated": "2025-12-04T15:01:45Z"
  },
  "event_id": "evt_123"
}
```

### Interaction Completed

```json
{
  "event_type": "interaction.completed",
  "interaction": {
    "id": "v1_ChdXS0l4YWZXTk9xbk0xZThQczhEcmlROBIXV0tJeGFmV05PcW5NMWU4UHM4RHJpUTg",
    "model": "gemini-3-flash-preview",
    "object": "interaction",
    "status": "completed",
    "created": "2025-12-04T15:01:45Z",
    "updated": "2025-12-04T15:01:45Z"
  },
  "event_id": "evt_123"
}
```

### Interaction Status Update

```json
{
  "event_type": "interaction.status_update",
  "interaction_id": "v1_ChdTMjQ0YWJ5TUF1TzcxZThQdjRpcnFRcxIXUzI0NGFieU1BdU83MWU4UHY0aXJxUXM",
  "status": "in_progress"
}
```

### Error Event

```json
{
  "event_type": "error",
  "error": {
    "message": "Failed to get completed interaction: Result not found.",
    "code": "not_found"
  }
}
```

### Step Start

```json
{
  "event_type": "step.start",
  "index": 0,
  "step": {
    "type": "model_output"
  }
}
```

### Step Delta

```json
{
  "event_type": "step.delta",
  "index": 0,
  "delta": {
    "type": "text",
    "text": "Hello"
  }
}
```

### Step Stop

```json
{
  "event_type": "step.stop",
  "index": 0
}
```

### ResponseFormat

<br />

### Possible Types

AudioResponseFormat Configuration for audio output format.
type object (required) No description provided.

Always set to `"audio"`.
mime_type enum (string) (optional) The MIME type of the audio output.

Possible
values:

- `audio/mp3`

  MP3 audio format.
- `audio/ogg_opus`

  OGG Opus audio format.
- `audio/l16`

  Raw PCM (L16) audio format.
- `audio/wav`

  WAV audio format.
- `audio/alaw`

  A-law audio format.
- `audio/mulaw`

  Mu-law audio format.
delivery enum (string) (optional) The delivery mode for the audio output.

Possible
values:

- `inline`

  Audio data is returned inline in the response.
- `uri`

  Audio data is returned as a URI.
sample_rate integer (optional) Sample rate in Hz.
bit_rate integer (optional) Bit rate in bits per second (bps). Only applicable for compressed formats
(MP3, Opus).
TextResponseFormat Configuration for text output format.
type object (required) No description provided.

Always set to `"text"`.
mime_type enum (string) (optional) The MIME type of the text output.

Possible
values:

- `application/json`

  JSON output format.
- `text/plain`

  Plain text output format.
schema object (optional) The JSON schema that the output should conform to. Only applicable when
mime_type is application/json.
ImageResponseFormat Configuration for image output format.
type object (required) No description provided.

Always set to `"image"`.
mime_type enum (string) (optional) The MIME type of the image output.

Possible
values:

- `image/jpeg`

  JPEG image format.
delivery enum (string) (optional) The delivery mode for the image output.

Possible
values:

- `inline`

  Image data is returned inline in the response.
- `uri`

  Image data is returned as a URI.
aspect_ratio enum (string) (optional) The aspect ratio for the image output.

Possible
values:

- `1:1`

  1:1 aspect ratio.
- `2:3`

  2:3 aspect ratio.
- `3:2`

  3:2 aspect ratio.
- `3:4`

  3:4 aspect ratio.
- `4:3`

  4:3 aspect ratio.
- `4:5`

  4:5 aspect ratio.
- `5:4`

  5:4 aspect ratio.
- `9:16`

  9:16 aspect ratio.
- `16:9`

  16:9 aspect ratio.
- `21:9`

  21:9 aspect ratio.
- `1:8`

  1:8 aspect ratio.
- `8:1`

  8:1 aspect ratio.
- `1:4`

  1:4 aspect ratio.
- `4:1`

  4:1 aspect ratio.
image_size enum (string) (optional) The size of the image output.

Possible
values:

- `512`

  512px image size.
- `1K`

  1K image size.
- `2K`

  2K image size.
- `4K`

  4K image size.
VideoResponseFormat Configuration for video output format.
type object (required) No description provided.

Always set to `"video"`.
delivery enum (string) (optional) The delivery mode for the video output.

Possible
values:

- `inline`

  Video data is returned inline in the response.
- `uri`

  Video data is returned as a URI.
gcs_uri string (optional) The GCS URI to store the video output. Required for Vertex if delivery mode
is URI.
aspect_ratio enum (string) (optional) The aspect ratio for the video output.

Possible
values:

- `16:9`

  16:9 aspect ratio.
- `9:16`

  9:16 aspect ratio.
duration string (optional) The duration for the video output.

### Examples

### Audio Output

```json
{
  "type": "audio",
  "sample_rate": 24000
}
```

### Text Output (JSON Schema)

```json
{
  "type": "text",
  "mime_type": "application/json",
  "schema": {
    "type": "object",
    "properties": {
      "recipe_name": {
        "type": "string"
      },
      "ingredients": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "required": [
      "ingredients",
      "recipe_name"
    ]
  }
}
```

### Image Output

```json
{
  "type": "image",
  "mime_type": "image/jpeg",
  "aspect_ratio": "16:9",
  "image_size": "1K"
}
```

### Video Output

```json
{
  "type": "video",
  "delivery": "inline",
  "aspect_ratio": "16:9"
}
```

### Step

A step in the interaction.

### Possible Types

Polymorphic discriminator: `type`
UserInputStep Input provided by the user.
content array ([Content](https://ai.google.dev/api/interactions-api#Resource:Content)) (optional) No description provided.
type object (required) No description provided.

Always set to `"user_input"`.
ModelOutputStep Output generated by the model.
type object (required) No description provided.

Always set to `"model_output"`.
content array ([Content](https://ai.google.dev/api/interactions-api#Resource:Content)) (optional) No description provided.
error Status (optional) The error result of the operation in case of failure or cancellation.
The \`Status\` type defines a logical error model that is suitable for
different programming environments, including REST APIs and RPC APIs. It is
used by \[gRPC\](https://github.com/grpc). Each \`Status\` message contains
three pieces of data: error code, error message, and error details.

You can find out more about this error model and how to work with it in the
\[API Design Guide\](https://cloud.google.com/apis/design/errors).

#### Fields

code integer (optional) The status code, which should be an enum value of google.rpc.Code.
message string (optional) A developer-facing error message, which should be in English. Any
user-facing error message should be localized and sent in the
google.rpc.Status.details field, or localized by the client.
details array (object) (optional) A list of messages that carry the error details. There is a common set of
message types for APIs to use.
ThoughtStep A thought step.
type object (required) No description provided.

Always set to `"thought"`.
signature string (optional) A signature hash for backend validation.
summary ThoughtSummaryContent (optional) A summary of the thought.
<br />

#### Possible Types

Polymorphic discriminator: `type`
TextContent A text content block.
type object (required) No description provided.

Always set to `"text"`.
text string (required) Required. The text content.
annotations Annotation (optional) Citation information for model-generated content.
Citation information for model-generated content.

#### Possible Types

Polymorphic discriminator: `type`
UrlCitation A URL citation annotation.
type object (required) No description provided.

Always set to `"url_citation"`.
url string (optional) The URL.
title string (optional) The title of the URL.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
FileCitation A file citation annotation.
type object (required) No description provided.

Always set to `"file_citation"`.
document_uri string (optional) The URI of the file.
file_name string (optional) The name of the file.
source string (optional) Source attributed for a portion of the text.
custom_metadata object (optional) User provided metadata about the retrieved context.
page_number integer (optional) Page number of the cited document, if applicable.
media_id string (optional) Media ID in-case of image citations, if applicable.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
PlaceCitation A place citation annotation.
type object (required) No description provided.

Always set to `"place_citation"`.
place_id string (optional) The ID of the place, in \`places/{place_id}\` format.
name string (optional) Title of the place.
url string (optional) URI reference of the place.
review_snippets ReviewSnippet (optional) Snippets of reviews that are used to generate answers about the
features of a given place in Google Maps.
Encapsulates a snippet of a user review that answers a question about
the features of a specific place in Google Maps.

#### Fields

title string (optional) Title of the review.
url string (optional) A link that corresponds to the user review on Google Maps.
review_id string (optional) The ID of the review snippet.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
ImageContent An image content block.
type object (required) No description provided.

Always set to `"image"`.
data string (optional) The image content.
uri string (optional) The URI of the image.
mime_type enum (string) (optional) The mime type of the image.

Possible
values:

- `image/png`

  PNG image format
- `image/jpeg`

  JPEG image format
- `image/webp`

  WebP image format
- `image/heic`

  HEIC image format
- `image/heif`

  HEIF image format
- `image/gif`

  GIF image format
- `image/bmp`

  BMP image format
- `image/tiff`

  TIFF image format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.
FunctionCallStep A function tool call step.
type object (required) No description provided.

Always set to `"function_call"`.
name string (required) Required. The name of the tool to call.
arguments object (required) Required. The arguments to pass to the function.
id string (required) Required. A unique ID for this specific tool call.
CodeExecutionCallStep Code execution call step.
type object (required) No description provided.

Always set to `"code_execution_call"`.
arguments CodeExecutionCallStepArguments (required) Required. The arguments to pass to the code execution.
The arguments to pass to the code execution.

#### Fields

language enum (string) (optional) Programming language of the \`code\`.

Possible
values:

- `python`

  Python \>= 3.10, with numpy and simpy available.
code string (optional) The code to be executed.
id string (required) Required. A unique ID for this specific tool call.
signature string (optional) A signature hash for backend validation.
UrlContextCallStep URL context call step.
type object (required) No description provided.

Always set to `"url_context_call"`.
id string (required) Required. A unique ID for this specific tool call.
signature string (optional) A signature hash for backend validation.
arguments UrlContextCallArguments (required) The arguments to pass to the URL context.
The arguments to pass to the URL context.

#### Fields

urls array (string) (optional) The URLs to fetch.
McpServerToolCallStep MCPServer tool call step.
type object (required) No description provided.

Always set to `"mcp_server_tool_call"`.
name string (required) Required. The name of the tool which was called.
server_name string (required) Required. The name of the used MCP server.
arguments object (required) Required. The JSON object of arguments for the function.
id string (required) Required. A unique ID for this specific tool call.
GoogleSearchCallStep Google Search call step.
type object (required) No description provided.

Always set to `"google_search_call"`.
arguments GoogleSearchCallStepArguments (required) Required. The arguments to pass to Google Search.
The arguments to pass to Google Search.

#### Fields

queries array (string) (optional) Web search queries for the following-up web search.
search_type enum (string) (optional) The type of search grounding enabled.

Possible
values:

- `web_search`

  Setting this field enables web search. Only text results are returned.
- `image_search`

  Setting this field enables image search. Image bytes are returned.
- `enterprise_web_search`

  Setting this field enables enterprise web search.
id string (required) Required. A unique ID for this specific tool call.
signature string (optional) A signature hash for backend validation.
FileSearchCallStep File Search call step.
type object (required) No description provided.

Always set to `"file_search_call"`.
id string (required) Required. A unique ID for this specific tool call.
signature string (optional) A signature hash for backend validation.
GoogleMapsCallStep Google Maps call step.
type object (required) No description provided.

Always set to `"google_maps_call"`.
arguments GoogleMapsCallStepArguments (optional) The arguments to pass to the Google Maps tool.
The arguments to pass to the Google Maps tool.

#### Fields

queries array (string) (optional) The queries to be executed.
id string (required) Required. A unique ID for this specific tool call.
signature string (optional) A signature hash for backend validation.
FunctionResultStep Result of a function tool call.
type object (required) No description provided.

Always set to `"function_result"`.
name string (optional) The name of the tool that was called.
is_error boolean (optional) Whether the tool call resulted in an error.
call_id string (required) Required. ID to match the ID from the function call block.
result array ([ImageContent](https://ai.google.dev/api/interactions-api#Resource:ImageContent) or [TextContent](https://ai.google.dev/api/interactions-api#Resource:TextContent)) or object or string (required) The result of the tool call.
CodeExecutionResultStep Code execution result step.
type object (required) No description provided.

Always set to `"code_execution_result"`.
result string (required) Required. The output of the code execution.
is_error boolean (optional) Whether the code execution resulted in an error.
call_id string (required) Required. ID to match the ID from the function call block.
signature string (optional) A signature hash for backend validation.
UrlContextResultStep URL context result step.
type object (required) No description provided.

Always set to `"url_context_result"`.
result UrlContextResult (required) Required. The results of the URL context.
The result of the URL context.

#### Fields

url string (optional) The URL that was fetched.
status enum (string) (optional) The status of the URL retrieval.

Possible
values:

- `success`

  Url retrieval is successful.
- `error`

  Url retrieval is failed due to error.
- `paywall`

  Url retrieval is failed because the content is behind paywall.
- `unsafe`

  Url retrieval is failed because the content is unsafe.
is_error boolean (optional) Whether the URL context resulted in an error.
call_id string (required) Required. ID to match the ID from the function call block.
signature string (optional) A signature hash for backend validation.
GoogleSearchResultStep Google Search result step.
type object (required) No description provided.

Always set to `"google_search_result"`.
result GoogleSearchResultItem (required) Required. The results of the Google Search.
The result of the Google Search.

#### Fields

search_suggestions string (optional) Web content snippet that can be embedded in a web page or an app webview.
is_error boolean (optional) Whether the Google Search resulted in an error.
call_id string (required) Required. ID to match the ID from the function call block.
signature string (optional) A signature hash for backend validation.
McpServerToolResultStep MCPServer tool result step.
type object (required) No description provided.

Always set to `"mcp_server_tool_result"`.
name string (optional) Name of the tool which is called for this specific tool call.
server_name string (optional) The name of the used MCP server.
call_id string (required) Required. ID to match the ID from the function call block.
result array ([ImageContent](https://ai.google.dev/api/interactions-api#Resource:ImageContent) or [TextContent](https://ai.google.dev/api/interactions-api#Resource:TextContent)) or object or string (required) The output from the MCP server call. Can be simple text or rich content.
FileSearchResultStep File Search result step.
type object (required) No description provided.

Always set to `"file_search_result"`.
call_id string (required) Required. ID to match the ID from the function call block.
signature string (optional) A signature hash for backend validation.
GoogleMapsResultStep Google Maps result step.
type object (required) No description provided.

Always set to `"google_maps_result"`.
result GoogleMapsResultItem (required) No description provided.
The result of the Google Maps.

#### Fields

places GoogleMapsResultPlaces (optional) No description provided.
<br />

#### Fields

place_id string (optional) No description provided.
name string (optional) No description provided.
url string (optional) No description provided.
review_snippets ReviewSnippet (optional) No description provided.
Encapsulates a snippet of a user review that answers a question about
the features of a specific place in Google Maps.

#### Fields

title string (optional) Title of the review.
url string (optional) A link that corresponds to the user review on Google Maps.
review_id string (optional) The ID of the review snippet.
widget_context_token string (optional) No description provided.
call_id string (required) Required. ID to match the ID from the function call block.
signature string (optional) A signature hash for backend validation.

### Examples

### UserInputStep

```json
{
  "type": "user_input",
  "content": [
    {
      "type": "text",
      "text": "What is the capital of France?"
    }
  ]
}
```

### ModelOutputStep

```json
{
  "type": "model_output",
  "content": [
    {
      "type": "text",
      "text": "The capital of France is Paris."
    }
  ]
}
```

### ThoughtStep

```json
{
  "type": "thought",
  "signature": "thought_sig_abcd1234",
  "summary": [
    {
      "type": "text",
      "text": "The model is searching Google for the capital of France."
    }
  ]
}
```

### FunctionCallStep

```json
{
  "type": "function_call",
  "id": "call_98231",
  "name": "get_weather",
  "arguments": {
    "location": "Boston, MA"
  }
}
```

### CodeExecutionCallStep

```json
{
  "type": "code_execution_call",
  "id": "code_call_71021",
  "arguments": {
    "code": "print(sum(range(1, 11)))"
  }
}
```

### UrlContextCallStep

```json
{
  "type": "url_context_call",
  "id": "url_call_10219",
  "arguments": {
    "urls": [
      "https://www.example.com"
    ]
  }
}
```

### McpServerToolCallStep

```json
{
  "type": "mcp_server_tool_call",
  "id": "mcp_call_29012",
  "name": "calculate_tax",
  "server_name": "financial_mcp_server",
  "arguments": {
    "income": 120000,
    "state": "CA"
  }
}
```

### GoogleSearchCallStep

```json
{
  "type": "google_search_call",
  "id": "search_call_19201",
  "arguments": {
    "query": "Who won the men's 100m in Paris 2024?"
  }
}
```

### FileSearchCallStep

```json
{
  "type": "file_search_call",
  "id": "file_call_88192"
}
```

### GoogleMapsCallStep

```json
{
  "type": "google_maps_call",
  "id": "maps_call_39201",
  "arguments": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

### FunctionResultStep

```json
{
  "type": "function_result",
  "call_id": "call_98231",
  "name": "get_weather",
  "result": [
    {
      "type": "text",
      "text": "{\"weather\":\"sunny\"}"
    }
  ]
}
```

### CodeExecutionResultStep

```json
{
  "type": "code_execution_result",
  "call_id": "code_call_71021",
  "result": "55\n"
}
```

### UrlContextResultStep

```json
{
  "type": "url_context_result",
  "call_id": "url_call_10219",
  "result": [
    {
      "url": "https://www.example.com",
      "title": "Example Domain",
      "snippet": "This domain is for use in illustrative examples in documents."
    }
  ]
}
```

### GoogleSearchResultStep

```json
{
  "type": "google_search_result",
  "call_id": "search_call_19201",
  "result": [
    {
      "title": "Paris 2024 Olympics: Noah Lyles wins men's 100m gold",
      "url": "https://olympics.com/en/news/paris-2024-noah-lyles-wins-mens-100m-gold",
      "snippet": "American Noah Lyles won the Olympic men's 100m gold medal in a photo finish."
    }
  ]
}
```

### McpServerToolResultStep

```json
{
  "type": "mcp_server_tool_result",
  "call_id": "mcp_call_29012",
  "result": {
    "tax_due": 32400
  }
}
```

### FileSearchResultStep

```json
{
  "type": "file_search_result",
  "call_id": "file_call_88192"
}
```

### GoogleMapsResultStep

```json
{
  "type": "google_maps_result",
  "call_id": "maps_call_39201",
  "result": [
    {
      "place_id": "ChIJIQBpAG2ahYAR9R7bNdTLg8M",
      "name": "Golden Gate Park",
      "rating": 4.8
    }
  ]
}
```

### EnvironmentConfig

Configuration for a custom environment.

#### Fields

type object (optional) No description provided.

Always set to `"remote"`.
sources Source (optional) No description provided.
A source to be mounted into the environment.

#### Fields

type enum (string) (optional) No description provided.

Possible
values:

- `gcs`

  A GCS bucket.
- `inline`

  Inline content.
- `repository`

  A generic repository. The protocol prefix in the source URL
  identifies the provider (e.g., github://, gcs://).
- `skill_registry`

  A skill resource from the Skill Registry Service.
  Skill: projects/{project}/locations/{location}/skills/{skill}
  SkillRevision:
  projects/{project}/locations/{location}/skills/{skill}/revisions/{revision}
  Support mounting all skills under a project:
  projects/{project}/locations/{location}/skills.
source string (optional) The source of the environment.
For GCS, this is the GCS path.
For GitHub, this is the GitHub path.
target string (optional) Where the source should appear in the environment.
content string (optional) The inline content if \`type\` is \`INLINE\`.
encoding string (optional) Optional encoding for inline content (e.g. \`base64\`).
environment_id string (optional) Optional. The environment ID for the interaction. If specified, the request will
update the existing environment instead of creating a new one.
network [EnvironmentNetworkEgressAllowlist](https://ai.google.dev/api/interactions-api#Resource:EnvironmentNetworkEgressAllowlist) or enum (string) (optional) Network configuration for the environment.

Possible
values:

- `disabled`

  Turns all network off.

### Examples

### Inline Sources

```bash
{
  "type": "remote",
  "sources": [
    {
      "type": "inline",
      "target": ".agents/AGENTS.md",
      "content": "You are a data analyst. Always include visualizations and export results as PDF."
    },
    {
      "type": "inline",
      "target": ".agents/skills/slide-maker/SKILL.md",
      "content": "---\nname: slide-maker\ndescription: Create HTML slide decks\n---\n# Slide Maker\n\nWhen asked to create a presentation:\n1. Analyze the input data\n2. Create an HTML slide deck with reveal.js\n3. Save to /workspace/output/slides.html"
    }
  ]
}
```

### External Sources

```bash
{
  "type": "remote",
  "sources": [
    {
      "type": "repository",
      "source": "https://github.com/my-org/my-skills.git",
      "target": ".agents/skills"
    },
    {
      "type": "gcs",
      "source": "gs://my-bucket/my-folder",
      "target": "/workspace/data"
    }
  ]
}
```

### Network Allowlist

```bash
{
  "type": "remote",
  "network": {
    "allowlist": [
      {
        "domain": "pypi.org"
      },
      {
        "domain": "*.github.com"
      }
    ]
  }
}
```

### Proxy Credentials

```bash
{
  "type": "remote",
  "network": {
    "allowlist": [
      {
        "domain": "api.github.com",
        "transform": {
          "Authorization": "Bearer YOUR_GITHUB_TOKEN"
        }
      }
    ]
  }
}
```

### EnvironmentNetworkEgressAllowlist

Outbound networking configuration for the sandbox. Accepts an object with an 'allowlist' array to restrict traffic, or the string 'disabled' to turn off all network access. Omit entirely to allow all outbound traffic with no header injection.

#### Possible Types

object Outbound networking configuration for the sandbox. When specified, restricts which external domains the sandbox can reach. Omit entirely to allow all outbound traffic with no header injection.
allowlist AllowlistEntry (optional) List of allowed outbound domains. Only requests to listed domains are permitted. Use \[{'domain': '\*'}\] to allow all domains while still injecting headers on specific ones.
A single domain allowlist rule with optional header injection.

#### Fields

domain string (optional) Domain to allow outbound requests to. Supports wildcards (e.g. '\*.googleapis.com'). Use '\*' to allow all domains.
transform array (object) (optional) Headers to inject on all outbound requests matching this domain. Each entry is a flat {header_name: header_value} object. The egress proxy injects these automatically.
string Turns all network off.

#### Possible values

- `disabled`

  Turns all network off.

### Examples

### Example

```bash
{
  "allowlist": [
    {
      "domain": "github.com",
      "transform": [
        {
          "Authorization": "Bearer your-token"
        }
      ]
    },
    {
      "domain": "*.googleapis.com"
    }
  ]
}
```

### ToolChoiceConfig

The tool choice configuration containing allowed tools.

#### Fields

allowed_tools AllowedTools (optional) The allowed tools.
The configuration for allowed tools.

#### Fields

mode enum (string) (optional) The mode of the tool choice.

Possible
values:

- `auto`

  Auto tool choice.
- `any`

  Any tool choice.
- `none`

  No tool choice.
- `validated`

  Validated tool choice.
tools array (string) (optional) The names of the allowed tools.

### Examples

### Example

```bash
{
  "allowed_tools": {
    "mode": "any",
    "tools": [
      "my_tool"
    ]
  }
}
```

### ImageContent

An image content block.

#### Fields

type object (optional) No description provided.

Always set to `"image"`.
data string (optional) The image content.
uri string (optional) The URI of the image.
mime_type enum (string) (optional) The mime type of the image.

Possible
values:

- `image/png`

  PNG image format
- `image/jpeg`

  JPEG image format
- `image/webp`

  WebP image format
- `image/heic`

  HEIC image format
- `image/heif`

  HEIF image format
- `image/gif`

  GIF image format
- `image/bmp`

  BMP image format
- `image/tiff`

  TIFF image format
resolution MediaResolution (optional) The resolution of the media.
<br />

#### Possible values

- `low`

  Low resolution.
- `medium`

  Medium resolution.
- `high`

  High resolution.
- `ultra_high`

  Ultra high resolution.

### Examples

### Image

```bash
{
  "type": "image",
  "data": "BASE64_ENCODED_IMAGE",
  "mime_type": "image/png"
}
```

### TextContent

A text content block.

#### Fields

type object (optional) No description provided.

Always set to `"text"`.
text string (optional) Required. The text content.
annotations Annotation (optional) Citation information for model-generated content.
Citation information for model-generated content.

#### Possible Types

Polymorphic discriminator: `type`
UrlCitation A URL citation annotation.
type object (required) No description provided.

Always set to `"url_citation"`.
url string (optional) The URL.
title string (optional) The title of the URL.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
FileCitation A file citation annotation.
type object (required) No description provided.

Always set to `"file_citation"`.
document_uri string (optional) The URI of the file.
file_name string (optional) The name of the file.
source string (optional) Source attributed for a portion of the text.
custom_metadata object (optional) User provided metadata about the retrieved context.
page_number integer (optional) Page number of the cited document, if applicable.
media_id string (optional) Media ID in-case of image citations, if applicable.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.
PlaceCitation A place citation annotation.
type object (required) No description provided.

Always set to `"place_citation"`.
place_id string (optional) The ID of the place, in \`places/{place_id}\` format.
name string (optional) Title of the place.
url string (optional) URI reference of the place.
review_snippets ReviewSnippet (optional) Snippets of reviews that are used to generate answers about the
features of a given place in Google Maps.
Encapsulates a snippet of a user review that answers a question about
the features of a specific place in Google Maps.

#### Fields

title string (optional) Title of the review.
url string (optional) A link that corresponds to the user review on Google Maps.
review_id string (optional) The ID of the review snippet.
start_index integer (optional) Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.
end_index integer (optional) End of the attributed segment, exclusive.

### Examples

### Text

```bash
{
  "type": "text",
  "text": "Hello, how are you?"
}
```