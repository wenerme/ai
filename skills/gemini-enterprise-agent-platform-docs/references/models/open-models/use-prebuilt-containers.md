This document describes how to deploy and serve open models on Gemini Enterprise Agent Platform
using prebuilt container images. Gemini Enterprise Agent Platform provides prebuilt
containers for popular serving frameworks like
[vLLM](https://github.com/vllm-project/vllm),
[Hex-LLM](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hex-llm), and
[SGLang](https://github.com/sgl-project/sglang), as well as support for Hugging
Face [Text Generation Inference
(TGI)](https://github.com/huggingface/text-generation-inference), [Text
Embeddings Inference
(TEI)](https://github.com/huggingface/text-embeddings-inference), [Inference
Toolkit](https://github.com/huggingface/huggingface-inference-toolkit) (via
Google Cloud [Hugging Face PyTorch Inference
Containers](https://github.com/huggingface/Google-Cloud-Containers/tree/main/containers/pytorch/inference))
and [Tensor-RT-LLM](https://github.com/NVIDIA/TensorRT-LLM) containers to serve
supported models on Gemini Enterprise Agent Platform.

vLLM is an open-source library for fast inference and serving of Large Language
Models (LLMs). Gemini Enterprise Agent Platform uses an optimized and customized version of
vLLM. This version is specifically designed for enhanced performance,
reliability, and seamless integration within Google Cloud. You can use
Gemini Enterprise Agent Platform's customized vLLM container image to serve models on
Gemini Enterprise Agent Platform. The prebuilt vLLM container can download
models from Hugging Face or from Cloud Storage. For more information about model serving
with Gemini Enterprise Agent Platform prebuilt vLLM container images, see [Model serving with
Gemini Enterprise Agent Platform prebuilt vLLM container
images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/vllm/use-vllm).

## Example Notebooks

The following notebooks demonstrate how to use Gemini Enterprise Agent Platform prebuilt
containers for model serving. You can find more sample notebooks in the [GitHub
repository for Gemini Enterprise Agent Platform samples](https://github.com/GoogleCloudPlatform/vertex-ai-samples/tree/main/notebooks/community/model_garden).

| Notebook Name | Description | Direct Link (GitHub/Colab) |
|---|---|---|
| Gemini Enterprise Agent Platform Model Garden - Gemma 3 (deployment) | Demonstrates deploying Gemma 3 models on GPU using vLLM. | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma3_deployment_on_vertex.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Serve Multimodal Llama 3.2 with vLLM | Deploys multimodal Llama 3.2 models using the vLLM prebuilt container. | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_vllm_multimodal_tutorial.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Hugging Face Text Generation Inference Deployment | Demonstrates deploying Gemma-2-2b-it model with Text Generation Inference (TGI) from Hugging Face | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_tgi_deployment.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Hugging Face Text Embeddings Inference Deployment | Demonstrates deploying nomic-ai/nomic-embed-text-v1 with Text Embeddings Inference (TEI) from Hugging Face | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_tei_deployment.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Hugging Face PyTorch Inference Deployment | Demonstrates deploying distilbert/distilbert-base-uncased-finetuned-sst-2-english with Hugging Face PyTorch Inference | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_huggingface_pytorch_inference_deployment.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - DeepSeek Deployment | Demonstrates serving DeepSeek models with vLLM, SGLang, or TensorRT-LLM | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_deepseek_deployment.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Qwen3 Deployment | Demonstrates serving Qwen3 models with SGLang | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_qwen3_deployment.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Gemma 3n Deployment | Demonstrates serving Gemma3n models with SGLang | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma3n_deployment_on_vertex.ipynb) |
| Gemini Enterprise Agent Platform Model Garden - Deep dive: Deploy Llama 3.1 and 3.2 with Hex-LLM | Demonstrates deploying Llama 3.1 and 3.2 models using Hex-LLM on TPUs using Gemini Enterprise Agent Platform Model Garden | [View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_hexllm_deep_dive_tutorial.ipynb) |

## What's next

- [Choose an open model serving option](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/choose-serving-option)
- [Use open models using Model as a Service (MaaS)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-maas)
- [Deploy open models from Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/deploy-model-garden)
- [Deploy open models with a custom vLLM container](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/deploy-custom-vllm)
