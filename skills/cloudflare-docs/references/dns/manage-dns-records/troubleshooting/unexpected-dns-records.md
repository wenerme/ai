---
title: Unexpected DNS records
description: You find several unexpected DNS records after adding your domain to Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/manage-dns-records/troubleshooting/unexpected-dns-records.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Unexpected DNS records

## Additional records after import

You find several unexpected DNS records after adding your domain to Cloudflare.

### Cause

A wildcard (`*`) record at your previous authoritative DNS provider may have been imported into Cloudflare in a way that creates additional records.

### Solution

To solve this issue, you can do one of the following:

* [Delete records in bulk](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/#delete-records-in-bulk).
* Remove and re-add your domain:  
   1. [Remove your domain](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/) from Cloudflare.  
   2. Delete the wildcard record from your authoritative DNS.  
   3. [Re-add](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) the domain.

---

## acme\_challenge TXT records

You might notice TXT records like `_acme-challenge.<hostname>` are returned by your domain but cannot be found on the Cloudflare dashboard.

### Cause

These records are automatically created to allow Cloudflare edge certificates ([universal](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), [advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), and [backup](https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/)) to be provisioned. `_acme-challenge` records are required by certificate authorities (CAs) so that they can verify your domain ownership before issuing the SSL/TLS certificate. For details, refer to [Domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/).

### Solution

As these records are tied to the certificates, they cannot be deleted via the Cloudflare dashboard.

If you need more `_acme-challenge.<hostname>` TXT records in order to provision certificates on your side, you can [manually add them](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) under [DNS records ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records).

If you want to remove these records:

* [Disable Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/disable-universal-ssl/) to remove the records related to universal and backup certificates.
* [Delete advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#delete-a-certificate) to remove the records related to advanced certificates.

---

## Incorrect results for DNS queries

You notice DNS queries returning incorrect results even after you waited for the [TTL](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) to expire.

### Cause

Third-party tools can sometimes fail to return correct DNS results if a recursive DNS cache fails to refresh.

### Solution

In this circumstance, purge your public DNS cache via these methods:

* [Purge your DNS cache at OpenDNS ↗](http://www.opendns.com/support/cache/)
* [Purge your DNS cache at Google ↗](https://developers.google.com/speed/public-dns/cache)
* [Purge your DNS cache locally ↗](https://docs.cpanel.net/knowledge-base/dns/how-to-clear-your-dns-cache/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/troubleshooting/unexpected-dns-records/","name":"Unexpected DNS records"}}]}
```
