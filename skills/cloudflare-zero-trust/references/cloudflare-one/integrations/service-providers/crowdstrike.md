---
description: CrowdStrike in Zero Trust integrations.
title: CrowdStrike
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# CrowdStrike

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One can integrate with Crowdstrike to require that users connect to certain applications from managed devices. This service-to-service posture check uses the Cloudflare One Client to read endpoint data from Crowdstrike. Devices are identified by their serial numbers. If multiple devices have the same serial number, Cloudflare cannot accurately match a device with a third-party provider device. You must ensure that each of your devices has a unique serial number.

## Prerequisites

Device posture with Crowdstrike requires:

* Falcon Enterprise plan or above
* Crowdstrike agent is deployed on the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Service providers](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/).

## Set up CrowdStrike as a service provider

### 1\. Obtain CrowdStrike settings

The following CrowdStrike values are needed to set up the CrowdStrike posture check:

* Client ID
* Client Secret
* Base URL
* Customer ID

To retrieve those values:

1. Log in to your Falcon Dashboard.
2. Go to **Support and resources** \> **API Clients and Keys**.
3. Select **Create API client** and enter any name for the client.
4. Turn on the following API permissions:

| Scope                 | Permission |
| --------------------- | ---------- |
| Hosts                 | Read       |
| Zero Trust Assessment | Read       |
5. Select **Create**.
6. Copy the **Client ID**, **Client Secret**, and **Base URL** to a safe place.
7. Go to **Host setup and management** \> **Sensor downloads** and copy your **Customer ID**.

### 2\. Add CrowdStrike as a service provider

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Service providers**.
2. Select **Add new**.
3. Select **Crowdstrike**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
1. Enter the **Client ID** and **Client secret** you noted down above.
2. In **Rest API URL**, enter your **Base URL**.
3. Enter your **Customer ID**.
4. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
5. Select **Test and save**.

### 3\. Configure the posture check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks** \> **Service provider checks**.
2. Select **Add a check**.
3. Select the Crowdstrike provider.
4. Enter any name for the posture check.
5. Configure the [attributes](#device-posture-attributes) required for the device to pass the posture check.
6. Select **Save**.
7. To test, go to **Insight** \> **Logs** \> **Posture logs** and verify that the service provider posture check is returning the expected results.

You can now use this posture check in a [device posture policy](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/#3-build-a-device-posture-policy).

## Device posture attributes

Device posture data is gathered from the [CrowdStrike Zero Trust Assessment APIs ↗](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis). To learn more about how scores are calculated, refer to the [CrowdStrike Zero Trust Assessment ↗](https://falcon.us-2.crowdstrike.com/documentation/138/zero-trust-assessment) documentation.

| Selector      | Description                                                                                   | Value                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| OS            | OS signal score                                                                               | 1 to 100                                                                                        |
| Overall       | Overall ZTA score                                                                             | 1 to 100                                                                                        |
| Sensor config | Sensor signal score                                                                           | 1 to 100                                                                                        |
| Version       | ZTA score version                                                                             | 2.1.0                                                                                           |
| State         | Current online status of the device                                                           | _Online_, _Offline_, or _Unknown_                                                               |
| Last seen     | Elapsed time since the device was last seen. Only returned if its state is online or unknown. | In the last 1 hour, 3 hours, 6 hours, 12 hours, 24 hours, 7 days, 30 days, or more than 30 days |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/#page","headline":"CrowdStrike · Cloudflare One docs","description":"CrowdStrike in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CrowdStrike"]}
```
