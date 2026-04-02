---
title: KnowBe4
description: KnowBe4 integration guide
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/siem-integration/knowbe4-integration-guide.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# KnowBe4

**Last reviewed:**  over 2 years ago 

When Email security detects a phishing email, the metadata of the detection can be sent directly to KnowBe4\. For this tutorial, you will need a working KnowBe4 account with the SecurityCoach add-on. You will also need to create an organization key to use in Email security. This organization key will let you integrate KnowBe4 with Email security. Refer to [KnowBe4 documentation ↗](https://support.knowbe4.com/hc/articles/13129840202643) for more information on this subject.

After creating your organization key and authorizing Email security:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Domains & Routing** \> **Alert Webhooks**.
4. Select **New Webhook**.
5. In **App Type**, select **SIEM**.
6. Choose _KnowBe4_ from the dropdown, and paste your organization key into the **Auth Code** section.
7. In **Target**, paste the URL that suits your organization. KnowBe4 has different URLs for different regions:  
| KnowBe4 instance | URL                                          |  
| ---------------- | -------------------------------------------- |  
| United States    | https://area1.vendor.training.knowbe4.com/v1 |  
| European Union   | https://area1.vendor.eu.knowbe4.com/v1       |  
| Canada           | https://area1.vendor.ca.knowbe4.com/v1       |  
| United Kingdom   | https://area1.vendor.uk.knowbe4.com/v1       |  
| Germany          | https://area1.vendor.da.knowbe4.com/v1       |
8. Select _Expanded_ from the drop-down menu for **Malicious Style**, **Suspicious Style**, and **Spoof Style**.
9. Select **Publish Webhook**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/siem-integration/","name":"SIEM integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/reporting/siem-integration/knowbe4-integration-guide/","name":"KnowBe4"}}]}
```
