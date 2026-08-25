---
description: Monitor Magic Transit tunnel and endpoint health.
title: Network health
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Network health

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/network-health/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Magic Transit uses health check probes to determine the status of tunnels. Cloudflare uses this information to steer traffic through the best available route and warn you about potential issues with a tunnel. Service-level indicators (SLIs) and service-level objectives (SLOs) combine to determine when Cloudflare sends you tunnel health alerts. Refer to [How Cloudflare calculates tunnel health alerts](https://developers.cloudflare.com/magic-transit/reference/how-cloudflare-calculates-tunnel-health-alerts/) for more information about SLIs and SLOs.

There are two types of health checks available: endpoint and tunnel health checks.

* Endpoint health checks evaluate connectivity from Cloudflare distributed data centers to your origin network. Endpoint probes flow over available tunnels to provide a broad picture of Internet health and do not inform tunnel selection or steering logic.
Cloudflare global network servers issue endpoint health checks outside of customer network namespaces and typically target endpoints beyond the tunnel-terminating border router.
During onboarding, you specify IP addresses to configure endpoint health checks.
* Tunnel health checks monitor the status of the tunnels that route traffic from Cloudflare to your origin network. Magic Transit relies on health checks to steer traffic to the best available routes.
During onboarding, you specify the tunnel endpoints or tunnel health check targets that the tunnel probes from Cloudflare's global network will monitor.
You can access tunnel health check results through the API. Cloudflare aggregates these results from individual health check results on Cloudflare servers.

Refer to [Tunnel health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/) for a deep dive into the different types of health checks, what they do, and how they work.

Note

Magic Transit customers with [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) enabled for the European Union can access GRE, IPsec, and CNI (Cloudflare Network Interconnect) health check and traffic volume data in the Cloudflare dashboard and through the API. This ensures that customers who need to be General Data Protection Regulation (GDPR) compliant can access all Magic Transit features.

Refer to the following pages for details on how to use the various network health checks available.

* [Run endpoint health checks (beta)](https://developers.cloudflare.com/magic-transit/network-health/run-endpoint-health-checks/)
* [Check tunnel health in the dashboard](https://developers.cloudflare.com/magic-transit/network-health/check-tunnel-health-dashboard/)
* [Update tunnel health checks frequency](https://developers.cloudflare.com/magic-transit/network-health/update-tunnel-health-checks-frequency/)
* [Configure tunnel health alerts](https://developers.cloudflare.com/magic-transit/network-health/configure-tunnel-health-alerts/)
* [How Cloudflare calculates tunnel health alerts](https://developers.cloudflare.com/magic-transit/reference/how-cloudflare-calculates-tunnel-health-alerts/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/magic-transit/network-health/#page","headline":"Network health · Cloudflare Magic Transit docs","description":"Monitor Magic Transit tunnel and endpoint health.","url":"https://developers.cloudflare.com/magic-transit/network-health/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
