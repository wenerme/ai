> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

After you create an evaluation dataset, the next step is to define the metrics
used to measure model performance. Generative AI models can create applications
for a wide range of tasks, and the Gen AI evaluation service uses a test-driven
framework that transforms evaluation from subjective ratings into objective,
actionable results.

For more information about the metric types, see the
[Evaluation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview#metrics)
section on the Gen AI evaluation service overview page.

#### General quality metric

You can access adaptive rubrics through the SDK. We recommend starting with `GENERAL_QUALITY` as the default.

`GENERAL_QUALITY` generates a set of rubrics covering a variety of tasks such as instruction following, formatting, tone, style, depending on the input prompt. You can combine rubric generation with validation in the following line of code:

    from vertexai import types

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.RubricMetric.GENERAL_QUALITY,
        ],
    )

You can generate rubrics separately (to review or re-use them across models and agents) before using them to evaluate model responses:

    from vertexai import types

    # Use GENERAL_QUALITY recipe to generate rubrics, and store them
    # as a rubric group named "general_quality_rubrics".
    data_with_rubrics = client.evals.generate_rubrics(
        src=eval_dataset_df,
        rubric_group_name="general_quality_rubrics",
        predefined_spec_name=types.RubricMetric.GENERAL_QUALITY,
    )

    # Specify the group of rubrics to use for the evaluation.
    eval_result = client.evals.evaluate(
        dataset=data_with_rubrics,
        metrics=[types.RubricMetric.GENERAL_QUALITY(
          rubric_group_name="general_quality_rubrics",
        )],
    )

You can also guide `GENERAL_QUALITY` with natural language `guidelines` to focus rubric generation on the criteria that are most important to you. The Gen AI evaluation service then generates rubrics covering both its default tasks and the guidelines you specify.

    from vertexai import types

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.RubricMetric.GENERAL_QUALITY(
                metric_spec_parameters={
                    "guidelines": "The response must maintain a professional tone and must not provide financial advice."
                }
            )
        ],
    )

#### Targeted quality metrics

If you need to evaluate a more targeted aspect of model quality, you can use metrics that generate rubrics focused on a specific area. For example:

    from vertexai import types

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.RubricMetric.TEXT_QUALITY,
            types.RubricMetric.INSTRUCTION_FOLLOWING,
        ],
    )

The Gen AI evaluation service offers the following types of adaptive rubrics:

- `INSTRUCTION_FOLLOWING`: Measures how well the response adheres to the specific constraints and instructions in the prompt.

- `TEXT_QUALITY`: Focuses specifically on the linguistic quality of the response, assessing fluency, coherence, and grammar.

Multi-turn conversation

- `multi_turn_general_quality`: Evaluates overall conversational quality in a multi-turn dialogue.

- `multi_turn_text_quality`: Evaluates the text quality of the responses within a multi-turn dialogue.

Agent evaluation

- `final_response_reference_free`: Evaluates the quality of an agent's final answer without needing a reference answer.

- `final_response_quality`: Uses adaptive rubrics to evaluate the quality of an
  agent's final answer based on the agent's configuration and tool usage.

- `hallucination`: Evaluates whether the text responses by an agent are grounded
  based on the agent's configuration and tool usage.

- `tool_use_quality`: Evaluates the correctness of function calls made by the
  agent to address a user prompt.

For more details about targeted adaptive rubrics, see [Adaptive rubric details](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details).

### Static rubrics

A static rubric applies a single, fixed set of scoring guidelines to every example in your dataset. This score-driven approach is useful when you need to measure performance against a consistent benchmark across all prompts.

For example, the following static rubric rates text quality on a 1-5 scale:

    5: (Very good). Exceptionally clear, coherent, fluent, and concise. Fully adheres to instructions and stays grounded.
    4: (Good). Well-written, coherent, and fluent. Mostly adheres to instructions and stays grounded. Minor room for improvement.
    3: (Ok). Adequate writing with decent coherence and fluency. Partially fulfills instructions and may contain minor ungrounded information. Could be more concise.
    2: (Bad). Poorly written, lacking coherence and fluency. Struggles to adhere to instructions and may include ungrounded information. Issues with conciseness.
    1: (Very bad). Very poorly written, incoherent, and non-fluent. Fails to follow instructions and contains substantial ungrounded information. Severely lacking in conciseness.

The Gen AI evaluation service provides the following static rubric metrics:

- `GROUNDING`: Checks for factuality and consistency against a provided source text (ground truth). This metric is crucial for RAG systems.

- `SAFETY`: Assesses the model's response for violations of safety policies, such as hate speech or dangerous content.

You can also use [metric prompt templates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/metrics-templates) such as `FLUENCY`.

    from vertexai import types

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.RubricMetric.SAFETY,
            types.RubricMetric.GROUNDING,
            types.RubricMetric.FLUENCY,
        ],
    )

#### Customizing static rubrics

