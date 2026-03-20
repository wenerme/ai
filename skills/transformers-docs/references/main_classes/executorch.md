

# ExecuTorch

[`ExecuTorch`](https://github.com/pytorch/executorch) is an end-to-end solution for enabling on-device inference capabilities across mobile and edge devices including wearables, embedded devices and microcontrollers. It is part of the PyTorch ecosystem and supports the deployment of PyTorch models with a focus on portability, productivity, and performance.

ExecuTorch introduces well defined entry points to perform model, device, and/or use-case specific optimizations such as backend delegation, user-defined compiler transformations, memory planning, and more. The first step in preparing a PyTorch model for execution on an edge device using ExecuTorch is to export the model. This is achieved through the use of a PyTorch API called [`torch.export`](https://pytorch.org/docs/stable/export.html).

## ExecuTorch Integration

An integration point is being developed to ensure that 🤗 Transformers can be exported using `torch.export`. The goal of this integration is not only to enable export but also to ensure that the exported artifact can be further lowered and optimized to run efficiently in `ExecuTorch`, particularly for mobile and edge use cases.

[[autodoc]] TorchExportableModuleWithStaticCache
    - forward

[[autodoc]] convert_and_export_with_cache
