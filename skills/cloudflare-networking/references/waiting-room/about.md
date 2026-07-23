---
description: How Cloudflare Waiting Room queues visitors during traffic surges.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waiting-room/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waiting-room/about/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Waiting Room queues visitors when your traffic approaches a previously defined threshold that might otherwise bring an application down.

![Waiting Room process flow showing how a request is managed by Cloudflare and placed in a waiting room before reaching the origin website](https://developers.cloudflare.com/_astro/waiting-room-process-flow.BQ9hOmEi_1dE16C.webp)

## User flow

Once you have [created and activated a waiting room](https://developers.cloudflare.com/waiting-room/get-started/) for a specific application page:

* If a page is not experiencing heavy traffic, a visitor accesses the page directly.
* If page traffic approaches a [user-defined threshold](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/#session-duration), a visitor enters a virtual waiting room until it is their turn to access the page:

  * Each user receives a [cookie](https://developers.cloudflare.com/waiting-room/reference/waiting-room-cookie/) to manage the dynamic outflow of requests from the waiting room to the origin website in [First In First Out (FIFO)](https://developers.cloudflare.com/waiting-room/reference/queueing-methods/#first-in-first-out-fifo) order.
  * While in the waiting room, the user's browser automatically refreshes every 20 seconds to give them updated information about their estimated wait time.
  * When a user exits the waiting room and reaches your application, they can leave and re-enter without waiting for the length of time specified by the [session duration](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/#session-duration).
  * Because waiting rooms support dynamic inflow and [outflow](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/#session-duration), new spots appear more quickly and estimated wait times are lower and more accurate.

## Architecture

Waiting Room is built on [Workers](https://developers.cloudflare.com/workers/) that runs across a global network of Cloudflare data centers.

When a request comes to a host or path covered by a Waiting Room, that request goes to a Waiting Room Worker in the closest geographic data center. The Worker then needs to make a decision: whether to send users to the queue or the website.

That decision itself depends on two factors: [admin-defined thresholds](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/) and the Waiting Room state.

For admin-defined thresholds, the two measures that matter are `total active users` and `new users per minute`:

* `total active users` is a target threshold for how many simultaneous users you want to allow on the pages covered by your waiting room.
* `new users per minute` defines the target threshold for the maximum rate of user influx to your website per minute.

A sharp spike in either of these values might result in queuing. Another configuration that affects how we calculate `the total active users` is `session duration`. A user is considered active for `session duration` minutes since the request is made to any page covered by a waiting room.

The other factor is the Waiting Room state, which is maintained at the local data center level but then also changes continuously based on the traffic around the world. Each data center works with its own Waiting Room state. This state is a snapshot of the traffic pattern for the website around the world available at that point in time. The advantage of using this approach - making decisions at the Worker level - is that we can make decisions without any significant latency added to the request. The algorithm for Waiting Room dynamically allocates a certain number of slots available to each Worker based on the Waiting Room state. Queueing starts when the slots run out within the Worker. The lack of additional latency added enables the customers to turn on the waiting room all the time without worrying about extra latency to their users.

The Waiting Room state is updated with global information every few seconds. We have a pipeline set up in Cloudflare [Durable Objects](https://developers.cloudflare.com/durable-objects/) that ensures changes in traffic get propagated around the world. This architecture ensures that we do not introduce additional latency, as well as that we are making decisions with as near-time accuracy as possible.

For even more details about the architecture and why we made these decisions, refer to our [deep-dive technical blog ↗](https://blog.cloudflare.com/how-waiting-room-queues).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waiting-room/about/#page","headline":"About · Cloudflare Waiting Room docs","description":"How Cloudflare Waiting Room queues visitors during traffic surges.","url":"https://developers.cloudflare.com/waiting-room/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
