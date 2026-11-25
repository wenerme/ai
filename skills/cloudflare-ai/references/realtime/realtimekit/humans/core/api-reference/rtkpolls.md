---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
title: RTKPolls
image: https://developers.cloudflare.com/realtime/realtimekit/humans/core/api-reference/rtkpolls/og.png?v=a61501c560f8eb70
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKPolls

The RTKPolls module consists of the polls that have been created in the meeting.

- [RTKPolls](#module_RTKPolls)
  - [.items](#module_RTKPolls+items)
  - [.create(question, options, anonymous, hideVotes)](#module_RTKPolls+create)
  - [.vote(pollId, index)](#module_RTKPolls+vote)

### meeting.polls.items

An array of poll items.

**Kind**: instance property of [`RTKPolls`](#module_RTKPolls)

### meeting.polls.create(question, options, anonymous, hideVotes)

Creates a poll in the meeting.

**Kind**: instance method of [`RTKPolls`](#module_RTKPolls)

| Param | Default | Description |
| --- | --- | --- |
| question |  | The question that is to be voted for. |
| options |  | The options of the poll. |
| anonymous | `false` | If true, the poll votes are anonymous. |
| hideVotes | `false` | If true, the votes on the poll are hidden. |

### meeting.polls.vote(pollId, index)

Casts a vote on an existing poll.

**Kind**: instance method of [`RTKPolls`](#module_RTKPolls)

| Param | Description |
| --- | --- |
| pollId | The ID of the poll that is to be voted on. |
| index | The index of the option. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/api-reference/rtkpolls/#page","headline":"RTKPolls","url":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/api-reference/rtkpolls/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/humans/core/api-reference/rtkpolls/og.png?v=a61501c560f8eb70","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
