---
date: "2026-08-23T00:00:00+00:00"
---

# OpenID Connect

Jobs can request short-lived OpenID Connect (OIDC) tokens to sign in to cloud providers and other services without storing long-lived secrets. The tokens use the GitHub Actions format, so actions like `aws-actions/configure-aws-credentials`, `google-github-actions/auth` and `azure/login` work unchanged.

## Trusting Gitea

Add Gitea as an OIDC identity provider in the service:

- Issuer: `<ROOT_URL>/api/actions/oidc`
- Audience: `<ROOT_URL>/<owner>`, unless the workflow requests another one

Then limit which workflows can sign in with a condition on the [`sub` claim](#claims).

Gitea signs the tokens with a key it creates at `<APP_DATA_PATH>/jwt/actions_oidc.pem`. Instances behind a load balancer must share this file.

## Requesting a token

Grant the `id-token` permission to the workflow or job:

```yaml
permissions:
  id-token: write
```

Default permissions never include it, and jobs from fork pull requests never get it. Owners and repositories can disable it with their [maximum token permissions](token-permissions.md#maximum-token-permissions-clamping).

Actions like the ones above request the token themselves. In a script, use `ACTIONS_ID_TOKEN_REQUEST_URL` and `ACTIONS_ID_TOKEN_REQUEST_TOKEN`:

```shell
curl --fail --silent --show-error \
  --header "Authorization: Bearer ${ACTIONS_ID_TOKEN_REQUEST_TOKEN}" \
  "${ACTIONS_ID_TOKEN_REQUEST_URL}&audience=my-service"
```

The token is in the `value` field of the response and expires after five minutes.

## Claims

The `sub` claim names the owner and repository with their IDs, so a renamed or recreated repository cannot match an existing trust policy:

```text
repo:<owner>@<owner-id>/<repo>@<repo-id>:ref:<ref>
repo:<owner>@<owner-id>/<repo>@<repo-id>:pull_request
```

The `pull_request` event uses the second form, all other events use the first, including `pull_request_target`.

The other claims match GitHub's, like `repository`, `ref`, `sha`, `workflow_ref` and `job_workflow_ref`. The discovery document at `<ROOT_URL>/api/actions/oidc/.well-known/openid-configuration` lists them all.

Differences from GitHub Actions:

- There is no `environment` claim.
- Pull request runs use `refs/pull/<index>/head` and its commit, not the merge ref and merge commit.
- `run_number` counts runs per repository, not per workflow.
