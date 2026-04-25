---
title: Ignore JavaScripts
description: Exclude specific scripts from Rocket Loader optimization.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript) 

# Ignore JavaScripts

You can have Rocket Loader ignore individual scripts by adding the `data-cfasync="false"` attribute to the relevant script tag:

```

<script data-cfasync="false" src="/javascript.js"></script>


```

Rocket Loader will still optimize the loading of all other scripts on the page.

Note

If Rocket Loader is only impacting a specific page, use a [Configuration Rule](https://developers.cloudflare.com/rules/configuration-rules/) to exclude that page by URL.

## Limitations

* Adding this attribute within JavaScript will not work if you wish to exclude the script from Rocket Loader.
* If the script you want Rocket Loader to ignore has dependency on other JavaScript(s) on the page, those dependencies must also have the `data-cfasync="false"` attribute.
* The `data-cfasync` attribute must be added before the `src` attribute.
* Rocket Loader will recognize the tag when either single or double quotes are placed around the attribute value.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/rocket-loader/","name":"Rocket Loader"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/content/rocket-loader/ignore-javascripts/","name":"Ignore JavaScripts"}}]}
```
