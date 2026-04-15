# Fine Tuning

# Methods

## Domain Types

### Dpo Hyperparameters

- `class DpoHyperparameters: …`

  The hyperparameters used for the DPO fine-tuning job.

  - `batch_size: Optional[Union[Literal["auto"], int, null]]`

    Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `beta: Optional[Union[Literal["auto"], float, null]]`

    The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

    - `Literal["auto"]`

      - `"auto"`

    - `float`

  - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

    Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

    - `Literal["auto"]`

      - `"auto"`

    - `float`

  - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

    The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

### Dpo Method

- `class DpoMethod: …`

  Configuration for the DPO fine-tuning method.

  - `hyperparameters: Optional[DpoHyperparameters]`

    The hyperparameters used for the DPO fine-tuning job.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `beta: Optional[Union[Literal["auto"], float, null]]`

      The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

### Reinforcement Hyperparameters

- `class ReinforcementHyperparameters: …`

  The hyperparameters used for the reinforcement fine-tuning job.

  - `batch_size: Optional[Union[Literal["auto"], int, null]]`

    Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

    Multiplier on amount of compute used for exploring search space during training.

    - `Literal["auto"]`

      - `"auto"`

    - `float`

  - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

    The number of training steps between evaluation runs.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

    Number of evaluation samples to generate per training step.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

    Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

    - `Literal["auto"]`

      - `"auto"`

    - `float`

  - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

    The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

    Level of reasoning effort.

    - `"default"`

    - `"low"`

    - `"medium"`

    - `"high"`

### Reinforcement Method

- `class ReinforcementMethod: …`

  Configuration for the reinforcement fine-tuning method.

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

  - `hyperparameters: Optional[ReinforcementHyperparameters]`

    The hyperparameters used for the reinforcement fine-tuning job.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Multiplier on amount of compute used for exploring search space during training.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

      The number of training steps between evaluation runs.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

      Number of evaluation samples to generate per training step.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

      Level of reasoning effort.

      - `"default"`

      - `"low"`

      - `"medium"`

      - `"high"`

### Supervised Hyperparameters

- `class SupervisedHyperparameters: …`

  The hyperparameters used for the fine-tuning job.

  - `batch_size: Optional[Union[Literal["auto"], int, null]]`

    Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

    Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

    - `Literal["auto"]`

      - `"auto"`

    - `float`

  - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

    The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

### Supervised Method

- `class SupervisedMethod: …`

  Configuration for the supervised fine-tuning method.

  - `hyperparameters: Optional[SupervisedHyperparameters]`

    The hyperparameters used for the fine-tuning job.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

# Jobs

## Create fine-tuning job

`fine_tuning.jobs.create(JobCreateParams**kwargs)  -> FineTuningJob`

**post** `/fine_tuning/jobs`

Creates a fine-tuning job which begins the process of creating a new model from a given dataset.

Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.

[Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)

### Parameters

