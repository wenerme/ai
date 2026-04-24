---
title: Manage DNS records
description: Create, edit, and delete DNS records for your zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/manage-dns-records/how-to/create-dns-records.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Manage DNS records

Consider the sections below for step-by-step instructions on managing DNS records at Cloudflare.

To better understand what DNS records are, refer to [Overview](https://developers.cloudflare.com/dns/manage-dns-records/). For context around common records you want to review when getting started at Cloudflare, refer to [review DNS records](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#2-review-your-dns-records).

Note

If your domain is added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

---

## Basic operations

### Create DNS records

* [ Dashboard ](#tab-panel-6685)
* [ API ](#tab-panel-6686)

To create a DNS record in the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Choose a record [**Type**](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/).
4. Complete the required fields, which vary per record. Particularly important fields (for some records) include:  
   * **Proxy status**: For `A`, `AAAA`, and `CNAME` records, decide whether hostname traffic is [proxied through Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).  
   * **TTL**: Short for [_Time to Live_](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/), this field controls how long each record is valid and — as a result — how long it takes for record updates to reach your end users.  
   * **Comment** and **Tag**: [Record attributes](https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/) meant for your reference.  
   * **Private network routing**: Some Enterprise customers also have access to [private network routing](https://developers.cloudflare.com/dns/manage-dns-records/how-to/private-network-routing/). For `A` and `AAAA` records, this feature allows you to proxy HTTP/HTTPS traffic from public hostnames to origins in your private network.
5. Select **Save**.

To create records with the API, use a [POST request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/). For field definitions, select a record type under the request body specification.

For specific API examples, refer to [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/).

### Edit DNS records

* [ Dashboard ](#tab-panel-6681)
* [ API ](#tab-panel-6682)

To edit DNS records in the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. On a specific record, select **Edit**.
3. Make any necessary changes.
4. Select **Save**.

To update part of a record with the API, use a [PATCH request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/edit/). If you want to overwrite the entire existing record, use a [PUT request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/update/).

### Delete DNS records

* [ Dashboard ](#tab-panel-6683)
* [ API ](#tab-panel-6684)

To delete DNS records in the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. On a specific record, select **Edit**.
3. Select **Delete**.
4. Select **Delete** again to confirm.

To delete records with the API, use a [DELETE request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/delete/).

---

## Use cases

### Update an origin IP address

If your hosting provider changes or your origin IP address changes, update the **Content** value of the relevant DNS records (usually `A` or `AAAA` records).

If you are not sure which IP address to use, refer to your hosting provider's documentation.

### Originless setups

If you need a placeholder address for an originless setup (also referred to as parked domain or redirect-only), you can use the reserved IPv6 address `100::` or the reserved IPv4 address `192.0.2.0` in a [proxied](https://developers.cloudflare.com/dns/proxy-status/) DNS record.

This allows you to route requests using products such as [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/), [Page Rules](https://developers.cloudflare.com/rules/page-rules/), or [Workers](https://developers.cloudflare.com/workers/).

---

## Further guidance

* [ Manage DNS records ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
* [ Create zone apex record ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/)
* [ Create subdomain records ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)
* [ Set up email records ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)
* [ Private network routing ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/private-network-routing/)
* [ Import and export records ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/)
* [ Batch record changes ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/)
* [ Dynamically update DNS records ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/managing-dynamic-ip-addresses/)
* [ Round-robin DNS ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/round-robin-dns/)
* [ Delegate subdomains ](https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/how-to/create-dns-records/","name":"Manage DNS records"}}]}
```
