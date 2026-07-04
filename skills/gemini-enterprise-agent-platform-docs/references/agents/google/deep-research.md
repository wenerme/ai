> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1), and the
> [Additional Terms for Generative AI
> Preview Products](https://cloud.google.com/trustedtester/aitos).
>
> You can process personal data for
>
> this product or feature
>
> as outlined in the
> [Cloud Data
> Processing Addendum](https://docs.cloud.google.com/terms/data-processing-addendum), subject to the obligations and restrictions described in the
> agreement under which you access Google Cloud.
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

The Gemini Deep Research Agent is a managed AI agent designed to plan,
execute, and synthesize complex, multi-step research workflows. Powered by
Gemini, the agent navigates diverse information landscapes including
the public web and private enterprise data to generate comprehensive,
cited reports that accelerate informed decision-making.

For more information on how to get started using Deep Research, see
[Use the Gemini Deep Research Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/use-deep-research).

| Agent ID | `deep-research-preview-04-2026` ||
| Supported APIs | - Interactions API ||
| Supported inputs \& outputs | - Inputs: Text, PDF - Outputs: Text, Images ||
| Token limits | - Maximum input tokens: 1,048,576 - Maximum output tokens: 65,536 ||
| Capabilities | - Supported - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [Grounding with Enterprise Web Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/web-grounding-enterprise) - [Grounding with Agent Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search) - [Grounding on remote MCP servers](https://ai.google.dev/gemini-api/docs/interactions/deep-research#mcp-servers) Preview feature - [Thought summaries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Citations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search#inline-citations) - Not supported - [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) - [Thinking level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) ||
| Consumption options | - Supported - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) - [Standard PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) - Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Documents** | - Maximum number of files per prompt: 3,000 - Maximum number of pages per file: 3,000 - Maximum file size per file for the API or Cloud Storage imports: 50 MB (application/pdf) or 7 MB (text/plain) - Maximum file size per file for direct uploads through the console: 7 MB - Default resolution tokens: 560 - OCR for scanned PDFs: Not used by default - Supported MIME types: `application/pdf`, `text/plain` |
| See [Agent locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations) for more information. ||
