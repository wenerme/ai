

# Apple Silicon

Apple Silicon (M series) features a unified memory architecture, making it possible to efficiently train large models locally and improves performance by reducing latency associated with data retrieval. You can take advantage of Apple Silicon for training with PyTorch due to its integration with [Metal Performance Shaders (MPS)](https://pytorch.org/docs/stable/notes/mps.html).

The `mps` backend requires macOS 12.3 or later.

> [!WARNING]
> Some PyTorch operations are not implemented in MPS yet. To avoid an error, set the environment variable `PYTORCH_ENABLE_MPS_FALLBACK=1` to fallback on the CPU kernels. Please open an issue in the [PyTorch](https://github.com/pytorch/pytorch/issues) repository if you encounter any other issues.

[`TrainingArguments`] and [`Trainer`] detects and sets the backend device to `mps` if an Apple Silicon device is available. No additional changes are required to enable training on your device.

The `mps` backend doesn't support [distributed training](https://pytorch.org/docs/stable/distributed.html#backends).

## Resources

Learn more about the MPS backend in the [Introducing Accelerated PyTorch Training on Mac](https://pytorch.org/blog/introducing-accelerated-pytorch-training-on-mac/) blog post.
