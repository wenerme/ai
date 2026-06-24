---
name: pytorch-docs
description: "Use when working with PyTorch APIs, tensors, autograd, torch.nn, torch.optim, torch.compile, export, distributed/RPC, CUDA/MPS/XPU backends, profiling, quantization, ONNX export, C++/LibTorch, or PyTorch runtime/debugging behavior."
---

# PyTorch Docs

Official PyTorch docs synced from [`pytorch/pytorch/docs`](https://github.com/pytorch/pytorch/tree/main/docs).

Use this skill for PyTorch framework APIs, tensor semantics, autograd, neural network modules, compilation/export, distributed training, device backends, profiling/debugging, quantization, ONNX, and LibTorch/C++ docs.

## Hard Rules

- MUST search `references/` before giving version-sensitive PyTorch API, runtime behavior, environment variable, backend, distributed, compile/export, or C++/LibTorch guidance.
- MUST distinguish core PyTorch framework APIs from adjacent libraries such as TorchVision, TorchAudio, TorchText, Lightning, Hugging Face Transformers, or ComfyUI.
- MUST call out backend scope when relevant: CPU, CUDA, ROCm/HIP, MPS, XPU, distributed, or C++.
- NEVER invent `torch.*` API names, environment variables, dispatch behavior, compile/export limitations, or distributed configuration without checking references.

## Fast Lookup

```bash
rg -n "torch\.compile|torch.export|dynamo|inductor|AOT|graph break" skills/pytorch-docs/references
rg -n "autograd|tensor|nn\.Module|optimizer|DataLoader|distributed|RPC" skills/pytorch-docs/references
rg -n "CUDA|ROCm|HIP|MPS|XPU|environment variable|memory|profil" skills/pytorch-docs/references
rg -n "LibTorch|C\+\+|cpp|ONNX|quantization" skills/pytorch-docs/references
```

## Reference Map

- `references/source/` — main Python PyTorch docs and notes: tensors, autograd, modules, optimizers, distributed, compile/export, profiling, backend/runtime behavior.
- `references/source/notes/` — deeper technical notes and backend/runtime caveats.
- `references/source/user_guide/` — user guides for compilation, export, distributed, and runtime workflows.
- `references/cpp/` and `references/libtorch.rst` — C++/LibTorch API docs.

## Workflow

1. Identify whether the question is Python API, runtime/backend behavior, compile/export, distributed, quantization/ONNX, or C++/LibTorch.
2. Search the matching reference subtree with targeted `rg` terms.
3. Prefer documented API names, environment variables, warnings, and backend-specific limitations.
4. Route non-core ecosystem questions to more specific docs when PyTorch docs are not the source of truth.
