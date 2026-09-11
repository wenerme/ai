---
description: Frequently asked questions about RealtimeKit meetings, recordings, and SDK usage.
title: FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# FAQ

Last updated Sep 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/faq/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

### API token

How can I generate a Cloudflare API token?

To use RealtimeKit APIs, you must have a [Cloudflare account ↗](https://dash.cloudflare.com).

Follow the [Create API token guide](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) to create a token from the [Cloudflare dashboard ↗](https://dash.cloudflare.com/profile/api-tokens). When configuring permissions, select **Realtime** \> **Realtime Admin**. Configure additional [access policies and restrictions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) for your use case.

Cloudflare API tokens authenticate requests to Cloudflare APIs. Use these tokens only in your backend. Never expose an API token to your frontend or share it with an end user.

### Auth tokens

How do I generate an auth token for a participant?

Your backend generates an auth token by adding the user as a participant to a meeting with the [Add Participant](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) API endpoint. The API response includes a `token` field for that participant.

You can send this token to your frontend for the intended participant. The token is tied to that participant and meeting. It does not grant access to other meetings.

If you need a new token after the previous token expires, use the [Refresh Participant Token](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/refresh%5Fparticipant%5Ftoken/) endpoint. For more information, refer to [Participant tokens](https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#participant-tokens).

How long is an auth token valid?

An auth token is a JSON Web Token (JWT) that is valid for 100 days. It contains `meetingId` and `participantId` fields that tie the token to a specific participant in a specific meeting. The token does not grant access to other meetings. If you need a new token after the previous token expires, use the [Refresh Participant Token](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/refresh%5Fparticipant%5Ftoken/) endpoint. For more information, refer to [Participant tokens](https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#participant-tokens).

Can I refresh an auth token before it expires?

Yes. You can call the [Refresh Participant Token](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/refresh%5Fparticipant%5Ftoken/) endpoint before the current token expires. Refreshing an auth token generates a new token without invalidating an existing token. Each token remains valid and expires independently at its own expiration time.

Can the auth token lifespan be configured?

No. The auth token APIs do not support custom start or expiration dates. Tokens created through the [Add Participant](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) or [Refresh Participant Token](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/refresh%5Fparticipant%5Ftoken/) flow become valid when issued and expire 100 days later.

If you need scheduled access, implement time-based access controls in your own system. RealtimeKit SDKs do not manage scheduling or duration logic.

Does generating a new auth token invalidate the previous token?

No. Generating a new token, including through the refresh flow, does not invalidate an existing token. Each token remains valid and expires independently at its own expiration time.

Does deleting a participant revoke all previously issued tokens?

Yes. The [Delete Participant](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/delete%5Fmeeting%5Fparticipant/) endpoint immediately revokes all tokens issued to that participant for the meeting.

Before deleting the participant, use the [Kick Participants](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/active-session/methods/kick%5Fparticipants/) endpoint to safely remove the participant from any active session. Then, delete the participant to revoke their tokens.

What happens if a participant uses an expired or invalidated auth token?

The participant cannot join the meeting. The RealtimeKit UI and Core SDK report that the token is invalid.

Because RealtimeKit rejects the participant before they enter the meeting stage, they are not billed.

Can a participant with a valid auth token join an inactive meeting?

No. A participant cannot join a meeting with an `INACTIVE` status, even if their auth token is valid and has not expired.

Does the SDK cache participant auth tokens?

No. RealtimeKit SDKs do not cache participant auth tokens or store them in browser or device storage.

### Meetings

Can I schedule meetings in advance with RealtimeKit?

While RealtimeKit does not include a built-in scheduling system, you can implement the scheduling experience on top of it in your application. RealtimeKit meetings do not have start or end time, so your backend must store the schedule and enforce when users are allowed to join. A common approach is:

* When a user schedules a meeting, your backend creates a meeting in RealtimeKit and stores the meeting `id` together with the start and end times.
* When a user tries to join the meeting in your application, your backend checks whether the current time is within the allowed window.
* If the checks pass, your backend [adds the participant](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to the meeting, returns the participant auth token to the frontend and the frontend passes that token to the RealtimeKit SDK so the user can join.

How do I prevent participants from joining a meeting after a specific date or time?

At the required time, first call the [Kick All Participants](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/active-session/methods/kick%5Fall%5Fparticipants/) endpoint if the meeting has an active session. This removes all participants and properly ends the session.

Then, call the [Update Meeting](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/update%5Fmeeting%5Fby%5Fid/) endpoint to set the meeting status to `INACTIVE`. This prevents participants from joining the meeting and prevents new sessions from starting.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/realtime/kit/{APP_ID}/meetings/{MEETING_ID} \
--request PATCH \
--header "Authorization: Bearer <CLOUDFLARE_API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{ "status": "INACTIVE" }'
```

### Participants

Can the same user join from multiple devices or browser tabs?

Yes. A single participant can be represented by multiple peers if the user joins the same meeting from different devices or tabs. Each connection becomes a separate peer, but they all map back to the same participant.

How can I prevent a user from joining a meeting again?

Delete that user's participant for the meeting using the [Delete Participant](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/delete%5Fmeeting%5Fparticipant/)API endpoint. Once the participant is deleted and you stop issuing new tokens for them, they will no longer be able to join that meeting.

Can the same participant join multiple sessions of a meeting?

Yes. As long as the participant exists for that meeting and has a valid authentication token, that participant can join multiple live sessions of the same meeting over time.

Do I need to create a new participant for every session?

In most cases, no. You typically create a participant once for a given user and meeting, and then reuse that participant across sessions of that meeting. You may need to refresh the participant’s authentication token over time, but you do not need to recreate the participant.

What should I use for custom\_participant\_id?

Use a stable internal identifier from your own system, such as a numeric user id or UUID. Do not use personal data such as email addresses, phone numbers, or other personally identifiable information.

### Presets

Do I need a new preset for every meeting or participant?

Presets are **re-usable** set of rules and configurations that are defined at the App level. You can use the same preset for multiple participants.

Read more about presets [here](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

### Client Side SDKs

How do I decide which SDK to select?

RealtimeKit support all the popular frameworks for web and mobile platforms.

We **recommend using our UI Kits** For most use cases.

Please Note: When you use our UI Kit, you also get the core SDK with it, which can be used to build additional features based on your needs.

For more information please refer to our [SDK Selection Guide](https://developers.cloudflare.com/realtime/realtimekit/sdk-selection/)

### Camera

How can I set an end user's camera quality to 1080p?

When initializing RealtimeKit, you can set the media configurations for camera quality.

Refer to the media configurations [here](https://developers.cloudflare.com/realtime/realtimekit/core/#advanced-options) for more details.

Higher camera quality increases bandwidth usage and may impact meeting performance on lower-end devices if the end user's device is not powerful enough to handle 1080p from multiple peers.

How can I set a custom frame rate for an end user's camera feed?

When initializing RealtimeKit, you can set the media configurations for camera.

Refer to the media configurations [here](https://developers.cloudflare.com/realtime/realtimekit/core/#advanced-options) for more details.

Higher video frame rates increase bandwidth usage and may impact the video feed quality of other peers in the meeting if there are bandwidth issues with the end user's device. Set the video frame rate to a lower value (for example, <= 30) in group calls. The current default is 24/30 FPS based on the simulcast layer.

### Microphone

Why is my microphone not auto-selected when plugged in?

RealtimeKit SDK attempts to provide the best experience by auto-selecting the microphone. It prefers Bluetooth devices over wired devices. However, if the device was already plugged in before joining a RealtimeKit meeting and the device does not have `bluetooth`, `headset`, or `earphone` in its label, it may be missed.

We support auto-selection of microphones with the label `bluetooth`, `headset`, `earphone`, or `microphone`, and USB devices with labels such as `usb` and `wired`. Some commonly used devices such as AirPods or Airdopes are also supported. We do not auto-select virtual devices.

If auto-selection fails, end users can manually select the microphone from the Settings button in the meeting and the SDK will remember the selection for future sessions. If you have a device that you believe is commonly used, please contact support to request first-hand auto-selection support for it.

### Screen Share

How can I set a custom frame rate for screen share?

When initializing RealtimeKit, you can set the media configurations for screen share.

Refer to the media configurations [here](https://developers.cloudflare.com/realtime/realtimekit/core/#advanced-options) for more details.

Higher screen share frame rates increase bandwidth usage and may impact the video feed quality of other peers in the meeting if there are bandwidth issues with the end user's device. Set the screen share frame rate to a lower value (for example, <= 30) in group calls. In most use cases, 5 FPS (default) is sufficient for screen share.

### Chat

I cannot send a chat message

There could be multiple reasons for this.

First, try a sample meeting on the [demo app ↗](https://examples.realtime.cloudflare.com/). If you cannot send a message in the demo app, contact support. If you can send a message in the demo app, the issue is on the integration side.

To troubleshoot integration issues, first check if the user has joined the meeting successfully. If the user has [joined](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) the meeting successfully, check if the user's [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/) has permissions to send messages. If you are using a custom UI, check if the core [Chat APIs](https://developers.cloudflare.com/realtime/realtimekit/core/chat/) are working to eliminate the Core SDK from the usual suspects.

If this does not solve the issue, check if your framework is blocking the UI. Frameworks like Material UI can block input focus using focus traps in Drawer component. There is usually a prop to disable the focus trap. Material UI has a `disableEnforceFocus` prop for this purpose.

If you are still unable to send a message, please contact support.

### Recording

Watermark images appear broken in recordings

When you pass a watermark image URL via the [Start Recording](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) API, the recorder loads that image inside a browser running in a Cloudflare container. If the image appears broken, check the following:

* **CORS headers**: The image URL must return proper CORS headers (for example, `Access-Control-Allow-Origin: *`) in the HTTP response. Without these headers, the browser blocks the image from loading.
* **Direct image URL**: The URL must point directly to the image file (for example, `https://example.com/logo.png`), not to an HTML page that embeds the image.
* **No redirects**: The URL must not redirect to another location. The recorder fetches the URL as-is, so redirects may cause the image to fail to load.

### Network access

Which domains and ports must I allowlist when my network restricts outbound traffic?

If your network restricts outbound traffic, refer to [Network allowlist](https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/) for the domains and ports required for your RealtimeKit integration.

How can I check if my network and devices are ready for a RealtimeKit meeting?

Go to [test.realtime.cloudflare.com ↗](https://test.realtime.cloudflare.com/) and run the pre-call test. The test checks your camera, microphone, and network, and verifies connectivity to Cloudflare Realtime endpoints, so you can confirm that the required services are not blocked by your network or firewall before joining a meeting. For required domains and ports, refer to [Network allowlist](https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/).

### Demo App

Can I use the Cloudflare hosted demo app or examples in my website as an iframe?

We strongly recommend against embedding the Cloudflare hosted demo app or examples as an iframe in your website, even if you pass authentication tokens via URL parameters.

Instead, set up the default meeting UI in your own website by following the [UI Kit setup guide](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/) or deploy the [RealtimeKit web examples ↗](https://github.com/cloudflare/realtimekit-web-examples/) under your own domain. The effort required for either approach is minimal and provides significant benefits:

* **Control**: You maintain full control over the user experience, structure, and interface.
* **Stability**: Your implementation remains consistent and will not change overnight, protecting your product from sudden disruptions.
* **Reliability**: You control when and how to upgrade, ensuring a stable experience for your users.

The demo app and example applications may be updated at any time without prior notice.

### Billing

How are Audio/Video Participant and Audio-Only Participant minutes charged?

RealtimeKit bills active participant minutes. Billing starts when a participant joins a meeting session and stops when they leave it.


**Key billing rules:**

* **No-shows are not billed:** Adding someone with the [Add Participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) does not incur charges. RealtimeKit does not charge for that participant if they never join the meeting.
* **Usage is billed by duration:** RealtimeKit charges for the exact time, including seconds, that a participant spends in an active session. The participant is still billed when they do not produce or consume audio or video.
* **Multiple tabs are billed separately:** If someone joins from multiple browser tabs with the same auth token, RealtimeKit bills each tab separately. The RealtimeKit dashboard displays the aggregated duration for that participant.

For more information about the difference between meetings and sessions, refer to [RealtimeKit concepts](https://developers.cloudflare.com/realtime/realtimekit/concepts/).


For example:

* If two participants join at 7:00 p.m. and leave at 7:30 p.m., each participant uses 30 minutes. RealtimeKit charges 60 participant minutes.
* If one participant joins at 4:00 p.m., another joins at 4:03 p.m., and both leave at 5:00 p.m., they use 60 and 57 minutes. RealtimeKit charges 117 participant minutes.
* If one participant joins at 3:00 p.m. and leaves at 3:27 p.m., while another joins at 3:05 p.m. and leaves at 3:30 p.m., they use 27 and 25 minutes. RealtimeKit charges 52 participant minutes.
* If five participants are expected but only two join, RealtimeKit charges participant minutes only for the two participants who joined.
* If two participants are expected to join a pre-created meeting at 2:00 p.m. but neither joins, RealtimeKit does not charge any participant minutes.

Creating meetings and participant tokens does not incur charges.

How is composite recording export charged?

For composite recordings, a recorder joins the meeting as a hidden virtual participant and records its view. For more information, refer to the [recording guides](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/).

After the final participant leaves, the recorder remains active for the meeting's [session\_keep\_alive\_time\_in\_secs](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/#%28resource%29%20realtime%5Fkit.meetings%20%3E%20%28method%29%20create%20%3E%20%28params%29%200%20%3E%20%28param%29%20session%5Fkeep%5Falive%5Ftime%5Fin%5Fsecs%20%3E%20%28schema%29). The default is 60 seconds, and the maximum is 600 seconds.

RealtimeKit does not charge participant minutes for the recorder. Instead, it charges export minutes for the recorded duration. Refer to [RealtimeKit pricing](https://developers.cloudflare.com/realtime/realtimekit/pricing/) for current rates.


When [record\_on\_start](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/#%28resource%29%20realtime%5Fkit.meetings%20%3E%20%28method%29%20create%20%3E%20%28params%29%200%20%3E%20%28param%29%20record%5Fon%5Fstart%20%3E%20%28schema%29) is `true`:

* If two participants join at 7:00 p.m. and leave at 7:30 p.m., recording starts at 7:00 p.m. After both participants leave, the recorder remains active for the default 60-second session keep-alive period. Recording stops at 7:31 p.m., so RealtimeKit charges 31 export minutes.
* If five participants are expected but only two join at 8:00 p.m. and leave at 8:20 p.m., recording runs until 8:21 p.m. with the default session keep-alive period. RealtimeKit charges 21 export minutes. The charge would remain 21 export minutes if all five participants joined and left at the same times because participant count does not affect recording export minutes.
* If nobody joins a pre-created meeting, recording does not start. Creating a meeting with `record_on_start` set to `true` does not incur charges by itself.

When someone starts recording during an active session:

* If recording starts at 4:20 p.m. and the final participant leaves at 5:00 p.m., it stops at 5:01 p.m. by default. RealtimeKit charges 41 export minutes.
* If recording starts at 4:20 p.m. and someone calls [kickAll()](https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/) at 5:00 p.m., recording stops immediately. RealtimeKit charges 40 export minutes.
* If a meeting and recording start at 4:20 p.m., the meeting uses a two-minute keep-alive period, and all participants close their tabs at 5:00 p.m., recording stops at 5:02 p.m. RealtimeKit charges 42 export minutes.

This keep-alive period helps workflows that must preserve a single recording across brief disconnections. For example, an education technology (EdTech) application might record a timed take-home assignment in a one-participant meeting. If the participant loses their network connection and rejoins before the keep-alive period expires, the recorder continues the same recording. The recording contains an empty gap during the disconnection, but the application does not need to combine two separate recordings.


The export charges include the keep-alive period. To avoid this extra time, explicitly end the session by calling [kickAll()](https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/) or the [Kick all participants API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/active-session/methods/kick%5Fall%5Fparticipants/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/faq/#page","headline":"FAQ · Cloudflare Realtime docs","description":"Frequently asked questions about RealtimeKit meetings, recordings, and SDK usage.","url":"https://developers.cloudflare.com/realtime/realtimekit/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
