## Retrieve

`client.fineTuning.jobs.retrieve(stringfineTuningJobID, RequestOptionsoptions?): FineTuningJob`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}`

Get info about a fine-tuning job.

[Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)

### Parameters

- `fineTuningJobID: string`

### Returns

- `FineTuningJob`

  The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.

  - `id: string`

    The object identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `error: Error | null`

    For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure.

    - `code: string`

      A machine-readable error code.

    - `message: string`

      A human-readable error message.

    - `param: string | null`

      The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific.

  - `fine_tuned_model: string | null`

    The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running.

  - `finished_at: number | null`

    The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running.

  - `hyperparameters: Hyperparameters`

    The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs.

    - `batch_size?: "auto" | number | null`

      Number of examples in each batch. A larger batch size means that model parameters
      are updated less frequently, but with lower variance.

      - `"auto"`

        - `"auto"`

      - `number`

    - `learning_rate_multiplier?: "auto" | number`

      Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
      overfitting.

      - `"auto"`

        - `"auto"`

      - `number`

    - `n_epochs?: "auto" | number`

      The number of epochs to train the model for. An epoch refers to one full cycle
      through the training dataset.

      - `"auto"`

        - `"auto"`

      - `number`

  - `model: string`

    The base model that is being fine-tuned.

  - `object: "fine_tuning.job"`

    The object type, which is always "fine_tuning.job".

    - `"fine_tuning.job"`

  - `organization_id: string`

    The organization that owns the fine-tuning job.

  - `result_files: Array<string>`

    The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `seed: number`

    The seed used for the fine-tuning job.

  - `status: "validating_files" | "queued" | "running" | 3 more`

    The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

    - `"validating_files"`

    - `"queued"`

    - `"running"`

    - `"succeeded"`

    - `"failed"`

    - `"cancelled"`

  - `trained_tokens: number | null`

    The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running.

  - `training_file: string`

    The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `validation_file: string | null`

    The file ID used for validation. You can retrieve the validation results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).

  - `estimated_finish?: number | null`

    The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running.

  - `integrations?: Array<FineTuningJobWandbIntegrationObject> | null`

    A list of integrations to enable for this fine-tuning job.

    - `type: "wandb"`

      The type of the integration being enabled for the fine-tuning job

      - `"wandb"`

    - `wandb: FineTuningJobWandbIntegration`

      The settings for your integration with Weights and Biases. This payload specifies the project that
      metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
      to your run, and set a default entity (team, username, etc) to be associated with your run.

      - `project: string`

        The name of the project that the new run will be created under.

      - `entity?: string | null`

        The entity to use for the run. This allows you to set the team or username of the WandB user that you would
        like associated with the run. If not set, the default entity for the registered WandB API key is used.

      - `name?: string | null`

        A display name to set for the run. If not set, we will use the Job ID as the name.

      - `tags?: Array<string>`

        A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
        default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `method?: Method`

    The method used for fine-tuning.

    - `type: "supervised" | "dpo" | "reinforcement"`

      The type of method. Is either `supervised`, `dpo`, or `reinforcement`.

      - `"supervised"`

      - `"dpo"`

      - `"reinforcement"`

    - `dpo?: DpoMethod`

      Configuration for the DPO fine-tuning method.

      - `hyperparameters?: DpoHyperparameters`

        The hyperparameters used for the DPO fine-tuning job.

        - `batch_size?: "auto" | number`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `"auto"`

            - `"auto"`

          - `number`

        - `beta?: "auto" | number`

          The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.

          - `"auto"`

            - `"auto"`

          - `number`

        - `learning_rate_multiplier?: "auto" | number`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `"auto"`

            - `"auto"`

          - `number`

        - `n_epochs?: "auto" | number`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `"auto"`

            - `"auto"`

          - `number`

    - `reinforcement?: ReinforcementMethod`

      Configuration for the reinforcement fine-tuning method.

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

      - `hyperparameters?: ReinforcementHyperparameters`

        The hyperparameters used for the reinforcement fine-tuning job.

        - `batch_size?: "auto" | number`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `"auto"`

            - `"auto"`

          - `number`

        - `compute_multiplier?: "auto" | number`

          Multiplier on amount of compute used for exploring search space during training.

          - `"auto"`

            - `"auto"`

          - `number`

        - `eval_interval?: "auto" | number`

          The number of training steps between evaluation runs.

          - `"auto"`

            - `"auto"`

          - `number`

        - `eval_samples?: "auto" | number`

          Number of evaluation samples to generate per training step.

          - `"auto"`

            - `"auto"`

          - `number`

        - `learning_rate_multiplier?: "auto" | number`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `"auto"`

            - `"auto"`

          - `number`

        - `n_epochs?: "auto" | number`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `"auto"`

            - `"auto"`

          - `number`

        - `reasoning_effort?: "default" | "low" | "medium" | "high"`

          Level of reasoning effort.

          - `"default"`

          - `"low"`

          - `"medium"`

          - `"high"`

    - `supervised?: SupervisedMethod`

      Configuration for the supervised fine-tuning method.

      - `hyperparameters?: SupervisedHyperparameters`

        The hyperparameters used for the fine-tuning job.

        - `batch_size?: "auto" | number`

          Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.

          - `"auto"`

            - `"auto"`

          - `number`

        - `learning_rate_multiplier?: "auto" | number`

          Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.

          - `"auto"`

            - `"auto"`

          - `number`

        - `n_epochs?: "auto" | number`

          The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

          - `"auto"`

            - `"auto"`

          - `number`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const fineTuningJob = await client.fineTuning.jobs.retrieve('ft-AF1WoRqd3aJAHsqc9NY7iL8F');

console.log(fineTuningJob.id);
```
