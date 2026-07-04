## Prompt optimization example

For example, to optimize system instructions for a set of prompts that reference
contextual information to answer questions about cooking, you can use
data-driven optimizer. To complete this task, you would prepare
the inputs similar to the following:

#### System instructions

```
You are a professional chef. Your goal is teaching how to cook healthy cooking recipes to your apprentice.

Given a question from your apprentice and some context, provide the correct answer to the question.
Use the context to return a single and correct answer with some explanation.

```

#### Prompt template

```
Question: {input_question}
Facts: {input_context}

```

#### Sample prompts

| `input_question` | `input_context` |
| --- | --- |
| What are some techniques for cooking red meat and pork that maximize flavor and tenderness while minimizing the formation of unhealthy compounds? | Red meat and pork should be cooked to an internal temperature of 145 degrees fahrenheit (63 degrees celsius) to ensure safety. Marinating meat in acidic ingredients like lemon juice or vinegar can help tenderize it by breaking down tough muscle fibers. High-heat cooking methods like grilling and pan-searing can create delicious browning and caramelization, but it's important to avoid charring, which can produce harmful compounds. |
| What are some creative ways to add flavor and nutrition to protein shakes without using added sugars or artificial ingredients? | Adding leafy greens like spinach or kale is a great way to boost the nutritional value of your shake without drastically altering the flavor. Using unsweetened almond milk or coconut water instead of regular milk can add a subtle sweetness and a boost of healthy fats or electrolytes, respectively. Did you know that over-blending your shake can actually heat it up? To keep things cool and refreshing, blend for shorter bursts and give your blender a break if needed. |

#### Optimized system instructions

```
As a highly skilled chef with a passion for healthy cooking, you love sharing your knowledge with
aspiring chefs. Today, a culinary intern approaches you with a question about healthy cooking. Given
the intern's question and some facts, provide a clear, concise, and informative answer that will help
the intern excel in their culinary journey.

```

## How optimization works

The data-driven optimizer takes the following parameters:

- Optimization mode : Specifies what to optimize. It can be one of the following:`instruction`: Optimizes the system instruction.`demonstration`: Selects sample prompts to add to the system instruction as few-shot examples.`instruction_and_demo`: Performs both of the above actions.
- Evaluation metrics: the metrics that the data-driven optimizer uses to optimize the system instructions and/or select sample prompts.
- Target model : the Google model for which the data-driven optimizer optimizes the system instructions and selects sample prompts.

When you run the data-driven optimizer, it optimizes the system
instructions based on your selections by running a custom training job
where it iteratively evaluates your sample prompts and rewrites your system
instructions to find the version that produces the best evaluation score for
the target model.

At the end of the job, the data-driven optimizer outputs the
optimized system instructions with their evaluation score.

## Evaluation metrics

The data-driven optimizer uses evaluation metrics to optimize
system instructions and select sample prompts. You can use the
standard evaluation metrics or define your
own custom evaluation metrics. Note: All evaluation metrics MUST have the property that higher score indicates better performance.

You can use multiple metrics at a time. However, custom metrics
can only be used one at a time. If you use standard and custom metrics
together, only one of the metrics can be a custom metric. The others must be
standard metrics.

To learn how to specify metrics one at a time or in combination, see
EVALUATION_METRIC_PARAMETERS in the SDK tab in
Create a prompt template and system instructions.

### Custom evaluation metrics

Custom metrics are useful when standard metrics don't fit your application.
Note that the
data-driven optimizer only supports one custom metric
at a time.

To learn how to create custom metrics, see
Create custom metrics.

### Standard evaluation metrics

The data-driven optimizer supports
custom evaluation metrics, and additionally supports the following evaluation
metrics:

