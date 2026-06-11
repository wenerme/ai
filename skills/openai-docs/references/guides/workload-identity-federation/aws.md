# Configuring workload identity federation for AWS

Use AWS as a Workload Identity Provider in either of these scenarios:

- **AWS outbound identity federation:** Exchange an AWS STS-issued OIDC JWT from `GetWebIdentityToken` for a short-lived OpenAI access token.
- **Amazon EKS:** Exchange a projected Amazon EKS service account token for a short-lived OpenAI access token.

OpenAI supports AWS-issued OIDC JWTs from outbound identity federation and
  Kubernetes projected service account tokens issued by Amazon EKS. OpenAI does
  not support SigV4-signed requests or AWS STS temporary access key credentials
  as workload identity federation subject tokens.



<div data-content-switcher-pane data-value="outbound">

## AWS outbound identity federation

AWS outbound identity federation lets an AWS principal request a signed OIDC JWT from AWS STS and present that token to an external service. In OpenAI workload identity federation, the AWS-issued JWT is the subject token that OpenAI validates before issuing an OpenAI access token.

### Setting up AWS outbound identity federation

Enable outbound identity federation for the AWS account that will issue tokens. For setup details, see the AWS guide to [getting started with outbound identity federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_outbound_getting_started.html).

```bash
aws iam enable-outbound-web-identity-federation
```

Record the account-specific issuer URL returned by AWS. You will configure this value as the OpenAI Workload Identity Provider issuer, and it must match the `iss` claim in AWS-issued tokens.

The AWS STS `GetWebIdentityToken` API is not available on the STS global
  endpoint. Configure the AWS CLI or SDK to use a regional STS endpoint.

Grant the workload permission to call `sts:GetWebIdentityToken`. Restrict the audience and maximum token lifetime in IAM so the AWS principal can mint only tokens intended for OpenAI. This example allows tokens for the audience `https://api.openai.com/v1` with a maximum lifetime of 300 seconds:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:GetWebIdentityToken",
      "Resource": "*",
      "Condition": {
        "ForAllValues:StringEquals": {
          "sts:IdentityTokenAudience": "https://api.openai.com/v1"
        },
        "NumericLessThanEquals": {
          "sts:DurationSeconds": 300
        }
      }
    }
  ]
}
```

Request an AWS-issued OIDC token with the same audience you will configure on the OpenAI Workload Identity Provider. Use `ES384` unless your environment requires `RS256` compatibility.

```bash
TOKEN=$(aws sts get-web-identity-token \
  --audience "https://api.openai.com/v1" \
  --signing-algorithm ES384 \
  --duration-seconds 300 \
  --tags Key=environment,Value=production \
         Key=workload,Value=batch-ingest \
  --query "WebIdentityToken" \
  --output text)
```

### Verify the AWS-issued token

Before configuring workload identity federation, decode a sample AWS-issued token locally and inspect its claims:

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

A decoded AWS-issued OIDC token will look similar to:

```json
{
  "iss": "https://abc123-def456-ghi789-jkl012.tokens.sts.global.api.aws",
  "aud": "https://api.openai.com/v1",
  "sub": "arn:aws:iam::123456789012:role/OpenAIWifRole",
  "iat": 1716235422,
  "exp": 1716235722,
  "jti": "jwt-id-example",
  "https://sts.amazonaws.com/": {
    "aws_account": "123456789012",
    "source_region": "us-west-2",
    "org_id": "o-exampleorgid",
    "principal_tags": {
      "environment": "production"
    },
    "request_tags": {
      "environment": "production",
      "workload": "batch-ingest"
    }
  }
}
```

Not every AWS-issued token contains every AWS-specific claim. The claims under `https://sts.amazonaws.com/` depend on the calling principal, session context, and request tags.

Verify the claims you plan to configure in OpenAI:

- `iss`: Must match the AWS account-specific issuer URL configured in the OpenAI Workload Identity Provider.
- `aud`: Must match the `GetWebIdentityToken` audience and the OpenAI Workload Identity Provider audience.
- `sub`: Identifies the IAM principal ARN that requested the token. Prefer matching the exact role ARN.
- AWS-specific claims: Use the decoded token as the source of truth before matching account, organization, principal tag, or request tag values.