- `model: Union[str, Literal["babbage-002", "davinci-002", "gpt-3.5-turbo", "gpt-4o-mini"]]`

  The name of the model to fine-tune. You can select one of the
  [supported models](https://platform.openai.com/docs/guides/fine-tuning#which-models-can-be-fine-tuned).

  - `str`

  - `Literal["babbage-002", "davinci-002", "gpt-3.5-turbo", "gpt-4o-mini"]`

    The name of the model to fine-tune. You can select one of the
    [supported models](https://platform.openai.com/docs/guides/fine-tuning#which-models-can-be-fine-tuned).

    - `"babbage-002"`

    - `"davinci-002"`

    - `"gpt-3.5-turbo"`

    - `"gpt-4o-mini"`

- `training_file: str`

  The ID of an uploaded file that contains training data.

  See [upload file](https://platform.openai.com/docs/api-reference/files/create) for how to upload a file.

  Your dataset must be formatted as a JSONL file. Additionally, you must upload your file with the purpose `fine-tune`.

  The contents of the file should differ depending on if the model uses the [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input), [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input) format, or if the fine-tuning method uses the [preference](https://platform.openai.com/docs/api-reference/fine-tuning/preference-input) format.

  See the [fine-tuning guide](https://platform.openai.com/docs/guides/model-optimization) for more details.

- `hyperparameters: Optional[Hyperparameters]`

  The hyperparameters used for the fine-tuning job.
  This value is now deprecated in favor of `method`, and should be passed in under the `method` parameter.

  - `batch_size: Optional[Union[Literal["auto"], int]]`

    Number of examples in each batch. A larger batch size means that model parameters
    are updated less frequently, but with lower variance.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

  - `learning_rate_multiplier: Optional[Union[Literal["auto"], float]]`

    Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
    overfitting.

    - `Literal["auto"]`

      - `"auto"`

    - `float`

  - `n_epochs: Optional[Union[Literal["auto"], int]]`

    The number of epochs to train the model for. An epoch refers to one full cycle
    through the training dataset.

    - `Literal["auto"]`

      - `"auto"`

    - `int`

- `integrations: Optional[Iterable[Integration]]`

  A list of integrations to enable for your fine-tuning job.

  - `type: Literal["wandb"]`

    The type of integration to enable. Currently, only "wandb" (Weights and Biases) is supported.

    - `"wandb"`

  - `wandb: IntegrationWandb`

    The settings for your integration with Weights and Biases. This payload specifies the project that
    metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
    to your run, and set a default entity (team, username, etc) to be associated with your run.

    - `project: str`

      The name of the project that the new run will be created under.

    - `entity: Optional[str]`

      The entity to use for the run. This allows you to set the team or username of the WandB user that you would
      like associated with the run. If not set, the default entity for the registered WandB API key is used.

    - `name: Optional[str]`

      A display name to set for the run. If not set, we will use the Job ID as the name.

    - `tags: Optional[Sequence[str]]`

      A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
      default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `method: Optional[Method]`

  The method used for fine-tuning.

  - `type: Literal["supervised", "dpo", "reinforcement"]`

    The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

    - `"supervised"`

    - `"dpo"`

    - `"reinforcement"`

  - `dpo: Optional[DpoMethodParam]`

    Configuration for the DPO fine-tuning method.

    - `hyperparameters: Optional[DpoHyperparameters]`

      The hyperparameters used for the DPO fine-tuning job.

      - `batch_size: Optional[Union[Literal["auto"], int, null]]`

        Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

      - `beta: Optional[Union[Literal["auto"], float, null]]`

        The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

        - `Literal["auto"]`

          - `"auto"`

        - `float`

      - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

        Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

        - `Literal["auto"]`

          - `"auto"`

        - `float`

      - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

        The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

  - `reinforcement: Optional[ReinforcementMethodParam]`

    Configuration for the reinforcement fine-tuning method.

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

    - `hyperparameters: Optional[ReinforcementHyperparameters]`

      The hyperparameters used for the reinforcement fine-tuning job.

      - `batch_size: Optional[Union[Literal["auto"], int, null]]`

        Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

      - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

        Multiplier on amount of compute used for exploring search space during training.

        - `Literal["auto"]`

          - `"auto"`

        - `float`

      - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

        The number of training steps between evaluation runs.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

      - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

        Number of evaluation samples to generate per training step.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

      - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

        Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

        - `Literal["auto"]`

          - `"auto"`

        - `float`

      - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

        The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

      - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

        Level of reasoning effort.

        - `"default"`

        - `"low"`

        - `"medium"`

        - `"high"`

  - `supervised: Optional[SupervisedMethodParam]`

    Configuration for the supervised fine-tuning method.

    - `hyperparameters: Optional[SupervisedHyperparameters]`

      The hyperparameters used for the fine-tuning job.

      - `batch_size: Optional[Union[Literal["auto"], int, null]]`

        Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

      - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

        Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

        - `Literal["auto"]`

          - `"auto"`

        - `float`

      - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

        The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

        - `Literal["auto"]`

          - `"auto"`

        - `int`

- `seed: Optional[int]`

  The seed controls the reproducibility of the job. Passing in the same seed and job parameters should produce the same results, but may differ in rare cases.
  If a seed is not specified, one will be generated for you.

- `suffix: Optional[str]`

  A string of up to 64 characters that will be added to your fine-tuned model name.

  For example, a `suffix` of "custom-model-name" would produce a model name like `ft:gpt-4o-mini:openai:custom-model-name:7p4lURel`.

- `validation_file: Optional[str]`

  The ID of an uploaded file that contains validation data.

  If you provide this file, the data is used to generate validation
  metrics periodically during fine-tuning. These metrics can be viewed in
  the fine-tuning results file.
  The same data should not be present in both train and validation files.

  Your dataset must be formatted as a JSONL file. You must upload your file with the purpose `fine-tune`.

  See the [fine-tuning guide](https://platform.openai.com/docs/guides/model-optimization) for more details.

### Returns

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
fine_tuning_job = client.fine_tuning.jobs.create(
    model="gpt-4o-mini",
    training_file="file-abc123",
)
print(fine_tuning_job.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message",
    "param": "param"
  },
  "fine_tuned_model": "fine_tuned_model",
  "finished_at": 0,
  "hyperparameters": {
    "batch_size": "auto",
    "learning_rate_multiplier": "auto",
    "n_epochs": "auto"
  },
  "model": "model",
  "object": "fine_tuning.job",
  "organization_id": "organization_id",
  "result_files": [
    "file-abc123"
  ],
  "seed": 0,
  "status": "validating_files",
  "trained_tokens": 0,
  "training_file": "training_file",
  "validation_file": "validation_file",
  "estimated_finish": 0,
  "integrations": [
    {
      "type": "wandb",
      "wandb": {
        "project": "my-wandb-project",
        "entity": "entity",
        "name": "name",
        "tags": [
          "custom-tag"
        ]
      }
    }
  ],
  "metadata": {
    "foo": "string"
  },
  "method": {
    "type": "supervised",
    "dpo": {
      "hyperparameters": {
        "batch_size": "auto",
        "beta": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    },
    "reinforcement": {
      "grader": {
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check"
      },
      "hyperparameters": {
        "batch_size": "auto",
        "compute_multiplier": "auto",
        "eval_interval": "auto",
        "eval_samples": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
        "reasoning_effort": "default"
      }
    },
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    }
  }
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="gpt-4o-mini"
)
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini-2024-07-18",
  "created_at": 1721764800,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "queued",
  "validation_file": null,
  "training_file": "file-abc123",
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
      }
    }
  },
  "metadata": null
}
```

### Epochs

```python
from openai import OpenAI
from openai.types.fine_tuning import SupervisedMethod, SupervisedHyperparameters

client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="gpt-4o-mini",
  method={
    "type": "supervised",
    "supervised": SupervisedMethod(
      hyperparameters=SupervisedHyperparameters(
        n_epochs=2
      )
    )
  }
)
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini",
  "created_at": 1721764800,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "queued",
  "validation_file": null,
  "training_file": "file-abc123",
  "hyperparameters": {
    "batch_size": "auto",
    "learning_rate_multiplier": "auto",
    "n_epochs": 2
  },
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": 2
      }
    }
  },
  "metadata": null,
  "error": {
    "code": null,
    "message": null,
    "param": null
  },
  "finished_at": null,
  "seed": 683058546,
  "trained_tokens": null,
  "estimated_finish": null,
  "integrations": [],
  "user_provided_suffix": null,
  "usage_metrics": null,
  "shared_with_openai": false
}
```

### DPO

```python
from openai import OpenAI
from openai.types.fine_tuning import DpoMethod, DpoHyperparameters