| Metric type | Use case | Metric | Description |
| --- | --- | --- | --- |
| Model-based | Summarization | `summarization_quality` | Describes the model's ability to answer questions given a body of text to reference. |
| Model-based | Question answering | `question_answering_correctness`^*^ | Describes the model's ability to correctly answer a question. |
| Model-based | Question answering | `question_answering_quality` | Describes the model's ability to answer questions given a body of text to reference. |
| Model-based | Coherence | `coherence` | Describes the model's ability to provide a coherent response and measures how well the generated text flows logically and makes sense. |
| Model-based | Safety | `safety` | Describes the model's level of safety, that is, whether the response contains any unsafe text. |
| Model-based | Fluency | `fluency` | Describes the model's language mastery. |
| Model-based | Groundedness | `groundedness` | Describes the model's ability to provide or reference information included only in the input text. |
| Model-based | Comet | `comet**` | Describes the model's ability on the quality of a translation against the reference. |
| Model-based | MetricX | `metricx**` | Describes the model's ability on the quality of a translation. |
| Computation-based | Tool use and function calling | `tool_call_valid`^*^ | Describes the model's ability to predict a valid tool call. |
| Computation-based | Tool use and function calling | `tool_name_match`^*^ | Describes the model's ability to predict a tool call with the correct tool name. Only the first tool call is inspected. |
| Computation-based | Tool use and function calling | `tool_parameter_key_match`^*^ | Describes the model's ability to predict a tool call with the correct parameter names. |
| Computation-based | Tool use and function calling | `tool_parameter_kv_match`^*^ | Describes the model's ability to predict a tool call with the correct parameter names and key values. |
| Computation-based | General text generation | `bleu`^*^ | Holds the result of an algorithm for evaluating the quality of the prediction, which has been translated from one natural language to another natural language. The quality of the prediction is considered to be the correspondence between a prediction parameter and its reference parameter. |
| Computation-based | General text generation | `exact_match`^*^ | Computes whether a prediction parameter matches a reference parameter exactly. |
| Computation-based | General text generation | `rouge_1`^*^ | Used to compare the provided prediction parameter against a reference parameter. |
| Computation-based | General text generation | `rouge_2`^*^ | Used to compare the provided prediction parameter against a reference parameter. |
| Computation-based | General text generation | `rouge_l`^*^ | Used to compare the provided prediction parameter against a reference parameter. |
| Computation-based | General text generation | `rouge_l_sum`^*^ | Used to compare the provided prediction parameter against a reference parameter. |

^*^ If you want to optimize your prompts using the
`question_answering_correctness` or computation-based evaluations, you must do
one of the following:

- Add a variable that represents the ground truth response for your prompts to your prompt template.
- If you don't have ground truth responses for your prompts, but you previously
used the prompts with a Google model and
achieved your targeted results, you can add the `source_model` parameter to
your configuration instead of adding ground truth responses.
When the `source_model` parameter is set, the data-driven optimizer runs your
sample prompts on the source model to generate the ground truth responses for
you. The `source_model` parameter should only be used for model upgrade or migration.

^**^ If you want to optimize your prompts using the `comet` or `metricx`, you must provide the `translation_source_field_name` parameter to your configuration which specifies the corresponding field name of the source text in the data. Also, the MetricX value has been modified to between 0 (worst) and 25 (best) to respect the larger-the-better property.

## Before you begin

To ensure that the Compute Engine default service account has the necessary
permissions to optimize prompts,

ask your administrator to grant the
following IAM roles to the Compute Engine default service account on the project:

Important: You must grant these roles to the Compute Engine default service account, not to your user account. Failure to grant the roles to the correct principal might result in permission errors.

- Agent Platform User (`roles/aiplatform.user`)
- Storage Object Admin (`roles/storage.objectAdmin`)
- Artifact Registry Reader (`roles/artifactregistry.reader`)
- If using custom metrics: Cloud Run Developer (`roles/run.developer`) Cloud Run Invoker (`roles/run.invoker`) Agent Platform Service Agent (`roles/aiplatform.serviceAgent`)

For more information about granting roles, see Manage access to projects, folders, and organizations.

Your administrator might also be able to give the Compute Engine default service account
the required permissions through custom
roles or other predefined
roles.

## Optimize prompts

You can optimize prompts in the following ways:

- using the Gemini Enterprise Agent Platform prompt optimizer in the Gemini Enterprise Agent Platform Console
- using the Agent Platform API
- running the Agent Platform prompt optimizer notebook.

To optimize prompts, choose which method
you want to use, then complete
the steps as described in detail in the following sections:

> [!TIP]
> Tip: We recommend running the Gemini Enterprise Agent Platform prompt optimizer in the Gemini Enterprise Agent Platform Console for first time users. The console provides a more interactive experience than the Agent Platform API.

1. Create a prompt template and system instructions
2. Prepare sample prompts
3. Optional: create custom metrics
4. Create a configuration
5. Run the prompt optimization job
6. Analyze results and iterate

### Create a prompt template and system instructions

Prompt templates define the format of all of your prompts through replaceable
variables. When you use a prompt template to optimize prompts, the
variables are replaced by the data in the prompt dataset.

Prompt template variables must meet the following requirements:

- Variables must be wrapped in curly-braces
- Variable names must not contain spaces or dashes `-`
- Variables that represent multimodal inputs must include the `MIME_TYPE` string
after the variable:

```
@@@MIME_TYPE

```

