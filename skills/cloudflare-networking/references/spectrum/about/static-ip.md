---
description: Assign persistent IP addresses to your Spectrum applications.
title: Static IP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Static IP

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/spectrum/about/static-ip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you create a Spectrum application, you are assigned an IP. These IPs are normally dynamic, meaning that they will change over time. But, for instance, if you want to set up WAF custom rules for specific IPs, you may want to use static IPs.

A static IP, like a physical street address can tell other computers or servers on the Internet where a specific computer is located or connected. This makes the device easier to find on the network, since the IP will not change.

With static IPs, Cloudflare commits to never changing the IP address of a client's domain resolved at the Cloudflare global network. For example, `www.example.com` will always resolve and accept traffic sent to `198.51.100.10`. No other customer will be hosted on that IP.

Importantly, the static IP is associated with the DNS name, not with each individual Spectrum application. This means that all Spectrum apps using the same hostname will share the same static IP.

## Use static IPs with Spectrum

Availability

Static IP is an Enterprise feature that does not come standard with Spectrum. Contact your account team to request access.

Once you get your static IP from Cloudflare, you can use it via API, just like [BYOIP](https://developers.cloudflare.com/byoip/). For the moment, there is still no UI available for this feature.

When creating a Spectrum application through the API, specify the static IPs that you have been provided. See, for instance, the API example below that creates an application routing traffic through Cloudflare’s HTTP pipeline.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"protocol": "tcp/80",
		"dns": {
				"type": "ADDRESS",
				"name": "www.example.com"
		},
		"origin_direct": [
				"tcp://192.0.2.1:80"
		],
		"tls": "off",
		"traffic_type": "http",
		"edge_ips": {
				"type": "static",
				"ips": [
						"198.51.100.10",
						"2001:DB8::1"
				]
		}
	}'
```

## Check your static IPs

You can find your leased static IPs for Spectrum on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/about/static-ip/#page","headline":"Static IP · Cloudflare Spectrum docs","description":"Assign persistent IP addresses to your Spectrum applications.","url":"https://developers.cloudflare.com/spectrum/about/static-ip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
