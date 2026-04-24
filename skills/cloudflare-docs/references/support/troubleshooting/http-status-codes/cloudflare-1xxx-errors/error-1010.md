---
title: Error 1010
description: Troubleshoot Cloudflare 1010 error code.
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

# Error 1010

## Error 1010: The owner of this website has banned your access based on your browser's signature

This error indicates that access to the website is denied based on your browser's signature.

### Common cause

A website owner blocked your request based on your client's web browser.

### Resolution

Notify the website owner of the blocking. If you cannot determine how to contact the website owner, lookup contact information for the domain via the [Whois database ↗](https://lookup.icann.org/). Site owners can [turn off Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/#disable-browser-integrity-check) in the Security **Settings** page.

Note

Since the website owner performed the blocking, Cloudflare support cannot override a customer's security settings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/","name":"Error 1010"}}]}
```
