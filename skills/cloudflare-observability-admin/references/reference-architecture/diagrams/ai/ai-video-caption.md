---
description: By integrating automatic speech recognition technology into video platforms, content creators, publishers, and distributors can reach a broader audience, including individuals with hearing impairments or those who prefer to consume content in different languages.
title: Automatic captioning for video uploads
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt
> Use this file to discover all available pages before exploring further.

# Automatic captioning for video uploads

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-video-caption/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Introduction

Automatic Speech Recognition (ASR) models have revolutionized the accessibility of video content by enabling the generation of subtitles and translations. These models utilize advanced algorithms to transcribe spoken words into text with high accuracy. By integrating ASR technology into video platforms, content creators, publishers, and distributors can reach a broader audience, including individuals with hearing impairments or those who prefer to consume content in different languages.

The process begins with capturing the audio from the video source, which is then fed into the ASR model. This model analyzes the audio waveform and converts it into a textual representation, capturing the spoken content in the form of subtitles. Furthermore, you can also use ASR models for language translation, enabling the creation of multilingual subtitles. Once the subtitles are generated, they can be displayed alongside the video, providing a synchronized text representation of the spoken content.

## Automatic captioning on upload

![Figure 1: Automatic captioning on upload](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=600,format=svg/_astro/ai-auto-caption-architecture-diagram.CyBpgQKS.svg "Figure 1:  Automatic captioning on upload")

Figure 1: Automatic captioning on upload

1. **Client upload**: Send POST request with both video and audio to API endpoint.
2. **Audio transcription**: Generate timestamped transcriptions by calling [Workers AI](https://developers.cloudflare.com/workers-ai/) [automatic speech recognition (ARS) model](https://developers.cloudflare.com/workers-ai/models/) with audio as input. Use [Workers](https://developers.cloudflare.com/workers/) to convert the output to a supported subtitled format.
3. **Store subtitles**: Store the subtitle file(s) on [R2](https://developers.cloudflare.com/r2/).
4. **Store video**: Store the video files on [R2](https://developers.cloudflare.com/r2/).
5. **Client request**: Send GET requests for video and subtitle(s) to origin. Use global [Cache](https://developers.cloudflare.com/cache/) to increase performance.
6. **Origin request**: Fetch file(s) from [R2](https://developers.cloudflare.com/r2/) on cache `MISS` by using [Public Buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/).

## Related resources

* [Community project: automatic captioning demo ↗](https://auto-caption.pages.dev/)
* [Workers AI: Automatic speech recognition (ARS) model](https://developers.cloudflare.com/workers-ai/models/)
* [R2: Object storage for all your data](https://developers.cloudflare.com/r2/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-video-caption/#page","headline":"Automatic captioning for video uploads · Cloudflare Reference Architecture docs","description":"By integrating automatic speech recognition technology into video platforms, content creators, publishers, and distributors can reach a broader audience, including individuals with hearing impairments or those who prefer to consume content in different languages.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-video-caption/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
