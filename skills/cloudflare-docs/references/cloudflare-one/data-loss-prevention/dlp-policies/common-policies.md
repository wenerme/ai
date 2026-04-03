---
title: Common policies
description: The following in-line DLP policies are commonly used to secure data in uploaded and downloaded files.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/data-loss-prevention/dlp-policies/common-policies.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Common policies

The following in-line DLP policies are commonly used to secure data in uploaded and downloaded files.

## Log uploads/downloads

The **Allow** action functions as an implicit logger, providing visibility into where your sensitive data is going without impacting the end user experience. The following example scans for your enabled Financial Information profile entries when users upload or download data to file sharing apps.

| Selector           | Operator | Value                   | Logic | Action |
| ------------------ | -------- | ----------------------- | ----- | ------ |
| DLP Profile        | in       | _Financial Information_ | And   | Allow  |
| Content Categories | in       | _File Sharing_          |       |        |

## Block file types

Block the upload or download of files based on their type.

* [ Dashboard ](#tab-panel-3447)
* [ API ](#tab-panel-3448)

| Selector            | Operator | Value                                   | Logic | Action |
| ------------------- | -------- | --------------------------------------- | ----- | ------ |
| Upload File Types   | in       | _Microsoft Office Word Document (docx)_ | And   | Block  |
| Download File Types | in       | _PDF (pdf)_                             |       |        |

Create a Zero Trust Gateway rule

```

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

You can configure access on a per-user or group basis by adding [identity-based conditions](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) to your policies. The following example blocks only contractors from uploading/downloading Financial Information to file sharing apps.

| Selector           | Operator | Value                   | Logic | Action |
| ------------------ | -------- | ----------------------- | ----- | ------ |
| DLP Profile        | in       | _Financial Information_ | And   | Block  |
| Content Categories | in       | _File Sharing_          | And   |        |
| User Group Names   | in       | _Contractors_           |       |        |

## Exclude Android applications

Many Android applications (such as Google Drive) use [certificate pinning](https://developers.cloudflare.com/ssl/reference/certificate-pinning/), which is incompatible with Gateway inspection. If needed, you can create a [Do Not Inspect policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) so that the app can continue to function on Android:

1. Set up an [OS version device posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/) that checks for the Android operating system.
2. Create the following HTTP policy in Gateway:  
| Selector                     | Operator | Value                | Logic | Action         |  
| ---------------------------- | -------- | -------------------- | ----- | -------------- |  
| Application                  | in       | _Google Drive_       | And   | Do Not Inspect |  
| Passed Device Posture Checks | in       | _OS Version Android_ |       |                |

Android users can now use the app, but the app traffic will bypass DLP scanning.

## Exclude specific sites

In your [DLP logs](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#4-view-dlp-logs), you may find that certain sites are a common source of noise. To exempt these sites from DLP scanning:

1. [Create a list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of hostnames or URLs.
2. Exclude the list from your DLP policy as shown in the example below:  
| Selector    | Operator    | Value                   | Logic | Action |  
| ----------- | ----------- | ----------------------- | ----- | ------ |  
| DLP Profile | in          | _Financial Information_ | And   | Block  |  
| Application | in          | _Google Drive_          | And   |        |  
| Domain      | not in list | _Do not DLP - SSN_      |       |        |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-policies/","name":"Scan HTTP traffic"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-policies/common-policies/","name":"Common policies"}}]}
```
