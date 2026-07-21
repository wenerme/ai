---
description: API commands for managing waiting rooms.
title: API commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waiting-room/llms.txt
> Use this file to discover all available pages before exploring further.

#  API commands

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/waiting-room/reference/waiting-room-api/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare Waiting Room redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.

The [Cloudflare Waiting Room API](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/list/) provides an interface for programmatically managing waiting rooms.

## Request URL format

To invoke a [Cloudflare Waiting Room API](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/list/) operation, append the endpoint to the Cloudflare API base URL:

```shell
https://api.cloudflare.com/client/v4
```

For authentication instructions, refer to [Getting Started: Requests](https://developers.cloudflare.com/fundamentals/api/) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://developers.cloudflare.com/fundamentals/api/).

## Manage your waiting room

| Operation                                                                                              | Method + URL stub                                             | Notes                              |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| [List waiting rooms](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/list/)    | GET zones/{:zone\_identifier}/waiting\_rooms                  | List all waiting rooms for a zone. |
| [Create waiting room](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/create/) | POST zones/{:zone\_identifier}/waiting\_rooms                 | Create a waiting room.             |
| [Waiting room details](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/get/)   | GET zones/{:zone\_identifier}/waiting\_rooms/{:identifier}    | Fetch a waiting room.              |
| [Update waiting room](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/update/) | PUT zones/{:zone\_identifier}/waiting\_rooms/{:identifier}    | Update a waiting room.             |
| [Delete waiting room](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/delete/) | DELETE zones/{:zone\_identifier}/waiting\_rooms/{:identifier} | Delete a waiting room.             |
| [Patch waiting room](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/edit/)    | PATCH zones/{:zone\_identifier}/waiting\_rooms/{:identifier}  | Patch a configured waiting room.   |

## Fetch the current status of a waiting room

| Operation                                                                                                                                      | Method + URL stub                                                 | Notes                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Get the current status of a waiting room](https://developers.cloudflare.com/api/resources/waiting%5Frooms/subresources/statuses/methods/get/) | GET zones/{:zone\_identifier}/waiting\_rooms/{:identifier}/status | Returns queueing if the queue is activated (clients are put in the waiting room).Returns not\_queueing if the queue is not activated or if the waiting room is suspended. |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waiting-room/reference/waiting-room-api/#page","headline":"API commands · Cloudflare Waiting Room docs","description":"API commands for managing waiting rooms.","url":"https://developers.cloudflare.com/waiting-room/reference/waiting-room-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
