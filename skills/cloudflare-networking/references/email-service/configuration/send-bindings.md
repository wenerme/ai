---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Email Service send binding restrictions and Wrangler configuration variants.
title: Send bindings
image: https://developers.cloudflare.com/email-service/configuration/send-bindings/og.png?v=541cb44fc1f33153
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Send bindings

When you add a `send_email` binding to a Worker, you can restrict its sender and recipient addresses. The following Wrangler configuration variants apply these restrictions. For the binding API, refer to the [Email Sending Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

## Binding types

Each `send_email` entry supports a different restriction choice. The sender address must belong to an onboarded Email Service domain.

- **No restriction attribute**: The binding can send to any recipient once you onboard a sending domain. Before that, it can only send to [verified destination addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#destination-addresses) in your account. Refer to [Limits](https://developers.cloudflare.com/email-service/platform/limits/#verified-destination-addresses).
- **`destination_address`**: The binding can only send to the single destination address configured here. If you call `send()` with a raw [`EmailMessage`](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/#legacy-emailmessage-api) whose recipient is empty, the configured address is used. A structured `send()` call must still set `to`, `cc`, or `bcc`.
- **`allowed_destination_addresses`**: The binding can only send to addresses listed in this allowlist.
- **`allowed_sender_addresses`**: The binding can only send from the addresses listed in this allowlist.

A send to a recipient outside `destination_address` or `allowed_destination_addresses` fails with `E_RECIPIENT_NOT_ALLOWED`. A send from an address outside `allowed_sender_addresses` fails with `E_SENDER_NOT_VERIFIED`. Refer to [error codes](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/#error-codes).

```jsonc
{
	"send_email": [
		// Send to any recipient
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

- [Email Sending Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) — send emails from a Worker using the binding.
- [Domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/) — onboard the domains you send from.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/configuration/send-bindings/#page","headline":"Send bindings","description":"Email Service send binding restrictions and Wrangler configuration variants.","url":"https://developers.cloudflare.com/email-service/configuration/send-bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/configuration/send-bindings/og.png?v=541cb44fc1f33153","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
