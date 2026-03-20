

# Optimum Quanto

[Quanto](https://github.com/huggingface/optimum-quanto) is a PyTorch quantization backend for [Optimum](https://huggingface.co/docs/optimum/index). It features linear quantization for weights (float8, int8, int4, int2) with accuracy very similar to full-precision models. Quanto is compatible with any model modality and device, making it simple to use regardless of hardware.

Quanto is also compatible with [torch.compile](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) for faster generation.

Install Quanto with the following command.

```bash
pip install optimum-quanto accelerate transformers
```

Quantize a model by creating a [`QuantoConfig`] and specifying the `weights` parameter to quantize to. This works for any model in any modality as long as it contains [torch.nn.Linear](https://pytorch.org/docs/stable/generated/torch.nn.Linear.html) layers.

> [!TIP]
> The Transformers integration only supports weight quantization. Use the Quanto library directly if you need activation quantization, calibration, or QAT.

```py
from transformers import AutoModelForCausalLM, AutoTokenizer, QuantoConfig

quant_config = QuantoConfig(weights="int8")
model = transformers.AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B", 
    dtype="auto", 
    device_map="auto", 
    quantization_config=quant_config
)
```

## torch.compile

Wrap a Quanto model with [torch.compile](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) for faster generation.

```py
import torch
from transformers import AutoModelForSpeechSeq2Seq, QuantoConfig

quant_config = QuantoConfig(weights="int8")
model = AutoModelForSpeechSeq2Seq.from_pretrained(
  "openai/whisper-large-v2",
  dtype="auto",
  device_map="auto",
  quantization_config=quant_config
)

model = torch.compile(model)
```

## Resources

Read the [Quanto: a PyTorch quantization backend for Optimum](https://huggingface.co/blog/quanto-introduction) blog post to learn more about the library design and benchmarks.

For more hands-on examples, take a look at the Quanto [notebook](https://colab.research.google.com/drive/16CXfVmtdQvciSh9BopZUDYcmXCDpvgrT?usp=sharing).
