---
description: Set up wildcard DNS, routes, and TLS so exposePort preview URLs work on your domain.
title: Configure preview URLs on a custom domain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure preview URLs on a custom domain

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/guides/preview-urls-custom-domain/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Set up wildcard DNS, routes, and TLS so `exposePort()` preview URLs work on your domain. To deploy the Worker and sandbox image, refer to [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/).

Only required for preview URLs

Custom domain setup is only needed if you use `exposePort()` to expose services from sandboxes. If your application does not use `exposePort()`, you can deploy to `.workers.dev` without this configuration.

For public URLs without custom-domain setup, [sandbox.tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) is an alternative: quick tunnels for development, named tunnels for stable hostnames in production.

Sandbox SDK 1.0 preview

Command examples that use `startProcess` are stable-only. On **`@next`**, use argv `exec` process handles. Refer to [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/). Package and image still must match on the same release line.

Preview URLs need wildcard DNS because each exposed port gets a unique subdomain: `https://8080-abc123.yourdomain.com`.

The `.workers.dev` domain does not support wildcard subdomains, so preview URLs that must be reachable on a public hostname outside local development need a custom domain.

Subdomain depth matters for TLS

If your Worker runs on a subdomain (for example, `sandbox.yourdomain.com`), preview URLs become second-level wildcards like `*.sandbox.yourdomain.com`. Cloudflare's Universal SSL only covers first-level wildcards (`*.yourdomain.com`), so you need a certificate covering `*.sandbox.yourdomain.com`. Without it, preview URLs will fail with TLS handshake errors.

You have three options:

* **Run the Worker on the apex domain** (`yourdomain.com`) so preview URLs stay at the first level (`*.yourdomain.com`), which Universal SSL covers automatically. This is the simplest option.
* **Use [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/)** ($10/month) to provision a certificate for `*.sandbox.yourdomain.com` through the Cloudflare dashboard.
* **Upload a custom certificate** from a provider like [Let's Encrypt ↗](https://letsencrypt.org/) (free). Generate a wildcard certificate for `*.sandbox.yourdomain.com` using the DNS-01 challenge, then upload it via the Cloudflare dashboard under **SSL/TLS > Edge Certificates > [Custom Certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/)**. You will need to renew it before expiry.

## Prerequisites

* Active Cloudflare zone with a domain
* Worker that uses `exposePort()`
* [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed
* Sandbox app already [deployable](https://developers.cloudflare.com/sandbox/guides/deploy/) (Worker + image)

## Setup

### Create a wildcard DNS record

In the Cloudflare dashboard, go to your domain and create an A record:

* **Type**: A
* **Name**: `*` (wildcard)
* **IPv4 address**: `192.0.2.0`
* **Proxy status**: Proxied (orange cloud)

This routes all subdomains through Cloudflare's proxy. The IP address `192.0.2.0` is a documentation address (RFC 5737) that Cloudflare recognizes when proxied.

### Configure Worker routes

Add a wildcard route to your Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-sandbox-app",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"routes": [
		{
			"pattern": "*.yourdomain.com/*",
			"zone_name": "yourdomain.com"
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-sandbox-app"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-25"

[[routes]]
pattern = "*.yourdomain.com/*"
zone_name = "yourdomain.com"
```

Replace `yourdomain.com` with your actual domain. This routes all subdomain requests to your Worker and enables Cloudflare to provision SSL certificates automatically.

### Apply the route

Redeploy the Worker so the route configuration takes effect:

```sh
npx wrangler deploy
```

If this deploy also changes your sandbox image or package, follow [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/) for rollout and package/image pairing. For route-only changes you can still use a normal deploy. Use `--containers-rollout=none` only when you intentionally skip container image and instance updates.

## Verify

Test that preview URLs work:

```typescript
// Extract hostname from request
const { hostname } = new URL(request.url);

const sandbox = getSandbox(env.Sandbox, "test-sandbox");
await sandbox.startProcess("python -m http.server 8080");
const exposed = await sandbox.exposePort(8080, { hostname });

console.log(exposed.url);
// https://8080-test-sandbox.yourdomain.com
```

Visit the URL in your browser to confirm your service is accessible.

## Troubleshooting

* **CustomDomainRequiredError**: Verify your Worker is not deployed only to `.workers.dev` and that the wildcard DNS record and route are configured correctly.
* **SSL/TLS errors**: Wait a few minutes for certificate provisioning. Verify the DNS record is proxied and SSL/TLS mode is set to "Full" or "Full (strict)" in your dashboard. If your Worker is on a subdomain (for example, `sandbox.yourdomain.com`), Universal SSL will not cover the second-level wildcard `*.sandbox.yourdomain.com`. Refer to the [TLS caution](#subdomain-depth-matters-for-tls) at the top of this page for options.
* **Preview URL not resolving**: Confirm the wildcard DNS record exists and is proxied. Wait 30–60 seconds for DNS propagation.
* **Port not accessible**: Ensure your service binds to `0.0.0.0` (not `localhost`) and that `proxyToSandbox()` is called first in your Worker's fetch handler.

For detailed troubleshooting, see the [Workers routing documentation](https://developers.cloudflare.com/workers/configuration/routing/).

## Related

* [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/guides/deploy/) \- Deploy Worker and image
* [Preview URLs](https://developers.cloudflare.com/sandbox/concepts/preview-urls/) \- How preview URLs work
* [Expose services](https://developers.cloudflare.com/sandbox/guides/expose-services/) \- Patterns for exposing ports
* [Tunnels API](https://developers.cloudflare.com/sandbox/api/tunnels/) \- Zero-config `*.trycloudflare.com` URLs for development
* [Workers routing](https://developers.cloudflare.com/workers/configuration/routing/) \- Advanced routing configuration
* [Cloudflare DNS](https://developers.cloudflare.com/dns/) \- DNS management

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/preview-urls-custom-domain/#page","headline":"Configure preview URLs on a custom domain · Cloudflare Sandbox SDK docs","description":"Set up wildcard DNS, routes, and TLS so exposePort preview URLs work on your domain.","url":"https://developers.cloudflare.com/sandbox/guides/preview-urls-custom-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
