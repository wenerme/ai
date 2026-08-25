---
title: RTKPolls
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKPolls

Last updated Jul 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpolls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The RTKPolls module consists of the polls that have been created in the meeting.

* [RTKPolls](#module%5FRTKPolls)
  * [.items](#module%5FRTKPolls+items)
  * [.create(question, options, anonymous, hideVotes)](#module%5FRTKPolls+create)
  * [.vote(pollId, index)](#module%5FRTKPolls+vote)

### meeting.polls.items

An array of poll items.

**Kind**: instance property of [RTKPolls](#module%5FRTKPolls)

### meeting.polls.create(question, options, anonymous, hideVotes)

Creates a poll in the meeting.

**Kind**: instance method of [RTKPolls](#module%5FRTKPolls)

| Param     | Default | Description                                |
| --------- | ------- | ------------------------------------------ |
| question  |         | The question that is to be voted for.      |
| options   |         | The options of the poll.                   |
| anonymous | false   | If true, the poll votes are anonymous.     |
| hideVotes | false   | If true, the votes on the poll are hidden. |

### meeting.polls.vote(pollId, index)

Casts a vote on an existing poll.

**Kind**: instance method of [RTKPolls](#module%5FRTKPolls)

| Param  | Description                                |
| ------ | ------------------------------------------ |
| pollId | The ID of the poll that is to be voted on. |
| index  | The index of the option.                   |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpolls/#page","headline":"RTKPolls · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpolls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
