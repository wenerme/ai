

# DeepSpeed

[DeepSpeed](https://github.com/deepspeedai/DeepSpeed), powered by Zero Redundancy Optimizer (ZeRO), is an optimization library for training and fitting very large models onto a GPU. It is available in several ZeRO stages, where each stage progressively saves more GPU memory by partitioning the optimizer state, gradients, parameters, and enabling offloading to a CPU or NVMe. DeepSpeed is integrated with the [`Trainer`] class and most of the setup is automatically taken care of for you.

However, if you want to use DeepSpeed without the [`Trainer`], Transformers provides a [`HfDeepSpeedConfig`] class.

Learn more about using DeepSpeed with [`Trainer`] in the [DeepSpeed](../deepspeed) guide.

## HfDeepSpeedConfig

[[autodoc]] integrations.HfDeepSpeedConfig
    - all
