---
description: Set up a RealtimeKit webinar with presenters and viewers, then manage requests to join the stage.
title: Set up a webinar
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up a webinar

Last updated Sep 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/webinar/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In a RealtimeKit webinar, presenters publish audio and video from the [stage](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting/#stage). Viewers watch and can request to join the stage.

This guide sets up a webinar using the default webinar [presets](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/) and renders it with [RealtimeKit UI Kit](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/). To build a custom interface instead, use [RealtimeKit Core SDK](https://developers.cloudflare.com/realtime/realtimekit/core/) with [stage management](https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/).

## Webinar roles

Every RealtimeKit app includes two default presets for webinars. Assign one of these presets to each participant, modify them, or create your own preset to fit your application.

| Role      | Default preset     | Stage behavior                                 | Can accept stage requests |
| --------- | ------------------ | ---------------------------------------------- | ------------------------- |
| Presenter | webinar\_presenter | Can join the stage and publish audio and video | Yes                       |
| Viewer    | webinar\_viewer    | Can request to join the stage                  | No                        |

## Before you begin

Before you set up a webinar, make sure that you have:

* A [Cloudflare account ↗](https://dash.cloudflare.com) with a RealtimeKit app.
* An API token with Realtime Admin permissions. Keep it server-side. Do not expose it in frontend code.
* A backend that can call the RealtimeKit REST API to create meetings and add participants.
* A frontend application ready to integrate [RealtimeKit UI Kit](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/).

If you have not completed these requirements, refer to [Quickstart](https://developers.cloudflare.com/realtime/realtimekit/quickstart/).

## Set up a webinar

1. In the [RealtimeKit dashboard ↗](https://dash.cloudflare.com/?to=/:account/realtime/kit), go to **Presets** and review the default `webinar_presenter` and `webinar_viewer` presets. Both presets have **Meeting Type** set to **Video (WebRTC)** and **Manage Stage (Webinar)** turned on under **Configuration** \> **Stage & Media**.
2. Create a meeting using the [Create Meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/). Save the returned meeting `id` for the next step.
3. Add each presenter and viewer to the meeting using the [Add Participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/). Assign `webinar_presenter` to presenters and `webinar_viewer` to viewers.
4. Deliver each participant's returned `authToken` only to the frontend session for that specific user.
5. Initialize [RealtimeKit UI Kit](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/) with the participant's `authToken`. UI Kit renders the webinar interface, including stage controls, based on the participant's preset.

Configure presets with the API

If you manage presets programmatically instead of through the dashboard, use the [Create Preset API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/create/) with the following fields:

* `config.view_type` set to `WEBINAR`.
* `permissions.stage_access` set to `ALLOWED` for presenters, `CAN_REQUEST` for viewers who can request to join the stage, or `NOT_ALLOWED` for view-only viewers.
* `permissions.can_accept_production_requests` set to `true` for participants who moderate stage requests.

For the complete request schema, refer to [Presets](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/).

## Manage stage requests

A viewer whose preset has **Behaviour** set to **Can request to join** can request access to the stage from the UI Kit interface. A presenter whose preset has **Accept Requests** turned on receives the request and can accept or reject it.

Once accepted, the viewer joins the stage and can publish audio and video like a presenter. RealtimeKit UI Kit handles this by default. To build a custom interface, implement the same behavior with the stage management APIs in [Stage Management](https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/).

## Verify the webinar

1. Join the meeting as a presenter and confirm that you can publish audio and video.
2. Join the meeting as a viewer and confirm that you cannot publish audio or video by default.
3. As the viewer, request to join the stage.
4. As the presenter, accept the request and confirm that the viewer can now publish audio and video.

## Pricing

Both presenters and viewers are billed as Audio/Video Participants. For detailed pricing information, refer to [Pricing](https://developers.cloudflare.com/realtime/realtimekit/pricing/).

## Next steps

* Customize the webinar interface with a [custom control bar](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/custom-controlbar/) or [UI Kit addons](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/addons/).
* Review [video and simulcast recommendations](https://developers.cloudflare.com/realtime/realtimekit/best-practices/video-and-simulcast/#webinar-audience-is-view-only) for presenter and viewer media quality.
* [Record the webinar](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/) and store the recording in your own storage.
* Use [webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/) to track webinar lifecycle events in your backend.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/webinar/#page","headline":"Set up a webinar · Cloudflare Realtime docs","description":"Set up a RealtimeKit webinar with presenters and viewers, then manage requests to join the stage.","url":"https://developers.cloudflare.com/realtime/realtimekit/webinar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
