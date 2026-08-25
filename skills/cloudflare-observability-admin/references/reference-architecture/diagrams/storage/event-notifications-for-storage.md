---
description: Use Cloudflare Workers or an external service to monitor for notifications about data changes and then handle them appropriately.
title: Event notifications for storage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt
> Use this file to discover all available pages before exploring further.

# Event notifications for storage

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/reference-architecture/diagrams/storage/event-notifications-for-storage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Introduction

Cloudflare [R2](https://developers.cloudflare.com/r2/) Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services. The lifecycle of data in object storage often extends beyond uploading, modifying, or deleting the data. There may be a requirement to transform, analyze, or perform post-processing on the data. R2 provides [event notifications](https://developers.cloudflare.com/r2/buckets/event-notifications/) to manage these event-driven workflows.

This document walks through how to use our built in serverless [Cloudflare Workers](https://developers.cloudflare.com/workers/) or an external service to monitor for notifications about data changes and then handle them appropriately.

## Push-based consumer Worker

Event notifications function by sending messages to a [queue](https://developers.cloudflare.com/queues/) whenever there is a change to your data. These messages are then handled by a [consumer Worker](https://developers.cloudflare.com/queues/reference/how-queues-works/#consumers). A consumer Worker is the term for a client that is subscribing to or consuming messages from a queue. The consumer Worker will automatically receive these messages, allowing you to define any subsequent actions that need to be taken.

For instance, you can configure a notification to trigger when new images are uploaded to your R2 bucket. This notification can then automatically start an AI workload that performs an action on the image, such as converting the image to text.

Consider the example below of push-based post-processing: when a user uploads a new object into R2, we want to log and store that event into a separate R2 bucket. You can create this scenario yourself by following this tutorial: [Log and store upload events in R2 with event notifications](https://developers.cloudflare.com/r2/tutorials/upload-logs-event-notifications/).

![Figure 1: Push-Based R2 Event Notifications](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=912,height=472,format=svg/_astro/pushed-based-event-notification.NdMYExDK.svg "Figure 1: Push-Based R2 Event Notifications")

Figure 1: Push-Based R2 Event Notifications

1. A user uploads a new object directly to R2.
2. An event notification is sent to the queue.
3. The consumer Worker is pushed the new work from the queue.
4. The Worker inserts a log event into R2.

## Pull-based HTTP consumer

Alternatively, you can establish a [pull-based consumer](https://developers.cloudflare.com/queues/configuration/pull-consumers/), where you pull from a queue over HTTP from any environment. Use a pull-based consumer if you need to consume messages from existing infrastructure outside of Cloudflare where you need to carefully control how fast messages are consumed.

A pull-based consumer must explicitly make a call to pull (and then acknowledge) messages from the queue, only when it is ready to do so.

Consider the scenario below: A user initiates a delete from R2\. An external service needs to be informed of the deletion, so a pull-based queue has been established for the external service to retrieve notifications.

![Figure 2: Pull-Based R2 Event Notifications](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=856,height=481,format=svg/_astro/pull-based-event-notification.KnQPn3ra.svg "Figure 2: Pull-Based R2 Event Notifications")

Figure 2: Pull-Based R2 Event Notifications

1. A user initiates a delete from R2.
2. An event notification is sent to the queue.
3. The external service, when ready to process the request, makes an HTTP POST request to the queue to pull the message.
4. The queue sends the message in response to the POST request from step 3.
5. The external service must acknowledge that the message has been received.

You can follow the steps here to [configure a pull-based consumer](https://developers.cloudflare.com/queues/configuration/pull-consumers/#1-enable-http-pull).

## Additional example use cases

* Send an email to an administrator any time objects are deleted from R2.
* When a video or podcast is uploaded to R2, it automatically processes the content using one of Cloudflare's Automatic Speech Recognition (ASR) AI models to generate subtitles or even translate the content.
* Remove related database entries if an object in R2 is deleted.

## Related resources

* [Tutorial: Log and store upload events in R2 with event notifications](https://developers.cloudflare.com/r2/tutorials/upload-logs-event-notifications/)
* [Event Notifications documentation](https://developers.cloudflare.com/r2/buckets/event-notifications/)
* [Cloudflare R2 overview](https://developers.cloudflare.com/r2/)
* [Cloudflare Queues overview](https://developers.cloudflare.com/queues/)
* [Cloudflare Queues Pull Consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/storage/event-notifications-for-storage/#page","headline":"Event notifications for storage · Cloudflare Reference Architecture docs","description":"Use Cloudflare Workers or an external service to monitor for notifications about data changes and then handle them appropriately.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/storage/event-notifications-for-storage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
