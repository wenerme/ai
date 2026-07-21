---
description: Definitions for terms used across Cloudflare bot solutions documentation.
title: Glossary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

#  Glossary

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/bots/glossary/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Review the definitions for terms used across Cloudflare's Bots documentation.

| Term                       | Definition                                                                                                                                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bot                        | A software application programmed to do tasks that can be used for good (chatbots, search engine crawlers) or for evil (inventory hoarding, credential stuffing).                                               |
| bot score                  | A score from 1 to 99 that indicates how likely that request came from a bot, in which 1 to 29 is likely automated and 30 to 99 is likely human.                                                                 |
| bot tags                   | Additional information about a bot request, such as why Cloudflare has given it a bot score and whether the request came from a verified bot or a category of verified bots.                                    |
| Challenge solve rate (CSR) | The percentage of issued challenges that were solved.                                                                                                                                                           |
| detection ID               | Static rules that are used to detect predictable bot behavior with no overlap with human traffic.                                                                                                               |
| direct                     | A label applied to a verified bot or agent operated by a single, narrow operator, usually on the operator's own infrastructure. Replaces the standalone "verified bot" classification used before July 1, 2026. |
| intermediary               | A label applied to a verified agent that a wide range of end users can operate, such as a browser-use or agentic service. Replaces the "signed agent" classification used before July 1, 2026.                  |
| JA3 fingerprint            | JA3 and JA4 fingerprints profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.                                                                                       |
| signed agent               | A deprecated classification (retired July 1, 2026) for end-user-controlled agents that self-identify with Web Bot Auth. These agents are now verified bots labeled as intermediary.                             |
| verified bot               | A bot or agent that Cloudflare has confirmed is transparent about who it is and what it does: it represents itself honestly and does not abuse the access that honesty earns.                                   |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/glossary/#page","headline":"Glossary · Cloudflare bot solutions docs","description":"Definitions for terms used across Cloudflare bot solutions documentation.","url":"https://developers.cloudflare.com/bots/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
