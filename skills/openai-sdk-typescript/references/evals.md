# Evals

## List evals

`client.evals.list(EvalListParamsquery?, RequestOptionsoptions?): CursorPage<EvalListResponse>`

**get** `/evals`

List evaluations for a project.

### Parameters

- `query: EvalListParams`

  - `after?: string`

    Identifier for the last eval from the previous pagination request.

  - `limit?: number`

    Number of evals to retrieve.

  - `order?: "asc" | "desc"`

    Sort order for evals by timestamp. Use `asc` for ascending order or `desc` for descending order.

    - `"asc"`

    - `"desc"`

  - `order_by?: "created_at" | "updated_at"`

    Evals can be ordered by creation time or last updated time. Use
    `created_at` for creation time or `updated_at` for last updated time.

    - `"created_at"`

    - `"updated_at"`

### Returns

- `EvalListResponse`

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

// Automatically fetches more pages as needed.
for await (const evalListResponse of client.evals.list()) {
  console.log(evalListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "data_source_config": {
        "schema": {
          "foo": "bar"
        },
        "type": "custom"
      },
      "metadata": {
        "foo": "string"
      },
      "name": "Chatbot effectiveness Evaluation",
      "object": "eval",
      "testing_criteria": [
        {
          "input": [
            {
              "content": "string",
              "role": "user",
              "type": "message"
            }
          ],
          "labels": [
            "string"
          ],
          "model": "model",
          "name": "name",
          "passing_labels": [
            "string"
          ],
          "type": "label_model"
        }
      ]
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const evals = await openai.evals.list({ limit: 1 });
console.log(evals);
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "eval_67abd54d9b0081909a86353f6fb9317a",
      "object": "eval",
      "data_source_config": {
        "type": "stored_completions",
        "metadata": {
          "usecase": "push_notifications_summarizer"
        },
        "schema": {
          "type": "object",
          "properties": {
            "item": {
              "type": "object"
            },
            "sample": {
              "type": "object"
            }
          },
          "required": [
            "item",
            "sample"
          ]
        }
      },
      "testing_criteria": [
        {
          "name": "Push Notification Summary Grader",
          "id": "Push Notification Summary Grader-9b876f24-4762-4be9-aff4-db7a9b31c673",
          "type": "label_model",
          "model": "o3-mini",
          "input": [
            {
              "type": "message",
              "role": "developer",
              "content": {
                "type": "input_text",
                "text": "\nLabel the following push notification summary as either correct or incorrect.\nThe push notification and the summary will be provided below.\nA good push notificiation summary is concise and snappy.\nIf it is good, then label it as correct, if not, then incorrect.\n"
              }
            },
            {
              "type": "message",
              "role": "user",
              "content": {
                "type": "input_text",
                "text": "\nPush notifications: {{item.input}}\nSummary: {{sample.output_text}}\n"
              }
            }
          ],
          "passing_labels": [
            "correct"
          ],
          "labels": [
            "correct",
            "incorrect"
          ],
          "sampling_params": null
        }
      ],
      "name": "Push Notification Summary Grader",
      "created_at": 1739314509,
      "metadata": {
        "description": "A stored completions eval for push notification summaries"
      }
    }
  ],
  "first_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "last_id": "eval_67aa884cf6688190b58f657d4441c8b7",
  "has_more": true
}
```

## Create eval

`client.evals.create(EvalCreateParamsbody, RequestOptionsoptions?): EvalCreateResponse`

**post** `/evals`

Create the structure of an evaluation that can be used to test a model's performance.
An evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources.
For more information, see the [Evals guide](https://platform.openai.com/docs/guides/evals).

### Parameters

- `body: EvalCreateParams`

  - `data_source_config: Custom | Logs | StoredCompletions`

    The configuration for the data source used for the evaluation runs. Dictates the schema of the data used in the evaluation.

    - `Custom`

      A CustomDataSourceConfig object that defines the schema for the data source used for the evaluation runs.
      This schema is used to define the shape of the data that will be:

      - Used to define your testing criteria and
      - What data is required when creating a run

      - `item_schema: Record<string, unknown>`

        The json schema for each row in the data source.

      - `type: "custom"`

        The type of data source. Always `custom`.

        - `"custom"`

      - `include_sample_schema?: boolean`

        Whether the eval should expect you to populate the sample namespace (ie, by generating responses off of your data source)

    - `Logs`

      A data source config which specifies the metadata property of your logs query.
      This is usually metadata like `usecase=chatbot` or `prompt-version=v2`, etc.

      - `type: "logs"`

        The type of data source. Always `logs`.

        - `"logs"`

      - `metadata?: Record<string, unknown>`

        Metadata filters for the logs data source.

    - `StoredCompletions`

      Deprecated in favor of LogsDataSourceConfig.

      - `type: "stored_completions"`

        The type of data source. Always `stored_completions`.

        - `"stored_completions"`

      - `metadata?: Record<string, unknown>`

        Metadata filters for the stored completions data source.

  - `testing_criteria: Array<LabelModel | StringCheckGrader | TextSimilarity | 2 more>`

    A list of graders for all eval runs in this group. Graders can reference variables in the data source using double curly braces notation, like `{{item.variable_name}}`. To reference the model's output, use the `sample` namespace (ie, `{{sample.output_text}}`).

    - `LabelModel`

      A LabelModelGrader object which uses a model to assign labels to each item
      in the evaluation.

      - `input: Array<SimpleInputMessage | EvalItem>`

        A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

        - `SimpleInputMessage`

          - `content: string`

            The content of the message.

          - `role: string`

            The role of the message (e.g. "system", "assistant", "user").

        - `EvalItem`

          A message input to the model with a role indicating instruction following
          hierarchy. Instructions given with the `developer` or `system` role take
          precedence over instructions given with the `user` role. Messages with the
          `assistant` role are presumed to have been generated by the model in previous
          interactions.

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

        The labels to classify to each item in the evaluation.

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

    - `TextSimilarity extends TextSimilarityGrader`

      A TextSimilarityGrader object which grades text based on similarity metrics.

      - `pass_threshold: number`

        The threshold for the score.

    - `Python extends PythonGrader`

      A PythonGrader object that runs a python script on the input.

      - `pass_threshold?: number`

        The threshold for the score.

    - `ScoreModel extends ScoreModelGrader`

      A ScoreModelGrader object that uses a model to assign a score to the input.

      - `pass_threshold?: number`

        The threshold for the score.

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name?: string`

    The name of the evaluation.

### Returns

- `EvalCreateResponse`

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

const _eval = await client.evals.create({
  data_source_config: {
    item_schema: { foo: 'bar' },
    type: 'custom',
  },
  testing_criteria: [
    {
      input: [{ content: 'content', role: 'role' }],
      labels: ['string'],
      model: 'model',
      name: 'name',
      passing_labels: ['string'],
      type: 'label_model',
    },
  ],
});

