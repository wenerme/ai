> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Vault Secrets for Interns

> Store host-bound secrets for a workspace or an intern with the Vault API

The Vault API stores credentials that your interns send to third-party APIs. Each secret is bound to an exact list of hostnames, and the intern runtime releases the value only to requests bound for one of those hostnames. Your code never handles the plaintext after the store call, and the API never returns it.

All routes live under `https://openrouter.ai/api/v1/vault` and take an [API key](/docs/api_reference/authentication) as a bearer token. The full route reference is in the [Vault API reference](/docs/api/api-reference/vault/list-workspace-secrets).

Every vault route, including `GET`, requires access to the Intern API programme. Outside the programme every route answers `404`, the same response the dashboard gives when interns are not enabled. Writes are enabled separately inside the programme, see [Writes are enabled per account](#writes-are-enabled-per-account).

## Scope is selected by the API key

A secret belongs to either a workspace or one intern inside that workspace.

* **Workspace secrets** live at `/api/v1/vault/secrets`. They are the pool you copy from when you give an intern a credential.
* **Intern secrets** live at `/api/v1/vault/interns/{internId}/secrets`. They are the secrets that intern can use.

The workspace is always the active workspace of the API key that makes the request. You cannot pass a workspace ID, there is no default workspace, and a key never falls back to another scope. An intern route additionally requires `internId` to be an intern in that same workspace, otherwise the request fails with `404`.

Vault routes are served on the global hostname only. A request to a regional hostname such as `eu.openrouter.ai` is refused with `403`.

## Responses carry metadata only

Every successful response describes secrets without their values.

```json theme={null}
{
  "name": "github_token",
  "hosts": ["api.github.com"],
  "fingerprint": "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "created_at": "2026-09-15T17:44:00.000Z"
}
```

| Field         | Meaning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | The secret name you chose.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `hosts`       | The exact hostnames the secret may be sent to. `null` marks a secret stored before host binding existed. Store it again with `hosts` to bind it.                                                                                                                                                                                                                                                                                                                                                |
| `fingerprint` | An HMAC-SHA-256 of the value, keyed with the vault's own data key. Compare fingerprints only within one vault: two secrets there with equal fingerprints hold equal values, and storing the same value again keeps its fingerprint. The key differs per vault, so a workspace secret and its intern copy have different fingerprints, and a cross-vault comparison cannot show that a copy matches or that a rotation propagated. `null` for a secret stored before fingerprints were recorded. |
| `created_at`  | When the secret was first stored, in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Store a secret

`PUT` the value and its hosts to the secret's name. Storing a name that already exists replaces the value and hosts.

```bash theme={null}
curl -X PUT https://openrouter.ai/api/v1/vault/secrets/github_token \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "value": "ghp_exampleToken",
    "hosts": ["api.github.com"]
  }'
```

```json theme={null}
{
  "data": {
    "name": "github_token",
    "hosts": ["api.github.com"],
    "fingerprint": "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "created_at": "2026-09-15T17:44:00.000Z"
  }
}
```

Use `PUT /api/v1/vault/interns/{internId}/secrets/{name}` with the same body to store a secret for one intern directly.

**Names** are 1 to 255 characters, start with a lowercase letter, and contain only lowercase letters, digits, and single underscores. A name cannot end with an underscore or contain `__`. `github_token` and `db2_password` are valid, `GitHub-Token`, `_token`, and `a__b` are not.

**Values** are 1 to 65,536 characters. The whole request body must stay under 425,000 bytes or the request fails with `413`.

**Hosts** must be present with 1 to 100 entries. The rules are in [Host rules](#host-rules).

Unknown fields in the body fail the request with `400`.

## List secrets

```bash theme={null}
curl "https://openrouter.ai/api/v1/vault/secrets?limit=50&offset=0" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

```json theme={null}
{
  "data": [
    {
      "name": "github_token",
      "hosts": ["api.github.com"],
      "fingerprint": "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "created_at": "2026-09-15T17:44:00.000Z"
    },
    {
      "name": "legacy_token",
      "hosts": null,
      "fingerprint": null,
      "created_at": "2026-08-01T09:00:00.000Z"
    }
  ],
  "has_more": false
}
```

Results are sorted by name. `limit` is 1 to 100 and defaults to 100. `offset` is 0 to 10,000 and defaults to 0. `has_more` is `true` when another page exists after this one, so keep adding `limit` to `offset` until it is `false`. A value outside those bounds fails with `400`.

Use `GET /api/v1/vault/interns/{internId}/secrets` with the same parameters to list one intern's secrets.

## Copy workspace secrets to an intern

Copying is how you hand a workspace credential to an intern without sending the value again. Each copy keeps the source value and hosts, and replaces any intern secret with the same name.

```bash theme={null}
curl -X POST https://openrouter.ai/api/v1/vault/interns/7c9e6679-7425-40de-944b-e07fc1f90ae7/secrets/copy \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "names": ["github_token", "openai_api_key"] }'
```

```json theme={null}
{
  "data": [
    {
      "name": "github_token",
      "hosts": ["api.github.com"],
      "fingerprint": "sha256:3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d",
      "created_at": "2026-09-15T17:44:00.000Z"
    },
    {
      "name": "openai_api_key",
      "hosts": ["api.openai.com"],
      "fingerprint": "sha256:2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
      "created_at": "2026-09-15T17:44:00.000Z"
    }
  ]
}
```

`names` holds 1 to 100 distinct workspace secret names. A repeated name fails with `400`. Every name must exist in the workspace, otherwise the request fails with `404` and nothing is copied.

**Conflicts.** The request fails with `409` and the message `Vault request conflicts with existing secrets` when a named workspace secret has `hosts: null`, or when the intern is in the middle of a transfer to another workspace. Nothing is copied. For a `null`-host secret, store it again with `hosts` and retry. For a transfer, retry once the transfer has finished.

## Delete a secret

```bash theme={null}
curl -X DELETE https://openrouter.ai/api/v1/vault/secrets/github_token \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

A successful delete returns `204` with no body. Deleting a name that does not exist in that scope returns `404`. Deleting a workspace secret does not touch copies already made to interns, and deleting an intern's copy does not touch the workspace secret.

Use `DELETE /api/v1/vault/interns/{internId}/secrets/{name}` to remove one intern's secret.

## Host rules

A host is an exact DNS hostname. The API normalizes each entry and then checks it.

* Hostnames are lowercased and a trailing dot is removed, so `API.Example.com.` is stored as `api.example.com`.
* Schemes, ports, paths, wildcards, and empty strings are rejected. `https://api.example.com`, `api.example.com:443`, `api.example.com/v1`, and `*.example.com` all fail with `400`.
* Each label is 1 to 63 characters of letters, digits, and hyphens, and cannot start or end with a hyphen. The whole hostname is at most 253 characters.
* An array holds 1 to 100 hosts. Entries that are equal after normalization are collapsed into one.

Matching at release time is exact. A secret bound to `api.example.com` is never released to `example.com`, `www.api.example.com`, or any other hostname. Bind every hostname the intern needs to call.

## Errors

Errors use the standard OpenRouter shape.

```json theme={null}
{
  "error": {
    "code": 409,
    "message": "Vault request conflicts with existing secrets"
  }
}
```

| Status | When                                                                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | The name, body, hosts, or query parameters failed validation.                                                                            |
| `401`  | The API key is missing or invalid.                                                                                                       |
| `403`  | The key's workspace cannot be used for vault requests, or the request used a regional hostname.                                          |
| `404`  | The key is outside the Intern API programme, the intern is not in the key's workspace, or the named secret does not exist in that scope. |
| `408`  | The request or its body took too long to arrive.                                                                                         |
| `409`  | Copy conflict, or the intern is being transferred. See [Copy workspace secrets to an intern](#copy-workspace-secrets-to-an-intern).      |
| `413`  | The request body exceeds 425,000 bytes.                                                                                                  |
| `429`  | Too many vault requests. Retry with backoff.                                                                                             |
| `500`  | An internal error.                                                                                                                       |
| `502`  | The vault service returned an unexpected response.                                                                                       |
| `503`  | Vault writes are not enabled for your account, or the vault service is unavailable.                                                      |
| `504`  | The vault service did not respond in time.                                                                                               |

## Writes are enabled per account

Inside the Intern API programme, writes (`PUT`, `DELETE`, and `POST`) are enabled per account during the Ori rollout. Until they are enabled for yours, every write returns `503` with the message `Vault writes are not enabled`, while `GET` requests keep working for accounts in the programme.