Replace `MIME_TYPE` with an
image,
video,
audio,
or
document
MIME type that is supported by the target model.

Create a prompt template and system instructions using one of the following
methods:

### Notebook

If you want to run the data-driven optimizer through the
notebook, create system instructions and a prompt template by doing the
following:

1. In Colab Enterprise, open the Gemini Enterprise Agent Platform prompt
optimizer notebook. Go to Gemini Enterprise Agent Platform prompt optimizer notebook
2. In the Create a prompt template and system instructions section, do
the following: In the SYSTEM_INSTRUCTION field, enter your system instructions.
For example:

```
Based on the following images and articles respond to the questions.'\n' Be concise,
and answer \"I don't know\" if the response cannot be found in the provided articles or images.

```

1. In the PROMPT_TEMPLATE field, enter your prompt template. For
example:

```
Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}

```

1. If you want to optimize your prompts using the
`question_answering_correctness` or computation-based evaluations, you
must do one of the following:

- Add the `{target}` variable to the prompt
template, to represent the prompt's ground truth response. For example:

```
Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}\n\n Answer: {target}

```

- If you don't have ground truth responses for your prompts, but you
previously used the prompts with a
Google model and achieved your
targeted results, you can add the `source_model` parameter to your
configuration instead of adding ground truth
responses. When the `source_model` parameter is set, the
data-driven optimizer runs your sample prompts on the
source model to generate the ground truth responses for you.

### SDK

If you want to run the data-driven optimizer through the SDK
without using the notebook, create text files for your prompt template and
system instructions by doing the following:

1. Create a text file for your system instructions.
2. In the text file, define your system instructions to the text file. For

```
Based on the following images and articles respond to the questions.'\n' Be concise, and answer \"I don't know\" if the response cannot be found in the provided articles or images.

```

1. Create a text file for your prompt template.
2. In the text file, define a prompt template that includes one or more
variables. For example:

```
Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}

```

must do one of the following: Add the `{target}` variable to the prompt

```
Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}\n\n Answer: {target}

```

### Prepare sample prompts

To get the best results from the data-driven optimizer, use
50-100 sample prompts.

- The tool can still be effective with as few as 5 sample prompts.
- The best samples include examples where the target model performs poorly and examples where the target model performs well.

> [!NOTE]
> Note: The optimizer's performance improves as you increase the number of sample prompts. If you notice poor performance for your set of sample prompts, consider adding more prompts and rerunning the tool.

The sample prompts contain the data that replaces the variables in the prompt
template. You can use a JSONL or CSV file to store your sample prompts.

### JSONL file

1. Create a JSONL file.
2. In the JSONL file, add the prompt data that replaces each variable. For

```
{"article_1": "The marine life …", "image_1": "gs://path_to_image", "Question": "What are some most effective ways to reduce ocean pollution?", "target": "The articles and images don't answer this question."}

{"article_1": "During the year …", "image_1": "gs://path_to_image", "Question": "Who was the president in 2023?", "target": "Joe Biden"}

```

1. Upload the JSONL file to a Cloud Storage bucket.

### CSV file

1. Create a CSV file.
2. In the first row, add the variables from your prompt template.
3. In the following rows, add the sample data that replaces each variable.
4. Upload the CSV file to a Cloud Storage bucket.

### Optional: Create custom metrics

> Note: Custom metrics require you to deploy a Cloud Run function. Cloud Run is a separate Google Cloud product with separate pricing.

Create a custom metric by doing the following:

1. Create a text file named `requirements.txt`.
2. In the `requirements.txt` file, define the required libraries for the custom
evaluation metric function. All functions require the `functions-framework`
package. For example, the `requirements.txt` file for a custom metric that computes
ROUGE-L would look similar to the following:

```
functions-framework==3.*
rouge-score

```

1. Create a Python file named `main.py`.
2. In the `main.py` file, write your custom evaluation function. The function
must accept the following: HTTP POST requests JSON input that contains the `response`, which is the output from the LLM, and the `reference`, which is the ground truth response for the prompt if provided in the prompt dataset. For example, the `main.py` file for a custom metric that computes ROUGE-L
would look similar to the following:

