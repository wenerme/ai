---
title: Get started
description: Follow the steps below to enable SSL/TLS protection for your application.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

Follow the steps below to enable SSL/TLS protection for your application.

## Before you begin

* [Create an account and register an application](https://developers.cloudflare.com/fundamentals/account/)

## Choose an edge certificate

As explained in the [concepts page](https://developers.cloudflare.com/ssl/concepts/#ssltls-certificate), edge certificates are the SSL/TLS certificates that Cloudflare presents to your visitors.

Cloudflare offers a variety of options for your application's edge certificates:

* [**Universal certificates**](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/):  
By default, Cloudflare issues — and [renews](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#universal-ssl) — free, unshared, publicly trusted SSL certificates to all domains [added to](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) and [activated on](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) Cloudflare.
* [**Advanced certificates**](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/):  
Use advanced certificates when you want something more customizable than [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) but still want the convenience of SSL certificate issuance and renewal.
* [**Custom certificates**](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/):  
Custom certificates are meant for Business and Enterprise customers who want to use their own SSL certificates.
* [**Keyless certificates**](https://developers.cloudflare.com/ssl/keyless-ssl/) (Enterprise only):  
Keyless SSL allows security-conscious clients to upload their own custom certificates and benefit from Cloudflare, but without exposing their TLS private keys.

Refer to [Edge certificates](https://developers.cloudflare.com/ssl/edge-certificates/) for more information on how different certificate types can respond to common use cases.

For SaaS providers

Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare's network to your customers via their own custom or vanity domains.

For more details, refer to [Cloudflare for SaaS (managed hostnames)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

## Choose your encryption mode

Once you have chosen your edge certificate, [choose an encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).

Encryption modes specify how Cloudflare encrypts connections between (a) visitors and Cloudflare, and (b) Cloudflare and your origin server. For more context about this two-part process refer to the [concepts page](https://developers.cloudflare.com/ssl/concepts/#ssltls-certificate).

Note that some encryption modes will require you to have a valid [origin certificate](https://developers.cloudflare.com/ssl/concepts/#origin-certificate), which is managed on your origin server. Each encryption mode setup page lists out this and other requirements and you can also [consider other Cloudflare options to use with your origin server](https://developers.cloudflare.com/ssl/origin-configuration/), such as [Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/).

## Enforce HTTPS connections

Even if your application has an active edge certificate, visitors can still access resources over unsecured HTTP connections.

Using various Cloudflare settings, however, you can force all or most visitor connections to [use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/).

## SEO considerations

Using HTTPS can improve user trust and may be used as a ranking signal by search engines. For related guidance, refer to [Improve SEO](https://developers.cloudflare.com/fundamentals/performance/improve-seo/).

## Optional - Enable additional features

After you have chosen your encryption mode and enforced HTTPS connections, evaluate the following settings:

* [Edge certificates](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/): Customize different aspects of your edge certificates, from enabling **Opportunistic Encryption** to specifying a **Minimum TLS Version**.
* [Authenticated origin pull](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/): Ensure all requests to your origin server originate from the Cloudflare network.
* [Notifications](https://developers.cloudflare.com/notifications/notification-available/): Set up alerts related to certificate validation status, issuance, renewal, and expiration.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/get-started/","name":"Get started"}}]}
```
