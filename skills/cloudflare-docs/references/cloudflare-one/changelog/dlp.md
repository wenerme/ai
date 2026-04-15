---
title: Data Loss Prevention
description: Review recent changes to Cloudflare DLP.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/changelog/dlp.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Data Loss Prevention

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dlp.xml) 

There are no scheduled entries at this time.

## 2025-01-15

**Payload log match visibility**

When viewing decrypted payload log matches, DLP now provides more context by listing multiple DLP matches and the matching DLP profile.

## 2024-11-25

**Profile confidence levels**

DLP profiles now support setting a [confidence level](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#confidence-levels) to choose how tolerant its detections are to false positives based on the context of the detection. The higher a profile's confidence level is, the less false positives will be allowed. Confidence levels include Low, Medium, or High. DLP profile confidence levels supersede [context analysis](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#context-analysis).

## 2024-11-01

**Send entire HTTP requests to a Logpush destination**

In addition to [logging the payload](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules) from HTTP requests that matched a DLP policy in Cloudflare Logs, Enterprise users can now configure a [Logpush job](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#send-dlp-forensic-copies-to-logpush-destination) to send the entire HTTP request that triggered a DLP match to a storage destination. This allows long-term storage of full requests for use in forensic investigation.

## 2024-09-03

**Exact Data Match multi-entry upload support**

You can now upload files with [multiple columns of data](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/#upload-a-new-dataset) as Exact Data Match datasets. DLP can use each column as a separate existing detection entry.

## 2024-05-23

**Data-at-rest DLP for Box and Dropbox**

You can now scan your [Box](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/box/#data-loss-prevention-optional) and [Dropbox](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/#data-loss-prevention-optional) files for DLP matches.

## 2024-04-16

**Optical character recognition**

DLP can now [detect sensitive data](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#optical-character-recognition-ocr) in jpeg, jpg, and png files. This helps companies prevent the leak of sensitive data in images, such as screenshots.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/dlp/","name":"Data Loss Prevention"}}]}
```
