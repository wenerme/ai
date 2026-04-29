---
title: IAB TCF Compliance
description: Configure IAB TCF compliance for Zaraz consent.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IAB TCF Compliance

The Zaraz Consent Management Platform is compliant with the IAB Transparency & Consent Framework. Enabling this feature [could be required ↗](https://blog.google/products/adsense/new-consent-management-platform-requirements-for-serving-ads-in-the-eea-and-uk/) in order to serve Google Ads in the EEA and the UK.

The CMP ID of the approval is 433 and be can seen in the [IAB Europe ↗](https://iabeurope.eu/cmp-list/) website.

Using the Zaraz Consent Management Platform in IAB TCF Compliance Mode is is opt-in.

1. In the Cloudflare dashboard, go to the **Consent** page.  
[ Go to **Consent** ](https://dash.cloudflare.com/?to=/:account/tag-management/consent)
2. Check the **Use IAB TCF compliant modal** option.
3. Under the **Assign purposes to tools** section, add vendor details to every tool that was not automatically assigned.
4. Press **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/consent-management/","name":"Consent management"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/consent-management/iab-tcf-compliance/","name":"IAB TCF Compliance"}}]}
```