console.log(_eval.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "data_source_config": {
    "schema": {
      "foo": "bar"
    },
    "type": "custom"
  },
  "metadata": {
    "foo": "string"
  },
  "name": "Chatbot effectiveness Evaluation",
  "object": "eval",
  "testing_criteria": [
    {
      "input": [
        {
          "content": "string",
          "role": "user",
          "type": "message"
        }
      ],
      "labels": [
        "string"
      ],
      "model": "model",
      "name": "name",
      "passing_labels": [
        "string"
      ],
      "type": "label_model"
    }
  ]
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const evalObj = await openai.evals.create({
  name: "Sentiment",
  data_source_config: {
    type: "stored_completions",
    metadata: { usecase: "chatbot" }
  },
  testing_criteria: [
    {
      type: "label_model",
      model: "o3-mini",
      input: [
        { role: "developer", content: "Classify the sentiment of the following statement as one of 'positive', 'neutral', or 'negative'" },
        { role: "user", content: "Statement: {{item.input}}" }
      ],
      passing_labels: ["positive"],
      labels: ["positive", "neutral", "negative"],
      name: "Example label grader"
    }
  ]
});
console.log(evalObj);
```

#### Response

```json
{
  "object": "eval",
  "id": "eval_67b7fa9a81a88190ab4aa417e397ea21",
  "data_source_config": {
    "type": "stored_completions",
    "metadata": {
      "usecase": "chatbot"
    },
    "schema": {
      "type": "object",
      "properties": {
        "item": {
          "type": "object"
        },
        "sample": {
          "type": "object"
        }
      },
      "required": [
        "item",
        "sample"
      ]
  },
  "testing_criteria": [
    {
      "name": "Example label grader",
      "type": "label_model",
      "model": "o3-mini",
      "input": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Classify the sentiment of the following statement as one of positive, neutral, or negative"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "Statement: {{item.input}}"
          }
        }
      ],
      "passing_labels": [
        "positive"
      ],
      "labels": [
        "positive",
        "neutral",
        "negative"
      ]
    }
  ],
  "name": "Sentiment",
  "created_at": 1740110490,
  "metadata": {
    "description": "An eval for sentiment analysis"
  }
}
```

## Get an eval

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

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "data_source_config": {
    "schema": {
      "foo": "bar"
    },
    "type": "custom"
  },
  "metadata": {
    "foo": "string"
  },
  "name": "Chatbot effectiveness Evaluation",
  "object": "eval",
  "testing_criteria": [
    {
      "input": [
        {
          "content": "string",
          "role": "user",
          "type": "message"
        }
      ],
      "labels": [
        "string"
      ],
      "model": "model",
      "name": "name",
      "passing_labels": [
        "string"
      ],
      "type": "label_model"
    }
  ]
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const evalObj = await openai.evals.retrieve("eval_67abd54d9b0081909a86353f6fb9317a");
console.log(evalObj);
```

#### Response

```json
{
  "object": "eval",
  "id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "data_source_config": {
    "type": "custom",
    "schema": {
      "type": "object",
      "properties": {
        "item": {
          "type": "object",
          "properties": {
            "input": {
              "type": "string"
            },
            "ground_truth": {
              "type": "string"
            }
          },
          "required": [
            "input",
            "ground_truth"
          ]
        }
      },
      "required": [
        "item"
      ]
    }
  },
  "testing_criteria": [
    {
      "name": "String check",
      "id": "String check-2eaf2d8d-d649-4335-8148-9535a7ca73c2",
      "type": "string_check",
      "input": "{{item.input}}",
      "reference": "{{item.ground_truth}}",
      "operation": "eq"
    }
  ],
  "name": "External Data Eval",
  "created_at": 1739314509,
  "metadata": {},
}
```

## Update an eval

`client.evals.update(stringevalID, EvalUpdateParamsbody, RequestOptionsoptions?): EvalUpdateResponse`

**post** `/evals/{eval_id}`

Update certain properties of an evaluation.

### Parameters

- `evalID: string`

- `body: EvalUpdateParams`

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name?: string`

    Rename the evaluation.

### Returns

- `EvalUpdateResponse`

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

const _eval = await client.evals.update('eval_id');

console.log(_eval.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "data_source_config": {
    "schema": {
      "foo": "bar"
    },
    "type": "custom"
  },
  "metadata": {
    "foo": "string"
  },
  "name": "Chatbot effectiveness Evaluation",
  "object": "eval",
  "testing_criteria": [
    {
      "input": [
        {
          "content": "string",
          "role": "user",
          "type": "message"
        }
      ],
      "labels": [
        "string"
      ],
      "model": "model",
      "name": "name",
      "passing_labels": [
        "string"
      ],
      "type": "label_model"
    }
  ]
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const updatedEval = await openai.evals.update(
  "eval_67abd54d9b0081909a86353f6fb9317a",
  {
    name: "Updated Eval",
    metadata: { description: "Updated description" }
  }
);
console.log(updatedEval);
```

#### Response

```json
{
  "object": "eval",
  "id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "data_source_config": {
    "type": "custom",
    "schema": {
      "type": "object",
      "properties": {
        "item": {
          "type": "object",
          "properties": {
            "input": {
              "type": "string"
            },
            "ground_truth": {
              "type": "string"
            }
          },
          "required": [
            "input",
            "ground_truth"
          ]
        }
      },
      "required": [
        "item"
      ]
    }
  },
  "testing_criteria": [
    {
      "name": "String check",
      "id": "String check-2eaf2d8d-d649-4335-8148-9535a7ca73c2",
      "type": "string_check",
      "input": "{{item.input}}",
      "reference": "{{item.ground_truth}}",
      "operation": "eq"
    }
  ],
  "name": "Updated Eval",
  "created_at": 1739314509,
  "metadata": {"description": "Updated description"},
}
```

## Delete an eval

`client.evals.delete(stringevalID, RequestOptionsoptions?): EvalDeleteResponse`

**delete** `/evals/{eval_id}`

Delete an evaluation.

### Parameters

- `evalID: string`

### Returns

- `EvalDeleteResponse`

  - `deleted: boolean`

  - `eval_id: string`

  - `object: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const _eval = await client.evals.delete('eval_id');

console.log(_eval.eval_id);
```

#### Response

```json
{
  "deleted": true,
  "eval_id": "eval_abc123",
  "object": "eval.deleted"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const deleted = await openai.evals.delete("eval_abc123");
console.log(deleted);
```

#### Response

```json
{
  "object": "eval.deleted",
  "deleted": true,
  "eval_id": "eval_abc123"
}
```

## Domain Types

### Eval Custom Data Source Config

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

### Eval Stored Completions Data Source Config

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

# Runs

## Get eval runs

`client.evals.runs.list(stringevalID, RunListParamsquery?, RequestOptionsoptions?): CursorPage<RunListResponse>`

