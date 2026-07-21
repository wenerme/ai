---
description: Discover operations in applications proxied through Cloudflare and use that context to protect important traffic.
title: Web Assets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

#  Web Assets

Last updated Jun 26, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/security/web-assets/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Web Assets automatically discovers operations in web applications proxied through Cloudflare. Operation context helps you define security protections against application-specific functionalities.

For example, discovering operations that receive LLM prompts so [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) can help you define targeted protections such as deterring prompt injections.

To access Web Assets in the Cloudflare dashboard, go to the **Web Assets** page.

[ Go to **Web assets** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)

## Definition of an operation

An operation is a group of HTTP requests that serve the same purpose in your application. Each operation is defined by:

* HTTP method
* Hostname pattern
* Path pattern

For example, Web Assets can group requests to product detail pages into one operation:

```txt
GET example.com/products/{var1}
```

The operation can match requests such as:

```txt
GET https://example.com/products/shoes
GET https://example.com/products/hats
GET https://example.com/products/jackets
```

This lets Cloudflare identify requests that serve the same purpose in your application.

## How Cloudflare identifies operations

Operations can come from several sources:

* **Discovery**: Web Assets continuously reviews proxied HTTP traffic and groups similar requests into operations using machine learning (for [API discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/)) and heuristics.
* **Manual entry**: You can add operations by method, hostname pattern, and path pattern.
* **Schema upload**: You can [upload an OpenAPI schema](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-schema-validation) to create operations from an existing API definition.

These sources contribute to the same operation inventory. You do not need to review every discovered operation before security detections can use operation context.

## Describe operations context

[Labels](https://developers.cloudflare.com/security/web-assets/label-operations/) describe what an operation does, such as a login flow, sign-up flow, AI-powered operation, or another use case.

Cloudflare defines managed labels. Some managed labels can be discovered automatically, but not every managed label is currently auto-discovered.

Custom labels let you organize operations for your own workflows. They do not replace managed labels for Cloudflare security detections.

## Define security protections

Security detections can use Web Assets to focus on the operations where their signals matter. For example, [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) uses the `cf-llm` managed label to scan requests to AI-powered operations. For more information, refer to [Define security protections](https://developers.cloudflare.com/security/web-assets/define-security-protections/).

### Related API Shield features

Web Assets focuses on HTTP request operations. For API-specific protections such as schema validation, schema learning, mutual TLS, and JWT validation, refer to [API Shield](https://developers.cloudflare.com/api-shield/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/web-assets/#page","headline":"Web Assets · Security dashboard docs","description":"Discover operations in applications proxied through Cloudflare and use that context to protect important traffic.","url":"https://developers.cloudflare.com/security/web-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
