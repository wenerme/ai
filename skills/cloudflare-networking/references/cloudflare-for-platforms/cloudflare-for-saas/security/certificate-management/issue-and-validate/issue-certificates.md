---
description: Cloudflare automatically issues certificates when you create a custom hostname.
title: Issue
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Issue

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare automatically issues certificates when you [create a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/).

Note

There are several required steps before a custom hostname and its certificate can become active. For more details, refer to our [Get started guide](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).

## Certificate authorities

If you create the custom hostname via API, you can leave the `certificate_authority` parameter empty to set it to “default CA”. With this option, Cloudflare checks the CAA records before requesting the certificates, which helps ensure the certificates can be issued from the CA.

Refer to [this certificate authorities reference page](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) to learn more about the CAs that Cloudflare uses to issue SSL/TLS certificates.

## Certificate details and compatibility

For each custom hostname, Cloudflare issues two certificates bundled in chains that maximize browser compatibility (unless you [upload custom certificates](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/uploading-certificates/)).

The primary certificate uses a `P-256` key, is `SHA-2/ECDSA` signed, and will be presented to browsers that support elliptic curve cryptography (ECC). The secondary or fallback certificate uses an `RSA 2048-bit` key, is `SHA-2/RSA` signed, and will be presented to browsers that do not support ECC.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/#page","headline":"Issue certificates · Cloudflare for Platforms docs","description":"Cloudflare automatically issues certificates when you create a custom hostname.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
