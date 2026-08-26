---
description: Service tokens in Access.
title: Service tokens
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Service tokens

Last updated Aug 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can provide automated systems with service tokens to authenticate against your Cloudflare One policies. Cloudflare Access will generate service tokens that consist of a Client ID and a Client Secret. Automated systems or applications can then use these values to reach an application protected by Access.

This section covers how to create, rotate, renew, disable, and revoke a service token.

## Create a service token

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. Select **Create Service Token**.
3. Name the service token. The name allows you to easily identify events related to the token in the logs and to revoke the token individually.
4. Choose a **Service Token Duration**. This sets the expiration date for the token.
5. Select **Generate token**. You will see the generated Client ID and Client Secret for the service token, as well as their respective request headers.
6. Copy the Client Secret.
Caution
This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

1. Make a `POST` request to the [Access Service Tokens](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/create/) endpoint:
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Access: Service Tokens Write`
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "CI/CD token",
		"duration": "8760h"
	}'
```
2. Copy the `client_id` and `client_secret` values returned in the response.
```json
"result": {
	"client_id": "88bf3b6d86161464f6509f7219099e57.access",
	"client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",
	"created_at": "2025-09-25T22:26:26Z",
	"expires_at": "2026-09-25T22:26:26Z",
	"id": "3537a672-e4d8-4d89-aab9-26cb622918a1",
	"name": "CI/CD token",
	"updated_at": "2025-09-25T22:26:26Z",
	"duration": "8760h",
	"client_secret_version": 1
}
```
Caution
This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):

  * `Access: Service Tokens Write`
2. Configure the [cloudflare\_zero\_trust\_access\_service\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fservice%5Ftoken) resource:
```tf
resource "cloudflare_zero_trust_access_service_token" "example_service_token" {
	account_id = var.cloudflare_account_id
	name       = "Example service token"
	duration  = "8760h"
	lifecycle {
		create_before_destroy = true
	}
}
```
3. Get the Client ID and Client Secret of the service token:
Example: Output to CLI

  1. Output the Client ID and Client Secret to the Terraform state file:
  ```tf
  output "example_service_token_client_id" {
  	value     = cloudflare_zero_trust_access_service_token.example_service_token.client_id
  }
  output "example_service_token_client_secret" {
  	value     = cloudflare_zero_trust_access_service_token.example_service_token.client_secret
  	sensitive = true
  }
  ```
  2. Apply the configuration:
  ```sh
  terraform apply
  ```
  3. Read the Client ID and Client Secret:
  ```sh
  terraform output -raw example_service_token_client_id
  ```
  ```sh
  terraform output -raw example_service_token_client_secret
  ```
Example: Store in HashiCorp Vault
```tf
	resource "vault_generic_secret" "example_service_token" {
		path         = "kv/cloudflare/example_service_token"
		data_json = jsonencode({
			"CLIENT_ID"     = cloudflare_access_service_token.example_service_token.client_id
			"CLIENT_SECRET" = cloudflare_access_service_token.example_service_token.client_secret
		})
	}
```

You can now configure your Access applications and [device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#check-for-service-token) to accept this service token. Make sure to set the policy action to [**Service Auth**](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth); otherwise, Access will prompt for an identity provider login.

## Connect your service to Access

### Request

To authenticate to an Access application using your service token, add the following to the headers of any HTTP request:

`CF-Access-Client-Id: <CLIENT_ID>`

`CF-Access-Client-Secret: <CLIENT_SECRET>`

For example,

```sh
curl -H "CF-Access-Client-Id: <CLIENT_ID>" -H "CF-Access-Client-Secret: <CLIENT_SECRET>" https://app.example.com
```

#### Authenticate with a single header

You can configure a self-hosted Access application to accept a service token in a single HTTP header, as an alternative to the `CF-Access-Client-Id` and `CF-Access-Client-Secret` pair of headers. This is useful for authenticating SaaS services that only support sending one custom header in a request (for example, the `Authorization` header).

To authenticate using a single header:

1. Get your existing Access application configuration:
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Access: Apps and Policies Write`
  * `Access: Apps and Policies Read`
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
2. Make a `PUT` request with the name of the header you want to use for service token authentication. To avoid overwriting your existing configuration, the `PUT` request body should contain all fields returned by the previous `GET` request.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Access: Apps and Policies Write`
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"domain": "app.example.com",
		"type": "self_hosted",
		"read_service_tokens_from_header": "Authorization"
	}'
