---
title: Send emails
description: Send your first email using the Cloudflare Email Service REST API or Workers binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/get-started/send-emails.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Send emails

Send your first email using the REST API or Workers binding.

Send emails from your applications using Cloudflare Email Service. You can use the **REST API** from any platform or the **Workers binding** for applications built on Cloudflare Workers.

Note

You must be using Cloudflare DNS to use Email Service.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## Set up your domain

Before using Email Sending, you need to configure your domain.

1. In the Cloudflare dashboard, go to **Email Sending**.  
[ Go to **Email Sending** ](https://dash.cloudflare.com/?to=/:account/email-service/sending)
2. Select **Onboard Domain**.
3. Choose a domain from your Cloudflare account.
4. Select **Continue** to proceed with DNS configuration.
5. Select **Add records and onboard**. This will add the following DNS records on the `cf-bounce` subdomain of your domain:  
   * MX records for bounce handling.  
   * TXT record for SPF to authorize sending emails.  
   * TXT record for DKIM to provide authentication for emails sent from your domain.  
   * TXT record for DMARC on `_dmarc.yourdomain.com`.

DNS Propagation

DNS changes can take up to 24 hours to propagate globally, but usually complete within 5-15 minutes for domains using Cloudflare DNS.

Once your domain is onboarded, you can start sending emails.

## Send your first email with the REST API

Send an email with a single `curl` command. Replace `<ACCOUNT_ID>` with your [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and `<API_TOKEN>` with an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/email/sending/send" \

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

A successful response includes the delivery status for each recipient:

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

For more details, see the [REST API reference](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/).

## Send your first email with Workers

If you are building on Cloudflare Workers, you can use the Workers binding for native email sending. Start by creating a new Worker project.

1. Create a new Worker project:  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- email-service-tutorial  
```  
```  
yarn create cloudflare email-service-tutorial  
```  
```  
pnpm create cloudflare@latest email-service-tutorial  
```  
When prompted, select **"Hello World" Worker** as the template.
2. Add the email binding to your Wrangler configuration file:  
   * [  wrangler.jsonc ](#tab-panel-6881)  
   * [  wrangler.toml ](#tab-panel-6882)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "send_email": [  
    {  
      "name": "EMAIL",  
      "remote": true  
    }  
  ]  
}  
```  
TOML  
```  
[[send_email]]  
name = "EMAIL"  
remote = true  
```
3. Create your Worker code in `src/index.ts`:  
TypeScript  
```  
// Configuration - Update these values  
const YOUR_DOMAIN = "yourdomain.com"; // Replace with your verified domain  
const RECIPIENT_EMAIL = "recipient@example.com"; // Replace with your email to receive test emails  
export default {  
  async fetch(request: Request, env: Env): Promise<Response> {  
    // Send a welcome email  
    const response = await env.EMAIL.send({  
      to: RECIPIENT_EMAIL,  
      from: `welcome@${YOUR_DOMAIN}`,  
      subject: "Welcome to our service!",  
      html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",  
      text: "Welcome! Thanks for signing up.",  
    });  
    return new Response(`Email sent: ${response.messageId}`);  
  },  
} satisfies ExportedHandler<Env>;  
```  
Explain Code
4. You can use `npx wrangler dev` to develop your Worker project and send emails. This runs your code locally while connecting to Cloudflare Email Service (using [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings)).  
Terminal window  
```  
npx wrangler dev  
# ⎔ Starting remote preview...  
# Total Upload: 24.96 KiB / gzip: 6.17 KiB  
# [wrangler:info] Ready on http://localhost:8787  
```
5. Deploy your Worker:  
Terminal window  
```  
npm run deploy  
```

## Test your email Worker

After deploying, test that your Worker can send emails:

1. Visit your Worker URL in a browser (shown in the deploy output, for example: `https://email-service-tutorial.<your-subdomain>.workers.dev`).
2. You should see a response like `Email sent: <message-id>`.
3. Check the inbox for the email address you specified in `RECIPIENT_EMAIL`. If you do not see the email, check your spam folder.

## Next steps

Now that you can send emails, explore advanced features:

* **[Route incoming emails](https://developers.cloudflare.com/email-service/get-started/route-emails/)** \- Process emails sent to your domain
* **[API reference](https://developers.cloudflare.com/email-service/api/send-emails/)** \- Complete API documentation
* **[Examples](https://developers.cloudflare.com/email-service/examples/)** \- Real-world implementation patterns

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/get-started/send-emails/","name":"Send emails"}}]}
```
