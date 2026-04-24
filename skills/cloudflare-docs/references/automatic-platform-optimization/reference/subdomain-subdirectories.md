---
title: Subdomains and subdirectories
description: Run APO on WordPress subdomains and subdirectory installations.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ WordPress ](https://developers.cloudflare.com/search/?tags=WordPress)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/automatic-platform-optimization/reference/subdomain-subdirectories.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Subdomains and subdirectories

## Run APO on a subdomain

After you enable APO, you configure it to run on the subdomain that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdomain running WordPress called `shop.mysite.com`, you would configure APO to run on the `shop.mysite.com` subdomain.

1. Install version 4.4.0 or later of the Cloudflare WordPress plugin.
2. Log in using Cloudflare **API token** or **Global key**.
3. Enable APO. The subdomain displays in the list of hostnames in the card.
4. Repeat the process for each subdomain to enable APO.

By default, APO runs on the apex domain (also known as "root domain" or "naked domain"). If you choose to run APO on a subdomain, the apex domain is automatically disabled. To run APO on a subdomain and the apex domain, upgrade the WordPress plugin to version 4.4.0 or later on the apex domain and re-enable APO.

## Run APO on a subdirectory

After you enable APO, you configure it to run on the subdirectory that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdirectory running WordPress called `mysite.com/shop`, you would configure APO to run on the `mysite.com` domain.

1. Install the Cloudflare WordPress plugin.
2. Add your Cloudflare API Token.
3. Activate APO.

Repeat steps 1 and 2 for each subdirectory to activate the WordPress plugin for automatic cache purging.

## Run APO only on a subdirectory

If you choose to run APO only on a subdirectory, the rest of the domain should be configured to bypass APO. You can bypass APO in one of two ways.

### Use the `cf-edge-cache` response header

The `cf-edge-cache: no-cache` instructs the APO service to bypass caching for non-WordPress parts of the site. You can implement this option with Cloudflare Workers using the example below.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const originalResponse = await fetch(request);


    // Response properties are immutable. To change them, construct a new Response object.

    const response = new Response(originalResponse.body, originalResponse);


    // Response headers can be modified through the headers `set` method.

    response.headers.set("cf-edge-cache", "no-cache");


    return response;

  },

};


```

Explain Code

### Use Cache Rules

Create a [cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/) to exclude non-WordPress portions of the site from caching using **Cache eligibility: Bypass cache**. This option disables all caching, including static assets for those paths. As a result, we recommend disabling APO via the response header.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/automatic-platform-optimization/","name":"Automatic Platform Optimization"}},{"@type":"ListItem","position":3,"item":{"@id":"/automatic-platform-optimization/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/automatic-platform-optimization/reference/subdomain-subdirectories/","name":"Subdomains and subdirectories"}}]}
```
