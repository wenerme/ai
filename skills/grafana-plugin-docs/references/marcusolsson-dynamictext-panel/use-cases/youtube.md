---
title: "YouTube video | Grafana Plugins documentation"
description: "Learn how to embed and display YouTube videos on your Grafana dashboard using the Business Text panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# YouTube video

This idea comes from a [GitHub issue](https://github.com/VolkovLabs/business-text/issues/261) opened by [Raphealtony](https://github.com/Raphealtony). You can use the Business Text plugin to display YouTube videos on your Grafana dashboard.

[](/media/docs/grafana/panels-visualizations/business-text/yt-edit.png)

Use the following external library

[Copy code to clipboard] Copy

```none
https://youtube.com/iframe_api
```

## Content to copy

HTML [Copy code to clipboard] Copy

```html
<h1>Volkov Labs Latest videos</h1>
<div id="player"></div>
```

## After Content Ready

> Warning
>
> Plug-in libraries may change their versions and the code in the example may not work or cause an error.

Use the following for the **JavaScript &gt; After Content Ready**:

js [Copy code to clipboard] Copy

```js
import("https://esm.sh/youtube-player").then(({ default: YouTubePlayer }) => {
  const player = YouTubePlayer("player");

  const videoList = ["AcQi-6GCrNU", "1ogv2jstrlI", "vky-7-DfvXE"];

  const randomVideoId = videoList[Math.floor(Math.random() * videoList.length)];

  player.loadVideoById(randomVideoId);
});
```
