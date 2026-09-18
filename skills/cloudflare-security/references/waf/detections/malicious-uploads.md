---
description: Scan uploaded files for malware and malicious content.
title: Malicious uploads detection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Malicious uploads detection

Last updated Sep 18, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/detections/malicious-uploads/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The malicious uploads detection is a [traffic detection](https://developers.cloudflare.com/waf/concepts/#detection-versus-mitigation) that scans files and other content uploaded to your application for malware.

When you turn on this detection, the WAF inspects incoming uploads and checks them for malicious signatures. The scan results are available as [fields](#content-scanning-fields) you can use in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to act on requests containing malicious content.

Note

This feature is available to customers on an Enterprise plan with a paid add-on.

## How it works

Once you turn on this detection, Cloudflare inspects all incoming traffic and identifies [content objects](#what-is-a-content-object) automatically.

When Cloudflare detects one or more content objects in a request, it sends them to an antivirus (AV) scanner for analysis. The AV scanner is the same one used in [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/).

Based on the scan results, the detection populates [fields](#content-scanning-fields) you can reference in rule expressions. For example, you can create a rule to block requests with malicious files, or a more specific rule that also matches on file size, file type, or URI path.

Notes

Content scanning does not block or challenge requests on its own. It provides detection signals only. To act on these signals, create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

For more information on detection versus mitigation, refer to [Concepts](https://developers.cloudflare.com/waf/concepts/#detection-versus-mitigation).

Enabling malicious uploads detection can introduce latency since content objects will be scanned. Latency can vary depending on object size.

## What is a content object?

A content object is a file or binary payload in a request that Cloudflare identifies as scannable content. The malicious uploads detection uses heuristics to find content objects automatically, without relying on the request's `Content-Type` header (since this header can be manipulated).

The following content types are excluded from scanning: `text/html`, `text/x-shellscript`, `application/json`, `text/csv`, and `text/xml`. All other detected content is treated as a content object. Common examples include:

- Executable files (for example, `.exe`, `.bat`, `.dll`, and `.wasm`)
- Documents (for example, `.doc`, `.docx`, `.pdf`, `.ppt`, and `.xls`)
- Compressed files (for example, `.gz`, `.zip`, and `.rar`)
- Image files (for example, `.jpg`, `.png`, `.gif`, `.webp`, and `.tif`)
- Video and audio files

If Cloudflare detects a malicious object but cannot determine its exact content type, it reports the object as `application/octet-stream`.

## Scanned content

Content scanning can check the following content objects for malicious content:

- Uploaded files in a request
- Portions of the request body for multipart requests encoded as `multipart/form-data` or `multipart/mixed`
- Specific JSON properties in the request body (containing, for example, files encoded in Base64) according to the [custom scan expressions](#custom-scan-expressions) you provide

### Size limit

The content scanner inspects up to the first 50 MB of a request body. When a request contains more than one content object, for example a submitted HTML form with several file inputs, all the content objects share this 50 MB.

Every content object within the first 50 MB of the request body is checked and reported individually.

Content beyond the first 50 MB is handled as follows:

- If the request body is **not multipart** (for example, a raw file upload or a single JSON property) and is larger than 50 MB, the scanner analyzes the first 50 MB of the object and provides scan results based on that portion.
- If the request body is **multipart** ( `multipart/form-data` or `multipart/mixed`) and larger than 50 MB in total, content objects that fall entirely within the first 50 MB are scanned as usual. The content object that straddles the 50 MB boundary is not scanned, and neither is any content object that follows it. This applies even when the multipart request contains only one file, since a single-part multipart upload is still a multipart body.

Caution

Content objects that the scanner does not reach because of the 50 MB limit are not reported in the [content scanning fields](#content-scanning-fields). They are not counted in `cf.waf.content_scan.num_obj`, they do not appear in `cf.waf.content_scan.obj_results`, and they do not set `cf.waf.content_scan.has_failed`.

This means a request whose content was only partly scanned can produce the same field values as a request that was fully scanned and found to be clean. Use [`cf.waf.content_scan.truncated`](#content-scanning-fields) to detect these requests and decide how to handle them.

Notes

- The AV scanner will not scan some particular types of files, namely the following:
  - Password-protected archives
  - Archives with more than three recursion levels
  - Archives with more than 300 files
  - PGP-encrypted files
- In rare cases, the AV scanner may time out and fail to analyze a content object. When this happens, the `cf.waf.content_scan.has_failed` field will be set to true. This field refers to scans that were attempted but did not complete. It is not set for content that the scanner did not reach because of the 50 MB size limit.

## Custom scan expressions

Sometimes, you may want to specify where to find the content objects, such as when the content is a Base64-encoded string within a JSON payload. For example:

```json
{ "file": "<BASE64_ENCODED_STRING>" }
```

In these situations, configure a custom scan expression to tell the content scanner where to find the content objects. For more information, refer to [Configure a custom scan expression](https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/#4-optional-configure-a-custom-scan-expression).

For more information and additional examples of looking up fields in nested JSON payloads, refer to the [`lookup_json_string()`](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup_json_string) function documentation.

Note

The content scanner will automatically decode Base64 strings.

## Content scanning fields

When content scanning is enabled, you can use the following fields in WAF rules:

| Field | Description |
| --- | --- |
| Has content object <br> [`cf.waf.content_scan.has_obj`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_obj/) <br> `Boolean` | Indicates whether the request contains at least one content object. |
| Has malicious content object <br> [`cf.waf.content_scan.has_malicious_obj`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_malicious_obj/) <br> `Boolean` | Indicates whether the request contains at least one malicious content object. |
| Number of malicious content objects <br> [`cf.waf.content_scan.num_malicious_obj`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.num_malicious_obj/) <br> `Integer` | The number of malicious content objects detected in the request (zero or greater). |
| Content scan has failed <br> [`cf.waf.content_scan.has_failed`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_failed/) <br> `Boolean` | Indicates whether the file scanner was unable to scan any of the content objects detected in the request. |
| Content scan truncated <br> [`cf.waf.content_scan.truncated`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.truncated/) <br> `Boolean` | Indicates whether the request body exceeded the size limit for content scanning and was truncated before scanning, meaning the scan results may be incomplete. Refer to [Size limit](#size-limit). |
| Number of content objects <br> [`cf.waf.content_scan.num_obj`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.num_obj/) <br> `Integer` | The number of content objects detected in the request (zero or greater). |
| Content object size <br> [`cf.waf.content_scan.obj_sizes`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.obj_sizes/) <br> `Array<Integer>` | An array of file sizes in bytes, in the order the content objects were detected in the request. |
| Content object type <br> [`cf.waf.content_scan.obj_types`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.obj_types/) <br> `Array<String>` | An array of file types in the order the content objects were detected in the request. |
| Content object result <br> [`cf.waf.content_scan.obj_results`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.obj_results/) <br> `Array<String>` | An array of scan results in the order the content objects were detected in the request. <br> Possible values: `clean`, `suspicious`, `infected`, and `not scanned`. |

For examples of rule expressions using these fields, refer to [Example rules](https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/#page","headline":"Malicious uploads detection · Cloudflare Web Application Firewall (WAF) docs","description":"Scan uploaded files for malware and malicious content.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
