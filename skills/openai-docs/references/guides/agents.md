# Agents SDK

Agents are applications that plan, call tools, collaborate across specialists, and keep enough state to complete multi-step work.

- Use the [**Responses API**](https://developers.openai.com/api/reference/responses/overview) when one model call plus tools and application-owned logic is enough.
- Use the **Agents SDK** pages when your application owns orchestration, tool execution, approvals, and state.

## Get your first agent running

Start with the [Agents SDK quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart) to install the SDK, define one agent, and run it. Once that works, return here to choose the next capability your application needs.

## Get the Agents SDK

Use the GitHub repositories for more examples, issues, and language-specific reference details.

<div class="not-prose mt-4 grid gap-3">
  <a
    href="https://github.com/openai/openai-agents-js"
    class="block no-underline hover:no-underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    

<span slot="icon">
        </span>
      Open the TypeScript SDK repository on GitHub.


  </a>
  <a
    href="https://github.com/openai/openai-agents-python"
    class="block no-underline hover:no-underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    

<span slot="icon">
        </span>
      Open the Python SDK repository on GitHub.


  </a>
</div>

## Choose your starting point

| If you want to                           | Start here                                                                                                                                             | Why                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Build a code-first agent app             | [Quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart)                                                                                                       | This is the shortest path to a working SDK integration.                                        |
| Define one specialist cleanly            | [Agent definitions](https://developers.openai.com/api/docs/guides/agents/define-agents)                                                                                             | Start here when you are still shaping the contract for a single agent.                         |
| Choose models, defaults, and transport   | [Models and providers](https://developers.openai.com/api/docs/guides/agents/models)                                                                                                 | Use this when model choice, provider setup, or transport strategy affects the workflow.        |
| Understand the runtime loop and state    | [Running agents](https://developers.openai.com/api/docs/guides/agents/running-agents)                                                                                               | This is where the agent loop, streaming, and continuation strategies live.                     |
| Run work in a container-based environment | [Sandbox agents](https://developers.openai.com/api/docs/guides/agents/sandboxes)                                                                                                    | Use this when the agent needs files, commands, packages, snapshots, mounts, or provider links. |
| Design specialist ownership              | [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration)                                                                                    | Use this when you need more than one agent and must decide who owns the reply.                 |
| Add validation or human review           | [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)                                                                            | Use this when the workflow should block or pause before risky work continues.                  |
| Understand what a run returns            | [Results and state](https://developers.openai.com/api/docs/guides/agents/results)                                                                                                   | This page explains final output, resumable state, and next-turn surfaces.                      |
| Add hosted tools, function tools, or MCP | [Using tools](https://developers.openai.com/api/docs/guides/tools#usage-in-the-agents-sdk) and [Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) | Tool semantics live in the platform tools docs; SDK-specific MCP and tracing live here.        |
| Inspect and improve runs                 | [Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) and [evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals)      | Use traces for debugging first, then move into evaluation loops.                               |
| Build a voice-first workflow             | [Voice agents](https://developers.openai.com/api/docs/guides/voice-agents)                                                                                                          | Use the SDK's voice pipeline and realtime agent patterns.                                      |

## Build with the SDK

Use the SDK track when your server owns orchestration, tool execution, state, and approvals. That path is the best fit when you want:

- typed application code in TypeScript or Python
- direct control over tools, MCP servers, and runtime behavior
- custom storage or server-managed conversation strategies
- tight integration with existing product logic or infrastructure

A typical SDK reading order is:

- Start with [Quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart) to get one working run on screen.
- Use [Agent definitions](https://developers.openai.com/api/docs/guides/agents/define-agents) and [Models and providers](https://developers.openai.com/api/docs/guides/agents/models) to shape one specialist cleanly.
- Continue to [Running agents](https://developers.openai.com/api/docs/guides/agents/running-agents), [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration), and [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) as the workflow grows more complex.
- Use [Results and state](https://developers.openai.com/api/docs/guides/agents/results) and [Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) when application logic depends on the run object or deeper visibility into behavior.