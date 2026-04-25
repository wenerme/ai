---
title: Error 1023
description: Troubleshoot Cloudflare 1023 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1023

## Error 1023: Could not find host

This error indicates that the host could not be found due to a configuration issue or propagation delay.

### Common causes

* If the owner just signed up for Cloudflare it can take a few minutes for the website's information to be distributed to our global network. Something is wrong with the site's configuration.
* Usually, this happens when accounts have been signed up with a partner organization (for example, hosting provider) and the provider's DNS fails.

Note

Error `1023` is returned via a HTTP `503` response code.

### Resolution

Contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with the following details:

* Your domain name.
* A screenshot of the `1023` error including the [**Ray ID**](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) mentioned in the error message.
* A [HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) captured while duplicating the error.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1023/","name":"Error 1023"}}]}
```
