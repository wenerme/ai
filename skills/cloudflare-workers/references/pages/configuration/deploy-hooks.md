---
description: Trigger Cloudflare Pages deployments from external event sources using unique webhook URLs.
title: Deploy Hooks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy Hooks

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/configuration/deploy-hooks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Deploy Hooks, you can trigger deployments using event sources beyond commits in your source repository. Each event source may obtain its own unique URL, which will receive HTTP POST requests in order to initiate new deployments. This feature allows you to integrate Pages with new or existing workflows. For example, you may:

* Automatically deploy new builds whenever content in a Headless CMS changes
* Implement a fully customized CI/CD pipeline, deploying only under desired conditions
* Schedule a CRON trigger to update your website on a fixed timeline

To create a Deploy Hook:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Builds** and select **Add deploy hook** to start configuration.
![Add a deploy hook on the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1226,height=322,format=webp/_astro/deploy-hooks-add.u1N247wc.png)

## Parameters needed

To configure your Deploy Hook, you must enter two key parameters:

1. **Deploy hook name:** a unique identifier for your Deploy Hook (for example, `contentful-site`)
2. **Branch to build:** the repository branch your Deploy Hook should build
![Choosing Deploy Hook name and branch to build on Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=775,height=287,format=webp/_astro/deploy-hooks-configure.C0YoLPl3.png)

## Using your Deploy Hook

Once your configuration is complete, the Deploy Hook’s unique URL is ready to be used. You will see both the URL as well as the POST request snippet available to copy.

![Reviewing the Deploy Hook's newly generated unique URL](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1250,height=703,format=webp/_astro/deploy-hooks-details.COmJrG8a.png)

Every time a request is sent to your Deploy Hook, a new build will be triggered. Review the **Source** column of your deployment log to see which deployment were triggered by a Deploy Hook.

![Reviewing which deployment was triggered by a Deploy Hook](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1602,height=430,format=webp/_astro/deploy-hooks-deployment-logs.yCL-S3AE.png)

## Security Considerations

Deploy Hooks are uniquely linked to your project and do not require additional authentication to be used. While this does allow for complete flexibility, it is important that you protect these URLs in the same way you would safeguard any proprietary information or application secret.

If you suspect unauthorized usage of a Deploy Hook, you should delete the Deploy Hook and generate a new one in its place.

## Integrating Deploy Hooks with common CMS platforms

Every CMS provider is different and will offer different pathways in integrating with Pages' Deploy Hooks. The following section contains step-by-step instructions for a select number of popular CMS platforms.

### Contentful

Contentful supports integration with Cloudflare Pages via its **Webhooks** feature. In your Contentful project settings, go to **Webhooks**, create a new Webhook, and paste in your unique Deploy Hook URL in the **URL** field. Optionally, you can specify events that the Contentful Webhook should forward. By default, Contentful will trigger a Pages deployment on all project activity, which may be a bit too frequent. You can filter for specific events, such as Create, Publish, and many others.

![Configuring Deploy Hooks with Contentful](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1883,height=1303,format=webp/_astro/contentful.CE1uZvg8.png)

### Ghost

You can configure your Ghost website to trigger Pages deployments by creating a new **Custom Integration**. In your Ghost website’s settings, create a new Custom Integration in the **Integrations** page.

Each custom integration created can have multiple **webhooks** attached to it. Create a new webhook by selecting **Add webhook** and **Site changed (rebuild)** as the **Event**. Then paste your unique Deploy Hook URL as the **Target URL** value. After creating this webhook, your Cloudflare Pages application will redeploy whenever your Ghost site changes.

![Configuring Deploy Hooks with Ghost](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1127,height=883,format=webp/_astro/ghost.CT5H6NM7.png)

### Sanity

In your Sanity project's Settings page, find the **Webhooks** section, and add the Deploy Hook URL, as seen below. By default, the Webhook will trigger your Pages Deploy Hook for all datasets inside of your Sanity project. You can filter notifications to individual datasets, such as production, using the **Dataset** field:

![Configuring Deploy Hooks with Sanity](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1759,height=1176,format=webp/_astro/hooks.CikwC9IO.png)

### WordPress

You can configure WordPress to trigger a Pages Deploy Hook by installing the free **WP Webhooks** plugin. The plugin includes a number of triggers, such as **Send Data on New Post, Send Data on Post Update** and **Send Data on Post Deletion**, all of which allow you to trigger new Pages deployments as your WordPress data changes. Select a trigger on the sidebar of the plugin settings and then [**Add Webhook URL** ↗](https://wordpress.org/plugins/wp-webhooks/), pasting in your unique Deploy Hook URL.

![Configuring Deploy Hooks with WordPress](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2488,height=1045,format=webp/_astro/wordpress.VDVl6Kuz.png)

### Strapi

In your Strapi Admin Panel, you can set up and configure webhooks to enhance your experience with Cloudflare Pages. In the Strapi Admin Panel:

1. Navigate to **Settings**.
2. Select **Webhooks**.
3. Select **Add New Webhook**.
4. In the **Name** form field, give your new webhook a unique name.
5. In the **URL** form field, paste your unique Cloudflare Deploy Hook URL.

In the Strapi Admin Panel, you can configure your webhook to be triggered based on events. You can adjust these settings to create a new deployment of your Cloudflare Pages site automatically when a Strapi entry or media asset is created, updated, or deleted.

Be sure to add the webhook configuration to the [production ↗](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation.html) Strapi application that powers your Cloudflare site.

![Configuring Deploy Hooks with Strapi](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2559,height=1440,format=webp/_astro/strapi.BuGuUrHn.png)

### Storyblok

You can set up and configure deploy hooks in Storyblok to trigger events. In your Storyblok space, go to **Settings** and scroll down to **Webhooks**. Paste your deploy hook into the **Story published & unpublished** field and select **Save**.

![Configuring Deploy Hooks with Storyblok](https://user-images.githubusercontent.com/53130544/161367254-ff475f3b-2821-4ee8-a175-8e96e779aa08.png)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/deploy-hooks/#page","headline":"Deploy Hooks · Cloudflare Pages docs","description":"Trigger Cloudflare Pages deployments from external event sources using unique webhook URLs.","url":"https://developers.cloudflare.com/pages/configuration/deploy-hooks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
