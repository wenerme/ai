---
title: Proxying limitations
description: This page describes expected limitations when proxying DNS records. For further information about proxying, refer to How Cloudflare works.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/proxy-status/limitations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Proxying limitations

This page describes expected limitations when proxying DNS records. For further information about proxying, refer to [How Cloudflare works](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/).

## Proxy eligibility

Only A, AAAA, and CNAME DNS records that serve HTTP or HTTPS traffic can be proxied. Other record types cannot be proxied.

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

Because Microsoft Integrated Windows Authentication, NTLM, and Kerberos violate HTTP/1.1 specifications, they are not compatible with proxied DNS records.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/proxy-status/","name":"Proxy status"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/proxy-status/limitations/","name":"Proxying limitations"}}]}
```
