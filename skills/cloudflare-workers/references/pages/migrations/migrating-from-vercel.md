---
description: In this tutorial, you will learn how to deploy your Vercel application to Cloudflare Pages.
title: Migrating from Vercel to Pages
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrating from Vercel to Pages

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/migrations/migrating-from-vercel/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this tutorial, you will learn how to deploy your Vercel application to Cloudflare Pages.

You should already have an existing project deployed on Vercel that you would like to host on Cloudflare Pages. Features such as Vercel's serverless functions are currently not supported in Cloudflare Pages.

## Find your build command and build directory

To move your application to Cloudflare Pages, you will need to find your build command and build directory. Cloudflare Pages will use this information to build your application and deploy it.

In your Vercel Dashboard, find the project that you want to deploy. It should be configured to deploy from a GitHub repository.

![Selecting a site in the Vercel Dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1728,height=772,format=webp/_astro/vercel-deploy-1.D2ttJxis.png)

Inside of your site dashboard, select **Settings**, then **General**.

![Selecting Site Settings in site dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1724,height=900,format=webp/_astro/vercel-deploy-2.Bz2cpjeg.png)

Find the **Build & Development settings** panel, which will have the **Build Command** and **Output Directory** fields. If you are using a framework, these values may not be filled in, but will show the defaults used by the framework. Save these for deploying to Cloudflare Pages. In the below image, the **Build Command** is `npm run build`, and the **Output Directory** is `build`.

![Finding the Build Command and Output Directory fields](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1664,height=1122,format=webp/_astro/vercel-deploy-3.QXCg23KQ.png)

## Create a new Pages project

After you have found your build directory and build command, you can move your project to Cloudflare Pages.

The [Get started guide](https://developers.cloudflare.com/pages/get-started/) will instruct you how to add your GitHub project to Cloudflare Pages.

## Add a custom domain

Next, connect a [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/) to your Pages project. This domain should be the same one as your currently deployed Vercel application.

### Change domain nameservers

In most cases, you will want to [add your domain to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

This does involve changing your domain nameservers, but simplifies your Pages setup and allows you to use an apex domain for your project (like `example.com`).

If you want to take a different approach, read more about [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

### Set up custom domain

To add a custom domain:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project > **Custom domains**.
3. Select **Set up a domain**.
4. Provide the domain that you would like to serve your Cloudflare Pages site on and select **Continue**.
![Adding a custom domain for your Pages project through the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1401,height=410,format=webp/_astro/domains.zq4iMU_J.png)

The next steps vary based on if you [added your domain to Cloudflare](#change-domain-nameservers):

* **Added to Cloudflare**: Cloudflare will set everything up for you automatically and your domain will move to an `Active` status.
* **Not added to Cloudflare**: You need to [update some DNS records](https://developers.cloudflare.com/pages/configuration/custom-domains/#add-a-custom-subdomain) at your DNS provider to finish your setup.

## Delete your Vercel app

Once your custom domain is set up and sending requests to Cloudflare Pages, you can safely delete your Vercel application.

## Troubleshooting

Cloudflare does not provide IP addresses for your Pages project because we do not require `A` or `AAAA` records to link your domain to your project. Instead, Cloudflare uses `CNAME` records.

For more details, refer to [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/migrations/migrating-from-vercel/#page","headline":"Migrating from Vercel to Pages · Cloudflare Pages docs","description":"In this tutorial, you will learn how to deploy your Vercel application to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/migrations/migrating-from-vercel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
