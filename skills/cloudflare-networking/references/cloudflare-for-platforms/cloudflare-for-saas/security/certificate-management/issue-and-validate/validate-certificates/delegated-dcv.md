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

Remove conflicting \`\_acme-challenge\` TXT records

Existing `_acme-challenge` TXT records will prevent delegated DCV from functioning. Before setting up delegated DCV, check for and remove any records in this form from your customer's authoritative DNS:

```txt
_acme-challenge.example.com TXT <CERTIFICATE_VALIDATION_VALUE>
```

This includes records that Cloudflare may have placed automatically during a previous certificate order or Universal SSL issuance. If your customer's domain is also present in a direct Cloudflare zone (for example, they proxy `example.com` through their own Cloudflare account), check that zone's DNS records for any `_acme-challenge` entries and remove them.

To check whether the delegation CNAME is in place, run:

```sh
dig _acme-challenge.example.com CNAME +short
```

If this returns nothing, the delegation CNAME is not present — add it before proceeding.

If the CNAME is in place but certificate validation is still stuck, a conflicting `_acme-challenge` TXT record may exist inside your customer's direct Cloudflare zone. Because resolvers follow the CNAME chain rather than exposing records at the source name, the only way to confirm this is to inspect the customer's zone directly: go to **DNS** \> **Records** in the Cloudflare dashboard for their zone and look for any `_acme-challenge` TXT entries. Refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/#conflicting-%5Facme-challenge-txt-records) for remediation steps.

## Moved domains

If you [move your SaaS zone to another account](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/), you will need to update the `CNAME` record with a new hostname value.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/#page","headline":"Delegated domain control validation (DCV) · Cloudflare for Platforms docs","description":"Delegate domain control validation to Cloudflare for automated certificate issuance.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
