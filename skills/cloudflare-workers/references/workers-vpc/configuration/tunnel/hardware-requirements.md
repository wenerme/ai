---
description: Recommended CPU, memory, and scaling guidelines for cloudflared tunnel hosts.
title: Hardware requirements
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt
> Use this file to discover all available pages before exploring further.

# Hardware requirements

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/hardware-requirements/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Recommendations

For production use cases, we recommend the following baseline configuration:

* Run a cloudflared replica on two dedicated host machines per network location. Using two hosts enables server-side redundancy. See [tunnel availability and replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) for setup instructions.
* Size each host with minimum 4GB of RAM and 4 CPU cores.

This setup is usually sufficient to handle traffic from small-medium sized applications. The actual amount of resources used by cloudflared will depend on many variables, including the number of requests per second, bandwidth, network path, and hardware. If usage increases beyond your existing tunnel capacity, you can scale your tunnel by increasing the hardware allocated to the cloudflared hosts.

## Capacity calculator

To estimate tunnel capacity requirements for your deployment, refer to the [tunnel capacity calculator in the Zero Trust documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/).

## Scaling considerations

Monitor tunnel performance and scale accordingly:

* **CPU utilization**: Keep below 70% average usage
* **Memory usage**: Maintain headroom for traffic spikes
* **Network bandwidth**: Ensure adequate throughput for peak loads
* **Connection count**: Scale cloudflared vertically when approaching capacity limits

## Next steps

* Configure [tunnel deployment](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/)
* Set up [high availability](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/) with multiple replicas

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-vpc/configuration/tunnel/hardware-requirements/#page","headline":"Hardware requirements · Cloudflare Workers VPC","description":"Recommended CPU, memory, and scaling guidelines for cloudflared tunnel hosts.","url":"https://developers.cloudflare.com/workers-vpc/configuration/tunnel/hardware-requirements/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
