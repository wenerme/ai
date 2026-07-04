Model Armor helps you ensure that your AI agents follow your security
and governance standards without requiring you to implement filtering logic
directly within the agents. When you configure Model Armor with
Agent Gateway, Model Armor applies your organization's
content security guardrails by inspecting all prompts and responses that pass
through the gateway. This feature lets you enforce content security guardrails
consistently across all agents governed by the gateway.
Model Armor helps you mitigate risks such as prompt injection,
jailbreak attempts, leakage of sensitive information, and generation of harmful
content. For more information, see [Model Armor
filters](https://docs.cloud.google.com/model-armor/overview#ma-filters).

### Model Armor templates

To configure Model Armor on a gateway, create templates that
specify how to screen the prompts and responses that your AI agents receive and
return. The templates provide customized filters and thresholds for multiple
safety and security categories. For more information, see
[Model Armor templates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview#ma-templates).

Model Armor embeds screening capabilities directly into the
communication pathways governed by Agent Gateway. By passing the
content through Model Armor, the gateway enforces your
content security templates. In your template, you can configure
Model Armor to redact or block content that violates
your templates.

## Ingress and egress traffic

Through Agent Gateway, Model Armor can help protect
the following traffic flows.

### Client-to-Agent (agent ingress)

You define templates that Model Armor uses to evaluate both
requests and responses within Client-to-Agent traffic. You can apply a single
template to both directions or configure different templates for each.

Model Armor follows the templates when screening the following:

- Incoming requests from the *client* (end users or calling applications) to your AI agent
- Outgoing responses from the AI agent back to the client

When a client sends a prompt to the agent, Agent Gateway intercepts the
traffic and sends the payload to
Model Armor for sanitization. If Model Armor
issues an `ALLOW` verdict, Agent Gateway sends the prompt to the AI
agent. If Model Armor issues a `BLOCK` verdict, the client
receives an error, and the flow ends before reaching the AI agent.

After the AI agent processes the request and generates a response,
Agent Gateway intercepts the outgoing stream before it reaches the
client. Model Armor evaluates the response and issues a verdict.
Based on the verdict, Agent Gateway either allows or entirely blocks
the response.

### Agent-to-Anywhere (agent egress)

You define templates that Model Armor uses to evaluate requests
and responses in Agent-to-Anywhere traffic. You can apply a single
template to both directions or configure different templates for each.

Model Armor follows the templates when screening communications
between your AI agent and external systems, including the following:

- External large language models (LLMs)
- Third-party AI agents
- Model Context Protocol (MCP) servers

When an AI agent communicates with an external system, Agent Gateway
intercepts the egress traffic and calls Model Armor.
Model Armor evaluates the payload according to the egress
templates that you set.

If the outbound data violates your safety policies, Model Armor
issues a `BLOCK` verdict. Agent Gateway then terminates the connection
to prevent harmful or sensitive data from reaching the LLM, tool, or
external AI agent.

## Before you begin

Enable the Model Armor API.

**Roles required to enable APIs**

To enable APIs, you need the Service Usage Admin IAM
role (`roles/serviceusage.serviceUsageAdmin`), which
contains the `serviceusage.services.enable` permission. [Learn how to grant
roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

[Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=modelarmor.googleapis.com)

### Required roles

To get the permissions that
you need to create Model Armor templates,

ask your administrator to grant you the
[Model Armor Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/modelarmor#modelarmor.admin) (`roles/modelarmor.admin`) IAM role on the project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

For the roles required to work with Agent Gateway, see [Required
roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#required-roles)
in the Agent Gateway documentation.

For information about supported and unsupported payloads that pass through the
gateway, see [Supported and unsupported
payloads](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor#supported-unsupported-payloads) in this document.

## Configure Model Armor on a gateway

To configure Model Armor on a gateway, follow these steps:

1. [Enable the Model Armor API](https://docs.cloud.google.com/model-armor/manage-templates#enable-apis) in the project where you want to create the Model Armor templates.
2. [Create one or more Model Armor
   templates](https://docs.cloud.google.com/model-armor/manage-templates#create-ma-template) in the same
   region where you plan to add the gateway. You can use the same template
   for both ingress and egress traffic.

   Take note of the template names. To copy the name of a template in the
   Google Cloud console, [view the template's
   details](https://docs.cloud.google.com/model-armor/manage-templates#view-ma-template) and click **Copy to clipboard** next to
   the template name.
3. Set up Agent Gateway in the same region where the
   Model Armor templates are stored. For the [Client-to-Agent
   (ingress)
   gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#config-client-to-agent),
   specify the
   Model Armor templates that you created for ingress traffic.
   For the [Agent-to-Anywhere (egress)
   gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#config-agent-to-anywhere),
   specify the Model Armor templates that you created for egress
   traffic. You can use the same template for both traffic flows.

4. Grant the required IAM roles to the
   appropriate service accounts:

   - **Client-to-Agent (ingress)** : Grant the [AI Platform Reasoning Engine
     Service
     Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#service-agent)
     service account the following roles:

     - The Model Armor Callout User (`roles/modelarmor.calloutUser`) role in
       the project that
       contains the AI agent.

     - The Model Armor User (`roles/modelarmor.user`) role in the
       project that contains the Model Armor template.

     ```
     gcloud projects add-iam-policy-binding AGENT_RUNTIME_PROJECT_ID \
         --member=serviceAccount:service-AGENT_RUNTIME_PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com \
         --role=roles/modelarmor.calloutUser
     gcloud projects add-iam-policy-binding MODEL_ARMOR_PROJECT_ID \
         --member=serviceAccount:service-AGENT_RUNTIME_PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com \
         --role=roles/modelarmor.user
     ```

     Replace the following:
     - `AGENT_RUNTIME_PROJECT_ID`: The project ID of the project where you created the agent.
     - `AGENT_RUNTIME_PROJECT_NUMBER`: The project number of the project where you created the agent.
     - `MODEL_ARMOR_PROJECT_ID`: The project ID of the project that contains the Model Armor template.
   - **Agent-to-Anywhere (egress)**: Grant the Agent Gateway service
     account the following roles:

     - The Model Armor Callout User (`roles/modelarmor.calloutUser`) and Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) roles in the project that contains the gateway.
     - The Model Armor User (`roles/modelarmor.user`) role in the project that contains the Model Armor template.

     ```
     gcloud projects add-iam-policy-binding GATEWAY_PROJECT_ID \
         --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
         --role=roles/modelarmor.calloutUser
     gcloud projects add-iam-policy-binding GATEWAY_PROJECT_ID \
         --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
         --role=roles/serviceusage.serviceUsageConsumer
     gcloud projects add-iam-policy-binding MODEL_ARMOR_PROJECT_ID \
         --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
         --role=roles/modelarmor.user
     ```

     Replace the following:
     - `GATEWAY_PROJECT_ID`: The project ID of the project where you created the gateway.
     - `GATEWAY_PROJECT_NUMBER`: The project number of the project where you created the gateway.
     - `MODEL_ARMOR_PROJECT_ID`: The project ID of the project that contains the Model Armor template.

     For instructions, see [Delegate authorization to
     Model Armor](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#configure-authz-ma).

   For general information about how to grant a role, see [Grant a single
   IAM
   role](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role).

## Redact sensitive data from requests and responses

You can instruct Model Armor to redact sensitive data---such
as national ID numbers and phone numbers---from payloads. To use this
feature, follow these steps:

- Set [advanced Sensitive Data Protection
  settings](https://docs.cloud.google.com/model-armor/manage-templates#set-sdp-settings) in your
  Model Armor template, and include a [de-identify
  template](https://docs.cloud.google.com/sensitive-data-protection/docs/creating-templates-deid).

- Set the [enforcement
  type](https://docs.cloud.google.com/model-armor/manage-templates#define-template-enforcement-type) on the
  Model Armor template to `INSPECT_AND_BLOCK`.

If you use the `INSPECT_AND_BLOCK` enforcement type, one of the following
occurs:

- If a payload violates only the Sensitive Data Protection detector,
  Model Armor redacts the payload according to your advanced
  Sensitive Data Protection settings and de-identify template.

- If a payload violates multiple detectors, Model Armor doesn't
  perform redaction; it blocks the entire payload.

If you use the `INSPECT_ONLY` enforcement type instead of `INSPECT_AND_BLOCK`,
Model Armor doesn't redact the payload.

Regardless of your enforcement type (`INSPECT_ONLY` or `INSPECT_AND_BLOCK`),
Model Armor logs are redacted according to your advanced
Sensitive Data Protection settings and de-identify template.

For a complete list of Model Armor detectors (also called
*filters* ), see [Model Armor
filters](https://docs.cloud.google.com/model-armor/overview#ma-filters).

## Supported and unsupported payloads

This section lists that specific payloads that Model Armor
sanitizes.

### Client-to-Agent (ingress) traffic

For Client-to-Agent (ingress) traffic using the ADK protocol,
Model Armor sanitizes only
[`reasoningEngines.streamQuery`](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines/streamQuery)
requests and responses for agents that were built using
Agent Development Kit (ADK) and are running on Vertex AI Agent Engine.

All other
[`ReasoningEngine`](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines)
payloads and `ReasoningEngine` error responses aren't sent to
Model Armor. Non-ADK payloads (such as Langchain payloads) are
also not sent to Model Armor.

### Agent-to-Anywhere (egress) traffic

For Agent-to-Anywhere (egress) traffic, the following payloads are supported.

#### A2A payloads

Model Armor sanitizes only the following payloads of the [A2A
v1 protocol](https://a2a-protocol.org/latest/):

- [Send
  Message](https://a2a-protocol.org/latest/specification/#311-send-message) operations
- [Agent Card](https://a2a-protocol.org/latest/specification/#441-agentcard)
- [Get Extended Agent
  Card](https://a2a-protocol.org/latest/specification/#3111-get-extended-agent-card) operations
- [JSON-RPC](https://a2a-protocol.org/latest/specification/#9-json-rpc-protocol-binding) protocol bindings
- [HTTP+JSON/REST](https://a2a-protocol.org/latest/specification/#11-httpjsonrest-protocol-binding) protocol bindings

Model Armor allows the following A2A payloads without
sanitization:

- Payloads from A2A versions earlier than v1
- [`SendStreamingMessage`](https://a2a-protocol.org/latest/specification/#942-sendstreamingmessage)
- [`GetTask`](https://a2a-protocol.org/latest/specification/#943-gettask)
- [`ListTasks`](https://a2a-protocol.org/latest/specification/#944-listtasks)
- [`CancelTask`](https://a2a-protocol.org/latest/specification/#945-canceltask)
- [`SubscribeToTask`](https://a2a-protocol.org/latest/specification/#946-subscribetotask)
- [CRUD
  methods](https://a2a-protocol.org/latest/specification/#1047-createtaskpushnotificationconfig) on `TaskPushNotificationConfig`
- Payloads using A2A [gRPC](https://a2a-protocol.org/latest/specification/#10-grpc-protocol-binding) protocol binding (protobuf on the wire)
- A2A error payloads

#### MCP payloads

Model Armor sanitizes only the following MCP payloads:

- `tools/call` request and response
- `prompts/get` request and response
- [MCP tool execution errors](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling) (target for prompt injection by malicious MCP tools authors)

Model Armor allows the following payloads without sanitization:

- `tools/list`
- `resources/*`
- `notifications/*`
- Streamable HTTP/SSE for MCP
- MCP protocol errors (for example, all errors other than tool execution errors)

#### External LLM payloads

Model Armor sanitizes only the following payloads of the
OpenAI API protocol (egress), which includes GPT models on `openai.com` as well
as any other models through OpenAI API-compatible LLM servers (such as
[vLLM](https://docs.vllm.ai/en/latest/serving/openai_compatible_server/#supported-apis)).
Payloads that aren't listed here are allowed without sanitization.

- [Chat
  completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions): Create, Delete, Get, List, and Update (non-streaming variants only)
- [Get chat
  messages](https://developers.openai.com/api/reference/resources/chat/subresources/completions/subresources/messages)
- [Responses](https://developers.openai.com/api/reference/resources/responses): Create, Get, and Delete (non-streaming variants only)
- [OpenAI API
  errors](https://community.openai.com/t/error-code-for-openai-chat-completion/1102402) (including [vLLM's
  variant](https://github.com/vllm-project/vllm/issues/12886))
- [Legacy
  Completions](https://developers.openai.com/api/reference/resources/beta/subresources/assistants)
- [Legacy
  Assistants](https://developers.openai.com/api/reference/resources/beta/subresources/assistants/methods/create): Create, Delete, List, Modify, and Retrieve
- [Legacy
  Messages](https://developers.openai.com/api/reference/resources/beta/subresources/threads/subresources/messages): Create, Delete, List, Modify, and Retrieve
- [Legacy Threads](https://developers.openai.com/api/reference/resources/beta/subresources/threads/methods/create): Create, Delete, Modify, and Retrieve
- [Embeddings](https://developers.openai.com/api/reference/resources/embeddings/methods/create): Create

## Supported documents

Model Armor can screen files that are sent to the agent. For
information about supported file types and sizes, see [Document
screening](https://docs.cloud.google.com/model-armor/overview#ma-support-screening-pdfs).

## Quotas and system limits

Quota is consumed in the project where the Model Armor templates
reside. If the gateway is in a different project, then `ExternalProcess` quota
is consumed in the gateway project as well.

For more information about quotas that apply when you use
Model Armor with other services, see [Manage
quotas](https://docs.cloud.google.com/model-armor/integrations#manage-quota).

For general information about Model Armor quotas and system
limits---including input size and token limits---see [Quotas and system
limits](https://docs.cloud.google.com/model-armor/quotas) in the Model Armor documentation.

## What's next

- [Set up
  Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway)

- [Monitor content security](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security)
