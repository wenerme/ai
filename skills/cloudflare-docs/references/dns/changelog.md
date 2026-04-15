---
title: Changelog
description: Internal DNS is now in open beta.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dns.xml) 

## 2026-03-31

  
**Internal DNS - now in open beta**   

Internal DNS is now in open beta.

#### Who can use it?

Internal DNS is bundled as a part of Cloudflare Gateway and is now available to every Enterprise customer with one of the following subscriptions:

* Cloudflare Zero Trust Enterprise
* Cloudflare Gateway Enterprise

To learn more and get started, refer to the [Internal DNS documentation](https://developers.cloudflare.com/dns/internal-dns/).

## 2026-03-20

  
**DNS Analytics for Customer Metadata Boundary set to EU region**   

DNS Analytics is now available for customers with [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) set to EU. Query your DNS analytics data while keeping metadata stored in the EU region.

This update includes:

* **DNS Analytics** — Access the same DNS analytics experience for zones in CMB=EU accounts.
* **EU data residency** — Analytics data is stored and queried from the EU region, meeting data localization requirements.
* **DNS Firewall Analytics** — DNS Firewall analytics is now supported for CMB=EU customers.

#### Availability

Available to customers with the [Data Localization Suite](https://developers.cloudflare.com/data-localization/) who have Customer Metadata Boundary configured for the EU region.

#### Where to find it

* **Authoritative DNS:** In the Cloudflare dashboard, select your zone and go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/analytics)
* **DNS Firewall:** In the Cloudflare dashboard, go to the **DNS Firewall Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/dns-firewall/analytics)

