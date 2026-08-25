---
description: Reference information for SCIM provisioning logs in Zero Trust analytics.
title: SCIM provisioning logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# SCIM provisioning logs

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

SCIM (System for Cross-domain Identity Management) activity logs allow administrators to audit how [SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) events in an identity provider (such as create, update, and delete) affect a user's identity and group membership in Zero Trust. You can compare your Zero Trust SCIM logs with your identity provider's SCIM logs to track how identity data is shared between the two services and pinpoint the source of any provisioning errors.

## View SCIM logs

For an overview of SCIM events across all users, log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Insights** \> **Logs** \> **SCIM provisioning logs**. This page lists the inbound SCIM requests that your identity providers have sent to Cloudflare. You can select an individual request to view more details about the SCIM operation.

To investigate how SCIM events impacted a specific user, go to their [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/). View their last seen identity and group memberships, and track how their identity has changed over time.

Note

New users must first [register the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) or authenticate to an Access application before SCIM provisioning can begin.

## Log fields

SCIM provisioning logs show the following information for each inbound SCIM request:

* **IdP name**: Name of the identity provider that sent the request
* **Timestamp**: Date and time of the request
* **Action**: HTTP request method (`POST`, `PUT`, `PATCH`, `DELETE`). `POST` indicates a resource was created, `PUT` indicates a full resource replacement, `PATCH` indicates a partial update, and `DELETE` indicates a resource was removed.
* **User email**: User who received the SCIM identity update
* **Group name**: Group that received the SCIM identity update
* **Resource type**: Whether the request modified a group or a user (`GROUP` or `USER`)
* **CF resource ID**: Persistent identifier for the user or group created by Cloudflare SCIM. Use this ID to look up the resource in Zero Trust.
* **IDP resource ID**: Identifier for the user or group provided by the identity provider. Use this ID to match the log entry with the corresponding record in your identity provider.
* **Outcome**: Whether the SCIM request was applied successfully (`SUCCESS` or `ERROR`)
* **Request body**: HTTP request body containing the data that was added, modified, or removed
* **JSON log**: SCIM request log in JSON format

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/#page","headline":"SCIM provisioning logs · Cloudflare One docs","description":"Reference information for SCIM provisioning logs in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SCIM"]}
```