```py
from typing import Any
import json
import functions_framework
from rouge_score import rouge_scorer

# Register an HTTP function with the Functions Framework
@functions_framework.http
def main(request):
   request_json = request.get_json(silent=True)
   if not request_json:
       raise ValueError('Can not find request json.')

   """Extract 'response' and 'reference' from the request payload. 'response'
   represents the model's response, while 'reference' represents the ground
   truth response."""
   response = request_json['response']
   reference = request_json['reference']

   # Compute ROUGE-L F-measure
   scorer = rouge_scorer.RougeScorer(['rougeL'], use_stemmer=True)
   scores = scorer.score(reference, response)
   final_score = scores['rougeL'].fmeasure

   # Return the custom score in the response
   return json.dumps({
       # The following key is the CUSTOM_METRIC_NAME that you pass to the job
       'custom_accuracy': final_score,
       # The following key is optional
       'explanation': 'ROUGE_L F-measure between reference and response',
   })

```

1. Deploy your custom evaluation function as a Cloud Run function by
running the
`gcloud functions deploy` command:

```
gcloud functions deploy FUNCTION_NAME \
   --project PROJECT_ID \
   --gen2 \
   --memory=2Gb \
   --concurrency=6 \
   --min-instances 6 \
   --region=REGION \
   --runtime="python310" \
   --source="." \
   --entry-point main \
   --trigger-http \
   --timeout=3600 \
   --quiet

```

Replace the following:

- `FUNCTION_NAME`: the name for the custom evaluation metric.
- `PROJECT_ID`: your project ID.
- `REGION`: the region where you want to deploy the function. It should be the same region as using the target model.

### Create a configuration

The data-driven optimizer configuration specifies the
parameters
you want to set for your prompt optimization job.

Note that Gemma models don't have managed APIs on Gemini Enterprise Agent Platform. To
use a Gemma model, you must first deploy it in
Gemini Enterprise Agent Platform or on your local machine. For more information about deploying
in Gemini Enterprise Agent Platform, see
Use Gemma open models.
For more information about deploying to your local machine, see
Run Gemma with Ollama.

Create a configuration using one of the following options:

### Notebook

notebook, create a configuration by doing the following:

1. In Colab Enterprise, open the data-driven
optimizer notebook. Go to Gemini Enterprise Agent Platform prompt optimizer notebook
2. In the Configure project settings section, do the following: In the PROJECT_ID field, enter your project ID. In the LOCATION field, enter the location where you want to run the data-driven optimizer. In the OUTPUT_PATH field, enter the URI for the Cloud Storage bucket where you want the data-driven optimizer to write the optimized system instructions and/or few shot examples. For example, `gs://bucket-name/output-path`. In the INPUT_PATH field, enter the URI for the sample prompts in your Cloud Storage bucket. For example, `gs://bucket-name/sample-prompts.jsonl`.
3. In the Configure optimization settings section, do the following: In the TARGET_MODEL field, enter the model for which you want to optimize prompts. In the THINKING_BUDGET field, enter the thinking budget for the target model you want to optimize prompts. Default to -1, which means no thinking for non-thinking models and auto thinking for thinking models like Gemini-2.5. See Thinking to learn about manual budget settings. In the OPTIMIZATION_MODE , enter the optimization mode you want to use. Must be one of the following:`instruction`: Optimizes the system instruction.`demonstration`: Selects sample prompts to add to the system instructions as few-shot examples.`instruction_and_demo`: Performs both of the above actions. In the EVAL_METRIC field, enter an evaluation metric that you want to optimize your prompts for. Optional: In the SOURCE_MODEL field, enter the Google model that the system instructions and prompts were previously used with. When the `source_model` parameter is set, the data-driven optimizer runs your sample prompts on the source model to generate the ground truth responses for you, for evaluation metrics that require ground truth responses. If you didn't previously run your prompts with a Google model or you didn't achieve your target results, add ground truth responses to your prompt instead. For more information, see the Create a prompt and system instructions section of this document.
4. Optional: In the Configure advanced optimization settings section,
you can additionally add any of the optional parameters to your
configuration.

View optional parameters

