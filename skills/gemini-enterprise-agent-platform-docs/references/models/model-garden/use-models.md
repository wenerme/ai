Discover, test, tune, and deploy models by using Model Garden in the
Google Cloud console. You can also deploy Model Garden models by using the
Google Cloud CLI.

## Send test prompts

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Find a supported model that you want to test and click **View details**.

3. Click **Open prompt design**.

   You're taken to the **Prompt design** page.
4. In **Prompt**, enter the prompt that you want to test.

5. Optional: Configure the model parameters.

6. Click **Submit**.

## Tune a model

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. In **Search models** , enter **Gemma 3**, then click the
   magnifying glass to search.

3. Click **View details** on the **Gemma 3** model card.

4. Click **Open fine-tuning pipeline**.

   You're taken to the Agent Platform Pipelines page.
5. To start tuning, click **Create run**.

### Tune in a notebook

The model cards for most open source foundation models and fine-tunable models
support tuning in a notebook.

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Find a supported model that you want to tune and go to its model card.

3. Click **Open notebook**.

## Deploy an open model

You can deploy a model by using its model card in the Google Cloud console or
programmatically.

For more information about setting up the Google Gen AI SDK or Google Cloud CLI,
see the [Google Gen AI SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/sdks/overview) overview or
[Install the Google Cloud CLI](https://docs.cloud.google.com/sdk/docs/install).

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

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

1. List the models that you can deploy and record the model ID to deploy. You
   can optionally list the supported Hugging Face models in
   Model Garden and even filter them by model names. The output
   doesn't include any tuned models.

       import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
       from vertexai import model_garden

       # TODO(developer): Update and un-comment below lines
       # PROJECT_ID = "your-project-id"
       https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="us-central1")

       # List deployable models, optionally list Hugging Face models only or filter by model name.
       deployable_models = model_garden.list_deployable_models(list_hf_models=False, model_filter="gemma")
       print(deployable_models)
       # Example response:
       # ['google/gemma2@gemma-2-27b','google/gemma2@gemma-2-27b-it', ...]

2. View the deployment specifications for a model by using the model ID from
   the previous step. You can view the machine type, accelerator type, and
   container image URI that Model Garden has verified for a particular
   model.

       import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
       from vertexai import model_garden

       # TODO(developer): Update and un-comment below lines
       # PROJECT_ID = "your-project-id"
       # model = "google/gemma3@gemma-3-1b-it"
       https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="us-central1")

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

       import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
       from vertexai import model_garden

       # TODO(developer): Update and un-comment below lines
       # PROJECT_ID = "your-project-id"
       https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="us-central1")

       open_model = model_garden.OpenModel("google/gemma3@gemma-3-12b-it")
       endpoint = open_model.deploy(
           machine_type="g2-standard-48",
           accelerator_type="NVIDIA_L4",
           accelerator_count=4,
           accept_eula=True,
       )

       # Optional. Run predictions on the deployed endoint.
       # endpoint.predict(instances=[{"prompt": "What is Generative AI?"}])

### REST

List all deployable models and then get the ID of the model to deploy. You can
then deploy the model with its default configuration and endpoint. Or, you can
choose to customize your deployment, such as setting a specific machine type or
using a dedicated endpoint.

### 1. List models that you can deploy

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

### 2. Deploy a model

Deploy a model from Model Garden or a model from Hugging Face. You can
also customize the deployment by specifying additional JSON fields.

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

### gcloud

