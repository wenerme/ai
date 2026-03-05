## Update

`evals.update(streval_id, EvalUpdateParams**kwargs)  -> EvalUpdateResponse`

**post** `/evals/{eval_id}`

Update certain properties of an evaluation.

### Parameters

- `eval_id: str`

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: Optional[str]`

  Rename the evaluation.

### Returns

- `class EvalUpdateResponse: …`

  An Eval object with a data source config and testing criteria.
  An Eval represents a task to be done for your LLM integration.
  Like:

  - Improve the quality of my chatbot
  - See how well my chatbot handles customer support
  - Check if o4-mini is better at my usecase than gpt-4o

  - `id: str`

    Unique identifier for the evaluation.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the eval was created.

  - `data_source_config: DataSourceConfig`

    Configuration of data sources used in runs of the evaluation.

    - `class EvalCustomDataSourceConfig: …`

      A CustomDataSourceConfig which specifies the schema of your `item` and optionally `sample` namespaces.
      The response schema defines the shape of the data that will be:

      - Used to define your testing criteria and
      - What data is required when creating a run

      - `schema: Dict[str, object]`

        The json schema for the run data source items.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `type: Literal["custom"]`

        The type of data source. Always `custom`.

        - `"custom"`

    - `class DataSourceConfigLogs: …`

      A LogsDataSourceConfig which specifies the metadata property of your logs query.
      This is usually metadata like `usecase=chatbot` or `prompt-version=v2`, etc.
      The schema returned by this data source config is used to defined what variables are available in your evals.
      `item` and `sample` are both defined when using this data source config.

      - `schema: Dict[str, object]`

        The json schema for the run data source items.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `type: Literal["logs"]`

        The type of data source. Always `logs`.

        - `"logs"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

    - `class EvalStoredCompletionsDataSourceConfig: …`

      Deprecated in favor of LogsDataSourceConfig.

      - `schema: Dict[str, object]`

        The json schema for the run data source items.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `type: Literal["stored_completions"]`

        The type of data source. Always `stored_completions`.

        - `"stored_completions"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the evaluation.

  - `object: Literal["eval"]`

    The object type.

    - `"eval"`

  - `testing_criteria: List[TestingCriterion]`

    A list of testing criteria.

    - `class LabelModelGrader: …`

      A LabelModelGrader object which uses a model to assign labels to each item
      in the evaluation.

      - `input: List[Input]`

        - `content: InputContent`

          Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

          - `str`

            A text input to the model.

          - `class ResponseInputText: …`

            A text input to the model.

            - `text: str`

              The text input to the model.

            - `type: Literal["input_text"]`

              The type of the input item. Always `input_text`.

              - `"input_text"`

          - `class InputContentOutputText: …`

            A text output from the model.

            - `text: str`

              The text output from the model.

            - `type: Literal["output_text"]`

              The type of the output text. Always `output_text`.

              - `"output_text"`

          - `class InputContentInputImage: …`

            An image input block used within EvalItem content arrays.

            - `image_url: str`

              The URL of the image input.

            - `type: Literal["input_image"]`

              The type of the image input. Always `input_image`.

              - `"input_image"`

            - `detail: Optional[str]`

              The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

          - `class ResponseInputAudio: …`

            An audio input to the model.

            - `input_audio: InputAudio`

              - `data: str`

                Base64-encoded audio data.

              - `format: Literal["mp3", "wav"]`

                The format of the audio data. Currently supported formats are `mp3` and
                `wav`.

                - `"mp3"`

                - `"wav"`

            - `type: Literal["input_audio"]`

              The type of the input item. Always `input_audio`.

              - `"input_audio"`

          - `List[GraderInputItem]`

            - `str`

              A text input to the model.

            - `class ResponseInputText: …`

              A text input to the model.

              - `text: str`

                The text input to the model.

              - `type: Literal["input_text"]`

                The type of the input item. Always `input_text`.

                - `"input_text"`

            - `class GraderInputItemOutputText: …`

              A text output from the model.

              - `text: str`

                The text output from the model.

              - `type: Literal["output_text"]`

                The type of the output text. Always `output_text`.

                - `"output_text"`

            - `class GraderInputItemInputImage: …`

              An image input block used within EvalItem content arrays.

              - `image_url: str`

                The URL of the image input.

              - `type: Literal["input_image"]`

                The type of the image input. Always `input_image`.

                - `"input_image"`

              - `detail: Optional[str]`

                The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

            - `class ResponseInputAudio: …`

              An audio input to the model.

              - `input_audio: InputAudio`

                - `data: str`

                  Base64-encoded audio data.

                - `format: Literal["mp3", "wav"]`

                  The format of the audio data. Currently supported formats are `mp3` and
                  `wav`.

                  - `"mp3"`

                  - `"wav"`

              - `type: Literal["input_audio"]`

                The type of the input item. Always `input_audio`.

                - `"input_audio"`

        - `role: Literal["user", "assistant", "system", "developer"]`

          The role of the message input. One of `user`, `assistant`, `system`, or
          `developer`.

          - `"user"`

          - `"assistant"`

          - `"system"`

          - `"developer"`

        - `type: Optional[Literal["message"]]`

          The type of the message input. Always `message`.

          - `"message"`

      - `labels: List[str]`

        The labels to assign to each item in the evaluation.

      - `model: str`

        The model to use for the evaluation. Must support structured outputs.

      - `name: str`

        The name of the grader.

      - `passing_labels: List[str]`

        The labels that indicate a passing result. Must be a subset of labels.

      - `type: Literal["label_model"]`

        The object type, which is always `label_model`.

        - `"label_model"`

    - `class StringCheckGrader: …`

      A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

      - `input: str`

        The input text. This may include template strings.

      - `name: str`

        The name of the grader.

      - `operation: Literal["eq", "ne", "like", "ilike"]`

        The string check operation to perform. One of `eq`, `ne`, `like`, or `ilike`.

        - `"eq"`

        - `"ne"`

        - `"like"`

        - `"ilike"`

      - `reference: str`

        The reference text. This may include template strings.

      - `type: Literal["string_check"]`

        The object type, which is always `string_check`.

        - `"string_check"`

    - `class TestingCriterionEvalGraderTextSimilarity: …`

      A TextSimilarityGrader object which grades text based on similarity metrics.

      - `pass_threshold: float`

        The threshold for the score.

    - `class TestingCriterionEvalGraderPython: …`

      A PythonGrader object that runs a python script on the input.

      - `pass_threshold: Optional[float]`

        The threshold for the score.

    - `class TestingCriterionEvalGraderScoreModel: …`

      A ScoreModelGrader object that uses a model to assign a score to the input.

      - `pass_threshold: Optional[float]`

        The threshold for the score.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
eval = client.evals.update(
    eval_id="eval_id",
)
print(eval.id)
```
