# Configuring workload identity federation for Google Cloud

import {
  googleGkeWorkloadIdentitySdk,
  googleWorkloadIdentitySdk,
} from "./examples";

Use Google Cloud as a Workload Identity Provider in either of these scenarios:

- **Google workload identity:** Exchange a Google-signed OIDC token issued to an attached Google service account for a short-lived OpenAI access token.
- **Google Kubernetes Engine:** Exchange a projected GKE service account token for a short-lived OpenAI access token.



<div data-content-switcher-pane data-value="workload-identity">

## Google workload identity

Google Cloud workloads can request signed OIDC identity tokens from the Google metadata server without storing long-lived service account keys. In OpenAI workload identity federation, the Google identity token is the subject token that OpenAI validates before issuing an OpenAI access token. This flow works on Compute Engine, Cloud Run, GKE workloads using attached Google service accounts, and other Google-managed runtimes that expose the metadata server identity endpoint.

### Setting up Google workload identity

Create a Google service account for the workload that needs to call the OpenAI API. For the full setup flow, see Google's guide to [create service accounts](https://docs.cloud.google.com/iam/docs/service-accounts-create).

For example, create a service account with the Google Cloud CLI:

```bash
gcloud iam service-accounts create openai-wif \
  --description="Service account for OpenAI workload identity federation" \
  --display-name="OpenAI workload identity federation"
```

Create the Compute Engine VM with the service account attached, or attach the service account to the Google Cloud resource running your application. The resource must be able to call the Google metadata server at runtime. For VM setup details, see Google's guide to [create a VM that uses a user-managed service account](https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances).

Do not create or download service account keys for this flow. The workload uses the attached service account and the metadata server to request a short-lived OIDC token.

### Getting a Google identity token

From the Google Cloud resource with the service account attached, request an OIDC identity token from the metadata server with the configured audience. This token is the subject token that OpenAI exchanges for an OpenAI-issued access token.

```bash
AUDIENCE="https://api.openai.com/v1"

TOKEN=$(curl -sS -G -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity" \
  --data-urlencode "audience=${AUDIENCE}")
```

The metadata server returns a Google-signed JWT. For more information about the metadata server identity endpoint, see Google's guide to [verify VM identity](https://docs.cloud.google.com/compute/docs/instances/verifying-instance-identity).

### Verify the token

Before configuring workload identity federation, decode a sample Google identity token locally and inspect its claims:

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

This command decodes the JWT payload without verifying the token signature. Use a local decoder for production tokens, and avoid pasting production tokens into third-party tools.

A decoded Google metadata server identity token will look similar to:

```json
{
  "iss": "https://accounts.google.com",
  "aud": "https://api.openai.com/v1",
  "azp": "110123456789012345678",
  "sub": "110123456789012345678",
  "email": "openai-wif@my-project.iam.gserviceaccount.com",
  "email_verified": true,
  "iat": 1716235422,
  "exp": 1716239022
}
```

Use the decoded payload to compare the token you received with the issuer, audience, and mapping values configured in OpenAI. Most configuration issues are visible in the `iss`, `aud`, `email`, and `sub` claims before you exchange the token.

### Setting up workload identity federation

Create a Workload Identity Provider in OpenAI for Google-issued identity tokens, then add a service account mapping that matches stable claims from the token.

Configure the Workload Identity Provider first, then create the service account mapping.

#### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `google-workload-identity-prod`. Use **Description**, such as `Production Google Cloud workloads`, to help admins identify the provider.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to `https://accounts.google.com`. Set **Audience** to the custom audience your workload requests from the Google metadata server, such as `https://api.openai.com/v1`. This value must match the token's `aud` claim.

3. **Use Google OIDC discovery.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses Google's OIDC discovery metadata and JWKS to verify the Google-signed identity token.

