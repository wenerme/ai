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

Last updated Sep 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/faq/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

### API token

<details>

<summary>

How can I generate a Cloudflare API token?

</summary>

To use RealtimeKit APIs, you must have a <a href="https://dash.cloudflare.com">Cloudflare account ↗</a>.

Follow the <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create API token guide</a> to create a token from the <a href="https://dash.cloudflare.com/profile/api-tokens">Cloudflare dashboard ↗</a>. When configuring permissions, select **Realtime** &gt; **Realtime Admin**. Configure additional <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">access policies and restrictions</a> for your use case.

Cloudflare API tokens authenticate requests to Cloudflare APIs. Use these tokens only in your backend. Never expose an API token to your frontend or share it with an end user.

</details>

### Auth tokens

<details>

<summary>

How do I generate an auth token for a participant?

</summary>

Your backend generates an auth token by adding the user as a participant to a meeting with the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/">Add Participant</a> API endpoint. The API response includes a <code>token</code> field for that participant.

You can send this token to your frontend for the intended participant. The token is tied to that participant and meeting. It does not grant access to other meetings.

If you need a new token after the previous token expires, use the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token/">Refresh Participant Token</a> endpoint. For more information, refer to <a href="https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#participant-tokens">Participant tokens</a>.

</details>

<details>

<summary>

How long is an auth token valid?

</summary>

An auth token is a JSON Web Token (JWT) that is valid for 100 days. It contains <code>meetingId</code> and <code>participantId</code> fields that tie the token to a specific participant in a specific meeting. The token does not grant access to other meetings. If you need a new token after the previous token expires, use the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token/">Refresh Participant Token</a> endpoint. For more information, refer to <a href="https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#participant-tokens">Participant tokens</a>.

</details>

<details>

<summary>

Can I refresh an auth token before it expires?

</summary>

Yes. You can call the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token/">Refresh Participant Token</a> endpoint before the current token expires. Refreshing an auth token generates a new token without invalidating an existing token. Each token remains valid and expires independently at its own expiration time.

</details>

<details>

<summary>

Can the auth token lifespan be configured?

</summary>

No. The auth token APIs do not support custom start or expiration dates. Tokens created through the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/">Add Participant</a> or <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token/">Refresh Participant Token</a> flow become valid when issued and expire 100 days later.

If you need scheduled access, implement time-based access controls in your own system. RealtimeKit SDKs do not manage scheduling or duration logic.

</details>

<details>

<summary>

Does generating a new auth token invalidate the previous token?

</summary>

No. Generating a new token, including through the refresh flow, does not invalidate an existing token. Each token remains valid and expires independently at its own expiration time.

</details>

<details>

<summary>

Does deleting a participant revoke all previously issued tokens?

</summary>

Yes. The <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/delete_meeting_participant/">Delete Participant</a> endpoint immediately revokes all tokens issued to that participant for the meeting.

Before deleting the participant, use the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_participants/">Kick Participants</a> endpoint to safely remove the participant from any active session. Then, delete the participant to revoke their tokens.

</details>

<details>

<summary>

What happens if a participant uses an expired or invalidated auth token?

</summary>

The participant cannot join the meeting. The RealtimeKit UI and Core SDK report that the token is invalid.

Because RealtimeKit rejects the participant before they enter the meeting stage, they are not billed.

</details>

<details>

<summary>

Can a participant with a valid auth token join an inactive meeting?

</summary>

No. A participant cannot join a meeting with an <code>INACTIVE</code> status, even if their auth token is valid and has not expired.

</details>

<details>

<summary>

Does the SDK cache participant auth tokens?

</summary>

No. RealtimeKit SDKs do not cache participant auth tokens or store them in browser or device storage.

</details>

### Meetings

<details>

<summary>

Can I schedule meetings in advance with RealtimeKit?

</summary>

While RealtimeKit does not include a built-in scheduling system, you can implement the scheduling experience on top of it in your application. RealtimeKit meetings do not have start or end time, so your backend must store the schedule and enforce when users are allowed to join. A common approach is:

- When a user schedules a meeting, your backend creates a meeting in RealtimeKit and stores the meeting <code>id</code> together with the start and end times.
- When a user tries to join the meeting in your application, your backend checks whether the current time is within the allowed window.
- If the checks pass, your backend <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/">adds the participant</a> to the meeting, returns the participant auth token to the frontend and the frontend passes that token to the RealtimeKit SDK so the user can join.

</details>

<details>

<summary>

How do I prevent participants from joining a meeting after a specific date or time?

</summary>

