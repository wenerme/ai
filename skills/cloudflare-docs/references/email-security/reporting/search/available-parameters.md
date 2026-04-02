---
title: Available parameters
description: You can pull information for a message in search detections using the following parameters:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/search/available-parameters.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Available parameters

You can pull information for a message in [search detections](https://developers.cloudflare.com/email-security/reporting/search/) using the following parameters:

* From (`envelope_from`)
* From Name
* To (any) (`envelope_to`)
* To Name (any)
* Cc (any)
* ReplyTo
* Subject (any)
* Sent DateTime (formatted as `YYYY-MM-DDTHH:MM:SS`)
* Received DateTime (formatted as `YYYY-MM-DDTHH:MM:SS`)
* final\_disposition
* alert\_id
* sha256 (attachments)
* ssdeep (attachments)
* name (attachments)
* md5 (attachments)
* Message-ID
* smtp\_helo\_server\_ip
* smtp\_previous\_hop\_ip
* x\_originating\_ip
* Reason(s) for Detection

## Search terms

In addition to the message parameters above, you can use these additional detection search strings:

* phish\_submission
* phish\_submission\_response
* user\_submission
* team\_submission
* auto-retraction
* browser\_isolation\_rewrite

For disposition\-specific submission searches, refer to [Service Addresses ↗](https://horizon.area1security.com/support/service-addresses) in the Email security dashboard.

## Data retention

For Email security Horizon Enterprise customers, detections search would index for a period of 12 months and rotate over to a rolling 12-month period.

For Email security Horizon Advantage customers, detections search would index for three months and rotate over to a rolling 3-month period.

## Scope of data retained

For messages that are not detected, the body of the message itself is not retained. Only the metadata such as sender, recipient, subject, message\_id, and delivery log will be retained. It is also possible to view the messages as the preview image.

For detections, full messages are retained, including attachments, in addition to the metadata described above. The raw message including attachments can be downloaded as an `.eml` file.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/search/","name":"Search"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/reporting/search/available-parameters/","name":"Available parameters"}}]}
```
