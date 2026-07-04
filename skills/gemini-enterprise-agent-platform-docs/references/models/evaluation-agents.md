## Overview

You have the following options to evaluate your agent:

- Final response evaluation: Evaluate the final output of an agent (whether or not the agent achieved its goal).
- Trajectory evaluation: Evaluate the path (sequence of tool calls) the agent took to reach the final response.

With the Gen AI evaluation service, you can trigger an agent execution and get metrics for both trajectory evaluation and final response evaluation in one Vertex AI SDK query.

## Supported agents

The Gen AI evaluation service supports the following categories of agents:

| Supported agents | Description |
| --- | --- |
| Agent built with Agent Engine's template | Agent Engine (LangChain on Agent Platform) is a Google Cloud platform where you can deploy and manage agents. |
| LangChain agents built using Agent Engine's customizable template | LangChain is an open source platform. |
| Custom agent function | Custom agent function is a flexible function that takes in a prompt for the agent and returns a response and trajectory in a dictionary. |

## Defining metrics for agent evaluation

Define your metrics for final response or trajectory evaluation:

### Final response evaluation

Final response evaluation follows the same process as model response evaluation. For more information, see Define your evaluation metrics.

### Trajectory evaluation

The following metrics help you to evaluate the model's ability to follow the expected trajectory:

### Exact match

If the predicted trajectory is identical to the reference trajectory, with the exact same tool calls in the exact same order, the `trajectory_exact_match` metric returns a score of 1, otherwise 0.

#### Metric input parameters

| Input parameter | Description |
| `predicted_trajectory` | The list of tool calls used by the agent to reach the final response. |
| `reference_trajectory` | The expected tool use for the agent to satisfy the query. |

#### Output scores

| Value | Description |
| 0 | Predicted trajectory doesn't match the reference. |
| 1 | Predicted trajectory matches the reference. |

### In-order match

If the predicted trajectory contains all the tool calls from the reference trajectory in the same order, and may also have extra tool calls, the `trajectory_in_order_match` metric returns a score of 1, otherwise 0.

| `predicted_trajectory` | The predicted trajectory used by the agent to reach the final response. |
| `reference_trajectory` | The expected predicted trajectory for the agent to satisfy the query. |

| 0 | The tool calls in the predicted trajectory doesn't match the order in the reference trajectory. |

### Any-order match

If the predicted trajectory contains all the tool calls from the reference trajectory, but the order doesn't matter and may contain extra tool calls, then the `trajectory_any_order_match` metric returns a score of 1, otherwise 0.

| `predicted_trajectory` | The list of tool calls used by the agent to reach the final response. |
| `reference_trajectory` | The expected tool use for the agent to satisfy the query. |

| 0 | Predicted trajectory doesn't contain all the tool calls in the reference trajectory. |

### Precision

The `trajectory_precision` metric measures how many of the tool calls in the predicted trajectory are actually relevant or correct according to the reference trajectory.

Precision is calculated as follows: Count how many actions in the predicted trajectory also appear in the reference trajectory. Divide that count by the total number of actions in the predicted trajectory.

| `predicted_trajectory` | The list of tool calls used by the agent to reach the final response. |
| `reference_trajectory` | The expected tool use for the agent to satisfy the query. |

| A float in the range of [0,1] | The higher the score, more precise the predicted trajectory. |

### Recall

The `trajectory_recall` metric measures how many of the essential tool calls from the reference trajectory are actually captured in the predicted trajectory.

Recall is calculated as follows: Count how many actions in the reference trajectory also appear in the predicted trajectory. Divide that count by the total number of actions in the reference trajectory.

| `predicted_trajectory` | The list of tool calls used by the agent to reach the final response. |
| `reference_trajectory` | The expected tool use for the agent to satisfy the query. |

| A float in the range of [0,1] | The higher the score, the predicted trajectory has a good recall. |

### Single tool use

The `trajectory_single_tool_use` metric checks if a specific tool that is specified in the metric spec is used in the predicted trajectory. It doesn't check the order of tool calls or how many times the tool is used, just whether it's present or not.

| `predicted_trajectory` | The list of tool calls used by the agent to reach the final response. |

| 0 | The tool is absent |
| 1 | The tool is present. |

In addition, the following two agent performance metrics are added to the evaluation results by default. You don't need to specify them in `EvalTask`.

### `latency`

Time taken by the agent to return a response.

| A float | Calculated in seconds. |

### `failure`

A boolean to describe if the agent invocation resulted in an error or succeeds.

| 1 | Error |
| 0 | Valid response returned |

## Prepare your dataset for agent evaluation

Prepare your dataset for final response or trajectory evaluation.

The data schema for final response evaluation is similar to that of model response evaluation.

For computation-based trajectory evaluation, your dataset needs to provide the following information:

| Input type | Input field contents |
| `predicted_trajectory` | The list of tool calls used by the agents to reach the final response. |
| `reference_trajectory` (not required for `trajectory_single_tool_use metric`) | The expected tool use for the agent to satisfy the query. |

## Evaluation dataset examples

The following examples show datasets for trajectory evaluation. Note that `reference_trajectory` is required for all metrics except `trajectory_single_tool_use`.

> [!NOTE]
> Note: Example datasets are for demonstration purposes and shouldn't be used in production.

```
reference_trajectory = [
# example 1
[
  {
    "tool_name": "set_device_info",
    "tool_input": {
        "device_id": "device_2",
        "updates": {
            "status": "OFF"
        }
],
# example 2
      "tool_name": "get_user_preferences",
          "user_id": "user_y"
  },
      "tool_name": "set_temperature",
          "location": "Living Room",
          "temperature": 23
  ]

predicted_trajectory = [
# example 1
        "device_id": "device_3",
# example 2
          "user_id": "user_z"

eval_dataset = pd.DataFrame({
    "predicted_trajectory": predicted_trajectory,
    "reference_trajectory": reference_trajectory,
})

```

