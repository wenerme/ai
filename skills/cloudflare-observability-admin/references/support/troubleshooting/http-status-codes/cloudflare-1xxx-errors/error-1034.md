---
description: Troubleshoot Cloudflare 1034 error code.
title: Error 1034
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 1034

Last updated Jun 25, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Error 1034: Edge IP Restricted

This error indicates that the IP address used for the domain is restricted by Cloudflare's edge validation.

Edge IP Validation (EIV) is a safeguard for restricted IP space that is meant to be used by specific Cloudflare accounts, such as [BYOIP](https://developers.cloudflare.com/byoip/) prefixes, dedicated/[static](https://developers.cloudflare.com/byoip/concepts/static-ips/) IP allocations, or other customer-associated IP ranges. When EIV is enabled, Cloudflare checks whether incoming traffic to those IPs is associated with an authorized account before allowing the request to proceed. This helps prevent accidental misrouting or unauthorized use of dedicated IP space while keeping properly configured traffic flowing normally.

### Common causes

#### Pointing to reserved IP addresses

Customers who previously pointed their domains to `1.1.1.1` will now encounter a `1034` error. This is due to edge validation checks in Cloudflare's systems to prevent misconfiguration and potential abuse.

**Resolution**: Ensure DNS records are pointed to IP addresses you control. If a placeholder IP address is needed for "originless" setups, use the IPv6 reserved address `100::` or the IPv4 reserved address `192.0.2.0`.

#### SaaS provider IP restrictions

If you are using a SaaS provider that uses [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/), the provider may restrict access to their infrastructure to validated IP addresses only. In this case, requests to their IP addresses from domains that are not properly configured with the provider will be blocked with a `1034` error.

**Resolution**: Verify that your domain is correctly configured with your SaaS provider. This typically involves:

1. Ensuring your DNS records point to the correct IP addresses or hostnames provided by your SaaS provider.
2. Confirming that your domain has been properly registered and validated with the SaaS provider's platform.
3. Contacting your SaaS provider's support team if you continue to experience this error after verifying your configuration.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/#page","headline":"Error 1034 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1034 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
