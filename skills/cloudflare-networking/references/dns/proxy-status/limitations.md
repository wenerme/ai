---
description: Limitations when proxying DNS records through Cloudflare.
title: Proxying limitations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Proxying limitations

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/proxy-status/limitations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This page describes expected limitations when proxying DNS records. For further information about proxying, refer to [How Cloudflare DNS works](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/).

For guidance on when to proxy records and when to use DNS only, refer to [Use cases](https://developers.cloudflare.com/dns/proxy-status/use-cases/).

## Proxy eligibility

Only A, AAAA, and CNAME records that serve HTTP or HTTPS traffic can be proxied. Other DNS record types cannot be proxied.

If you encounter a [CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#cname) that you cannot proxy — usually associated with another CDN provider — a proxied version of that record will cause connectivity errors. Cloudflare is purposely preventing that record from being proxied to protect you from a misconfiguration.

Non-proxiable targets

* Exact match:
  * `dkim2.mcsv.net` ([Mailchimp documentation ↗](https://mailchimp.com/help/set-up-email-domain-authentication/))
  * `dkim3.mcsv.net` ([Mailchimp documentation ↗](https://mailchimp.com/help/set-up-email-domain-authentication/))
  * `zmverify.zoho.com` ([Zoho documentation ↗](https://www.zoho.com/mail/help/adminconsole/domain-verification.html))
  * `dkim.infusionmail.com` ([Keap documentation ↗](https://help.keap.com/help/dmarc))
* Exact match or subdomain of:
  * `dkim.amazonses.com` ([Amazon SES documentation ↗](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html#just-verify-domain-proc))
* Subdomain of:
  * `onmicrosoft.com` ([Microsoft documentation ↗](https://learn.microsoft.com/defender-office-365/email-authentication-dkim-configure))
  * `dkim.intercom.io` ([Intercom documentation ↗](https://www.intercom.com/help/articles/9744849-connect-your-email-support-channel))
  * `acm-validations.aws` ([AWS certificate manager documentation ↗](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html))

### Pre-signed DNSSEC

If you use Cloudflare as your [secondary DNS provider](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) and leverage [Secondary DNS Overrides](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) to set records to proxied, note that opting for [Pre-signed DNSSEC](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/) will cause Cloudflare to treat your records as DNS-only.

## Ports and protocols

To proxy HTTP/HTTPS traffic on [non-standard ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/) or to proxy a TCP or UDP based application, use [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/).

## Pending domains

When you [add a domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare, Cloudflare protection will be in a [pending state](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) until we can verify ownership. This could take up to 24 hours to complete.

This means that DNS records — even those set to [proxy traffic through Cloudflare](#proxy-eligibility) — will be [DNS-only](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) until your zone has been activated and any requests to your DNS records will return your origin server's IP address.

If this warning is still present after 24 hours, refer to [Troubleshooting](https://developers.cloudflare.com/dns/troubleshooting/).

For enhanced security, we recommend rolling your origin IP addresses at your hosting provider after your zone has been activated. This action prevents your origin IPs from being leaked during onboarding.

## Windows authentication

Because Microsoft Integrated Windows Authentication, NTLM, and Kerberos violate HTTP/1.1 specifications, they are not compatible with proxied DNS records. NTLM authenticates at the TCP connection level (Layer 4), and Cloudflare does not guarantee that consecutive requests from the same client reuse the same TCP connection to the origin. This can cause repeated authentication prompts or authentication loops.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/proxy-status/limitations/#page","headline":"Proxying limitations · Cloudflare DNS docs","description":"Limitations when proxying DNS records through Cloudflare.","url":"https://developers.cloudflare.com/dns/proxy-status/limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Proxying"]}
```