- In the NUM_INST_OPTIMIZATION_STEPS field, enter the number of iterations that the data-driven optimizer uses in instruction optimization mode. The runtime increases linearly as you increase this value. Must be an integer between `10` and `20`. If left unset, the default is `10`.
- In the NUM_DEMO_OPTIMIZATION_STEPS field, enter the number of demonstrations that the data-driven optimizer evaluates. Used with `demonstration` and `instruction_and_demo` optimization mode. Must be an integer between `10` and `30`. If left unset, the default is `10`.
- In the NUM_DEMO_PER_PROMPT field, enter the number of demonstrations generated per prompt. Must be an integer between `2` and and the total number of sample prompts - 1. If left unset, the default is `3`.
- In the TARGET_MODEL_QPS field, enter the queries per second (QPS) that the data-driven optimizer sends to the target model. The runtime decreases linearly as you increase this value. Must be a float that is `3.0` or greater, but less than the QPS quota you have on the target model. If left unset, the default is `3.0`.
- In the SOURCE_MODEL_QPS field, enter the queries per second (QPS) that the data-driven optimizer sends to the source model. Must be a float that is `3.0` or greater, but less than the QPS quota you have on the source model. If left unset, the default is `3.0`.
- In the EVAL_QPS field, enter the queries per second (QPS) that the data-driven optimizer sends to the Gen AI evaluation service or the Cloud Run function. For model based metrics, must be a float that is `3.0` or greater. If left unset, the default is `3.0`. For custom metrics, must be a float that is `3.0` or greater. This determines the rate at which the data-driven optimizer calls your custom metric Cloud Run functions.
- If you want to use more than one evaluation metric, do the following: In the EVAL_METRIC_1 field, enter an evaluation metric that you want to use. In the EVAL_METRIC_1_WEIGHT field, enter the weight that you want the data-driven optimizer to use when it runs the optimization. In the EVAL_METRIC_2 field, enter an evaluation metric that you want to use. In the EVAL_METRIC_2_WEIGHT field, enter the weight that you want the data-driven optimizer to use when it runs the optimization. In the EVAL_METRIC_3 field, optionally enter an evaluation metric that you want to use. In the EVAL_METRIC_3_WEIGHT field, optionally enter the weight that you want the data-driven optimizer to use when it runs the optimization. In the METRIC_AGGREGATION_TYPE field, enter the weight that you want the data-driven optimizer to use when it runs the optimization.
- In the PLACEHOLDER_TO_VALUE field, enter the information that replaces any variables in the system instructions. Information included within this flag is not optimized by the data-driven optimizer.
- In the RESPONSE_MIME_TYPE field, enter the MIME response type that the target model uses. Must be one of `text/plain` or `application/json`. If left unset, the default is `text/plain`.
- In the TARGET_LANGUAGE field, enter the language of the system instructions. If left unset, the default is English.

### SDK

SDK, create a JSON file with the parameters you want to use to
optimize prompts by doing the following:

1. Create a JSON file with the parameters that you want to use to optimize
your prompts. Each configuration file requires the following parameters.
The configuration varies slightly between
`vertexai.types.PromptOptimizerMethod.OPTIMIZATION_TARGET_GEMINI_NANO`
and `vertexai.types.PromptOptimizerMethod.VAPO`. VAPO

```
{
"project": "PROJECT_ID",
"system_instruction": "SYSTEM_INSTRUCTION",
"prompt_template": "PROMPT_TEMPLATE",
"target_model": "TARGET_MODEL",
"thinking_budget": "THINKING_BUDGET",
EVALUATION_METRIC_PARAMETERS,
"optimization_mode": "OPTIMIZATION_MODE",
"input_data_path": "SAMPLE_PROMPT_URI",
"output_path": "OUTPUT_URI"
}

```

### GEMINI_NANO

```
"target_model_endpoint_url": "BASE_URL",

```

- `SYSTEM_INSTRUCTION`: the system instructions you want to optimize.
- `PROMPT_TEMPLATE`: the prompt template.
- `TARGET_MODEL`: the model for which you want to optimize prompts. For example, `gemma-3n-e4b-it`.
- `BASE_URL`: The base URL of the locally-deployed model. For example, `http://localhost:8000/v1`. Required for `OPTIMIZATION_TARGET_GEMINI_NANO` configuration. If you aren't using a locally deployed model, remove the `target_model_endpoint_url` field from your configuration.
- `THINKING_BUDGET`: the thinking budget for the target model that you want to optimize prompts. Defaults to -1, which means no thinking for non-thinking models and auto thinking for thinking models like Gemini-2.5. To learn about manual budget settings, see Thinking. Note that some models, like Gemma models, don't support `thinking_budget`.
- `EVALUATION_METRIC_PARAMETERS`: the parameters
you specify depend on how many evaluation metrics you're using, and
whether your metrics are standard or custom: Single standard metric If you're using a single
standard evaluation metric,
use the following parameter:

```
 "eval_metric": "EVALUATION_METRIC",

```

```
 Replace `EVALUATION_METRIC` with the
 metric that you want to optimize your prompts for.

 ### Single custom metric

 If you're using a single
 [custom evaluation metric](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/data-driven-optimizer#custom-evaluation-metrics), use the
 following parameters:

```

```
"eval_metric": "custom_metric",
"custom_metric_name": "CUSTOM_METRIC_NAME",
"custom_metric_cloud_function_name": "FUNCTION_NAME",

```

