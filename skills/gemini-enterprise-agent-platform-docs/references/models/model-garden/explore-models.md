[Video](https://www.youtube.com/watch?v=I7UiSU96CLc)

Model Garden is an AI/ML model library that helps you discover, test,
customize, and deploy models and assets from Google and Google partners.

## Advantages of Model Garden

When you're working with AI models, Model Garden provides the following
advantages:

- Available models are all grouped in a single location
- Model Garden provides a consistent deployment pattern for different types of models
- Model Garden provides built-in integration with other parts of Gemini Enterprise Agent Platform such as model tuning, evaluation, and serving
- Serving generative AI models can be difficult---Gemini Enterprise Agent Platform handles model deployment and serving for you

## Explore models

To view the list of available Gemini Enterprise Agent Platform and open source foundation,
tunable, and task-specific models, go to the Model Garden page in the
Google Cloud console.

[Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)

The model categories available in Model Garden are:

| Category | Description |
|---|---|
| Foundation models | Pretrained multitask large models that can be tuned or customized for specific tasks using Agent Studio, Agent Platform API, and the Agent Platform SDK. |
| Fine-tunable models | Models that you can fine-tune using a custom notebook or pipeline. |
| Task-specific solutions | Most of these prebuilt models are ready to use. Many can be customized using your own data. |

To filter models in the filter pane, specify the following:

- **Tasks**: Click the task that you want the model to perform.
- **Model collections**: Click to choose models that are managed by Google, partners, or you.
- **Providers**: Click the provider of the model.
- **Features**: Click the features that you want in the model.

To learn more about each model, click its model card.

## Model security scanning

Google does thorough testing and benchmarking on the serving and tuning
containers that we provide. Active vulnerability scanning is also applied to
container artifacts.

Third-party models from featured partners undergo model checkpoint scans to
ensure authenticity. Third-party models from HuggingFace Hub are scanned
directly by HuggingFace and their
[third-party scanner](https://huggingface.co/docs/hub/en/security-protectai)
for malware, pickle files, Keras Lambda layers, and secrets. Models deemed
unsafe from these scans are flagged by HuggingFace and blocked from deployment
in Model Garden. Models deemed suspicious or those that have the
ability to potentially execute remote code are indicated in
Model Garden but can still be deployed. We recommend you perform a
thorough review of any suspicious model before deploying it
within Model Garden.

## Pricing

For the open source models in Model Garden, you are charged for use of
following on Gemini Enterprise Agent Platform:

- **Model tuning** : You are charged for the compute resources used at the same rate as custom training. See [custom training pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#custom-trained_models).
- **Model deployment** : You are charged for the compute resources used to deploy the model to an endpoint. See [predictions pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#prediction-prices).
- **Colab Enterprise** : See [Colab Enterprise pricing](https://cloud.google.com/colab/pricing).

## Control access to specific models

You can set a [Model Garden organization
policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access) at the organization, folder, or
project level to control access to specific models in Model Garden. For
example, you can allow access to specific models that you've vetted and deny
access to all others.

## Learn more about Model Garden

For more information about the deployment options and customizations that you
can do with models in Model Garden, view the resources in the
following sections, which include links to tutorials, references, notebooks, and
YouTube videos.

### Deploy and serve

Learn more about customizing deployments and advance serving features.

- [Deploy and serve open source model using Python SDK, CLI, REST API, or console](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models#deploy_a_model)
  - [Developer blog: Introducing the new Gemini Enterprise Agent Platform Model Garden CLI and SDK](https://www.googlecloudcommunity.com/gc/Community-Blogs/Introducing-the-new-Vertex-AI-Model-Garden-CLI-and-SDK/ba-p/888386)
  - [Deploy open models by using the SDK tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_deployment_tutorial.ipynb)
  - [Get started with Gemini Enterprise Agent Platform Model Garden SDK notebook](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/open-models/get_started_with_model_garden_sdk.ipynb)
- [Deploying and fine-tuning Gemma 3 in Model Garden YouTube video](https://youtu.be/pC2DhFJQocY?si=xxFsBH7A0XgKMOSh)
- [Deploying Gemma and making predictions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/deploy-and-inference-tutorial)
- [Serve open models with a Hex-LLM container on Cloud
  TPUs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hex-llm)
- [Deploying Llama models by using Hex-LLM tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_hexllm_deep_dive_tutorial.ipynb)
- [Use prefix caching and speculative decoding with
  Hex-LLM or vLLM tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_advanced_features.ipynb)
- [Use vLLM to serve text-only and multimodel language models on Cloud GPUs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/vllm/use-vllm)
  - [Text-only models tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_vllm_text_only_tutorial.ipynb)
  - [Multimodal models tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_vllm_multimodal_tutorial.ipynb)
- [Use xDiT GPU serving container for image and video generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/xdit)
- [Serving Gemma 2 with multiple LoRA adapters with HuggingFace DLC for PyTorch inference tutorial on Medium](https://medium.com/google-cloud/open-models-on-vertex-ai-with-hugging-face-serving-multiple-lora-adapters-on-vertex-ai-e3ceae7b717c)
- [Use custom handles to serve PaliGemma for image captioning with HuggingFace DLC for PyTorch inference tutorial on LinkedIn](https://www.linkedin.com/posts/ivan-nardini_vertexai-huggingface-deeplearning-activity-7269824291238526976-oxuM?utm_source=li_share&utm_content=feedcontent&utm_medium=g_dt_web&utm_campaign=copy)
- [Deploy and serve a model that uses Spot VMs or a Compute Engine reservation tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_reservations_spotvm.ipynb)
- [Deploy and serve a HuggingFace model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hugging-face-models)

### Tuning

Learn more about tuning models to tailor responses for specific use cases.

- [Workbench fine-tuning tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_llama3_1_finetuning_with_workbench.ipynb)
- [Fine-tuning and evaluation tutorial notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_finetuning_tutorial.ipynb)
- [Deploying and fine-tuning Gemma 3 in Model Garden YouTube video](https://youtu.be/pC2DhFJQocY?si=xxFsBH7A0XgKMOSh)

### Evaluation

Learn more about assessing model responses with Agent Platform

- [Evaluate Gemma 2 with the generative AI evaluation service YouTube video](https://youtu.be/AUSunZXC2rg?si=SEag-u-a9KtA7gK1)

### Additional resources

- [Model and user journey-specific Model Garden notebooks](https://github.com/GoogleCloudPlatform/vertex-ai-samples/tree/main/notebooks/community/model_garden)
- [Gemini Enterprise Agent Platform open model serving, fine-tuning and evaluation notebooks](https://github.com/GoogleCloudPlatform/generative-ai/tree/main/open-models)
