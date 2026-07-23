---
description: Revoke a client certificate to block its use.
title: Revoke a client certificate
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Revoke a client certificate

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/client-certificates/revoke-client-certificate/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can revoke a client certificate you previously generated with the default [Cloudflare-managed CA](https://developers.cloudflare.com/ssl/client-certificates/).

It is not possible to permanently delete client certificates generated with the default Cloudflare-managed CA. Once revoked, these client certificates will still be listed on the [**Client Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates) page, and can be restored at any time.

## Steps

1. In the Cloudflare dashboard, go to the **Client Certificates** page.
[Go to **Client Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select the certificate you want to revoke.
3. Select **Revoke** and confirm the operation.

Important

After revoking a certificate, you must update any mTLS rules that check for the presence of a client certificate so that they block all requests that include a revoked certificate.

For more information, refer to [Check for revoked certificates](https://developers.cloudflare.com/api-shield/security/mtls/configure/#check-for-revoked-certificates).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/revoke-client-certificate/#page","headline":"Revoke a client certificate · Cloudflare SSL/TLS docs","description":"Revoke a client certificate to block its use.","url":"https://developers.cloudflare.com/ssl/client-certificates/revoke-client-certificate/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
