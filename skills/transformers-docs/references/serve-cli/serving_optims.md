

# Server optimizations

`transformers serve` includes optimizations to improve throughput and reduce memory usage.

## Continuous batching

[Continuous batching](../continuous_batching) dynamically groups and interleaves requests to share forward passes on the GPU. New requests join the batch as others progress through prefill. Completed requests drop out after decoding. This increases GPU utilization and throughput without compromising latency.

Add the `--continuous-batching` argument to enable continuous batching.

```sh
transformers serve \
  --continuous-batching
  --attn_implementation "sdpa"
```

Monitor continuous batching performance with [OpenTelemetry](https://opentelemetry.io). It collects traces and metrics, but you'll need a backend to visualize them.

Install the OpenTelemetry dependency.

```py
pip install transformers[open-telemetry]
```

## Quantization

[Quantization](../quantization/overview) reduces memory usage by mapping weights to a lower precision. `transformers serve` is compatible with all quantization methods in Transformers. It supports pre-quantized models and runtime quantization.

Pre-quantized models don't require any changes. They generally provide the best balance between performance and accuracy. Install the appropriate quantization library. Then pass the pre-quantized model from the Hub to the `model` argument.

```sh
curl http://localhost:8000/v1/responses \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen3-8B-GGUF",
    "stream": true,
    "input": "Tell me a three sentence bedtime story about a unicorn."
  }'
```

Use the `--quantization` argument to quantize a model at runtime. This helps when experimenting with new checkpoints or finetunes that don't have quantized weights yet. Only [bitsandbytes](../quantization/bitsandbytes) 4-bit and 8-bit quantization is supported.

```sh
transformers serve \
  --quantization bnb-4bit
```

## Attention backend

An optimized [attention backend](../attention_interface) improves memory efficiency and speeds up inference.

```sh
transformers serve \
  --continuous_batching \
  --attn_implementation "flash_attention_2"
```

## Data type

The `"bfloat16"` or `"float16"` [data types](../models#model-data-type) save memory and increase throughput.

```sh
transformers serve \
  --continuous_batching \
  --dtype "bfloat16"
```