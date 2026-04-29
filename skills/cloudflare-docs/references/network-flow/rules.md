---
title: Rules
description: Create rules to alert on network flow anomalies.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rules

Network Flow (formerly Magic Network Monitoring) rules monitor your network traffic for Distributed Denial of Service (DDoS) attacks targeting specific IP addresses or prefixes. When traffic exceeds a rule's threshold or matches a known DDoS attack fingerprint, you receive an alert.

## Rule types

Network Flow supports three rule types:

| Rule Type                                                                                                  | Description                                                                                                                                 | Availability               |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| [Dynamic threshold](https://developers.cloudflare.com/network-flow/rules/dynamic-threshold/) (recommended) | Analyzes your network's traffic patterns over time and automatically adjusts the DDoS threshold (bits or packets) based on traffic history. | API only                   |
| [Static threshold](https://developers.cloudflare.com/network-flow/rules/static-threshold/)                 | You define a fixed threshold (bits or packets) for DDoS traffic monitoring.                                                                 | API and dashboard          |
| [sFlow DDoS attack](https://developers.cloudflare.com/network-flow/rules/s-flow-ddos-attack/)              | If you send sFlow data to Cloudflare, you can receive alerts when a specific DDoS attack type is detected in your traffic.                  | API only (sFlow data only) |

## Create rules in the dashboard

You can only configure static traffic threshold rules in the Cloudflare dashboard.

Invalid account settings error when trying to create a rule

If you get the following error when trying to create a rule:

`Invalid account settings request body: account name format contains illegal characters or is not supported`

Make sure the name for your Cloudflare account does not contain unsupported characters, like, for example, `&`, `<`, `>`, `"`, `'`, `` ` ``.

Refer to [Account name](https://developers.cloudflare.com/fundamentals/account/create-account/#account-name) to learn how to change your account name.

To create a new rule:

1. Go to the **Network flow** page.
[ Go to **Network flow** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/flow-analytics) 
1. Select **Configure Network flow**.
2. In the **Configure rules** tab, select **Add new rule**.
3. Fill in the rule fields. For details on each field, refer to [Static threshold rules](https://developers.cloudflare.com/network-flow/rules/static-threshold/).
4. Select **Create a new rule** when you are finished.

## Edit rules in the dashboard

1. Go to the **Network flow** page.
[ Go to **Network flow** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/flow-analytics) 
1. Select **Configure Network flow**.
2. In the **Configure rules** tab, find the static threshold rule you want to edit, and select **Edit**.
3. Edit the appropriate fields. Refer to [Rule configuration fields](https://developers.cloudflare.com/network-flow/rules/static-threshold/#rule-configuration-fields) for more information on what each field does.
4. Select **Save** when you are finished.

## Delete rules in the dashboard

1. Go to the **Network flow** page.
[ Go to **Network flow** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/flow-analytics) 
1. Select **Configure Network flow**.
2. In the **Configure rules** tab, find the static threshold rule you want to delete, and select **Delete**.
3. Select **I understand that deleting a rule is permanent**, and select **Delete** again.

## Common settings that apply to all rule types

### Rule Auto-Advertisement

Auto-Advertisement automatically activates [Magic Transit](https://developers.cloudflare.com/magic-transit/) when a rule triggers, routing your traffic through Cloudflare for DDoS mitigation without manual intervention.

This feature is available to Enterprise customers using [Magic Transit On Demand](https://developers.cloudflare.com/magic-transit/on-demand). You can enable it for any dynamic threshold, static threshold, or sFlow DDoS attack rule.

Follow the previous steps to [create](#create-rules-in-the-dashboard) or [edit](#edit-rules-in-the-dashboard) a rule. Then, enable **Auto-Advertisement**.

#### Rule Auto-Advertisement notifications

Webhook, PagerDuty, and email notifications are sent following an auto-advertisement attempt for all prefixes inside the flagged rule.

You will receive the status of the advertisement for each prefix with the following available statuses:

* **Advertised**: The prefix was successfully advertised.
* **Already Advertised**: The prefix was advertised prior to the auto advertisement attempt.
* **Delayed**: The prefix cannot currently be advertised but will attempt advertisement. After the prefix can be advertised, a new notification is sent with the updated status.
* **Locked**: The prefix is locked and cannot be advertised.
* **Could not Advertise**: Cloudflare was unable to advertise the prefix. This status can occur for multiple reasons, but usually occurs when you are not allowed to advertise a prefix.
* **Error**: A general error occurred during prefix advertisement.

### Rule IP prefixes

Each rule must include one or more IP prefixes. All prefixes in a rule are evaluated as aggregate traffic — their combined volume is measured against the threshold.

* To alert on the **combined** traffic of multiple prefixes, add them to the same rule.
* To alert on **individual** prefix traffic, create a separate rule for each prefix.

#### Rule IP prefixes example

In the following example, the rule triggers when the **combined** packet traffic of `192.168.0.0/24` and `172.118.0.0/24` exceeds `10000` packets. If Auto-Advertisement is enabled, Cloudflare advertises both prefixes when the rule triggers.

You can also [configure rule IP prefixes at scale using the API](https://developers.cloudflare.com/api/resources/magic%5Fnetwork%5Fmonitoring/subresources/rules/).

```

{

  "rules": [

    {

      "name": "Too many packets",

      "prefixes": ["192.168.0.0/24", "172.118.0.0/24"],

      "packet_threshold": 10000,

      "automatic_advertisement": true,

      "duration": "1m0s",

      "type": "threshold"

    }

  ]

}


```

Explain Code

To set a threshold for a single prefix, create a separate rule:

```

{

  "rules": [

    {

      "name": "Too many packets",

      "prefixes": ["172.118.0.0/24"],

      "packet_threshold": 1000,

      "automatic_advertisement": true,

      "duration": "1m0s",

      "type": "threshold"

    }

  ]

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/rules/","name":"Rules"}}]}
```
