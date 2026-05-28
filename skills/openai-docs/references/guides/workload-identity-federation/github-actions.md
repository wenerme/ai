# Configuring workload identity federation for GitHub Actions

Use GitHub Actions as a Workload Identity Provider by exchanging a GitHub-issued OIDC token for a short-lived OpenAI access token. This lets workflows authenticate to the OpenAI API without storing a long-lived API key in GitHub secrets.

GitHub can mint a signed OIDC JWT for a workflow job that has `id-token: write` permission and requests an identity token. OpenAI validates the token issuer, audience, signature, and mapping attributes before issuing an OpenAI access token.

## Setting up GitHub Actions

Grant the workflow or job permission to request a GitHub OIDC token:

```yaml
permissions:
  id-token: write
  contents: read
```

The `id-token: write` permission lets the job request an OIDC JWT. It does not grant write access to repository contents. The `contents: read` permission is needed by `actions/checkout`.

Request the token with the exact audience configured in your OpenAI Workload Identity Provider. Custom JavaScript actions can call `core.getIDToken("your-wif-audience")`; shell steps can call GitHub's OIDC request URL directly. Audience values containing reserved URL characters, such as `https://api.openai.com/v1`, should be URL encoded before being appended to the request URL:

```bash
AUDIENCE="https://api.openai.com/v1"
ENCODED_AUDIENCE=$(jq -rn --arg audience "$AUDIENCE" '$audience | @uri')

TOKEN=$(curl -sSf -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" \
  "${ACTIONS_ID_TOKEN_REQUEST_URL}&audience=${ENCODED_AUDIENCE}" | jq -r .value)
```

Important GitHub OIDC claims include:

- `iss`: The token issuer. For GitHub Actions, this is `https://token.actions.githubusercontent.com`.
- `aud`: The audience value requested by the workflow. Configure OpenAI to require the exact value you request, such as `your-wif-audience` or `https://api.openai.com/v1`.
- `sub`: The main subject string. GitHub builds it from workflow metadata such as repository, branch, tag, pull request, or environment.
- `repository`: The repository running the workflow, such as `my-org/my-repo`.
- `repository_owner`: The organization or user that owns the repository, such as `my-org`.
- `ref`: The Git ref that triggered the workflow, such as `refs/heads/main` or `refs/tags/v1.0.0`.
- `workflow`: The workflow claim. Use the actual claim value emitted by GitHub, such as `deploy` if that is the workflow claim in your job.
- `workflow_ref`: The workflow file path and ref, such as `my-org/my-repo/.github/workflows/deploy.yml@refs/heads/main`.
- `environment`: The GitHub environment name, such as `production`, when the job uses an environment.
- `run_id`, `run_number`, `run_attempt`, and `job_workflow_ref`: Run and job identifiers that can help with auditing or more advanced trust rules.

For the full claim list and subject formats, see GitHub's [OpenID Connect reference](https://docs.github.com/en/actions/reference/security/oidc).

## Verify the token

Before configuring workload identity federation, decode a sample GitHub OIDC token in the workflow runner and inspect its claims. After requesting the token in a workflow step:

```bash
TOKEN="$TOKEN" python3 - <<'PY'
import base64
import json
import os

payload = os.environ["TOKEN"].split(".")[1]
payload += "=" * (-len(payload) % 4)
print(json.dumps(json.loads(base64.urlsafe_b64decode(payload)), indent=2))
PY
```

This command decodes the JWT payload without verifying the token signature. Use a local decoder for production tokens, and avoid pasting production tokens into third-party tools. Never log the raw GitHub OIDC token or the exchanged OpenAI access token.

A decoded GitHub Actions OIDC token will look similar to:

```json
{
  "iss": "https://token.actions.githubusercontent.com",
  "aud": "https://api.openai.com/v1",
  "sub": "repo:my-org/my-repo:environment:production",
  "repository": "my-org/my-repo",
  "repository_owner": "my-org",
  "ref": "refs/heads/main",
  "workflow": "deploy",
  "workflow_ref": "my-org/my-repo/.github/workflows/deploy.yml@refs/heads/main",
  "environment": "production",
  "run_id": "1234567890",
  "run_attempt": "1"
}
```

Use the decoded payload to compare the token you received with the issuer, audience, and mapping values configured in OpenAI. Most configuration issues are visible in the `iss`, `aud`, `repository`, `ref`, and `workflow_ref` claims before you exchange the token.

## Setting up workload identity federation

Create a Workload Identity Provider in OpenAI for GitHub Actions, then add a service account mapping that matches the GitHub workflow claims you trust.

Configure the Workload Identity Provider first, then create the service account mapping.

### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `github-actions-prod`. Use **Description**, such as `Production GitHub Actions workflows`, to help admins identify the provider.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to `https://token.actions.githubusercontent.com`. Set **Audience** to the exact audience your workflow requests, such as `your-wif-audience` or `https://api.openai.com/v1`.

3. **Use GitHub OIDC discovery.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses GitHub's OIDC discovery metadata and JWKS to verify the GitHub-signed token.

4. **Add attribute transformations only if you need derived mapping attributes.** Raw GitHub claims such as `repository`, `ref`, and `workflow` can be used directly in mapping assertions. If you create derived attributes, the dashboard applies the `openai.` prefix automatically; for example, enter `github_repository` with expression `assertion.repository` to create `openai.github_repository`. Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a unique value within the Workload Identity Provider, such as `github-actions-main-deploy`. Use **Description**, such as `Production deploy workflow on main`, to explain which workflow can use the mapping.

2. **Add exact claim assertions.** Add one **Key** and **Value** row for each GitHub claim that must match. OpenAI requires every configured row to match before it issues an access token. For a production deploy workflow, use assertions like:

   ```text
   iss == "https://token.actions.githubusercontent.com"
   aud == "https://api.openai.com/v1"
   repository == "my-org/my-repo"
   ref == "refs/heads/main"
   workflow_ref == "my-org/my-repo/.github/workflows/deploy.yml@refs/heads/main"
   ```

   Prefer `workflow_ref` over `workflow` for privileged mappings because admins usually intend to trust a specific workflow file path and ref. Workflow names can be renamed, and multiple workflow files can share the same name.

   In the mapping UI, enter these as key/value rows, such as **Key** `repository` with **Value** `my-org/my-repo`, **Key** `ref` with **Value** `refs/heads/main`, and **Key** `workflow_ref` with **Value** `my-org/my-repo/.github/workflows/deploy.yml@refs/heads/main`. If the job uses a GitHub environment, also add **Key** `environment` with **Value** `production`.

   > **Caution:** Avoid overly broad mappings, such as trusting only `repository_owner == "my-org"`, unless every repository in that owner namespace should be able to mint OpenAI access tokens.

3. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the GitHub workflow can use, such as `github-actions-prod-deploy`.

4. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

## Using the token in a workflow

Configure your OpenAI SDK client to request a GitHub OIDC token and exchange it for an OpenAI-issued access token.

The workflow must grant `id-token: write` permission and pass the workload identity federation settings to the SDK code. The SDK requests the GitHub OIDC token from the `ACTIONS_ID_TOKEN_REQUEST_URL` and `ACTIONS_ID_TOKEN_REQUEST_TOKEN` environment variables that GitHub exposes to the job, then uses the exchanged OpenAI access token to authenticate API requests.

For example, run your application code from a workflow like this:

```yaml
name: deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Run OpenAI SDK code
        env:
          OPENAI_WIF_AUDIENCE: ${{ vars.OPENAI_WIF_AUDIENCE }}
          OPENAI_IDENTITY_PROVIDER_ID: ${{ vars.OPENAI_IDENTITY_PROVIDER_ID }}
          OPENAI_SERVICE_ACCOUNT_ID: ${{ vars.OPENAI_SERVICE_ACCOUNT_ID }}
        run: node ./scripts/call-openai.js
```

Store `OPENAI_WIF_AUDIENCE`, `OPENAI_IDENTITY_PROVIDER_ID`, and `OPENAI_SERVICE_ACCOUNT_ID` as GitHub Actions variables. They identify the provider and service account but are not bearer credentials.

The following examples initialize an OpenAI client with a custom subject token provider. The provider requests a GitHub OIDC token for the configured audience and uses it as the subject token for workload identity federation.

## GitHub Actions best practices

- Use environment protections for production deployments. Require approvals or branch restrictions before workflows can access production OpenAI resources.
- Restrict mappings by repository. Match on repository-specific claims whenever possible instead of allowing access from all repositories within an organization.
- Restrict mappings by branch or workflow. Consider matching claims such as `repository`, `ref`, `environment`, or `workflow_ref` to limit token issuance.
- Use separate OpenAI service accounts for CI/CD and production workloads. Build pipelines often require different permissions than deployed applications.
- Avoid granting access to pull requests from untrusted forks. Forked pull requests may execute attacker-controlled code and should not receive production credentials.
- Use short-lived exchanges. GitHub OIDC tokens are intended for ephemeral authentication and should be exchanged only when needed.
- Audit repository ownership changes. Repository transfers, renames, and permission changes can affect the security assumptions behind existing mappings.
- Prefer exact claim matching. Match on claims such as `repository`, `ref`, and `environment` instead of relying on organization-wide trust relationships.