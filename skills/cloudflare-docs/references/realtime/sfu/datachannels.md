---
title: DataChannels
description: Send arbitrary real-time data between clients using Realtime SFU DataChannels.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/sfu/datachannels.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DataChannels

DataChannels are a way to send arbitrary data, not just audio or video data, between client in low latency. DataChannels are useful for scenarios like chat, game state, or any other data that doesn't need to be encoded as audio or video but still needs to be sent between clients in real time.

While it is possible to send audio and video over DataChannels, it's not optimal because audio and video transfer includes media specific optimizations that DataChannels do not have, such as simulcast, forward error correction, better caching across the Cloudflare network for retransmissions.

graph LR
    A[Publisher] -->|Arbitrary data| B[Cloudflare Realtime SFU]
    B -->|Arbitrary data| C@{ shape: procs, label: "Subscribers"}

DataChannels on Cloudflare Realtime can scale up to many subscribers per publisher, there is no limit to the number of subscribers per publisher.

### How to use DataChannels

1. Create two Realtime sessions, one for the publisher and one for the subscribers.
2. Create a DataChannel by calling /datachannels/new with the location set to "local" and the dataChannelName set to the name of the DataChannel.
3. Create a DataChannel by calling /datachannels/new with the location set to "remote" and the sessionId set to the sessionId of the publisher.
4. Use the DataChannel to send data from the publisher to the subscribers.

### Unidirectional DataChannels

Cloudflare Realtime SFU DataChannels are one way only. This means that you can only send data from the publisher to the subscribers. Subscribers cannot send data back to the publisher. While regular MediaStream WebRTC DataChannels are bidirectional, this introduces a problem for Cloudflare Realtime because the SFU does not know which session to send the data back to. This is especially problematic for scenarios where you have multiple subscribers and you want to send data from the publisher to all subscribers at scale, such as distributing game score updates to all players in a multiplayer game.

To send data in a bidirectional way, you can use two DataChannels, one for sending data from the publisher to the subscribers and one for sending data the opposite direction.

## Example

An example of DataChannels in action can be found in the [Realtime Examples github repo ↗](https://github.com/cloudflare/calls-examples/tree/main/echo-datachannels).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/datachannels/","name":"DataChannels"}}]}
```
