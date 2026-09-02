---
description: Enable, disable, or delete Log Explorer datasets.
title: Manage datasets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/log-explorer/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage datasets

Last updated Sep 2, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/log-explorer/manage-datasets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Log Explorer allows you to enable, disable, or delete datasets available to query in Log Search.

Note

Canceling a Log Explorer subscription stops renewal, but it does not automatically stop log ingestion during the current billing cycle. To completely turn off Log Explorer, refer to [How do I turn off Log Explorer?](https://developers.cloudflare.com/log-explorer/faq/#how-do-i-turn-off-log-explorer).

## Supported datasets

Log Explorer currently supports the following datasets:

### Zone level

* [HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) (`http_requests`)
* [Firewall Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/firewall%5Fevents/) (`firewall_events`)
* [DNS Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns%5Flogs/) (`dns_logs`)
* [NEL Reports](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/nel%5Freports/) (`nel_reports`)
* [Page Shield Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/page%5Fshield%5Fevents/) (`page_shield_events`) (events for client-side security)
* [Spectrum Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum%5Fevents/) (`spectrum_events`)
* [Zaraz Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/zaraz%5Fevents/) (`zaraz_events`)

### Account level

* [Access requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/access%5Frequests/) (`access_requests`)
* [CASB findings](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb%5Ffindings/) (`casb_findings`)
* [Device posture results](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/device%5Fposture%5Fresults/) (`device_posture_results`)
* [Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/) (`gateway_dns`)
* [Gateway HTTP](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fhttp/) (`gateway_http`)
* [Gateway Network](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fnetwork/) (`gateway_network`)
* [Zero Trust Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/) (`zero_trust_network_sessions`)
* [Audit Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit%5Flogs/) (`audit_logs`)
* [Audit\_logs\_v2](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit%5Flogs%5Fv2/) (`audit_logs_v2`)
* [Browser Isolation User Actions](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/biso%5Fuser%5Factions/) (`biso_user_actions`)
* [DNS firewall logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dns%5Ffirewall%5Flogs/) (`dns_firewall_logs`)
* [Email security alerts](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/email%5Fsecurity%5Falerts/) (`email_security_alerts`)
* [Magic BGP Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic%5Fbgp%5Flogs/) (`magic_bgp_logs`)
* [Magic IDS Detections](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic%5Fids%5Fdetections/) (`magic_ids_detections`)
* [Network Analytics](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/network%5Fanalytics%5Flogs/) (`network_analytics_logs`)
* [Sinkhole HTTP Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole%5Fhttp%5Flogs/) (`sinkhole_http_logs`)
* [IP Sec Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec%5Flogs/) (`ipsec_logs`)

## Enable Log Explorer

To begin storing logs, enable the desired datasets through the dashboard or API.

### Dashboard

1. In the Cloudflare dashboard, go to the **Log Explorer** \> **Manage datasets** page.
[Go to **Manage datasets** ↗](https://dash.cloudflare.com/?to=/:account/log-explorer/manage-sources)
2. Select **Add dataset**.
3. Choose a dataset and, for zone-level datasets, a zone.
4. Under **Select fields**, choose the fields that Log Explorer should ingest.
5. Under **Filter logs**, choose whether to ingest all events or only events that match a filter.
6. Select **Add**.

Note

It may take a few minutes for the logs to become available for querying.

#### Configure fields and filters

Use **Select fields** to control which data points Log Explorer stores. Fields are grouped by category, and each category shows its selected field count. Select a category to add or remove all fields in that group, or expand the category to select individual fields. Each field shows its data type.

Required fields remain selected and are marked **Required**. Fields that Cloudflare no longer recommends are marked **Deprecated**. Select **Select all** to include every available field, or **Reset to default** to restore the dataset defaults.

Use **Filter logs** to ingest **All events** or **Only events matching a filter**. A filter condition consists of a field, an operator, and a value. All conditions within a group must match. An event can match any filter group.

To change the fields or filter for an enabled dataset, go to **Log Explorer** \> **Manage datasets**. Find the dataset, select **Actions** \> **Edit**, update the configuration, and select **Update**.

### API

Use the Log Explorer API to enable each dataset you want to store. It may take a few minutes after a log stream is enabled before you can view the logs.

The following `curl` command is an example for enabling the zone-level dataset `http_requests`, as well as the expected response when the command succeeds.

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/explorer/datasets \
--header "Authorization: Bearer <API_TOKEN>" \
--json '{
  "dataset": "http_requests"
}'
```

```json
{
	"result": {
		"dataset": "http_requests",
		"object_type": "zone",
		"object_id": "<ZONE ID>",
		"created_at": "2025-06-03T14:33:16Z",
		"updated_at": "2025-06-03T14:33:16Z",
		"dataset_id": "01973635f7e273a1964a02f4d4502499",
		"enabled": true,
		"deletion_protection": true
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

To enable an account-level dataset, replace `zones/{zone_id}` with `accounts/{account_id}` in the `curl` command. For example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logs/explorer/datasets \
--header "Authorization: Bearer <API_TOKEN>" \
--json '{
  "dataset": "access_requests"
}'
```

## Delete a dataset

Deleting a dataset permanently removes the dataset and its stored data. Deletion runs asynchronously. You cannot recreate the same dataset for the account or zone while deletion is in progress.

Caution

Dataset deletion is irreversible. Deleted data cannot be recovered.

1. In the Cloudflare dashboard, go to **Log Explorer** \> **Manage datasets**.
[Go to **Manage datasets** ↗](https://dash.cloudflare.com/?to=/:account/log-explorer/manage-sources)
2. Find the dataset and select **Actions** \> **Delete**.
3. If deletion protection is enabled, disable it in the confirmation dialog.
4. Enter the dataset name and select **Delete**.

1. Set `deletion_protection` to `false` with the [Update an account or zone dataset](https://developers.cloudflare.com/api/resources/logs/subresources/log%5Fexplorer/subresources/datasets/methods/update/) method.
2. Delete the dataset with the [Delete an account or zone dataset](https://developers.cloudflare.com/api/resources/logs/subresources/log%5Fexplorer/subresources/datasets/methods/delete/) method.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/log-explorer/manage-datasets/#page","headline":"Manage datasets · Cloudflare Log Explorer docs","description":"Enable, disable, or delete Log Explorer datasets.","url":"https://developers.cloudflare.com/log-explorer/manage-datasets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
