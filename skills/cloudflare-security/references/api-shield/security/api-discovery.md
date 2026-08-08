---
description: Map out and understand your API attack surface with API Discovery.
title: API Discovery
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# API Discovery

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/api-discovery/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Most development teams struggle to keep track of their APIs. Cloudflare API Discovery helps you map out and understand your API attack surface — the full set of endpoints that could be targeted by attackers.

## Process

Cloudflare produces a map of API endpoints by grouping similar request paths together (path normalization).

For example, you might have thousands of APIs, but a lot of the calls look similar, such as:

* `api.example.com/profile/238`
* `api.example.com/profile/392`

Both paths serve a similar purpose — retrieving user profiles — but they are not identical. To simplify your endpoints, these examples might both map to `api.example.com/profile/*`.

API Discovery runs this process across all your traffic, generating a simple map of endpoints that might look like:

```plaintext
/api/login/{customer_identifier}
/api/auth
/api/account/{customer_identifier}
/api/password_reset
/api/logout
```

Similarly, if you have multiple subdomains that share the same set of endpoints, Cloudflare consolidates subdomains:

```txt
us-api.example.com/api/v1/users/{var1}
de-api.example.com/api/v1/users/{var1}
fr-api.example.com/api/v1/users/{var1}
jp-api.example.com/api/v1/users/{var1}
```

Cloudflare consolidates these to `{hostVar1}.example.com/api/v1/users/{var1}`.

For more technical details, refer to the [blog post ↗](https://blog.cloudflare.com/ml-api-discovery-and-schema-learning/).

### Discovered operations

Web Assets adds discovered API endpoints to the operation inventory as candidate operations. Candidate operations provide context for matching, logging, detections, and rules before you manually review them.

You do not need to promote every discovered operation. Promote an operation to move it to the `full` state and start profile learning. Full operations support persisted API profiles, risk findings, and protections that require a known API endpoint.

To promote a discovered operation:

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Operations** tab.
3. Open the row actions for a candidate or shadow operation.
4. Select **Learn profile**.

Cloudflare moves the operation to the `full` state. The row action then changes to **Profile learned**. For more information, refer to [Promote an operation](https://developers.cloudflare.com/security/web-assets/manage-operations/#promote-an-operation).

### Machine learning-based discovery

Your API endpoints are discovered with both session identifier-based discovery and machine learning-based discovery.

To access machine learning-based discovery:

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Discovery** tab.
3. Filter the source results by `Session Identifier` or `Machine Learning` to view results from each discovery method.

If all of your zone's API traffic contains the session identifier that you have configured, both sources may deliver the same results due to similarities between their underlying methodology. Machine learning-based discovery can identify API traffic regardless of whether your API uses a session identifier.

You can direct any feedback about your API Discovery results to your account team.

## Requirements

API endpoints are discovered based on machine learning or session identifiers. Machine learning based API discovery has traffic requirements. For more information, refer to [Discovery requirements](https://developers.cloudflare.com/security/web-assets/manage-operations/#discovery-requirements/).

## Availability

API Discovery is only available for Enterprise customers. If you are an Enterprise customer interested in this product, contact your account team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/api-discovery/#page","headline":"API Discovery · Cloudflare API Shield docs","description":"Map out and understand your API attack surface with API Discovery.","url":"https://developers.cloudflare.com/api-shield/security/api-discovery/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
