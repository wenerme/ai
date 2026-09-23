---
description: Send application messages, telemetry, and authorized controls through Realtime SFU DataChannels.
title: DataChannels
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# DataChannels

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/features/datachannels/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use DataChannels for application messages such as chat, sensor updates, and control events. Use media tracks for standard audio and video transport.

A publisher creates a named channel. Multiple subscribers can receive its messages, and one selected subscriber can reply on that publisher channel.

**Publisher**

Messages

Replies

Cloudflare**Realtime SFU**

Messages

Messages

Authorized replies

**Subscribers**

**Selected subscriber**

PublisherMessages →Realtime SFU

Realtime SFUMessages →Subscribers

Realtime SFUMessages →Selected subscriber

Selected subscriberAuthorized replies →Realtime SFU

Realtime SFUReplies →Publisher

Your backend makes authenticated SFU API calls. Browser and native endpoints own the corresponding WebRTC channels. Refer to [application architecture](https://developers.cloudflare.com/realtime/sfu/concepts/architecture/) for the credential and signaling boundary.

To connect two endpoints and send a first message, follow the complete [message recipe](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/#send-messages-between-two-endpoints). Transport setup connects each endpoint to the SFU. Application-channel allocation selects the named messages to publish or receive.

## Add an application channel

Start with a publisher and subscriber whose DataChannel transports are already connected. Each has its own SFU session and PeerConnection. These steps add a channel without repeating transport setup.

1. On your backend, call `POST /apps/{appId}/sessions/{publisherSessionId}/datachannels/new`. In the request's `dataChannels` array, add an entry with `location: "local"` and the chosen `dataChannelName`. Check the publication result and retain the successful allocation before subscribing.
2. On the subscriber's session, call `POST /apps/{appId}/sessions/{subscriberSessionId}/datachannels/new`. Its `dataChannels` entry uses `location: "remote"`, the publisher's `sessionId`, and the same `dataChannelName`. Check the subscription result and retain its successful allocation.
3. Return each channel's `id` to its own endpoint as `channelId`. Create its browser channel with `pc.createDataChannel(name, { negotiated: true, id: channelId })`. Publisher and subscriber IDs can differ. This configuration uses reliable, ordered delivery by default.
4. Install the subscriber's message handler and wait for the channels to open. Have the subscriber report readiness through your application before the publisher sends a message. Confirm that the subscriber receives it.

To allocate several channels on a session, [batch their entries](https://developers.cloudflare.com/realtime/sfu/api/#batch-resource-operations) in one create request. Keep that request all local publications or all remote subscriptions.

For other delivery settings, configure each endpoint's API allocation and browser channel as described next. Follow [per-session mutation ordering](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#serialize-mutations-per-session) throughout the operation. The [Connection API](https://developers.cloudflare.com/realtime/sfu/api/) supplies authentication and complete request schemas.

## Configure message delivery

The publisher chooses one delivery policy for each named channel: `ordered`, `maxRetransmits`, and `maxPacketLifeTime`. Every subscriber must mirror that policy in its API request, and each endpoint configures its browser DataChannel with the same settings.

Channels in the same session or application can use different policies. Publish separate named channels for different policies, such as reliable `commands` and unreliable `player-state`. Asymmetric reliability between a publisher and its subscribers is outside the supported contract.

DataChannels use reliable, ordered delivery by default. Choose a policy for the messages on each channel:

| Payload | Example settings | Reason |
| --- | --- | --- |
| Discrete commands or text | `ordered: true`, no retransmission limit | Preserve the message sequence |
| Independent messages that all matter | `ordered: false`, no retransmission limit | Permit reordering while retaining retransmission |
| Replaceable state or pointer movement | `ordered: false`, `maxRetransmits: 0` | Allow old updates to be lost |

The optional delivery fields are:

| Field | Meaning |
| --- | --- |
| `ordered` | Omitted means `true`. Set to `false` to allow delivery out of order. |
| `maxRetransmits` | Maximum retransmission attempts after the initial send. Set to zero for no retransmissions. |
| `maxPacketLifeTime` | Transport time budget in milliseconds for attempting transmission and retransmission of a message. |

Set at most one of `maxRetransmits` and `maxPacketLifeTime`. Omit both for reliable delivery. Omitting a retry limit is different from setting `maxRetransmits: 0`. Ordering and retry behavior are independent: unordered delivery can still be reliable.

`maxPacketLifeTime` is a transport budget, not an end-to-end message-age deadline. Use application timestamps or sequence numbers to discard stale updates. Reliable delivery does not provide durable storage or confirm command execution.

Your application supplies the publisher's policy to subscribers along with the publication's session ID and channel name. Configure each browser with that policy and its own allocated channel ID. Negotiated DataChannels do not communicate these settings to the browser automatically.

`waitForAck` and `canReply` are chosen separately for each subscription. They do not change the published channel's delivery policy.

For replaceable player state, your backend creates the publisher's allocation with unordered delivery and no retransmissions:

```json
{
	"dataChannels": [
		{
			"location": "local",
			"dataChannelName": "player-state",
			"ordered": false,
			"maxRetransmits": 0
		}
	]
}
```

After checking the result, return its channel ID to the publisher. In the publisher browser, `publisherPc` is its PeerConnection and `publisherChannelId` is its allocated ID:

```ts
const publisherChannel = publisherPc.createDataChannel("player-state", {
	negotiated: true,
	id: publisherChannelId,
	ordered: false,
	maxRetransmits: 0,
});
```

On each subscriber's session, the backend requests the same publication with the same delivery policy:

```json
{
	"dataChannels": [
		{
			"location": "remote",
			"sessionId": "<PUBLISHER_SESSION_ID>",
			"dataChannelName": "player-state",
			"ordered": false,
			"maxRetransmits": 0
		}
	]
}
```

After checking the subscription result, return its channel ID to that subscriber. In the subscriber browser, use its own `subscriberPc` and `subscriberChannelId`:

```ts
const subscriberChannel = subscriberPc.createDataChannel("player-state", {
	negotiated: true,
	id: subscriberChannelId,
	ordered: false,
	maxRetransmits: 0,
});
```

[Cloud gaming](https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/#choose-delivery-settings-for-input) uses separate named channels for reliable keyboard events and unreliable pointer movement. [Pocket Radio](https://developers.cloudflare.com/realtime/sfu/examples/embedded-devices/#how-it-works) separates reliable device messages on `robot` from replaceable updates on `spectrum`.

## Wait for subscriber readiness (waitForAck)

Set `waitForAck: true` on a remote subscription to hold publisher-to-subscriber delivery until the subscriber signals readiness. This field applies only to `location: "remote"` and defaults to `false`.

This example subscribes to a `device-events` publication that uses reliable, ordered defaults. Your backend creates the remote subscription on the subscriber's session:

```json
{
	"dataChannels": [
		{
			"location": "remote",
			"sessionId": "<PUBLISHER_SESSION_ID>",
			"dataChannelName": "device-events",
			"waitForAck": true
		}
	]
}
```

When the negotiated channel opens, the subscriber sends a readiness message:

```ts
// channel is the negotiated remote DataChannel for this subscription.
if (channel.readyState === "open") {
	channel.send("ready");
} else {
	channel.addEventListener("open", () => channel.send("ready"), { once: true });
}
```

The SFU consumes this first message and opens the gate. It must arrive within 30 seconds of creating the remote subscription. Otherwise the SFU tears down that gated channel. Create a new subscription to retry.

This acknowledgment establishes subscriber readiness. It is not an application command acknowledgment. Send a separate readiness message before commands, and use your own command IDs and acknowledgments when needed.

The gate is not a durable replay queue. Send the readiness acknowledgment before publisher traffic that must be delivered. Without `canReply`, subsequent subscriber messages are not forwarded to the publisher.

## Return to publisher (canReply)

Set `canReply: true` when a subscriber needs to respond on the same publisher channel. The field applies only to `location: "remote"` and defaults to `false`.

Reply access has these properties:

- At most one subscriber can hold it for a publisher DataChannel.
- Granting it to another subscriber replaces the previous selection.
- Replies go to the publisher and are not forwarded to other subscribers.

Your backend must authenticate the operator and authorize the grant. `canReply` controls the SFU return path. Application state determines who may receive that permission.

### Allow replies when subscribing

This example uses the same reliable, ordered `device-events` policy. Your backend creates the subscription on the receiving session:

```json
{
	"dataChannels": [
		{
			"location": "remote",
			"sessionId": "<PUBLISHER_SESSION_ID>",
			"dataChannelName": "device-events",
			"canReply": true
		}
	]
}
```

After its negotiated channel opens, that subscriber can send messages to the publisher.

### Change reply access

To grant or revoke access on an existing subscription, call `PUT /apps/{appId}/sessions/{subscriberSessionId}/datachannels/update` from your backend:

```json
{
	"dataChannels": [
		{
			"location": "remote",
			"sessionId": "<PUBLISHER_SESSION_ID>",
			"dataChannelName": "device-events",
			"canReply": true
		}
	]
}
```

Set `canReply: false` to revoke access. Update the new subscriber with `canReply: true` to transfer access. Check every result before changing the application's displayed controller state.

The existing negotiated channel carries replies after access is granted. Refer to [Pocket Radio's operator ownership ↗](https://github.com/cloudflare/realtime-examples/blob/main/esp32-radio/ARCHITECTURE.md#authorization) and [cloud-gaming control ownership](https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/#control-ownership) for application examples.

### Combine acknowledgment and replies

A subscription can set both `waitForAck` and `canReply`. Its first message opens the readiness gate and is consumed. Later messages reach the publisher while that subscriber holds reply access.

## Close channels

On the backend, send `PUT /apps/{appId}/sessions/{sessionId}/datachannels/close` with the IDs allocated on that endpoint's session:

```json
{
	"dataChannels": [{ "id": 2 }, { "id": 3 }]
}
```

Match results by `id`. A `close_track_error` item means the channel is absent or already closed. Retain other failed or unreported IDs for retry. Refer to [close-result handling](https://developers.cloudflare.com/realtime/sfu/observability/error-codes/#interpret-close-results).

Closure needs no SDP exchange. Close the endpoint's channel objects, then its PeerConnection when no longer needed. Follow [teardown ordering](https://developers.cloudflare.com/realtime/sfu/concepts/negotiation/#teardown) if work is still outstanding.

## Custom media payloads

DataChannels can carry encoded media as binary application messages. The SFU forwards these bytes without interpreting their media format. Publication and subscription, delivery settings, transport congestion control, and data statistics still apply.

Your application supplies media framing, compatible decoders, playback timing, synchronization, and recovery from missing or late frames. Pace writes and bound application buffers. SFU codec negotiation, simulcast, and WebSocket media adapters operate on media tracks. They do not interpret media embedded in DataChannel messages.

## Learn with an example

Run the [DataChannel example ↗](https://github.com/cloudflare/realtime-examples/tree/main/echo-datachannels) to establish two endpoints, open the readiness gate, send a publisher message and subscriber reply, and compare unordered updates.

The example keeps the SFU App Secret on a local Node.js server. It is an experimental localhost exercise, with no public application authentication or room membership. Follow its [API and lifecycle guide ↗](https://github.com/cloudflare/realtime-examples/tree/main/echo-datachannels#api-and-lifecycle) to inspect negotiation and teardown.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/features/datachannels/#page","headline":"DataChannels","description":"Send application messages, telemetry, and authorized controls through Realtime SFU DataChannels.","url":"https://developers.cloudflare.com/realtime/sfu/features/datachannels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
