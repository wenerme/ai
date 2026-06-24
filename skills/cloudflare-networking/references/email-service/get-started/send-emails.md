---
title: Send emails
description: Send your first email using the Cloudflare Email Service Workers binding, REST API, or SMTP.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Send emails

Send your first email using the Workers binding, the REST API, or SMTP.

Send emails from your applications using Cloudflare Email Service. You can use the **Workers binding** for applications built on Cloudflare Workers, the **REST API** from any platform, or **SMTP** from any SMTP-capable application or mail client.

Note

You must be using Cloudflare DNS to use Email Service.

## Set up your domain

Before using Email Sending, configure your domain.

1. In the Cloudflare dashboard, go to **Compute** \> **Email Service** \> **Email Sending**.
[ Go to **Email Sending** ](https://dash.cloudflare.com/?to=/:account/email-service/sending)
2. Select **Onboard Domain**.
3. Choose a domain from your Cloudflare account. Optionally review the DNS records that Cloudflare will add to the `cf-bounce` subdomain of your domain:

  * MX records to route bounce emails to Cloudflare.
  * TXT record for SPF to authorize sending emails.
  * TXT record for DKIM to provide authentication for emails sent from your domain.
  * TXT record for DMARC on `_dmarc.yourdomain.com`.
4. Select **Done**.

Note

DNS changes can take up to 24 hours to propagate globally, but usually complete within 5-15 minutes for domains using Cloudflare DNS.

Once your domain is onboarded, you can start sending emails.

## Send your first email

You can send your first email using the Workers binding, the REST API, or SMTP.

* [ Workers ](#tab-panel-8598)
* [ API ](#tab-panel-8599)
* [ SMTP ](#tab-panel-8600)

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

  * [  wrangler.jsonc ](#tab-panel-8596)
  * [  wrangler.toml ](#tab-panel-8597)
JSONC
```
{  "send_email": [    {      "name": "EMAIL",      "remote": true,    },  ],}
```
TOML
```
[[send_email]]name = "EMAIL"remote = true
```
3. Create your Worker code in `src/index.ts`:
TypeScript
```
// Configuration - Update these valuesconst YOUR_DOMAIN = "yourdomain.com"; // Replace with your verified domainconst RECIPIENT_EMAIL = "recipient@example.com"; // Replace with your email to receive test emails
export default {  async fetch(request: Request, env: Env): Promise<Response> {    // Send a welcome email    const response = await env.EMAIL.send({      to: RECIPIENT_EMAIL,      from: `welcome@${YOUR_DOMAIN}`,      subject: "Welcome to our service!",      html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",      text: "Welcome! Thanks for signing up.",    });
    return new Response(`Email sent: ${response.messageId}`);  },} satisfies ExportedHandler<Env>;
```
4. Use `npx wrangler dev` to develop your Worker project and send emails. This runs your code locally while connecting to Cloudflare Email Service (using [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings)).
Terminal window
```
npx wrangler dev# ⎔ Starting remote preview...# Total Upload: 24.96 KiB / gzip: 6.17 KiB# [wrangler:info] Ready on http://localhost:8787
```
5. Deploy your Worker:
Terminal window
```
npm run deploy
```

After deploying, test that your Worker can send emails:

1. Visit your Worker URL in a browser (shown in the deploy output, for example: `https://email-service-tutorial.<your-subdomain>.workers.dev`).
2. You should see a response like `Email sent: <message-id>`.
3. Check the inbox for the email address you specified in `RECIPIENT_EMAIL`. If you do not see the email, check your spam folder.

Send an email with a single `curl` command. Replace `{account_id}` with your [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and `<API_TOKEN>` with an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

Terminal window

```
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send" \  --header "Authorization: Bearer <API_TOKEN>" \  --header "Content-Type: application/json" \  --data '{    "to": "recipient@example.com",    "from": "welcome@yourdomain.com",    "subject": "Welcome to our service!",    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>",    "text": "Welcome! Thanks for signing up."  }'
```

A successful response includes the delivery status for each recipient:

```
{  "success": true,  "errors": [],  "messages": [],  "result": {    "delivered": ["recipient@example.com"],    "permanent_bounces": [],    "queued": []  }}
```

For more details, see the [REST API reference](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/).

Send an email with a single `curl` command. Replace `<API_TOKEN>` with a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) that has the **Email Sending: Edit** permission, and replace the `--mail-from` and `--mail-rcpt` addresses with your own.

Terminal window

```
cat > mail.txt <<EOFFrom: welcome@yourdomain.comTo: recipient@example.comSubject: Welcome to our service!
Thanks for signing up.EOF
curl --ssl-reqd \  --url "smtps://smtp.mx.cloudflare.net:465" \  --user "api_token:<API_TOKEN>" \  --mail-from "welcome@yourdomain.com" \  --mail-rcpt "recipient@example.com" \  --upload-file mail.txt
```

The sender domain (`welcome@yourdomain.com`) must be onboarded for [Email Sending](https://developers.cloudflare.com/email-service/configuration/domains/) on the account that owns the API token.

For connection details, authentication, response codes, and language-specific examples, see the [SMTP reference](https://developers.cloudflare.com/email-service/api/send-emails/smtp/).

## Next steps

Now that you can send emails, explore advanced features:

* **[Route incoming emails](https://developers.cloudflare.com/email-service/get-started/route-emails/)** \- Process emails sent to your domain
* **[API reference](https://developers.cloudflare.com/email-service/api/send-emails/)** \- Complete API documentation
* **[Examples](https://developers.cloudflare.com/email-service/examples/)** \- Real-world implementation patterns

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/get-started/send-emails/#page","headline":"Send emails · Cloudflare Email Service docs","description":"Send your first email using the Cloudflare Email Service Workers binding, REST API, or SMTP.","url":"https://developers.cloudflare.com/email-service/get-started/send-emails/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/get-started/send-emails/","name":"Send emails"}}]}
```
