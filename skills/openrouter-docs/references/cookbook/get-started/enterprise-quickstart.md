> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enterprise Quickstart

> Get your organization up and running with OpenRouter

## 1. Set up your organization

Organizations enable teams to collaborate with shared credits, centralized API key management, and unified usage tracking.

To create an organization, navigate to [Settings > Preferences](https://openrouter.ai/settings/preferences) and click **Create Organization**. Once created, you can invite team members and switch between personal and organization contexts using the organization switcher.

Key organization capabilities include shared credit pools for centralized billing, role-based access control (Admin and Member roles), and organization-wide activity tracking.

For complete details on organization setup and management, see the [Organization Management](/docs/cookbook/administration/organization-management) guide.

## 2. Set up workspaces

Workspaces let you organize your projects into separate environments, each with its own API keys, routing defaults, guardrails, and observability integrations. Use them to isolate teams, projects, or deployment stages (e.g. staging vs. production) under a single organization.

Your existing setup starts in a **Default workspace**, and all organization members are automatically added to it. If you only need one environment, keep working as usual; nothing changes.

### Creating workspaces

1. Go to your [home dashboard](https://openrouter.ai/workspaces)
2. Click the workspace picker and select **[Create Workspace](https://openrouter.ai/workspaces/new)**
3. Name your workspace and add a description

Only organization admins can create and delete workspaces. You can also create and manage workspaces programmatically using the [Workspaces API](/docs/api/api-reference/workspaces/list-workspaces).

### What's scoped to each workspace

Each workspace has independent settings for:

* **API Keys**: Every key lives in a workspace. Members create keys in any workspace they belong to; admins can create system keys owned by the workspace.
* **Guardrails**: Each workspace has its own guardrail, inheriting account-level policies with the ability to add stricter rules.
* **BYOK**: Bring your own provider keys per workspace, or share provider keys across multiple workspaces.
* **Routing**: Configure provider routing per workspace to optimize for cost, latency, throughput, or tool-calling quality.
* **Presets**: Organize shortcuts for system prompts, model and provider configurations, and request parameters.
* **Plugins**: Configure default plugin behavior for API requests in each workspace.
* **Observability**: Connect different observability integrations per workspace, or send traces from all workspaces to the same platform.
* **Members**: Control which team members have access to each workspace.
* **[Budgets](/docs/guides/features/workspaces/workspace-budgets)**: Set daily, weekly, monthly, or lifetime spending limits per workspace.

Account-level settings like billing, activity, logs, management keys, and privacy policies apply globally across all workspaces.

For complete details, see the [Workspaces](/docs/guides/features/workspaces) guide.

## 3. Configure API key management

Enterprise deployments typically require programmatic API key management for automated provisioning, rotation, and lifecycle management.

### Management API keys

Create a [Management API key](https://openrouter.ai/settings/management-keys) to manage API keys programmatically. This enables automated key creation for customer instances, programmatic key rotation for security compliance, and usage monitoring with automatic limit enforcement.

See [Management API Keys](/docs/guides/overview/auth/management-api-keys) for the full API reference and code examples.

### API key rotation

Regular key rotation limits the impact of compromised credentials. OpenRouter's Management API supports zero-downtime rotation: create a new key, update your applications, then delete the old key.

If you use [BYOK (Bring Your Own Key)](/docs/guides/overview/auth/byok), you can rotate OpenRouter API keys without touching your provider credentials, simplifying key management.

See [API Key Rotation](/docs/cookbook/administration/api-key-rotation) for step-by-step instructions.

## 4. Implement security controls

### Guardrails

Guardrails let organizations control how members and API keys use OpenRouter. Configure spending limits with daily, weekly, or monthly resets, model and provider allowlists to restrict access, and Zero Data Retention enforcement for sensitive workloads.

Guardrails can be assigned at the workspace level (applying to all traffic in that workspace), to organization members (baseline for all their keys), or directly to specific API keys for granular control. When multiple guardrails apply, stricter rules always win.

See [Guardrails](/docs/guides/features/guardrails) for configuration details and the [Guardrails API reference](/docs/api/api-reference/guardrails/list-guardrails) for programmatic management.

### Coding agent rollout

Employees who use coding agent CLIs can run them through [Ori Harness](/docs/guides/ori/harness). Install it once:

```sh theme={null}
curl -fsSL https://openrouter.ai/labs/ori/install.sh | bash
```

Then sign in with OAuth on your company OpenRouter organization, and there are no API keys to distribute. Employees can run `ori claude`, `ori codex`, `ori hermes`, or `ori opencode`, among others. This is not the full list, see [Bring your own agent](/docs/guides/ori/harness#bring-your-own-agent) for every supported harness. Your organization's allowlists, budgets, and workspace permissions apply to every agent, with usage on one bill.

### Zero Data Retention (ZDR)

Zero Data Retention ensures providers do not store your prompts or responses. ZDR can be enforced per model group (Anthropic, OpenAI, Google, SpaceXAI, and non-frontier) in your [privacy settings](https://openrouter.ai/settings/privacy), via [guardrails](/docs/guides/features/guardrails), or per-request using the `zdr` parameter.

OpenRouter itself has a ZDR policy and does not retain your prompts unless you explicitly opt in to prompt logging.

See [Zero Data Retention](/docs/guides/features/zdr) for the full list of ZDR-compatible endpoints, per-model-group configuration, and request-level options.

### Data privacy

OpenRouter does not store your prompts or responses unless you opt in to prompt logging. Only metadata (token counts, latency, etc.) is stored for reporting and your activity feed.

See [Data Collection](/docs/guides/privacy/data-collection) and [Provider Logging](/docs/guides/privacy/provider-logging) for complete privacy documentation.

## 5. Configure presets

Presets let you separate your LLM configuration from your code. Create named configurations that encapsulate model selection, provider routing, system prompts, and generation parameters, then reference them in API requests using `@preset/your-preset-slug`.

This enables rapid iteration: switch models, adjust prompts, or change provider preferences without deploying code changes.

### Creating presets

1. Navigate to your workspace's [Presets](https://openrouter.ai/workspaces/default/presets) page
2. Click **Create Preset** and configure your model, routing, and parameters
3. Reference the preset in API requests:

```json lines theme={null}
{
  "model": "@preset/your-preset-slug",
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

Presets are scoped to workspaces, so different teams or environments can maintain their own configurations independently.

See [Presets](/docs/guides/features/presets) for the full guide including creating presets from inference requests and version management.

## 6. Set up observability

### Broadcast

Broadcast automatically sends traces from your OpenRouter requests to external observability platforms without additional instrumentation. Supported destinations include Datadog, Langfuse, LangSmith, Braintrust, OpenTelemetry Collector, S3, and more.

Configure broadcast at [Settings > Observability](https://openrouter.ai/settings/observability). You can filter traces by API key, set sampling rates, and configure up to 5 destinations of the same type for different environments.

See [Broadcast](/docs/guides/features/broadcast) for setup instructions and destination-specific walkthroughs.

### Input & Output Logging

Input & Output Logging lets you privately save and review the full content of your requests and responses. Use it to debug issues, compare model responses, and optimize prompts. Once enabled, prompts and completions are accessible from your [Logs](https://openrouter.ai/logs) page.

Enable it in your workspace's [Observability settings](https://openrouter.ai/workspaces/default/observability) by toggling **Input & Output Logging**. For organizations, only admins can view and toggle this setting.

See [Input & Output Logging](/docs/guides/features/input-output-logging) for storage details, privacy guarantees, and comparison with Broadcast.

### User tracking

Track your end-users by including a `user` parameter in API requests. This improves caching performance (sticky routing per user) and enables user-level analytics in your activity feed and exports.

See [User Tracking](/docs/cookbook/administration/user-tracking) for implementation details.

## 7. Monitor usage and costs

### Usage accounting

Every API response includes detailed usage information: token counts (prompt, completion, reasoning, cached), cost in credits, and timing data. This enables real-time cost tracking without additional API calls.

See [Usage Accounting](/docs/cookbook/administration/usage-accounting) for response format details and code examples.

### Activity export

Export aggregated usage data as CSV or PDF from the [Activity page](https://openrouter.ai/activity). Filter by time period and group by Model, API Key, or Creator (organization member) for detailed reporting.

See [Activity Export](/docs/cookbook/administration/activity-export) for export instructions.

## 8. Optimize for reliability

### Provider routing and fallbacks

OpenRouter monitors provider health in real-time and automatically routes around outages. Configure fallback chains by specifying multiple models, and customize provider selection based on cost, latency, or specific provider preferences.

See [Provider Selection](/docs/guides/routing/provider-selection) and [Model Fallbacks](/docs/guides/routing/model-fallbacks) for configuration options.

### Uptime optimization

OpenRouter tracks response times, error rates, and availability across all providers. This data powers intelligent routing decisions and provides transparency about service reliability.

See [Uptime Optimization](/docs/guides/best-practices/uptime-optimization) for details on how OpenRouter maximizes availability.

## Next steps

Once your organization is configured, explore these additional resources:

* [Quickstart](/docs/cookbook/get-started/quickstart) for basic API integration examples
* [Structured Outputs](/docs/guides/features/structured-outputs) for JSON schema enforcement
* [Tool Calling](/docs/guides/features/tool-calling) for function calling capabilities
* [Prompt Caching](/docs/guides/best-practices/prompt-caching) for cost optimization
* [Latency and Performance](/docs/guides/best-practices/latency-and-performance) for performance tuning
* [Ori Harness](/docs/guides/ori/harness) for running coding agent CLIs on your organization

For enterprise sales inquiries or custom requirements, contact our sales team at [openrouter.ai/enterprise](https://openrouter.ai/enterprise).
