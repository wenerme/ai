---
title: Download live stream videos
description: Enable MP4 downloads for Cloudflare Stream live recordings under four hours.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/stream/stream-live/download-stream-live-videos.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Download live stream videos

You can enable downloads for live stream videos from the Cloudflare dashboard. Videos are available for download after they enter the **Ready** state.

Note

Downloadable MP4s are only available for live recordings under four hours. Live recordings exceeding four hours can be played at a later time but cannot be downloaded as an MP4.

1. In the Cloudflare dashboard, go to the **Live inputs** page.  
[ Go to **Live inputs** ](https://dash.cloudflare.com/?to=/:account/stream/inputs)
2. Select a live input from the list.
3. Under **Videos created by live input**, select your video.
4. Under **Settings**, select **Enable MP4 Downloads**.
5. Select **Save**. You will see a progress bar as the video generates a download link.
6. When the download link is ready, under **Download URL**, copy the URL and enter it in a browser to download the video.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/stream-live/","name":"Stream live video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/stream-live/download-stream-live-videos/","name":"Download live stream videos"}}]}
```
