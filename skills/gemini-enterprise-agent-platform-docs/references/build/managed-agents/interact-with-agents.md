> [!WARNING]
> This product is a Pre-GA offering, subject to the "Pre-GA Offerings Terms"
> in the General Service Terms section of the [Service Specific
> Terms](https://cloud.google.com/terms/service-terms#1), the "Agentic AI Services" terms in the [Service Specific
> Terms](https://cloud.google.com/terms/service-terms#1), and the [Additional Terms for
> Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos). Pre-GA products and features may have
> limited support, and changes to pre-GA products and features may not be
> compatible with other pre-GA versions. For more information, see the [launch stage
> descriptions](https://cloud.google.com/products/#product-launch-stages).
>
> These Pre-GA products are in various stages of internal testing and
> review. As such, **do not use proprietary, sensitive, or other
> confidential data with these products**. These products are available
> to Customers solely for limited testing and evaluation, and you may not use
> them for commercial or production purposes.

> [!NOTE]
> To see an example of interacting with agents,
> run the "Introduction to Managed Agents in Python" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/managed-agents/intro_managed_agents_python.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fmanaged-agents%2Fintro_managed_agents_python.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/managed-agents/intro_managed_agents_python.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/managed-agents/intro_managed_agents_python.ipynb)

This guide explains how to interact with deployed agents in Managed Agents API on Agent Platform
using the **Interactions API** . You'll learn how to engage with custom agents
built using the **Agents API** and the prebuilt **Antigravity** base agent,
including configuring it dynamically. It also explains how to manage and reuse
sandbox environments with environment IDs (`env_id`) and dynamically override
configurations, for example Model Context Protocol (MCP) servers, during
interactions.

For more information about the API, see the
[Interaction API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/interactions-api) reference
documentation.

> [!NOTE]
> **Note:** Model usage during the preview is billed at standard rates. For more information, see the [pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## Before you begin

Before starting interactions with agents, set up your environment:

1. If your agent uses Google Cloud Model Context Protocol (MCP) tools, grant the MCP Tool User (`roles/mcp.toolUser`) role to both your user account and the associated service account.

## Interact with Antigravity agents

The simplest way to use Managed Agents API on Agent Platform is to interact directly with
the first-party **Antigravity** base agent. You don't need to create a custom
agent resource; you can invoke the agent on the fly.

To initiate an interaction, specify the base agent target, such as
`antigravity-preview-05-2026` (or the latest preview variant), and request an
on-the-fly remote environment:

### REST

### Request variables

Before calling the API, replace the following variables:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The regional location for your interactions. Only the `global` region is supported.

### HTTP method and URL

    POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions

### Request JSON body

    {
      "stream": true,
      "background": true,
      "store": true,
      "agent": "antigravity-preview-05-2026",
      "environment": {
        "type": "remote"
      },
      "input": [
        {
          "type": "user_input",
          "content": [
            {
              "type": "text",
              "text": "Who are you, can you execute python code? Show me an example."
            }
          ]
        }
      ]
    }

### `curl` command

    curl -X POST "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Api-Revision: 2026-05-20" \
      -d '{
          "stream": true,
          "background": true,
          "store": true,
          "agent": "antigravity-preview-05-2026",
          "environment": {"type": "remote"},
          "input": [
              {
                  "type": "user_input",
                  "content": [
                      {
                          "type": "text",
                          "text": "Who are you, can you execute python code? Show me an example."
                      }
                  ]
              }
          ]
      }'

### Example response

After the initial interaction, the service returns a streaming response. The
`interaction.id` and `environment_id`, included in the `interaction.complete`
data, can be used in subsequent calls to maintain the session state. The
`interaction.id` is used to continue the conversation history, while the
`environment_id` allows reusing the same sandbox environment. For more
information, see [Manage session state](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents#manage-session-state).

    event: interaction.complete
    data: {
      "interaction": {
        "id": "1234567890",
        "status": "completed",
        "usage": {
          "total_tokens": 51132,
          "total_input_tokens": 48984,
          "input_tokens_by_modality": [
            {
              "modality": "text",
              "tokens": 48984
            }
          ],
          "total_output_tokens": 769,
          "output_tokens_by_modality": [
            {
              "modality": "text",
              "tokens": 769
            }
          ],
          "total_thought_tokens": 1379
        },
        "created": "2026-05-15T22:26:05Z",
        "updated": "2026-05-15T22:26:05Z",
        "environment_id": "env_CAE1234567890",
        "object": "interaction"
      },
      "event_type": "interaction.complete"
    }

### Python

Before running this code, set the variables described in the REST tab.

    from google import genai

    client = genai.Client(
        vertexai=True,
        project="PROJECT_ID",
        location="global",
    )

    stream = client.interactions.create(
        agent="antigravity-preview-05-2026",
        input="Who are you, can you execute python code? Show me an example.",
        environment={"type": "remote"},
        stream=True,
        background=True,
        store=True,
    )

    for event in stream:
        print(event)

The streaming response yields `InteractionSSEEvent` objects. The final
`interaction.complete` event contains the `environment_id` and interaction
`id`, which you can reuse in subsequent calls to maintain session state
and conversation history. For more information, see
[Manage session state](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents#manage-session-state).

### JavaScript

Before running this code, set the variables described in the REST tab.

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({
        vertexai: true,
        project: "PROJECT_ID",
        location: "global",
    });

    const stream = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        input: "Who are you, can you execute python code? Show me an example.",
        environment: { type: "remote" },
        stream: true,
        background: true,
        store: true,
    });

    for await (const event of stream) {
        console.log(event);
    }

