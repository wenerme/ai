---
description: Add and manage participants in RealtimeKit meetings with tokens and presets.
title: Participant
image: https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/og.png?v=fda2c8c3942aec7d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Participant

Last updated Oct 26, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Before a user can join a meeting through the RealtimeKit SDK, your backend must add that user as a participant to that meeting using the [Add Participant API](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/). In RealtimeKit, a **participant** represents a user who is allowed to join a specific meeting.

You can think of this as enrolling a student into a classroom. The meeting is the classroom, and adding a participant is how you register a user so that they are allowed to attend.

When you add a participant, you also choose which [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/) to apply. The preset defines the role, permissions, and meeting experience of that participant.

### Participant tokens

When you add a participant to a meeting using the [Add Participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/) API endpoint, it returns:

- A participant `id` that identifies this participant within the meeting.
- An authentication `token` for that participant.

Your backend should make it available to your frontend application. When the user chooses to join the meeting, the frontend passes the token to the RealtimeKit SDK.

RealtimeKit uses the token to authenticate the participant and determine which meeting and which participant is joining. Without a valid authentication token, the SDK cannot join the meeting on behalf of that participant. As long as a participant has a valid authentication token, that participant can join multiple live sessions of the same meeting over time.

### Token validity and refresh

Participant authentication tokens are JSON Web Tokens (JWTs). The `meetingId` and `participantId` fields scope each token to one participant in one meeting.

By default, a token becomes valid when issued and expires 100 days later. To set a custom validity window, pass `not_before` and `expires_on` in the `token` object when you add a participant, or in the request body when you refresh a token. Both fields are optional RFC 3339 timestamps with a timezone offset, such as `2026-10-01T09:00:00Z` (UTC) or `2026-10-01T14:30:00+05:30`:

- `not_before` defaults to the current time and can be in the past.
- `expires_on` defaults to `not_before` plus 100 days and must be in the future.
- The validity window cannot be longer than 100 days.

The response returns the `not_before` and `expires_on` values of the issued token in UTC.

Your backend can call the [Refresh Participant Token](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token/) endpoint before or after a token expires. The new token uses the existing participant record, including its participant `id` and preset. Refreshing does not invalidate previously issued tokens. Each token remains valid until its own expiration time.

### Revoke tokens

To revoke a single token, send a `DELETE` request to `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token` with the token in the request body:

```json
{
	"token": "<PARTICIPANT_AUTH_TOKEN>"
}
```

Other tokens issued to the participant remain valid.

A revoked token can take up to 60 seconds to be rejected in all locations. During this time, the participant may be able to rejoin the meeting with the revoked token. To block access immediately for all participant tokens, delete the participant instead.

To revoke all tokens for a participant in a meeting, call the [Delete Participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/delete_meeting_participant/) endpoint.

Revoking a token or deleting a participant also removes the participant from the active session of the meeting, if one exists.

A participant cannot join a meeting with an expired, not yet valid, or revoked token. The RealtimeKit UI and Core SDK report the token as invalid. RealtimeKit rejects the participant before they enter the [meeting stage](https://developers.cloudflare.com/realtime/realtimekit/humans/core/stage-management/), so they are not billed. The API error response includes a `reason` field with one of the following values: `participant_token_expired`, `participant_token_not_yet_valid`, `participant_token_revoked`, or `participant_token_invalid`.

### Custom participant identifier

When adding the participant, you can optionally provide a custom participant identifier, referred to as `custom_participant_id`. This value is purely for your use. RealtimeKit stores it and returns it in APIs, but does not use it to control access. It allows you to map your application's user to RealtimeKit participant and to correlate RealtimeKit session data, events or analytics with user information in your system.

Note

**Do not** use personal data such as email address, phone number, or any other personally identifiable information as `custom_participant_id`. Use a stable internal identifier from your own system, such as a numeric user id or UUID.

### Where to Go Next

After understanding participants, you can explore the following topics:

- Learn how [Presets](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset) define roles and permissions for participants
- [Get started with RealtimeKit SDKs](https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#page","headline":"Participant","description":"Add and manage participants in RealtimeKit meetings with tokens and presets.","url":"https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/og.png?v=fda2c8c3942aec7d","dateModified":"2026-10-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
