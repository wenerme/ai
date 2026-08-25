---
description: Kentik is a network observability company that helps detect attacks on your network and triggers Cloudflare's Magic Transit to begin advertisement. The example scenario includes two mitigations, one which pulls the advertisement from the router and a second mitigation that makes an API call to Cloudflare.
title: Kentik
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Kentik

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/partners/kentik/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Kentik is a network observability company that helps detect attacks on your network and triggers Cloudflare's Magic Transit to begin advertisement. Together, Kentik and Magic Transit On Demand work to create a fully Software-as-a-Service (SaaS)-based, Distributed Denial of Service ([DDoS](https://developers.cloudflare.com/ddos-protection/)) protection solution to help you mitigate attacks and protect your network automatically.

In this tutorial, the example scenario includes two mitigations, one which pulls the advertisement from the router and a second mitigation that makes an API call to Cloudflare to begin advertising the prefixes from Cloudflare's global network.

## Prerequisites

You will need the email address associated with your Cloudflare account, Cloudflare Account ID, and Cloudflare API token to configure the connection for Magic Transit in Kentik.

## Configure the Kentik portal

1. Log in to your Kentik account.
2. Select **Menu** \> **Settings**.
3. From the **Settings** page under **Customizations**, select **Mitigations**.
4. On the **Configure Mitigations** page, locate the **Cloudflare** section.
5. Select **Edit** next to the Cloudflare branded mitigation to edit and review the information.
In the following example, section 2 uses the Cloudflare email address, Account ID, and API token to send the API call to Cloudflare to begin advertising routes and turn on Magic Transit for the customer's network.
![Kentik mitigation setup](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=706,height=729,format=webp/_astro/kentik-setup.fAVcBTXq.png)
6. After reviewing the information, select **Update Mitigation Platform**.
7. Select **Menu** \> **Library**.
8. On the **Library** page, in the search field, enter **Cloudflare**.
9. Under **Uncategorized Views**, select **Cloudflare Saved View**. This displays the data explorer.
10. From **Options** \> **Time**, you can edit the **Lookback** information to review traffic source information for a specific time period.

For additional information about Kentik and Magic Transit, refer to [Kentik's Magic Transit setup ↗](https://kb.kentik.com/v1/docs/mitigation-overview#cloudflare-mt-setup).

## Access Cloudflare account

1. Go to the **Address space** page.
[Go to **Address space** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space)
2. Select the **BYOIP addresses** tab.
3. In this example scenario, the prefix Cloudflare protects displays a **Withdrawn** status.
After a DDoS attack occurs, the status changes to **Advertised**, which indicates Cloudflare protects the network.

## Analytics

For a detailed view of actions taken and attack types, use the **Network Analytics** dashboard. For more information about Network Analytics, refer to [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/).

Go to the **Network Analytics** page.

[Go to **Network analytics** ↗](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/partners/kentik/#page","headline":"Kentik · Cloudflare Magic Transit docs","description":"Kentik is a network observability company that helps detect attacks on your network and triggers Cloudflare's Magic Transit to begin advertisement. The example scenario includes two mitigations, one which pulls the advertisement from the router and a second mitigation that makes an API call to Cloudflare.","url":"https://developers.cloudflare.com/magic-transit/partners/kentik/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Integration"]}
```
