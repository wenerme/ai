> [!WARNING]
> **Preview - Agent evaluation on Gemini Enterprise Agent Platform**
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) as well as the [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20). This feature allows customers to evaluate AI Agents, and so the "Agentic AI Services" Service Specific Terms apply. Pre-GA products and features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

## Before you begin

To view and analyze evaluation results, ensure you have the following:

- Run at least one evaluation as described in [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents) or [Run offline evaluations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-offline).
- Configured a **Cloud Storage** bucket for evaluation output if running offline evaluations.
- (Optional) If using the SDK to fetch results, ensure your environment is authenticated.

After running an evaluation, Agent Platform provides diagnostic tools
to help you identify root causes of failure. You can analyze results at three
levels: aggregate trends in the dashboard, semantic groups in failure clusters,
and granular logic paths in individual traces.

## The evaluation dashboard for online monitors

For agents with active **Online Monitors**, you can view aggregate performance
trends in the dashboard:

1. In the Google Cloud console, navigate to the **Agent Platform \> Agents** page.
2. In the left navigation menu, select **Deployments**.
3. Select your agent.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

4. Click the **Dashboard** tab and select the **Evaluation** subsection.

- **Performance Trends:** Visualize how scores for metrics like **Task
  Success** or **Tool Use Quality** change across different agent versions or timeframes.
- **Zero State:** For agents without active **Online Monitors**, this view identifies coverage gaps and provides a call-to-action to begin evaluation.

## View evaluation results with the SDK

You can programmatically access evaluation results using the **Agent Platform SDK**.
The SDK provides built-in interactive visualizations for Colab
and Jupyter notebook environments that display both aggregate summary metrics
and per-case detailed results.

After running an evaluation, call `.show()` on the result object to render an
interactive report directly in your notebook:

    from vertexai import evals, types

    # Run an evaluation
    result = client.evals.evaluate(
        dataset=eval_dataset,
        metrics=[
            types.RubricMetric.FINAL_RESPONSE_QUALITY,
            types.RubricMetric.TOOL_USE_QUALITY,
            types.RubricMetric.HALLUCINATION,
            types.RubricMetric.SAFETY,
        ],
    )

    # Visualize aggregate and per-case results in your notebook
    result.show()

The visualization includes:

- **Summary metrics:** Aggregate scores across all eval cases, including mean score and pass rate for each metric.
- **Per-case results:** Individual eval case scores that you can expand to inspect detailed results.

The following example shows the summary metrics from `result.show()`:

![Evaluation summary report showing mean scores and standard deviation for each metric.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/optimize/evaluation/images/eval-summary-report.png "Evaluation summary report")

You can expand individual eval cases to see per-metric scores, rubric verdicts,
and rationales:

![Per-case evaluation results showing metric scores and individual rubric pass or fail verdicts with explanations.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/optimize/evaluation/images/eval-case-result.png "Per-case evaluation results")

### Interpret evaluation results

Predefined metrics return results in two formats depending on the metric type:

- **Adaptive rubric metrics** automatically generate rubrics based on the agent's configuration and the user's prompt. Each rubric receives an individual **Pass** or **Fail** verdict with a natural language rationale explaining the judge LLM's reasoning. The overall score represents the passing rate---the proportion of rubrics that received a **Pass** verdict.
- **Static rubric metrics** use a fixed set of evaluation criteria. For example, Hallucination segments the response into atomic claims and checks each against tool usage evidence. Safety checks for PII, hate speech, dangerous content, and other policy violations. These metrics return a single numerical score (0 to 1).

## Identify and triage failures

After reviewing evaluation results, the next step is to identify systemic
failure patterns and triage them to improve your agent. Agent Platform
provides **Automatic Loss Analysis** , which analyzes the pass or fail signals
from rubric-based metrics, classifies failures into predefined loss patterns,
and groups them into semantic clusters. This helps you understand not just
*that* your agent failed, but *why* and *how* it failed.

### Access failure clusters in the console

1. Navigate to the **Agent Platform \> Agents \> Evaluation** page.
2. Select the **Evaluations** tab.
3. Click the name of a completed evaluation run to open the report.
4. If the evaluation detected clusters, they are displayed in the **Failure
   Clusters** section of the report.

### Generate failure clusters with the SDK

You can also generate failure clusters programmatically using the
`generate_loss_clusters` method:

    # Generate failure clusters from evaluation results
    loss_clusters = client.evals.generate_loss_clusters(
        eval_result=result,
    )

    # Visualize the loss pattern analysis in your notebook
    loss_clusters.show()

The following example shows the loss pattern analysis from `loss_clusters.show()`:

![Loss pattern analysis report showing failure clusters grouped by category with example scenarios and rationales.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/optimize/evaluation/images/eval-loss-clusters.png "Loss pattern analysis report")

### Loss pattern taxonomies

The automatic loss analysis classifies each failure into one or more predefined
loss patterns. These patterns are designed to be concrete and actionable,
mapping directly to specific areas of your agent that you can improve.

