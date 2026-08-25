---
description: Passwordless login system using magic links sent via email with JWT tokens and session management.
title: Magic link authentication
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Magic link authentication

Implement passwordless authentication by sending secure, time-limited login links via email.

Last updated Jun 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example demonstrates how to send a magic link email for passwordless authentication using Cloudflare Email Service.

Configure the email binding in your Wrangler configuration file:

```jsonc
{
	"send_email": [{ "name": "EMAIL" }],
	"vars": {
		"DOMAIN": "yourdomain.com",
	},
}
```

```toml
[[send_email]]
name = "EMAIL"

[vars]
DOMAIN = "yourdomain.com"
```

The Worker exposes a `POST /send-magic-link` route that validates the submitted email address, generates a single-use token, and emails the recipient a time-limited login link. The following code implements that handler.

```typescript
interface Env {
	EMAIL: SendEmail;
	DOMAIN: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/send-magic-link" && request.method === "POST") {
			return handleSendMagicLink(request, env);
		}

		return new Response("Not Found", { status: 404 });
	},
};

async function handleSendMagicLink(
	request: Request,
	env: Env,
): Promise<Response> {
	const { email } = await request.json();

	if (!email || !isValidEmail(email)) {
		return new Response(JSON.stringify({ error: "Invalid email" }), {
			status: 400,
		});
	}

	// Generate a simple secure token (you would implement proper JWT/token handling)
	const token = crypto.randomUUID();
	const magicUrl = `https://${env.DOMAIN}/login?token=${token}`;

	// Send magic link email
	await env.EMAIL.send({
		to: email,
		from: `noreply@${env.DOMAIN}`,
		subject: "Your login link",
		html: `
			<h1>Login to your account</h1>
			<p>Click the link below to log in:</p>
			<p><a href="https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/$%7B%3C/span%3E%3Cspan%20class="nb-shiki-140thh">magicUrl}">Login Now</a></p>
			<p>This link expires in 15 minutes.</p>
		`,
		text: `
			Login to your account

			Click this link to log in: ${magicUrl}

			This link expires in 15 minutes.
		`,
	});

	return new Response(
		JSON.stringify({
			success: true,
			message: "Magic link sent to your email",
		}),
	);
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

## Next steps

* [User signup flow](https://developers.cloudflare.com/email-service/examples/email-sending/signup-flow/) — combine magic links with account verification.
* [Send method](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) — full reference for the `send()` method.
* [Email headers](https://developers.cloudflare.com/email-service/reference/headers/) — add tracking or list-management headers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/#page","headline":"Magic link authentication · Cloudflare Email Service docs","description":"Passwordless login system using magic links sent via email with JWT tokens and session management.","url":"https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
