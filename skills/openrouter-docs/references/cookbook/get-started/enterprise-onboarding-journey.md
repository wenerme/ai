> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enterprise Onboarding Journey

> What to expect from signature to production, and what we need from you at each step

This page describes the onboarding journey for enterprise customers: the milestones between signature and production, what your team owns at each one, and how OpenRouter supports you.

A typical enterprise onboarding tracks toward three milestones:

* **API keys**, within 24 hours of signature
* **First inference from your own environment**, within 48 hours of signature
* **Go-live** by day 14, and **full production pace** by day 30

These dates describe the typical path rather than a guarantee. The dates that apply to you are agreed in your implementation plan.

Progress through these milestones depends on a small number of inputs from your side, listed under each phase. The remaining steps are coordinated side by side with your team by the OpenRouter roles assigned to your account.

Each account has two customer-facing roles assigned to it. The **Forward Deployed Engineer (FDE)** owns Activation and Onboarding through go-live. The **Customer Success Manager (CSM)** joins from Onboarding and owns the relationship after go-live.

<Note>
  OpenRouter provisions your account, credits, and invoicing from its side, but cannot access or configure anything inside your organization: workspaces, API keys, guardrails, members, or settings. Your team retains access and performs all configuration. During working sessions, your FDE works side by side with your team to get everything set up.
</Note>

If you want to set up your organization self-serve, follow the [Enterprise Quickstart](/docs/cookbook/get-started/enterprise-quickstart).

After go-live, the cadence is the monthly and quarterly reviews described under Optimization.

## Milestones at a glance

| Stage      | Milestone                                                         | Typical timing               |
| ---------- | ----------------------------------------------------------------- | ---------------------------- |
| Activation | Organization live, your admin signed in                           | Within 4 hours of signature  |
| Activation | First API key created                                             | Within 24 hours of signature |
| Activation | First inference from your environment                             | Within 48 hours of signature |
| Onboarding | Workspaces mapped to your teams, budgets set                      | Day 3                        |
| Onboarding | Governance complete: SSO, SCIM, guardrails, data-retention policy | Day 5                        |
| Onboarding | Observability live in your own monitoring stack                   | Day 7                        |
| Onboarding | Rollout beyond the first team                                     | Day 10                       |
| Onboarding | **Go-live sign-off**                                              | **Day 14**                   |
| Adoption   | Full production pace, confirmed in month-one review               | Day 30                       |

The two live sessions are the day-one activation call and the day-five-to-seven inference and observability session, while everything else in this window runs asynchronously in the shared channel.

## Before you sign

Two working sessions happen before signature so that no time is spent on them afterwards. Both are led by OpenRouter and take about 30 minutes each.

**Security and governance session.** Data retention and Zero Data Retention enforcement, provider logging, in-region routing, SSO and SCIM requirements, DPA, SOC 2, and guardrail policy. You receive written answers to every question raised, so your security reviewers have a document rather than meeting notes.

**Technical scoping session.** Your use case, expected month-one volume, integration surface, outbound network restrictions, and the observability platform you want traces delivered to.

You then receive a dated implementation plan, with your named owners against each milestone, before you sign.

Your activation call is scheduled before signature and booked for the first business day after signature.

### What we need from you

| Input                                                                             | Why it matters                                     |
| --------------------------------------------------------------------------------- | -------------------------------------------------- |
| A named **platform owner** and a named **engineering champion**                   | They own configuration and the first integration   |
| A verified email address for the person who will create the organization          | Required for organization creation and for SSO     |
| Your identity provider and the admin who can approve domain verification          | Governs the day-five SSO milestone                 |
| Billing contact and invoicing preferences                                         | Sets up invoicing on day zero                      |
| Expected month-one volume and your primary use case                               | Sets rate limits and budgets appropriately         |
| Outbound network restrictions or firewall rules blocking calls to `openrouter.ai` | The most common cause of a delayed first inference |
| The observability destination for your traces                                     | Governs the day-seven observability milestone      |

## Activation: Day 0 to 2

Milestone: your first production inference, within 48 hours of signature.

