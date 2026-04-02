---
title: Sumo Logic
description: Sumo Logic integration guide
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/siem-integration/sumo-logic-integration-guide.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Sumo Logic

**Last reviewed:**  about 3 years ago 

When Email security detects a phishing email, the metadata of the detection can be sent directly into your instance of Sumo Logic. This document outlines the steps required to integrate Email security with Sumo Logic.

![A diagram outlining what happens when Email security detects a phishing email and sends it to Sumo Logic.](https://developers.cloudflare.com/_astro/opening-sumo-logic.D724z7XI_ZlA4op.webp) 

## 1\. Configure the Sumologic Collector

1. Log in to [Sumo Logic ↗](https://service.sumologic.com/ui/) with an administrator account.
2. Go to **Manage Data** \> **Collection** to open the collector configuration pane.
3. Select **Add Collector**.  
![Add collector.](https://developers.cloudflare.com/_astro/step3-collector.DV_Q-NuH_D0YYP.webp)
4. In **Select Collector Type**, select **Hosted Collector**.  
![Select Hosted Collector.](https://developers.cloudflare.com/_astro/step4-hosted.BwpzBT2q_bL7rb.webp)
5. In **Add Hosted Collector**, enter the following settings:  
   * **Name**: `Email security Collector`  
   * **Description**: `Email security Security Collectors`  
   * **Category**: Anti-Phishing  
![Enter the settings above to configure your collector.](https://developers.cloudflare.com/_astro/step5-hosted-collector.Dfvo2eRJ_Z17RAhC.webp)
6. Select **Save** \> **OK** to confirm the addition of the new Collector.
7. In **Cloud APIs**, select **HTTP Logs and Metrics** to start the configuration of the data source.  
![Select HTTP Logs and Metrics.](https://developers.cloudflare.com/_astro/step7-http-logs.CAeyFT9s_ZQMpBB.webp)
8. Enter a descriptive **Name** and **Description**, and select **Save**.  
![Enter a name and description.](https://developers.cloudflare.com/_astro/step8-name.DoCVtTkn_ZeCcLL.webp)
9. The system will present you a dialog box with the HTTP endpoint. Save it, as this will be required to configure Email security later.  
![Take note of the endpoint to use it later.](https://developers.cloudflare.com/_astro/step9-endpoint.C6vCpzu8_1a5o9s.webp)

## 2\. Configure Email security

The next step is to configure Email security to push the Email Detection Events to the Sumologic HTTP Collector.

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Email Configuration** \> **Alert Webhooks**, and select **New Webhook**.
3. In the Add Webhooks page, enter the following settings:  
   * **App type**: Select **SIEM** \> **Splunk**. In **Auth code**, enter `Sumologic`.  
   * **Target**: Enter the HTTP endpoint you saved in the previous section.  
   * For the dispositions (`MALICIOUS`, `SUSPICIOUS`, `SPOOF`, `SPAM`, `BULK`) choose which (if any) you want to send to the webhook. Sending `SPAM` and `BULK` dispositions will generate a high number of events.
4. Select **Publish Webhook**.

Your Sumo Logic integration will now show up in the All Webhooks panel.

![Your Sumo Logic webhook will display in the All Webhooks panel.](https://developers.cloudflare.com/_astro/all-webhooks.IezPBtTD_1iAAqq.webp) 

It will take about ten minutes for the configuration to fully propagate through the infrastructure of Email security, and for events to start to appear in your searches. Once the configuration is propagated, events will start to appear in your instance of Sumo Logic.

To view logs, hover your mouse over the Email security Collector, and select **Open in Log Search**.

![View logs in Sumo Logic.](https://developers.cloudflare.com/_astro/open-log.CBQyENq6_10yMtl.webp) 

Once events start to flow, select **New** \> **Log search** to search for the detection events with your search criteria (for example, `_collector="Email security Collector"`).

![Search for events.](https://developers.cloudflare.com/_astro/search-events.BTW9c3Ni_2d1A5b.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/siem-integration/","name":"SIEM integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/reporting/siem-integration/sumo-logic-integration-guide/","name":"Sumo Logic"}}]}
```