4. **Add attribute transformations if you need derived mapping attributes.** For example, enter `subject` with expression `assertion.sub` to create `openai.subject` from the subject claim. The dashboard applies the `openai.` prefix automatically. Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

#### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a unique value within the Workload Identity Provider, such as `compute-openai-wif`. Use **Description**, such as `Production Compute Engine OpenAI API workload`, to explain which workload can use the mapping.

2. **Match stable Google service account claims.** Add one **Key** and **Value** row for each claim that must match. Use `sub` as the primary identity binding because it is stable and unique. You may additionally match `email` for readability.

3. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the Google Cloud workload can use, such as `google-workload-identity-prod-openai-wif`.

4. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

### Using the token in code

Configure your OpenAI SDK client to request a Google identity token from the metadata server and exchange it for an OpenAI-issued access token.

Set `OPENAI_WIF_AUDIENCE` to the custom audience configured as the Workload Identity Provider audience. The SDK requests a Google identity token for that audience, exchanges it for an OpenAI-issued access token, and uses the OpenAI token to authenticate API requests.

</div>

  <div data-content-switcher-pane data-value="gke" hidden>

## Google Kubernetes Engine

Use Google Kubernetes Engine as a Workload Identity Provider by exchanging a GKE-issued projected service account token for a short-lived OpenAI access token.

GKE workloads can authenticate using either:

- A projected Kubernetes service account token issued by the cluster OIDC issuer.
- A Google service account identity token obtained through GKE Workload Identity, where a Kubernetes service account is bound to a Google service account.

Use projected Kubernetes service account tokens when you want OpenAI to trust the cluster's OIDC issuer directly. Use GKE Workload Identity when your workload already relies on a Google service account identity and you want OpenAI to trust Google-issued identity tokens instead.

