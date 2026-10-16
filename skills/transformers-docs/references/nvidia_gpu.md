

# NVIDIA GPU

[`TrainingArguments`], [`Trainer`], and [`Pipeline`] detect NVIDIA GPUs and set the backend to `cuda` automatically.

## Select and order GPUs

You can control which GPUs PyTorch sees and in what order. Prioritize faster GPUs or limit a run to a subset of available GPUs. It works with both [DistributedDataParallel](https://pytorch.org/docs/stable/generated/torch.nn.parallel.DistributedDataParallel.html) and [DataParallel](https://pytorch.org/docs/stable/generated/torch.nn.DataParallel.html), and doesn't require Accelerate or the [DeepSpeed integration](./main_classes/deepspeed).

Use the `CUDA_VISIBLE_DEVICES` environment variable to select GPUs and set their order. Set it on the command line per run, or add it to `~/.bashrc` or another startup config file.

> [!WARNING]
> Avoid exporting environment variables because if you forget how an environment variable was set up, you may silently train on the wrong GPUs. Set the environment variable on the same command line as the training run.

For example, to select GPUs 0 and 2 out of four:

```cli
CUDA_VISIBLE_DEVICES=0,2 torchrun trainer-program.py ...
```

PyTorch sees only GPUs 0 and 2, which are mapped to `cuda:0` and `cuda:1`. To reverse the order (use GPU 2 as `cuda:0` and GPU 0 as `cuda:1`):

```cli
CUDA_VISIBLE_DEVICES=2,0 torchrun trainer-program.py ...
```

To run without any GPUs:

```cli
CUDA_VISIBLE_DEVICES= python trainer-program.py ...
```

Control the order of CUDA devices with `CUDA_DEVICE_ORDER`.

- Order by PCIe bus ID (matches `nvidia-smi`):

    ```cli
    export CUDA_DEVICE_ORDER=PCI_BUS_ID
    ```

- Order by compute capability (fastest first):

    ```cli
    export CUDA_DEVICE_ORDER=FASTEST_FIRST
    ```
