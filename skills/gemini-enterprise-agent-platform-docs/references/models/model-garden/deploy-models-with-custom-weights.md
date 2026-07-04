> [!WARNING]
> **Preview**
>
> Deploy models with custom weights is a
> Preview offering, subject to the "Pre-GA Offerings Terms" of the [Google Cloud Service
> Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and features may have limited support, and
> changes to Pre-GA products and features may not be compatible with other
> Pre-GA versions. For more information, see the [launch stage
> descriptions](https://cloud.google.com/products#product-launch-stages). Further, by using the Gemini API on
> Gemini Enterprise Agent Platform, you agree to the Generative AI Preview [terms and conditions](https://cloud.google.com/trustedtester/aitos)(Preview Terms).

> [!NOTE]
> To see an example of deploying models with custom weights,
> run the "Import, deploy, and serve custom open models on using SDK." notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/open-models/get_started_with_model_garden_sdk_custom_import.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fopen-models%2Fget_started_with_model_garden_sdk_custom_import.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/open-models/get_started_with_model_garden_sdk_custom_import.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/open-models/get_started_with_model_garden_sdk_custom_import.ipynb)

Deploy models with custom weights is a Preview offering. You can fine tune
models based on a predefined set of base models, and deploy your customized
models on Gemini Enterprise Agent Platform Model Garden. You can deploy your custom
models using the custom weights import by uploading your model artifacts to
a Cloud Storage bucket in your project, which is a one-click experience in
Agent Platform.

VPC Service Controls support for custom weights is available.

### Supported models

The public preview of *Deploy models with custom weights* is supported by the
following base models:

| **Model name** | **Version** |
|---|---|
| Llama | - Llama-2: 7B, 13B - Llama-3.1: 8B, 70B - Llama-3.2: 1B, 3B - Llama-4: Scout-17B, Maverick-17B - CodeLlama-13B |
| Gemma | - Gemma-2: 9B, 27B - Gemma-3: 1B, 4B, 3-12B, 27B - Gemma-4: 26B-A4B-it, 31B-it, E2B-it, E4B-it - Medgemma: 4B, 27B-text |
| Qwen | - Qwen2: 1.5B - Qwen2.5: 0.5B, 1.5B, 7B, 32B - Qwen3: 0.6B, 1.7B, 4B, 8B, 32B, Qwen3-Coder-480B-A35B-Instruct, Qwen3-Next-80B-A3B-Instruct, Qwen3-Next-80B-A3B-Thinking, Qwen3-VL-8B-Instruct - Qwen3.5: 9B |
| Deepseek | - Deepseek-R1 - Deepseek-V3 - DeepSeek-V3.1 |
| Mistral and Mixtral | - Mistral-7B-v0.1 - Mixtral-8x7B-v0.1 - Mistral-Nemo-Base-2407 |
| Phi-4 | - Phi-4-reasoning |
| OpenAI OSS | - gpt-oss: 20B, 120B |

### Limitations

Custom weights don't support the import of [quantized
models](https://ai.google.dev/edge/litert/models/post_training_quantization).

### Model files

You must supply the model files in the Hugging Face weights format. For more
information on the Hugging Face weights format, see [Use Hugging Face
Models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hugging-face-models).

If the required files aren't provided, the model deployment might fail.

This table lists the types of model files, which depend on the model's
architecture:

| **Model file content** | **File type** |
|---|---|
| Model configuration | - `config.json` |
| Model weights | - `*.safetensors` - `*.bin` |
| Weights index | - `*.index.json` |
| Tokenizer file(s) | - `tokenizer.model` - `tokenizer.json` - `tokenizer_config.json` |

### Locations

You can deploy custom models in all regions from Model Garden services.

### Prerequisites

This section demonstrates how to deploy your custom model.

#### Before you begin

1. In the Google Cloud console, activate Cloud Shell.

   [Activate Cloud Shell](https://console.cloud.google.com/?cloudshell=true)

   At the bottom of the Google Cloud console, a
   [Cloud Shell](https://docs.cloud.google.com/shell/docs/how-cloud-shell-works)
   session starts and displays a command-line prompt. Cloud Shell is a shell environment
   with the Google Cloud CLI
   already installed and with values already set for
   your current project. It can take a few seconds for the session to initialize.

This tutorial assumes that you are using [Cloud Shell](https://docs.cloud.google.com/shell/docs) to
interact with Google Cloud. If you want to use a different shell instead of
Cloud Shell, then perform the following additional configuration:

1.
   [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.

2. If you're using an external identity provider (IdP), you must first
   [sign in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

3.
   To [initialize](https://docs.cloud.google.com/sdk/docs/initializing) the gcloud CLI, run the following command:

   ```bash
   gcloud init
   ```

### Deploy the custom model

This section demonstrates how to deploy your custom model.

If you're using the command-line interface (CLI), Python, or JavaScript, replace
the following variables with a value for your code samples to work:

- **<var translate="no">REGION</var>** : Your region. For example, `uscentral1`.
- **<var translate="no">MODEL_GCS</var>** : Your Google Cloud model. For example, `gs://custom-weights-fishfooding/meta-llama/Llama-3.2-1B-Instruct`.
- **<var translate="no">PROJECT_ID</var>**: Your project ID.
- **<var translate="no">MODEL_ID</var>**: Your model ID.
- **<var translate="no">MACHINE_TYPE</var>** : Your machine type. For example, `g2-standard-12`.
- **<var translate="no">ACCELERATOR_TYPE</var>** : Your accelerator type. For example, `NVIDIA_L4`.
- **<var translate="no">ACCELERATOR_COUNT</var>**: Your accelerator count.
- **<var translate="no">PROMPT</var>**: Your text prompt.

### Console

The following steps show you how to use the Google Cloud console to deploy your
model with custom weights.

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Click **Deploy model with custom weights** . The **Deploy a model with
   custom weights** pane appears.

3. In the **Model source** section, do the following:

   1. Click **Browse** , and choose your bucket where your model is stored, and
      click **Select**.

   2. Optional: Enter your model's name in the **Model name** field.

4. In the **Deployment settings** section, do the following:

   1. From the **Region** field, select your region, and click **OK**.

   2. In the **Machine Spec** field, select your machine specification, which
      is used to the deploy your model.

   3. Optional: In the **Endpoint name** field, your model's endpoint appears
      by default. However, you can enter a different endpoint name in the
      field.

   4. If your project enforces VPC-SC or if you'd prefer private access,
      select **Private (Private Service Connect)** from the
      **Endpoint access** field. Otherwise, select **Public**.

   5. If you use a Private Service Connect, enter your project IDs into
      the **Project IDs** field that are the projects where your query
      clients run, or click **Select project IDs** to display a dialog
      containing project IDs.

      If you click **Select project IDs**, do the following:
      1. Find your project containing the code that's trying to access the model.
      2. Click your project's checkbox.
      3. Click **Select**.
5. Click **Deploy**.

### gcloud CLI

This command demonstrates how to deploy the model to a specific region.

    gcloud ai model-garden models deploy --model=${MODEL_GCS} --region ${REGION}

This command demonstrates how to deploy the model to a specific region with
its machine type, accelerator type, and accelerator count. If you want to
select a specific machine configuration, then you must set all three fields.

    gcloud ai model-garden models deploy --model=${MODEL_GCS} --machine-type=${MACHINE_TYE} --accelerator-type=${ACCELERATOR_TYPE} --accelerator-count=${ACCELERATOR_COUNT} --region ${REGION}

### Python

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.cloud import aiplatform
    from vertexai.preview import model_garden

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=${PROJECT_ID}, location=${REGION})
    custom_model = model_garden.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1beta1.types.DeployRequest.CustomModel.html(
      gcs_uri=GCS_URI,
    )
    endpoint = custom_model.deploy(
      machine_type="${MACHINE_TYPE}",
      accelerator_type="${ACCELERATOR_TYPE}",
      accelerator_count="${ACCELERATOR_COUNT}",
      model_display_name="custom-model",
      endpoint_display_name="custom-model-endpoint")

    endpoint.predict(instances=[{"prompt": "${PROMPT}"}], use_dedicated_endpoint=True)

Alternatively, you don't have to pass a parameter to the
`custom_model.deploy()` method.

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.cloud import aiplatform
    from vertexai.preview import model_garden

    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=${PROJECT_ID}, location=${REGION})
    custom_model = model_garden.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1beta1.types.DeployRequest.CustomModel.html(
      gcs_uri=GCS_URI,
    )
    endpoint = custom_model.deploy()

    endpoint.predict(instances=[{"prompt": "${PROMPT}"}], use_dedicated_endpoint=True)

### curl

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      "https://${REGION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${REGION}:deploy" \
      -d '{
        "custom_model": {
        "gcs_uri": "'"${MODEL_GCS}"'"
      },
      "destination": "projects/'"${PROJECT_ID}"'/locations/'"${REGION}"'",
      "model_config": {
         "model_user_id": "'"${MODEL_ID}"'",
      },
    }'

Alternatively, you can use the API to explicitly set the machine type.

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      "https://${REGION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${REGION}:deploy" \
      -d '{
        "custom_model": {
        "gcs_uri": "'"${MODEL_GCS}"'"
      },
      "destination": "projects/'"${PROJECT_ID}"'/locations/'"${REGION}"'",
      "model_config": {
         "model_user_id": "'"${MODEL_ID}"'",
      },
      "deploy_config": {
        "dedicated_resources": {
          "machine_spec": {
            "machine_type": "'"${MACHINE_TYPE}"'",
            "accelerator_type": "'"${ACCELERATOR_TYPE}"'",
            "accelerator_count": '"${ACCELERATOR_COUNT}"'
          },
          "min_replica_count": 1
        }
      }
    }'

## Deploy using the API

The VPC Service Controls only works with the private dedicated endpoint.
Therefore, you must set the `private_service_connect_config` in the following
code sample, which demonstrates how to deploy using the API:

### curl

      curl -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
        "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/YOUR_PROJECT/locations/us-central1:deploy" \
        -d '{
          "custom_model": {
            "model_id": "test-mg-deploy-092301",
            "gcs_uri": "gs://YOUR_GCS_BUCKET"
          },
          "destination": "projects/YOUR_PROJECT/locations/us-central1",
          "endpoint_config": {
            "endpoint_display_name": "psc-ep1",
            "private_service_connect_config": {
              "enablePrivateServiceConnect": true,
              "projectAllowlist": ["YOUR_PROJECT"]
            }
          },
          "deploy_config": {
            "dedicated_resources": {
              "machine_spec": {
                "machine_type": "g2-standard-24",
                "accelerator_type": "NVIDIA_L4",
                "accelerator_count": 2
              },
              "min_replica_count": 1,
              "max_replica_count": 1
            }
          }
        }'

## Get the endpoint ID and model ID using Google Cloud console

After the deployment has completed, follow these steps:

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Click **View my endpoints \& models**.

3. In the **My endpoints** table, check the endpoint that you just deployed
   from the \*\* the **Name** column. The **Details** page displays.

4. Click the model in the **Deployed models** table.

5. Select the **Version details** page. The model ID displays in the
   **Environment variables** row of the table.

## Set up a Private Service Connect

You're adding a new endpoint to access Google APIs. This endpoint can
be used in all regions of the VPC network that you select. Also, consider the
following:

- Clients in networks connected to the endpoint's VPC network using hybrid connectivity can access the endpoint. For more information, see [Access
  Google APIs through endpoints](https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-apis).
- Clients in peered VPC networks can't access the endpoint.

### List endpoint to get service attachment

This code sample demonstrates how to list an endpoint to get a service
attachment.

### curl

    $ curl \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/YOUR_PROJECT/locations/us-central1/endpoints/YOUR_ENDPOINT_ID"

This is the list endpoint response.

      {
      "name": "projects/440968033208/locations/us-central1/endpoints/mg-endpoint-2c6ae2be-1491-43fe-b179-cb5a63e2c955",
      "displayName": "psc-ep1",
      "deployedModels": [
        {
          "id": "4026753529031950336",
          "model": "projects/440968033208/locations/us-central1/models/mg-custom-1758645924",
          "displayName": "null-null-null-1758645933",
          "createTime": "2025-09-23T16:45:45.169195Z",
          "dedicatedResources": {
            "machineSpec": {
              "machineType": "g2-standard-24",
              "acceleratorType": "NVIDIA_L4",
              "acceleratorCount": 2
            },
            "minReplicaCount": 1,
            "maxReplicaCount": 1
          },
          "enableContainerLogging": true,
          "privateEndpoints": {
            "serviceAttachment": "projects/qdb392d34e2a11149p-tp/regions/us-central1/serviceAttachments/gkedpm-fbbc4061323c91c14ab4d961a2f8b0"
          },
          "modelVersionId": "1",
          "status": {
            "lastUpdateTime": "2025-09-23T17:26:10.031652Z",
            "availableReplicaCount": 1
          }
        }
      ],
      "trafficSplit": {
        "4026753529031950336": 100
      },
      "etag": "AMEw9yPIWQYdbpHu6g6Mhpu1_10J062_oR9Jw9txrp8dFFbel7odLgSK8CGIogAUkR_r",
      "createTime": "2025-09-23T16:45:45.169195Z",
      "updateTime": "2025-09-23T17:13:36.320873Z",
      "privateServiceConnectConfig": {
        "enablePrivateServiceConnect": true,
        "projectAllowlist": [
          "ucaip-vpc-s-1605069239-dut-24"
        ]
      }
    }

### Make a Private Service Connect

To make a Private Service Connect (PSC), follow these steps:

1. In the Google Cloud console, go to the
   **Private Service Connect** page. The **Connected endpoints** page
   displays.

   [Go to Private Service Connect](https://console.cloud.google.com/net-services/psc/list/consumers)
2. Click **+ Connect endpoint** . The **Connect endpoint** page appears.

3. Select an option from the **Target** field. You can choose **Google APIs**
   that provide access to most Google APIs and services or
   **Published service** that provides access to a published service.

4. From the **Target details** section, select a value from the **Scope**
   list, and select a value **Bundle type** list.

5. From the **Endpoint details** section, do the following:

   1. Enter a name in the **Endpoint name** field.
   2. Select a value from the **Network** list. Select a VPC network located in your project. If you must create a PSC endpoint in a service project that uses a Shared VPC network in a host project, use the Google Cloud CLI, or send an api request.
   3. Select a value from the **IP address** list.
6. Expand the **Service directory** section.

7. Select a region from the **Region** list.

8. Select a namespace from the **Namespace** list.

9. Click **Add endpoint** . The **Endpoints** table updates with a row for your
   new endpoint.

## Make a query

This section explains how to make a public endpoint and a private endpoint.

### Make a query to a public endpoint

After your model is deployed, custom weights support the public dedicated
endpoint. You can send queries using the API or the SDK.

Before sending queries, you must get your endpoint URL, endpoint ID, and model
ID, which are available in the Google Cloud console.

Follow these steps to get the information:

1. In the Google Cloud console, go to the **Model Garden** page.

   [Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Click **View my endpoints \& models**.

3. Select your region from the **Region** list.

4. To get the endpoint ID and the endpoint URL, click your endpoint from the
   **My endpoints** section.

   Your endpoint ID is displayed in the **Endpoint ID** field.

   Your public endpoint URL is displayed in the **Dedicated endpoint**
   field.

5. To get the model ID, find your model listed in the **Deployed models**
   section, and follow these steps:

   1. Click your deployed model's name in the **Model** field.
   2. Click **Version details** . Your model ID displays in the **Model ID** field.

After you get your endpoint and deployed model information, see the following
code samples for how to send an inference request, or see [Send an online
inference request to a dedicated public
endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/get-online-predictions#inference-request-dedicated).

### API

The following code samples demonstrate different ways to use the API based on
your use case.

**Chat completion (unary)**

This sample request sends a complete chat message to the model and gets a
response in a single chunk after the entire response is generated. This is
similar to sending a text message and getting a single full reply.

      curl -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
        "https://${ENDPOINT_URL}/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}/chat/completions" \
        -d '{
        "model": "'"${MODEL_ID}"'",
        "temperature": 0,
        "top_p": 1,
        "max_tokens": 154,
        "ignore_eos": true,
        "messages": [
          {
            "role": "user",
            "content": "How to tell the time by looking at the sky?"
          }
        ]
      }'

**Chat completion (streaming)**

This request is the streaming version of the unary chat completion request. By
adding `"stream": true` to the request, the model sends its response piece by
piece as it's being generated. This is useful for creating a real-time,
typewriter-like effect in a chat application.

      curl -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \  "https://${ENDPOINT_URL}/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}/chat/completions" \
        -d '{
        "model": "'"${MODEL_ID}"'",
        "stream": true,
        "temperature": 0,
        "top_p": 1,
        "max_tokens": 154,
        "ignore_eos": true,
        "messages": [
          {
            "role": "user",
            "content": "How to tell the time by looking at the sky?"
          }
        ]
      }'

**Predict**

This request sends a direct prompt to get an inference from a model. This is
often used for tasks that aren't necessarily conversational, like text
summarization or classification.

      curl -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
      "https://${ENDPOINT_URL}/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}:predict" \
        -d '{
        "instances": [
          {
            "prompt": "How to tell the time by looking at the sky?",
            "temperature": 0,
            "top_p": 1,
            "max_tokens": 154,
            "ignore_eos": true
          }
        ]
      }'

**Raw predict**

This request is a streaming version of the *Predict* request. By using the
`:streamRawPredict` endpoint and including `"stream": true`, this request
sends a direct prompt and receives the model's output as a continuous stream
of data as it's generated, which is similar to the streaming chat completion
request.

      curl -X POST \
        -N \
        --output - \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
        "https://${ENDPOINT_URL}/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}:streamRawPredict" \
        -d '{
        "instances": [
          {
            "prompt": "How to tell the time by looking at the sky?",
            "temperature": 0,
            "top_p": 1,
            "max_tokens": 154,
            "ignore_eos": true,
            "stream": true
          }
        ]
      }'

### SDK

This code sample uses the SDK to send a query to a model and
get a response back from that model.

      from google.cloud import aiplatform

      project_id = ""
      location = ""
      endpoint_id = "" # Use the short ID here

      aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=project_id, location=location)

      endpoint = aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Endpoint.html(endpoint_id)

      prompt = "How to tell the time by looking at the sky?"
      instances=[{"text": prompt}]
      response = endpoint.predict(instances=instances, use_dedicated_endpoint=True)
      print(response.predictions)