Before you begin, specify a quota project to run the following commands. The
commands you run are counted against the quotas for that project. For more
information, see [Set the quota project](https://docs.cloud.google.com/docs/quotas/set-quota-project).

1. List the models that you can deploy by running the `gcloud ai model-garden
   models list` command. This command lists all model IDs and which ones you
   can self deploy.

       gcloud ai model-garden models list

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

   The output doesn't include any tuned models or Hugging Face models. To view
   which Hugging Face models are supported, add the
   `--can-deploy-hugging-face-models` flag.
2. To view the deployment specifications for a model, run the `gcloud ai
   model-garden models list-deployment-config` command. You can view the
   machine type, accelorator type, and container image URI that
   Model Garden supports for a particular model.

       gcloud ai model-garden models list-deployment-config \
           --model=MODEL_ID

   Replace <var translate="no">MODEL_ID</var> with the model ID from the previous list
   command, such as `google/gemma@gemma-2b` or
   `stabilityai/stable-diffusion-xl-base-1.0`.
3. Deploy a model to an endpoint by running the `gcloud ai model-garden models
   deploy` command. Model Garden generates a display name for your
   endpoint and uses the default deployment configuration unless you specify
   additional argument and values.

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
   used, the endpoint ID, and the deployment operation ID, which you can use to
   check the deployment status.

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

   Replace <var translate="no">LOCATION_ID</var> with the region where you deployed the model.

   The output includes all endpoints that were created from
   Model Garden and includes information such as the endpoint ID,
   endpoint name, and whether the endpoint is associated with a deployed model.
   To find your deployment, look for the endpoint name that was returned from
   the previous command.

### Terraform

To learn how to apply or remove a Terraform configuration, see
[Basic Terraform commands](https://docs.cloud.google.com/docs/terraform/basic-commands).

For more information, see the
[Terraform provider reference documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs).

### Deploy a model

The following example deploys the `gemma-3-1b-it` model to a new
Agent Platform endpoint in `us-central1` by using default
configurations.

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

To deploy a model with customization, see [Agent Platform Endpoint
with Model Garden
Deployment](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/vertex_ai_endpoint_with_model_garden_deployment)
for details.

### Apply the Configuration

    terraform init
    terraform plan
    terraform apply

After you apply the configuration, Terraform provisions a new
Agent Platform endpoint and deploys the specified open model.

### Clean Up

To delete the endpoint and model deployment, run the following command:

    terraform destroy

## Deploy a partner model and make prediction requests

In the Google Cloud console, go to the **Model Garden** page and use
the **Model collections** filter to view the **Self-deploy partner models** .
Choose from the list of self-deploy partner models, and purchase the model by
clicking **Enable**.

You must deploy on the partner's required machine types, as described in the
"Recommended hardware configuration" section on their Model Garden
model card. When deployed, the model serving resources are located in a secure
Google-managed project.

> [!NOTE]
> **Note:** For self-deploy partner models, if you have sufficient quotas but encounter serving quota issues during deployment, see [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/support/getting-support).

### Console

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. To find a specific model, enter its name in the Model Garden
   search box.

3. To view all the models that you can self-deploy, in the **Model
   collections** section of the filter pane, select **Self-deploy partner
   models**. The resulting list includes all the self-deployable partner
   models.

4. Click the name of the model to deploy, which opens its model card.

5. Click **Deploy options**.

6. In the **Deploy on Agent Platform** pane, configure your deployment
   such as the location and machine type.

7. Click **Deploy**.

After the deployment is complete, you can request predictions by using the SDK
or API. Additional instructions are available in the "Documentation" section on
the model card.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

### 1-click model deployment

You can self-deploy a partner model with 1-click deployment.

1. View the deployment specifications for a model by using the model ID from
   the previous step. You can view the machine type, accelerator type, and
   container image URI that Model Garden has verified for a particular
   model.

       import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
       from vertexai import model_garden

       https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="us-central1")

       model = model_garden.PartnerModel(model)
       deploy_options = model.list_deploy_options()
       print(deploy_options)

2. Deploy a model with 1-click deployment.

       from vertexai import model_garden

       # Deploy model
       model = model_garden.PartnerModel(f"{PUBLISHER}/{MODEL}@{VERSION}")

       endpoint = model.deploy(
           machine_type=MACHINE_TYPE,
           accelerator_type=ACCELERATOR_TYPE,
           accelerator_count=ACCELERATOR_COUNT,
           min_replica_count=1,
           max_replica_count=1,
       )

### Multi-step deployment

You can also upload a partner model, create an endpoint, and manually deploy the
model.

In your code, replace the following placeholders:

> [!NOTE]
> **Note:** The values for the **machine type** , **accelerator type** , and **accelerator count**, must all match one of the partner's recommended configurations. View the partner's Model Garden model card to see the recommended configurations.

- <var translate="no">LOCATION</var>: The region where you plan to deploy the model and endpoint.
- <var translate="no">PROJECT_ID</var>: Your project ID.
- <var translate="no">DISPLAY_NAME</var>: A descriptive name for the associated resource.
- <var translate="no">PUBLISHER_NAME</var>: The name of partner that provides the model to upload or deploy.
- <var translate="no">PUBLISHER_MODEL_NAME</var>: The name of the model to upload.
- <var translate="no">MACHINE_TYPE</var>: Defines the set of resources to deploy for your model, such as `g2-standard-4`. You must match one of the confirgurations provided by the partner.
- <var translate="no">ACCELERATOR_TYPE</var>: Specifies accelerators to add to your deployment to help improve performance when working with intensive workloads, such as `NVIDIA_L4`. You must match one of the confirgurations provided by the partner.
- <var translate="no">ACCELERATOR_COUNT</var>: The number of accelerators to use. You must match one of the confirgurations provided by the partner.
- <var translate="no">REQUEST_PAYLOAD</var>: The fields and values to include in your prediction request. View the partner's Model Garden model card to see the available fields.

    from google.cloud import aiplatform

    aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=PROJECT_ID, location=LOCATION)

    # Upload a model
    model = aiplatform.Model.upload(
        display_name="DISPLAY_NAME_MODEL",
        model_garden_source_model_name = f"publishers/PUBLISHER_NAME/models/PUBLISHER_MODEL_NAME",
    )

    # Create endpoint
    my_endpoint = aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Endpoint.html.create(display_name="DISPLAY_NAME_ENDPOINT")

    # Deploy model
    MACHINE_TYPE = "MACHINE_TYPE"  # @param {type: "string"}
    ACCELERATOR_TYPE = "ACCELERATOR_TYPE" # @param {type: "string"}
    ACCELERATOR_COUNT = ACCELERATOR_COUNT # @param {type: "number"}

    model.deploy(
        endpoint=my_endpoint,
        deployed_model_display_name="DISPLAY_NAME_DEPLOYED_MODEL",
        traffic_split={"0": 100},
        machine_type=MACHINE_TYPE,
        accelerator_type=ACCELERATOR_TYPE,
        accelerator_count=ACCELERATOR_COUNT,
        min_replica_count=1,
        max_replica_count=1,
    )

    # Unary call for predictions
    PAYLOAD = {
        REQUEST_PAYLOAD
    }

    request = json.dumps(PAYLOAD)

    response = my_endpoint.raw_predict(
        body = request,
        headers = {'Content-Type':'application/json'}
    )

    print(response)

    # Streaming call for predictions
    PAYLOAD = {
        REQUEST_PAYLOAD
    }

    request = json.dumps(PAYLOAD)

    for stream_response in my_endpoint.stream_raw_predict(
        body = request,
        headers = {'Content-Type':'application/json'}
    ):
        print(stream_response)

