---
description: Browse available notification types by product.
title: Available Notifications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Available Notifications

Last updated Apr 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/notification-available/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Available Notifications depend on your Cloudflare plan. Cloudflare offers a variety of Notifications for our products and services, such as [Billing](https://developers.cloudflare.com/billing/), [Denial of Service protection](https://developers.cloudflare.com/ddos-protection/), [Magic Transit](https://developers.cloudflare.com/magic-transit/), and [SSL/TLS](https://developers.cloudflare.com/ssl/).

Depending on your plan, you can also configure webhooks, allowing you to connect your account with external services such as Slack and Google Chat, and PagerDuty to receive Cloudflare Notifications.

## Actions available on receiving a Notification

Each Notification carries different types of information about the status of your Cloudflare account, or the type of action you can take.

Refer to information below to understand what each Notification does and what to do when receiving one.

## Billing

<details>

<summary>

Usage Based Billing

</summary>

**Who is it for?**

Customers who want to receive a notification when the usage of a product goes above a set level.

**Other options / filters**

You can choose the product that you want to be notified about and the threshold that fires the notification. Thresholds depend on the product chosen.

For example:

- Argo Smart Routing has **Notify when total bytes of traffic exceeds** as a threshold.
- Load Balancing has **Notify when total number of DNS Queries exceeds** as a threshold.

**Included with**

Professional plans or higher.

**Note:** Usage-based billing notifications are available to Pay-as-you-go accounts only. Most Enterprise contract accounts are not supported.

**What should you do if you receive one?**

Review your product usage and adjust the configuration and/or increase the alerting threshold.

</details>

## Bots

<details>

<summary>

Bot Detection Alert

</summary>

**Who is it for?**

Enterprise customers who want to be notified when Cloudflare detects a spike in bot traffic on their zones.

**Other options / filters**

None.

**Included with**

Accounts with at least one Enterprise zone.

**What should you do if you receive one?**

Select the <a href="https://developers.cloudflare.com/waf/analytics/security-analytics/">Security Analytics</a> link enclosed in the alert message. Contact support if additional advice is needed on how to investigate the attack further.

**Additional information**

After an alert is created on the dashboard, it may take up to 30 minutes before sufficient data is available to begin detecting traffic anomalies. Verified bot traffic is excluded from bot alerts.

</details>

<details>

<summary>

Custom Bot Detection Alert

</summary>

**Who is it for?**

Enterprise customers who want to be notified when Cloudflare detects a spike in bot traffic on their zones.

**Other options / filters**

Refer to the <a href="https://developers.cloudflare.com/bots/reference/alerts/#alert-logic">alert logic</a> for more information on additional filters or groupings.

**Included with**

Accounts with at least one Enterprise zone.

**What should you do if you receive one?**

Select the <a href="https://developers.cloudflare.com/waf/analytics/security-analytics/">Security Analytics</a> link enclosed in the alert message. Contact support if additional advice is needed on how to investigate the attack further.

**Additional information**

After an alert is created on the dashboard, it may take up to 30 minutes before sufficient data is available to begin detecting traffic anomalies. Verified bot traffic is excluded from both basic and advanced bot alerts.

Alerts with grouping could cause potential noise if you set them up for a high-traffic zone. Grouping alerts function as if you set up separate policies with a filter for each value. Alerts may trigger multiple values in the same group as long as the traffic for each value reaches the threshold of 200.

</details>

## Client-side security

<details>

<summary>

Client-side security New Code Change Detection Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when JavaScript dependencies change in the pages of their domain.

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Investigate to confirm that it is an expected change.

**Additional information**

Triggered daily. If configured with a zone filter, the alert is triggered immediately.

</details>

<details>

<summary>

Client-side security New Domain Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when resources from new host domains appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm that it is an expected change.

**Additional information**

Triggered hourly. If configured with a zone filter, the alert is triggered immediately.

</details>

<details>

<summary>

Client-side security New Malicious Domain Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when resources from a known malicious domain appear in their domain. For more information, refer to <a href="https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/">Malicious script and connection detection</a>.

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Review the information in the client-side security dashboard about the detected malicious resources, then update the pages where those resources were detected.

For more information, refer to <a href="https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/">Review scripts and connections considered malicious</a>.

</details>

<details>

<summary>

Client-side security New Malicious Script Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when Cloudflare classifies JavaScript dependencies in their domain as malicious. For more information, refer to <a href="https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/">Malicious script and connection detection</a>.

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Review the information in the client-side security dashboard about the detected malicious resources, then update the pages where those resources were detected.

For more information, refer to <a href="https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/">Review scripts and connections considered malicious</a>.

</details>

<details>

<summary>

Client-side security New Malicious URL Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when resources from a known malicious URL appear in their domain. For more information, refer to <a href="https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/">Malicious script and connection detection</a>.

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Review the information in the client-side security dashboard about the detected malicious resources, then update the pages where those resources were detected.

For more information, refer to <a href="https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/">Review scripts and connections considered malicious</a>.

</details>

<details>

<summary>

Client-side security New Resources Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when new resources appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm that it is an expected change.

**Additional information**

Triggered daily. If configured with a zone filter, the alert is triggered immediately.

</details>

<details>

<summary>

Client-side security New Resource Exceeds Max URL Length Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/client-side-security/">Client-side security</a> customers who want to receive a notification when a resource's URL exceeds the maximum allowed length.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Manually check the resource.

</details>

## Cloudflare Access

<details>

<summary>

Expiring Access Service Token Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/cloudflare-one/access-controls/policies/">Access</a> customers who want to receive a notification when their service token is about to expire.

**Other options / filters**

None.

**Included with**

Purchase of Access

**What should you do if you receive one?**

Extend the expiration date of the service token. For more details, refer to <a href="https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#renew-service-tokens">Renew your service token</a>.

</details>

## Cloudflare Images

<details>

<summary>

Image Notifications

</summary>

**Who is it for?**

Customers using <a href="https://developers.cloudflare.com/images/upload-images/direct-creator-upload/">Direct creator uploads</a> to upload images.

**Other options / filters**

None.

**Included with**

Cloudflare images subscription.

**What should you do if you receive one?**

No action is needed.

</details>

<details>

<summary>

Image Transformation Notifications

</summary>

**Who is it for?**

Customers who are using free image transformations and want to be notified if they exceed their free quota.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

No action is needed.

</details>

## Cloudflare Status

<details>

<summary>

Maintenance Notification

</summary>

**Who is it for?**

Customers interested in knowing about planned <a href="https://developers.cloudflare.com/support/troubleshooting/disruptive-maintenance/">Cloudflare maintenance</a> for specific data centers. The notification lets you know when maintenance has been scheduled, changed, or canceled on an entire point of presence.

**Other options / filters**

You can filter maintenance notifications for specific points of presence and updates (scheduled, changed, canceled).

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

If the notification is announcing new scheduled maintenance, you may want to add the maintenance to your calendar. During these maintenance windows, you may experience a slight increase in latency to the edge location which is under maintenance.

</details>

<details>

<summary>

Incident Alerts

</summary>

**Who is it for?**

Customers interested in knowing about Cloudflare incidents. The notification lets you know when Cloudflare incidents are created, updated, and resolved.

**Other options / filters**

You can filter incident alerts to specific impact levels (minor, major, critical).

Additionally, incident alerts can be filtered to incidents affecting specific components. By default, incident alerts will trigger a notification for incident updates across all impact levels and components.

The impact level and affected components of an incident may change as the incident progresses. A notification will only be sent if the configured filters match at the time of the incident update. Updates will not be sent retroactively.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Review your <a href="https://developers.cloudflare.com/analytics/">analytics</a> page to see if your domain is impacted.

</details>

## DDoS Protection

<details>

<summary>

HTTP DDoS Attack Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/waf/">WAF</a> or <a href="https://developers.cloudflare.com/cache/">CDN</a> customers who want to receive a notification when Cloudflare has mitigated HTTP attacks that generate more than 100 requests per second.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

No action needed. Refer to <a href="https://developers.cloudflare.com/ddos-protection/reference/alerts/">DDoS alerts</a> for more information.

</details>

<details>

<summary>

Layer 3/4 DDoS Attack Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/byoip/">BYOIP</a> and <a href="https://developers.cloudflare.com/spectrum/">Spectrum</a> customers with <a href="https://developers.cloudflare.com/analytics/network-analytics/">Network Analytics</a> who want to receive a notification when Cloudflare has mitigated attacks that generate an average of at least 12,000 packets per second over a five-second period, with a duration of one minute or more.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

No action needed. Refer to <a href="https://developers.cloudflare.com/ddos-protection/reference/alerts/">DDoS alerts</a> for more information.

</details>

<details>

<summary>

Advanced HTTP DDoS Attack Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/waf/">WAF</a> or <a href="https://developers.cloudflare.com/cache/">CDN</a> customers with the <a href="https://developers.cloudflare.com/ddos-protection/">Advanced DDoS Protection</a> subscription who want to receive a notification when Cloudflare has mitigated attacks that generate more than the configured number of requests per second (100 rps by default).

**Other options / filters**

You can choose when to trigger a notification.

Available filters include:

- The zones in the account for which you wish to receive notifications.
- The specific hostnames for which you wish to receive notifications.
- The minimum requests-per-second rate that will trigger the alert (100 rps by default).

**Included with**

Enterprise plans with the Advanced DDoS Protection add-on.

**What should you do if you receive one?**

No action needed. Refer to <a href="https://developers.cloudflare.com/ddos-protection/reference/alerts/">DDoS alerts</a> for more information.

</details>

<details>

<summary>

Advanced Layer 3/4 DDoS Attack Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/byoip/">BYOIP</a> and <a href="https://developers.cloudflare.com/magic-transit/">Magic Transit</a> customers with <a href="https://developers.cloudflare.com/analytics/network-analytics/">Network Analytics</a> who want to receive a notification when Cloudflare has mitigated attacks that generate more than the configured number of packets per second (12,000 pps by default).

**Other options / filters**

You can choose when to trigger a notification.

Available filters include:

- The IP prefixes for which you wish to receive notifications.
- The specific IP addresses for which you wish to receive notifications.
- The minimum packets-per-second rate that will trigger the alert (12,000 pps by default).
- The minimum megabits-per-second rate that will trigger the alert.
- The protocols for which you wish to receive notifications (all protocols by default).

If you specify multiple filters, Cloudflare applies an <code>AND</code> logic. This means the alert will only trigger if all filters you set are true. Keep this in mind when setting up this alert with more than one filter.

**Included with**

Purchase of Magic Transit and/or BYOIP (Enterprise plans).

**What should you do if you receive one?**

No action needed. Refer to <a href="https://developers.cloudflare.com/ddos-protection/reference/alerts/">DDoS alerts</a> for more information.

</details>

## DEX

<details>

<summary>

Device connectivity anomaly

</summary>

**Who is it for?**

Zero Trust customers who want to be notified when Cloudflare detects a spike or drop in the number of devices connected to the WARP client.

**Other options / filters**

- **Alert configuration**: Choose when to trigger a notification. Available options are *Connectivity spike*, *Connectivity drop*, and *Connectivity spike or drop*.
- Filters:
  - **Colo**: Cloudflare data center that the device is connected to.
  - **Platform**: Operating system of the device.
  - **Version**: WARP client version (for example, <code>2024.3.409.0</code>).
  - **Mode**: <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/">WARP mode</a> deployed on the device.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Review your <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/fleet-status/">fleet status</a> to investigate why the spike or drop occurred and which devices are impacted.

**Additional information**

To learn more about the alert logic, refer to <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#z-score">Z-score</a>.

</details>

<details>

<summary>

DEX test latency

</summary>

**Who is it for?**

Zero Trust customers who wish to receive alerts when there is a spike or drop in application latency, as measured by the HTTP test <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/#test-results">Resource Fetch time</a> or Traceroute test <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/#test-results">Round trip time</a>. Requires setting up a <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/">DEX test</a>.

**Other options / filters**

- **Alert configuration**: Choose when to trigger a notification. Available options are *Latency spike*, *Latency drop*, and *Latency spike or drop*.
- Filters:
  - **Colo**: Cloudflare data center that the device is connected to.
  - **Platform**: Operating system of the device.
  - **Version**: WARP client version (for example, <code>2024.3.409.0</code>).
  - **Test name**: Choose which DEX test the alert should monitor. You will receive individual notifications for each test.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

View your <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/">test results</a> to investigate why the spike occurred.

**Additional information**

To learn more about the alert logic, refer to <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#z-score">Z-score</a>.

</details>

<details>

<summary>

DEX test low availability

</summary>

**Who is it for?**

Zero Trust customers who wish to receive alerts when the percentage of successful HTTP or traceroute requests to an application drops below the selected service-level objective (SLO). Requires setting up a <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/">DEX test</a>.

**Other options / filters**

- **Service Level Objective (SLO)**: Specify the availability threshold that will trigger an alert. Enter a percentage in <code>xx.x</code> format (for example, <code>98.0</code>).
- Filters:
  - **Colo**: Cloudflare data center that the device is connected to.
  - **Platform**: Operating system of the device.
  - **Version**: WARP client version (for example, <code>2024.3.409.0</code>).
  - **Test name**: Choose which DEX test the alert should monitor. You will receive individual notifications for each test.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

View your <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/">test results</a> to investigate why the degradation occurred.

**Additional information**

To learn more about the alert logic, refer to <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#slo">SLO</a>.

</details>

## DNS

<details>

<summary>

Secondary DNS all Primaries Failing

</summary>

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification if all of their primary nameservers are failing.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS

**What should you do if you receive one?**

1. Confirm that your primary nameservers are up and running.
2. Confirm that the <a href="https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/">Access Control Lists (ACLs)</a> on your primary nameservers are configured correctly.
3. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

</details>

<details>

<summary>

Secondary DNS Primaries Failing

</summary>

**Who is it for?**

Enterprise customers who have at least one secondary zone and want to receive a notification if at least one of their primary nameservers is failing while transfers from at least one other primary are still successful.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

1. Confirm that your primary nameservers are up and running.
2. Confirm that the <a href="https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/">Access Control Lists (ACLs)</a> on your primary nameservers are configured correctly.
3. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

</details>

<details>

<summary>

Secondary DNS Successfully Updated

</summary>

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification on successful zone transfers.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

No action needed. Everything is working correctly.

</details>

<details>

<summary>

Secondary DNS Warning

</summary>

**Who is it for?**

Customers who are using Cloudflare for Secondary DNS and want to receive notifications about warnings issued by the transferred zone.

**Other options / filters**

None.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Actions for failure notifications will depend on the type of failure.

</details>

## Health Checks

<details>

<summary>

Health Checks status notification

</summary>

**Who is it for?**

Customers who want to be warned about changes to server health as determined by <a href="https://developers.cloudflare.com/health-checks/">health checks</a>.

**Other options / filters**

Available filters include:

- You can search for and add health checks from your list of health checks.
- You can choose a trigger to fire the notification when your server becomes **unhealthy**, **healthy**, or **either healthy or unhealthy**.

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Review your <a href="https://developers.cloudflare.com/health-checks/health-checks-analytics/#common-error-codes">health check analytics</a>.

</details>

## Load Balancing

<details>

<summary>

Pool Enablement

</summary>

**Who is it for?**

Customers who want to be warned about status changes (enabled/disabled) in their pools.

**Other options / filters**

Available filters include:

- You can search for and add pools from your list of pools. If no pools are selected, the alert will apply to all pools in the account.
- You can also choose the trigger that fires the notification when the Load Balancing pool is **enabled**, **disabled**, and **either enabled or disabled**.

**Included with**

Purchase of <a href="https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/">Load Balancing</a>.

**What should you do if you receive one?**

No action is needed.

</details>

<details>

<summary>

Load Balancing Health Alert

</summary>

**Who is it for?**

Customers who want to be warned about <a href="https://developers.cloudflare.com/load-balancing/understand-basics/health-details/">changes in health status</a> in their pools or origins.

**Other options / filters**

Available filters include:

- You can search for and add pools from your list of pools, as well as **Include future pools** (if all pools are selected).
- You can choose the trigger that fires the notification when the health status becomes **unhealthy**, **healthy**, or **either unhealthy or healthy**
- You can choose the trigger that fires the notification when the event source health status changes in **pool**, **origin**, or **either pool or origin**.

**Included with**

Purchase of <a href="https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/">Load Balancing</a>.

**What should you do if you receive one?**

Evaluate <a href="https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/">load balancing analytics</a> to review changes in health status over time.

</details>

## Logpush

<details>

<summary>

Failing Logpush Job Disabled

</summary>

**Who is it for?**

Enterprise customers who use <a href="https://developers.cloudflare.com/logs/">Logpush</a> and want to monitor their job health.

**Other options / filters**

- Notification Name: A custom name for the notification.
- Description (optional): A custom description for the notification.
- Notification Email (can be multiple emails): The email address of the recipient for the notification.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

In the email for the notification, you can find the destination name for the failing Logpush job. With this destination name, you should be able to figure out which zone this relates to. There can be multiple reasons why a job fails, but it is best to test that the destination endpoint is healthy, and that necessary credentials are still working. You can also check that the destination has allowlisted <a href="https://www.cloudflare.com/ips/">Cloudflare IPs</a>.

</details>

## Magic Transit

<details>

<summary>

Network Flow - Auto Advertisement

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/magic-transit/on-demand/">Magic Transit on-demand</a> customers who use Flow-Based Monitoring and want alerts when Magic Transit is automatically enabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

No action is needed. You can go to the <a href="https://dash.cloudflare.com/?to=/:account/magic-transit">Cloudflare dashboard</a> to review the health and status of your tunnels.

</details>

<details>

<summary>

Network Flow - DDoS Attack

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/byoip/">BYOIP</a> and <a href="https://developers.cloudflare.com/spectrum/">Spectrum</a> customers with <a href="https://developers.cloudflare.com/analytics/network-analytics/">Network Analytics</a> who want to receive a notification when Cloudflare has mitigated attacks that generate an average of at least 12,000 packets per second over a five-second period, with a duration of one minute or more.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

No action needed. Refer to <a href="https://developers.cloudflare.com/ddos-protection/reference/alerts/">DDoS alerts</a> for more information.

</details>

<details>

<summary>

Network Flow - Volumetric Attack

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/magic-transit/on-demand/">Magic Transit on-demand</a> customers who are using Flow-Based Monitoring to detect attacks when Magic Transit is disabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

If you do not have auto advertisement enabled, you need to advertise your IP prefixes to enable Magic Transit. For more information, refer to <a href="https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/">Dynamic advertisement</a>.

</details>

<details>

<summary>

Magic Tunnel Health Check Alert

</summary>

**Who is it for?**

Magic Transit and Cloudflare WAN customers who wish to receive alerts when the percentage of tunnel states meeting the selected service-level objective (SLO) drops below the defined threshold for a Magic Tunnel.

**Other options / filters**

- Notification Name: A custom name for the notification.
- Description (optional): A custom description for the notification.
- Notification Email (can be multiple emails): The email address of recipient for the notification.
- Webhooks
- Tunnels: Choose one or more tunnels to monitor.
- SLO: Define SLO threshold for Magic Tunnel health alerts. Available options are *High*, *Medium*, and *Low*.

**Included with**

Purchase of Magic Transit and Cloudflare WAN.

**What should you do if you receive one?**

Refer to the <a href="https://developers.cloudflare.com/magic-transit/network-health/check-tunnel-health-dashboard/">Magic Transit tunnel health</a> or <a href="https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/">Cloudflare WAN IPsec/GRE tunnel health</a> for more information on what the issue might be.

</details>

## Network Interconnect

<details>

<summary>

Connection Maintenance Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/network-interconnect/classic-cni/">Classic CNI</a> customers who want to be alerted to maintenance events that might affect Classic CNI.

**Other options / filters**

None.

**Included with**

Purchase of Cloudflare Network Interconnect (CNI).

**What should you do if you receive one?**

No action is needed.

</details>

## Pages

<details>

<summary>

Project updates

</summary>

**Who is it for?**

Customers who want to receive notifications about project-level events in <a href="https://developers.cloudflare.com/pages/">Cloudflare Pages</a>.

**Other options / filters**

Available filters include:

- Pages projects
- Environments
- Different events: **Deployment started**, **Deployment failed**, or **Deployment success**

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

For failed deployments, review our <a href="https://developers.cloudflare.com/pages/configuration/debugging-pages/#check-your-build-log">debugging guide</a>.

</details>

## Radar

<details>

<summary>

Radar Alerts

</summary>

**Who is it for?**

Customers who want to receive a notification when traffic anomalies, outages, route hijacks, or route leaks are impacting one or more countries, regions, or autonomous systems (ASNs) of interest.

**Other options / filters**

Filters include:

- Notification type (anomaly, outage, route hijack, route leak)
- Location (country or region)
- Autonomous systems (ASNs)

You have the option to send the notification via email, webhook, or PagerDuty.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Further action will depend on your role. Refer to the <a href="https://developers.cloudflare.com/radar/">Radar documentation</a> for more information.

</details>

## Route Leak Detection

<details>

<summary>

Route Leak Detection Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/byoip/">BYOIP customers</a> who want to receive a notification when their prefixes are advertised in places they should not be.

**Other options / filters**

None.

**Included with**

Purchase of BYOIP.

**What should you do if you receive one?**

Confirm your traffic is healthy. Reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.

</details>

## SSL/TLS

<details>

<summary>

Access mTLS Certificate Expiration Alert

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/cloudflare-one/access-controls/policies/">Access</a> customers that use client certificates for mutual TLS authentication. This notification will be sent 30 and 14 days before the expiration of the certificate.

**Other options / filters**

None.

**Included with**

Purchase of <a href="https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/">Access</a> and/or <a href="https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/">Cloudflare for SaaS</a>.

**What should you do if you receive one?**

Upload a <a href="https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration">renewed certificate</a>.

</details>

<details>

<summary>

Advanced Certificate Alert

</summary>

**Who is it for?**

Customers with <a href="https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/">advanced certificates</a> that want to be alerted on validation, issuance, renewal, and expiration of certificates.

**Other options / filters**

None.

**Included with**

When an advanced certificate is validated, issued, renewed, or expired.

**What should you do if you receive one?**

Action only needed if notification is about a certificate that failed to be issued. Refer to <a href="https://developers.cloudflare.com/ssl/troubleshooting/version-cipher-mismatch/">SSL expired or SSL mismatch errors</a> for more information.

</details>

<details>

<summary>

Hostname-level Authenticated Origin Pulls Certificate Expiration Alert

</summary>

**Who is it for?**

Customers that upload their own certificate to use with hostname-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server. AOP certificate expiration notifications are sent 30 days and 14 days before the certificate expiry.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for <a href="https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/">hostname-level AOP</a>.

</details>

<details>

<summary>

SSL for SaaS Custom Hostnames Alert

</summary>

**Who is it for?**

Customers with custom hostname certificates who want to receive a notification on validation, issuance, renewal, and expiration of certificates. For more details around data formatting for webhooks, refer to the <a href="https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/webhook-definitions/">Cloudflare for SaaS docs</a>.

**Other options / filters**

None.

**Included with**

Purchase of <a href="https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/">Cloudflare for SaaS</a>.

**What should you do if you receive one?**

You only need to take action if you are notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in <a href="https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/">Troubleshooting SSL errors</a>.

</details>

<details>

<summary>

Universal SSL Alert

</summary>

**Who is it for?**

Customers with universal certificates who want to receive a notification on validation, issuance, renewal, and expiration notices.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

You only need to take action if you are notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in <a href="https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/">Troubleshooting SSL errors</a>.

</details>

<details>

<summary>

Zone-level Authenticated Origin Pulls Certificate Expiration Alert

</summary>

**Who is it for?**

Customers that upload their own certificate to use with zone-level Authenticated Origin Pull (AOP) to secure connections from Cloudflare to their origin server. AOP certificate expiration notifications are sent 30 days and 14 days before the certificate expiry.

**Other options / filters**

None.

**Included with**

Authenticated Origin Pull.

**What should you do if you receive one?**

Upload a renewed certificate to use for <a href="https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/">zone-level AOP</a>.

</details>

<details>

<summary>

mTLS Certificate Store Certificate Expiration Alert

</summary>

**Who is it for?**

Customers that upload their own client certificates for mTLS via <a href="https://developers.cloudflare.com/ssl/client-certificates/byo-ca/">bring your own CA</a>.

This notification will be sent 30 and 14 days before the expiration of the certificate.

**Other options / filters**

None.

**Included with**

<a href="https://developers.cloudflare.com/ssl/client-certificates/byo-ca/">Bring your own CA</a>.

The mTLS Certificate Store refers to customer uploaded certificates and does not include client certificates generated with the <a href="https://developers.cloudflare.com/ssl/client-certificates/#how-it-works">Cloudflare CA</a>.

**What should you do if you receive one?**

Upload a renewed certificate.

</details>

## Security Center

<details>

<summary>

Brand Protection Alerts

</summary>

**Who is it for?**

Customers who want a summary of activity related to <a href="https://developers.cloudflare.com/security-center/brand-protection/">Brand Protection</a>.

**Other options / filters**

You can set up Brand Protection Alerts on individual monitored queries. For more details, refer to <a href="https://developers.cloudflare.com/security-center/brand-protection/#brand-protection-alerts">Brand Protection Alerts</a>.

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Investigate and potentially block any suspicious domains that may be trying to impersonate your brand.

</details>

<details>

<summary>

Brand Protection Digest

</summary>

**Who is it for?**

Customers who want a summary of activity related to <a href="https://developers.cloudflare.com/security-center/brand-protection/">Brand Protection</a>.

**Other options / filters**

You can set up Brand Protection Digest on individual monitored queries. For more details, refer to <a href="https://developers.cloudflare.com/security-center/brand-protection/#brand-protection-alerts">Brand Protection Alerts</a>.

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Investigate and potentially block any suspicious domains that may be trying to impersonate your brand.

</details>

<details>

<summary>

Logo Match Alerts

</summary>

**Who is it for?**

Customers who want to receive a notification when the <a href="https://developers.cloudflare.com/security-center/brand-protection/">Brand Protection</a> system detects a new domain which is using the uploaded logo and might be infringing copyright.

**Other options / filters**

You can select the query that you want to be alerted on.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the domains and URLs that are potentially impersonating your brand.

</details>

<details>

<summary>

Security Insights

</summary>

**Who is it for?**

Customers who want to receive notifications based on security insights findings.

**Other options / filters**

You can select the insight(s) you want to be alerted on.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Review the insight and decide whether you want to resolve it, archive it, or export it.

</details>

<details>

<summary>

Abuse report

</summary>

**Who is it for?**

Customers who want to be alerted in the event that an abuse report is filed against their website.

**Other options / filters**

You can filter the reports based on date, report status, report type, and domain.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

View our guidance on <a href="https://developers.cloudflare.com/fundamentals/reference/report-abuse/abuse-report-obligations/">customer abuse report obligations</a> and more information on how to <a href="https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/">view and submit abuse reports</a>.

</details>

## Stream

<details>

<summary>

Stream Live Notifications

</summary>

**Who is it for?**

Customers who are using <a href="https://developers.cloudflare.com/stream/">Stream</a> and want to receive webhooks with the status of their videos.

**Other options / filters**

You can input Stream Live IDs to receive notifications only about those inputs. If left blank, you will receive a list for all inputs.

The following input states will fire notifications. You can toggle them on or off:

- <code>live_input.connected</code>
- <code>live_input.disconnected</code>

**Included with**

Stream subscription.

**What should you do if you receive one?**

Stream notifications are entirely customizable by the customer. Action will depend on the customizations enabled.

</details>

## Traffic Monitoring

<details>

<summary>

Advanced Error Rate Alert

</summary>

**Who is it for?**

Enterprise customers who want to receive a notification when Cloudflare detects edge and/or origin errors. Refer to <a href="https://developers.cloudflare.com/notifications/reference/traffic-alerts/">HTTP Traffic Alerts</a> for more information.

**Other options / filters**

Available filters include:

- You can search and add domains from your list of domains.
- You can filter alerts by **edge status code**, **origin status code**, and the **IP Address**.
- You can also choose the trigger that fires the notification. Available triggers are **low sensitivity**, **medium sensitivity**, **high sensitivity**, or **very high sensitivity**.

You can also toggle Alert Grouping to receive separate alerts for your domain, edge status code, and/or origin status code.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

1. Use the link in the notification you received to see which error codes Cloudflare is seeing.
2. Depending on the statuses you are alerting on, refer to <a href="https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/">Troubleshooting Cloudflare 5XX errors</a>.

**Limitations**

Traffic Monitoring alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Service level objectives (SLOs) are used to determine the threshold.

</details>

<details>

<summary>

Origin Error Rate Alert

</summary>

**Who is it for?**

Enterprise customers who want to receive a notification when Cloudflare is unable to access their origin server. Refer to <a href="https://developers.cloudflare.com/notifications/reference/traffic-alerts/">HTTP Traffic Alerts</a> for more information.

**Other options / filters**

Multiple filters available:

- You can search and add domains from your list of domains.
- You can also choose the trigger that fires the notification. Available triggers are **low sensitivity**, **medium sensitivity**, **high sensitivity**, or **very high sensitivity**.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

1. Use the link in the Notification you received to see which error codes Cloudflare is seeing from your origin.
2. Refer to <a href="https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/">Troubleshooting Cloudflare 5XX errors</a> to learn how to troubleshoot these errors.

**Limitations**

Traffic Monitoring alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Service level objectives (SLOs) are used to determine the threshold.

</details>

<details>

<summary>

Traffic Anomalies Alert

</summary>

**Who is it for?**

Enterprise customers who want to receive a notification when one zone is experiencing an unexpected spike or drop in traffic. Refer to <a href="https://developers.cloudflare.com/notifications/reference/traffic-alerts/">HTTP Traffic Alerts</a> for more information.

**Other options / filters**

Multiple filters available:

- You can search and add domains from your list of domains.
- You can include or exclude traffic mitigated by the <a href="https://developers.cloudflare.com/waf/">Web Application Firewall (WAF)</a>.
- You can choose whether to be notified of either spikes or drops in traffic.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Use the link in the Notification you received to view if the spike or drop is significant enough to require further actions.

**Limitations**

Traffic Monitoring alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Z-score is used to determine the threshold.

</details>

## Trust and Safety Blocks

<details>

<summary>

Block Review Rejection

</summary>

**Who is it for?**

Customers who want to be notified when Cloudflare Trust &amp; Safety rejects a request for block removal.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Take care of any abuse on your website. Then, go to the <a href="https://dash.cloudflare.com/">Cloudflare dashboard</a> and request a review.

</details>

<details>

<summary>

New Blocks

</summary>

**Who is it for?**

Customers who want to be notified when Cloudflare Trust &amp; Safety places a block on their website.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Take care of any abuse on your website. Then, go to the <a href="https://dash.cloudflare.com/">Cloudflare dashboard</a> and request a review.

</details>

<details>

<summary>

Removed Blocks

</summary>

**Who is it for?**

Customers who want to be notified when Cloudflare Trust &amp; Safety removes a block from their website.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

This is informational follow up.

</details>

## Tunnel

<details>

<summary>

Tunnel Creation or Deletion Event

</summary>

**Who is it for?**

Customers who want to receive a notification when Cloudflare Tunnels are created or deleted in their account.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

No action is needed.

</details>

<details>

<summary>

Tunnel Health Alert

</summary>

**Who is it for?**

Customers who want to be warned about changes in health status for their Cloudflare Tunnels.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Monitor tunnel health over time and consider deploying <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/"><code>cloudflared</code> replicas or load balancers</a>.

**Additional information**

Refer to <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status">Tunnel status</a> to review the list of possible tunnel statuses (<code>Healthy</code>, <code>Inactive</code>, <code>Down</code> and <code>Degraded</code>).

</details>

## Web Analytics

<details>

<summary>

Weekly summary

</summary>

**Who is it for?**

Customers using <a href="https://developers.cloudflare.com/web-analytics/">Web Analytics</a> to monitor their website's performance.

**Other options / filters**

None.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

No action is needed. This notification is a weekly summary with reports from your Web Analytics account. Refer to <a href="https://dash.cloudflare.com/?to=/:account/notifications">Notifications</a> in the Cloudflare dashboard to refine your notifications settings.

</details>

## Web Application Firewall (WAF)

<details>

<summary>

Advanced Security Events Alert

</summary>

**Who is it for?**

Enterprise customers who want to receive alerts about spikes in specific services that generate log entries in <a href="https://developers.cloudflare.com/waf/analytics/security-events/">Security Events</a>. For more information, refer to <a href="https://developers.cloudflare.com/waf/reference/alerts/">WAF alerts</a>.

**Other options / filters**

A mandatory <a href="https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/"><code>filters</code></a> selection is needed when you create a notification policy which includes the list of services and zones that you want to be alerted on.

- You can search for and add domains from your list of Enterprise zones.
- You can choose which services the alert should monitor (Managed Firewall, Rate Limiting, etc.).
- You can filter events by a targeted action.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the information in <a href="https://developers.cloudflare.com/waf/analytics/security-events/">Security Events</a> to identify any possible attack or misconfiguration.

**Additional information**

The mean time to detection is five minutes.

When setting up this alert, you can select the services that will be monitored. Each selected service is monitored separately and can be selected as a filter.

**Limitations**

Security Events (WAF) alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Z-score is used to determine the threshold.

</details>

<details>

<summary>

Security Events Alert

</summary>

**Who is it for?**

Business and Enterprise customers who want to receive alerts about spikes across all services that generate log entries in <a href="https://developers.cloudflare.com/waf/analytics/security-events/">Security Events</a>. For more information, refer to <a href="https://developers.cloudflare.com/waf/reference/alerts/">WAF alerts</a>.

**Other options / filters**

A mandatory <a href="https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/"><code>filters</code></a> selection is needed when you create a notification policy which includes the list of zones that you want to be alerted on.

- You can also search for and add domains from your list of business or enterprise zones. The notification will be sent for the domains chosen.
- You can filter events by a targeted action.

**Included with**

Business and Enterprise plans.

**What should you do if you receive one?**

Review the information in <a href="https://developers.cloudflare.com/waf/analytics/security-events/">Security Events</a> to identify any possible attack or misconfiguration.

**Additional information**

The mean time to detection is five minutes.

When setting up this alert, you can select the services that will be monitored. Each selected service is monitored separately.

**Limitations**

Security Events (WAF) alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Z-score is used to determine the threshold.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/notification-available/#page","headline":"Available Notifications","description":"Browse available notification types by product.","url":"https://developers.cloudflare.com/notifications/notification-available/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