```
 - `CUSTOM_METRIC_NAME`: the metric name, as defined by the key that corresponds with the `final_score`. For example, `custom_accuracy`.
 - `FUNCTION_NAME`: the name of the Cloud Run function that you previously deployed.

 ### Multiple standard metrics

 If you're using multiple standard evaluation metrics,
 use the following parameters:

```

```
"eval_metrics_types": [EVALUATION_METRIC_LIST],
"eval_metrics_weights": [EVAL_METRICS_WEIGHTS],
"aggregation_type": "METRIC_AGGREGATION_TYPE",

```

```
 - `EVALUATION_METRIC_LIST`: a list of evaluation metrics. Must be an array. For example, `"bleu", "summarization_quality"`.
 - `EVAL_METRICS_WEIGHTS`: the weight for each metric. Must be an array and have the same length as `EVALUATION_METRIC_LIST`.
 - `METRIC_AGGREGATION_TYPE`: the type of aggregation used for the evaluation metrics. Must be one of `weighted_sum` or `weighted_average`. If left unset, the default is `weighted_sum`.

 ### Multiple standard \& custom metrics

 If you're using multiple evaluation metrics that include a mix
 of a single custom metric and one or more standard metrics, use
 the following parameters:

 > **Note:** Only one of the metrics that you use can be a custom metric. The others must be standard metrics.

```

```
"eval_metrics_types": ["custom_metric", EVALUATION_METRIC_LIST],

```

```
 - `EVALUATION_METRIC_LIST`: a list of the standard evaluation metrics. Must be an array. For example, `"bleu", "summarization_quality"`.
 - `EVAL_METRICS_WEIGHTS`: the weight for each metric. Must be an array.
 - `METRIC_AGGREGATION_TYPE`: the type of aggregation used for the evaluation metrics. Must be one of `weighted_sum` or `weighted_average`. If left unset, the default is `weighted_sum`.
 - `CUSTOM_METRIC_NAME`: the metric name, as defined by the key that corresponds with the `final_score`. For example, `custom_accuracy`.

```

- `OPTIMIZATION_MODE`: the optimization mode. Must be one of the following:`instruction`: Optimizes the system instruction.`demonstration`: Selects sample prompts to add to the system instructions as few-shot examples.`instruction_and_demo`: Performs both of the above actions.
- `SAMPLE_PROMPT_URI`: the URI for the sample
prompts in your Cloud Storage bucket. For example,
`gs://bucket-name/sample-prompts.jsonl`.
- `OUTPUT_URI`: the URI for the Cloud Storage
bucket where you want the data-driven optimizer
to write the optimized system instructions and/or few shot examples.
For example, `gs://bucket-name/output-path`.

1. You can additionally add any of the optional parameters to your
configuration file. Optional parameters are broken down into 5 categories: Optimization process parameters. These parameters control the overall optimization process, including its duration and the number of optimization iterations it runs, which directly impacts the quality of optimizations. Model selection and location parameters. These parameters specify which models the data-driven optimizer uses and the locations it uses those models in. Latency (QPS) parameters. These parameters control QPS, impacting the speed of the optimization process. Other. Other parameters that control the structure and content of prompts. View optional parameters

```
"num_steps": NUM_INST_OPTIMIZATION_STEPS,
"num_demo_set_candidates": "NUM_DEMO_OPTIMIZATION_STEPS,
"demo_set_size": NUM_DEMO_PER_PROMPT,
"target_model_location": "TARGET_MODEL_LOCATION",
"source_model": "SOURCE_MODEL",
"source_model_location": "SOURCE_MODEL_LOCATION",
"target_model_qps": TARGET_MODEL_QPS,
"eval_qps": EVAL_QPS,
"source_model_qps": SOURCE_MODEL_QPS,
"response_mime_type": "RESPONSE_MIME_TYPE",
"language": "TARGET_LANGUAGE",
"placeholder_to_content": "PLACEHOLDER_TO_CONTENT",
"data_limit": DATA_LIMIT

```

