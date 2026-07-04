> [!WARNING]
> **Preview - Agent evaluation on Gemini Enterprise Agent Platform**
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) as well as the [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20). This feature allows customers to evaluate AI Agents, and so the "Agentic AI Services" Service Specific Terms apply. Pre-GA products and features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

This feature lets you evaluate AI agents. You can use the [Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview) to measure and improve the performance, safety, and quality of your agents.

## Evaluation types

| Evaluation Type | Use Case | Frequency |
|---|---|---|
| **Rapid Evaluation** | Testing new agent logic or model changes. | Frequent (Development) |
| **Test Case Evaluation** | Regression testing against a specific dataset. | Scheduled (CI/CD) |
| **Online Monitoring** | Tracking quality of a production agent deployment. | Continuous (Production) |

## Evaluation workflow

You can evaluate your agents using the **Google Cloud console** or the **Agent Platform SDK**.

### Google Cloud console

To run a basic evaluation for an agent deployment:

1. In the Google Cloud console, navigate to the **Agent Platform \> Agents** page.
2. In the left navigation menu, select **Deployments** and select your agent.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
3. Select the **Dashboard** tab and select the **Evaluation** subsection.
4. Click **New Evaluation**.
5. Follow the prompts to define your test cases and select metrics.
6. Click **Run Evaluation**.

For more detailed guides, see [Run offline evaluations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-offline) or [Continuous evaluation with online monitors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-online).

### Agent Platform SDK

The agent improvement workflow is built on the **Quality Flywheel**, a
continuous cycle of evaluation, analysis, and optimization. You evaluate your
agent's performance, analyze the results to identify clusters of failures, and
then optimize your prompts or configuration to address those issues. This
iterative process helps you proactively detect and resolve performance gaps.

#### Before you begin

1. Install the **Agent Platform SDK** with the required extensions:

   ```bash
   pip install google-cloud-aiplatform[adk,evaluation]
   ```
2. Initialize the **Agent Platform SDK** client:

   ```python
   import vertexai
   from vertexai import Client

   client = Client(project="YOUR_PROJECT_ID", location="YOUR_LOCATION")
   ```

   Where:
   - `YOUR_PROJECT_ID`: your Google Cloud project ID.
   - `YOUR_LOCATION`: your cloud region, for example, `us-central1`.

#### 1. Define eval cases (User Simulation)

Instead of manually authoring test cases, use **User Simulation** to generate
synthetic multi-turn conversation plans based on your agent's instructions.

```python
# Generate scenarios from agent info
eval_dataset = client.evals.generate_conversation_scenarios(
    agent_info=my_agent_info,
    config={
        "count": 5,
        "generation_instruction": "Generate scenarios where a user asks for a refund.",
    },
)
```

For more information, see the [**Agent Platform SDK** reference](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.evals.Evals#vertexai__genai_evals_Evals_generate_conversation_scenarios).

#### 2. Run inferences

Execute the eval cases against your agent to capture **Traces**.

```python
# Generate behavior traces using a multi-turn user simulator
traces = client.evals.run_inference(
    agent=my_agent,
    src=eval_dataset,
    config={"user_simulator_config": {"max_turn": 5}}
)
```

#### 3. Compute metrics (AutoRaters)

Use **Multi-turn AutoRaters** to score the captured traces. These raters analyze the full conversation history to verify instruction adherence and tool usage.

```python
# Evaluate the traces using multi-turn metrics
eval_result = client.evals.evaluate(
    traces=traces,
    metrics=[
        "MULTI_TURN_TASK_SUCCESS",
        "MULTI_TURN_TOOL_USE_QUALITY"
    ]
)
```

#### 4. Conduct analysis (Failure Clusters)

The system automatically groups failed evaluations into **Loss Clusters** to identify key agent issues.

```python
# Identify the top failure patterns in the results
loss_clusters = client.evals.generate_loss_clusters(eval_result=eval_result)
```

#### 5. Optimize the agent

Finally, use the **Optimizer** service to programmatically refine your agent's system instructions or tool descriptions based on the failure data.

```python
# Automatically refine the system prompt to fix identified issues
optimize_result = client.optimizer.optimize(
    targets=["system_prompt"],
    benchmark=eval_result,
    tests=eval_dataset
)
```

## What's next

- [Run offline evaluations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-offline)
- [View evaluation results](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/view-results)
- Learn more about the [Gen AI evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview)