**get** `/evals/{eval_id}/runs`

Get a list of runs for an evaluation.

### Parameters

- `evalID: string`

- `query: RunListParams`

  - `after?: string`

    Identifier for the last run from the previous pagination request.

  - `limit?: number`

    Number of runs to retrieve.

  - `order?: "asc" | "desc"`

    Sort order for runs by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

    - `"asc"`

    - `"desc"`

  - `status?: "queued" | "in_progress" | "completed" | 2 more`

    Filter runs by status. One of `queued` | `in_progress` | `failed` | `completed` | `canceled`.

    - `"queued"`

    - `"in_progress"`

    - `"completed"`

    - `"canceled"`

    - `"failed"`

### Returns

- `RunListResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `detail?: "low" | "high"`

                      The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`.

                      - `"low"`

                      - `"high"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

          An object specifying the format that the model must output.

          Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
          Structured Outputs which ensures the model will match your supplied JSON
          schema. Learn more in the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

          Setting to `{ "type": "json_object" }` enables the older JSON mode, which
          ensures the message the model generates is valid JSON. Using `json_schema`
          is preferred for models that support it.

          - `ResponseFormatText`

            Default response format. Used to generate text responses.

            - `type: "text"`

              The type of response format being defined. Always `text`.

              - `"text"`

          - `ResponseFormatJSONSchema`

            JSON Schema response format. Used to generate structured JSON responses.
            Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

            - `json_schema: JSONSchema`

              Structured Outputs configuration options, including a JSON Schema.

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `schema?: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `type: "json_schema"`

              The type of response format being defined. Always `json_schema`.

              - `"json_schema"`

          - `ResponseFormatJSONObject`

            JSON object response format. An older method of generating JSON responses.
            Using `json_schema` is recommended for models that support it. Note that the
            model will not generate JSON without a system or user message instructing it
            to do so.

            - `type: "json_object"`

              The type of response format being defined. Always `json_object`.

              - `"json_object"`

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

          - `function: FunctionDefinition`

            - `name: string`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description?: string`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters?: FunctionParameters`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict?: boolean | null`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 5 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                  - `"in"`

                  - `"nin"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 5 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                      - `"in"`

                      - `"nin"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const runListResponse of client.evals.runs.list('eval_id')) {
  console.log(runListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "data_source": {
        "source": {
          "content": [
            {
              "item": {
                "foo": "bar"
              },
              "sample": {
                "foo": "bar"
              }
            }
          ],
          "type": "file_content"
        },
        "type": "jsonl"
      },
      "error": {
        "code": "code",
        "message": "message"
      },
      "eval_id": "eval_id",
      "metadata": {
        "foo": "string"
      },
      "model": "model",
      "name": "name",
      "object": "eval.run",
      "per_model_usage": [
        {
          "cached_tokens": 0,
          "completion_tokens": 0,
          "invocation_count": 0,
          "model_name": "model_name",
          "prompt_tokens": 0,
          "total_tokens": 0
        }
      ],
      "per_testing_criteria_results": [
        {
          "failed": 0,
          "passed": 0,
          "testing_criteria": "testing_criteria"
        }
      ],
      "report_url": "report_url",
      "result_counts": {
        "errored": 0,
        "failed": 0,
        "passed": 0,
        "total": 0
      },
      "status": "status"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const runs = await openai.evals.runs.list("egroup_67abd54d9b0081909a86353f6fb9317a");
console.log(runs);
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "eval.run",
      "id": "evalrun_67e0c7d31560819090d60c0780591042",
      "eval_id": "eval_67e0c726d560819083f19a957c4c640b",
      "report_url": "https://platform.openai.com/evaluations/eval_67e0c726d560819083f19a957c4c640b",
      "status": "completed",
      "model": "o3-mini",
      "name": "bulk_with_negative_examples_o3-mini",
      "created_at": 1742784467,
      "result_counts": {
        "total": 1,
        "errored": 0,
        "failed": 0,
        "passed": 1
      },
      "per_model_usage": [
        {
          "model_name": "o3-mini",
          "invocation_count": 1,
          "prompt_tokens": 563,
          "completion_tokens": 874,
          "total_tokens": 1437,
          "cached_tokens": 0
        }
      ],
      "per_testing_criteria_results": [
        {
          "testing_criteria": "Push Notification Summary Grader-1808cd0b-eeec-4e0b-a519-337e79f4f5d1",
          "passed": 1,
          "failed": 0
        }
      ],
      "data_source": {
        "type": "completions",
        "source": {
          "type": "file_content",
          "content": [
            {
              "item": {
                "notifications": "\n- New message from Sarah: \"Can you call me later?\"\n- Your package has been delivered!\n- Flash sale: 20% off electronics for the next 2 hours!\n"
              }
            }
          ]
        },
        "input_messages": {
          "type": "template",
          "template": [
            {
              "type": "message",
              "role": "developer",
              "content": {
                "type": "input_text",
                "text": "\n\n\n\nYou are a helpful assistant that takes in an array of push notifications and returns a collapsed summary of them.\nThe push notification will be provided as follows:\n<push_notifications>\n...notificationlist...\n</push_notifications>\n\nYou should return just the summary and nothing else.\n\n\nYou should return a summary that is concise and snappy.\n\n\nHere is an example of a good summary:\n<push_notifications>\n- Traffic alert: Accident reported on Main Street.- Package out for delivery: Expected by 5 PM.- New friend suggestion: Connect with Emma.\n</push_notifications>\n<summary>\nTraffic alert, package expected by 5pm, suggestion for new friend (Emily).\n</summary>\n\n\nHere is an example of a bad summary:\n<push_notifications>\n- Traffic alert: Accident reported on Main Street.- Package out for delivery: Expected by 5 PM.- New friend suggestion: Connect with Emma.\n</push_notifications>\n<summary>\nTraffic alert reported on main street. You have a package that will arrive by 5pm, Emily is a new friend suggested for you.\n</summary>\n"
              }
            },
            {
              "type": "message",
              "role": "user",
              "content": {
                "type": "input_text",
                "text": "<push_notifications>{{item.notifications}}</push_notifications>"
              }
            }
          ]
        },
        "model": "o3-mini",
        "sampling_params": null
      },
      "error": null,
      "metadata": {}
    }
  ],
  "first_id": "evalrun_67e0c7d31560819090d60c0780591042",
  "last_id": "evalrun_67e0c7d31560819090d60c0780591042",
  "has_more": true
}
```

## Create eval run

`client.evals.runs.create(stringevalID, RunCreateParamsbody, RequestOptionsoptions?): RunCreateResponse`

**post** `/evals/{eval_id}/runs`

Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.

### Parameters

- `evalID: string`