## Import your evaluation dataset

You can import your dataset in the following formats:

- JSONL or CSV file stored in Cloud Storage
- BigQuery table
- Pandas DataFrame

Gen AI evaluation service provides example public datasets to demonstrate how you can evaluate your agents. The following code shows how to import the public datasets from a Cloud Storage bucket:

```
# dataset name to be imported
dataset = "on-device" # Alternatives: "customer-support", "content-creation"

# copy the tools and dataset file
!gcloud storage cp gs://cloud-ai-demo-datasets/agent-eval-datasets/{dataset}/tools.py .
!gcloud storage cp gs://cloud-ai-demo-datasets/agent-eval-datasets/{dataset}/eval_dataset.json .

# load the dataset examples
import json

eval_dataset = json.loads(open('eval_dataset.json').read())

# run the tools file
%run -i tools.py

```

where `dataset` is one of the following public datasets:

- `"on-device"` for an On-Device Home Assistant, which controls home devices.
The agent helps with queries such as "Schedule the air conditioning in the
bedroom so that it is on between 11pm and 8am, and off the rest of the time."
- `"customer-support"` for a Customer Support Agent. The agent helps with
queries such as "Can you cancel any pending orders and escalate any open
support tickets?"
- `"content-creation"` for a Marketing Content Creation Agent. The agent helps
with queries such as "Reschedule campaign X to be a one-time campaign on
social media site Y with a 50% reduced budget, only on December 25, 2024."

## Run agent evaluation

Run an evaluation for trajectory or final response evaluation:

For agent evaluation, you can mix response evaluation metrics and trajectory evaluation metrics like in the following code:

```
single_tool_use_metric = TrajectorySingleToolUse(tool_name='tool_name')

eval_task = EvalTask(
    dataset=EVAL_DATASET,
    metrics=[
        "rouge_l_sum",
        "bleu",
        custom_trajectory_eval_metric, # custom computation-based metric
        "trajectory_exact_match",
        "trajectory_precision",
        single_tool_use_metric,
        response_follows_trajectory_metric # llm-based metric
)
eval_result = eval_task.evaluate(
    runnable=RUNNABLE,

```

### Metric customization

You can customize a large language model-based metric for trajectory evaluation using a templated interface or from scratch, for more details see the section on model-based metrics. Here is a templated example:

```
response_follows_trajectory_prompt_template = PointwiseMetricPromptTemplate(
    criteria={
        "Follows trajectory": (
            "Evaluate whether the agent's response logically follows from the "
            "sequence of actions it took. Consider these sub-points:\n"
            "  - Does the response reflect the information gathered during the trajectory?\n"
            "  - Is the response consistent with the goals and constraints of the task?\n"
            "  - Are there any unexpected or illogical jumps in reasoning?\n"
            "Provide specific examples from the trajectory and response to support your evaluation."
    rating_rubric={
        "1": "Follows trajectory",
        "0": "Does not follow trajectory",
    input_variables=["prompt", "predicted_trajectory"],

response_follows_trajectory_metric = PointwiseMetric(
    metric="response_follows_trajectory",
    metric_prompt_template=response_follows_trajectory_prompt_template,

```

You can also define a custom computation-based metric for trajectory evaluation or response evaluation as follows:

```
def essential_tools_present(instance, required_tools = ["tool1", "tool2"]):
    trajectory = instance["predicted_trajectory"]
    tools_present = [tool_used['tool_name'] for tool_used in trajectory]
    if len(required_tools) == 0:
      return {"essential_tools_present": 1}
    score = 0
    for tool in required_tools:
      if tool in tools_present:
        score += 1
    return {
        "essential_tools_present": score/len(required_tools),

custom_trajectory_eval_metric = CustomMetric(name="essential_tools_present", metric_function=essential_tools_present)

```

## View and interpret results

For trajectory evaluation or final response evaluation, the evaluation results are displayed as follows:

The evaluation results contain the following information:

### Final response metrics

### Instance-level results

| Column | Description |
| response | Final response generated by the agent. |
| latency_in_seconds | Time taken to generate the response. |
| failure | Indicates that a valid response was generated or not. |
| score | A score calculated for the response specified in the metric spec. |
| explanation | The explanation for the score specified in the metric spec. |

### Aggregate results

| mean | Average score for all instances. |
| standard deviation | Standard deviation for all the scores. |

### Trajectory metrics

### Instance-level results

| predicted_trajectory | Sequence of tool calls followed by agent to reach the final response. |
| reference_trajectory | Sequence of expected tool calls. |
| score | A score calculated for the predicted trajectory and reference trajectory specified in the metric spec. |

### Aggregate results

## Agent2Agent (A2A) protocol

If you are building a multi-agent system, we highly recommend reviewing the A2A Protocol. A2A Protocol is an open standard that enables seamless communication and collaboration between AI agents, regardless of their underlying frameworks. It was donated by Google Cloud to the Linux Foundation in June 2025. To use the A2A SDKs, or try out the samples, check out the GitHub repository.

## What's next

Try the following agent evaluation notebooks:

- Evaluate a Langraph agent
- Evaluate a CrewAI agent
- Evaluate a Langchain agent with Agent Engine
- Evaluate a LangGraph agent with Agent Engine
- Evaluate a CrewAI agent with Agent Engine
