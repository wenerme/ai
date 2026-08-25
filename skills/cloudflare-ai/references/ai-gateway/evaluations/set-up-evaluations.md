---
description: Create datasets, select evaluators, and run evaluations for your AI Gateway logs.
title: Set up Evaluations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up Evaluations

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deprecated

Evaluations are deprecated and no longer supported for new accounts.

This guide walks you through the process of setting up an evaluation in AI Gateway. These steps are done in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

## 1\. Select or create a dataset

Datasets are collections of logs stored for analysis that can be used in an evaluation. You can create datasets by applying filters in the Logs tab. Datasets will update automatically based on the set filters.

### Set up a dataset from the Logs tab

1. Apply filters to narrow down your logs. Filter options include provider, number of tokens, request status, and more.
2. Select **Create Dataset** to store the filtered logs for future analysis.

You can manage datasets by selecting **Manage datasets** from the Logs tab.

Note

Please keep in mind that datasets currently use `AND` joins, so there can only be one item per filter (for example, one model or one provider). Future updates will allow more flexibility in dataset creation.

### List of available filters

| Filter category | Filter options                                               | Filter by description                     |
| --------------- | ------------------------------------------------------------ | ----------------------------------------- |
| Status          | error, status                                                | error type or status.                     |
| Cache           | cached, not cached                                           | based on whether they were cached or not. |
| Provider        | specific providers                                           | the selected AI provider.                 |
| AI Models       | specific models                                              | the selected AI model.                    |
| Cost            | less than, greater than                                      | cost, specifying a threshold.             |
| Request type    | Workers AI Binding, WebSockets                               | the type of request.                      |
| Tokens          | Total tokens, Tokens In, Tokens Out                          | token count (less than or greater than).  |
| Duration        | less than, greater than                                      | request duration.                         |
| Feedback        | equals, does not equal (thumbs up, thumbs down, no feedback) | feedback type.                            |
| Metadata Key    | equals, does not equal                                       | specific metadata keys.                   |
| Metadata Value  | equals, does not equal                                       | specific metadata values.                 |
| Log ID          | equals, does not equal                                       | a specific Log ID.                        |
| Event ID        | equals, does not equal                                       | a specific Event ID.                      |

## 2\. Select evaluators

After creating a dataset, choose the evaluation parameters:

* Cost: Calculates the average cost of inference requests within the dataset (only for requests with [cost data](https://developers.cloudflare.com/ai-gateway/observability/costs/)).
* Speed: Calculates the average duration of inference requests within the dataset.
* Performance:
  * Human feedback: measures performance based on human feedback, calculated by the % of thumbs up on the logs, annotated from the Logs tab.

Note

Additional evaluators will be introduced in future updates to expand performance analysis capabilities.

## 3\. Name, review, and run the evaluation

1. Create a unique name for your evaluation to reference it in the dashboard.
2. Review the selected dataset and evaluators.
3. Select **Run** to start the process.

## 4\. Review and analyze results

Evaluation results will appear in the Evaluations tab. The results show the status of the evaluation (for example, in progress, completed, or error). Metrics for the selected evaluators will be displayed, excluding any logs with missing fields. You will also see the number of logs used to calculate each metric.

While datasets automatically update based on filters, evaluations do not. You will have to create a new evaluation if you want to evaluate new logs.

Use these insights to optimize based on your application's priorities. Based on the results, you may choose to:

* Change the model or [provider](https://developers.cloudflare.com/ai-gateway/usage/providers/)
* Adjust your prompts
* Explore further optimizations, such as setting up [Retrieval Augmented Generation (RAG)](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/#page","headline":"Set up Evaluations · Cloudflare AI Gateway docs","description":"Create datasets, select evaluators, and run evaluations for your AI Gateway logs.","url":"https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
