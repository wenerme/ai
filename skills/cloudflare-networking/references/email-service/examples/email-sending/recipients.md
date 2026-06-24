---
title: Specify recipients
description: Send to multiple recipients, CC and BCC, and named addresses using the Workers binding, REST API, or SMTP.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Specify recipients

Specify multiple recipients, CC and BCC, and named addresses when sending with Email Service.

Email Service lets you specify recipients in several ways — multiple recipients, CC and BCC, and named addresses — using the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/), the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/), or [SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/). The combined number of addresses across `to`, `cc`, and `bcc` must not exceed 50\. See [Limits](https://developers.cloudflare.com/email-service/platform/limits/).

## Multiple recipients

* [ Workers ](#tab-panel-8574)
* [ API ](#tab-panel-8575)
* [ SMTP ](#tab-panel-8576)

TypeScript

```
const response = await env.EMAIL.send({  to: ["user1@example.com", "user2@example.com", "user3@example.com"],  from: { email: "newsletter@yourdomain.com", name: "Newsletter Team" },  subject: "Monthly Newsletter",  html: "<h1>This month's updates</h1>",  text: "This month's updates",});
```

Terminal window

```
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \  --header "Authorization: Bearer <API_TOKEN>" \  --header "Content-Type: application/json" \  --data '{    "to": ["user1@example.com", "user2@example.com"],    "from": { "address": "newsletter@yourdomain.com", "name": "Newsletter Team" },    "subject": "Monthly Newsletter",    "html": "<h1>This month'\''s updates</h1>",    "text": "This month'\''s updates"  }'
```

List every recipient in the `To` header and pass one `--mail-rcpt` flag per address.

Terminal window

```
cat > mail.txt <<EOFFrom: Newsletter Team <newsletter@yourdomain.com>To: user1@example.com, user2@example.comSubject: Monthly Newsletter
This month's updatesEOF
curl --ssl-reqd \  --url "smtps://smtp.mx.cloudflare.net:465" \  --user "api_token:<API_TOKEN>" \  --mail-from "newsletter@yourdomain.com" \  --mail-rcpt "user1@example.com" \  --mail-rcpt "user2@example.com" \  --upload-file mail.txt
```

## CC and BCC

* [ Workers ](#tab-panel-8577)
* [ API ](#tab-panel-8578)
* [ SMTP ](#tab-panel-8579)

TypeScript

```
const response = await env.EMAIL.send({  to: "customer@example.com",  cc: ["manager@example.com"],  bcc: ["archive@example.com"],  from: "orders@yourdomain.com",  replyTo: "support@yourdomain.com",  subject: "Order Confirmation #12345",  html: "<h1>Your order is confirmed</h1>",  text: "Your order is confirmed",});
```

Terminal window

```
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \  --header "Authorization: Bearer <API_TOKEN>" \  --header "Content-Type: application/json" \  --data '{    "to": "customer@example.com",    "cc": ["manager@example.com"],    "bcc": ["archive@example.com"],    "from": "orders@yourdomain.com",    "reply_to": "support@yourdomain.com",    "subject": "Order Confirmation #12345",    "html": "<h1>Your order is confirmed</h1>",    "text": "Your order is confirmed"  }'
```

Add a `Cc` header for CC recipients. BCC recipients are added as `--mail-rcpt` flags but omitted from the headers.

Terminal window

```
cat > mail.txt <<EOFFrom: orders@yourdomain.comTo: customer@example.comCc: manager@example.comReply-To: support@yourdomain.comSubject: Order Confirmation #12345
Your order is confirmedEOF
curl --ssl-reqd \  --url "smtps://smtp.mx.cloudflare.net:465" \  --user "api_token:<API_TOKEN>" \  --mail-from "orders@yourdomain.com" \  --mail-rcpt "customer@example.com" \  --mail-rcpt "manager@example.com" \  --mail-rcpt "archive@example.com" \  --upload-file mail.txt
```

## Named recipients

Provide a display name alongside the address for the sender and recipients.

* [ Workers ](#tab-panel-8580)
* [ API ](#tab-panel-8581)
* [ SMTP ](#tab-panel-8582)

TypeScript

```
const response = await env.EMAIL.send({  to: { email: "jane@example.com", name: "Jane Doe" },  from: { email: "support@yourdomain.com", name: "Support Team" },  subject: "Welcome!",  html: "<h1>Thanks for joining!</h1>",  text: "Thanks for joining!",});
```

Terminal window

```
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \  --header "Authorization: Bearer <API_TOKEN>" \  --header "Content-Type: application/json" \  --data '{    "to": { "address": "jane@example.com", "name": "Jane Doe" },    "from": { "address": "support@yourdomain.com", "name": "Support Team" },    "subject": "Welcome!",    "html": "<h1>Thanks for joining!</h1>",    "text": "Thanks for joining!"  }'
```

Use the `Display Name <address>` form in the `From` and `To` headers.

Terminal window

```
cat > mail.txt <<EOFFrom: Support Team <support@yourdomain.com>To: Jane Doe <jane@example.com>Subject: Welcome!
Thanks for joining!EOF
curl --ssl-reqd \  --url "smtps://smtp.mx.cloudflare.net:465" \  --user "api_token:<API_TOKEN>" \  --mail-from "support@yourdomain.com" \  --mail-rcpt "jane@example.com" \  --upload-file mail.txt
```

## Mixed plain and named recipients

Combine plain addresses and named addresses in the same `to` field.

* [ Workers ](#tab-panel-8583)
* [ API ](#tab-panel-8584)
* [ SMTP ](#tab-panel-8585)

TypeScript

```
const response = await env.EMAIL.send({  to: ["plain@example.com", { email: "jane@example.com", name: "Jane Doe" }],  from: "support@yourdomain.com",  subject: "Team update",  html: "<h1>Monthly update</h1>",  text: "Monthly update",});
```

Terminal window

```
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \  --header "Authorization: Bearer <API_TOKEN>" \  --header "Content-Type: application/json" \  --data '{    "to": [      "plain@example.com",      { "address": "jane@example.com", "name": "Jane Doe" }    ],    "from": "support@yourdomain.com",    "subject": "Team update",    "html": "<h1>Monthly update</h1>",    "text": "Monthly update"  }'
```

Terminal window

```
cat > mail.txt <<EOFFrom: support@yourdomain.comTo: plain@example.com, Jane Doe <jane@example.com>Subject: Team update
Monthly updateEOF
curl --ssl-reqd \  --url "smtps://smtp.mx.cloudflare.net:465" \  --user "api_token:<API_TOKEN>" \  --mail-from "support@yourdomain.com" \  --mail-rcpt "plain@example.com" \  --mail-rcpt "jane@example.com" \  --upload-file mail.txt
```

## Next steps

* [Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) — full `send()` reference.
* [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) — send over HTTPS.
* [SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/) — send from any SMTP-capable client.
* [Email attachments](https://developers.cloudflare.com/email-service/examples/email-sending/email-attachments/) — send PDFs, inline images, and uploads.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/examples/email-sending/recipients/#page","headline":"Specify recipients · Cloudflare Email Service docs","description":"Send to multiple recipients, CC and BCC, and named addresses using the Workers binding, REST API, or SMTP.","url":"https://developers.cloudflare.com/email-service/examples/email-sending/recipients/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/examples/email-sending/","name":"Email sending"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/examples/email-sending/recipients/","name":"Specify recipients"}}]}
```
