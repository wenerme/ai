---
description: Understand how Cloud Workload Security combines workloads, policy sets, policy filters, and Rego checks to validate API requests.
title: Request Validation
image: https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/og.png?v=482f7acb7c765646
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Request Validation

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloud Workload Security (CWS) uses workloads and policies to validate API requests. Workloads define request scope. Policies define the checks, and policy sets connect scope to checks. A deployment selects the policy sets to apply.

For a definition of each resource, refer to [CWS entities](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/#cws-entities).

## How the concepts work together

Request validation combines scope, checks, and enforcement settings:

```
flowchart TD
    accTitle: CWS request validation
    accDescr: A deployment selects policy sets. Workloads define request scope, policy filters select matching requests, and Rego valid rules validate them. Modules, metadata, and tenant structures supply shared logic and data. Enforce settings and deployment defaults determine whether requests are allowed or blocked.

    A["Deployment's policy sets"] --> B["Workload scope<br/>Included and excluded requests"]
    B --> C["Policy filters<br/>Select applicable policies"]
    C -->|Matching policies| D["Rego validation<br/>Each policy's valid rule"]
    C -->|No matching policy| F["Request decision<br/>Enforce and deployment defaults"]
    E["Rego modules, metadata,<br/>and tenant structures"] -.-> D
    D --> F

```

## Select applicable policies

### Deployment and policy sets

The deployment selects the policy sets available for evaluation. Each set groups policies and specifies included and excluded workloads.

### Workload scope

A request must match an included workload when inclusions are configured. It must not match an excluded workload. An empty inclusion list adds no inclusion restriction.

### Policy filter

Within that scope, each policy's filter selects the requests to check. For example, a workload can select Cloudflare API traffic while a policy filter selects one R2 operation. Workload scope and policy filter must both match for the policy to apply.

## Validate with Rego

Each matching policy evaluates a Boolean rule named `valid`. A `true` result passes that policy's check. A `false` result fails it. Use Rego to validate request content, such as whether a change would make a bucket public.

Policies can reuse shared logic and data:

- [Rego modules](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/#create-a-rego-module) supply reusable checking logic.
- [Rego metadata](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/#create-rego-metadata) supplies shared JSON values.
- [Tenant structures](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/#create-a-tenant-structure) describe cloud resource hierarchies. A package path makes their nodes available to Rego.

## Apply enforcement and defaults

Each policy's **Enforce** setting within its policy set determines how its check result affects the request:

| Condition | Effect |
| --- | --- |
| A matching policy returns `true`. | That check passes. Another enforcing policy can still block the request. |
| A matching policy returns `false` with **Enforce** on. | Block the request. |
| A matching policy returns `false` with **Enforce** off. | Record the failed check without blocking on that policy's result. |
| No policy matches the request. | Apply the deployment's **Default mode**. |

More than one policy can match a request. A failed enforcing policy blocks even when another policy passes. A failed Rego check is not an unmatched request, so it does not fall back to **Default mode**.

Configure policy error handling with the deployment's **On error action** setting.

## Example: keep R2 buckets private

Suppose a workload selects Cloudflare API requests. Its policy set contains a policy for changing R2 bucket public access. The policy filter selects that operation. Rego permits it only when `input.http.request.body.enabled` is `false`.

An attempt to turn on public access matches the filter but fails Rego validation. With **Enforce** on, CWS blocks the request. For a runnable guardrail example, follow [Get started](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/).

## Related controls

[Domain ACLs](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/#create-a-domain-acl) control which destinations a deployment can reach. Allowing a destination does not bypass workload scope or policy checks.

[Basic Auth credentials](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/#create-a-basic-auth-credential) provide client identities that workload and policy filters can match. The cloud provider still applies its own authentication and permissions.

To configure scope and enforcement, follow [Configure policies](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/). To inspect decisions, refer to [Read proxy logs](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/troubleshooting/#read-proxy-logs).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/#page","headline":"Request Validation","description":"Understand how Cloud Workload Security combines workloads, policy sets, policy filters, and Rego checks to validate API requests.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/og.png?v=482f7acb7c765646","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
