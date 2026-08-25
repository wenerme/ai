---
description: Add AI-powered transcription and summarization to RealtimeKit meetings.
title: AI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# AI

Last updated Jun 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ai/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

RealtimeKit provides AI-powered features using Cloudflare's AI infrastructure to enhance your meetings with transcription and summarization capabilities.

* [Transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/)
* [Summary](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/)

## Available features

| Feature                                                                                   | Description                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------- |
| [Transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/) | Real-time and post-meeting speech-to-text |
| [Summary](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/)             | AI-generated meeting summaries            |

## Quick start

Turn on post-meeting transcription and automatic summaries when creating a meeting:

```json
{
	"title": "Team Standup",
	"transcribe_on_end": true,
	"summarize_on_end": true,
	"ai_config": {
		"transcription": {
			"language": "en"
		},
		"summarization": {
			"word_limit": 500,
			"text_format": "markdown",
			"summary_type": "team_meeting"
		}
	}
}
```

Use `transcribe_on_end` for post-meeting transcripts. Use `summarize_on_end` for AI-generated summaries. For real-time transcription, make sure participants have `transcription_enabled: true` in their [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

## Storage and retention

* Transcripts and summaries are stored for **7 days** after the meeting ends
* Files are stored in R2 with presigned URLs for secure access
* Delivered via [webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/) or REST API

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ai/#page","headline":"AI · Cloudflare Realtime docs","description":"Add AI-powered transcription and summarization to RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/ai/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
