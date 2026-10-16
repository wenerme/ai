---
description: Track Cloudflare Email Service updates, features, and fixes.
title: Changelog
image: https://developers.cloudflare.com/email-service/platform/changelog/og.png?v=bd83792d4994d46d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/platform/changelog/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/email-service.xml)

## 2026-09-25


**Suppress recipients for one sending domain**

[Email Sending suppressions](https://developers.cloudflare.com/email-service/concepts/suppressions/) now have a **scope**:

- **`account`**: The suppression applies to every sending domain and subdomain in your account. This is the default.
- **`sending_domain`**: The suppression applies to one sending domain only. A suppression for `mail.myappexample.com` does not block mail from `myappexample.com`.

Most importantly, Email Sending now automatically creates bounce and complaint suppressions at the sending-domain level. This provides greater granularity by preventing an issue with one sending domain from suppressing the recipient across your entire account.

To add a suppression for one sending domain in the dashboard, go to **Email Sending** > **Suppressions** and select **Sending domain** in **Scope**. Imports can also set a scope for each row or a default scope.

In the API, pass `scope` when you create the suppression:

```bash
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/suppressions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "email": "user@example.net",
    "scope": { "type": "sending_domain", "value": "mail.myappexample.com" }
  }'
```

The [suppressions API](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/) returns `scope` on every suppression. To list the suppressions for one domain, use `scope_type=sending_domain&scope_value=mail.myappexample.com`. If you omit `scope`, the API creates an `account` suppression, so existing integrations continue to work.

Refer to [Suppression lists](https://developers.cloudflare.com/email-service/concepts/suppressions/#suppression-scope) and [Manage suppressions](https://developers.cloudflare.com/email-service/configuration/suppressions/) for details.

## 2026-09-04


**Manage Email Routing rules with Wrangler**

You can now manage Email Routing rules that route emails to Workers from your Wrangler configuration. Add literal addresses or a catch-all address to the top-level `addresses` field:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "invoice-handler",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-10-16",
  "addresses": [
    "invoice@yourdomain.com"
  ]
}
```

```toml
name = "invoice-handler"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-10-16"
addresses = ["invoice@yourdomain.com"]
```

When you run `wrangler deploy`, Wrangler creates rules for new addresses, updates existing rules managed by the Worker, and removes managed rules that are no longer in the configuration. Wrangler shows the planned changes and asks for confirmation before applying potentially destructive changes.

Email Routing rules created by Wrangler also appear in the dashboard but with an icon that identifies them.

![Email Routing rule created by Wrangler in dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2440,height=526,format=webp/_astro/wrangler-email-routing-rules-dash.BZQZlAJI.png)

Refer to [Configure rules with Wrangler](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#configure-rules-with-wrangler) for more information.

## 2026-07-17


**Preview sent emails in the Activity log**

You can now preview the content of sent emails directly from the Email Service Activity log. Expand a sent email and open the new **Preview** section to inspect the message as it was sent, across tabs for the rendered **HTML** body, the **Text** body, the **Headers**, the **Attachments**, and the full **Raw** [RFC 5322 ↗︎](https://datatracker.ietf.org/doc/html/rfc5322) source.

![The rendered HTML preview of a sent email in the Email Service Activity log](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2864,height=1172,format=webp/_astro/email-message-preview.Bj6Lk8Y6.png)

Previously, the Activity log surfaced delivery and authentication metadata but not the message content, making rendering and content issues harder to debug. Message preview closes that gap.

To make messages previewable, turn on **Email preview** in your sending domain's settings. Previews cover messages sent while the setting is turned on and are retained for about seven days. Sending domains onboarded on or after 2026-07-02 have **Email preview** turned on automatically.

![The Email preview setting in a sending domain's settings](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2256,height=264,format=webp/_astro/email-preview-setting.XEd1WIiO.png)

Refer to [Email logs](https://developers.cloudflare.com/email-service/observability/logs/#message-preview) for more information.

## 2026-07-15


**Subscribe to Email Sending events with Queues**

You can now subscribe to **[Email Sending](https://developers.cloudflare.com/email-service/api/send-emails/) events** through [Queues event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) and receive outbound transactional email lifecycle events on a queue. Each subscription is scoped to one sending domain — either the zone apex, such as `example.com`, or a verified sending subdomain, such as `send.example.com`.

Six event types are published: `message.delivered`, `message.deferred`, `message.bounced`, `message.failed`, `message.rejected`, and `message.complained`. Use them to track deliverability, react to bounces and complaints, and drive suppression or retry logic. Email Routing events are not published on this source.

Each event includes the message details, delivery status, and SMTP response:

```json
{
	"type": "cf.email.sending.message.delivered",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "example.com"
	},
	"payload": {
		"messageId": "0101018f7d0c4d9a-msg-deadbeef",
		"recipient": "user@example.net",
		"terminal": true,
		"delivery": {
			"status": "delivered",
			"smtpStatusCode": "250"
		}
	}
}
```

Refer to [Event subscriptions](https://developers.cloudflare.com/email-service/reference/event-subscriptions/) to see all event types and example payloads.

## 2026-06-08


**Authenticated SMTP submission now available in beta**

You can now send emails through **Cloudflare Email Service** using authenticated [SMTP submission](https://developers.cloudflare.com/email-service/api/send-emails/smtp/) on `smtp.mx.cloudflare.net:465`. SMTP joins the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) and the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) as a third way to send transactional email — useful for existing applications that already speak SMTP and language-native SMTP libraries (Nodemailer, `smtplib`, PHPMailer, JavaMail).

| Setting | Value |
| --- | --- |
| Host | `smtp.mx.cloudflare.net` |
| Port | `465` (implicit TLS) |
| AUTH | `PLAIN` or `LOGIN` |
| Username | `api_token` |
| Password | A Cloudflare API token (account-owned or user-owned) with **Email Sending: Edit** |

Submissions enter the same delivery pipeline as the REST API and Workers binding: identical [limits](https://developers.cloudflare.com/email-service/platform/limits/), automatic DKIM and ARC signing, and shared dashboard logs.

Send your first email with a single command:

```sh
curl --ssl-reqd \
  --url "smtps://smtp.mx.cloudflare.net:465" \
  --user "api_token:<API_TOKEN>" \
  --mail-from "welcome@yourdomain.com" \
  --mail-rcpt "user@example.com" \
  --upload-file mail.txt
