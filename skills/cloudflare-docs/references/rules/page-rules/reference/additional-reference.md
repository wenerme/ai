---
title: Additional reference for Page Rules
description: Additional reference information for Page Rules settings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Cookies ](https://developers.cloudflare.com/search/?tags=Cookies)[ Caching ](https://developers.cloudflare.com/search/?tags=Caching) 

# Additional reference for Page Rules

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Bypass Cache on Cookie setting

This setting is available to Business and Enterprise customers.

The **Bypass Cache on Cookie** setting supports basic regular expressions (regex) as follows:

* A pipe operator (represented by `|`) to match multiple cookies using _OR_ boolean logic. For example, `bypass=.*|PHPSESSID=.*` would bypass the cache if either a cookie called `bypass` or `PHPSESSID` were set, regardless of the cookie's value.
* The wildcard operator (represented by `.*`), such that a rule value of `t.*st=` would match both a cookie called `test` and one called `teeest`.

Limitations include:

* 150 characters per cookie regex
* 12 wildcards per cookie regex
* 1 wildcard in between each `|` in the cookie regex

To learn how to configure **Bypass Cache on Cookie** with a cache rule, refer to [Bypass Cache on Cookie](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/).

Note

If you add both this setting and the enterprise-only _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.

## Zone name occurrences must end with a slash

When saving a page rule, Cloudflare will ensure that there is a slash after each occurrence of the current zone name in the **If the URL matches** field. For example, if the current zone name is `example.com`, then:

* `example.com` will be saved as `example.com/`
* `example.com/path/example.com` will be saved as `example.com/path/example.com/`

Note that `example.com/some-path/cloudflare.com` will be saved _without_ a final slash, since the zone name is not `cloudflare.com`.

## Network ports supported by Page Rules

If you specify a port in the **If the URL matches** field of a page rule, it must be one of the following:

* One of the HTTP/HTTPS ports [compatible with Cloudflare’s proxy](https://developers.cloudflare.com/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
* A custom port of a [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/) HTTPS application.

## Using Page Rules with Workers

If the URL of the current request matches both a page rule and a [Workers custom route](https://developers.cloudflare.com/workers/configuration/routing/routes/), some Pages Rules settings will not be applied. For more details, refer to [Page Rules](https://developers.cloudflare.com/workers/configuration/workers-with-page-rules/).

## Page Rules are case-insensitive

The pattern entered under **If the URL matches** will not consider upper and lower case differences — `example.com/path`, `example.com/Path`, and `example.com/PATH` will be triggered the same way.

If you need your rules to consider case sensitivity, you might want to use alternative [Rules](https://developers.cloudflare.com/rules/) options instead.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/page-rules/","name":"Page Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/page-rules/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/page-rules/reference/additional-reference/","name":"Additional reference for Page Rules"}}]}
```
