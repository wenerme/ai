---
title: iOS
description: Stream on-demand and live Cloudflare Stream video in native iOS, tvOS, and macOS apps using AVPlayer.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/stream/viewing-videos/using-own-player/ios.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# iOS

You can stream both on-demand and live video to native iOS, tvOS and macOS apps using [AVPlayer ↗](https://developer.apple.com/documentation/avfoundation/avplayer).

Note

Before you can play videos, you must first [upload a video to Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/) or be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live)

## Example Apps

* [iOS](https://developers.cloudflare.com/stream/examples/ios/)

## Using AVPlayer

Play a video from Cloudflare Stream using AVPlayer:

Swift

```

import SwiftUI

import AVKit


struct MyView: View {

    // Change the url to the Cloudflare Stream HLS manifest URL

    private let player = AVPlayer(url: URL(string: "https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8")!)


    var body: some View {

        VideoPlayer(player: player)

            .onAppear() {

                player.play()

            }

    }

}


struct MyView_Previews: PreviewProvider {

    static var previews: some View {

        MyView()

    }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/viewing-videos/","name":"Play video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/viewing-videos/using-own-player/","name":"Use your own player"}},{"@type":"ListItem","position":5,"item":{"@id":"/stream/viewing-videos/using-own-player/ios/","name":"iOS"}}]}
```
