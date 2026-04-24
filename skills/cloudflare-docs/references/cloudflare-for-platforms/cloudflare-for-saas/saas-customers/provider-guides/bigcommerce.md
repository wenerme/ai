---
title: BigCommerce
description: Learn how to configure your Enterprise zone with BigCommerce.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/bigcommerce.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# BigCommerce

Cloudflare partners with BigCommerce to provide BigCommerce customers’ websites with Cloudflare’s performance and security benefits.

If you use BigCommerce and also have a Cloudflare plan, you can use your own Cloudflare zone to proxy web traffic to your zone first, then BigCommerce's (the SaaS Provider) zone second. This configuration option is called [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Benefits

O2O's benefits include applying your own Cloudflare zone's services and settings — such as [WAF](https://developers.cloudflare.com/waf/), [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/), [Waiting Room](https://developers.cloudflare.com/waiting-room/), and more — on the traffic destined for your BigCommerce environment.

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

BigCommerce customers can enable O2O on any Cloudflare zone plan.

To enable O2O on your account, [create](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` DNS record.

| Type  | Name             | Target                  | Proxy status |
| ----- | ---------------- | ----------------------- | ------------ |
| CNAME | <YOUR\_HOSTNAME> | shops.mybigcommerce.com | Proxied      |

Note

For more details about a BigCommerce setup, refer to their [support guide ↗](https://support.bigcommerce.com/s/article/Cloudflare-for-Performance-and-Security?language=en%5FUS#orange-to-orange).

If you cannot activate your domain using [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/), reach out to your account team.

## Product compatibility

When a hostname within your Cloudflare zone has O2O enabled, you assume additional responsibility for the traffic on that hostname because you can now configure various Cloudflare products to affect that traffic. Some of the Cloudflare products compatible with O2O are:

* [Caching](https://developers.cloudflare.com/cache/)
* [Workers](https://developers.cloudflare.com/workers/)
* [Rules](https://developers.cloudflare.com/rules/)

For a full list of compatible products and potential limitations, refer to [Product compatibility](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/product-compatibility/).

## Zone hold

If your own Cloudflare zone is on the Enterprise plan, you have access to the [zone hold feature](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/), which is a toggle that prevents your domain name from being created as a zone in a different Cloudflare account. Additionally, if the zone hold is enabled, it prevents the activation of custom hostnames onboarded to BigCommerce. BigCommerce would receive the following error message for your custom hostname: `The hostname is associated with a held zone. Please contact the owner of this domain to have the hold removed.`

To successfully activate the custom hostname on BigCommerce, the owner of the zone needs to [temporarily release the hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/#release-zone-holds). If you are only onboarding a subdomain as a custom hostname to BigCommerce, only the subfeature titled **Also prevent Subdomains** needs to be temporarily disabled.

Once the zone hold is temporarily disabled, follow BigCommerce's instructions to refresh the custom hostname and it should activate.

## Additional support

If you are a BigCommerce customer and have set up your own Cloudflare zone with O2O enabled on specific hostnames, contact your Cloudflare Account Team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for help resolving issues in your own zone.

Cloudflare will consult BigCommerce if there are technical issues that Cloudflare cannot resolve.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/","name":"SaaS customers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/","name":"Provider guides"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/bigcommerce/","name":"BigCommerce"}}]}
```
