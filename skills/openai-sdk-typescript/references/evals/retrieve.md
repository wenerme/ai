## Retrieve

`client.evals.retrieve(stringevalID, RequestOptionsoptions?): EvalRetrieveResponse`

**get** `/evals/{eval_id}`

Get an evaluation by ID.

### Parameters

- `evalID: string`

### Returns

- `EvalRetrieveResponse`

  An Eval object with a data source config and testing criteria.
  An Eval represents a task to be done for your LLM integration.
  Like:

  - Improve the quality of my chatbot
  - See how well my chatbot handles customer support
  - Check if o4-mini is better at my usecase than gpt-4o

  - `id: string`

    Unique identifier for the evaluation.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the eval was created.

  - `data_source_config: EvalCustomDataSourceConfig | Logs | EvalStoredCompletionsDataSourceConfig`

    Configuration of data sources used in runs of the evaluation.

    - `EvalCustomDataSourceConfig`

      A CustomDataSourceConfig which specifies the schema of your `item` and optionally `sample` namespaces.
      The response schema defines the shape of the data that will be:

      - Used to define your testing criteria and
      - What data is required when creating a run

      - `schema: Record<string, unknown>`

        The json schema for the run data source items.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `type: "custom"`

        The type of data source. Always `custom`.

        - `"custom"`

    - `Logs`

      A LogsDataSourceConfig which specifies the metadata property of your logs query.
      This is usually metadata like `usecase=chatbot` or `prompt-version=v2`, etc.
      The schema returned by this data source config is used to defined what variables are available in your evals.
      `item` and `sample` are both defined when using this data source config.

      - `schema: Record<string, unknown>`

        The json schema for the run data source items.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `type: "logs"`

        The type of data source. Always `logs`.

        - `"logs"`

      - `metadata?: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

    - `EvalStoredCompletionsDataSourceConfig`

      Deprecated in favor of LogsDataSourceConfig.

      - `schema: Record<string, unknown>`

        The json schema for the run data source items.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `type: "stored_completions"`

        The type of data source. Always `stored_completions`.

        - `"stored_completions"`

      - `metadata?: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the evaluation.

  - `object: "eval"`

    The object type.

    - `"eval"`

  - `testing_criteria: Array<LabelModelGrader | StringCheckGrader | EvalGraderTextSimilarity | 2 more>`

    A list of testing criteria.

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

    - `EvalGraderTextSimilarity extends TextSimilarityGrader`

      A TextSimilarityGrader object which grades text based on similarity metrics.

      - `pass_threshold: number`

        The threshold for the score.

    - `EvalGraderPython extends PythonGrader`

      A PythonGrader object that runs a python script on the input.

      - `pass_threshold?: number`

        The threshold for the score.

    - `EvalGraderScoreModel extends ScoreModelGrader`

      A ScoreModelGrader object that uses a model to assign a score to the input.

      - `pass_threshold?: number`

        The threshold for the score.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const _eval = await client.evals.retrieve('eval_id');

console.log(_eval.id);
```
