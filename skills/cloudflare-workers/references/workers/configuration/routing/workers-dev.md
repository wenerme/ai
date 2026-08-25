---
description: Deploy Cloudflare Workers on a workers.dev subdomain for quick testing and personal projects.
title: workers.dev
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# workers.dev

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Workers accounts come with a `workers.dev` subdomain that is configurable in the Cloudflare dashboard. Your `workers.dev` subdomain allows you getting started quickly by deploying Workers without first onboarding your custom domain to Cloudflare.

It's recommended to run production Workers on a [Workers route or custom domain](https://developers.cloudflare.com/workers/configuration/routing/), rather than on your `workers.dev` subdomain. Your `workers.dev` subdomain is treated as a [Free website ↗](https://www.cloudflare.com/plans/) and is intended for personal or hobby projects that aren't business-critical.

## Configure `workers.dev`

`workers.dev` subdomains take the format: `<YOUR_ACCOUNT_SUBDOMAIN>.workers.dev`. To change your `workers.dev` subdomain:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Change** next to **Your subdomain**.

All Workers are assigned a `workers.dev` route when they are created or renamed following the syntax `<YOUR_WORKER_NAME>.<YOUR_SUBDOMAIN>.workers.dev`. The [name](https://developers.cloudflare.com/workers/wrangler/configuration/#inheritable-keys) field in your Worker configuration is used as the subdomain for the deployed Worker.

## Manage access to `workers.dev`

When enabled, your `workers.dev` URL is available publicly. To require visitors to sign in before they can access a `workers.dev` URL, use [Cloudflare Access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/).

Access can protect one Worker's production `workers.dev` URL, preview URLs, or both. You can also protect all Workers or all Worker previews in an account.

To use details about the signed-in user in your Worker, use [ctx.access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/#read-authenticated-user-identity-with-ctxaccess). You can also read the [user's identity](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/#user-identity) from the validated JWT or the `/cdn-cgi/access/get-identity` endpoint.

## Disabling `workers.dev`

### Disabling `workers.dev` in the dashboard

To disable the `workers.dev` route for a Worker:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Go to **Settings** \> **Domains & Routes**.
4. On `workers.dev` click "Disable".
5. Confirm you want to disable.

### Disabling `workers.dev` in the Wrangler configuration file

To disable the `workers.dev` route for a Worker, include the following in your Worker's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

```jsonc
{
	"workers_dev": false
}
```

```toml
workers_dev = false
```

When you redeploy your Worker with this change, the `workers.dev` route will be disabled. Preview URLs default to matching your `workers_dev` setting unless explicitly configured. If you explicitly enabled Preview URLs, [disable them separately](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/#toggle-preview-urls-enable-or-disable).

If you do not specify `workers_dev = false` but add a [routes component](https://developers.cloudflare.com/workers/wrangler/configuration/#routes) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), the value of `workers_dev` will be inferred as `false` on the next deploy.

Caution

If you disable your `workers.dev` route in the Cloudflare dashboard but do not update your Worker's Wrangler file with `workers_dev = false`, the `workers.dev` route will be re-enabled the next time you deploy your Worker with Wrangler.

## Limitations

When deploying a Worker with a `workers.dev` subdomain enabled, your Worker name must meet the following requirements:

* Must be 63 characters or less
* Must contain only alphanumeric characters (`a-z`, `A-Z`, `0-9`) and dashes (`-`)
* Cannot start or end with a dash (`-`)

These restrictions apply because the Worker name is used as a DNS label in your `workers.dev` URL. DNS labels have a maximum length of 63 characters and cannot begin or end with a dash.

Note

Worker names can be up to 255 characters when not using a `workers.dev` subdomain. If you need a longer name, you can disable `workers.dev` and use [routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) or [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) instead.

## Related resources

* [Announcing workers.dev ↗](https://blog.cloudflare.com/announcing-workers-dev)
* [Wrangler routes configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#types-of-routes)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/routing/workers-dev/#page","headline":"workers.dev · Cloudflare Workers docs","description":"Deploy Cloudflare Workers on a workers.dev subdomain for quick testing and personal projects.","url":"https://developers.cloudflare.com/workers/configuration/routing/workers-dev/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
