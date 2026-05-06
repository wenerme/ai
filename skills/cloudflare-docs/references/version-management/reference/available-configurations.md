---
title: Available configurations
description: View which zone configurations support versioning.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/version-management/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Available configurations

When you use Version Management, you can edit various configurations, such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [Cache](https://developers.cloudflare.com/cache/).

Generally, you are allowed to edit all zone-level configurations except for the following:

* [DNS](https://developers.cloudflare.com/dns/)
* [Spectrum](https://developers.cloudflare.com/spectrum/)
* Traffic ([Load Balancing](https://developers.cloudflare.com/load-balancing/), [Waiting Rooms](https://developers.cloudflare.com/waiting-room/), Health Checks, and more)
* [Zero Trust](https://developers.cloudflare.com/cloudflare-one/) and Access policies
* [SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/) (though you can test these with a separate [staging certificates](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/) feature)

Note

For the most up-to-date list of these configurations, start [editing configurations within a version](https://developers.cloudflare.com/version-management/how-to/versions/#change-configurations-in-a-version) in the Cloudflare dashboard.

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

* Changes made to [Image Transformations](https://developers.cloudflare.com/images/optimization/transformations/overview/) are not cloned when a new zone version is created.

Network Error Logging

* [Network Error Logging](https://developers.cloudflare.com/network-error-logging/) configurations are not cloned when a new version is created.

Client-side security

* [Client-side security](https://developers.cloudflare.com/client-side-security/) (formerly known as Page Shield) is not available for versioning and is only configurable under your Global Configuration.

Rules

* Version Management does not currently support the following:  
   * [Snippets](https://developers.cloudflare.com/rules/snippets/)  
   * [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/)

Security Insights

* [Security Insights](https://developers.cloudflare.com/security/security-insights/) are not shown when Zone Versioning is enabled and the first version is deployed to production.

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/reference/available-configurations/","name":"Available configurations"}}]}
```
