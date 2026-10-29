---
description: Review Artifacts platform limits.
title: Limits
image: https://developers.cloudflare.com/artifacts/platform/limits/og.png?v=83d5d7f227f0b27c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Oct 28, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/artifacts/platform/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Limits that apply to creating, importing, cloning, and pushing Artifacts are detailed below.

These limits cover naming rules, storage, request rates for control-plane and Git operations, and the size of each push.

| Feature | Limit |
| --- | --- |
| Control-plane request rate | 2,000 requests per 10 seconds per Artifacts namespace |
| Git request rate, per artifact | 2,000 requests per 10 seconds per artifact |
| Maximum storage per repository | 1 GB for repos created on or after 2026-09-29. Repos created earlier have a 10 GB limit. [See size limit change](https://developers.cloudflare.com/changelog/post/2026-09-29-repository-size-limit/). |
| Maximum storage per account | 1 TB (can be raised on request) |
| Maximum number of repositories | Unlimited |
| Maximum number of namespaces | Unlimited |
| Namespace name length | 2–63 characters |
| Namespace and repo names | Start with a letter or digit. Remaining characters may include letters, digits, `.`, `_`, and `-`. |
| Maximum push size | 64 MiB per push. Includes all data sent in the push. Split larger work into several smaller pushes. |
| Maximum objects per push | 50,000 objects, such as file versions, folders, and commits. |
| Maximum file size | 32 MiB per file. Already-compressed files, like images, video, or zip archives, may be rejected slightly below 32 MiB. |
| Maximum ref updates per push | 1 MiB of branch and tag updates per push. |
| Maximum entries per folder | 100,000 files and subfolders in a single folder. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/platform/limits/#page","headline":"Limits","description":"Review Artifacts platform limits.","url":"https://developers.cloudflare.com/artifacts/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/artifacts/platform/limits/og.png?v=83d5d7f227f0b27c","dateModified":"2026-10-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