client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc",
  validation_file="file-123",
  model="gpt-4o-mini",
  method={
    "type": "dpo",
    "dpo": DpoMethod(
      hyperparameters=DpoHyperparameters(beta=0.1)
    )
  }
)
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc",
  "model": "gpt-4o-mini",
  "created_at": 1746130590,
  "fine_tuned_model": null,
  "organization_id": "org-abc",
  "result_files": [],
  "status": "queued",
  "validation_file": "file-123",
  "training_file": "file-abc",
  "method": {
    "type": "dpo",
    "dpo": {
      "hyperparameters": {
        "beta": 0.1,
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    }
  },
  "metadata": null,
  "error": {
    "code": null,
    "message": null,
    "param": null
  },
  "finished_at": null,
  "hyperparameters": null,
  "seed": 1036326793,
  "estimated_finish": null,
  "integrations": [],
  "user_provided_suffix": null,
  "usage_metrics": null,
  "shared_with_openai": false
}
```

### Reinforcement

```python
from openai import OpenAI
from openai.types.fine_tuning import ReinforcementMethod, ReinforcementHyperparameters
from openai.types.graders import StringCheckGrader

client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc",
  validation_file="file-123",
  model="o4-mini",
  method={
    "type": "reinforcement",
    "reinforcement": ReinforcementMethod(
      grader=StringCheckGrader(
        name="Example string check grader",
        type="string_check",
        input="{{item.label}}",
        operation="eq",
        reference="{{sample.output_text}}"
      ),
      hyperparameters=ReinforcementHyperparameters(
          reasoning_effort="medium",
      )
    )
  }, 
  seed=42,
)
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "o4-mini",
  "created_at": 1721764800,
  "finished_at": null,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "validating_files",
  "validation_file": "file-123",
  "training_file": "file-abc",
  "trained_tokens": null,
  "error": {},
  "user_provided_suffix": null,
  "seed": 950189191,
  "estimated_finish": null,
  "integrations": [],
  "method": {
    "type": "reinforcement",
    "reinforcement": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
        "eval_interval": "auto",
        "eval_samples": "auto",
        "compute_multiplier": "auto",
        "reasoning_effort": "medium"
      },
      "grader": {
        "type": "string_check",
        "name": "Example string check grader",
        "input": "{{sample.output_text}}",
        "reference": "{{item.label}}",
        "operation": "eq"
      },
      "response_format": null
    }
  },
  "metadata": null,
  "usage_metrics": null,
  "shared_with_openai": false
}
      
```

### Validation file

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123",
  validation_file="file-def456",
  model="gpt-4o-mini"
)
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini-2024-07-18",
  "created_at": 1721764800,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "queued",
  "validation_file": "file-abc123",
  "training_file": "file-abc123",
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
      }
    }
  },
  "metadata": null
}
```

## List fine-tuning jobs

`fine_tuning.jobs.list(JobListParams**kwargs)  -> SyncCursorPage[FineTuningJob]`