Use the decoded payload to compare the token you received with the issuer, audience, and mapping values configured in OpenAI. Most configuration issues are visible in the `iss`, `aud`, and `sub` claims before you exchange the token.

### Setting up workload identity federation

Create a Workload Identity Provider in OpenAI for the AWS account issuer, then add a service account mapping that matches stable claims from the AWS-issued token.

Configure the Workload Identity Provider first, then create the service account mapping.

#### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `aws-outbound-prod`. Use **Description**, such as `Production AWS outbound identity federation workloads`, to help admins identify the provider.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to the AWS account-specific issuer URL returned when outbound identity federation was enabled. This value must match the token's `iss` claim. Set **Audience** to the same audience passed to `GetWebIdentityToken`. In this example, that value is `https://api.openai.com/v1`.

3. **Use AWS OIDC discovery.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses the AWS issuer's OIDC discovery metadata and JWKS to verify the AWS-issued token.

4. **Add attribute transformations only if you need derived mapping attributes.** Raw token matching supports top-level scalar claims such as `sub`, `aud`, and `iss`. AWS-specific namespaced claims are nested under `https://sts.amazonaws.com/`, so create derived attributes with CEL bracket notation before using them in mappings. For example, enter `aws_environment` with expression `assertion["https://sts.amazonaws.com/"]["principal_tags"]["environment"]` to create `openai.aws_environment` from the decoded token example above. Verify the nested claim path in a sample token before using it; if a transformation cannot be evaluated, mapping resolution fails. Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

#### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a value that is unique within the Workload Identity Provider, such as `aws-role-openai-wif`. Use **Description**, such as `Production AWS role for OpenAI API workload`, to explain which workload can use the mapping.

2. **Match the AWS principal.** Set **Key** to `sub` and **Value** to the IAM principal ARN from the decoded token, such as `arn:aws:iam::123456789012:role/OpenAIWifRole`. Matching on the exact `sub` claim provides the strongest isolation for AWS outbound identity federation.

3. **Add additional claim matches if needed.** You can match on any available scalar claim or transformed attribute. For example, use transformed attributes derived from AWS account, organization, principal tag, or request tag claims if you need additional trust boundaries.

4. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the AWS workload can use, such as `aws-outbound-prod-openai-wif`.

5. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

### Using the token in code

Configure your OpenAI SDK client to request an AWS-issued OIDC token from AWS STS and exchange it for an OpenAI-issued access token.

Set `OPENAI_WIF_AUDIENCE` to the same audience configured on the OpenAI Workload Identity Provider. The subject token provider calls AWS STS `GetWebIdentityToken` with that audience, returns the AWS-issued JWT as the subject token, and the OpenAI SDK exchanges it for an OpenAI-issued access token.

</div>

  <div data-content-switcher-pane data-value="eks" hidden>

## Amazon EKS projected service account tokens

Use Amazon EKS as a Workload Identity Provider by exchanging an EKS-issued projected service account token for a short-lived OpenAI access token.

### Setting up EKS

Use a Kubernetes `ServiceAccount` for the EKS workload that needs to call the OpenAI API. If you do not already have one, create it:

```bash
kubectl create serviceaccount openai-wif --namespace default
```

EKS projected service account tokens use a `sub` claim in the format `system:serviceaccount:<namespace>:<service-account-name>`. For the service account above, the `sub` claim is `system:serviceaccount:default:openai-wif`.

Retrieve the OIDC issuer URL associated with the EKS cluster:

```bash
aws eks describe-cluster \
  --name <cluster-name> \
  --region <region> \
  --query "cluster.identity.oidc.issuer" \
  --output text
```

Example output:

```text
https://oidc.eks.us-west-2.amazonaws.com/id/EXAMPLED539D4633E53DE1B716D3
```

The issuer you configure in the OpenAI Workload Identity Provider must match this issuer URL and the `iss` claim in the projected EKS service account token.

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
        - name: eks-sa-token
          mountPath: /var/run/secrets/tokens
          readOnly: true
  volumes:
    - name: eks-sa-token
      projected:
        sources:
          - serviceAccountToken:
              path: token
              audience: "https://api.openai.com/v1"
              expirationSeconds: 3600
