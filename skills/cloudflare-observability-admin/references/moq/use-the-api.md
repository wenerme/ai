---
description: Create a Cloudflare API token with MoQ permissions, provision a relay, and issue connection tokens for publishers and subscribers.
title: Use the MoQ API
image: https://developers.cloudflare.com/moq/use-the-api/og.png?v=08a67d272f91a3d9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/moq/llms.txt
> Use this file to discover all available pages before exploring further.

# Use the MoQ API

Last updated Nov 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/moq/use-the-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the Cloudflare API to provision relays and manage their configuration and connection tokens. Your application sends media through a MoQ client, rather than through the management API.

## Create a management API token

You need a [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and a [custom API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with account-scoped MoQ permissions.

1. Follow [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) and choose **Create Custom Token**.
2. Under **Permissions**, select **Account**, **MoQ**, and **Edit** to create, update, or delete relays and their connection tokens. For read-only access, select **Read** instead.
3. Under **Account Resources**, include the specific account you will use in API requests.
4. Create the token and save its secret securely. Use it as `CLOUDFLARE_API_TOKEN` in the examples on this page.

MoQ appears under Realtime in the dashboard, but its API permissions are separate. Select **MoQ**, rather than **Realtime**, **Calls**, or **Stream**, for requests to `/accounts/{account_id}/moq/`. The permission-groups API names the write permission **MoQ Write**; the dashboard displays it as **Edit**. Write access includes read and list operations.

For a user-owned API token, the user must also have access to the account and the required MoQ operations.

## Choose the correct token

The API and MoQ connections use different credentials:

| Credential | Purpose | Where to use it |
| --- | --- | --- |
| Cloudflare API token | Manage relays, configuration, and connection tokens | `Authorization: Bearer` header on `api.cloudflare.com` |
| Relay connection token | Publish or subscribe within one relay | URL path when connecting to the MoQ endpoint |

Keep the Cloudflare API token on your backend. Give publishers and subscribers relay connection tokens with the operations they need. A relay connection token cannot authorize management API requests.

## Provision a relay

Set `ACCOUNT_ID` to your Cloudflare account ID. To [create a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/create/), send:

```sh
curl --fail-with-body \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Relay"}'
```

A successful response has `success: true`. Save `result.uid` as `RELAY_ID` for subsequent requests.

The response also contains `result.issuers`. In the entry with `type: "cloudflare_jwt"`, `cloudflare_tokens` contains a publish-and-subscribe token and a subscribe-only token. Select tokens by their `operations` field, rather than their array position. Each token's `secret` is the connection token to pass to a MoQ client.

Save the connection-token secrets securely when you create them. List and get requests do not return the secrets.

Relay creation uses the default configuration. To change configuration after creation, use [Update a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/update/).

## Update a relay

Use `PUT` with **MoQ Edit** access. For example, to rename a relay, send:

```sh
curl --fail-with-body -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Live event relay"}'
```

For configuration fields and replacement behavior, refer to [Update a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/update/).

## Read a relay

To confirm the relay exists and read its configuration, send:

```sh
curl --fail-with-body \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

This request requires **MoQ Read** or **MoQ Edit** access to the account.

## Create a connection token

To issue an additional subscribe-only token, send:

```sh
curl --fail-with-body \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID/tokens" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"operations": ["subscribe"], "label": "viewer"}'
```

The response returns the new token in `result.issuers[].cloudflare_tokens[]`, including its one-time `secret` and its `jti` identifier. Use the secret for connections and the identifier to [revoke the token](https://developers.cloudflare.com/api/resources/moq/subresources/relays/subresources/tokens/methods/delete/).

For a publisher, use `"operations": ["publish", "subscribe"]`. You can set `expires` to an RFC 3339 timestamp. The default expiration is one year, which is also the maximum. Each relay supports up to 10 connection tokens, including its default pair.

For all request fields, refer to [Create a token](https://developers.cloudflare.com/api/resources/moq/subresources/relays/subresources/tokens/methods/create/).

## Connect your application

Use a draft-18-compatible MoQ client with this endpoint:

```txt
https://draft-18.cloudflare.mediaoverquic.com/<RELAY_CONNECTION_TOKEN>
```

Publishers and subscribers must use tokens from the same relay and compatible MoQ draft versions. The relay connection token identifies the relay scope, so you do not add `RELAY_ID` to the connection URL. Refer to the [publisher and subscriber example](https://developers.cloudflare.com/moq/#connect-a-publisher-and-subscriber-draft-18).

## Troubleshoot API authentication

For an HTTP `403` or `Authentication error` from the management API, check:

- **Credential:** Send the Cloudflare API token in the Bearer header, rather than a relay connection token.
- **Permission:** Select **MoQ** permissions. Read-only access cannot create tokens or update relays. Permissions for another Realtime product do not grant MoQ access.
- **Account:** Match `ACCOUNT_ID` to an account included in the token's resources. For user-owned tokens, check the user's account access too.
- **Restrictions:** Check the token's expiration and client IP restrictions, and any [API access restrictions](https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/).

To check whether a user-owned API token is active, use:

```sh
curl --fail-with-body \
  "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

An active token is not proof that it has MoQ permissions or access to the requested account. Use [Read a relay](#read-a-relay) to check access to that resource.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/moq/use-the-api/#page","headline":"Use the MoQ API","description":"Create a Cloudflare API token with MoQ permissions, provision a relay, and issue connection tokens for publishers and subscribers.","url":"https://developers.cloudflare.com/moq/use-the-api/","inLanguage":"en","image":"https://developers.cloudflare.com/moq/use-the-api/og.png?v=08a67d272f91a3d9","dateModified":"2026-11-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
