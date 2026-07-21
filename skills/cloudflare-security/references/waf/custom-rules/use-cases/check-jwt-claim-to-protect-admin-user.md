---
description: Use JWT claims and attack scores to protect admin users.
title: Issue challenge for admin user in JWT claim based on attack score
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

#  Issue challenge for admin user in JWT claim based on attack score

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Note

To use claims inside a JSON Web Token (JWT), you must first set up a [token validation configuration](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/) in API Shield.

This example configures additional protection for requests with a JSON Web Token (JWT) with a user claim of `admin`, based on the request's [attack score](https://developers.cloudflare.com/waf/detections/attack-score/).

[Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) that issues a Managed Challenge if the user claim in a JWT is `admin` and the attack score is below 40.

* **When incoming requests match**
Use the expression editor:
`(lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "user") eq "admin" and cf.waf.score < 40)`
* **Then take action**: _Managed Challenge_

In this example, `<TOKEN_CONFIGURATION_ID>` is your [token configuration ID](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/) found in JWT Validation and `user` is the JWT claim.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/#page","headline":"Issue challenge for admin user in JWT claim based on attack score · Cloudflare Web Application Firewall (WAF) docs","description":"Use JWT claims and attack scores to protect admin users.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)"]}
```
