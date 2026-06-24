

# EETQ

The [Easy & Efficient Quantization for Transformers (EETQ)](https://github.com/NetEase-FuXi/EETQ) library supports int8 weight-only per-channel quantization for NVIDIA GPUs. It uses high-performance GEMM and GEMV kernels from [FasterTransformer](https://github.com/NVIDIA/FasterTransformer) and [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM). The attention layer is optimized with [FlashAttention2](https://github.com/Dao-AILab/flash-attention). No calibration dataset is required, and the model doesn't need to be pre-quantized. Accuracy degradation is negligible owing to the per-channel quantization.

EETQ further supports fine-tuning with [PEFT](https://huggingface.co/docs/peft).

Install EETQ from the [release page](https://github.com/NetEase-FuXi/EETQ/releases) or [source code](https://github.com/NetEase-FuXi/EETQ). CUDA 11.4+ is required for EETQ.

<hfoptions id="install">
<hfoption id="release page">

```bash
pip install --no-cache-dir https://github.com/NetEase-FuXi/EETQ/releases/download/v1.0.0/EETQ-1.0.0+cu121+torch2.1.2-cp310-cp310-linux_x86_64.whl
```

</hfoption>
<hfoption id="source code">

```bash
git clone https://github.com/NetEase-FuXi/EETQ.git
cd EETQ/
git submodule update --init --recursive
pip install .
```

</hfoption>
</hfoptions>

Quantize a model on-the-fly by defining the quantization data type in [`EetqConfig`].

```py
from transformers import AutoModelForCausalLM, EetqConfig

quantization_config = EetqConfig("int8")
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B",
    dtype="auto",
    device_map="auto",
    quantization_config=quantization_config
)
```

Save the quantized model with [`~PreTrainedModel.save_pretrained`] so it can be reused again with [`~PreTrainedModel.from_pretrained`].

```py
quant_path = "/path/to/save/quantized/model"
model.save_pretrained(quant_path)
model = AutoModelForCausalLM.from_pretrained(quant_path, device_map="auto")
```
