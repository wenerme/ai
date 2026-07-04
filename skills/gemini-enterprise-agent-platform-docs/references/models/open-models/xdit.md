xDiT is an open-source library that accelerates inference for Diffusion
Transformer (DiT) models by using parallelism and optimization techniques. These
techniques enable a scalable multi-GPU setup for demanding workloads. This page
demonstrates how to deploy DiT models by using xDiT and Cloud GPUs on
Gemini Enterprise Agent Platform.

For more information about xDiT, see the [xDiT GitHub project](https://github.com/xdit-project/xDiT/tree/main?tab=readme-ov-file).

## Benefits

The following list describes the key benefits for using xDiT to serve DiT models
on Agent Platform:

- **Up to three times faster generation**: Generate high-resolution images and videos in a fraction of the time compared to other serving solutions.
- **Scalable multi-GPU support** : Efficiently distribute workloads across multiple GPUs for optimal performance.
  - **Hybrid parallelism**: xDiT supports various parallel processing approaches, such as unified sequence parallelism, PipeFusion, CFG parallelism, and data parallelism. These methods can be combined in a unique recipe to optimize performance.
- **Optimized single-GPU performance** : xDiT provides faster inference even on a single GPU.
  - **GPU acceleration**: xDiT incorporates several kernel acceleration methods and uses techniques from DiTFastAttn to speed up inference on a single GPU.
- **Easy deployment**: Get started quickly with one-click deployment or Colab Enterprise notebooks in Gemini Enterprise Agent Platform Model Garden.

## Supported models

xDiT is available for certain DiT model architectures in
Gemini Enterprise Agent Platform Model Garden such as Flux.1 Schnell,
CogVideoX-2b, and Wan2.1 text-to-video model variants. To see if a DiT model
supports xDiT in Model Garden, view its model card in
[Model Garden](https://console.cloud.google.com/vertex-ai/model-garden).

## Hybrid parallelism for multi-GPU performance:

xDiT uses a combination of parallelism techniques to maximize performance on
multi-GPU setups. These techniques work together to distribute the workload and
optimize resource utilization:

- **[Unified sequence parallelism](https://arxiv.org/pdf/2405.07719)**: This technique splits the input data (such as splitting an image into patches) across multiple GPUs, reducing the memory usage and improving scalability.
- **[PipeFusion](https://arxiv.org/pdf/2405.14430)**: PipeFusion divides the DiT model into stages and assigns each stage to a different GPU, enabling parallel processing of different parts of the model.
- **CFG parallelism**: This technique specifically optimizes models by using classifier-free guidance, a common method for controlling the style and content of generated images. It parallelizes the computation of conditional and unconditional branches, leading to faster inference.
- **Data Parallelism**: This method replicates the entire model on each GPU, with each GPU processing a different batch of input data, increasing the overall throughput of the system.

For more information about performance improvements, see xDiT's report on
[Flux.1 Schnell](https://github.com/xdit-project/xDiT/blob/main/docs/performance/flux.md) or [CogVideoX-2b](https://github.com/xdit-project/xDiT/blob/main/docs/performance/cogvideo.md#cogvideox-2b5b). Google was able to reproduce
these results on Gemini Enterprise Agent Platform Model Garden.

## Single GPU acceleration

The xDiT library provides benefits for single-GPU serving by using
[torch.compile](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) and [onediff](https://github.com/siliconflow/onediff) to enhance runtime speed on GPUs.
These techniques can also be used in conjunction with hybrid parallelism.

xDiT also has an efficient attention computation technique, called DiTFastAttn,
to address DiT's computational bottleneck. For now, this technique is only
available to use for single GPU setups or in conjunction with data parallelism.

## Get started in Model Garden

The xDiT optimized Cloud GPU serving container is provided within
Gemini Enterprise Agent Platform Model Garden. For supported models, deployments
use this container when you use one-click deployments or the
Colab Enterprise notebook examples.

The following examples use the Flux.1-schnell model to demonstrate how to deploy
a DiT model on a xDiT container.

### Use one-click deployment

You can deploy a custom Agent Platform endpoint with the xDiT
container by using a model card.

1. Navigate to the [model card page](https://console.cloud.google.com/vertex-ai/publishers/black-forest-labs/model-garden/flux1-schnell) and click **Deploy**.

2. For the model variation to use, select a machine type to use for your
   deployment.

3. Click **Deploy** to begin the deployment process. You receive two email
   notifications; one when the model is uploaded and another when the endpoint
   is ready.

### Use the Colab Enterprise notebook

For flexibility and customization, use the Colab Enterprise
notebook examples to deploy an Agent Platform endpoint with the xDiT
container by using the Agent Platform SDK for Python.

1. Navigate to the [model card page](https://console.cloud.google.com/vertex-ai/publishers/black-forest-labs/model-garden/flux1-schnell) and click **Open notebook**.

2. Select the Vertex Serving notebook. The notebook is opened in
   Colab Enterprise.

3. Run through the notebook to deploy a model by using the xDiT container and
   send prediction requests to the endpoint. The code snippet for the
   deployment is as follows:

    import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
    from vertexai import model_garden

    https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project=<YOUR_PROJECT_ID>, location=<REGION>)

    model = model_garden.OpenModel("black-forest-labs/FLUX.1-schnell")
    endpoint = model.deploy()

#### xDiT arguments

xDiT offers a range of server arguments that can be configured to optimize
performance for specific use cases. These arguments are set as environment
variables during deployment. The following list are the key arguments you might
need to configure:

##### Model Configuration

- `MODEL_ID` (string): Specifies the model identifier to load. This should match the model name in your registry or path.

##### Runtime Optimization Arguments

- `N_GPUS` (integer): Specifies the number of GPUs to use for inference. The default value is 1.
- `WARMUP_STEPS` (integer): Number of warmup steps required before inference begins. This is particularly important when PipeFusion is enabled to ensure stable performance. The default value is 1.
- `USE_PARALLEL_VAE` (boolean): Enables efficient processing of high-resolution images (greater than 2048 pixels) by parallelizing the VAE component across devices. This prevents OOM issues for large images. The default value is false.
- `USE_TORCH_COMPILE` (boolean): Enables single-GPU acceleration through torch.compile, providing kernel-level optimizations for improved performance. The default value is false.
- `USE_ONEDIFF` (boolean): Enables OneDiff compilation acceleration technology to optimize GPU kernel execution speed. The default value is false.

##### Data Parallel Arguments

- `DATA_PARALLEL_DEGREE` (integer): Sets the degree of data parallelism. Leave empty to disable or set to selected parallel degree.
- `USE_CFG_PARALLEL` (boolean): Enables parallel computation for classifier-free guidance (CFG), also known as Split Batch. When enabled, the constant parallelism degree is 2. Set to true when using CFG for controlling output style and content. The default value is false.

##### Sequence Parallel Arguments (USP - Unified Sequence Parallelism)

- `ULYSSES_DEGREE` (integer): Sets the Ulysses degree for the unified sequence parallel approach, which combines DeepSpeed-Ulysses and Ring-Attention. This controls the all-to-all communication pattern. Leave empty to use default.
- `RING_DEGREE` (integer): Sets the Ring degree for peer-to-peer communication in sequence parallelism. Works in conjunction with ULYSSES_DEGREE to form the 2D process mesh. Leave empty to use default.

##### Tensor Parallel Arguments

- `TENSOR_PARALLEL_DEGREE` (integer): Sets the degree of tensor parallelism, which splits model parameters across devices along feature dimensions to reduce memory costs per device. Leave empty to disable.
- `SPLIT_SCHEME` (string): Defines how to split the model tensors across devices (e.g., by attention heads, hidden dimensions). Leave empty for the default splitting scheme.

##### Ray Distributed Arguments

- `USE_RAY` (boolean): Enables Ray distributed execution framework for scaling computations across multiple nodes. The default value is false.
- `RAY_WORLD_SIZE` (integer): Total number of processes in the Ray cluster. The default value is 1.
- `VAE_PARALLEL_SIZE` (integer): Number of processes dedicated to VAE parallel processing when using Ray. The default value is 0.
- `DIT_PARALLEL_SIZE` (integer): Number of processes dedicated to DiT backbone parallel processing when using Ray. The default value is 0.

##### PipeFusion Parallel Arguments

- `PIPEFUSION_PARALLEL_DEGREE` (integer): Sets the degree of parallelism for PipeFusion, a sequence-level pipeline parallelism that takes advantage of the input temporal redundancy characteristics of diffusion models. Higher values increase parallelism but require more memory. The default value is 1.
- `NUM_PIPELINE_PATCH` (integer): Number of patches to split the sequence into for pipeline processing. Leave empty for automatic determination.
- `ATTN_LAYER_NUM_FOR_PP` (string): Specifies which attention layers to use for pipeline parallelism. Can be comma-separated (e.g., "10,9") or space-separated (e.g., "10 9"). Leave empty to use all layers.

##### Memory Optimization Arguments

- `ENABLE_MODEL_CPU_OFFLOAD` (boolean): Offloads model weights to CPU memory when not in use, reducing GPU memory usage at the cost of increased latency. The default value is false.
- `ENABLE_SEQUENTIAL_CPU_OFFLOAD` (boolean): Sequentially offloads model layers to CPU during forward pass, enabling inference of models larger than GPU memory. The default value is false.
- `ENABLE_TILING` (boolean): Reduces GPU memory usage by decoding the VAE component one tile at a time. This argument is useful for larger images or videos and to prevent out-of-memory errors. The default value is false.
- `ENABLE_SLICING` (boolean): Reduces GPU memory usage by splitting the input tensor into slices for VAE decoding. The default value is false.

##### DiTFastAttn Arguments (Attention Optimization)

- `USE_FAST_ATTN` (boolean): Enables DiTFastAttn acceleration for single-GPU inference, utilizing Input Temporal Reduction to reduce computational complexity. The default value is false.
- `N_CALIB` (integer): Number of calibration samples for DiTFastAttn optimization. The default value is 8.
- `THRESHOLD` (float): Similarity threshold for Temporal Similarity Reduction in DiTFastAttn. The default value is 0.5.
- `WINDOW_SIZE` (integer): Window size for Window Attention with Residual Caching to reduce spatial redundancy. The default value is 64.
- `COCO_PATH` (string): Path to COCO dataset for DiTFastAttn calibration. Required when USE_FAST_ATTN is true. Leave empty if not using.

##### Cache Optimization Arguments

- `USE_CACHE` (boolean): Enables general caching mechanisms to reduce redundant computations. The default value is false.
- `USE_TEACACHE` (boolean): Enables TeaCache optimization method for caching intermediate results. The default value is false.
- `USE_FBCACHE` (boolean): Enables First-Block-Cache optimization method. The default value is false.

##### Precision Optimization Arguments

- `USE_FP8_T5_ENCODER` (boolean): Enables FP8 (8-bit floating point) precision for the T5 text encoder, reducing memory usage and potentially improving throughput with minimal quality impact. The default value is false.

> [!NOTE]
> **Note:** When you configure parallelism degrees (`PIPEFUSION_PARALLEL_DEGREE`, `ULYSSES_DEGREE`, `RING_DEGREE`, and `USE_CFG_PARALLEL`), check that the product of these values equals the total number of GPUs (`N_GPUS`). For example, with 2 GPUs, a valid configuration can have `RING_DEGREE` set to `1` and `ULYSSES_DEGREE` set to `2`. Because 1 x 2 = 2, this configuration is valid. For a full list of arguments, see the [`xFuserArgs` class](https://github.com/xdit-project/xDiT/blob/main/xfuser/config/args.py) in the xDiT GitHub project.

### Serving Customizations

Model Garden provides default xDiT parallelization configurations for supported models. You can inspect these default settings using the [Agent Platform SDK](https://cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models?_gl=1*1vbblld*_ga*MTg0NzQyNjM2NS4xNzUyNjAyNDg5*_ga_WH2QY8WWF5*czE3NTI2OTg4MTckbzIkZzEkdDE3NTI2OTg4MTgkajU5JGwwJGgw#deploy_a_model) for Python.

To view the default deployment configuration for a model, such as "black-forest-labs/FLUX.1-schnell", you can run the following code snippet:

    import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
    from vertexai import model_garden

    https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project=<YOUR_PROJECT_ID>, location=<REGION>)

    model = model_garden.OpenModel("black-forest-labs/FLUX.1-schnell")
    deploy_options = model.list_deploy_options()

    # Example Response
    # ['black-forest-labs/flux1-schnell@flux.1-schnell']
    # [model_display_name: "Flux1-schnell"
    # container_spec {
    #   image_uri: "us-docker.pkg.dev/deeplearning-platform-release/vertex-model-garden/xdit-serve.cu125.0-2.ubuntu2204.py310"
    #  env {
    #    name: "DEPLOY_SOURCE"
    #    value: "UI_NATIVE_MODEL"
    #  }
    #  env {
    #    name: "MODEL_ID"
    #    value: "gs://vertex-model-garden-restricted-us/black-forest-labs/FLUX.1-schnell"
    #  }
    #  env {
    #    name: "TASK"
    #    value: "text-to-image"
    #  }
    #  env {
    #    name: "N_GPUS"
    #    value: "2"
    #  }
    #  env {
    #    name: "USE_TORCH_COMPILE"
    #    value: "true"
    #  }
    #  env {
    #    name: "RING_DEGREE"
    #    value: "2"
    #  }
    # ..........]

The `list_deploy_options()` method returns the container specifications, including the environment variables (env) that define the xDiT configuration.

To customize the parallelism strategy, you can override these environment variables when deploying the model. The following example demonstrates how to modify the RING_DEGREE and ULYSSES_DEGREE for a 2-GPU setup, changing the parallelism approach:

    import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
    from vertexai import model_garden

    # Replace with your project ID and region
    https://docs.cloud.google.com/python/docs/reference/vertexai/latest.init(project="<YOUR_PROJECT_ID>", location="<REGION>")

    model = model_garden.OpenModel("black-forest-labs/FLUX.1-schnell")

    # Custom environment variables to override default settings
    # This example sets N_GPUS as 2, so RING_DEGREE * ULYSSES_DEGREE must equal 2
    container_env_vars = {
        "N_GPUS": "2",
        "RING_DEGREE": "1",
        "ULYSSES_DEGREE": "2"
        # Add other environment variables to customize here
    }

    machine_type = "a3-highgpu-2g"
    accelerator_type = "NVIDIA_H100_80GB"
    accelerator_count = 2

    # Deploy the model with the custom environment variables
    endpoint = model.deploy(
        machine_type=machine_type,
        accelerator_type=accelerator_type,
        accelerator_count=accelerator_count,
      container_env_vars=container_env_vars
    )

Remember to consult the "Understanding xDiT specific arguments" section for details on each environment variable. Ensure that the product of parallelism degrees (e.g., PIPEFUSION_PARALLEL_DEGREE,ULYSSES_DEGREE, RING_DEGREE, and USE_CFG_PARALLEL) equals the total number of GPUs (N_GPUS).

For more examples of serving recipes and configurations for different models, refer to the [xDiT official documentation](https://github.com/xdit-project/xDiT/tree/main?tab=readme-ov-file). For additional information on the Model Garden SDK, see the [documentation](https://cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models?_gl=1*1vbblld*_ga*MTg0NzQyNjM2NS4xNzUyNjAyNDg5*_ga_WH2QY8WWF5*czE3NTI2OTg4MTckbzIkZzEkdDE3NTI2OTg4MTgkajU5JGwwJGgw#deploy_a_model).