The streaming response yields event objects. The final
`interaction.complete` event contains the `environment_id` and interaction
`id`, which you can reuse in subsequent calls to maintain session state
and conversation history. For more information, see
[Manage session state](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents#manage-session-state).

## Interact with a custom agent created using Agents API

To interact with a custom agent created as described in
[Create and manage agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage), you must specify it by using its agent ID.

For more information on how to retrieve or list custom agents to find their
IDs, see [List agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#list-agents).

> [!NOTE]
> **Note:** The service does not pre-provision compute resources when you create a custom agent configuration. Instead, the configuration acts as a blueprint. The service provisions the actual containers on demand when you first call the Interactions API.

### Environment configuration and initialization

When interacting with a custom agent:

- **Default behavior** : If you
  [create the agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#create-an-agent)
  with a default environment, specify the `AGENT_ID` in your request.

- **Explicitly define the environment** : If you didn't define the environment
  configuration when creating the agent, you need to explicitly define
  the environment in the `environment` block of your initial interaction
  request.

  For example:

      "environment": {"type": "remote"}

You can dynamically configure features in the sandbox environment during your
initial interaction API call to meet specific task requirements. For example:

- **Attach skill using Cloud Storage**: Attach Cloud Storage buckets to load
  large data volumes or persistent file directories into the container
  file system.

- **Attach skills using Skill Registry** : Provide a list of custom tools,
  scripts, or prepackaged agent skills to supply specific functional
  capabilities or your runtime workflow. See
  [Skill Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry).

For a list of environment configuration structures and examples of how to
maintain multi-turn conversation state, see [Manage session state with
environment IDs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents#manage-session-state).

### Send an interaction to a custom agent

Send an interaction to your custom agent by specifying the agent ID:

### REST

### Request variables

Before calling the API, replace the following variables:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: Only the `global` region is supported.
- <var translate="no">AGENT_ID</var>: The custom identifier of your registered agent resource. For more information on how to retrieve or list custom agents to find their IDs, see [List agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#list-agents).

### HTTP method and URL

    POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions

### Request JSON body

    {
      "stream": true,
      "background": true,
      "store": true,
      "agent": "AGENT_ID",
      "input": [
        {
          "type": "user_input",
          "content": [
            {
              "type": "text",
              "text": "Tell me the name of python packages used for data analysis."
            }
          ]
        }
      ]
    }

### `curl` command

    curl -X POST "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Api-Revision: 2026-05-20" \
      -d '{
          "stream": true,
          "background": true,
          "store": true,
          "agent": "AGENT_ID",
          "input": [
              {
                  "type": "user_input",
                  "content": [
                      {
                          "type": "text",
                          "text": "Tell me the name of python packages used for data analysis."
                      }
                  ]
              }
          ]
      }'

### Example Response

After the initial interaction, the service returns a streaming response. The
`interaction.id` and `environment_id`, included in the `interaction.complete`
data, can be used in subsequent calls to maintain the session state. The
`interaction.id` is used to continue the conversation history, while the
`environment_id` allows reusing the same sandbox environment. For more
information, see [Manage session state](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents#manage-session-state).

    data: {
      "interaction": {
        "id": "1234567890",
        "status": "completed",
        "usage": {
          "total_tokens": 7558,
          "total_input_tokens": 6822,
          "input_tokens_by_modality": [
            {
              "modality": "text",
              "tokens": 6822
            }
          ],
          "total_output_tokens": 278,
          "output_tokens_by_modality": [
            {
              "modality": "text",
              "tokens": 278
            }
          ],
          "total_thought_tokens": 458
        },
        "created": "2026-05-15T22:38:56Z",
        "updated": "2026-05-15T22:38:56Z",
        "environment_id": "env_CAE1234567890",
        "object": "interaction"
      },
      "event_type": "interaction.complete"
    }

### Python

Before running this code, set the variables described in the REST tab.

    from google import genai

    client = genai.Client(
        vertexai=True,
        project="PROJECT_ID",
        location="global",
    )

    stream = client.interactions.create(
        agent="AGENT_ID",
        input="Tell me the name of python packages used for data analysis.",
        stream=True,
        background=True,
        store=True,
    )

    for event in stream:
        print(event)

### JavaScript

Before running this code, set the variables described in the REST tab.

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({
        vertexai: true,
        project: "PROJECT_ID",
        location: "global",
    });

    const stream = await client.interactions.create({
        agent: "AGENT_ID",
        input: "Tell me the name of python packages used for data analysis.",
        stream: true,
        background: true,
        store: true,
    });

    for await (const event of stream) {
        console.log(event);
    }

## Manage session state and multi-turn interactions

By default, interactions are stateless unless you target a specific environment
container or conversation history. In multi-turn assistant flows, you can retain local files, code execution
context, system modifications, runtime-installed open source software
libraries, and conversation history across conversations:

- **To continue a conversation** : Pass the ID from the previous interaction to the `previous_interaction_id` parameter.
- **To continue using a created environment** : Pass the environment ID returned from the previous interaction to the `environment` parameter.

> [!NOTE]
> **Note:** It is highly recommended to reuse environments using the environment ID (`environment`) to reduce provisioning latency. Custom environments have a standard time to live (TTL) of 7 days, and any new interaction referencing the environment automatically resets this timer to ensure active sandboxes remain operational. For more details on sandbox settings and pre-installed libraries, see the [Sandbox environment reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/sandbox-environment).

You can select key environment configurations using the following parameters
in the `environment` field:

| JSON structure | Description |
|---|---|
| `"environment": {"type": "remote"}` | Provisions a fresh, standard sandbox environment. Use this option during initial interactions. |
| `"environment": "env_CAEQ..."` | Reuses the existing, persistent sandbox container, preserving all libraries, scripts, files, and state associated with this environment ID. |
| `"environment": {"type": "remote", "sources": [{"type": "gcs", "source": "gs://YOUR_BUCKET/YOUR_FILE", "target": "YOUR_TARGET_PATH"}]}` | Provisions a new remote sandbox and preloads it with custom skills or files from the specified \`sources\`, such as those stored in Google Cloud Storage. |

To send a subsequent interaction request that reuses the same sandbox container
and continues a conversation, pass the returned `environment_id` in the `environment` field
and specify `previous_interaction_id`. The following examples
demonstrate how to continue a stateful session when interacting with the agent.

### REST

### Request variables

Before calling the API, replace the following variables:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: Only the `global` region is supported.
- <var translate="no">AGENT_ID</var>: The custom identifier of your registered agent resource (or `antigravity-preview-05-2026`).
- <var translate="no">PREVIOUS_INTERACTION_ID</var>: The interaction ID returned from the previous interaction.
- <var translate="no">ENV_ID</var>: The environment ID returned from the previous interaction.

### HTTP method and URL

    POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions

### Request JSON body

    {
      "stream": true,
      "background": true,
      "store": true,
      "agent": "AGENT_ID",
      "previous_interaction_id": "PREVIOUS_INTERACTION_ID",
      "environment": "ENV_ID",
      "input": [
        {
          "type": "user_input",
          "content": [
            {
              "type": "text",
              "text": "What did I ask you before and what did you do?"
            }
          ]
        }
      ]
    }

### `curl` command

    curl -X POST "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Api-Revision: 2026-05-20" \
      -d '{
          "stream": true,
          "background": true,
          "store": true,
          "agent": "AGENT_ID",
          "previous_interaction_id": "PREVIOUS_INTERACTION_ID",
          "environment": "ENV_ID",
          "input": [
              {
                  "type": "user_input",
                  "content": [
                      {
                          "type": "text",
                          "text": "What did I ask you before and what did you do?"
                      }
                  ]
              }
          ]
      }'

### Python

Before running this code, set the variables described in the REST tab.

    from google import genai

    client = genai.Client(
        vertexai=True,
        project="PROJECT_ID",
        location="global",
    )

    stream = client.interactions.create(
        agent="AGENT_ID",
        input="What did I ask you before and what did you do?",
        previous_interaction_id="PREVIOUS_INTERACTION_ID",
        environment="ENV_ID",
        stream=True,
        background=True,
        store=True,
    )

    for event in stream:
        print(event)

In the Python SDK, pass the `environment_id` string directly as the
`environment` parameter to reuse an existing sandbox container. Use
`previous_interaction_id` to continue the conversation history.

### JavaScript

Before running this code, set the variables described in the REST tab.

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({
        vertexai: true,
        project: "PROJECT_ID",
        location: "global",
    });

    const stream = await client.interactions.create({
        agent: "AGENT_ID",
        input: "What did I ask you before and what did you do?",
        previous_interaction_id: "PREVIOUS_INTERACTION_ID",
        environment: "ENV_ID",
        stream: true,
        background: true,
        store: true,
    });

    for await (const event of stream) {
        console.log(event);
    }

In the JavaScript SDK, pass the `environment_id` string directly as the
`environment` parameter to reuse an existing sandbox container. Use
`previous_interaction_id` to continue the conversation history.

## Override configurations during interaction

While custom agent definitions typically include default configurations for
tools, skills, and third-party connections, you can dynamically adjust these
definitions on a per-interaction basis without modifying the underlying agent
resource configuration.

A common use case is dynamically overriding connections to
**Model Context Protocol (MCP)** servers at runtime. Any tools or MCP servers
specified in the interaction request body completely override the agent's
preconfigured tools for the duration of that interaction turn.

To override or define an MCP server at interaction time, add an `mcp_server`
type tool inside the `tools` list of your interaction request:

### REST

### Request variables

Before calling the API, replace the following variables:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The location for your interaction. Only the `global` region is supported.
- <var translate="no">AGENT_ID</var>: The custom identifier of your agent resource.
- <var translate="no">MCP_SERVER_URL</var>: The remote HTTP gateway URL of the new MCP server.
- <var translate="no">MCP_SERVER_NAME</var>: A descriptive label for the target MCP host domain.
- <var translate="no">MCP_HEADER_KEY</var>: Optional. The header key name (for example, `Authorization`).
- <var translate="no">MCP_HEADER_VALUE</var>: Optional. The credential value (for example, `Bearer <token>`).

### HTTP method and URL

    POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions

### Request JSON body

    {
      "stream": true,
      "background": true,
      "store": true,
      "agent": "agents/AGENT_ID",
      "input": [
        {
          "type": "user_input",
          "content": [
            {
              "type": "text",
              "text": "Analyze our database and summarize recent purchase events."
            }
          ]
        }
      ],
      "tools": [
        {
          "type": "mcp_server",
          "url": "MCP_SERVER_URL",
          "name": "MCP_SERVER_NAME",
          "headers": {
            "MCP_HEADER_KEY": "MCP_HEADER_VALUE"
          }
        }
      ]
    }

### `curl` command

    curl -X POST "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/interactions" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Api-Revision: 2026-05-20" \
      -d '{
         "stream": true,
         "background": true,
         "store": true,
         "agent": "agents/AGENT_ID",
         "input": [
             {
                 "type": "user_input",
                 "content": [
                     {
                         "type": "text",
                         "text": "Analyze our database and summarize recent purchase events."
                     }
                 ]
             }
         ],
         "tools": [
             {
                 "type": "mcp_server",
                 "url": "MCP_SERVER_URL",
                 "name": "MCP_SERVER_NAME",
                 "headers": {
                     "MCP_HEADER_KEY": "MCP_HEADER_VALUE"
                 }
             }
         ]
      }'

### Python

Before running this code, set the variables described in the REST tab.

    from google import genai

    client = genai.Client(
        vertexai=True,
        project="PROJECT_ID",
        location="global",
    )

    stream = client.interactions.create(
        agent="AGENT_ID",
        input="Analyze our database and summarize recent purchase events.",
        tools=[
            {
                "type": "mcp_server",
                "url": "MCP_SERVER_URL",
                "name": "MCP_SERVER_NAME",
                "headers": {
                    "MCP_HEADER_KEY": "MCP_HEADER_VALUE"
                },
            }
        ],
        stream=True,
        background=True,
        store=True,
    )

    for event in stream:
        print(event)

### JavaScript

Before running this code, set the variables described in the REST tab.

    import { GoogleGenAI } from "@google/genai";

    const client = new GoogleGenAI({
        vertexai: true,
        project: "PROJECT_ID",
        location: "global",
    });

    const stream = await client.interactions.create({
        agent: "AGENT_ID",
        input: "Analyze our database and summarize recent purchase events.",
        tools: [
            {
                type: "mcp_server",
                url: "MCP_SERVER_URL",
                name: "MCP_SERVER_NAME",
                headers: {
                    "MCP_HEADER_KEY": "MCP_HEADER_VALUE",
                },
            },
        ],
        stream: true,
        background: true,
        store: true,
    });

    for await (const event of stream) {
        console.log(event);
    }

## What's next

Overview

### [Managed Agents API on Agent Platform overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents)

Learn about Managed Agents API on Agent Platform, a config-driven, REST-first environment for building autonomous agents.

Reference

### [Managed Agents API on Agent Platform sandbox environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/sandbox-environment)

Learn about the isolated sandbox container, permissions, and pre-installed packages/tools.