For more information, refer to [DNS Analytics](https://developers.cloudflare.com/dns/additional-options/analytics/) and [DNS Firewall Analytics](https://developers.cloudflare.com/dns/dns-firewall/analytics/).

## 2025-09-16

  
**DNS Firewall Analytics — now in the Cloudflare dashboard**   

#### What's New

Access [GraphQL-powered DNS Firewall analytics](https://developers.cloudflare.com/dns/dns-firewall/analytics/) directly in the Cloudflare dashboard.

![DNS Firewall Analytics UI](https://developers.cloudflare.com/_astro/DNSFW_Analytics_UI.CgjmZFOO_Z1tNsEz.webp) 

#### Explore Four Interactive Panels

* **Query summary**: Describes trends over time, segmented by dimensions.
* **Query statistics**: Describes totals, cached/uncached queries, and processing/response times.
* **DNS queries by data center**: Describes global view and the top 10 data centers.
* **Top query statistics**: Shows a breakdown by key dimensions, with search and expand options (up to top 100 items).

Additional features:

* Apply filters and time ranges once. Changes reflect across all panels.
* Filter by dimensions like query name, query type, cluster, data center, protocol (UDP/TCP), IP version, response code/reason, and more.
* Access up to 62 days of historical data with flexible intervals.

#### Availability

Available to all DNS Firewall customers as part of their existing subscription.

#### Where to Find It

* In the Cloudflare dashboard, go to the **DNS Firewall** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/dns-firewall/analytics)
* Refer to the [DNS Firewall Analytics](https://developers.cloudflare.com/dns/dns-firewall/analytics/) to learn more.

## 2025-06-19

  
**Account-level DNS analytics now available via GraphQL Analytics API**   

Authoritative DNS analytics are now available on the **account level** via the [Cloudflare GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/).

This allows users to query DNS analytics across multiple zones in their account, by using the `accounts` filter.

Here is an example to retrieve the most recent DNS queries across all zones in your account that resulted in an `NXDOMAIN` response over a given time frame. Please replace `a30f822fcd7c401984bf85d8f2a5111c` with your actual account ID.

GraphQL example for account-level DNS analytics

```

query GetLatestNXDOMAINResponses {

  viewer {

    accounts(filter: { accountTag: "a30f822fcd7c401984bf85d8f2a5111c" }) {

      dnsAnalyticsAdaptive(

        filter: {

          date_geq: "2025-06-16"

          date_leq: "2025-06-18"

          responseCode: "NXDOMAIN"

        }

        limit: 10000

        orderBy: [datetime_DESC]

      ) {

        zoneTag

        queryName

        responseCode

        queryType

        datetime

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgGQIaLAZ0QOQBoAiA8gLICCAkjgEpYAOA9gHaZYwDeAUDDAG4CWYAO6QO3HjFQBjKQxBNEmABQAzfgBsMEAFwdJMuQoAqqAOa6ARKgDMABhUAOAExOVUgCYB2KQBZbARgBOBx8AI0cAVncHFSdUCP9EqQsYAF8ASjEJCXcWMiZUdShEfilMMndUOhLeMCVxbJ41TUhdLkbGyowAfVMwYEsnWycIgFpbADZR-wmLBo6YLrBu9X7B4bHJ6Yc5hYkIemZWAGEGdzBLfGJyKl2F1Pns9X4AW35EXX9bb9tHiQYIOcIAAhKC6ADaSxKL2WBAAogBlY4AXT+mXaCwAXswwCZTH8eKBIFAcKgYQSYAdMIwWGBTucKUToEYoHQwBSoa92R0HtleWlOKkgA&variables=N4XyA)

To learn more and get started, refer to the [DNS Analytics documentation](https://developers.cloudflare.com/dns/additional-options/analytics/#analytics).

## 2025-06-16

  
**Internal DNS (beta) now manageable in the Cloudflare dashboard**   

Participating beta testers can now fully configure [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/) directly in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/internal-dns).

#### Internal DNS enables customers to:

* Map internal hostnames to private IPs for services, devices, and applications not exposed to the public Internet
* Resolve internal DNS queries securely through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)
* Use split-horizon DNS to return different responses based on network context
* Consolidate internal and public DNS zones within a single management platform

#### What’s new in this release:

* Beta participants can now create and manage internal zones and views in the Cloudflare dashboard
![Internal DNS UI](https://developers.cloudflare.com/_astro/internal-dns-beta-ui.B5uCVZ9o_yVcqC.webp) 

Note

The Internal DNS beta is currently only available to Enterprise customers.

To learn more and get started, refer to the [Internal DNS documentation](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-06-11

  
**NSEC3 support for DNSSEC**   

Enterprise customers can now select NSEC3 as method for proof of non-existence on their zones.

What's new:

* **NSEC3 support for live-signed zones** – For both primary and secondary zones that are configured to be live-signed (also known as "on-the-fly signing"), NSEC3 can now be selected as proof of non-existence.
* **NSEC3 support for pre-signed zones** – Secondary zones that are transferred to Cloudflare in a [pre-signed setup](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/#set-up-pre-signed-dnssec) now also support NSEC3 as proof of non-existence.

For more information and how to enable NSEC3, refer to the [NSEC3 documentation](https://developers.cloudflare.com/dns/dnssec/enable-nsec3/).

## 2025-06-03

  
**Improved onboarding for Shopify merchants**   

Shopify merchants can now onboard to **O2O** automatically, without needing to contact support or community members.

What's new:

* **Automatic enablement** – O2O is available for all mutual Cloudflare and Shopify customers.
* **Branded record display** – Merchants see a Shopify logo in DNS records, complete with helpful tooltips.  
![Shopify O2O logo](https://developers.cloudflare.com/_astro/shop-dns-icon-o2o.Ca5DAZHL_1weoif.webp)
* **Checkout protection** – Workers and Snippets are blocked from running on the checkout path to reduce risk and improve security.

For more information, refer to the [provider guide](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/).

## 2025-02-02

  
**Removed unused meta fields from DNS records**   

Cloudflare is removing five fields from the `meta` object of DNS records. These fields have been unused for more than a year and are no longer set on new records. This change may take up to four weeks to fully roll out.

The affected fields are:

* the `auto_added` boolean
* the `managed_by_apps` boolean and corresponding `apps_install_id`
* the `managed_by_argo_tunnel` boolean and corresponding `argo_tunnel_id`

An example record returned from the API would now look like the following:

Updated API Response

```

{

  "result": {

    "id": "<ID>",

    "zone_id": "<ZONE_ID>",

    "zone_name": "example.com",

    "name": "www.example.com",

    "type": "A",

    "content": "192.0.2.1",

    "proxiable": true,

    "proxied": false,

    "ttl": 1,

    "locked": false,

    "meta": {

      "auto_added": false,

      "managed_by_apps": false,

      "managed_by_argo_tunnel": false,

      "source": "primary"

    },

    "comment": null,

    "tags": [],

    "created_on": "2025-03-17T20:37:05.368097Z",

    "modified_on": "2025-03-17T20:37:05.368097Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

For more guidance, refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/).

## 2025-01-27

**Zone IDs and names on individual DNS records**

Records returned by the API will no longer contain the `zone_id` and `zone_name` fields. This change may take up to four weeks to fully roll out. The affected fields were deprecated with an End of Life (EOL) date of November 30, 2024.

## 2024-10-15

**Quote validation for TXT records added via dashboard**

When creating [TXT records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#txt) via the dashboard you will now find:

* Field validation errors if double quotes `"` are added inconsistently.
* Automatically quoted TXT content upon save if no quotes exist in the record content field.

## 2024-10-07

**API support for per-record CNAME flattening**

Paid zones now have the option to flatten specific CNAME records. When using the API, specify the setting `cname_flatten` as `true` or `false`. Refer to the [documentation](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#per-record) for details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/changelog/","name":"Changelog"}}]}
```
