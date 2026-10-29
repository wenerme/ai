## Create a decision

**post** `/decisions`

Use this endpoint to quickly answer classification or scoring questions about some input. You can ask multiple questions in one request.

### Body Parameters

- `input: string or array of DecisionInputMessage or object { content, role, type }  or object { content, role, type }  or 2 more`

  The input to evaluate for every question. Provide a text string or an ordered array of messages, function calls and outputs, or custom tool calls and outputs. Each tool output must identify a matching call by call ID.

  - `string`

    `minLength: 0`, `maxLength: 10485760`

  - `array of DecisionInputUserMessage { content, role, type }  or DecisionInputDeveloperMessage { content, role, type }  or DecisionInputSystemMessage { content, role, type }  or 5 more`

    `minItems: 0`, `maxItems: 131072`

    - `DecisionInputUserMessage object { content, role, type }`

      A user message containing input text, images, or JSON.

      - `content: string or array of DecisionInputPart`

        A text string or an ordered list of text, image, and JSON parts.

        - `string`

          `minLength: 0`, `maxLength: 10485760`

        - `Parts = array of DecisionInputPart`

          `minItems: 0`, `maxItems: 16384`

          - `DecisionInputText object { text, type, prompt_cache_breakpoint }`

            - `text: string`

              `minLength: 0`, `maxLength: 10485760`

            - `type: "input_text" (default: "input_text")`

              - `"input_text"`

            - `prompt_cache_breakpoint: optional object { mode }  or null`

              Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

              - `mode: "explicit" (default: "explicit")`

                The breakpoint mode. Always `explicit`.

                - `"explicit"`

          - `DecisionInputImage object { image_url, type, detail, prompt_cache_breakpoint }`

            An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

            - `image_url: string`

              A base64-encoded image in a data URL or a publicly accessible HTTP(S) image URL.

              `pattern: ^(data:|https?://)`, `minLength: 0`, `maxLength: 1073741824`

            - `type: "input_image" (default: "input_image")`

              - `"input_image"`

            - `detail: optional "low" or "high" or "auto" or "original" or null (default: "auto")`

              The image detail level, using the selected model's image profile. Defaults to auto.

              - `"low"`

              - `"high"`

              - `"auto"`

              - `"original"`

            - `prompt_cache_breakpoint: optional object { mode }  or null`

              Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

              - `mode: "explicit" (default: "explicit")`

                The breakpoint mode. Always `explicit`.

                - `"explicit"`

          - `DecisionInputJSON object { data, type }`

            A JSON object or an array of objects rendered as text. Nested values may be any JSON value. Limited to 32 container levels, 10,000 values, and 256 KiB of compact UTF-8 JSON.

            - `data: map[unknown] or array of map[unknown]`

              - `map[unknown]`

              - `array of map[unknown]`

                `minItems: 0`

            - `type: "input_json" (default: "input_json")`

              - `"input_json"`

      - `role: "user" (default: "user")`

        - `"user"`

      - `type: optional "message" (default: "message")`

        - `"message"`

    - `DecisionInputDeveloperMessage object { content, role, type }`

      A developer message containing input text.

      - `content: string or array of DecisionInputText`

        A text string or an ordered list of input text parts.

        - `string`

          `minLength: 0`, `maxLength: 10485760`

        - `Parts = array of DecisionInputText`

          `minItems: 0`, `maxItems: 16384`

          - `text: string`

            `minLength: 0`, `maxLength: 10485760`

          - `type: "input_text" (default: "input_text")`

          - `prompt_cache_breakpoint: optional object { mode }  or null`

            Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

      - `role: "developer" (default: "developer")`

        - `"developer"`

      - `type: optional "message" (default: "message")`

        - `"message"`

    - `DecisionInputSystemMessage object { content, role, type }`

      A system message containing input text.

      - `content: string or array of DecisionInputText`

        A text string or an ordered list of input text parts.

        - `string`

          `minLength: 0`, `maxLength: 10485760`

        - `Parts = array of DecisionInputText`

          `minItems: 0`, `maxItems: 16384`

          - `text: string`

            `minLength: 0`, `maxLength: 10485760`

          - `type: "input_text" (default: "input_text")`

          - `prompt_cache_breakpoint: optional object { mode }  or null`

            Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

      - `role: "system" (default: "system")`

        - `"system"`

      - `type: optional "message" (default: "message")`

        - `"message"`

    - `DecisionInputAssistantMessage object { content, role, phase, type }`

      An assistant message containing output text or refusals.

      - `content: string or array of OutputText { text, type }  or Refusal { refusal, type }`

        A text string or an ordered list of output text and refusal parts.

        - `string`

          `minLength: 0`, `maxLength: 10485760`

        - `Parts = array of OutputText { text, type }  or Refusal { refusal, type }`

          `minItems: 0`, `maxItems: 16384`

          - `OutputText object { text, type }`

            - `text: string`

              `minLength: 0`, `maxLength: 10485760`

            - `type: "output_text" (default: "output_text")`

              - `"output_text"`

          - `Refusal object { refusal, type }`

            - `refusal: string`

              `minLength: 0`, `maxLength: 10485760`

            - `type: "refusal" (default: "refusal")`

              - `"refusal"`

      - `role: "assistant" (default: "assistant")`

        - `"assistant"`

      - `phase: optional "commentary" or "final_answer" or null`

        The phase of an assistant message.

        - `"commentary"`

        - `"final_answer"`

      - `type: optional "message" (default: "message")`

        - `"message"`

    - `FunctionCall object { arguments, call_id, name, 4 more }`

      - `arguments: string`

        `minLength: 0`, `maxLength: 1048576`

      - `call_id: string`

        `minLength: 1`, `maxLength: 64`

      - `name: string`

        `pattern: ^[a-zA-Z0-9_.-]+$`, `minLength: 1`, `maxLength: 128`

      - `type: "function_call" (default: "function_call")`

        - `"function_call"`

      - `id: optional string or null`

        `minLength: 0`, `maxLength: 1048576`

      - `namespace: optional string or null`

        `pattern: ^[a-zA-Z0-9_-]+$`, `minLength: 1`, `maxLength: 64`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

    - `FunctionCallOutput object { call_id, output, type, 2 more }`

      - `call_id: string`

        `minLength: 1`, `maxLength: 64`

      - `output: string or array of DecisionInputText or DecisionInputImage`

        Text evidence or an ordered list of text and image parts.

        - `string`

          `minLength: 0`, `maxLength: 10485760`

        - `Parts = array of DecisionInputText or DecisionInputImage`

          `minItems: 0`, `maxItems: 16384`

          - `DecisionInputText object { text, type, prompt_cache_breakpoint }`

          - `DecisionInputImage object { image_url, type, detail, prompt_cache_breakpoint }`

            An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

      - `type: "function_call_output" (default: "function_call_output")`

        - `"function_call_output"`

      - `id: optional string or null`

        `minLength: 0`, `maxLength: 1048576`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

    - `CustomToolCall object { call_id, input, name, 4 more }`

      - `call_id: string`

        `minLength: 1`, `maxLength: 64`

      - `input: string`

        `minLength: 0`, `maxLength: 1048576`

      - `name: string`

        `pattern: ^[a-zA-Z0-9_-]+$`, `minLength: 1`, `maxLength: 64`

      - `type: "custom_tool_call" (default: "custom_tool_call")`

        - `"custom_tool_call"`

      - `id: optional string or null`

        `minLength: 0`, `maxLength: 1048576`

      - `namespace: optional string or null`

        `pattern: ^[a-zA-Z0-9_-]+$`, `minLength: 1`, `maxLength: 64`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

    - `CustomToolCallOutput object { call_id, output, type, 2 more }`

      - `call_id: string`

        `minLength: 1`, `maxLength: 64`

      - `output: string or array of DecisionInputText or DecisionInputImage`

        Text evidence or an ordered list of text and image parts.

        - `string`

          `minLength: 0`, `maxLength: 10485760`

        - `Parts = array of DecisionInputText or DecisionInputImage`

          `minItems: 0`, `maxItems: 16384`

          - `DecisionInputText object { text, type, prompt_cache_breakpoint }`

          - `DecisionInputImage object { image_url, type, detail, prompt_cache_breakpoint }`

            An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

      - `type: "custom_tool_call_output" (default: "custom_tool_call_output")`

        - `"custom_tool_call_output"`

      - `id: optional string or null`

        `minLength: 0`, `maxLength: 1048576`

      - `status: optional "in_progress" or "completed" or "incomplete" or null`

        - `"in_progress"`

        - `"completed"`

        - `"incomplete"`

