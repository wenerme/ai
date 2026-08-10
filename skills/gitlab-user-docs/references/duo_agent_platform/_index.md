# GitLab Duo Agent Platform

Explore AI-powered agents and flows that automate tasks across the software development lifecycle.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

### Model information

- LLM: Anthropic [Claude Sonnet 4](https://www.anthropic.com/claude/sonnet)
- Available on [GitLab Duo with self-hosted models](../../administration/gitlab_duo_self_hosted/_index.md)

- Introduced as a [beta](../../policy/development_stages_support.md) in GitLab 18.2.
- For GitLab Duo Agent Platform on self-managed instances (both with [self-hosted models](../../administration/gitlab_duo_self_hosted/_index.md) and cloud-connected GitLab models), [introduced](https://gitlab.com/groups/gitlab-org/-/work_items/19213) in GitLab 18.4, as an [experiment](../../policy/development_stages_support.md#experiment) with a [feature flag](../../administration/feature_flags/_index.md) named `self_hosted_agent_platform`. Disabled by default.
- Feature flag `self_hosted_agent_platform` [enabled](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/208951) in GitLab 18.7.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/585273) in GitLab 18.8.
- GitLab Duo Agent Platform and GitLab Credits supported on GitLab 18.8 and later.
- Feature flag `self_hosted_agent_platform` [removed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/218589) in GitLab 18.9.

The GitLab Duo Agent Platform is an AI-native solution that embeds multiple
intelligent assistants ("agents")
throughout the software development lifecycle.

- Instead of following a linear workflow, collaborate asynchronously with AI agents.
- Delegate routine tasks, from code refactoring and security scans to research,
  to specialized AI agents.

To get started, see
[Get started with the GitLab Duo Agent Platform](../get_started/get_started_agent_platform.md).

## Prerequisites

To use the Agent Platform:

- Have [GitLab Duo turned on](turn_on_off.md#turn-gitlab-duo-on-or-off).
- If you do not have GitLab Duo Pro or Enterprise,
  have [GitLab Duo Core turned on](turn_on_off.md#turn-gitlab-duo-core-on-or-off) for the top-level group or instance.
- In GitLab 18.9 and earlier, you cannot use the Agent Platform with the GitLab Duo Enterprise add-on.
  To use the Agent Platform with GitLab Duo Enterprise, upgrade to GitLab 18.10 or later.
- Depending on your GitLab version:
  - In GitLab 18.8 and later, have the [Agent Platform turned on](turn_on_off.md#turn-gitlab-duo-agent-platform-on-or-off).
  - In GitLab 18.7 and earlier, have [beta and experimental features turned on](turn_on_off.md#turn-on-beta-and-experimental-features).
- For GitLab Self-Managed, [configure your instance](../../administration/gitlab_duo/configure/_index.md).
- For GitLab Duo Self-Hosted, [install the AI Gateway](../../install/install_ai_gateway.md) with the Agent Platform service.

To use the Agent Platform in your local environment:

- Install an editor extension and authenticate with GitLab.
- Have a project in a [group namespace](../namespace/_index.md).
- Have the Developer, Maintainer, or Owner role.

## Generally available features

These features are generally available and consume [GitLab Credits](../../subscriptions/gitlab_credits.md) when used.

Features available on the Free tier require the purchase of [GitLab Credits](../../subscriptions/gitlab_credits.md#for-the-free-tier).

| Feature | Free | Premium | Ultimate |
|---------|---------|---------|---------|
| [Agentic Chat](../gitlab_duo_chat/agentic_chat.md)  Answer complex questions and autonomously create and edit files. | Yes | Yes  | Yes |
| [Code Suggestions](code_suggestions/_index.md)  Get AI-powered suggestions as you write code. | Yes | Yes  | Yes |
| [Custom agents](agents/custom.md)  Build team-specific agents for your unique development requirements. | Yes |  Yes  | Yes |
| [External agents](agents/external.md)  Securely connect third-party integrations and tools to extend Agent Platform capabilities. | No |  Yes  | Yes |
| [Planner Agent](agents/foundational_agents/planner.md)  Plan, prioritize, and track work. | Yes | Yes  | Yes |
| [Data Analyst Agent](agents/foundational_agents/data_analyst.md)  Analyze data and generate insights from your development metrics and project data. | Yes | Yes  | Yes |
| [Developer Flow](flows/foundational_flows/developer.md)  Convert issues into merge requests. | Yes | Yes  | Yes |
| [Code Review Flow](flows/foundational_flows/code_review.md)  Automate code review tasks and enforce coding standards across your team. | Yes | Yes  | Yes |
| [Convert to GitLab CI/CD Flow](flows/foundational_flows/convert_to_gitlab_ci.md)  Convert legacy CI/CD pipelines to the GitLab CI/CD format. | Yes | Yes  | Yes |
| [Fix CI/CD Pipeline Flow](flows/foundational_flows/fix_pipeline.md)  Diagnose and automatically fix failing CI/CD pipelines. | Yes | Yes  | Yes |
| [Software Development Flow](flows/foundational_flows/software_development.md)  Create a full, multi-step plan before executing it. | Yes | Yes  | Yes |
| [MCP clients](../gitlab_duo/model_context_protocol/mcp_clients.md)  Access GitLab resources and tools from any MCP-compatible AI client or IDE extension. <sup>1</sup> | Yes | Yes | Yes |
| [Custom flows](flows/custom.md)  Combine multiple agents to solve your business problems. | Yes | Yes | Yes |
| [SAST False Positive Detection Flow](flows/foundational_flows/sast_false_positive_detection.md)  Automatically identify and filter out false positives in SAST security scans. | No | No  | Yes |
| [SAST Vulnerability Resolution Flow](flows/foundational_flows/agentic_sast_vulnerability_resolution.md)  Automatically generate fixes and remediation steps for SAST vulnerabilities. | No | No  | Yes |
| [Security Analyst Agent](agents/foundational_agents/security_analyst_agent.md)  Automate repetitive security tasks: Triage issues, analyze vulnerabilities, and generate fixes. | No | No  | Yes |

**Footnotes**:

1. MCP clients do not consume credits directly. However, any Agent Platform usage, such as model requests made through an MCP client, might consume credits.

## Beta features that consume credits

These features are in beta and their usage consumes GitLab Credits.

| Feature | Free | Premium | Ultimate |
|---------|---|---|---|
| [Security Review Flow](flows/foundational_flows/security_review.md)  Detects business logic vulnerabilities in merge requests. | No | No | Yes |

## Beta and experimental features that don't consume credits

These features are either beta or experimental and do not consume GitLab Credits.

For [users on the Free](../../subscriptions/gitlab_credits.md#for-the-free-tier) tier, these beta and experimental features do not consume credits,
but you require credits in your Monthly Commitment Pool to access them.

> [!warning]
> When a feature becomes generally available, usage of the feature starts to consume GitLab Credits on all GitLab versions and on all offerings.
> Beta features that don't consume credits can change to generally available with usage billing at any time.

| Feature | Free | Premium | Ultimate |
|---------|---|---|---|
| [Agent tool governance](agents/tool-governance.md)  Configure tool-level approval policies to gate sensitive agent actions with human approval at execution time. | Yes | Yes | Yes |
| [AI audit event report](ai-audit-events.md)  Browse and filter a unified record of GitLab Duo agent activity for compliance and governance purposes. | No | Yes | Yes |
| [Initialize project context](onboarding.md#initialize-project-context)  Automatically generate an `AGENTS.md` file that documents your project conventions for use by AI agents. | Yes | Yes | Yes |
| [Improve CI/CD setup](onboarding.md#improve-cicd-setup)  Analyze your CI/CD configuration and generate a merge request with suggested improvements. | Yes | Yes | Yes |
| [CI Expert Agent](agents/foundational_agents/ci_expert_agent.md)  Create, debug, and optimize GitLab CI/CD pipelines. | Yes | Yes | Yes |
| [External MCP servers](../gitlab_duo/model_context_protocol/ai_catalog_mcp_servers.md)  Connect custom agents to external data sources and third-party services using MCP servers. | No | Yes | Yes |
| [Resolve merge conflicts](../project/merge_requests/conflicts.md#resolve-conflicts-with-gitlab-duo)  Autonomously analyze merge conflicts, edit conflicting files, and push a resolution commit. | No | Yes | Yes |
