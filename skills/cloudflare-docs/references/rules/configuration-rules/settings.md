---
title: Configuration Rules settings
description: Available settings you can customize with Configuration Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Configuration Rules settings

You can change the configuration settings described below in a configuration rule.

## Automatic HTTPS Rewrites

[Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) prevents end users from seeing `Mixed content` errors by rewriting URLs from `http` to `https` for resources or links on your website that can be served with HTTPS.

Use this setting to turn on or off Automatic HTTPS Rewrites for matching requests.

API information

API configuration property name: `"automatic_https_rewrites"` (boolean).

API configuration example

```

"action_parameters": {

  "automatic_https_rewrites": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Browser Integrity Check

[Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) blocks access to pages based on specific HTTP headers commonly abused by spammers.

Use this setting to turn on or off Browser Integrity Check for matching requests.

API information

API configuration property name: `"bic"` (boolean).

API configuration example

```

"action_parameters": {

  "bic": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Disable Real User Monitoring (RUM)

[Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), also known as Real User Monitoring (RUM), is Cloudflare's free, privacy-first analytics for your website.

Use this setting to turn off Web Analytics for matching requests.

Warning

Configuration rules have precedence over any Web Analytics rules. If a Web Analytics rule turns on analytics measurements for an incoming request and the same request matches a configuration rule turning off Web Analytics, the configuration rule will win.

API information

API configuration property name: `"disable_rum"` (boolean).

API configuration example

```

"action_parameters": {

  "disable_rum": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Disable Zaraz

[Cloudflare Zaraz](https://developers.cloudflare.com/zaraz/) gives you complete control over third-party tools and services for your website, and allows you to offload them to the Cloudflare global network.

Use this setting to turn off Zaraz for matching requests.

API information

API configuration property name: `"disable_zaraz"` (boolean).

API configuration example

```

"action_parameters": {

  "disable_zaraz": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Email Obfuscation

[Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) prevents spam by hiding email addresses from bots and harvesters while keeping them visible to human visitors to your site.

Use this setting to turn on or off Email Obfuscation for matching requests.

API information

API configuration property name: `"email_obfuscation"` (boolean).

API configuration example

```

"action_parameters": {

  "email_obfuscation": false

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Fonts

[Cloudflare Fonts](https://developers.cloudflare.com/speed/optimization/content/fonts/) rewrites Google Fonts to be delivered from a website's own origin, eliminating the need to rely on third-party font providers.

Use this setting to turn on or off Cloudflare Fonts for matching requests.

API information

API configuration property name: `"fonts"` (boolean).

API configuration example

```

"action_parameters": {

  "fonts": false

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Hotlink Protection

[Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/) prevents your images from being used by other sites, potentially reducing the bandwidth consumed by your origin server.

Use this setting to turn on or off Hotlink Protection for matching requests.

API information

API configuration property name: `"hotlink_protection"` (boolean).

API configuration example

```

"action_parameters": {

    "hotlink_protection": false

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## I'm Under Attack

When enabled, [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) performs additional security checks to help mitigate layer 7 DDoS attacks. Validated users access your website and suspicious traffic is blocked.

Use this setting to turn on or off Under Attack mode for matching requests.

API information

API configuration property name: `"security_level"` (string).

API values: `"off"`, `"essentially_off"`, `"under_attack"`.

API configuration example

```

"action_parameters": {

  "security_level": "under_attack"

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Markdown for Agents

[Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) automatically converts HTML to Markdown for requests that use content negotiation headers (`Accept: text/markdown`).

Use this setting to turn on or off Markdown for Agents for matching requests.

API information

API configuration property name: `"content_converter"` (boolean).

API configuration example

```

"action_parameters": {

  "content_converter": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Opportunistic Encryption

[Opportunistic Encryption](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/) allows browsers to access HTTP URIs over an encrypted TLS channel.

Use this setting to turn on or off Opportunistic Encryption for matching requests.

API information

API configuration property name: `"opportunistic_encryption"` (boolean).

API configuration example

```

"action_parameters": {

  "opportunistic_encryption": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Polish

[Cloudflare Polish](https://developers.cloudflare.com/images/polish/) is a one-click image optimization product that automatically optimizes images in your site.

Use this setting to configure Polish for matching requests:

* Off
* Lossless
* Lossy
* WebP

Refer to [Compression options](https://developers.cloudflare.com/images/polish/compression/#compression-options) for more information on these values.

API information

API configuration property name: `"polish"` (string).

API values: `"off"`, `"lossless"`, `"lossy"`, `"webp"`.

API configuration example

```

"action_parameters": {

  "polish": "webp"

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Request Body Buffering

Use the Request Body Buffering setting to configure the request body buffering mode for matching requests:

* **Standard** (default): Allows Cloudflare products to inspect a prefix of the request body when necessary for enabled functionality on your zone.
* **Full**: Buffers the entire request body before sending the request to your origin server.
* **None**: Strictly no buffering. The request body is streamed directly to the origin server without inspection.

Warning

Setting request body buffering to **None** may break functionality that requires body inspection. In particular, this can impact the effectiveness of the Web Application Firewall (WAF) and other security features that rely on analyzing request bodies to detect and block threats.

API information

API configuration property name: `"request_body_buffering"` (string).

API values: `"standard"`, `"full"`, `"none"`.

API configuration example

```

"action_parameters": {

  "request_body_buffering": "full"

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Response Body Buffering

Use the Response Body Buffering setting to configure the response body buffering mode for matching requests:

* **Standard** (default): Allows Cloudflare products to inspect a prefix of the response body when necessary for enabled functionality on your zone.
* **None**: Strictly no buffering. The response body is streamed directly to the client without inspection.

Warning

Setting response body buffering to **None** may break functionality that requires body inspection. In particular, this can impact the effectiveness of the Web Application Firewall (WAF) and other security features that rely on analyzing response bodies to detect and block threats.

API information

API configuration property name: `"response_body_buffering"` (string).

API values: `"standard"`, `"none"`.

API configuration example

```

"action_parameters": {

  "response_body_buffering": "standard"

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## Rocket Loader

[Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) prioritizes your website's content (such as text, images, and fonts) by deferring the loading of all your JavaScript code until after rendering.

Use this setting to turn on or off Rocket Loader for matching requests.

API information

API configuration property name: `"rocket_loader"` (boolean).

API configuration example

```

"action_parameters": {

  "rocket_loader": true

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

## SSL

[SSL/TLS encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin web server and how SSL certificates presented by your origin will be validated.

Use this setting to configure the SSL/TLS encryption mode for matching requests:

* Off
* Flexible
* Full
* Strict
* Origin Pull

Refer to [Available encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/#available-encryption-modes) for more information on these values.

API information

API configuration property name: `"ssl"` (string).

API values: `"off"`, `"flexible"`, `"full"`, `"strict"`, `"origin_pull"`.

API configuration example

```

"action_parameters": {

  "ssl": "flexible"

}


```

Refer to [Create a configuration rule via API](https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests) for complete API examples.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/configuration-rules/","name":"Configuration Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/configuration-rules/settings/","name":"Configuration Rules settings"}}]}
```
