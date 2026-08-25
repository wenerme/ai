---
description: Create an OAuth client that can access Cloudflare API resources on behalf of users.
title: Create your OAuth client
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Create your OAuth client

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/oauth/create-an-oauth-client/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Prerequisites

To create an OAuth client, you must have one of these roles for the associated account: Super Administrator, Administrator, or OAuth Client Write.

1. Log in to the Cloudflare dashboard.
2. Select your account.
3. Go to **Manage Account** \> **OAuth clients**.
4. Select **Create client**.
5. Enter the required configuration details:
  * Client name
  * Response type
  * Grant type
  * Token authentication method
  * Redirect URLs
6. Optional: Add non-required fields.
7. Select **Continue** and define the scopes required for your client.
8. Optional: In **Choose optional scopes**, turn off **Required** for each scope you want to make optional. All scopes are required by default.
9. Select **Create client**.
10. Save your **Client ID** and **Client Secret** in a secure location.

[Go to **OAuth clients** ↗](https://dash.cloudflare.com/?to=/:account/oauth-clients)

To create OAuth clients with the Cloudflare API, create an API token with the `OAuth Clients Write` permission.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $API_TOKEN" \
	-d '{
		"client_name": "Cloudflare OAuth Client",
		"grant_types": ["authorization_code"],
		"redirect_uris": ["https://example.com/oauth/callback"],
		"scopes": ["workers-platform.read", "workers-platform.write"],
		"optional_scopes": ["workers-platform.read"],
		"post_logout_redirect_uris": ["https://example.com/logout"],
		"response_types": ["code"],
		"token_endpoint_auth_method": "client_secret_basic",
		"logo_uri": "https://example.com/logo.png",
		"policy_uri": "https://example.com/policy",
		"tos_uri": "https://example.com/tos",
		"client_uri": "https://example.com",
		"allowed_cors_origins": ["https://example.com"]
	}'
```

Note

After you create an OAuth client, Cloudflare displays the client secret if the client requires one. Copy it to a secure location. You cannot view the secret again after you leave the page. If you lose the secret, rotate it to get a new one.

## Select scopes

OAuth scope names correspond to Cloudflare API token permission names. Use the Cloudflare API documentation to identify the permissions your client needs.

When you create or edit an OAuth client, select at least one scope. All selected scopes are required by default.

In **Choose optional scopes**, turn off **Required** for each scope you want to make optional.

Required scopes must be granted on the consent screen, while optional scopes can be declined by the user.

Fetch the available scopes from the API. Use the scope ID when you create a client through the API.

```bash
curl "https://api.cloudflare.com/client/v4/oauth/scopes" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $API_TOKEN"
```

To mark scopes as optional, include them in the `optional_scopes` of the request. This must be a subset of the `scopes` for the client. Optional scopes may be declined by the user during authorization.

## Supported OAuth flows

Cloudflare OAuth clients support the OAuth 2.0 Authorization Code flow.

Cloudflare does not support Client Credentials, Implicit, Resource Owner Password Credentials, Device Authorization, or other OAuth grant types for third-party clients.

### Choose a flow

Use the following guidance to choose an OAuth flow:

| Client type                                | Flow                                    | Token endpoint authentication                 | PKCE                  |
| ------------------------------------------ | --------------------------------------- | --------------------------------------------- | --------------------- |
| Server-side web app or backend service     | Authorization Code with a client secret | client\_secret\_basic or client\_secret\_post | Optional/not required |
| Browser-based, mobile, desktop, or CLI app | Authorization Code with PKCE            | none                                          | Required, S256        |

### Client secret

The Authorization Code flow is intended for secure server-side applications that can protect a client secret from exposure.

* **Use when:** Your OAuth client is a server-side web application or backend service.
* **How it works:** Your client redirects the user to the authorization page. After authorization, Cloudflare returns an authorization code to your backend. Your backend exchanges the code and client secret for an access token.
* **Security note:** Never expose your client secret in client-side code or embed it in mobile client binaries.

### PKCE

Proof Key for Code Exchange (PKCE) extends the Authorization Code flow for public clients, such as mobile or single-page apps, where a client secret cannot be securely stored.

* **Use when:** Your OAuth client is a single-page, mobile, desktop, or CLI application.
* **How it works:** Your application generates a unique code verifier and code challenge for every login request instead of using a static client secret.
* **Security note:** Clients that use PKCE do not need a client secret.

## Private and public clients

New OAuth clients default to private visibility. Private clients can only be authorized by members of the parent Cloudflare account. Public clients allow authorization from any Cloudflare user.

Before you make a client public, complete the required actions and populate the required fields.

### Required fields

* Client name
* Logo
* Client URL
* Scopes

### Required actions

OAuth clients must complete [domain verification](#client-url-domain-ownership-verification) for the client URL before they can be made public.

### Promote a client to public

Caution

Setting a client's visibility to public is permanent. You cannot change the visibility back to private.

1. Go to **Manage Account** \> **OAuth clients**.
2. Open the action menu for your client.
3. Select **Change Visibility**.

[Go to **OAuth clients** ↗](https://dash.cloudflare.com/?to=/:account/oauth-clients)

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$CLIENT_ID" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $API_TOKEN" \
	-d '{ "visibility": "public" }'
```

## Client URL domain ownership verification

Cloudflare requires client URL domain ownership verification before a client can become public. If your client is only for private use by members of the account, domain ownership verification is not required.

Caution

After Cloudflare verifies domain ownership, you cannot change the domain of the client URL. You can still update the route for that domain.

Copy the verification code and create a `TXT` record in your DNS configuration with that value. The record must include all text, including the `cloudflare_oauth_client_publisher=` prefix.

Cloudflare polls this DNS record until it is found or until the request times out after two days.

### Restart verification

If the verification process times out, select **Restart verification** in the client action menu.

To restart a failed or timed out verification, send a `PATCH` request with the existing `client_uri` unchanged.

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$CLIENT_ID" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $API_TOKEN" \
	-d '{ "client_uri": "https://example.com" }'
```

## Rotate client secrets

Each client can have two secrets. This lets you create a new secret, update your client to use the new secret, and delete the old secret.

1. Go to **Manage Account** \> **OAuth clients**.
2. Open the action menu for your client.
3. Select **Rotate client secret**.
4. Save the new secret in a secure location.
5. After your client uses the new secret, delete the old secret.

[Go to **OAuth clients** ↗](https://dash.cloudflare.com/?to=/:account/oauth-clients)

To check whether a client is in the middle of a secret rotation, look for `has_rotated_secret` in the `GET` response. If the value is `true`, delete the old secret before you create another secret.

#### Create a new secret

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$CLIENT_ID/rotate_secret" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $API_TOKEN"
```

#### Delete the old secret

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$CLIENT_ID/rotate_secret" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $API_TOKEN"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/oauth/create-an-oauth-client/#page","headline":"Create your OAuth client · Cloudflare Fundamentals docs","description":"Create an OAuth client that can access Cloudflare API resources on behalf of users.","url":"https://developers.cloudflare.com/fundamentals/oauth/create-an-oauth-client/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
