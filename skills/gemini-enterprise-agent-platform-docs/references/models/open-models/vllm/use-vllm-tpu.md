vLLM TPU is a highly-efficient serving framework for large language models (LLM)
that's optimized for [Cloud TPU](https://docs.cloud.google.com/tpu) hardware. It's powered by
[tpu-inference](https://tpu.vllm.ai), which is an expressive and powerful new hardware
plugin that unifies [JAX](https://docs.jax.dev/en/latest/index.html) and
[Pytorch](https://pytorch.org/get-started/locally/) under a single lowering
path.

Read more about this framework in the
[vLLM TPU blog post](https://blog.vllm.ai/2025/10/16/vllm-tpu.html).

vLLM TPU is available in
[Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models) through
one-click deployment and notebook.

## Get started in Model Garden

The vLLM TPU serving container is integrated in Model Garden. You can
access this serving solution through one-click deployment and
Colab Enterprise notebook examples for a variety of models.

### Use one-click deployment

You can deploy a custom Agent Platform endpoint with vLLM TPU through
the model card for the following models:

- [google/gemma-3-27b-it](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma3;publisherModelVersion=gemma-3-27b-it)
- [meta-llama/Llama-3.3-70B-Instruct](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama3-3;publisherModelVersion=llama-3.3-70b-instruct)
- [meta-llama/Llama-3.1-8B-Instruct](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama3_1;publisherModelVersion=llama-3.1-8b-instruct)
- [Qwen/Qwen3-32B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3;publisherModelVersion=qwen3-32b)
- [Qwen/Qwen3-8B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3;publisherModelVersion=qwen3-8b)
- [Qwen/Qwen3-4B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3;publisherModelVersion=qwen3-4b)
- [Qwen/Qwen3-4B-Instruct-2507](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3;publisherModelVersion=qwen3-4b-instruct-2507)

Steps:

1. Navigate to the model card page (such as [google/gemma-3-27b-it](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemma3;publisherModelVersion=gemma-3-27b-it))
   and click **Deploy model** to open the deployment panel.

2. Select the model variant you want to deploy under **Resource ID**.

3. For the model variant that you want to deploy, click **Edit settings** and
   select the vLLM TPU option under **Machine spec** for deployment.

4. Click **Deploy** at the bottom of the panel to begin the deployment process.
   You will receive an email notification when the endpoint is ready.

### Use the Colab Enterprise notebook

For flexibility and customization, you can use Colab Enterprise
notebook examples to deploy an Agent Platform endpoint with vLLM TPU by
using the Agent Platform SDK for Python.

1. Open the [vLLM TPU notebook](https://console.cloud.google.com/agent-platform/colab/import/https:%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fcommunity%2Fmodel_garden%2Fmodel_garden_vllm_tpu_qwen3_deployment.ipynb)
   in Colab Enterprise.

2. Run through the notebook to deploy a model with vLLM TPU and send prediction
   requests to the endpoint.

### Request Cloud TPU quota

In Model Garden, the default quota is 16 Cloud TPU v6e chips
in the europe-west4 region. This quotas applies to one-click deployments and
Colab Enterprise notebook deployments. If you have a default quota of 0
or would like to request more quota, see [Request a quota adjustment](https://docs.cloud.google.com/docs/quotas/help/request_increase).
