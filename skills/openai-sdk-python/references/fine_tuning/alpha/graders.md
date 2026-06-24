# Graders

## Run grader

`fine_tuning.alpha.graders.run(GraderRunParams**kwargs)  -> GraderRunResponse`

**post** `/fine_tuning/alpha/graders/run`

Run a grader.

### Parameters

- `grader: Grader`

  The grader used for the fine-tuning job.

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

  - `class TextSimilarityGrader: …`

    A TextSimilarityGrader object which grades text based on similarity metrics.

    - `evaluation_metric: Literal["cosine", "fuzzy_match", "bleu", 8 more]`

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

    - `input: str`

      The text being graded.

    - `name: str`

      The name of the grader.

    - `reference: str`

      The text being graded against.

    - `type: Literal["text_similarity"]`

      The type of grader.

      - `"text_similarity"`

  - `class PythonGrader: …`

    A PythonGrader object that runs a python script on the input.

    - `name: str`

      The name of the grader.

    - `source: str`

      The source code of the python script.

    - `type: Literal["python"]`

      The object type, which is always `python`.

      - `"python"`

    - `image_tag: Optional[str]`

      The image tag to use for the python script.

  - `class ScoreModelGrader: …`

    A ScoreModelGrader object that uses a model to assign a score to the input.

    - `input: List[Input]`

      The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings.

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

    - `model: str`

      The model to use for the evaluation.

    - `name: str`

      The name of the grader.

    - `type: Literal["score_model"]`

      The object type, which is always `score_model`.

      - `"score_model"`

    - `range: Optional[List[float]]`

      The range of the score. Defaults to `[0, 1]`.

    - `sampling_params: Optional[SamplingParams]`

      The sampling parameters for the model.

      - `max_completions_tokens: Optional[int]`

        The maximum number of tokens the grader model may generate in its response.

      - `reasoning_effort: Optional[ReasoningEffort]`

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

      - `seed: Optional[int]`

        A seed value to initialize the randomness, during sampling.

      - `temperature: Optional[float]`

        A higher temperature increases randomness in the outputs.

      - `top_p: Optional[float]`

        An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `class MultiGrader: …`

    A MultiGrader object combines the output of multiple graders to produce a single score.

    - `calculate_output: str`

      A formula to calculate the output based on grader results.

    - `graders: Graders`

      A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

      - `class StringCheckGrader: …`

        A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

      - `class TextSimilarityGrader: …`

        A TextSimilarityGrader object which grades text based on similarity metrics.

      - `class PythonGrader: …`

        A PythonGrader object that runs a python script on the input.

      - `class ScoreModelGrader: …`

        A ScoreModelGrader object that uses a model to assign a score to the input.

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

            - `List[GraderInputItem]`

              - `str`

                A text input to the model.

              - `class ResponseInputText: …`

                A text input to the model.

              - `class GraderInputItemOutputText: …`

                A text output from the model.

              - `class GraderInputItemInputImage: …`

                An image input block used within EvalItem content arrays.

              - `class ResponseInputAudio: …`

                An audio input to the model.

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

    - `name: str`

      The name of the grader.

    - `type: Literal["multi"]`

      The object type, which is always `multi`.

      - `"multi"`

