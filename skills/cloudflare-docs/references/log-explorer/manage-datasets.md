---
title: Manage datasets
description: Enable or disable Log Explorer datasets.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Manage datasets

Log Explorer allows you to enable or disable which datasets are available to query in Log Search.

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
* [Magic IDS Detections](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic%5Fids%5Fdetections/) (`magic_ids_detections`)
* [Network Analytics](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/network%5Fanalytics%5Flogs/) (`network_analytics_logs`)
* [Sinkhole HTTP Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole%5Fhttp%5Flogs/) (`sinkhole_http_logs`)
* [IP Sec Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec%5Flogs/) (`ipsec_logs`)

## Enable Log Explorer

In order for Log Explorer to begin storing logs, you need to enable the desired datasets. You can do this via the dashboard or the API.

1. In the Cloudflare dashboard, go to the **Log Explorer** \> **Manage datasets** page.  
[ Go to **Manage datasets** ](https://dash.cloudflare.com/?to=/:account/log-explorer/manage-sources)
2. Select **Add dataset** to select the datasets you want to query.
3. Choose a dataset and then a zone. Then, select **Add**. You can always return to this page to enable more datasets or manage your existing ones.

Note

It may take a few minutes for the logs to become available for querying.

If you are using the API, Use the Log Explorer API to enable Log Explorer for each dataset you wish to store. It may take a few minutes after a log stream is enabled before you can view the logs.

The following `curl` command is an example for enabling the zone-level dataset `http_requests`, as well as the expected response when the command succeeds.

Terminal window

```

curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/explorer/datasets \

--header "Authorization: Bearer <API_TOKEN>" \

--json '{

  "dataset": "http_requests"

}'


```

```

{

  "result": {

    "dataset": "http_requests",

    "object_type": "zone",

    "object_id": "<ZONE ID>",

    "created_at": "2025-06-03T14:33:16Z",

    "updated_at": "2025-06-03T14:33:16Z",

    "dataset_id": "01973635f7e273a1964a02f4d4502499",

    "enabled": true

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

To enable an account-level dataset, replace `zones/{zone_id}` with `accounts/{account_id}` in the `curl` command. For example:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logs/explorer/datasets \

--header "Authorization: Bearer <API_TOKEN>" \

--json '{

  "dataset": "access_requests"

}'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}},{"@type":"ListItem","position":3,"item":{"@id":"/log-explorer/manage-datasets/","name":"Manage datasets"}}]}
```
