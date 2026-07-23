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

Last updated May 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/api/errors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This is a list of Artifacts errors.

## Error codes

| Name                   | Code  | Description                                                               |
| ---------------------- | ----- | ------------------------------------------------------------------------- |
| ALREADY\_EXISTS        | 10201 | The target repository already exists in the namespace.                    |
| NOT\_FOUND             | 10200 | The repository or remote resource does not exist.                         |
| IMPORT\_IN\_PROGRESS   | 10302 | The repository is still being imported and is not yet available.          |
| FORK\_IN\_PROGRESS     | 10303 | The repository is still being forked and is not yet available.            |
| INVALID\_INPUT         | 10100 | A request parameter is missing, malformed, or outside the accepted range. |
| INVALID\_REPO\_NAME    | 10101 | The repository name does not meet naming requirements.                    |
| INVALID\_TTL           | 10103 | The token TTL is outside the allowed range (60–31,536,000 seconds).       |
| INVALID\_URL           | 10104 | The source URL does not point to a valid git repository.                  |
| REMOTE\_AUTH\_REQUIRED | 10106 | The remote repository requires authentication.                            |
| UPSTREAM\_UNAVAILABLE  | 10401 | The remote git server could not be reached.                               |
| MEMORY\_LIMIT          | 10402 | The operation exceeds service memory limits.                              |
| INTERNAL\_ERROR        | 10400 | An unexpected internal error occurred.                                    |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/api/errors/#page","headline":"Errors · Artifacts · Cloudflare Artifacts docs","description":"Error codes returned by the Artifacts REST API and Workers binding.","url":"https://developers.cloudflare.com/artifacts/api/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
