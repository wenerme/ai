---
title: Workers API
description: Process incoming emails with the email() handler in Cloudflare Workers to forward, reply, or reject messages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers API

Process incoming emails with the email() handler in Cloudflare Workers. Forward, reply, reject, or process emails programmatically.

Process incoming emails using the `email()` handler in your Cloudflare Workers. This allows you to programmatically handle email routing with custom logic.

## Email handler syntax

Add the `email` handler function to your Worker's exported handlers:

TypeScript

```

interface Env {

  EMAIL: SendEmail;

}


export default {

  async email(message, env, ctx): Promise<void> {

    // Process incoming email

    await message.forward("destination@example.com");

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

### Parameters

| Parameter | Type                    | Description                                   |
| --------- | ----------------------- | --------------------------------------------- |
| message   | ForwardableEmailMessage | The incoming email message                    |
| env       | object                  | Worker environment bindings (KV, EMAIL, etc.) |
| ctx       | object                  | Execution context with waitUntil function     |

## `ForwardableEmailMessage` interface

The `message` parameter provides access to the incoming email:

TypeScript

```

interface ForwardableEmailMessage {

  readonly from: string; // Sender email address (envelope MAIL FROM)

  readonly to: string; // Recipient email address (envelope RCPT TO)

  readonly headers: Headers; // Email headers (Subject, Message-ID, etc.)

  readonly raw: ReadableStream; // Raw MIME email content stream

  readonly rawSize: number; // Size of raw email in bytes

  readonly canBeForwarded: boolean; // Whether the message can be forwarded


  // Actions

  setReject(reason: string): void;

  forward(rcptTo: string, headers?: Headers): Promise<void>;

  reply(message: EmailMessage): Promise<void>;

}


```

Explain Code

### Properties

* [ Basic properties ](#tab-panel-5913)
* [ Reading content ](#tab-panel-5914)
* [ Parse email content ](#tab-panel-5915)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Access email metadata

    console.log(`From: ${message.from}`);

    console.log(`To: ${message.to}`);

    console.log(`Size: ${message.rawSize} bytes`);


    // Access headers

    const subject = message.headers.get("subject");

    const date = message.headers.get("date");

    const messageId = message.headers.get("message-id");


    console.log(`Subject: ${subject}`);

    console.log(`Date: ${date}`);

    console.log(`Message-ID: ${messageId}`);

  },

};


```

Explain Code

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Read raw email content

    const reader = message.raw.getReader();

    const chunks = [];


    try {

      while (true) {

        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);

      }


      // Convert to string

      const decoder = new TextDecoder();

      const rawContent = decoder.decode(

        new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], [])),

      );


      console.log("Raw email content:", rawContent);

    } finally {

      reader.releaseLock();

    }

  },

};


```

Explain Code

TypeScript

```

// Helper function to parse email content

async function parseEmailContent(

  message,

): Promise<{ subject: string; textBody: string; htmlBody: string }> {

  const reader = message.raw.getReader();

  const chunks = [];


  try {

    while (true) {

      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);

    }


    const decoder = new TextDecoder();

    const rawContent = decoder.decode(

      new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], [])),

    );


    // Parse MIME content (simplified)

    const subject = message.headers.get("subject") || "";

    const textMatch = rawContent.match(

      /Content-Type: text\/plain[\s\S]*?\n\n([\s\S]*?)(?=\n--|\nContent-Type|\n$)/,

    );

    const htmlMatch = rawContent.match(

      /Content-Type: text\/html[\s\S]*?\n\n([\s\S]*?)(?=\n--|\nContent-Type|\n$)/,

    );


    return {

      subject,

      textBody: textMatch ? textMatch[1].trim() : "",

      htmlBody: htmlMatch ? htmlMatch[1].trim() : "",

    };

  } finally {

    reader.releaseLock();

  }

}


export default {

  async email(message, env, ctx): Promise<void> {

    const { subject, textBody, htmlBody } = await parseEmailContent(message);


    console.log(`Subject: ${subject}`);

    console.log(`Text: ${textBody}`);

    console.log(`HTML: ${htmlBody}`);

  },

};


```

Explain Code

## Email actions

### Forward emails

Forward incoming emails to verified destination addresses:

* [ Simple forwarding ](#tab-panel-5916)
* [ Conditional forwarding ](#tab-panel-5917)
* [ Multiple forwarding ](#tab-panel-5918)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Forward to a single address

    await message.forward("team@company.com");

  },

};


```

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const recipient = message.to;

    const subject = message.headers.get("subject") || "";


    // Route based on recipient

    if (recipient.includes("support@")) {

      await message.forward("support-team@company.com");

    } else if (recipient.includes("sales@")) {

      await message.forward("sales-team@company.com");

    } else if (subject.toLowerCase().includes("urgent")) {

      await message.forward("urgent@company.com");

    } else {

      // Default routing

      await message.forward("general@company.com");

    }

  },

};


```

Explain Code

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const subject = message.headers.get("subject") || "";


    if (subject.toLowerCase().includes("security")) {

      // Forward to multiple addresses for security issues

      await Promise.all([

        message.forward("security@company.com"),

        message.forward("admin@company.com"),

        message.forward("ciso@company.com"),

      ]);

    } else {

      await message.forward("general@company.com");

    }

  },

};


```

Explain Code

### Forward with custom headers

