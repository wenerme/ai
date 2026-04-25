---
title: Error 1012
description: Troubleshoot Cloudflare 1012 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1012

## Error 1012: Access Denied

This error indicates that access to the website is denied.

### Common cause

A website owner forbids access based on malicious activity detected from the visitor's computer or network (ip\_address). The most likely cause is a virus or malware infection on the visitor's computer.

### Resolution

Update your antivirus software and run a full system scan. Cloudflare can not override the security settings the site owner has set for the domain. To request website access, contact the site owner to allow your IP address. If you cannot determine how to contact the website owner, lookup contact information for the domain via the [Whois database ↗](https://lookup.icann.org/).

Note

Since the website owner performed the blocking, Cloudflare support cannot override a customer's security settings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1012/","name":"Error 1012"}}]}
```