- `body: RunCreateParams`

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | CreateEvalResponsesRunDataSource`

    Details about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `detail?: "low" | "high"`

                      The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`.

                      - `"low"`

                      - `"high"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

          An object specifying the format that the model must output.

          Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
          Structured Outputs which ensures the model will match your supplied JSON
          schema. Learn more in the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

          Setting to `{ "type": "json_object" }` enables the older JSON mode, which
          ensures the message the model generates is valid JSON. Using `json_schema`
          is preferred for models that support it.

          - `ResponseFormatText`

            Default response format. Used to generate text responses.

            - `type: "text"`

              The type of response format being defined. Always `text`.

              - `"text"`

          - `ResponseFormatJSONSchema`

            JSON Schema response format. Used to generate structured JSON responses.
            Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

            - `json_schema: JSONSchema`

              Structured Outputs configuration options, including a JSON Schema.

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `schema?: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `type: "json_schema"`

              The type of response format being defined. Always `json_schema`.

              - `"json_schema"`

          - `ResponseFormatJSONObject`

            JSON object response format. An older method of generating JSON responses.
            Using `json_schema` is recommended for models that support it. Note that the
            model will not generate JSON without a system or user message instructing it
            to do so.

            - `type: "json_object"`

              The type of response format being defined. Always `json_object`.

              - `"json_object"`

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

          - `function: FunctionDefinition`

            - `name: string`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description?: string`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters?: FunctionParameters`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict?: boolean | null`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `CreateEvalResponsesRunDataSource`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 5 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                  - `"in"`

                  - `"nin"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 5 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                      - `"in"`

                      - `"nin"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name?: string`

    The name of the run.

### Returns

- `RunCreateResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `detail?: "low" | "high"`

                      The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`.

                      - `"low"`

                      - `"high"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

          An object specifying the format that the model must output.

          Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
          Structured Outputs which ensures the model will match your supplied JSON
          schema. Learn more in the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

          Setting to `{ "type": "json_object" }` enables the older JSON mode, which
          ensures the message the model generates is valid JSON. Using `json_schema`
          is preferred for models that support it.

          - `ResponseFormatText`

            Default response format. Used to generate text responses.

            - `type: "text"`

              The type of response format being defined. Always `text`.

              - `"text"`

          - `ResponseFormatJSONSchema`

            JSON Schema response format. Used to generate structured JSON responses.
            Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

            - `json_schema: JSONSchema`

              Structured Outputs configuration options, including a JSON Schema.

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `schema?: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `type: "json_schema"`

              The type of response format being defined. Always `json_schema`.

              - `"json_schema"`

          - `ResponseFormatJSONObject`

            JSON object response format. An older method of generating JSON responses.
            Using `json_schema` is recommended for models that support it. Note that the
            model will not generate JSON without a system or user message instructing it
            to do so.

            - `type: "json_object"`

              The type of response format being defined. Always `json_object`.

              - `"json_object"`

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

          - `function: FunctionDefinition`

            - `name: string`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description?: string`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters?: FunctionParameters`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict?: boolean | null`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 5 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                  - `"in"`

                  - `"nin"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 5 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                      - `"in"`

                      - `"nin"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.create('eval_id', {
  data_source: {
    source: { content: [{ item: { foo: 'bar' } }], type: 'file_content' },
    type: 'jsonl',
  },
});

console.log(run.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "data_source": {
    "source": {
      "content": [
        {
          "item": {
            "foo": "bar"
          },
          "sample": {
            "foo": "bar"
          }
        }
      ],
      "type": "file_content"
    },
    "type": "jsonl"
  },
  "error": {
    "code": "code",
    "message": "message"
  },
  "eval_id": "eval_id",
  "metadata": {
    "foo": "string"
  },
  "model": "model",
  "name": "name",
  "object": "eval.run",
  "per_model_usage": [
    {
      "cached_tokens": 0,
      "completion_tokens": 0,
      "invocation_count": 0,
      "model_name": "model_name",
      "prompt_tokens": 0,
      "total_tokens": 0
    }
  ],
  "per_testing_criteria_results": [
    {
      "failed": 0,
      "passed": 0,
      "testing_criteria": "testing_criteria"
    }
  ],
  "report_url": "report_url",
  "result_counts": {
    "errored": 0,
    "failed": 0,
    "passed": 0,
    "total": 0
  },
  "status": "status"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const run = await openai.evals.runs.create(
  "eval_67e579652b548190aaa83ada4b125f47",
  {
    name: "gpt-4o-mini",
    data_source: {
      type: "completions",
      input_messages: {
        type: "template",
        template: [
          {
            role: "developer",
            content: "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          },
          {
            role: "user",
            content: "{{item.input}}"
          }
        ]
      },
      sampling_params: {
        temperature: 1,
        max_completions_tokens: 2048,
        top_p: 1,
        seed: 42
      },
      model: "gpt-4o-mini",
      source: {
        type: "file_content",
        content: [
          {
            item: {
              input: "Tech Company Launches Advanced Artificial Intelligence Platform",
              ground_truth: "Technology"
            }
          }
        ]
      }
    }
  }
);
console.log(run);
```

#### Response

```json
{
  "object": "eval.run",
  "id": "evalrun_67e57965b480819094274e3a32235e4c",
  "eval_id": "eval_67e579652b548190aaa83ada4b125f47",
  "report_url": "https://platform.openai.com/evaluations/eval_67e579652b548190aaa83ada4b125f47&run_id=evalrun_67e57965b480819094274e3a32235e4c",
  "status": "queued",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
```

## Get an eval run

`client.evals.runs.retrieve(stringrunID, RunRetrieveParamsparams, RequestOptionsoptions?): RunRetrieveResponse`

**get** `/evals/{eval_id}/runs/{run_id}`

Get an evaluation run by ID.

### Parameters

- `runID: string`

- `params: RunRetrieveParams`

  - `eval_id: string`

    The ID of the evaluation to retrieve runs for.

### Returns

