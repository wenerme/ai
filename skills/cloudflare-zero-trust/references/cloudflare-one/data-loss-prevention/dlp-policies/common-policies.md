---
description: Reference information for Common policies in Cloudflare One.
title: Common policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Common policies

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/common-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following DLP policies are commonly used to secure sensitive data in uploaded and downloaded files. They are built as [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) using the [DLP Profile](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#dlp-profile) selector.

Before using these policies, complete the [prerequisites for scanning HTTP traffic](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#prerequisites).

## Log uploads/downloads

When you want to monitor where sensitive data is going before enforcing blocks, use the **Allow** action. In a Gateway HTTP policy, all matches — including Allow — are recorded in your [HTTP request logs](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#4-view-dlp-logs). This gives you visibility into sensitive data transfers without disrupting users.

The following example logs any upload or download that matches your enabled [Financial Information](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#financial-information) DLP profile entries when users interact with file sharing applications.

| Selector           | Operator | Value                   | Logic | Action |
| ------------------ | -------- | ----------------------- | ----- | ------ |
| DLP Profile        | in       | _Financial Information_ | And   | Allow  |
| Content Categories | in       | _File Sharing_          |       |        |

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

For more information on what file formats DLP can scan, refer to [Supported file types](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/#supported-file-types).

## Block uploads/downloads for specific users

You can configure access on a per-user or group basis by adding [identity-based conditions](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) to your policies. These selectors match against user attributes from your configured identity provider.

The following example blocks only contractors from uploading/downloading Financial Information to file sharing apps. Users who are not in the _Contractors_ group are not affected by this policy.

| Selector           | Operator | Value                   | Logic | Action |
| ------------------ | -------- | ----------------------- | ----- | ------ |
| DLP Profile        | in       | _Financial Information_ | And   | Block  |
| Content Categories | in       | _File Sharing_          | And   |        |
| User Group Names   | in       | _Contractors_           |       |        |

## Exclude Android applications

Many Android applications (such as Google Drive) use [certificate pinning](https://developers.cloudflare.com/ssl/reference/certificate-pinning/), which is incompatible with Gateway TLS decryption. These applications verify they are connecting directly to their own servers and will reject Gateway's inspection certificate. If needed, you can create a [Do Not Inspect policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) so that the app can continue to function on Android:

1. Set up an [OS version device posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/) that checks for the Android operating system.
2. Create the following HTTP policy in Gateway:

| Selector                     | Operator | Value                | Logic | Action         |
| ---------------------------- | -------- | -------------------- | ----- | -------------- |
| Application                  | in       | _Google Drive_       | And   | Do Not Inspect |
| Passed Device Posture Checks | in       | _OS Version Android_ |       |                |

Android users can now use the app, but the app traffic will bypass Gateway inspection entirely — including DLP scanning, HTTP logging, and antivirus scanning.

## Exclude specific sites

In your [DLP logs](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#4-view-dlp-logs), you may find that certain sites routinely trigger DLP detections that do not represent actual data loss (false positives). To exempt these sites from DLP scanning:

1. [Create a list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of hostnames or URLs.
2. Exclude the list from your DLP policy using the `not in list` operator, which references the list you created in step 1:

| Selector    | Operator    | Value                   | Logic | Action |
| ----------- | ----------- | ----------------------- | ----- | ------ |
| DLP Profile | in          | _Financial Information_ | And   | Block  |
| Application | in          | _Google Drive_          | And   |        |
| Domain      | not in list | _Do not DLP - SSN_      |       |        |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/common-policies/#page","headline":"Common DLP policies · Cloudflare One docs","description":"Reference information for Common policies in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/common-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance","Logging"]}
```
