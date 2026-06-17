---
title: Audit logs
description: Track Email Service configuration changes such as rule edits and address additions in Cloudflare audit logs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit logs

Email Service writes configuration changes to [Cloudflare audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/). Use audit logs to track who changed what and when.

## Email Routing actions

The following Email Routing actions are recorded:

* Add, edit, or delete a routing rule.
* Add or delete a destination address.
* Change the status of a destination address (for example, from pending to verified).
* Update the catch-all rule.
* Enable, disable, or unlock the zone for Email Routing.

## Email Sending actions

The following Email Sending actions are recorded:

* Onboard or remove a sending domain or subdomain.
* Add, edit, or delete entries on the suppression list.
* Enable or disable Email Sending on a domain.

To review audit logs, refer to [Review audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/observability/audit-logs/#page","headline":"Email Service audit logs · Cloudflare Email Service docs","description":"Track Email Service configuration changes such as rule edits and address additions in Cloudflare audit logs.","url":"https://developers.cloudflare.com/email-service/observability/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/observability/","name":"Observability and logs"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/observability/audit-logs/","name":"Audit logs"}}]}
```
