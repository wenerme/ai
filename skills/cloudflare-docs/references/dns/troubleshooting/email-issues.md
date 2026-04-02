---
title: Email issues
description: If you have issues sending or receiving mail, follow these troubleshooting steps.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/troubleshooting/email-issues.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Email issues

If you have issues sending or receiving mail, follow these troubleshooting steps.

## Are your records correct?

Consult with your mail administrator or mail provider to ensure you have valid DNS record content.

## Are DNS records missing?

Contact your mail administrator to confirm the DNS records for your domain are correct. Refer to our guide on [managing DNS records in Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records) if you need assistance to add or edit DNS records.

## Do you have NS records configured?

NS records are used to delegate the management of a hostname to another DNS provider (refer to [Delegate a subdomain (outgoing)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/#delegate-a-subdomain-outgoing) for further context). If you have NS records configured on your DNS records table, confirm that these are expected and not generating conflicts.

## Do you have CNAME flattening enabled?

When [**CNAME flattening for all CNAME records**](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/) is on, queries to all `CNAME` records will flatten to an `A` record; no `CNAME` records will be returned.

Also, if `CNAME` records are not returned by the queried nameserver (sometimes nameservers will return `TXT` records), this may result in nothing being returned when **CNAME flattening for all CNAME records** is on. Turning off this feature should fix any issues with your `CNAME` records not being returned.

## Is Cloudflare Spectrum enabled on your account?

Cloudflare does not proxy traffic on port 25 (SMTP) unless [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/reference/configuration-options#smtp) is turned on and configured to proxy email traffic across Cloudflare. If you do not have Spectrum turned on, then no email traffic (SMTP) passes through Cloudflare, and Cloudflare only resolves the DNS. This also means that any DNS record used to send email traffic must be DNS-only to bypass the Cloudflare network. For more information, refer to [Identifying subdomains compatible with Cloudflare's proxy](https://developers.cloudflare.com/dns/proxy-status/).

## Contact your mail provider for assistance

If your email does not work shortly after editing DNS records, contact your mail administrator or mail provider for further assistance in troubleshooting so that data about the issue can be provided to Cloudflare support.

## dc-######### subdomain

The dc-##### subdomain is added to overcome a conflict created when your `SRV` or `MX` record resolves to a domain configured to [proxy](https://developers.cloudflare.com/dns/proxy-status/) to Cloudflare.

Therefore, Cloudflare will create a `dc-#####` DNS record that resolves to the origin IP address. The `dc-#####` record ensures that traffic for your `MX` or `SRV` record is not proxied (it directly resolves to your origin IP) while the Cloudflare proxy works for all other traffic.

For example, before using Cloudflare, suppose your DNS records for mail are as follows:

`example.com MX example.com`

`example.com A 192.0.2.1`

After using Cloudflare and proxying the `A` record, Cloudflare will provide DNS responses with a Cloudflare IP (`203.0.113.1` in the example below):

`example.com MX example.com`

`example.com A 203.0.113.1`

Since proxying mail traffic to Cloudflare would break your mail services, Cloudflare detects this situation and creates a `dc-#####` record:

`example.com MX dc-1234abcd.example.com`

`dc-1234abcd.example.com A 192.0.2.1`

`example.com A 203.0.113.1`

Removing the `dc-######` record is only possible via one of these methods:

* If no mail is received for the domain, delete the `MX` record.
* If mail is received for the domain, update the `MX` record to resolve to a separate `A` record for a mail subdomain that is not proxied by Cloudflare:  
`example.com MX mail.example.com`  
`mail.example.com A 192.0.2.1`  
`example.com A 203.0.113.1`

Warning

If your mail server resides on the same IP as your web server, your MX record will expose your origin IP address.

---

## Best practices for MX records on Cloudflare

If possible, do not host a mail service on the same server as the web resource you want to protect, since emails sent to non-existent addresses get bounced back to the attacker and reveal the mail server IP address.

Cloudflare recommends using non-contiguous IPs from different IP ranges.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/troubleshooting/email-issues/","name":"Email issues"}}]}
```
