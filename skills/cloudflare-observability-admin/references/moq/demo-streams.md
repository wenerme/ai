---
description: Subscribe to long-running MoQ demo streams using draft-14 or draft-16.
title: Demo streams
image: https://developers.cloudflare.com/moq/demo-streams/og.png?v=0984ff2423dcf4e1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# Demo streams

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/moq/demo-streams/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare publishes long-running streams on the public [MoQ](https://developers.cloudflare.com/moq/) relays. Use these streams to test client implementations without setting up your own publisher.

## Available namespaces

The relays host the following namespaces. A check mark indicates that a namespace is available for that draft.

| Namespace | Draft-14 | Draft-16 |
| --- | --- | --- |
| `/bbb` | ✅ | ✅ |
| `/demo-tos-360p` | ✅ | — |
| `/demo-tos-720p` | ✅ | — |
| `/demo-tos-1080p` | ✅ | — |
| `/demo-tos-4k` | ✅ | — |

## Subscribe with moq-sub

`moq-sub` from the [moq-rs ↗︎](https://github.com/cloudflare/moq-rs) project writes the media as fragmented MP4 to standard output. Select a draft to view the matching command.

Draft-14 supports every namespace in the table. This example subscribes to `/bbb`:

```sh
moq-sub https://draft-14.cloudflare.mediaoverquic.com --name bbb
```

Draft-16 supports only `/bbb`. Its relay URL includes the provided JSON Web Token (JWT):

```sh
moq-sub https://draft-16.cloudflare.mediaoverquic.com/eyJhbGciOiJFZERTQSIsImtpZCI6Im1vcS12MSIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtb3EuY2xvdWRmbGFyZS5jb20iLCJleHAiOjE4MTY0NDA0NTcsImlhdCI6MTc4NDkwNDQ1OCwiaXNzIjoiY2xvdWRmbGFyZSIsImp0aSI6IjgxMTc4MjIyZmIzNTVjMDQ3YmM0MDNkODQ2NWI0YWIzIiwib3BlcmF0aW9ucyI6WyJzdWJzY3JpYmUiXSwic3ViIjoiZWJkMWZlZDdhZjMzNzYzMjc3MDc0ODQ0NThmYWIxZmEifQ.VlTscBfWmjSybWx1NpmF0f1g5Gtfxg5H4rkUQQa2JHATtjGwO5iwl71DAS5kJ98-3ukPvmGe9RE7peYs_dqgCg --name bbb
```

The provided JWT lets you subscribe without provisioning a relay or creating a token.

To play the stream with `ffplay`, append `| ffplay -` to either command.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/moq/demo-streams/#page","headline":"Demo streams","description":"Subscribe to long-running MoQ demo streams using draft-14 or draft-16.","url":"https://developers.cloudflare.com/moq/demo-streams/","inLanguage":"en","image":"https://developers.cloudflare.com/moq/demo-streams/og.png?v=0984ff2423dcf4e1","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
