---
title: Pricing and managing usage
description: Understand Log Explorer billing and usage.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/log-explorer/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing and managing usage

Log Explorer billing is based on the volume of logs ingested and stored, measured in gigabytes (GB). Your charges scale with the amount of log data you choose to retain in Log Explorer.

Unlike query-based billing models, charges are not based on how often you search or scan your data. Once logs are ingested and stored, you can query them without additional cost.

## Availability

Log Explorer is available as a paid add-on for any Application Services or Zero Trust purchase. There is no free version or trial available at this time.

## Billable usage

Log Explorer billing is strictly consumption-based, calculated by the GBs ingested and stored.

### Attack traffic

Because Log Explorer is a forensics product, attack traffic is considered valuable data for analysis and is included in your billable usage.

Note

Logs generated from Layer 7 (L7) DDoS attack traffic are not ingested by default and do not count toward your Log Explorer usage.

## Estimate usage

To estimate your Log Explorer usage, review your request volumes in **Analytics** for specific Cloudflare log datasets.

### Record size by dataset

The following table provides average and maximum record sizes for each dataset to help you estimate potential storage needs:

| Dataset                        | Average Record Size | Maximum Record Size |
| ------------------------------ | ------------------- | ------------------- |
| audit\_logs                    | 2.69 kB             | 172 kB              |
| email\_security\_alerts        | 6.74 kB             | 74.9 kB             |
| firewall\_events               | 1.36 kB             | 47.2 kB             |
| audit\_logs\_v2                | 1.73 kB             | 28.5 kB             |
| zaraz\_events                  | 7.30 kB             | 11.7 kB             |
| http\_requests                 | 1.56 kB             | 9.76 kB             |
| gateway\_dns                   | 1.44 kB             | 6.23 kB             |
| dex\_application\_tests        | 3.29 kB             | 5.67 kB             |
| casb\_findings                 | 2.67 kB             | 3.80 kB             |
| gateway\_http                  | 1.47 kB             | 2.60 kB             |
| dex\_device\_state\_events     | 1.98 kB             | 2.57 kB             |
| page\_shield\_events           | 443 B               | 2.02 kB             |
| network\_analytics\_logs       | 1.31 kB             | 1.87 kB             |
| zero\_trust\_network\_sessions | 1.21 kB             | 1.52 kB             |
| gateway\_network               | 877 B               | 1.17 kB             |
| device\_posture\_results       | 730 B               | 944 B               |
| spectrum\_events               | 685 B               | 925 B               |
| sinkhole\_http\_logs           | 705 B               | 705 B               |
| access\_requests               | 446 B               | 541 B               |
| dns\_firewall\_logs            | 387 B               | 469 B               |
| dns\_logs                      | 199 B               | 409 B               |
| magic\_ids\_detections         | 334 B               | 349 B               |
| warp\_toggle\_changes          | 327 B               | 335 B               |
| ipsec\_logs                    | 207 B               | 260 B               |
| nel\_reports                   | 204 B               | 224 B               |

## Monitor usage

Cloudflare provides three primary ways to track your consumption and maintain financial oversight:

* **In-product quick indicator**: View your current month's usage directly within the Log Explorer interface at the top of the **Log Search** and **Manage Datasets** sections.
* **Account-level billing**: Access a detailed view of current and previous months' cumulative usage under **Manage Account** \> **Billing**.
* **Usage alerts**: Set up automated notifications to trigger when billable usage exceeds a defined threshold.

### Configure a usage alert

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select **Manage account**.
2. Go to **Notifications** \> **Add**.
3. Select **Usage-based Billing**.
4. Define your threshold and the notification destination (email, PagerDuty, or webhooks).

## Deactivate Log Explorer

To stop using Log Explorer and end associated charges, you must complete both of the following steps:

### 1\. Stop log ingestion

Disabling datasets stops additional ingestion charges immediately.

1. Go to the [Manage datasets ↗](https://dash.cloudflare.com/?to=/:account/log-explorer/manage-sources) page at the account level.
2. Use the toggle to turn off each dataset you no longer need.
3. Select **Stop ingesting logs** to confirm.

### 2\. Cancel the subscription

This prevents the subscription from renewing at the next billing cycle.

1. Go to the [Billing ↗](https://dash.cloudflare.com/?to=/:account/billing) page.
2. In the **Subscriptions** tab, find the **Log Explorer** subscription and select **Cancel**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}},{"@type":"ListItem","position":3,"item":{"@id":"/log-explorer/pricing/","name":"Pricing and managing usage"}}]}
```
