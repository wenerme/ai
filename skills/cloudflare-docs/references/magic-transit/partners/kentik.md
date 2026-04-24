---
title: Kentik
description: Kentik is a network observability company that helps detect attacks on your network and triggers Cloudflare's Magic Transit to begin advertisement. The example scenario includes two mitigations, one which pulls the advertisement from the router and a second mitigation that makes an API call to Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/partners/kentik.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Kentik

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
![Kentik mitigation setup](https://developers.cloudflare.com/_astro/kentik-setup.fAVcBTXq_Z1bMP90.webp)
6. After reviewing the information, select **Update Mitigation Platform**.
7. Select **Menu** \> **Library**.
8. On the **Library** page, in the search field, enter **Cloudflare**.
9. Under **Uncategorized Views**, select **Cloudflare Saved View**. This displays the data explorer.
10. From **Options** \> **Time**, you can edit the **Lookback** information to review traffic source information for a specific time period.

For additional information about Kentik and Magic Transit, refer to [Kentik's Magic Transit setup ↗](https://kb.kentik.com/v1/docs/mitigation-overview#cloudflare-mt-setup).

## Access Cloudflare account

1. Go to the **Address space** page.  
[ Go to **Address space** ](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space)
2. Select the **BYOIP addresses** tab.
3. In this example scenario, the prefix Cloudflare protects displays a **Withdrawn** status.  
After a DDoS attack occurs, the status changes to **Advertised**, which indicates Cloudflare protects the network.

## Analytics

For a detailed view of actions taken and attack types, use the **Network Analytics** dashboard. For more information about Network Analytics, refer to [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/).

Go to the **Network Analytics** page.

[ Go to **Network analytics** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/partners/","name":"Partners"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/partners/kentik/","name":"Kentik"}}]}
```
