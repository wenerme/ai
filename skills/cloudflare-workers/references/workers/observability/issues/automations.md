---
description: Route Workers Issues to coding agents, webhooks, chat services, or incident-management tools based on configurable triggers.
title: Set up an automation
image: https://developers.cloudflare.com/workers/observability/issues/automations/og.png?v=0d61505f991cb251
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up an automation

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/observability/issues/automations/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can set up automations that send issues to a configured destination when matching issues meet a trigger condition. Configure automations and destinations in the dashboard or with the Cloudflare CLI (`cf`).

## Trigger types

| Trigger | Behavior |
| --- | --- |
| Occurrence threshold | Runs once when an issue's occurrence count crosses the configured threshold. |
| Recurrence after inactivity | Runs when an existing issue returns after the configured period without a newer occurrence. |

An occurrence-threshold automation does not run for every occurrence after the threshold. A recurrence automation requires at least one earlier occurrence.

## Set up an automation

1. Go to the **Issues** page. [Go to **Issues** ↗](https://dash.cloudflare.com/?to=/:account/workers/services/view/:worker/production/issues?status=active)
2. Select **Automations** > **Add automation**.![Automations dialog with an Add automation button.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=940,height=456,format=webp/_astro/create-automation.DqBTTIE4.png)
3. Select an occurrence threshold or recurrence-after-inactivity trigger and enter its value.
4. Select an existing destination, or create a destination.![Create automation dialog with the destination menu open.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=936,height=572,format=webp/_astro/select-destination.yZSsU-k4.png)
5. Turn on **Enabled**, and then select **Create**.

## Destinations

| Destination type | Use |
| --- | --- |
| Coding agent | Send diagnostic context to an agent that can investigate a connected codebase. |
| Generic webhook | Send an issue event to your HTTPS endpoint. You can add a webhook secret or use mutual TLS. |
| Chat | Post an issue summary to a team channel for review and triage. |
| Incident management | Create an incident or notify an on-call workflow when an issue meets its trigger condition. |

### Coding agents

Claude Code, Cursor, and Devin are supported prebuilt coding-agent integrations. An automation sends the selected agent an issue summary and captured diagnostic context. The agent can inspect a connected repository and propose code and test changes. You review and deploy those changes.

All coding-agent destinations require a display name. Configure the remaining fields for each integration:

| Integration | Required fields | Optional fields | Setup documentation |
| --- | --- | --- | --- |
| Claude Code | Routine ID and authorization token | None | [Add an API trigger ↗︎](https://code.claude.com/docs/en/routines#add-an-api-trigger) |
| Cursor | Automation webhook URL | Authorization header | [Webhook triggers ↗︎](https://cursor.com/docs/cloud-agent/automations#webhook-triggers) |
| Devin | Authorization token and organization ID | Repositories and playbook ID | [Authentication ↗︎](https://docs.devin.ai/api-reference/authentication) and [Create playbooks ↗︎](https://docs.devin.ai/product-guides/creating-playbooks) |

### Generic webhooks

To bring your own coding agent, configure a generic webhook endpoint to receive the issue summary and diagnostic context. You can also use a generic webhook to connect an internal workflow. Treat destination URLs, webhook secrets, and access tokens as credentials.

Generic webhooks use the standard Cloudflare Notifications webhook payload. For payload and endpoint guidance, refer to [Configure a webhook](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).

### Configure a generic webhook

1. When you create a destination, select **Generic Webhook**.
2. Enter a name and an HTTPS endpoint URL.
3. Enter a webhook secret or turn on mutual TLS (mTLS).
4. Select **Create destination**, and then finish creating the automation.

## Agent access to Cloudflare

An automation sends an issue to its destination. It does not give the destination permission to query your Cloudflare account.

To let an agent investigate related logs and traces, configure the [Workers Observability MCP server](https://developers.cloudflare.com/workers/observability/mcp-server/) separately. Review the agent's proposed code and test changes before deploying them.

Issue data can include error messages, stack traces, request metadata, logs, and application context. Before you configure a destination, review its access controls and data-handling policies. Do not include secrets, access tokens, or sensitive request content in telemetry. Handle application identifiers and personal data according to your privacy and data-handling policies.

## Run and review an automation

You can send an issue to a destination without waiting for its trigger. Open the issue and select the destination from its available actions. The manual run appears in the issue's activity history.

Open an issue or automation to review recent runs. A run can be pending, succeeded, or failed. Cloudflare attempts to hand off each run up to three times before marking it failed. A succeeded run means Cloudflare Notifications accepted the event for delivery.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/issues/automations/#page","headline":"Set up an automation","description":"Route Workers Issues to coding agents, webhooks, chat services, or incident-management tools based on configurable triggers.","url":"https://developers.cloudflare.com/workers/observability/issues/automations/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/observability/issues/automations/og.png?v=0d61505f991cb251","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
