---
title: Splunk
description: Splunk Cloud integration guide
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/siem-integration/splunk-integration-guide.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Splunk

**Last reviewed:**  about 3 years ago 

When Email security detects a phishing email, the metadata of the detection can be sent directly to Splunk. This document outlines the steps required to integrate with Splunk Cloud.

![A diagram outlining what happens when Email security detects a phishing email and sends it to Splunk.](https://developers.cloudflare.com/_astro/open-splunk.935S9ixR_Z3rFHd.webp) 

## 1\. Configure Splunk HTTP Event Collector

1. [Log in to Splunk ↗](https://login.splunk.com/) with an administrator account.
2. Go to **Settings** \> **Data inputs**.  
![Go to Data inputs to configure your settings.](https://developers.cloudflare.com/_astro/step2-data-inputs.BtN_Zfq2_1g6Q3m.webp)
3. In **Local inputs** \> **Type**, select **HTTP Event Collector** to access this configuration and create a new collector.  
![Select HTTP Event Collectors as the type of your collector.](https://developers.cloudflare.com/_astro/step3-type.B5IaOdQX_2aeD0l.webp)
4. Select the **New Token** button to start the configuration.
5. Provide a descriptive name for the Email security (formerly Area 1) token (for example, `Email security (formerly Area 1) Email Detections`), and leave the **Enable indexer acknowledgement** unchecked.  
![Enter a descriptive name for your new token, but leave Enable indexer acknowledgement checkbox unchecked.](https://developers.cloudflare.com/_astro/step5-token.lL6h_-Sw_Z1PixRo.webp)
6. Select **Next** to continue.
7. Configure the Input Settings for the HTTP Event Collector based on your environment.  
![Configure the Input Settings based on your environment](https://developers.cloudflare.com/_astro/step7-input-settings.DtLiG7Z9_1kmiXz.webp)
8. You may also select **Create a new index** to create new settings for Email security events, with a **Max Size of Entire Index** and **Retention (days)** that fits your environment.  
![Optionally, create a new index for Email security events](https://developers.cloudflare.com/_astro/step8-new-index.C_u8fnMY_iHp2o.webp)
9. For this example, we created a new `area1_index` index, and added it to the configuration.  
![Example of a new index added to the configuration](https://developers.cloudflare.com/_astro/step9-new-index.P991i02s_1K1nRL.webp)
10. Select **Review** \> **Submit** to review your settings and create the collector.
11. Take note of the token value in this next screen. This value is required for the Email security configuration in the next step. You can also retrieve the token from the HTTP Event Collector configuration panel, in **Settings** \> **Data inputs** \> **HTTP Event Collector**.  
![Example of a new index added to the configuration](https://developers.cloudflare.com/_astro/step11-token-value.DJkrGFrm_Z1EQsBK.webp)

## 2\. Test your HTTP Event Collector

To test your the HTTP Event Collector, you can manually inject an event into Splunk by using the following cURL command:

Terminal window

```

curl https://{host}:8088/services/collector/event \

--header "Authorization: Splunk <YOUR_TOKEN>" \

--data '{

    "sourcetype": "<YOUR_SOURCE_TYPE>",

    "event": "Hello, World!"

    }'


```

### Request formats

When creating requests to Splunk, the URL and port number change according to the type of Splunk setup:

* **Splunk Cloud Platform free trial**: `<protocol>://http-inputs-<host>.splunkcloud.com:8088/<endpoint>`
* **Splunk Cloud Platform**: `<protocol>://http-inputs-<host>.splunkcloud.com:443/<endpoint>`
* **Splunk Enterprise**: `<protocol>://<host>:8088/<endpoint>`

Refer to the [Splunk documentation ↗](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector) for more information.

If your instance is on-premise, specify the appropriate hostname and ensure that your firewall allows the configured port through to your instance. The connections will be coming from this [Egress IP addresses](https://developers.cloudflare.com/email-security/deployment/inline/reference/egress-ips/), if you need them for your access control lists (ACLs)

Note

Ensure that you have a valid SSL certificate configured on your instance. The certificate cannot be expired and cannot be a self-signed certificate.

If all the requirements are met, you will receive the following response back to the cURL command:

```

{"text":"Success","code":0}


```

Additionally, you can search your instance of Splunk for the test event with `index` or other search criteria (for example, `index="area1_index"`):

![Example of a new index added to the configuration](https://developers.cloudflare.com/_astro/search-instance.DPsTbvaw_1VlL3F.webp) 

## 3\. Configure Email security

The next step is to configure Email security to push the Email Detection Event to the Splunk HTTP Event Collector.

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Email Configuration** \> **Alert Webhooks**, and select **New Webhook**.
3. In the Add Webhooks page, enter the following settings:  
   * **App type**: Select **SIEM** \> **Splunk**, and enter the auth code you took note of the previous step.  
   * **Target**: Enter the target URI of your Splunk instance. It will typically have the `https://<host>:8088/services/collector` format. Refer to [Request formats](#request-formats) to learn more about how your Splunk subscription affects the URI.  
   * For the dispositions (`MALICIOUS`, `SUSPICIOUS`, `SPOOF`, `SPAM`, `BULK`) choose which (if any) you want to send to the webhook. Sending `SPAM` and `BULK` dispositions will generate a high number of events.
4. Select **Publish Webhook**.

Your Splunk integration will now show up in the All Webhooks panel.

![The All Webhooks section will show your Splunk webhook](https://developers.cloudflare.com/_astro/splunk-webhook-integrations.DuWprhdK_Z1RiOgT.webp) 

It will take about ten minutes or so for the configuration to fully propagate through the infrastructure of Email security (formerly Area 1), and for events to start to appear in your searches. Once the configuration is propagated, events will start to appear in your instance of Splunk.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/siem-integration/","name":"SIEM integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/reporting/siem-integration/splunk-integration-guide/","name":"Splunk"}}]}
```