### REST

List all deployable models and then get the ID of the model to deploy. You can
then deploy the model with its default configuration and endpoint. Or, you can
choose to customize your deployment, such as setting a specific machine type or
using a dedicated endpoint.

In the sample curl commands, replace the following placeholders:

> [!NOTE]
> **Note:** The values for the **machine type** , **accelerator type** , and **accelerator count**, must all match one of the partner's recommended configurations. View the partner's Model Garden model card to see the recommended configurations.

- <var translate="no">LOCATION</var>: The region where you plan to deploy the model and endpoint.
- <var translate="no">PROJECT_ID</var>: Your project ID.
- <var translate="no">DISPLAY_NAME</var>: A descriptive name for the associated resource.
- <var translate="no">PUBLISHER_NAME</var>: The name of partner that provides the model to upload or deploy.
- <var translate="no">PUBLISHER_MODEL_NAME</var>: The name of the model to upload.
- <var translate="no">ENDPOINT_ID</var>: The ID of the endpoint.
- <var translate="no">MACHINE_TYPE</var>: Defines the set of resources to deploy for your model, such as `g2-standard-4`. You must match one of the confirgurations provided by the partner.
- <var translate="no">ACCELERATOR_TYPE</var>: Specifies accelerators to add to your deployment to help improve performance when working with intensive workloads, such as `NVIDIA_L4`. You must match one of the confirgurations provided by the partner.
- <var translate="no">ACCELERATOR_COUNT</var>: The number of accelerators to use. You must match one of the confirgurations provided by the partner.
- <var translate="no">REQUEST_PAYLOAD</var>: The fields and values to include in your prediction request. View the partner's Model Garden model card to see the available fields.

1. Upload a model to add it to your Model Registry.

       curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json" \
       https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/models:upload \
       -d '{
       "model": {
         "displayName": "DISPLAY_NAME_MODEL",
         "baseModelSource": {
           "modelGardenSource": {
             "publicModelName": f"publishers/PUBLISHER_NAME/models/PUBLISHER_MODEL_NAME",
           }
         }
       }
       }'

