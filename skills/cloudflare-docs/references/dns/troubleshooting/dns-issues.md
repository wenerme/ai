---
title: General DNS issues
description: Troubleshoot common DNS resolution errors like &#34;This site can't be reached&#34;, err_name_not_resolved, and Error 1001 when using Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/troubleshooting/dns-issues.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# General DNS issues

In web browsers such as Safari or Chrome, there are several commonly observable DNS errors:

* `This site can't be reached`
* `This webpage is not available`
* `err_name_not_resolved`
* `Can't find the server`
* [Error 1001 DNS resolution error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1001/)

## Common causes and resolutions

Below are the most common causes for DNS resolution errors along with suggested solutions.

### Mistyped domain or subdomain

Verify that the domain or subdomain was correctly spelled in the request URL.

### Missing DNS records

Ensure that you have the necessary DNS records for the domain or subdomain that is presenting the error.

[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) 

This includes having the following records:

* The [zone apex](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/) (e.g., `example.com`) record.
* Existing [subdomains](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/) (`www.example.com`, `blog.example.com`) records.

Note

If you have a [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup), ensure your DNS records also exist in your authoritative nameservers.

### DNSSEC was not disabled before the domain was added to Cloudflare

DNS resolution failures occur if [DNSSEC is not disabled](https://developers.cloudflare.com/dns/dnssec/#disable-dnssec) at your domain provider before you add the domain to Cloudflare.

### Nameservers no longer point to Cloudflare

If you manage DNS records via the Cloudflare dashboard and your domain stops pointing to Cloudflare's nameservers, DNS resolution will stop functioning.

This can occur if your domain registrar switches the nameservers for your domain to point to their default nameservers. To confirm if this is the problem, [check whether your domain uses Cloudflare's nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#35-verify-changes).

### Unresolved IP address

In rare cases, the DNS resolver in the client requesting the URL might fail to resolve a DNS record to a valid IP address.

Reload the page after a short wait to note if the problem disappears. This issue is unrelated to Cloudflare, but using [Cloudflare's DNS resolver](https://developers.cloudflare.com/1.1.1.1/setup/) may help. Contact your hosting provider for additional help with your current DNS resolver.

### Account recovery

If you are locked out of the Cloudflare account that contains your DNS configuration, refer to [Account recovery](https://developers.cloudflare.com/fundamentals/user-profiles/account-recovery/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/troubleshooting/dns-issues/","name":"General DNS issues"}}]}
```
