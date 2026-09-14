---
description: View which zone configurations support versioning.
title: Available configurations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/version-management/llms.txt
> Use this file to discover all available pages before exploring further.

# Available configurations

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/version-management/reference/available-configurations/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When you use Version Management, you can edit various configurations, such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [Cache](https://developers.cloudflare.com/cache/).

Generally, you are allowed to edit all zone-level configurations except for the following:

- [DNS](https://developers.cloudflare.com/dns/)
- [Spectrum](https://developers.cloudflare.com/spectrum/)
- Traffic ([Load Balancing](https://developers.cloudflare.com/load-balancing/), [Waiting Rooms](https://developers.cloudflare.com/waiting-room/), Health Checks, and more)
- [Zero Trust](https://developers.cloudflare.com/cloudflare-one/) and Access policies
- [SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/) (though you can test these with a separate [staging certificates](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/) feature)

Note

For the most up-to-date list of these configurations, start [editing configurations within a version](https://developers.cloudflare.com/version-management/how-to/versions/#change-configurations-in-a-version) in the Cloudflare dashboard.

## Limitations

Version Management does not currently support or have limited support for the following products or features:

<details>

<summary>

API Shield

</summary>

- Some <a href="https://developers.cloudflare.com/api-shield/">API Shield</a> configurations are not cloned when a new zone version is created.
- Customers are allowed to opt-in to remove the UI block that prevents enabling Version Management.

</details>

<details>

<summary>

Authenticated Origin Pull

</summary>

- <a href="https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/">Authenticated Origin Pull</a> does not work with Zone Versioning.
- Accessing your domain from an allowlisted IP returns a Cloudflare 520 error.

</details>

<details>

<summary>

Cache

</summary>

- <a href="https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/">Cache Reserve</a> is intended for production use only.
- Purging the production environment purges all environments.

</details>

<details>

<summary>

Cache Rules when used with Cloudflare Images

</summary>

- <a href="https://developers.cloudflare.com/images/">Image Resizing</a> does not work with the <code>additional_cacheable_ports</code> <a href="https://developers.cloudflare.com/cache/how-to/cache-rules/">Cache Rule</a> setting and Zone Versioning.
- If you use <code>additional_cacheable_ports</code> with Image Resizing, the image will be resized every time it is requested and will result in low performance.

</details>

<details>

<summary>

Workers Cache API

</summary>

- <a href="https://developers.cloudflare.com/workers/runtime-apis/cache/">Workers Cache API</a> does not work with Version Management.
- If you use the Workers Cache API with Zone Versioning, you might encounter unexpected caching behaviours.

</details>

<details>

<summary>

China Network

</summary>

- Regardless of the version deployed to production, traffic in China will always target the root zone.
- Other incompatibility issues with Access and ICP licenses.

</details>

<details>

<summary>

Cloudflare API

</summary>

- Version Management environments — including their routing expressions and version assignments — can be managed through the public <a href="https://developers.cloudflare.com/api/resources/zones/subresources/environments/">Environments API</a>.
- Creating, cloning, and editing zone versions (the configuration snapshots themselves) are currently only available through the <a href="https://dash.cloudflare.com/">Cloudflare dashboard ↗</a>.

</details>

<details>

<summary>

Domain-scoped Roles

</summary>

- <a href="https://developers.cloudflare.com/fundamentals/manage-members/roles/#domain-scoped-roles">Domain-scoped Roles</a> apply only to your root zone.
- Once a new version is created, these roles do not copy over and they lose access to versions.

</details>

<details>

<summary>

Image Transformations

</summary>

- Changes made to <a href="https://developers.cloudflare.com/images/optimization/transformations/overview/">Image Transformations</a> are not cloned when a new zone version is created.

</details>

<details>

<summary>

Network Error Logging

</summary>

- <a href="https://developers.cloudflare.com/network-error-logging/">Network Error Logging</a> configurations are not cloned when a new version is created.

</details>

<details>

<summary>

Client-side security

</summary>

- <a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> (formerly known as Page Shield) is not available for versioning and is only configurable under your Global Configuration.

</details>

<details>

<summary>

Rules

</summary>

- Version Management does not currently support the following:
  - <a href="https://developers.cloudflare.com/rules/snippets/">Snippets</a>
  - <a href="https://developers.cloudflare.com/rules/compression-rules/">Compression Rules</a>

</details>

<details>

<summary>

Security Insights

</summary>

- <a href="https://developers.cloudflare.com/security/security-insights/">Security Insights</a> are not shown when Zone Versioning is enabled and the first version is deployed to production.

</details>

<details>

<summary>

Terraform

</summary>

- Version Management does not currently support <a href="https://developers.cloudflare.com/terraform/">Terraform</a>.
- Customers should either use Terraform or Version Management.

</details>

<details>

<summary>

WAF Attack Score

</summary>

- <a href="https://developers.cloudflare.com/waf/detections/attack-score/">WAF Attack Score</a> configurations are not cloned when a new zone version is created.

</details>

<details>

<summary>

Waiting Room

</summary>

- <a href="https://developers.cloudflare.com/waiting-room/">Waiting Room</a> users active on the site may be placed back in the queue.
- Waiting Room users in the queue may lose their place in line.
- Traffic may exceed limits.

</details>

<details>

<summary>

Wrangler

</summary>

- If a version has a Worker route, it might disappear when a Worker is deployed via <a href="https://developers.cloudflare.com/workers/wrangler/">Wrangler</a>.
- If two versions have the same custom domains, the Worker might randomly choose between them.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/version-management/reference/available-configurations/#page","headline":"Available configurations · Cloudflare Version Management docs","description":"View which zone configurations support versioning.","url":"https://developers.cloudflare.com/version-management/reference/available-configurations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
