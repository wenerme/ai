---
title: Workers API
description: Send emails directly from Cloudflare Workers using the Email Service binding and send() method.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/api/send-emails/workers-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Workers API

The Workers API provides native email sending capabilities directly from your Cloudflare Workers through bindings. If you are not using Workers, you can send emails using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) instead.

## Email binding

Configure email bindings in your Wrangler configuration file to enable email sending:

* [  wrangler.jsonc ](#tab-panel-6864)
* [  wrangler.toml ](#tab-panel-6865)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "send_email": [

    {

      "name": "EMAIL"

    },

    {

      "name": "RESTRICTED_EMAIL",

      "allowed_sender_addresses": [

        "noreply@yourdomain.com",

        "support@yourdomain.com"

      ]

    }

  ]

}


```

Explain Code

TOML

```

[[send_email]]

name = "EMAIL"


# Optional: restrict sender addresses for security

[[send_email]]

name = "RESTRICTED_EMAIL"

allowed_sender_addresses = ["noreply@yourdomain.com", "support@yourdomain.com"]


```

## `send()` method

Send a single email using the `send()` method on your email binding.

### Interface

TypeScript

```

interface SendEmail {

  send(message: EmailMessage | EmailMessageBuilder): Promise<EmailSendResult>;

}


// Structured email builder (recommended)

interface EmailMessageBuilder {

  to: string | string[]; // Max 50 recipients

  from: string | { email: string; name: string };

  subject: string;

  html?: string;

  text?: string;

  cc?: string | string[];

  bcc?: string | string[];

  replyTo?: string | { email: string; name: string };

  attachments?: Attachment[];

  headers?: { [key: string]: string }; // See /email-service/reference/headers/

}


interface Attachment {

  content: string | ArrayBuffer; // Base64 string or binary content

  filename: string;

  type: string; // MIME type

  disposition: "attachment" | "inline";

  contentId?: string; // For inline attachments

}


interface EmailSendResult {

  messageId: string; // Unique email ID

}


// Errors are thrown as standard Error objects with a `code` property

// try { await env.EMAIL.send(...) } catch (e) { console.log(e.code, e.message) }


```

Explain Code

### Basic usage

* [ Simple email ](#tab-panel-6859)
* [ Multiple recipients ](#tab-panel-6860)
* [ With CC and BCC ](#tab-panel-6861)

TypeScript

```

interface Env {

  EMAIL: SendEmail;

}


```

TypeScript

```

// Send to multiple recipients (max 50)

const response = await env.EMAIL.send({

  to: ["user1@example.com", "user2@example.com", "user3@example.com"],

  from: { email: "newsletter@yourdomain.com", name: "Newsletter Team" },

  subject: "Monthly Newsletter",

  html: "<h1>This month's updates</h1>",

  text: "This month's updates",

});


```

TypeScript

```

const response = await env.EMAIL.send({

  to: "customer@example.com",

  cc: ["manager@company.com"],

  bcc: ["archive@company.com"],

  from: "orders@yourdomain.com",

  replyTo: "support@yourdomain.com",

  subject: "Order Confirmation #12345",

  html: "<h1>Your order is confirmed</h1>",

  text: "Your order is confirmed",

});


```

Explain Code

### Attachments

* [ PDF attachment ](#tab-panel-6862)
* [ Inline image ](#tab-panel-6863)

TypeScript

```

const response = await env.EMAIL.send({

  to: "customer@example.com",

  from: "invoices@yourdomain.com",

  subject: "Your Invoice",

  html: "<h1>Invoice attached</h1><p>Please find your invoice attached.</p>",

  attachments: [

    {

      content: "JVBERi0xLjQKJeLjz9MKMSAwIG9iag...", // Base64 PDF content

      filename: "invoice-12345.pdf",

      type: "application/pdf",

      disposition: "attachment",

    },

  ],

});


```

Explain Code

TypeScript

```

const response = await env.EMAIL.send({

  to: "user@example.com",

  from: "marketing@yourdomain.com",

  subject: "Check out our new product!",

  html: `

    <h1>New Product Launch</h1>

    <img src="cid:product-image" alt="New Product" />

    <p>Check out our amazing new product!</p>

  `,

  attachments: [

    {

      content: "iVBORw0KGgoAAAANSUhEUgAA...", // Base64 image content

      filename: "product.png",

      type: "image/png",

      disposition: "inline",

      contentId: "product-image",

    },

  ],

});