- `model_sample: str`

  The model sample to be evaluated. This value will be used to populate
  the `sample` namespace. See [the guide](https://platform.openai.com/docs/guides/graders) for more details.
  The `output_json` variable will be populated if the model sample is a
  valid JSON string.

- `item: Optional[object]`

  The dataset item provided to the grader. This will be used to populate
  the `item` namespace. See [the guide](https://platform.openai.com/docs/guides/graders) for more details.

### Returns

- `class GraderRunResponse: …`

  - `metadata: Metadata`

    - `errors: MetadataErrors`

      - `formula_parse_error: bool`

      - `invalid_variable_error: bool`

      - `model_grader_parse_error: bool`

      - `model_grader_refusal_error: bool`

      - `model_grader_server_error: bool`

      - `model_grader_server_error_details: Optional[str]`

      - `other_error: bool`

      - `python_grader_runtime_error: bool`

      - `python_grader_runtime_error_details: Optional[str]`

      - `python_grader_server_error: bool`

      - `python_grader_server_error_type: Optional[str]`

      - `sample_parse_error: bool`

      - `truncated_observation_error: bool`

      - `unresponsive_reward_error: bool`

    - `execution_time: float`

    - `name: str`

    - `sampled_model_name: Optional[str]`

    - `scores: Dict[str, object]`

    - `token_usage: Optional[int]`

    - `type: str`

  - `model_grader_token_usage_per_model: Dict[str, object]`

  - `reward: float`

  - `sub_rewards: Dict[str, object]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
response = client.fine_tuning.alpha.graders.run(
    grader={
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check",
    },
    model_sample="model_sample",
)
print(response.metadata)
```

#### Response

```json
{
  "metadata": {
    "errors": {
      "formula_parse_error": true,
      "invalid_variable_error": true,
      "model_grader_parse_error": true,
      "model_grader_refusal_error": true,
      "model_grader_server_error": true,
      "model_grader_server_error_details": "model_grader_server_error_details",
      "other_error": true,
      "python_grader_runtime_error": true,
      "python_grader_runtime_error_details": "python_grader_runtime_error_details",
      "python_grader_server_error": true,
      "python_grader_server_error_type": "python_grader_server_error_type",
      "sample_parse_error": true,
      "truncated_observation_error": true,
      "unresponsive_reward_error": true
    },
    "execution_time": 0,
    "name": "name",
    "sampled_model_name": "sampled_model_name",
    "scores": {
      "foo": "bar"
    },
    "token_usage": 0,
    "type": "type"
  },
  "model_grader_token_usage_per_model": {
    "foo": "bar"
  },
  "reward": 0,
  "sub_rewards": {
    "foo": "bar"
  }
}
```

### Score text alignment

```python
from openai import OpenAI

client = OpenAI()
result = client.fine_tuning.alpha.graders.run(
  grader={
    "type": "score_model",
    "name": "Example score model grader",
    "input": [
      {
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "Score how close the reference answer is to the model answer on a 0-1 scale. Return only the score.\n\nReference answer: {{item.reference_answer}}\n\nModel answer: {{sample.output_text}}",
          }
        ],
      }
    ],
    "model": "gpt-5-mini",
    "sampling_params": {"temperature": 1, "top_p": 1, "seed": 42},
  },
  item={"reference_answer": "fuzzy wuzzy was a bear"},
  model_sample="fuzzy wuzzy was a bear",
)
print(result)
```

#### Response

```json
{
  "reward": 1.0,
  "metadata": {
    "name": "Example score model grader",
    "type": "score_model",
    "errors": {
      "formula_parse_error": false,
      "sample_parse_error": false,
      "truncated_observation_error": false,
      "unresponsive_reward_error": false,
      "invalid_variable_error": false,
      "other_error": false,
      "python_grader_server_error": false,
      "python_grader_server_error_type": null,
      "python_grader_runtime_error": false,
      "python_grader_runtime_error_details": null,
      "model_grader_server_error": false,
      "model_grader_refusal_error": false,
      "model_grader_parse_error": false,
      "model_grader_server_error_details": null
    },
    "execution_time": 4.365238428115845,
    "scores": {},
    "token_usage": {
      "prompt_tokens": 190,
      "total_tokens": 324,
      "completion_tokens": 134,
      "cached_tokens": 0
    },
    "sampled_model_name": "gpt-4o-2024-08-06"
  },
  "sub_rewards": {},
  "model_grader_token_usage_per_model": {
    "gpt-4o-2024-08-06": {
      "prompt_tokens": 190,
      "total_tokens": 324,
      "completion_tokens": 134,
      "cached_tokens": 0
    }
  }
}
```

## Validate grader

`fine_tuning.alpha.graders.validate(GraderValidateParams**kwargs)  -> GraderValidateResponse`

**post** `/fine_tuning/alpha/graders/validate`

Validate a grader.

### Parameters

- `grader: Grader`

  The grader used for the fine-tuning job.

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

  - `class TextSimilarityGrader: …`

    A TextSimilarityGrader object which grades text based on similarity metrics.

    - `evaluation_metric: Literal["cosine", "fuzzy_match", "bleu", 8 more]`

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

    - `input: str`

      The text being graded.

    - `name: str`

      The name of the grader.

    - `reference: str`

      The text being graded against.

    - `type: Literal["text_similarity"]`

      The type of grader.

      - `"text_similarity"`

  - `class PythonGrader: …`

    A PythonGrader object that runs a python script on the input.

    - `name: str`

      The name of the grader.

    - `source: str`

      The source code of the python script.

    - `type: Literal["python"]`

      The object type, which is always `python`.

      - `"python"`

    - `image_tag: Optional[str]`

      The image tag to use for the python script.

  - `class ScoreModelGrader: …`

    A ScoreModelGrader object that uses a model to assign a score to the input.

    - `input: List[Input]`

      The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings.

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

    - `model: str`

      The model to use for the evaluation.

    - `name: str`

      The name of the grader.

    - `type: Literal["score_model"]`

      The object type, which is always `score_model`.

      - `"score_model"`

    - `range: Optional[List[float]]`

      The range of the score. Defaults to `[0, 1]`.

    - `sampling_params: Optional[SamplingParams]`

      The sampling parameters for the model.

      - `max_completions_tokens: Optional[int]`

        The maximum number of tokens the grader model may generate in its response.

      - `reasoning_effort: Optional[ReasoningEffort]`

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

      - `seed: Optional[int]`

        A seed value to initialize the randomness, during sampling.

      - `temperature: Optional[float]`

        A higher temperature increases randomness in the outputs.

      - `top_p: Optional[float]`

        An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `class MultiGrader: …`

    A MultiGrader object combines the output of multiple graders to produce a single score.

    - `calculate_output: str`

      A formula to calculate the output based on grader results.

    - `graders: Graders`

      A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

      - `class StringCheckGrader: …`

        A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

      - `class TextSimilarityGrader: …`

        A TextSimilarityGrader object which grades text based on similarity metrics.

      - `class PythonGrader: …`

        A PythonGrader object that runs a python script on the input.

      - `class ScoreModelGrader: …`

        A ScoreModelGrader object that uses a model to assign a score to the input.

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

            - `List[GraderInputItem]`

              - `str`

                A text input to the model.

              - `class ResponseInputText: …`

                A text input to the model.

              - `class GraderInputItemOutputText: …`

                A text output from the model.

              - `class GraderInputItemInputImage: …`

                An image input block used within EvalItem content arrays.

              - `class ResponseInputAudio: …`

                An audio input to the model.

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

    - `name: str`

      The name of the grader.

    - `type: Literal["multi"]`

      The object type, which is always `multi`.

      - `"multi"`

### Returns

- `class GraderValidateResponse: …`

  - `grader: Optional[Grader]`

    The grader used for the fine-tuning job.

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

    - `class TextSimilarityGrader: …`

      A TextSimilarityGrader object which grades text based on similarity metrics.

      - `evaluation_metric: Literal["cosine", "fuzzy_match", "bleu", 8 more]`

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

      - `input: str`

        The text being graded.

      - `name: str`

        The name of the grader.

      - `reference: str`

        The text being graded against.

      - `type: Literal["text_similarity"]`

        The type of grader.

        - `"text_similarity"`

    - `class PythonGrader: …`

      A PythonGrader object that runs a python script on the input.

      - `name: str`

        The name of the grader.

      - `source: str`

        The source code of the python script.

      - `type: Literal["python"]`

        The object type, which is always `python`.

        - `"python"`

      - `image_tag: Optional[str]`

        The image tag to use for the python script.

    - `class ScoreModelGrader: …`

      A ScoreModelGrader object that uses a model to assign a score to the input.

      - `input: List[Input]`

        The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings.

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

      - `model: str`

        The model to use for the evaluation.

      - `name: str`

        The name of the grader.

      - `type: Literal["score_model"]`

        The object type, which is always `score_model`.

        - `"score_model"`

      - `range: Optional[List[float]]`

        The range of the score. Defaults to `[0, 1]`.

      - `sampling_params: Optional[SamplingParams]`

        The sampling parameters for the model.

        - `max_completions_tokens: Optional[int]`

          The maximum number of tokens the grader model may generate in its response.

        - `reasoning_effort: Optional[ReasoningEffort]`

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

        - `seed: Optional[int]`

          A seed value to initialize the randomness, during sampling.

        - `temperature: Optional[float]`

          A higher temperature increases randomness in the outputs.

        - `top_p: Optional[float]`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `class MultiGrader: …`

      A MultiGrader object combines the output of multiple graders to produce a single score.

      - `calculate_output: str`

        A formula to calculate the output based on grader results.

      - `graders: Graders`

        A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

        - `class StringCheckGrader: …`

          A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

        - `class TextSimilarityGrader: …`

          A TextSimilarityGrader object which grades text based on similarity metrics.

        - `class PythonGrader: …`

          A PythonGrader object that runs a python script on the input.

        - `class ScoreModelGrader: …`

          A ScoreModelGrader object that uses a model to assign a score to the input.

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

              - `List[GraderInputItem]`

                - `str`

                  A text input to the model.

                - `class ResponseInputText: …`

                  A text input to the model.

                - `class GraderInputItemOutputText: …`

                  A text output from the model.

                - `class GraderInputItemInputImage: …`

                  An image input block used within EvalItem content arrays.

                - `class ResponseInputAudio: …`

                  An audio input to the model.

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

      - `name: str`

        The name of the grader.

      - `type: Literal["multi"]`

        The object type, which is always `multi`.

        - `"multi"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
response = client.fine_tuning.alpha.graders.validate(
    grader={
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check",
    },
)
print(response.grader)
```

#### Response

```json
{
  "grader": {
    "input": "input",
    "name": "name",
    "operation": "eq",
    "reference": "reference",
    "type": "string_check"
  }
}
```

## Domain Types

### Grader Run Response

- `class GraderRunResponse: …`

  - `metadata: Metadata`

    - `errors: MetadataErrors`

      - `formula_parse_error: bool`

      - `invalid_variable_error: bool`

      - `model_grader_parse_error: bool`

      - `model_grader_refusal_error: bool`

      - `model_grader_server_error: bool`

      - `model_grader_server_error_details: Optional[str]`

      - `other_error: bool`

      - `python_grader_runtime_error: bool`

      - `python_grader_runtime_error_details: Optional[str]`

      - `python_grader_server_error: bool`

      - `python_grader_server_error_type: Optional[str]`

      - `sample_parse_error: bool`

      - `truncated_observation_error: bool`

      - `unresponsive_reward_error: bool`

    - `execution_time: float`

    - `name: str`

    - `sampled_model_name: Optional[str]`

    - `scores: Dict[str, object]`

    - `token_usage: Optional[int]`

    - `type: str`

  - `model_grader_token_usage_per_model: Dict[str, object]`

  - `reward: float`

  - `sub_rewards: Dict[str, object]`

### Grader Validate Response

- `class GraderValidateResponse: …`

  - `grader: Optional[Grader]`

    The grader used for the fine-tuning job.

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

    - `class TextSimilarityGrader: …`

      A TextSimilarityGrader object which grades text based on similarity metrics.

      - `evaluation_metric: Literal["cosine", "fuzzy_match", "bleu", 8 more]`

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

      - `input: str`

        The text being graded.

      - `name: str`

        The name of the grader.

      - `reference: str`

        The text being graded against.

      - `type: Literal["text_similarity"]`

        The type of grader.

        - `"text_similarity"`

    - `class PythonGrader: …`

      A PythonGrader object that runs a python script on the input.

      - `name: str`

        The name of the grader.

      - `source: str`

        The source code of the python script.

      - `type: Literal["python"]`

        The object type, which is always `python`.

        - `"python"`

      - `image_tag: Optional[str]`

        The image tag to use for the python script.

    - `class ScoreModelGrader: …`

      A ScoreModelGrader object that uses a model to assign a score to the input.

      - `input: List[Input]`

        The input messages evaluated by the grader. Supports text, output text, input image, and input audio content blocks, and may include template strings.

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

      - `model: str`

        The model to use for the evaluation.

      - `name: str`

        The name of the grader.

      - `type: Literal["score_model"]`

        The object type, which is always `score_model`.

        - `"score_model"`

      - `range: Optional[List[float]]`

        The range of the score. Defaults to `[0, 1]`.

      - `sampling_params: Optional[SamplingParams]`

        The sampling parameters for the model.

        - `max_completions_tokens: Optional[int]`

          The maximum number of tokens the grader model may generate in its response.

        - `reasoning_effort: Optional[ReasoningEffort]`

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

        - `seed: Optional[int]`

          A seed value to initialize the randomness, during sampling.

        - `temperature: Optional[float]`

          A higher temperature increases randomness in the outputs.

        - `top_p: Optional[float]`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `class MultiGrader: …`

      A MultiGrader object combines the output of multiple graders to produce a single score.

      - `calculate_output: str`

        A formula to calculate the output based on grader results.

      - `graders: Graders`

        A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

        - `class StringCheckGrader: …`

          A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

        - `class TextSimilarityGrader: …`

          A TextSimilarityGrader object which grades text based on similarity metrics.

        - `class PythonGrader: …`

          A PythonGrader object that runs a python script on the input.

        - `class ScoreModelGrader: …`

          A ScoreModelGrader object that uses a model to assign a score to the input.

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

              - `List[GraderInputItem]`

                - `str`

                  A text input to the model.

                - `class ResponseInputText: …`

                  A text input to the model.

                - `class GraderInputItemOutputText: …`

                  A text output from the model.

                - `class GraderInputItemInputImage: …`

                  An image input block used within EvalItem content arrays.

                - `class ResponseInputAudio: …`

                  An audio input to the model.

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

      - `name: str`

        The name of the grader.

      - `type: Literal["multi"]`

        The object type, which is always `multi`.

        - `"multi"`