```
 - Optimization process parameters:

   - `NUM_INST_OPTIMIZATION_STEPS`: the number of iterations that the data-driven optimizer uses in instruction optimization mode. The runtime increases linearly as you increase this value. Must be an integer between `10` and `20`. If left unset, the default is `10`.
   - `NUM_DEMO_OPTIMIZATION_STEPS`: the number of demonstrations that the data-driven optimizer evaluates. Used with `demonstration` and `instruction_and_demo` optimization mode. Must be an integer between `2` and the total number of sample prompts - 1. If left unset, the default is `10`.
   - `NUM_DEMO_PER_PROMPT`: the number of demonstrations generated per prompt. Must be an integer between `3` and `6`. If left unset, the default is `3`.
 - Model selection and location parameters:

   - `TARGET_MODEL_LOCATION`: the [location](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) that you want to run the target model in. If left unset, the default is `us-central1`.
   - `SOURCE_MODEL`: the [Google model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models) that the system instructions and prompts were previously used with. When the `source_model` parameter is set, the data-driven optimizer runs your sample prompts on the source model to generate the ground truth responses for you, for evaluation metrics that require ground truth responses. If you didn't previously run your prompts with a Google model or you didn't achieve your target results, add ground truth responses to your prompt instead. For more information, see the [Create a prompt and system instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/data-driven-optimizer#template-si) section of this document.
   - `SOURCE_MODEL_LOCATION`: the [location](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) that you want to run the source model in. If left unset, the default is `us-central1`.
 - Latency (QPS) parameters:

   > **Note:** You must set a QPS that is lower than or equal to the QPM quota that is available to you, or your job will fail. To convert QPM quota to QPS, divide your QPM by 60. For example, a QPM quota of 600 is equivalent to a QPS of 10 (`600/60 = 10`).

   - `TARGET_MODEL_QPS`: the queries per second (QPS) that the data-driven optimizer sends to the target model. The runtime decreases linearly as you increase this value. Must be a float that is `3.0` or greater, but less than the QPS quota you have on the target model. If left unset, the default is `3.0`.
   - `EVAL_QPS`: the queries per second (QPS) that the data-driven optimizer sends to the Gen AI evaluation service or the Cloud Run function.
     - For model based metrics, must be a float that is `3.0` or greater. If left unset, the default is `3.0`.
     - For custom metrics, must be a float that is `3.0` or greater. This determines the rate at which the data-driven optimizer calls your custom metric Cloud Run functions.
   - `SOURCE_MODEL_QPS`: the queries per second (QPS) that the data-driven optimizer sends to the source model. Must be a float that is `3.0` or greater, but less than the QPS quota you have on the source model. If left unset, the default is `3.0`.
 - Other parameters:

   - `RESPONSE_MIME_TYPE`: the [MIME response type](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/samples/generativeaionvertexai-gemini-controlled-generation-response-schema) that the target model uses. Must be one of `text/plain` or `application/json`. If left unset, the default is `text/plain`.
   - `TARGET_LANGUAGE`: the language of the system instructions. If left unset, the default is English.
   - `PLACEHOLDER_TO_CONTENT`: the information that replaces any variables in the system instructions. Information included within this flag is not optimized by the data-driven prompt optimizer.
   - `DATA_LIMIT`: the amount of data used for validation. The runtime increases linearly with this value. Must be an integer between `5` and `100`. If left unset, the default is `100`.

```

1. Upload the JSON file to a Cloud Storage bucket.

### Run prompt optimizer

Run the data-driven optimizer using one of the following options:

### Notebook

Run the data-driven optimizer through the notebook, by doing the following:

optimizer notebook. Go to data-driven optimizer notebook
2. In the Run prompt optimizer section, click
play_circle Run cell. The data-driven optimizer runs.

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: the location where you want to run the Gemini Enterprise Agent Platform prompt optimizer.
- JOB_NAME: a name for the Gemini Enterprise Agent Platform prompt optimizer job.
- PATH_TO_CONFIG: the URI of the configuration file in your Cloud Storage bucket. For example, `gs://bucket-name/configuration.json`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/customJobs

