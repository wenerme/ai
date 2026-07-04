> [!NOTE]
> To see an example of using batch inference,
> run the "Intro to Batch Predictions with the Gemini API" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/batch-prediction/intro_batch_prediction.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fbatch-prediction%2Fintro_batch_prediction.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/batch-prediction/intro_batch_prediction.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/batch-prediction/intro_batch_prediction.ipynb)

Get asynchronous, high-throughput, and cost-effective inference for your
large-scale data processing needs with Gemini's batch inference (formerly known as batch prediction).
This guide walks you through the value of batch inference, how it works,
its limitations, and best practices for optimal results.

## Why use batch inference?

In many real-world scenarios, you don't need an immediate response from a
language model. Instead, you might have a large dataset of prompts that you need
to process efficiently and affordably. This is where batch inference shines.

**Key benefits include:**

- **Cost-Effectiveness:** Batch processing is offered at a 50% discounted rate compared to real-time inference, making it ideal for large-scale, non-urgent tasks. Implicit caching is enabled by default for Gemini 2.5 and Gemini 3 models. Implicit caching provides a 90% discount on cached tokens compared to standard input tokens. However, the discounts for cache and batch don't stack. The 90% cache hit discount takes precedence over the batch discount.
- **High rate limits**: Process hundreds of thousands of requests in a single batch with a higher rate limit compared to the real-time Gemini API.
- **Simplified Workflow** : Instead of managing a complex pipeline of individual real-time requests, you can submit a single batch job and retrieve the results once the processing is complete. The service handles format validation, parallelizes requests for concurrent processing, and automatically retries to strive for a high completion rate with **24 hours** turnaround time.

Batch inference is optimized for **large-scale processing tasks** like:

- **Content Generation:** Generate product descriptions, social media posts, or other creative text in bulk.
- **Data Annotation and Classification:** Classify user reviews, categorize documents, or perform sentiment analysis on a large corpus of text.
- **Offline Analysis:** Summarize articles, extract key information from reports, or translate documents at scale.

## Gemini models that support batch inference

The following base and tuned Gemini models support batch inference:

- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

## Global endpoint model support

Batch inference supports using the
[global endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#global-endpoint)
for base Gemini models. It doesn't support the global endpoint for
tuned Gemini models.

The global endpoint helps improve overall availability by serving your requests
from any region that's supported by the model that you're using. Note that it
doesn't support data residency requirements. If you have data residency
requirements, use the regional endpoints.

## Quotas and limits

While batch inference is powerful, it's important to be aware of the following
limitations.

- **Quota**: There are no predefined quota limits on your usage. Instead, batch service provides access to a large, shared pool of resources, dynamically allocated based on availability of resources and real-time demand across all customers of that model. When more customers are active and our capacity is saturated, your batch requests might be queued for capacity.
- **Queue Time**: When our service experiences high traffic, your batch job will queue for capacity. The job remains in queue for up to 72 hours before it expires.
- **Request Limits**: A single batch job may include up to 200,000 requests. If you are using Cloud Storage as input, there is also a file size limit of 1GB.
- **Processing Time**: Batch jobs are processed asynchronously and are not designed for real-time applications. Most jobs complete within 24 hours after it starts running (not counting the queue time). After 24 hours, incomplete jobs are cancelled, and you'll only be charged for completed requests.
- **Canceled jobs**: You can cancel batch inference jobs at any time. When you cancel a job, any remaining work is cancelled, and any already completed work is returned. You'll only be charged for the completed work.
- **Unsupported features** : Batch inference doesn't support [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput), [explicit caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview#explicit-caching) or [RAG](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview). Batch inference implicit caching isn't supported in Gemini 2.0 Flash or Gemini 2.0 Flash-Lite.
- **Image output**: Batch inference is limited to the default 1K resolution. 2K and 4K outputs are not supported.

> [!NOTE]
> **Note:** Batch inference is not a [Covered Service](https://cloud.google.com/vertex-ai/sla) and is excluded from the Service Level Objective (SLO) of any Service Level Agreement (SLA).

## Best practices

To get the most out of batch inference with Gemini, we recommend the following
best practices:

- **Combine jobs:** To maximize throughput, combine smaller jobs into one large job, within system limits. For example, submitting one batch job with 200,000 requests will give you better throughput than 1000 jobs with 200 requests each.
- **Monitor Job Status:** You can monitor job progress using the API, SDK, or UI. For more information, see [monitor the job status](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-from-cloud-storage#monitor). If a job fails, check the error messages to diagnose and troubleshoot the issue.
- **Optimize for Cost:** Take advantage of the cost savings offered by batch processing for any tasks that don't require an immediate response.

## What's next

- [Create a batch job with Cloud Storage](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-from-cloud-storage)
- [Create a batch job with BigQuery](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-from-bigquery)
