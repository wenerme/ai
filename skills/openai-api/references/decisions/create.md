## Create a decision

**post** `/decisions`

Use this endpoint to quickly answer classification or scoring questions about some input. You can ask multiple questions in one request.

### Body Parameters

- `input: string or array of DecisionInputMessage or FunctionCall { arguments, call_id, name, 4 more }  or FunctionCallOutput { call_id, output, type, 2 more }  or 2 more`

  The input to evaluate for every question. Provide a text string or an ordered array of messages, function calls and outputs, or custom tool calls and outputs. Each tool output must identify a matching call by call ID. User messages and tool outputs can contain text and images; developer and system messages can contain only input text, and assistant messages can contain output text or refusals. Images can be base64 data URLs or publicly accessible HTTP(S) URLs; at most 128 images are allowed per request. Files, audio, and item references are not supported.

  - `string`

  - `array of DecisionInputMessage or FunctionCall { arguments, call_id, name, 4 more }  or FunctionCallOutput { call_id, output, type, 2 more }  or 2 more`

    - `DecisionInputMessage object { content, role, phase, type }`

      A user message containing input text or images, a developer or system message containing input text, or an assistant message containing output text or refusals. System messages are rendered as developer messages.

      - `content: string or array of DecisionInputPart`

        Text evidence or an ordered list of text and image parts.

        - `string`

        - `Parts = array of DecisionInputPart`

          - `DecisionInputText object { text, type, prompt_cache_breakpoint }`

            - `text: string`

            - `type: "input_text"`

              - `"input_text"`

            - `prompt_cache_breakpoint: optional object { mode }  or null`

              Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

              - `mode: "explicit"`

                The breakpoint mode. Always `explicit`.

                - `"explicit"`

          - `DecisionInputImage object { image_url, type, detail, prompt_cache_breakpoint }`

            An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

            - `image_url: string`

              A base64-encoded image in a data URL or a publicly accessible HTTP(S) image URL.

            - `type: "input_image"`

              - `"input_image"`

            - `detail: optional "low" or "high" or "auto" or "original" or null`

              The image detail level, using the selected model's image profile. Defaults to auto.

              - `"low"`

              - `"high"`

              - `"auto"`

              - `"original"`

            - `prompt_cache_breakpoint: optional object { mode }  or null`

              Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

              - `mode: "explicit"`

                The breakpoint mode. Always `explicit`.

                - `"explicit"`

          - `OutputText object { text, type }`

            - `text: string`

            - `type: "output_text"`

              - `"output_text"`

          - `Refusal object { refusal, type }`

            - `refusal: string`

            - `type: "refusal"`

              - `"refusal"`

      - `role: "user" or "developer" or "system" or "assistant"`

        - `"user"`

        - `"developer"`

        - `"system"`

        - `"assistant"`

      - `phase: optional "commentary" or "final_answer" or null`

        The phase of an assistant message.

        - `"commentary"`

        - `"final_answer"`

      - `type: optional "message"`

        - `"message"`

    - `FunctionCall object { arguments, call_id, name, 4 more }`

      - `arguments: string`

      - `call_id: string`

      - `name: string`

      - `type: "function_call"`

        - `"function_call"`

      - `id: optional string or null`

      - `namespace: optional string or null`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

    - `FunctionCallOutput object { call_id, output, type, 2 more }`

      - `call_id: string`

      - `output: string or array of DecisionInputText or DecisionInputImage`

        Text evidence or an ordered list of text and image parts.

        - `string`

        - `Parts = array of DecisionInputText or DecisionInputImage`

          - `DecisionInputText object { text, type, prompt_cache_breakpoint }`

          - `DecisionInputImage object { image_url, type, detail, prompt_cache_breakpoint }`

            An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

      - `type: "function_call_output"`

        - `"function_call_output"`

      - `id: optional string or null`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

    - `CustomToolCall object { call_id, input, name, 4 more }`

      - `call_id: string`

      - `input: string`

      - `name: string`

      - `type: "custom_tool_call"`

        - `"custom_tool_call"`

      - `id: optional string or null`

      - `namespace: optional string or null`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

    - `CustomToolCallOutput object { call_id, output, type, 2 more }`

      - `call_id: string`

      - `output: string or array of DecisionInputText or DecisionInputImage`

        Text evidence or an ordered list of text and image parts.

        - `string`

        - `Parts = array of DecisionInputText or DecisionInputImage`

          - `DecisionInputText object { text, type, prompt_cache_breakpoint }`

          - `DecisionInputImage object { image_url, type, detail, prompt_cache_breakpoint }`

            An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

      - `type: "custom_tool_call_output"`

        - `"custom_tool_call_output"`

      - `id: optional string or null`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

- `model: string`

  The model to use. Only `gpt-6-luna` is supported.

- `questions: array of Predicate { instructions, type, name }  or Choice { choices, instructions, type, name }  or Score { instructions, levels, type, name }`

  Ask 1–200 questions about the input. Each question can be a predicate, choice, or score. Answers come back in the same order.

  - `Predicate object { instructions, type, name }`

    Estimate how likely it is that a statement about the input is true.

    - `instructions: string`

    - `type: "predicate"`

      The type of the object. Always `predicate`.

      - `"predicate"`

    - `name: optional string`

  - `Choice object { choices, instructions, type, name }`

    Choose from the supplied options based on the input.

    - `choices: array of object { value, description }`

      Provide between 2 and 255 choices. Each choice must be unique.

      - `value: string or boolean`

        Choice values are typed: a string and a boolean with the same text are distinct.

        - `string`

        - `boolean`

      - `description: optional string`

    - `instructions: string`

    - `type: "choice"`

      The type of the object. Always `choice`.

      - `"choice"`

    - `name: optional string`

  - `Score object { instructions, levels, type, name }`

    Rate the input against the supplied ordered levels.

    - `instructions: string`

    - `levels: array of object { label, description }`

      - `label: string`

      - `description: optional string`

    - `type: "score"`

      The type of the object. Always `score`.

      - `"score"`

    - `name: optional string`

