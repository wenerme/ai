---
title: Enable DNSSEC
description: The domain name system (DNS) translates domain names into numeric Internet addresses. However, DNS is a fundamentally insecure protocol. It does not guarantee where DNS records come from and accepts any requests given to it.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/registrar/get-started/enable-dnssec.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Enable DNSSEC

The domain name system (DNS) translates domain names into numeric Internet addresses. However, DNS is a fundamentally insecure protocol. It does not guarantee where DNS records come from and accepts any requests given to it.

[DNSSEC](https://developers.cloudflare.com/dns/dnssec/) creates a secure layer to the domain name system by adding cryptographic signatures to DNS records. By doing so, your request can check the signature to verify that the record you need comes from the authoritative nameserver and was not altered along the way.

## Enable or disable DNSSEC

Cloudflare Registrar offers one-click DNSSEC activation for free to all customers:

1. In Cloudflare dashboard, go to the **Manage Domains** page.  
[ Go to **Manage domains** ](https://dash.cloudflare.com/?to=/:account/registrar/domains)
2. Find the domain that you want to activate DNSSEC and select **Manage**.
3. Select **Configuration** \> **Enable DNSSEC**. If DNSSEC was previously activated, select **Disable DNSSEC** to disable it.

Cloudflare publishes delegation signer (DS) records in the form of [CDS and CDNSKEY records ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) for a domain delegated to Cloudflare. Cloudflare Registrar scans those records at regular intervals, gathers those details and sends them to your domain's registry.

This process can take one to two days after you first enable DNSSEC.

Note

If your domain is not on Cloudflare Registrar, you can enable DNSSEC in [**DNS**](https://developers.cloudflare.com/dns/dnssec/) on the Cloudflare dashboard.

## Confirming DNSSEC

When DNSSEC has been successfully applied to your domain, Cloudflare shows you a confirmed status. Go to [**DNS** \> **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) in the Cloudflare dashboard, and scroll down to **DNSSEC**.

You can also confirm this by reviewing the [WHOIS information ↗](https://lookup.icann.org/) for your domain. Domains with DNSSEC will read `signedDelegation` in the DNSSEC field.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/registrar/","name":"Registrar"}},{"@type":"ListItem","position":3,"item":{"@id":"/registrar/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/registrar/get-started/enable-dnssec/","name":"Enable DNSSEC"}}]}
```
