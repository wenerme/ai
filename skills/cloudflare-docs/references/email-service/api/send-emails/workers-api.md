---
title: Workers API
description: Send emails directly from Cloudflare Workers using the Email Service binding and send() method.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Workers API

The Workers API provides native email sending capabilities directly from your Cloudflare Workers through bindings. If you are not using Workers, you can send emails using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) instead.

## Email binding

Configure a `send_email` binding in your Wrangler configuration file to enable email sending:

* [  wrangler.jsonc ](#tab-panel-8551)
* [  wrangler.toml ](#tab-panel-8552)

JSONC

```
{  "send_email": [{ "name": "EMAIL" }],}
```

TOML

```
[[send_email]]name = "EMAIL"
```

You can restrict which senders and recipients a binding may use. Refer to [Configure send bindings](https://developers.cloudflare.com/email-service/configuration/send-bindings/) for the available restriction attributes and examples.

## `send()` method

Send a single email using the `send()` method on your email binding.

### Interface

TypeScript

```
interface SendEmail {  send(message: EmailMessage | EmailMessageBuilder): Promise<EmailSendResult>;}
interface EmailAddress {  email: string;  name?: string;}
// Structured email builder (recommended)interface EmailMessageBuilder {  to: string | EmailAddress | (string | EmailAddress)[]; // Max 50 recipients  from: string | EmailAddress;  subject: string;  html?: string;  text?: string;  cc?: string | EmailAddress | (string | EmailAddress)[];  bcc?: string | EmailAddress | (string | EmailAddress)[];  replyTo?: string | EmailAddress;  attachments?: Attachment[];  // Custom headers. See /email-service/reference/headers/  headers?: { [key: string]: string };  // The combined number of addresses in `to`, `cc`, and `bcc` must not  // exceed 50. See /email-service/platform/limits/ for all limits.}
interface Attachment {  content: string | ArrayBuffer | ArrayBufferView; // Base64 string or binary content  filename: string;  type: string; // MIME type  disposition: "attachment" | "inline";  contentId?: string; // For inline attachments}
interface EmailSendResult {  messageId: string; // Unique email ID}
// Errors are thrown as standard Error objects with a `code` property// try { await env.EMAIL.send(...) } catch (e) { console.log(e.code, e.message) }
```

Local development with binary attachments

When using `wrangler dev` without [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings), `ArrayBuffer` and `ArrayBufferView` content in attachments cannot be serialized by the local simulator. Refer to [local development for email sending](https://developers.cloudflare.com/email-service/local-development/sending/#known-limitations).

### Basic usage

TypeScript

```
const response = await env.EMAIL.send({  to: "recipient@example.com",  from: "welcome@yourdomain.com",  subject: "Welcome to our service!",  html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",  text: "Welcome! Thanks for signing up.",});
```

For multiple recipients, CC/BCC, and named addresses, see [Specify recipients](https://developers.cloudflare.com/email-service/examples/email-sending/recipients/).

### Attachments

Send files by including base64-encoded content in the `attachments` array. The total message size must not exceed 5 MiB (including attachments).

TypeScript

```
const response = await env.EMAIL.send({  to: "customer@example.com",  from: "invoices@yourdomain.com",  subject: "Your Invoice",  html: "<h1>Invoice attached</h1><p>Please find your invoice attached.</p>",  attachments: [    {      content: "JVBERi0xLjQKJeLjz9MKMSAwIG9iag...", // Base64 PDF content      filename: "invoice-12345.pdf",      type: "application/pdf",      disposition: "attachment",    },  ],});
```

For inline images and file uploads, see [Email attachments](https://developers.cloudflare.com/email-service/examples/email-sending/email-attachments/).

## Error handling

Handle email sending errors gracefully:

TypeScript

```
export default {  async fetch(request: Request, env: Env): Promise<Response> {    try {      const response = await env.EMAIL.send({        to: "user@example.com",        from: "noreply@yourdomain.com",        subject: "Test Email",        text: "This is a test email.",      });
      return new Response(        JSON.stringify({          success: true,          emailId: response.messageId,        }),      );    } catch (error) {      // Error has .code and .message properties      console.error("Email sending failed:", error.code, error.message);
      // Handle specific error types      switch (error.code) {        case "E_SENDER_NOT_VERIFIED":          return new Response(            JSON.stringify({              success: false,              error: "Please verify your sender domain first",            }),            { status: 400 },          );
        case "E_RATE_LIMIT_EXCEEDED":          return new Response(            JSON.stringify({              success: false,              error: "Rate limit exceeded. Please try again later",            }),            { status: 429 },          );
        default:          return new Response(            JSON.stringify({              success: false,              error: error.message,            }),            { status: 500 },          );      }    }  },};
```

## Error codes

The following error codes may be returned when sending emails:

| Error Code                        | Description                               | Common Causes                                                                                                               |
| --------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| E\_VALIDATION\_ERROR              | Validation error in the payload           | Invalid email format, missing required fields, malformed data                                                               |
| E\_FIELD\_MISSING                 | Required field is missing                 | Missing to, from, or subject fields                                                                                         |
| E\_TOO\_MANY\_RECIPIENTS          | Too many recipients in to/cc/bcc arrays   | Combined recipients exceed 50 limit                                                                                         |
| E\_TOO\_MANY\_ATTACHMENTS         | Too many attachments in attachments array | attachments array exceeds 32 entries                                                                                        |
| E\_SENDER\_NOT\_VERIFIED          | Sender domain not verified                | Attempting to send from unverified domain                                                                                   |
| E\_RECIPIENT\_NOT\_ALLOWED        | Recipient not in allowed list             | Recipient address not in allowed\_destination\_addresses                                                                    |
| E\_RECIPIENT\_SUPPRESSED          | Recipient is on suppression list          | Email address has bounced or reported your emails as spam                                                                   |
| E\_SENDER\_DOMAIN\_NOT\_AVAILABLE | Domain not available for sending          | Domain not onboarded to Email Service                                                                                       |
| E\_CONTENT\_TOO\_LARGE            | Email content exceeds size limit          | Total message size exceeds the maximum                                                                                      |
| E\_DELIVERY\_FAILED               | Could not deliver the email               | SMTP delivery failure, recipient server rejection                                                                           |
| E\_RATE\_LIMIT\_EXCEEDED          | Rate limit exceeded                       | Sending rate limit reached                                                                                                  |
| E\_DAILY\_LIMIT\_EXCEEDED         | Daily limit exceeded                      | Daily sending quota reached                                                                                                 |
| E\_INTERNAL\_SERVER\_ERROR        | Internal service error                    | Email Service temporarily unavailable                                                                                       |
| E\_HEADER\_NOT\_ALLOWED           | Header not allowed                        | Header is platform-controlled or not on the [allowlist](https://developers.cloudflare.com/email-service/reference/headers/) |
| E\_HEADER\_USE\_API\_FIELD        | Must use API field                        | Header like From must be set via the dedicated API field                                                                    |
| E\_HEADER\_VALUE\_INVALID         | Header value invalid                      | Malformed value, empty, or incorrect format                                                                                 |
| E\_HEADER\_VALUE\_TOO\_LONG       | Header value too long                     | Value exceeds 2,048 byte limit                                                                                              |
| E\_HEADER\_NAME\_INVALID          | Header name invalid                       | Invalid characters or exceeds 100 byte limit                                                                                |
| E\_HEADERS\_TOO\_LARGE            | Headers payload too large                 | Total custom headers exceed 16 KB limit                                                                                     |
| E\_HEADERS\_TOO\_MANY             | Too many headers                          | More than 20 allowlisted (non-X) custom headers                                                                             |

## Legacy `EmailMessage` API

The `EmailMessage` API remains supported for backward compatibility. Use it when you already have a raw [RFC 5322 ↗](https://datatracker.ietf.org/doc/html/rfc5322) MIME message to send. For new code, prefer the structured [send() method](#send-method) above.

TypeScript

```
import { EmailMessage } from "cloudflare:email";import { createMimeMessage } from "mimetext";
export default {  async fetch(request: Request, env: Env): Promise<Response> {    const msg = createMimeMessage();    msg.setSender({ name: "Sender", addr: "sender@yourdomain.com" });    msg.setRecipient("recipient@example.com");    msg.setSubject("Legacy Email");    msg.addMessage({      contentType: "text/html",      data: "<h1>Hello from legacy API</h1>",    });
    const message = new EmailMessage(      "sender@yourdomain.com",      "recipient@example.com",      msg.asRaw(),    );
    await env.EMAIL.send(message);    return new Response("Legacy email sent");  },};
```

---

## Next steps

* See the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) for sending emails without Workers
* See [SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/) for sending from any SMTP-capable application or mail client
* See [practical examples](https://developers.cloudflare.com/email-service/examples/) of email sending patterns
* Learn about [email routing](https://developers.cloudflare.com/email-service/api/route-emails/) for handling incoming emails
* Explore [email authentication](https://developers.cloudflare.com/email-service/concepts/email-authentication/) for better deliverability

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/api/send-emails/workers-api/#page","headline":"Workers API · Cloudflare Email Service docs","description":"Send emails directly from Cloudflare Workers using the Email Service binding and send() method.","url":"https://developers.cloudflare.com/email-service/api/send-emails/workers-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/api/send-emails/","name":"Send emails"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/api/send-emails/workers-api/","name":"Workers API"}}]}
```
