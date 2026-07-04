> [!NOTE]
> To see examples of deploying Llama 3.2 3B with custom vLLM containers,
> run the following notebooks in the environment of your choice:
>
> - "Deploy Llama 3.2 3B on CPU using vLLM":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_cpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fprediction%2Fvertexai_serving_vllm%2Fvertexai_serving_vllm_cpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_cpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_cpu_llama3_2_3B.ipynb)
> - "Deploy Llama 3.2 3B on GPU using vLLM":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_gpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fprediction%2Fvertexai_serving_vllm%2Fvertexai_serving_vllm_gpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_gpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_gpu_llama3_2_3B.ipynb)
> - "Deploy Llama 3.2 3B on TPU using vLLM with GCS weights":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_tpu_gcs_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fprediction%2Fvertexai_serving_vllm%2Fvertexai_serving_vllm_tpu_gcs_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_tpu_gcs_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_tpu_gcs_llama3_2_3B.ipynb)
> - "Deploy Llama 3.2 3B on TPU using vLLM":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_tpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fprediction%2Fvertexai_serving_vllm%2Fvertexai_serving_vllm_tpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_tpu_llama3_2_3B.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/prediction/vertexai_serving_vllm/vertexai_serving_vllm_tpu_llama3_2_3B.ipynb)

