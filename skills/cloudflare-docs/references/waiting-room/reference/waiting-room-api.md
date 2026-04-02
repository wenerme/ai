---
title: API commands
description: Cloudflare Waiting Room redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waiting-room/reference/waiting-room-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# API commands

Cloudflare Waiting Room redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.

The [Cloudflare Waiting Room API](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/list/) provides an interface for programmatically managing waiting rooms.

## Request URL format

To invoke a [Cloudflare Waiting Room API](https://developers.cloudflare.com/api/resources/waiting%5Frooms/methods/list/) operation, append the endpoint to the Cloudflare API base URL:

Terminal window

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/waiting-room/reference/waiting-room-api/","name":"API commands"}}]}
```
