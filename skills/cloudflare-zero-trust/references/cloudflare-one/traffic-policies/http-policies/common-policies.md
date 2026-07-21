---
description: Reference information for Common policies in Gateway.
title: Common policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Common policies

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The following policies are commonly used to secure HTTP traffic. HTTP policies are evaluated in order from top to bottom, and the first matching policy applies — except for [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) policies, which are always evaluated first.

For a baseline set of recommended policies, refer to [Secure your Internet traffic and SaaS apps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/recommended-http-policies/).

Refer to the [HTTP policies page](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) for a comprehensive list of other selectors, operators, and actions.

## Block sites

Block attempts to reach sites by hostname or URL paths. Different approaches may be required based on how a site is organized.

### Block sites by hostname

Block all subdomains that use a host.

| Selector | Operator      | Value            | Action |
| -------- | ------------- | ---------------- | ------ |
| Host     | matches regex | .\*example\\.com | Block  |

In the following API examples, `filters: ["http"]` indicates that this is an HTTP (Layer 7) policy.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block sites by hostname",
		"description": "Block all subdomains that use a specific hostname",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "http.request.host matches \".*example.com\"",
		"identity": "",
		"device_posture": ""
	}'
```

### Block sites by URL

Block a section of a site without blocking the entire site. For example, you can block a specific subreddit, such as `reddit.com/r/gaming`, without blocking `reddit.com`.

| Selector | Operator      | Value     | Action |
| -------- | ------------- | --------- | ------ |
| URL      | matches regex | /r/gaming | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block sites by URL",
		"description": "Block specific parts of a site without blocking the hostname",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "http.request.uri matches \"/r/gaming\"",
		"identity": "",
		"device_posture": ""
	}'
```

## Block content categories

Block content categories which go against your organization's acceptable use policy.

| Selector           | Operator | Value                                                                                 | Action |
| ------------------ | -------- | ------------------------------------------------------------------------------------- | ------ |
| Content Categories | in       | _Questionable Content_, _Security Risks_, _Miscellaneous_, _Adult Themes_, _Gambling_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-HTTP-ContentCategories-Blocklist",
		"description": "Block access to questionable content and potential security risks",
		"precedence": 40,
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(http.request.uri.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161 2 67 125 133 99})",
		"identity": "",
		"device_posture": ""
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "block_unauthorized_apps" {
  account_id     = var.cloudflare_account_id
  name           = "All-HTTP-ContentCategories-Blocklist"
  description    = "Block access to questionable content and potential security risks"
	precedence     = 40
  enabled        = true
  action         = "block"
  filters        = ["http"]
  traffic        = "any(http.request.uri.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161 2 67 125 133 99})"
  identity       = ""
  device_posture = ""
}
```

## Block unauthorized applications

Note

After seven days, view your [Shadow IT SaaS Analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/) and block additional applications based on what your users are accessing.

To minimize the risk of [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/), some organizations choose to limit their users' access to certain web-based tools and applications. For example, the following policy blocks known AI tools:

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| Application | in       | _Artificial Intelligence_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-HTTP-Application-Blocklist",
		"description": "Limit access to shadow IT by blocking web-based tools and applications",
		"precedence": 60,
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(app.type.ids[*] in {25})",
		"identity": "",
		"device_posture": ""
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "all_http_application_blocklist" {
  account_id     = var.cloudflare_account_id
  name           = "All-HTTP-Application-Blocklist"
  description    = "Limit access to shadow IT by blocking web-based tools and applications"
  precedence     = 60
  enabled        = true
  action         = "block"
  filters        = ["http"]
  traffic        = "any(app.type.ids[*] in {25})"
  identity       = ""
  device_posture = ""
}
```

## Check user identity

Configure access on a per user or group basis by adding [identity-based conditions](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) to your policies.

| Selector         | Operator | Value         | Logic | Action |
| ---------------- | -------- | ------------- | ----- | ------ |
| Application      | in       | _Salesforce_  | And   | Block  |
| User Group Names | in       | _Contractors_ |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Check user identity",
		"description": "Block access to Salesforce by temporary employees and contractors",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(app.ids[] in {606})",
		"identity": "any(identity.groups.name[] in {\"Contractors\"})",
		"device_posture": ""
	}'
