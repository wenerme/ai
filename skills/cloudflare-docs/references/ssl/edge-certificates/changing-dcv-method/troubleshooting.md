---
title: Troubleshooting
description: Resolve domain control validation failures.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/changing-dcv-method/troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshooting

Taking into account the [steps involved in DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/dcv-flow/), some situations may interfere with certificate issuance and renewal.

[Blocked validation URLs](#blocked-validation-url) or [misconfigured DNS settings](#dns-settings-and-records) might interfere with the certificate authority's ability to finish the validation process. In these situations, you may need to update your configuration at Cloudflare or at your authoritative DNS provider. Additionally, there can also be [errors on the CA side](#ca-errors).

Note

If you are using the Cloudflare API, error messages are presented under the `validation_errors` parameter.

## Blocked validation URL

If you have issues while HTTP DCV is in place, review the following settings:

* **Anything affecting `/.well-known/*`**: Review [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/), and other [configuration rules](https://developers.cloudflare.com/rules/configuration-rules/) to make sure that your rules _do not_ enable interactive challenge on the validation URL.
* **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/), [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/), and [Page Rules](https://developers.cloudflare.com/rules/page-rules/) to ensure you have not enabled Under Attack mode on the validation URL.  
Warning  
When your certificate is in `pending_validation` and valid tokens are in place, some security features targeting your zone's path for `/.well-known/*` can be automatically bypassed.

## Redirection

Enabling [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) does not impact the validation process.

In a [Partial (CNAME) setup](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/#partial-dns-setup---action-sometimes-required) where you are managing the token on the origin side, please ensure that no redirection from HTTP to HTTPS occurs on the `/.well-known/*` path.

When using [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) the `/.well-known/*` path should be excluded from redirections.

## DNS settings and records

The errors below refer to situations that have to be addressed at the authoritative DNS provider:

* `the Certificate Authority had trouble performing a DNS lookup: dns problem: looking up caa for <hostname>: dnssec: bogus`
* `Certificate authority encountered a SERVFAIL during DNS lookup, please check your DNS reachability.`

Consider the following when troubleshooting:

* [DNSSEC ↗](https://www.cloudflare.com/learning/dns/dns-security/) must be configured correctly. You can use [DNSViz ↗](https://dnsviz.net/) to understand and troubleshoot the deployment of DNSSEC.
* The HTTP verification process is done preferably over **IPv6**, so if any AAAA record exists and does not point to the same dual-stack location as the A record, the validation will fail.
* If an [NS record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ns) is present for the hostname or its parent, DNS resolution will be managed externally by the DNS provider defined in the NS target. In this case, you must either add the DCV TXT record at the external DNS provider, or remove the NS record at Cloudflare.

### CAA records

* Your [CAA records](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) must be resolvable from all locations.
* Your [CAA records](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) should allow Cloudflare's partner [certificate authorities (CAs)](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) to issue certificates on your behalf.
* If you are using a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) (`subdomain.example.com`) and Cloudflare is not the authoritative DNS provider for the parent domain (`example.com`), you should make sure that the parent domain (`example.com`) either has CAA records that allow [Cloudflare's partner CAs](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), or has no CAA records at all.

You can check the CAA records by running the following command:

* [ macOS and Linux ](#tab-panel-8765)
* [ Windows ](#tab-panel-8766)

Terminal window

```

dig example.com CAA +short


```

PowerShell

```

Resolve-DnsName -Name example.com -Type CAA


```

## CA errors

### Rate limiting

As mentioned in [Certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), specific CAs may have their own limitations. If you use Let’s Encrypt and receive the error below, it means you hit the [duplicate certificate limit ↗](https://letsencrypt.org/docs/duplicate-certificate-limit/) imposed by Let's Encrypt.

`The authority has rate limited these domains. Please wait for the rate limit to expire or try another authority.`

A certificate is considered a duplicate of an earlier certificate if it contains the exact same set of hostnames.

In this case, you can either wait for the rate limit window to end or choose a different certificate authority.

### Multiple perspective CAA check error

The error `Certificate authority encountered a multiple perspective CAA check error, please ensure your DNS is configured to allow CAA queries` means that the CA was not able to resolve the CAA records related to your domain from specific geographic locations.

You can investigate for resolution error using the [ping.pe tool ↗](https://dig.ping.pe/). For example, for a [Google Trust Services](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#google-trust-services) certificate encountering this issue, you can check for: `<hostname>:CAA:8.8.8.8`.

Read more from Certificate Authorities specific documentation: [SSL.com ↗](https://www.ssl.com/blogs/multi-perspective-issuance-corroboration-mpic-arrives/), [Let's Encrypt ↗](https://letsencrypt.org/2020/02/19/multi-perspective-validation), and [Google Trust Services ↗](https://pki.goog/faq/#faq-mpic).

### Internal errors

When the certificate authority finds an issue during the CA check portion of the [DCV flow](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/dcv-flow/), you may see a `Internal error with Certificate Authority` message. In this case, either wait or try a different certificate authority.

When the error states that the `certificate authority will not issue for this domain`, you can try a different certificate authority or contact the CA directly.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/","name":"Domain control validation (DCV)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/troubleshooting/","name":"Troubleshooting"}}]}
```
