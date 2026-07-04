The Google Gen AI SDK client libraries include automatic retry logic with exponential backoff for handling transient errors like timeouts, network issues, and rate limits (HTTP `429` and `5xx` status codes). For example, the Python SDK automatically retries transient errors up to four times with an initial delay of approximately 1 second and a maximum delay of 60 seconds. While the SDK handles this by default, you can configure this behavior to better suit your specific workload.

## Determining when to retry

Before implementing a custom retry strategy, consider how your endpoint selection, payment model, and workload affect your needs.

### Choose the right endpoint

- **Global endpoint**: Recommended for availability. The global endpoint routes traffic dynamically, which can reduce the need for client-side retries caused by regional capacity issues.
- **Regional endpoints**: Restricted to a specific location. If a region is overloaded, immediate retries may fail; consider failover strategies instead.

### Adjust for your payment model

- [**Standard pay-as-you-go**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo): Uses shared resources. Use exponential backoff to handle transient rate limit errors (429s) caused by traffic spikes.
- [**Flex pay-as-you-go**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/flex-paygo): Designed for lower-priority, slower processing. **Do not** retry aggressively; instead, increase your request timeout (for example, to 30 minutes) to give the system time to complete the task.
- [**Priority pay-as-you-go**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/priority-paygo): Designed for latency-sensitive, high-reliability workloads without the upfront commitment of Provisioned Throughput. If you receive a 429 error in this tier, retry with exponential backoff, but ensure you are not exceeding your quota.
- [**Provisioned Throughput**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput): Uses reserved capacity. Frequent errors usually indicate you have exceeded your purchased capacity, so adding retries may not solve the underlying issue.

### Define latency tolerance

- **Real-time** (for example, chat): Fail fast. Limit the number of retry attempts so users are not left waiting indefinitely for a response.
- **Batch Inference** : **Do not retry individual items.** The Batch service automatically handles retries for individual requests within the job to strive for a high completion rate. Your only responsibility is to successfully *submit* the job once. For more information, see [Batch prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-gemini).

## Identifying retryable errors

There are two primary factors that determine whether a request is safe to retry:

### Response

The error code or response received indicates whether the problem is transient or permanent. Responses related to transient problems are generally retryable. These include:

- **HTTP Codes** : `408` (Request Timeout), `429` (Too Many Requests), and `5xx` (Server Errors).
- **Network Issues**: Socket timeouts and TCP disconnects.

For more information, see [API errors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/api-errors).

> [!NOTE]
> **Note:** Permanent errors (e.g., `401` Authorization, `400` Bad Request) indicate issues with the request itself and shouldn't be retried without changes. `499` (Client Closed Request) typically means the client closed the connection before the server could respond. Check logs and increase client-side timeout.

### Idempotency

Idempotent requests can be executed repeatedly without changing the final state of the resource. Consider the following when determining idempotency:

- **Always idempotent**: List operations (they don't modify resources), get requests, token count requests, and embeddings requests.
- **Never idempotent**: Operations that create unique resources each time they succeed, such as creating a new tuned model.
- **Generative AI nuance** : While `generateContent` is not strictly idempotent due to the stochastic nature of generative models, it is generally safe to retry for transient errors as it does not modify server-side state.

## Configuring retries

The Google Gen AI SDK lets you configure retry behavior through client parameters or `HttpRetryOptions`.

### Key parameters

- **`initial_delay`** : The initial delay in seconds before the first retry (Default: `1.0`).
- **`attempts`** : The maximum number of retry attempts (Default: `5`).
- **`exp_base`** : The base for the exponential backoff calculation (Default: `2`).
- **`max_delay`** : The maximum delay in seconds between retries (Default: `60`).
- **`jitter`** : A factor to add a random delay to the backoff (Default: `1`).
- **`http_status_codes`**: A list of status codes that trigger a retry.

### Examples

### Client-level configuration

You can set options globally when initializing the client.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client(
        vertexai=True,
        project=PROJECT_ID,
        location="global",
        http_options=types.HttpOptions(
            retry_options=types.HttpRetryOptions(
                initial_delay=1.0,
                attempts=5,
                http_status_codes=[408, 429, 500, 502, 503, 504],
            ),
            timeout=120 * 1000,
        ),
    )

### Java

    import com.google.genai.Client;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.HttpRetryOptions;

    HttpOptions httpOptions = HttpOptions.builder()
      .retryOptions(
          HttpRetryOptions.builder()
              .attempts(5)
              .httpStatusCodes(408, 429, 500, 502, 503, 504).build())
      .build();

    Client client = Client.builder()
      .project(PROJECT_ID)
      .location("global")
      .vertexAI(true)
      .httpOptions(httpOptions)
      .build();

### Request-level configuration

You can also override settings for a single request using the `config` parameter.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client(vertexai=True, project=PROJECT_ID, location="global")

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents="Tell me a joke about a rabbit.",
        config=types.GenerateContentConfig(
            http_options=types.HttpOptions(
                retry_options=types.HttpRetryOptions(
                    initial_delay=1.0,
                    attempts=10,
                    http_status_codes=[408, 429, 500, 502, 503, 504],
                ),
                timeout=120 * 1000,
            )
        )
    )

### Flex Pay-as-you-go

For Flex Pay-as-you-go, the default timeout is 10 minutes due to slower processing and transparent retry. Users can increase this to 30 minutes for a better success rate.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client(
      vertexai=True, project=PROJECT_ID, location='global',
      http_options=types.HttpOptions(
        api_version="v1",
          headers={
            "X-Vertex-AI-LLM-Request-Type": "shared",
            "X-Vertex-AI-LLM-Shared-Request-Type": "flex" # Use Flex PayGo
          },
          timeout = 30 * 60 * 1000 # Increase to 30 minutes
      )
    )

## Best practices and anti-patterns

Whether you are using the default retry mechanisms, customizing them, or implementing your own retry logic, follow these best practices and avoid common anti-patterns.

### Best practices

- **Use exponential backoff**: Wait a short time before the first retry (for example, 1 second), then increase the delay exponentially (for example, 2s, 4s, 8s).
- **Add jitter**: Adding random "jitter" to the delay helps prevent all clients from retrying at the exact same time.
- **Retry on specific errors** : Only retry on transient errors (`429`, `408`, `5xx`).
- **Set maximum retries**: Define a maximum number of retry attempts to prevent infinite loops.
- **Monitor and log**: Log details about retry attempts, error types, and response times to debug your strategy.

### Retry anti-patterns

- **Retrying without backoff**: Retrying immediately can lead to cascading failures and overwhelm the service.
- **Retrying unretryable errors** : Do not retry client errors (`4xx` other than `429`/`408`) as they indicate issues like invalid API keys or bad syntax.
- **Unconditionally retrying non-idempotent operations**: Repeatedly executing operations that are not idempotent can lead to side effects, such as duplicate resources.
- **Ignoring retry limits**: Retrying indefinitely can lead to resource exhaustion; always set a maximum number of attempts.

## What's next

- [Configure retry options in a Colab](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/sdk/retries/configure_retries.ipynb).
- Learn more about [API errors](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/api-errors).
- Learn about [Quotas and system limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas).
- Learn about [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).
