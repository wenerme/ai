---
description: Best practices for deploying Cloudflare Gateway traffic policies in phases.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This section covers best practices for setting up the following Gateway policy types:

* [DNS filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/)
* [Network filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/network/)
* [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/)

For each type of policy, we recommend the following workflow:

1. Connect the devices and/or networks that you want to apply policies to.
2. Verify that Gateway is successfully proxying traffic from your devices.
3. Set up basic security and compatibility policies (recommended for most use cases).
4. Customize your configuration to the unique needs of your organization.

## Recommended deployment phases

Most organizations roll out Gateway in phases, starting with the lowest-effort, highest-impact policy type and adding deeper inspection over time.

### Phase 1: DNS filtering

DNS filtering requires the least deployment effort and provides immediate protection.

* Point your network DNS to Gateway's resolver addresses, or deploy the Cloudflare One Client in DNS-only mode.
* Block all [security threat categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) (malware, phishing, command and control).
* Block [content categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories) that violate your acceptable use policy.
* Review [DNS logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) to gain visibility into Internet usage across your organization.

For setup instructions, refer to [Set up DNS filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/).

### Phase 2: Network policies

After DNS filtering is in place, add network-level controls for non-HTTP traffic.

* Deploy the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and enable the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/) for TCP.
* Block traffic to high-risk IP ranges or restrict which ports and protocols users can access.
* Use [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) to identify applications by traffic pattern rather than port number.
* Enable network session logging for audit trails.

For setup instructions, refer to [Set up network filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/network/).

### Phase 3: HTTP inspection

HTTP inspection provides the deepest visibility and the most granular controls, but it requires additional setup.

* Install the [Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on user devices.
* Enable [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) to inspect HTTPS traffic.
* Create [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) policies for applications that use certificate pinning.
* Block risky file types, enable [anti-virus scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/), and configure [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) to detect sensitive data.
* Use [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) to render high-risk sites in a remote browser.

For setup instructions, refer to [Set up HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/).

### Phase 4: Egress control and full integration

With all policy layers active, extend Gateway to cover your full network and integrate with other Cloudflare One services.

* Connect branch offices and data centers with [network tunnels](https://developers.cloudflare.com/cloudflare-one/networks/) (IPsec/GRE via Magic WAN).
* Configure [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/) so third-party services can identify your organization's traffic.
* Set up [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to route internal DNS queries to your private DNS servers.
* Monitor SaaS application usage with [CASB](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/).

Note

You do not need to complete every phase. Choose the phases that match your organization's security requirements and deployment timeline.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/#page","headline":"Get started · Cloudflare One docs","description":"Best practices for deploying Cloudflare Gateway traffic policies in phases.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
