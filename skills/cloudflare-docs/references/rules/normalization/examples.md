---
title: URL normalization examples
description: Examples of the impact of different URL normalization settings in the URLs of incoming requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Copy page

# URL normalization examples

The following table shows how different [URL normalization settings](https://developers.cloudflare.com/rules/normalization/settings/) affect request URLs before they pass to other Cloudflare features and to the origin server:

| Incoming URL                | Normalization type | Normalize incoming URLs | Normalize URLs to origin | URL at Cloudflare's network  | URL passed to origin server  |
| --------------------------- | ------------------ | ----------------------- | ------------------------ | ---------------------------- | ---------------------------- |
| www.example.com/hello       | (any)              | _Off_                   | _Off_                    | www.example.com/hello        | www.example.com/hello        |
| www.example.com/hello       | (any)              | _On_                    | _Off_                    | www.example.com/hello        | www.example.com/hello        |
| www.example.com/hello       | (any)              | _On_                    | _On_                     | www.example.com/hello        | www.example.com/hello        |
| example.com/%68ello         | (any)              | _Off_                   | _Off_                    | example.com/%68ello          | example.com/%68ello          |
| example.com/%68ello         | (any)              | _On_                    | _Off_                    | example.com/hello            | example.com/%68ello          |
| example.com/%68ello         | (any)              | _On_                    | _On_                     | example.com/hello            | example.com/hello            |
| example.com/%68ello//pa\\th | _RFC-3986_         | _Off_                   | _Off_                    | example.com/%68ello//pa\\th  | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _RFC-3986_         | _On_                    | _Off_                    | example.com/hello//pa%5Cth   | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _RFC-3986_         | _On_                    | _On_                     | example.com/hello//pa%5Cth   | example.com/hello//pa%5Cth   |
| example.com/%68ello//pa\\th | _Cloudflare_       | _Off_                   | _Off_                    | example.com/%68ello//pa\\th  | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _Cloudflare_       | _On_                    | _Off_                    | example.com/hello/pa/th      | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _Cloudflare_       | _On_                    | _On_                     | example.com/hello/pa/th      | example.com/hello/pa/th      |
| example.com/hello//../path  | _RFC-3986_         | _On_                    | _On_                     | example.com/hello/path       | example.com/hello/path       |
| example.com/hello//../path  | _Cloudflare_       | _On_                    | _On_                     | example.com/path             | example.com/path             |
| example.com/hello/\\../path | _RFC-3986_         | _On_                    | _On_                     | example.com/hello/%5C../path | example.com/hello/%5C../path |
| example.com/hello/\\../path | _Cloudflare_       | _On_                    | _On_                     | example.com/path             | example.com/path             |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/normalization/","name":"URL normalization"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/normalization/examples/","name":"URL normalization examples"}}]}
```