2. Create an endpoint.

       curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json" \
       https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints \
       -d '{
       "displayName": "DISPLAY_NAME_ENDPOINT"
       }'

3. Deploy the uploaded model to the endpoint.

       curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json" \
       https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:deployModel \
       -d '{
       "deployedModel": {
         "model": f"projects/PROJECT_ID/locations/LOCATION/models/MODEL_ID",
         "displayName": "DISPLAY_NAME_DEPLOYED_MODEL",
         "dedicatedResources": {
          "machineSpec": {
             "machineType": "MACHINE_TYPE",
             "acceleratorType": "ACCELERATOR_TYPE",
             "acceleratorCount":"ACCELERATOR_COUNT",
          },
          "minReplicaCount": 1,
          "maxReplicaCount": 1
         },
       },
       "trafficSplit": {
         "0": 100
       }
       }'

4. After the model is deployed, you can make an unary or streaming call for
   predictions. View the partner's Model Garden model card to see
   which API methods are supported.

   - Sample unary call:

       curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json" \
       https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:rawPredict \
       -d 'REQUEST_PAYLOAD'

   - Sample streaming call:

       curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json" \
       https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:streamRawPredict \
       -d 'REQUEST_PAYLOAD'

## Deploy a model to a private endpoint

You can deploy models from Model Garden to a Private Service Connect
(PSC) endpoint to create a secure and private connection to your model. This
setup can also be integrated with an internal and external regional Application Load Balancer when deployed with a PSC Network Endpoint Group. Follow the steps below to configure a PSC endpoint for
your model, ensuring private connectivity.

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Find a model to deploy and click its model card.

3. Click **Deploy model** .
   In the **Deploy model** pane, the predefined deployment settings are based on a
   public dedicated endpoint.

4. Select **edit setting** that enables further deployment options including
   private access.

5. Configure your deployment settings.

   - Select a location to create your model endpoint in.
   - Accept or modify the generated model and endpoint name.
   - Selecting a machine type for your deployment is optional, as the recommended configuration has been pre-selected for you.
   - For the **Reservation type** field, select a reservation type. The reservation must match your specified machine specs.
     - **Automatically use created reservation**: Gemini Enterprise Agent Platform selects an available reservation with matching properties. If no capacity is available in the selected reservation, Gemini Enterprise Agent Platform uses the general Google Cloud resource pool.
     - **Select specific reservations**: Gemini Enterprise Agent Platform uses a specific reservation. If no capacity is available in your selected reservation, the deployment fails.
     - **No reservation** (default): Gemini Enterprise Agent Platform uses the general Google Cloud resource pool.
   - Configure your availability policies.
     - **Standard**: Ideal for most workloads.
     - **Spot**: Ideal for fault-tolerant workloads.
     - **Flex Start**: Uses Dynamic Workload Scheduling (DWS) to manage and prioritize resource allocation requests
6. Configure endpoint Access for private networking.

   - Select **Private (Private Service Connect)**
   - Select **Project IDs**. To grant access to other projects, enter their Project IDs here. If you leave this blank, the endpoint can only be accessed from within the current project.
7. Click **Deploy**

8. To view your deployment, go to the **Model Garden** page and select
   **View my endpoints and models** to see it listed in the **My Endpoints**
   section. Make sure you have selected the correct region to ensure your
   endpoint is visible. Select the endpoint, the status will show as
   **Deploying** and will change to **Ready** once completed.

