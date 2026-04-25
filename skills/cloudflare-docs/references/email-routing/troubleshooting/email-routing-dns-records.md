---
title: DNS records
description: Fix missing or misconfigured DNS records that prevent Email Routing from working on your domain.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# DNS records

1. In the Cloudflare dashboard, go to the **Email Routing** page.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Go to **Settings**. Email Routing will show you the status of your DNS records, such as `Missing`.
3. Select **Enable Email Routing**.
4. The next page will show you what kind of action is needed. For example, if you are missing DNS records, select **Add records and enable**.

If there is a problem with your SPF records, refer to [Troubleshooting SPF records](https://developers.cloudflare.com/email-routing/troubleshooting/email-routing-spf-records/).

Note

If you are not using Email Routing but notice an Email Routing DNS record in your zone that you cannot delete, you can use the [Disable Email Routing API call](https://developers.cloudflare.com/api/resources/email%5Frouting/subresources/dns/methods/delete/). It will remove any unexpected records, such as DKIM TXT records like `cf2024-1._domainkey.<hostname>`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/troubleshooting/email-routing-dns-records/","name":"DNS records"}}]}
```
