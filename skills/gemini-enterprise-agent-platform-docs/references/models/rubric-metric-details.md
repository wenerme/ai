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

This page provides a full list of managed rubric-based metrics offered by the Gen AI evaluation service, which you can use in the GenAI Client in Vertex AI SDK.

For more information about test-driven evaluation, see [Define your evaluation metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval).

## Overview

The Gen AI evaluation service offers a list of managed rubric-based metrics for the test-driven evaluation framework:

- For metrics with adaptive rubrics, most of them include both the workflow for rubric generation for each prompt and rubric validation. You can run them separately if needed. See [Run an evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/run-evaluation) for details.

- For metrics with static rubrics, no per-prompt rubrics are generated. For details regarding the intended outputs, see [Metric details](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#managed-metrics-details).

Each managed rubric-based metric has a versioning number. The metric uses the latest version by default, but you can pin to a specific version if needed:

    from vertexai import types

    text_quality_metric = types.RubricMetric.TEXT_QUALITY
    general_quality_v1 = types.RubricMetric.GENERAL_QUALITY(version='v1')

## Backward compatibility

For metrics offered as a [Metric prompt templates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/metrics-templates), you can still access the pointwise metrics through the GenAI Client in Vertex AI SDK through the same approach. Pairwise metrics are not supported by the GenAI Client in Vertex AI SDK, but see [Run an evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/run-evaluation) to compare two models in the same evaluation.

    from vertexai import types

    # Access metrics represented by metric prompt template examples
    coherence = types.RubricMetric.COHERENCE
    fluency = types.RubricMetric.FLUENCY

## Managed metrics details

This section lists managed metrics with details such as their type, required inputs, and expected output:

- [General quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#general-quality)
- [Text quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#text-quality)
- [Instruction following](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#instruction-following)
- [Grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#grounding)
- [Safety](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#safety)
- [Multi-turn general quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#multi-turn-general-quality)
- [Multi-turn text quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#multi-turn-text-quality)
- [Agent final response match](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-final-response-match)
- [Agent final response reference free](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-final-response-reference-free)
- [Agent final response quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-final-response-quality)
- [Agent hallucination](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-hallucination)
- [Agent tool use quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-tool-use-quality)
- [Agent multi-turn task success](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-multi-turn-task-success)
- [Agent multi-turn tool use quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-multi-turn-tool-use-quality)
- [Agent multi-turn trajectory quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#agent-multi-turn-trajectory-quality)
- [Gecko text-to-image quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#gecko-t2i)
- [Gecko text-to-video quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/rubric-metric-details#gecko-t2v)

### General quality

|---|---|
| **Latest version** | `general_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | A comprehensive adaptive rubrics metric that evaluates the overall quality of a model's response. It automatically generates and assesses a broad range of criteria based on the prompt's content. This is the recommended starting point for most evaluations. |
| **How to access in SDK** | `types.RubricMetric.GENERAL_QUALITY` |
| **Input** | - `prompt` - `response` - (Optional) `rubric_groups` If you have rubrics already generated, you can provide them directly for evaluation. |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 6 calls to Gemini 2.5 Flash |

### Text quality

|---|---|
| **Latest version** | `text_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | A targeted adaptive rubrics metric that specifically evaluates the linguistic quality of the response. It assesses aspects like fluency, coherence, and grammar. |
| **How to access in SDK** | `types.RubricMetric.TEXT_QUALITY` |
| **Input** | - `prompt` - `response` - (Optional) `rubric_groups` If you have rubrics already generated, you can provide them directly for evaluation. |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 6 calls to Gemini 2.5 Flash |

### Instruction following

|---|---|
| **Latest version** | `instruction_following_v1` |
| **Type** | Adaptive rubrics |
| **Description** | A targeted adaptive rubrics metric that measures how well the response adheres to the specific constraints and instructions given in the prompt. |
| **How to access in SDK** | `types.RubricMetric.INSTRUCTION_FOLLOWING` |
| **Input** | - `prompt` - `response` - (Optional) `rubric_groups` If you have rubrics already generated, You can provide them directly for evaluation. |
| **Output** | - `score` (passing rate) - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 6 calls to Gemini 2.5 Flash |

### Grounding

|---|---|
| **Latest version** | `grounding_v1` |
| **Type** | Static rubrics |
| **Description** | A score-based metric that checks for factuality and consistency. It verifies that the model's response is grounded based on the context. |
| **How to access in SDK** | `types.RubricMetric.GROUNDING` |
| **Input** | - `prompt` - `response` - `context` |
| **Output** | - `score` - `explanation` The score has a range of `0-1`. If any sentence is labeled `unsupported` or `contradictory`, the score is `0`. Otherwise, the score represents the ratio of sentences labeled `supported` or `no_rad` to the total number of sentences.  The `explanation` field is a JSON string containing a list of per-sentence objects with the following schema: ```json [ { "sentence": "string", "label": "supported | unsupported | contradictory | no_rad", "rationale": "string", "excerpt": "string or null" } ] ``` Each object contains the following fields: - `sentence`: The sentence being analyzed from the response. - `label`: The classification of the sentence, one of: - `supported`: The sentence is entailed by the context. - `unsupported`: The sentence is not entailed by the context. - `contradictory`: The sentence is falsified by the context. - `no_rad`: The sentence does not require factual attribution (for example, opinions, greetings, questions, or disclaimers). - `rationale`: A brief explanation for the label assignment. - `excerpt` (present for `supported` and `contradictory` labels): A relevant excerpt from the context that supports or contradicts the sentence. |
| **Number of LLM calls** | 1 call to Gemini 2.5 Flash |

### Safety

|---|---|
| **Latest version** | `safety_v1` |
| **Type** | Static rubrics |
| **Description** | A score-based metric that assesses whether the model's response violated one or more of the following policies: - PII \& Demographic Data - Hate Speech - Dangerous Content - Harassment - Sexually Explicit |
| **How to access in SDK** | `types.RubricMetric.SAFETY` |
| **Input** | - `prompt` - `response` |
| **Output** | - `score` - `explanation` For the score, `0` is unsafe and `1` is safe. The explanation field includes violated policies. |
| **Number of LLM calls** | 10 calls to Gemini 2.5 Flash |

### Multi-turn general quality

|---|---|
| **Latest version** | `multi_turn_general_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | An adaptive rubrics metric that evaluates the overall quality of a model's response within the context of a multi-turn dialogue. |
| **How to access in SDK** | `types.RubricMetric.MULTI_TURN_GENERAL_QUALITY` |
| **Input** | - `prompt` with multi-turn conversations - `response` - (Optional) `rubric_groups` If you have rubrics already generated, you can provide them directly for evaluation. |
| **Output** | - `score` - rubrics and corresponding verdicts The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 6 calls to Gemini 2.5 Flash |

### Multi-turn text quality

|---|---|
| **Latest version** | `multi_turn_text_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | An adaptive rubrics metric that evaluates the text quality of a model's response within the context of a multi-turn dialogue. |
| **How to access in SDK** | `types.RubricMetric.TEXT_QUALITY` |
| **Input** | - `prompt` with multi-turn conversations - `response` - (Optional) `rubric_groups` If you have rubrics already generated, you can provide them directly for evaluation. |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 6 calls to Gemini 2.5 Flash |

### Agent final response match

|---|---|
| **Latest version** | `final_response_match_v2` |
| **Type** | Static rubrics |
| **Description** | A metric that evaluates the quality of an AI agent's final answer by comparing it to a provided reference answer (ground truth). |
| **How to access in SDK** | `types.RubricMetric.FINAL_RESPONSE_MATCH` |
| **Input** | - `prompt` - `response` - `reference` |
| **Output** | **Score** - 1: Valid response that matches the reference. - 0: Invalid response that does not match the reference. **Explanation** |
| **Number of LLM calls** | 5 calls to Gemini 2.5 Flash |

### Agent final response reference free

|---|---|
| **Latest version** | `final_response_reference_free_v1` |
| **Type** | Adaptive rubrics |
| **Description** | An adaptive rubrics metric that evaluates the quality of an AI agent's final answer without needing a reference answer. You need to provide rubrics for this metric, as it doesn't support auto-generated rubrics. |
| **How to access in SDK** | `types.RubricMetric.FINAL_RESPONSE_REFERENCE_FREE` |
| **Input** | - `prompt` - `response` - `rubric_groups` |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 5 calls to Gemini 2.5 Flash |

### Agent final response quality

|---|---|
| **Latest version** | `final_response_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | A comprehensive adaptive rubrics metric that evaluates the overall quality of an agent's response. It automatically generates a broad range of criteria based on the agent configuration (developer instruction and declarations for tools available to the agent) and the user's prompt, then assesses the generated criteria based on tool usage in intermediate events and final answer by the agent. |
| **How to access in SDK** | `types.RubricMetric.FINAL_RESPONSE_QUALITY` |
| **Input** | - `prompt` - `response` - `developer_instruction` - `tool_declarations` (can be an empty list) - `intermediate_events` (containing function calls \& responses, can be an empty list) - (Optional) `rubric_groups` (If you have rubrics already generated, you can provide them directly for evaluation) |
| **Output** | - `score` - `rubrics` and corresponding `verdicts`  The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 5 calls to Gemini 2.5 Flash and 1 call to Gemini 2.5 Pro |

### Agent hallucination

|---|---|
| **Latest version** | `hallucination_v1` |
| **Type** | Static Rubrics |
| **Description** | A score-based metric that checks for factuality and consistency of text responses by segmenting the response into atomic claims. It verifies if each claim is grounded or not based on tool usage in the intermediate events. It can also be leveraged to evaluate any intermediate text responses by setting the flag `evaluate_intermediate_nl_responses` to true. |
| **How to access in SDK** | `types.RubricMetric.HALLUCINATION` |
| **Input** | - `response` - `developer_instruction` - `tool_declarations` (can be an empty list) - `intermediate_events` (containing function calls \& responses, can be an empty list) - `evaluate_intermediate_nl_responses` (default is False) |
| **Output** | - `score` - `explanation` and corresponding `verdicts` The score has a range of `0-1`, and represents the ratio of sentences labeled as `supported` or `no_rad` to the total number of sentences.  The `explanation` field is a JSON string containing a list of per-event objects with the following schema: ```json [ { "response": "string", "score": "double", "explanation": [ { "sentence": "string", "label": "supported | unsupported | contradictory | disputed | no_rad", "rationale": "string", "supporting_excerpt": "string or null", "contradicting_excerpt": "string or null" } ] } ] ``` Each `explanation` entry contains one object per segmented sentence with the following fields: - `sentence`: The exact sentence extracted during the sentence segmentation step. - `label`: The classification of the sentence, one of: - `supported`: The sentence is entailed by the context. - `unsupported`: The sentence is not entailed by the context. - `contradictory`: The sentence is falsified by the context. - `disputed`: The context contains both supporting and contradicting information. - `no_rad`: The sentence does not require factual attribution (for example, opinions, greetings, questions, or disclaimers). - `rationale`: A brief explanation for the label assignment. - `supporting_excerpt` (present for `supported` and `disputed` labels): A relevant excerpt from the context that supports the sentence. - `contradicting_excerpt` (present for `contradictory` and `disputed` labels): A relevant excerpt from the context that contradicts the sentence. |
| **Number of LLM calls** | 2 calls to Gemini 2.5 Flash |

### Agent tools usage quality

|---|---|
| **Latest version** | `tool_use_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | A targeted adaptive rubrics metric that evaluates the selection of appropriate tools, correct parameter usage, and adherence to the specified sequence of operations. |
| **How to access in SDK** | `types.RubricMetric.TOOL_USE_QUALITY` |
| **Input** | - `prompt` - `developer_instruction` - `tool_declarations` (can be an empty list) - `intermediate_events` (containing function calls \& responses, can be an empty list) - (Optional) `rubric_groups` (If you have rubrics already generated, you can provide them directly for evaluation) |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 5 calls to Gemini 2.5 Flash and 1 call to Gemini 2.5 Pro |

### Agent multi-turn task success

|---|---|
| **Latest version** | `multi_turn_task_success_v1` |
| **Type** | Adaptive rubrics |
| **Description** | An adaptive rubrics metric that evaluates whether the agent successfully fulfilled user goals across an entire multi-turn conversation. It focuses on observable outcomes and confirmations in the agent's responses rather than intermediate processes such as specific tool calls or reasoning steps.  The metric operates in three steps: 1. **Intent extraction**: Identifies user goals and intents from the conversation. 2. **Rubric generation**: Creates criteria based on the extracted intents, agent instructions, and tool definitions. 3. **Rubric validation**: Validates the agent's overall responses against the generated rubrics. |
| **How to access in SDK** | `types.RubricMetric.MULTI_TURN_TASK_SUCCESS` |
| **Input** | - `agent_eval_data` (multi-turn conversation trace including model inputs, responses, and tool calls) |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 2 calls to Gemini 3.1 Pro and 5 calls to Gemini 3 Flash |

### Agent multi-turn tool use quality

|---|---|
| **Latest version** | `multi_turn_tool_use_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | An adaptive rubrics metric that evaluates the technical and semantic correctness of the agent's tool calls across an entire multi-turn conversation. It verifies that the agent selected the correct tools, populated arguments correctly, and adhered to the tool schemas for each user goal.  The metric operates in three steps: 1. **Intent extraction**: Identifies user goals and intents from the conversation. 2. **Rubric generation**: Maps each intent to expected tool selection, argument correctness, and schema compliance criteria. 3. **Rubric validation**: Validates the agent's actual tool calls against the generated rubrics. |
| **How to access in SDK** | `types.RubricMetric.MULTI_TURN_TOOL_USE_QUALITY` |
| **Input** | - `agent_eval_data` (multi-turn conversation trace including model inputs, responses, and tool calls) |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 2 calls to Gemini 3.1 Pro and 5 calls to Gemini 3 Flash |

### Agent multi-turn trajectory quality

|---|---|
| **Latest version** | `multi_turn_trajectory_quality_v1` |
| **Type** | Adaptive rubrics |
| **Description** | An adaptive rubrics metric that evaluates the quality of the agent's step-by-step execution trajectory across an entire multi-turn conversation. It focuses on the logical structure and technical validity of the agent's path rather than just the final response.  The metric operates in three steps: 1. **Intent extraction**: Identifies user goals and intents from the conversation. 2. **Rubric generation** : Produces criteria across three dimensions: **causal validity** (correct sequence of tool routing, state tracking, and data passing), **efficiency** (minimizing unnecessary steps), and **adaptive robustness** (handling edge cases and errors). 3. **Rubric validation**: Validates the agent's actual execution path against the generated rubrics. |
| **How to access in SDK** | `types.RubricMetric.MULTI_TURN_TRAJECTORY_QUALITY` |
| **Input** | - `agent_eval_data` (multi-turn conversation trace including model inputs, responses, and tool calls) |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 2 calls to Gemini 3.1 Pro and 5 calls to Gemini 3 Flash |

### Gecko text-to-image quality

|---|---|
| **Latest version** | `gecko_text2image_v1` |
| **Type** | Adaptive rubrics |
| **Description** | The [Gecko](https://arxiv.org/abs/2404.16820) text-to-image metric is an adaptive, rubric-based method for evaluating the quality of a generated image against its corresponding text prompt. It works by first generating a set of questions from the prompt, which serve as a detailed, prompt-specific rubric. A model then answers these questions based on the generated image. |
| **How to access in SDK** | `types.RubricMetric.GECKO_TEXT2IMAGE` |
| **Input** | - `prompt` - `response` - should be file data with image MIME type |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 2 calls to Gemini 2.5 Flash |

### Gecko text-to-video quality

|---|---|
| **Latest version** | `gecko_text2video_v1` |
| **Type** | Adaptive rubrics |
| **Description** | The [Gecko](https://arxiv.org/abs/2404.16820) text-to-video metric is an adaptive, rubric-based method for evaluating the quality of a generated video against its corresponding text prompt. It works by first generating a set of questions from the prompt, which serve as a detailed, prompt-specific rubric. A model then answers these questions based on the generated video. |
| **How to access in SDK** | `types.RubricMetric.GECKO_TEXT2VIDEO` |
| **Input** | - `prompt` - `response` - should be file data with video MIME type |
| **Output** | - `score` - `rubrics` and corresponding `verdicts` The score represents the passing rate of the response based on the rubrics. |
| **Number of LLM calls** | 2 calls to Gemini 2.5 Flash |

## What's next

- [Prepare your evaluation dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-dataset).
