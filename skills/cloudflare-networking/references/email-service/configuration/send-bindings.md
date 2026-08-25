---
description: Restrict which senders and recipients a Workers send_email binding can use with Email Service.
title: Configure send bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure send bindings

Last updated Jun 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/email-service/configuration/send-bindings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you add a `send_email` binding to a Worker, you can restrict which addresses it may send from and to. Configure these restrictions in your Wrangler configuration file. For the binding API itself, refer to the [Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

## Binding types

Each entry in `send_email` can be configured to restrict what the binding can do. The sender address must always belong to a domain you have onboarded to Email Service.

* **No restriction attribute**: The binding can send to any verified destination address in your account.
* **`destination_address`**: The binding can only send to the single destination address configured here. If you call `send()` with `to` set to `null` or `undefined`, the configured address is used.
* **`allowed_destination_addresses`**: The binding can only send to addresses listed in this allowlist.
* **`allowed_sender_addresses`**: The binding can only send from the addresses listed in this allowlist.

```jsonc
{
	"send_email": [
		// Send to any verified destination
		{ "name": "EMAIL" },
		// Send only to a single fixed destination
		{
			"name": "NOTIFY_OPS",
			"destination_address": "ops@yourdomain.com",
		},
		// Send only to addresses on an allowlist
		{
			"name": "EMAIL_TEAM",
			"allowed_destination_addresses": [
				"alice@yourdomain.com",
				"bob@yourdomain.com",
			],
		},
		// Send only from addresses on an allowlist
		{
			"name": "RESTRICTED_EMAIL",
			"allowed_sender_addresses": [
				"noreply@yourdomain.com",
				"support@yourdomain.com",
			],
		},
	],
}
```

```toml
[[send_email]]
name = "EMAIL"

[[send_email]]
name = "NOTIFY_OPS"
destination_address = "ops@yourdomain.com"

[[send_email]]
name = "EMAIL_TEAM"
allowed_destination_addresses = [ "alice@yourdomain.com", "bob@yourdomain.com" ]

[[send_email]]
name = "RESTRICTED_EMAIL"
allowed_sender_addresses = [ "noreply@yourdomain.com", "support@yourdomain.com" ]
```

## Next steps

* [Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) — send emails from a Worker using the binding.
* [Domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/) — onboard the domains you send from.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/configuration/send-bindings/#page","headline":"Configure send bindings · Cloudflare Email Service docs","description":"Restrict which senders and recipients a Workers send\\_email binding can use with Email Service.","url":"https://developers.cloudflare.com/email-service/configuration/send-bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