Although the various Gemini Enterprise Agent Platform model serving options are
sufficient for many use cases, you might need to use your own container images
to serve models on Gemini Enterprise Agent Platform. This document describes how to use a vLLM custom
container image to serve models on Gemini Enterprise Agent Platform on CPUs, GPUs, or TPUs.
For more information about vLLM supported models, see the [vLLM
documentation](https://docs.vllm.ai/en/stable/models/supported_models.html).

The vLLM API server implements the OpenAI API protocol, but it does not support the
Gemini Enterprise Agent Platform request and response requirements. Therefore, you must use a
Gemini Enterprise Agent Platform [Raw Inference
Request](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/get-online-predictions#raw-inference-request)
to get inferences from models deployed to
Gemini Enterprise Agent Platform using a [Prediction
Endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment). For more
information about the Raw Prediction method in the Gemini Enterprise Agent Platform Python SDK, see the
[Python SDK
documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.Endpoint#google_cloud_aiplatform_Endpoint_raw_predict).

You can source models from both Hugging Face and Cloud Storage. This
approach offers flexibility, which lets you take advantage of the
community-driven model hub (Hugging Face) and the
optimized data transfer and security capabilities of Cloud Storage for internal
model management or fine-tuned versions.

vLLM downloads the models from Hugging Face if a Hugging Face access token is
provided. Otherwise, vLLM assumes the model is available on local disk. The
custom container image lets Gemini Enterprise Agent Platform download the model from
Google Cloud in addition to Hugging Face.

## Before you begin

1. In your Google Cloud project, enable the Gemini Enterprise Agent Platform and Artifact Registry
   APIs.

       gcloud services enable aiplatform.googleapis.com \
           artifactregistry.googleapis.com

2. Configure Google Cloud CLI with your project ID and initialize
   Vertex AI SDK.

       PROJECT_ID = "PROJECT_ID"
       LOCATION = "LOCATION"
       import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
       https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

       gcloud config set project {PROJECT_ID}

3. Create a Docker repository in Artifact Registry.

       gcloud artifacts repositories create DOCKER_REPOSITORY \
           --repository-format=docker \
           --location=LOCATION \
           --description="Agent Platform Docker repository"

4. Optional: If downloading models from Hugging Face, obtain a Hugging Face
   token.

   1. Create a [Hugging Face account](https://huggingface.co/) if you don't have one.
   2. For **gated models** like Llama 3.2, request and receive access on Hugging Face before proceeding.
   3. Generate an access token: Go to **Your Profile \> Settings \> Access Tokens**.
   4. Select **New Token**.
   5. Specify a name and a role of at least **Read**.
   6. Select **Generate a token**.
   7. Save this token for the deployment steps.

## Prepare container build files

The following `Dockerfile` builds the vLLM custom container image for GPUs,
TPUs, and CPUs. This custom container downloads models from Hugging Face or
Cloud Storage.

    ARG BASE_IMAGE
    FROM ${BASE_IMAGE}

    ENV DEBIAN_FRONTEND=noninteractive
    # Install gcloud SDK
    RUN apt-get update && \
        apt-get install -y apt-utils git apt-transport-https gnupg ca-certificates curl \
        && echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
        && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg \
        && apt-get update -y && apt-get install google-cloud-cli -y \
        && rm -rf /var/lib/apt/lists/*

    WORKDIR /workspace/vllm

    # Copy entrypoint.sh to the container
    COPY ./entrypoint.sh /workspace/vllm/vertexai/entrypoint.sh
    RUN chmod +x /workspace/vllm/vertexai/entrypoint.sh

    ENTRYPOINT ["/workspace/vllm/vertexai/entrypoint.sh"]

Build the custom container image using Cloud Build. The following
`cloudbuild.yaml` configuration file shows how to build the image for multiple
platforms using the same Dockerfile.

    steps:
    -   name: 'gcr.io/cloud-builders/docker'
      automapSubstitutions: true
      script: |
          #!/usr/bin/env bash
          set -euo pipefail
          device_type_param=${_DEVICE_TYPE}
          device_type=${device_type_param,,}
          base_image=${_BASE_IMAGE}
          image_name="vllm-${_DEVICE_TYPE}"
          if [[ $device_type == "cpu" ]]; then
            echo "Quietly building open source vLLM CPU container image"
            git clone https://github.com/vllm-project/vllm.git
            cd vllm && DOCKER_BUILDKIT=1 docker build -t $base_image -f docker/Dockerfile.cpu . -q
            cd ..
          fi
          echo "Quietly building container image for: $device_type"
          docker build -t $LOCATION-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/$image_name --build-arg BASE_IMAGE=$base_image . -q
          docker push $LOCATION-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/$image_name
    substitutions:
        _DEVICE_TYPE: gpu
        _BASE_IMAGE: vllm/vllm-openai
        _REPOSITORY: my-docker-repo

The files are available in the `googlecloudplatform/vertex-ai-samples` GitHub
repository. Clone the repository to use them:

    git clone https://github.com/GoogleCloudPlatform/vertex-ai-samples.git

## Build and push the container image

Build the custom container image using Cloud Build by submitting the
`cloudbuild.yaml` file. Use substitutions to specify the target device type,
which can be GPU, TPU, or CPU, and the corresponding base image.

### GPU

    DEVICE_TYPE="gpu"
    BASE_IMAGE="vllm/vllm-openai"
    cd vertex-ai-samples/notebooks/official/prediction/vertexai_serving_vllm/cloud-build && \
    gcloud builds submit \
        --config=cloudbuild.yaml \
        --region=LOCATION \
        --timeout="2h" \
        --machine-type=e2-highcpu-32 \
        --substitutions=_REPOSITORY=DOCKER_REPOSITORY,_DEVICE_TYPE=$DEVICE_TYPE,_BASE_IMAGE=$BASE_IMAGE

### TPU

    DEVICE_TYPE="tpu"
    BASE_IMAGE="vllm/vllm-tpu:nightly"
    cd vertex-ai-samples/notebooks/official/prediction/vertexai_serving_vllm/cloud-build && \
    gcloud builds submit \
        --config=cloudbuild.yaml \
        --region=LOCATION \
        --timeout="2h" \
        --machine-type=e2-highcpu-32 \
        --substitutions=_REPOSITORY=DOCKER_REPOSITORY,_DEVICE_TYPE=$DEVICE_TYPE,_BASE_IMAGE=$BASE_IMAGE

### CPU

    DEVICE_TYPE="cpu"
    BASE_IMAGE="vllm-cpu-base"
    cd vertex-ai-samples/notebooks/official/prediction/vertexai_serving_vllm/cloud-build && \
    gcloud builds submit \
        --config=cloudbuild.yaml \
        --region=LOCATION \
        --timeout="2h" \
        --machine-type=e2-highcpu-32 \
        --substitutions=_REPOSITORY=DOCKER_REPOSITORY,_DEVICE_TYPE=$DEVICE_TYPE,_BASE_IMAGE=$BASE_IMAGE

After the build finishes, configure Docker to authenticate with Artifact Registry:

    gcloud auth configure-docker LOCATION-docker.pkg.dev --quiet

## Upload model to Model Registry and deploy

Upload your model to Model Registry,
create an endpoint, and deploy the model by completing these steps. This example
uses Llama 3.2 3B, but you can adapt it for other models.

1. Define model and deployment variables. Set the `DOCKER_URI` variable to the
   image you built in the previous step (for example, for GPU):

       DOCKER_URI = f"LOCATION-docker.pkg.dev/PROJECT_ID/DOCKER_REPOSITORY/vllm-gpu"

   Define variables for the Hugging Face token and model properties. For example,
   for GPU deployment:

       hf_token = "your-hugging-face-auth-token"
       model_name = "gpu-llama3_2_3B-serve-vllm"
       model_id = "meta-llama/Llama-3.2-3B"
       machine_type = "g2-standard-8"
       accelerator_type = "NVIDIA_L4"
       accelerator_count = 1

2. Upload model to Model Registry. The `upload_model`
   function varies slightly depending on the device type because of different
   vLLM arguments and environment variables.

       from google.cloud import aiplatform

       def upload_model_gpu(model_name, model_id, hf_token, accelerator_count, docker_uri):
           vllm_args = [
               "python3", "-m", "vllm.entrypoints.openai.api_server",
               "--host=0.0.0.0", "--port=8080", f"--model={model_id}",
               "--max-model-len=2048", "--gpu-memory-utilization=0.9",
               "--enable-prefix-caching", f"--tensor-parallel-size={accelerator_count}",
           ]
           env_vars = {
               "HF_TOKEN": hf_token,
               "LD_LIBRARY_PATH": "$LD_LIBRARY_PATH:/usr/local/nvidia/lib64",
           }
           model = aiplatform.Model.upload(
               display_name=model_name,
               serving_container_image_uri=docker_uri,
               serving_container_args=vllm_args,
               serving_container_ports=[8080],
               serving_container_predict_route="/v1/completions",
               serving_container_health_route="/health",
               serving_container_environment_variables=env_vars,
               serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
               serving_container_deployment_timeout=1800,
           )
           return model

       def upload_model_tpu(model_name, model_id, hf_token, tpu_count, docker_uri):
           vllm_args = [
               "python3", "-m", "vllm.entrypoints.openai.api_server",
               "--host=0.0.0.0", "--port=8080", f"--model={model_id}",
               "--max-model-len=2048", "--enable-prefix-caching",
               f"--tensor-parallel-size={tpu_count}",
           ]
           env_vars = {"HF_TOKEN": hf_token}
           model = aiplatform.Model.upload(
               display_name=model_name,
               serving_container_image_uri=docker_uri,
               serving_container_args=vllm_args,
               serving_container_ports=[8080],
               serving_container_predict_route="/v1/completions",
               serving_container_health_route="/health",
               serving_container_environment_variables=env_vars,
               serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
               serving_container_deployment_timeout=1800,
           )
           return model

       def upload_model_cpu(model_name, model_id, hf_token, docker_uri):
           vllm_args = [
               "python3", "-m", "vllm.entrypoints.openai.api_server",
               "--host=0.0.0.0", "--port=8080", f"--model={model_id}",
               "--max-model-len=2048",
           ]
           env_vars = {"HF_TOKEN": hf_token}
           model = aiplatform.Model.upload(
               display_name=model_name,
               serving_container_image_uri=docker_uri,
               serving_container_args=vllm_args,
               serving_container_ports=[8080],
               serving_container_predict_route="/v1/completions",
               serving_container_health_route="/health",
               serving_container_environment_variables=env_vars,
               serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
               serving_container_deployment_timeout=1800,
           )
           return model

       # Example for GPU:
       vertexai_model = upload_model_gpu(model_name, model_id, hf_token, accelerator_count, DOCKER_URI)

3. Create an endpoint.

       endpoint = aiplatform.Endpoint.create(display_name=f"model_name-endpoint")

4. Deploy model to endpoint. Model deployment might take 20 to 30 minutes.

       # Example for GPU:
       vertexai_model.deploy(
           endpoint=endpoint,
           deployed_model_display_name=model_name,
           machine_type=machine_type,
           accelerator_type=accelerator_type,
           accelerator_count=accelerator_count,
           traffic_percentage=100,
           deploy_request_timeout=1800,
           min_replica_count=1,
           max_replica_count=4,
           autoscaling_target_accelerator_duty_cycle=60,
       )

   For TPUs, omit the `accelerator_type` and `accelerator_count` parameters, and use
   `autoscaling_target_request_count_per_minute=60`. For CPUs, omit the
   `accelerator_type` and `accelerator_count` parameters, and use
   `autoscaling_target_cpu_utilization=60`.

## Load models from Cloud Storage

The custom container downloads the model from a Cloud Storage location
instead of downloading it from Hugging Face. When you use Cloud Storage:

- Set the `model_id` parameter in the `upload_model` function to a Cloud Storage URI, for example, `gs://<var>my-bucket</var>/<var>my-models</var>/<var>llama_3_2_3B</var>`.
- Omit the `HF_TOKEN` variable from `env_vars` when you call `upload_model`.
- When you call `model.deploy`, specify a `service_account` that has permissions to read from the Cloud Storage bucket.

### Create an IAM Service Account for Cloud Storage access

If your model is in Cloud Storage, create a service account that Vertex
Prediction endpoints can use to access the model artifacts.

    SERVICE_ACCOUNT_NAME = "vertexai-endpoint-sa"
    SERVICE_ACCOUNT_EMAIL = f"SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com"

    gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
        --display-name="Agent Platform Endpoint Service Account"

    # Grant storage read permission
    gcloud projects add-iam-policy-binding PROJECT_ID \
        --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
        --role="roles/storage.objectViewer"

When you deploy, pass the service account email to the `deploy` method:
`service_account=<var>SERVICE_ACCOUNT_EMAIL</var>`.

## Get predictions using endpoint

After you successfully deploy the model to the endpoint, verify the model
response using `raw_predict`.

    import json

    PROMPT = "Distance of moon from earth is "
    request_body = json.dumps(
        {
            "prompt": PROMPT,
            "temperature": 0.0,
        },
    )

    raw_response = endpoint.raw_predict(
        body=request_body, headers={"Content-Type": "application/json"}
    )
    assert raw_response.status_code == 200
    result = json.loads(raw_response.text)

    for choice in result["choices"]:
        print(choice)

Example output:

    {
      "index": 0,
      "text": "384,400 km. The moon is 1/4 of the earth's",
      "logprobs": null,
      "finish_reason": "length",
      "stop_reason": null,
      "prompt_logprobs": null
    }

## What's next

- [Choose an open model serving option](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/choose-serving-option)
- [Use open models using Model as a Service (MaaS)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-maas)
- [Deploy open models from Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/deploy-model-garden)
- [Deploy open models with prebuilt containers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-prebuilt-containers)
