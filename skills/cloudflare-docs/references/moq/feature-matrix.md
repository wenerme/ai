---
title: MoQ Feature Matrix
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MoQ Feature Matrix

## Draft-14 Messages

### Supported

| Message                             | Support | Relevant specification                                                                             |
| ----------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| SUBSCRIBE                           | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| UNSUBSCRIBE                         | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS                       | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_CANCEL          | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_OK              | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_ERROR           | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_OK                         | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE                  | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_NAMESPACE\_DONE            | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_DONE                       | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_OK                       | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_ERROR                    | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS\_OK                   | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SETUP\_MESSAGES (client and server) | ✅       | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |

### Unsupported

| Message                     | Support | Relevant specification                                                                             |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| GOAWAY                      | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| MAX\_REQUEST\_ID            | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| REQUESTS\_BLOCKED           | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_UPDATE           | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| PUBLISH\_ERROR              | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH                       | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_OK                   | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_ERROR                | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| FETCH\_CANCEL               | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| TRACK\_STATUS\_ERROR        | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE        | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE\_OK    | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| SUBSCRIBE\_NAMESPACE\_ERROR | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |
| UNSUBSCRIBE\_NAMESPACE      | No      | [draft-ietf-moq-transport-14 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-14) |

## Draft-07 Messages

### Supported

| Message                             | Support | Relevant specification                                                                             |
| ----------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| ANNOUNCE\_OK                        | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| ANNOUNCE\_ERROR                     | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| ANNOUNCE\_CANCEL                    | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE                           | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| UNSUBSCRIBE                         | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| TRACK\_STATUS\_REQUEST              | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| ANNOUNCE                            | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| UNANNOUNCE                          | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE\_OK                       | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE\_ERROR                    | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE\_DONE                     | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| MAX\_SUBSCRIBE\_ID                  | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| TRACK\_STATUS                       | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SETUP\_MESSAGES (client and server) | ✅       | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |

### Unsupported

| Message                     | Support | Relevant specification                                                                             |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| SUBSCRIBE\_UPDATE           | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| GOAWAY                      | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE\_ANNOUNCES        | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE\_ANNOUNCES\_OK    | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| SUBSCRIBE\_ANNOUNCES\_ERROR | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| UNSUBSCRIBE\_ANNOUNCES      | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| FETCH                       | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| FETCH\_OK                   | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| FETCH\_ERROR                | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |
| FETCH\_CANCEL               | No      | [draft-ietf-moq-transport-07 ↗](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-07) |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/moq/","name":"MoQ"}},{"@type":"ListItem","position":3,"item":{"@id":"/moq/feature-matrix/","name":"MoQ Feature Matrix"}}]}
```
