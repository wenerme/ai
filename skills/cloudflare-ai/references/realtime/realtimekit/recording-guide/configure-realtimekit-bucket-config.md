---
description: Disable automatic recording uploads to the RealtimeKit R2 bucket using the realtimekit_bucket_config parameter.
title: Disable Upload to RealtimeKit Bucket
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Disable Upload to RealtimeKit Bucket

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-realtimekit-bucket-config/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once the recording is complete, by default, RealtimeKit uploads all recordings to RealtimeKit's Cloudflare R2 bucket. Additionally, a presigned URL is generated with a 7-day expiry. The recording can be accessed using the `downloadUrl` associated with each recording.

However, RealtimeKit provides users with the flexibility to choose whether or not to upload their recordings to RealtimeKit's R2 bucket. If you wish to disable uploads to RealtimeKit's bucket, you can set the `realtimekit_bucket_config` parameter to false in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

For example:

```json
{
	"realtimekit_bucket_config": {
		"enabled": false
	}
}
```

Note

If you haven't specified an external storage configuration and also disabled uploads to RealtimeKit's bucket, then the recording will not be uploaded to any location. It is considered as an invalid recording.

For more information on how to set your external storage configuration, see [Publish Recorded File to Your Cloud Provider](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/custom-cloud-storage/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-realtimekit-bucket-config/#page","headline":"Disable Upload to RealtimeKit Bucket · Cloudflare Realtime docs","description":"Disable automatic recording uploads to the RealtimeKit R2 bucket using the realtimekit\\_bucket\\_config parameter.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-realtimekit-bucket-config/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
