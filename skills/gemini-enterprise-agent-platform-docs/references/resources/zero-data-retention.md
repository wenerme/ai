Google was the first in the industry to publish an [AI/ML Privacy
Commitment](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-unveils-ai-and-ml-privacy-commitment),
which outlines our belief that customers should have the highest level of
security and control over their data that is stored in the cloud. That
commitment extends to Google Cloud's generative AI products. Google ensures that
its teams are following these commitments through robust data governance
practices, which include reviews of the data that Google Cloud uses in the
development of its products. More details about how Google processes data can
also be found in Google's [Cloud Data Processing
Addendum](https://cloud.google.com/terms/data-processing-addendum) (CDPA).

## Training restriction

As outlined in Section 17 "Training Restriction" in the [Service Terms section
of Service Specific Terms](https://cloud.google.com/terms/service-terms), Google
won't use your data to train or fine-tune any AI/ML models without your prior
permission or instruction. This applies to all managed models on
Gemini Enterprise Agent Platform, including GA and pre-GA models.

## Customer data retention and achieving zero data retention

Customer data is retained in Gemini Enterprise Agent Platform for Models as a Service (MaaS) for limited
periods of time in the following scenarios and conditions. To achieve zero data
retention, customers must take specific actions within each of these areas:

- **Prompt logging for abuse monitoring for Google models** : As outlined in
  Section 4.3 "Generative AI Safety and Abuse" of [Google Cloud Platform Terms
  of Service](https://cloud.google.com/terms), Google may log prompts to
  detect potential abuse and violations of its [Acceptable Use
  Policy](https://cloud.google.com/terms/aup) and [Prohibited Use
  Policy](https://policies.google.com/terms/generative-ai/use-policy) as part
  of providing generative AI services to customers. Only customers whose use
  of Google Cloud is governed by the [Google Cloud Platform Terms of
  Service](https://cloud.google.com/terms) are subject to prompt logging for
  abuse monitoring. If you are in scope for prompt logging for abuse
  monitoring and want zero data retention, you can request an exception for
  abuse monitoring. See [Abuse
  monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring).

- **Prompt and response logging for abuse monitoring for Advanced AI models** :
  Certain models or features may also be subject to additional prompt and
  response logging to prevent abuse, as described in the [Advanced AI Safety
  Addendum](http://cloud.google.com/terms/advanced-ai-safety-addendum). Zero
  data retention may not be possible when using some Advanced AI features.
  Please contact your account team for clarification. See [Abuse monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring) for more information.

- **Grounding with Google Search** : As outlined in Section
  19 "Generative AI Services: Grounding with Google Search" of the
  [Service Specific Terms](https://cloud.google.com/terms/service-terms),
  Google stores prompts and contextual information that customers may provide,
  and generated output for thirty (30) days for the purposes of creating
  grounded results and search suggestions, and this stored information may be
  used for debugging and testing of systems that support grounding with
  Google Search. There is no way to disable the storage of this
  information if you use Grounding with Google Search. If you require
  zero data retention, we recommend using [Web Grounding for
  Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/web-grounding-enterprise).

- **Grounding with Google Maps** : As outlined in Section
  19 "Generative AI Services: Grounding with Google Maps" of the [Service
  Specific Terms](https://cloud.google.com/terms/service-terms), Google stores
  prompts and contextual information that customers may provide, and generated
  output for thirty (30) days for the purposes of creating grounded results,
  and this stored information may only be used for reliability engineering,
  such as debugging in case of service issues, of systems that support
  grounding with Google Maps. There is no way to disable the storage of this
  information if you use Grounding with Google Maps.

- **Request-response logging** : This feature is disabled by default. It can be
  enabled using a configuration setting on a per-model, per-project basis.
  Enabling this logging causes certain requests and responses to the specified
  model to be written to a designated BigQuery table. To achieve zero
  data retention, do not enable this feature. For more information about this
  feature, including how to enable or disable it, or read the current
  configuration setting, see [Log requests and
  responses](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/request-response-logging).

This applies to all managed models on Gemini Enterprise Agent Platform, including GA and
pre-GA models.

## Google models

To achieve zero data retention for Google trained models, customers must take
additional specific actions within each of these areas:

### Session resumption for Gemini Live API

Session resumption for Gemini Live API is disabled by default. It must be
enabled by the user every time they call the API by specifying the field in the
API request, and project-level privacy is enforced for cached data. Enabling
Session Resumption allows the user to reconnect to a previous session within 24
hours by storing cached data, including text, video, and audio prompt data and
model outputs, for up to 24 hours. To achieve zero data retention, do not enable
this feature. For more information about this feature, including how to enable
it, see [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api#session-resumption).

### In-memory data caching

By default, Google's published Gemini models cache Customer Data (inputs,
outputs, and derived data) in-memory to reduce latency and accelerate responses.
This data is stored only in-memory (not at-rest), is isolated at the project
level, and has a 24-hour TTL. Cached data is used only for improving service
performance and adheres to all Data Residency requirements for the selected
location and does not violate zero data retention. This feature can be disabled
at the project level.

#### Enabling and disabling data caching

You can use the following curl commands to get
caching status, disable caching, or re-enable caching.
When you disable or re-enable caching, the change
applies to all Google Cloud regions. For more information about using
Identity and Access Management to grant permissions required to enable or disable caching, see
[Gemini Enterprise Agent Platform access control with IAM](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control).
Expand the following sections to learn how to get the current cache setting, to
disable caching, and to enable caching.

#### Get current caching setting

Run the following command to determine if caching is enabled or turned off for a
project. To run this command, a user must be granted one of the following
roles: `roles/aiplatform.viewer`, `roles/aiplatform.user`, or
`roles/aiplatform.admin`.

```bash
PROJECT_ID=PROJECT_ID
# Setup project_id
$ gcloud config set project PROJECT_ID

# GetCacheConfig
$ curl -X GET \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/cacheConfig

# Response if caching is enabled (caching is enabled by default).
{
  "name": "projects/PROJECT_ID/cacheConfig"
}

# Response if caching is turned off.
{
  "name": "projects/PROJECT_ID/cacheConfig"
  "disableCache": true
}

```

#### Turn off caching

Run the following curl command to disable caching for a Google Cloud project. To run
this command, a user must be granted the Gemini Enterprise Agent Platform administrator role,
`roles/aiplatform.admin`.

```bash
PROJECT_ID=PROJECT_ID
# Setup project_id
$ gcloud config set project PROJECT_ID

# Setup project_id.
$ gcloud config set project ${PROJECT_ID}

# Opt-out of caching.
$ curl -X PATCH \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type: application/json" \
    https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/cacheConfig \
    -d '{
      "name": "projects/PROJECT_ID/cacheConfig",
      "disableCache": true
    }'

# Response.
{
  "name": "projects/PROJECT_ID/locations/us-central1/projects/PROJECT_ID/cacheConfig/operations/${OPERATION_ID}",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.protobuf.Empty"
  }
}

```

#### Enable caching

If you disabled caching for a Google Cloud project and want re-enable it, run the
following curl command. To run this command, a user must be granted the
Gemini Enterprise Agent Platform administrator role, `roles/aiplatform.admin`.

```bash
PROJECT_ID=PROJECT_ID
LOCATION_ID="us-central1"
# Setup project_id
$ gcloud config set project PROJECT_ID

# Setup project_id.
$ gcloud config set project ${PROJECT_ID}

# Opt in to caching.
$ curl -X PATCH     -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" -H "Content-Type: application/json" https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/cacheConfig -d '{
  "name": "projects/PROJECT_ID/cacheConfig",
  "disableCache": false
}'

# Response.
{
  "name": "projects/PROJECT_ID/locations/us-central1/projects/PROJECT_ID/cacheConfig/operations/${OPERATION_NUMBER}",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.protobuf.Empty"
  }
}

```

## What's next

Overview

### [Responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai)

Learn about some of the limitations to generative AI and recommended practices for using generative AI.

Overview

### [How Gemini for Google Cloud uses your data](https://docs.cloud.google.com/gemini/docs/discover/data-governance)

Learn how Gemini for Google Cloud conforms to Google's privacy commitment with generative AI technologies.
