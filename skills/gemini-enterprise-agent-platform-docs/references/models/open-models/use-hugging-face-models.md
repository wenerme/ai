[Hugging Face](https://huggingface.co/) provides pre-trained models, fine-tuning
scripts, and development APIs that make the process of creating and discovering
LLMs easier.
[Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
can serve [Text
Embeddings](https://huggingface.co/models?other=text-embeddings-inference&sort=trending),
[Text To
Image](https://huggingface.co/models?pipeline_tag=text-to-image&sort=trending),
[Text
Generation](https://huggingface.co/models?pipeline_tag=text-generation&sort=trending),
and [Image Text To
Text](https://huggingface.co/models?pipeline_tag=image-text-to-text&sort=trending)
models in HuggingFace.

## Deployment options for Hugging Face models

You can deploy supported Hugging Face models in Gemini Enterprise Agent Platform or
Google Kubernetes Engine (GKE). The deployment option
you choose can depend on the model you're using and how much control
you want over your workloads.

### Deploy in Gemini Enterprise Agent Platform

Gemini Enterprise Agent Platform offers a managed platform for building and scaling
machine learning projects without in-house MLOps expertise. You can use
Gemini Enterprise Agent Platform as the downstream application that serves the
Hugging Face models. We recommend using
Gemini Enterprise Agent Platform if you want end-to-end MLOps capabilities, value-added ML
features, and a serverless experience for streamlined development.

1. To deploy a supported Hugging Face model in Gemini Enterprise Agent Platform, go
   to Model Garden.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Go to the **Open models on Hugging Face** section and click **Show
   more**.

3. Find and select a model to deploy.

4. Optional: For the **Deployment environment** , select **Gemini Enterprise Agent Platform**.

5. Optional: Specify the deployment details.

6. Click **Deploy**.

To get started, see the following examples:

- Some models have detailed model cards and the deployment settings are verified by Google, such as [google/gemma-3-27b-it](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma-3-27b-it;action=deploy;hfSource=true), [meta-llama/Llama-4-Scout-17B-16E-Instruct](https://console.cloud.google.com/agent-platform/publishers/meta-llama/model-garden/llama-4-scout-17b-16e-instruct;action=deploy;hfSource=true), [Qwen/QwQ-32B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwq-32b;action=deploy;hfSource=true), [BAAI/bge-m3](https://console.cloud.google.com/agent-platform/publishers/BAAI/model-garden/bge-m3;action=deploy;hfSource=true), [intfloat/multilingual-e5-large-instruct](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct;action=deploy;hfSource=true), [black-forest-labs/FLUX.1-dev](https://console.cloud.google.com/agent-platform/publishers/black-forest-labs/model-garden/flux.1-dev;action=deploy;hfSource=true), and [HuggingFaceFW/fineweb-edu-classifier](https://console.cloud.google.com/agent-platform/publishers/HuggingFaceFW/model-garden/fineweb-edu-classifier;action=deploy;hfSource=true).
- Some models have the deployment settings verified by Google but no detailed model cards, such as [NousResearch/Genstruct-7B](https://console.cloud.google.com/agent-platform/publishers/NousResearch/model-garden/Genstruct-7B;action=deploy;hfSource=true).
- Some models have deployment settings generated automatically.
- Some models have automatically generated deployment settings that are based on model metadata, such as some latest trending models in [text generation](https://huggingface.co/models?other=text-generation-inference&sort=trending), [text embeddings](https://huggingface.co/models?other=text-embeddings-inference&sort=trending), [text to image generation](https://huggingface.co/models?pipeline_tag=text-to-image&sort=trending), and [image text to text](https://huggingface.co/models?pipeline_tag=image-text-to-text&sort=trending).

### Deploy in GKE

Google Kubernetes Engine (GKE) is the Google Cloud solution
for managed Kubernetes that provides scalability, security, resilience, and cost
effectiveness. We recommend this option if you have existing Kubernetes
investments, your organization has in-house MLOps expertise, or if you need
granular control over complex AI/ML workloads with unique security, data
pipeline, and resource management requirements.

1. To deploy a supported Hugging Face model in GKE, go
   to Model Garden.

   [Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)
2. Go to the **Open models on Hugging Face** section and click **Show
   more**.

3. Find and select a model to deploy.

4. For the **Deployment environment** , select **GKE**.

5. Follow the deployment instructions.

To get started, see the following examples:

- Some models have detailed model cards and verified deployment settings, such as [google/gemma-3-27b-it](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma-3-27b-it;action=deploy;hfSource=true), [meta-llama/Llama-4-Scout-17B-16E-Instruct](https://console.cloud.google.com/agent-platform/publishers/meta-llama/model-garden/llama-4-scout-17b-16e-instruct;action=deploy;hfSource=true), and [Qwen/QwQ-32B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwq-32b;action=deploy;hfSource=true).
- Some models have verified deployment settings, but no detailed model cards, such as [NousResearch/Genstruct-7B](https://console.cloud.google.com/agent-platform/publishers/NousResearch/model-garden/Genstruct-7B;action=deploy;hfSource=true).

### What does "Supported by Gemini Enterprise Agent Platform" mean?

We automatically add the latest, most popular Hugging Face models to Model Garden.
This process includes the automatic generation of a deployment configuration for
each model.

To address concerns regarding vulnerabilities and malicious code, we
use the [Hugging Face Malware Scanner](https://huggingface.co/docs/hub/en/security-malware#malware-scanning)
to assess the safety
of files within each Hugging Face model repository on a daily basis. If a
model repository is flagged as containing malware, we immediately remove the
model from the Hugging Face gallery page.

While a model being designated as **supported by Gemini Enterprise Agent Platform** signifies that it
has undergone testing and is deployable on Gemini Enterprise Agent Platform, we don't guarantee
the absence of vulnerabilities or malicious code. We recommend that you conduct
your own security verifications before deploying any model in your production
environment.

### Tune deployment configurations for specific use cases

The default deployment configuration that is provided
with the one-click deployment option can't satisfy every requirement
given the diverse range of use cases and varying
priorities with latency, throughput, cost, and accuracy.

Therefore, you can initially experiment with the one-click
deployment to establish a baseline, and then fine-tune the deployment
configurations by using the Colab notebook ([vLLM](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_vllm_deployment.ipynb),
[TGI](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_tgi_deployment.ipynb),
[TEI](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_tei_deployment.ipynb),
[HF pytorch inference](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_pytorch_inference_deployment.ipynb))
or the Python SDK. This iterative approach lets you to tailor the
deployment to your precise needs to get the best possible performance for
your specific application.

### What should you do if the model you want isn't listed in Model Garden

If you're looking for a specific model that's not listed in
Model Garden, the model is not supported by
Gemini Enterprise Agent Platform. The following sections describe the reasoning and what you can
do.

#### Why isn't the model listed?

The following reasons explain why a model might not be in Model Garden:

- It's not a top trending model: We often prioritize models that are widely popular and have strong community interest.
- It's not yet compatible: The model might not work with a supported serving container. For example, the [vLLM container](https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models) for `text-generation` and `image-text-to-text` models.
- Unsupported pipeline tasks: The model has a [task](https://huggingface.co/docs/hub/en/models-tasks#tasks) which we don't yet fully support at the moment. We support the following tasks: `text-generation`, `text2text-generation`, `text-to-image`, `feature-extraction`, `sentence-similarity`, and `image-text-to-text`.

#### What are your options?

You can still work with models that aren't available in Model Garden:

- Deploy it yourself using the Colab Notebook: We have the following Colab Notebooks: ([vLLM](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_vllm_deployment.ipynb), [TGI](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_tgi_deployment.ipynb), [TEI](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_tei_deployment.ipynb), [HF pytorch inference](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_pytorch_inference_deployment.ipynb)), which provide the flexibility to deploy models with custom configurations. This gives you complete control over the process.
- Submit a Feature Request: work with your support engineer and submit a feature request through the Model Garden, or refer to [Vertex Generative AI support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/getting-help) for additional help.
- Keep an eye on updates: We regularly add new models to Model Garden. The model you're looking for might become available in the future, so check back periodically!
