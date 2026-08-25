---
description: Understand the Domain Name System fundamentals.
title: What is DNS?
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# What is DNS?

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/cybersafe/concepts/what-is-dns/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Domain Name System (DNS) is the phonebook of the Internet. DNS translates the domain name that you type in the browser (such as `www.example.com`) to a computer-friendly IP address (`93.184.216.34`), similar to how a phonebook translates a person's name to a phone number. The IP address identifies the server where the website data is stored, allowing the browser to contact the server and load the page.

## Life of a DNS query

The process of translating a domain to an IP address is known as a DNS lookup. DNS lookups are performed by dedicated servers called DNS resolvers. Your Wi-Fi router is typically preconfigured to send DNS queries to the resolver owned by your ISP. However, you can choose to configure your router, operating system, or browser to use a different resolver. Some examples of free, public DNS resolvers include Cloudflare 1.1.1.1, Google 8.8.8.8, and OpenDNS.

As shown in the diagram below, the DNS resolver contacts a series of nameservers (where DNS records are stored) to track down the requested IP address. The resolver analyzes the domain in reverse, starting from the top-level domain (`.com`) and ending with the subdomain (`www`). The final nameserver in the DNS lookup, called the authoritative nameserver, contains the desired IP address. The concept is similar to how the post office delivers a package — first routing it to the correct country, then to the correct state, city, street and so forth until it arrives at your home address.

flowchart LR
accTitle: DNS lookup process
A[Browser] -- What is the IP address of www.example.com? --> B((DNS resolver)) -- Where is .com? --> C[("Root nameserver")]
C --IP of .com nameserver--> B
B -- Where is example.com?--> D[(.com nameserver)]
D -- IP of example.com nameserver --> B
B -- Where is www.example.com? --> E[(example.com nameserver)]
E -- 93.184.216.34 --> B
B -- 93.184.216.34 --> A

## Related resources

For more background information on DNS, refer to our [Learning Center ↗](https://www.cloudflare.com/learning/dns/what-is-dns/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/concepts/what-is-dns/#page","headline":"What is DNS? · Cloudflare Learning Paths","description":"Understand the Domain Name System fundamentals.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/concepts/what-is-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
