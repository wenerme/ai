---
title: Subdomains
description: Add Email Routing to subdomains within your zone and create custom addresses for each subdomain.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-routing/setup/subdomains.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Subdomains

Email Routing is a [zone-level](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) feature. A zone has a top-level domain (the same as the zone name) and it can have subdomains (managed under the DNS feature.) As an example, you can have the `example.com` zone, and then the `mail.example.com` and `corp.example.com` sub-domains under it.

You can use Email Routing with any subdomain of any zone in your account. Follow these steps to add Email Routing features to a new subdomain:

1. In the Cloudflare dashboard, go to the **Email Routing** page.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Go to **Settings**, and select **Add subdomain**.

Once the subdomain is added and the DNS records are configured, you can see it in the **Settings** list under the **Subdomains** section.

Now you can go to **Email** \> **Email Routing** \> **Routing rules** and create new custom addresses that will show you the option of using either the top domain of the zone or any other configured subdomain.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/setup/subdomains/","name":"Subdomains"}}]}
```
