> [!WARNING]
> **Deprecated:** Hex-LLM is deprecated. Use [vLLM TPU](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/vllm/use-vllm-tpu).

Hex-LLM, a high-efficiency large language model (LLM) serving with XLA, is the
Gemini Enterprise Agent Platform LLM serving framework that's designed and optimized for [Cloud TPU](https://docs.cloud.google.com/tpu) hardware. Hex-LLM combines LLM serving technologies such as
continuous batching and [PagedAttention](https://arxiv.org/abs/2309.06180) with
Gemini Enterprise Agent Platform optimizations that are tailored for
[XLA](https://openxla.org/xla) and Cloud TPU. It's a high-efficiency
and low-cost LLM serving on Cloud TPU for open source models.

Hex-LLM is available in
[Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models) through model
playground, one-click deployment, and notebook.

## Features

Hex-LLM is based on open source projects with Google's own optimizations for XLA
and Cloud TPU. Hex-LLM achieves high throughput and low latency when serving
frequently used LLMs.

Hex-LLM includes the following optimizations:

- Token-based continuous batching algorithm to help ensure models are fully utilizing the hardware with a large number of concurrent requests.
- A complete rewrite of the attention kernels that are optimized for XLA.
- Flexible and composable data parallelism and tensor parallelism strategies with highly optimized weight sharding methods to efficiently run LLMs on multiple Cloud TPU chips.

Hex-LLM supports a wide range of dense and sparse LLMs:

- Gemma 2B and 7B
- Gemma-2 9B and 27B
- Llama-2 7B, 13B and 70B
- Llama-3 8B and 70B
- Llama-3.1 8B and 70B
- Llama-3.2 1B and 3B
- Llama-3.3 70B
- Llama-Guard-3 1B and 8B
- Llama-4 Scout-17B-16E
- Mistral 7B
- Mixtral 8x7B and 8x22B
- Phi-3 mini and medium
- Phi-4, Phi-4 reasoning and reasoning plus
- Qwen-2 0.5B, 1.5B and 7B
- Qwen-2.5 0.5B, 1.5B, 7B, 14B and 32B

> [!NOTE]
> **Note:** Hex-LLM can serve the 70B models in full precision or quantized (int8, int4) precision.

Hex-LLM also provides a variety of features, such as the following:

- Hex-LLM is included in a single container. Hex-LLM packages the API server, inference engine, and supported models into a single Docker image to be deployed.
- Compatible with the [Hugging Face models](https://huggingface.co/models) format. Hex-LLM can load a Hugging Face model from local disk, the Hugging Face Hub, and a Cloud Storage bucket.
- Quantization using [bitsandbytes](https://github.com/TimDettmers/bitsandbytes) and [AWQ](https://github.com/mit-han-lab/llm-awq).
- Dynamic [LoRA](https://arxiv.org/abs/2106.09685) loading. Hex-LLM is able to load the LoRA weights through reading the request argument during serving.

### Advanced features

Hex-LLM supports the following advanced features:

- Multi-host serving
- Disaggregated serving \[experimental\]
- Prefix caching
- 4-bit quantization support

#### Multi-host serving

Hex-LLM now supports serving models with a [multi-host TPU slice](https://docs.cloud.google.com/tpu/docs/tpus-in-gke#multi-host).
This feature lets you serve large models that can't be loaded
into a single host TPU VM, which contains at most eight v5e cores.

To enable this feature, set `--num_hosts` in the Hex-LLM container arguments and
set `--tpu_topology` in the Vertex AI SDK model upload request. The
following example shows how to deploy the Hex-LLM container with a TPU 4x4 v5e
topology that serves the Llama 3.1 70B bfloat16 model:

    hexllm_args = [
        "--host=0.0.0.0",
        "--port=7080",
        "--model=meta-llama/Meta-Llama-3.1-70B",
        "--data_parallel_size=1",
        "--tensor_parallel_size=16",
        "--num_hosts=4",
        "--hbm_utilization_factor=0.9",
    ]

    model = aiplatform.Model.upload(
        display_name=model_name,
        serving_container_image_uri=HEXLLM_DOCKER_URI,
        serving_container_command=["python", "-m", "hex_llm.server.api_server"],
        serving_container_args=hexllm_args,
        serving_container_ports=[7080],
        serving_container_predict_route="/generate",
        serving_container_health_route="/ping",
        serving_container_environment_variables=env_vars,
        serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
        serving_container_deployment_timeout=7200,
        location=TPU_DEPLOYMENT_REGION,
    )

    model.deploy(
        endpoint=endpoint,
        machine_type=machine_type,
        tpu_topology="4x4",
        deploy_request_timeout=1800,
        service_account=service_account,
        min_replica_count=min_replica_count,
        max_replica_count=max_replica_count,
    )

For an end-to-end tutorial for deploying the Hex-LLM container with a multi-host
TPU topology, see the [Agent Platform Model Garden - Llama 3.1 (Deployment) notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_llama3_1_deployment.ipynb).

In general, the only changes needed to enable multi-host serving are:

1. Set argument `--tensor_parallel_size` to the total number of cores within the TPU topology.
2. Set argument `--num_hosts` to the number of hosts within the TPU topology.
3. Set `--tpu_topology` with the Vertex AI SDK model upload API.

#### Disaggregated serving \[experimental\]

Hex-LLM now supports disaggregated serving as an experimental feature. It can
only be enabled on the single host setup and the performance is under tuning.

Disaggregated serving is an effective method for balancing Time to First Token
(TTFT) and Time Per Output Token (TPOT) for each request, and the overall
serving throughput. It separates the prefill phase and the decode phase into
different workloads so that they don't interfere with each other. This method
is especially useful for scenarios that set strict latency requirements.

To enable this feature, set `--disagg_topo` in the Hex-LLM container arguments.
The following is an example that shows how to deploy the Hex-LLM container on
TPU v5e-8 that serves the Llama 3.1 8B bfloat16 model:

    hexllm_args = [
        "--host=0.0.0.0",
        "--port=7080",
        "--model=meta-llama/Llama-3.1-8B",
        "--data_parallel_size=1",
        "--tensor_parallel_size=2",
        "--disagg_topo=3,1",
        "--hbm_utilization_factor=0.9",
    ]

    model = aiplatform.Model.upload(
        display_name=model_name,
        serving_container_image_uri=HEXLLM_DOCKER_URI,
        serving_container_command=["python", "-m", "hex_llm.server.api_server"],
        serving_container_args=hexllm_args,
        serving_container_ports=[7080],
        serving_container_predict_route="/generate",
        serving_container_health_route="/ping",
        serving_container_environment_variables=env_vars,
        serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
        serving_container_deployment_timeout=7200,
        location=TPU_DEPLOYMENT_REGION,
    )

    model.deploy(
        endpoint=endpoint,
        machine_type=machine_type,
        deploy_request_timeout=1800,
        service_account=service_account,
        min_replica_count=min_replica_count,
        max_replica_count=max_replica_count,
    )

The `--disagg_topo` argument accepts a string in the format `"number_of_prefill_workers,number_of_decode_workers"`.
In the earlier example, it is set to `"3,1"` to configure three prefill workers
and 1 decode worker. Each worker uses two TPU v5e cores.

#### Prefix caching

Prefix caching reduces Time to First Token (TTFT) for prompts that have
identical content at the beginning of the prompt, such as company-wide preambles,
common system instructions, and multi-turn conversation history. Instead of
processing the same input tokens repeatedly, Hex-LLM can retain a temporary
cache of the processed input token computations to improve TTFT.

To enable this feature, set `--enable_prefix_cache_hbm` in the Hex-LLM container
arguments. The following is an example that shows how to deploy the Hex-LLM
container on TPU v5e-8 that serves the Llama 3.1 8B bfloat16 model:

    hexllm_args = [
        "--host=0.0.0.0",
        "--port=7080",
        "--model=meta-llama/Llama-3.1-8B",
        "--data_parallel_size=1",
        "--tensor_parallel_size=4",
        "--hbm_utilization_factor=0.9",
        "--enable_prefix_cache_hbm",
    ]

    model = aiplatform.Model.upload(
        display_name=model_name,
        serving_container_image_uri=HEXLLM_DOCKER_URI,
        serving_container_command=["python", "-m", "hex_llm.server.api_server"],
        serving_container_args=hexllm_args,
        serving_container_ports=[7080],
        serving_container_predict_route="/generate",
        serving_container_health_route="/ping",
        serving_container_environment_variables=env_vars,
        serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
        serving_container_deployment_timeout=7200,
        location=TPU_DEPLOYMENT_REGION,
    )

    model.deploy(
        endpoint=endpoint,
        machine_type=machine_type,
        deploy_request_timeout=1800,
        service_account=service_account,
        min_replica_count=min_replica_count,
        max_replica_count=max_replica_count,
    )

Hex-LLM employs prefix caching to optimize performance for prompts exceeding a
certain length (512 tokens by default, configurable using `prefill_len_padding`).
Cache hits occur in increments of this value, ensuring the cached token count is
always a multiple of `prefill_len_padding`. The `cached_tokens` field of
`usage.prompt_tokens_details` in the chat completion API response indicates how
many of the prompt tokens were a cache hit.

    "usage": {
      "prompt_tokens": 643,
      "total_tokens": 743,
      "completion_tokens": 100,
      "prompt_tokens_details": {
        "cached_tokens": 512
      }
    }

#### Chunked prefill

[Chunked prefill](https://arxiv.org/pdf/2308.16369) splits a request prefill
into smaller chunks, and mixes prefill and decode into one batch step. Hex-LLM
implements chunked prefill to balance the Time to First Token (TTFT) and
Time per Output Token (TPOT) and improves the throughput.

To enable this feature, set `--enable_chunked_prefill` in the Hex-LLM container
arguments. The following is an example that shows how to deploy the Hex-LLM
container on TPU v5e-8 that serves the Llama 3.1 8B model:

    hexllm_args = [
        "--host=0.0.0.0",
        "--port=7080",
        "--model=meta-llama/Llama-3.1-8B",
        "--data_parallel_size=1",
        "--tensor_parallel_size=4",
        "--hbm_utilization_factor=0.9",
        "--enable_chunked_prefill",
    ]

    model = aiplatform.Model.upload(
        display_name=model_name,
        serving_container_image_uri=HEXLLM_DOCKER_URI,
        serving_container_command=["python", "-m", "hex_llm.server.api_server"],
        serving_container_args=hexllm_args,
        serving_container_ports=[7080],
        serving_container_predict_route="/generate",
        serving_container_health_route="/ping",
        serving_container_environment_variables=env_vars,
        serving_container_shared_memory_size_mb=(16 * 1024),  # 16 GB
        serving_container_deployment_timeout=7200,
        location=TPU_DEPLOYMENT_REGION,
    )

    model.deploy(
        endpoint=endpoint,
        machine_type=machine_type,
        deploy_request_timeout=1800,
        service_account=service_account,
        min_replica_count=min_replica_count,
        max_replica_count=max_replica_count,
    )

#### 4-bit quantization support

Quantization is a technique for reducing the computational and memory costs of
running inference by representing the weights or activations with low-precision
data types like INT8 or INT4 instead of the usual BF16 or FP32.

Hex-LLM supports INT8 weight-only quantization. Extended support includes models
with INT4 weights quantized using AWQ zero-point quantization. Hex-LLM supports
INT4 variants of Mistral, Mixtral and Llama model families.

There is no additional flag required for serving quantized models.

## Get started in Model Garden

The Hex-LLM Cloud TPU serving container is integrated into
Model Garden. You can access this serving technology through the
playground, one-click deployment, and Colab Enterprise notebook
examples for a variety of models.

### Use playground

Model Garden playground is a pre-deployed Agent Platform
endpoint that is reachable by sending requests in the model card.

1. Enter a prompt and, optionally, include arguments for your request.

2. Click **SUBMIT** to get the model response quickly.

[Try it out with Gemma](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/335)!

### Use one-click deployment

You can deploy a custom Agent Platform endpoint with Hex-LLM by using
a model card.

1. Navigate to the [model card page](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/335)
   and click **Deploy**.

2. For the model variation that you want to use, select the [Cloud TPU
   v5e machine type](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learing/predictions/use-tpu#deploy_a_model)
   for deployment.

3. Click **Deploy** at the bottom to begin the deployment process. You receive
   two email notifications; one when the model is uploaded and another when the
   endpoint is ready.

### Use the Colab Enterprise notebook

For flexibility and customization, you can use Colab Enterprise
notebook examples to deploy an Agent Platform endpoint with Hex-LLM by
using the Agent Platform SDK for Python.

1. Navigate to the model card page and click **Open notebook**.

2. Select the Vertex Serving notebook. The notebook is opened in
   Colab Enterprise.

3. Run through the notebook to deploy a model by using Hex-LLM and send
   prediction requests to the endpoint. The code snippet for the deployment is
   as follows:

    hexllm_args = [
        f"--model=google/gemma-2-9b-it",
        f"--tensor_parallel_size=4",
        f"--hbm_utilization_factor=0.8",
        f"--max_running_seqs=512",
    ]
    hexllm_envs = {
        "PJRT_DEVICE": "TPU",
        "MODEL_ID": "google/gemma-2-9b-it",
        "DEPLOY_SOURCE": "notebook",
    }
    model = aiplatform.Model.upload(
        display_name="gemma-2-9b-it",
        serving_container_image_uri=HEXLLM_DOCKER_URI,
        serving_container_command=[
            "python", "-m", "hex_llm.server.api_server"
        ],
        serving_container_args=hexllm_args,
        serving_container_ports=[7080],
        serving_container_predict_route="/generate",
        serving_container_health_route="/ping",
        serving_container_environment_variables=hexllm_envs,
        serving_container_shared_memory_size_mb=(16 * 1024),
        serving_container_deployment_timeout=7200,
    )

    endpoint = aiplatform.Endpoint.create(display_name="gemma-2-9b-it-endpoint")
    model.deploy(
        endpoint=endpoint,
        machine_type="ct5lp-hightpu-4t",
        deploy_request_timeout=1800,
        service_account="<your-service-account>",
        min_replica_count=1,
        max_replica_count=1,
    )

Example Colab Enterprise notebooks include:

- [Gemma 2 deployment](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gemma2_deployment_on_vertex.ipynb)
- [CodeGemma deployment](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_codegemma_deployment_on_vertex.ipynb)
- [Llama 3.2 deployment](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_llama3_2_deployment.ipynb)
- [Llama 3.1 deployment](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_llama3_1_deployment.ipynb)
- [Phi-3 deployment](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_phi3_deployment.ipynb)
- [Qwen2 deployment](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_qwen2_deployment.ipynb)

### Configure server arguments and environment variables

You can set the following arguments to launch the Hex-LLM server. You can tailor
the arguments to best fit your intended use case and requirements. Note that the
arguments are predefined for one-click deployment for enabling the easiest
deployment experience. To customize the arguments, you can build off of the
notebook examples for reference and set the arguments accordingly.

*Model*

- `--model`: The model to load. You can specify a Hugging Face model ID, a Cloud Storage bucket path (`gs://my-bucket/my-model`), or a local path. The model artifacts are expected to follow the Hugging Face format and use [safetensors](https://huggingface.co/docs/safetensors/en/index) files for the model weights. [BitsAndBytes](https://huggingface.co/docs/bitsandbytes/main/en/index) int8 and [AWQ](https://huggingface.co/docs/transformers/main/en/quantization/awq) quantized model artifacts are supported for Llama, Gemma 2 and Mistral/Mixtral.
- `--tokenizer`: The [tokenizer](https://huggingface.co/docs/transformers/en/main_classes/tokenizer) to load. This can be a Hugging Face model ID, a [Cloud Storage](https://cloud.google.com/storage) bucket path (`gs://my-bucket/my-model`), or a local path. If this argument is not set, it defaults to the value for `--model`.
- `--tokenizer_mode`: The tokenizer mode. Possible choices are `["auto", "slow"]`. The default value is `"auto"`. If this is set to `"auto"`, the fast tokenizer is used if available. The slow tokenizers are written in Python and provided in the Transformers library, while the fast tokenizers offering performance improvement are written in Rust and provided in the Tokenizers library. For more information, see the [Hugging Face documentation](https://huggingface.co/learn/nlp-course/chapter6/3).
- `--trust_remote_code`: Whether to allow remote code files defined in the Hugging Face model repositories. The default value is `False`.
- `--load_format`: Format of model checkpoints to load. Possible choices are `["auto", "dummy"]`. The default value is `"auto"`. If this is set to `"auto"`, the model weights are loaded in safetensors format. If this is set to `"dummy"`, the model weights are randomly initialized. Setting this to `"dummy"` is useful for experimentation.
- `--max_model_len`: The maximum context length (input length plus the output length) to serve for the model. The default value is read from the model configuration file in Hugging Face format: `config.json`. A larger maximum context length requires more TPU memory.
- `--sliding_window`: If set, this argument overrides the model's window size for [sliding window attention](https://arxiv.org/abs/2004.05150). Setting this argument to a larger value makes the attention mechanism include more tokens and approaches the effect of standard self attention. This argument is meant for experimental usage only. In general use cases, we recommend using the model's original window size.
- `--seed`: The seed for initializing all random number generators. Changing this argument might affect the generated output for the same prompt through changing the tokens that are sampled as next tokens. The default value is `0`.

*Inference engine*

- `--num_hosts`: The number of hosts to run. The default value is `1`. For more details, refer to the documentation on [TPU v5e configuration](https://docs.cloud.google.com/tpu/docs/v5e#tpu-v5e-config).
- `--disagg_topo`: Defines the number of prefill workers and decode workers with the experimental feature disaggregated serving. The default value is `None`. The argument follows the format: `"number_of_prefill_workers,number_of_decode_workers"`.
- `--data_parallel_size`: The number of data parallel replicas. The default value is `1`. Setting this to `N` from `1` approximately improves the throughput by `N`, while maintaining the same latency.
- `--tensor_parallel_size`: The number of tensor parallel replicas. The default value is `1`. Increasing the number of tensor parallel replicas generally improves latency, because it speeds up matrix multiplication by reducing the matrix size.
- `--worker_distributed_method`: The distributed method to launch the worker. Use `mp` for the [multiprocessing](https://docs.python.org/3/library/multiprocessing.html) module or `ray` for the [Ray](https://docs.ray.io/) library. The default value is `mp`.
- `--enable_jit`: Whether to enable [JIT (Just-in-Time Compilation)](https://jax.readthedocs.io/en/latest/jit-compilation.html) mode. The default value is `True`. Setting `--no-enable_jit` disables it. Enabling JIT mode improves inference performance at the cost of requiring additional time spent on initial compilation. In general, the inference performance benefits overweigh the overhead.
- `--warmup`: Whether to warm up the server with sample requests during initialization. The default value is `True`. Setting `--no-warmup` disables it. Warmup is recommended, because initial requests trigger heavier compilation and therefore will be slower.
- `--max_prefill_seqs`: The maximum number of sequences that can be scheduled for prefilling per iteration. The default value is `1`. The larger this value is, the higher throughput the server can achieve, but with potential adverse effects on latency.
- `--prefill_seqs_padding`: The server pads the prefill batch size to a multiple of this value. The default value is `8`. Increasing this value reduces model recompilation times, but increases wasted computation and inference overhead. The optimal setting depends on the request traffic.
- `--prefill_len_padding`: The server pads the sequence length to a multiple of this value. The default value is `512`. Increasing this value reduces model recompilation times, but increases wasted computation and inference overhead. The optimal setting depends on the data distribution of the requests.
- `--max_decode_seqs`/`--max_running_seqs`: The maximum number of sequences that can be scheduled for decoding per iteration. The default value is `256`. The larger this value is, the higher throughput the server can achieve, but with potential adverse effects on latency.
- `--decode_seqs_padding`: The server pads the decode batch size to a multiple of this value. The default value is `8`. Increasing this value reduces model recompilation times, but increases wasted computation and inference overhead. The optimal setting depends on the request traffic.
- `--decode_blocks_padding`: The server pads the number of memory blocks used for a sequence's Key-Value cache (KV cache) to a multiple of this value during decoding. The default value is `128`. Increasing this value reduces model recompilation times, but increases wasted computation and inference overhead. The optimal setting depends on the data distribution of the requests.
- `--enable_prefix_cache_hbm`: Whether to enable [prefix caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hex-llm#prefix-caching) in HBM. The default value is `False`. Setting this argument can improve performance by reusing the computations of shared prefixes of prior requests.
- `--enable_chunked_prefill`: Whether to enable [chunked prefill](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hex-llm#chunked-prefill). The default value is `False`. Setting this argument can support longer context length and improve performance.

*Memory management*

- `--hbm_utilization_factor`: The percentage of free [Cloud TPU High Bandwidth Memory (HBM)](https://docs.cloud.google.com/tpu/docs/intro-to-tpu) that can be allocated for KV cache after model weights are loaded. The default value is `0.9`. Setting this argument to a higher value increases the KV cache size and can improve throughput, but it increases the risk of running out of Cloud TPU HBM during initialization and at runtime.
- `--num_blocks`: Number of device blocks to allocate for KV cache. If this argument is set, the server ignores `--hbm_utilization_factor`. If this argument is not set, the server profiles HBM usage and computes the number of device blocks to allocate based on `--hbm_utilization_factor`. Setting this argument to a higher value increases the KV cache size and can improve throughput, but it increases the risk of running out of Cloud TPU HBM during initialization and at runtime.
- `--block_size`: Number of tokens stored in a block. Possible choices are `[8, 16, 32, 2048, 8192]`. The default value is `32`. Setting this argument to a larger value reduces overhead in block management, at the cost of more memory waste. The exact performance impact needs to be determined empirically.

*Dynamic LoRA*

- `--enable_lora`: Whether to enable dynamic [LoRA adapters](https://arxiv.org/abs/2106.09685) loading from Cloud Storage. The default value is `False`. This is supported for the Llama model family.
- `--max_lora_rank`: The maximum LoRA rank supported for LoRA adapters defined in requests. The default value is `16`. Setting this argument to a higher value allows for greater flexibility in the LoRA adapters that can be used with the server, but increases the amount of Cloud TPU HBM allocated for LoRA weights and decreases throughput.
- `--enable_lora_cache`: Whether to enable caching of dynamic LoRA adapters. The default value is `True`. Setting `--no-enable_lora_cache` disables it. Caching improves performance because it removes the need to re-download previously used LoRA adapter files.
- `--max_num_mem_cached_lora`: The maximum number of LoRA adapters stored in TPU memory cache.The default value is `16`. Setting this argument to a larger value improves the chance of a cache hit, but it increases the amount of Cloud TPU HBM usage.

You can also configure the server using the following environment variables:

- `HEX_LLM_LOG_LEVEL`: Controls the amount of logging information generated. The default value is `INFO`. Set this to one of the standard Python logging levels defined in the [logging module](https://docs.python.org/3/library/logging.html#logging-levels).
- `HEX_LLM_VERBOSE_LOG`: Whether to enable detailed logging output. Allowed values are `true` or `false`. Default value is `false`.

#### Tune server arguments

The server arguments are interrelated and have a collective effect on the
serving performance. For example, a larger setting of `--max_model_len=4096`
leads to higher TPU memory usage, and therefore requires larger memory
allocation and less batching. In addition, some arguments are determined by the
use case, while others can be tuned. Here is a workflow for configuring the
Hex-LLM server.

1. Determine the model family and model variant of interest. For example, Llama 3.1 8B Instruct.
2. Estimate the lower bound of TPU memory needed based on the model size and precision: `model_size * (num_bits / 8)`. For an 8B model and bfloat16 precision, the lower bound of TPU memory needed would be `8 * (16 / 8) = 16 GB`.
3. Estimate the number of TPU v5e chips needed, where each v5e chip offers 16GB: `tpu_memory / 16`. For an 8B model and bfloat16 precision, you need more than 1 chip. Among the [1-chip, 4-chip and 8-chip configurations](https://docs.cloud.google.com/vertex-ai/docs/predictions/use-tpu#deploy_a_model), the smallest configuration that offers more than 1 chip is the 4-chip configuration: `ct5lp-hightpu-4t`. You can subsequently set `--tensor_parallel_size=4`.
4. Determine the maximum context length (input length + output length) for the intended use case. For example, 4096. You can subsequently set `--max_model_len=4096`.
5. Tune the amount of free TPU memory allocated for KV cache to the maximum value achievable given the model, hardware and server configurations (`--hbm_utilization_factor`). Start with `0.95`. Deploy the Hex-LLM server and test the server with long prompts and high concurrency. If the server runs out-of-memory, reduce the utilization factor accordingly.

A sample set of arguments for deploying Llama 3.1 8B Instruct is:

    python -m hex_llm.server.api_server \
        --model=meta-llama/Llama-3.1-8B-Instruct \
        --tensor_parallel_size=4 \
        --max_model_len=4096
        --hbm_utilization_factor=0.95

A sample set of arguments for deploying Llama 3.1 70B Instruct AWQ on
`ct5lp-hightpu-4t` is:

    python -m hex_llm.server.api_server \
        --model=hugging-quants/Meta-Llama-3.1-70B-Instruct-AWQ-INT4 \
        --tensor_parallel_size=4 \
        --max_model_len=4096
        --hbm_utilization_factor=0.45

### Request Cloud TPU quota

In Model Garden, your default quota is 32 Cloud TPU v5e
chips in the `us-west1` region. This quotas applies to one-click deployments and
Colab Enterprise notebook deployments. To request a higher quota value,
see [Request a quota adjustment](https://docs.cloud.google.com/docs/quotas/help/request_increase).
