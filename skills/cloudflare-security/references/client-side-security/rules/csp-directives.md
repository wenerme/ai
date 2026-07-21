---
description: CSP directives supported by content security rules
title: Supported CSP directives
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

#  Supported CSP directives

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/client-side-security/rules/csp-directives/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Content security rules](https://developers.cloudflare.com/client-side-security/rules/) support most Content Security Policy (CSP) directives, covering both monitored and unmonitored resources. You can use a content security rule to control other types of resources besides scripts and their connections, even though Cloudflare is not monitoring these resources.

Each CSP directive can contain multiple values, including:

* Schemes
* Hostnames
* URIs
* Special keywords between single quotes (for example, `'none'`)
* Hashes between single quotes (for example, `'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC'`)

Hostname and URI values support a `*` wildcard for the leftmost subdomain.

The following table lists the supported CSP directives and special values you can use in content security rules:

| Directive                 | Name in the dashboard     | Supported special values                         | Monitored                                                                                            |
| ------------------------- | ------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| script-src                | Scripts                   | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | [Yes](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/) |
| connect-src               | Connections               | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | [Yes](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/) |
| default-src               | Default                   | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| img-src                   | Images                    | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| style-src                 | Styles                    | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| font-src                  | Fonts                     | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| object-src                | Objects                   | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| media-src                 | Media                     | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| child-src                 | Child                     | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| form-action               | Form actions              | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| worker-src                | Workers                   | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| base-uri                  | Base URI                  | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| manifest-src              | Manifests                 | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| frame-src                 | Frames                    | 'none''self''unsafe-inline''unsafe-eval''<HASH>' | No                                                                                                   |
| frame-ancestors           | Frame ancestors           | 'none''self'                                     | No                                                                                                   |
| upgrade-insecure-requests | Upgrade insecure requests | N/A                                              | No                                                                                                   |

## More resources

For more information on CSP directives and their values, refer to the following resources in the MDN documentation:

* [Content-Security-Policy response header ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)
* [CSP guide ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/rules/csp-directives/#page","headline":"Supported CSP directives · Client-side security docs","description":"CSP directives supported by content security rules","url":"https://developers.cloudflare.com/client-side-security/rules/csp-directives/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","CSP"]}
```
