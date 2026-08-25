---
description: Enable malicious upload detection for file upload endpoints.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

WAF content scanning is available to customers on an Enterprise plan with a paid add-on.

## 1\. Turn on the detection

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Turn on **Malicious uploads detection**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Account WAF Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/enable" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Use the `cloudflare_content_scanning` resource to enable content scanning for a zone. For example:

```terraform
resource "cloudflare_content_scanning" "zone_content_scanning_example" {
	zone_id = var.cloudflare_zone_id
	enabled = true
}
```

Note

Enabling malicious uploads detection can introduce latency since content objects will be scanned. Latency can vary depending on object size.

## 2\. Validate the content scanning behavior

Use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) and HTTP logs to validate that malicious content objects are being detected correctly.

You can use the [EICAR anti-malware test file ↗](https://www.eicar.org/download-anti-malware-testfile/) to test content scanning (select the ZIP format).

Alternatively, create a custom rule like described in the next step using a _Log_ action instead of a mitigation action like _Block_. This rule will generate [security events](https://developers.cloudflare.com/waf/analytics/security-events/) that will allow you to validate your configuration.

## 3\. Create a custom rule

[Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) that blocks detected malicious content objects uploaded to your application.

For example, create a custom rule with the _Block_ action and the following expression:

| Field                        | Operator | Value |
| ---------------------------- | -------- | ----- |
| Has malicious content object | equals   | True  |

If you use the Expression Editor, enter the following expression:

```txt
(cf.waf.content_scan.has_malicious_obj)
```

Rule action: _Block_

This rule will match requests where Cloudflare detects a suspicious or malicious content object. For a list of fields provided by WAF content scanning, refer to [Content scanning fields](https://developers.cloudflare.com/waf/detections/malicious-uploads/#content-scanning-fields).

Optional: Combine with other Rules language fields

You can combine the previous expression with other [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) and [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) of the Rules language. This allows you to customize the rule scope or combine content scanning with other security features. For example:

* The following expression will match requests with malicious content objects uploaded to a specific endpoint:

| Field                        | Operator | Value      | Logic |
| ---------------------------- | -------- | ---------- | ----- |
| Has malicious content object | equals   | True       | And   |
| URI Path                     | contains | upload.php |       |
Expression when using the editor:
```txt
(cf.waf.content_scan.has_malicious_obj and http.request.uri.path contains "upload.php")
```
* The following expression will match requests from bots uploading content objects:

| Field              | Operator  | Value | Logic |
| ------------------ | --------- | ----- | ----- |
| Has content object | equals    | True  | And   |
| Bot Score          | less than | 10    |       |
Expression when using the editor:
```txt
(cf.waf.content_scan.has_obj and cf.bot_management.score lt 10)
```

For additional examples, refer to [Example rules](https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/).

## 4\. (Optional) Configure a custom scan expression

To check uploaded content in a way that is not covered by the default configuration, add a [custom scan expression](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions).

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Under **Malicious uploads detection** \> **Configurations**, select the edit icon.
4. Select **Add content location**.
5. In **Content location**, enter your custom scan expression. For example:
```txt
lookup_json_string(http.request.body.raw, "file")
```
6. Select **Save**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Account WAF Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '[
		{
				"payload": "lookup_json_string(http.request.body.raw, \"file\")"
		}
	]'
```

The above request will add the following expression to the current list of custom scan expressions:

```txt
lookup_json_string(http.request.body.raw, "file")
```

Use the `cloudflare_content_scanning_expression` resource to add a custom scan expression. For example:

```terraform
resource "cloudflare_content_scanning_expression" "my_custom_scan_expression" {
  zone_id = var.cloudflare_zone_id
  payload = "lookup_json_string(http.request.body.raw, \"file\")"
}
```

For more information, refer to [Custom scan expressions](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/#page","headline":"Get started with malicious uploads detection · Cloudflare Web Application Firewall (WAF) docs","description":"Enable malicious upload detection for file upload endpoints.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