```

## Skip inspection for groups of applications

Certain client applications, such as Zoom or Apple services, rely on certificate pinning. These applications verify they are connecting directly to their own servers and will reject Gateway's TLS inspection certificate. To avoid connection errors, you must add a Do Not Inspect HTTP policy for these applications.

Gateway [evaluates Do Not Inspect policies first](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#http-policies), regardless of their position in the policy list. Cloudflare recommends moving your Do Not Inspect policies to the top of the list to reduce confusion.

| Selector    | Operator | Value            | Action         |
| ----------- | -------- | ---------------- | -------------- |
| Application | in       | _Do Not Inspect_ | Do Not Inspect |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Bypass incompatible applications",
		"description": "Skip TLS decryption for applications that are incompatible with Gateway",
		"enabled": true,
		"action": "off",
		"filters": [
				"http"
		],
		"traffic": "any(app.type.ids[*] in {16})",
		"identity": "",
		"device_posture": ""
	}'
```

Note

You can select either individual applications or the entire Do Not Inspect set, which will update as new applications are added.

## Check device posture

Require devices to have certain software installed or other configuration attributes. For instructions on setting up a device posture check, refer to [Enforce device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

### Enforce a minimum OS version

Perform an [OS version check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/) to ensure users are running at least a minimum version.

| Selector                     | Operator | Value                | Action |
| ---------------------------- | -------- | -------------------- | ------ |
| Passed Device Posture Checks | in       | _Minimum OS version_ | Allow  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Require OS version",
		"description": "Perform an OS version check for minimum version",
		"enabled": true,
		"action": "allow",
		"filters": [
				"http"
		],
		"traffic": "",
		"identity": "",
		"device_posture": "any(device_posture.checks.passed[*] in {\"<POSTURE_CHECK_UUID>\"})"
	}'
```

To get the UUIDs of your device posture checks, use the [List device posture rules](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/posture/methods/list/) endpoint.

### Check for a specific file

Perform a [file check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/file-check/) to ensure users have a certain file on their device.

Since the file path will be different for each operating system, you can configure a file check for each system and use the **Or** logical operator to only require one of the checks to pass.

| Selector                     | Operator | Value              | Logic | Action |
| ---------------------------- | -------- | ------------------ | ----- | ------ |
| Passed Device Posture Checks | in       | _macOS File Check_ | Or    | Allow  |
| Passed Device Posture Checks | in       | _Linux File Check_ |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Check for specific file",
		"description": "Ensure users have a specific file on their device regardless of operating system",
		"enabled": true,
		"action": "allow",
		"filters": [
				"http"
		],
		"traffic": "",
		"identity": "",
		"device_posture": "any(device_posture.checks.passed[] in {\"<POSTURE_CHECK_1_UUID>\"}) or any(device_posture.checks.passed[] in {\"<POSTURE_CHECK_2_UUID>\"})"
	}'
```

To get the UUIDs of your device posture checks, use the [List device posture rules](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/posture/methods/list/) endpoint.

## Enforce session duration

[Require users to re-authenticate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/) after a certain amount of time has elapsed.

## Isolate high risk sites in remote browser

If you are using the [Browser Isolation add-on](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/), refer to our list of [common Isolate policies](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#common-policies).

## Bypass inspection for self-signed certificates

When accessing origin servers with certificates not signed by a public certificate authority, you must bypass TLS decryption.

| Selector | Operator | Value                | Action         |
| -------- | -------- | -------------------- | -------------- |
| Domain   | in       | internal.example.com | Do Not Inspect |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Bypass internal site inspection",
		"description": "Bypass TLS decryption for internal sites with self-signed certificates",
		"enabled": true,
		"action": "off",
		"filters": [
				"http"
		],
		"traffic": "any(http.request.domains[*] in {\"internal.example.com\"})",
		"identity": "",
		"device_posture": ""
	}'
```

## Block file types

Block the upload or download of files based on their type.

| Selector            | Operator | Value                                   | Logic | Action |
| ------------------- | -------- | --------------------------------------- | ----- | ------ |
| Upload File Types   | in       | _Microsoft Office Word Document (docx)_ | And   | Block  |
| Download File Types | in       | _PDF (pdf)_                             |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block file types",
		"description": "Block the upload or download of files based on their type",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(http.upload.file.types[*] in {\"docx\"}) and any(http.download.file.types[*] in {\"pdf\"})",
		"identity": "",
		"device_posture": ""
	}'
```

For more information on supported file types, refer to [Download and Upload File Types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types).

## Isolate or block shadow IT applications

Isolate shadow IT applications discovered by the [Application Library](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/) that have not been reviewed yet or are currently under review, and block applications that are not approved by your organization.

