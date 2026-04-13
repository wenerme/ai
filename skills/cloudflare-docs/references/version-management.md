---
title: Cloudflare Version Management
description: By using Version Management, you can:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/version-management/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Version Management

Safely test, deploy, and roll back changes to your zone configurations using Version Management.

 Enterprise-only 

## Benefits

By using Version Management, you can:

* Create independent versions to make changes with no risk of impacting live traffic.
* Safely deploy changes to staging environments ahead of deploy to production.
* Quickly roll back deployed changes when issues occur.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | No       | No         | Yes |

For access, [enable](https://developers.cloudflare.com/version-management/how-to/enable/) Zone Versioning in the Cloudflare dashboard.

## Limitations

Version Management does not currently support or have limited support for the following products or features:

API Shield

* Some [API Shield](https://developers.cloudflare.com/api-shield/) configurations are not cloned when a new zone version is created.
* Customers are allowed to opt-in to remove the UI block that prevents enabling Version Management.

Authenticated Origin Pull

* [Authenticated Origin Pull](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) does not work with Zone Versioning.
* Accessing your domain from an allowlisted IP returns a Cloudflare 520 error.

Cache

* [Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/) is intended for production use only.
* Purging the production environment purges all environments.

Cache Rules when used with Cloudflare Images

* [Image Resizing](https://developers.cloudflare.com/images/) does not work with the `additional_cacheable_ports` [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/) setting and Zone Versioning.
* If you use `additional_cacheable_ports` with Image Resizing, the image will be resized every time it is requested and will result in low performance.

Cache Response Rules

* [Cache Response Rules](https://developers.cloudflare.com/cache/how-to/cache-response-rules/) do not work with Version Management.

Workers Cache API

* [Workers Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) does not work with Version Management.
* If you use the Workers Cache API with Zone Versioning, you might encounter unexpected caching behaviours.

China Network

* Regardless of the version deployed to production, traffic in China will always target the root zone.
* Other incompatibility issues with Access and ICP licenses.

Cloudflare API

* Version Management does not currently expose a public [API](https://developers.cloudflare.com/api/).
* Customers can only use Version Management through the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

Domain-scoped Roles

* [Domain-scoped Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#domain-scoped-roles) apply only to your root zone.
* Once a new version is created, these roles do not copy over and they lose access to versions.

Image Transformations

* Changes made to [Image Transformations](https://developers.cloudflare.com/images/transform-images/) are not cloned when a new zone version is created.

Network Error Logging

* [Network Error Logging](https://developers.cloudflare.com/network-error-logging/) configurations are not cloned when a new version is created.

Client-side security

* [Client-side security](https://developers.cloudflare.com/client-side-security/) (formerly known as Page Shield) is not available for versioning and is only configurable under your Global Configuration.

Rules

* Version Management does not currently support the following:  
   * [Snippets](https://developers.cloudflare.com/rules/snippets/)  
   * [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/)

Security Insights

* [Security Insights](https://developers.cloudflare.com/security-center/security-insights/) are not shown when Zone Versioning is enabled and the first version is deployed to production.

Terraform

* Version Management does not currently support [Terraform](https://developers.cloudflare.com/terraform/).
* Customers should either use Terraform or Version Management.

WAF Attack Score

* [WAF Attack Score](https://developers.cloudflare.com/waf/detections/attack-score/) configurations are not cloned when a new zone version is created.

Waiting Room

* [Waiting Room](https://developers.cloudflare.com/waiting-room/) users active on the site may be placed back in the queue.
* Waiting Room users in the queue may lose their place in line.
* Traffic may exceed limits.

Wrangler

* If a version has a Worker route, it might disappear when a Worker is deployed via [Wrangler](https://developers.cloudflare.com/workers/wrangler/).
* If two versions have the same custom domains, the Worker might randomly choose between them.

## Requirements

To use Version Management, the following must all be true:

* Your zone is on an Enterprise plan.
* Your zone is in an [active](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) state.
* Your zone uses [WAF managed rules](https://developers.cloudflare.com/waf/managed-rules/).
* Your zone has migrated to use [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of Firewall Rules (deprecated).
* Your account uses the [new WAF ↗](https://blog.cloudflare.com/new-cloudflare-waf/) (if not, contact your account team).
* Your user account must have a Super Administrator or Administrator [role](https://developers.cloudflare.com/fundamentals/manage-members/roles/). **Zone Versioning** roles cannot create new versions.
* Your user account must have an API Key provisioned (if not, [view your API Key](https://developers.cloudflare.com/fundamentals/api/get-started/keys/#view-your-global-api-key)).
* Your user account must have API Access enabled. Refer to [control API Access](https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/) for more information.
* You must use the dashboard to manage versioning.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}}]}
```
