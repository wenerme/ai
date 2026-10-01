---
description: Learn about the key ideas behind K2, including streams, records, subscriptions, and leases.
title: Concepts
image: https://developers.cloudflare.com/k2/concepts/og.png?v=b7c316bbff2924f6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/k2/llms.txt
> Use this file to discover all available pages before exploring further.

# Concepts

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/k2/concepts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This page introduces the concepts underlying K2.

## Streams

The core primitive in K2 is what we call a *stream* — an ordered, durable, log of events. The stream sits between producers writing events and consumers reading them. Unlike a traditional queue, where consumption removes items, production and consumption in a log are completely decoupled. Writes append events to the log, while reads merely advance a pointer (or *offset*) within the log.

This has some useful properties:

- Writes and reads are completely independent, so we never run out of space or otherwise block writes due to slow reads
- We can support multiple independent readers consuming the entire stream (pub-sub style) as readers do not affect each other or the log
- We can support historical replay, as data is only removed based on a configurable time-to-live (TTL)

Each stream has a name and a retention period. When you create a stream, K2 assigns it a unique ID, which producers and consumers use to communicate with it. Producers write to a stream through an HTTP endpoint (with or without authentication), a Workers binding, or both.

## Records

Records are the data written to a stream. Each record has the following fields:

- `content`: a binary message, containing arbitrary data; base64-encoded in the HTTP APIs
- `headers`: an optional map of string keys to string values that can be used to describe the data in the content

Headers are useful for describing the content, without needing to deserialize it. Common use cases for headers include:

- Storing the encoding, so the reader knows how to deserialize the content
- Representing data used to route or filter events, improving efficiency by avoiding deserialization when not necessary
- Annotating content in a pass-through pipeline without needing to modify the underlying data

Records can be up to 1 MB, counting across both content and headers.

## Subscriptions

Reads from K2 are performed via *subscriptions*. Each subscription will receive all messages in the stream, and multiple consumers can share a single subscription.

This enables K2 to support two delivery strategies: reads can be shared amongst a set of consumers (such that each consumer gets a subset of the messages), or delivered to all consumers independently (such that each consumer gets all messages). These strategies can also be mixed, with multiple groups of consumers which each get a subset of the messages.

Subscriptions are created with an initial position in the log: either `earliest`, which receives all retained (not deleted according to the TTL) data in the stream, or `latest` which receives all events from the time the subscription is created.

## Leases

Once a subscription is created, clients can consume from it by POSTing to the subscription's `/consume` endpoint. This returns a list of messages which this client is expected to process. These messages are *leased* to that client for a particular amount of time — the *lease period*, which is 5 minutes. The client is expected, before the lease expires, to either *ack* the messages, telling the subscription that they are successfully consumed, or *nack* them, indicating a processing failure. Events owned by a nack'd or timed-out lease will be redelivered on a subsequent call to consume.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/k2/concepts/#page","headline":"Concepts","description":"Learn about the key ideas behind K2, including streams, records, subscriptions, and leases.","url":"https://developers.cloudflare.com/k2/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/k2/concepts/og.png?v=b7c316bbff2924f6","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
