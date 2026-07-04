This page lists the supported locations for Google agents and agent
infrastructure features (such as runtime, sessions, and memory banks)
in Gemini Enterprise Agent Platform.

To see supported locations for generative AI models on Agent Platform,
see [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).

Runtime, Sessions, Agent Platform Memory Bank, and Agent Gateway
are supported in the following zones, regions, and multi-regions. For more
information about regions and zones, see
[Geography and regions](https://docs.cloud.google.com/docs/geography-and-regions).

| Region | Location | Supported versions |
|---|---|---|
| `us-east1` | South Carolina | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `us-east4` | Northern Virginia | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `us-west1` | Oregon | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `us-central1` | Iowa | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-west1` | Belgium | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-west2` | London | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-west3` | Frankfurt | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-west4` | Netherlands | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-west6` | Zurich | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-west8` | Milan | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `europe-southwest1` | Madrid | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-east1` | Taiwan | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-east2†` | Hong Kong | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-northeast1` | Tokyo | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-northeast3†` | Seoul | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-south1` | Mumbai | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-southeast1` | Singapore | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `asia-southeast2\*†` | Jakarta | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `australia-southeast2\*` | Melbourne | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `me-west1` | Tel Aviv | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `northamerica-northeast1` | Montréal | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `northamerica-northeast2\*` | Toronto | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |
| `southamerica-east1` | São Paulo | `v1` is supported for GA features. `v1beta1` is supported for Preview features. |

^\*^Memory Bank is not supported in this region.
^†^Agent Gateway is not supported in this region.

For [Code Execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/code-execution-overview)
(Preview), the following regions are supported.

| Region | Location | Supported versions |
|---|---|---|
| `us-central1` | Iowa | `v1beta1` version is supported. |

## Multi-regional and global endpoints

Memory Bank and Sessions support multi-regional
and global endpoints. For global requests, set your location to `global`.
For multi-regional requests, set your location to `us` or `eu`.

> [!NOTE]
> **Note:** You can't use CMEK if your Memory Bank or Sessions is configured to use the global endpoint. Cloud Key Management Service requires encryption keys to reside within a fixed geographic data residency boundary. Because the global region lacks a physical geographic boundary, it is barred from encrypting localized regional or multi-regional resources.

### Supported agents

Usage of the global endpoint is supported for the following Google agents.

- [Gemini Deep Research Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/google/deep-research) (Preview)
