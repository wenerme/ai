---
title: Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices
description: Fix Enhanced HTTP/2 Prioritization issues on iOS and Safari.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/protocol/troubleshooting/enhanced-http2-prioritization-ios-safari.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices

Occasionally, [Enhanced HTTP/2 Prioritization](https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/) can negatively affect the experience of visitors using Safari on macOS or any browser on iOS.

These visitors may notice not being able to load the site properly, such as images not displaying or content taking too long to load.

## Solution

If visitors using using Safari on macOS or any browser on iOS are experiencing issues with your site loading properly, try [disabling Enhanced HTTP/2 Prioritization](https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/#enable-enhanced-http2-prioritization).

Note

Sometimes, [HTTP/2](https://developers.cloudflare.com/speed/optimization/protocol/http2/) will cause **Enhanced HTTP/2 Prioritization** to be re-enabled automatically.

If you notice this happening, also disable **HTTP/2**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/protocol/","name":"Protocol optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/protocol/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/protocol/troubleshooting/enhanced-http2-prioritization-ios-safari/","name":"Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices"}}]}
```
