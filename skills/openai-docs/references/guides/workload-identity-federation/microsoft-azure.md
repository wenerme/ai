# Configuring workload identity federation for Microsoft Azure

Use Microsoft Azure as a Workload Identity Provider in either of these scenarios:

- **Azure managed identity:** Exchange a Microsoft Entra ID access token issued for a managed identity for a short-lived OpenAI access token.
- **AKS:** Exchange a projected Azure Kubernetes Service (AKS) service account token for a short-lived OpenAI access token.



<div data-content-switcher-pane data-value="managed-identity">

## Azure managed identity

Azure managed identities let Azure-hosted workloads request Microsoft Entra tokens without storing long-lived secrets. In OpenAI workload identity federation, the managed identity token is the subject token that OpenAI validates before issuing an OpenAI access token.

### Setting up Azure managed identity

Create or use a Microsoft Entra application registration that represents the token audience OpenAI should trust. Configure its **Application ID URI**; this URI is the `resource` value your workload requests from Azure Instance Metadata Service (IMDS), and it appears as the `aud` claim in the issued token. For the Microsoft setup steps, see the Microsoft Entra guide to [create a new Entra ID application and service principal](https://learn.microsoft.com/en-au/entra/identity-platform/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal).

The Application ID URI configured in Microsoft Entra ID, the IMDS `resource`
  parameter, the resulting token's `aud` claim, and the OpenAI Workload Identity
  Provider audience must all match.

[Create](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/manage-user-assigned-managed-identities-azure-portal?pivots=identity-mi-methods-azp) a managed identity, then [assign](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm#user-assigned-managed-identity) that managed identity to the Azure resource running your application, such as a virtual machine. The resource must be able to call IMDS at runtime. For Azure setup details, see Microsoft's [managed identities overview](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) and the relevant Azure resource documentation for assigning the identity.

### Getting an Azure managed identity token

From the Azure resource with the managed identity assigned, request a token from IMDS with the Application ID URI as the `resource` parameter. This token is the subject token that OpenAI exchanges for an OpenAI-issued access token.

```bash
APPLICATION_ID_URI="api://<application-client-id>"

TOKEN=$(curl -sS -G -H "Metadata: true" \
  "http://169.254.169.254/metadata/identity/oauth2/token" \
  --data-urlencode "api-version=2018-02-01" \
  --data-urlencode "resource=${APPLICATION_ID_URI}" \
  | jq -r .access_token)
```

If the resource has multiple user-assigned managed identities, add the `client_id`, `object_id`, or `msi_res_id` query parameter for the managed identity you want to use. Microsoft documents the IMDS token request parameters in [Use managed identities on a virtual machine to acquire access token](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token).

### Verify the token

Before configuring workload identity federation, decode a sample token locally and inspect its claims:

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

A decoded Microsoft Entra ID managed identity token will look similar to:

```json
{
  "iss": "https://login.microsoftonline.com/11111111-2222-3333-4444-555555555555/v2.0",
  "aud": "api://00000000-1111-2222-3333-444444444444",
  "tid": "11111111-2222-3333-4444-555555555555",
  "appid": "22222222-3333-4444-5555-666666666666",
  "oid": "33333333-4444-5555-6666-777777777777",
  "sub": "33333333-4444-5555-6666-777777777777",
  "xms_mirid": "/subscriptions/<subscription-id>/resourcegroups/my-resource-group/providers/Microsoft.Compute/virtualMachines/openai-wif-vm",
  "iat": 1716235422,
  "exp": 1716239022
}
```

Verify the claims you plan to configure in OpenAI:

- `iss`: Use the exact issuer value from the token. The issuer may be `https://login.microsoftonline.com/<tenant-id>/v2.0`, but do not assume that suffix.
- `aud`: Must match the Application ID URI, the IMDS `resource` parameter, and the OpenAI Workload Identity Provider audience.
- `tid`: The Microsoft Entra tenant ID.
- `appid`: The managed identity's application/client ID, when present.

Managed identity tokens can also contain claims such as `azp`, `oid`, `sub`, or `xms_mirid`. Use the decoded token as the source of truth, and choose claims that identify the exact managed identity and resource boundary you trust.

Use the decoded payload to compare the token you received with the issuer, audience, and mapping values configured in OpenAI. Most configuration issues are visible in the `iss`, `aud`, `tid`, and managed identity claims before you exchange the token.

### Setting up workload identity federation

Create a Workload Identity Provider in OpenAI for the Microsoft Entra ID issuer, then add a service account mapping that matches stable claims from the managed identity token.

Configure the Workload Identity Provider first, then create the service account mapping.

#### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `azure-managed-identity-prod`. Use **Description**, such as `Production Azure managed identity workloads`, to help admins identify the provider.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to the exact value of the token's `iss` claim. Obtain a sample managed identity token and inspect its claims first. For example, the issuer may be `https://login.microsoftonline.com/<tenant-id>/v2.0`. Set **Audience** to the Microsoft Entra Application ID URI you configured, such as `api://<application-client-id>`. This value must match the token's `aud` claim.

3. **Use Microsoft Entra token verification.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses Microsoft Entra issuer metadata and JWKS to verify the managed identity token.

4. **Add attribute transformations if you need derived mapping attributes.** For example, enter `managed_identity_client_id` with expression `assertion.appid` to create `openai.managed_identity_client_id` from the managed identity application/client ID claim. The dashboard applies the `openai.` prefix automatically. Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

#### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a value that is unique within that Workload Identity Provider, such as `vm-openai-wif`. Use **Description**, such as `Production VM Azure managed identity workload`, to explain which workload can use the mapping.

2. **Match stable managed identity claims.** Add one **Key** and **Value** row for each claim that must match. If the token contains `appid`, set **Key** to `appid` and **Value** to the managed identity client ID. The `appid` claim identifies the managed identity's application/client ID and is generally the most stable claim for binding a mapping to a specific managed identity. If your token does not contain `appid`, use another stable claim from the decoded token, such as `azp`, `oid`, `sub`, or `xms_mirid`. To bind the mapping to one tenant, also set **Key** to `tid` and **Value** to the Microsoft Entra tenant ID. Decode a sample token from IMDS and use claims that are stable for the managed identity and resource you trust.

3. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the Azure workload can use, such as `azure-managed-identity-prod-openai-wif`.

4. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

### Using the token in code

Configure your OpenAI SDK client to request an Azure managed identity token from IMDS and exchange it for an OpenAI-issued access token.

Set `OPENAI_WIF_AUDIENCE` to the Microsoft Entra Application ID URI configured as the Workload Identity Provider audience. The SDK requests a managed identity token for that audience, exchanges it for an OpenAI-issued access token, and uses the OpenAI token to authenticate API requests.

</div>

  <div data-content-switcher-pane data-value="aks" hidden>

## Azure Kubernetes Service (AKS)

Use AKS as a Workload Identity Provider by exchanging an AKS-issued projected service account token for a short-lived OpenAI access token.

AKS workloads can also use Azure Workload Identity to obtain a Microsoft Entra
  ID access token for a managed identity attached to the workload. In that
  configuration, OpenAI validates the Microsoft Entra token rather than the
  projected Kubernetes service account token. Configure OpenAI workload identity
  federation using the steps in [Azure managed
  identity](#azure-managed-identity), and configure Azure Workload Identity
  according to Microsoft's documentation.

### Setting up AKS

Retrieve the OIDC issuer URL associated with the AKS cluster:

```bash
az aks show \
  --name <cluster-name> \
  --resource-group <resource-group> \
  --query "oidcIssuerProfile.issuerUrl" \
  --output tsv
```

If the issuer URL is empty, enable the AKS OIDC issuer for the cluster. Use the following command:

```bash
az aks update \
    --resource-group <resource-group> \
    --name <cluster-name> \
    --enable-oidc-issuer
```

The issuer you configure in the OpenAI Workload Identity Provider must match this issuer URL and the `iss` claim in the projected AKS service account token.

Use a Kubernetes `ServiceAccount` for the AKS workload that needs to call the OpenAI API. If you do not already have one, create it:

```bash
kubectl create serviceaccount openai-wif --namespace default
```

Configure the projected service account token with the audience OpenAI expects and an expiration suitable for your workload. OpenAI validates the token's issuer, signature, audience, and expiration. In this example, the token file is mounted at `/var/run/secrets/tokens/token`, uses the audience `https://api.openai.com/v1`, and expires after 3600 seconds. You may use a different audience if the projected token audience and OpenAI Workload Identity Provider audience match.

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
        - name: aks-sa-token
          mountPath: /var/run/secrets/tokens
          readOnly: true
  volumes:
    - name: aks-sa-token
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

A decoded AKS projected service account token will look similar to:

```json
{
  "iss": "https://eastus.oic.prod-aks.azure.com/11111111-2222-3333-4444-555555555555/22222222-3333-4444-5555-666666666666/",
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

Verify the claims you plan to configure in OpenAI:

- `iss`: Must match the AKS issuer URL configured in the OpenAI Workload Identity Provider.
- `aud`: Must match the projected service account token audience and the OpenAI Workload Identity Provider audience.
- `sub`: Must match the Kubernetes service account subject you configure in the service account mapping.

Use the decoded payload to compare the token you received with the issuer, audience, and mapping values configured in OpenAI. Most configuration issues are visible in the `iss`, `aud`, and `sub` claims before you exchange the token.

### Setting up workload identity federation

Create a Workload Identity Provider in OpenAI for the AKS issuer, then add a service account mapping that matches attributes from the projected token.

Configure the Workload Identity Provider first, then create the service account mapping.

#### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `azure-aks-prod`. Use **Description**, such as `Production AKS cluster`, to help admins identify the cluster.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to the issuer returned by `az aks show --query "oidcIssuerProfile.issuerUrl"`. This value must match the `iss` claim in the projected AKS service account token. Set **Audience** to the same audience configured on the projected service account token volume. In this example, that value is `https://api.openai.com/v1`.

3. **Use AKS OIDC discovery.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses the AKS issuer's OIDC discovery metadata and JWKS to verify the projected service account token.

4. **Add attribute transformations if you need derived mapping attributes.** For example, enter `aks_subject` with expression `assertion.sub` to create `openai.aks_subject`. The dashboard applies the `openai.` prefix automatically. Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

#### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a value that is unique within that Workload Identity Provider, such as `default-openai-wif`. Use **Description**, such as `Default namespace AKS OpenAI API workload`, to explain which workload can use the mapping.

2. **Match the AKS service account subject.** Set **Key** to `sub` and **Value** to `system:serviceaccount:default:openai-wif`. For AKS service accounts, the subject format is `system:serviceaccount:<namespace>:<service-account-name>`.

   The Workload Identity Provider restricts tokens to the configured AKS issuer. The service account mapping further restricts access to the specified Kubernetes service account subject.

3. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the AKS workload can use, such as `azure-aks-prod-openai-wif`.

4. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

### Using the token in code

Configure your OpenAI SDK client to read the projected AKS service account token and exchange it for an OpenAI-issued access token.

Use the mounted token path, such as `/var/run/secrets/tokens/token`, as the subject token source for the SDK workload identity federation provider. The SDK exchanges that AKS token for an OpenAI-issued access token and uses the OpenAI token to authenticate API requests.

The following examples initialize an OpenAI client with a custom subject token provider. The provider reads the projected AKS service account token from the mounted file path and uses it as the subject token for workload identity federation.

</div>



## Microsoft Azure best practices

- Use managed identities whenever possible. Managed identities provide a simpler and more secure authentication model than distributing credentials manually.
- Use separate managed identities, Microsoft Entra applications, and OpenAI mappings for different applications and environments. Avoid sharing one identity across development, staging, and production workloads.
- Restrict accepted audiences. Configure only the audiences required for OpenAI workload identity federation.
- Use dedicated Microsoft Entra ID applications for security boundaries. Separate applications provide clearer ownership, auditing, and access management.
- Prefer workload-specific mappings. Match on workload-specific claims rather than broad tenant-wide attributes.
- Review federated credential configurations regularly. Stale federated credentials can unintentionally continue granting access long after workloads are retired.
- Separate production and non-production identities. Production workloads should authenticate through distinct federated identities and OpenAI service accounts.