- `RunRetrieveResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `detail?: "low" | "high"`

                      The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`.

                      - `"low"`

                      - `"high"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

          An object specifying the format that the model must output.

          Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
          Structured Outputs which ensures the model will match your supplied JSON
          schema. Learn more in the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

          Setting to `{ "type": "json_object" }` enables the older JSON mode, which
          ensures the message the model generates is valid JSON. Using `json_schema`
          is preferred for models that support it.

          - `ResponseFormatText`

            Default response format. Used to generate text responses.

            - `type: "text"`

              The type of response format being defined. Always `text`.

              - `"text"`

          - `ResponseFormatJSONSchema`

            JSON Schema response format. Used to generate structured JSON responses.
            Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

            - `json_schema: JSONSchema`

              Structured Outputs configuration options, including a JSON Schema.

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `schema?: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `type: "json_schema"`

              The type of response format being defined. Always `json_schema`.

              - `"json_schema"`

          - `ResponseFormatJSONObject`

            JSON object response format. An older method of generating JSON responses.
            Using `json_schema` is recommended for models that support it. Note that the
            model will not generate JSON without a system or user message instructing it
            to do so.

            - `type: "json_object"`

              The type of response format being defined. Always `json_object`.

              - `"json_object"`

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

          - `function: FunctionDefinition`

            - `name: string`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description?: string`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters?: FunctionParameters`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict?: boolean | null`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 5 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                  - `"in"`

                  - `"nin"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 5 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                      - `"in"`

                      - `"nin"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.retrieve('run_id', { eval_id: 'eval_id' });

console.log(run.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "data_source": {
    "source": {
      "content": [
        {
          "item": {
            "foo": "bar"
          },
          "sample": {
            "foo": "bar"
          }
        }
      ],
      "type": "file_content"
    },
    "type": "jsonl"
  },
  "error": {
    "code": "code",
    "message": "message"
  },
  "eval_id": "eval_id",
  "metadata": {
    "foo": "string"
  },
  "model": "model",
  "name": "name",
  "object": "eval.run",
  "per_model_usage": [
    {
      "cached_tokens": 0,
      "completion_tokens": 0,
      "invocation_count": 0,
      "model_name": "model_name",
      "prompt_tokens": 0,
      "total_tokens": 0
    }
  ],
  "per_testing_criteria_results": [
    {
      "failed": 0,
      "passed": 0,
      "testing_criteria": "testing_criteria"
    }
  ],
  "report_url": "report_url",
  "result_counts": {
    "errored": 0,
    "failed": 0,
    "passed": 0,
    "total": 0
  },
  "status": "status"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const run = await openai.evals.runs.retrieve(
  "evalrun_67abd54d60ec8190832b46859da808f7",
  { eval_id: "eval_67abd54d9b0081909a86353f6fb9317a" }
);
console.log(run);
```

#### Response

```json
{
  "object": "eval.run",
  "id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "report_url": "https://platform.openai.com/evaluations/eval_67abd54d9b0081909a86353f6fb9317a?run_id=evalrun_67abd54d60ec8190832b46859da808f7",
  "status": "queued",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Central Bank Increases Interest Rates Amid Inflation Concerns",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Summit Addresses Climate Change Strategies",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Major Retailer Reports Record-Breaking Holiday Sales",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "National Team Qualifies for World Championship Finals",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Stock Markets Rally After Positive Economic Data Released",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "Global Manufacturer Announces Merger with Competitor",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Breakthrough in Renewable Energy Technology Unveiled",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "World Leaders Sign Historic Climate Agreement",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Professional Athlete Sets New Record in Championship Event",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Financial Institutions Adapt to New Regulatory Requirements",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Tech Conference Showcases Advances in Artificial Intelligence",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Global Markets Respond to Oil Price Fluctuations",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Cooperation Strengthened Through New Treaty",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Sports League Announces Revised Schedule for Upcoming Season",
            "ground_truth": "Sports"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
```

## Cancel eval run

`client.evals.runs.cancel(stringrunID, RunCancelParamsparams, RequestOptionsoptions?): RunCancelResponse`

**post** `/evals/{eval_id}/runs/{run_id}`

Cancel an ongoing evaluation run.

### Parameters

- `runID: string`

- `params: RunCancelParams`

  - `eval_id: string`

    The ID of the evaluation whose run you want to cancel.

### Returns

- `RunCancelResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `detail?: "low" | "high"`

                      The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`.

                      - `"low"`

                      - `"high"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

          An object specifying the format that the model must output.

          Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
          Structured Outputs which ensures the model will match your supplied JSON
          schema. Learn more in the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

          Setting to `{ "type": "json_object" }` enables the older JSON mode, which
          ensures the message the model generates is valid JSON. Using `json_schema`
          is preferred for models that support it.

          - `ResponseFormatText`

            Default response format. Used to generate text responses.

            - `type: "text"`

              The type of response format being defined. Always `text`.

              - `"text"`

          - `ResponseFormatJSONSchema`

            JSON Schema response format. Used to generate structured JSON responses.
            Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

            - `json_schema: JSONSchema`

              Structured Outputs configuration options, including a JSON Schema.

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `schema?: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `type: "json_schema"`

              The type of response format being defined. Always `json_schema`.

              - `"json_schema"`

          - `ResponseFormatJSONObject`

            JSON object response format. An older method of generating JSON responses.
            Using `json_schema` is recommended for models that support it. Note that the
            model will not generate JSON without a system or user message instructing it
            to do so.

            - `type: "json_object"`

              The type of response format being defined. Always `json_object`.

              - `"json_object"`

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

          - `function: FunctionDefinition`

            - `name: string`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description?: string`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters?: FunctionParameters`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict?: boolean | null`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

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

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 5 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                  - `"in"`

                  - `"nin"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 5 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                      - `"in"`

                      - `"nin"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.evals.runs.cancel('run_id', { eval_id: 'eval_id' });

console.log(response.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "data_source": {
    "source": {
      "content": [
        {
          "item": {
            "foo": "bar"
          },
          "sample": {
            "foo": "bar"
          }
        }
      ],
      "type": "file_content"
    },
    "type": "jsonl"
  },
  "error": {
    "code": "code",
    "message": "message"
  },
  "eval_id": "eval_id",
  "metadata": {
    "foo": "string"
  },
  "model": "model",
  "name": "name",
  "object": "eval.run",
  "per_model_usage": [
    {
      "cached_tokens": 0,
      "completion_tokens": 0,
      "invocation_count": 0,
      "model_name": "model_name",
      "prompt_tokens": 0,
      "total_tokens": 0
    }
  ],
  "per_testing_criteria_results": [
    {
      "failed": 0,
      "passed": 0,
      "testing_criteria": "testing_criteria"
    }
  ],
  "report_url": "report_url",
  "result_counts": {
    "errored": 0,
    "failed": 0,
    "passed": 0,
    "total": 0
  },
  "status": "status"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const canceledRun = await openai.evals.runs.cancel(
  "evalrun_67abd54d60ec8190832b46859da808f7",
  { eval_id: "eval_67abd54d9b0081909a86353f6fb9317a" }
);
console.log(canceledRun);
```

#### Response