- `model: string`

  The model to use. Only `gpt-6-luna` is supported.

  `minLength: 0`, `maxLength: 1048576`

- `questions: array of Predicate { instructions, type, name }  or Choice { choices, instructions, type, name }  or Score { instructions, levels, type, name }`

  Ask 1–400 questions about the input. Each question can be a predicate, choice, or score. Answers come back in the same order.

  `minItems: 1`, `maxItems: 400`

  - `Predicate object { instructions, type, name }`

    Estimate how likely it is that a statement about the input is true.

    - `instructions: string or array of DecisionQuestionInputPart`

      - `string`

        `minLength: 0`, `maxLength: 1048576`

      - `array of DecisionQuestionInputPart`

        `minItems: 1`, `maxItems: 16384`

        - `DecisionQuestionInputText object { text, type }`

          - `text: string`

            `minLength: 0`, `maxLength: 10485760`

          - `type: "input_text" (default: "input_text")`

            - `"input_text"`

        - `DecisionQuestionInputImage object { image_url, type, detail }`

          An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

          - `image_url: string`

            A base64-encoded image in a data URL or a publicly accessible HTTP(S) image URL.

            `pattern: ^(data:|https?://)`, `minLength: 0`, `maxLength: 1073741824`

          - `type: "input_image" (default: "input_image")`

            - `"input_image"`

          - `detail: optional "low" or "high" or "auto" or "original" or null (default: "auto")`

            The image detail level, using the selected model's image profile. Defaults to auto.

            - `"low"`

            - `"high"`

            - `"auto"`

            - `"original"`

        - `DecisionInputJSON object { data, type }`

          A JSON object or an array of objects rendered as text. Nested values may be any JSON value. Limited to 32 container levels, 10,000 values, and 256 KiB of compact UTF-8 JSON.

    - `type: "predicate" (default: "predicate")`

      The type of the object. Always `predicate`.

      - `"predicate"`

    - `name: optional string`

      `minLength: 0`, `maxLength: 1048576`

  - `Choice object { choices, instructions, type, name }`

    Choose from the supplied options based on the input.

    - `choices: array of object { value, description }`

      Provide between 2 and 255 choices. Each choice must be unique.

      `minItems: 2`, `maxItems: 255`

      - `value: string or boolean`

        Choice values are typed: a string and a boolean with the same text are distinct.

        - `string`

          `minLength: 0`, `maxLength: 1048576`

        - `boolean`

      - `description: optional string`

        `minLength: 0`, `maxLength: 1048576`

    - `instructions: string or array of DecisionQuestionInputPart`

      - `string`

        `minLength: 0`, `maxLength: 1048576`

      - `array of DecisionQuestionInputPart`

        `minItems: 1`, `maxItems: 16384`

        - `DecisionQuestionInputText object { text, type }`

        - `DecisionQuestionInputImage object { image_url, type, detail }`

          An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

        - `DecisionInputJSON object { data, type }`

          A JSON object or an array of objects rendered as text. Nested values may be any JSON value. Limited to 32 container levels, 10,000 values, and 256 KiB of compact UTF-8 JSON.

    - `type: "choice" (default: "choice")`

      The type of the object. Always `choice`.

      - `"choice"`

    - `name: optional string`

      `minLength: 0`, `maxLength: 1048576`

  - `Score object { instructions, levels, type, name }`

    Rate the input against the supplied ordered levels.

    - `instructions: string or array of DecisionQuestionInputPart`

      - `string`

        `minLength: 0`, `maxLength: 1048576`

      - `array of DecisionQuestionInputPart`

        `minItems: 1`, `maxItems: 16384`

        - `DecisionQuestionInputText object { text, type }`

        - `DecisionQuestionInputImage object { image_url, type, detail }`

          An image provided as a base64 data URL or a publicly accessible HTTP(S) URL. File IDs are not supported.

        - `DecisionInputJSON object { data, type }`

          A JSON object or an array of objects rendered as text. Nested values may be any JSON value. Limited to 32 container levels, 10,000 values, and 256 KiB of compact UTF-8 JSON.

    - `levels: array of object { label, description }`

      `minItems: 2`, `maxItems: 10`

      - `label: string`

        `minLength: 0`, `maxLength: 1048576`

      - `description: optional string`

        `minLength: 0`, `maxLength: 1048576`

    - `type: "score" (default: "score")`

      The type of the object. Always `score`.

      - `"score"`

    - `name: optional string`

      `minLength: 0`, `maxLength: 1048576`