**get** `/fine_tuning/jobs`

List your organization's fine-tuning jobs

### Parameters

- `after: Optional[str]`

  Identifier for the last job from the previous pagination request.

- `limit: Optional[int]`

  Number of fine-tuning jobs to retrieve.

- `metadata: Optional[Dict[str, str]]`

  Optional metadata filter. To filter, use the syntax `metadata[k]=v`. Alternatively, set `metadata=null` to indicate no metadata.

### Returns

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.jobs.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "error": {
        "code": "code",
        "message": "message",
        "param": "param"
      },
      "fine_tuned_model": "fine_tuned_model",
      "finished_at": 0,
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      },
      "model": "model",
      "object": "fine_tuning.job",
      "organization_id": "organization_id",
      "result_files": [
        "file-abc123"
      ],
      "seed": 0,
      "status": "validating_files",
      "trained_tokens": 0,
      "training_file": "training_file",
      "validation_file": "validation_file",
      "estimated_finish": 0,
      "integrations": [
        {
          "type": "wandb",
          "wandb": {
            "project": "my-wandb-project",
            "entity": "entity",
            "name": "name",
            "tags": [
              "custom-tag"
            ]
          }
        }
      ],
      "metadata": {
        "foo": "string"
      },
      "method": {
        "type": "supervised",
        "dpo": {
          "hyperparameters": {
            "batch_size": "auto",
            "beta": "auto",
            "learning_rate_multiplier": "auto",
            "n_epochs": "auto"
          }
        },
        "reinforcement": {
          "grader": {
            "input": "input",
            "name": "name",
            "operation": "eq",
            "reference": "reference",
            "type": "string_check"
          },
          "hyperparameters": {
            "batch_size": "auto",
            "compute_multiplier": "auto",
            "eval_interval": "auto",
            "eval_samples": "auto",
            "learning_rate_multiplier": "auto",
            "n_epochs": "auto",
            "reasoning_effort": "default"
          }
        },
        "supervised": {
          "hyperparameters": {
            "batch_size": "auto",
            "learning_rate_multiplier": "auto",
            "n_epochs": "auto"
          }
        }
      }
    }
  ],
  "has_more": true,
  "object": "list"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.list()
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "fine_tuning.job",
      "id": "ftjob-abc123",
      "model": "gpt-4o-mini-2024-07-18",
      "created_at": 1721764800,
      "fine_tuned_model": null,
      "organization_id": "org-123",
      "result_files": [],
      "status": "queued",
      "validation_file": null,
      "training_file": "file-abc123",
      "metadata": {
        "key": "value"
      }
    },
    { ... },
    { ... }
  ], "has_more": true
}
```

## Retrieve fine-tuning job

`fine_tuning.jobs.retrieve(strfine_tuning_job_id)  -> FineTuningJob`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}`

Get info about a fine-tuning job.

[Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)

### Parameters

- `fine_tuning_job_id: str`

### Returns

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
fine_tuning_job = client.fine_tuning.jobs.retrieve(
    "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
print(fine_tuning_job.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message",
    "param": "param"
  },
  "fine_tuned_model": "fine_tuned_model",
  "finished_at": 0,
  "hyperparameters": {
    "batch_size": "auto",
    "learning_rate_multiplier": "auto",
    "n_epochs": "auto"
  },
  "model": "model",
  "object": "fine_tuning.job",
  "organization_id": "organization_id",
  "result_files": [
    "file-abc123"
  ],
  "seed": 0,
  "status": "validating_files",
  "trained_tokens": 0,
  "training_file": "training_file",
  "validation_file": "validation_file",
  "estimated_finish": 0,
  "integrations": [
    {
      "type": "wandb",
      "wandb": {
        "project": "my-wandb-project",
        "entity": "entity",
        "name": "name",
        "tags": [
          "custom-tag"
        ]
      }
    }
  ],
  "metadata": {
    "foo": "string"
  },
  "method": {
    "type": "supervised",
    "dpo": {
      "hyperparameters": {
        "batch_size": "auto",
        "beta": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    },
    "reinforcement": {
      "grader": {
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check"
      },
      "hyperparameters": {
        "batch_size": "auto",
        "compute_multiplier": "auto",
        "eval_interval": "auto",
        "eval_samples": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
        "reasoning_effort": "default"
      }
    },
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    }
  }
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.retrieve("ftjob-abc123")
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "davinci-002",
  "created_at": 1692661014,
  "finished_at": 1692661190,
  "fine_tuned_model": "ft:davinci-002:my-org:custom_suffix:7q8mpxmy",
  "organization_id": "org-123",
  "result_files": [
      "file-abc123"
  ],
  "status": "succeeded",
  "validation_file": null,
  "training_file": "file-abc123",
  "hyperparameters": {
      "n_epochs": 4,
      "batch_size": 1,
      "learning_rate_multiplier": 1.0
  },
  "trained_tokens": 5768,
  "integrations": [],
  "seed": 0,
  "estimated_finish": 0,
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "n_epochs": 4,
        "batch_size": 1,
        "learning_rate_multiplier": 1.0
      }
    }
  }
}
```

## List fine-tuning events

`fine_tuning.jobs.list_events(strfine_tuning_job_id, JobListEventsParams**kwargs)  -> SyncCursorPage[FineTuningJobEvent]`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/events`