```json
{
  "object": "eval.run",
  "id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "report_url": "https://platform.openai.com/evaluations/eval_67abd54d9b0081909a86353f6fb9317a?run_id=evalrun_67abd54d60ec8190832b46859da808f7",
  "status": "canceled",
  "model": "gpt-4o-mini",
  "name": "gpt-4o-mini",
  "created_at": 1743092069,
  "result_counts": {
    "total": 0,
    "errored": 0,
    "failed": 0,
    "passed": 0
  },
  "per_model_usage": null,
  "per_testing_criteria_results": null,
  "data_source": {
    "type": "completions",
    "source": {
      "type": "file_content",
      "content": [
        {
          "item": {
            "input": "Tech Company Launches Advanced Artificial Intelligence Platform",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Central Bank Increases Interest Rates Amid Inflation Concerns",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Summit Addresses Climate Change Strategies",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Major Retailer Reports Record-Breaking Holiday Sales",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "National Team Qualifies for World Championship Finals",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Stock Markets Rally After Positive Economic Data Released",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "Global Manufacturer Announces Merger with Competitor",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Breakthrough in Renewable Energy Technology Unveiled",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "World Leaders Sign Historic Climate Agreement",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Professional Athlete Sets New Record in Championship Event",
            "ground_truth": "Sports"
          }
        },
        {
          "item": {
            "input": "Financial Institutions Adapt to New Regulatory Requirements",
            "ground_truth": "Business"
          }
        },
        {
          "item": {
            "input": "Tech Conference Showcases Advances in Artificial Intelligence",
            "ground_truth": "Technology"
          }
        },
        {
          "item": {
            "input": "Global Markets Respond to Oil Price Fluctuations",
            "ground_truth": "Markets"
          }
        },
        {
          "item": {
            "input": "International Cooperation Strengthened Through New Treaty",
            "ground_truth": "World"
          }
        },
        {
          "item": {
            "input": "Sports League Announces Revised Schedule for Upcoming Season",
            "ground_truth": "Sports"
          }
        }
      ]
    },
    "input_messages": {
      "type": "template",
      "template": [
        {
          "type": "message",
          "role": "developer",
          "content": {
            "type": "input_text",
            "text": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n"
          }
        },
        {
          "type": "message",
          "role": "user",
          "content": {
            "type": "input_text",
            "text": "{{item.input}}"
          }
        }
      ]
    },
    "model": "gpt-4o-mini",
    "sampling_params": {
      "seed": 42,
      "temperature": 1.0,
      "top_p": 1.0,
      "max_completions_tokens": 2048
    }
  },
  "error": null,
  "metadata": {}
}
```

## Delete eval run

`client.evals.runs.delete(stringrunID, RunDeleteParamsparams, RequestOptionsoptions?): RunDeleteResponse`

**delete** `/evals/{eval_id}/runs/{run_id}`

Delete an eval run.

### Parameters

- `runID: string`

- `params: RunDeleteParams`

  - `eval_id: string`

    The ID of the evaluation to delete the run from.

### Returns

- `RunDeleteResponse`

  - `deleted?: boolean`

  - `object?: string`

  - `run_id?: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.delete('run_id', { eval_id: 'eval_id' });

console.log(run.run_id);
```

#### Response

```json
{
  "deleted": true,
  "object": "eval.run.deleted",
  "run_id": "evalrun_677469f564d48190807532a852da3afb"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const deleted = await openai.evals.runs.delete(
  "eval_123abc",
  "evalrun_abc456"
);
console.log(deleted);
```

#### Response

```json
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "evalrun_abc456"
}
```

## Domain Types

### Create Eval Completions Run Data Source

