---
description: Error codes returned by the Artifacts REST API and Workers binding.
title: Errors
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

Last updated May 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/artifacts/api/errors/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This is a list of Artifacts errors.

## Error codes

| Name | Code | Description |
| --- | --- | --- |
| `ALREADY_EXISTS` | 10201 | The target repository already exists in the namespace. |
| `NOT_FOUND` | 10200 | The repository or remote resource does not exist. |
| `IMPORT_IN_PROGRESS` | 10302 | The repository is still being imported and is not yet available. |
| `FORK_IN_PROGRESS` | 10303 | The repository is still being forked and is not yet available. |
| `INVALID_INPUT` | 10100 | A request parameter is missing, malformed, or outside the accepted range. |
| `INVALID_REPO_NAME` | 10101 | The repository name does not meet naming requirements. |
| `INVALID_TTL` | 10103 | The token TTL is outside the allowed range (60–31,536,000 seconds). |
| `INVALID_URL` | 10104 | The source URL does not point to a valid git repository. |
| `REMOTE_AUTH_REQUIRED` | 10106 | The remote repository requires authentication. |
| `UPSTREAM_UNAVAILABLE` | 10401 | The remote git server could not be reached. |
| `MEMORY_LIMIT` | 10402 | The operation exceeds service memory limits. |
| `INTERNAL_ERROR` | 10400 | An unexpected internal error occurred. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/api/errors/#page","headline":"Errors · Artifacts · Cloudflare Artifacts docs","description":"Error codes returned by the Artifacts REST API and Workers binding.","url":"https://developers.cloudflare.com/artifacts/api/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
