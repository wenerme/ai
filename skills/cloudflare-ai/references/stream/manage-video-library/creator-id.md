---
description: Set and use creator IDs to associate Cloudflare Stream videos with internal user accounts.
title: Manage creators
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage creators

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/manage-video-library/creator-id/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can set the creator field with an internal user ID at the time a tokenized upload URL is requested. When the video is uploaded, the creator property is automatically set to the internal user ID which can be used for analytics data or when searching for videos by a specific creator.

For basic uploads, you will need to add the Creator ID after you upload the video.

## Upload from URL

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/copy" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"url":"https://example.com/myvideo.mp4","creator": "<CREATOR_ID>","thumbnailTimestampPct":0.529241,"allowedOrigins":["example.com"],"requireSignedURLs":true,"watermark":{"uid":"ea95132c15732412d22c1476fa83f27a"}}'
```

```ts
const client = new Cloudflare({
	apiEmail: process.env['CLOUDFLARE_EMAIL'],
	apiKey: process.env['CLOUDFLARE_API_KEY'],
});

const video = await client.stream.copy.create({
	account_id: '<ACCOUNT_ID>',
	url: 'https://example.com/myvideo.mp4',
	creator: '<CREATOR_ID>',
	thumbnailTimestampPct: 0.529241,
	allowedOrigins: ['example.com'],
	requireSignedURLs: true,
	watermark: { uid: 'ea95132c15732412d22c1476fa83f27a' },
});
```

**Response**

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"allowedOrigins": ["example.com"],
		"created": "2014-01-02T02:20:00Z",
		"duration": 300,
		"input": {
			"height": 1080,
			"width": 1920
		},
		"maxDurationSeconds": 300,
		"meta": {},
		"modified": "2014-01-02T02:20:00Z",
		"uploadExpiry": "2014-01-02T02:20:00Z",
		"playback": {
			"hls": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8",
			"dash": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.mpd"
		},
		"preview": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/watch",
		"readyToStream": true,
		"requireSignedURLs": true,
		"size": 4190963,
		"status": {
			"state": "ready",
			"pctComplete": "100.000000",
			"errorReasonCode": "",
			"errorReasonText": ""
		},
		"thumbnail": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg",
		"thumbnailTimestampPct": 0.529241,
		"creator": "<CREATOR_ID>",
		"uid": "6b9e68b07dfee8cc2d116e4c51d6a957",
		"liveInput": "fc0a8dc887b16759bfd9ad922230a014",
		"uploaded": "2014-01-02T02:20:00Z",
		"watermark": {
			"uid": "6b9e68b07dfee8cc2d116e4c51d6a957",
			"size": 29472,
			"height": 600,
			"width": 400,
			"created": "2014-01-02T02:20:00Z",
			"downloadedFrom": "https://company.com/logo.png",
			"name": "Marketing Videos",
			"opacity": 0.75,
			"padding": 0.1,
			"scale": 0.1,
			"position": "center"
		}
	}
}
```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

```ts
export default {
	async fetch(request, env) {
		const video = await env.STREAM.upload("https://example.com/myvideo.mp4", {
			creator: "<CREATOR_ID>",
			thumbnailTimestampPct: 0.529241,
			allowedOrigins: ["example.com"],
			requireSignedURLs: true,
			watermarkId: "ea95132c15732412d22c1476fa83f27a",
		});
		return Response.json(video);
	},
};
```

```json
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<ENTER_WORKER_NAME>",
	"main": "src/index.ts",
	"compatibility_date": "$today",
	"observability": {
		"enabled": true
	},
	"stream": {
		"binding": "STREAM"
	}
}
```

