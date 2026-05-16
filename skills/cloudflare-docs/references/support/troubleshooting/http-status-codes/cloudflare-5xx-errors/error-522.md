---
title: Error 522
description: Troubleshoot HTTP 522 error responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error 522

## Error 522: connection timed out

Error `522` occurs when Cloudflare times out contacting the origin web server.

### Common causes

Two different timeouts cause HTTP error `522` depending on when they occur between Cloudflare and the origin web server:

* Before a connection is established, the origin web server does not return a SYN+ACK to Cloudflare within 19 seconds of Cloudflare sending a SYN (the SYN retry backoff scheme is 1,1,1,1,1,2,4,8).
* After a connection is established, the origin web server does not acknowledge (ACK) Cloudflare's resource request within 90 seconds.

### Resolution

* Contact your hosting provider and share the [error details](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/#required-error-details-for-hosting-provider) to assist in troubleshooting these common causes:  
   * [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips/) are rate limited or blocked in .htaccess, iptables, or firewalls. Confirm your hosting provider allows **all Cloudflare IP ranges** (most common cause). You can use a [Cloudflare WAF Custom Rule](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-by-geographical-location/) if you need to restrict traffic from geographical locations.  
   * An overloaded or offline origin web server drops incoming requests.  
   * [Keepalives ↗](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) are disabled at the origin web server.  
   * The origin IP address in your Cloudflare **DNS** app does not match the IP address currently provisioned to your origin web server by your hosting provider.  
   * Packets were dropped at your origin web server.
* If you are using [Cloudflare Pages](https://developers.cloudflare.com/pages/), verify that you have a custom domain set up and that your CNAME record is pointed to your [custom Pages domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#add-a-custom-domain).
* If you are using [Workers with a Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), performing a `fetch` to its own hostname will cause a `522` error. Consider using a [Route](https://developers.cloudflare.com/workers/configuration/routing/), targeting another hostname, or enabling the [global\_fetch\_strictly\_public compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#global-fetch-strictly-public) instead.
* If you are using [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/), make sure the resulting hostname can be resolved. For example, if your Origin Rule point to a Worker route, a `522` error will be returned if the hostname for this route is an A record pointing to a reserved address such as `100::` or `192.0.2.0`.
* If none of the above leads to a resolution, request the following information from your hosting provider or site administrator before [contacting Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/):  
   * An [MTR or traceroute](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#perform-a-traceroute) from your origin web server to a [Cloudflare IP address ↗](http://www.cloudflare.com/ips) that most commonly connected to your origin web server before the issue occurred. Identify a connecting Cloudflare IP recorded in the origin web server logs.  
   * Details from the hosting provider's investigation, such as pertinent logs or conversations with the hosting provider.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-522/","name":"Error 522"}}]}
```
