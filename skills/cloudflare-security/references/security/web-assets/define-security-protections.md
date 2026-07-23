---
description: Use Web Assets operations and labels with Cloudflare detections, then create rules to act on risky traffic.
title: Define security protections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

# Define security protections

Last updated Jun 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/security/web-assets/define-security-protections/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Web Assets provides application context to security detections. This helps detections inspect the right traffic and lets you create rules focusing on targeted protections.

Use this guide to connect a Web Assets operation to a security detection and create a rule that logs, challenges, blocks, or rate limits risky traffic.

## Protection workflow

Most protections that use Web Assets follow the same workflow:

1. Turn on the security detection that protects the use case, if applicable.
2. In Web Assets, confirm that the relevant operation exists.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
3. Apply the required managed label if not already exists.
4. In Security Analytics, review matched traffic and detection results.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
5. Create a custom rule, or rate limiting rule to act on risky traffic.

## Example: Protect AI-powered operations

[AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) runs targeted scans on requests to AI-powered operations. Use it to detect prompt injection, personally identifiable information (PII) in prompts, unsafe topics, and other Large Language Model (LLM)-specific signals.

To define protection for an LLM-powered operation:

1. Turn on AI Security for Apps.
2. Confirm that the operation receiving LLM prompts exists in Web Assets.
3. Apply the `cf-llm` managed label if not already exists.
4. In Security Analytics, filter by the `cf-llm` managed label.
5. Review AI Security for Apps fields on matched traffic.
6. Create a custom rule or rate limiting rule that acts on the AI detection fields.

For the full setup workflow, refer to [Get started with AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/get-started/).

## Validate detection behavior

Use Security Analytics to confirm that the expected requests carry the right operation and label context before you create a blocking rule.

1. In the Cloudflare dashboard, go to the **Analytics** page.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Filter by the relevant managed label.
3. Review **Sampled logs**.
4. Check detection-specific fields, such as LLM prompt fields or leaked credential fields.

You can also export operation and label data with Logpush or query it with the GraphQL Analytics API. For more information, refer to [Use labels in analytics and logs](https://developers.cloudflare.com/security/web-assets/label-operations/#use-labels-in-analytics-and-logs/).

## Mitigate matched traffic

After you validate detection behavior, create rules that act on relevant detection fields.

For example, a rule can match requests addressed to an operation labeled `cf-llm` that also carry personally identifiable information in an LLM prompt.

You can use [custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to log, challenge, block, or skip traffic. You can use [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to limit high-volume activity.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/web-assets/define-security-protections/#page","headline":"Define security protections · Security dashboard docs","description":"Use Web Assets operations and labels with Cloudflare detections, then create rules to act on risky traffic.","url":"https://developers.cloudflare.com/security/web-assets/define-security-protections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
