---
title: Error 521
description: Troubleshoot HTTP 521 error responses.
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

# Error 521

## Error 521: web server is down

Error `521` occurs when the origin web server refuses connections from Cloudflare. Security solutions at your origin may block legitimate connections from certain [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

### Common causes

The two most common causes of `521` errors are:

* Offlined origin web server application.
* Blocked Cloudflare requests.

### Resolution

Contact your hosting provider or site administrator and share the necessary [error details](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/#required-error-details-for-hosting-provider) to assist in troubleshooting these common causes:

* Ensure your origin web server is responsive.
* Review origin web server error logs to identify web server application crashes or outages.
* Confirm [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips) are not blocked or rate limited.
* Allow all [Cloudflare IP ranges ↗](https://www.cloudflare.com/ips) in your origin web server's firewall or other security software.
* Confirm that — if you have your **SSL/TLS mode** set to **Full** or **Full (Strict**) — your origin supports HTTPS and/or you have installed a [Cloudflare Origin Certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca) or a certificate matching the [requirements for these modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/#custom-ssltls).
* Ensure that your origin web server application is actively bound and listening on the port required by your SSL/TLS mode: Port 80 for **Flexible**, or Port 443 for **Full** and **Full (Strict)**.
* Find additional troubleshooting information on the [Cloudflare Community ↗](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-521/","name":"Error 521"}}]}
```
