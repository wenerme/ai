> [!NOTE]
> To see an example of getting started with Gemini Enterprise Agent Runtime,
> run the "Building and Deploying an Agent with Gemini Enterprise Agent Platform" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/intro_agent_engine.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fagent-engine%2Fintro_agent_engine.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/agent-engine/intro_agent_engine.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/intro_agent_engine.ipynb)

[Video](https://www.youtube.com/watch?v=NrgoZLcY3Kk)

**Agent Runtime** is a set of services that enables developers to deploy,
manage, and scale AI agents in production. Agent Runtime handles the
infrastructure to scale agents in production so you can focus on creating
applications. Agent Runtime offers the following services that you can use
individually or in combination:

- **Runtime** :
  - [Deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) and scale agents with a managed runtime and end-to-end management capabilities.
  - Customize the agent's container image with build-time installation scripts for system dependencies.
  - Use security features including VPC-SC compliance and configuration of authentication and IAM.
  - Access models and tools such as [function
    calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).
  - Deploy agents built using [different Python
    frameworks](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime#supported-frameworks) and the [Agent2Agent open protocol](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-a2a-agent).
- **Quality and evaluation** (Preview): Evaluate agent quality with the integrated [Gen AI Evaluation service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation) and optimize agents with Gemini model training runs.
- [**Agent Platform Sessions**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions): Agent Platform Sessions lets you store individual interactions between users and agents, providing definitive sources for conversation context.
- [**Agent Platform Memory Bank**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank): Agent Runtime Agent Platform Memory Bank lets you store and retrieve information from sessions to personalize agent interactions.
- [**Code Execution**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/code-execution-overview): Agent Runtime Code Execution lets your agent run code in a secure, isolated, and managed sandbox environment.
- **Example Store** (Preview): Store and dynamically retrieve few-shot examples to improve agent performance.
- **Observability** : Understand agent behavior with [Google
  Cloud Trace](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/traces) (supporting [OpenTelemetry](https://opentelemetry.io/)), [Cloud Monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview), and [Cloud Logging](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview#observability-signals).
- **Governance** : Agent Runtime supports several features to help you govern agents in production and meet your security and enterprise needs:
  - **Detect threats with Security Command Center** : [Agent Runtime Threat Detection](https://docs.cloud.google.com/security-command-center/docs/agent-platform-threat-detection-overview) (Preview) is a built-in service of Security Command Center that helps you detect and investigate potential attacks on agents that are deployed to Agent Runtime.
  - [**Agent identity**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity) (Preview): Use [Identity Access Management
    (IAM)](https://docs.cloud.google.com/iam/docs/overview) agent identity to provide security and access management features when using agents on Agent Runtime.
  - [**Agent Gateway**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview) (Preview): Use Agent Gateway to define rules for agentic communications and enforce security and access control policies across agents, clients, and tools connecting to and from your Google Cloud project.

> [!NOTE]
> **Note:** Because the name of Agent Runtime changed over time, the name of the resource in the API reference is [`ReasoningEngine`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines) to maintain backwards compatibility.

## Create and deploy on Agent Runtime

> [!NOTE]
> **Note:** For a streamlined, *IDE-based* development and deployment experience with Agent Runtime, consider the [Agents CLI in Agent Platform](https://google.github.io/agents-cli/). It provides a unified interface for the Agent Development Lifecycle, assisting with experimentation, deployment, evaluation, and observability.

The workflow for building an agent on Agent Runtime is:

1. [**Set up the environment**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup): Set up your Google project and install the latest version of the Agent Platform SDK for Python.
2. [**Develop an agent**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent): Develop an agent that can be deployed on Agent Runtime.
3. [**Deploy the agent**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent): Deploy the agent on the Agent Runtime managed runtime.
4. [**Use the agent**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent): Query the agent by sending an API request.
5. [**Manage the deployed
   agent**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents): Manage and delete agents that you have deployed to Agent Runtime.

The steps are illustrated by the following diagram:

![Create and deploy an agent](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/use-case-prototype-to-production.png)

## Supported frameworks

The following table describes the level of support Agent Runtime provides for
various agent frameworks:

| Support level | Agent frameworks |
|---|---|
| **Custom template**: You can adapt a custom template to support deployment to Agent Runtime from your framework. | [CrewAI](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_crewai_agent_engine_customized_template.ipynb), [custom frameworks](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent) |
| **Agent Platform SDK integration**: Agent Runtime provides managed templates per framework in the Agent Platform SDK and documentation. | [LangChain](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langchain-agent), [LangGraph](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent), [AG2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent), [LlamaIndex](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent) |
| **Full integration**: Features are integrated to work across the framework, Agent Runtime, and broader Google Cloud ecosystem. | [Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent) |

## Deploy in production with Agents CLI

The [Agents CLI](https://google.github.io/agents-cli/) is the unified
command-line interface and skill set for the Gemini Enterprise Agent Platform.
It provides coding agents and developers with a predictable path through the
Agent Development Lifecycle: scaffold, evaluate, deploy, publish, and observe.
The Agents CLI provides the following:

- **Pre-built agent templates:** ReAct, RAG, multi-agent, and other templates.
- **Interactive playground**: Test and interact with your agent.
- **Automated infrastructure** : Uses [Terraform](https://cloud.google.com/docs/terraform) for streamlined resource management.
- **CI/CD pipelines**: Automated deployment workflows leveraging Cloud Build.
- **Observability**: Built-in support for Cloud Trace and Cloud Logging.

To get started, see the
[Quickstart](https://google.github.io/agents-cli/).

## Use cases

To learn about Agent Runtime with end-to-end examples, see the following
resources:

### Click to expand use cases

| Use Case | Description | Links ||
|---|---|---|---|
| Build agents by connecting to public APIs | Convert between currencies. Create a function that connects to a currency exchange app, allowing the model to provide accurate answers to queries such as "What's the exchange rate for euros to dollars today?" | [Agent Platform SDK (Python) notebook - Intro to Building and Deploying an Agent with Agent Runtime](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/intro_agent_engine.ipynb) |
| Build agents by connecting to public APIs | Designing a community solar project. Identify potential locations, look up relevant government offices and suppliers, and review satellite images and solar potential of regions and buildings to find the optimal location to install your solar panels. | [Agent Platform SDK (Python) notebook - Building and Deploying a Google Maps API Agent with Agent Runtime](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_google_maps_agent.ipynb) |
| Build agents by connecting to databases | Integration with AlloyDB and Cloud SQL for PostgreSQL. | [Blog post - Announcing LangChain on Gemini Enterprise Agent Platform for AlloyDB and Cloud SQL for PostgreSQL](https://cloud.google.com/blog/products/databases/alloydb-and-cloudsql-for-postgresql-on-langchain-on-vertex-ai) [Agent Platform SDK (Python) notebook - Deploying a RAG Application with Cloud SQL for PostgreSQL to Agent Runtime](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_cloud_sql_pg_rag_agent.ipynb) [Agent Platform SDK (Python) notebook - Deploying a RAG Application with AlloyDB for PostgreSQL to Agent Runtime](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_alloydb_rag_agent.ipynb) |
| Build agents by connecting to databases | Build agents with tools that access data in your database. | [Agent Platform SDK (Python) notebook - Deploying an Agent with Agent Runtime and MCP Toolbox for Databases](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_mcp_toolbox_for_databases.ipynb) |
| Build agents by connecting to databases | Query and understand structured datastores using natural language. | [Agent Platform SDK (Python) notebook - Building a Conversational Search Agent with Agent Runtime and RAG on Agent Search](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_vertex_ai_search_rag_agent.ipynb) |
| Build agents by connecting to databases | Query and understand graph databases using natural language | [Blog post - GenAI GraphRAG and AI agents using Agent Runtime with LangChain and Neo4j](https://www.googlecloudcommunity.com/gc/Cloud-Product-Articles/GenAI-GraphRAG-and-AI-agents-using-Vertex-AI-Reasoning-Engine/ta-p/789066) |
| Build agents by connecting to databases | Query and understand vector stores using natural language | [Blog post - Simplify GenAI RAG with MongoDB Atlas and Agent Runtime](https://www.mongodb.com/developer/products/atlas/ragdeployment-vertex-ai-reasoning-engine/) |
| Build agents with Agent Development Kit | Build and deploy agents using Agent Development Kit. | [Agent Development Kit -- Deploy to Agent Runtime](http://google.github.io/adk-docs/deploy/agent-engine) |
| Build agents with Agent Development Kit | Build agents with OSS frameworks | Build and deploy agents using the OneTwo open-source framework. | [Blog post - OneTwo and Agent Runtime: exploring advanced AI agent development on Google Cloud](https://www.googlecloudcommunity.com/gc/Community-Blogs/OneTwo-and-Vertex-AI-Reasoning-Engine-exploring-advanced-AI/ba-p/788254) |
| Build agents with Agent Development Kit | Build agents with OSS frameworks | Build and deploy agents using the LangGraph open-source framework. | [Agent Platform SDK (Python) notebook - Building and Deploying a LangGraph Application with Agent Runtime](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_langgraph.ipynb) |
| Debugging and optimizing agents | Build and trace agents using OpenTelemetry and Cloud Trace. | [Agent Platform SDK (Python) notebook - Debugging and Optimizing Agents: A Guide to Tracing in Agent Runtime](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tracing_agents_in_agent_engine.ipynb) |
| Build multi-agent systems with A2A protocol (preview) | Build interoperable agents that communicate and collaborate with other agents regardless of their framework. | For more information, see the [A2A protocol documentation](https://a2a-protocol.org/). |

## Enterprise security

Agent Runtime supports several features to help you meet
enterprise security requirements, adhere to your organization's security
policies, and follow security best practices. The following features are
supported:

- **VPC Service Controls** : Agent Runtime supports [VPC Service Controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-service-controls)
  to strengthen data security and mitigate the risks of data exfiltration. For
  more information, see [Agent Runtime
  VPC Service Controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#vpc-sc).

- **Private Service Connect interface** : For Agent Runtime,
  [PSC-I](https://docs.cloud.google.com/vpc/docs-about-private-service-connect-interfaces) lets your agents
  interact with privately hosted services in a user's VPC. For more
  information, see [Using Private Service Connect interface with
  Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/private-service-connect-interface).

- **Customer-managed encryption keys (CMEK)** : Agent Runtime supports
  [CMEK](https://docs.cloud.google.com/kms/docs/cmek) to protect your data with your own encryption keys,
  which gives you ownership and full control of the keys that protect your
  data at rest in Google Cloud. For more information, see [Agent Runtime
  CMEK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#cmek).

- **Data residency (DRZ)** : Agent Runtime supports [Data residency (DRZ)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency) to ensure that all data at rest are
  stored within the specified region.

- **HIPAA** : As a part of Agent Platform, Agent Runtime
  supports [HIPAA](https://cloud.google.com/security/compliance/hipaa)
  workloads.

- **Access Transparency** : Access Transparency provides you with logs that capture
  the actions Google personnel take when accessing your content. For more
  information about how to enable Access Transparency for Agent Runtime, see
  [Access Transparency in Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-transparency).

The following table shows which enterprise security features are supported for
each Agent Platform service:

| Security feature | Agent Runtime | Sessions | Memory Bank | Example Store | Code Execution |
|---|---|---|---|---|---|
| VPC Service Controls | Yes | Yes | Yes | No | Yes |
| Customer-managed encryption keys | Yes | Yes | Yes | No | Yes |
| Data residency (DRZ) at rest | Yes | Yes | Yes | No | Yes |
| HIPAA | Yes | Yes | Yes | Yes | Yes |
| Access Transparency | Yes | Yes | Yes | No | No |
| Access Approval | Yes | Yes | Yes | No | No |

> [!NOTE]
> **Note:** Agent Platform Memory Bank uses Generative AI models to generate memories. [Machine learning (ML) processing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/resources/data-residency) occurs within the specific region or multi-region of the [model endpoint used by
> Agent Platform Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#generation-config).

## Supported regions

See
[Locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations#supported-regions-agent-engine)
for a list of supported regions for Agent Runtime.

## Quota

See [Quota and system
limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-quotas) for
Agent Runtime quota information.

## Pricing

A free tier is available for Agent Runtime. For information about pricing for
Agent Runtime, see [Gemini Enterprise Agent Platform
pricing](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing).

## Migration to the client-based SDK

The `agent_engines` module within the Agent Platform SDK is being refactored to a
client-based design for the following key reasons:

- To align with the [Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk) (ADK) and Google Gen AI SDK in canonical type representations. This ensures a consistent and standardized way of representing data types across different SDKs, which simplifies interoperability and reduces conversion overhead.
- For client-level scoping of Google Cloud parameters in multi-project multi-location applications. This allows an application to manage interactions with resources across different Google Cloud projects and geographical locations by configuring each client instance with its specific project and location settings.
- To improve discoverability and cohesiveness of Agent Runtime services

## What's next

Guide

### [Agent Platform Runtime setup](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup)

Set up your environment to use Agent Platform Runtime.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Get support for Agent Platform development.
