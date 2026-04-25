---
title: P​urge varied images
description: Purge cached image variants created by Vary for Images.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# P​urge varied images

Purging varied images instantly purges all content variants for that URL. This behavior occurs so that if an image changes, you can easily update the cache with a single purge request instead of trying to determine the potential number of out-of-date variants. The behavior is true regardless of [purge type](https://developers.cloudflare.com/cache/how-to/purge-cache/) used, such as [single file](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/), [tag](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/), or [hostname](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/purge-cache/purge-varied-images/","name":"P​urge varied images"}}]}
```
