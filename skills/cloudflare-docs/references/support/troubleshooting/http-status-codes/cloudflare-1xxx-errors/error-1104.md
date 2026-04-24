---
title: Error 1104
description: Troubleshoot Cloudflare 1104 error code.
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

# Error 1104

## Error 1104: A variation of this email address is already taken in our system. Only one variation is allowed.

This error indicates that the email address you are trying to add is already taken in the system.

### Common cause

This error can occur if an email has been added with some variation of the email you're trying to add. For example, `my+user@example.com` and `my.user@example.com` will be treated the same in our system.

### Resolution

Log in as the old user and change email to a "throwaway" address, which will free up the new email.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1104/","name":"Error 1104"}}]}
```
