## Run

`client.fineTuning.alpha.graders.run(GraderRunParamsbody, RequestOptionsoptions?): GraderRunResponse`

**post** `/fine_tuning/alpha/graders/run`

Run a grader.

### Parameters

- `body: GraderRunParams`

  - `grader: StringCheckGrader | TextSimilarityGrader | PythonGrader | 2 more`

    The grader used for the fine-tuning job.

    - `StringCheckGrader`

      A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

      - `input: string`

        The input text. This may include template strings.

      - `name: string`

        The name of the grader.

      - `operation: "eq" | "ne" | "like" | "ilike"`

        The string check operation to perform. One of `eq`, `ne`, `like`, or `ilike`.

        - `"eq"`

        - `"ne"`

        - `"like"`

        - `"ilike"`

      - `reference: string`

        The reference text. This may include template strings.

      - `type: "string_check"`

        The object type, which is always `string_check`.

        - `"string_check"`

    - `TextSimilarityGrader`

      A TextSimilarityGrader object which grades text based on similarity metrics.

      - `evaluation_metric: "cosine" | "fuzzy_match" | "bleu" | 8 more`

        The evaluation metric to use. One of `cosine`, `fuzzy_match`, `bleu`,
        `gleu`, `meteor`, `rouge_1`, `rouge_2`, `rouge_3`, `rouge_4`, `rouge_5`,
        or `rouge_l`.

        - `"cosine"`

        - `"fuzzy_match"`

        - `"bleu"`

        - `"gleu"`

        - `"meteor"`

        - `"rouge_1"`

        - `"rouge_2"`

        - `"rouge_3"`

        - `"rouge_4"`

        - `"rouge_5"`

        - `"rouge_l"`

      - `input: string`

        The text being graded.

      - `name: string`

        The name of the grader.

      - `reference: string`

        The text being graded against.

      - `type: "text_similarity"`

        The type of grader.

        - `"text_similarity"`

    - `PythonGrader`

      A PythonGrader object that runs a python script on the input.

      - `name: string`

        The name of the grader.

      - `source: string`

        The source code of the python script.

      - `type: "python"`

        The object type, which is always `python`.

        - `"python"`

      - `image_tag?: string`

        The image tag to use for the python script.

    - `ScoreModelGrader`

      A ScoreModelGrader object that uses a model to assign a score to the input.

      - `input: Array<Input>`

        The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings.

        - `content: string | ResponseInputText | OutputText | 3 more`

          Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

          - `string`

          - `ResponseInputText`

            A text input to the model.

            - `text: string`

              The text input to the model.

            - `type: "input_text"`

              The type of the input item. Always `input_text`.

              - `"input_text"`

          - `OutputText`

            A text output from the model.

            - `text: string`

              The text output from the model.

            - `type: "output_text"`

              The type of the output text. Always `output_text`.

              - `"output_text"`

          - `InputImage`

            An image input block used within EvalItem content arrays.

            - `image_url: string`

              The URL of the image input.

            - `type: "input_image"`

              The type of the image input. Always `input_image`.

              - `"input_image"`

            - `detail?: string`

              The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

          - `ResponseInputAudio`

            An audio input to the model.

            - `input_audio: InputAudio`

              - `data: string`

                Base64-encoded audio data.

              - `format: "mp3" | "wav"`

                The format of the audio data. Currently supported formats are `mp3` and
                `wav`.

                - `"mp3"`

                - `"wav"`

            - `type: "input_audio"`

              The type of the input item. Always `input_audio`.

              - `"input_audio"`

          - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

            A list of inputs, each of which may be either an input text, output text, input
            image, or input audio object.

            - `string`

            - `ResponseInputText`

              A text input to the model.

              - `text: string`

                The text input to the model.

              - `type: "input_text"`

                The type of the input item. Always `input_text`.

                - `"input_text"`

            - `OutputText`

              A text output from the model.

              - `text: string`

                The text output from the model.

              - `type: "output_text"`

                The type of the output text. Always `output_text`.

                - `"output_text"`

            - `InputImage`

              An image input block used within EvalItem content arrays.

              - `image_url: string`

                The URL of the image input.

              - `type: "input_image"`

                The type of the image input. Always `input_image`.

                - `"input_image"`

              - `detail?: string`

                The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

            - `ResponseInputAudio`

              An audio input to the model.

              - `input_audio: InputAudio`

                - `data: string`

                  Base64-encoded audio data.

                - `format: "mp3" | "wav"`

                  The format of the audio data. Currently supported formats are `mp3` and
                  `wav`.

                  - `"mp3"`

                  - `"wav"`

              - `type: "input_audio"`

                The type of the input item. Always `input_audio`.

                - `"input_audio"`

        - `role: "user" | "assistant" | "system" | "developer"`

          The role of the message input. One of `user`, `assistant`, `system`, or
          `developer`.

          - `"user"`

          - `"assistant"`

          - `"system"`

          - `"developer"`

        - `type?: "message"`

          The type of the message input. Always `message`.

          - `"message"`

      - `model: string`

        The model to use for the evaluation.

      - `name: string`

        The name of the grader.

      - `type: "score_model"`

        The object type, which is always `score_model`.

        - `"score_model"`

      - `range?: Array<number>`

        The range of the score. Defaults to `[0, 1]`.

      - `sampling_params?: SamplingParams`

        The sampling parameters for the model.

        - `max_completions_tokens?: number | null`

          The maximum number of tokens the grader model may generate in its response.

        - `reasoning_effort?: ReasoningEffort | null`

          Constrains effort on reasoning for
          [reasoning models](https://platform.openai.com/docs/guides/reasoning).
          Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
          reasoning effort can result in faster responses and fewer tokens used
          on reasoning in a response.

          - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
          - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
          - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
          - `xhigh` is supported for all models after `gpt-5.1-codex-max`.

          - `"none"`

          - `"minimal"`

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"xhigh"`

        - `seed?: number | null`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number | null`

          A higher temperature increases randomness in the outputs.

        - `top_p?: number | null`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `MultiGrader`

      A MultiGrader object combines the output of multiple graders to produce a single score.

      - `calculate_output: string`

        A formula to calculate the output based on grader results.

      - `graders: StringCheckGrader | TextSimilarityGrader | PythonGrader | 2 more`

        A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

        - `StringCheckGrader`

          A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

          - `input: string`

            The input text. This may include template strings.

          - `name: string`

            The name of the grader.

          - `operation: "eq" | "ne" | "like" | "ilike"`

            The string check operation to perform. One of `eq`, `ne`, `like`, or `ilike`.

            - `"eq"`

            - `"ne"`

            - `"like"`

            - `"ilike"`

          - `reference: string`

            The reference text. This may include template strings.

          - `type: "string_check"`

            The object type, which is always `string_check`.

            - `"string_check"`

        - `TextSimilarityGrader`

          A TextSimilarityGrader object which grades text based on similarity metrics.

          - `evaluation_metric: "cosine" | "fuzzy_match" | "bleu" | 8 more`

            The evaluation metric to use. One of `cosine`, `fuzzy_match`, `bleu`,
            `gleu`, `meteor`, `rouge_1`, `rouge_2`, `rouge_3`, `rouge_4`, `rouge_5`,
            or `rouge_l`.

            - `"cosine"`

            - `"fuzzy_match"`

            - `"bleu"`

            - `"gleu"`

            - `"meteor"`

            - `"rouge_1"`

            - `"rouge_2"`

            - `"rouge_3"`

            - `"rouge_4"`

            - `"rouge_5"`

            - `"rouge_l"`

          - `input: string`

            The text being graded.

          - `name: string`

            The name of the grader.

          - `reference: string`

            The text being graded against.

          - `type: "text_similarity"`

            The type of grader.

            - `"text_similarity"`

        - `PythonGrader`

          A PythonGrader object that runs a python script on the input.

          - `name: string`

            The name of the grader.

          - `source: string`

            The source code of the python script.

          - `type: "python"`

            The object type, which is always `python`.

            - `"python"`

          - `image_tag?: string`

            The image tag to use for the python script.

        - `ScoreModelGrader`

          A ScoreModelGrader object that uses a model to assign a score to the input.

          - `input: Array<Input>`

            The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings.

            - `content: string | ResponseInputText | OutputText | 3 more`

              Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

              - `string`

              - `ResponseInputText`

                A text input to the model.

                - `text: string`

                  The text input to the model.

                - `type: "input_text"`

                  The type of the input item. Always `input_text`.

                  - `"input_text"`

              - `OutputText`

                A text output from the model.

                - `text: string`

                  The text output from the model.

                - `type: "output_text"`

                  The type of the output text. Always `output_text`.

                  - `"output_text"`

              - `InputImage`

                An image input block used within EvalItem content arrays.

                - `image_url: string`

                  The URL of the image input.

                - `type: "input_image"`

                  The type of the image input. Always `input_image`.

                  - `"input_image"`

                - `detail?: string`

                  The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

              - `ResponseInputAudio`

                An audio input to the model.

                - `input_audio: InputAudio`

                  - `data: string`

                    Base64-encoded audio data.

                  - `format: "mp3" | "wav"`

                    The format of the audio data. Currently supported formats are `mp3` and
                    `wav`.

                    - `"mp3"`

                    - `"wav"`

                - `type: "input_audio"`

                  The type of the input item. Always `input_audio`.

                  - `"input_audio"`

              - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                A list of inputs, each of which may be either an input text, output text, input
                image, or input audio object.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

            - `role: "user" | "assistant" | "system" | "developer"`

              The role of the message input. One of `user`, `assistant`, `system`, or
              `developer`.

              - `"user"`

              - `"assistant"`

              - `"system"`

              - `"developer"`

            - `type?: "message"`

              The type of the message input. Always `message`.

              - `"message"`

          - `model: string`

            The model to use for the evaluation.

          - `name: string`

            The name of the grader.

          - `type: "score_model"`

            The object type, which is always `score_model`.

            - `"score_model"`

          - `range?: Array<number>`

            The range of the score. Defaults to `[0, 1]`.

          - `sampling_params?: SamplingParams`

            The sampling parameters for the model.

            - `max_completions_tokens?: number | null`

              The maximum number of tokens the grader model may generate in its response.

            - `reasoning_effort?: ReasoningEffort | null`

              Constrains effort on reasoning for
              [reasoning models](https://platform.openai.com/docs/guides/reasoning).
              Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
              reasoning effort can result in faster responses and fewer tokens used
              on reasoning in a response.

              - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
              - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
              - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
              - `xhigh` is supported for all models after `gpt-5.1-codex-max`.

              - `"none"`

              - `"minimal"`

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"xhigh"`

            - `seed?: number | null`

              A seed value to initialize the randomness, during sampling.

            - `temperature?: number | null`

              A higher temperature increases randomness in the outputs.

            - `top_p?: number | null`

              An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

        - `LabelModelGrader`

          A LabelModelGrader object which uses a model to assign labels to each item
          in the evaluation.

          - `input: Array<Input>`

            - `content: string | ResponseInputText | OutputText | 3 more`

              Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

              - `string`

              - `ResponseInputText`

                A text input to the model.

                - `text: string`

                  The text input to the model.

                - `type: "input_text"`

                  The type of the input item. Always `input_text`.

                  - `"input_text"`

              - `OutputText`

                A text output from the model.

                - `text: string`

                  The text output from the model.

                - `type: "output_text"`

                  The type of the output text. Always `output_text`.

                  - `"output_text"`

              - `InputImage`

                An image input block used within EvalItem content arrays.

                - `image_url: string`

                  The URL of the image input.

                - `type: "input_image"`

                  The type of the image input. Always `input_image`.

                  - `"input_image"`

                - `detail?: string`

                  The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

              - `ResponseInputAudio`

                An audio input to the model.

                - `input_audio: InputAudio`

                  - `data: string`

                    Base64-encoded audio data.

                  - `format: "mp3" | "wav"`

                    The format of the audio data. Currently supported formats are `mp3` and
                    `wav`.

                    - `"mp3"`

                    - `"wav"`

                - `type: "input_audio"`

                  The type of the input item. Always `input_audio`.

                  - `"input_audio"`

              - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                A list of inputs, each of which may be either an input text, output text, input
                image, or input audio object.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

            - `role: "user" | "assistant" | "system" | "developer"`

              The role of the message input. One of `user`, `assistant`, `system`, or
              `developer`.

              - `"user"`

              - `"assistant"`

              - `"system"`

              - `"developer"`

            - `type?: "message"`

              The type of the message input. Always `message`.

              - `"message"`

          - `labels: Array<string>`

            The labels to assign to each item in the evaluation.

          - `model: string`

            The model to use for the evaluation. Must support structured outputs.

          - `name: string`

            The name of the grader.

          - `passing_labels: Array<string>`

            The labels that indicate a passing result. Must be a subset of labels.

          - `type: "label_model"`

            The object type, which is always `label_model`.

            - `"label_model"`

      - `name: string`

        The name of the grader.

      - `type: "multi"`

        The object type, which is always `multi`.

        - `"multi"`

  - `model_sample: string`

    The model sample to be evaluated. This value will be used to populate
    the `sample` namespace. See [the guide](https://platform.openai.com/docs/guides/graders) for more details.
    The `output_json` variable will be populated if the model sample is a
    valid JSON string.

  - `item?: unknown`

    The dataset item provided to the grader. This will be used to populate
    the `item` namespace. See [the guide](https://platform.openai.com/docs/guides/graders) for more details.

### Returns

- `GraderRunResponse`

  - `metadata: Metadata`

    - `errors: Errors`

      - `formula_parse_error: boolean`

      - `invalid_variable_error: boolean`

      - `model_grader_parse_error: boolean`

      - `model_grader_refusal_error: boolean`

      - `model_grader_server_error: boolean`

      - `model_grader_server_error_details: string | null`

      - `other_error: boolean`

      - `python_grader_runtime_error: boolean`

      - `python_grader_runtime_error_details: string | null`

      - `python_grader_server_error: boolean`

      - `python_grader_server_error_type: string | null`

      - `sample_parse_error: boolean`

      - `truncated_observation_error: boolean`

      - `unresponsive_reward_error: boolean`

    - `execution_time: number`

    - `name: string`

    - `sampled_model_name: string | null`

    - `scores: Record<string, unknown>`

    - `token_usage: number | null`

    - `type: string`

  - `model_grader_token_usage_per_model: Record<string, unknown>`

  - `reward: number`

  - `sub_rewards: Record<string, unknown>`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.fineTuning.alpha.graders.run({
  grader: {
    input: 'input',
    name: 'name',
    operation: 'eq',
    reference: 'reference',
    type: 'string_check',
  },
  model_sample: 'model_sample',
});

console.log(response.metadata);
```