- `prompt_cache_key: optional string or null`

  Partition prompt cache reuse by caller-provided key.

  `minLength: 0`, `maxLength: 64`

- `prompt_cache_options: optional object { mode, ttl }  or null`

  Options for prompt caching. Supported for `gpt-5.6` and later models. By default, OpenAI automatically chooses one implicit cache breakpoint. You can add explicit breakpoints to content blocks with `prompt_cache_breakpoint`. Each request can write up to four breakpoints. For cache matching, OpenAI considers up to the latest 80 breakpoints in the conversation, without a content-block lookback limit. Set `mode` to `explicit` to disable the implicit breakpoint. The `ttl` defaults to `30m`, which is currently the only supported value. See the [prompt caching guide](/api/docs/guides/prompt-caching) for current details.

  - `mode: optional "implicit" or "explicit" or null`

    Controls whether OpenAI automatically creates an implicit cache breakpoint. Defaults to `implicit`. With `implicit`, OpenAI creates one implicit breakpoint and writes up to the latest three explicit breakpoints in the request. With `explicit`, OpenAI does not create an implicit breakpoint and writes up to the latest four explicit breakpoints. If there are no explicit breakpoints, the request does not use prompt caching.

    - `"implicit"`

    - `"explicit"`

  - `ttl: optional "30m" (default: "30m")`

    The minimum lifetime applied to every implicit and explicit cache breakpoint written by the request. Defaults to `30m`, which is currently the only supported value. The backend may retain cache entries for longer.

    - `"30m"`

