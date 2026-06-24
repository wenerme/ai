

# MXFP4

Note: MXFP4 quantization currently only works for OpenAI GPT-OSS 120b and 20b.

MXFP4 is a 4-bit floating point format that dramatically reduces the memory requirements of large models. Large models (GPT-OSS-120B) can fit on a single 80GB GPU and smaller models (GPT-OSS-20B) only require 16GB of memory. It uses blockwise scaling to preserve its range and accuracy, which typically becomes degraded at lower precisions.

To use MXPF4, make sure your hardware meets the following requirements.

- Install Accelerate, kernels, and Triton ≥ 3.4. Only manually install Triton ≥ 3.4 if you're using PyTorch 2.7 because it is already supported in PyTorch 2.8.
- NVIDIA GPU Compute Capability ≥ 7.5 which includes Tesla GPUs and newer. Use [get_device_capability](https://docs.pytorch.org/docs/stable/generated/torch.cuda.get_device_capability.html) to check Compute Capability.

```python
from torch import cuda
cuda.get_device_capability()

# (7, 5)
```

Check a model's quantization config as shown below to see if it supports MXFP4. If `'quant_method': 'mxfp4'`, then the model automatically uses MXFP4.

```py
from transformers import GptOssConfig

model_id = "openai/gpt-oss-120b"
cfg = GptOssConfig.from_pretrained(model_id)
print(cfg.quantization_config)

# Example output:
# {
#   'modules_to_not_convert': [
#     'model.layers.*.self_attn',
#     'model.layers.*.mlp.router',
#     'model.embed_tokens',
#     'lm_head'
#   ],
#   'quant_method': 'mxfp4'
# }
```

## MXFP4 kernels

Transformers automatically pulls the MXFP4-aware Triton kernels from the community repository when you load a model that needs them. The kernels are stored in your local cache and used during the forward pass.

MXFP4 kernels are used by default, if available and supported, and does not require any code changes.

You can use [hf cache scan](https://huggingface.co/docs/huggingface_hub/en/guides/manage-cache#scan-your-cache) to verify the kernels are downloaded.

```shell
hf cache scan
```

```shell
REPO ID                          REPO TYPE SIZE ON DISK
-------------------------------- --------- ------------
kernels-community/triton_kernels model           536.2K
openai/gpt-oss-20b               model            13.8G
```

## Resources

Learn more about MXFP4 quantization and how blockwise scaling works in this [blog post](https://huggingface.co/blog/faster-transformers#mxfp4-quantization).
