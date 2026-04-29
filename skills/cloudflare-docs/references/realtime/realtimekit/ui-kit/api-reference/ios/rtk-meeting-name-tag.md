---
title: RtkMeetingNameTag
description: API reference for RtkMeetingNameTag component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingNameTag

A name tag view that displays the participant name and a microphone status icon. Automatically updates when the participant's audio state changes.

## Initializer parameters

| Parameter   | Type                  | Required | Default | Description                                          |
| ----------- | --------------------- | -------- | ------- | ---------------------------------------------------- |
| meeting     | RealtimeKitClient     | ✅        | \-      | The RealtimeKit client instance                      |
| participant | RtkMeetingParticipant | ✅        | \-      | The participant whose name and mic status to display |
| appearance  | RtkNameTagAppearance  | ❌        | \-      | Appearance configuration for the name tag            |

## Methods

| Method            | Return Type | Description                                             |
| ----------------- | ----------- | ------------------------------------------------------- |
| set(participant:) | Void        | Updates the name tag to display a different participant |
| refresh()         | Void        | Refreshes the name and microphone status display        |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let nameTag = RtkMeetingNameTag(

    meeting: rtkClient,

    participant: participant

)

view.addSubview(nameTag)


```

### Update participant

Swift

```

import RealtimeKitUI


let nameTag = RtkMeetingNameTag(

    meeting: rtkClient,

    participant: participant

)

view.addSubview(nameTag)


// Switch to a different participant

nameTag.set(participant: newParticipant)

nameTag.refresh()


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-name-tag/","name":"RtkMeetingNameTag"}}]}
```
