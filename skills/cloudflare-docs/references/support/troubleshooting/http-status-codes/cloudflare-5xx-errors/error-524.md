---
title: Error 524
description: Troubleshoot HTTP 524 error responses.
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

# Error 524

## Error 524: a timeout occurred

Error `524` indicates that Cloudflare successfully connected to the origin web server, but the origin did not provide an HTTP response before the default 120 seconds [Proxy Read Timeout](https://developers.cloudflare.com/fundamentals/reference/connection-limits/).

### Common causes

This can happen if the origin server is taking too long because it has too much work to do, for example, a large data query, or because the server is struggling for resources and cannot return any data in time. The error `524` occurs if the origin web server acknowledges (ACK) the resource request after the connection has been established, but does not send a timely response (within the [Proxy Read Timeout](https://developers.cloudflare.com/fundamentals/reference/connection-limits/) delay, 120 seconds by default).

Error `524` can also indicate that Cloudflare successfully connected to the origin web server to write data, but the write did not complete before the 30 seconds [Proxy Write Timeout](https://developers.cloudflare.com/fundamentals/reference/connection-limits/) (or 6.5 seconds in the case of [Cloudflare Images](https://developers.cloudflare.com/images/)). This timeout cannot be adjusted.

### Resolution at your origin

Here are the options we suggest to work around this issue:

* [Contact your hosting provider](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/#required-error-details-for-hosting-provider) to exclude the following common causes at your origin web server:  
   * A long-running process on the origin web server.  
   * An overloaded origin web server.
* Implement status polling of large HTTP processes to avoid hitting this error.

Note

Logging request response time at your origin web server may help identify the cause of resource slowness. Contact your hosting provider or site administrator for assistance in adjusting log formats or search for related logging documentation for your brand of web server such as [Apache ↗](http://httpd.apache.org/docs/current/mod/mod%5Flog%5Fconfig.html) or [Nginx ↗](http://nginx.org/en/docs/http/ngx%5Fhttp%5Flog%5Fmodule.html#log%5Fformat).

### Resolution on Cloudflare

Here are some other actions you can take on the Cloudflare side:

* If you regularly run HTTP requests that take over 120 seconds to complete (for example, large data exports), move those processes behind a [subdomain not proxied (DNS-only, grey clouded)](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) in the Cloudflare **DNS** app.
* Enterprise customers can increase the `524` timeout up to 6,000 seconds:  
   * If your content can be cached, you can create a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#proxy-read-timeout-enterprise-only) with the `Proxy Read Timeout` setting. The content needs to be cacheable for the rule to be triggered, but does not need to be cached.  
   * You can increase the `proxy_read_timeout` setting for the whole zone using the [Edit zone setting API endpoint](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/).

Note

Note that you may observe a 1 second difference between the timeout you have set and the actual time at which the Error `524` is returned. This is expected, it is due to the current work on implementing our proxy - [Pingora ↗](https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/). As a workaround, you can simply set the timeout to one second more (121 seconds instead of 120 seconds, for example).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/","name":"Error 524"}}]}
```
