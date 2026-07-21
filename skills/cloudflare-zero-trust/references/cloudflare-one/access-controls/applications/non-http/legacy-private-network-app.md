---
description: Private network applications (legacy) in Access.
title: Private network applications (legacy)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Private network applications (legacy)

Last updated May 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Caution

The Private Network application type can no longer be created from the dashboard. If you do not already have a legacy private network application, use a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) to secure a private IP address instead.

Existing **Private Network** applications continue to function and can still be managed. These applications were originally configured with the following steps:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications** \> **Add an application**.
2. Select **Private Network**.
3. Name your application.
4. For **Application type**, select _Destination IP_.
5. For **Value**, enter the IP address for your application (for example, `10.128.0.7`).
Note
If you would like to create a policy for an IP/CIDR range instead of a specific IP address, you can build a [Gateway Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) using the **Destination IP** selector.
6. Configure your [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) visibility and logo.
7. Select **Next**. You will see two auto-generated Gateway Network policies: one that allows access to the destination IP and another that blocks access.
8. Modify the policies to include additional identity-based conditions. For example:

  * **Policy 1**

| Selector       | Operator      | Value           | Logic | Action |
| -------------- | ------------- | --------------- | ----- | ------ |
| Destination IP | in            | 10.128.0.7      | And   | Allow  |
| User Email     | matches regex | .\*@example.com |       |        |
  * **Policy 2**

| Selector       | Operator | Value      | Action |
| -------------- | -------- | ---------- | ------ |
| Destination IP | in       | 10.128.0.7 | Block  |
Policies are evaluated in [numerical order](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence), so a user with an email ending in @example.com will be able to access `10.128.0.7` while all others will be blocked. For more information on building network policies, refer to our [dedicated documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/).
9. Select **Add application**.

Your application will appear on the **Applications** page.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/#page","headline":"Private network applications (legacy) · Cloudflare One docs","description":"Private network applications (legacy) in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
