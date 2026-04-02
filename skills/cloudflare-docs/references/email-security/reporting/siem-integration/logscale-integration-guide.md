---
title: LogScale
description: Falcon LogScale integration guide
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/siem-integration/logscale-integration-guide.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# LogScale

**Last reviewed:**  over 2 years ago 

When Email security detects a phishing email, the metadata of the detection can be sent directly to Falcon LogScale. For this tutorial, you will need a working Falcon LogScale account. You will also need to create a new Ingest Token in your LogScale account. Ingest Tokens identify repositories and are used to configure data ingestion to your repository. Refer to [Falcon LogScale documentation ↗](https://library.humio.com/falcon-logscale-cloud/ingesting-data-tokens.html) for more information.

After creating your Ingest Token:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Domains & Routing** \> **Alert Webhooks**.
4. Select **New Webhook**.
5. In **App Type**, select **SIEM**.
6. Choose _Crowdstrike_ from the dropdown, and paste your Ingest Token into the **Auth Code** section.
7. In **Target**, paste the URL `https://cloud.community.humio.com/api/v1/ingest/hec/raw`.
8. Select **Publish Webhook**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/siem-integration/","name":"SIEM integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/reporting/siem-integration/logscale-integration-guide/","name":"LogScale"}}]}
```