- `safety_identifier: optional string or null`

  Opaque caller-provided end-user identifier, scoped by the verified org. Match Responses' limit; this is never the authenticated user identity.

  `minLength: 0`, `maxLength: 128`

### Returns

- `Decision object { answers, model, usage }`

  - `answers: array of Predicate { name, probability, type }  or Choice { choice, confidence, name, 2 more }  or Score { confidence, name, probabilities, 2 more }  or Refusal { name, type }`

    Answers in question order. Any question can return a refusal instead of an answer; other questions can still receive answers. A refusal has `type: "refusal"` and the question's `name`, or `null` if it was unnamed.

    `minItems: 0`, `maxItems: 2000`

    - `Predicate object { name, probability, type }`

      - `name: string or null`

        `minLength: 0`

      - `probability: number`

      - `type: "predicate" (default: "predicate")`

        The type of the object. Always `predicate`.

        - `"predicate"`

    - `Choice object { choice, confidence, name, 2 more }`

      - `choice: string or boolean`

        Choice values are typed: a string and a boolean with the same text are distinct.

        - `string`

          `minLength: 0`

        - `boolean`

      - `confidence: number`

      - `name: string or null`

        `minLength: 0`

      - `probabilities: array of object { probability, value }`

        `minItems: 0`, `maxItems: 2000`

        - `probability: number`

        - `value: string or boolean`

          Choice values are typed: a string and a boolean with the same text are distinct.

          - `string`

            `minLength: 0`

          - `boolean`

      - `type: "choice" (default: "choice")`

        The type of the object. Always `choice`.

        - `"choice"`

    - `Score object { confidence, name, probabilities, 2 more }`

      - `confidence: number`

      - `name: string or null`

        `minLength: 0`

      - `probabilities: array of object { label, probability, value }`

        `minItems: 0`, `maxItems: 2000`

        - `label: string`

          `minLength: 0`

        - `probability: number`

        - `value: integer`

          `format: int64`

      - `score: number`

      - `type: "score" (default: "score")`

        The type of the object. Always `score`.

        - `"score"`

    - `Refusal object { name, type }`

      The model declined to answer this question. Other questions in the same request can still receive answers.

      - `name: string or null`

        `minLength: 0`

      - `type: "refusal" (default: "refusal")`

        The type of the object. Always `refusal`.

        - `"refusal"`

  - `model: string`

    The model used.

    `minLength: 0`

  - `usage: object { input_tokens, input_tokens_details, output_tokens, 2 more }`

    Token usage for the request.

    - `input_tokens: integer`

      `format: int64`, `minimum: -2147483648`, `maximum: 2147483647`

    - `input_tokens_details: object { cache_write_tokens, cached_tokens }`

      - `cache_write_tokens: integer`

        `format: int64`, `minimum: -2147483648`, `maximum: 2147483647`

      - `cached_tokens: integer`

        `format: int64`, `minimum: -2147483648`, `maximum: 2147483647`

    - `output_tokens: integer`

      `format: int64`, `minimum: -2147483648`, `maximum: 2147483647`

    - `output_tokens_details: object { reasoning_tokens }`

      - `reasoning_tokens: integer`

        `format: int64`, `minimum: -2147483648`, `maximum: 2147483647`

    - `total_tokens: integer`

      `format: int64`, `minimum: -2147483648`, `maximum: 2147483647`

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
              "instructions": "string",
              "type": "predicate"
            }
          ]
        }'
```

#### 200 — Example

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

#### Response example

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
