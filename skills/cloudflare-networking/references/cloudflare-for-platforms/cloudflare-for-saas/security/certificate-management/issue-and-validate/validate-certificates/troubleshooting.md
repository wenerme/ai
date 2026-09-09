---
description: Resolve certificate validation issues including high-risk domains and CA errors.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## High-risk domains

Cloudflare's CA partners occasionally flag a domain as "high risk" — typically only for domains that Google's Safe Browsing service has flagged for phishing or malware.

If a domain is flagged by the CA, you need to contact Support before validation can finish. The API call will return indicating the failure, along with a link to where the ticket can be filed.

---

## Certificate Authority Authorization (CAA) records

CAA is a DNS resource record type defined in [RFC 6844 ↗](https://datatracker.ietf.org/doc/html/rfc6844) that allows a domain owner to indicate which CAs are allowed to issue certificates for them.

### For SaaS providers

If your customer has CAA records set on their domain, they will either need to add the following or remove CAA entirely:

```txt
example.com. IN CAA 0 issue "pki.goog"
example.com. IN CAA 0 issue "letsencrypt.org"
example.com. IN CAA 0 issue "ssl.com"
```

While it is possible for CAA records to be set on the subdomain your customer wishes to use with your service, it will usually be set on the domain apex. If they have CAA records on the subdomain, those will also have to be removed.

### For SaaS customers

In some cases, the validation may be prevented because your hostname points to a CNAME target where CAA records are defined.

In this case you would need to either select a Certificate Authority whose CAA records are present at the target, or review the configuration with the service provider that owns the target.

---

## Time outs

If a certificate issuance times out, the error message will indicate where the timeout occurred:

* Timed Out (Initializing)
* Timed Out (Validation)
* Timed Out (Issuance)
* Timed Out (Deployment)
* Timed Out (Deletion)

To fix this error, send a [PATCH request](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) through the API or select **Refresh** for the specific custom hostname in the dashboard. If using the API, make sure that the `--data` field contains an `ssl` object with the same `method` and `type` as the original request.

If these return an error, delete and recreate the custom hostname.

---

## Conflicting `_acme-challenge` TXT records

If certificate validation is stuck despite the correct CNAME or TXT records being in place, a conflicting `_acme-challenge` TXT record may be preventing the certificate authority from completing validation.

### How to diagnose

Check whether the delegation CNAME is in place at the `_acme-challenge` hostname:

```sh
dig _acme-challenge.example.com CNAME +short
```

* If this returns **nothing**, the delegation CNAME is missing. Run a `TXT` query to check whether a hardcoded record is also present:
```sh
dig _acme-challenge.example.com TXT +short
```
If this returns a raw token string, a hardcoded `_acme-challenge` TXT record is blocking certificate issuance — remove it before adding the delegation CNAME.
* If this returns a **CNAME target** but certificate validation is still stuck, the conflict is likely a hardcoded `_acme-challenge` TXT record inside your customer's direct Cloudflare zone. Because resolvers follow the CNAME chain rather than exposing records at the source name, the only way to confirm this is to inspect the customer's zone directly: go to **DNS** \> **Records** in the Cloudflare dashboard for their zone and look for any `_acme-challenge` TXT entries.

### Common causes and remediation

**Record from a prior Cloudflare certificate order** — Cloudflare adds `_acme-challenge` TXT records during certificate issuance. Records from a previous or abandoned order may persist and are not always visible in the Cloudflare dashboard. [Contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to have them removed.

**Record in a direct Cloudflare zone** — If your customer's domain is also present in a direct Cloudflare zone (for example, they proxy `example.com` through their own Cloudflare account), that zone may have an `_acme-challenge` TXT record from a Universal SSL or Advanced certificate order. When the certificate authority queries `_acme-challenge.example.com`, it resolves the record from the direct zone rather than following the delegated DCV CNAME.

To resolve this, ask your customer to remove the `_acme-challenge` TXT record from their zone's DNS settings in the Cloudflare dashboard, then [trigger an immediate validation check](#immediate-validation-checks).

---

## Immediate validation checks

You can send a [PATCH request](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) to request an immediate validation check on any certificate. The PATCH data should include the same `ssl` object as the original request.

---

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/#page","headline":"Troubleshooting · Cloudflare for Platforms docs","description":"Resolve certificate validation issues including high-risk domains and CA errors.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
