

# SpQR

The [SpQR](https://hf.co/papers/2306.03078) quantization algorithm involves a 16x16 tiled bi-level group 3-bit quantization structure with sparse outliers.

<div class="flex justify-center">
    
</div>

> [!TIP]
> To quantize a model with SpQR, refer to the [Vahe1994/SpQR](https://github.com/Vahe1994/SpQR) repository.

Load a SpQR-quantized model with [`~PreTrainedModel.from_pretrained`].

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

quantized_model = AutoModelForCausalLM.from_pretrained(
    "elvircrn/Llama-2-7b-SPQR-3Bit-16x16-red_pajama-hf",
    dtype=torch.half,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("elvircrn/Llama-2-7b-SPQR-3Bit-16x16-red_pajama-hf")
```
