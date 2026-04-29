---
title: Enable
description: Turn on Rocket Loader for your zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable

To enable or disable Rocket Loader, use the following instructions.

* [ Dashboard ](#tab-panel-7882)
* [ API ](#tab-panel-7883)

To enable or disable **Rocket Loader** in the dashboard:

1. In the Cloudflare dashboard, go to the **Speed** \> **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization)
2. Go to **Content Optimization**.
3. For **Rocket Loader**, switch the toggle to **On**.

If you have a Content Security Policy (CSP) in place for your domain, you will need to [update your headers](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#product-requirements) to support Rocket Loader.

To enable or disable **Rocket Loader** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `rocket_loader` as the setting name in the URI path, and the `value` parameter set to `"on"` or `"off"`.

If you have a Content Security Policy (CSP) in place for your domain, you will need to [update your headers](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#product-requirements) to support Rocket Loader.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/rocket-loader/","name":"Rocket Loader"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/content/rocket-loader/enable/","name":"Enable"}}]}
```
