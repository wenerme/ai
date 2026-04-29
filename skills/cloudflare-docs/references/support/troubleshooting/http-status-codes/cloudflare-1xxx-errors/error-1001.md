---
title: Error 1001
description: Troubleshoot Cloudflare 1001 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 1001

## Error 1001: DNS resolution error

This error indicates a DNS resolution failure preventing access to the requested domain.

### Common causes

* A web request was sent to a Cloudflare IP address for a non-existent Cloudflare domain.
* An external domain that is not on using Cloudflare has a CNAME record to a domain active on Cloudflare
* The target of the DNS CNAME record does not resolve.
* A CNAME record in your Cloudflare DNS app requires resolution via a DNS provider that is currently offline.
* [Always Online](https://developers.cloudflare.com/cache/how-to/always-online/) is enabled for a [Custom Hostname (Cloudflare for SaaS)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) domain.

### Resolution

A non-Cloudflare domain cannot CNAME to a Cloudflare domain, unless the non-Cloudflare domain is added to a Cloudflare account.

Attempting to directly access DNS records used for [Cloudflare CNAME setups](https://developers.cloudflare.com/dns/zone-setups/partial-setup) also causes error 1001\. For example, `www.example.com.cdn.cloudflare.net`.

Disable [Always Online](https://developers.cloudflare.com/cache/how-to/always-online/#enable-always-online), if using [Custom Hostname (Cloudflare for SaaS)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) domain.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1001/","name":"Error 1001"}}]}
```
