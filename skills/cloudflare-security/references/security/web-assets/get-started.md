---
description: Use Web Assets to review operations, labels, matched traffic, learned schemas, and risks.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/security/web-assets/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You do not need to complete a fixed setup flow before discovered operations can be used for protection. Use this page to choose the capability that matches your task.

## Review operations

Review operations to understand the parts of your application that receive traffic, such as login, sign-up, checkout, upload, and AI-powered flows.

Discovered operations can be used for matching and downstream security detections before you manually refine them. For more information, refer to [Manage operations](https://developers.cloudflare.com/security/web-assets/manage-operations/).

## Add or refine operations

Add an operation when traffic you want to protect does not appear, or when you want to define the operation structure yourself.

Manual creation and editing only update operation inventory. Refine an operation when its method, hostname pattern, or path pattern does not match your intended grouping.

For more information, refer to [Manage operations](https://developers.cloudflare.com/security/web-assets/manage-operations/).

## Review labeled operations

Labels describe what an operation does. Detections can use labels to focus on traffic for a specific use case.

Refine labels when the current label set does not describe the operation correctly. For example, add `cf-llm` to operations that receive Large Language Model (LLM) prompts so [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) can scan incoming prompts for threats such as prompt injection.

For more information, refer to [Label operations](https://developers.cloudflare.com/security/web-assets/label-operations/).

## Review traffic matched to operations

Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to review traffic matched to individual operations or labels.

[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)

For individual operations, use the operation ID or operation details to review matched traffic and logs. For labeled traffic, filter by managed labels such as `cf-llm` or `cf-log-in`.

Certain metrics, such as latency, may not populate when a request is handled by [Cloudflare Workers](https://developers.cloudflare.com/workers/) or a product built on Workers, such as [Waiting Room](https://developers.cloudflare.com/waiting-room/). You can also export operation and label fields through Logpush or query them through the GraphQL Analytics API. For more information, refer to [Use labels in analytics and logs](https://developers.cloudflare.com/security/web-assets/label-operations/#use-labels-in-analytics-and-logs/).

## Use learned schemas

Discovered operations do not automatically start profile learning. To learn a Schema Profile, select **Learn profile** from the operation overflow menu.

After the profile becomes available, select **View details**. Review the learned schema under **Security overview**.

If you already maintain OpenAPI schemas, you can upload them to create operations and use them with API Shield [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

For the complete workflow, refer to [Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/) and [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/).

## Define security protections

After traffic is matched to the relevant operation, define relevant security rules to act on that traffic.

For example, AI Security for Apps scans requests to operations labeled with `cf-llm`. You can then create rules that log or block requests with unsafe LLM prompt signals.

For more information, refer to [Define security protections](https://developers.cloudflare.com/security/web-assets/define-security-protections/).

## Review risks

Web Assets can show risks on operations that may need attention. A corresponding [Security Center](https://developers.cloudflare.com/security-center/) Insight may also be raised.

For the current risk reference, refer to [API endpoint risks](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/web-assets/get-started/#page","headline":"Get started · Security dashboard docs","description":"Use Web Assets to review operations, labels, matched traffic, learned schemas, and risks.","url":"https://developers.cloudflare.com/security/web-assets/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