```

Explain Code

## Error handling

Handle email sending errors gracefully:

* [ Single send errors ](#tab-panel-6858)

TypeScript

```

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    try {

      const response = await env.EMAIL.send({

        to: "user@example.com",

        from: "noreply@yourdomain.com",

        subject: "Test Email",

        text: "This is a test email.",

      });


      return new Response(

        JSON.stringify({

          success: true,

          emailId: response.messageId,

        }),

      );

    } catch (error) {

      // Error has .code and .message properties

      console.error("Email sending failed:", error.code, error.message);


      // Handle specific error types

      switch (error.code) {

        case "E_SENDER_NOT_VERIFIED":

          return new Response(

            JSON.stringify({

              success: false,

              error: "Please verify your sender domain first",

            }),

            { status: 400 },

          );


        case "E_RATE_LIMIT_EXCEEDED":

          return new Response(

            JSON.stringify({

              success: false,

              error: "Rate limit exceeded. Please try again later",

            }),

            { status: 429 },

          );


        default:

          return new Response(

            JSON.stringify({

              success: false,

              error: error.message,

            }),

            { status: 500 },

          );

      }

    }

  },

};


```

Explain Code

## Error codes

The following error codes may be returned when sending emails:

| Error Code                        | Description                             | Common Causes                                                                                                               |
| --------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| E\_VALIDATION\_ERROR              | Validation error in the payload         | Invalid email format, missing required fields, malformed data                                                               |
| E\_FIELD\_MISSING                 | Required field is missing               | Missing to, from, or subject fields                                                                                         |
| E\_TOO\_MANY\_RECIPIENTS          | Too many recipients in to/cc/bcc arrays | Combined recipients exceed 50 limit                                                                                         |
| E\_SENDER\_NOT\_VERIFIED          | Sender domain not verified              | Attempting to send from unverified domain                                                                                   |
| E\_RECIPIENT\_NOT\_ALLOWED        | Recipient not in allowed list           | Recipient address not in allowed\_destination\_addresses                                                                    |
| E\_RECIPIENT\_SUPPRESSED          | Recipient is on suppression list        | Email address has bounced or reported your emails as spam                                                                   |
| E\_SENDER\_DOMAIN\_NOT\_AVAILABLE | Domain not available for sending        | Domain not onboarded to Email Service                                                                                       |
| E\_CONTENT\_TOO\_LARGE            | Email content exceeds size limit        | Total message size exceeds the maximum                                                                                      |
| E\_DELIVERY\_FAILED               | Could not deliver the email             | SMTP delivery failure, recipient server rejection                                                                           |
| E\_RATE\_LIMIT\_EXCEEDED          | Rate limit exceeded                     | Sending rate limit reached                                                                                                  |
| E\_DAILY\_LIMIT\_EXCEEDED         | Daily limit exceeded                    | Daily sending quota reached                                                                                                 |
| E\_INTERNAL\_SERVER\_ERROR        | Internal service error                  | Email Service temporarily unavailable                                                                                       |
| E\_HEADER\_NOT\_ALLOWED           | Header not allowed                      | Header is platform-controlled or not on the [whitelist](https://developers.cloudflare.com/email-service/reference/headers/) |
| E\_HEADER\_USE\_API\_FIELD        | Must use API field                      | Header like From must be set via the dedicated API field                                                                    |
| E\_HEADER\_VALUE\_INVALID         | Header value invalid                    | Malformed value, empty, or incorrect format                                                                                 |
| E\_HEADER\_VALUE\_TOO\_LONG       | Header value too long                   | Value exceeds 2,048 byte limit                                                                                              |
| E\_HEADER\_NAME\_INVALID          | Header name invalid                     | Invalid characters or exceeds 100 byte limit                                                                                |
| E\_HEADERS\_TOO\_LARGE            | Headers payload too large               | Total custom headers exceed 16 KB limit                                                                                     |
| E\_HEADERS\_TOO\_MANY             | Too many headers                        | More than 20 whitelisted (non-X) custom headers                                                                             |

## Legacy `EmailMessage` API

The existing `EmailMessage` API remains supported for backward compatibility:

TypeScript

```

import { EmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext";


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const msg = createMimeMessage();

    msg.setSender({ name: "Sender", addr: "sender@yourdomain.com" });

    msg.setRecipient("recipient@example.com");

    msg.setSubject("Legacy Email");

    msg.addMessage({

      contentType: "text/html",

      data: "<h1>Hello from legacy API</h1>",

    });


    const message = new EmailMessage(

      "sender@yourdomain.com",

      "recipient@example.com",

      msg.asRaw(),

    );


    await env.EMAIL.send(message);

    return new Response("Legacy email sent");

  },

};


```

Explain Code

---

## Next steps

* See the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) for sending emails without Workers
* See [practical examples](https://developers.cloudflare.com/email-service/examples/) of email sending patterns
* Learn about [email routing](https://developers.cloudflare.com/email-service/api/route-emails/) for handling incoming emails
* Explore [email authentication](https://developers.cloudflare.com/email-service/concepts/email-authentication/) for better deliverability

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/api/send-emails/","name":"Send emails"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/api/send-emails/workers-api/","name":"Workers API"}}]}
```
