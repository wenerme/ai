> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# BYOK

## Bring your own API Keys

OpenRouter supports both OpenRouter credits and the option to bring your own provider keys (BYOK).

When you use OpenRouter credits, your rate limits for each provider are managed by OpenRouter.

Using provider keys enables direct control over rate limits and costs via your provider account.

Your provider keys are securely encrypted and used for all requests routed through the specified provider.

Manage keys in your [workspace BYOK settings](/workspaces/default/byok).

The cost of using custom provider keys on OpenRouter is **{bn(openRouterBYOKFee.fraction).times(100).toString()}% of what the same model/provider would cost normally on OpenRouter** and will be deducted from your OpenRouter credits.
This fee is waived for the first {toHumanNumber(BYOK_FEE_MONTHLY_REQUEST_THRESHOLD)} BYOK requests per-month.

### Key Priority and Fallback

OpenRouter always prioritizes using your provider keys when available. By default, if your key encounters a rate limit or failure, OpenRouter will fall back to using shared OpenRouter credits.

You can toggle **"Always use for this provider"** on individual keys to prevent any fallback to OpenRouter credits. When enabled, OpenRouter will only use your keys for requests to that provider, which may result in rate limit errors if your keys are exhausted, but ensures all requests go through your account.

When you have multiple keys for the same provider, OpenRouter tries them in priority order (see [Multiple BYOK Keys](#multiple-byok-keys-for-the-same-provider)). If the first key fails, it falls through to the next matching key before falling back to shared capacity.

### BYOK with Provider Ordering

When you combine BYOK keys with [provider ordering](/docs/guides/routing/provider-selection#ordering-specific-providers), OpenRouter **always prioritizes BYOK endpoints first**, regardless of where that provider appears in your specified order. After all BYOK endpoints are exhausted, OpenRouter falls back to shared capacity in the order you specified.

This means BYOK keys effectively override your provider ordering for the initial routing attempts. There is currently no way to change this behavior.

For example, if you have BYOK keys for Amazon Bedrock, Google Vertex AI, and Anthropic, and you send a request with:

```json
{
  "provider": {
    "allow_fallbacks": true,
    "order": ["amazon-bedrock", "google-vertex", "anthropic"]
  }
}
```

The routing order will be:

1. Amazon Bedrock (your BYOK key)
2. Google Vertex AI (your BYOK key)
3. Anthropic (your BYOK key)
4. Amazon Bedrock (OpenRouter's shared capacity)
5. Google Vertex AI (OpenRouter's shared capacity)
6. Anthropic (OpenRouter's shared capacity)

#### Partial BYOK with Provider Ordering

If you only have a BYOK key for some of the providers in your order, the BYOK provider is still tried first. For example, if you specify `order: ["amazon-bedrock", "google-vertex"]` but only have a BYOK key for Google Vertex AI:

```json
{
  "provider": {
    "allow_fallbacks": true,
    "order": ["amazon-bedrock", "google-vertex"]
  }
}
```

The routing order will be:

1. Google Vertex AI (your BYOK key)
2. Amazon Bedrock (OpenRouter's shared capacity)
3. Google Vertex AI (OpenRouter's shared capacity)

Note that even though Amazon Bedrock is listed first in the `order` array, the Google Vertex AI BYOK endpoint takes priority.

If you want to prevent fallback to OpenRouter's shared capacity entirely, enable **"Always use for this provider"** on your BYOK keys in your [workspace BYOK settings](/workspaces/default/byok).

### Multiple BYOK Keys for the Same Provider

You can configure multiple BYOK keys for the same provider. All matching keys are used for routing, and each key produces its own endpoint copy that is pinned to that specific key throughout the request lifecycle.

#### Priority Order

Keys are tried in the priority order you define. You can reorder keys via drag-and-drop on the provider detail page (e.g. [/workspaces/default/byok/openai](/workspaces/default/byok/openai)) — the key at the top of the list is tried first. When a key fails (e.g. rate limit or error), OpenRouter falls through to the next matching key before falling back to shared capacity.

For example, if you have two OpenAI keys ordered as:

1. **Production key** (priority 1)
2. **Backup key** (priority 2)

OpenRouter will try the production key first, then the backup key, and finally shared capacity (unless "Always use for this provider" is enabled).

#### Key Filters

Each BYOK key supports optional filters to control when it is used:

* **Model filter** — Restrict the key to specific models (e.g. only use this key for `openai/gpt-4o`). When set, the key is only used for requests to the listed models. Other models for the same provider will skip this key.
* **API key filter** — Restrict which of your OpenRouter API keys can use this BYOK key. Useful for isolating BYOK usage to specific applications or environments.
* **Member filter** — Restrict which workspace members can use this BYOK key. Useful for giving different team members access to different provider accounts.

Filters are evaluated before routing. A key is only used when all of its active filters match the current request. If no filters are set, the key is available to all models, API keys, and members.

#### Combining Filters with Multiple Keys

Filters and multiple keys work together to enable flexible routing strategies. For example:

* **Key A**: OpenAI, model filter = `[openai/gpt-4o]`, "Always use for this provider" enabled
* **Key B**: OpenAI, no model filter (matches all models)

In this setup:

* Requests for `openai/gpt-4o` try **Key A** first, then **Key B** if Key A fails (shared capacity is skipped because "Always use for this provider" is enabled on Key A)
* Requests for other OpenAI models (e.g. `openai/gpt-4o-mini`) use **Key B** only, with shared capacity as fallback

#### Key Names

Each key can be given an optional name (e.g. "Production", "Team A", "GPT-4 only") to help organize keys when you have multiple keys for the same provider.

### Azure API Keys

Azure has two resource types, each using a different domain:

* **Azure AI Foundry** — resources at `*.services.ai.azure.com`. Uses the model catalog and does not require per-model deployments.
* **Azure OpenAI** — resources at `*.openai.azure.com`. Requires explicit per-model deployments.

#### Foundry Configuration (Recommended)

The simplest way to configure Azure BYOK is with a Foundry configuration. Provide your API key, resource name, and resource type:

```json
[
  {
    "api_key": "your-azure-api-key",
    "resource_name": "your-resource-name",
    "resource_type": "ai_foundry"
  }
]
```

* **`api_key`**: Your Azure API key, found under "Keys and Endpoint" in the Azure portal.
* **`resource_name`**: The name of your Azure resource (the subdomain portion of your endpoint URL).
* **`resource_type`**: Either `"ai_foundry"` for Azure AI Foundry resources (`*.services.ai.azure.com`) or `"openai"` for Azure OpenAI resources (`*.openai.azure.com`). Defaults to `"openai"` if omitted.

This configuration works for all models available in your Azure resource — no per-model setup required.

#### Per-Deployment Configuration (Legacy)

For more control, you can specify individual deployments with full endpoint URLs:

```json
[
  {
    "model_slug": "mistralai/mistral-large",
    "endpoint_url": "https://example-project.openai.azure.com/openai/deployments/mistral-large/chat/completions?api-version=2024-08-01-preview",
    "api_key": "your-azure-api-key",
    "model_id": "mistral-large"
  },
  {
    "model_slug": "openai/gpt-5.2",
    "endpoint_url": "https://example-project.openai.azure.com/openai/deployments/gpt-5.2/chat/completions?api-version=2024-08-01-preview",
    "api_key": "your-azure-api-key",
    "model_id": "gpt-5.2"
  }
]
```

Each per-deployment configuration requires:

1. **`endpoint_url`**: The full deployment endpoint URL including `/chat/completions` and the API version. See the [Azure Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/model-inference/concepts/endpoints?tabs=python) for details.
2. **`api_key`**: Your Azure API key.
3. **`model_id`**: The name of your model deployment in Azure.
4. **`model_slug`**: The OpenRouter model identifier you want to use this key for.

You can mix Foundry and per-deployment configurations in the same array. Per-deployment configs take priority when a matching model slug is found.

### AWS Bedrock API Keys

To use Amazon Bedrock with OpenRouter, you can authenticate using either Bedrock API keys or traditional AWS credentials.

#### Option 1: Bedrock API Keys (Recommended)

Amazon Bedrock API keys provide a simpler authentication method. Simply provide your Bedrock API key as a string:

```
your-bedrock-api-key-here
```

**Note:** Bedrock API keys are tied to a specific AWS region and cannot be used to change regions. If you need to use models in different regions, use the AWS credentials option below.

You can generate Bedrock API keys in the AWS Management Console. Learn more in the [Amazon Bedrock API keys documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys.html).

#### Option 2: AWS Credentials

Alternatively, you can use traditional AWS credentials in JSON format. This option allows you to specify the region and provides more flexibility:

```json
{
  "accessKeyId": "your-aws-access-key-id",
  "secretAccessKey": "your-aws-secret-access-key",
  "region": "your-aws-region"
}
```

You can find these values in your AWS account:

1. **accessKeyId**: This is your AWS Access Key ID. You can create or find your access keys in the AWS Management Console under "Security Credentials" in your AWS account.

2. **secretAccessKey**: This is your AWS Secret Access Key, which is provided when you create an access key.

3. **region**: The AWS region where your Amazon Bedrock models are deployed (e.g., "us-east-1", "us-west-2").

Make sure your AWS IAM user or role has the necessary permissions to access Amazon Bedrock services. At minimum, you'll need permissions for:

* `bedrock:InvokeModel`
* `bedrock:InvokeModelWithResponseStream` (for streaming responses)

Example IAM policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    }
  ]
}
```

For enhanced security, we recommend creating dedicated IAM users with limited permissions specifically for use with OpenRouter.

Learn more in the [AWS Bedrock Getting Started with the API](https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started-api.html) documentation, [IAM Permissions Setup](https://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html) guide, or the [AWS Bedrock API Reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html).

### Google Vertex API Keys

To use Google Vertex AI with OpenRouter, you'll need to provide your Google Cloud service account key in JSON format. The service account key should include all standard Google Cloud service account fields, with an optional `region` field for specifying the deployment region.

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account@your-project.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
  "region": "global"
}
```

You can find these values in your Google Cloud Console:

1. **Service Account Key**: Navigate to the Google Cloud Console, go to "IAM & Admin" > "Service Accounts", select your service account, and create/download a JSON key.

2. **region** (optional): Specify the region for your Vertex AI deployment. Use `"global"` to allow requests to run in any available region, or specify a specific region like `"us-central1"` or `"europe-west1"`.

Make sure your service account has the necessary permissions to access Vertex AI services:

* `aiplatform.endpoints.predict`

Example IAM policy:

```json
{
  "bindings": [
    {
      "role": "roles/aiplatform.user",
      "members": [
        "serviceAccount:your-service-account@your-project.iam.gserviceaccount.com"
      ]
    }
  ]
}
```

Learn more in the [Google Cloud Vertex AI documentation](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform) and [Service Account setup guide](https://cloud.google.com/iam/docs/service-accounts-create).

### Debugging BYOK Issues

If your BYOK requests fail, you can debug the issue by viewing provider responses on the Activity page.

#### Viewing Provider Responses

1. Navigate to your [Activity page](https://openrouter.ai/activity) in the OpenRouter dashboard.
2. Find the generation you want to debug and click on it to view the details.
3. Click "View Raw Metadata" to display the raw metadata in JSON format.
4. In the JSON, look for the `provider_responses` field, which shows the HTTP status code from each provider attempt.

The `provider_responses` field contains an array of responses from each provider attempted during routing. Each entry includes the provider name and HTTP status code, which can help you identify permission issues, rate limits, or other errors.

#### Common BYOK Error Codes

When debugging BYOK issues, look for these common HTTP status codes in the provider responses:

* **400 Bad Request**: The request format was invalid for the provider. Check that your model and key configuration is correct.
* **401 Unauthorized**: Your API key is invalid or has been revoked. Verify your key in your provider's console.
* **403 Forbidden**: Your API key doesn't have permission to access the requested resource. For AWS Bedrock, ensure your IAM policy includes the required `bedrock:InvokeModel` permissions. For Google Vertex, verify your service account has `aiplatform.endpoints.predict` permissions.
* **429 Too Many Requests**: You've hit the rate limit on your provider account. Check your provider's rate limit settings or wait before retrying.
* **500 Server Error**: The provider encountered an internal error. This is typically a temporary issue on the provider's side.

#### Debugging Permission Issues

If you encounter 403 errors with BYOK, the issue is often related to permissions. For AWS Bedrock, verify that:

1. Your IAM user/role has the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` permissions.
2. The model you're trying to access is enabled in your AWS account for the specified region.
3. Your credentials (access key and secret) are correct and active.

For Google Vertex, verify that your service account has `aiplatform.endpoints.predict` permissions.

You can test your provider permissions directly in the provider's console (AWS Console, Google Cloud Console, etc.) by attempting to invoke the model there first.