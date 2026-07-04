Gemma is a set of lightweight, generative artificial intelligence (AI)
open models. Gemma models are available to run in your
applications and on your hardware, mobile devices, or hosted services. You can
also customize these models using tuning techniques so that they excel at
performing tasks that matter to you and your users. Gemma models are
based on [Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/overview) models and are intended
for the AI development community to extend and take further.

Fine-tuning can help improve a model's performance in specific tasks. Because
models in the Gemma model family are open weight, you can tune any of
them using the AI framework of your choice and the Vertex AI SDK.
You can open a notebook example to fine-tune the Gemma model using
a link available on the Gemma model card in Model Garden.

The following Gemma models are available to use with Gemini Enterprise Agent Platform.
To learn more about and test the Gemma models, see their
Model Garden model cards.

| **Model name** | **Use cases** | **Model Garden model card** |
|---|---|---|
| Gemma 4 | Capable of multimodal input, handling text, image, and audio input, and generating text outputs. | [Go to the Gemma 4 model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma4) |
| TranslateGemma | A family of lightweight, open translation models designed to handle translation tasks across 55 languages. | [Go to the TranslateGemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/translategemma) |
| FunctionGemma | A lightweight, open model, built as a foundation for creating your own specialized function calling models, and is designed to be highly performant after further fine-tuning. | [Go to the FunctionGemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/functiongemma) |
| Gemma 3n | Capable of multimodal input, handling text, image, and audio input, and generating text outputs. | [Go to the Gemma 3n model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma3n) |
| Gemma 3 | Best for text generation and image understanding tasks, including question answering, summarization, and reasoning. | [Go to the Gemma 3 model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma3) |
| Gemma 2 | Best for text generation, summarization, and extraction. | [Go to the Gemma 2 model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma2) |
| Gemma | Best for text generation, summarization, and extraction. | [Go to the Gemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/335) |
| CodeGemma | Best for code generation and completion. | [Go to the CodeGemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/364) |
| PaliGemma 2 | Best for image captioning tasks and visual question and answering tasks. | [Go to the PaliGemma 2 model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/363) |
| PaliGemma | Best for image captioning tasks and visual question and answering tasks. | [Go to the PaliGemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/363) |
| ShieldGemma 2 | Checks the safety of synthetic and natural images to help you build robust datasets and models. | [Go to the ShieldGemma 2 model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/shieldgemma2) |
| TxGemma | Best for therapeutic prediction tasks, including classification, regression, or generation, and reasoning tasks. | [Go to the TxGemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/txgemma) |
| MedGemma | Gemma 3 variants that are trained for performance on medical text and image comprehension. | [Go to the MedGemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/medgemma) |
| MedSigLIP | SigLIP variant that is trained to encode medical images and text into a common embedding space. | [Go to the MedSigLIP model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/medsiglip) |
| T5Gemma | Well-suited for a variety of generative tasks, including question answering, summarization, and reasoning. | [Go to the T5Gemma model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/t5gemma) |
| T5Gemma 2 | Well-suited for a variety of generative tasks, including question answering, summarization, and reasoning. | [Go to the T5Gemma 2 model card](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/t5gemma) |

The following are some options for where you can use Gemma:

## Use Gemma with Gemini Enterprise Agent Platform

Gemini Enterprise Agent Platform offers a managed platform for rapidly building and scaling
machine learning projects without needing in-house MLOps expertise. You can use
Gemini Enterprise Agent Platform as the downstream application that serves the
Gemma models. For example, you might port weights from the Keras
implementation of Gemma. Next, you can use Agent Platform to
serve that version of Gemma to get predictions. We recommend using
Gemini Enterprise Agent Platform if you want end-to-end MLOps capabilities, value-added ML
features, and a serverless experience for streamlined development.

To get started with Gemma, see the following notebooks:

- [Serve Gemma 3n in Gemini Enterprise Agent Platform](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma3n_deployment_on_vertex.ipynb)

- [Serve Gemma 3 in Gemini Enterprise Agent Platform](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma3_deployment_on_vertex.ipynb)

- [Serve Gemma 2 in Gemini Enterprise Agent Platform](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma2_deployment_on_vertex.ipynb)

- [Serve Gemma in Gemini Enterprise Agent Platform](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma_deployment_on_vertex.ipynb)

- [Fine-tune Gemma 3 using Axolotl and then deploy to Gemini Enterprise Agent Platform from Vertex](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_axolotl_gemma3_finetuning.ipynb)

