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

Advanced patterns and examples for sending emails with Cloudflare Email Service. Most examples use the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/); the same [EmailMessageBuilder](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/#send-method) fields (`to`, `from`, `subject`, `html`, `text`, `cc`, `bcc`, `replyTo`, `attachments`, `headers`) apply to the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) as JSON in your HTTP request body. The [Send email over SMTP](https://developers.cloudflare.com/email-service/examples/email-sending/smtp/) example covers sending over SMTP from several languages and clients.

* [ Specify recipients ](https://developers.cloudflare.com/email-service/examples/email-sending/recipients/)
* [ User signup flow ](https://developers.cloudflare.com/email-service/examples/email-sending/signup-flow/)
* [ Magic link authentication ](https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/)
* [ Email attachments ](https://developers.cloudflare.com/email-service/examples/email-sending/email-attachments/)
* [ Send email over SMTP ](https://developers.cloudflare.com/email-service/examples/email-sending/smtp/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/email-service/examples/email-sending/#page","headline":"Email sending · Cloudflare Email Service docs","description":"Advanced patterns and examples for sending transactional emails with Email Service.","url":"https://developers.cloudflare.com/email-service/examples/email-sending/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/examples/email-sending/","name":"Email sending"}}]}
```
