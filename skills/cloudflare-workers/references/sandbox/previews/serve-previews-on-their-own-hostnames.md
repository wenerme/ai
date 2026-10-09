---
description: Give each sandbox preview its own hostname, so code in one preview cannot use your application cookies or the storage of another preview.
title: Serve previews on their own hostnames
image: https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/og.png?v=052e5363148687ab
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Serve previews on their own hostnames

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Serve each sandbox preview from its own hostname, such as `ada.example-previews.com`. Code in a preview runs in the visitor's browser, and each preview hostname is a separate origin. Code in one preview cannot read your application pages or the storage of another preview. Paths reach the server unchanged, so applications do not need a base path.

<dl>

<dt>.example-previews.comhttps://ada.example-previews.com/app/</dt>
<dd>A wildcard DNS record and the route <code>*.example-previews.com/*</code> send every preview hostname to your Worker.</dd>

<dt>adahttps://ada.example-previews.com/app/</dt>
<dd>Your Worker reads the sandbox name and calls <code>getByName("ada")</code>. A name that is not a valid DNS label gets a <code>404</code>.</dd>

<dt>/app/https://ada.example-previews.com/app/</dt>
<dd>The path reaches the web server in the container unchanged, with the preview hostname in the <code>Host</code> header.</dd></dl>

## Prerequisites

- A Durable Object whose `fetch()` handler forwards requests to a web server in its container. To build one, refer to [Preview a web application](https://developers.cloudflare.com/sandbox/previews/).
- A domain for previews on Cloudflare, such as `example-previews.com`, with Cloudflare managing its DNS. Use a domain that your application does not use.

## Route preview hostnames to your Worker

1. In the DNS settings of the preview domain, add a proxied [wildcard record](https://developers.cloudflare.com/dns/manage-dns-records/reference/wildcard-dns-records/). For example, add an `AAAA` record with the name `*` and the content `100::`, with the proxy status **Proxied**.

   The record lets Cloudflare receive requests for every preview hostname. The Worker route handles those requests, so Cloudflare never contacts the address in the record.
2. In `wrangler.jsonc`, add the preview domain as a variable and route its subdomains to your Worker. Replace `example-previews.com` with your preview domain:

   ```jsonc
   {
   	"vars": {
   		"PREVIEW_DOMAIN": "example-previews.com",
   	},
   	"routes": [
   		{
   			"pattern": "*.example-previews.com/*",
   			"zone_name": "example-previews.com",
   		},
   	],
   	"workers_dev": true,
   }
   ```

   ```toml
   workers_dev = true

   [vars]
   PREVIEW_DOMAIN = "example-previews.com"

   [[routes]]
   pattern = "*.example-previews.com/*"
   zone_name = "example-previews.com"
   ```

   Wrangler turns off the `workers.dev` URL when `routes` is set. `workers_dev: true` keeps it for requests that manage previews.
3. Generate types for the new variable:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```

4. In the `fetch()` handler of your Worker, send each preview hostname to the Durable Object with the same name:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const suffix = `.${env.PREVIEW_DOMAIN}`;

   		// A preview hostname reaches only the sandbox with the same name.
   		if (url.hostname.endsWith(suffix)) {
   			const name = url.hostname.slice(0, -suffix.length);

   			// Accept only sandbox names that are valid DNS labels
   			if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(name)) {
   				return new Response("Not found", { status: 404 });
   			}

   			// Forward with the `http:` scheme, because `getTcpPort().fetch()`
   			// does not accept `https:` URLs
   			url.protocol = "http:";
   			return env.MY_CONTAINER.getByName(name).fetch(new Request(url, request));
   		}

   		// Other hostnames manage previews.
   		return new Response("Not found", { status: 404 });
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const suffix = `.${env.PREVIEW_DOMAIN}`;

   		// A preview hostname reaches only the sandbox with the same name.
   		if (url.hostname.endsWith(suffix)) {
   			const name = url.hostname.slice(0, -suffix.length);

   			// Accept only sandbox names that are valid DNS labels
   			if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(name)) {
   				return new Response("Not found", { status: 404 });
   			}

   			// Forward with the `http:` scheme, because `getTcpPort().fetch()`
   			// does not accept `https:` URLs
   			url.protocol = "http:";
   			return env.MY_CONTAINER.getByName(name).fetch(new Request(url, request));
   		}

   		// Other hostnames manage previews.
   		return new Response("Not found", { status: 404 });
   	},
   } satisfies ExportedHandler<Env>;
   ```

   The server receives the full path and the preview hostname in the `Host` header.

   Every request to a preview hostname goes to the preview. Keep routes that manage previews, such as stopping one, on other hostnames, so code in a preview cannot call them from its own origin. Authenticate preview visitors on the preview hostname, and do not send your application session cookie there.
5. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

6. Open the preview named `ada` in your browser, and store a value in its browser console. Replace `example-previews.com` with your preview domain:

   ```txt
   https://ada.example-previews.com/
   ```

   ```js
   localStorage.setItem("name", "ada");
   ```

7. Open the preview named `grace`, and read the value in its browser console:

   ```txt
   https://grace.example-previews.com/
   ```

   ```js
   localStorage.getItem("name");
   ```

   The console prints `null`. Each preview hostname is a separate origin, so `grace` cannot read the storage of `ada`.

## Serve previews under a subdomain

[Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) covers a domain and its first-level subdomains, such as `ada.example-previews.com`. It does not cover deeper hostnames such as `ada.previews.example.com`. To serve previews under a subdomain, add [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) or an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) for it.

Previews under a domain that your application also uses share cookies with your application. Browsers send a cookie set with `Domain=example.com` to every subdomain, including every preview under `previews.example.com`.

## Set cookies on preview hostnames

Code in one preview can set a cookie with `Domain=example-previews.com`, and every other preview then receives that cookie. Set cookies on preview hostnames without a `Domain` attribute, and do not trust a cookie because it arrived on a preview hostname.

## Related resources

- [Preview a web application](https://developers.cloudflare.com/sandbox/previews/)
- [Preview workspace example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/preview-workspace): a deployable Worker that runs a Vite development server on a separate hostname for each sandbox.
- [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#output-carries-the-same-risk)
- [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/#page","headline":"Serve previews on their own hostnames","description":"Give each sandbox preview its own hostname, so code in one preview cannot use your application cookies or the storage of another preview.","url":"https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/og.png?v=052e5363148687ab","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