- [Fine-tune Gemma 2 using PEFT and then deploy to Gemini Enterprise Agent Platform from Vertex](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma2_finetuning_on_vertex.ipynb)

- [Fine-tune Gemma using PEFT and then deploy to Gemini Enterprise Agent Platform from Vertex](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma_finetuning_on_vertex.ipynb)

- [Fine-tune Gemma using PEFT and then deploy to Gemini Enterprise Agent Platform from Huggingface](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_gemma_peft_finetuning_hf.ipynb)

- [Fine-tune Gemma using KerasNLP and then deploy to Gemini Enterprise Agent Platform](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma_kerasnlp_to_vertexai.ipynb)

- [Fine-tune Gemma with Ray on Agent Platform and then deploy to Gemini Enterprise Agent Platform](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma_fine_tuning_batch_deployment_on_rov.ipynb)

- [Run local inference with ShieldGemma 2 with Hugging Face transformers](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_shieldgemma2_local_inference.ipynb)

- [Serve MedGemma in Gemini Enterprise Agent Platform](https://github.com/Google-Health/medgemma/blob/main/notebooks/quick_start_with_model_garden.ipynb)

- [Serve MedSigLIP in Gemini Enterprise Agent Platform](https://github.com/Google-Health/medsiglip/blob/main/notebooks/quick_start_with_model_garden.ipynb)

- [Run local inference with T5Gemma with Hugging Face transformers](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_t5gemma_local_inference.ipynb)

## Use Gemma in other Google Cloud products

You can use Gemma with other Google Cloud products, such as
Google Kubernetes Engine and Dataflow.

### Use Gemma with GKE

Google Kubernetes Engine (GKE) is the Google Cloud solution
for managed Kubernetes that provides scalability, security, resilience, and cost
effectiveness. We recommend this option if you have existing Kubernetes
investments, your organization has in-house MLOps expertise, or if you need
granular control over complex AI/ML workloads with unique security, data
pipeline, and resource management requirements. To learn more, see the following
tutorials in the GKE documentation:

- [Serve Gemma with vLLM](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/serve-gemma-gpu-vllm)
- [Serve Gemma with TGI](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/serve-gemma-gpu-tgi)
- [Serve Gemma with Triton and TensorRT-LLM](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/serve-gemma-gpu-tensortllm)
- [Serve Gemma with JetStream](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/serve-gemma-tpu-jetstream)

### Use Gemma with Dataflow

You can use Gemma models with Dataflow for
[sentiment analysis](https://en.wikipedia.org/wiki/Sentiment_analysis).
Use Dataflow to run inference pipelines that use the
Gemma models. To learn more, see
[Run inference pipelines with Gemma open models](https://docs.cloud.google.com/dataflow/docs/machine-learning/gemma).

## Use Gemma with Colab

You can use Gemma with Colaboratory to create your Gemma
solution. In Colab, you can use Gemma with framework
options such as PyTorch and JAX. To learn more, see:

- [Get started with Gemma using Keras](https://ai.google.dev/gemma/docs/get_started).
- [Get started with Gemma using PyTorch](https://ai.google.dev/gemma/docs/pytorch_gemma).
- [Basic tuning with Gemma using Keras](https://ai.google.dev/gemma/docs/lora_tuning).
- [Distributed tuning with Gemma using Keras](https://ai.google.dev/gemma/docs/distributed_tuning).

## Gemma model sizes and capabilities

Gemma models are available in several sizes so you can build
generative AI solutions based on your available computing resources, the
capabilities you need, and where you want to run them. Each model is available
in a tuned and an untuned version:

- **Pretrained** - This version of the model wasn't trained on any specific tasks
  or instructions beyond the Gemma core data training set. We don't
  recommend using this model without performing some tuning.

- **Instruction-tuned** - This version of the model was trained with human language
  interactions so that it can participate in a conversation, similar to a basic
  chat bot.

- **Mix fine-tuned** - This version of the model is fine-tuned on a mixture of
  academic datasets and accepts natural language prompts.

Lower parameter sizes means lower resource requirements and more deployment
flexibility.

| **Model name** | **Parameters size** | **Input** | **Output** | **Tuned versions** | **Intended platforms** |
|---|---|---|---|---|---|
| **Gemma 4** ||||||
| Gemma 4 31B | 31 billion parameters | Text and image | Text | - Pretrained - Instruction-tuned | Large servers or server clusters |
| Gemma 4 26B A4B | 26 billion parameters, 4 billion active parameters | Text and image | Text | - Pretrained - Instruction-tuned | Higher-end desktop computers and servers |
| Gemma 4 E4B | 4 billion effective parameters | Text, image and audio | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| Gemma 4 E2B | 2 billion effective parameters | Text, image and audio | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| **Gemma 3n** ||||||
| Gemma 3n E4B | 4 billion effective parameters | Text, image and audio | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| Gemma 3n E2B | 2 billion effective parameters | Text, image and audio | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| **Gemma 3** ||||||
| Gemma 3 27B | 27 billion | Text and image | Text | - Pretrained - Instruction-tuned | Large servers or server clusters |
| Gemma 3 12B | 12 billion | Text and image | Text | - Pretrained - Instruction-tuned | Higher-end desktop computers and servers |
| Gemma 3 4B | 4 billion | Text and image | Text | - Pretrained - Instruction-tuned | Desktop computers and small servers |
| Gemma 3 1B | 1 billion | Text | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| **Gemma 2** ||||||
| Gemma 2 27B | 27 billion | Text | Text | - Pretrained - Instruction-tuned | Large servers or server clusters |
| Gemma 2 9B | 9 billion | Text | Text | - Pretrained - Instruction-tuned | Higher-end desktop computers and servers |
| Gemma 2 2B | 2 billion | Text | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| **Gemma** ||||||
| Gemma 7B | 7 billion | Text | Text | - Pretrained - Instruction-tuned | Desktop computers and small servers |
| Gemma 2B | 2.2 billion | Text | Text | - Pretrained - Instruction-tuned | Mobile devices and laptops |
| **CodeGemma** ||||||
| CodeGemma 7B | 7 billion | Text | Text | - Pretrained - Instruction-tuned | Desktop computers and small servers |
| CodeGemma 2B | 2 billion | Text | Text | - Pretrained | Desktop computers and small servers |
| **PaliGemma 2** ||||||
| PaliGemma 28B | 28 billion | Text and image | Text | - Pretrained - Mix fine-tuned | Large servers or server clusters |
| PaliGemma 10B | 10 billion | Text and image | Text | - Pretrained - Mix fine-tuned | Higher-end desktop computers and servers |
| PaliGemma 3B | 3 billion | Text and image | Text | - Pretrained - Mix fine-tuned | Desktop computers and small servers |
| **PaliGemma** ||||||
| PaliGemma 3B | 3 billion | Text and image | Text | - Pretrained - Mix fine-tuned | Desktop computers and small servers |
| **ShieldGemma 2** ||||||
| ShieldGemma 2 | 4 billion | Text and image | Text | - Fine-tuned | Desktop computers and small servers |
| **TxGemma** ||||||
| TxGemma 27B | 27 billion | Text | Text | - Pretrained - Instruction-tuned | Large servers or server clusters |
| TxGemma 9B | 9 billion | Text | Text | - Pretrained - Instruction-tuned | Higher-end desktop computers and servers |
| TxGemma 2B | 2 billion | Text | Text | - Pretrained | Mobile devices and laptops |
| **MedGemma** ||||||
| MedGemma 27B | 27 billion | Text and image | Text | - Text-only instruction-tuned - Instruction-tuned | Large servers or server clusters |
| MedGemma 4B | 4 billion | Text and image | Text | - Pretrained - Instruction-tuned | Desktop computers and small servers |
| **MedSigLIP** ||||||
| MedSigLIP | 800 million | Text and image | Embedding | - Fine-tuned | Mobile devices and laptops |
| **T5Gemma** ||||||
| T5Gemma 9B-9B | 18 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma 9B-2B | 11 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma 2B-2B | 4 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma XL-XL | 4 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma M-L | 2 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma L-L | 1 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma B-B | 0.6 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |
| T5Gemma S-S | 0.3 billion | Text | Text | - PrefixLM, pretrained - PrefixLM, instruction-tuned - UL2, pretrained - UL2, instruction-tuned | Mobile devices and laptops |

Gemma has been tested using Google's purpose built v5e TPU
hardware and NVIDIA's L4(G2 Standard), A100(A2 Standard),
H100(A3 High) GPU hardware.

## What's next

- See [Gemma documentation](https://ai.google.dev/gemma/docs).
