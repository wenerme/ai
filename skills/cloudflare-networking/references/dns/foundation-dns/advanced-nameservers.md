---
description: Advanced nameserver features for Foundation DNS.
title: Advanced nameservers
image: https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/og.png?v=5c3af3b15ea9358e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced nameservers

Last updated Oct 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Advanced nameservers included with [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/) offer improved resiliency and more consistent nameserver assignment.

Consider the sections below for details about advanced nameservers, and refer to [Set up advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/setup/) to learn how to enable this feature.

Note

To use your own nameserver names with Advanced anycast network groups, create an [Advanced Custom Nameserver set](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/#advanced-custom-nameserver-set). Zone, account, and tenant custom nameservers do not support Advanced anycast network groups. A zone can only use one nameserver configuration at a time.

Also, [some behaviors are different](https://developers.cloudflare.com/dns/foundation-dns/setup/#differences-from-standard-nameservers) when compared to standard nameservers.

## Anycast network groups

To increase resiliency, the advertisement of advanced nameserver IPs is organized into three anycast network groups.

Two groups consist of IPs advertised from geographically distributed data centers, and a third group consists of IPs advertised from all data centers in the Cloudflare network.

<details>

<summary>

United Kingdom example

</summary>

| IPs | Group | Data centers |
| --- | --- | --- |
| <code>108.162.198.1</code> | A | London and Edinburgh |
| <code>172.64.40.1</code> | B | Manchester |
| <code>162.159.60.1</code> | C | Manchester, London, and Edinburgh |

</details>

In DNS resolution, a resolver eventually acquires a list of all IPs where authoritative nameservers for a domain can be reached, and will then usually prefer the IP with the best resolution performance.

When, instead of advertising all IPs in all data centers, this group logic is applied, resiliency is improved because, if one of the data centers experiences a localized issue, the resolver can fall back to an IP advertised by the next closest data center. The third group adds another layer of redundancy, further enhancing resiliency.

Refer to [our blog post ↗︎](https://blog.cloudflare.com/foundation-dns-launch) for an in-depth explanation of the distributed groups logic.

Note

The IPs assigned to each nameserver are static, meaning they will not change without notification.

## Dedicated release process

Zones using advanced nameservers are less exposed to incidents or software regression.

The dedicated release process means that only changes that have been in production for a while will reach advanced nameservers.

## Nameservers hosting and assignment

While standard Cloudflare nameservers are hosted under `ns.cloudflare.com` or `secondary.cloudflare.com`, advanced nameservers use different domains:

- `foundationdns.com`
- `foundationdns.net`
- `foundationdns.org`

Using the different TLDs (`.com`, `.net`, and `.org`) and making these available only to enterprise accounts allows for better predictability and consistency in nameserver assignment.

There should also be less conflicts when guaranteeing that directly descending zones do not have the same nameserver set.

<details>

<summary>

Descending zones example

</summary>

Consider the domain <code>example.com</code>, and subdomains <code>abc.example.com</code> and <code>123.example.com</code>:

- <code>abc.example.com</code> and <code>123.example.com</code> directly descend from <code>example.com</code> and cannot have the same nameservers as <code>example.com</code>.
- <code>abc.example.com</code> and <code>123.example.com</code> are sibling domains and can have the same nameservers.
- <code>new.abc.example.com</code> directly descends from both <code>abc.example.com</code> and <code>example.com</code>, and cannot have the same nameservers as them, but can have the same nameservers as <code>123.example.com</code>.

</details>

### Consistent assignment across new zones

Advanced nameservers try to keep the same nameserver set (`blue`, `gold`, or `orange`) for new zones added to the same account, but a new zone can still be assigned a different set when:

- The same domain is (or was recently) active on another Cloudflare account.
- A directly descending zone in the same or another account already uses the same set.
- The zone was previously deleted from Cloudflare and re-added.

Cloudflare cannot change the Advanced nameservers [automatically assigned](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method) to a zone, such as `blue.foundationdns.com`. To use the same nameservers across zones, use [account custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/) or assign the same [nameserver set](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/) (beta) to each zone. To keep Advanced anycast network groups, use an [Advanced Custom Nameserver set](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/#advanced-custom-nameserver-set).

## Custom Nameserver compatibility

Advanced Custom Nameserver sets are available in beta to Enterprise customers. These sets use custom nameserver names (for example, `ns1.example.com`) and distribute addresses across Advanced anycast network groups. To create one, refer to [Advanced Custom Nameserver set](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/#advanced-custom-nameserver-set).

Legacy [tenant](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/), [account](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/), or [zone](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/)-level Custom Nameservers are not compatible with Advanced Nameservers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/#page","headline":"Advanced nameservers","description":"Advanced nameserver features for Foundation DNS.","url":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/og.png?v=5c3af3b15ea9358e","dateModified":"2026-10-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
