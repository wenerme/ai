---
title: Google tag gateway for advertisers
description: Deploy Google measurement tags from your domain for improved ad signal recovery.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/google-tag-gateway/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Google tag gateway for advertisers

Google tag gateway for advertisers allows website owners using Cloudflare as a CDN to get the most out of ad measurement tools with just a few clicks. It allows you to deploy Google scripts using your own domain, enhancing data privacy and improving signal measurement recovery. Unlike standard setups where tags are requested from a Google domain, Google tag gateway for advertisers loads the tag from your domain and sends measurement events to your domain, where they are forwarded to Google.

Learn more about why we built it and how it works in our [blog post ↗](https://blog.cloudflare.com/google-tag-gateway-for-advertisers/).

## Pricing

Google tag gateway for advertisers is free to use. Requests routed through the gateway do not count toward usage or billing for other Cloudflare products such as [CDN](https://developers.cloudflare.com/cache/), [WAF](https://developers.cloudflare.com/waf/), or [Bot Management](https://developers.cloudflare.com/bots/).

## Get started

Site owners can enable this feature in one of two ways: through the Google tag console, or through the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/tag-management/google-tag-gateway).

### Configure in Google Tag Manager

The fastest way to set up Google tag gateway for advertisers is in Google Tag Manager. [Follow the steps in Google's Help Center ↗](https://support.google.com/analytics/answer/16061641).

### Configure in the Cloudflare dashboard

Note

Your Cloudflare dashboard user must have one of the following [Account Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles): Super Administrator, Administrator or Zaraz Admin. If you are using Domain Scoped Roles, your [Domain Role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#domain-scoped-roles) must be Domain Administrator.

1. In the Cloudflare dashboard, go to the **Google Tag Gateway** page.  
[ Go to **Google Tag Gateway** ](https://dash.cloudflare.com/?to=/:account/tag-management/google-tag-gateway)
2. Select your domain.
3. Enable the toggle for **Turn on and configure Google tag gateway**.
![Google tag gateway for advertisers configuration](https://developers.cloudflare.com/_astro/google-tag-configuration.DAsbB12B_Z2mnQya.webp) 
1. Add your Google tag ID and the path on your website reserved for the Google tag. The [Google tag ID ↗](https://support.google.com/analytics/answer/9539598?hl=en) can be found in the Google Tag Experience dashboard. The measurement path is an unused path on your site that will load Google Tag Manager and all subsequent measurement requests.
![Add to ID and path](https://developers.cloudflare.com/_astro/google-tag-id-path.FiWAyHgy_Z1n6SmD.webp) 
1. Once you click **Save**, Google tag gateway for advertisers will be enabled on your zone. If you already have a GTM script on your website, this First Party Tag will override the existing script.

Now that you have authenticated into your Cloudflare account and configured GTM in first-party mode, your Google Tags will be loaded using `https://your-domain/measurement-path/...`and subsequent measurement requests will be served by Cloudflare.

## Zone-level configuration

Google tag gateway for advertisers is configured at the zone level. When you enable it for a zone (for example, `example.com`), it applies to all hostnames and subdomains within that zone, including custom hostnames. Currently, it is not possible to enable or disable the feature for individual subdomains independently. [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) cannot be used to control or disable the tag injection on specific subdomains.

### Handle subdomain-specific logic with triggers

If you need different tag behavior for specific subdomains (for example, only firing certain tags on `shop.example.com`), you can use [Google Tag Manager triggers ↗](https://support.google.com/tagmanager/answer/7679316) to control when tags fire. For example, you can create a trigger condition like **Page Hostname** equals `shop.example.com` to restrict a tag to a specific subdomain.

This approach lets you maintain a single zone-wide Google tag gateway configuration while still customizing tag behavior per subdomain.

## Related resources

* [Google Developer Docs: Set up Google tag gateway for advertisers ↗](https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide?setup=auto)
* [Google Help Center: Set up Google tag gateway for advertisers in the Google tag with Cloudflare ↗](https://support.google.com/tagmanager/answer/16061406)
* [Google Help Center: Set up Google tag gateway for advertisers in Google Tag Manager with Cloudflare ↗](https://support.google.com/analytics/answer/16061641)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/google-tag-gateway/","name":"Google tag gateway for advertisers"}}]}
```
