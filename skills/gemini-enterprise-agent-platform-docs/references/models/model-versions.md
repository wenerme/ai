This document defines key terms related to the lifecycle stages and important dates for Gemini and embedding models that are available on Google Cloud Gemini Enterprise Agent Platform. It also gives you the recommended upgrades for the models and points you to available migration paths.

## Latest available models

The following tables list the available models and their retirement dates. While
retirement timelines may be extended, they won't be moved to an earlier date
than what is listed.

### Models available for at least 12 months after release

The following table lists the models that will be available for at least 12
months after initial release:

### Gemini models

| Model ID | Release date | Retirement date |
|---|---|---|
| `gemini-3.5-flash` | May 19, 2026 | Not before May 19, 2027 |
| `gemini-3.1-flash-lite` | May 7, 2026 | Not before May 7, 2027 |
| `gemini-live-2.5-flash-native-audio` | December 12, 2025 | December 13, 2026 |
| `gemini-2.5-pro` | June 17, 2025 | October 16, 2026 |
| `gemini-2.5-flash` | June 17, 2025 | October 16, 2026 |
| `gemini-2.5-flash-lite` | July 22, 2025 | October 16, 2026 |

### Gemini image models

| Model ID | Release date | Retirement date |
|---|---|---|
| `gemini-3.1-flash-image` | May 28, 2026 | Not before May 28, 2027 |
| `gemini-3-pro-image` | May 28, 2026 | Not before May 28, 2027 |
| `gemini-2.5-flash-image` | October 2, 2025 | October 2, 2026 |

### Veo models

| Model ID | Release date | Retirement date |
|---|---|---|
| `veo-3.1-generate-001` | November 17, 2025 | No retirement date announced |
| `veo-3.1-fast-generate-001` | November 17, 2025 | No retirement date announced |
| `veo-3.0-generate-001` | July 29, 2025 | June 30, 2026 |
| `veo-3.0-fast-generate-001` | July 29, 2025 | June 30, 2026 |
| `veo-2.0-generate-001` | May 27, 2025 | June 30, 2026 |

### Embeddings models

| Model ID | Release date | Retirement date |
|---|---|---|---|
| `gemini-embedding-001` | May 20, 2025 | No sooner than May 20, 2028 |
| `text-embedding-005` | November 18, 2024 | April 1, 2027 |
| `text-embedding-004` | May 14, 2024 | April 1, 2027 |   |
| `text-multilingual-embedding-002` | May 14, 2024 | April 1, 2027 |
| `multimodalembedding@001` | February 12, 2024 | April 1, 2027 |

### Models available for shorter availability periods

Short-term availability models retire 45 days after a replacement model is
released. The following table lists models available for shorter terms:

| Model ID | Release date | Retirement date | Replacement model |
|---|---|---|---|
| `gemini-3.1-flash-lite-image` | June 30, 2026 |   |   |

### Retired models

#### The following table lists the retired models (click to expand)

| Model ID | Release date | Retirement date | Recommended upgrade |
|---|---|---|---|
| `gemini-2.0-flash` | February 5, 2025 | June 1, 2026 | `gemini-3.1-flash-lite` |
| `gemini-2.0-flash-lite` | February 25, 2025 | June 1, 2026 | `gemini-3.1-flash-lite` |
| `gemini-1.5-pro-001` | May 24, 2024 | May 24, 2025 | `gemini-2.5-flash` |
| `gemini-1.5-pro-002` | September 24, 2024 | September 24, 2025 | `gemini-2.5-flash` |
| `gemini-1.5-flash-001` | May 24, 2024 | May 24, 2025 | `gemini-2.5-flash-lite` |
| `gemini-1.5-flash-002` | September 24, 2024 | September 24, 2025 | `gemini-2.5-flash-lite` |
| `textembedding-gecko@003\*` | December 12, 2023 | May 24, 2025 | `gemini-embedding-001` |
| `textembedding-gecko-multilingual@001` | November 2, 2023 | May 24, 2025 | `gemini-embedding-001` |
| `gemini-1.0-pro-001` | February 15, 2024 | April 21, 2025 | `gemini-2.5-flash` |
| `gemini-1.0-pro-002` | April 9, 2024 | April 21, 2025 | `gemini-2.5-flash` |
| `gemini-1.0-pro-vision-001` | February 15, 2024 | April 21, 2025 | `gemini-2.5-flash` |
| `text-bison` | May 2023 | April 21, 2025 | `gemini-2.5-flash-lite` |
| `chat-bison` | May 2023 | April 21, 2025 | `gemini-2.5-flash-lite` |
| `code-gecko` | May 2023 | April 21, 2025 | `gemini-2.5-flash-lite` |
| `textembedding-gecko@002` | November 2, 2023 | April 21, 2025 | `gemini-embedding-001` |
| `textembedding-gecko@001` | June 7, 2023 | April 21, 2025 | `gemini-embedding-001` |
| `imagetext` | June 7, 2023 | September 24, 2025 | `gemini-2.5-flash-image` |

## Migrate to a latest available model

To learn how to migrate to a latest stable model, see
[Migrate to the latest Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate).
This guide gives you a set of migration steps that aims to minimize some
potential risks involved in model migration and helps you use new models in an
optimal way.

However, if you don't have time to follow the guide and just need to quickly
resolve the errors caused by models reaching their retirement dates, do the following:

1. Update your application to point to the recommended upgrades.
2. Test all mission critical features to make sure everything works as expected.
3. Deploy the updates like you normally would.

## What's next

Resource

### [Deployment and endpoint locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations)

Learn about deployment and endpoint locations for models in Agent Platform.
