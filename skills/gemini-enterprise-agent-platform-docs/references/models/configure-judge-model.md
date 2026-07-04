## Overview

You have the following options to configure your judge model for improved
quality:

- System instructions: The judge model can process a set of instructions before it processes evaluation prompts.
- Judge model configurations : Response flipping: Flip the responses from the baseline model and the candidate model to reduce judge model bias during evaluation. Multi-sampling: Adjust the number of times to call the judge model for the evaluation score to improve consistency. Tuned judge model: Use a tuned LLM as the judge model.

## System instructions

Gemini models can take in system instructions, which are a set of instructions that impact how the model processes prompts. You can use system instructions when initializing or generating content from a model to specify product-level behavior such as roles or personas, contextual information, and explanation style and tone. The judge model typically weighs the importance of system instructions higher than input prompts.

For a list of models that support system instructions, see Supported models.

The following example using the Vertex AI SDK adds `system_instruction` at the metric level for `PointwiseMetric`:

```
system_instruction = "You are an expert evaluator."
linguistic_acceptability = PointwiseMetric(
    metric="linguistic_acceptability",
    metric_prompt_template=linguistic_acceptability_metric_prompt_template,
    system_instruction=system_instruction,
)

eval_result = EvalTask(
    dataset=EVAL_DATASET,
    metrics=[linguistic_acceptability]
).evaluate()

```

You can use the same approach with `PairwiseMetric`.

## Judge model configuration

You can further customize the judge model through `autorater_config`:

- Response flipping: Flip the responses from the baseline model and the candidate model to reduce judge model bias during evaluation.
- Multi-sampling: Adjust the number of times to call the judge model for the evaluation score to improve consistency.
- Tuned judge model: Use a tuned LLM as the judge model.

### Response flipping

For `PairwiseMetrics`, the Gen AI evaluation service takes in responses for the baseline model and the candidate model. The judge model evaluates which response better aligns with the criteria in the `metric_prompt_template`. However, the judge model may be biased toward the baseline or candidate model in certain settings.

To reduce bias in the evaluation results, you can enable response flipping, where half of the calls to the judge model flips the baseline model and candidate model response using the Vertex AI SDK:

```
from vertexai.preview.evaluation import AutoraterConfig

pairwise_relevance_prompt_template = """
    # Instruction
    ...

    ### Response A
    {baseline_model_response}

    ### Response B
    {candidate_model_response}
"""

my_pairwise_metric = PairwiseMetric(
    metric="my_pairwise_metric",
    metric_prompt_template=pairwise_relevance_prompt_template,
    candidate_response_field_name = "candidate_model_response",
    baseline_response_field_name = "baseline_model_response"

# Define an AutoraterConfig with flip_enabled
my_autorater_config = AutoraterConfig(flip_enabled=True)

# Define an EvalTask with autorater_config
flip_enabled_eval_result = EvalTask(
    metrics=[my_pairwise_metric],
    autorater_config=my_autorater_config,

```

### Multi-sampling

When performing evaluation, the judge model might show some randomness in its responses. Additional sampling can help negate the inherent randomness of the judge model and lead to more consistent results.

However, increasing sampling also increases the latency to complete the request. You can update the sampling count value using `AutoraterConfig` to an integer between 1 and 32. We recommend using the default `sampling_count` value of 4 to balance the two factors of randomness and latency.

Using the Vertex AI SDK, you can specify the number of samples that are executed for each request:

```

# Define customized sampling count in AutoraterConfig
autorater_config = AutoraterConfig(sampling_count=6)

# Run evaluation with the sampling count.
    metrics=[METRICS],
    autorater_config=autorater_config

```

### Tuned judge model

If you have good tuning data for your evaluation use case, you can use the Vertex AI SDK to tune a Gemini model as the judge model and use the tuned model for evaluation. You can specify a tuned model as the judge model through `AutoraterConfig`:

```
from vertexai.preview.evaluation import {
   AutoraterConfig,
   PairwiseMetric,
   tune_autorater,
   evaluate_autorater,
}

# Tune a model to be the judge model. The tune_autorater helper function returns an AutoraterConfig with the judge model set as the tuned model.
autorater_config: AutoRaterConfig = tune_autorater(
    base_model="gemini-2.0-flash",
    train_dataset=f"{BUCKET_URI}/train/sft_train_samples.jsonl",
    validation_dataset=f"{BUCKET_URI}/val/sft_val_samples.jsonl",
    tuned_model_display_name=tuned_model_display_name,

# Alternatively, you can set up the judge model with an existing tuned model endpoint
autorater_config = AutoraterConfig(autorater_model=TUNED_MODEL)

# Use the tuned judge model
    autorater_config=autorater_config,

```

## What's next

- Evaluate a generative AI agent