```

### Verify the EKS token

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

A decoded EKS projected service account token will look similar to:

```json
{
  "iss": "https://oidc.eks.us-west-2.amazonaws.com/id/EXAMPLED539D4633E53DE1B716D3",
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

Create a Workload Identity Provider in OpenAI for the EKS issuer, then add a service account mapping that matches attributes from the projected token.

Configure the Workload Identity Provider first, then create the service account mapping.

#### Set up the Workload Identity Provider

1. **Create the Workload Identity Provider.** Set **Name** to a unique value, such as `aws-eks-prod`. Use **Description**, such as `Production EKS cluster`, to help admins identify the cluster.

2. **Set the issuer and audience.** Set **OIDC Issuer URL** to the issuer returned by `aws eks describe-cluster --query "cluster.identity.oidc.issuer"`. This value must match the `iss` claim in the projected EKS service account token. Set **Audience** to the same audience configured on the projected service account token volume. In this example, that value is `https://api.openai.com/v1`.

3. **Use EKS OIDC discovery.** Leave **Use uploaded JWKS for token verification** disabled. OpenAI uses the EKS issuer's OIDC discovery metadata and JWKS to verify the projected service account token.

4. **Add attribute transformations only if you need derived mapping attributes.** Raw token claims such as `sub`, `aud`, and `iss` can be used directly in mapping assertions. For example, create a transformed attribute named `subject` with expression `assertion.sub`. In the dashboard, enter `subject` as the attribute name; OpenAI stores it as `openai.subject`, which you can reference in mappings.

   > **Note:** Raw token claims that already start with `openai.` are ignored for `openai.` mapping keys unless a matching transformation is configured.

#### Set up the service account mapping

1. **Create a service account mapping.** Set **Name** to a unique value within the Workload Identity Provider, such as `openai-mapping-eks`. Use **Description**, such as `Workload Identity Provider Mapping for EKS Workloads`, to explain which workload can use the mapping.

2. **Match the EKS service account subject.** Set **Key** to `sub` and **Value** to `system:serviceaccount:default:openai-wif`. You can match on any available claim or transformed attribute. Matching on `sub` is the most restrictive option because it uniquely identifies a Kubernetes service account.

3. **Choose the OpenAI target.** Set **Project** to the OpenAI project that owns the target service account. Set **Service account** to the OpenAI service account the EKS workload can use, such as `aws-eks-prod-openai-wif`. Check `Create a new service account in this project` if you wish to create a new service account for this mapping rather than reuse an existing one.

4. **Narrow API permissions if needed.** Select appropriate **Permissions** such as `api.model.request` and `api.vector_store.read` to further narrow access tokens minted from this mapping. Leave permissions blank to avoid adding a WIF-specific scope restriction; the token still authorizes as the mapped service account.

### Using the token in code

Configure your OpenAI SDK client to read the projected EKS service account token and exchange it for an OpenAI-issued access token.

Use the mounted token path, such as `/var/run/secrets/tokens/token`, as the subject token source for the SDK workload identity federation provider. The SDK exchanges that EKS token for an OpenAI-issued access token and uses the OpenAI token to authenticate API requests.

The following examples initialize an OpenAI client with a custom subject token provider. The provider reads the projected EKS service account token from the mounted file path and uses it as the subject token for workload identity federation.

</div>



## AWS best practices

- Use a dedicated AWS identity per workload. Use separate IAM roles for AWS outbound identity federation and separate Kubernetes service accounts for EKS workloads.
- Configure a dedicated audience for OpenAI access. Use the same audience value in the AWS-issued or EKS projected token and in the OpenAI Workload Identity Provider configuration.
- Keep token lifetimes reasonably short. For AWS outbound identity federation, use IAM conditions such as `sts:DurationSeconds`; for EKS, set an appropriate projected token expiration.
- Prefer exact subject matching. Match on the full IAM principal ARN for AWS outbound tokens or the full Kubernetes service account subject for EKS tokens.
- Scope mappings to stable boundaries. Use account, organization, namespace, or transformed attributes when they reduce access without creating broad trust rules.
- Reload tokens when exchanging them. Request AWS outbound tokens when needed, and read EKS projected tokens from the mounted file path so rotated tokens are picked up automatically.
- Grant only the permissions required by the workload. Use mapping-level permissions to further narrow access granted by the target OpenAI service account.