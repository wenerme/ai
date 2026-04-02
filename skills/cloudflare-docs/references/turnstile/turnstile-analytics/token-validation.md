---
title: Token validation
description: After a visitor successfully completes a Turnstile challenge, a token is generated and validated via the Siteverify API. Token validation data shows how many tokens your server validated successfully versus how many failed. A high rate of invalid tokens may indicate bot activity, expired tokens, or implementation issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/turnstile/turnstile-analytics/token-validation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Token validation

After a visitor successfully completes a Turnstile challenge, a token is generated and validated via the Siteverify API. Token validation data shows how many tokens your server validated successfully versus how many failed. A high rate of invalid tokens may indicate bot activity, expired tokens, or implementation issues.

For example, the token validation values in your analytics may look like this:

![Token validation example values](https://developers.cloudflare.com/_astro/token-validation.DRmcNOiF_Z16p8LF.webp "Token validation example")

Token validation example

## Metrics

* **Siteverify requests**: The total number of requests made to the Siteverify API in the given timeframe.
* **Valid tokens**: The number of Siteverify requests with `success:true` responses.
* **Invalid tokens**: The number of Siteverify requests with `success:false` responses.

### Call Siteverify

It is important to [call the Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). Without calling Siteverify API to validate the tokens, your website or application is not protected. Skipping token validation means you cannot confirm the visitor's legitimacy.

* Tokens can only be redeemed once. Even valid tokens will return `success:false` if they are reused, preventing token theft and replay attacks.
* Tokens expire after five minutes. Validation must occur within this window to be effective.
* Tokens can be invalid. Bots might complete challenges, but Cloudflare can detect bot-like signals and mark the token as invalid.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/turnstile-analytics/","name":"Turnstile Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/turnstile-analytics/token-validation/","name":"Token validation"}}]}
```
