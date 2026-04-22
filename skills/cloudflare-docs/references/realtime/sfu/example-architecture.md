---
title: Example architecture
description: Reference architecture for building a video calling application with Realtime SFU.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/sfu/example-architecture.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Example architecture

![Example Architecture](https://developers.cloudflare.com/_astro/video-calling-application.CIYa-lzM_2b10aI.webp)

1. Clients connect to the backend service
2. Backend service manages the relationship between the clients and the tracks they should subscribe to
3. Backend service contacts the Cloudflare Realtime API to pass the SDP from the clients to establish the WebRTC connection.
4. Realtime API relays back the Realtime API SDP reply and renegotiation messages.
5. If desired, headless clients can be used to record the content from other clients or publish content.
6. Admin manages the rooms and room members.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/example-architecture/","name":"Example architecture"}}]}
```