### Make a query for a private endpoint

You can test your query by using a notebook or VM in the allowed project.

This sample query lets you replace variables with your IP, project, endpoint ID,
and model ID (got from Deploy step above)

### curl

Chat completion

    curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" 'https://YOUR_IP/v1beta1/projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION/endpoints/YOUR_ENDPOINT_ID/chat/completions' -d '{ "model": "YOUR_MODEL_ID", "max_tokens": 300, "messages": [{ "role": "user", "content": "how to tell the time by looking at sky?" }]}'

Predict

    $ curl -k -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" 'https:/YOUR_IP/v1beta1/projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION/endpoints/YOUR_ENDPOINT_ID:predict' -d '{
      "instances": [
        {
          "prompt": "Summarize Goog stock performance",
          "temperature": 0,
          "top_p": 1,
          "max_tokens": 154,
          "ignore_eos": true
        }
      ]
    }'

For another example of how to use the API, see the [Import Custom Weights
notebook](https://colab.sandbox.google.com/drive/1K58OnWTAeVEmDD_thffaAgm1u8eKY9-Q?usp=sharing).

## Learn more about self-deployed models in Gemini Enterprise Agent Platform

- For more information on Gemini Enterprise Agent Platform online prediction private dedicated endpoints, see [Use dedicated private endpoints based on
  Private Service Connect for online
  inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/private-service-connect).
- For more information about self-deployed models, see [Overview of
  self-deployed
  models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/self-deployed-models).
- For more information about Model Garden, see [Overview of
  Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models).
- For more information about deploying models, see [Use models in
  Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models).
- [Use Gemma open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-gemma)
- [Use Llama open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-llama)
- [Use Hugging Face open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hugging-face-models)
