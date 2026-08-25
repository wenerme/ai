---
description: Renew custom hostname certificates before their 90-day expiration.
title: Renew
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Renew

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The exact method for certificate renewal depends on whether that hostname is active[1](#user-content-fn-1) and whether it is a wildcard certificate.

Custom hostname certificates have a 90-day validity period and are available for renewal 30 days before their expiration.

## Non-wildcard hostnames

If all of the following are true, Cloudflare will try to perform DCV automatically on the hostname's behalf by serving the [HTTP token](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/).

* You are using a non-wildcard hostname.
* The hostname is active.
* You are not using [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

If the custom hostname is not active, then the custom hostname domain owner will need to add the TXT or HTTP DCV token for the new certificate to validate and issue. As the SaaS provider, you will be responsible for sharing this token with the custom hostname domain owner.

If you are using Delegated DCV, Cloudflare will continue to add TXT DCV tokens on your behalf as explained in [Issue and validate certificates](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

## Wildcard hostnames

With wildcard hostnames, you cannot use HTTP. In this case, you will have to use TXT DCV tokens.

These tokens can be fetched through the API or the dashboard when the certificates are in a [pending validation](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#new-certificates) state during custom hostname creation or during certificate renewals.

If your hostname is using another validation method, you will need to [update](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) the `"method"` field in the SSL object to be `"txt"`.

After this step, follow the normal steps for [TXT validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).

Note

To allow Cloudflare to auto-renew all future certificate orders, consider [DCV delegation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

## Footnotes

1. Meaning Cloudflare could verify your customer's ownership of the hostname and the [hostname status](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/validation-status/) is active. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/#page","headline":"Renew certificates · Cloudflare for Platforms docs","description":"Renew custom hostname certificates before their 90-day expiration.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
