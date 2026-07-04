Standard pay-as-you-go (Standard PayGo) is a consumption option
for utilizing Gemini Enterprise Agent Platform's suite of generative AI models, including the
Gemini model family.
Standard PayGo lets you pay only for the resources that you
consume, without requiring upfront financial commitments. To provide more
predictable performance for scalable workloads, Standard PayGo
incorporates a usage tier system. Agent Platform dynamically adjusts
your organization's baseline throughput capacity, based on its total spend on
eligible Agent Platform services over a rolling 30-day period. As your
organization's spend grows, it's automatically promoted to higher tiers that
provide increased access to shared resources and higher performance thresholds.
For workloads requiring more consistent performance than
Standard PayGo, consider
[Priority PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/priority-paygo). For dedicated and
assured capacity, see
[Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput).

## Usage tiers and throughput

Each Standard PayGo usage tier aims to provide a Baseline Throughput, measured in tokens per
minute (TPM), which serves as a predictable performance floor for your
organization's traffic. The throughput limits are based on requests sent to the
global endpoint. Using the global endpoint is a best practice, as it provides
access to a larger, multi-region pool of throughput capacity and allows routing
of your requests to the location with the most availability to maximize
performance.

Your traffic isn't strictly capped at the Baseline Throughput limit.
Agent Platform lets traffic burst beyond this limit on a best-effort
basis. However, during periods of high demand across
Agent Platform, this excess burst traffic might have higher
variability in performance. To optimize performance and minimize the likelihood
of receiving these errors, it's also a best practice to smooth your traffic as
evenly as possible throughout each minute. Avoid sending requests in sharp,
second-level spikes. High and instantaneous traffic can lead to throttling even
if your average per-minute usage is below your limit. Distributing your API
calls more evenly helps the system manage your load predictably and improves
overall performance.

The following tiers are available in Standard PayGo:

| Model Family | Tier | Customer Spend (30 Days) | Traffic TPM (Org-Level) |
|---|---|---|---|
| **Gemini Pro models** | Tier 1 | $10 - $250 | 500,000 |
|   | Tier 2 | $250 - $2000 | 1,000,000 |
|   | Tier 3 | \> $2000 | 2,000,000 |
| **Gemini Flash and Flash-Lite models** | Tier 1 | $10 - $250 | 2,000,000 |
|   | Tier 2 | $250 - $2000 | 4,000,000 |
|   | Tier 3 | \> $2000 | 10,000,000 |

Note that the throughput limit shown for a model family applies independently to
each model within that family. For example, a customer in Tier 3 has a baseline
throughput of 10,000,000 TPM for Gemini 2.5 Flash and a separate
baseline of 10,000,000 TPM for Gemini 2.0 Flash. Usage against one of
these limits doesn't impact the throughput for other models. There's no
separate requests-per-minute (RPM) limit for each tier. However, the
[system limit of 30,000 RPM](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) per model per region
applies. Gemini requests with multimodal inputs are subject to
the corresponding system rate limits, including
[image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding),
[audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/audio-understanding),
[video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding), and
[document](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/document-understanding).

> [!NOTE]
> **Note:** For mission-critical workloads that require a strict Service Level Agreement (SLA) and can't tolerate performance variation or throttling, we recommend using [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput). Provisioned Throughput provides dedicated and assured capacity with improved performance and reliability.

## How usage tiers work

Your usage tier is automatically determined by your organization's total spend
on eligible Agent Platform services over a rolling 30-day period. As
your organization's spending increases, the system promotes you to a higher tier
with greater throughput.

### Spend calculation

This calculation includes a wide range of services, from predictions on all
Gemini model families to Agent Platform CPU, GPU, and
TPU instances, and also commitment-based SKUs, such as
Provisioned Throughput.

#### Click to learn more about the SKUs included in spend calculation.

