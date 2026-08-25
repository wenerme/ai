---
description: Understand Cloudflare's SDK lifecycle stages, supported language runtimes, and ecosystem support commitments.
title: SDK ecosystem support policy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK ecosystem support policy

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/reference/sdk-ecosystem-support-policy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Lifecycle

Unless otherwise stated in the code repository, Cloudflare only provides active support for the latest major version of a library or tool. The exception to this policy is for critical security fixes, which will be reviewed on a case-by-case basis and take the vulnerability, impact, and mitigation required into consideration.

We provide three primary stages of development: early access, active support, and end of life.

Note

These lifecycle stages may be referred to in different terms across Cloudflare products, but the underlying principles are the same.

### Early access

During this stage, Cloudflare makes SDK changes available that we are seeking feedback on prior to releasing for general usage. Early access will often include warning labels or caveats on functionality that is subject to change without notice. In general, early access SDKs are not suitable for production systems unless explicitly mentioned.

### Active support

During the active support stage, planned changes and support are offered for the library or tool.

### End of life

During the end of life stage, a new major version of the library or tool is released and Cloudflare marks the previous major version as no longer receiving improvements or bug fixes. If you continue to run end of life versions, support will be very limited.

![All lifecycle stages and their relation to one another](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2228,height=812,format=webp/_astro/support-policy.ClhHS_PO.png "All lifecycle stages and their relation to one another")

All lifecycle stages and their relation to one another

## Previous or end of life versions

While Cloudflare cannot provide support for all older versions of our libraries or tools, we do not remove those versions so they can continued to be used without direct support.

## Versioning

The SDK ecosystem follows semantic versioning, which defines versions as follows:

* MAJOR version when there are backward-incompatible changes made.
* MINOR version when functionality is added in a backward compatible-manner.
* PATCH version for backward-compatible bug fixes (without any improvements).

Caution

As Cloudflare has recently swapped to [automatically generating our libraries using OpenAPI ↗](https://blog.cloudflare.com/lessons-from-building-an-automated-sdk-pipeline), we have relaxed the strict versioning requirements on the libraries (Terraform is not changing). Minor releases _may_ contain breaking changes in the forms of method, structure, or type renames as the service owners stabilize their schemas and iterate on usability improvements.

If this is not suitable for your use case, pin to a known good version or use the previous major version of the library.

Depending on your needs, you should ensure your application's package manager versioning is configured correctly. At a minimum, restrict installation to the current major version of the library or tool you are using to prevent any major version upgrades occurring automatically.

## Migration

Where possible, Cloudflare provides an automated approach to performing major version upgrades to limit the disruption using codemods. Review the library or tool-specific release notes for how to use these migration tools.

Alongside the automatic migration approach, we provide documentation on the changes that have taken place in case you need to make the changes manually.

## Related resources

* [Semantic versioning definitions ↗](https://semver.org/)
* [Cloudflare's Terraform documentation](https://developers.cloudflare.com/terraform/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/sdk-ecosystem-support-policy/#page","headline":"SDK ecosystem support policy · Cloudflare Fundamentals docs","description":"Understand Cloudflare's SDK lifecycle stages, supported language runtimes, and ecosystem support commitments.","url":"https://developers.cloudflare.com/fundamentals/reference/sdk-ecosystem-support-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
