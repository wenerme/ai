---
title: Get started
description: Use Web Assets to review operations, labels, matched traffic, learned schemas, and risks.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Get started

You do not need to complete a fixed setup flow before discovered operations can be used for protection. Use this page to choose the capability that matches your task.

## Review operations

Review operations to understand the parts of your application that receive traffic, such as login, sign-up, checkout, upload, and AI-powered flows.

Discovered operations can be used for matching and downstream security detections before you manually refine them. For more information, refer to [Manage operations](https://developers.cloudflare.com/security/web-assets/manage-operations/).

## Add or refine operations

Add an operation when traffic you want to protect does not appear, or when you want to define the operation structure yourself.

Refine an operation when the current grouping does not match how the traffic should be grouped or protected. For example, you may want a separate operation for a login flow, password reset flow, or payment flow.

For more information, refer to [Manage operations](https://developers.cloudflare.com/security/web-assets/manage-operations/).

## Review labeled operations

Labels describe what an operation does. Detections can use labels to focus on traffic for a specific use case.

Refine labels when the current label set does not describe the operation correctly. For example, add `cf-llm` to operations that receive Large Language Model (LLM) prompts so [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) can scan incoming prompts for threats such as prompt injection.

For more information, refer to [Label operations](https://developers.cloudflare.com/security/web-assets/label-operations/).

## Review traffic matched to operations

Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to review traffic matched to individual operations or labels.

[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)

For individual operations, use the operation ID or operation details to review matched traffic and logs. For labeled traffic, filter by managed labels such as `cf-llm` or `cf-log-in`.

Certain metrics, such as latency, may not populate when a request is handled by [Cloudflare Workers](https://developers.cloudflare.com/workers/) or a product built on Workers, such as [Waiting Room](https://developers.cloudflare.com/waiting-room/). You can also export operation and label fields through Logpush or query them through the GraphQL Analytics API. For more information, refer to [Use labels in analytics and logs](https://developers.cloudflare.com/security/web-assets/label-operations/#use-labels-in-analytics-and-logs/).

## Use learned schemas

Schema learning observes live API traffic to discover the parameters, headers, and body formats your operations accept. You can export learned schemas in OpenAPI `v3.0.0` format.

If you already maintain OpenAPI schemas, you can upload them to create operations and use them with API Shield [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

For more information, refer to [schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/).

## Define security protections

After traffic is matched to the relevant operation, define relevant security rules to act on that traffic.

For example, AI Security for Apps scans requests to operations labeled with `cf-llm`. You can then create rules that log or block requests with unsafe LLM prompt signals.

For more information, refer to [Define security protections](https://developers.cloudflare.com/security/web-assets/define-security-protections/).

## Review risks

Web Assets can show risks on operations that may need attention. A corresponding [Security Center](https://developers.cloudflare.com/security-center/) Insight may also be raised.

For the current risk reference, refer to [API endpoint risks](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/web-assets/get-started/#page","headline":"Get started · Security dashboard docs","description":"Use Web Assets to review operations, labels, matched traffic, learned schemas, and risks.","url":"https://developers.cloudflare.com/security/web-assets/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/web-assets/","name":"Web Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/security/web-assets/get-started/","name":"Get started"}}]}
```
