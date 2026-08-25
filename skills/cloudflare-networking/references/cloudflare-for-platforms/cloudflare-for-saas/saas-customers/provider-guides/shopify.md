---
description: Learn how to configure your zone with Shopify.
title: Shopify
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Shopify

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare partners with Shopify to provide Shopify customers’ websites with Cloudflare’s performance and security benefits.

If you use Shopify and also have a Cloudflare plan, you can use your own Cloudflare zone to proxy web traffic to your zone first, then Shopify's (the SaaS Provider) zone second. This configuration option is called [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Benefits

O2O routing also enables you to take advantage of Cloudflare zones specifically customized for Shopify traffic.

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

When you [set up O2O routing for your Shopify website](#enable), Cloudflare enables specific configurations for this SaaS provider. Currently, this includes the following:

* Workers and Snippets are disabled on the `/checkout` URI path.

## Enable

You can enable O2O on any Cloudflare zone plan.

To enable O2O on your account, [create](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` DNS record.

| Type  | Name                 | Target              | Proxy status |
| ----- | -------------------- | ------------------- | ------------ |
| CNAME | <YOUR\_SHOP\_DOMAIN> | shops.myshopify.com | Proxied      |

Once you save the new DNS record, the Cloudflare dashboard will show a Shopify icon next to the CNAME record value. For example:

![Cloudflare dashboard showing a CNAME DNS entry for Shopify with a specific Shopify icon](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=848,height=112,format=webp/_astro/shopify-dns-entry.BVBaRuE6.png)

Do not use Always Use HTTPS

Do not enable the [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) setting in an O2O scenario with Shopify.

This setting forces a redirect on all requests, including the `/.well-known/acme-challenge/*` URI path used for HTTP-01 domain validation. This prevents Shopify from automatically provisioning or renewing SSL certificates via Let's Encrypt for your domain.

Instead, create a [redirect rule](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) to enforce HTTPS while excluding the validation path mentioned above (use a [wildcard pattern](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) like `/.well-known/acme-challenge/*`).

For questions about Shopify setup, refer to their [support guide ↗](https://help.shopify.com/en/manual/domains/add-a-domain/connecting-domains/connect-domain-manual).

## Product compatibility

When a hostname within your Cloudflare zone has O2O enabled, you assume additional responsibility for the traffic on that hostname because you can now configure various Cloudflare products to affect that traffic. Some of the Cloudflare products compatible with O2O are:

* [Caching](https://developers.cloudflare.com/cache/)
* [Workers](https://developers.cloudflare.com/workers/)
* [Rules](https://developers.cloudflare.com/rules/)

For a full list of compatible products and potential limitations, refer to [Product compatibility](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/product-compatibility/).

## Zone hold

If your own Cloudflare zone is on the Enterprise plan, you have access to the [zone hold feature](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/), which is a toggle that prevents your domain name from being created as a zone in a different Cloudflare account. Additionally, if the zone hold is enabled, it prevents the activation of custom hostnames onboarded to Shopify. Shopify would receive the following error message for your custom hostname: `The hostname is associated with a held zone. Please contact the owner of this domain to have the hold removed.`

To successfully activate the custom hostname on Shopify, the owner of the zone needs to [temporarily release the hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/#release-zone-holds). If you are only onboarding a subdomain as a custom hostname to Shopify, only the subfeature titled **Also prevent Subdomains** needs to be temporarily disabled.

Once the zone hold is temporarily disabled, follow Shopify's instructions to refresh the custom hostname and it should activate.

## Additional support

If you are a Shopify customer and have set up your own Cloudflare zone with O2O enabled on specific hostnames, contact your Cloudflare Account Team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for help resolving issues in your own zone.

Cloudflare will consult Shopify if there are technical issues that Cloudflare cannot resolve.

### DNS CAA records

For details about CAA records refer to the [Shopify documentation ↗](https://help.shopify.com/manual/domains/add-a-domain/connecting-domains/considerations).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/#page","headline":"Shopify · Cloudflare for Platforms docs","description":"Learn how to configure your zone with Shopify.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
