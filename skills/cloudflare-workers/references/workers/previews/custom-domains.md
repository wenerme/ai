---
description: Serve Preview URLs from custom domains and protect them with Cloudflare Access.
title: Custom domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom domains

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/previews/custom-domains/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Preview URLs can use a custom domain, `workers.dev`, or both. Enable at least one host to get a Preview URL.

| Host | Preview URL | Unique deployment URL |
| --- | --- | --- |
| Custom domain | `<preview-name>.app.example.com` | `<deployment-id>-<preview-name>.app.example.com` |
| `workers.dev` | `<preview-name>-<worker-name>.<subdomain>.workers.dev` | `<deployment-id>-<worker-name>.<subdomain>.workers.dev` |

## Before you start

Configure Previews in the same system that manages your custom domain:

| Managed with | Configuration |
| --- | --- |
| Wrangler | Use the **Wrangler** tab, then run `npx wrangler deploy`. |
| Dashboard | Use the **Dashboard** tab. |
| Terraform | Update and apply your Terraform configuration. |

## Enable custom domain Preview URLs

The following example configures `app.example.com` for Preview traffic only. Add `previews_enabled` and set `enabled` to `false`, then run `npx wrangler deploy` to apply the configuration.

```jsonc
{
  "routes": [
    {
      "pattern": "app.example.com",
      "custom_domain": true,
      "previews_enabled": true,
      "enabled": false
    }
  ]
}
```

```toml
[[routes]]
pattern = "app.example.com"
custom_domain = true
previews_enabled = true
enabled = false
```

Choose which traffic the custom domain serves:

| Traffic | `previews_enabled` | `enabled` |
| --- | --- | --- |
| Preview only | `true` | `false` |
| Production and Preview | `true` | Omit or set `true` |

1. In the Cloudflare dashboard, go to **Workers & Pages** and select your Worker. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. On the **Domains** tab, under **Custom Domains and Routes**, select **+ Add Domain**.
3. Enter your domain. For **Enable for**, select *Preview* or *Production and Preview*. Then select **Add domain**.![Add Domain modal with Enable for set to Preview](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1040,height=756,format=webp/_astro/replace.D64Ztqrs.png)
4. Confirm that the domain appears under **Custom Domains and Routes**.![Domains tab showing a custom domain enabled for Preview traffic](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2876,height=1454,format=webp/_astro/customdomainonly.8AG_6tc-.png)

<details>

<summary>

DNS and certificate behavior

</summary>

Cloudflare creates a wildcard DNS record and SSL certificate for the custom domain, such as <code>*.app.example.com</code>. Certificate issuance can take time after you create the first Preview.

Use a dedicated hostname such as <code>previews.example.com</code> if your production domain already has subdomains. This avoids wildcard conflicts.

Preview URLs add another subdomain to your hostname. For example, <code>app.preview.example.com</code> creates <code>&lt;preview-name&gt;.app.preview.example.com</code>. For deeper hostnames, you may need <a href="https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/">Advanced Certificate Manager</a> with <a href="https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/">Total TLS</a> or another certificate that covers the Preview hostname.

</details>

## Enable `workers.dev` Preview URLs

Production and Preview `workers.dev` URLs are configured separately.

Set `preview_urls` in your Wrangler configuration file, then run `npx wrangler deploy`.

```jsonc
{
  "preview_urls": true
}
```

```toml
preview_urls = true
```

If `preview_urls` is omitted, Wrangler does not change an existing Preview URL setting. If no setting exists, its initial value depends on `workers_dev`. Set `preview_urls` explicitly to change the Preview URL setting.

1. In the Cloudflare dashboard, go to **Workers & Pages** and select your Worker. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. On the **Domains** tab, under **Worker URL**, turn on **Preview**.![Domains tab showing workers.dev Preview URLs enabled with no custom domains configured](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2876,height=1488,format=webp/_astro/emptydomain.C1zwEW1b.png)

## Protect with Cloudflare Access

Use [Cloudflare Access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/) to require sign-in for custom domain and `workers.dev` Preview URLs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/previews/custom-domains/#page","headline":"Custom domains","description":"Serve Preview URLs from custom domains and protect them with Cloudflare Access.","url":"https://developers.cloudflare.com/workers/previews/custom-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
