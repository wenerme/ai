---
title: Error 1000
description: Troubleshoot Cloudflare 1000 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1000

## Error 1000: DNS points to prohibited IP

This error indicates that a Cloudflare DNS record points to a prohibited IP, blocking access to the requested domain.

### Common causes

Cloudflare halted the request for one of the following reasons:

* An A record within your Cloudflare DNS app points to a [Cloudflare IP address ↗](https://www.cloudflare.com/ips/), or a Load Balancer Origin points to a proxied record.
* Your Cloudflare DNS A or CNAME record references another reverse proxy (such as an nginx web server that uses the proxy\_pass function) that then proxies the request to Cloudflare a second time.
* The request `X-Forwarded-For` header is longer than 100 characters.
* The request includes two `X-Forwarded-For` headers.
* The request includes a `CF-Connecting-IP` header.
* A Server Name Indication (SNI) issue or mismatch at the origin.

### Resolution

* If an A record within your Cloudflare DNS app points to a [Cloudflare IP address ↗](https://www.cloudflare.com/ips/), update the IP address to your origin web server IP address. Reach out to your hosting provider if you need help obtaining the origin IP address.
* There is a reverse-proxy at your origin that sends the request back through the Cloudflare proxy. Instead of using a reverse-proxy, contact your hosting provider or site administrator to configure an HTTP redirect at your origin.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1000/","name":"Error 1000"}}]}
```
