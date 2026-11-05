

# Dequantize a model

Dequantizing converts quantized weights back to a higher-precision dtype like bf16. Dequantize a model to fully fine-tune it, to run it on hardware the method's kernels don't support, or to convert it to another format. The result uses as much memory as an unquantized model, and it doesn't recover the accuracy lost to rounding.

Transformers dequantizes in two ways, depending on the method.

| Method | How to dequantize |
|---|---|
| [bitsandbytes](./bitsandbytes), [HIGGS](./higgs) | Call [`~PreTrainedModel.dequantize`] after loading. |
| [compressed-tensors](./compressed_tensors), [Fine-grained FP8](./finegrained_fp8), [GGUF](./gguf), [Metal](./metal), [MXFP4](./mxfp4) | Pass `dequantize=True` to the method's config when loading. |

Other methods raise a `NotImplementedError` from [`~PreTrainedModel.dequantize`].

## Dequantize after loading

Call [`~PreTrainedModel.dequantize`] on a loaded model. It defaults to the dtype the model was loaded in. Pass `dtype` to choose another.

```py
import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen3-0.6B",
    quantization_config=BitsAndBytesConfig(load_in_4bit=True),
    device_map="auto",
)
model = model.dequantize(dtype=torch.bfloat16)
```

[`~PreTrainedModel.dequantize`] also removes the `quantization_config`, so [`~PreTrainedModel.save_pretrained`] saves a regular full-precision checkpoint.

## Dequantize while loading

Pass `dequantize=True` to the config of a method that supports it. The weights are dequantized as they load, so the quantized kernels are never used. The example below loads the MXFP4 weights of gpt-oss in bf16.

```py
from transformers import AutoModelForCausalLM, Mxfp4Config

model = AutoModelForCausalLM.from_pretrained(
    "openai/gpt-oss-20b",
    quantization_config=Mxfp4Config(dequantize=True),
    device_map="auto",
)
```

Some methods dequantize automatically when their kernels can't run. [GGUF](./gguf), for example, falls back to dequantizing when no kernel supports the file's quantization types.
