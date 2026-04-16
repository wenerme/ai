---
title: Route emails
description: Route incoming emails sent to your domain to existing mailboxes, Workers for processing, or other destinations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/get-started/route-emails.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Route emails

Set up email routing to forward incoming emails to existing mailboxes or process them with Workers.

Route incoming emails sent to your domain to existing mailboxes, Workers for processing, or other destinations.

Note

You must be using Cloudflare DNS to use Email Service.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## Set up your domain

Before using Email Routing, you need to configure your domain.

1. In the Cloudflare dashboard, go to **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
2. Select **Onboard Domain**.
3. Choose a domain from your Cloudflare account.
4. Select **Continue** to proceed with DNS configuration.
5. Select **Add records and onboard**. This will add the following DNS records to your root domain:  
   * MX records to route incoming emails to Cloudflare.  
   * TXT record for SPF to authorize email routing.  
   * TXT record for DKIM to provide authentication for routed emails.

DNS Propagation

DNS changes can take up to 24 hours to propagate globally, but usually complete within 5-15 minutes for domains using Cloudflare DNS.

Once your domain is onboarded, you can start routing emails.

## Route your first email

You can route your first email by setting up forwarding rules in the dashboard, or by processing emails with Workers.

* [ Route to email ](#tab-panel-6730)
* [ Route to Workers ](#tab-panel-6731)

The simplest way to route emails is forwarding them to existing email addresses.

### Create a forwarding rule

1. In the Cloudflare dashboard, go to **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
2. Select the domain you want to create an email address for.
3. Select the **Routing Rules** tab.
4. Select **Create Address**.
5. Configure your first rule (for instance, forwarding emails to `support@yourdomain.com` to your personal email address):  
   * **Custom address**: Enter the local part of the email (for example, `support` for `support@yourdomain.com`)  
   * **Action**: Send to an email  
   * **Destination**: Your personal email address (for example, `your-email@gmail.com`)
6. Select **Save**.

### Test your forwarding rule

Verify that your routing rule is working:

1. Send an email from another email account to your newly created address (for example, `support@yourdomain.com`).
2. Check the destination inbox for the forwarded email.
3. If you do not see the email right away, check your spam folder.

Use Workers to process emails with custom logic before forwarding or responding.

### Create an email processing Worker

1. Create a new Worker project:  
Terminal window  
```  
npm create cloudflare@latest email-processor  
```  
When prompted, select **"Hello World" Worker** as the template. Then navigate to the project directory:  
Terminal window  
```  
cd email-processor  
```
2. Install the required package for creating email replies:  
Terminal window  
```  
npm install mimetext  
```
3. Add the `nodejs_compat` compatibility flag to your Wrangler configuration file. This is required for the `mimetext` package:  
   * [  wrangler.jsonc ](#tab-panel-6728)  
   * [  wrangler.toml ](#tab-panel-6729)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "compatibility_flags": [  
    "nodejs_compat"  
  ]  
}  
```  
TOML  
```  
compatibility_flags = ["nodejs_compat"]  
```
4. Create your email handler in `src/index.ts`:  
TypeScript  
```  
import { EmailMessage } from "cloudflare:email";  
import { createMimeMessage } from "mimetext";  
// ============================================  
// Configuration - Update these values  
// ============================================  
const YOUR_DOMAIN = "yourdomain.com"; // Replace with your verified domain  
const FORWARD_TO_EMAIL = "your-team@company.com"; // Replace with where you want emails forwarded  
export default {  
  async email(message, env, ctx): Promise<void> {  
    const sender = message.from;  
    const recipient = message.to;  
    const subject = message.headers.get("subject") || "";  
    console.log(  
      `Processing email from ${sender} to ${recipient} with subject ${subject}`,  
    );  
    // Route based on recipient  
    if (recipient.includes("support@")) {  
      // Send auto-reply  
      const msg = createMimeMessage();  
      const messageId = message.headers.get("Message-ID");  
      if (messageId) {  
        msg.setHeader("In-Reply-To", messageId);  
      }  
      msg.setSender({  
        name: "Support Team",  
        addr: `support@${YOUR_DOMAIN}`,  
      });  
      msg.setRecipient(message.from);  
      msg.setSubject("We received your message");  
      // Add plain text version  
      msg.addMessage({  
        contentType: "text/plain",  
        data: "Thank you for contacting support. Your ticket number is 123.\n\nA member of our support team will get back to you shortly.",  
      });  
      // Add HTML version  
      msg.addMessage({  
        contentType: "text/html",  
        data: "<p>Thank you for contacting support. Your ticket number is <strong>123</strong>.</p><p>A member of our support team will get back to you shortly.</p>",  
      });  
      const replyMessage = new EmailMessage(  
        `support@${YOUR_DOMAIN}`,  
        message.from,  
        msg.asRaw(),  
      );  
      await message.reply(replyMessage);  
      // Forward to support team  
      await message.forward(FORWARD_TO_EMAIL);  
    } else {  
      // Default: forward to admin  
      await message.forward(FORWARD_TO_EMAIL);  
    }  
  },  
} satisfies ExportedHandler<Env>;  
```  
Explain Code  
Update configuration  
Before deploying, update the constants at the top of the file:  
   * `YOUR_DOMAIN`: Your verified domain from the Cloudflare dashboard  
   * `FORWARD_TO_EMAIL`: The email address where you want to receive forwarded emails
5. Deploy your Worker:  
Terminal window  
```  
npm run deploy  
```

### Configure routing to Worker

1. In the Cloudflare dashboard, go to **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
2. Select the domain you want to configure routing for.
3. Select the **Routing Rules** tab.
4. Select **Create Address**.
5. Configure Worker routing:  
   * **Custom address**: Enter the local part of the email (for example, `support` for `support@yourdomain.com`)  
   * **Action**: Send to a Worker  
   * **Worker**: Select your `email-processor` Worker
6. Select **Save**.

### Test your email routing

After configuring the routing rule, test that it works:

1. Send an email from your personal email account to the address you configured (for example, `support@yourdomain.com`).
2. Check your `FORWARD_TO_EMAIL` inbox for the forwarded email.
3. If the recipient email was `support@`, you should also receive an auto-reply at your personal email address.

## Next steps

Now that you can route emails, explore advanced features:

* **[Send outbound emails](https://developers.cloudflare.com/email-service/get-started/send-emails/)** \- Send emails from your applications
* **[API reference](https://developers.cloudflare.com/email-service/api/route-emails/)** \- Complete routing API documentation
* **[Examples](https://developers.cloudflare.com/email-service/examples/)** \- Real-world routing patterns

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/get-started/route-emails/","name":"Route emails"}}]}
```