```
3. Add the header to any HTTP request. For example,
```sh
curl -H "Authorization: {\"cf-access-client-id\": \"<CLIENT_ID>\", \"cf-access-client-secret\": \"<CLIENT_SECRET>\"}" https://app.example.com
```

## Rotate service token secrets

Rotate a service token secret when you suspect exposure or as part of regular credential rotation. The Client ID remains the same, but Access generates a new Client Secret.

You can set a grace period during which both secrets work. Use this period to update your services before Access revokes the previous secret.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
[Go to  ↗](https://one.dash.cloudflare.com/?to=/:account/access/service-auth/service-tokens)
2. Locate the token and select the three dots > **Rotate secret**.
3. In **Keep the current secret valid for**, choose when Access should revoke the current secret. Available grace periods range from one hour to 30 days. To revoke it when you rotate, select _Revoke immediately_.
4. Select **Rotate**.
5. Copy the new Client Secret and update your services before the grace period ends.

Make a `POST` request to the [Rotate a service token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/rotate/) endpoint. Set `previous_client_secret_expires_at` to an RFC 3339 timestamp when the previous secret should expire:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID/rotate" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"previous_client_secret_expires_at": "2030-01-01T00:00:00Z"
	}'
```

To revoke the previous secret immediately, omit `previous_client_secret_expires_at` from the request.

## Renew service tokens

Service tokens expire according to the token duration you selected when you created the token.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. Locate the token you want to renew.
3. To extend the token's lifetime by one year, select **Refresh**.
4. To extend the token's lifetime by more than a year:
  1. Select **Edit**.
  2. Choose a new **Service Token Duration**.
  3. Select **Save**. The expiration date will be extended by the selected amount of time.

To extend the token's lifetime by one year, make a `POST` request to the [Refresh a service token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/refresh/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Access: Service Tokens Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID/refresh" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To extend the token's lifetime by a custom duration, make a `PUT` request to the [Update a service token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/update/) endpoint with the new `duration`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Access: Service Tokens Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"duration": "17520h"
	}'
```

To renew the service token, update the `duration` attribute on the [cloudflare\_zero\_trust\_access\_service\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fservice%5Ftoken) resource and apply the change. Cloudflare resets the expiration relative to the time of the update.

```tf
resource "cloudflare_zero_trust_access_service_token" "example_service_token" {
	account_id = var.cloudflare_account_id
	name       = "Example service token"
	duration   = "17520h"

	lifecycle {
		create_before_destroy = true
	}
}
```

## Turn a service token on or off

Turn off a service token to temporarily prevent it from authenticating. Access preserves the token so you can turn it on again later.

Turning off a token also stops its previous secret from working during an active rotation grace period.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
[Go to  ↗](https://one.dash.cloudflare.com/?to=/:account/access/service-auth/service-tokens)
2. Locate the token and select the three dots.
3. To stop the token from authenticating, select **Disable token** \> **Disable**.
4. To restore authentication, select **Enable token** \> **Enable**.

Make a `PUT` request to the [Update a service token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/update/) endpoint. Set `enabled` to `false` to turn off the token:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Access: Service Tokens Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "<TOKEN_NAME>",
		"enabled": false
	}'
```

To turn the token on again, set `enabled` to `true`.

## Revoke service tokens

If you need to revoke access before the token expires, delete the token. Services that rely on a deleted service token can no longer reach your application.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. **Delete** the token you need to revoke.

Make a `DELETE` request to the [Delete a service token](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/delete/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Access: Service Tokens Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To revoke the service token, remove the [cloudflare\_zero\_trust\_access\_service\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fservice%5Ftoken) resource from your configuration and run `terraform apply`, or target the resource for destruction:

```sh
terraform destroy -target=cloudflare_zero_trust_access_service_token.example_service_token
```

Note

When editing an Access application, selecting **Revoke existing tokens** revokes existing sessions but does not prevent the user from starting a new session. As long as the Client ID and Client Secret are still valid, they can be exchanged for a new token on the next request. To revoke access, you must delete the service token.

## Set a token expiration alert

An alert can be configured to notify a week before a service token expires to allow an administrator to invoke a token refresh.

Expiring Access Service Token Alert

**Who is it for?**

[Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) customers who want to receive a notification when their service token is about to expire.

**Other options / filters**

None.

**Included with**

Purchase of Access

**What should you do if you receive one?**

Extend the expiration date of the service token. For more details, refer to [Renew your service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#renew-service-tokens).

To configure a service token expiration alert:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com), go to the **Notifications** page. [Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Select _Expiring Access Service Token_.
4. Enter a name for your alert and an optional description.
5. (Optional) Add other recipients for the notification email.
6. Select **Save**.

Your alert has been set and is now visible on the **Notifications** page.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#page","headline":"Service tokens · Cloudflare One docs","description":"Service tokens in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)","Authentication"]}
```