Add custom headers when forwarding:

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Create custom headers

    const customHeaders = new Headers();

    customHeaders.set("X-Processed-By", "Email-Worker");

    customHeaders.set("X-Processing-Time", new Date().toISOString());

    customHeaders.set("X-Original-Recipient", message.to);

    customHeaders.set("X-Spam-Score", "0.1"); // Example spam score


    // Forward with custom headers

    await message.forward("processed@company.com", customHeaders);

  },

};


```

Explain Code

### Reply to emails

Send automatic replies using the Email Service binding:

* [ Simple auto-reply ](#tab-panel-5919)
* [ Smart auto-reply ](#tab-panel-5920)

TypeScript

```

interface Env {

  EMAIL: SendEmail;

}


export default {

  async email(message, env, ctx): Promise<void> {

    const subject = message.headers.get("subject") || "";


    // Send auto-reply

    await env.EMAIL.send({

      to: message.from,

      from: message.to, // Reply from the original recipient address

      subject: `Re: ${subject}`,

      html: `

                <h1>Thank you for your message</h1>

                <p>We have received your email and will respond shortly.</p>

                <p>Original message received at: ${new Date().toISOString()}</p>

            `,

      text: "Thank you for your message. We have received your email and will respond shortly.",

    });


    // Also forward to human team

    await message.forward("team@company.com");

  },

};


```

Explain Code

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const sender = message.from;

    const recipient = message.to;

    const subject = message.headers.get("subject") || "";


    // Don't reply to automated emails

    if (

      sender.includes("noreply") ||

      sender.includes("no-reply") ||

      subject.toLowerCase().includes("automated")

    ) {

      await message.forward("team@company.com");

      return;

    }


    // Customized auto-reply based on recipient

    let replyMessage = "";

    let replySubject = `Re: ${subject}`;


    if (recipient.includes("support@")) {

      replyMessage = `

                <h1>Support Request Received</h1>

                <p>Thank you for contacting support. Your request has been assigned ticket #${Date.now()}.</p>

                <p>Expected response time: 2-4 hours during business hours.</p>

            `;

    } else if (recipient.includes("sales@")) {

      replyMessage = `

                <h1>Sales Inquiry Received</h1>

                <p>Thank you for your interest in our products.</p>

                <p>A sales representative will contact you within 24 hours.</p>

            `;

    } else {

      replyMessage = `

                <h1>Message Received</h1>

                <p>Thank you for your message. We will respond within 2 business days.</p>

            `;

    }


    await env.EMAIL.send({

      to: sender,

      from: recipient,

      subject: replySubject,

      html: replyMessage,

      text: replyMessage.replace(/<[^>]*>/g, ""), // Strip HTML for text version

    });


    // Forward to appropriate team

    await message.forward("team@company.com");

  },

};


```

Explain Code

### Reject emails

Reject emails with a permanent SMTP error:

* [ Simple rejection ](#tab-panel-5921)
* [ Content-based rejection ](#tab-panel-5922)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const sender = message.from;


    // Block specific senders

    const blockedDomains = ["spam.com", "unwanted.net"];

    const senderDomain = sender.split("@")[1];


    if (blockedDomains.includes(senderDomain)) {

      message.setReject("Sender domain not allowed");

      return;

    }


    // Continue processing

    await message.forward("inbox@company.com");

  },

};


```

Explain Code

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const subject = message.headers.get("subject") || "";


    // Reject based on subject content

    const spamKeywords = ["buy now", "limited time", "act fast", "urgent"];

    const containsSpam = spamKeywords.some((keyword) =>

      subject.toLowerCase().includes(keyword),

    );


    if (containsSpam) {

      message.setReject("Message appears to be spam");

      return;

    }


    // Check message size

    if (message.rawSize > 25 * 1024 * 1024) {

      // 25MB limit

      message.setReject("Message too large");

      return;

    }


    // Continue processing

    await message.forward("inbox@company.com");

  },

};


```

Explain Code

## Error handling

Handle errors gracefully in email processing:

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    try {

      // Main email processing logic

      await processEmail(message, env);

    } catch (error) {

      console.error("Email processing failed:", error);


      // Log error for monitoring

      if (env.ERROR_LOGS) {

        await env.ERROR_LOGS.put(

          `error-${Date.now()}`,

          JSON.stringify({

            error: error.message,

            stack: error.stack,

            from: message.from,

            to: message.to,

            timestamp: new Date().toISOString(),

          }),

        );

      }


      // Fallback: forward to admin

      try {

        await message.forward("admin@company.com");

      } catch (fallbackError) {

        console.error("Fallback forwarding failed:", fallbackError);

        // Last resort: reject the email

        message.setReject("Internal processing error");

      }

    }

  },

};


async function processEmail(message, env) {

  // Your main email processing logic here

  const recipient = message.to;


  if (recipient.includes("support@")) {

    await message.forward("support@company.com");

  } else if (recipient.includes("sales@")) {

    await message.forward("sales@company.com");

  } else {

    await message.forward("general@company.com");

  }

}


```

Explain Code

---

**Next steps:**

* Test locally: [Email routing development](https://developers.cloudflare.com/email-service/local-development/routing/)
* Set up [email routing configuration](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)
* See [email routing examples](https://developers.cloudflare.com/email-service/examples/email-routing/) for advanced email processing
* Learn about [spam filtering](https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/) with Workers

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/api/route-emails/","name":"Route emails"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/api/route-emails/email-handler/","name":"Workers API"}}]}
```