There are two predefined taxonomies, each aligned to a specific metric:

#### Agent task success taxonomy

This taxonomy is used with the **Agent Multi-turn Task Success** metric
(`multi_turn_task_success_v1`). It covers high-level agent behavioral failures
across hallucination, instruction following, tool calling, tool output
handling, and tool quality:

| Category | Loss pattern | Description |
|---|---|---|
| **Hallucination** | Hallucination of Action | The agent claims to have completed an action without executing the necessary tool call. |
| **Hallucination** | Hallucination of Missing Information | The agent invents a detail (such as a value, fact, or date) not present in the user query or tool output. |
| **Hallucination** | Hallucination of Tool or Capability | The agent claims to have a tool or capability that it does not possess. |
| **Instruction Following** | Constraint Violation | The agent performs the task but violates explicit user constraints (such as formatting rules or negative constraints). |
| **Instruction Following** | Futile Action (Under-Punting) | The agent takes an irrelevant action instead of stating that the task is impossible with available tools. |
| **Instruction Following** | Incomplete Execution | The agent partially completes a task but stops prematurely or asks unnecessary permission for explicitly requested steps. |
| **Instruction Following** | Over-Punting | The agent declines a task, claiming it lacks a tool or capability that it actually possesses. |
| **Tool Calling** | Incorrect Tool Selection | The agent selects the wrong tool from its available options. |
| **Tool Calling** | Semantically Incorrect Tool Parameters | The tool call is syntactically valid but contains a logical or semantic error in the parameter values. |
| **Tool Calling** | Syntactically Incorrect Tool Call | The tool call has syntactical errors, missing mandatory parameters, or invalid argument values. |
| **Tool Output Handling** | Incorrect Tool Output Processing | The agent receives valid tool output but inaccurately extracts, processes, or interprets the information. |
| **Tool Quality** | Insufficient Tool Output | The tool executes successfully but returns insufficient or missing data required for the agent to proceed. |
| **Tool Quality** | Tool Failure | The tool fails due to infrastructure issues such as authentication failures, timeouts, or internal errors. |

#### Tool use quality taxonomy

This taxonomy is used with the **Agent Multi-turn Tool Use Quality** metric
(`multi_turn_tool_use_quality_v1`). It focuses specifically on tool calling
correctness and tool response handling:

| Category | Loss pattern | Description |
|---|---|---|
| **Hallucination** | Hallucination of Parameter Value | The agent invents a specific value for a parameter that was not provided by the user or cannot be derived from context. |
| **Hallucination** | Hallucination of Tool | The agent attempts to call a function that does not exist in its defined toolset. |
| **Tool Calling** | Failure to Set Parameter | The agent omits a parameter needed to fulfill the user's constraints, defaulting to an unintended value. |
| **Tool Calling** | Incorrect Parameter Data Type | The agent provides a value of the wrong data type for a parameter (such as a string when an integer is required). |
| **Tool Calling** | Incorrect Parameter Mapping | The agent assigns a value to the wrong parameter (such as swapping start and end dates). |
| **Tool Calling** | Incorrect Parameter Value | The agent provides a parameter value that is logically or factually incorrect, or fails to apply necessary data transformations. |
| **Tool Calling** | Incorrect Tool Selection | The agent selects the wrong function from its available toolset. |
| **Tool Calling** | Invalid Tool Call Syntax | The agent generates a function call with a syntax error that prevents parsing or execution. |
| **Tool Calling** | Non-Existent Parameter | The agent includes a parameter argument that is not defined in the tool's signature. |
| **Tool Calling** | Omission of Required Tool Call | The agent fails to execute a necessary function, whether by answering directly, skipping part of a compound request, or skipping a prerequisite step. |
| **Tool Calling** | Under-Punting | The agent forces a tool call when it should respond with natural language (such as asking for clarification or declining an out-of-scope request). |
| **Tool Response** | Irrelevant Tool Response | The tool executes successfully but returns data not relevant to the user's specific query. |
| **Tool Response** | Tool Error | The tool returns an explicit error or failure status due to an external issue (such as an API outage or invalid permissions). |

### Recommended triage workflow

Use the following workflow to systematically triage evaluation failures:

1. **Start with summary metrics** to identify the lowest-scoring metrics across your evaluation dataset.
2. **Drill into per-case results** to find specific eval cases that failed.
3. **Generate failure clusters** to identify systemic loss patterns across failures.
4. **Drill into traces** to find the exact turn or tool call where the failure occurred. In the console, navigate to **Agent Platform \> Agents \> Deployments** , select your agent, and open the **Traces** tab. Select a trace to see the full conversation history and the exact sequence of model inputs, tool calls, and responses.
5. **Identify the root cause**---use the loss pattern category to determine whether the issue is a prompt problem, a tool configuration problem, or a data problem.
6. **Apply a targeted fix** to the agent's system instructions, tool definitions, or few-shot examples.
7. **Re-run the evaluation** and compare scores to verify the improvement.
