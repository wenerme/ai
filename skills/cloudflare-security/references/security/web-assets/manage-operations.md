---
title: Manage operations
description: Add, review, refine, and delete HTTP request operations in Web Assets.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Manage operations

## Operation states

Each operation has one of the following states:

| State     | Meaning                                                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| full      | An operation that you saved, added manually, or created from a schema. Full operations are used for matching, logging, detections, and rules.                     |
| candidate | An operation that Cloudflare discovered from traffic. Candidate operations are used for matching, logging, detections, and rules before you manually review them. |
| shadow    | An operation that exists in Web Assets but is not used for matching, logging, detections, or rules.                                                               |

You do not need to move every discovered operation into the `full` state. Candidate operations provide operation context automatically, while full operations give you more control over important traffic.

## Discovery requirements

If an operation does not appear in Web Assets, Cloudflare may not have observed enough valid requests over a continuous period. Discovery only processes requests that satisfy all of the following requirements:

* The request must return a `2xx` response code from the Cloudflare edge.
* The request must not come directly from Cloudflare Workers.
* The operation must receive at least 500 requests within a 10-day period.

## Discovered operations

Discovery continuously identifies operations from proxied HTTP traffic. Discovery groups similar request paths together by using path normalization.

For example, discovery can group these requests:

```txt
GET https://api.example.com/profile/238
GET https://api.example.com/profile/392
```

Discovery can group them into one operation:

```txt
GET api.example.com/profile/{var1}
```

Discovered operations are used for matching before you manually refine them. This provides operation context for discovered traffic without requiring you to save every discovery first.

Discovery-backed matching is subject to plan availability and system limits. Cloudflare currently sends up to 3,000 operations per zone to the edge for matching. Operations in the `full` state are prioritized first, followed by operations in the `candidate` state.

## Traffic matching behavior

Cloudflare matches each request to one operation at the edge. When more than one operation pattern could match the same request, the more specific operation wins.

Matching priority

Operations in the `full` state always match before operations in the `candidate` state.

For example, these operations could both match `GET https://example.com/checkout/pay`:

```txt
GET example.com/checkout/pay
GET example.com/checkout/{var1}
```

Cloudflare uses `GET example.com/checkout/pay` because it is more specific.

For the same method, hostname pattern, and path pattern, Cloudflare generates the same operation UUID. This keeps operation identity stable when the same operation is found again.

## Add operations manually

Add an operation manually when traffic you want to protect has not been discovered, or when you want to define the operation structure yourself.

1. In the Cloudflare dashboard, go to the **Web Assets** page with **Operations** tab highlighted.
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select **Add operation**.
3. Choose **Manually add**.
4. Select the HTTP method, enter the hostname pattern and path pattern.
5. Confirm with **Add operation**.

## Use variables in operation patterns

When you add an operation manually, use variables to match similar traffic with one operation.

For path variables, enclose the variable in braces:

```txt
/api/users/{var1}/details
```

For hostname variables, the variable must occupy a complete hostname label. Cloudflare supports patterns such as:

```txt
{hostVar1}.example.com
foo.{hostVar1}.example.com
{hostVar2}.{hostVar1}.example.com
```

Do not combine a hostname variable with other characters in the same label. The following pattern is not supported:

```txt
foo-{hostVar1}.example.com
```

## Add operations from schemas

If you already maintain OpenAPI schemas, you can continue uploading them to create operations.

Schema upload is also used by [API Shield](https://developers.cloudflare.com/api-shield/) for schema validation. For more information, refer to [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) and [schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/).

## Refine operations

Refine operations when the current grouping does not match how the traffic should be grouped or protected.

For example, you may want separate operations for login and password reset traffic, even if both routes share part of the same path structure. You may also want to replace several narrow operations with one broader operation when they represent the same application behavior.

Review overlapping operations before making changes. Cloudflare matches a request to one operation. A broad operation can change how similar requests are grouped, while a narrow operation can isolate one flow from related traffic.

## Delete operations

You can delete operations one at a time or in bulk.

1. In the Cloudflare dashboard, go to the **Web Assets** page with **Operations** tab highlighted.
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the operation(s) that you want to delete.
3. Confirm with **Delete operations**.

Note

When you delete an operation, future traffic towards this opetaion will not be matched at the edge, thus not generating analytics data for review. If Cloudflare later discovers similar traffic, the traffic may appear again as a discovered operation.

## Use the Cloudflare API

You can interact with operations through the Cloudflare API. For more information, refer to [operations API documentation](https://developers.cloudflare.com/api/resources/api%5Fgateway/subresources/discovery/subresources/operations/methods/list/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/web-assets/manage-operations/#page","headline":"Manage operations · Security dashboard docs","description":"Add, review, refine, and delete HTTP request operations in Web Assets.","url":"https://developers.cloudflare.com/security/web-assets/manage-operations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/web-assets/","name":"Web Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/security/web-assets/manage-operations/","name":"Manage operations"}}]}
```
