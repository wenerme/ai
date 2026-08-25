---
description: Restrict traffic to specific HTTP ports.
title: Require specific HTTP ports
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Require specific HTTP ports

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-http-ports/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

By default, Cloudflare allows requests on a [number of different HTTP ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/).

You can target requests based on their HTTP port with the [cf.edge.server\_port](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.edge.server%5Fport/) field. Use the `in` [comparison operator](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) to target a set of ports.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests to `www.example.com` that are not on ports `80` or `443`:

* **When incoming requests match**:
Use the expression editor:
`(http.host eq "www.example.com" and not cf.edge.server_port in {80 443})`
* **Then take action**: _Block_

Open server ports and blocked traffic

Due to the nature of Cloudflare's anycast network, ports other than `80` and `443` will be open so that Cloudflare can serve traffic for other customers on these ports. In general, Cloudflare makes available several different products on [Cloudflare IPs ↗](https://www.cloudflare.com/ips), so you can expect tools like Netcat and security scanners to report these non-standard ports as open in specific conditions. If you have questions on security compliance, review [Cloudflare's certifications and compliance resources ↗](https://www.cloudflare.com/en-gb/trust-hub/compliance-resources/) and contact your Cloudflare enterprise account manager for more information.

Custom rules and WAF Managed Rules can block traffic at the application layer (layer 7 in the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)), preventing HTTP/HTTPS requests over non-standard ports from reaching the origin server.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-http-ports/#page","headline":"Require specific HTTP ports · Cloudflare Web Application Firewall (WAF) docs","description":"Restrict traffic to specific HTTP ports.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-http-ports/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
