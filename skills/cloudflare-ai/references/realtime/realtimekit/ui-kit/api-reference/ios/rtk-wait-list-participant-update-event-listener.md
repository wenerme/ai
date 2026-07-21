---
description: API reference for RtkWaitListParticipantUpdateEventListener component (iOS Library)
title: RtkWaitListParticipantUpdateEventListener
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkWaitListParticipantUpdateEventListener

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-wait-list-participant-update-event-listener/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A helper class for listening to waitlist participant events. Provides callbacks for join, remove, accept, and reject events, and methods for managing waitlist requests.

## Initializer parameters

| Parameter | Type              | Required | Default | Description                     |
| --------- | ----------------- | -------- | ------- | ------------------------------- |
| rtkClient | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance |

## Callback properties

| Property                             | Type          | Required | Default | Description                                            |
| ------------------------------------ | ------------- | -------- | ------- | ------------------------------------------------------ |
| participantJoinedCompletion          | (() -> Void)? | ❌        | nil     | Called when a participant joins the waitlist           |
| participantRemovedCompletion         | (() -> Void)? | ❌        | nil     | Called when a participant is removed from the waitlist |
| participantRequestAcceptedCompletion | (() -> Void)? | ❌        | nil     | Called when a waitlist request is accepted             |
| participantRequestRejectCompletion   | (() -> Void)? | ❌        | nil     | Called when a waitlist request is rejected             |

## Methods

| Method                             | Return Type | Description                                              |
| ---------------------------------- | ----------- | -------------------------------------------------------- |
| acceptWaitingRequest(participant:) | Void        | Accepts a participant's waitlist request                 |
| rejectWaitingRequest(participant:) | Void        | Rejects a participant's waitlist request                 |
| clean()                            | Void        | Removes all registered listeners and cleans up resources |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let waitlistListener = RtkWaitListParticipantUpdateEventListener(
    rtkClient: rtkClient
)

waitlistListener.participantJoinedCompletion = {
    print("New participant in waitlist")
}

waitlistListener.participantRemovedCompletion = {
    print("Participant removed from waitlist")
}
```

### Accept or reject requests

```swift
import RealtimeKitUI

let waitlistListener = RtkWaitListParticipantUpdateEventListener(
    rtkClient: rtkClient
)

// Accept a waiting participant
waitlistListener.acceptWaitingRequest(participant: waitingParticipant)

// Reject a waiting participant
waitlistListener.rejectWaitingRequest(participant: waitingParticipant)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-wait-list-participant-update-event-listener/#page","headline":"RtkWaitListParticipantUpdateEventListener · Cloudflare Realtime docs","description":"API reference for RtkWaitListParticipantUpdateEventListener component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-wait-list-participant-update-event-listener/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
