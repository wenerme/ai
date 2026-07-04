

> [!WARNING]
> **Preview - Agent evaluation on Gemini Enterprise Agent Platform**
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) as well as the [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20). This feature allows customers to evaluate Al Agents, and so the "Agentic Al Services" Service Specific Terms apply. Pre-GA products and features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> To see an example of End-to-end agent evaluation,
> run the "Multi-Turn Agent Evaluation with User Simulation, Metric Registration, and Auto Loss Analysis" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/multi_turn_agent_evaluation_with_user_simulation_metric_registration_auto_loss_analysis.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fmulti_turn_agent_evaluation_with_user_simulation_metric_registration_auto_loss_analysis.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/evaluation/multi_turn_agent_evaluation_with_user_simulation_metric_registration_auto_loss_analysis.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/multi_turn_agent_evaluation_with_user_simulation_metric_registration_auto_loss_analysis.ipynb)

This document describes how to use agent evaluation to measure and improve the
performance, safety, and quality of your agents.

To learn more about model evaluation, see [Gen AI evaluation service
overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview).

## Procedure summary

| Phase | Activity | Goal |
|---|---|---|
| **Design** | Define eval cases | Specify agent tasks and expected outcomes. |
| **Execution** | Run inferences | Generate real-world or simulated conversation traces. |
| **Scoring** | Compute metrics | Grade traces using automated raters (Task Success, Safety). |
| **Refinement** | Optimize agent | Propose and verify improvements to instructions or tools. |

## Evaluation process

Evaluation follows a structured, iterative workflow:

1. **Define eval cases** : An *eval case* is a specification that defines an agent's task. An eval case can include one or multiple conversation steps, the conversation context (the agent's state), and a specification for simulating user responses during inference.
2. **Run inferences** : *Inference* is the execution of an eval case. If an eval case contains a conversation plan, user responses are simulated during inference.
3. **Generate traces** : Each inference run captures the agent's behavior in a trace. A *trace* is a factual, immutable record of the agent's behavior, including model inputs, responses, and tool calls.
4. **Compute metrics** : *Metrics* are scores computed for each trace using prebuilt or custom raters. Some metrics, like **Exact Match** , are *reference-based* and require an eval case with a reference answer. Others, like **Helpfulness** , are *reference-free* and evaluate the trace on its own. This automated evaluation lets you score traces captured from production traffic or external logs, independent of a managed test environment.
5. **Conduct analysis**: Analyze metrics, rubrics, and verdicts to identify key agent issues, link the agent issues back to test cases, and generate insights for improvement.
6. **Optimize the agent**: Use optimization to manage the entire evaluation cycle. This automated process analyzes results, proposes improvements to the agent, and iteratively reruns the process to verify performance gains.

### Evaluation workflow

You can integrate evaluation into two main stages of your workflow:

- **Local development iteration**: Evaluate an Agent Development Kit (ADK)-based agent locally to rapidly iterate on prompt engineering and tool configurations.
- **Deployed agent assessment**: Measure the quality of deployed agents by analyzing historical traces or running synthetic benchmarks against agent endpoints.

## Core capabilities

Agent evaluation helps you build an initial evaluation suite, even
without existing test data. The following features help automate the process of
generating test cases and refining your agentic systems:

- **Scenario generation and user simulation**: Automatically generate
  diverse, multi-turn synthetic test scenarios based on your agent's
  instructions and tool definitions. This automation allows you to start
  testing immediately by eliminating the need to manually author
  initial test cases.

- **Environment simulation**: Intercept specific tool calls to inject
  custom behaviors, mocked data, or simulated errors (such as HTTP 503
  errors or latency spikes). This simulation lets you validate
  agent resilience without impacting production backends.

- **Multi-turn evaluation**: Automatically evaluate entire conversation
  histories using multi-turn autoraters. These raters analyze intent
  extraction, dynamically generate rubrics, and provide objective
  validation verdicts to help ensure instruction adherence.

- **Prompt optimization**: Programmatically generate and validate refined
  system instructions by using prompt optimization. The optimization
  framework identifies points of failure and iteratively proposes
  targeted updates.

## Evaluate with AI coding assistants

If you use Gemini CLI or another AI coding assistant, you can install Agent
[skills](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry) that teach your
assistant the agent evaluation methodology described on this page. Each skill
provides the eval workflow, dataset schema, metric selection guidance, and
failure analysis steps directly in your coding session, so your assistant can
build, grade, and improve evaluations without leaving your editor.

Installation instructions follow each skill.

### Agents CLI eval skill

A CLI-driven workflow to evaluate and optimize Agent Development Kit (ADK)
agents using the `agents-cli eval` commands. This skill covers:

- Preparing eval datasets and synthesizing multi-turn scenarios with user simulation
- Running inference, grading traces, and analyzing failure clusters
- Iterating on prompts and tools with the eval-fix loop

To install, run the following command:

    npx skills add https://github.com/google/agents-cli --skill google-agents-cli-eval

### Agent Platform GenAI Evaluation Service flywheel skill

An SDK-driven playbook to evaluate and improve models and agents through the
Agent Platform GenAI Evaluation Service, using the Agent Platform GenAI Evaluation SDK
(`client.evals.evaluate()`). This skill covers:

- Building eval datasets from session traces, DataFrames, or synthetic generation
- Selecting, configuring, and writing custom metrics with LLM-as-judge scoring
- Analyzing rubric verdicts and loss patterns to drive concrete improvements

To install, run the following command:

    npx skills add https://github.com/google/skills --skill agent-platform-eval-flywheel

## What's next

- [Manage evaluation cases](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/manage-eval-cases)
- [Run evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)
- [View evaluation results](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/view-results)
