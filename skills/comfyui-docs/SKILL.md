---
name: comfyui-docs
description: "ComfyUI documentation — node-based Stable Diffusion GUI and workflow engine. Covers 67 built-in nodes (CheckpointLoader, KSampler, CLIPTextEncode, VAEDecode, ControlNet, LoRA, IPAdapter, etc), custom node development (Python API, data types, UI widgets, backend extension), workflow tutorials (text-to-image, image-to-image, inpainting, ControlNet, LoRA, SDXL, Flux, upscaling, video, audio, 3D), ComfyUI Manager, Registry (publishing/versioning nodes), Comfy CLI, API reference, cloud deployment, installation (Desktop/manual/Docker), interface guide, and troubleshooting. USE THIS SKILL WHEN the user asks about ComfyUI nodes, workflows, custom node development, ComfyUI API, or Stable Diffusion pipeline configuration."
version: 0.1.0
---

# ComfyUI Documentation

Official docs for [ComfyUI](https://github.com/comfyanonymous/ComfyUI) — the most powerful and modular Stable Diffusion GUI and backend.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (317 docs)

### Built-in Nodes (67 docs)
- `references/built-in-nodes/` — Every built-in node with inputs, outputs, parameters:
  - **Loaders**: CheckpointLoaderSimple, ClipLoader, ClipSave, LoraLoader, VAELoader, UNETLoader, ControlNetLoader, StyleModelLoader
  - **Conditioning**: ClipTextEncode, ClipTextEncodeFlux, ConditioningCombine, ConditioningSetArea, ConditioningSetMask, GLIGEN
  - **Sampling**: KSampler, KSamplerAdvanced, BasicScheduler, KarrasScheduler, SamplerCustom
  - **Latent**: EmptyLatentImage, LatentUpscale, LatentComposite, LatentBlend, LatentCrop
  - **Image**: LoadImage, SaveImage, PreviewImage, ImageScale, ImageInvert, ImageBatch, ImagePadForOutpaint
  - **Mask**: MaskComposite, SetLatentNoiseMask, ImageToMask
  - **ControlNet**: Canny, ControlNetApply, ControlNetApplyAdvanced
  - **Video/Audio**: LoadVideo, SaveVideo, LoadAudio, SaveAudio
  - **Advanced**: ModelMerge, DifferentialDiffusion, FluxGuidance, InstructPixToPixConditioning

### Tutorials (96 docs)
- `references/tutorials/` — Step-by-step workflow guides:
  - Basic: text-to-image, image-to-image, inpainting, outpainting
  - ControlNet, LoRA, IPAdapter, style transfer
  - SDXL, Flux, SD3 workflows
  - Upscaling, video generation, audio, 3D
  - API usage, batch processing

### Custom Node Development (36 docs)
- `references/custom-nodes/` — Build your own nodes:
  - Python node API, data types, UI widgets
  - Backend extension, lifecycle hooks
  - Testing, debugging, best practices

### Registry (31 docs)
- `references/registry/` — Publish and manage custom nodes:
  - Publishing, versioning, CI/CD integration
  - Node standards, review process

### Interface (20 docs)
- `references/interface/` — ComfyUI UI guide, keyboard shortcuts, settings

### Development (16 docs)
- `references/development/` — Core development docs, architecture, contributing

### Installation (8 docs)
- `references/installation/` — Desktop app, manual install, Docker, GPU setup

### Manager (6 docs)
- `references/manager/` — ComfyUI Manager (node marketplace)

### CLI (3 docs)
- `references/comfy-cli/` — Comfy CLI reference

### API Reference
- `references/api-reference/` — REST API documentation

### Other
- `references/specs/` — Technical specifications
- `references/support/` — FAQ, troubleshooting
- `references/cloud/` — Cloud deployment
- `references/account/` — Account management
