---
title: Email routing
description: Test Email Service routing Workers locally using wrangler dev with simulated incoming emails.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email routing

Test email routing Workers locally using wrangler dev with simulated incoming emails

Test email routing behavior locally using `wrangler dev` to simulate incoming emails and verify your routing logic before deploying.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## Configuration

Configure your Wrangler file with the email binding:

* [  wrangler.jsonc ](#tab-panel-5951)
* [  wrangler.toml ](#tab-panel-5952)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "email-routing-worker",

  // Set this to today's date

  "compatibility_date": "2026-04-29",

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

name = "email-routing-worker"

# Set this to today's date

compatibility_date = "2026-04-29"


[[send_email]]

name = "EMAIL"


```

## Basic routing worker

JavaScript

```

import * as PostalMime from 'postal-mime';


export default {

  async email(message, env, ctx) {

    // Parse the raw email message

    const parser = new PostalMime.default();

    const rawEmail = new Response(message.raw);

    const email = await parser.parse(await rawEmail.arrayBuffer());


    console.log('Received email:', {

      from: message.from,

      to: message.to,

      subject: email.subject,

      text: email.text,

      html: email.html

    });


    // Route based on recipient

    if (message.to.includes('support@')) {

      await message.forward('support-team@company.com');

    } else {

      await message.forward('general@company.com');

    }

  },

};


```

Explain Code

## Testing

Start your development server:

Terminal window

```

npx wrangler dev


```

Send a test email using the local endpoint. The request body must be a raw email message in [RFC 5322 ↗](https://datatracker.ietf.org/doc/html/rfc5322) format, and the message must include a `Message-ID` header:

Terminal window

```

curl --request POST 'http://localhost:8787/cdn-cgi/handler/email' \

  --url-query 'from=sender@example.com' \

  --url-query 'to=recipient@example.com' \

  --data-raw 'Received: from smtp.example.com (127.0.0.1)

        by cloudflare-email.com (unknown) id 4fwwffRXOpyR

        for <recipient@example.com>; Tue, 27 Aug 2024 15:50:20 +0000

From: "John" <sender@example.com>

Reply-To: sender@example.com

To: recipient@example.com

Subject: Testing Email Workers Local Dev

Content-Type: text/html; charset="windows-1252"

X-Mailer: Curl

Date: Tue, 27 Aug 2024 08:49:44 -0700

Message-ID: <6114391943504294873000@ZSH-GHOSTTY>


Hi there'


```

Explain Code

This will output the parsed email structure in the console:

```

{

  "headers": [

    {

      "key": "received",

      "value": "from smtp.example.com (127.0.0.1) by cloudflare-email.com (unknown) id 4fwwffRXOpyR for <recipient@example.com>; Tue, 27 Aug 2024 15:50:20 +0000"

    },

    { "key": "from", "value": "\"John\" <sender@example.com>" },

    { "key": "reply-to", "value": "sender@example.com" },

    { "key": "to", "value": "recipient@example.com" },

    { "key": "subject", "value": "Testing Email Workers Local Dev" },

    { "key": "content-type", "value": "text/html; charset=\"windows-1252\"" },

    { "key": "x-mailer", "value": "Curl" },

    { "key": "date", "value": "Tue, 27 Aug 2024 08:49:44 -0700" },

    {

      "key": "message-id",

      "value": "<6114391943504294873000@ZSH-GHOSTTY>"

    }

  ],

  "from": { "address": "sender@example.com", "name": "John" },

  "to": [{ "address": "recipient@example.com", "name": "" }],

  "replyTo": [{ "address": "sender@example.com", "name": "" }],

  "subject": "Testing Email Workers Local Dev",

  "messageId": "<6114391943504294873000@ZSH-GHOSTTY>",

  "date": "2024-08-27T15:49:44.000Z",

  "html": "Hi there\n",

  "attachments": []

}


```

Explain Code

## Next steps

* Deploy your routing worker: [Route emails get started](https://developers.cloudflare.com/email-service/get-started/route-emails/)
* See advanced patterns: [Email routing examples](https://developers.cloudflare.com/email-service/examples/email-routing/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/local-development/","name":"Local development"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/local-development/routing/","name":"Email routing"}}]}
```