See the full [Workers Stream binding API reference](https://developers.cloudflare.com/stream/manage-video-library/bindings/).

## Set default creators for videos

You can associate videos with a single creator by setting a default creator ID value, which you can later use for searching for videos by creator ID or for analytics data.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/live_inputs" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"defaultCreator":"1234"}'
```

```ts
const client = new Cloudflare({
	apiEmail: process.env['CLOUDFLARE_EMAIL'],
	apiKey: process.env['CLOUDFLARE_API_KEY'],
});

const liveInput = await client.stream.liveInputs.create({
	account_id: '<ACCOUNT_ID>',
	defaultCreator: '1234',
});
```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

If you have multiple creators who start live streams, [create a live input](https://developers.cloudflare.com/stream/get-started/#step-1-create-a-live-input) for each creator who will live stream and then set a `DefaultCreator` value per input. Setting the default creator ID for each input ensures that any recorded videos streamed from the creator's input will inherit the `DefaultCreator` value.

At this time, you can only manage the default creator ID values via the API.

Note

Setting default creator IDs for live inputs is only available via the API. The Stream binding does not currently support live input operations.

## Update creator in existing videos

To update the creator property in existing videos, make a `POST` request to the video object endpoint with a JSON payload specifying the creator property as show in the example below.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/<VIDEO_UID>" \
--header "Authorization: Bearer <AUTH_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"creator":"test123"}'
```

```ts
const client = new Cloudflare({
	apiEmail: process.env['CLOUDFLARE_EMAIL'],
	apiKey: process.env['CLOUDFLARE_API_KEY'],
});

const video = await client.stream.edit({
	account_id: '<ACCOUNT_ID>',
	identifier: '<VIDEO_UID>',
	creator: 'test123',
});
```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

```ts
export default {
	async fetch(request, env) {
		const video = await env.STREAM.video("<VIDEO_UID>").update({
			creator: "test123",
		});
		return Response.json(video);
	},
};
```

```json
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<ENTER_WORKER_NAME>",
	"main": "src/index.ts",
	"compatibility_date": "$today",
	"observability": {
		"enabled": true
	},
	"stream": {
		"binding": "STREAM"
	}
}
```

See the full [Workers Stream binding API reference](https://developers.cloudflare.com/stream/manage-video-library/bindings/).

## Direct creator upload

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/direct_upload" \
--header "Authorization: Bearer <AUTH_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"maxDurationSeconds":300,"expiry":"2021-01-02T02:20:00Z","creator": "<CREATOR_ID>", "thumbnailTimestampPct":0.529241,"allowedOrigins":["example.com"],"requireSignedURLs":true,"watermark":{"uid":"ea95132c15732412d22c1476fa83f27a"}}'
```

```ts
const client = new Cloudflare({
	apiEmail: process.env['CLOUDFLARE_EMAIL'],
	apiKey: process.env['CLOUDFLARE_API_KEY'],
});

const directUpload = await client.stream.directUpload.create({
	account_id: '<ACCOUNT_ID>',
	maxDurationSeconds: 300,
	expiry: '2021-01-02T02:20:00Z',
	creator: '<CREATOR_ID>',
	thumbnailTimestampPct: 0.529241,
	allowedOrigins: ['example.com'],
	requireSignedURLs: true,
	watermark: { uid: 'ea95132c15732412d22c1476fa83f27a' },
});
```

**Response**

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"uploadURL": "www.example.com/samplepath",
		"uid": "ea95132c15732412d22c1476fa83f27a",
		"creator": "<CREATOR_ID>",
		"watermark": {
			"uid": "ea95132c15732412d22c1476fa83f27a",
			"size": 29472,
			"height": 600,
			"width": 400,
			"created": "2014-01-02T02:20:00Z",
			"downloadedFrom": "https://company.com/logo.png",
			"name": "Marketing Videos",
			"opacity": 0.75,
			"padding": 0.1,
			"scale": 0.1,
			"position": "center"
		}
	}
}
```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

```ts
export default {
	async fetch(request, env) {
		const directUpload = await env.STREAM.createDirectUpload({
			maxDurationSeconds: 300,
			expiry: "2021-01-02T02:20:00Z",
			creator: "<CREATOR_ID>",
			thumbnailTimestampPct: 0.529241,
			allowedOrigins: ["example.com"],
			requireSignedURLs: true,
			watermark: {
				id: "ea95132c15732412d22c1476fa83f27a",
			},
		});
		return Response.json(directUpload);
	},
};
```

```json
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<ENTER_WORKER_NAME>",
	"main": "src/index.ts",
	"compatibility_date": "$today",
	"observability": {
		"enabled": true
	},
	"stream": {
		"binding": "STREAM"
	}
}
```

See the full [Workers Stream binding API reference](https://developers.cloudflare.com/stream/manage-video-library/bindings/).

## Get videos by Creator ID

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream?after=2014-01-02T02:20:00Z&before=2014-01-02T02:20:00Z&include_counts=false&creator=<CREATOR_ID>&limit=undefined&asc=false&status=downloading,queued,inprogress,ready,error" \
--header "Authorization: Bearer <API_TOKEN>"
```

```ts
const client = new Cloudflare({
	apiEmail: process.env['CLOUDFLARE_EMAIL'],
	apiKey: process.env['CLOUDFLARE_API_KEY'],
});

const videos = await client.stream.list({
	account_id: '<ACCOUNT_ID>',
	creator: '<CREATOR_ID>',
});
```

**Response**

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": [
		{
			"allowedOrigins": ["example.com"],
			"created": "2014-01-02T02:20:00Z",
			"duration": 300,
			"input": {
				"height": 1080,
				"width": 1920
			},
			"maxDurationSeconds": 300,
			"meta": {},
			"modified": "2014-01-02T02:20:00Z",
			"uploadExpiry": "2014-01-02T02:20:00Z",
			"playback": {
				"hls": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8",
				"dash": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd"
			},
			"preview": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
			"readyToStream": true,
			"requireSignedURLs": true,
			"size": 4190963,
			"status": {
				"state": "ready",
				"pctComplete": "100.000000",
				"errorReasonCode": "",
				"errorReasonText": ""
			},
			"thumbnail": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
			"thumbnailTimestampPct": 0.529241,
			"creator": "some-creator-id",
			"uid": "ea95132c15732412d22c1476fa83f27a",
			"liveInput": "fc0a8dc887b16759bfd9ad922230a014",
			"uploaded": "2014-01-02T02:20:00Z",
			"watermark": {
				"uid": "ea95132c15732412d22c1476fa83f27a",
				"size": 29472,
				"height": 600,
				"width": 400,
				"created": "2014-01-02T02:20:00Z",
				"downloadedFrom": "https://company.com/logo.png",
				"name": "Marketing Videos",
				"opacity": 0.75,
				"padding": 0.1,
				"scale": 0.1,
				"position": "center"
			}
		}
	],
	"total": "35586",
	"range": "1000"
}
```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

Note

Filtering videos by creator ID is only available via the API. The Stream binding's `videos.list()` method does not currently support filtering by creator.

## tus

Add the Creator ID via the `Upload-Creator` header. For more information, refer to [Resumable and large files (tus)](https://developers.cloudflare.com/stream/uploading-videos/resumable-uploads/#set-creator-property).

## Query by Creator ID with GraphQL

After you set the creator property, you can use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/) to filter by a specific creator. Refer to [Fetching bulk analytics](https://developers.cloudflare.com/stream/getting-analytics/fetching-bulk-analytics) for more information about available metrics and filters.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/manage-video-library/creator-id/#page","headline":"Manage creators · Cloudflare Stream docs","description":"Set and use creator IDs to associate Cloudflare Stream videos with internal user accounts.","url":"https://developers.cloudflare.com/stream/manage-video-library/creator-id/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
