---
description: Promote, learn, and monitor API endpoints with API Shield and Web Assets.
title: Endpoint Management
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Endpoint Management

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Available on all plans

Web Assets provides a unified inventory for managing API endpoints. In Web Assets, an **operation** represents an endpoint by its HTTP method, hostname pattern, and path pattern.

Promote an API endpoint to move its operation into the `full` state. Promotion starts collecting data for profile learning and [performance analysis](#endpoint-analysis).

Note

When an endpoint uses [Cloudflare Workers](https://developers.cloudflare.com/workers/), some metrics are not populated.

## Access

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Operations** tab.

### Add endpoints from API Discovery

The **Learn profile** action is available to API Shield customers using unified operation discovery and other customers with access to profile learning.

This workflow promotes an existing discovered operation.

1. From **Web Assets** \> **Operations**, open the row actions for a candidate or shadow operation.
2. Select **Learn profile**.

Cloudflare promotes the operation to the `full` state. The row action then changes to **Profile learned**. For more information, refer to [Promote an operation](https://developers.cloudflare.com/security/web-assets/manage-operations/#promote-an-operation).

You do not need to promote every discovered operation. Candidate operations can provide context for matching, edge security detections, and [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) without promotion. Persisted API profiles and [risk findings](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels) require operations in the `full` state.

### Add endpoints from Schema validation

1. From **Web Assets** \> **Operations**, select **Add operation**.
2. Select **Upload schema**.
3. Upload a schema file.
4. Select **Add schema and endpoints**.

API Shield looks for duplicate operations with the same hostname, method, and path. Duplicate operations are not added.

### Add endpoints manually

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

Editing a candidate or shadow operation promotes it to the `full` state with the edited values.

Editing this operation will change its ID

Cloudflare computes operation IDs from the HTTP method, hostname, and path. Cloudflare relearns labels, schemas, and rate limiting recommendations for an operation with a new ID.

### Delete endpoints manually

You can delete endpoints one at a time or in bulk.

1. From **Web Assets** \> **Operations**, select the operations that you want to delete.
2. Select **Delete operations**.

Caution

When you delete a full operation, Cloudflare stops tracking its associated performance and analytics data. Its previous historical metrics cannot be restored. If the operation returns to the `full` state, metric tracking restarts from that point.

## Endpoint analysis

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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#page","headline":"Endpoint Management · Cloudflare API Shield docs","description":"Promote, learn, and monitor API endpoints with API Shield and Web Assets.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
