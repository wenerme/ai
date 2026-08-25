---
description: Configure DDoS attack notifications via email, webhook, or PagerDuty.
title: Alerts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Alerts

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/reference/alerts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Configure notifications to receive real-time alerts (within \~1 minute) about L3/4 and L7 DDoS attacks on your Internet properties, depending on your plan and services. You can choose from different delivery methods.

Each notification email includes the following information:

* Description
* Detection and mitigation time of attack
* Attack type
* Maximum rate of attack
* Attack target (zone, host, or IP address)
* Rule that matched the attack (ID and description)
* Rule override, if any

Cloudflare automatically sends weekly summaries of detected and mitigated DDoS attacks to Magic Transit and Spectrum BYOIP customers. Monthly application security reports are available for WAF/CDN customers. For more information, refer to [DDoS reports](https://developers.cloudflare.com/ddos-protection/reference/reports/).

Note

DDoS reports and DDoS alerts are independent: DDoS reports will include information about any attacks for which you received DDoS alerts.

## Set up a notification for DDoS alerts

To set up a notification:

1. In the Cloudflare dashboard, go to the **Notifications** page.
[Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Select one of the [available DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/#alert-types) depending on your plan and services:

  * HTTP DDoS Attack Alert
  * Layer 3/4 DDoS Attack Alert
  * Advanced HTTP DDoS Attack Alert
  * Advanced Layer 3/4 DDoS Attack Alert
4. Enter a notification name and (optionally) a description.
5. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/).
6. If you are creating a notification for one of the advanced DDoS attack alerts, select **Next** and define the parameters that will filter the notifications you will receive.
7. Select **Save**.

## Edit an existing notification

To edit, delete, or disable a notification, go to your [account notifications ↗](https://dash.cloudflare.com/?to=/:account/notifications).

---

## Alert types

Cloudflare can issue notifications for different types of DDoS attack alerts.

### Standard alerts

HTTP DDoS Attack Alert

**Who is it for?**

[WAF](https://developers.cloudflare.com/waf/) or [CDN](https://developers.cloudflare.com/cache/) customers who want to receive a notification when Cloudflare has mitigated HTTP attacks that generate more than 100 requests per second.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

No action needed. Refer to [DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/) for more information.

Layer 3/4 DDoS Attack Alert

**Who is it for?**

[BYOIP](https://developers.cloudflare.com/byoip/) and [Spectrum](https://developers.cloudflare.com/spectrum/) customers with [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) who want to receive a notification when Cloudflare has mitigated attacks that generate an average of at least 12,000 packets per second over a five-second period, with a duration of one minute or more.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

No action needed. Refer to [DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/) for more information.

### Advanced alerts

Note

The availability of advanced DDoS attack alerts depends on your Cloudflare plan and subscribed services. Refer to [Availability](#availability) for details.

Advanced DDoS attack alerts support additional configuration, allowing you to filter the notifications you wish to receive.

Advanced HTTP DDoS Attack Alert

**Who is it for?**

[WAF](https://developers.cloudflare.com/waf/) or [CDN](https://developers.cloudflare.com/cache/) customers with the [Advanced DDoS Protection](https://developers.cloudflare.com/ddos-protection/) subscription who want to receive a notification when Cloudflare has mitigated attacks that generate more than the configured number of requests per second (100 rps by default).

**Other options / filters**

You can choose when to trigger a notification.

Available filters include:

* The zones in the account for which you wish to receive notifications.
* The specific hostnames for which you wish to receive notifications.
* The minimum requests-per-second rate that will trigger the alert (100 rps by default).
**Included with**

Enterprise plans with the Advanced DDoS Protection add-on.

**What should you do if you receive one?**

No action needed. Refer to [DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/) for more information.

Advanced Layer 3/4 DDoS Attack Alert

**Who is it for?**

[BYOIP](https://developers.cloudflare.com/byoip/) and [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers with [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) who want to receive a notification when Cloudflare has mitigated attacks that generate more than the configured number of packets per second (12,000 pps by default).

**Other options / filters**

You can choose when to trigger a notification.

Available filters include:

* The IP prefixes for which you wish to receive notifications.
* The specific IP addresses for which you wish to receive notifications.
* The minimum packets-per-second rate that will trigger the alert (12,000 pps by default).
* The minimum megabits-per-second rate that will trigger the alert.
* The protocols for which you wish to receive notifications (all protocols by default).

If you specify multiple filters, Cloudflare applies an `AND` logic. This means the alert will only trigger if all filters you set are true. Keep this in mind when setting up this alert with more than one filter.

**Included with**

Purchase of Magic Transit and/or BYOIP (Enterprise plans).

**What should you do if you receive one?**

No action needed. Refer to [DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/) for more information.

You will also receive alerts for rules with a _Log_ action, containing information on what triggered the alert.

## Availability

The available alerts depend on your Cloudflare plan and subscribed services:

| Alert type                           | WAF/CDN | Spectrum | Spectrum BYOIP | Magic Transit |
| ------------------------------------ | ------- | -------- | -------------- | ------------- |
| HTTP DDoS Attack Alert               | Yes     | –        | –              | –             |
| Advanced HTTP DDoS Attack Alert      | Yes1    | –        | –              | –             |
| Layer 3/4 DDoS Attack Alert          | –       | Yes2, 3  | Yes            | Yes3          |
| Advanced Layer 3/4 DDoS Attack Alert | –       | –        | Yes2           | Yes2          |

1 _Only available to Enterprise customers with the Advanced DDoS Protection subscription._
2 _Only available on an Enterprise plan._
3 _Refer to [Final remarks](#final-remarks) for additional notes._

## Example notification

The following image shows an example notification delivered via email:

![Example notification email of a DDoS attack](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=326,height=714,format=webp/_astro/ddos-notification-example.c2rVlJvC.png)

To investigate a possibly ongoing attack, select **View Dashboard**. To go to the rule details in the Cloudflare dashboard, select **View Rule**.

## Final remarks

* Spectrum and Magic Transit customers using [assigned Cloudflare IP addresses](https://developers.cloudflare.com/magic-transit/cloudflare-ips/) will receive layer 3/4 DDoS attack alerts where the attacked target is the Cloudflare IP or prefix. If you have [brought your own IP (BYOIP)](https://developers.cloudflare.com/byoip/) to Cloudflare Spectrum or Magic Transit, you will see your own IP addresses or prefixes as the attacked target.
* In some cases, HTTP DDoS attack alerts will reference the attacked zone name instead of the attacked hostname. This occurs when the attack signature does not include information on the attacked hostname because it is not a strong indicator for identifying attack requests. For more information on attack signatures, refer to [How DDoS protection works](https://developers.cloudflare.com/ddos-protection/about/how-ddos-protection-works/).
* DDoS alerts are currently only available for DDoS attacks detected and mitigated by the [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/). Alerts are not yet available for DDoS attacks detected and mitigated by the [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/), the [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/), or the [Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) system.
* You will not receive duplicate DDoS alerts within the same one-hour time frame.
* If you configure more than one alert type for the same kind of attack (for example, both an HTTP DDoS Attack Alert and an Advanced HTTP DDoS Attack Alert) you may get more than one notification when an attack occurs. To avoid receiving duplicate notifications, delete one of the configured alerts.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/reference/alerts/#page","headline":"DDoS alerts · Cloudflare DDoS Protection docs","description":"Configure DDoS attack notifications via email, webhook, or PagerDuty.","url":"https://developers.cloudflare.com/ddos-protection/reference/alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
