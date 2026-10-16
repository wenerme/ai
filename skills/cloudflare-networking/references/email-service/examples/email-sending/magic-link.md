---
description: Generate and email a login link from a Worker.
title: Email a login link
image: https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/og.png?v=a014a614113a81d9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Email a login link

Generate and email a login link from a Worker.

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This example generates a login link and emails it with Cloudflare Email Service.

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

The Worker exposes a `POST /send-magic-link` route. It checks the email address, generates a random token, and emails a login link.

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

	// Generate a random token for the login link
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
			<p><a href="${magicUrl}">Login Now</a></p>
		`,
		text: `
			Login to your account

			Click this link to log in: ${magicUrl}

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

- [User signup flow](https://developers.cloudflare.com/email-service/examples/email-sending/signup-flow/) — combine magic links with account verification.
- [Send method](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) — full reference for the `send()` method.
- [Email headers](https://developers.cloudflare.com/email-service/reference/headers/) — add tracking or list-management headers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/#page","headline":"Email a login link","description":"Generate and email a login link from a Worker.","url":"https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/og.png?v=a014a614113a81d9","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
