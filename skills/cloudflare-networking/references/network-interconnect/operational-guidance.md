---
description: Validate CNI failover and troubleshoot connectivity issues.
title: Operational guidance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-interconnect/llms.txt
> Use this file to discover all available pages before exploring further.

# Operational guidance

Last updated Sep 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network-interconnect/operational-guidance/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

For maintenance expectations and notifications, refer to [Maintenance](https://developers.cloudflare.com/network-interconnect/maintenance/).

## Customer responsibility

Your CNI deployment must tolerate an unplanned outage on any single circuit at any time. This means:

* Traffic failover between redundant circuits must be automatic.
* If your operations require manual intervention to reroute traffic during maintenance, your configuration needs review.
* Contact your account team to validate your failover design.

## Troubleshooting

When facing connectivity problems, your first action should be to check for broader service disruptions. Visit [Cloudflare Status ↗](https://www.cloudflarestatus.com/) to see if any scheduled maintenance or active incidents are impacting services. This helps determine if the issue originates outside your network. Refer to [Monitoring and alerts](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/).

If no system-wide problems are reported, gather the following information before submitting a support case. Providing comprehensive details facilitates a faster resolution:

* **Timeline**: When the issue began and ended (if applicable), including the timezone.
* **Identification**: The CNI IP address or point-to-point prefix for the impacted CNI. If your CNI is part of a Magic setup, please also provide the name of the Magic Transit/WAN interconnect as listed in your dashboard.
* **Physical Layer**: Light levels of the CNI link (if applicable).
* **Service Impact**: Confirmation whether Magic Transit / WAN traffic was affected.
* **Problem Description**: A clear summary of the issue (for example, CNI down, Border Gateway Protocol (BGP) session down, prefixes withdrawn).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network-interconnect/operational-guidance/#page","headline":"Operational guidance · Cloudflare Network Interconnect docs","description":"Validate CNI failover and troubleshoot connectivity issues.","url":"https://developers.cloudflare.com/network-interconnect/operational-guidance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
