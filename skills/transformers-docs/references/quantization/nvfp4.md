

# NVFP4

NVFP4 quantization packs full-precision linear weights into NVIDIA's 4-bit floating-point format while a model is
loaded. [`NVFP4Config`] replaces eligible bias-free `torch.nn.Linear` modules, whose `in_features` and `out_features` are both divisible by 16, with an NVFP4 linear implementation from
the [NVFP4 Hub kernel](https://huggingface.co/kernels-community/nvfp4-gemm). The model's attention and MLP interfaces are
not replaced.

> [!TIP]
> NVFP4 requires a Blackwell GPU with compute capability 10.0 or newer, a compatible CUDA-enabled PyTorch build, and
> the [kernels](https://github.com/huggingface/kernels) package.

Install Accelerate and a compatible version of `kernels`.

```bash
pip install --upgrade accelerate kernels
```

Pass [`NVFP4Config`] to [`~PreTrainedModel.from_pretrained`] with a single CUDA device. Weights are quantized as they
are loaded, so the source checkpoint should contain floating-point weights.

```py
import torch

from transformers import AutoModelForCausalLM, AutoTokenizer, NVFP4Config

model_id = "meta-llama/Llama-3.2-1B"
quantization_config = NVFP4Config()
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    dtype=torch.bfloat16,
    device_map="cuda",
    quantization_config=quantization_config,
)

tokenizer = AutoTokenizer.from_pretrained(model_id)
inputs = tokenizer("NVFP4 is", return_tensors="pt").to(model.device)
output = model.generate(**inputs, max_new_tokens=20)
print(tokenizer.decode(output[0], skip_special_tokens=True))
```

Use `modules_to_not_convert` to keep selected modules in their original precision.

```py
quantization_config = NVFP4Config(modules_to_not_convert=["vision", "lm_head"])
```

NVFP4 linear modules support `torch.compile`. The first compiled invocation includes graph compilation time, so warm up
the model before measuring generation throughput.

## Current limitations

- Only one CUDA device is supported. Tensor parallelism and multi-device `device_map` configurations are rejected until
  the sharding behavior of the NVFP4 scale metadata is defined.
- CPU and disk offload are not supported.
- Pre-quantized NVFP4 checkpoints are not supported.
- NVFP4 models cannot currently be serialized with [`~PreTrainedModel.save_pretrained`] or trained.
