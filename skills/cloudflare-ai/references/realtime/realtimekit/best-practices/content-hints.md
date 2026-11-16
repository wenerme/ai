---
description: Set browser content hints on RealtimeKit audio, video, and screen-sharing tracks to match speech, motion, music, or detailed content.
title: Content hints
image: https://developers.cloudflare.com/realtime/realtimekit/best-practices/content-hints/og.png?v=ca3a99653fc93bda
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Content hints

Last updated Nov 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/best-practices/content-hints/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `MediaStreamTrack.contentHint` to describe the content of local media tracks. The browser can use this hint to guide media processing and encoding.

This guide applies to the RealtimeKit Web SDKs, including applications that use Web UI Kit.

This page is not available for the **Mobile**platform.

WebMobile

ReactWeb ComponentsAngular

## Choose a hint

Choose a hint based on the content, not only the capture source.

| Track kind | Hint | Use case |
| --- | --- | --- |
| Audio | `"speech"` | Microphone conversations and spoken presentations. |
| Audio | `"music"` | Music performances or shared audio that contains music. |
| Audio | `"speech-recognition"` | Audio intended for machine speech recognition. |
| Video | `"motion"` | Camera video, movies, or games where smooth motion matters. |
| Video | `"detail"` | Presentations, diagrams, or artwork where detail matters. |
| Video | `"text"` | Documents, code editors, or web pages with text. |
| Either | `""` | Clear the explicit hint and let the browser choose. |

For example, use `"text"` for a shared code editor, but `"motion"` for a shared video. Use `"music"` for shared music and `"speech"` for spoken content.

## Apply hints to local tracks

Set hints on the outgoing tracks exposed by [`meeting.self`](https://developers.cloudflare.com/realtime/realtimekit/humans/core/local-participant/#media-properties). Listen to `audioUpdate`, `videoUpdate`, and `screenShareUpdate` to apply hints when tracks become available or change.

1. [Initialize the Core SDK](https://developers.cloudflare.com/realtime/realtimekit/humans/core/#initialize-core-sdk) and obtain the `meeting` instance.
2. Register update listeners and apply hints to existing tracks.

   This example assumes spoken microphone audio, camera video, and presentation screen sharing. It uses `"music"` for optional shared audio. Change these hints to match your content.

   ```js
   function applyContentHints(meeting) {
   	const { self } = meeting;

   	function setHint(track, hint) {
   		if (track && "contentHint" in track) {
   			track.contentHint = hint;
   		}
   	}

   	function handleAudioUpdate({ audioTrack }) {
   		setHint(audioTrack, "speech");
   	}

   	function handleVideoUpdate({ videoTrack }) {
   		setHint(videoTrack, "motion");
   	}

   	function handleScreenShareUpdate({ screenShareTracks }) {
   		setHint(screenShareTracks?.video, "detail");
   		setHint(screenShareTracks?.audio, "music");
   	}

   	self.on("audioUpdate", handleAudioUpdate);
   	self.on("videoUpdate", handleVideoUpdate);
   	self.on("screenShareUpdate", handleScreenShareUpdate);

   	// Initialization may have already created local tracks.
   	handleAudioUpdate(self);
   	handleVideoUpdate(self);
   	handleScreenShareUpdate(self);

   	return () => {
   		self.off("audioUpdate", handleAudioUpdate);
   		self.off("videoUpdate", handleVideoUpdate);
   		self.off("screenShareUpdate", handleScreenShareUpdate);
   	};
   }

   const removeContentHintListeners = applyContentHints(meeting);
   ```

3. When your component unmounts or before you replace the meeting instance, remove the listeners you registered.

   ```js
   removeContentHintListeners();
   ```

A content hint belongs to an individual track. The example automatically reapplies hints when update events provide replacement tracks. This covers device changes and switches to a different shared screen.

For browser compatibility and property details, refer to [`MediaStreamTrack.contentHint` on MDN ↗︎](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/contentHint/) and [Can I use: content hints ↗︎](https://caniuse.com/?search=contentHint).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/best-practices/content-hints/#page","headline":"Content hints","description":"Set browser content hints on RealtimeKit audio, video, and screen-sharing tracks to match speech, motion, music, or detailed content.","url":"https://developers.cloudflare.com/realtime/realtimekit/best-practices/content-hints/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/best-practices/content-hints/og.png?v=ca3a99653fc93bda","dateModified":"2026-11-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
