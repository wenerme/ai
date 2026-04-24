---
title: Monitor Recording Status
description: Track RealtimeKit recording states from invocation through upload completion.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/recording-guide/monitor-status.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Monitor Recording Status

## Recording states

The recording of a meeting can have the following states:

| Name      | Description                                                                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INVOKED   | Our backend servers have received the recording request, and the master is looking for a ready worker to assign the recording job.                                                                                                                         |
| RECORDING | The meeting is currently being recorded by a worker; note that this will also hold true if the meeting is being live streamed.                                                                                                                             |
| UPLOADING | The recording has been stopped and the file is being uploaded to the cloud storage. If you have not specified storage details, then the files will be uploaded only to RealtimeKit's server. Any RTMP and livestreaming link will also stop at this stage. |
| UPLOADED  | The recording file upload is complete and the status webhook is also triggered.                                                                                                                                                                            |
| ERRORED   | There was an irrecoverable error while recording the meeting and the file will not be available.                                                                                                                                                           |

## Fetching the state

There are two ways you can track what state a recording is in or view more details about a recording:

### Using the `recording.statusUpdate` webhook

RealtimeKit sends out a `recording.statusUpdate` webhook each time the recording transitions between states during its lifecycle. Configure webhooks in your RealtimeKit app to receive these notifications.

### By polling HTTP APIs

Alternatively, you can also use the following APIs:

* [List recordings](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Frecordings/): This endpoint gets all past and ongoing recordings linked to a meeting.
* [Fetch active recording](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/): This endpoint gets all ongoing recordings of a meeting.
* [Fetch details of a recording](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/): This endpoint gets a specific recording using a recording ID.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/monitor-status/","name":"Monitor Recording Status"}}]}
```
