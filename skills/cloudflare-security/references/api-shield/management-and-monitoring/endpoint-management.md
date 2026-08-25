---
description: Manage API operations through the Web Assets dashboard.
title: Endpoint Management
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Endpoint Management

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Available on all plans

Endpoint Management content uses the current [Web Assets](https://developers.cloudflare.com/security/web-assets/) dashboard. Go to **Web Assets** \> **Operations** to manage API endpoints.

An operation is Cloudflare's term for an endpoint identified by HTTP method, hostname pattern, and path pattern. Web Assets continuously discovers operations, and you can add them manually.

Cloudflare discovered operations are only added to the inventory. To start profiling, select **Learn profile** for the intended operation.

Schema Profile availability

Customers with API Security already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is opening a closed beta to invited Enterprise customers without API Security. Interested customers can contact their account team to express interest. Closed beta access does not imply future plan availability or pricing.

Note

When an endpoint uses [Cloudflare Workers](https://developers.cloudflare.com/workers/), some metrics are not populated.

## Access

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Operations** tab.

### Review discovered operations

Web Assets continuously adds discovered operations to the inventory. Discovery does not start profile learning.

Candidate operations can provide context for matching, edge security detections, and [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/). You do not need to change every discovered operation.

### Add operations from Schema validation

1. From **Web Assets** \> **Operations**, select **Add operation**.
2. Select **Upload schema**.
3. Upload a schema file.
4. Select **Add schema and endpoints**.

API Shield looks for duplicate operations with the same hostname, method, and path. Duplicate operations are not added.

### Add operations manually

1. From **Web Assets** \> **Operations**, select **Add operation**.
2. Select **Manually add**.
3. Select the method and enter the hostname pattern and path pattern.
4. Select **Add operation**.

When adding an operation manually, you can specify variable fields in the path or hostname. Enclose variables in braces, such as `/api/user/{var1}/details` or `{hostVar1}.example.com`.

Cloudflare supports hostname variables in the following formats:

```txt

{hostVar1}.example.com

foo.{hostVar1}.example.com

{hostVar2}.{hostVar1}.example.com
```

Hostname variables must comprise the entire domain field and must not be used with other text in the field.

The following format is not supported:

```txt

foo-{hostVar1}.example.com
```

For more information on how Cloudflare uses variables in API Shield, refer to the examples from [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/).

### Edit operations

You can edit the identity of an operation.

1. From **Web Assets** \> **Operations**, open the row actions for the operation.
2. Select **Edit operation**.
3. Update the HTTP method, hostname pattern, or path pattern.
4. Select **Save**.

Editing this operation will change its ID

Cloudflare computes operation IDs from the HTTP method, hostname, and path. Changing these values creates a different operation ID.

### Start profile learning

Start profiling only after reviewing the operation identity.

1. From **Web Assets** \> **Operations**, open the operation overflow menu.
2. Select **Learn profile**.
3. After the profile becomes available, open the overflow menu again.
4. Select **View details** and review **Security overview**.

For learning requirements, analytics, and enforcement, refer to [Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/).

### Delete operations manually

You can delete endpoints one at a time or in bulk.

1. From **Web Assets** \> **Operations**, select the operations that you want to delete.
2. Select **Delete operations**.

Caution

When you delete a full operation, Cloudflare stops tracking its associated performance and analytics data. Its previous historical metrics cannot be restored. If the operation returns to the `full` state, metric tracking restarts from that point.

## Operation analysis

For each operation in the `full` state, you can view:

* **Request count**: The total number of requests to the operation over time.
* **Rate limiting recommendation**: per 10 minutes. This is guided by the request count.
* **Latency**: The average origin response time in milliseconds (ms). This metric shows how long it takes from the moment a visitor makes a request to the moment the visitor gets a response back from the origin.
* **Error rate** vs. overall traffic: grouped by 4xx, 5xx, and their sum.
* **Response size**: The average size of the response (in bytes) returned to the request.
* **Labels**: The current [labels](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/) assigned to the operation.
* **[Authentication status](https://developers.cloudflare.com/api-shield/security/authentication-posture/)**: The session identifiers observed on successful requests to this operation.
* **Sequences**: The number of [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) sequences containing the operation.

Note

You can view detailed metrics from the last 24 hours or seven days.

## Using the Cloudflare API

You can manage operations through the Cloudflare API. For more information, refer to the [operations API documentation](https://developers.cloudflare.com/api/resources/api%5Fgateway/subresources/discovery/subresources/operations/methods/list/).

## Sensitive Data Detection

Sensitive data comprises various personally identifiable information and financial data. Cloudflare created this ruleset to address common data loss threats, and the WAF can search for this data in HTTP response bodies from your origin.

API Shield alerts you to sensitive data in responses from full operations. Your zone must also have the [Sensitive Data Detection managed ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/).

Sensitive Data Detection is available to Enterprise customers on our Advanced application security plan.

After you turn on Sensitive Data Detection, API Shield queries WAF events from the last seven days. Web Assets marks operations that have matched sensitive responses.

Open the operation details to review the detected sensitive data types. Select **Explore Events** to view matched events in Security Events.

After you turn on Sensitive Data Detection for your zone, you can [browse the Sensitive Data Detection ruleset ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/data/ruleset/e22d83c647c64a3eae91b71b499d988e/rules). The link will not work if Sensitive Data Detection is not turned on.

## Limitations

Certain performance metrics, such as latency, are not supported when a request is handled by a Cloudflare service in a way that prevents it from being passed directly to your origin server.

This limitation is specifically observed when:

* A Cloudflare Worker is running on the URL path.
* Other products built on top of Workers, such as [Waiting Room](https://developers.cloudflare.com/waiting-room/), are active on the application.

In these scenarios, the system is unable to accurately measure the origin response time, and the metric will not be populated in the dashboard.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#page","headline":"Endpoint Management · Cloudflare API Shield docs","description":"Manage API operations through the Web Assets dashboard.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
