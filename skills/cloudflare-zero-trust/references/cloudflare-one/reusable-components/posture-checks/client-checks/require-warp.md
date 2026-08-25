---
description: Require WARP in Zero Trust.
title: Require WARP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Require WARP

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-warp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This device posture attribute will check for all versions of WARP, including the consumer version.

Cloudflare One enables you to restrict access to your applications to devices running the Cloudflare One Client. This allows you to flexibly ensure that a user's traffic is secure and encrypted before allowing access to a resource protected behind Cloudflare One.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## 1\. Enable the WARP check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. Ensure that _Allow Secure Web Gateway to proxy traffic_\* is enabled.
3. Go to **Reusable components** \> **Posture checks**.
4. In **Cloudflare One Client checks**, select **Add a check**.
5. Select **WARP**, then select **Save**.

## 2\. Add the check to an Access policy

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate the application for which you want to require WARP. Select **Configure**.
3. In the **Policies** tab, create a new Access policy or edit an existing policy.
4. In the policy builder, add an Include or Require rule which uses the _WARP_ selector. Save the policy.
5. Save the Access application.

Before granting access to the application, the policy will check that the device is running the Cloudflare One Client.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-warp/#page","headline":"Require WARP · Cloudflare One docs","description":"Require WARP in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-warp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
```
