---
title: Content compression
description: Learn how Cloudflare compresses content for faster web performance.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/content/compression.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Content compression

Cloudflare compresses content in two ways: between Cloudflare and your website visitors and between Cloudflare and your origin server.

## Compression between Cloudflare and website visitors

In addition to Cloudflare's [default caching behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/), Cloudflare supports Gzip, Brotli, and Zstandard compression when delivering content to website visitors.

Note

Customers can enable Zstandard compression through [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/).

If supported by visitors' web browsers, Cloudflare will return Gzip, Brotli, or Zstandard-encoded responses for the following content types:

```

text/html

text/richtext

text/plain

text/css

text/x-script

text/x-component

text/x-java-source

text/x-markdown

application/javascript

application/x-javascript

text/javascript

text/js

image/x-icon

image/vnd.microsoft.icon

application/x-perl

application/x-httpd-cgi

text/xml

application/xml

application/rss+xml

application/vnd.api+json

application/x-protobuf

application/json

multipart/bag

multipart/mixed

application/xhtml+xml

font/ttf

font/otf

font/x-woff

image/svg+xml

application/vnd.ms-fontobject

application/ttf

application/x-ttf

application/otf

application/x-otf

application/truetype

application/opentype

application/x-opentype

application/font-woff

application/eot

application/font

application/font-sfnt

application/wasm

application/javascript-binast

application/manifest+json

application/ld+json

application/graphql+json

application/geo+json


```

Explain Code

Cloudflare's global network can deliver content to website visitors using Gzip compression, Brotli compression, Zstandard compression, or no compression, depending on:

* The values visitors provide in the `accept-encoding` request header.
* Your [Cloudflare plan](#between-visitors-and-cloudflare).
* Any configured [compression rule](https://developers.cloudflare.com/rules/compression-rules/) that matches incoming requests.

For responses with error status codes, Cloudflare will only compress responses if their error status code is `403` or `404`. For successful response status codes, Cloudflare will only compress responses if their status code is `200`. Responses with other status codes will not be compressed.

You can override Cloudflare's default compression behavior using [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/).

Minimum response size for compression

Cloudflare will only apply compression to responses with a minimum size when sending them to website visitors:

* For Gzip, responses must have a minimum size of 48 bytes.
* For Brotli and Zstandard, responses must have a minimum size of 50 bytes.

Smaller responses will not be compressed, regardless of their content type.

### Content-Length header handling

When Cloudflare compresses a response sent to the website visitor, it may omit the `Content-Length` HTTP header to avoid delivering incorrect length information caused by dynamic transformations. To preserve the `Content-Length` header set by the origin server, add `cache-control: no-transform` to the origin server's response. This directive prevents Cloudflare from altering compression on responses, allowing the `Content-Length` header to pass through as-is. The `cache-control: no-transform` header must be set by the origin — it cannot be added in client requests.

---

## Content compression from origin servers to the Cloudflare network

When requesting content from your origin server, Cloudflare supports Brotli compression, Gzip compression, or no compression.

flowchart LR
accTitle: Compressed responses sent from the origin server
accDescr: Cloudflare accepts responses from origin server using Brotli compression, Gzip compression, or no compression.

A[Visitor browser]
B((Cloudflare))
C[(Origin server)]

A -.-> B == "Request<br>Accept-Encoding: br, gzip" ==> C
C == "Response<br>(Brotli / Gzip / No compression)" ==> B -.-> A

style A stroke-dasharray: 5 5
style B stroke: orange,fill: orange,color: black
style C stroke-width: 2px
linkStyle 1,2 stroke-width: 2px
linkStyle 0,3 stroke-width: 1px

If your origin server responds to a Cloudflare request using Brotli/Gzip compression, we will keep the same compression in the response sent to the website visitor if:

* You include a `content-encoding` header in your server response mentioning the compression being used (`br` or `gzip`).
* The visitor browser (or client) supports the compression algorithm.
* You do not enable Cloudflare features that change the response content (refer to [Notes about end-to-end compression](#notes-about-end-to-end-compression) for details).

Cloudflare's reverse proxy can also convert between compressed formats and uncompressed formats. Cloudflare can receive content from your origin server with Brotli or Gzip compression and serve it to visitors uncompressed (or vice versa), independently of caching.

If you do not want a particular response from your origin to be encoded with Brotli/Gzip when delivered to website visitors, you can disable this by including a `cache-control: no-transform` HTTP header in the response from your origin web server.

Warning

Cloudflare will take into consideration the `accept-encoding` header value in website visitors' requests when sending responses to those visitors. However, when requesting content from your origin server, Cloudflare will send a different `Accept-Encoding` header, supporting Brotli and Gzip compression.

---

## Notes about end-to-end compression

### Content recompression due to dynamic transformations

Even when using the same compression algorithm end to end (between your origin server and Cloudflare, and between the Cloudflare global network and your website visitor), Cloudflare will need to decompress the response and compress it again if you enable any of the following settings for the request:

* [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
* [Cloudflare Fonts](https://developers.cloudflare.com/speed/optimization/content/fonts/)
* [Email Address Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)
* [Polish](https://developers.cloudflare.com/images/polish/)
* [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/)
* [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/)
* [RUM](https://developers.cloudflare.com/speed/observatory/run-speed-test/#enable-real-user-monitoring-rum)

To disable these settings for specific URI paths, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

Note

Additionally, the [Replace insecure JS libraries](https://developers.cloudflare.com/waf/tools/replace-insecure-js-libraries/) setting also requires Cloudflare to decompress the response and compress it again. At this time, you cannot turn it off using Configuration Rules.

### Content-Length header

Cloudflare may remove the `Content-Length` HTTP header of responses delivered to website visitors. To ensure that the header is preserved, add a `cache-control: no-transform` HTTP header to the response at the origin server.

## Compression methods by plan

### Between visitors and Cloudflare

By default, Cloudflare uses the following compression methods for content delivery, depending on the zone plan. However, the actual compression applied may also depend on what the visitor's browser requests via the `accept-encoding` header.

* Free Plan: Content is compressed by default using Zstandard.
* Pro and Business Plans: Content is compressed by default using Brotli.
* Enterprise Plan: Content is compressed by default using Gzip.

### Between Cloudflare and the origin server

On all plans, Cloudflare requests content from the origin server using the `accept-encoding: br, gzip` header. This means that Cloudflare asks the origin to send the content compressed using Brotli or Gzip, depending on which method the origin server supports.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/compression/","name":"Content compression"}}]}
```