For highly specialized needs, you can create your own static rubric. This method offers maximum control but requires you to carefully design the evaluation prompt to ensure consistent and reliable results. We recommend using [guidelines with `GENERAL_QUALITY`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval#general-quality-metric) before customizing static rubrics.

    # Define a custom metric to evaluate language simplicity
    simplicity_metric = types.LLMMetric(
        name='language_simplicity',
        prompt_template=types.MetricPromptBuilder(
            instruction="Evaluate the story's simplicity for a 5-year-old.",
            criteria={
                "Vocabulary": "Uses simple words.",
                "Sentences": "Uses short sentences.",
            },
            rating_scores={
                "5": "Excellent: Very simple, ideal for a 5-year-old.",
                "4": "Good: Mostly simple, with minor complex parts.",
                "3": "Fair: Mix of simple and complex; may be challenging for a 5-year-old.",
                "2": "Poor: Largely too complex, with difficult words/sentences.",
                "1": "Very Poor: Very complex, unsuitable for a 5-year-old."
            }
        )
    )

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            simplicity_metric
        ],
    )

## Computation-based metrics

Computation-based metrics use deterministic algorithms to score a model's response by comparing it to a reference answer. They require a ground truth in your dataset and are ideal for tasks where a "correct" answer is well-defined.

- **Recall-Oriented Understudy for Gisting Evaluation (rouge_l, rouge_1)**: Measures the overlap of n-grams (contiguous sequences of words) between the model's response and a reference text. It's commonly used for evaluating text summarization.

- **Bilingual Evaluation Understudy (bleu)**: Measures how similar a response is to a high-quality reference text by counting matching n-grams. It is the standard metric for translation quality but can also be used for other text generation tasks.

- **Exact Match (exact_match)**: Measures the percentage of responses that are identical to the reference answer. This is useful for fact-based question-answering or tasks where there is only one correct response.

    from vertexai import types

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.Metric(name='bleu'),
            types.Metric(name='rouge_l'),
            types.Metric(name='exact_match')
        ],
    )

## Custom function metric

You can also implement custom evaluation logic by passing a custom Python function to the `custom_function` parameter. The Gen AI evaluation service executes this function for each row of your dataset.

    # Define a custom function to check for the presence of a keyword
    def contains_keyword(instance: dict) -> dict:
        keyword = "magic"
        response_text = instance.get("response", "")
        score = 1.0 if keyword in response_text.lower() else 0.0
        return {"score": score}

    keyword_metric = types.Metric(
        name="keyword_check",
        custom_function=contains_keyword
    )

    eval_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[keyword_metric]
    )

## Remote custom function metric

In addition to running custom evaluation logic locally, you can implement custom evaluation logic that executes securely in a remote sandboxed environment. This is useful when you want to integrate evaluation as part of your model tuning workflow, or when you have a user-specific scenario that is not covered by the existing eval metrics. You can do this by passing a Python code snippet as a string to the `remote_custom_function` parameter of the `Metric` class. The Gen AI evaluation service executes this function for each row of your dataset remotely.

    import pandas as pd
    from vertexai import types

    code_snippet = """
    def evaluate(instance):
        if instance['response'] == instance['reference']:
            return 1.0
        return 0.0
    """

    custom_metric = types.Metric(
        name="my_custom_code_metric",
        remote_custom_function=code_snippet,
    )

    prompts_df = pd.DataFrame(
        {
            "prompt": ["What is 2+2?", "What is 3+3?"],
            "response": ["4", "5"],
            "reference": ["4", "6"],
        }
    )

    eval_dataset = types.EvaluationDataset(
        eval_dataset_df=prompts_df,
        candidate_name="test_model",
    )

    evaluation_result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[custom_metric],
    )

> [!NOTE]
> **Note:** The custom function snippet must define a function named `evaluate` that takes an `instance` dictionary as an argument and returns a `float` score.

### Evaluation instance inputs

The `evaluate` function takes an `instance` dictionary as its argument. `instance` represents the evaluation instance, and any fields populated in the [EvaluationInstance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations/evaluateInstances#EvaluationInstance) are available to the function as `instance[field_name]`. The available fields include:

- `prompt`: The user prompt given to the model.
- `response`: The output generated by the model.
- `reference`: The ground truth used to compare against the response.
- `rubric_groups`: Named groups of rubrics associated with the prompt.
- `other_data`: Other data used to populate placeholders based on their key.
- `agent_eval_data`: Data specific to agent evaluations such as agent configurations and traces.

### Technical constraints

- **Execution environment:** Custom code executes in a sandboxed environment with no network access.
- **Execution time limit:** The grading execution itself is limited to 1 minute.
- **Memory limit:** The total size of uploaded code, combined with any data loaded during execution, must not exceed 1.5 GB.

The following third-party packages are available at execution time:

    altair
    chess
    cv2
    deepdiff
    editdistance
    jsonschema
    matplotlib
    mpmath
    nltk
    numpy
    pandas
    pdfminer
    pydantic
    rdkit
    reportlab
    scipy
    seaborn
    sklearn
    sqlparse
    statsmodels
    striprtf
    sympy
    tabulate

## What's next

- [Details for managed rubric-based
  metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details).

- [Prepare your evaluation dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-dataset).

- [Run an evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/run-evaluation).
