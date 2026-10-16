---
description: Create, edit, and delete custom applications in the App Library and use them in Gateway policies.
title: Custom applications
image: https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/custom-applications/og.png?v=fbedbc2d26364f3a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom applications

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/custom-applications/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Create a custom application to identify an internal service or an application that is not in the Cloudflare-managed catalog. Custom applications belong to your account and appear alongside Cloudflare-managed applications in the App Library. You can use them in [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-controls/dns-policies/#application), [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-controls/http-policies/#application), and [Network](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/#application) policies with the existing **Application** selector.

## Create a custom application

1. In the Cloudflare dashboard, go to **Zero Trust** > **Team & Resources** > **Application library**. [Go to **Application library** ↗](https://one.dash.cloudflare.com/?to=/:account/team-resources/application-library)
2. Select **Add custom application**.
3. Enter an **Application name** and **Application ID**, and select a **Category**. The Application ID field contains a human-readable identifier generated from the name, which you can change before saving. Cloudflare also assigns a numeric application ID for use in Gateway rule expressions.
4. In **Network identifiers**, enter at least one **Hostname** or **IP subnet**. You can include both hostnames and IP subnets in the same application.
5. (Optional) Add **Support hostnames** for dependencies such as authentication or content delivery, and **Port protocols** to restrict matching to specific TCP or UDP ports. Refer to [custom application limits](#custom-application-limits) for formats and limits.
6. Select **Add custom application**.

Creating an application does not create a Gateway policy. To control its traffic, [reference the application in a policy](#use-a-custom-application-in-gateway).

## Edit a custom application

1. In **Application library**, find the custom application and open its actions menu.
2. Select **Edit custom app**.
3. Update its **Hostnames**, **Support hostnames**, **IP subnets**, or **Port protocols**. The application must retain at least one primary hostname or IP subnet.
4. Select **Save**.

The application name, human-readable Application ID, and category are fixed after creation. Editing the network identifiers preserves the numeric application ID, so Gateway policies that reference the application use its updated definition without changing their expressions. Allow time for the updated definition to propagate to Gateway.

You can also [change the application's review status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/#review-applications) from its actions menu.

## Use a custom application in Gateway

1. In **Traffic policies**, create or edit a DNS, HTTP, or network policy.
2. For the traffic condition, select **Application** and choose the custom application by name. You can select custom and Cloudflare-managed applications in the same condition.
3. Choose the policy action and save the policy.

You can also start a policy from the application's actions menu by selecting **Create new Gateway policy** and choosing a policy type.

Custom applications use the same selectors and numeric IDs as other [applications in Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-controls/application-app-types/#custom-applications). Use the assigned numeric ID when configuring a Gateway rule through the API or Terraform.

## Delete a custom application

You cannot delete a custom application while a Gateway rule or reusable profile references it. Remove the application from every referencing rule and profile before deleting it. Turning off a rule does not remove its reference.

1. In **Application library**, find the custom application and open its actions menu.
2. Select **Delete custom app**.
3. Confirm the deletion.

If the application is still referenced, deletion fails and the API returns HTTP `409` with the referencing resource IDs, names, and types. If Gateway cannot verify the references, deletion also fails and the application remains available.

## Custom application limits

For the number of custom applications you can create per account, refer to [Application Library account limits](https://developers.cloudflare.com/cloudflare-one/account-limits/#application-library).

The following limits apply to each custom application when creating or editing it.

| Field | Limit or supported format |
| --- | --- |
| Hostnames and support hostnames | 50 entries combined. For example, 40 primary hostnames leave room for 10 support hostnames. |
| IP subnets | 50 entries per application, separate from the hostname limit. Use CIDR notation. IPv4 prefix lengths must be `/8` through `/32`. IPv6 prefix lengths must be `/32` through `/128`. For a single address, use `/32` for IPv4 or `/128` for IPv6. |
| Port protocols | TCP and UDP, in `protocol/port` or inclusive `protocol/start-end` format, such as `tcp/443` or `udp/10000-20000`. The dashboard accepts ports `1` through `65535`. The API also accepts port `0`. The start of a range must be less than or equal to its end. There is no separate entry-count limit for this field. |

At least one primary hostname or IP subnet is required. Support hostnames, ports, or a combination of support hostnames and ports cannot satisfy this requirement. You cannot create a custom application identified only by a port and protocol, such as `tcp/443`.

Hostnames and IP subnets are alternative ways to match the application. Port protocols, when configured, restrict those matches in HTTP and network policies. DNS policies do not check destination ports. Refer to [custom application matching](https://developers.cloudflare.com/cloudflare-one/traffic-controls/application-app-types/#custom-application-matching) for examples.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/custom-applications/#page","headline":"Custom applications","description":"Create, edit, and delete custom applications in the App Library and use them in Gateway policies.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/custom-applications/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/custom-applications/og.png?v=fbedbc2d26364f3a","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
