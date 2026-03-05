# Agents

Agents are systems that intelligently accomplish tasks—from simple goals to complex, open-ended workflows. OpenAI provides models with agentic strengths, a toolkit for agent creation and deploys, and dashboard features for monitoring and optimizing agents.

## AgentKit

AgentKit is a modular toolkit for building, deploying, and optimizing agents.

## How to build an agent

Building an agent is a process of designing workflows and connecting pieces of the OpenAI platform to meet your goals. Agent Builder brings all these primitives into one UI.

| <div style={{ minWidth: '150px', whiteSpace: 'nowrap' }}>Goal</div> | What to use                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build an agent workflow                                             | [Agent Builder](https://developers.openai.com/api/docs/guides/agent-builder)                                                                                                         | Visual canvas for creating agent workflows. Brings models, tools, knowledge, and logic all into one place.                                                                                                                                                                                                                |
| Connect to LLMs                                                     | [OpenAI models](https://developers.openai.com/api/docs/models)                                                                                                                       | Core intelligence capable of reasoning, making decisions, and processing data. Select your model in Agent Builder.                                                                                                                                                                                                        |
| Equip your agent                                                    | [Tools](https://developers.openai.com/api/docs/guides/node-reference#tool-nodes), [guardrails](https://developers.openai.com/api/docs/guides/node-reference#guardrails)                                           | Access to third-party services with connectors and MCP, search vector stores, and prevent misuse. See [Function calling](https://developers.openai.com/api/docs/guides/function-calling), [Web search](https://developers.openai.com/api/docs/guides/tools-web-search), [File search](https://developers.openai.com/api/docs/guides/tools-file-search), and [Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use). |
| Provide knowledge and memory                                        | [Vector stores](https://developers.openai.com/api/docs/guides/retrieval#vector-stores), [file search](https://developers.openai.com/api/docs/guides/tools-file-search), [embeddings](https://developers.openai.com/api/docs/guides/embeddings) | External and persistent knowledge for more relevant information for your use case, hosted by OpenAI.                                                                                                                                                                                                                      |
| Add control-flow logic                                              | [Logic nodes](https://developers.openai.com/api/docs/guides/node-reference#logic-nodes)                                                                                              | Custom logic for how agents work together, handle conditions, and route to other agents.                                                                                                                                                                                                                                  |
| Write your own code                                                 | [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk)                                                                                                               | Build agentic applications, with tools and orchestration, instead of using Agent Builder as the backend.                                                                                                                                                                                                                  |

To build a voice agent that understands audio and responds in natural language, see the [voice agents docs](https://developers.openai.com/api/docs/guides/voice-agents). Voice agents are not supported in Agent Builder.

## Deploy agents in your product

When you're ready to bring your agent to production, use ChatKit to bring the agent workflow into your product UI, with an embeddable chat connected to your agentic backend.

| <div style={{ minWidth: '175px', whiteSpace: 'nowrap' }}>Goal</div> | <div style={{ minWidth: '130px', whiteSpace: 'nowrap' }}>What to use</div> | Description                                                                                       |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Embed your agent                                                    | [ChatKit](https://developers.openai.com/api/docs/guides/chatkit)                                        | Customizable UI component. Paste your workflow ID to embed your agent workflow in your product.   |
| Get more customization                                              | [Advanced ChatKit](https://developers.openai.com/api/docs/guides/agents-sdk)                            | Run ChatKit on your own infrastructure. Use widgets and connect to any agentic backend with SDKs. |

## Optimize agent performance

Use the OpenAI platform to evaluate agent performance and automate improvements.

| <div style={{ minWidth: '175px', whiteSpace: 'nowrap' }}>Goal</div> | <div style={{ minWidth: '130px', whiteSpace: 'nowrap' }}>What to use</div> | Description                                                                        |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Evaluate agent performance                                          | [Evals features](https://developers.openai.com/api/docs/guides/agent-evals)                             | Full evaluation platform, including support for external model evaluation.         |
| Automate trace grading                                              | [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)                            | Develop, deploy, monitor, and improve agents.                                      |
| Build and track evals                                               | [Datasets](https://developers.openai.com/api/docs/guides/evaluation-getting-started)                    | A collaborative interface to build agent-level evals in a test environment.        |
| Optimize prompts                                                    | [Prompt optimizer](https://developers.openai.com/api/docs/guides/prompt-optimizer)                      | Measure agent performance, identify areas for improvement, and refine your agents. |

## Get started

Design an agent workflow with [Agent Builder](https://developers.openai.com/api/docs/guides/agent-builder) →