

# Four Over Six

[Four Over Six](https://github.com/mit-han-lab/fouroversix) is a library for performing fast and accurate FP4 quantization, particularly with the NVFP4 format on NVIDIA Blackwell GPUs.
Our method adaptively scales NVFP4 blocks to either 4 or 6 to reduce quantization error on near-maximal values in each block, as described in our [preprint](https://arxiv.org/abs/2512.02010).

![Four Over Six visual explanation](https://github.com/mit-han-lab/fouroversix/raw/main/assets/four-over-six.png)

Our implementation runs most efficiently on NVIDIA Blackwell GPUs.
However, you may run Four Over Six on older hardware, and even on CPUs, without any code changes, as in these cases our framework automatically falls back to an implementation that performs simulation with FP32 matrix multiplication.

To quantize a model to NVFP4 with 4/6, you may load your model as follows:

```python
from transformers import AutoModelForCausalLM, FourOverSixConfig

model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen3-8B",
    device_map="auto",
    quantization_config=FourOverSixConfig(),
)
```

We support many different quantization options which are commonly used during NVFP4 quantization, including the random Hadamard transform, 2D block scaling, transposed inputs, and stochastic rounding, as described in our [preprint](https://arxiv.org/abs/2512.02010).
These may be used by setting the appropriate option in the `FourOverSixConfig` passed above.
Individual layers can be given custom quantization options by setting `module_config_overrides`, or excluded from quantization by setting `modules_to_not_convert`, as shown below.

## Training

Our quantized linear layer contains a backward pass implementation, so many models can be trained further with few modifications.
Make sure to set `keep_master_weights` to `True`, and to exclude layers from quantization as needed (it is often important to keep the last few layers of a network in high precision):

```python
from transformers import AutoModelForCausalLM, FourOverSixConfig

model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen3-8B",
    device_map="auto",
    quantization_config=FourOverSixConfig(
        keep_master_weights=True,
        modules_to_not_convert=[
            "lm_head",
            "model.layers.34.self_attn.q_proj",
            "model.layers.34.self_attn.k_proj",
            "model.layers.34.self_attn.v_proj",
            # Add more layers here, e.g. self_attn.o_proj, MLP layers
        ],
    ),
)
```
