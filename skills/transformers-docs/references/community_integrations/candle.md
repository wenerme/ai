

# Candle

[Candle](https://github.com/huggingface/candle) is a machine learning framework providing native Rust implementations of Transformers models. It natively supports [safetensors](https://huggingface.co/docs/safetensors/en/index) to load Transformers models directly.

```rust
/// load model config
let config: Config = 
    serde_json::from_reader(std::fs::File::open(config_filename)?)?;

/// load safetensors and memory-maps them
let vb = unsafe {
    VarBuilder::from_mmaped_safetensors(&filenames, dtype, &device)?
};

/// materialize tensors from VarBuilder into model class
let model = Model::new(args.use_flash_attn, &config, vb)?;
```

## Transformers integration

1. The [hf-hub](https://github.com/huggingface/hf-hub) crate checks your local [Hugging Face cache](../installation#cache-directory) for a model. If it isn't there, it downloads model weights and configs from the Hub.
2. [VarBuilder](https://github.com/huggingface/candle/blob/f526033db7ea880c7189628a2dc00e3e2008a9e7/candle-nn/src/var_builder.rs#L38) lazily loads the safetensor files. It maps state-dict key names to Rust structs representing model layers. This mirrors how Transformers organizes its weights.
3. Candle parses `config.json` to extract model metadata and instantiates the matching Rust model class with weights from `VarBuilder`.

## Resources

- [Candle](https://github.com/huggingface/candle) documentation