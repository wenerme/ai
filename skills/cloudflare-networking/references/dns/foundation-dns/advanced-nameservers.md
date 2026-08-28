---
description: Advanced nameserver features for Foundation DNS.
title: Advanced nameservers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced nameservers

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Advanced nameservers included with [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/) offer improved resiliency and more consistent nameserver assignment.

Consider the sections below for details about advanced nameservers, and refer to [Set up advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/setup/) to learn how to enable this feature.

Note

The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

Also, [some behaviors are different](https://developers.cloudflare.com/dns/foundation-dns/setup/#differences-from-standard-nameservers) when compared to standard nameservers.

## Anycast network groups

To increase resiliency, the advertisement of advanced nameserver IPs is organized into three anycast network groups.

Two groups consist of IPs advertised from geographically distributed data centers, and a third group consists of IPs advertised from all data centers in the Cloudflare network.

United Kingdom example

| IPs           | Group | Data centers                      |
| ------------- | ----- | --------------------------------- |
| 108.162.198.1 | A     | London and Edinburgh              |
| 172.64.40.1   | B     | Manchester                        |
| 162.159.60.1  | C     | Manchester, London, and Edinburgh |

In DNS resolution, a resolver eventually acquires a list of all IPs where authoritative nameservers for a domain can be reached, and will then usually prefer the IP with the best resolution performance.

When, instead of advertising all IPs in all data centers, this group logic is applied, resiliency is improved because, if one of the data centers experiences a localized issue, the resolver can fall back to an IP advertised by the next closest data center. The third group adds another layer of redundancy, further enhancing resiliency.

Refer to [our blog post ↗](https://blog.cloudflare.com/foundation-dns-launch) for an in-depth explanation of the distributed groups logic.

Note

The IPs assigned to each nameserver are static, meaning they will not change without notification.

## Dedicated release process

Zones using advanced nameservers are less exposed to incidents or software regression.

The dedicated release process means that only changes that have been in production for a while will reach advanced nameservers.

## Nameservers hosting and assignment

While standard Cloudflare nameservers are hosted under `ns.cloudflare.com` or `secondary.cloudflare.com`, advanced nameservers use different domains:

* `foundationdns.com`
* `foundationdns.net`
* `foundationdns.org`

Using the different TLDs (`.com`, `.net`, and `.org`) and making these available only to enterprise accounts allows for better predictability and consistency in nameserver assignment.

There should also be less conflicts when guaranteeing that directly descending zones do not have the same nameserver set.

Descending zones example

Consider the domain `example.com`, and subdomains `abc.example.com` and `123.example.com`:

* `abc.example.com` and `123.example.com` directly descend from `example.com` and cannot have the same nameservers as `example.com`.
* `abc.example.com` and `123.example.com` are sibling domains and can have the same nameservers.
* `new.abc.example.com` directly descends from both `abc.example.com` and `example.com`, and cannot have the same nameservers as them, but can have the same nameservers as `123.example.com`.

### Consistent assignment across new zones

Advanced nameservers try to keep the same nameserver set (`blue`, `gold`, or `orange`) for new zones added to the same account, but a new zone can still be assigned a different set when:

* The same domain is (or was recently) active on another Cloudflare account.
* A directly descending zone in the same or another account already uses the same set.
* The zone was previously deleted from Cloudflare and re-added.

[Assigned nameservers cannot be changed](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method) after a zone is created. If your zones must share the same nameservers, [account custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/) provide a single set that every zone in the account can use, and can be configured as the account's [DNS zone default](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/) so new zones automatically receive them.

## Custom Nameserver compatibility

Advanced Nameserver features — such as multiple anycast network groups or dedicated release process — are currently available for Cloudflare-branded nameservers. Support of these features for [Custom Nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/) is on the roadmap. Contact your account team for the latest availability.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/#page","headline":"Advanced nameservers · Cloudflare DNS docs","description":"Advanced nameserver features for Foundation DNS.","url":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