Get status updates for a fine-tuning job.

### Parameters

- `fine_tuning_job_id: str`

- `after: Optional[str]`

  Identifier for the last event from the previous pagination request.

- `limit: Optional[int]`

  Number of events to retrieve.

### Returns

- `class FineTuningJobEvent: …`

  Fine-tuning job event object

  - `id: str`

    The object identifier.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: Literal["info", "warn", "error"]`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: str`

    The message of the event.

  - `object: Literal["fine_tuning.job.event"]`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data: Optional[object]`

    The data associated with the event.

  - `type: Optional[Literal["message", "metrics"]]`

    The type of event.

    - `"message"`

    - `"metrics"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.jobs.list_events(
    fine_tuning_job_id="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "level": "info",
      "message": "message",
      "object": "fine_tuning.job.event",
      "data": {},
      "type": "message"
    }
  ],
  "has_more": true,
  "object": "list"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.list_events(
  fine_tuning_job_id="ftjob-abc123",
  limit=2
)
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "fine_tuning.job.event",
      "id": "ft-event-ddTJfwuMVpfLXseO0Am0Gqjm",
      "created_at": 1721764800,
      "level": "info",
      "message": "Fine tuning job successfully completed",
      "data": null,
      "type": "message"
    },
    {
      "object": "fine_tuning.job.event",
      "id": "ft-event-tyiGuB72evQncpH87xe505Sv",
      "created_at": 1721764800,
      "level": "info",
      "message": "New fine-tuned model created: ft:gpt-4o-mini:openai::7p4lURel",
      "data": null,
      "type": "message"
    }
  ],
  "has_more": true
}
```

## Cancel fine-tuning

`fine_tuning.jobs.cancel(strfine_tuning_job_id)  -> FineTuningJob`

**post** `/fine_tuning/jobs/{fine_tuning_job_id}/cancel`

Immediately cancel a fine-tune job.

### Parameters

- `fine_tuning_job_id: str`

### Returns

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
fine_tuning_job = client.fine_tuning.jobs.cancel(
    "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
print(fine_tuning_job.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message",
    "param": "param"
  },
  "fine_tuned_model": "fine_tuned_model",
  "finished_at": 0,
  "hyperparameters": {
    "batch_size": "auto",
    "learning_rate_multiplier": "auto",
    "n_epochs": "auto"
  },
  "model": "model",
  "object": "fine_tuning.job",
  "organization_id": "organization_id",
  "result_files": [
    "file-abc123"
  ],
  "seed": 0,
  "status": "validating_files",
  "trained_tokens": 0,
  "training_file": "training_file",
  "validation_file": "validation_file",
  "estimated_finish": 0,
  "integrations": [
    {
      "type": "wandb",
      "wandb": {
        "project": "my-wandb-project",
        "entity": "entity",
        "name": "name",
        "tags": [
          "custom-tag"
        ]
      }
    }
  ],
  "metadata": {
    "foo": "string"
  },
  "method": {
    "type": "supervised",
    "dpo": {
      "hyperparameters": {
        "batch_size": "auto",
        "beta": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    },
    "reinforcement": {
      "grader": {
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check"
      },
      "hyperparameters": {
        "batch_size": "auto",
        "compute_multiplier": "auto",
        "eval_interval": "auto",
        "eval_samples": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
        "reasoning_effort": "default"
      }
    },
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    }
  }
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.cancel("ftjob-abc123")
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini-2024-07-18",
  "created_at": 1721764800,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "cancelled",
  "validation_file": "file-abc123",
  "training_file": "file-abc123"
}
```

## Pause fine-tuning

`fine_tuning.jobs.pause(strfine_tuning_job_id)  -> FineTuningJob`

**post** `/fine_tuning/jobs/{fine_tuning_job_id}/pause`

Pause a fine-tune job.

### Parameters

- `fine_tuning_job_id: str`

