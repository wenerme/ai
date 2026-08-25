---
description: Understand namespaces, repos, and durability.
title: How Artifacts works
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# How Artifacts works

Last updated Apr 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/concepts/how-artifacts-works/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Artifacts creates Git repos on demand. Each repo is an isolated Git service with its own remote URL, tokens, and durable state.

## Core model

Namespaces are the top-level container for repos. A repo lives inside one namespace, and its name is unique within that namespace.

Artifacts does not provision namespaces separately. When you create the first repo with a new namespace name, Artifacts creates that namespace implicitly.

A namespace provides the naming and routing boundary for repos. Together, the namespace and repo name form the repo's stable address, and API responses also return a repo ID.

Like [Durable Objects](https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/), a repo is a single logical instance that Cloudflare can route to from any region.

Because each repo is isolated, it has its own:

* Git history and refs
* access tokens and remote URL
* lifecycle and durable state

Repos can be created as needed. This lets Artifacts model many small units of work across separate repos.

Forking follows the same model. A fork creates a new repo that starts from an existing repo's history, then diverges independently with its own tokens, routing, and lifecycle.

Access is also repo-scoped. Each repo has its own tokens, and each token can be limited to a specific level of access:

* `read` for clone, fetch, pull, indexing, and review
* `write` for push and other mutations

Your Worker or API layer decides when to mint those tokens. That keeps authentication and authorization outside the repo while still making the repo usable from Workers, the REST API, or any standard Git client.

## Durability

Artifacts is durable by default. A repo does not depend on one process staying alive or on one data center staying available.

Behind the scenes, Cloudflare replicates repo data synchronously across multiple data centers and copies it asynchronously to object storage and snapshots. You do not need to build your own replication, failover, or snapshot pipeline to keep repository state available.

Artifacts handles the Git server lifecycle and storage infrastructure underneath these Git workflows.

## Learn more

For repo patterns, refer to [Best practices for Artifacts](https://developers.cloudflare.com/artifacts/concepts/best-practices/). For token behavior, refer to [Git protocol](https://developers.cloudflare.com/artifacts/api/git-protocol/). For product updates, refer to the [Artifacts changelog](https://developers.cloudflare.com/artifacts/platform/changelog/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/concepts/how-artifacts-works/#page","headline":"How Artifacts works · Cloudflare Artifacts docs","description":"Understand namespaces, repos, and durability.","url":"https://developers.cloudflare.com/artifacts/concepts/how-artifacts-works/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
