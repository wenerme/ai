---
description: Enable mutual TLS to require client certificates for your host.
title: Enable mTLS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable mTLS

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can enable mutual Transport Layer Security (mTLS) for any hostname. For more information, refer to the [Client certificates overview](https://developers.cloudflare.com/ssl/client-certificates/).

Cloudflare-issued or BYOCA

The following process only refers to certificates issued from the Cloudflare-managed CA. For hostnames that should be validated using your own CA, refer to the [BYOCA documentation](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/).

To enable mTLS for a host from the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Client Certificates** page.
[Go to **Client Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. On the **Hosts** section of the **Client Certificates** card, select **Edit**.
3. Enter the name of a host in your current domain.
Note
The domain (`example.com`) is automatically appended for you. This means that, if you want to enable mTLS for `abc.example.com`, you only need to type `abc`.
4. Select **Save** to confirm.

## CAs in use

As explained in the [Client certificates overview](https://developers.cloudflare.com/ssl/client-certificates/#how-it-works), Cloudflare validates client certificates against CAs set at account level. This means that these certificates can be used for validation across multiple zones/domains (`example.com`), as long as the zones are under the same Cloudflare account and you have enabled mTLS for the host.

Bring your own CA

If you need to use your own CA (instead of the Cloudflare-managed CA), refer to [BYOCA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/). This option is available on Enterprise accounts.

## Next steps

After enabling mTLS for your host, you can:

* Enforce mTLS with a WAF custom rule. Select **Create mTLS Rule** on the dashboard to use a template, or refer to our [mTLS at Cloudflare learning path](https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/#3-validate-the-client-certificate-in-the-waf) for further guidance.
* Enforce mTLS with [API Shield](https://developers.cloudflare.com/api-shield/security/mtls/configure/). While API Shield is **not required** to use mTLS, many teams may use mTLS to protect their APIs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/#page","headline":"Enable mTLS · Cloudflare SSL/TLS docs","description":"Enable mutual TLS to require client certificates for your host.","url":"https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
```