```

Refer to the [SMTP reference](https://developers.cloudflare.com/email-service/api/send-emails/smtp/) for authentication details, response codes, and language-specific examples.

## 2026-05-28


**Send emails with named recipient addresses**

You can now send emails with display names on recipient addresses in addition to the existing `from` support. Pass an object with `email` and an optional `name` field for `to`, `cc`, `bcc`, `replyTo`, or `from`:

*src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		const response = await env.EMAIL.send({
			from: { email: "support@example.com", name: "Support Team" },
			to: { email: "jane@example.com", name: "Jane Doe" },
			cc: [
				"manager@company.com",
				{ email: "team@company.com", name: "Engineering Team" },
			],
			subject: "Welcome!",
			html: "<h1>Thanks for joining!</h1>",
			text: "Thanks for joining!",
		});

		return Response.json({ messageId: response.messageId });
	},
};
```

*src/index.tsts*

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.EMAIL.send({
			from: { email: "support@example.com", name: "Support Team" },
			to: { email: "jane@example.com", name: "Jane Doe" },
			cc: [
				"manager@company.com",
				{ email: "team@company.com", name: "Engineering Team" },
			],
			subject: "Welcome!",
			html: "<h1>Thanks for joining!</h1>",
			text: "Thanks for joining!",
		});

		return Response.json({ messageId: response.messageId });
	},
} satisfies ExportedHandler<Env>;
```

Plain strings remain fully supported for backward compatibility, and you can mix strings and named objects in the same array.

Refer to the [Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) and [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) documentation for full request examples.

## 2026-04-16


**Email Sending now in public beta**

**[Email Sending](https://developers.cloudflare.com/email-service/api/send-emails/)** is now in public beta. Send transactional emails directly from Workers (`env.EMAIL.send()`) or the REST API, with support for HTML, plain text, attachments, inline images, and custom headers. Email Sending joins [Email Routing ↗︎](https://blog.cloudflare.com/introducing-email-routing/) under the new **Cloudflare Email Service** — a single service for sending and receiving email on the Cloudflare developer platform.

Send an email from a Worker in a few lines of code:

*src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		const response = await env.EMAIL.send({
			from: "notifications@yourdomain.com",
			to: "user@example.com",
			subject: "Order confirmed",
			html: "<h1>Your order has been confirmed</h1>",
			text: "Your order has been confirmed.",
		});

		return Response.json({ messageId: response.messageId });
	},
};
```

