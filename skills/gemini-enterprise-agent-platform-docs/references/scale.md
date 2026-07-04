Gemini Enterprise Agent Platform offers the following to help you seamlessly scale your agents
in production.

Bringing AI agents into production requires a high-performance runtime and a
systematic approach to continuous improvement. As organizations build complex,
dynamic applications, Agent Platform provides a fully managed
environment for developers to handle testing, release management, and
reliability at a global scale. This allows teams to focus entirely on
application creation by providing essential services across four critical areas:

- **Serverless efficiency:** Utilizing a fully managed Agent Runtime to deploy and scale agents efficiently without the need to manage underlying infrastructure, ensuring reliable performance with built-in observability.
- **Context management:** Utilizing Agent Platform Sessions and an Agent Platform Memory Bank to maintain the state of continuous conversations and retrieve persistent, long-term memories, enabling highly personalized and natural user interactions.
- **Continuous quality improvement:** Leveraging the Example Store and Evaluation Service to test, monitor, and trace agent behavior, creating a continuous feedback loop and data flywheel to iteratively refine agent performance over time.
- **Secure sandbox execution:** Empowering agents to safely solve complex computational problems and automate workflows through dynamic Code Execution and Computer Use, allowing them to run scripts or mimic human-like interactions with graphical interfaces.

## Agent Runtime

### Deploy and manage agents

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents)

Learn how to manage agents that have been deployed to the Agent Platform managed runtime.

Guide

### [Manage agent access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access)

Learn how to manage access to your agents deployed on Agent Platform, such as agent identity, service accounts, API keys, and OAuth clients.

### Monitor agents

Guide

### [Set up tracing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing)

Learn how to enable Cloud Trace on your agent and view traces to analyze query response times and executed operations.

Guide

### [Set up logging](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/logging)

Learn how to set up Cloud Logging for your agents deployed on Agent Platform.

Guide

### [Set up monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/monitoring)

Learn how to use built-in metrics, custom metrics, and alerts to monitor your agents in Agent Platform.

### Use agents

Guide

### [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent)

Use an agent with Agent Platform Runtime.

Guide

### [Use a custom agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent)

Use a custom agent with Agent Platform Runtime.

Guide

### [Use a LangChain agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent)

Use a LangChain agent with Agent Platform Runtime.

Guide

### [Use a LangGraph agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent)

Use a LangGraph agent with Agent Platform Runtime.

Guide

### [Use a LlamaIndex Query Pipeline agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-llamaindex-agent)

Use a LlamaIndex Query Pipeline agent with Agent Platform Runtime.

Guide

### [Use an Agent2Agent agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent)

Use an Agent2Agent agent with Agent Platform Runtime.

Guide

### [Use an Agent Development Kit agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent)

Use an Agent Development Kit (ADK) agent with Agent Platform Runtime.

Guide

### [Use an AG2 agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent)

Use an AG2 agent with Agent Platform Runtime.

### Security and performance

Guide

### [Use IAM agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity)

Learn how to use Identity Access Management (IAM) agent identity to provide security and access management features with Agent Platform.

Guide

### [Route Agent Runtime traffic through Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy)

Learn how to route Agent Runtime traffic through Agent Gateway for secure and governed connectivity.

Guide

### [Use bidirectional streaming](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/bidirectional-streaming)

Learn how to use bidirectional streaming to build real-time applications with Agent Platform.

Guide

### [Optimize and scale Agent Platform Runtime performance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale)

Learn best practices to optimize and scale Agent Platform Runtime performance using deployment parameters.

Guide

### [Use a Private Service Connect interface with Agent Platform Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/private-service-connect-interface)

Learn to configure a Private Service Connect (PSC) interface to securely connect your agent to your VPC and manage internet access.

## Sessions

Overview

### [Sessions overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions)

Learn how to use sessions to maintain conversation state with your agents.

Guide

### [Manage sessions with Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-adk)

Learn how to manage sessions with Agent Development Kit.

Guide

### [Manage sessions using the console or API calls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-api)

Learn how to manage sessions using the console or API calls.

Guide

### [Control access to sessions with IAM Conditions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions)

Learn how to control access to sessions with IAM Conditions.

## Memory Bank

### Get started

Overview

### [Memory Bank overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank)

Learn how to use Memory Bank to store long-term user preferences and facts.

Quickstart

### [Memory Bank API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/api-quickstart)

Get started with the Memory Bank API to manage long-term memories.

Quickstart

### [Quickstart with Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/adk-quickstart)

Get started with the Agent Development Kit (ADK).

Guide

### [Set up Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup)

Learn how to set up Memory Bank.

### Manage memories

Guide

### [Generate memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories)

Learn how to generate memories in Memory Bank.

Guide

### [Ingest events](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/ingest-events)

Learn how to ingest events into Memory Bank.

Guide

### [Memory profiles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/profiles)

Learn how to use memory profiles in Memory Bank.

Guide

### [Fetch memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories)

Learn how to fetch generated and uploaded memories.

Guide

### [Inspect memory revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions)

Learn how to inspect memory revisions.

Guide

### [Control access to Memory Bank with IAM Conditions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions)

Learn how to control access to Memory Bank with IAM Conditions.

## Code Execution

Overview

### [Code Execution overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/code-execution-overview)

Get an overview of Code Execution.

Quickstart

### [Code Execution quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/code-execution-quickstart)

Get started with Code Execution.
