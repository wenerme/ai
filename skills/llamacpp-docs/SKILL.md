---
name: llamacpp-docs
description: "Use when working with llama.cpp: building from source, installation, GGUF model loading, quantization, speculative decoding, function calling, multimodal models (LLaVA, Gemma3, MiniCPM), GPU backends (CUDA, Metal, Vulkan, SYCL, OpenCL, CANN), Android deployment, Docker setup, performance tuning, or adding new model architectures to llama.cpp."
---

# llama.cpp Documentation

Official llama.cpp docs (sourced from [github.com/ggml-org/llama.cpp/docs](https://github.com/ggml-org/llama.cpp/tree/master/docs)).

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Build & Install
- `build.md` — Building from source (CMake)
- `install.md` — Installation guide
- `docker.md` — Docker setup
- `android.md` — Android deployment
- `build-riscv64-spacemit.md` — RISC-V 64-bit build
- `build-s390x.md` — s390x architecture build

### Features
- `function-calling.md` — Function calling / tool use
- `speculative.md` — Speculative decoding
- `multimodal.md` — Multimodal model support (overview)
- `preset.md` — Preset configurations
- `llguidance.md` — LLGuidance grammar integration
- `autoparser.md` — Auto-parser for structured output
- `ops.md` — Supported operations reference

### GPU Backends
- `backend/CUDA-FEDORA.md` — CUDA on Fedora
- `backend/SYCL.md` — Intel SYCL backend
- `backend/OPENCL.md` — OpenCL backend
- `backend/BLIS.md` — BLIS backend
- `backend/CANN.md` — Huawei Ascend CANN backend
- `backend/VirtGPU.md` — Virtual GPU backend
- `backend/VirtGPU/` — VirtGPU configuration & development
- `backend/ZenDNN.md` — AMD ZenDNN backend
- `backend/zDNN.md` — IBM zDNN backend
- `backend/snapdragon/` — Qualcomm Snapdragon NPU

### Multimodal Models
- `multimodal/llava.md` — LLaVA vision-language model
- `multimodal/gemma3.md` — Gemma 3 multimodal
- `multimodal/glmedge.md` — GLM Edge model
- `multimodal/granitevision.md` — Granite Vision
- `multimodal/MobileVLM.md` — Mobile VLM
- `multimodal/minicpm*.md` — MiniCPM series (v2.5, v2.6, v4.0, v4.5, o2.6, o4.0)

### Development
- `development/HOWTO-add-model.md` — Adding new model architectures
- `development/token_generation_performance_tips.md` — Performance optimization
- `development/debugging-tests.md` — Debugging tests
- `development/parsing.md` — Parsing internals
