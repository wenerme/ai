---
title: Email sending
description: Advanced patterns and examples for sending transactional emails with Email Service.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email sending

Advanced patterns and examples for sending emails with Cloudflare Email Service. These examples use the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/). If you are using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/), the same `EmailMessage` fields (`to`, `from`, `subject`, `html`, `attachments`, `headers`) apply — send them as JSON in your HTTP request body.

* [ User signup flow ](https://developers.cloudflare.com/email-service/examples/email-sending/signup-flow/)
* [ Magic link authentication ](https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/)
* [ Email attachments ](https://developers.cloudflare.com/email-service/examples/email-sending/email-attachments/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/examples/email-sending/","name":"Email sending"}}]}
```
