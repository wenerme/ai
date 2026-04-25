---
title: DNS records
description: Check and manage the MX and SPF DNS records required for Email Routing to function correctly.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# DNS records

You can check the status of your DNS records in the **Settings** section of Email Routing. This section also allows you to troubleshoot any potential problems you might have with DNS records.

## Email DNS records

Check the status of your account's DNS records in the **Email DNS records** card:

* **Email DNS records configured** \- DNS records are properly configured.
* **Email DNS records misconfigured** \- There is a problem with your accounts DNS records. Select **Enable Email Routing** to [start troubleshooting problems](https://developers.cloudflare.com/email-routing/troubleshooting/).

### Start disabling

When you successfully configure Email Routing, your DNS records will be locked and the dashboard will show a **Start disabling** button in the Email DNS records card. This locked status is the recommended setting by Cloudflare. It means that the DNS records required for Email Routing to work are locked and can only be changed if you disable Email Routing on your domain.

If you need to delete Email Routing or migrate to another provider, select **Start disabling**. Refer to [Disable Email Routing](https://developers.cloudflare.com/email-routing/setup/disable-email-routing/) for more information.

### Lock DNS records

Depending on your zone configuration, you might have your DNS records unlocked. This will also be true if, for some reason, you have unlocked your DNS records. Select **Lock DNS records** to lock your DNS records and protect them from being accidentally changed or deleted.

## View DNS records

Select **View DNS records** for a list of the required `MX` and sender policy framework (SPF) records Email Routing is using.

If you are having trouble with your account's DNS records, refer to the [Troubleshooting](https://developers.cloudflare.com/email-routing/troubleshooting/) section.

## \_dc-mx DNS responses

If you see a DNS response with a `_dc-mx` prefix (for example, `_dc-mx.a1b2c3d4e5f6.example.com`), Cloudflare inserted it automatically. This response appears when your `MX` record points to a hostname that is [proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare. The `_dc-mx` target itself resolves directly to your origin IP address so that mail traffic bypasses the proxy and reaches your mail server.

For more information, refer to [\_dc-mx and dc-##### subdomains](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/unexpected-dns-records/#dc--and-%5Fdc-mx-subdomains).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/setup/email-routing-dns-records/","name":"DNS records"}}]}
```
