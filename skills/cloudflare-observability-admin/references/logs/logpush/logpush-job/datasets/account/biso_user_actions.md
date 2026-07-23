---
description: The descriptions below detail the fields available for biso_user_actions.
title: Browser Isolation User Actions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser Isolation User Actions

Last updated Jun 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/biso%5Fuser%5Factions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `biso_user_actions`.

## AccountID

Type: `string`

The Cloudflare account ID.

## Decision

Type: `string`

The decision applied ('allow' or 'block').

## DomainName

Type: `string`

The domain name in the URL.

## Metadata

Type: `string`

Additional information specific to a user action (JSON string).

## Timestamp

Type: `int or string`

The date and time.

## Type

Type: `string`

The user action type (for example, 'copy', 'paste', 'download').

## URL

Type: `string`

The URL of the webpage where a user action was performed.

## UserEmail

Type: `string`

The user email.

## UserID

Type: `string`

The user ID.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/biso_user_actions/#page","headline":"Browser Isolation User Actions · Cloudflare Logs docs","description":"The descriptions below detail the fields available for biso_user_actions.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/biso_user_actions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
