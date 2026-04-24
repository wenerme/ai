---
title: Available Managed Transforms
description: Learn about Cloudflare's Managed Transforms for modifying HTTP headers, including bot protection, TLS client auth, and leaked credentials checks.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/managed-transforms/reference.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Available Managed Transforms

This page lists the available Managed Transforms. They can modify HTTP request headers or response headers.

For more complex and customized header modifications, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Important remarks

* Enabling a Managed Transform may cause issues in your website. You should test any changes in a staging environment. If you detect any undesired or unexpected behavior, consider disabling the Managed Transform and creating a partial implementation using your own transform rule.
* The names of HTTP headers are case-insensitive. Cloudflare may use a capitalization different from the one presented in this page. Make sure that your origin server can handle HTTP request headers regardless of the exact capitalization of their names.

## HTTP request headers

### Add bot protection headers

Note

Requires an Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Adds HTTP headers with bot-related values to the request sent to the origin server:

* `cf-bot-score`: Contains the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) (for example, `30`).
* `cf-verified-bot`: Contains `true` if the request comes from a [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/), or `false` otherwise.
* `cf-ja3-hash`: Contains the [JA3 fingerprint](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/).
* `cf-ja4`: Contains the [JA4 fingerprint](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/).

### Add TLS client auth headers

Adds HTTP headers with [Mutual TLS](https://developers.cloudflare.com/api-shield/security/mtls/) (mTLS) client authentication values to the request sent to the origin server:

* `cf-cert-revoked`: Value from the [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/) field.
* `cf-cert-verified`: Value from the [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) field.
* `cf-cert-presented`: Value from the [cf.tls\_client\_auth.cert\_presented](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fpresented/) field.
* `cf-cert-issuer-dn`: Value from the [cf.tls\_client\_auth.cert\_issuer\_dn](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fdn/) field.
* `cf-cert-subject-dn`: Value from the [cf.tls\_client\_auth.cert\_subject\_dn](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fsubject%5Fdn/) field.
* `cf-cert-issuer-dn-rfc2253`: Value from the [cf.tls\_client\_auth.cert\_issuer\_dn\_rfc2253](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fdn%5Frfc2253/) field.
* `cf-cert-subject-dn-rfc2253`: Value from the [cf.tls\_client\_auth.cert\_subject\_dn\_rfc2253](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fsubject%5Fdn%5Frfc2253/) field.
* `cf-cert-issuer-dn-legacy`: Value from the [cf.tls\_client\_auth.cert\_issuer\_dn\_legacy](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fdn%5Flegacy/) field.
* `cf-cert-subject-dn-legacy`: Value from the [cf.tls\_client\_auth.cert\_subject\_dn\_legacy](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fsubject%5Fdn%5Flegacy/) field.
* `cf-cert-serial`: Value from the [cf.tls\_client\_auth.cert\_serial](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fserial/) field.
* `cf-cert-issuer-serial`: Value from the [cf.tls\_client\_auth.cert\_issuer\_serial](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fserial/) field.
* `cf-cert-fingerprint-sha256`: Value from the [cf.tls\_client\_auth.cert\_fingerprint\_sha256](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Ffingerprint%5Fsha256/) field.
* `cf-cert-fingerprint-sha1`: Value from the [cf.tls\_client\_auth.cert\_fingerprint\_sha1](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Ffingerprint%5Fsha1/) field.
* `cf-cert-not-before`: Value from the [cf.tls\_client\_auth.cert\_not\_before](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fnot%5Fbefore/) field.
* `cf-cert-not-after`: Value from the [cf.tls\_client\_auth.cert\_not\_after](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fnot%5Fafter/) field.
* `cf-cert-ski`: Value from the [cf.tls\_client\_auth.cert\_ski](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fski/) field.
* `cf-cert-issuer-ski`: Value from the [cf.tls\_client\_auth.cert\_issuer\_ski](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fski/) field.

### Add visitor location headers

Adds HTTP headers with location information for the visitor's IP address to the request sent to the origin server:

* `cf-ipcity`: The visitor's city (value from the [ip.src.city](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.city/) field).
* `cf-ipcountry`: The visitor's country (value from the [ip.src.country](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.country/) field).
* `cf-ipcontinent`: The visitor's continent (value from the [ip.src.continent](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.continent/) field).
* `cf-iplongitude`: The visitor's longitude (value from the [ip.src.lon](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.lon/) field).
* `cf-iplatitude`: The visitor's latitude (value from the [ip.src.lat](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.lat/) field).
* `cf-region`: The visitor's region (value from the [ip.src.region](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.region/) field).
* `cf-region-code`: The visitor's region code (value from the [ip.src.region\_code](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.region%5Fcode/) field).
* `cf-metro-code`: The visitor's metro code (value from the [ip.src.metro\_code](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.metro%5Fcode/) field).
* `cf-postal-code`: The visitor's postal code (value from the [ip.src.postal\_code](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.postal%5Fcode/) field).
* `cf-timezone`: The name of the visitor's timezone (value from the [ip.src.timezone.name](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.timezone.name/) field).

Note

Turning on [IP geolocation](https://developers.cloudflare.com/network/ip-geolocation/) will send a `cf-ipcountry` HTTP header to your origin server even when **Add visitor location headers** is turned off.

#### Encoding of non-ASCII header values

Cloudflare always converts non-ASCII characters to UTF-8 in HTTP request and response header values. This applies to location headers added by the **Add visitor location headers** managed transform.

### Add "True-Client-IP" header

Note

Only available on Enterprise plans.

Adds a `true-client-ip` request header with the visitor's IP address.

This Managed Transform is unavailable when [**Remove visitor IP headers**](#remove-visitor-ip-headers) is enabled.

### Remove visitor IP headers

Removes HTTP headers that may contain the visitor's IP address from the request sent to the origin server. Handles the following HTTP request headers:

* `cf-connecting-ip`
* `x-forwarded-for` (refer to the [notes](#visitor-ip-address-in-the-x-forwarded-for-http-header) below)
* `true-client-ip`

This Managed Transform is unavailable when [**Add "True-Client-IP" header**](#add-true-client-ip-header) is enabled.

#### Visitor IP address in the `x-forwarded-for` HTTP header

For the `x-forwarded-for` HTTP request header, enabling **Remove visitor IP headers** will only remove the visitor IP from the header value when Cloudflare receives a request proxied by at least another CDN (content delivery network). In this case, Cloudflare will only keep the IP address of the last proxy.

For example, consider an incoming request proxied by two CDNs (`CDN_1` and `CDN_2`) before reaching the Cloudflare network. The `x-forwarded-for` header would be similar to the following:  
`x-forwarded-for: <VISITOR_IP>, <THIRD_PARTY_CDN_1_IP>, <THIRD_PARTY_CDN_2_IP>`

With **Remove visitor IP headers** enabled, the `x-forwarded-for` header sent to the origin server will be:  
`x-forwarded-for: <THIRD_PARTY_CDN_2_IP>`

### Add leaked credentials checks header

Adds an `Exposed-Credential-Check` request header whenever the WAF detects leaked credentials in the incoming request.

The header can have these values:

| Header + Value              | Description                                                             | Availability       |
| --------------------------- | ----------------------------------------------------------------------- | ------------------ |
| Exposed-Credential-Check: 1 | Previously leaked username and password detected                        | Pro plan and above |
| Exposed-Credential-Check: 2 | Previously leaked username detected                                     | Enterprise plan    |
| Exposed-Credential-Check: 3 | Similar combination of previously leaked username and password detected | Enterprise plan    |
| Exposed-Credential-Check: 4 | Previously leaked password detected                                     | All plans          |

You will only receive this managed header at your origin server if:

* The [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) in the WAF is turned on.
* The **Add Leaked Credentials Checks Header** managed transform is turned on.
* Your Cloudflare plan supports the type of credentials detection. For example, Free plans can only know if a password was previously leaked. In this situation, Cloudflare will add an `Exposed-Credential-Check: 4` header to the request.

### Add malicious uploads detection header

Adds a `Malicious-Uploads-Detection` request header indicating the outcome of scanning uploaded content for malicious signatures.

The header can have one of the following values:

| Header + Value                 | Description                                                                                                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Malicious-Uploads-Detection: 1 | The request contains at least one malicious content object ([cf.waf.content\_scan.has\_malicious\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Fmalicious%5Fobj/) is true).         |
| Malicious-Uploads-Detection: 2 | The file scanner was unable to scan all the content objects detected in the request ([cf.waf.content\_scan.has\_failed](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Ffailed/) is true). |
| Malicious-Uploads-Detection: 3 | The request contains at least one content object ([cf.waf.content\_scan.has\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Fobj/) is true).                                          |

For more information, refer to [Malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

## HTTP response headers

### Remove "X-Powered-By" headers

Removes the `X-Powered-By` HTTP response header that provides information about the application at the origin server that handled the request.

### Add security headers

Note

Adding the following security headers may have an impact on your website, such as blocking resources or triggering certificate errors. If you find any issues, try disabling the Managed Transform to isolate the possible cause.

Adds several security-related HTTP response headers. The added response headers and values are the following:

* `x-content-type-options: nosniff`
* `x-xss-protection: 1; mode=block`
* `x-frame-options: SAMEORIGIN`
* `referrer-policy: same-origin`
* `expect-ct: max-age=86400, enforce`

To increase protection, [enable HTTP Strict Transport Security (HSTS)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/) for your website.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/managed-transforms/","name":"Managed Transforms"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/managed-transforms/reference/","name":"Available Managed Transforms"}}]}
```