If your GKE workload is configured with GKE Workload Identity and can request
  Google identity tokens from the metadata server, follow the [Google workload
  identity](#google-workload-identity) instructions above instead of the GKE
  projected token flow.

### Setting up GKE

These instructions assume a managed GKE cluster. For a self-managed Kubernetes cluster, use the [Kubernetes guide](https://developers.openai.com/api/docs/guides/workload-identity-federation/kubernetes).

Use a Kubernetes `ServiceAccount` for the GKE workload that needs to call the OpenAI API. If you do not already have one, create it:

```bash
kubectl create serviceaccount openai-wif --namespace default
```

Retrieve the issuer URL associated with the GKE cluster:

```bash
kubectl get --raw /.well-known/openid-configuration | jq -r .issuer
```

Example output:

```text
https://container.googleapis.com/v1/projects/my-project/locations/us-central1/clusters/openai-wif
```

The issuer you configure in the OpenAI Workload Identity Provider must match this issuer URL and the `iss` claim in the projected GKE service account token.

Configure the projected service account token with the audience OpenAI expects and an expiration suitable for your workload. OpenAI validates the token's issuer, signature, audience, and expiration. In this example, the token file is mounted at `/var/run/secrets/tokens/token`, uses the audience `https://api.openai.com/v1`, and expires after 3600 seconds. You may use a different audience if the projected token audience and OpenAI Workload Identity Provider audience match:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: openai-wif-app
  namespace: default
spec:
  serviceAccountName: openai-wif
  containers:
    - name: app
      image: my-image
      volumeMounts:
        - name: gke-sa-token
          mountPath: /var/run/secrets/tokens
          readOnly: true
  volumes:
    - name: gke-sa-token
      projected:
        sources:
          - serviceAccountToken:
              path: token
              audience: "https://api.openai.com/v1"
              expirationSeconds: 3600
```

### Verify the token

Before configuring workload identity federation, decode a sample projected service account token locally and inspect its claims. From a running pod with the projected token mounted:

```bash
TOKEN=$(kubectl exec -n default openai-wif-app -- cat /var/run/secrets/tokens/token)

TOKEN="$TOKEN" python3 - <<'PY'
import base64
import json
import os

payload = os.environ["TOKEN"].split(".")[1]
payload += "=" * (-len(payload) % 4)
print(json.dumps(json.loads(base64.urlsafe_b64decode(payload)), indent=2))
PY
```

This command decodes the JWT payload without verifying the token signature. Use a local decoder for production tokens, and avoid pasting production tokens into third-party tools.

A decoded GKE projected service account token will look similar to:

```json
{
  "iss": "https://container.googleapis.com/v1/projects/my-project/locations/us-central1/clusters/openai-wif",
  "aud": ["https://api.openai.com/v1"],
  "sub": "system:serviceaccount:default:openai-wif",
  "iat": 1716235422,
  "exp": 1716239022,
  "kubernetes.io": {
    "namespace": "default",
    "serviceaccount": {
      "name": "openai-wif",
      "uid": "11111111-2222-3333-4444-555555555555"
    }
  }
}
```

Use the decoded payload to compare the token you received with the issuer, audience, and mapping values configured in OpenAI. Most configuration issues are visible in the `iss`, `aud`, and `sub` claims before you exchange the token.

### Setting up workload identity federation

Create a Workload Identity Provider in OpenAI for the GKE issuer, then add a service account mapping that matches attributes from the projected token.

Configure the Workload Identity Provider first, then create the service account mapping.

#### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `google-gke-prod`. Use **Description**, such as `Production GKE cluster`, to help admins identify the cluster.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to the issuer returned by `kubectl get --raw /.well-known/openid-configuration | jq -r .issuer`. This value must match the `iss` claim in the projected GKE service account token. Set **Audience** to the same audience configured on the projected service account token volume. In this example, that value is `https://api.openai.com/v1`.

3. **Use GKE OIDC discovery.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses the GKE issuer's OIDC discovery metadata and JWKS to verify the projected service account token.

4. **Add attribute transformations if you need derived mapping attributes.** For example, enter `gke_subject` with expression `assertion.sub` to create `openai.gke_subject`. The dashboard applies the `openai.` prefix automatically. Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

#### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a unique value within the Workload Identity Provider, such as `default-openai-wif`. Use **Description**, such as `Default namespace GKE OpenAI API workload`, to explain which workload can use the mapping.

2. **Match the GKE service account subject.** Set **Key** to `sub` and **Value** to `system:serviceaccount:default:openai-wif`. For GKE service accounts, the subject format is `system:serviceaccount:<namespace>:<service-account-name>`.

3. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the GKE workload can use, such as `google-gke-prod-openai-wif`.

4. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

### Using the token in code

Configure your OpenAI SDK client to read the projected GKE service account token and exchange it for an OpenAI-issued access token.

Use the mounted token path, such as `/var/run/secrets/tokens/token`, as the subject token source for the SDK workload identity federation provider. The SDK exchanges that GKE token for an OpenAI-issued access token and uses the OpenAI token to authenticate API requests.

The following examples initialize an OpenAI client with a custom subject token provider. The provider reads the projected GKE service account token from the mounted file path and uses it as the subject token for workload identity federation.

</div>



## Google Cloud best practices

- Use dedicated Google service accounts for each workload. Avoid sharing service accounts across unrelated services or environments.
- Use workload identity flows instead of long-lived service account keys. Avoid distributing and rotating JSON key files for workloads that can use metadata-server identity tokens or GKE Workload Identity.
- Scope identities to the smallest practical workload boundary. Separate service accounts for individual applications provide clearer auditing and least-privilege access.
- Use attribute-based mappings carefully. Prefer stable identifiers such as service account subject claims over mutable metadata where possible.
- Separate production and non-production projects. Distinct projects reduce the risk of accidental privilege sharing and simplify auditing.
- Grant only required IAM permissions. Restrict the Google identity to only the permissions required for the workload.
- Monitor service account usage. Unexpected token exchanges may indicate configuration drift or compromised workloads.