# Fine Tuning

# Methods

## Domain Types

### Dpo Hyperparameters

- `DpoHyperparameters`

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

### Dpo Method

- `DpoMethod`

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

### Reinforcement Hyperparameters

- `ReinforcementHyperparameters`

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

### Reinforcement Method

- `ReinforcementMethod`

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

### Supervised Hyperparameters

- `SupervisedHyperparameters`

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

### Supervised Method

- `SupervisedMethod`

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

# Jobs

## Create

`client.fineTuning.jobs.create(JobCreateParamsbody, RequestOptionsoptions?): FineTuningJob`

**post** `/fine_tuning/jobs`

Creates a fine-tuning job which begins the process of creating a new model from a given dataset.

Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.

[Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)

### Parameters

- `body: JobCreateParams`

  - `model: (string & {}) | "babbage-002" | "davinci-002" | "gpt-3.5-turbo" | "gpt-4o-mini"`

    The name of the model to fine-tune. You can select one of the
    [supported models](https://platform.openai.com/docs/guides/fine-tuning#which-models-can-be-fine-tuned).

    - `(string & {})`

    - `"babbage-002" | "davinci-002" | "gpt-3.5-turbo" | "gpt-4o-mini"`

      - `"babbage-002"`

      - `"davinci-002"`

      - `"gpt-3.5-turbo"`

      - `"gpt-4o-mini"`

  - `training_file: string`

    The ID of an uploaded file that contains training data.

    See [upload file](https://platform.openai.com/docs/api-reference/files/create) for how to upload a file.

    Your dataset must be formatted as a JSONL file. Additionally, you must upload your file with the purpose `fine-tune`.

    The contents of the file should differ depending on if the model uses the [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input), [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input) format, or if the fine-tuning method uses the [preference](https://platform.openai.com/docs/api-reference/fine-tuning/preference-input) format.

    See the [fine-tuning guide](https://platform.openai.com/docs/guides/model-optimization) for more details.

  - `hyperparameters?: Hyperparameters`

    The hyperparameters used for the fine-tuning job.
    This value is now deprecated in favor of `method`, and should be passed in under the `method` parameter.

    - `batch_size?: "auto" | number`

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

  - `integrations?: Array<Integration> | null`

    A list of integrations to enable for your fine-tuning job.

    - `type: "wandb"`

      The type of integration to enable. Currently, only "wandb" (Weights and Biases) is supported.

      - `"wandb"`

    - `wandb: Wandb`

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

  - `seed?: number | null`

    The seed controls the reproducibility of the job. Passing in the same seed and job parameters should produce the same results, but may differ in rare cases.
    If a seed is not specified, one will be generated for you.

  - `suffix?: string | null`

    A string of up to 64 characters that will be added to your fine-tuned model name.

    For example, a `suffix` of "custom-model-name" would produce a model name like `ft:gpt-4o-mini:openai:custom-model-name:7p4lURel`.

  - `validation_file?: string | null`

    The ID of an uploaded file that contains validation data.

    If you provide this file, the data is used to generate validation
    metrics periodically during fine-tuning. These metrics can be viewed in
    the fine-tuning results file.
    The same data should not be present in both train and validation files.

    Your dataset must be formatted as a JSONL file. You must upload your file with the purpose `fine-tune`.

    See the [fine-tuning guide](https://platform.openai.com/docs/guides/model-optimization) for more details.

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

const fineTuningJob = await client.fineTuning.jobs.create({
  model: 'gpt-4o-mini',
  training_file: 'file-abc123',
});

console.log(fineTuningJob.id);
```

## List

`client.fineTuning.jobs.list(JobListParamsquery?, RequestOptionsoptions?): CursorPage<FineTuningJob>`

**get** `/fine_tuning/jobs`

List your organization's fine-tuning jobs

### Parameters

- `query: JobListParams`

  - `after?: string`

    Identifier for the last job from the previous pagination request.

  - `limit?: number`

    Number of fine-tuning jobs to retrieve.

  - `metadata?: Record<string, string> | null`

    Optional metadata filter. To filter, use the syntax `metadata[k]=v`. Alternatively, set `metadata=null` to indicate no metadata.

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

// Automatically fetches more pages as needed.
for await (const fineTuningJob of client.fineTuning.jobs.list()) {
  console.log(fineTuningJob.id);
}
```

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

## List Events

`client.fineTuning.jobs.listEvents(stringfineTuningJobID, JobListEventsParamsquery?, RequestOptionsoptions?): CursorPage<FineTuningJobEvent>`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/events`

Get status updates for a fine-tuning job.

### Parameters

- `fineTuningJobID: string`

- `query: JobListEventsParams`

  - `after?: string`

    Identifier for the last event from the previous pagination request.

  - `limit?: number`

    Number of events to retrieve.

### Returns

- `FineTuningJobEvent`

  Fine-tuning job event object

  - `id: string`

    The object identifier.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: "info" | "warn" | "error"`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: string`

    The message of the event.

  - `object: "fine_tuning.job.event"`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data?: unknown`

    The data associated with the event.

  - `type?: "message" | "metrics"`

    The type of event.

    - `"message"`

    - `"metrics"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const fineTuningJobEvent of client.fineTuning.jobs.listEvents(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
)) {
  console.log(fineTuningJobEvent.id);
}
```

## Cancel

`client.fineTuning.jobs.cancel(stringfineTuningJobID, RequestOptionsoptions?): FineTuningJob`

**post** `/fine_tuning/jobs/{fine_tuning_job_id}/cancel`

Immediately cancel a fine-tune job.

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

const fineTuningJob = await client.fineTuning.jobs.cancel('ft-AF1WoRqd3aJAHsqc9NY7iL8F');

console.log(fineTuningJob.id);
```

## Pause

`client.fineTuning.jobs.pause(stringfineTuningJobID, RequestOptionsoptions?): FineTuningJob`

**post** `/fine_tuning/jobs/{fine_tuning_job_id}/pause`

Pause a fine-tune job.

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

const fineTuningJob = await client.fineTuning.jobs.pause('ft-AF1WoRqd3aJAHsqc9NY7iL8F');

console.log(fineTuningJob.id);
```

## Resume

`client.fineTuning.jobs.resume(stringfineTuningJobID, RequestOptionsoptions?): FineTuningJob`

**post** `/fine_tuning/jobs/{fine_tuning_job_id}/resume`

Resume a fine-tune job.

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

const fineTuningJob = await client.fineTuning.jobs.resume('ft-AF1WoRqd3aJAHsqc9NY7iL8F');

console.log(fineTuningJob.id);
```

## Domain Types

### Fine Tuning Job

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

### Fine Tuning Job Event

- `FineTuningJobEvent`

  Fine-tuning job event object

  - `id: string`

    The object identifier.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: "info" | "warn" | "error"`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: string`

    The message of the event.

  - `object: "fine_tuning.job.event"`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data?: unknown`

    The data associated with the event.

  - `type?: "message" | "metrics"`

    The type of event.

    - `"message"`

    - `"metrics"`

### Fine Tuning Job Wandb Integration

- `FineTuningJobWandbIntegration`

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

### Fine Tuning Job Wandb Integration Object

- `FineTuningJobWandbIntegrationObject`

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

# Checkpoints

## List

`client.fineTuning.jobs.checkpoints.list(stringfineTuningJobID, CheckpointListParamsquery?, RequestOptionsoptions?): CursorPage<FineTuningJobCheckpoint>`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints`

List checkpoints for a fine-tuning job.

### Parameters

- `fineTuningJobID: string`

- `query: CheckpointListParams`

  - `after?: string`

    Identifier for the last checkpoint ID from the previous pagination request.

  - `limit?: number`

    Number of checkpoints to retrieve.

### Returns

- `FineTuningJobCheckpoint`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: string`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: string`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: string`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss?: number`

    - `full_valid_mean_token_accuracy?: number`

    - `step?: number`

    - `train_loss?: number`

    - `train_mean_token_accuracy?: number`

    - `valid_loss?: number`

    - `valid_mean_token_accuracy?: number`

  - `object: "fine_tuning.job.checkpoint"`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: number`

    The step number that the checkpoint was created at.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const fineTuningJobCheckpoint of client.fineTuning.jobs.checkpoints.list(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
)) {
  console.log(fineTuningJobCheckpoint.id);
}
```

## Domain Types

### Fine Tuning Job Checkpoint

- `FineTuningJobCheckpoint`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: string`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: string`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: string`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss?: number`

    - `full_valid_mean_token_accuracy?: number`

    - `step?: number`

    - `train_loss?: number`

    - `train_mean_token_accuracy?: number`

    - `valid_loss?: number`

    - `valid_mean_token_accuracy?: number`

  - `object: "fine_tuning.job.checkpoint"`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: number`

    The step number that the checkpoint was created at.

# Checkpoints

# Permissions

## Retrieve

`client.fineTuning.checkpoints.permissions.retrieve(stringfineTunedModelCheckpoint, PermissionRetrieveParamsquery?, RequestOptionsoptions?): PermissionRetrieveResponse`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fineTunedModelCheckpoint: string`

- `query: PermissionRetrieveParams`

  - `after?: string`

    Identifier for the last permission ID from the previous pagination request.

  - `limit?: number`

    Number of permissions to retrieve.

  - `order?: "ascending" | "descending"`

    The order in which to retrieve permissions.

    - `"ascending"`

    - `"descending"`

  - `project_id?: string`

    The ID of the project to get permissions for.

### Returns

- `PermissionRetrieveResponse`

  - `data: Array<Data>`

    - `id: string`

      The permission identifier, which can be referenced in the API endpoints.

    - `created_at: number`

      The Unix timestamp (in seconds) for when the permission was created.

    - `object: "checkpoint.permission"`

      The object type, which is always "checkpoint.permission".

      - `"checkpoint.permission"`

    - `project_id: string`

      The project identifier that the permission is for.

  - `has_more: boolean`

  - `object: "list"`

    - `"list"`

  - `first_id?: string | null`

  - `last_id?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const permission = await client.fineTuning.checkpoints.permissions.retrieve(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
);

console.log(permission.first_id);
```

## List

`client.fineTuning.checkpoints.permissions.list(stringfineTunedModelCheckpoint, PermissionListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<PermissionListResponse>`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fineTunedModelCheckpoint: string`

- `query: PermissionListParams`

  - `after?: string`

    Identifier for the last permission ID from the previous pagination request.

  - `limit?: number`

    Number of permissions to retrieve.

  - `order?: "ascending" | "descending"`

    The order in which to retrieve permissions.

    - `"ascending"`

    - `"descending"`

  - `project_id?: string`

    The ID of the project to get permissions for.

### Returns

- `PermissionListResponse`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const permissionListResponse of client.fineTuning.checkpoints.permissions.list(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
)) {
  console.log(permissionListResponse.id);
}
```

## Create

`client.fineTuning.checkpoints.permissions.create(stringfineTunedModelCheckpoint, PermissionCreateParamsbody, RequestOptionsoptions?): Page<PermissionCreateResponse>`

**post** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.

### Parameters

- `fineTunedModelCheckpoint: string`

- `body: PermissionCreateParams`

  - `project_ids: Array<string>`

    The project identifiers to grant access to.

### Returns

- `PermissionCreateResponse`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const permissionCreateResponse of client.fineTuning.checkpoints.permissions.create(
  'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
  { project_ids: ['string'] },
)) {
  console.log(permissionCreateResponse.id);
}
```

## Delete

`client.fineTuning.checkpoints.permissions.delete(stringpermissionID, PermissionDeleteParamsparams, RequestOptionsoptions?): PermissionDeleteResponse`

**delete** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Parameters

- `permissionID: string`

- `params: PermissionDeleteParams`

  - `fine_tuned_model_checkpoint: string`

    The ID of the fine-tuned model checkpoint to delete a permission for.

### Returns

- `PermissionDeleteResponse`

  - `id: string`

    The ID of the fine-tuned model checkpoint permission that was deleted.

  - `deleted: boolean`

    Whether the fine-tuned model checkpoint permission was successfully deleted.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const permission = await client.fineTuning.checkpoints.permissions.delete(
  'cp_zc4Q7MP6XxulcVzj4MZdwsAB',
  { fine_tuned_model_checkpoint: 'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd' },
);

console.log(permission.id);
```

# Alpha

# Graders

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

## Validate

`client.fineTuning.alpha.graders.validate(GraderValidateParamsbody, RequestOptionsoptions?): GraderValidateResponse`

**post** `/fine_tuning/alpha/graders/validate`

Validate a grader.

### Parameters

- `body: GraderValidateParams`

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

### Returns

- `GraderValidateResponse`

  - `grader?: StringCheckGrader | TextSimilarityGrader | PythonGrader | 2 more`

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

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.fineTuning.alpha.graders.validate({
  grader: {
    input: 'input',
    name: 'name',
    operation: 'eq',
    reference: 'reference',
    type: 'string_check',
  },
});

console.log(response.grader);
```
