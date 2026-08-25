---
description: How IPv4 egress traffic is forwarded between Cloudflare data centers.
title: Connection forwarding
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Connection forwarding

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/connection-forwarding/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Since IPv6 address ranges are deployed globally, no forwarding is needed.

For IPv4 traffic, based on [IPs allocation](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/egress-ips/#ips-allocation), not all egress data centers will have access to an applicable dedicated CDN egress IP.

Dedicated CDN egress IPs do not forward to another location in response to traffic spikes. Instead, each IPv4 can be split across up to four locations, where some of these locations may have multiple data centers. IP capacity in each data center can also be adjusted in accordance with the amount of traffic that reaches each location.

After a request reaches Cloudflare on an ingress data center, and the cache service sends a request for the egress router to connect to your origin, the following scenarios are possible.

### Traffic can egress from the same server

If the server running the egress router has access to an applicable dedicated CDN egress IP, traffic egresses from that server.

flowchart LR
        accTitle: Dedicated CDN Egress IPs and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Dedicated CDN Egress IPs - Same data center.
        A[Client]
        subgraph Data center A
        X[(Cache service)] --> B[(Egress router <br/> <small>*has applicable IP</small>)]
        end
        C[(Origin server)]

        A --ingress--> X
        B --egress--> C

### Connection forwarding is needed

If the server does not have access to an applicable IP, the following options are checked and the first that is possible will take place:

* Another server in the same data center has access to an applicable IP and the connection is forwarded to that server.

flowchart LR
        accTitle: Dedicated CDN Egress IPs and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Dedicated CDN Egress IPs - Same data center.
        A[Client]
        subgraph Data center A
        X[(Cache service)] --> B[(Egress router <br/> <small>*no applicable IP</small>)]
        B --> Y[(Egress server <br/> <small>*has applicable IP</small>)]
        end
        C[(Origin server)]

        A --ingress--> X
        Y --egress--> C

* Another data center in the same location has access to an applicable IP and the connection is forwarded to that data center.

flowchart LR
        accTitle: Dedicated CDN Egress IPs and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Dedicated CDN Egress IPs - Different data center.
        A[Client]
        subgraph Location 1
        subgraph Data center A
        X[(Cache service)] --> B[(Egress router <br/> <small>*no applicable IP</small>)]
        end
        subgraph Data center B
        B --> Y[(Egress server <br/> <small>*has applicable IP</small>)]
        end
        end
        C[(Origin server)]


        A --ingress--> X
        Y --egress--> C

* Another data center in a different location has access to an applicable IP. The closest location is selected and connection is forwarded to that location.

flowchart LR
        accTitle: Dedicated CDN Egress IPs and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Dedicated CDN Egress IPs - Different location.
        A[Client]
        subgraph Location 1
          subgraph Data center A
          X[(Cache service)] --> B[(Egress router <br/> <small>*no applicable IP</small>)]
          end
        end
        subgraph Location 2
          subgraph Data center C
            B --> Y[(Egress server <br/> <small>*has applicable IP</small>)]
          end
        end
        C[(Origin server)]


        A --ingress--> X
        Y --egress--> C

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/connection-forwarding/#page","headline":"Connection forwarding · Cloudflare Smart Shield docs","description":"How IPv4 egress traffic is forwarded between Cloudflare data centers.","url":"https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/how-it-works/connection-forwarding/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
