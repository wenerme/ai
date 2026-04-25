---
title: Error 1020
description: Troubleshoot Cloudflare 1020 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1020

## Error 1020: Access denied

This error indicates that access to the website is denied by a Cloudflare firewall rule.

### Common cause

A client or browser is blocked by a Cloudflare customer's Firewall Rules (deprecated).

### Resolution

If you are not the website owner, provide the website owner with a screenshot of the `1020` error message you received.

If you are the website owner:

* [  New dashboard ](#tab-panel-9200)
* [ Old dashboard ](#tab-panel-9201)

1. Retrieve a screenshot of the 1020 error from your customer.
2. Search the [Security Events log](https://developers.cloudflare.com/waf/analytics/security-events/) (available at **Security** \> **Analytics**, in the **Events** tab) for the [Ray ID](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) or client IP address from the visitor's 1020 error message.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)  
Note  
Convert the UTC timestamp of the `1020` error to your local timezone when searching in the Security Events log.
3. Assess the cause of the block and either update the Firewall Rule or allow the visitor's IP address in [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/).

1. Retrieve a screenshot of the 1020 error from your customer.
2. Search the [Security Events log](https://developers.cloudflare.com/waf/analytics/security-events/) (available at **Security** \> **Events**) for the [Ray ID](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) or client IP address from the visitor's 1020 error message.  
Note  
Convert the UTC timestamp of the `1020` error to your local timezone when searching in the Security Events log.
3. Assess the cause of the block and either update the Firewall Rule or allow the visitor's IP address in [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/","name":"Error 1020"}}]}
```
