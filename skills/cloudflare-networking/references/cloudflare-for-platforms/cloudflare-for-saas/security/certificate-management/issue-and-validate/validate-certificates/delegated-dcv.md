---
description: Delegate domain control validation to Cloudflare for automated certificate issuance.
title: Delegated
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Delegated

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Delegated DCV allows SaaS providers to delegate the DCV process to Cloudflare.

DCV Delegation requires your customers to place a one-time record at their authoritative DNS that allows Cloudflare to auto-renew all future certificate orders, so that there is no manual intervention from you or your customers at the time of the renewal.

---

## Setup

To set up Delegated DCV:

1. Add a [custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/) for your zone, choosing `TXT` as the **Certificate validation method**.
2. On the [**Custom Hostnames** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames) page, go to **DCV Delegation for Custom Hostnames**.
3. Copy the hostname value.
4. For each hostname, the domain owner needs to place a `CNAME` record at their authoritative DNS. In this example, the SaaS zone is `example.com`.
```txt
_acme-challenge.example.com CNAME example.com.<COPIED_HOSTNAME>.
```

Once this is complete, Cloudflare will place two TXT DCV records - one for `example.com` and one for `*.example.com` \- at the `example.com.<COPIED_HOSTNAME>` hostname. The CNAME record will need to stay in place in order to allow Cloudflare to continue placing the records for the renewals.

If desired, you could also manually fetch the DCV tokens and share them with your customers.

Remove previous TXT records

Existing TXT records for `_acme-challenge` will conflict with the delegated DCV CNAME record. Make sure to check and remove records such as the following:

```txt
_acme-challenge.example.com TXT <CERTIFICATE_VALIDATION_VALUE>
```

## Moved domains

If you [move your SaaS zone to another account](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/), you will need to update the `CNAME` record with a new hostname value.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/#page","headline":"Delegated domain control validation (DCV) · Cloudflare for Platforms docs","description":"Delegate domain control validation to Cloudflare for automated certificate issuance.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
