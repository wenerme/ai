---
description: Restart, reboot, or shut down a Cloudflare One Appliance from the dashboard or via API.
title: Appliance operations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Appliance operations

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/maintenance/appliance-operations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can restart, reboot, or shut down a Cloudflare One Appliance (formerly Magic WAN Connector) from the dashboard or via API. Operations are asynchronous — the appliance executes them the next time it checks in.

| Operation    | Effect                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Restart**  | Restart managed services. Purges temporary and (optionally) persistent state.                                             |
| **Reboot**   | Power cycle the appliance. Optionally, purge persistent state. Re-applies configuration starting from scratch.            |
| **Shutdown** | Power off the appliance. Optionally, purge persistent state. The machine will be offline until manually powered on again. |

Caution

Operations may disrupt service. Only one operation can be pending at a time.

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Appliances**.
2. Find the Cloudflare One Appliance you want to manage > **Edit**.
3. Scroll down to the **Operations** section.
4. Select **Restart**, **Reboot**, or **Shutdown**.
5. In the confirmation dialog:
  * Check **I understand this operation may disrupt service** (required).
  * Optionally, check **Purge persistent state** to clear persistent data in addition to temporary state.
6. Select **Confirm**.

The operation is submitted and runs when the appliance next checks in. A banner shows the pending operation status until the appliance executes it.

Send a `POST` request to the interrupts endpoint with one of the following actions:

**Restart managed services:**

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/connectors/{connector_id}/interrupts" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"restart": {"purge": false}}'
```

**Reboot (power cycle):**

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/connectors/{connector_id}/interrupts" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"reboot": {"purge": false}}'
```

**Shut down:**

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/connectors/{connector_id}/interrupts" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"shutdown": {"purge": false}}'
```

Set `"purge": true` to also purge persistent state.

The response includes a `submitted_at` timestamp. To check whether the appliance has executed the operation, poll the list endpoint:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/connectors/{connector_id}/interrupts" \
--header "Authorization: Bearer <API_TOKEN>"
```

When `triggered_at` is populated in the response, the appliance has executed the operation.

Note

Only one operation can be pending at a time. If an operation is already pending, the API returns a `409 Conflict` response.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/maintenance/appliance-operations/#page","headline":"Appliance operations · Cloudflare WAN docs","description":"Restart, reboot, or shut down a Cloudflare One Appliance from the dashboard or via API.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/maintenance/appliance-operations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
