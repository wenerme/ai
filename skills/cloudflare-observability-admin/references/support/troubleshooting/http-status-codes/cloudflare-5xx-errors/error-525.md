---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Troubleshoot HTTP 525 error responses.
title: Error 525
image: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/og.png?v=e030976cf6fb6896
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 525

## Error 525: SSL handshake failed

This error indicates that the SSL handshake between Cloudflare and the origin web server failed.

### Common causes

Error `525` occurs when these two conditions are true:

- The [SSL handshake ↗︎](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) fails between Cloudflare and the origin web server.
- [*Full* or *Full (Strict)*](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes) **SSL** is set in the **Overview** tab of your Cloudflare **SSL/TLS** app.

Note

If your hosting provider frequently changes your origin web server's IP address, refer to Cloudflare's documentation on [dynamic DNS updates](https://developers.cloudflare.com/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses).

### Resolution

Contact your hosting provider to exclude the following common causes at your origin web server:

- No valid SSL certificate is installed.
- Port `443` (or another custom secure port) is not open.
- No SNI support.
- The [cipher suites](https://developers.cloudflare.com/ssl/origin-configuration/cipher-suites/) used by Cloudflare do not match the cipher suites supported by the origin web server.
- A [key exchange compliance requirement](https://developers.cloudflare.com/ssl/origin-configuration/automatic-key-exchange/#compliance-requirements) is enabled for your zone, but the destination server does not support the required key exchange algorithm. Refer to [Key exchange compliance requirements](#key-exchange-compliance-requirements).

Note

If `525` errors occur intermittently, review the origin web server error logs to determine the cause. Configure Apache to [log mod\_ssl errors ↗︎](https://cwiki.apache.org/confluence/display/HTTPD/DebuggingSSLProblems#Enable_SSL_logging). Also, nginx includes SSL errors in its standard error log, but may possibly require [an increased log level ↗︎](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).

- Verify that a certificate is installed on your origin server. For details on running tests, refer to [Troubleshoot requests with curl](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#troubleshoot-requests-with-curl). If no certificate is installed, you can generate and install a free [Cloudflare origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca) to encrypt traffic between Cloudflare and your origin web server.
- [Review the cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) used by your server to ensure they are compatible with Cloudflare.
- Check your server's error logs from the timestamps when `525` errors occur to identify any issues causing the connection to be reset during the SSL handshake.

### Diagnose with Origin Analytics

Use [Origin Analytics](https://developers.cloudflare.com/speed/origin-analytics/) to check whether SSL handshake failures are affecting specific endpoints. The **Origin status codes** chart shows when Cloudflare received no HTTP response from your origin (`originResponseStatus` of `0`), which can indicate TLS negotiation failures. Cross-reference these timestamps with your origin SSL error logs to pinpoint the cause.

### Key exchange compliance requirements

If your zone has a compliance requirement enabled (**SSL/TLS** > **Overview** > **Origin connection & post-quantum encryption**), Cloudflare restricts outbound TLS 1.3 connections to only the key agreements permitted by that requirement. Destination servers that do not support the required key exchange algorithm will fail the handshake and return a `525` error.

For example:

- **Post-quantum hybrid**: Cloudflare only advertises post-quantum hybrid key agreements ( `X25519MLKEM768`). Destinations that do not support post-quantum key exchange will return `525`.
- **FIPS**: Cloudflare only advertises FIPS-approved curves. Destinations that do not support FIPS-approved curves (for example, those that only support X25519) will return `525`.

This setting affects:

- Connections from Cloudflare to your origin server.
- Outbound `fetch()` calls from [Workers](https://developers.cloudflare.com/workers/) running under that zone, including requests to third-party APIs that may not yet support post-quantum key exchange.

To resolve this, go to **SSL/TLS** > **Overview** > **Origin connection & post-quantum encryption** and remove the compliance requirement. **Automatic key exchange** (the default, with no compliance requirements selected) negotiates the best mutually supported key agreement and maintains compatibility with a wide range of servers.

Note

Cloudflare does not recommend a specific compliance setting. The appropriate choice depends on your organization's compliance obligations. For details, refer to [Automatic key exchange](https://developers.cloudflare.com/ssl/origin-configuration/automatic-key-exchange/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/#page","headline":"Error 525","description":"Troubleshoot HTTP 525 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/","inLanguage":"en","image":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/og.png?v=e030976cf6fb6896","dateModified":"2026-11-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