The following table lists the categories of [Google Cloud SKUs](https://cloud.google.com/skus) that are included in the calculation of the total spend.

| Category | Description of included SKUs |
|---|---|
| **Gemini Models** | All Gemini model families (e.g., 2.0, 2.5, 3.0 in Pro, Flash, and Lite versions) for predictions across all modalities (Text, Image, Audio, Video), including batch, long-context, tuned, and "thinking" variations |
| **Gemini Model Features** | All related Gemini SKUs for features like Caching, Caching Storage, and Priority Tiers, across all modalities and model versions |
| **Agent Platform CPU** | Online and Batch Predictions on all CPU-based instance families (e.g., C2, C3, E2, N1, N2, and their variants) |
| **Agent Platform GPU** | Online and Batch Predictions on all NVIDIA GPU-accelerated instances (e.g., A100, H100, H200, B200, L4, T4, V100, and RTX series) |
| **Agent Platform TPU** | Online and Batch Predictions on all TPU-based instances (e.g., TPU-v5e, v6e) |
| **Management \& Fees** | All "Management fee" SKUs associated with various Agent Platform prediction instances |
| **Provisioned Throughput** | All commitment-based SKUs for Provisioned Throughput |
| **Other Services** | Specialized services such as "LLM Grounding for Gemini... with Google Search tool" |

### Verify usage tier

To verify the usage tier for your organization, go to the
Agent Platform Dashboard on the Google Cloud console.
To view the usage tier on the dashboard, you need the
[Agent Platform Viewer role](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.viewer)
(`roles/aiplatform.viewer`) on the project and the
[Billing Account Viewer role](https://docs.cloud.google.com/billing/docs/how-to/billing-access)
(`roles/billing.viewer`) on the billing account.

[Go to Agent Platform Dashboard](https://console.cloud.google.com/agent-platform/dashboard)

### Verify spend

To review your Agent Platform spend, go to Cloud Billing on the
Google Cloud console. Note that spend is aggregated at the organization level.

[Go to Cloud Billing](https://console.cloud.google.com/billing)

## Resource Exhausted (429) errors

If you receive a `429` error, it doesn't indicate that you've hit a fixed quota.
It indicates temporary high contention for a specific shared resource. We
recommend implementing an exponential backoff retry strategy to handle these
errors, as availability in this dynamic environment can change quickly. In
addition to a retry strategy, we recommend using the global endpoint. Unlike a
regional endpoint (for example, us-central1), the global endpoint dynamically
routes your requests to the region with the most available capacity at that
moment. This allows your application to access a larger, multi-region pool of
shared capacity, significantly increasing your potential for successful bursting
and reducing the likelihood of 429 errors.

For best results, combine the use of the global endpoint with traffic smoothing.
Avoid sending requests in sharp, second-level spikes, because high and
instantaneous traffic can lead to throttling, even if your average per-minute
usage is within your Baseline Throughput limit. Distributing your API calls more
evenly helps the system manage your load predictably and improves overall
performance. For additional information about how to handle Resource Exhaustion
errors, see
[Build Resilient LLM Applications and Reduce 429 Errors](https://cloud.google.com/blog/products/ai-machine-learning/reduce-429-errors-on-vertex-ai)
and [Error code 429](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/error-code-429).

## Supported models

The following [generally available (GA)](https://cloud.google.com/products#product-launch-stages) Gemini models and their
[supervised fine-tuned](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning) models
support [Standard PayGo with Usage Tiers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo#usage-tiers-and-throughput):

#### Click to expand supported models

- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

The following [GA](https://cloud.google.com/products#product-launch-stages)
Gemini models and their
[supervised fine-tuned](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning) models
also support Standard PayGo, but the usage tiers don't apply to
these models:

- [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)

Note that these tiers don't apply to preview models. Refer to the specific
official documentation of each model for the most accurate and up-to-date
information.

### Monitor throughput and performance

To monitor your organization's real-time token consumption, go to the
Metrics Explorer in Cloud Monitoring.

[Go to Metrics Explorer](https://console.cloud.google.com/monitoring/metrics-explorer)

For more information about monitoring model endpoint traffic, see
[Monitor models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-observability).

Note that usage tiers apply at an organization level. For information about
setting your observability scope to chart throughput across multiple projects in
your organization, see
[Configure observability scopes for multi-project queries](https://docs.cloud.google.com/stackdriver/docs/observability/scopes).

## What's next

Resource

### [Agent Platform quotas and limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas)

Quotas and limits related to the Agent Platform, excluding product-specific limitations.

Overview

### [Google Cloud quotas](https://docs.cloud.google.com/docs/quotas/overview)

Learn about how Google Cloud restricts how much of a resource your Google Cloud project can use, and how quotas apply to a range of resource types, including hardware, software, and network components.