```

Request JSON body:

```
  "displayName": "JOB_NAME",
  "jobSpec": {
    "workerPoolSpecs": [
        "machineSpec": {
          "machineType": "n1-standard-4"
        },
        "replicaCount": 1,
        "containerSpec": {
          "imageUri": "us-docker.pkg.dev/vertex-ai-restricted/builtin-algorithm/apd:preview_v1_0",
          "args": ["--config=PATH_TO_CONFIG""]
    ]

```

To send your request, choose one of these options:

#### curl

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` , or by using Cloud Shell, which automatically logs you into the `gcloud` CLI . You can check the currently active account by running `gcloud auth list`.

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/customJobs"

```

#### PowerShell

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` . You can check the currently active account by running `gcloud auth list`.

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/customJobs" | Select-Object -Expand Content

```

The response looks similar to the following:

#### Response

```
  "name": "projects/PROJECT_ID/locations/LOCATION/customJobs/JOB_ID",
          "replicaCount": "1",
          "diskSpec": {
            "bootDiskType": "pd-ssd",
            "bootDiskSizeGb": 100
            "imageUri": "us-docker.pkg.dev/vertex-ai-restricted/builtin-algorithm/apd:preview_v1_0"
            "args": [
            "--config=https://storage.mtls.cloud.google.com/testing-apd/testing-config.json"
  "state": "JOB_STATE_PENDING",
  "createTime": "2020-09-15T19:09:54.342080Z",
  "startTime": "2020-09-15T19:13:42.991045Z",

```

### SDK

Run the data-driven optimizer through the SDK, by adding the following code
sections into your Colab or Notebook.

- `LOCATION`: the location where you want to run the data-driven optimizer.
- `PROJECT_NUMBER`: your project number, available in the Google Cloud console.
- `PATH_TO_CONFIG`: the URI of the configuration file in Cloud Storage. For example, `gs://bucket-name/configuration.json`. Authenticate from google.colab import auth
auth.authenticate_user(project_id=PROJECT_ID) Set the Service Account SERVICE_ACCOUNT = f"{PROJECT_NUMBER}-compute@developer.gserviceaccount.com" Import Agent Platform SDK and Setup import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)#Create the Agent Platform Client
client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(project=PROJECT_ID, location=LOCATION) Setup the job dictionary vapo_config = {
'config_path': PATH_TO_CONFIG,
'service_account': SERVICE_ACCOUNT,
'wait_for_completion': True,
}#Start the Agent Platform Prompt Optimizer
client = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.prompt_optimizer.html.optimize(method=https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.PromptOptimizerMethod.html.VAPO, config=vapo_config)

To use Gemma model as the target model, make the following changes:

```
nano_config = vertexai.types.PromptOptimizerConfig(
    config_path="gs://sample-bucket/config_nano.json",
    project_number=project_number,
    wait_for_completion=True
    )
# Simpler version
# nano_config = {
#     "config_path": "gs://sample-bucket/config_nano.json",
#     "service_account": service_account,
#     "wait_for_completion": True
#     }
logging.basicConfig(encoding='utf-8', level=logging.INFO, force=True)

client.prompt_optimizer.optimize(
    method=vertexai.types.PromptOptimizerMethod.OPTIMIZATION_TARGET_GEMINI_NANO,
    config=nano_config

```

Once the optimization completes, examine the output artifacts at the output location specified in the config.

### Analyze results and iterate

After you run the data-driven optimizer review the job's progress
using one of the following options:

### Notebook

If you want to view the results of the data-driven optimizer
through the notebook, do the following:

1. Open the Gemini Enterprise Agent Platform prompt optimizer notebook.
2. In the Inspect the results section, do the following: In the RESULT_PATH field, add the URI of the Cloud Storage
bucket that you configured the data-driven optimizer to
write results to. For example, `gs://bucket-name/output-path`. Click play_circle
Run cell.

### Console

1. In the Google Cloud console, in the Agent Platform section, go
to the Training pipelines page. Go to Training pipelines
2. Click the Custom jobs tab. data-driven optimizer's
custom training job appears in the list along with its status.

When the job is finished, review the optimizations by doing the following:

1. In the Google Cloud console, go to the Cloud Storage Buckets
page: Go to Buckets
2. Click the name of your Cloud Storage bucket.
3. Navigate to the folder that has the same name as the optimization mode
you used to evaluate the prompts, either `instruction` or
`demonstration`. If you used `instruction_and_demo` mode, both folders
appear. The `instruction` folder contains the results from the system
instruction optimization, while the `demonstration` folder contains the
results from the `demonstration` optimization and the optimized system
instructions. The folder contains the following files:`config.json`: the complete configuration that the Gemini Enterprise Agent Platform prompt optimizer used.`templates.json`: each set of system instructions and/or few shot examples that the data-driven optimizer generated and their evaluation score.`eval_results.json`: the target model's response for each sample prompt for each set of generated system instructions and/or few shot examples and their evaluation score.`optimized_results.json`: the best performing system instructions and/or few shot examples and their evaluation score.
4. To view the optimized system instructions, view the
`optimized_results.json` file.

## Best practices

- Preview models are only supported through the `global` region and the Vertex Custom Job doesn't support `global` as a region. Thus, don't use VAPO to optimize the preview models as the target model.
- For GA models, the users can select the region-specific locations, such as `us-central1` or `europe-central2` instead of `global` to comply with their data residency requirement.

## What's next

- Try the Gemini Enterprise Agent Platform prompt optimizer SDK notebook.
- Learn about responsible AI best practices and Agent Platform's safety filters.
- Learn more about prompting strategies.
- Explore examples of prompts in the Prompt gallery.