### Returns

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
fine_tuning_job = client.fine_tuning.jobs.pause(
    "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
print(fine_tuning_job.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message",
    "param": "param"
  },
  "fine_tuned_model": "fine_tuned_model",
  "finished_at": 0,
  "hyperparameters": {
    "batch_size": "auto",
    "learning_rate_multiplier": "auto",
    "n_epochs": "auto"
  },
  "model": "model",
  "object": "fine_tuning.job",
  "organization_id": "organization_id",
  "result_files": [
    "file-abc123"
  ],
  "seed": 0,
  "status": "validating_files",
  "trained_tokens": 0,
  "training_file": "training_file",
  "validation_file": "validation_file",
  "estimated_finish": 0,
  "integrations": [
    {
      "type": "wandb",
      "wandb": {
        "project": "my-wandb-project",
        "entity": "entity",
        "name": "name",
        "tags": [
          "custom-tag"
        ]
      }
    }
  ],
  "metadata": {
    "foo": "string"
  },
  "method": {
    "type": "supervised",
    "dpo": {
      "hyperparameters": {
        "batch_size": "auto",
        "beta": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    },
    "reinforcement": {
      "grader": {
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check"
      },
      "hyperparameters": {
        "batch_size": "auto",
        "compute_multiplier": "auto",
        "eval_interval": "auto",
        "eval_samples": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
        "reasoning_effort": "default"
      }
    },
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    }
  }
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.pause("ftjob-abc123")
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini-2024-07-18",
  "created_at": 1721764800,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "paused",
  "validation_file": "file-abc123",
  "training_file": "file-abc123"
}
```

## Resume fine-tuning

`fine_tuning.jobs.resume(strfine_tuning_job_id)  -> FineTuningJob`

**post** `/fine_tuning/jobs/{fine_tuning_job_id}/resume`

Resume a fine-tune job.

### Parameters

- `fine_tuning_job_id: str`

### Returns

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
fine_tuning_job = client.fine_tuning.jobs.resume(
    "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
print(fine_tuning_job.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message",
    "param": "param"
  },
  "fine_tuned_model": "fine_tuned_model",
  "finished_at": 0,
  "hyperparameters": {
    "batch_size": "auto",
    "learning_rate_multiplier": "auto",
    "n_epochs": "auto"
  },
  "model": "model",
  "object": "fine_tuning.job",
  "organization_id": "organization_id",
  "result_files": [
    "file-abc123"
  ],
  "seed": 0,
  "status": "validating_files",
  "trained_tokens": 0,
  "training_file": "training_file",
  "validation_file": "validation_file",
  "estimated_finish": 0,
  "integrations": [
    {
      "type": "wandb",
      "wandb": {
        "project": "my-wandb-project",
        "entity": "entity",
        "name": "name",
        "tags": [
          "custom-tag"
        ]
      }
    }
  ],
  "metadata": {
    "foo": "string"
  },
  "method": {
    "type": "supervised",
    "dpo": {
      "hyperparameters": {
        "batch_size": "auto",
        "beta": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    },
    "reinforcement": {
      "grader": {
        "input": "input",
        "name": "name",
        "operation": "eq",
        "reference": "reference",
        "type": "string_check"
      },
      "hyperparameters": {
        "batch_size": "auto",
        "compute_multiplier": "auto",
        "eval_interval": "auto",
        "eval_samples": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto",
        "reasoning_effort": "default"
      }
    },
    "supervised": {
      "hyperparameters": {
        "batch_size": "auto",
        "learning_rate_multiplier": "auto",
        "n_epochs": "auto"
      }
    }
  }
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.resume("ftjob-abc123")
```

#### Response

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini-2024-07-18",
  "created_at": 1721764800,
  "fine_tuned_model": null,
  "organization_id": "org-123",
  "result_files": [],
  "status": "queued",
  "validation_file": "file-abc123",
  "training_file": "file-abc123"
}
```

## Domain Types

### Fine Tuning Job

- `class FineTuningJob: …`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: str`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Optional[Error]`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: str`

      A machine-readable error code.

    - `message: str`

      A human-readable error message.

    - `param: Optional[str]`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: Optional[str]`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size: Optional[Union[Literal["auto"], int, null]]`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

    - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `Literal["auto"]`

        - `"auto"`

      - `float`

    - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `Literal["auto"]`

        - `"auto"`

      - `int`

  - `model: str`

    The base model that is being fine-tuned.

  - `object: Literal["fine_tuning.job"]`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: str`

    The organization that owns the fine-tuning job.

  - `result_files: List[str]`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: int`

    The seed used for the fine-tuning job.

  - `status: Literal["validating_files", "queued", "running", 3 more]`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: Optional[int]`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: str`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: Optional[str]`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish: Optional[int]`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations: Optional[List[FineTuningJobWandbIntegrationObject]]`

    A list of integrations to enable for this fine-tuning job.

    - `type: Literal["wandb"]`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: str`

        The name of the project that the new run will be created under.

      - `entity: Optional[str]`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name: Optional[str]`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags: Optional[List[str]]`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method: Optional[Method]`

    The method used for fine-tuning.

    - `type: Literal["supervised", "dpo", "reinforcement"]`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo: Optional[DpoMethod]`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters: Optional[DpoHyperparameters]`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `beta: Optional[Union[Literal["auto"], float, null]]`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

    - `reinforcement: Optional[ReinforcementMethod]`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters: Optional[ReinforcementHyperparameters]`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `compute_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Multiplier on amount of compute used for exploring search space during training.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `eval_interval: Optional[Union[Literal["auto"], int, null]]`

          The number of training steps between evaluation runs.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `eval_samples: Optional[Union[Literal["auto"], int, null]]`

          Number of evaluation samples to generate per training step.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `reasoning_effort: Optional[Literal["default", "low", "medium", "high"]]`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised: Optional[SupervisedMethod]`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters: Optional[SupervisedHyperparameters]`

        The hyperparameters used for the fine-tuning job.

        - `batch_size: Optional[Union[Literal["auto"], int, null]]`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

        - `learning_rate_multiplier: Optional[Union[Literal["auto"], float, null]]`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `Literal["auto"]`

            - `"auto"`

          - `float`

        - `n_epochs: Optional[Union[Literal["auto"], int, null]]`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `Literal["auto"]`

            - `"auto"`

          - `int`

### Fine Tuning Job Event

- `class FineTuningJobEvent: …`

  Fine-tuning job event object

  - `id: str`

    The object identifier.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: Literal["info", "warn", "error"]`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: str`

    The message of the event.

  - `object: Literal["fine_tuning.job.event"]`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data: Optional[object]`

    The data associated with the event.

  - `type: Optional[Literal["message", "metrics"]]`

    The type of event.

    - `"message"`

    - `"metrics"`

