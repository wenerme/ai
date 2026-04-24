---
title: Shopify
description: Learn how to configure your zone with Shopify.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Shopify

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

![Cloudflare dashboard showing a CNAME DNS entry for Shopify with a specific Shopify icon](https://developers.cloudflare.com/_astro/shopify-dns-entry.BVBaRuE6_1CQPez.webp) 

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/","name":"SaaS customers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/","name":"Provider guides"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/","name":"Shopify"}}]}
```
