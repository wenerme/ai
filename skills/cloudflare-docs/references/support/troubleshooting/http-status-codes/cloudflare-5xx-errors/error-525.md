---
title: Error 525
description: This error indicates that the SSL handshake between Cloudflare and the origin web server failed.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Error 525

## Error 525: SSL handshake failed

This error indicates that the SSL handshake between Cloudflare and the origin web server failed.

### Common causes

Error `525` occurs when these two conditions are true:

* The [SSL handshake ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) fails between Cloudflare and the origin web server.
* [_Full_ or _Full (Strict)_](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes) **SSL** is set in the **Overview** tab of your Cloudflare **SSL/TLS** app.

Note

If your hosting provider frequently changes your origin web server's IP address, refer to Cloudflare's documentation on [dynamic DNS updates](https://developers.cloudflare.com/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses).

### Resolution

Contact your hosting provider to exclude the following common causes at your origin web server:

* No valid SSL certificate is installed.
* Port `443` (or another custom secure port) is not open.
* No SNI support.
* The [cipher suites](https://developers.cloudflare.com/ssl/origin-configuration/cipher-suites/) used by Cloudflare do not match the cipher suites supported by the origin web server.

Note

If `525` errors occur intermittently, review the origin web server error logs to determine the cause. Configure Apache to [log mod\_ssl errors ↗](https://cwiki.apache.org/confluence/display/HTTPD/DebuggingSSLProblems#Enable%5FSSL%5Flogging). Also, nginx includes SSL errors in its standard error log, but may possibly require [an increased log level ↗](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).

* Verify that a certificate is installed on your origin server. For details on running tests, refer to [Troubleshoot requests with curl](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#troubleshoot-requests-with-curl). If no certificate is installed, you can generate and install a free [Cloudflare origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca) to encrypt traffic between Cloudflare and your origin web server.
* [Review the cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) used by your server to ensure they are compatible with Cloudflare.
* Check your server's error logs from the timestamps when `525` errors occur to identify any issues causing the connection to be reset during the SSL handshake.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/","name":"Error 525"}}]}
```