### Fine Tuning Job Wandb Integration

- `class FineTuningJobWandbIntegration: …`

  The settings for your integration with Weights and Biases. This payload specifies the project that
  metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
  to your run, and set a default entity (team, username, etc) to be associated with your run.

  - `project: str`

    The name of the project that the new run will be created under.

  - `entity: Optional[str]`

    The entity to use for the run. This allows you to set the team or username of the WandB user that you would
    like associated with the run. If not set, the default entity for the registered WandB API key is used.

  - `name: Optional[str]`

    A display name to set for the run. If not set, we will use the Job ID as the name.

  - `tags: Optional[List[str]]`

    A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
    default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

### Fine Tuning Job Wandb Integration Object

- `class FineTuningJobWandbIntegrationObject: …`

  - `type: Literal["wandb"]`

    The type of the integration being enabled for the fine-tuning job

    - `"wandb"`

  - `wandb: FineTuningJobWandbIntegration`

    The settings for your integration with Weights and Biases. This payload specifies the project that
    metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
    to your run, and set a default entity (team, username, etc) to be associated with your run.

    - `project: str`

      The name of the project that the new run will be created under.

    - `entity: Optional[str]`

      The entity to use for the run. This allows you to set the team or username of the WandB user that you would
      like associated with the run. If not set, the default entity for the registered WandB API key is used.

    - `name: Optional[str]`

      A display name to set for the run. If not set, we will use the Job ID as the name.

    - `tags: Optional[List[str]]`

      A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
      default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

# Checkpoints

## List fine-tuning checkpoints

