---
title: Review Security Insights
description: Review, filter, and resolve security insights detected across your domains.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Review Security Insights

After [enabling Security Insights](https://developers.cloudflare.com/security-center/get-started/) and letting the first scan run, check the **Security Insights** tab for a list of detected insights that you should address.

For each detected insight, you can resolve it or archive it, after understanding its risks.

1. In the Cloudflare dashboard, go to the **Security Insights** page.  
[ Go to **Security insights** ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Next to the insight you wish to address, select **Details** to review it.

## Resolve an insight

Insights will not be automatically removed from your dashboard when you address them. You must either manually [archive insights](#archive-insights), manually trigger another scan or wait for the automatic scan to run as per [scan frequency](https://developers.cloudflare.com/security/security-insights/how-it-works/#scan-frequency).

In the Resolve insights page, if you choose to update a configuration based on the recommendation actions, follow the instructions on the insight details page.

The following insights follow a different yet straightforward workflow to be resolved:

* **Minimum Version of TLS 1.2 not enforced**: To resolve this insight:  
   * Go to **SSL/TLS** \> **Edge Certificates**.  
   * Select **TLS 1.2**.
* **Domains without "Always use HTTPS"**: To resolve this insight:  
   * Go to **SSL/TLS** \> **Edge Certificates**.  
   * Select **Always Use HTTPS**.
* **Turn on JavaScript Detections**: To resolve this insight:  
   * Go to **Security** \> **Bots** \> Select **Configure Bot Management**.  
   * Select **JavaScript Detections**.

## Export insights

You can export security insights to a CSV format directly from the dashboard.

To export security insights:

1. In the Cloudflare dashboard, go to the **Security Insights** page.  
[ Go to **Security insights** ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Select **Export insights**.

Exporting security insights allow you to perform a deeper analysis of your insights.

The exported CSV file includes information such as the severity of your data, insight type scan date, issue class and additional optional fields, such as insight details, risk assessment, detection method, and recommended actions.

## Archive insights

You can archive one or more insights from the dashboard.

To archive insights:

1. In the Cloudflare dashboard, go to the **Security Insights** page.  
[ Go to **Security insights** ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Select the insight(s) you want to archive, then select **Archive selected**.

Alternatively, to archive an insight:

1. Select the insight you want to archive and select **Details**. The dashboard will open a page where you will be able to review [insight properties](https://developers.cloudflare.com/security/security-insights/how-it-works/#scan-properties).
2. Select **Archive insight**.

## Enable alerts

You can enable alerts for critical insights.

To enable alerts:

1. In the Cloudflare dashboard, go to the **Security Insights** page.  
[ Go to **Security insights** ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Select the security insight(s) you want to create an alert for, then select **Create alert for selected classes**.
3. Enter the notification name, and choose one or more insights classes to filter a notification.
4. Select **Add email recipient** and enter an email address to receive the alert.
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/security-insights/","name":"Security Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/security/security-insights/review-insights/","name":"Review Security Insights"}}]}
```