| When  | What happens                                                       | Who from OpenRouter                       | Who from your team                         | Sync or async |
| ----- | ------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------ | ------------- |
| Day 0 | Account, credits, and invoicing prepared.                          | FDE                                       | Platform owner, billing contact            | Async (Slack) |
| Day 1 | 60-minute call, pre-booked for first business day after signature. | FDE pairs with your team                  | Platform owner, engineering champion       | Sync (call)   |
| Day 2 | First real-traffic inference.                                      | FDE works through blockers with your team | Engineering champion, application engineer | Async (Slack) |

Your team creates and holds its own API keys throughout. OpenRouter never creates keys on your behalf.

### Day 0: activation setup

OpenRouter provisions your account, credits, and invoicing. Your team confirms admin access through [Settings > Preferences](https://openrouter.ai/settings/preferences), and the shared channel opens.

Once your organization is live, your team can create its own API keys independently through the [Enterprise Quickstart](/docs/cookbook/get-started/enterprise-quickstart), without waiting for the activation call. The call is where your FDE pairs with you on key creation and the rest of the configuration.

### Day 1: activation working session

During the 60-minute activation call, your team will:

1. Create your [workspaces](/docs/guides/features/workspaces)
2. Set your [guardrails](/docs/guides/features/guardrails) and [Zero Data Retention](/docs/guides/features/zdr) policy
3. Set [workspace budgets](/docs/guides/features/workspaces/workspace-budgets)
4. Start SSO domain verification
5. Create a [management key](/docs/guides/overview/auth/management-api-keys) and your first [API key](/docs/api_reference/authentication)
6. Make a first test API call to confirm the key works

Create the management key from [Management API Keys](https://openrouter.ai/settings/management-keys). If your organization uses provider credentials, review [BYOK](/docs/guides/overview/auth/byok) and [API Key Rotation](/docs/cookbook/administration/api-key-rotation).

### Day 2: first production inference

Your first real traffic runs from your own application environment. Usual blockers are outbound network restrictions, authentication, and environment setup, and your FDE works through them with you in the shared channel.

## Onboarding: Day 3 to 14

Milestone: production traffic at your committed pace, signed off in writing by day 14.

| When       | What happens                         | Who from OpenRouter  | Who from your team                          | Sync or async           |
| ---------- | ------------------------------------ | -------------------- | ------------------------------------------- | ----------------------- |
| Day 3      | Workspaces mapped and budgets set.   | FDE                  | Platform owner, engineering champion        | Async (Slack)           |
| Day 5      | Governance controls complete.        | FDE and CSM          | Platform owner, IdP admin                   | Async (Slack)           |
| Day 5 to 7 | Inference and observability session. | FDE leads, CSM joins | Engineering champion, application engineers | Sync (call)             |
| Day 7      | Observability live.                  | FDE                  | Platform owner, application engineers       | Async (Slack)           |
| Day 10     | Rollout beyond first team.           | FDE and CSM          | Platform owner, engineering champion        | Async (Slack)           |
| Day 14     | **Written go-live sign-off.**        | FDE and CSM          | Platform owner, engineering champion        | Async (written + Slack) |

### Day 3: workspaces and budgets

Your team maps workspaces and sets budgets. The FDE walks your team through the structure. Start from your [home dashboard](https://openrouter.ai/workspaces), use [Create Workspace](https://openrouter.ai/workspaces/new), or automate setup with the [Workspaces API](/docs/api/api-reference/workspaces/list-workspaces).

### Day 5: governance

Your team completes [SSO](/docs/guides/features/sso), [SCIM group mappings](/docs/guides/features/scim-mappings), guardrails, and data-retention policy. The FDE provides the DNS record and IdP guide. Review [privacy settings](https://openrouter.ai/settings/privacy), [Data Collection](/docs/guides/privacy/data-collection), [Provider Logging](/docs/guides/privacy/provider-logging), and the [Guardrails API](/docs/api/api-reference/guardrails/list-guardrails) as needed.

### Day 5 to 7: inference strategy and observability session

The second and final required meeting. It covers [provider routing](/docs/guides/routing/provider-selection), [model fallbacks](/docs/guides/routing/model-fallbacks), [prompt caching](/docs/guides/best-practices/prompt-caching), [presets](/docs/guides/features/presets) so your application code names use cases rather than model versions, [Broadcast](/docs/guides/features/broadcast) into your own observability stack, [user attribution](/docs/cookbook/administration/user-tracking), and access to the [Analytics API](/docs/api/api-reference/analytics/query-analytics-data) for your own reporting. Create presets from the [Presets](https://openrouter.ai/workspaces/default/presets) page.

You leave the session with at least one preset in use and traces flowing to your platform.

### Day 7: observability

Your team configures Broadcast with the FDE pairing. Start from [Settings > Observability](https://openrouter.ai/settings/observability), review traces in [Logs](https://openrouter.ai/logs) or your workspace's [Observability settings](https://openrouter.ai/workspaces/default/observability), and compare Broadcast with [Input & Output Logging](/docs/guides/features/input-output-logging).

### Day 10: rollout

Your team rolls out beyond the first team. The FDE supplies SCIM group mappings and developer-ready setup material. Coding-agent teams can use [Ori Harness](/docs/guides/ori/harness) for the rollout.

### Day 14: go-live sign-off

Production traffic is holding. The FDE and CSM send the written sign-off summary through the shared channel.

## Adoption: Day 15 to 30

Milestone: month-to-date usage at or above your commitment by day 30.

| When         | What happens                                       | Who from OpenRouter | Who from your team                                          | Sync or async           |
| ------------ | -------------------------------------------------- | ------------------- | ----------------------------------------------------------- | ----------------------- |
| Day 15 to 20 | Scoped workloads in production. Baseline reviewed. | CSM                 | Platform owner, engineering champion, application engineers | Async (Slack)           |
| Day 21       | Expansion review delivered.                        | CSM                 | Platform owner, executive sponsor                           | Async (written + Slack) |
| Day 30       | Month-one report delivered.                        | CSM                 | Platform owner, billing contact, executive sponsor          | Async (written + Slack) |

### Day 15 to 20: production ramp

Your team brings the workloads you scoped into production. Usage, error rates, latency, and spend are reviewed against your baseline.

### Day 21: expansion review

The written expansion review proposes a second workload drawn from your usage data.

### Day 30: month-one review

The month-one report covers pace against commitment, spend by team and model, reliability, savings against direct provider access, and recommendations. Use [Usage Accounting](/docs/cookbook/administration/usage-accounting), [Activity Export](/docs/cookbook/administration/activity-export), and the [Activity page](https://openrouter.ai/activity) for reporting.

## Optimization: Ongoing

| When      | What happens                          | Who from OpenRouter | Who from your team                    | Sync or async  |
| --------- | ------------------------------------- | ------------------- | ------------------------------------- | -------------- |
| Monthly   | Office hours and optimization report. | CSM                 | Platform owner, application engineers | Sync + written |
| Quarterly | Quarterly business review.            | CSM                 | Executive sponsor, platform owner     | Sync (call)    |

### Monthly optimization cadence

Your team tunes [provider routing](/docs/guides/routing/provider-selection), [prompt caching](/docs/guides/best-practices/prompt-caching), and [presets](/docs/guides/features/presets) during office hours and through the usage and optimization report. Review [Uptime Optimization](/docs/guides/best-practices/uptime-optimization) when tuning reliability and latency.

The shared channel remains open between quarterly reviews.

## Setting up well

Two documents cover the configuration decisions that are cheapest to get right early and most expensive to correct once your developers are active:

<CardGroup cols={2}>
  <Card title="Enterprise Quickstart" icon="rocket" href="/docs/cookbook/get-started/enterprise-quickstart">
    Organization, workspaces, key management, security controls, presets, and observability, step by step.
  </Card>

  <Card title="Organization Management" icon="building-user" href="/docs/cookbook/administration/organization-management">
    Roles, shared credits, member management, and centralized usage tracking.
  </Card>
</CardGroup>

For application teams expanding beyond the first workload, see the [Quickstart](/docs/cookbook/get-started/quickstart), [Structured Outputs](/docs/guides/features/structured-outputs), [Tool Calling](/docs/guides/features/tool-calling), and [Latency and Performance](/docs/guides/best-practices/latency-and-performance).

For enterprise sales inquiries or custom requirements, contact our team at [openrouter.ai/enterprise](https://openrouter.ai/enterprise).
