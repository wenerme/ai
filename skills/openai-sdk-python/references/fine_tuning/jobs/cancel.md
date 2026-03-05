## Cancel

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
