Gemini Enterprise Agent Platform supports a curated list of models developed by Google partners.
Partner models can be used with
[Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform) as a model as a
service (MaaS) and are offered as a managed API. When you use a partner model,
you continue to send your requests to Gemini Enterprise Agent Platform endpoints. Partner models
are serverless so there's no need to provision or manage infrastructure.

Partner models can be discovered using Model Garden. You can also
deploy models using Model Garden. For more information, see [Explore AI
models in
Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models).
While information about each available partner model can be found on its model
card in Model Garden, only third-party models that perform as a
MaaS with Gemini Enterprise Agent Platform are documented in this guide.

Anthropic's Claude and Mistral models are examples of third-party managed models
that are available to use on Gemini Enterprise Agent Platform.

> [!NOTE]
> Anthropic enforces policies that prohibit certain resellers from reselling their products. If your Google Cloud billing account is managed by a prohibited reseller, you will be unable to accept the Terms of Service or enable Claude models. If this occurs, please contact your reseller directly.

## Partner models

The following partner models are offered as managed APIs on Gemini Enterprise Agent Platform
Model Garden (MaaS):

| Model name | Modality | Description | Quickstart |
|---|---|---|---|
| Grok 4.3 ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | xAI's high-performance model. | [Model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.3) |
| Grok 4.20 (Reasoning) ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | Grok 4.20 (Reasoning) is a high-performance model from xAI, featuring an industry-leading low hallucination rate. Excels at document understanding tasks and long-horizon agentic tool calling. | [Model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.20-reasoning) |
| Grok 4.20 (Non-reasoning) ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | Grok 4.20 (Non-Reasoning) is a high-performance non-thinking model from xAI, featuring an industry-leading low hallucination rate. Excels in latency-sensitive use cases like customer support and categorization. | [Model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.20-non-reasoning) |
| Grok 4.1 Fast (Reasoning) ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | Grok 4.1 Fast (Reasoning) is xAI's most cost-effective model, featuring strong tool-calling capabilities and efficient knowledge base synthesis. Excels at search tasks involving web data and internal knowledge base tools. | [Model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.1-fast-reasoning) |
| Grok 4.1 Fast (Non-reasoning) ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | Grok 4.1 Fast (Non-Reasoning) is xAI's most cost-effective non-thinking model, optimized for low-latency performance. Excels at high-volume tasks like summarization and categorization. | [Model card](https://console.cloud.google.com/agent-platform/publishers/xai/model-garden/grok-4.1-fast-non-reasoning) |
| Claude Sonnet 5 | Language, Vision | Claude Sonnet 5 is Anthropic's most capable Sonnet model yet, built for coding, agents, and professional work at scale. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-5) |
| Claude Fable 5 | Language, Vision | Claude Fable 5 is a model from Anthropic that's designed for autonomous knowledge work and coding, built for complex, multi-day projects. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-fable-5) |
| Claude Opus 4.8 | Language, Vision | Claude Opus 4.8 is a high-intelligence Opus model built for coding and agents, with deeper reasoning for enterprise workflows. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-8) |
| Claude Opus 4.7 | Language, Vision | Claude Opus 4.7 is a high-intelligence model from Anthropic and an industry leader across coding, agents, computer use, and enterprise workflows. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-7) |
| Claude Sonnet 4.6 | Language, Vision | Claude Sonnet 4.6 delivers frontier intelligence at scale---built for coding, agents, and enterprise workflows. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-4-6) |
| Claude Opus 4.6 | Language, Vision | Claude Opus 4.6 is a high-intelligence model from Anthropic and an industry leader across coding, agents, computer use, and enterprise workflows. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-6) |
| Claude Opus 4.5 | Language, Vision | Claude Opus 4.5 is a high-intelligence model from Anthropic and an industry leader across coding, agents, computer use, and enterprise workflows. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-5) |
| Claude Sonnet 4.5 | Language, Vision | Anthropic's mid-sized model for powering real-world agents, with capabilities in coding, computer use, cybersecurity, and working with office files like spreadsheets. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-4-5) |
| Claude Opus 4.1 | Language, Vision | An industry leader for coding. It delivers sustained performance on long-running tasks that require focused effort and thousands of steps, significantly expanding what AI agents can solve. Ideal for powering frontier agent products and features. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4) |
| Claude Haiku 4.5 | Language, Vision | Claude Haiku 4.5 delivers near-frontier performance for a wide range of use cases, and stands out as one of the best coding models in the world--with the right speed and cost to power free products and high-volume user experiences. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-haiku-4-5) |
| Claude Opus 4 | Language, Vision | Claude Opus 4 delivers sustained performance on long-running tasks that require focused effort and thousands of steps, significantly expanding what AI agents can solve. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4) |
| Claude Sonnet 4 | Language, Vision | Anthropic's mid-size model with superior intelligence for high-volume uses, such as coding, in-depth research, and agents. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-4) |
| Anthropic's Claude 3.5 Sonnet v2 | Language, Vision | Claude 3.5 Sonnet is a high-performance model for real-world software engineering tasks and agentic capabilities. Claude 3.5 Sonnet delivers these advancements at the same price and speed as its predecessor. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-3-5-sonnet-v2) |
| Anthropic's Claude 3.5 Sonnet | Language | Claude 3.5 Sonnet outperforms Anthropic's Claude 3 Opus on a wide range of Anthropic's evaluations with the speed and cost of Anthropic's mid-tier model, Claude 3 Sonnet. | [Model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-3-5-sonnet) |
| Jamba 1.5 Large ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | AI21 Labs's Jamba 1.5 Large is designed for superior quality responses, high throughput, and competitive pricing compared to other models in its size class. | [Model card](https://console.cloud.google.com/agent-platform/publishers/ai21/model-garden/jamba-1.5-large) |
| Jamba 1.5 Mini ([Preview](https://cloud.google.com/products#product-launch-stages)) | Language | AI21 Labs's Jamba 1.5 Mini is well balanced across quality, throughput, and low cost. | [Model card](https://console.cloud.google.com/agent-platform/publishers/ai21/model-garden/jamba-1.5-mini) |
| Mistral Medium 3 | Language | Mistral Medium 3 is a versatile model designed for a wide range of tasks, including programming, mathematical reasoning, understanding long documents, summarization, and dialogue. | [Model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-medium-3) |
| Mistral OCR (25.05) | Language, Vision | Mistral OCR (25.05) is an Optical Character Recognition API for document understanding. The model comprehends each element of documents such as media, text, tables, and equations. | [Model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-ocr-2505) |
| Mistral Small 3.1 (25.03) | Language | Mistral Small 3.1 (25.03) is a version of Mistral's Small model, featuring multimodal capabilities and extended context length. | [Model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/mistral-small-2503) |
| Codestral 2 | Language, Code | Codestral 2 is Mistral's code generation specialized model built specifically for high-precision fill-in-the-middle (FIM) completion that helps developers write and interact with code through a shared instruction and completion API endpoint. | [Model card](https://console.cloud.google.com/agent-platform/publishers/mistralai/model-garden/codestral-2) |

## Evaluate partner models by using the Gen AI evaluation service

The Gen AI evaluation service supports evaluating partner models, such as Anthropic
and Llama models. Partner model evaluation is supported through
Model Garden, so you must enable the
[model](https://console.cloud.google.com/agent-platform/model-garden) before running evaluations
against a partner model.

For more information, see [Perform evaluation using the
console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-genai-console).

## Gemini Enterprise Agent Platform partner model pricing with capacity assurance

Google offers provisioned throughput for some partner models that reserves
throughput capacity for your models for a fixed fee. You decide on the
throughput capacity and in which regions to reserve that capacity. Because
provisioned throughput requests are prioritized over the standard pay-as-you-go
requests, provisioned throughput provides increased availability. When the
system is overloaded, your requests can still be completed as long as the
throughput remains under your reserved throughput capacity. For more information
or to subscribe to the service, [contact sales](https://cloud.google.com/contact/).

## Regional, global, and multi-region endpoints

For regional endpoints, requests are served from your specified region. In cases
where you have data residency requirements or if a model doesn't support the
global endpoint, use the regional endpoints.

When you use the global endpoint, Google can process and serve your requests
from any region that is supported by the model that you are using, which might
result in higher latency in some cases. The global endpoint helps improve
overall availability and helps reduce errors.

Multi-region endpoints allow for high-availability access to partner models while maintaining data residency within a broader geography, such as the United States.

There is a price difference depending on the endpoint type you select. For more information on quotas and capabilities, view the related third-party model page.

### Global endpoint

To use the global endpoint, set the region to `global`.

For example, the request URL for a curl command uses the following format:
`https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/PUBLISHER_NAME/models/MODEL_NAME`

For the Agent Platform SDK, a regional endpoint is the default. Set the
region to `GLOBAL` to use the global endpoint.

**Supported models for the global endpoint**

The global endpoint is available for the following models:

- [Claude Sonnet 5](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Fable 5](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Opus 4.8](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Opus 4.7](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Opus 4.6](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Sonnet 4.6](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Opus 4.5](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Opus 4.1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Opus 4](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Sonnet 4.5](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Sonnet 4](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude 3.7 Sonnet](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude 3.5 Sonnet v2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Claude Haiku 4.5](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude#regions)
- [Grok 4.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/grok-4-1-fast)
- [Grok 4.20](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/grok-4-20)
- [Grok 4.3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/grok-4-3)

> [!NOTE]
> **Note:** Prompt Caching is supported when using the global endpoint. Provisioned Throughput isn't supported when using the global endpoint.

**Restrict global API endpoint usage**

To help enforce the use of regional endpoints, use the
`constraints/gcp.restrictEndpointUsage` organization policy constraint to block
requests to the global API endpoint. For more information, see
[Restrict endpoint usage](https://docs.cloud.google.com/docs/security/compliance/restrict-endpoint-usage).

### Multi-region endpoint

Multi-region endpoints allow for high-availability access to partner models while maintaining data residency within a broader geography, such as the United States or the European Union.

Select the appropriate tab for the multi-region you want to use:

### US

To use the US multi-region endpoint, set the endpoint URL to `aiplatform.us.rep.googleapis.com`.

The request URL for a curl command uses the following format:
`https://aiplatform.us.rep.googleapis.com/v1/projects/PROJECT_ID/locations/us/publishers/anthropic/models/MODEL_NAME`

### EU

To use the EU multi-region endpoint, set the endpoint URL to `aiplatform.eu.rep.googleapis.com`.

The request URL for a curl command uses the following format:
`https://aiplatform.eu.rep.googleapis.com/v1/projects/PROJECT_ID/locations/eu/publishers/anthropic/models/MODEL_NAME`

For more information on the `MODEL_NAME` format, see the [Anthropic documentation](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai#accessing-vertex-ai).

**Supported models for the multi-region endpoint:**

Multi-region endpoints support all Claude models with versions 4.7 and later (for example, `claude-opus-4-7`, `claude-opus-4-8`, and `claude-fable-5`). Use the full Model ID including the version date where applicable.

**Example Request:**

Here's how you can call the multi-region endpoint using `curl`:

    export PROJECT_ID="YOUR_PROJECT_ID"
    # Example using claude-opus-4-7

    # Option 1: US Region
    export LOCATION="us"
    export ENDPOINT="aiplatform.us.rep.googleapis.com"

    # Option 2: EU Region
    # export LOCATION="eu"
    # export ENDPOINT="aiplatform.eu.rep.googleapis.com"

    export MODEL_ID="claude-opus-4-7"

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
      -H "Content-Type: application/json" \
      "https://${ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/anthropic/models/${MODEL_ID}:rawPredict" \
      -d '{
        "max_tokens": 300,
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Why is the sky blue?"
              }
            ]
          }
        ],
        "anthropic_version": "vertex-2023-10-16"
      }'

**Multi-region quotas:**

Dedicated multi-region quotas are enforced. You can view and request increases for these default quota values in the Google Cloud console.

- **US Quota Examples:**

  - `UsOnlinePredictionInputTokensPerMinutePerBaseModel`
  - `UsOnlinePredictionOutputTokensPerMinutePerBaseModel`
  - `UsOnlinePredictionRequestsPerMinPerProjectPerBaseModel`
  - `UsOnlinePredictionWebSearchRequestsPerProjectPerPublisher`
- **EU Quota Examples:**

  - `EuOnlinePredictionInputTokensPerMinutePerBaseModel`
  - `EuOnlinePredictionOutputTokensPerMinutePerBaseModel`
  - `EuOnlinePredictionRequestsPerMinPerProjectPerBaseModel`
  - `EuOnlinePredictionWebSearchRequestsPerProjectPerPublisher`

> [!NOTE]
> **Note:** Prompt Caching is supported when using the multi-region endpoint. Provisioned Throughput isn't supported when using the multi-region endpoint.

## Grant user access to partner models

For you to enable partner models and make a prompt request, a Google Cloud
administrator must [set the required permissions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models#set-permissions) and [verify
the organization policy allows the use of required
APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models#set-organization-policy).

### Set required permissions to use partner models

The following roles and permissions are required to use partner models:

- You must have the Consumer Procurement Entitlement Manager
  Identity and Access Management (IAM) role. Anyone who's been granted this role can
  enable partner models in Model Garden.

- You must have the `aiplatform.endpoints.predict` permission. This permission
  is included in the Agent Platform User IAM role. For more
  information, see [Gemini Enterprise Agent Platform
  User](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.user) and
  [Access control](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/access-control#permissions).

### Console

1. To grant the Consumer Procurement Entitlement Manager IAM
   roles to a user, go to the **IAM** page.

   [Go to IAM](https://console.cloud.google.com/projectselector/iam-admin/iam)
2. In the **Principal** column, find the user
   [principal](https://docs.cloud.google.com/iam/docs/overview#concepts_related_identity) for which you
   want to enable access to partner models, and then click
   **Edit principal** in that row.

3. In the **Edit access** pane, click
   **Add another role**.

4. In **Select a role** , select **Consumer Procurement Entitlement Manager**.

5. In the **Edit access** pane, click
   **Add another role**.

6. In **Select a role** , select **Agent Platform User**.

7. Click **Save**.

### gcloud

1. In the Google Cloud console, activate Cloud Shell.

   [Activate Cloud Shell](https://console.cloud.google.com/?cloudshell=true)
2. Grant the Consumer Procurement Entitlement Manager role that's required
   to enable partner models in Model Garden

       gcloud projects add-iam-policy-binding  PROJECT_ID \
       --member=PRINCIPAL --role=roles/consumerprocurement.entitlementManager

3. Grant the Agent Platform User role that includes the
   `aiplatform.endpoints.predict` permission which is required to make
   prompt requests:

       gcloud projects add-iam-policy-binding  PROJECT_ID \
       --member=PRINCIPAL --role=roles/aiplatform.user

   Replace `PRINCIPAL` with the identifier for
   the principal. The identifier takes the form
   `user|group|serviceAccount:email` or `domain:domain`---for
   example, `user:cloudysanfrancisco@gmail.com`,
   `group:admins@example.com`,
   `serviceAccount:test123@example.domain.com`, or
   `domain:example.domain.com`.

   The output is a list of policy bindings that includes the following:

       -   members:
         -   user:PRINCIPAL
         role: roles/roles/consumerprocurement.entitlementManager

   For more information, see
   [Grant a single role](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role)
   and
   [`gcloud projects add-iam-policy-binding`](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding).

### Set the organization policy for partner model access

To enable partner models, your organization policy must allow the following
API: Cloud Commerce Consumer Procurement API - `cloudcommerceconsumerprocurement.googleapis.com`

If your organization sets an organization policy to
[restrict service usage](https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources),
then an organization administrator must verify that
`cloudcommerceconsumerprocurement.googleapis.com` is allowed by
[setting the organization policy](https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources#setting_the_organization_policy).

Also, if you have an organization policy that restricts model usage in
Model Garden, the policy must allow access to partner models. For more
information, see [Control model
access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access).

### Partner model regulatory compliance

The [certifications](https://cloud.google.com/security/compliance/services-in-scope/) for
[Generative AI on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/overview) continue to
apply when partner models are used as a managed API using Gemini Enterprise Agent Platform.
If you need details about the models themselves, additional information can be
found in the respective Model Card, or you can contact the respective model
publisher.

Your data is stored at rest within the selected region or multi-region for
partner models on Gemini Enterprise Agent Platform, but the regionalization of data
processing may vary. For a detailed list of partner models' data processing
commitments, see [Data residency for partner
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#genai-partner-models).

Customer prompts and model responses are not shared with third-parties when
using the Gemini Enterprise API, including partner models. Google only processes
Customer Data as instructed by the Customer, which is further described in our
[Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum).
