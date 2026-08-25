---
description: This tutorial shows how to deploy a serverless, real-time chat application. The chat application uses a Durable Object to control each chat room.
title: Deploy a real-time chat application
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a real-time chat application

Last updated Jan 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/tutorials/deploy-a-realtime-chat-app/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this tutorial, you will deploy a serverless, real-time chat application that runs using [Durable Objects](https://developers.cloudflare.com/durable-objects/).

This chat application uses a Durable Object to control each chat room. Users connect to the Object using WebSockets. Messages from one user are broadcast to all the other users. The chat history is also stored in durable storage. Real-time messages are relayed directly from one user to others without going through the storage layer.

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Clone the chat application repository

Open your terminal and clone the [workers-chat-demo ↗](https://github.com/cloudflare/workers-chat-demo) repository:

```sh
git clone https://github.com/cloudflare/workers-chat-demo.git
```

## Authenticate Wrangler

After you have cloned the repository, authenticate Wrangler by running:

```sh
npx wrangler login
```

## Deploy your project

When you are ready to deploy your application, run:

```sh
npx wrangler deploy
```

Your application will be deployed to your `*.workers.dev` subdomain.

To deploy your application to a custom domain within the Cloudflare dashboard, go to your Worker > **Triggers** \> **Add Custom Domain**.

To deploy your application to a custom domain using Wrangler, open your project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

To configure a route in your Wrangler configuration file, add the following to your environment:

```jsonc
{
	"routes": [
		{
			"pattern": "example.com/about",
			"zone_id": "<YOUR_ZONE_ID>"
		}
	]
}
```

```toml
[[routes]]
pattern = "example.com/about"
zone_id = "<YOUR_ZONE_ID>"
```

If you have specified your zone ID in the environment of your Wrangler configuration file, you will not need to write it again in object form.

To configure a subdomain in your Wrangler configuration file, add the following to your environment:

```jsonc
{
	"routes": [
		{
			"pattern": "subdomain.example.com",
			"custom_domain": true
		}
	]
}
```

```toml
[[routes]]
pattern = "subdomain.example.com"
custom_domain = true
```

To test your live application:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Triggers** \> **Routes** \> Select the `edge-chat-demo.<SUBDOMAIN>.workers.dev` route.
3. Enter a name in the **your name** field.
4. Choose whether to enter a public room or create a private room.
5. Send the link to other participants. You will be able to view room participants on the right side of the screen.

## Uninstall your application

To uninstall your chat application, modify your Wrangler file to remove the `durable_objects` bindings and add a `deleted_classes` migration:

```jsonc
{
	"durable_objects": {
		"bindings": []
	},
	// Indicate that you want the ChatRoom and RateLimiter classes to be callable as Durable Objects.
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"ChatRoom",
				"RateLimiter"
			]
		},
		{
			"tag": "v2", // Should be unique for each entry
			"deleted_classes": [
				"ChatRoom",
				"RateLimiter"
			]
		}
	]
}
```

```toml
[durable_objects]
bindings = [ ]

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "ChatRoom", "RateLimiter" ]

[[migrations]]
tag = "v2"
deleted_classes = [ "ChatRoom", "RateLimiter" ]
```

Then run `npx wrangler deploy`.

To delete your Worker:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Select **Manage Service** \> **Delete**. For complete instructions on set up and deletion, refer to the `README.md` in your cloned repository.

By completing this tutorial, you have deployed a real-time chat application with Durable Objects and Cloudflare Workers.

## Related resources

Continue building with other Cloudflare Workers tutorials below.

* [Build a Slackbot](https://developers.cloudflare.com/workers/tutorials/build-a-slackbot/)
* [Create SMS notifications for your GitHub repository using Twilio](https://developers.cloudflare.com/workers/tutorials/github-sms-notifications-using-twilio/)
* [Build a QR code generator](https://developers.cloudflare.com/workers/tutorials/build-a-qr-code-generator/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/deploy-a-realtime-chat-app/#page","headline":"Deploy a real-time chat application · Cloudflare Workers docs","description":"This tutorial shows how to deploy a serverless, real-time chat application. The chat application uses a Durable Object to control each chat room.","url":"https://developers.cloudflare.com/workers/tutorials/deploy-a-realtime-chat-app/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
```
