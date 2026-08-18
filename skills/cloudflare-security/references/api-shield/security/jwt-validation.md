---
description: Verify incoming JWTs to detect token tampering and invalid tokens at the edge.
title: JSON Web Tokens validation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# JSON Web Tokens validation

Last updated Aug 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/jwt-validation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

JSON web tokens (JWT) are often used as part of an authentication component on many web applications. Since JWTs are crucial to identifying users and their access, ensuring the token's integrity is important.

API Shield's JWT validation cryptographically verifies incoming JWTs before they reach your API origin. It detects tokens that are expired, tampered with, or not yet valid. You then create a rule to act on the validation results.

## Process

JWT validation has two parts: a token configuration that tells Cloudflare how to find and verify JWTs, and a rule that acts on the validation results.

After you create a token configuration, Cloudflare checks every request in the zone for a JWT at the configured locations. When Cloudflare finds a JWT, it validates the token and makes the verified claims available in `http.request.jwt.claims` fields. For available fields and standard claims, refer to the [JWT validation fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=JWT+validation) reference. You do not need a rule or an operation in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/) for validation. Rules determine how Cloudflare acts on the results.

### Add a token validation configuration

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. On **Token configurations**, select **Configure tokens**.
4. Add a name for your configuration.
5. Choose where Cloudflare can locate the JWT for this configuration on incoming requests, such as a header or cookie and its name.
6. Copy and paste your JWT issuer's public key(s) (JWKS).

Each JWT issuer typically publishes public keys (JWKS) for verification at a known URL on the Internet. If you do not know where to get them, contact your identity administrator.

To automatically keep your JWKS up to date when your identity provider refreshes them, you can use a Worker. Refer to [Configure Workers to automatically update keys](https://developers.cloudflare.com/api-shield/security/jwt-validation/jwt-worker/) to learn more about setting up the Worker.

### Act on JWT validation results

For new security policies, Cloudflare generally recommends using WAF custom rules.

* **[WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/)** — use these for zone-wide policies based on verified JWT claims. Custom rules can combine claims with other signals, such as [attack score](https://developers.cloudflare.com/waf/detections/attack-score/). Endpoints do not need to be in Endpoint Management.
* **JWT validation rules** — use these when enforcement must apply only to specific operations in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/). These rules support the `is_jwt_valid()` and `is_jwt_present()` functions, which are not available in custom rules.

Cloudflare validates JWTs the same way regardless of which rule type you choose.

For example, to reference a simple string claim in a rule expression, use [lookup\_json\_string()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup%5Fjson%5Fstring) with your token configuration ID and the claim name:

```txt
lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "claim_name")
```

For a complete example, refer to [Issue challenge for admin user in JWT claim based on attack score](https://developers.cloudflare.com/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/). For all available fields, refer to the [JWT validation fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=JWT+validation) reference.

### Add a JWT validation rule

JWT validation rules use operations from Endpoint Management to control where Cloudflare applies their `log` or `block` action.

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. On API JWT validation rules, select **Create rule**.
3. Add a name for your rule.
4. Select a hostname to protect requests with saved endpoints using the rule.
5. Deselect any endpoints that you want to exclude from the JWT validation rule's enforcement.
6. Select the token configuration that corresponds to the incoming requests.
7. Choose whether to strictly enforce token presence on these endpoints.

  * You may not expect 100% of clients to send in JWTs with their requests. If this is the case, choose _Ignore_. JWT validation will still validate JWTs that are present.
  * You may otherwise expect all requests to the selected hostname and endpoints to contain JWTs. If this is the case, choose _Mark as non-compliant_.
8. Choose an action to take for non-compliant requests. For example, JWTs that do not pass validation (expired, tampered with, or bad signature tokens) or requests with missing JWTs when _Mark as non-compliant_ is selected in the previous step.
9. Select **Save**.

Note

JWT validation rules automatically apply to new endpoints added to Endpoint Management if those endpoints also match the rule's selector.

---

## Special cases

### Validate two JWTs with different identity providers on a single request

If you expect that two different JWTs should be present in a request and you want to validate both, you must create two different token configurations. When selecting the two configurations in your validation rule, select _Validate all configurations_ under **Validation behavior for multiple configurations**.

### Support a migration from one identity provider to another

If you expect to migrate between two different identity providers, you must create two different token configurations and two different validation rules, each corresponding to its own configuration. With this setup, you can change the action for different validation rules depending on the state of your migration.

### JSON Web Tokens with the `Bearer` prefix

API Shield will verify JSON Web Tokens regardless of whether they have the `Bearer` prefix.

### Rate limit by user (JWT claim)

You can rate limit requests based on any claim inside of a JSON Web Token (JWT), such as:

* Registered claims like `aud` or `sub`
* Custom claims like `userEmail`, including nested custom claims like `user.email`

Rate limiting based on JWT claim values will only work on valid JSON Web Tokens. If you do not block invalid JSON Web Tokens on your path, the [JWT claims will all be counted and possibly blocked](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#missing-field-versus-empty-value) if high traffic is detected in the Point of Presence (PoP).

You must also count the JWT claim that uniquely identifies the user. If you select a claim that is the same for many of your users, their rate limits will all be counted together.

### Rate limit by user tier

If you offer multiple tiers on your website or application and you want to enforce rate limiting based on the tiers, such as:

* If `"aud": "free-tier"`, rate limit to five requests per minute.
* If `"aud": "premium-tier"`, rate limit to 50 requests per minute.

You can follow the rate limiting rule example below:

```txt
(http.request.method eq "GET" and
http.host eq "<YOUR_DOMAIN>" and
http.request.uri.path matches "</EXAMPLE_PATH>" and
lookup_json_string(http.request.jwt.claims["<JWT_TOKEN_CONFIGURATION_ID>"][0], "aud") eq "free-tier"
```

### Ignore `OPTIONS` pre-flight CORS requests

Due to cross-origin resource sharing (CORS) security, web browsers will send "pre-flight" requests using the `OPTIONS` verb to API endpoints before sending a `GET` (or other verb) request. By definition, `OPTIONS` preflight requests do not include credentials (authentication headers or cookies) and are anonymous.

If you expect web browsers to be valid clients of your API, and to prevent blocking `OPTIONS` requests from those browsers, Cloudflare recommends adding `or http.request.method eq "OPTIONS"` to your JWT validation rules.

---

## Availability

JWT validation is available for all API Shield customers. Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team.

---

## Limitations

JWT validation only operates on JWTs sent in client request headers or cookies. If your clients send JWTs in a `POST` body, contact your account team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/jwt-validation/#page","headline":"JSON Web Tokens validation · Cloudflare API Shield docs","description":"Verify incoming JWTs to detect token tampering and invalid tokens at the edge.","url":"https://developers.cloudflare.com/api-shield/security/jwt-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)"]}
```
