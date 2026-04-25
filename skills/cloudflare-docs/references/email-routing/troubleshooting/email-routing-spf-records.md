---
title: SPF records
description: Resolve duplicate SPF record conflicts that prevent Email Routing from forwarding emails correctly.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# SPF records

Having multiple [sender policy framework (SPF) records ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/) on your account is not allowed, and will prevent Email Routing from working properly. If your account has multiple SPF records, follow these steps to solve the issue:

1. In the Cloudflare dashboard, go to the **Email Routing** page. Email Routing will warn you that you have multiple SPF records.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Under **View DNS records**, select **Fix records**.
3. Delete the incorrect SPF record.

You should now have your SPF records correctly configured. If you are unsure of which SPF record to delete:

1. In the Cloudflare dashboard, go to the **Email Routing** page. Email Routing will warn you that you have multiple SPF records.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Under **View DNS records**, select **Fix records**.
3. Delete all SPF records.
4. Select **Add records and enable**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/troubleshooting/email-routing-spf-records/","name":"SPF records"}}]}
```
