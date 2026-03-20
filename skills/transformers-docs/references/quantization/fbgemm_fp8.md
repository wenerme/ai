

# FBGEMM

[FBGEMM (Facebook GEneral Matrix Multiplication)](https://github.com/pytorch/FBGEMM) is a low-precision matrix multiplication library for small batch sizes and support for accuracy-loss minimizing techniques such as row-wise quantization and outlier-aware quantization. With FBGEMM, quantize a models weights to 8-bits/channel and the activations to 8-bits/token (also known as fp8 or w8a8).

> [!TIP]
> You need a GPU with [compute capability 9+](https://developer.nvidia.com/cuda-gpus#collapseOne) like a H100.

Install the FBGEMM_GPU package with the command below to ensure you have the latest version.

```bash
pip install --upgrade accelerate fbgemm-gpu torch
```

If you're having installation issues, try installing the [nightly release](https://pytorch.org/FBGEMM/fbgemm_gpu-development/InstallationInstructions.html#fbgemm-gpu-install-libraries:~:text=found%20here.-,Install%20the%20FBGEMM_GPU%20Package,-Install%20through%20PyTorch).

Create a [`FbgemmFp8Config`] and pass it to [`~PreTrainedModel.from_pretrained`] to quantize a model to fp8.

```py
from transformers import FbgemmFp8Config, AutoModelForCausalLM

quantization_config = FbgemmFp8Config()
quantized_model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Meta-Llama-3-8B",
    dtype="auto",
    device_map="auto",
    quantization_config=quantization_config
)
```

[`~PreTrainedModel.save_pretrained`] and [`~PreTrainedModel.from_pretrained`] enable saving and loading a quantized model.

```py
quant_path = "/path/to/save/quantized/model"
model.save_pretrained(quant_path)
model = AutoModelForCausalLM.from_pretrained(quant_path, device_map="auto")
```

## Resources

Read the [Open-sourcing FBGEMM for state-of-the-art server-side inference](https://engineering.fb.com/2018/11/07/ml-applications/fbgemm/) blog post for more details on FBGEMM.