9. Obtain the Endpoint ID, then open Cloud Shell and perform the following to
   obtain the Private Service Attachment URI:

       gcloud ai endpoints describe ENDPOINT_ID --region=REGION  | grep -i serviceAttachment:

   Below is an example:

       user@cloudshell:$ gcloud ai endpoints describe 2124795225560842240 --region=europe-west4 | grep -i serviceAttachment:
       Using endpoint [https://europe-west4-aiplatform.googleapis.com/]
           serviceAttachment: projects/o9457b320a852208e-tp/regions/europe-west4/serviceAttachments/gkedpm-52065579567eaf39bfe24f25f7981d

After you get the service attachment, you have the following options to access
the model:

- [Deploy a PSC endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/private-service-connect#create_a_forwarding_rule) in the same VPC as the granted project. This approach allows for reachability over hybrid networking and within the same VPC. It's important to note that PSC endpoints are not reachable over VPC peering.
- Deploy a [Private Service Connect (PSC) Network Endpoint Group (NEG)](https://docs.cloud.google.com/vpc/docs/access-apis-managed-services-private-service-connect-backends#create-neg), you can do so within the same VPC as the allowed project. This allows you to expose the model through an internal or external load balancer, which provides several benefits:
  - Access over VPC peering: The load balancer can be accessed across peered VPC networks.
  - Security features: You get support for Cloud Armor and Model Armor to help protect your endpoint.
  - Traffic management: It enables advanced traffic routing, such as host and path rewriting.
  - Centralized access: A single Application Load Balancer can be used to route traffic to the model using path rules.

## View or manage an endpoint

To view and manage your endpoint, go to the Agent Platform
**Online prediction** page.

[Go to Online prediction](https://console.cloud.google.com/agent-platform/online-prediction/endpoints)

Agent Platform lists all endpoints in your project for a particular
region. Click an endpoint to view its details such as which models are deployed
to the endpoint.

## Undeploy models and delete resources

To stop a deployed model from using resources in your project, undeploy your
model from its endpoint. You must undeploy a model before you can delete the
endpoint and the model.

### Undeploy models

Undeploy a model from its endpoint.

### Console

1. In the Google Cloud console, go to the **Endpoints** tab on the **Online
   prediction** page.

   [Go to Endpoints](https://console.cloud.google.com/agent-platform/endpoints)
2. In the **Region** drop-down list, choose the region where your endpoint is
   located.

3. Click the endpoint name to open the details page.

4. On the row for the model, click **Actions** , and then select
   **Undeploy model from endpoint**.

5. In the **Undeploy model from endpoint** dialog, click **Undeploy**.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace:

- <var translate="no">PROJECT_ID</var> with your project ID
- <var translate="no">LOCATION</var> with your region, for example, "us-central1"
- <var translate="no">ENDPOINT_ID</var> with your endpoint ID

    from google.cloud import aiplatform

    aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=PROJECT_ID, location=LOCATION)

    # To find out which endpoints are available, un-comment the line below:
    # endpoints = aiplatform.Endpoint.list()

    endpoint = aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Endpoint.html(ENDPOINT_ID)
    endpoint.undeploy_all()

### gcloud

In these commands, replace:

- <var translate="no">PROJECT_ID</var> with your project name
- <var translate="no">LOCATION_ID</var> with the region where you deployed the model and endpoint
- <var translate="no">ENDPOINT_ID</var> with the endpoint ID
- <var translate="no">MODEL_ID</var> with the model ID from the list model command
- <var translate="no">DEPLOYED_MODEL_ID</var> with the deployed model ID

1. Find the endpoint ID that is associated with your deployment by running the
   [`gcloud ai endpoints list`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/list) command.

       gcloud ai endpoints list \
           --project=PROJECT_ID \
           --region=LOCATION_ID

2. Find the model ID by running the [`gcloud ai models list`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/models/list)
   command.

       gcloud ai models list \
           --project=PROJECT_ID \
           --region=LOCATION_ID

3. Use the model ID from the previous command to get the deployed model ID by
   running the [`gcloud ai models describe`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/models/describe) command.

       gcloud ai models describe MODEL_ID \
           --project=PROJECT_ID \
           --region=LOCATION_ID

   The abbreviated output looks like the following example. In the output, the
   ID is called `deployedModelId`.

       Using endpoint [https://us-central1-aiplatform.googleapis.com/]
       artifactUri: [URI removed]
       baseModelSource:
         modelGardenSource:
           publicModelName: publishers/google/models/gemma2
       ...
       deployedModels:
       -   deployedModelId: '1234567891234567891'
         endpoint: projects/12345678912/locations/us-central1/endpoints/12345678912345
       displayName: gemma2-2b-it-12345678912345
       etag: [ETag removed]
       modelSourceInfo:
         sourceType: MODEL_GARDEN
       name: projects/123456789123/locations/us-central1/models/gemma2-2b-it-12345678912345
       ...

4. Run the [`gcloud ai endpoints undeploy-model`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/undeploy-model) command to undeploy
   the model from the endpoint by using the endpoint ID and the deployed model
   ID from the previous commands.

       gcloud ai endpoints undeploy-model ENDPOINT_ID \
           --project=PROJECT_ID \
           --region=LOCATION_ID \
           --deployed-model-id=DEPLOYED_MODEL_ID

   This command produces no output.

### Delete endpoints

Delete the Gemini Enterprise Agent Platform endpoint that was associated with your model
deployment.

### Console

1. In the Google Cloud console, go to the **Endpoints** tab on the **Online
   prediction** page.

   [Go to Endpoints](https://console.cloud.google.com/agent-platform/endpoints)
2. In the **Region** drop-down list, choose the region your endpoint is
   located.

3. At the end of the endpoint's row, click **Actions** , and then select
   **Delete endpoint**.

4. In the confirmation prompt, click **Confirm**.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace:

- <var translate="no">PROJECT_ID</var> with your project ID
- <var translate="no">LOCATION</var> with your region, for example, "us-central1"
- <var translate="no">ENDPOINT_ID</var> with your endpoint ID

    from google.cloud import aiplatform

    aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=PROJECT_ID, location=LOCATION)

    # To find out which endpoints are available, un-comment the line below:
    # endpoints = aiplatform.Endpoint.list()

    endpoint = aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Endpoint.html(ENDPOINT_ID)
    endpoint.delete()

### gcloud

In these commands, replace:

- <var translate="no">PROJECT_ID</var> with your project name
- <var translate="no">LOCATION_ID</var> with the region where you deployed the model and endpoint
- <var translate="no">ENDPOINT_ID</var> with the endpoint ID

1. Get the endpoint ID to delete by running the
   [`gcloud ai endpoints list`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/list) command. This command lists the
   endpoint IDs for all endpoints in your project.

       gcloud ai endpoints list \
           --project=PROJECT_ID \
           --region=LOCATION_ID

2. Run the [`gcloud ai endpoints delete`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/delete) command to delete the
   endpoint.

       gcloud ai endpoints delete ENDPOINT_ID \
           --project=PROJECT_ID \
           --region=LOCATION_ID

   When prompted, type `y` to confirm. This command produces no output.

### Delete models

Delete the model resource that was associated with your model deployment.

### Console

1. Go to the **Model Registry** page from the Agent Platform section in
   the Google Cloud console.

   [Go to the Model Registry page](https://console.cloud.google.com/agent-platform/models)
2. In the **Region** drop-down list, choose the region where you deployed your
   model.

3. On the row for your model, click **Actions** and then select
   **Delete model**.

   When you delete the model, all associated model versions and evaluations are
   deleted from your Google Cloud project.
4. In the confirmation prompt, click **Delete**.

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace:

- <var translate="no">PROJECT_ID</var> with your project ID
- <var translate="no">LOCATION</var> with your region, for example, "us-central1"
- <var translate="no">MODEL_ID</var> with your model ID

    from google.cloud import aiplatform

    aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=PROJECT_ID, location=LOCATION)

    # To find out which models are available in Model Registry, un-comment the line below:
    # models = aiplatform.Model.list()

    model = aiplatform.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Model.html(MODEL_ID)
    model.delete()

### gcloud

In these commands, replace:

- <var translate="no">PROJECT_ID</var> with your project name
- <var translate="no">LOCATION_ID</var> with the region where you deployed the model and endpoint
- <var translate="no">MODEL_ID</var> with the model ID from the list model command

1. Find the model ID to delete by running the
   [`gcloud ai models list`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/models/list) command.

       gcloud ai models list \
           --project=PROJECT_ID \
           --region=LOCATION_ID

2. Run the [`gcloud ai models delete`](https://docs.cloud.google.com/sdk/gcloud/reference/ai/models/delete) command to delete the model
   by providing the model ID and the model's location.

       gcloud ai models delete MODEL_ID \
           --project=PROJECT_ID \
           --region=LOCATION_ID

## View code samples

Most of the model cards for task-specific solutions models contain code samples
that you can copy and test.

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Find a supported model that you want to view code samples for and click the
   **Documentation** tab.

3. The page scrolls to the documentation section with sample code embedded in
   place.

## Create a vision app

The model cards for applicable computer vision models support creating a vision
application.

1. In the Google Cloud console, go to the **Model Garden** page.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Find a vision model in the Task specific solutions section that you want to
   use to create a vision application and click **View details**.

3. Click **Build app**.

   You're taken to Vertex AI Vision.
4. In **Application name** , enter a name for your application and click
   **Continue**.

5. Select a billing plan and click **Create**.

   You're taken to Vertex AI Vision Studio where you can continue
   creating your computer vision application.