For more information on reviewing shadow IT applications, refer to [Review applications](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/#review-applications).

### 1\. Isolate unreviewed or in review applications

Isolate applications if their approval status is _Unreviewed_ or _In review_.

| Selector           | Operator | Value        | Logic | Action  |
| ------------------ | -------- | ------------ | ----- | ------- |
| Application Status | is       | _Unreviewed_ | Or    | Isolate |
| Application Status | is       | _In review_  |       |         |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Isolate unreviewed or in review application status",
		"description": "Isolate Shadow IT applications that have not been reviewed or are in review in the Application Library",
		"enabled": true,
		"action": "isolate",
		"filters": [
				"http"
		],
		"traffic": "any(app.statuses[*] == \"unreviewed\") or any(app.statuses[*] == \"in review\")",
		"identity": "",
		"device_posture": ""
	}'
```

### 2\. Block unapproved applications

Block applications if their approval status is _Unapproved_.

| Selector           | Operator | Value        | Action |
| ------------------ | -------- | ------------ | ------ |
| Application Status | is       | _Unapproved_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block unapproved application status",
		"description": "Block Shadow IT applications that have been marked as unapproved in the Application Library",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(app.statuses[*] == \"unapproved\")",
		"identity": "",
		"device_posture": ""
	}'
```

## Block Google services

To enable Gateway inspection for Google Drive traffic, you must [add a Cloudflare certificate to Google Drive](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/#google-drive).

### Block Google Drive downloads

Block file downloads from Google Drive.

| Selector         | Operator      | Value                      | Logic | Action |
| ---------------- | ------------- | -------------------------- | ----- | ------ |
| Application      | in            | _Google Drive_             | And   | Block  |
| URL Path & Query | matches regex | .\*(e=download\|export).\* |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block Google Drive downloads",
		"description": "Block file downloads from Google Drive",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(app.ids[] in {554}) and http.request.uri.path_and_query matches \".(e=download|export).*\"",
		"identity": "",
		"device_posture": ""
	}'
```

### Block Google Drive uploads

Block file uploads from Google Drive.

| Selector         | Operator      | Value                                | Logic | Action |
| ---------------- | ------------- | ------------------------------------ | ----- | ------ |
| Application      | in            | _Google Drive_                       | And   | Block  |
| Upload Mime Type | matches regex | .\*                                  | And   |        |
| Host             | is not        | drivefrontend-pa.clients6.google.com |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block Google Drive uploads",
		"description": "Block file uploads to Google Drive",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(app.ids[] in {554}) and http.upload.mime matches \".\" and not(http.request.host == \"drivefrontend-pa.clients6.google.com\")",
		"identity": "",
		"device_posture": ""
	}'
```

### Block Gmail downloads

Block file downloads from Gmail.

| Selector         | Operator | Value                                 | Logic | Action |
| ---------------- | -------- | ------------------------------------- | ----- | ------ |
| Host             | is       | mail-attachment.googleusercontent.com | And   | Block  |
| URL Path & Query | is       | /attachment/u/0                       |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block Gmail downloads",
		"description": "Block file downloads from Gmail",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "http.request.host == \"mail-attachment.googleusercontent.com\" and http.request.uri.path_and_query matches \"/attachment/u/0\"",
		"identity": "",
		"device_posture": ""
	}'
```

### Block Google Translate proxy

Block use of Google Translate to translate entire webpages.

When translating a website, Google Translate proxies webpages with the `translate.goog` domain. Your users may be able to use this service to bypass other Gateway policies. If you block `translate.goog`, users will still be able to access other Google Translate features.

| Selector | Operator      | Value                      | Action |
| -------- | ------------- | -------------------------- | ------ |
| Domain   | matches regex | ^(.+\\.)?translate\\.goog$ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Block Google Translate for websites",
		"description": "Block use of Google Translate to translate entire webpages",
		"enabled": true,
		"action": "block",
		"filters": [
				"http"
		],
		"traffic": "any(http.request.domains[*] matches \"^(.+\\.)?translate\\.goog$\")",
		"identity": "",
		"device_posture": ""
	}'
```

## Filter WebSocket traffic

Gateway does not inspect or log [WebSocket ↗](https://datatracker.ietf.org/doc/html/rfc6455) traffic. Instead, Gateway will only log the HTTP details used to make the WebSocket connection, as well as [network session information](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/). To filter your WebSocket traffic, create a policy with the `101` HTTP response code.

| Selector      | Operator | Value                      | Action |
| ------------- | -------- | -------------------------- | ------ |
| HTTP Response | is       | _101 SWITCHING\_PROTOCOLS_ | Allow  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Filter WebSocket",
		"description": "Filter WebSocket traffic with HTTP response code 101",
		"enabled": true,
		"action": "allow",
		"filters": [
				"http"
		],
		"traffic": "http.response.status_code == 101",
		"identity": "",
		"device_posture": ""
	}'
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/#page","headline":"Common HTTP policies · Cloudflare One docs","description":"Reference information for Common policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API","WebSockets","Google"]}
```
