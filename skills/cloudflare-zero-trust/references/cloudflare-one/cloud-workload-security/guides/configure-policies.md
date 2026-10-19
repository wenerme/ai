---
description: Define workloads and Rego policies, group them in policy sets, and attach them to a Cloud Workload Security deployment.
title: Configure policies
image: https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/og.png?v=1c7edfa09308f8ca
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure policies

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use workloads to select requests and policies to check them. Group policies in a policy set, then attach that set to a deployment.

You need access to manage Cloud Workload Security in your account. Before attaching a policy set, [create a deployment](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/#create-a-deployment). To connect a proxy, follow [Get started](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/).

## Create a workload

A workload is a reusable request filter. For example, you can group requests to the Cloudflare API.

Use separate workloads to [target security profiles for production and non-production environments](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/#target-security-profiles-with-workloads). Include each workload in the policy set for that environment.

1. In the Cloudflare dashboard, select your account and go to **Cloud Workload Security** > **Workloads**. [Go to **Workloads** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/workloads)
2. Select **Add workload** and enter a **Workload name**.
3. In **Filters**, select **Wirefilter** and enter a filter. This example matches Cloudflare API requests:

   ```txt
   application.name == "Cloudflare"
   ```

   You can also use **Visual Builder** to select fields, operators, and values. Select an application before selecting its service or operation.
4. Select **Add workload** to save the workload.

## Create a policy

Both **Filters** and **Rego source** are required.

A policy filter selects the requests that run its Rego check. The Rego source must declare a package under `policy.` and a Boolean rule named `valid`.

1. In the Cloudflare dashboard, go to **Cloud Workload Security** > **Policies**. [Go to **Policies** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/policies)
2. Select **Add policy** and enter a **Policy name**.
3. In **Filters**, select **Wirefilter** and enter the request scope. This example selects R2 API requests:

   ```txt
   application.name == "Cloudflare" and application.service == "r2"
   ```

4. In **Rego source**, enter the check. This example permits only `GET` requests within the selected scope:

   *Rego sourcetxt*



   ```txt
   package policy.r2_read_only

   default valid := false

   valid if {
     input.http.request.method == "GET"
   }
   ```

   Use `input.http.request.body` to inspect parsed request content. For a request-body example, refer to the [R2 public-access guardrail](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/#create-the-guardrail-policy).
5. Select **Add policy** to save the policy. Correct any filter or Rego errors before continuing.

## Create a policy set

A policy set groups policies and their workload scope. A request must match an included workload and must not match an excluded workload. Without included workloads, the set has no inclusion restriction.

1. In the Cloudflare dashboard, go to **Cloud Workload Security** > **Policy sets**. [Go to **Policy sets** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/policy-sets)
2. Select **Add policy set** and enter a **Policy set name**.
3. In **Workloads**, select **Attach workload**, choose the workloads to include, and confirm the selection. To omit a group of requests, select **Exclude workload**.
4. In **Policies**, select **Attach policy**, choose the policies, and select **Attach policies**.
5. For each policy, turn on **Enforce** to block requests that fail its check. Turn it off to evaluate the policy without blocking on its result.
6. Select **Add policy set** to save the set.

The policy filter still applies within the policy set's workload scope. A workload match does not bypass a policy filter.

## Attach the set to a deployment

1. In the Cloudflare dashboard, go to **Cloud Workload Security** > **Deployments** and open the deployment. [Go to **Deployments** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/deployments)
2. In **Policy sets**, select **Attach policy set**, choose the set, and select **Attach policy sets**.
3. In **Deployment settings**, choose a **Default mode**. *Default allow* permits requests outside every policy's request scope. *Default block* blocks those requests.
4. Select **Save**. Allow a configuration refresh interval before testing through the proxy.

### Default mode and enforcement

A policy matches when its policy set's workload scope and its filter both match. The deployment default mode applies when no policy matches. A `false` Rego result is a failed check, not an unmatched request.

For example, a matching policy with **Enforce** off does not block a `false` result, even with *Default block*. Another enforcing policy can still block the request.

Send one request that passes your policy and one that fails it. Confirm the failing request returns a CWS block response when **Enforce** is on.

To change an existing resource, open it from its list and select **Save** after editing. Changes to a policy or policy set affect deployments that reference it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/#page","headline":"Configure policies","description":"Define workloads and Rego policies, group them in policy sets, and attach them to a Cloud Workload Security deployment.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/og.png?v=1c7edfa09308f8ca","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
