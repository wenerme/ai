---
description: Review scope, size, and retention for supported Logs datasets.
title: Datasets
image: https://developers.cloudflare.com/observability/logs/datasets/og.png?v=d09fd91e35ee57db
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Datasets

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/logs/datasets/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Observability supports logs from the products listed in the table. Turn on each dataset in the location shown under **Enablement**. Datasets enabled through [Log Explorer](https://developers.cloudflare.com/log-explorer/) appear in Logs once your account has Log Explorer and that dataset turned on. Event sizes are estimates and vary by record.

## Supported datasets

| Dataset | Identifier | Enablement | Average event size | Default retention |
| --- | --- | --- | --- | --- |
| [Workers](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) | `workers` | [On Worker](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#enable-workers-logs) | 4.84 KB | 7 days |
| [Containers](https://developers.cloudflare.com/containers/faq/#how-do-container-logs-work) | `containers` | [On Worker](https://developers.cloudflare.com/containers/faq/#how-do-container-logs-work) | 1.88 KB | 7 days |
| [R2 Data Access Logs](https://developers.cloudflare.com/r2/buckets/data-access-logs/) | `r2` | [On Bucket](https://developers.cloudflare.com/r2/buckets/data-access-logs/#turn-on-data-access-logs) | 1.55 KB | 7 days |
| [AI Gateway](https://developers.cloudflare.com/ai-gateway/observability/logging/) | `ai-gateway` | [On Gateway](https://developers.cloudflare.com/ai-gateway/observability/logging/) | 2 KB | 7 days |
| [Issues](https://developers.cloudflare.com/workers/observability/issues/) | `real-time-issues` | [On Worker](https://developers.cloudflare.com/workers/observability/issues/) | 2.64 KB | 7 days |
| [HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http_requests/) | `http_requests` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.56 KB | 30 days |
| [Firewall Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/firewall_events/) | `firewall_events` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.36 KB | 30 days |
| [Access Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/access_requests/) | `access_requests` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 446 B | 30 days |
| [Audit Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs/) | `audit_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 2.69 KB | 30 days |
| [Audit Logs v2](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs_v2/) | `audit_logs_v2` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.73 KB | 30 days |
| [Browser Isolation User Actions](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/biso_user_actions/) | `biso_user_actions` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | Not published | 30 days |
| [CASB Findings](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb_findings/) | `casb_findings` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 2.67 KB | 30 days |
| [DEX Application Tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex_application_tests/) | `dex_application_tests` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 3.29 KB | 30 days |
| [DEX Device State Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex_device_state_events/) | `dex_device_state_events` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.98 KB | 30 days |
| [Device Posture Results](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/device_posture_results/) | `device_posture_results` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 730 B | 30 days |
| [DNS Firewall Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dns_firewall_logs/) | `dns_firewall_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 387 B | 30 days |
| [DNS Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns_logs/) | `dns_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 199 B | 30 days |
| [Email Security Alerts](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/email_security_alerts/) | `email_security_alerts` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 6.74 KB | 30 days |
| [Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway_dns/) | `gateway_dns` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.44 KB | 30 days |
| [Gateway HTTP](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway_http/) | `gateway_http` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.47 KB | 30 days |
| [Gateway Network](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway_network/) | `gateway_network` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 877 B | 30 days |
| [IPsec Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec_logs/) | `ipsec_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 207 B | 30 days |
| [Magic BGP Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_bgp_logs/) | `magic_bgp_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | Not published | 30 days |
| [Magic IDS Detections](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_ids_detections/) | `magic_ids_detections` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 334 B | 30 days |
| [NEL Reports](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/nel_reports/) | `nel_reports` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 204 B | 30 days |
| [Network Analytics](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/network_analytics_logs/) | `network_analytics_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.31 KB | 30 days |
| [Page Shield Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/page_shield_events/) | `page_shield_events` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 443 B | 30 days |
| [Sinkhole HTTP Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole_http_logs/) | `sinkhole_http_logs` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 705 B | 30 days |
| [Spectrum Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum_events/) | `spectrum_events` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 685 B | 30 days |
| [WARP Toggle Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp_toggle_changes/) | `warp_toggle_changes` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 327 B | 30 days |
| [Zaraz Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/zaraz_events/) | `zaraz_events` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 7.30 KB | 30 days |
| [Zero Trust Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero_trust_network_sessions/) | `zero_trust_network_sessions` | [On Account](https://developers.cloudflare.com/log-explorer/manage-datasets/#enable-log-explorer) | 1.21 KB | 30 days |

## Pricing

Beginning December 1, 2026, all Cloudflare logs and traces will use the same pricing model. Unsampled security datasets have a different price point of $1 per GB ingested and include 30-day retention. Queries, dashboards, alerts, and analytics do not incur additional charge.

### Included in the new Observability pricing

The following logs and traces share account-level ingestion and storage allowances:

- [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/)
- [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)
- [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/)
- [Containers logs](https://developers.cloudflare.com/containers/faq/#how-do-container-logs-work)
- [R2 Data Access Logs](https://developers.cloudflare.com/r2/buckets/data-access-logs/)
- [AI Gateway logs](https://developers.cloudflare.com/ai-gateway/observability/logging/)
- [Issues](https://developers.cloudflare.com/workers/observability/issues/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/logs/datasets/#page","headline":"Datasets","description":"Review scope, size, and retention for supported Logs datasets.","url":"https://developers.cloudflare.com/observability/logs/datasets/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/logs/datasets/og.png?v=d09fd91e35ee57db","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
