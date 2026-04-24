---
title: REST API
description: Send emails from any application using the Email Service REST API with standard HTTP requests.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/api/send-emails/rest-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# REST API

The REST API allows you to send emails from any application using standard HTTP requests. Use it from any backend, serverless function, or CI/CD pipeline — no Cloudflare Workers binding is required.

For the full OpenAPI specification, refer to the [Email Sending API reference ↗](https://developers.cloudflare.com/api/resources/email%5Fsending/methods/send).

## Endpoint

```

POST https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send


```

## Authentication

Authenticate with a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) that has permission to send emails. Include it in the `Authorization` header:

```

Authorization: Bearer <API_TOKEN>


```

## Send an email

* [ Simple email ](#tab-panel-7027)
* [ Multiple recipients ](#tab-panel-7028)
* [ With CC and BCC ](#tab-panel-7029)

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \

  --header "Authorization: Bearer <API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "to": "recipient@example.com",

    "from": "welcome@yourdomain.com",

    "subject": "Welcome to our service!",

    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>",

    "text": "Welcome! Thanks for signing up."

  }'


```

Explain Code

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \

  --header "Authorization: Bearer <API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "to": ["user1@example.com", "user2@example.com"],

    "from": { "address": "newsletter@yourdomain.com", "name": "Newsletter Team" },

    "subject": "Monthly Newsletter",

    "html": "<h1>This month'\''s updates</h1>",

    "text": "This month'\''s updates"

  }'


```

Explain Code

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \

  --header "Authorization: Bearer <API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "to": "customer@example.com",

    "cc": ["manager@company.com"],

    "bcc": ["archive@company.com"],

    "from": "orders@yourdomain.com",

    "reply_to": "support@yourdomain.com",

    "subject": "Order Confirmation #12345",

    "html": "<h1>Your order is confirmed</h1>",

    "text": "Your order is confirmed"

  }'


```

Explain Code

## Attachments

Send files by including base64-encoded content in the `attachments` array. The total message size must not exceed **5 MiB** (including attachments).

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \

  --header "Authorization: Bearer <API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "to": "customer@example.com",

    "from": "invoices@yourdomain.com",

    "subject": "Your Invoice",

    "html": "<h1>Invoice attached</h1><p>Please find your invoice attached.</p>",

    "attachments": [

      {

        "content": "JVBERi0xLjQKJeLjz9MK...",

        "filename": "invoice-12345.pdf",

        "type": "application/pdf",

        "disposition": "attachment"

      }

    ]

  }'


```

Explain Code

## Custom headers

Set custom headers for threading, list management, or tracking. Refer to the [email headers reference](https://developers.cloudflare.com/email-service/reference/headers/) for the full list of allowed headers.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \

  --header "Authorization: Bearer <API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "to": "user@example.com",

    "from": "notifications@yourdomain.com",

    "subject": "Your weekly digest",

    "html": "<h1>Weekly Digest</h1>",

    "headers": {

      "List-Unsubscribe": "<https://yourdomain.com/unsubscribe?id=abc123>",

      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",

      "X-Campaign-ID": "weekly-digest-2026-03"

    }

  }'


```

Explain Code

## Response

A successful response returns the delivery status for each recipient:

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "delivered": ["recipient@example.com"],

    "permanent_bounces": [],

    "queued": []

  }

}


```

Explain Code

* `delivered` \- Email addresses to which the message was delivered immediately
* `permanent_bounces` \- Email addresses that permanently bounced
* `queued` \- Email addresses for which delivery was queued for later

## Error handling

The REST API returns standard Cloudflare API error responses. A failed request returns an `errors` array with numeric error codes and machine-readable messages:

```

{

  "success": false,

  "errors": [

    {

      "code": 10001,

      "message": "email.sending.error.invalid_request_schema"

    }

  ],

  "messages": [],

  "result": null

}


```

Explain Code

Common REST API error codes:

| HTTP Status | Code  | Message                                       | Description                            |
| ----------- | ----- | --------------------------------------------- | -------------------------------------- |
| 400         | 10001 | email.sending.error.invalid\_request\_schema  | Invalid request format                 |
| 400         | 10200 | email.sending.error.email.invalid             | Invalid email content                  |
| 400         | 10201 | email.sending.error.email.no\_content\_length | Missing content length                 |
| 400         | 10202 | email.sending.error.email.too\_big            | Email exceeds size limit               |
| 403         | 10203 | email.sending.error.email.sending\_disabled   | Sending disabled for this zone/account |
| 429         | 10004 | email.sending.error.throttled                 | Rate limit exceeded                    |
| 500         | 10002 | email.sending.error.internal\_server          | Internal server error                  |

Workers binding vs REST API errors

The REST API returns standard Cloudflare API numeric error codes, while the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) throws errors with string codes (for example, `E_SENDER_NOT_VERIFIED`). Refer to the [Workers API error codes table](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/#error-codes) for the string error codes.

## Next steps

* Refer to the [Email Sending API reference ↗](https://developers.cloudflare.com/api/resources/email%5Fsending/methods/send) for the full request and response schemas.
* See the [Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) for sending emails directly from Cloudflare Workers using bindings.
* Review [email headers](https://developers.cloudflare.com/email-service/reference/headers/) for threading, list management, and custom tracking headers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/api/send-emails/","name":"Send emails"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/api/send-emails/rest-api/","name":"REST API"}}]}
```
