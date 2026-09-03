> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Workload Identity Federation

> Call OpenRouter from workloads signed in with your own identity provider, without long-lived API keys

Workload identity federation lets a workload that already holds a JWT from your identity provider call OpenRouter without an OpenRouter API key in its environment. The workload exchanges its JWT for a short-lived OpenRouter access token ([RFC 8693 token exchange](https://www.rfc-editor.org/rfc/rfc8693)) and sends that token as the bearer on inference requests.

<Note>
  Workload identity federation is available to organizations on request. Contact your OpenRouter account team to enable **Settings → Workload identity** for your organization.
</Note>

## How it works

1. Your identity provider signs a JWT for the workload (a service account, a CI job, a Kubernetes pod).
2. The workload posts that JWT to `POST https://openrouter.ai/api/v1/oauth/token`.
3. OpenRouter verifies the signature against your issuer's published keys, finds the **federation policy** that names the token's `sub` and `aud`, and mints an OpenRouter access token that acts as the API key the policy targets.
4. The workload calls `https://openrouter.ai/api/v1/...` with `Authorization: Bearer <access_token>` until the token expires, then exchanges again.

Access tokens live for **15 minutes** at most, and never longer than the JWT that was exchanged for them. Usage is attributed to the target API key exactly as if that key had been used directly.

## Set up trust

Everything is configured by an organization admin under **Settings → Workload identity**.

### 1. Add an issuer

An issuer is an identity provider your organization trusts.

| Field               | Meaning                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Name                | A label for the settings page.                                                                                                             |
| Issuer URL          | Must equal the `iss` claim of the tokens it signs, exactly. `https://` only.                                                               |
| JWKS URL (optional) | Where the issuer publishes its signing keys. Leave empty and OpenRouter reads `jwks_uri` from `<issuer>/.well-known/openid-configuration`. |

### 2. Add a policy

A policy says which tokens from an issuer may exchange, and which API key they act as.

| Field           | Meaning                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Issuer          | The issuer that signs the tokens.                                                                     |
| Subject         | Must equal the token's `sub` claim exactly.                                                           |
| Audience        | Must equal one of the token's `aud` values exactly.                                                   |
| Acts as API key | A workspace API key owned by your organization. Personal keys and management keys cannot be targeted. |

Each policy has an id shown under its name. Your workload sends that id as `federation_policy_id` with every exchange, which binds the exchange to your organization even if another organization trusts the same issuer, subject, and audience. Policies can be paused with the **Enabled** switch.

## Exchange a token

```bash title="Token exchange" theme={null}
curl https://openrouter.ai/api/v1/oauth/token \
  -d grant_type=urn:ietf:params:oauth:grant-type:token-exchange \
  -d subject_token_type=urn:ietf:params:oauth:token-type:jwt \
  -d federation_policy_id="$FEDERATION_POLICY_ID" \
  -d subject_token="$IDP_JWT"
```

```json title="Response" theme={null}
{
  "access_token": "<short-lived JWT>",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "Bearer",
  "expires_in": 900,
  "scope": "inference"
}
```

Then call the API with the access token as the bearer:

```bash title="Inference with an access token" theme={null}
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [{ "role": "user", "content": "Hello" }]
  }'
```

The request body is `application/x-www-form-urlencoded` and must stay under 32 KB; `subject_token` itself is capped at 16 KB. `federation_policy_id` is required and names the policy to evaluate. `requested_token_type` (must be `urn:ietf:params:oauth:token-type:access_token`) and `scope` (must be `inference`) are accepted and optional; `audience` and `resource` are accepted and ignored.

### Requirements on the subject token

* Signed with `ES256` or `RS256` by a key published at the issuer's JWKS.
* Carries `iss`, `sub`, `aud`, and `exp`, and is not expired.
* `iss` equals the issuer URL of the named policy, and `sub` plus one `aud` value equal that policy's subject and audience.

### Errors

Errors follow [RFC 6749 §5.2](https://www.rfc-editor.org/rfc/rfc6749#section-5.2):

| HTTP | `error`                   | Meaning                                                                                                                                                                                                                                                                             |
| ---- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | `invalid_request`         | A required field is missing or malformed, or `subject_token` is not a JWT.                                                                                                                                                                                                          |
| 400  | `unsupported_grant_type`  | `grant_type` is not the token-exchange grant.                                                                                                                                                                                                                                       |
| 400  | `invalid_scope`           | A scope other than `inference` was requested.                                                                                                                                                                                                                                       |
| 400  | `invalid_grant`           | The token was not accepted: the policy does not exist or is paused, the token's issuer, subject, or audience do not match it, the signature is bad, or the token is expired. One generic message covers all of these so a caller cannot probe another organization's configuration. |
| 413  | `invalid_request`         | The request body is larger than 32 KB.                                                                                                                                                                                                                                              |
| 429  | `invalid_request`         | Too many exchanges from one address; retry after the `Retry-After` header.                                                                                                                                                                                                          |
| 503  | `temporarily_unavailable` | The issuer's discovery document or JWKS could not be fetched; retry shortly.                                                                                                                                                                                                        |

## Verifying OpenRouter access tokens

Access tokens are JWTs (`typ: at+jwt`) signed by OpenRouter with `ES256`. The public keys are published at `https://openrouter.ai/api/v1/oauth/jwks`. The `sub` of an access token is the `sub` of the exchanged JWT, and `federation_policy_id` and `federation_issuer_id` name the policy and issuer that authorized it, for auditing on your side. OpenRouter does not read them when authorizing a request.

## Revocation

Deleting or pausing a policy, deleting an issuer, or losing the workload identity entitlement stops **new** exchanges immediately. Access tokens already issued remain valid until they expire, which is at most 15 minutes — none of those changes revokes an outstanding token. To cut off inference within that window, disable or delete the API key the policy targets: key state is checked on every request.
