This page outlines the storage and management of
[Gemini API logs](https://ai.google.dev/gemini-api/docs/logs-datasets), which are developer-owned
API data from supported Gemini API calls for projects with billing enabled. Logs
encompass the entire process from a user's request to the model's response.
These logs which are private to your Google Cloud project are separate from any
logs held solely for [abuse monitoring](https://ai.google.dev/gemini-api/docs/usage-policies)
purposes.

## Data that can be shared

Logging is on by default for Interactions API calls, and for Generate Content
API calls in projects created on or after October 26, 2026. As a project owner,
you can turn logging on or off at any time from the
[Logs and Datasets](https://aistudio.google.com/logs) page in AI Studio. Logs
are for your own use, and you can choose to share them with Google as feedback
to help us continually improve our models.

With logging enabled, you can help us build AI systems that continue to be
valuable for developers across various fields and use cases by choosing to
contribute the following data for product improvements and model training:

- **Datasets:** Use the Logs and Datasets interface of Google AI Studio to choose logs (requests, responses, metadata etc.) of interest from supported Gemini API calls; contributed through inclusion in datasets, with the option to opt-out during dataset creation.
- **Feedback:** When reviewing logs, you can provide feedback; including thumbs up and down ratings and any written comments you provide.

When you share a dataset with Google, your logs in that dataset, including
requests and responses, will be processed in accordance with our
[Terms](https://developers.google.com/terms) for
"[Unpaid Services](https://ai.google.dev/gemini-api/terms#data-use-unpaid),"
meaning the dataset may be used to develop and improve Google
products, services, and machine learning technologies, including improving and
training our models. **Do not include personal, sensitive, or confidential
information.**

> [!NOTE]
> **Note:** Options are dependent on your location.

## How we use your data

Logs are retained for a default maximum period of 55 days. After this period,
logs are automatically marked for deletion. The storage retention window for a
project can be updated in AI Studio to automatically mark logs for deletion
after 7, 14, 28, or 55 days.

[Datasets](https://ai.google.dev/gemini-api/docs/logs-datasets) can be created to retain logs of
interest beyond the set retention period for downstream use cases and
optional contribution to model improvements. Logs stored in datasets don't
have set retention periods.

By default, because logging is only available for billing-enabled projects,
prompts and responses within logs are not used for product improvement or
development, in accordance with our [Terms](https://developers.google.com/terms)
on data use.

If you choose to share datasets of your logs with Google, those datasets will be
used as real-world demonstration data to better understand the diversity of
domains and contexts AI systems and applications are used in. This data may be
used to improve model quality, and inform the training and evaluation of future
models and services. This data is processed in accordance with our data use
terms for [Unpaid Services](https://ai.google.dev/gemini-api/terms#data-use-unpaid).

Accordingly, human reviewers may read, annotate, and process the API inputs and
outputs you share. Before data is used for model improvement, Google takes steps
to protect user privacy as part of this process. This includes disconnecting
this data from your Google Account, API key, and Cloud project before reviewers
see or annotate it.

## Data permissions

By opting-in to contributing API data, you confirm that you have the necessary
permissions for Google to process and use the data as described in this
documentation. **Please do not contribute logs containing sensitive,
confidential, or proprietary information obtained through the paid service** .
The license you grant to Google under the "[Submission of
Content](https://developers.google.com/terms#b_submission_of_content)"
section in the API Terms also extends, to the extent required under applicable
law for our use, to any content (e.g., prompts, including associated system
instructions, cached content, and files such as images, videos, or documents)
you submit to the Services and to any generated responses.

## Data sharing and feedback

You can help us advance the frontier of AI research, the Gemini API and Google
AI Studio by opting in to share your data as examples, enabling us to
continually improve our models across various contexts and build AI systems that
continue to be valuable to developers across various fields and use cases.

### Gemini API Contributor Tier

> [!NOTE]
> **Note:** **New:** The Gemini API Contributor Tier is available as an invite-only private preview. Eligible users will be invited by email and see a callout in AI Studio.

The Gemini Contributor Tier allows developers to get discounted token costs on
select models in exchange for permission to use data from those models to
provide, improve, and develop Google products and services and machine learning
technologies.

Developers receive up to 50% off token costs for select models, with the same
real-time performance of the [standard API](https://ai.google.dev/gemini-api/docs/optimization). The
following models are supported:

| Model | Contributor Tier |
|---|---|
| [Gemini 4 Argon](https://ai.google.dev/gemini-api/docs/pricing#gemini-4-argon) | ✔️ |
| [Gemini 3.1 Pro Preview](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.1-pro-preview) | ✔️ |
| [Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash) | ✔️ |
| [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.5-flash-lite) | ✔️ |

**Data Use:**

- By enabling the Contributor Tier for a project, your data from participating model use in your project will be used in accordance with our terms for "[Unpaid Services](https://ai.google.dev/gemini-api/terms#unpaid-services)." Because your data will be used to improve Google products and machine learning technologies, please don't submit sensitive or personal information.