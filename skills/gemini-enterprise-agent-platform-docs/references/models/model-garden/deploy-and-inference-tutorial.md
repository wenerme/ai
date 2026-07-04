In this tutorial, you use Model Garden to deploy the
[Gemma 3 1B](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-gemma) open model to a GPU-backed Gemini Enterprise Agent Platform
endpoint. You must [deploy a model to an endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment) before that model can
be used to serve online predictions. Deploying a model associates physical
resources with the model so it can serve online predictions with low latency.

After you deploy the Gemma 3 1B model, you inference the trained
model by using the [`PredictionServiceClient`](https://docs.cloud.google.com/python/docs/reference/aiplatform/1.18.2/google.cloud.aiplatform_v1beta1.services.prediction_service.PredictionServiceClient) to get [online
predictions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/get-online-predictions). Online predictions are synchronous requests made to a
model that is deployed to an endpoint.

## Objectives

This tutorial shows you how to perform the following tasks:

- Deploy the Gemma 3 1B open model to a GPU backed endpoint by using Model Garden
- Use the `PredictionServiceClient` to get online predictions

## Costs

In this document, you use the following billable components of Google Cloud:

- [A `g2-standard-12` machine type with one NVIDIA_L4 accelerator](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#custom-trained_models)
- [Gemini Enterprise Agent Platform prediction and explanation](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#prediction-prices)

To generate a cost estimate based on your projected usage,
use the [pricing calculator](https://docs.cloud.google.com/products/calculator).
New Google Cloud users might be eligible for a [free trial](https://docs.cloud.google.com/free).

When you finish the tasks that are described in this document, you can avoid
continued billing by deleting the resources that you created. For more information, see
[Clean up](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/deploy-and-inference-tutorial#clean-up).

## Before you begin

This tutorial requires you to:

- Set up a Google Cloud project and enable the Agent Platform API
- On your local machine:
  - Install, initialize, and authenticate with the Google Cloud CLI
  - Install the SDK for your language

### Set up a Google Cloud project

Set up your Google Cloud project and enable the Agent Platform API.

### Set up the Google Cloud CLI

On your local machine, set up the Google Cloud CLI.

1. [Install and initialize](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.

2. If you previously installed the gcloud CLI, ensure your
   `gcloud` components are updated by running this command.

   ```bash
   gcloud components update
   ```
3. To authenticate with the gcloud CLI, generate a local
   Application Default Credentials (ADC) file by running this command. The web
   flow launched by the command is used to provide your user credentials.

   ```bash
   gcloud auth application-default login
   ```

   For more information, see [gcloud CLI authentication configuration and ADC configuration](https://docs.cloud.google.com/docs/authentication/provide-credentials-adc#gcloud-credentials).

> [!NOTE]
> **Note:** To avoid providing your project ID and region to the Google Cloud CLI, you can use the [`gcloud config set`](https://docs.cloud.google.com/sdk/gcloud/reference/config/set) command to set a default project and region.

### Set up the SDK for your programming language

To set up the environment used in this tutorial, you install the Gemini Enterprise Agent Platform
SDK for your language and the Protocol Buffers library. The code samples use
functions from the Protocol Buffers library to convert the input dictionary to
the JSON format that is expected by the API.

On your local machine, click one of the following tabs to install the SDK for
your programming language.

### Python

On your local machine, click one of the following tabs to install the SDK
for your programming language.

- Install and update the Agent Platform SDK for Python by running this command.

  ```bash
  pip3 install --upgrade "google-cloud-aiplatform>=1.64"
  ```
- Install the Protocol Buffers library for Python by running this command.

  ```bash
  pip3 install --upgrade "protobuf>=5.28"
  ```

### Node.js

Install or update the `aiplatform` SDK for Node.js by running the following
command.

```bash
npm install @google-cloud/aiplatform
```

### Java

To add `google-cloud-aiplatform` as a dependency, add the appropriate code for
your environment.

### Maven with BOM

Add the following HTML to your [`pom.xml`](https://github.com/GoogleCloudPlatform/java-docs-samples/blob/main/aiplatform/pom.xml):

```xml
<dependencyManagement>
<dependencies>
  <dependency>
    <artifactId>libraries-bom</artifactId>
    <groupId>com.google.cloud</groupId>
    <scope>import</scope>
    <type>pom</type>
    <version>26.34.0</version>
  </dependency>
</dependencies>
</dependencyManagement>
<dependencies>
<dependency>
  <groupId>com.google.cloud</groupId>
  <artifactId>google-cloud-aiplatform</artifactId>
</dependency>
<dependency>
  <groupId>com.google.protobuf</groupId>
  <artifactId>protobuf-java-util</artifactId>
</dependency>
<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
</dependency>
</dependencies>
```

### Maven without BOM

Add the following to your
[`pom.xml`](https://github.com/GoogleCloudPlatform/java-docs-samples/blob/main/aiplatform/pom.xml):

```xml
<dependency>
  <groupId>com.google.cloud</groupId>
  <artifactId>google-cloud-aiplatform</artifactId>
  <version>1.1.0</version>
</dependency>
<dependency>
  <groupId>com.google.protobuf</groupId>
  <artifactId>protobuf-java-util</artifactId>
  <version>5.28</version>
</dependency>
<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
  <version>2.11.0</version>
</dependency>
```

### Gradle without BOM

Add the following to your `build.gradle`:

```groovy
implementation 'com.google.cloud:google-cloud-aiplatform:1.1.0'
```

### Go

Install these Go packages by running the following commands.

- The [`aiplatform` Go client library](https://pkg.go.dev/cloud.google.com/go/aiplatform)
- [Go support for Protocol Buffers](https://pkg.go.dev/google.golang.org/protobuf#section-readme)
- [Google API Extensions for Go (gax-go)](https://github.com/googleapis/gax-go)

```bash
go get cloud.google.com/go/aiplatform
go get google.golang.org/protobuf
go get github.com/googleapis/gax-go/v2
```

## Deploy Gemma using Model Garden

You can deploy the Gemma 3 1B by using its model card in the Google Cloud console or
programmatically.

For more information about setting up the Google Gen AI SDK or Google Cloud CLI,
see the [Google Gen AI SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/sdks/overview) overview or [Install the
Google Cloud CLI](https://docs.cloud.google.com/sdk/docs/install).

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

1. List the models that you can deploy and record the model ID to deploy. You can optionally list the supported
   Hugging Face models in Model Garden and even filter them by model names.
   The output doesn't include any tuned models.

       import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
       from vertexai import model_garden

       # TODO(developer): Update and un-comment below lines
       # PROJECT_ID = "your-project-id"
       https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project=PROJECT_ID, location="us-central1")

       # List deployable models, optionally list Hugging Face models only or filter by model name.
       deployable_models = model_garden.list_deployable_models(list_hf_models=False, model_filter="gemma")
       print(deployable_models)
       # Example response:
       # ['google/gemma2@gemma-2-27b','google/gemma2@gemma-2-27b-it', ...]

2. View the deployment specifications for a model by using the model ID
   from the previous step. You can view the
   machine type, accelerator type, and container image URI that Model Garden
   has verified for a particular model.

       import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
       from vertexai import model_garden

       # TODO(developer): Update and un-comment below lines
       # PROJECT_ID = "your-project-id"
       # model = "google/gemma3@gemma-3-1b-it"
       https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project=PROJECT_ID, location="us-central1")

       # For Hugging Face modelsm the format is the Hugging Face model name, as in
       # "meta-llama/Llama-3.3-70B-Instruct".
       # Go to https://console.cloud.google.com/vertex-ai/model-garden to find all deployable
       # model names.

       model = model_garden.OpenModel(model)
       deploy_options = model.list_deploy_options()
       print(deploy_options)
       # Example response:
       # [
       #   dedicated_resources {
       #     machine_spec {
       #       machine_type: "g2-standard-12"
       #       accelerator_type: NVIDIA_L4
       #       accelerator_count: 1
       #     }
       #   }
       #   container_spec {
       #     ...
       #   }
       #   ...
       # ]

3. Deploy a model to an endpoint. Model Garden uses the default
   deployment configuration unless you specify additional argument and values.

       import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
       from vertexai import model_garden

       # TODO(developer): Update and un-comment below lines
       # PROJECT_ID = "your-project-id"
       https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project=PROJECT_ID, location="us-central1")

       open_model = model_garden.OpenModel("google/gemma3@gemma-3-12b-it")
       endpoint = open_model.deploy(
           machine_type="g2-standard-48",
           accelerator_type="NVIDIA_L4",
           accelerator_count=4,
           accept_eula=True,
       )

       # Optional. Run predictions on the deployed endoint.
       # endpoint.predict(instances=[{"prompt": "What is Generative AI?"}])

### gcloud

Before you begin, specify a quota project to run the following commands. The
commands you run are counted against the quotas for that project. For more
information, see [Set the quota project](https://docs.cloud.google.com/docs/quotas/set-quota-project).

1. List the models that you can deploy by running the `gcloud ai
   model-garden models list` command. This command lists all model IDs and
   which ones you can self deploy.

       gcloud ai model-garden models list --model-filter=gemma

   In the output, find the model ID to deploy. The following example shows an
   abbreviated output.

       MODEL_ID                                      CAN_DEPLOY  CAN_PREDICT
       google/gemma2@gemma-2-27b                     Yes         No
       google/gemma2@gemma-2-27b-it                  Yes         No
       google/gemma2@gemma-2-2b                      Yes         No
       google/gemma2@gemma-2-2b-it                   Yes         No
       google/gemma2@gemma-2-9b                      Yes         No
       google/gemma2@gemma-2-9b-it                   Yes         No
       google/gemma3@gemma-3-12b-it                  Yes         No
       google/gemma3@gemma-3-12b-pt                  Yes         No
       google/gemma3@gemma-3-1b-it                   Yes         No
       google/gemma3@gemma-3-1b-pt                   Yes         No
       google/gemma3@gemma-3-27b-it                  Yes         No
       google/gemma3@gemma-3-27b-pt                  Yes         No
       google/gemma3@gemma-3-4b-it                   Yes         No
       google/gemma3@gemma-3-4b-pt                   Yes         No
       google/gemma3n@gemma-3n-e2b                   Yes         No
       google/gemma3n@gemma-3n-e2b-it                Yes         No
       google/gemma3n@gemma-3n-e4b                   Yes         No
       google/gemma3n@gemma-3n-e4b-it                Yes         No
       google/gemma@gemma-1.1-2b-it                  Yes         No
       google/gemma@gemma-1.1-2b-it-gg-hf            Yes         No
       google/gemma@gemma-1.1-7b-it                  Yes         No
       google/gemma@gemma-1.1-7b-it-gg-hf            Yes         No
       google/gemma@gemma-2b                         Yes         No
       google/gemma@gemma-2b-gg-hf                   Yes         No
       google/gemma@gemma-2b-it                      Yes         No
       google/gemma@gemma-2b-it-gg-hf                Yes         No
       google/gemma@gemma-7b                         Yes         No
       google/gemma@gemma-7b-gg-hf                   Yes         No
       google/gemma@gemma-7b-it                      Yes         No
       google/gemma@gemma-7b-it-gg-hf                Yes         No

   The output doesn't include any tuned models or Hugging Face models.
   To view which Hugging Face models are supported, add the
   `--can-deploy-hugging-face-models` flag.
2. To view the deployment specifications for a model, run the `gcloud ai
   model-garden models list-deployment-config` command. You can view the machine
   type, accelorator type, and container image URI that Model Garden
   supports for a particular model.

       gcloud ai model-garden models list-deployment-config \
           --model=MODEL_ID

   Replace <var translate="no">MODEL_ID</var> with the model ID from the previous list
   command, such as `google/gemma@gemma-2b` or
   `stabilityai/stable-diffusion-xl-base-1.0`.
3. Deploy a model to an endpoint by running the `gcloud ai model-garden
   models deploy` command. Model Garden generates a display name for
   your endpoint and uses the default deployment configuration unless you
   specify additional argument and values.

   To run the command asynchronously, include the `--asynchronous` flag.

       gcloud ai model-garden models deploy \
           --model=MODEL_ID \
           [--machine-type=MACHINE_TYPE] \
           [--accelerator-type=ACCELERATOR_TYPE] \
           [--endpoint-display-name=ENDPOINT_NAME] \
           [--hugging-face-access-token=HF_ACCESS_TOKEN] \
           [--reservation-affinity reservation-affinity-type=any-reservation] \
           [--reservation-affinity reservation-affinity-type=specific-reservation, key="compute.googleapis.com/reservation-name", values=RESERVATION_RESOURCE_NAME] \
           [--asynchronous]

   Replace the following placeholders:
   - <var translate="no">MODEL_ID</var>: The model ID from the previous list command. For Hugging Face models, use the Hugging Face model URL format, such as `stabilityai/stable-diffusion-xl-base-1.0`.
   - <var translate="no">MACHINE_TYPE</var>: Defines the set of resources to deploy for your model, such as `g2-standard-4`.
   - <var translate="no">ACCELERATOR_TYPE</var>: Specifies accelerators to add to your deployment to help improve performance when working with intensive workloads, such as `NVIDIA_L4`.
   - <var translate="no">ENDPOINT_NAME</var>: A name for the deployed Gemini Enterprise Agent Platform endpoint.
   - <var translate="no">HF_ACCESS_TOKEN</var>: For Hugging Face models, if the model is gated, provide an [access token](https://huggingface.co/docs/hub/en/security-tokens).
   - <var translate="no">RESERVATION_RESOURCE_NAME</var>: To use a specific [Compute Engine reservation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/use-reservations), specify the name of your reservation. If you specify a specific reservation, you can't specify `any-reservation`.

   The output includes the deployment configuration that Model Garden
   used, the endpoint ID, and the deployment operation ID, which you can use
   to check the deployment status.

       Using the default deployment configuration:
        Machine type: g2-standard-12
        Accelerator type: NVIDIA_L4
        Accelerator count: 1

       The project has enough quota. The current usage of quota for accelerator type NVIDIA_L4 in region us-central1 is 0 out of 28.

       Deploying the model to the endpoint. To check the deployment status, you can try one of the following methods:
       1) Look for endpoint `ENDPOINT_DISPLAY_NAME` at the [Agent Platform] -> [Online prediction] tab in Cloud Console
       2) Use `gcloud ai operations describe OPERATION_ID --region=LOCATION` to find the status of the deployment long-running operation

4. To see details about your deployment, run the `gcloud ai endpoints list
   --list-model-garden-endpoints-only` command:

       gcloud ai endpoints list --list-model-garden-endpoints-only \
           --region=LOCATION_ID

   Replace <var translate="no">LOCATION_ID</var> with the region where you deployed the
   model.

   The output includes all endpoints that were created from
   Model Garden and includes information such as the endpoint ID,
   endpoint name, and whether the endpoint is associated with a deployed model.
   To find your deployment, look for the endpoint name that was returned from
   the previous command.

### REST

List all deployable models and then get the ID of the model to deploy. You can
then deploy the model with its default configuration and endpoint. Or, you can
choose to customize your deployment, such as setting a specific machine type or
using a dedicated endpoint.

### List models that you can deploy

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="PARAMS" translate="no">QUERY_PARAMETERS</var>: To list Model Garden models, add the following query parameters `listAllVersions=True&filter=can_deploy(true)`. To list Hugging Face models, set the filter to `alt=json&is_hf_wildcard(true)+AND+labels.VERIFIED_DEPLOYMENT_CONFIG%3DVERIFIED_DEPLOYMENT_SUCCEED&listAllVersions=True`.

HTTP method and URL:

```
GET https://us-central1-aiplatform.googleapis.com/v1/publishers/*/models?QUERY_PARAMETERS
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://us-central1-aiplatform.googleapis.com/v1/publishers/*/models?QUERY_PARAMETERS"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred"; "x-goog-user-project" = "PROJECT_ID" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://us-central1-aiplatform.googleapis.com/v1/publishers/*/models?QUERY_PARAMETERS" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```
{
  "publisherModels": [
    {
      "name": "publishers/google/models/gemma3",
      "versionId": "gemma-3-1b-it",
      "openSourceCategory": "GOOGLE_OWNED_OSS_WITH_GOOGLE_CHECKPOINT",
      "supportedActions": {
        "openNotebook": {
          "references": {
            "us-central1": {
              "uri": "https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gradio_streaming_chat_completions.ipynb"
            }
          },
          "resourceTitle": "Notebook",
          "resourceUseCase": "Chat Completion Playground",
          "resourceDescription": "Chat with deployed Gemma 2 endpoints via Gradio UI."
        },
        "deploy": {
          "modelDisplayName": "gemma-3-1b-it",
          "containerSpec": {
            "imageUri": "us-docker.pkg.dev/vertex-ai/vertex-vision-model-garden-dockers/pytorch-vllm-serve:20250312_0916_RC01",
            "args": [
              "python",
              "-m",
              "vllm.entrypoints.api_server",
              "--host=0.0.0.0",
              "--port=8080",
              "--model=gs://vertex-model-garden-restricted-us/gemma3/gemma-3-1b-it",
              "--tensor-parallel-size=1",
              "--swap-space=16",
              "--gpu-memory-utilization=0.95",
              "--disable-log-stats"
            ],
            "env": [
              {
                "name": "MODEL_ID",
                "value": "google/gemma-3-1b-it"
              },
              {
                "name": "DEPLOY_SOURCE",
                "value": "UI_NATIVE_MODEL"
              }
            ],
            "ports": [
              {
                "containerPort": 8080
              }
            ],
            "predictRoute": "/generate",
            "healthRoute": "/ping"
          },
          "dedicatedResources": {
            "machineSpec": {
              "machineType": "g2-standard-12",
              "acceleratorType": "NVIDIA_L4",
              "acceleratorCount": 1
            }
          },
          "publicArtifactUri": "gs://vertex-model-garden-restricted-us/gemma3/gemma3.tar.gz",
          "deployTaskName": "vLLM 128K context",
          "deployMetadata": {
            "sampleRequest": "{\n    \"instances\": [\n        {\n          \"@requestFormat\": \"chatCompletions\",\n          \"messages\": [\n              {\n                  \"role\": \"user\",\n                  \"content\": \"What is machine learning?\"\n              }\n          ],\n          \"max_tokens\": 100\n        }\n    ]\n}\n"
          }
        },
        ...
```

### Deploy a model

Deploy a model from Model Garden or a model from
Hugging Face. You can also customize the deployment by specifying additional
JSON fields.

#### Deploy a model with its default configuration.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region where the model is deployed.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The ID of the model to deploy, which you can get from listing all the deployable models. The ID uses the following format: publishers/<var translate="no">PUBLISHER_NAME</var>/models/ <var translate="no">MODEL_NAME</var>@<var translate="no">MODEL_VERSION</var>.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy
```

Request JSON body:

```
{
  "publisher_model_name": "MODEL_ID",
  "model_config": {
    "accept_eula": "true"
  }
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "publisher_model_name": "MODEL_ID",
  "model_config": {
    "accept_eula": "true"
  }
}
EOF
```

Then execute the following command to send your REST request:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "publisher_model_name": "MODEL_ID",
  "model_config": {
    "accept_eula": "true"
  }
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeployOperationMetadata",
    "genericMetadata": {
      "createTime": "2025-03-13T21:44:44.538780Z",
      "updateTime": "2025-03-13T21:44:44.538780Z"
    },
    "publisherModel": "publishers/google/models/gemma3@gemma-3-1b-it",
    "destination": "projects/PROJECT_ID/locations/LOCATION",
    "projectNumber": "PROJECT_ID"
  }
}
```

#### Deploy a Hugging Face model

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region where the model is deployed.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The Hugging Face model ID model to deploy, which you can get from listing all the deployable models. The ID uses the following format: <var translate="no">PUBLISHER_NAME</var>/<var translate="no">MODEL_NAME</var>.
- <var class="edit" scope="ACCESS_TOKEN" translate="no">ACCESS_TOKEN</var>: If the model is gated, provide an [access
  token](https://huggingface.co/docs/hub/en/security-tokens).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy
```

Request JSON body:

```
{
  "hugging_face_model_id": "MODEL_ID",
  "hugging_face_access_token": "ACCESS_TOKEN",
  "model_config": {
    "accept_eula": "true"
  }
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "hugging_face_model_id": "MODEL_ID",
  "hugging_face_access_token": "ACCESS_TOKEN",
  "model_config": {
    "accept_eula": "true"
  }
}
EOF
```

Then execute the following command to send your REST request:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "hugging_face_model_id": "MODEL_ID",
  "hugging_face_access_token": "ACCESS_TOKEN",
  "model_config": {
    "accept_eula": "true"
  }
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```
{
  "name": "projects/PROJECT_ID/locations/us-central1LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeployOperationMetadata",
    "genericMetadata": {
      "createTime": "2025-03-13T21:44:44.538780Z",
      "updateTime": "2025-03-13T21:44:44.538780Z"
    },
    "publisherModel": "publishers/PUBLISHER_NAME/model/MODEL_NAME",
    "destination": "projects/PROJECT_ID/locations/LOCATION",
    "projectNumber": "PROJECT_ID"
  }
}
```

#### Deploy a model with customizations

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: A region where the model is deployed.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The ID of the model to deploy, which you can get from listing all the deployable models. The ID uses the following format: publishers/<var translate="no">PUBLISHER_NAME</var>/models/ <var translate="no">MODEL_NAME</var>@<var translate="no">MODEL_VERSION</var>, such as `google/gemma@gemma-2b` or `stabilityai/stable-diffusion-xl-base-1.0`.
- <var class="edit" scope="MACHINE_TYPE" translate="no">MACHINE_TYPE</var>: Defines the set of resources to deploy for your model, such as `g2-standard-4`.
- <var class="edit" scope="ACCELERATOR_TYPE" translate="no">ACCELERATOR_TYPE</var>: Specifies accelerators to add to your deployment to help improve performance when working with intensive workloads, such as `NVIDIA_L4`
- <var class="edit" scope="ACCELERATOR_COUNT" translate="no">ACCELERATOR_COUNT</var>: The number of accelerators to use in your deployment.
- `reservation_affinity_type`: To use an existing Compute Engine reservation for your deployment, specify any reservation or a specific one. If you specify this value, don't specify `spot`.
- `spot`: Whether to use spot VMs for your deployment.
- <var class="edit" scope="IMAGE_URI" translate="no">IMAGE_URI</var>: The location of the container image to use, such as `us-docker.pkg.dev/vertex-ai/vertex-vision-model-garden-dockers/pytorch-vllm-serve:20241016_0916_RC00_maas`
- <var class="edit" scope="CONTAINER_ARGS" translate="no">CONTAINER_ARGS</var>: Arguments to pass to the container during the deployment.
- <var class="edit" scope="CONTAINER_PORT" translate="no">CONTAINER_PORT</var>: A port number for your container.
- `fast_tryout_enabled`: When testing a model, you can choose to use a faster deployment. This option is available only for the highly-used models with certain machine types. If enabled, you cannot specify model or deployment configurations.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy
```

Request JSON body:

```
{
  "publisher_model_name": "MODEL_ID",
  "deploy_config": {
    "dedicated_resources": {
      "machine_spec": {
        "machine_type": "MACHINE_TYPE",
        "accelerator_type": "ACCELERATOR_TYPE",
        "accelerator_count": ACCELERATOR_COUNT,
        "reservation_affinity": {
          "reservation_affinity_type": "ANY_RESERVATION"
        }
      },
      "spot": "false"
    }
  },
  "model_config": {
    "accept_eula": "true",
    "container_spec": {
      "image_uri": "IMAGE_URI",
      "args": [CONTAINER_ARGS ],
      "ports": [
        {
          "container_port": CONTAINER_PORT
        }
      ]
    }
  },
  "deploy_config": {
    "fast_tryout_enabled": false
  },
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "publisher_model_name": "MODEL_ID",
  "deploy_config": {
    "dedicated_resources": {
      "machine_spec": {
        "machine_type": "MACHINE_TYPE",
        "accelerator_type": "ACCELERATOR_TYPE",
        "accelerator_count": ACCELERATOR_COUNT,
        "reservation_affinity": {
          "reservation_affinity_type": "ANY_RESERVATION"
        }
      },
      "spot": "false"
    }
  },
  "model_config": {
    "accept_eula": "true",
    "container_spec": {
      "image_uri": "IMAGE_URI",
      "args": [CONTAINER_ARGS ],
      "ports": [
        {
          "container_port": CONTAINER_PORT
        }
      ]
    }
  },
  "deploy_config": {
    "fast_tryout_enabled": false
  },
}
EOF
```

Then execute the following command to send your REST request:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "publisher_model_name": "MODEL_ID",
  "deploy_config": {
    "dedicated_resources": {
      "machine_spec": {
        "machine_type": "MACHINE_TYPE",
        "accelerator_type": "ACCELERATOR_TYPE",
        "accelerator_count": ACCELERATOR_COUNT,
        "reservation_affinity": {
          "reservation_affinity_type": "ANY_RESERVATION"
        }
      },
      "spot": "false"
    }
  },
  "model_config": {
    "accept_eula": "true",
    "container_spec": {
      "image_uri": "IMAGE_URI",
      "args": [CONTAINER_ARGS ],
      "ports": [
        {
          "container_port": CONTAINER_PORT
        }
      ]
    }
  },
  "deploy_config": {
    "fast_tryout_enabled": false
  },
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:deploy" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.aiplatform.v1.DeployOperationMetadata",
    "genericMetadata": {
      "createTime": "2025-03-13T21:44:44.538780Z",
      "updateTime": "2025-03-13T21:44:44.538780Z"
    },
    "publisherModel": "publishers/google/models/gemma3@gemma-3-1b-it",
    "destination": "projects/PROJECT_ID/locations/LOCATION",
    "projectNumber": "PROJECT_ID"
  }
}
```

### Console

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Find a supported model that you want to deploy, and click its model card.

3. Click **Deploy** to open the **Deploy model** pane.

4. In the **Deploy model** pane, specify details for your deployment.

   1. Use or modify the generated model and endpoint names.
   2. Select a location to create your model endpoint in.
   3. Select a machine type to use for each node of your deployment.
   4. To use a Compute Engine reservation, under the **Deployment
      settings** section, select **Advanced**.

      For the **Reservation type** field, select a reservation type. The
      reservation must match your specified machine specs.
      - **Automatically use created reservation**: Gemini Enterprise Agent Platform automatically selects an allowed reservation with matching properties. If there's no capacity in the automatically selected reservation, Gemini Enterprise Agent Platform uses the general Google Cloud resource pool.
      - **Select specific reservations**: Gemini Enterprise Agent Platform uses a specific reservation. If there's no capacity for your selected reservation, an error is thrown.
      - **Don't use** (default): Gemini Enterprise Agent Platform uses the general Google Cloud resource pool. This value has the same effect as not specifying a reservation.
5. Click **Deploy**.

### Terraform

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

For more information, see the
[Terraform provider reference documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs).

### Deploy a model

The following example deploys the `gemma-3-1b-it` model to a new Agent Platform endpoint
in `us-central1` by using default configurations.

    terraform {
      required_providers {
        google = {
          source = "hashicorp/google"
          version = "6.45.0"
        }
      }
    }

    provider "google" {
      region  = "us-central1"
    }

    resource "google_vertex_ai_endpoint_with_model_garden_deployment" "gemma_deployment" {
      publisher_model_name = "publishers/google/models/gemma3@gemma-3-1b-it"
      location = "us-central1"
      model_config {
        accept_eula = True
      }
    }

To deploy a model with customization, see [Agent Platform Endpoint with Model Garden Deployment](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vertex_ai_endpoint_with_model_garden_deployment) for details.

### Apply the Configuration

    terraform init
    terraform plan
    terraform apply

After you apply the configuration, Terraform provisions a new Agent Platform endpoint and deploys the specified open model.

### Clean Up

To delete the endpoint and model deployment, run the following command:

    terraform destroy

## Inference Gemma 3 1B with the PredictionServiceClient

After you deploy Gemma 3 1B, you use the `PredictionServiceClient` to
get online [predictions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/get-predictions) for the prompt: "Why is the sky blue?"

### Code parameters

The `PredictionServiceClient` code samples require you to update the following.

- `PROJECT_ID`: To [find your project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) follow these steps.

  1. Go to the **Welcome** page in the Google Cloud console.

     [Go to Welcome](https://console.cloud.google.com/welcome)

  2. From the project picker at the top of the page, select your project.

     The project name, project number, and project ID appear after the
     **Welcome** heading.
- `ENDPOINT_REGION`: This is the region where you [deployed the endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/deploy-and-inference-tutorial#deploy-gemma).

- `ENDPOINT_ID`: To find your endpoint ID, view it in the console or run the
  `gcloud ai endpoints list` command. You'll need the endpoint name and region
  from the [**Deploy model**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/deploy-and-inference-tutorial#deploy-gemma) pane.

  ### Console

  You can view the endpoint details by clicking **Online prediction \>
  Endpoints** and selecting your region. Note the number that appears in the
  `ID` column.

  [Go to Endpoints](https://console.cloud.google.com/vertex-ai/online-prediction/endpoints)

  ### gcloud

  You can view the endpoint details by running the [`gcloud ai endpoints
  list`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/list) command.

      gcloud ai endpoints list \
        --region=ENDPOINT_REGION \
        --filter=display_name=ENDPOINT_NAME

  The output looks like this.

      Using endpoint [https://us-central1-aiplatform.googleapis.com/]
      ENDPOINT_ID: 1234567891234567891
      DISPLAY_NAME: gemma2-2b-it-mg-one-click-deploy

### Sample code

In the sample code for your language, update the `PROJECT_ID`,
`ENDPOINT_REGION`, and `ENDPOINT_ID`. Then run your code.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    """
    Sample to run inference on a Gemma2 model deployed to a Vertex AI endpoint with GPU accellerators.
    """

    from google.cloud import aiplatform
    from google.protobuf import json_format
    from google.protobuf.struct_pb2 import Value

    # TODO(developer): Update & uncomment lines below
    # PROJECT_ID = "your-project-id"
    # ENDPOINT_REGION = "your-vertex-endpoint-region"
    # ENDPOINT_ID = "your-vertex-endpoint-id"

    # Default configuration
    config = {"max_tokens": 1024, "temperature": 0.9, "top_p": 1.0, "top_k": 1}

    # Prompt used in the prediction
    prompt = "Why is the sky blue?"

    # Encapsulate the prompt in a correct format for GPUs
    # Example format: [{'inputs': 'Why is the sky blue?', 'parameters': {'temperature': 0.9}}]
    input = {"inputs": prompt, "parameters": config}

    # Convert input message to a list of GAPIC instances for model input
    instances = [json_format.ParseDict(input, Value())]

    # Create a client
    api_endpoint = f"{ENDPOINT_REGION}-aiplatform.googleapis.com"
    client = aiplatform.gapic.PredictionServiceClient(
        client_options={"api_endpoint": api_endpoint}
    )

    # Call the Gemma2 endpoint
    gemma2_end_point = (
        f"projects/{PROJECT_ID}/locations/{ENDPOINT_REGION}/endpoints/{ENDPOINT_ID}"
    )
    response = client.predict(
        endpoint=gemma2_end_point,
        instances=instances,
    )
    text_responses = response.predictions
    print(text_responses[0])

### Node.js

Before trying this sample, follow the Node.js setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    async function gemma2PredictGpu(predictionServiceClient) {
      // Imports the Google Cloud Prediction Service Client library
      const {
        // TODO(developer): Uncomment PredictionServiceClient before running the sample.
        // PredictionServiceClient,
        helpers,
      } = require('https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html');
      /**
       * TODO(developer): Update these variables before running the sample.
       */
      const projectId = 'your-project-id';
      const endpointRegion = 'your-vertex-endpoint-region';
      const endpointId = 'your-vertex-endpoint-id';

      // Default configuration
      const config = {maxOutputTokens: 1024, temperature: 0.9, topP: 1.0, topK: 1};
      // Prompt used in the prediction
      const prompt = 'Why is the sky blue?';

      // Encapsulate the prompt in a correct format for GPUs
      // Example format: [{inputs: 'Why is the sky blue?', parameters: {temperature: 0.9}}]
      const input = {
        inputs: prompt,
        parameters: config,
      };

      // Convert input message to a list of GAPIC instances for model input
      const instances = [https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html.toValue(input)];

      // TODO(developer): Uncomment apiEndpoint and predictionServiceClient before running the sample.
      // const apiEndpoint = `${endpointRegion}-aiplatform.googleapis.com`;

      // Create a client
      // predictionServiceClient = new PredictionServiceClient({apiEndpoint});

      // Call the Gemma2 endpoint
      const gemma2Endpoint = `projects/${projectId}/locations/${endpointRegion}/endpoints/${endpointId}`;

      const [response] = await predictionServiceClient.predict({
        endpoint: gemma2Endpoint,
        instances,
      });

      const predictions = response.predictions;
      const text = predictions[0].stringValue;

      console.log('Predictions:', text);
      return text;
    }

    module.exports = gemma2PredictGpu;

    // TODO(developer): Uncomment below lines before running the sample.
    // gemma2PredictGpu(...process.argv.slice(2)).catch(err => {
    //   console.error(err.message);
    //   process.exitCode = 1;
    // });

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.EndpointName.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictResponse.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceSettings.html;
    import com.google.gson.Gson;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.InvalidProtocolBufferException.html;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html;
    import com.google.protobuf.util.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html;
    import java.io.IOException;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    public class Gemma2PredictGpu {

      private final https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient.html predictionServiceClient;

      // Constructor to inject the PredictionServiceClient
      public Gemma2PredictGpu(https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient.html predictionServiceClient) {
        this.predictionServiceClient = predictionServiceClient;
      }

      public static void main(String[] args) throws IOException {
        // TODO(developer): Replace these variables before running the sample.
        String projectId = "YOUR_PROJECT_ID";
        String endpointRegion = "us-east4";
        String endpointId = "YOUR_ENDPOINT_ID";

        https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceSettings.html predictionServiceSettings =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceSettings.html.newBuilder()
                .setEndpoint(String.format("%s-aiplatform.googleapis.com:443", endpointRegion))
                .build();
        https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient.html predictionServiceClient =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient.html.create(predictionServiceSettings);
        Gemma2PredictGpu creator = new Gemma2PredictGpu(predictionServiceClient);

        creator.gemma2PredictGpu(projectId, endpointRegion, endpointId);
      }

      // Demonstrates how to run inference on a Gemma2 model
      // deployed to a Vertex AI endpoint with GPU accelerators.
      public String gemma2PredictGpu(String projectId, String region,
                   String endpointId) throws IOException {
        Map<String, Object> paramsMap = new HashMap<>();
        paramsMap.put("temperature", 0.9);
        paramsMap.put("maxOutputTokens", 1024);
        paramsMap.put("topP", 1.0);
        paramsMap.put("topK", 1);
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html parameters = mapToValue(paramsMap);

        // Prompt used in the prediction
        String instance = "{ \"inputs\": \"Why is the sky blue?\"}";
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.Builder instanceValue = https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.newBuilder();
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html.parser().merge(instance, instanceValue);
        // Encapsulate the prompt in a correct format for GPUs
        // Example format: [{'inputs': 'Why is the sky blue?', 'parameters': {'temperature': 0.8}}]
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.ListValue.html instances = new ArrayList<>();
        instances.add(instanceValue.build());

        https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.EndpointName.html endpointName = https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.EndpointName.html.of(projectId, region, endpointId);

        https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictResponse.html predictResponse = this.predictionServiceClient
            .predict(endpointName, instances, parameters);
        String textResponse = predictResponse.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictResponse.html#com_google_cloud_aiplatform_v1_PredictResponse_getPredictions_int_(0).getStringValue();
        System.out.println(textResponse);
        return textResponse;
      }

      private static https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html mapToValue(Map<String, Object> map) throws https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.InvalidProtocolBufferException.html {
        Gson gson = new Gson();
        String json = gson.toJson(map);
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.Builder builder = https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.newBuilder();
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html.parser().merge(json, builder);
        return https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.TextFormatParseInfoTree.html#com_google_protobuf_TextFormatParseInfoTree_builder__.build();
      }
    }

### Go

Before trying this sample, follow the Go setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import (
        "context"
        "fmt"
        "io"

        "cloud.google.com/go/aiplatform/apiv1/aiplatformpb"

        "google.golang.org/protobuf/types/known/structpb"
    )

    // predictGPU demonstrates how to run interference on a Gemma2 model deployed to a Vertex AI endpoint with GPU accelerators.
    func predictGPU(w io.Writer, client PredictionsClient, projectID, location, endpointID string) error {
        ctx := context.Background()

        // Note: client can be initialized in the following way:
        // apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
        // client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
        // if err != nil {
        //     return fmt.Errorf("unable to create prediction client: %v", err)
        // }
        // defer client.Close()

        gemma2Endpoint := fmt.Sprintf("projects/%s/locations/%s/endpoints/%s", projectID, location, endpointID)
        prompt := "Why is the sky blue?"
        parameters := map[string]interface{}{
            "temperature":     0.9,
            "maxOutputTokens": 1024,
            "topP":            1.0,
            "topK":            1,
        }

        // Encapsulate the prompt in a correct format for TPUs.
        // Pay attention that prompt should be set in "inputs" field.
        // Example format: [{'inputs': 'Why is the sky blue?', 'parameters': {'temperature': 0.9}}]
        promptValue, err := structpb.NewValue(map[string]interface{}{
            "inputs":     prompt,
            "parameters": parameters,
        })
        if err != nil {
            fmt.Fprintf(w, "unable to convert prompt to Value: %v", err)
            return err
        }

        req := &aiplatformpb.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1/aiplatformpb.html#cloud_google_com_go_aiplatform_apiv1_aiplatformpb_PredictRequest{
            Endpoint:  gemma2Endpoint,
            Instances: []*structpb.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1/aiplatformpb.html#cloud_google_com_go_aiplatform_apiv1_aiplatformpb_Value{promptValue},
        }

        resp, err := client.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1/aiplatformpb.html#cloud_google_com_go_aiplatform_apiv1_aiplatformpb_UnimplementedPredictionServiceServer_Predict(ctx, req)
        if err != nil {
            return err
        }

        prediction := resp.GetPredictions()
        value := prediction[0].GetStringValue()
        fmt.Fprintf(w, "%v", value)

        return nil
    }

## Clean up

To avoid incurring charges to your Google Cloud account for the resources used in this
tutorial, either delete the project that contains the resources, or keep the project and
delete the individual resources.

### Delete the project

> [!CAUTION]
> **Caution** : Deleting a project has the following effects:
>
> - **Everything in the project is deleted.** If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
> - **Custom project IDs are lost.** When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an `appspot.com` URL, delete selected resources inside the project instead of deleting the whole project.
>
>
> If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects
> can help you avoid exceeding project quota limits.

1. In the Google Cloud console, go to the **Manage resources** page.

   [Go to Manage resources](https://console.cloud.google.com/iam-admin/projects)
2. In the project list, select the project that you want to delete, and then click **Delete**.
3. In the dialog, type the project ID, and then click **Shut down** to delete the project.

### Delete individual resources

If you're keeping your project, delete the resources used in this tutorial:

- Undeploy the model and delete the endpoint
- Delete the model from Model Registry

#### Undeploy the model and delete the endpoint

Use one of the following methods to undeploy a model and delete the endpoint.

> [!NOTE]
> **Note:** You can only delete the endpoint after all models have been undeployed from it.

### Console

1. In the Google Cloud console, click **Online prediction** and then
   click **Endpoints**.

   [Go to the Endpoints page](https://console.cloud.google.com/agent-platform/endpoints)
2. In the **Region** drop-down list, choose the region where you deployed
   your endpoint.

3. Click the endpoint name to open the details page. For example:
   `gemma2-2b-it-mg-one-click-deploy`.

4. On the row for the `Gemma 2 (Version 1)` model, click
   **Actions** , and then
   click **Undeploy model from endpoint**.

5. In the **Undeploy model from endpoint** dialog, click **Undeploy**.

6. Click the **Back** button to return to the **Endpoints** page.

   [Go to the Endpoints page](https://console.cloud.google.com/agent-platform/online-prediction/endpoints)
7. At the end of the `gemma2-2b-it-mg-one-click-deploy` row, click
   **Actions** , and then
   select **Delete endpoint**.

8. In the confirmation prompt, click **Confirm**.

### gcloud

To undeploy the model and delete the endpoint using the Google Cloud CLI,
follow these steps.

In these commands, replace:

- <var translate="no">PROJECT_ID</var> with your project name
- <var translate="no">LOCATION_ID</var> with the region where you deployed the model and endpoint
- <var translate="no">ENDPOINT_ID</var> with the endpoint ID
- <var translate="no">DEPLOYED_MODEL_NAME</var> with the model's display name
- <var translate="no">DEPLOYED_MODEL_ID</var> with the model ID

1. Get the endpoint ID by running the [`gcloud ai endpoints list`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/list)
   command. This command lists the endpoint IDs for all endpoints in your
   project. Make a note of the ID of the endpoint used in this tutorial.

       gcloud ai endpoints list \
           --project=PROJECT_ID \
           --region=LOCATION_ID

   The output looks like this. In the output, the ID is called
   `ENDPOINT_ID`.

       Using endpoint [https://us-central1-aiplatform.googleapis.com/]
       ENDPOINT_ID: 1234567891234567891
       DISPLAY_NAME: gemma2-2b-it-mg-one-click-deploy

2. Get the model ID by running the [`gcloud ai models describe`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/models/describe)
   command. Make a note of the ID of the model you deployed in this
   tutorial.

       gcloud ai models describe DEPLOYED_MODEL_NAME \
           --project=PROJECT_ID \
           --region=LOCATION_ID

   The abbreviated output looks like this. In the output, the ID is called
   `deployedModelId`.

       Using endpoint [https://us-central1-aiplatform.googleapis.com/]
       artifactUri: [URI removed]
       baseModelSource:
         modelGardenSource:
           publicModelName: publishers/google/models/gemma2
       ...
       deployedModels:
       - deployedModelId: '1234567891234567891'
         endpoint: projects/12345678912/locations/us-central1/endpoints/12345678912345
       displayName: gemma2-2b-it-12345678912345
       etag: [ETag removed]
       modelSourceInfo:
         sourceType: MODEL_GARDEN
       name: projects/123456789123/locations/us-central1/models/gemma2-2b-it-12345678912345
       ...

3. Undeploy the model from the endpoint. You'll need the endpoint ID and
   model ID from the previous commands.

       gcloud ai endpoints undeploy-model ENDPOINT_ID \
           --project=PROJECT_ID \
           --region=LOCATION_ID \
           --deployed-model-id=DEPLOYED_MODEL_ID

   This command produces no output.
4. Run the [`gcloud ai endpoints delete`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/delete) command to delete
   the endpoint.

       gcloud ai endpoints delete ENDPOINT_ID \
           --project=PROJECT_ID \
           --region=LOCATION_ID

   When promted, type `y` to confirm. This command produces no output.

#### Delete the model

### Console

1. Go to the **Model Registry** page from the Agent Platform section
   in the Google Cloud console.

   [Go to the Model Registry page](https://console.cloud.google.com/agent-platform/models)
2. In the **Region** drop-down list, choose the region where you deployed
   your model.

3. At the end of the `gemma2-2b-it-1234567891234` row, click
   **Actions**.

4. Select **Delete model**.

   When you delete the model, all associated model versions and evaluations
   are deleted from your Google Cloud project.
5. In the confirmation prompt, click **Delete**.

### gcloud

To delete the model using the Google Cloud CLI, provide the model's display
name and region to the [`gcloud ai models delete`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/models/delete) command.

    gcloud ai models delete DEPLOYED_MODEL_NAME \
        --project=PROJECT_ID \
        --region=LOCATION_ID

Replace <var translate="no">DEPLOYED_MODEL_NAME</var> with the model's display name.
Replace <var translate="no">PROJECT_ID</var> with your project name. Replace
<var translate="no">LOCATION_ID</var> with the region where you deployed the model.

## What's next

- Learn more about [Gemma open models](https://ai.google.dev/gemma/docs).
- Read the [Gemma Terms of Use](https://ai.google.dev/gemma/terms).
- Learn more about [open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-open-models).
- Learn how to [deploy a tuned model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#deploy_a_tuned_model).
- Learn how to [deploy Gemma 2 to Google Kubernetes Engine using HuggingFace Textgen Inference (TGI)](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/serve-gemma-gpu-tgi).
- Learn more about the `PredictionServiceClient` in your preferred language: [Python](https://docs.cloud.google.com/python/docs/reference/aiplatform/1.18.2/google.cloud.aiplatform_v1beta1.services.prediction_service.PredictionServiceClient), [Node.js](https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/3.13.0/aiplatform/v1.predictionserviceclient), [Java](https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient), or [Go](https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/1.0.0/apiv1#cloud_google_com_go_aiplatform_apiv1_PredictionClient_Predict).