At the required time, first call the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_all_participants/">Kick All Participants</a> endpoint if the meeting has an active session. This removes all participants and properly ends the session.

Then, call the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/update_meeting_by_id/">Update Meeting</a> endpoint to set the meeting status to <code>INACTIVE</code>. This prevents participants from joining the meeting and prevents new sessions from starting.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/realtime/kit/{APP_ID}/meetings/{MEETING_ID} \
--request PATCH \
--header "Authorization: Bearer <CLOUDFLARE_API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{ "status": "INACTIVE" }'
```

</details>

### Participants

<details>

<summary>

Can the same user join from multiple devices or browser tabs?

</summary>

Yes. A single participant can be represented by multiple peers if the user joins the same meeting from different devices or tabs. Each connection becomes a separate peer, but they all map back to the same participant.

</details>

<details>

<summary>

How can I prevent a user from joining a meeting again?

</summary>

Delete that user's participant for the meeting using the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/delete_meeting_participant/">Delete Participant</a> API endpoint. Once the participant is deleted and you stop issuing new tokens for them, they will no longer be able to join that meeting.

</details>

<details>

<summary>

Can the same participant join multiple sessions of a meeting?

</summary>

Yes. As long as the participant exists for that meeting and has a valid authentication token, that participant can join multiple live sessions of the same meeting over time.

</details>

<details>

<summary>

Do I need to create a new participant for every session?

</summary>

In most cases, no. You typically create a participant once for a given user and meeting, and then reuse that participant across sessions of that meeting. You may need to refresh the participant’s authentication token over time, but you do not need to recreate the participant.

</details>

<details>

<summary>

What should I use for custom\_participant\_id?

</summary>

Use a stable internal identifier from your own system, such as a numeric user id or UUID. Do not use personal data such as email addresses, phone numbers, or other personally identifiable information.

</details>

### Presets

<details>

<summary>

Do I need a new preset for every meeting or participant?

</summary>

Presets are **re-usable** set of rules and configurations that are defined at the App level. You can use the same preset for multiple participants.

Read more about presets <a href="https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/">here</a>.

</details>

### Client Side SDKs

<details>

<summary>

How do I decide which SDK to select?

</summary>

RealtimeKit support all the popular frameworks for web and mobile platforms.

We **recommend using our UI Kits** For most use cases.

Please Note: When you use our UI Kit, you also get the core SDK with it, which can be used to build additional features based on your needs.

For more information please refer to our <a href="https://developers.cloudflare.com/realtime/realtimekit/sdk-selection/">SDK Selection Guide</a>

</details>

### Camera

<details>

<summary>

How can I set an end user's camera quality to 1080p?

</summary>

When initializing RealtimeKit, you can set the media configurations for camera quality.

Refer to the media configurations <a href="https://developers.cloudflare.com/realtime/realtimekit/core/#advanced-options">here</a> for more details.

Higher camera quality increases bandwidth usage and may impact meeting performance on lower-end devices if the end user's device is not powerful enough to handle 1080p from multiple peers.

</details>

<details>

<summary>

How can I set a custom frame rate for an end user's camera feed?

</summary>

When initializing RealtimeKit, you can set the media configurations for camera.

Refer to the media configurations <a href="https://developers.cloudflare.com/realtime/realtimekit/core/#advanced-options">here</a> for more details.

Higher video frame rates increase bandwidth usage and may impact the video feed quality of other peers in the meeting if there are bandwidth issues with the end user's device. Set the video frame rate to a lower value (for example, &lt;= 30) in group calls. The current default is 24/30 FPS based on the simulcast layer.

</details>

### Microphone

<details>

<summary>

Why is my microphone not auto-selected when plugged in?

</summary>

RealtimeKit SDK attempts to provide the best experience by auto-selecting the microphone. It prefers Bluetooth devices over wired devices. However, if the device was already plugged in before joining a RealtimeKit meeting and the device does not have <code>bluetooth</code>, <code>headset</code>, or <code>earphone</code> in its label, it may be missed.

We support auto-selection of microphones with the label <code>bluetooth</code>, <code>headset</code>, <code>earphone</code>, or <code>microphone</code>, and USB devices with labels such as <code>usb</code> and <code>wired</code>. Some commonly used devices such as AirPods or Airdopes are also supported. We do not auto-select virtual devices.

If auto-selection fails, end users can manually select the microphone from the Settings button in the meeting and the SDK will remember the selection for future sessions. If you have a device that you believe is commonly used, please contact support to request first-hand auto-selection support for it.

</details>

### Screen Share

<details>

<summary>

How can I set a custom frame rate for screen share?

</summary>

When initializing RealtimeKit, you can set the media configurations for screen share.

Refer to the media configurations <a href="https://developers.cloudflare.com/realtime/realtimekit/core/#advanced-options">here</a> for more details.

Higher screen share frame rates increase bandwidth usage and may impact the video feed quality of other peers in the meeting if there are bandwidth issues with the end user's device. Set the screen share frame rate to a lower value (for example, &lt;= 30) in group calls. In most use cases, 5 FPS (default) is sufficient for screen share.

</details>

### Chat

<details>

<summary>

I cannot send a chat message

</summary>

There could be multiple reasons for this.

First, try a sample meeting on the <a href="https://examples.realtime.cloudflare.com/">demo app ↗</a>. If you cannot send a message in the demo app, contact support. If you can send a message in the demo app, the issue is on the integration side.

To troubleshoot integration issues, first check if the user has joined the meeting successfully. If the user has <a href="https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/">joined</a> the meeting successfully, check if the user's <a href="https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/">preset</a> has permissions to send messages. If you are using a custom UI, check if the core <a href="https://developers.cloudflare.com/realtime/realtimekit/core/chat/">Chat APIs</a> are working to eliminate the Core SDK from the usual suspects.

If this does not solve the issue, check if your framework is blocking the UI. Frameworks like Material UI can block input focus using focus traps in Drawer component. There is usually a prop to disable the focus trap. Material UI has a <code>disableEnforceFocus</code> prop for this purpose.

If you are still unable to send a message, please contact support.

</details>

### Recording

<details>

<summary>

Watermark images appear broken in recordings

</summary>

When you pass a watermark image URL via the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/recordings/methods/start_recordings/">Start Recording</a> API, the recorder loads that image inside a browser running in a Cloudflare container. If the image appears broken, check the following:

- **CORS headers**: The image URL must return proper CORS headers (for example, <code>Access-Control-Allow-Origin: *</code>) in the HTTP response. Without these headers, the browser blocks the image from loading.
- **Direct image URL**: The URL must point directly to the image file (for example, <code>https://example.com/logo.png</code>), not to an HTML page that embeds the image.
- **No redirects**: The URL must not redirect to another location. The recorder fetches the URL as-is, so redirects may cause the image to fail to load.

</details>

### Network access

<details>

<summary>

Which domains and ports must I allowlist when my network restricts outbound traffic?

</summary>

If your network restricts outbound traffic, refer to <a href="https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/">Network allowlist</a> for the domains and ports required for your RealtimeKit integration.

</details>

<details>

<summary>

How can I check if my network and devices are ready for a RealtimeKit meeting?

</summary>

Go to <a href="https://test.realtime.cloudflare.com/">test.realtime.cloudflare.com ↗</a> and run the pre-call test. The test checks your camera, microphone, and network, and verifies connectivity to Cloudflare Realtime endpoints, so you can confirm that the required services are not blocked by your network or firewall before joining a meeting. For required domains and ports, refer to <a href="https://developers.cloudflare.com/realtime/realtimekit/network-allowlist/">Network allowlist</a>.

</details>

### Demo App

<details>

<summary>

Can I use the Cloudflare hosted demo app or examples in my website as an iframe?

</summary>

We strongly recommend against embedding the Cloudflare hosted demo app or examples as an iframe in your website, even if you pass authentication tokens via URL parameters.

Instead, set up the default meeting UI in your own website by following the <a href="https://developers.cloudflare.com/realtime/realtimekit/ui-kit/">UI Kit setup guide</a> or deploy the <a href="https://github.com/cloudflare/realtimekit-web-examples/">RealtimeKit web examples ↗</a> under your own domain. The effort required for either approach is minimal and provides significant benefits:

- **Control**: You maintain full control over the user experience, structure, and interface.
- **Stability**: Your implementation remains consistent and will not change overnight, protecting your product from sudden disruptions.
- **Reliability**: You control when and how to upgrade, ensuring a stable experience for your users.

The demo app and example applications may be updated at any time without prior notice.

</details>

### Billing

<details>

<summary>

How are Audio/Video Participant and Audio-Only Participant minutes charged?

</summary>

RealtimeKit bills active participant minutes. Billing starts when a participant joins a meeting session and stops when they leave it.

<br>

**Key billing rules:**

- **No-shows are not billed:** Adding someone with the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/">Add Participant API</a> does not incur charges. RealtimeKit does not charge for that participant if they never join the meeting.
- **Usage is billed by duration:** RealtimeKit charges for the exact time, including seconds, that a participant spends in an active session. The participant is still billed when they do not produce or consume audio or video.
- **Multiple tabs are billed separately:** If someone joins from multiple browser tabs with the same auth token, RealtimeKit bills each tab separately. The RealtimeKit dashboard displays the aggregated duration for that participant.

For more information about the difference between meetings and sessions, refer to <a href="https://developers.cloudflare.com/realtime/realtimekit/concepts/">RealtimeKit concepts</a>.

<br>

For example:

- If two participants join at 7:00 p.m. and leave at 7:30 p.m., each participant uses 30 minutes. RealtimeKit charges 60 participant minutes.
- If one participant joins at 4:00 p.m., another joins at 4:03 p.m., and both leave at 5:00 p.m., they use 60 and 57 minutes. RealtimeKit charges 117 participant minutes.
- If one participant joins at 3:00 p.m. and leaves at 3:27 p.m., while another joins at 3:05 p.m. and leaves at 3:30 p.m., they use 27 and 25 minutes. RealtimeKit charges 52 participant minutes.
- If five participants are expected but only two join, RealtimeKit charges participant minutes only for the two participants who joined.
- If two participants are expected to join a pre-created meeting at 2:00 p.m. but neither joins, RealtimeKit does not charge any participant minutes.

<br>

Creating meetings and participant tokens does not incur charges.

</details>

<details>

<summary>

How is composite recording export charged?

</summary>

For composite recordings, a recorder joins the meeting as a hidden virtual participant and records its view. For more information, refer to the <a href="https://developers.cloudflare.com/realtime/realtimekit/recording-guide/">recording guides</a>.

After the final participant leaves, the recorder remains active for the meeting's <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/create/#(resource)%20realtime_kit.meetings%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20session_keep_alive_time_in_secs%20%3E%20(schema)"><code>session_keep_alive_time_in_secs</code></a>. The default is 60 seconds, and the maximum is 600 seconds.

RealtimeKit does not charge participant minutes for the recorder. Instead, it charges export minutes for the recorded duration. Refer to <a href="https://developers.cloudflare.com/realtime/realtimekit/pricing/">RealtimeKit pricing</a> for current rates.

<br>

When <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/create/#(resource)%20realtime_kit.meetings%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20record_on_start%20%3E%20(schema)"><code>record_on_start</code></a> is <code>true</code>:

- If two participants join at 7:00 p.m. and leave at 7:30 p.m., recording starts at 7:00 p.m. After both participants leave, the recorder remains active for the default 60-second session keep-alive period. Recording stops at 7:31 p.m., so RealtimeKit charges 31 export minutes.
- If five participants are expected but only two join at 8:00 p.m. and leave at 8:20 p.m., recording runs until 8:21 p.m. with the default session keep-alive period. RealtimeKit charges 21 export minutes. The charge would remain 21 export minutes if all five participants joined and left at the same times because participant count does not affect recording export minutes.
- If nobody joins a pre-created meeting, recording does not start. Creating a meeting with <code>record_on_start</code> set to <code>true</code> does not incur charges by itself.

<br>

When someone starts recording during an active session:

- If recording starts at 4:20 p.m. and the final participant leaves at 5:00 p.m., it stops at 5:01 p.m. by default. RealtimeKit charges 41 export minutes.
- If recording starts at 4:20 p.m. and someone calls <a href="https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/"><code>kickAll()</code></a> at 5:00 p.m., recording stops immediately. RealtimeKit charges 40 export minutes.
- If a meeting and recording start at 4:20 p.m., the meeting uses a two-minute keep-alive period, and all participants close their tabs at 5:00 p.m., recording stops at 5:02 p.m. RealtimeKit charges 42 export minutes.

<br>

This keep-alive period helps workflows that must preserve a single recording across brief disconnections. For example, an education technology (EdTech) application might record a timed take-home assignment in a one-participant meeting. If the participant loses their network connection and rejoins before the keep-alive period expires, the recorder continues the same recording. The recording contains an empty gap during the disconnection, but the application does not need to combine two separate recordings.

<br>

The export charges include the keep-alive period. To avoid this extra time, explicitly end the session by calling <a href="https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/"><code>kickAll()</code></a> or the <a href="https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_all_participants/">Kick all participants API</a>.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/faq/#page","headline":"FAQ","description":"Frequently asked questions about RealtimeKit meetings, recordings, and SDK usage.","url":"https://developers.cloudflare.com/realtime/realtimekit/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
