This document demonstrates how to build, evaluate, and deploy a prototype AI
agent using the [Agent Development Kit (ADK)](https://adk.dev/) with the
[Agents CLI](https://github.com/google/agents-cli) in
Agent Platform. The ADK is an open-source, code-first framework for
building sophisticated AI agents. Agents CLI provides a unified,
machine-readable interface for AI development tools to interact with the ADK,
enabling end-to-end agent lifecycle management. It encapsulates expert knowledge of ADK, agent evaluation, and deployment to Google Cloud, enabling AI development tools to perform complex actions from natural language prompts.

By using Agents CLI with your preferred AI-powered development tool, such as
Gemini CLI, Claude Code, or Codex, you can use natural language
prompts to define, test locally, and deploy a prototype agent to a
Google Cloud runtime.

This tutorial guides you through creating a "caveman
compressor" agent, which transforms verbose text into concise summaries, inspired
by [caveman](https://github.com/JuliusBrussee/caveman).

## Before you begin

Complete the following prerequisites:

1. Ensure you have a Google Cloud project and have enabled the Agent Platform API.
   If not, complete one of the following quickstarts:

   - [Google Cloud console quickstart for Agent Studio for Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/quickstart)

   - [API quickstart for Models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start)

2. Install an AI-powered development tool, such as
   [Antigravity](https://antigravity.google/),
   [Gemini CLI](https://geminicli.com/), Claude Code, or Codex.
   This tool is required to interact with Agents CLI.

## Setup

1. Install `uv`, a Python package installer. For instructions, see the [uv installation guide](https://docs.astral.sh/uv/getting-started/installation/).

2. Run the Agents CLI setup command using `uvx` (included with `uv`). This is the only Agents CLI command you execute directly:

       uvx google-agents-cli setup

3. Open your AI development tool, such as Antigravity.

## Scaffold project

Instruct your AI development tool with the following prompt:

    Use agents-cli to build an agent that compresses verbose text into concise, caveman-style summaries.

Your AI development tool activates the `google-agents-cli-workflow` and
`google-agents-cli-scaffold` skills. It performs the following actions:

- Asks clarifying questions, such as its deployment target and safety constraints.
- Writes a `DESIGN_SPEC.md` file capturing the agent's purpose.
- Scaffolds the project:

      agents-cli create caveman-agent --prototype --yes
      cd caveman-agent && agents-cli install

This process creates a project with boilerplate agent code, tests, and
evaluation sets.

## Build agent

Your AI development tool edits `app/agent.py`, replacing the default agent with
the caveman compressor logic. It utilizes the `google-agents-cli-adk-code`
skill for ADK design patterns.

The resulting agent definition resembles the following:

    root_agent = Agent(
       name="caveman_agent",
       model=Gemini(model="gemini-flash-latest"),
       instruction="""You are a text compressor. Convert verbose input text into short, simple summaries with a caveman-like tone. Rules:
       - Omit articles, filler words, and politeness.
       - Use short sentences and simple words.
       - Preserve technical terms.
       - The tone should be abrupt and funny, but the core meaning must be retained.

       Example input:  "I would like to deploy the application to production environment."
       Example output: "Me deploy. Production. Now."
       """,
    )

Your AI development tool then performs a basic functionality test:

    agents-cli run "Please help me understand the deployment options available for my project"

This is the expected output from that test:
> "Deploy options: Agent Runtime, Cloud Run, GKE. Pick one. Ship."

## Evaluate agent

To evaluate the agent, instruct your AI development tool with the following
prompt:

    Write evaluations for the caveman agent and run them.

Your AI development tool activates the `google-agents-cli-eval` skill and
performs these tasks:

- Creates `tests/eval/evalsets/caveman.evalset.json` with test cases covering compression quality, technical term preservation, and tone.
- Configures LLM-as-judge criteria in `tests/eval/eval_config.json`.
- Runs the evaluation:

      agents-cli eval run

If test cases fail, provide corrective feedback to your AI development tool.
For example:
> The response to the greeting test is too polite. Make it more brusque.

Your AI development tool adjusts the agent's instructions, re-runs
`agents-cli eval run`, and iterates until the desired quality is achieved.

## Deploy agent

To deploy and run the agent on Google Cloud, instruct your AI development
tool as follows:

    Deploy this agent to Cloud Run.

Your AI development tool activates the `google-agents-cli-deploy` skill and:

- Adds the necessary deployment infrastructure configuration:

      agents-cli scaffold enhance --deployment-target cloud_run

- Deploys the agent:

      agents-cli deploy

The agent is now deployed on Cloud Run. The output includes the
service URL, which you use to access the agent.

## Observe agent

Cloud Trace is enabled by default. To view traces, open the
[Cloud Trace explorer](https://console.cloud.google.com/traces) in the Google Cloud console and
send requests to your deployed agent. You will see spans for LLM calls and tool
executions.

To enable more detailed observability, instruct your AI development tool:

    Set up observability infrastructure for my agent.

Your AI development tool provisions a service account, a Cloud Storage
bucket, and a BigQuery dataset, and updates the deployed service to
use these resources. Refer to the
[Observability Guide](https://google.github.io/agents-cli/guide/observability/)
for details.

## Summary of actions

This table summarizes the prompts and the corresponding actions performed by your
AI development tool:

| User instruction | Your AI development tool actions |
|---|---|
| "Build a caveman compressor agent" | Scaffolds project, writes agent code, tests locally. |
| "Write evals and run them" | Creates evalset, configures LLM-as-judge, runs `agents-cli eval run`. |
| "Deploy this to Cloud Run" | Adds deployment target configuration, deploys to Cloud Run. |
| "Set up observability" | Provisions service account, Cloud Storage bucket, and BigQuery dataset. |

Agents CLI skills provide the necessary context for your AI development
tool to use appropriate ADK patterns, structure evaluations,
and configure deployments.

## What's next

Explore more complex agent designs with these prompts:

- **Add tools:** "Integrate a Google Search tool so the agent can access current information."
- **Multi-agent systems:** "Create an agent that can interact with other agents using the `adk_a2a` template."
- **RAG:** "Build an agent that answers questions based on our documentation using the `agentic_rag` template."

Learn more about Agent Platform:

- [ADK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk): Create, deploy, and orchestrate agentic architectures.
- [Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime): Create, deploy, and manage agents.
- [Pricing](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing): Learn about pricing for Agent Platform.
- [Agents CLI Quickstart](https://google.github.io/agents-cli/guide/quickstart-tutorial/)
