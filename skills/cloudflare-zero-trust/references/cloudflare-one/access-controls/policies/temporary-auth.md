---
description: Temporary authentication in Access.
title: Temporary authentication
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Temporary authentication

Last updated Apr 30, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

With Cloudflare Access, you can require that users obtain approval before they can access a specific self-hosted application or SaaS application. The administrator will receive an email notification to approve or deny the request. Unlike a typical Allow policy, the user will have to request access at the end of each session. This allows you to define the users who should have persistent access and those who must request temporary access.

## Set up temporary authentication

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Choose a **Self-hosted** or **SaaS** application and select **Configure**.
3. Choose an **Allow** policy and select **Configure**.
4. Under **Additional settings**, turn on [**Purpose justification**](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/).
5. Turn on **Temporary authentication**.
6. Enter the **Email addresses of the approvers**.
Note
Your approvers must be authenticated by Access. If they do not have an active session, Access will verify their identity against your [App Launcher Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/).
7. Save the policy.

Temporary authentication is now enabled for users who match this policy. You can optionally add a second **Allow** policy for users who should have persistent access. Be sure the policy order is set to allow persistent users through.

## Temporary authentication requests

When a user accesses the application, they will be prompted to enter a purpose justification and submit an access request. The request is automatically emailed to approvers. Alternatively, the user can manually present the approval link to approvers. ![Temporary authentication request page shown to users](https://developers.cloudflare.com/_astro/temp-auth-request.WnwXx8ul_1vy5pt.webp)

Approvers will receive a request similar to the example below. The approver can then grant access for a set amount of time, up to a maximum of 24 hours.

![Temporary authentication approval page shown to administrators](https://developers.cloudflare.com/_astro/temp-auth-approval.D0-hjStz_1KlkRx.webp)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/#page","headline":"Temporary authentication · Cloudflare One docs","description":"Temporary authentication in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
```
