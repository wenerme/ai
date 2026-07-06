> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityDestination - TypeScript SDK

> ObservabilityDestination type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ObservabilityArizeDestination`

```typescript lines theme={null}
const value: models.ObservabilityArizeDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    modelId: "<id>",
    spaceKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "arize",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityBraintrustDestination`

```typescript lines theme={null}
const value: models.ObservabilityBraintrustDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    projectId: "<id>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "braintrust",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityClickhouseDestination`

```typescript lines theme={null}
const value: models.ObservabilityClickhouseDestination = {
  apiKeyHashes: null,
  config: {
    database: "<value>",
    host: "short-term-netsuke.name",
    password: "2n5DRy2kH2HJZi1",
    username: "Marley28",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "clickhouse",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityDatadogDestination`

```typescript lines theme={null}
const value: models.ObservabilityDatadogDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    mlApp: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "datadog",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityGrafanaDestination`

```typescript lines theme={null}
const value: models.ObservabilityGrafanaDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    instanceId: "<id>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "grafana",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityLangfuseDestination`

```typescript lines theme={null}
const value: models.ObservabilityLangfuseDestination = {
  apiKeyHashes: null,
  config: {
    publicKey: "pk-l...EfGh",
    secretKey: "sk-l...AbCd",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "langfuse",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityLangsmithDestination`

```typescript lines theme={null}
const value: models.ObservabilityLangsmithDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "langsmith",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityNewrelicDestination`

```typescript lines theme={null}
const value: models.ObservabilityNewrelicDestination = {
  apiKeyHashes: null,
  config: {
    licenseKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "newrelic",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityOpikDestination`

```typescript lines theme={null}
const value: models.ObservabilityOpikDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    projectName: "<value>",
    workspace: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "opik",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityOtelCollectorDestination`

```typescript lines theme={null}
const value: models.ObservabilityOtelCollectorDestination = {
  apiKeyHashes: null,
  config: {
    endpoint: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "otel-collector",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityPosthogDestination`

```typescript lines theme={null}
const value: models.ObservabilityPosthogDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "posthog",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityRampDestination`

```typescript lines theme={null}
const value: models.ObservabilityRampDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "ramp",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityS3Destination`

```typescript lines theme={null}
const value: models.ObservabilityS3Destination = {
  apiKeyHashes: null,
  config: {
    accessKeyId: "<id>",
    bucketName: "<value>",
    secretAccessKey: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "s3",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilitySentryDestination`

```typescript lines theme={null}
const value: models.ObservabilitySentryDestination = {
  apiKeyHashes: null,
  config: {
    dsn: "<value>",
    otlpEndpoint: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "sentry",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilitySnowflakeDestination`

```typescript lines theme={null}
const value: models.ObservabilitySnowflakeDestination = {
  apiKeyHashes: null,
  config: {
    account: "74782436",
    token: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "snowflake",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityWeaveDestination`

```typescript lines theme={null}
const value: models.ObservabilityWeaveDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    entity: "<value>",
    project: "<value>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "weave",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

### `models.ObservabilityWebhookDestination`

```typescript lines theme={null}
const value: models.ObservabilityWebhookDestination = {
  apiKeyHashes: null,
  config: {
    url: "https://waterlogged-fork.com/",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "webhook",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```
