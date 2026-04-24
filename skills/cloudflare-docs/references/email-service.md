---
title: Cloudflare Email Service
description: Send transactional emails and route incoming emails to Workers or email addresses with Cloudflare Email Service.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cloudflare Email Service

Send transactional emails and route incoming emails to Workers or email addresses

 Available on Workers Paid plan 

Note

Cloudflare Email Service is currently in beta. Features and APIs may change before general availability.

Cloudflare Email Service provides powerful email capabilities:

* **Email Sending** for outbound transactional emails
* **Email Routing** for handling incoming emails with Workers or routing to email addresses

Together, these two features make it possible for you to send and receive emails from your applications. For example, you can use Email Service for:

* Transactional emails (welcome messages, password resets, order confirmations)
* Authentication flows (magic links, email verification, two-factor authentication)
* Notifications and alerts
* Custom email addresses (support@, contact@, orders@)
* Emails as a mode of interaction for agents, such as send an email to create an issue in ticket tracking

Access Email Service using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) from any platform, or directly from Cloudflare Workers using [bindings](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/):

* [ REST API (curl) ](#tab-panel-7014)
* [ index.ts (Workers) ](#tab-panel-7015)
* [ wrangler.jsonc ](#tab-panel-7016)

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \

  --header "Authorization: Bearer <API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "to": "user@example.com",

    "from": "welcome@yourdomain.com",

    "subject": "Welcome to our service!",

    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>",

    "text": "Welcome! Thanks for signing up."

  }'


```

Explain Code

TypeScript

```

export default {

  // Handle HTTP requests (Email Sending)

  async fetch(request, env, ctx): Promise<Response> {

    // Send a welcome email

    await env.EMAIL.send({

      to: "user@example.com",

      from: "welcome@yourdomain.com",

      subject: "Welcome to our service!",

      html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",

      text: "Welcome! Thanks for signing up."

    });


      return new Response("Email sent successfully");

    },


    // Handle incoming emails (Email Routing)

    async email(message, env, ctx): Promise<void> {

      // Forward to support team

      if (message.to.includes("support@yourdomain.com")) {

        await message.forward("team@yourdomain.com");

      }


      // Send auto-reply

      await env.EMAIL.send({

        to: message.from,

        from: "noreply@yourdomain.com",

        subject: "We received your message",

        html: "<h1>Thank you!</h1><p>We'll get back to you soon.</p>"

      });

    }


} satisfies ExportedHandler<{ EMAIL: SendEmail }>;


```

Explain Code

JSONC

```

{

  "$schema": "node_modules/wrangler/config-schema.json",

  "name": "<ENTER_WORKER_NAME>",

  "main": "src/index.ts",

  "compatibility_date": "2024-01-01",


  // Email sending

  "send_email": [

    {

      "name": "EMAIL"

    }

  ],


  // Email routing

  "email": [

    {

      "name": "EMAIL_HANDLER"

    }

  ]

}


```

Explain Code

See the full [API reference](https://developers.cloudflare.com/email-service/api/send-emails/) for the REST API and Workers binding.

[ Get started ](https://developers.cloudflare.com/email-service/get-started/) 

---

## Features

###  Email Sending 

Send transactional emails with high deliverability and global performance.

[ Use Email Sending ](https://developers.cloudflare.com/email-service/get-started/send-emails/) 

###  Email Routing 

Route incoming emails to custom addresses, Workers, or external destinations.

[ Use Email Routing ](https://developers.cloudflare.com/email-service/get-started/route-emails/) 

###  Deliverability 

Automatic IP reputation management and deliverability optimization.

[ Use Deliverability ](https://developers.cloudflare.com/email-service/concepts/deliverability/) 

###  Analytics & Observability 

Monitor email performance with comprehensive metrics and alerting.

[ Use Analytics & Observability ](https://developers.cloudflare.com/email-service/observability/) 

###  API 

Send and route emails using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) or [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

[ Use API ](https://developers.cloudflare.com/email-service/api/) 

---

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications that can send emails directly from the edge.

**[Queues](https://developers.cloudflare.com/queues/)** 

Process email events asynchronously with Workers Queues integration.

**[Analytics Engine](https://developers.cloudflare.com/analytics/)** 

Store and analyze custom email metrics with Workers Analytics Engine.

---

### More resources

[Platform limits](https://developers.cloudflare.com/email-service/platform/limits/) 

Learn about Email Service limits and quotas.

[Pricing](https://developers.cloudflare.com/email-service/platform/pricing/) 

Understand Email Service pricing and plans.

[Examples](https://developers.cloudflare.com/email-service/examples/) 

Explore practical examples and implementation patterns.

[Discord](https://discord.com/channels/595317990191398933/893253103695065128) 

Ask questions and discuss Email Service with other developers.

[Twitter](https://x.com/cloudflaredev) 

Follow product announcements and developer updates.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}}]}
```