- `prompt_cache_key: optional string or null`

  Partition prompt cache reuse by caller-provided key.

- `prompt_cache_options: optional object { mode, ttl }  or null`

  Options for prompt caching. Supported for `gpt-5.6` and later models. By default, OpenAI automatically chooses one implicit cache breakpoint. You can add explicit breakpoints to content blocks with `prompt_cache_breakpoint`. Each request can write up to four breakpoints. For cache matching, OpenAI considers up to the latest 80 breakpoints in the conversation, without a content-block lookback limit. Set `mode` to `explicit` to disable the implicit breakpoint. The `ttl` defaults to `30m`, which is currently the only supported value. See the [prompt caching guide](/api/docs/guides/prompt-caching) for current details.

  - `mode: optional "implicit" or "explicit" or null`

    Controls whether OpenAI automatically creates an implicit cache breakpoint. Defaults to `implicit`. With `implicit`, OpenAI creates one implicit breakpoint and writes up to the latest three explicit breakpoints in the request. With `explicit`, OpenAI does not create an implicit breakpoint and writes up to the latest four explicit breakpoints. If there are no explicit breakpoints, the request does not use prompt caching.

    - `"implicit"`

    - `"explicit"`

  - `ttl: optional "30m"`

    The minimum lifetime applied to every implicit and explicit cache breakpoint written by the request. Defaults to `30m`, which is currently the only supported value. The backend may retain cache entries for longer.

    - `"30m"`

- `safety_identifier: optional string or null`

  Opaque caller-provided end-user identifier, scoped by the verified org. Match Responses' limit; this is never the authenticated user identity.

### Returns

- `Decision object { answers, model, usage }`

  - `answers: array of Predicate { name, probability, type }  or Choice { choice, confidence, name, 2 more }  or Score { confidence, name, probabilities, 2 more }  or Refusal { name, type }`

    Answers in question order. Any question can return a refusal instead of an answer; other questions can still receive answers. A refusal has `type: "refusal"` and the question's `name`, or `null` if it was unnamed.

    - `Predicate object { name, probability, type }`

      - `name: string or null`

      - `probability: number`

      - `type: "predicate"`

        The type of the object. Always `predicate`.

        - `"predicate"`

    - `Choice object { choice, confidence, name, 2 more }`

      - `choice: string or boolean`

        Choice values are typed: a string and a boolean with the same text are distinct.

        - `string`

        - `boolean`

      - `confidence: number`

      - `name: string or null`

      - `probabilities: array of object { probability, value }`

        - `probability: number`

        - `value: string or boolean`

          Choice values are typed: a string and a boolean with the same text are distinct.

          - `string`

          - `boolean`

      - `type: "choice"`

        The type of the object. Always `choice`.

        - `"choice"`

    - `Score object { confidence, name, probabilities, 2 more }`

      - `confidence: number`

      - `name: string or null`

      - `probabilities: array of object { label, probability, value }`

        - `label: string`

        - `probability: number`

        - `value: number`

      - `score: number`

      - `type: "score"`

        The type of the object. Always `score`.

        - `"score"`

    - `Refusal object { name, type }`

      The model declined to answer this question. Other questions in the same request can still receive answers.

      - `name: string or null`

      - `type: "refusal"`

        The type of the object. Always `refusal`.

        - `"refusal"`

  - `model: string`

    The model used.

  - `usage: object { input_tokens, input_tokens_details, output_tokens, 2 more }`

    Token usage for the request.

    - `input_tokens: number`

    - `input_tokens_details: object { cache_write_tokens, cached_tokens }`

      - `cache_write_tokens: number`

      - `cached_tokens: number`

    - `output_tokens: number`

    - `output_tokens_details: object { reasoning_tokens }`

      - `reasoning_tokens: number`

    - `total_tokens: number`

### Example

```http
curl https://api.openai.com/v1/decisions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "input": "string",
          "model": "model",
          "questions": [
            {
              "instructions": "instructions",
              "type": "predicate"
            }
          ]
        }'
```

#### Response

```json
{
  "answers": [
    {
      "name": "name",
      "probability": 0,
      "type": "predicate"
    }
  ],
  "model": "model",
  "usage": {
    "input_tokens": -2147483648,
    "input_tokens_details": {
      "cache_write_tokens": -2147483648,
      "cached_tokens": -2147483648
    },
    "output_tokens": -2147483648,
    "output_tokens_details": {
      "reasoning_tokens": -2147483648
    },
    "total_tokens": -2147483648
  }
}
```

### Example

```http
curl https://api.openai.com/v1/decisions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-luna",
    "input": "The package arrived with a broken screen.",
    "questions": [
      {
        "type": "predicate",
        "name": "damaged",
        "instructions": "Does the customer report a damaged item?"
      }
    ]
  }'
```

#### Response

```json
{
  "model": "gpt-6-luna",
  "answers": [
    {"type": "predicate", "name": "damaged", "probability": 0.95}
  ],
  "usage": {
    "input_tokens": 42,
    "input_tokens_details": {"cached_tokens": 0, "cache_write_tokens": 0},
    "output_tokens": 0,
    "output_tokens_details": {"reasoning_tokens": 0},
    "total_tokens": 42
  }
}
```
