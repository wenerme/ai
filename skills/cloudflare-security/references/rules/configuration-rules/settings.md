---
description: Available settings you can customize with Configuration Rules.
title: Configuration Rules settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration Rules settings

Last updated Sep 8, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/rules/configuration-rules/settings/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can change the configuration settings described below in a configuration rule.

## Automatic HTTPS Rewrites

[Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) prevents end users from seeing `Mixed content` errors by rewriting URLs from `http` to `https` for resources or links on your website that can be served with HTTPS.

Use this setting to turn on or off Automatic HTTPS Rewrites for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"automatic_https_rewrites"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "automatic_https_rewrites": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Browser Integrity Check

[Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) blocks access to pages based on specific HTTP headers commonly abused by spammers.

Use this setting to turn on or off Browser Integrity Check for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"bic"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "bic": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Disable Real User Monitoring (RUM)

[Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), also known as Real User Monitoring (RUM), is Cloudflare's free, privacy-first analytics for your website.

Use this setting to turn off Web Analytics for matching requests.

Warning

Configuration rules have precedence over any Web Analytics rules. If a Web Analytics rule turns on analytics measurements for an incoming request and the same request matches a configuration rule turning off Web Analytics, the configuration rule will win.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"disable_rum"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "disable_rum": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Disable Zaraz

[Cloudflare Zaraz](https://developers.cloudflare.com/zaraz/) gives you complete control over third-party tools and services for your website, and allows you to offload them to the Cloudflare global network.

Use this setting to turn off Zaraz for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"disable_zaraz"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "disable_zaraz": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Email Obfuscation

[Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) prevents spam by hiding email addresses from bots and harvesters while keeping them visible to human visitors to your site.

Use this setting to turn on or off Email Obfuscation for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"email_obfuscation"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "email_obfuscation": false
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Fonts

[Cloudflare Fonts](https://developers.cloudflare.com/speed/optimization/content/fonts/) rewrites Google Fonts to be delivered from a website's own origin, eliminating the need to rely on third-party font providers.

Use this setting to turn on or off Cloudflare Fonts for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"fonts"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "fonts": false
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Hotlink Protection

[Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/) prevents your images from being used by other sites, potentially reducing the bandwidth consumed by your origin server.

Use this setting to turn on or off Hotlink Protection for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"hotlink_protection"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
    "hotlink_protection": false
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## I'm Under Attack

When enabled, [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) performs additional security checks to help mitigate layer 7 DDoS attacks. Validated users access your website and suspicious traffic is blocked.

Use this setting to turn on or off Under Attack mode for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"security_level"</code> (string).

API values: <code>"off"</code>, <code>"essentially_off"</code>, <code>"under_attack"</code>.

*API configuration examplejson*

```json
"action_parameters": {
  "security_level": "under_attack"
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Markdown for Agents

[Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) automatically converts HTML to Markdown for requests that use content negotiation headers (`Accept: text/markdown`).

Use this setting to turn on or off Markdown for Agents for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"content_converter"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "content_converter": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Opportunistic Encryption

[Opportunistic Encryption](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/) allows browsers to access HTTP URIs over an encrypted TLS channel.

Use this setting to turn on or off Opportunistic Encryption for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"opportunistic_encryption"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "opportunistic_encryption": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Polish

[Cloudflare Polish](https://developers.cloudflare.com/images/polish/) is a one-click image optimization product that automatically optimizes images in your site.

Use this setting to configure Polish for matching requests:

- Off
- Lossless
- Lossy
- WebP

Refer to [Compression options](https://developers.cloudflare.com/images/polish/compression/#compression-options) for more information on these values.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"polish"</code> (string).

API values: <code>"off"</code>, <code>"lossless"</code>, <code>"lossy"</code>, <code>"webp"</code>.

*API configuration examplejson*

```json
"action_parameters": {
  "polish": "webp"
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Request Body Buffering

Use the Request Body Buffering setting to configure the request body buffering mode for matching requests:

- **Standard** (default): Allows Cloudflare products to inspect a prefix of the request body when necessary for enabled functionality on your zone.
- **Full**: Buffers the entire request body before sending the request to your origin server.
- **None**: Strictly no buffering. The request body is streamed directly to the origin server without inspection.

Caution

Setting request body buffering to **None** may break functionality that requires body inspection. In particular, this can impact the effectiveness of the Web Application Firewall (WAF) and other security features that rely on analyzing request bodies to detect and block threats.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"request_body_buffering"</code> (string).

API values: <code>"standard"</code>, <code>"full"</code>, <code>"none"</code>.

*API configuration examplejson*

```json
"action_parameters": {
  "request_body_buffering": "full"
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Response Body Buffering

Use the Response Body Buffering setting to configure the response body buffering mode for matching requests:

- **Standard** (default): Allows Cloudflare products to inspect a prefix of the response body when necessary for enabled functionality on your zone.
- **None**: Strictly no buffering. The response body is streamed directly to the client without inspection.

For features that inspect response content and troubleshooting guidance, refer to [Response body inspection](https://developers.cloudflare.com/rules/configuration-rules/response-body-inspection/).

Caution

Setting response body buffering to **None** may break functionality that requires body inspection. In particular, this can impact the effectiveness of the Web Application Firewall (WAF) and other security features that rely on analyzing response bodies to detect and block threats.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"response_body_buffering"</code> (string).

API values: <code>"standard"</code>, <code>"none"</code>.

*API configuration examplejson*

```json
"action_parameters": {
  "response_body_buffering": "standard"
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## Rocket Loader

[Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) prioritizes your website's content (such as text, images, and fonts) by deferring the loading of all your JavaScript code until after rendering.

Use this setting to turn on or off Rocket Loader for matching requests.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"rocket_loader"</code> (boolean).

*API configuration examplejson*

```json
"action_parameters": {
  "rocket_loader": true
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

## SSL

[SSL/TLS encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin web server and how SSL certificates presented by your origin will be validated.

Use this setting to configure the SSL/TLS encryption mode for matching requests:

- Off
- Flexible
- Full
- Strict
- Origin Pull

Refer to [Available encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/#available-encryption-modes) for more information on these values.

<details>

<summary>

API information

</summary>

API configuration property name: <code>"ssl"</code> (string).

API values: <code>"off"</code>, <code>"flexible"</code>, <code>"full"</code>, <code>"strict"</code>, <code>"origin_pull"</code>.

*API configuration examplejson*

```json
"action_parameters": {
  "ssl": "flexible"
}
```

Refer to <a href="https://developers.cloudflare.com/rules/configuration-rules/create-api/#example-requests">Create a configuration rule via API</a> for complete API examples.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/configuration-rules/settings/#page","headline":"Configuration Rules settings · Cloudflare Rules docs","description":"Available settings you can customize with Configuration Rules.","url":"https://developers.cloudflare.com/rules/configuration-rules/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
