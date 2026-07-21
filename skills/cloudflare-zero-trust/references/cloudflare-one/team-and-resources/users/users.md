---
description: How User logs works in Zero Trust.
title: User logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  User logs

Last updated May 1, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

User logs show a list of all users who have authenticated to Cloudflare One. For each user who has logged in, you can view their enrolled devices, login history, seat usage, and identity used for policy enforcement.

## View user logs

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Users**.

This page lists all users who have registered the Cloudflare One Client or authenticated to a Cloudflare Access application. You can select a user's name to view detailed logs, [revoke their session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#revoke-user-sessions), or [remove their seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/).

### Available logs

* **User Registry identity**: Select the user's name to view their last seen identity. This identity is used to evaluate Gateway policies and Cloudflare One Client [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/). A refresh occurs when the user re-authenticates the device client, logs into an Access application, or has their IdP group membership updated via [SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/). To track how the user's identity has changed over time, go to the **Audit logs** tab.
* **Session identities**: The user's active sessions, the identity used to authenticate each session, and when each session will [expire](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/).
* **Devices**: Devices registered to the user via the Cloudflare One Client.
* **Recent activities**: The user's five most recent Access login attempts. For more details, refer to your [authentication audit logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/#authentication-logs).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/#page","headline":"User logs · Cloudflare One docs","description":"How User logs works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
