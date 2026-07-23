---
description: Regionalize Spectrum HTTP/S applications, with support for Static IPs and BYOIP.
title: Regionalized Spectrum Applications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Regionalized Spectrum Applications

Last updated Jul 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/regional-services/spectrum-applications/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Regionalized Spectrum Applications are configured with the help of your account team. Contact your account team to enable Regional Services and Spectrum for your account.

Regionalized Spectrum Applications regionalize HTTP/S traffic using [Spectrum](https://developers.cloudflare.com/spectrum/), Cloudflare's Layer 4 proxy. Unlike [Regional Hostnames](https://developers.cloudflare.com/data-localization/regional-services/regional-hostnames/) — which steer proxied hostnames using Cloudflare's shared anycast IP addresses — a Regionalized Spectrum Application assigns a dedicated IP to your hostname, and that IP signals that all traffic to it must be processed in a specific region.

Choose this option when you need to regionalize traffic that is addressed by IP, or when you need to combine Regional Services with [Spectrum Static IPs](https://developers.cloudflare.com/spectrum/about/static-ip/) or [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/).

## How it works

You create a Spectrum HTTP/S application for each hostname you want to regionalize. Cloudflare assigns a single processing region to the zone, and that region applies to **all** Spectrum HTTP/S applications in that zone — you configure one region per zone, not one per application. From then on, traffic to each application's IP terminates TLS and is processed only within the configured region, following the same in-region processing model described in [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/).

## Prerequisites

* [Spectrum](https://developers.cloudflare.com/spectrum/) is included in your Enterprise contract. Spectrum is an add-on, so it must be part of your contract before it can be enabled.
* Your account has the **Regional Services** and **Spectrum** entitlements enabled. Contact your account team to enable them.
* You have a hostname proxied through Cloudflare that you want to regionalize.
* If you want to use your own addresses, you have onboarded [Spectrum Static IPs](https://developers.cloudflare.com/spectrum/about/static-ip/) or a [BYOIP](https://developers.cloudflare.com/byoip/) prefix.

## Set up a Regionalized Spectrum Application

1. **Enable the required products.** Work with your account team to enable Regional Services and Spectrum on your account.
2. **Create a Spectrum application for each hostname.** Create an [HTTP/HTTPS Spectrum application](https://developers.cloudflare.com/spectrum/get-started/) for each hostname you want to regionalize. Set the [application type](https://developers.cloudflare.com/spectrum/reference/configuration-options/#application-type) to _HTTP/HTTPS_ so that traffic is routed through Cloudflare's application-layer pipeline. You can create multiple Spectrum applications in a zone; they all share the single region assigned to that zone.
To use your own addresses, create the application via the API and set `edge_ips` (with `type: "static"`) to your [Static IP](https://developers.cloudflare.com/spectrum/about/static-ip/) or [BYOIP](https://developers.cloudflare.com/spectrum/about/byoip/) addresses. The `origin_direct` field still points to your origin server.
Spectrum hostname limits and workarounds
By default, a zone is limited to **10 unique Spectrum hostnames** (each backed by a dedicated IPv4 address). If you need to regionalize more hostnames than this, you can:

  * **Use [BYOIP](https://developers.cloudflare.com/spectrum/about/byoip/)** — bring your own IP space so Spectrum applications are not constrained by the default shared-IPv4 allocation.
  * **Use IPv6-only Spectrum applications** — IPv6 addresses are not subject to the same scarcity as IPv4, so IPv6-only applications do not count against the IPv4 hostname limit.
  * **CNAME multiple subdomains to a single Spectrum application** — point several DNS-only (gray-clouded) `CNAME` records at one Spectrum app hostname. This works only when those hostnames share the same origin (one origin per application).
  * **Use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)** — configure the Spectrum application as the target (fallback origin) for Custom Hostnames.
These are Spectrum-wide limits, not specific to Regional Services. Contact your account team if you expect to exceed them.
3. **Configure the processing region.** The region is assigned by Cloudflare, so communicate and work with your account team to confirm which [region](https://developers.cloudflare.com/data-localization/region-support/) should apply to your zone and to verify it has been configured. You can use any [managed region](https://developers.cloudflare.com/data-localization/region-support/#region-types), or request a [custom region](#custom-regions) if your compliance requirements are not met by the managed regions.
4. **Verify regionalization.** Confirm that traffic is processed in the expected region. Refer to [Verify the configuration](#verify-the-configuration).

## Verify the configuration

You can confirm regionalization using the same method as any other Regional Services configuration — refer to [Verify Regional Services behavior](https://developers.cloudflare.com/data-localization/how-to/#verify-regional-services-behavior) for the general guidance.

Every Cloudflare HTTP response includes a `CF-RAY` header that ends with a three-letter [IATA airport code ↗](https://en.wikipedia.org/wiki/IATA%5Fairport%5Fcode) identifying the data center where TLS termination occurred. Send a request to your regionalized hostname and check that the code corresponds to a data center inside your configured region:

```bash
curl --head https://www.example.com 2>&1 | grep -i cf-ray
```

```txt
cf-ray: 80cc9e64fd8a1519-MUC
```

In this example, `MUC` (Munich) confirms that the request was processed in the European Union. A request sent from outside the region returns a code for an in-region data center, because out-of-region traffic is forwarded to the configured region for processing.

## Custom regions

If the [managed regions](https://developers.cloudflare.com/data-localization/region-support/#region-types) do not match your compliance requirements, you can request a custom region that restricts processing to a specific set of data centers. Custom regions are set up through your account team. To learn more about how custom regions work, refer to the [Custom regions blog post ↗](https://blog.cloudflare.com/custom-regions/).

## Related resources

* [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) — overview and in-region processing model.
* [Available regions and product support](https://developers.cloudflare.com/data-localization/region-support/) — the full list of regions and their definitions.
* [Spectrum](https://developers.cloudflare.com/spectrum/) — Cloudflare's Layer 4 proxy.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/regional-services/spectrum-applications/#page","headline":"Regionalized Spectrum Applications · Cloudflare Data Localization Suite docs","description":"Regionalize Spectrum HTTP/S applications, with support for Static IPs and BYOIP.","url":"https://developers.cloudflare.com/data-localization/regional-services/spectrum-applications/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
