---
title: Demos
description: Explore demo applications and interactive visualizations for Cloudflare Realtime SFU.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/sfu/demos.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Demos

Learn how you can use Realtime within your existing architecture.

## Demos

Explore the following demo applications for Realtime.

* [Realtime Echo Demo: ↗](https://github.com/cloudflare/calls-examples/tree/main/echo) Demonstrates a local stream alongside a remote echo stream.
* [Orange Meets: ↗](https://github.com/cloudflare/orange) Orange Meets is a demo WebRTC application built using Cloudflare Realtime.
* [WHIP-WHEP Server: ↗](https://github.com/cloudflare/calls-examples/tree/main/whip-whep-server) WHIP and WHEP server implemented on top of Realtime API.
* [Realtime DataChannel Test: ↗](https://github.com/cloudflare/calls-examples/tree/main/echo-datachannels) This example establishes two datachannels, one publishes data and the other one subscribes, the test measures how fast a message travels to and from the server.

## Interactive Demos

### Global SFU Network Visualization

An interactive visualization showing how Realtime uses Cloudflare's global network as a distributed SFU. Click anywhere on the map to add participants and watch them connect to their nearest datacenter via anycast routing, with media tracks flowing along Cloudflare's private backbone.

[View Global SFU Visualization ↗](https://realtime-sfu.dev-demos.workers.dev)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/demos/","name":"Demos"}}]}
```
