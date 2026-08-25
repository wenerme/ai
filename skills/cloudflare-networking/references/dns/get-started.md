---
description: Set up Cloudflare DNS for your domain.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use Cloudflare DNS with a variety of [setups](https://developers.cloudflare.com/dns/zone-setups/). For an overview of what these setups are and an introduction to specific DNS terminology, refer to [Concepts](https://developers.cloudflare.com/dns/concepts/).

In the most common setup (full), you [add your domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/), import your [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/), and [update your nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) to make Cloudflare your primary authoritative DNS provider.

Note

Make sure to [review your DNS records](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#2-review-your-dns-records) before updating your nameservers. If you activate your domain on Cloudflare _without_ setting up the correct DNS records, your domain may not be reachable.

Once the setup is completed:

* You [manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) through the Cloudflare dashboard or API. This is how you control which resources are available on the apex domain (`example.com`) or specific subdomains (`blog.example.com`) of your website, as well as control other configurations.
* Cloudflare [responds to all DNS queries](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) for your hostnames and your DNS records are propagated across the [Cloudflare global network ↗](https://www.cloudflare.com/network/), speeding up your domain.

## Resources

The following links introduce important concepts and will guide you through actions you may need to take while having your website or application on Cloudflare.

* [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/): DNS records contain information about your domain and are used to make your website or application available to visitors and other web services.
* [Nameservers](https://developers.cloudflare.com/dns/nameservers/): In the context of Cloudflare DNS, nameservers refer to authoritative nameservers. When a nameserver is authoritative for `example.com`, it means that DNS resolvers will consider responses from this nameserver when a user tries to access `example.com`.
* [Proxy status](https://developers.cloudflare.com/dns/proxy-status/): Proxy status affects how Cloudflare treats incoming HTTP/S requests to A, AAAA, and CNAME records. When a record is proxied, Cloudflare responds with [anycast IPs](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/), which speeds up and protects HTTP/S traffic with our [cache](https://developers.cloudflare.com/cache/)/[CDN ↗](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/), [DDoS protection](https://developers.cloudflare.com/ddos-protection/), [WAF](https://developers.cloudflare.com/waf/), and [more](https://developers.cloudflare.com/directory/?product-group=Application+performance%2CApplication+security).

## Further reading

* [How Cloudflare works](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/): An overview of how Cloudflare works as a DNS provider and as a reverse proxy.
* [DNS analytics](https://developers.cloudflare.com/dns/additional-options/analytics/): An overview of the different data sources and insights you can get when using Cloudflare DNS.
* [Troubleshooting](https://developers.cloudflare.com/dns/troubleshooting/): A full resources list for when something is not working.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/dns/get-started/#page","headline":"Get started with Cloudflare DNS · Cloudflare DNS docs","description":"Set up Cloudflare DNS for your domain.","url":"https://developers.cloudflare.com/dns/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
