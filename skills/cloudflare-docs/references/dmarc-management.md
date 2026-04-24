---
title: Cloudflare DMARC Management
description: Stop brand impersonation.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dmarc-management/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cloudflare DMARC Management

Stop brand impersonation.

 Available on all plans 

When someone receives an email that claims to be from your domain, email servers check whether that message is authentic. Three DNS-based mechanisms handle this verification:

* **[SPF (Sender Policy Framework) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/)** confirms the email was sent from an IP address or domain your domain authorizes.
* **[DKIM (DomainKeys Identified Mail) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/)** authenticates the sender's domain and verifies the email content was not altered in transit, using a cryptographic signature.
* **[DMARC (Domain-based Message Authentication Reporting and Conformance) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/)** ties SPF and DKIM together and tells receiving servers what to do when a check fails (for example, reject the email, quarantine it, or take no action).

Cloudflare DMARC Management helps you track every source that is sending emails from your domain and review DMARC reports for each source. These reports show whether messages sent from your domain are passing SPF, DKIM, and DMARC checks — so you can identify unauthorized senders and protect your domain from being used in phishing or spoofing attacks.

Note

DMARC Management is available to all Cloudflare customers with [Cloudflare DNS](https://developers.cloudflare.com/dns/).

---

## Related products

**[Email security](https://developers.cloudflare.com/cloudflare-one/email-security/)** 

Protect your email inbox with Email security.

**[Cloudflare DNS](https://developers.cloudflare.com/dns/)** 

Fast, resilient and easy-to-manage DNS service.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dmarc-management/","name":"DMARC Management"}}]}
```