`fine_tuning.jobs.checkpoints.list(strfine_tuning_job_id, CheckpointListParams**kwargs)  -> SyncCursorPage[FineTuningJobCheckpoint]`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints`

List checkpoints for a fine-tuning job.

### Parameters

- `fine_tuning_job_id: str`

- `after: Optional[str]`

  Identifier for the last checkpoint ID from the previous pagination request.

- `limit: Optional[int]`

  Number of checkpoints to retrieve.

### Returns

- `class FineTuningJobCheckpoint: …`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: str`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: str`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: str`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss: Optional[float]`

    - `full_valid_mean_token_accuracy: Optional[float]`

    - `step: Optional[float]`

    - `train_loss: Optional[float]`

    - `train_mean_token_accuracy: Optional[float]`

    - `valid_loss: Optional[float]`

    - `valid_mean_token_accuracy: Optional[float]`

  - `object: Literal["fine_tuning.job.checkpoint"]`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: int`

    The step number that the checkpoint was created at.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.jobs.checkpoints.list(
    fine_tuning_job_id="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "fine_tuned_model_checkpoint": "fine_tuned_model_checkpoint",
      "fine_tuning_job_id": "fine_tuning_job_id",
      "metrics": {
        "full_valid_loss": 0,
        "full_valid_mean_token_accuracy": 0,
        "step": 0,
        "train_loss": 0,
        "train_mean_token_accuracy": 0,
        "valid_loss": 0,
        "valid_mean_token_accuracy": 0
      },
      "object": "fine_tuning.job.checkpoint",
      "step_number": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Domain Types

### Fine Tuning Job Checkpoint

- `class FineTuningJobCheckpoint: …`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: str`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: str`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: str`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss: Optional[float]`

    - `full_valid_mean_token_accuracy: Optional[float]`

    - `step: Optional[float]`

    - `train_loss: Optional[float]`

    - `train_mean_token_accuracy: Optional[float]`

    - `valid_loss: Optional[float]`

    - `valid_mean_token_accuracy: Optional[float]`

  - `object: Literal["fine_tuning.job.checkpoint"]`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: int`

    The step number that the checkpoint was created at.

# Checkpoints

# Permissions

## List checkpoint permissions

`fine_tuning.checkpoints.permissions.retrieve(strfine_tuned_model_checkpoint, PermissionRetrieveParams**kwargs)  -> PermissionRetrieveResponse`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `after: Optional[str]`

  Identifier for the last permission ID from the previous pagination request.

- `limit: Optional[int]`

  Number of permissions to retrieve.

- `order: Optional[Literal["ascending", "descending"]]`

  The order in which to retrieve permissions.

  - `"ascending"`

  - `"descending"`

- `project_id: Optional[str]`

  The ID of the project to get permissions for.

### Returns

- `class PermissionRetrieveResponse: …`

  - `data: List[Data]`

    - `id: str`

      The permission identifier, which can be referenced in the API endpoints.

    - `created_at: int`

      The Unix timestamp (in seconds) for when the permission was created.

    - `object: Literal["checkpoint.permission"]`

      The object type, which is always "checkpoint.permission".

      - `"checkpoint.permission"`

    - `project_id: str`

      The project identifier that the permission is for.

  - `has_more: bool`

  - `object: Literal["list"]`

    - `"list"`

  - `first_id: Optional[str]`

  - `last_id: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
permission = client.fine_tuning.checkpoints.permissions.retrieve(
    fine_tuned_model_checkpoint="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
print(permission.first_id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "checkpoint.permission",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## List checkpoint permissions

`fine_tuning.checkpoints.permissions.list(strfine_tuned_model_checkpoint, PermissionListParams**kwargs)  -> SyncConversationCursorPage[PermissionListResponse]`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `after: Optional[str]`

  Identifier for the last permission ID from the previous pagination request.

- `limit: Optional[int]`

  Number of permissions to retrieve.

- `order: Optional[Literal["ascending", "descending"]]`

  The order in which to retrieve permissions.

  - `"ascending"`

  - `"descending"`

- `project_id: Optional[str]`

  The ID of the project to get permissions for.

### Returns

- `class PermissionListResponse: …`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: str`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: str`

    The project identifier that the permission is for.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.checkpoints.permissions.list(
    fine_tuned_model_checkpoint="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "checkpoint.permission",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Create checkpoint permissions

`fine_tuning.checkpoints.permissions.create(strfine_tuned_model_checkpoint, PermissionCreateParams**kwargs)  -> SyncPage[PermissionCreateResponse]`

**post** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `project_ids: Sequence[str]`

  The project identifiers to grant access to.

### Returns

- `class PermissionCreateResponse: …`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: str`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: str`

    The project identifier that the permission is for.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.checkpoints.permissions.create(
    fine_tuned_model_checkpoint="ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd",
    project_ids=["string"],
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "checkpoint.permission",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Delete checkpoint permission

`fine_tuning.checkpoints.permissions.delete(strpermission_id, PermissionDeleteParams**kwargs)  -> PermissionDeleteResponse`

**delete** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `permission_id: str`

### Returns

- `class PermissionDeleteResponse: …`

  - `id: str`

    The ID of the fine-tuned model checkpoint permission that was deleted.

  - `deleted: bool`

    Whether the fine-tuned model checkpoint permission was successfully deleted.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
permission = client.fine_tuning.checkpoints.permissions.delete(
    permission_id="cp_zc4Q7MP6XxulcVzj4MZdwsAB",
    fine_tuned_model_checkpoint="ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd",
)
print(permission.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "checkpoint.permission"
}
```

## Domain Types

### Permission Retrieve Response

- `class PermissionRetrieveResponse: …`

  - `data: List[Data]`

    - `id: str`

      The permission identifier, which can be referenced in the API endpoints.

    - `created_at: int`

      The Unix timestamp (in seconds) for when the permission was created.

    - `object: Literal["checkpoint.permission"]`

      The object type, which is always "checkpoint.permission".

      - `"checkpoint.permission"`

    - `project_id: str`

      The project identifier that the permission is for.

  - `has_more: bool`

  - `object: Literal["list"]`

    - `"list"`

  - `first_id: Optional[str]`

  - `last_id: Optional[str]`

### Permission List Response

- `class PermissionListResponse: …`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: str`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: str`

    The project identifier that the permission is for.

### Permission Create Response

- `class PermissionCreateResponse: …`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: str`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: str`

    The project identifier that the permission is for.

### Permission Delete Response

- `class PermissionDeleteResponse: …`

  - `id: str`

    The ID of the fine-tuned model checkpoint permission that was deleted.

  - `deleted: bool`

    Whether the fine-tuned model checkpoint permission was successfully deleted.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

# Alpha

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
