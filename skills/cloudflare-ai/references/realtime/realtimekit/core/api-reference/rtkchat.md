---
title: RTKChat
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKChat

Last updated Jul 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkchat/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This is the chat module, which can be used to send and receive messages from the meeting.

- [RTKChat](#module_RTKChat)
  - ~~ [.messages](#module_RTKChat+messages)~~
  - [.setMaxTextLimit(limit)](#module_RTKChat+setMaxTextLimit)
  - [.updateRateLimits(num, period)](#module_RTKChat+updateRateLimits)
  - [.sendTextMessage(message, \[peerIds\])](#module_RTKChat+sendTextMessage)
  - [.sendCustomMessage(message, \[peerIds\])](#module_RTKChat+sendCustomMessage)
  - [.sendImageMessage(image, \[peerIds\])](#module_RTKChat+sendImageMessage)
  - [.sendFileMessage(file, \[peerIds\])](#module_RTKChat+sendFileMessage)
  - [.sendMessage(message, \[participantIds\])](#module_RTKChat+sendMessage)
  - [.editTextMessage(messageId, message)](#module_RTKChat+editTextMessage)
  - [.editImageMessage(messageId, image)](#module_RTKChat+editImageMessage)
  - [.editFileMessage(messageId, file)](#module_RTKChat+editFileMessage)
  - [.editMessage(messageId, message)](#module_RTKChat+editMessage)
  - [.deleteMessage(messageId)](#module_RTKChat+deleteMessage)
  - [.pin(id)](#module_RTKChat+pin)
  - [.unpin(id)](#module_RTKChat+unpin)
  - [.fetchPublicMessages(options)](#module_RTKChat+fetchPublicMessages)
  - [.fetchPrivateMessages(options)](#module_RTKChat+fetchPrivateMessages)
  - [.fetchPinnedMessages(options)](#module_RTKChat+fetchPinnedMessages)

### ~~meeting.chat.messages~~

***Deprecated***

**Kind**: instance property of [`RTKChat`](#module_RTKChat)

### meeting.chat.setMaxTextLimit(limit)

Set the max character limit of a text message

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| limit | `number` | Max character limit for a text message. |

### meeting.chat.updateRateLimits(num, period)

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type |
| --- | --- |
| num | `number` |
| period | `number` |

### meeting.chat.sendTextMessage(message, \[peerIds])

Sends a chat text message to the room.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | The message that must be sent to the room. |
| \[peerIds] | `Array.<string>` | Peer ids to send the message to. |

### meeting.chat.sendCustomMessage(message, \[peerIds])

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| message | `CustomMessagePayload` | Custom message payload. |
| \[peerIds] | `Array.<string>` | Peer ids to send the message to. |

### meeting.chat.sendImageMessage(image, \[peerIds])

Sends an image message to the meeting.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| image | `File` \| `ReactNativeFile` | The image that is to be sent. |
| \[peerIds] | `Array.<string>` | Peer ids to send the message to. |

### meeting.chat.sendFileMessage(file, \[peerIds])

Sends a file to the meeting.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| file | `File` \| `ReactNativeFile` | A File object. |
| \[peerIds] | `Array.<string>` | Peer ids to send the message to. |

### meeting.chat.sendMessage(message, \[participantIds])

Sends a message to the meeting. This method can be used to send text, image, or file messages. The message type is determined by the key 'type' in `message` object.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| message | `MessagePayload` | An object including the type and content of the message. |
| \[participantIds] | `Array.<string>` | An array including the userIds of the participants. |

### meeting.chat.editTextMessage(messageId, message)

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| messageId | `string` | Id of the message to edit. |
| message | `string` | Updated text message. |

### meeting.chat.editImageMessage(messageId, image)

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| messageId | `string` | Id of the message to edit. |
| image | `File` \| `ReactNativeFile` | Updated image file. |

### meeting.chat.editFileMessage(messageId, file)

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| messageId | `string` | Id of the message to edit. |
| file | `File` \| `ReactNativeFile` | Updated file. |

### meeting.chat.editMessage(messageId, message)

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| messageId | `string` | Id of the message to edit. |
| message | `MessagePayload` | Updated message payload. |

### meeting.chat.deleteMessage(messageId)

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| messageId | `string` | Id of the message to delete. |

### meeting.chat.pin(id)

Pins a chat message

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| id | `string` | ID of the message to be pinned |

### meeting.chat.unpin(id)

Unpins a chat message

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| id | `string` | ID of the message to be unpinned |

### meeting.chat.fetchPublicMessages(options)

Fetches messages from the chat with pagination.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| options | `FetchMessageOptions` | Configuration options for fetching messages, including timestamp, limit, and direction for pagination. |

### meeting.chat.fetchPrivateMessages(options)

Fetches private messages between the current user and another participant with pagination.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| options | `FetchPrivateMessagesOptions` | Configuration options for fetching private messages, including private RTKChat ID (User ID of the participant) and pagination settings. |

### meeting.chat.fetchPinnedMessages(options)

Fetches pinned messages with pagination.

**Kind**: instance method of [`RTKChat`](#module_RTKChat)

| Param | Type | Description |
| --- | --- | --- |
| options | `FetchMessageOptions` | Configuration options for fetching pinned messages, including timestamp, limit, and direction. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkchat/#page","headline":"RTKChat · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkchat/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
