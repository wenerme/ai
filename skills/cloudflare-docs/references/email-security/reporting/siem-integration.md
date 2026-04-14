---
title: SIEM integration
description: SIEM integrations allow you to view message-level information outside of the dashboard and create your own custom reports.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/siem-integration/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# SIEM integration

**Last reviewed:**  almost 4 years ago 

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

With a bit of configuration, you can also bring Email security (formerly Area 1) data into your Security Information and Event Management (SIEM) tools to view message-level information outside of the dashboard and create your own custom reports.

## Connect a SIEM tool

The following steps are required to connect your SIEM tool.

### 1\. Set up your SIEM tool

For help setting up the proper configuration in your SIEM tool, refer to the following guides:

* [ KnowBe4 ](https://developers.cloudflare.com/email-security/reporting/siem-integration/knowbe4-integration-guide/)
* [ LogScale ](https://developers.cloudflare.com/email-security/reporting/siem-integration/logscale-integration-guide/)
* [ Splunk ](https://developers.cloudflare.com/email-security/reporting/siem-integration/splunk-integration-guide/)
* [ Sumo Logic ](https://developers.cloudflare.com/email-security/reporting/siem-integration/sumo-logic-integration-guide/)

### 2\. Create a webhook

Refer to [Alert webhooks](https://developers.cloudflare.com/email-security/email-configuration/domains-and-routing/alert-webhooks/) to learn how to create a webhook and send data into your SIEM tool.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/siem-integration/","name":"SIEM integration"}}]}
```