*src/index.tsts*

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.EMAIL.send({
			from: "notifications@yourdomain.com",
			to: "user@example.com",
			subject: "Order confirmed",
			html: "<h1>Your order has been confirmed</h1>",
			text: "Your order has been confirmed.",
		});

		return Response.json({ messageId: response.messageId });
	},
} satisfies ExportedHandler<Env>;
```

Email Service also integrates with the [Agents SDK](https://developers.cloudflare.com/agents/), giving your agents a native `onEmail` hook to receive, process, and reply to emails. Combined with the new [Email MCP server ↗︎](https://github.com/cloudflare/mcp-server-cloudflare) and Wrangler CLI email commands, any agent can send email regardless of where it runs.

Start sending and receiving emails from Workers and agents today. Email Sending is available on the Workers paid plan. Refer to the [Email Service documentation](https://developers.cloudflare.com/email-service/) to get started.

## 2025-07-21


**Subaddressing support in Email Routing**

Subaddressing, as defined in [RFC 5233 ↗︎](https://www.rfc-editor.org/rfc/rfc5233), also known as plus addressing, is now supported in Email Routing. This enables using the "+" separator to augment your custom addresses with arbitrary detail information.

Now you can send an email to `user+detail@example.com` and it will be captured by the `user@example.com` custom address. The `+detail` part is ignored by Email Routing, but it can be captured next in the processing chain in the logs, an [Email Worker](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) or an [Agent application ↗︎](https://github.com/cloudflare/agents/tree/main/examples/email-agent).

Customers can use this feature to dynamically add context to their emails, such as tracking the source of an email or categorizing emails without needing to create multiple custom addresses.

![Subaddressing](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1316,height=678,format=webp/_astro/subaddressing.x65bljxx.png)

Check our [Developer Docs](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#subaddressing) to learn how to enable subaddressing in Email Routing.

## 2025-06-30


**Mail authentication requirements for Email Routing**

The Email Routing platform supports [SPF ↗︎](https://datatracker.ietf.org/doc/html/rfc7208) records and [DKIM (DomainKeys Identified Mail) ↗︎](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) signatures and honors these protocols when the sending domain has them configured. However, if the sending domain doesn't implement them, we still forward the emails to upstream mailbox providers.

Starting on July 3, 2025, we will require all emails to be authenticated using at least one of the protocols, SPF or DKIM, to forward them. We also strongly recommend that all senders implement the DMARC protocol.

If you are using a Worker with an Email trigger to receive email messages and forward them upstream, you will need to handle the case where the forward action may fail due to missing authentication on the incoming email.

SPAM has been a long-standing issue with email. By enforcing mail authentication, we will increase the efficiency of identifying abusive senders and blocking bad emails. If you're an email server delivering emails to large mailbox providers, it's likely you already use these protocols; otherwise, please ensure you have them properly configured.

## 2025-04-08


**Local development support for Email Workers**

Email Workers enables developers to programmatically take action on anything that hits their email inbox. If you're building with Email Workers, you can now test the behavior of an Email Worker script, receiving, replying and sending emails in your local environment using `wrangler dev`.

Below is an example that shows you how you can receive messages using the `email()` handler and parse them using [postal-mime ↗︎](https://www.npmjs.com/package/postal-mime):

```ts
import * as PostalMime from "postal-mime";

export default {
	async email(message, env, ctx) {
		const parser = new PostalMime.default();
		const rawEmail = new Response(message.raw);
		const email = await parser.parse(await rawEmail.arrayBuffer());
		console.log(email);
	},
};
```

Now when you run `npx wrangler dev`, wrangler will expose a local `/cdn-cgi/local/email` endpoint that you can `POST` email messages to and trigger your Worker's `email()` handler:

```bash
curl -X POST 'http://localhost:8787/cdn-cgi/local/email' \
  --url-query 'from=sender@example.com' \
  --url-query 'to=recipient@example.com' \
  --header 'Content-Type: application/json' \
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

This is what you get in the console:

```json
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

Local development is part of the development flow. It also works for sending, replying, and forwarding emails. For more information, refer to [local development for email routing](https://developers.cloudflare.com/email-service/observability/local-development/routing/).

## 2025-03-12


**Threaded replies now possible in Email Workers**

We’re removing some of the restrictions in Email Routing so that AI Agents and task automation can better handle email workflows, including how Workers can [reply](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/#reply-to-emails) to incoming emails.

It's now possible to keep a threaded email conversation with an [Email Worker](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) script as long as:

- The incoming email has to have valid [DMARC ↗︎](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/).
- The email can only be replied to once in the same `EmailMessage` event.
- The recipient in the reply must match the incoming sender.
- The outgoing sender domain must match the same domain that received the email.
- Every time an email passes through Email Routing or another MTA, an entry is added to the `References` list. We stop accepting replies to emails with more than 100 `References` entries to prevent abuse or accidental loops.

Here's an example of a Worker responding to Emails using a Workers AI model:

*AI model responding to emailsts*

```ts
import PostalMime from "postal-mime";
import { createMimeMessage } from "mimetext";
import { EmailMessage } from "cloudflare:email";

export default {
	async email(message, env, ctx) {
		const email = await PostalMime.parse(message.raw);
		const res = await env.AI.run("@cf/meta/llama-2-7b-chat-fp16", {
			messages: [
				{
					role: "user",
					content: email.text ?? "",
				},
			],
		});

		// message-id is generated by mimetext
		const response = createMimeMessage();
		response.setHeader("In-Reply-To", message.headers.get("Message-ID")!);
		response.setSender("agent@example.com");
		response.setRecipient(message.from);
		response.setSubject("Llama response");
		response.addMessage({
			contentType: "text/plain",
			data:
				res instanceof ReadableStream
					? await new Response(res).text()
					: res.response!,
		});

		const replyMessage = new EmailMessage(
			"<email>",
			message.from,
			response.asRaw(),
		);
		await message.reply(replyMessage);
	},
} satisfies ExportedHandler<Env>;
```

See [Reply to emails from Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/#reply-to-emails) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/email-service/platform/changelog/#page","headline":"Changelog","description":"Track Cloudflare Email Service updates, features, and fixes.","url":"https://developers.cloudflare.com/email-service/platform/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/platform/changelog/og.png?v=bd83792d4994d46d","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