- `CreateEvalCompletionsRunDataSource`

  A CompletionsRunDataSource object describing a model sampling configuration.

  - `source: FileContent | FileID | StoredCompletions`

    Determines what populates the `item` namespace in this run's data source.

    - `FileContent`

      - `content: Array<Content>`

        The content of the jsonl file.

        - `item: Record<string, unknown>`

        - `sample?: Record<string, unknown>`

      - `type: "file_content"`

        The type of jsonl source. Always `file_content`.

        - `"file_content"`

    - `FileID`

      - `id: string`

        The identifier of the file.

      - `type: "file_id"`

        The type of jsonl source. Always `file_id`.

        - `"file_id"`

    - `StoredCompletions`

      A StoredCompletionsRunDataSource configuration describing a set of filters

      - `type: "stored_completions"`

        The type of source. Always `stored_completions`.

        - `"stored_completions"`

      - `created_after?: number | null`

        An optional Unix timestamp to filter items created after this time.

      - `created_before?: number | null`

        An optional Unix timestamp to filter items created before this time.

      - `limit?: number | null`

        An optional maximum number of items to return.

      - `metadata?: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model?: string | null`

        An optional model to filter by (e.g., 'gpt-4o').

  - `type: "completions"`

    The type of run data source. Always `completions`.

    - `"completions"`

  - `input_messages?: Template | ItemReference`

    Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

    - `Template`

      - `template: Array<EasyInputMessage | EvalItem>`

        A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

        - `EasyInputMessage`

          A message input to the model with a role indicating instruction following
          hierarchy. Instructions given with the `developer` or `system` role take
          precedence over instructions given with the `user` role. Messages with the
          `assistant` role are presumed to have been generated by the model in previous
          interactions.

          - `content: string | ResponseInputMessageContentList`

            Text, image, or audio input to the model, used to generate a response.
            Can also contain previous assistant responses.

            - `string`

            - `ResponseInputMessageContentList = Array<ResponseInputContent>`

              A list of one or many input items to the model, containing different content
              types.

              - `ResponseInputText`

                A text input to the model.

                - `text: string`

                  The text input to the model.

                - `type: "input_text"`

                  The type of the input item. Always `input_text`.

                  - `"input_text"`

              - `ResponseInputImage`

                An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                - `detail: "low" | "high" | "auto" | "original"`

                  The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                  - `"low"`

                  - `"high"`

                  - `"auto"`

                  - `"original"`

                - `type: "input_image"`

                  The type of the input item. Always `input_image`.

                  - `"input_image"`

                - `file_id?: string | null`

                  The ID of the file to be sent to the model.

                - `image_url?: string | null`

                  The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

              - `ResponseInputFile`

                A file input to the model.

                - `type: "input_file"`

                  The type of the input item. Always `input_file`.

                  - `"input_file"`

                - `detail?: "low" | "high"`

                  The detail level of the file to be sent to the model. Use `low` for the default rendering behavior, or `high` to render the file at higher quality. Defaults to `low`.

                  - `"low"`

                  - `"high"`

                - `file_data?: string`

                  The content of the file to be sent to the model.

                - `file_id?: string | null`

                  The ID of the file to be sent to the model.

                - `file_url?: string`

                  The URL of the file to be sent to the model.

                - `filename?: string`

                  The name of the file to be sent to the model.

          - `role: "user" | "assistant" | "system" | "developer"`

            The role of the message input. One of `user`, `assistant`, `system`, or
            `developer`.

            - `"user"`

            - `"assistant"`

            - `"system"`

            - `"developer"`

          - `phase?: "commentary" | "final_answer" | null`

            Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
            For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
            phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

            - `"commentary"`

            - `"final_answer"`

          - `type?: "message"`

            The type of the message input. Always `message`.

            - `"message"`

        - `EvalItem`

          A message input to the model with a role indicating instruction following
          hierarchy. Instructions given with the `developer` or `system` role take
          precedence over instructions given with the `user` role. Messages with the
          `assistant` role are presumed to have been generated by the model in previous
          interactions.

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

      - `type: "template"`

        The type of input messages. Always `template`.

        - `"template"`

    - `ItemReference`

      - `item_reference: string`

        A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

      - `type: "item_reference"`

        The type of input messages. Always `item_reference`.

        - `"item_reference"`

  - `model?: string`

    The name of the model to use for generating completions (e.g. "o3-mini").

  - `sampling_params?: SamplingParams`

    - `max_completion_tokens?: number`

      The maximum number of tokens in the generated output.

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

    - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

      An object specifying the format that the model must output.

      Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
      Structured Outputs which ensures the model will match your supplied JSON
      schema. Learn more in the [Structured Outputs
      guide](https://platform.openai.com/docs/guides/structured-outputs).

      Setting to `{ "type": "json_object" }` enables the older JSON mode, which
      ensures the message the model generates is valid JSON. Using `json_schema`
      is preferred for models that support it.

      - `ResponseFormatText`

        Default response format. Used to generate text responses.

        - `type: "text"`

          The type of response format being defined. Always `text`.

          - `"text"`

      - `ResponseFormatJSONSchema`

        JSON Schema response format. Used to generate structured JSON responses.
        Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

        - `json_schema: JSONSchema`

          Structured Outputs configuration options, including a JSON Schema.

          - `name: string`

            The name of the response format. Must be a-z, A-Z, 0-9, or contain
            underscores and dashes, with a maximum length of 64.

          - `description?: string`

            A description of what the response format is for, used by the model to
            determine how to respond in the format.

          - `schema?: Record<string, unknown>`

            The schema for the response format, described as a JSON Schema object.
            Learn how to build JSON schemas [here](https://json-schema.org/).

          - `strict?: boolean | null`

            Whether to enable strict schema adherence when generating the output.
            If set to true, the model will always follow the exact schema defined
            in the `schema` field. Only a subset of JSON Schema is supported when
            `strict` is `true`. To learn more, read the [Structured Outputs
            guide](https://platform.openai.com/docs/guides/structured-outputs).

        - `type: "json_schema"`

          The type of response format being defined. Always `json_schema`.

          - `"json_schema"`

      - `ResponseFormatJSONObject`

        JSON object response format. An older method of generating JSON responses.
        Using `json_schema` is recommended for models that support it. Note that the
        model will not generate JSON without a system or user message instructing it
        to do so.

        - `type: "json_object"`

          The type of response format being defined. Always `json_object`.

          - `"json_object"`

    - `seed?: number`

      A seed value to initialize the randomness, during sampling.

    - `temperature?: number`

      A higher temperature increases randomness in the outputs.

    - `tools?: Array<ChatCompletionFunctionTool>`

      A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description?: string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters?: FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict?: boolean | null`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: "function"`

        The type of the tool. Currently, only `function` is supported.

        - `"function"`

    - `top_p?: number`

      An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

### Create Eval JSONL Run Data Source

- `CreateEvalJSONLRunDataSource`

  A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

  - `source: FileContent | FileID`

    Determines what populates the `item` namespace in the data source.

    - `FileContent`

      - `content: Array<Content>`

        The content of the jsonl file.

        - `item: Record<string, unknown>`

        - `sample?: Record<string, unknown>`

      - `type: "file_content"`

        The type of jsonl source. Always `file_content`.

        - `"file_content"`

    - `FileID`

      - `id: string`

        The identifier of the file.

      - `type: "file_id"`

        The type of jsonl source. Always `file_id`.

        - `"file_id"`

  - `type: "jsonl"`

    The type of data source. Always `jsonl`.

    - `"jsonl"`

### Eval API Error

- `EvalAPIError`

  An object representing an error response from the Eval API.

  - `code: string`

    The error code.

  - `message: string`

    The error message.

# Output Items

## Get eval run output items

`client.evals.runs.outputItems.list(stringrunID, OutputItemListParamsparams, RequestOptionsoptions?): CursorPage<OutputItemListResponse>`

**get** `/evals/{eval_id}/runs/{run_id}/output_items`

Get a list of output items for an evaluation run.

### Parameters

- `runID: string`

- `params: OutputItemListParams`

  - `eval_id: string`

    Path param: The ID of the evaluation to retrieve runs for.

  - `after?: string`

    Query param: Identifier for the last output item from the previous pagination request.

  - `limit?: number`

    Query param: Number of output items to retrieve.

  - `order?: "asc" | "desc"`

    Query param: Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

    - `"asc"`

    - `"desc"`

  - `status?: "fail" | "pass"`

    Query param: Filter output items by status. Use `failed` to filter by failed output
    items or `pass` to filter by passed output items.

    - `"fail"`

    - `"pass"`

### Returns

- `OutputItemListResponse`

  A schema representing an evaluation run output item.

  - `id: string`

    Unique identifier for the evaluation run output item.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: Record<string, unknown>`

    Details of the input data source item.

  - `datasource_item_id: number`

    The identifier for the data source item.

  - `eval_id: string`

    The identifier of the evaluation group.

  - `object: "eval.run.output_item"`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: Array<Result>`

    A list of grader results for this output item.

    - `name: string`

      The name of the grader.

    - `passed: boolean`

      Whether the grader considered the output a pass.

    - `score: number`

      The numeric score produced by the grader.

    - `sample?: Record<string, unknown> | null`

      Optional sample or intermediate data produced by the grader.

    - `type?: string`

      The grader type (for example, "string-check-grader").

  - `run_id: string`

    The identifier of the evaluation run associated with this output item.

  - `sample: Sample`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: string`

        The error code.

      - `message: string`

        The error message.

    - `finish_reason: string`

      The reason why the sample generation was finished.

    - `input: Array<Input>`

      An array of input messages.

      - `content: string`

        The content of the message.

      - `role: string`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: number`

      The maximum number of tokens allowed for completion.

    - `model: string`

      The model used for generating the sample.

    - `output: Array<Output>`

      An array of output messages.

      - `content?: string`

        The content of the message.

      - `role?: string`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: number`

      The seed used for generating the sample.

    - `temperature: number`

      The sampling temperature used.

    - `top_p: number`

      The top_p value used for sampling.

    - `usage: Usage`

      Token usage details for the sample.

      - `cached_tokens: number`

        The number of tokens retrieved from cache.

      - `completion_tokens: number`

        The number of completion tokens generated.

      - `prompt_tokens: number`

        The number of prompt tokens used.

      - `total_tokens: number`

        The total number of tokens used.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const outputItemListResponse of client.evals.runs.outputItems.list('run_id', {
  eval_id: 'eval_id',
})) {
  console.log(outputItemListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "datasource_item": {
        "foo": "bar"
      },
      "datasource_item_id": 0,
      "eval_id": "eval_id",
      "object": "eval.run.output_item",
      "results": [
        {
          "name": "name",
          "passed": true,
          "score": 0,
          "sample": {
            "foo": "bar"
          },
          "type": "type"
        }
      ],
      "run_id": "run_id",
      "sample": {
        "error": {
          "code": "code",
          "message": "message"
        },
        "finish_reason": "finish_reason",
        "input": [
          {
            "content": "content",
            "role": "role"
          }
        ],
        "max_completion_tokens": 0,
        "model": "model",
        "output": [
          {
            "content": "content",
            "role": "role"
          }
        ],
        "seed": 0,
        "temperature": 0,
        "top_p": 0,
        "usage": {
          "cached_tokens": 0,
          "completion_tokens": 0,
          "prompt_tokens": 0,
          "total_tokens": 0
        }
      },
      "status": "status"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const outputItems = await openai.evals.runs.outputItems.list(
  "egroup_67abd54d9b0081909a86353f6fb9317a",
  "erun_67abd54d60ec8190832b46859da808f7"
);
console.log(outputItems);
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "eval.run.output_item",
      "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
      "created_at": 1743092076,
      "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
      "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
      "status": "pass",
      "datasource_item_id": 5,
      "datasource_item": {
        "input": "Stock Markets Rally After Positive Economic Data Released",
        "ground_truth": "Markets"
      },
      "results": [
        {
          "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
          "sample": null,
          "passed": true,
          "score": 1.0
        }
      ],
      "sample": {
        "input": [
          {
            "role": "developer",
            "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          },
          {
            "role": "user",
            "content": "Stock Markets Rally After Positive Economic Data Released",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          }
        ],
        "output": [
          {
            "role": "assistant",
            "content": "Markets",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          }
        ],
        "finish_reason": "stop",
        "model": "gpt-4o-mini-2024-07-18",
        "usage": {
          "total_tokens": 325,
          "completion_tokens": 2,
          "prompt_tokens": 323,
          "cached_tokens": 0
        },
        "error": null,
        "temperature": 1.0,
        "max_completion_tokens": 2048,
        "top_p": 1.0,
        "seed": 42
      }
    }
  ],
  "first_id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "last_id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "has_more": true
}
```

## Get an output item of an eval run

`client.evals.runs.outputItems.retrieve(stringoutputItemID, OutputItemRetrieveParamsparams, RequestOptionsoptions?): OutputItemRetrieveResponse`

**get** `/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}`

Get an evaluation run output item by ID.

### Parameters

- `outputItemID: string`

- `params: OutputItemRetrieveParams`

  - `eval_id: string`

    The ID of the evaluation to retrieve runs for.

  - `run_id: string`

    The ID of the run to retrieve.

### Returns

- `OutputItemRetrieveResponse`

  A schema representing an evaluation run output item.

  - `id: string`

    Unique identifier for the evaluation run output item.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: Record<string, unknown>`

    Details of the input data source item.

  - `datasource_item_id: number`

    The identifier for the data source item.

  - `eval_id: string`

    The identifier of the evaluation group.

  - `object: "eval.run.output_item"`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: Array<Result>`

    A list of grader results for this output item.

    - `name: string`

      The name of the grader.

    - `passed: boolean`

      Whether the grader considered the output a pass.

    - `score: number`

      The numeric score produced by the grader.

    - `sample?: Record<string, unknown> | null`

      Optional sample or intermediate data produced by the grader.

    - `type?: string`

      The grader type (for example, "string-check-grader").

  - `run_id: string`

    The identifier of the evaluation run associated with this output item.

  - `sample: Sample`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: string`

        The error code.

      - `message: string`

        The error message.

    - `finish_reason: string`

      The reason why the sample generation was finished.

    - `input: Array<Input>`

      An array of input messages.

      - `content: string`

        The content of the message.

      - `role: string`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: number`

      The maximum number of tokens allowed for completion.

    - `model: string`

      The model used for generating the sample.

    - `output: Array<Output>`

      An array of output messages.

      - `content?: string`

        The content of the message.

      - `role?: string`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: number`

      The seed used for generating the sample.

    - `temperature: number`

      The sampling temperature used.

    - `top_p: number`

      The top_p value used for sampling.

    - `usage: Usage`

      Token usage details for the sample.

      - `cached_tokens: number`

        The number of tokens retrieved from cache.

      - `completion_tokens: number`

        The number of completion tokens generated.

      - `prompt_tokens: number`

        The number of prompt tokens used.

      - `total_tokens: number`

        The total number of tokens used.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const outputItem = await client.evals.runs.outputItems.retrieve('output_item_id', {
  eval_id: 'eval_id',
  run_id: 'run_id',
});

console.log(outputItem.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "datasource_item": {
    "foo": "bar"
  },
  "datasource_item_id": 0,
  "eval_id": "eval_id",
  "object": "eval.run.output_item",
  "results": [
    {
      "name": "name",
      "passed": true,
      "score": 0,
      "sample": {
        "foo": "bar"
      },
      "type": "type"
    }
  ],
  "run_id": "run_id",
  "sample": {
    "error": {
      "code": "code",
      "message": "message"
    },
    "finish_reason": "finish_reason",
    "input": [
      {
        "content": "content",
        "role": "role"
      }
    ],
    "max_completion_tokens": 0,
    "model": "model",
    "output": [
      {
        "content": "content",
        "role": "role"
      }
    ],
    "seed": 0,
    "temperature": 0,
    "top_p": 0,
    "usage": {
      "cached_tokens": 0,
      "completion_tokens": 0,
      "prompt_tokens": 0,
      "total_tokens": 0
    }
  },
  "status": "status"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const outputItem = await openai.evals.runs.outputItems.retrieve(
  "outputitem_67abd55eb6548190bb580745d5644a33",
  {
    eval_id: "eval_67abd54d9b0081909a86353f6fb9317a",
    run_id: "evalrun_67abd54d60ec8190832b46859da808f7",
  }
);
console.log(outputItem);
```

#### Response

```json
{
  "object": "eval.run.output_item",
  "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "created_at": 1743092076,
  "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "status": "pass",
  "datasource_item_id": 5,
  "datasource_item": {
    "input": "Stock Markets Rally After Positive Economic Data Released",
    "ground_truth": "Markets"
  },
  "results": [
    {
      "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
      "sample": null,
      "passed": true,
      "score": 1.0
    }
  ],
  "sample": {
    "input": [
      {
        "role": "developer",
        "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      },
      {
        "role": "user",
        "content": "Stock Markets Rally After Positive Economic Data Released",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "output": [
      {
        "role": "assistant",
        "content": "Markets",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "finish_reason": "stop",
    "model": "gpt-4o-mini-2024-07-18",
    "usage": {
      "total_tokens": 325,
      "completion_tokens": 2,
      "prompt_tokens": 323,
      "cached_tokens": 0
    },
    "error": null,
    "temperature": 1.0,
    "max_completion_tokens": 2048,
    "top_p": 1.0,
    "seed": 42
  }
}
```
