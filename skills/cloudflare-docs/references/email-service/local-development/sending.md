---
title: Email sending
description: Test Email Service sending Workers locally using wrangler dev with simulated email delivery.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email sending

Test email sending Workers locally using wrangler dev with simulated email delivery

Test email sending functionality locally using `wrangler dev` to simulate email delivery and verify your sending logic before deploying.

Note

If you are using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) instead of Workers, you can test by sending requests directly with `curl` or any HTTP client without a local development server. The rest of this page covers the Workers local development flow.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## Configuration

Configure your Wrangler file with the email binding:

* [  wrangler.jsonc ](#tab-panel-5953)
* [  wrangler.toml ](#tab-panel-5954)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "email-sending-worker",

  "compatibility_date": "2024-01-01",

  "send_email": [

    {

      "name": "EMAIL"

    }

  ]

}


```

Explain Code

TOML

```

name = "email-sending-worker"

compatibility_date = "2024-01-01"


[[send_email]]

name = "EMAIL"


```

## Remote bindings (recommended)

Using [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) is the recommended way to develop with Email Service locally. By default, `wrangler dev` simulates the email binding locally -- emails are logged to the console but not actually sent. With remote bindings, your Worker runs locally but sends real emails through Email Service.

Set `remote: true` on the email binding in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-5955)
* [  wrangler.toml ](#tab-panel-5956)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "email-sending-worker",

  // Set this to today's date

  "compatibility_date": "2026-04-29",

  "send_email": [

    {

      "name": "EMAIL",

      "remote": true

    }

  ]

}


```

Explain Code

TOML

```

name = "email-sending-worker"

# Set this to today's date

compatibility_date = "2026-04-29"


[[send_email]]

name = "EMAIL"

remote = true


```

Then run `wrangler dev` as usual. Calls to `env.EMAIL.send()` will send actual emails through Email Service while your Worker code runs locally.

Warning

Remote bindings send real emails to real recipients. Use test email addresses to avoid sending unintended emails during development.

## Local simulation

When running `wrangler dev` without remote bindings, the email binding is simulated locally. Emails are not sent -- instead, the email content is logged to the console and saved to local files for inspection.

## Basic sending worker

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method !== "POST") {

      return new Response("Method not allowed", { status: 405 });

    }


    try {

      const emailData = await request.json();


      console.log("📤 Sending email:", {

        to: emailData.to,

        from: emailData.from,

        subject: emailData.subject,

      });


      const response = await env.EMAIL.send(emailData);


      return new Response(

        JSON.stringify({

          success: true,

          id: response.messageId,

        }),

        {

          headers: { "Content-Type": "application/json" },

        },

      );

    } catch (error) {

      return new Response(

        JSON.stringify({

          success: false,

          error: error.message,

        }),

        {

          status: 500,

          headers: { "Content-Type": "application/json" },

        },

      );

    }

  },

};


```

Explain Code

## Testing locally

Start your development server:

Terminal window

```

npx wrangler dev


```

Send a test email:

Terminal window

```

curl -X POST http://localhost:8787/ \

  -H "Content-Type: application/json" \

  -d '{

    "to": "recipient@example.com",

    "from": "sender@yourdomain.com",

    "subject": "Test Email",

    "html": "<h1>Hello from Wrangler!</h1>",

    "text": "Hello from Wrangler!"

  }'


```

Wrangler will show output like:

```

[wrangler:info] send_email binding called with MessageBuilder:

From: sender@yourdomain.com

To: recipient@example.com

Subject: Test Email


Text: /tmp/miniflare-.../files/email-text/<message-id>.txt


```

The email content (text and HTML) is saved to local files that you can inspect to verify your email structure before deploying.

## Known limitations

### Binary attachments

Local development simulates the `send_email` binding locally, but `ArrayBuffer` values in attachment `content` cannot be serialized by the local simulator. If you pass an `ArrayBuffer` (for example, for image or PDF attachments), you will see an error like:

```

Cannot serialize value: [object ArrayBuffer]


```

**Workaround:** Use string content for text-based attachments during local development. To test binary attachments (images, PDFs), deploy your Worker with `npx wrangler deploy` and test against the deployed version.

This limitation only affects local development — `ArrayBuffer` content works correctly on deployed Workers.

## Next steps

* Deploy your sending worker: [Send emails get started](https://developers.cloudflare.com/email-service/get-started/send-emails/)
* See advanced patterns: [Email sending examples](https://developers.cloudflare.com/email-service/examples/email-sending/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/local-development/","name":"Local development"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/local-development/sending/","name":"Email sending"}}]}
```
