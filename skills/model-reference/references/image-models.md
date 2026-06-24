# Image Generation Models

## Model Timeline

| Date    | Model                | Size                              | Creator           | License         | Notes                              |
| ------- | -------------------- | --------------------------------- | ----------------- | --------------- | ---------------------------------- |
| 2026-01 | GLM-Image            | 9B+7B (AR+Diffusion)              | Z.ai              | MIT             | Hybrid AR+Diffusion, T2I, I2I      |
| 2025-12 | Qwen-Image-Edit-2511 |                                   | Alibaba           |                 | Image editing enhanced             |
| 2025-11 | FLUX.2 dev           | 32B                               | Black Forest Labs | Apache-2.0      | klein/pro (commercial)             |
| 2025-11 | Z-Image-Turbo        |                                   | Tongyi-MAI        |                 | Fast T2I                           |
| 2025-08 | Qwen-Image           | 20B                               | Alibaba           | Apache-2.0      | MMDiT, T2I, Editing, Text          |
| 2025-07 | HiDream-E1-1         |                                   |                   |                 | Editing                            |
| 2025-06 | OmniGen2             | 7B                                | VectorSpaceLab    |                 | T2I, Editing, Composing            |
| 2025-05 | FLUX.1 Kontext       | dev 12B                           | Black Forest Labs |                 | In-context editing                 |
| 2025-04 | HiDream-I1           | 17B                               |                   |                 | Fast 16/Dev 28/Full 50 steps       |
| 2025-01 | Lumina-Image 2.0     | 2B                                | OpenGVLab         | Apache-2.0      |                                    |
| 2024-10 | SD 3.5               | turbo, large, medium, 2.5B, 8B   | Stability AI      |                 |                                    |
| 2024-08 | FLUX.1               | dev/schnell 12B                   | Black Forest Labs |                 | Transformer-based (not UNet)       |
| 2024-02 | SD 3.0               | 800M, 8B                          | Stability AI      |                 |                                    |

## FLUX Family

| Model              | Size   | VRAM     | Notes                |
| ------------------ | ------ | -------- | -------------------- |
| flux1-schnell      | 23.8GB | 16GB+    | Fast, Apache-2.0     |
| flux1-dev          | 23.8GB | 16GB+    | Quality              |
| FLUX.1 Dev FP8     | 17.2GB | 8GB+     | Quantized            |
| FLUX.1 Kontext dev | 12B    |          | In-context editing   |
| FLUX.2 dev         | 32B    |          | Apache-2.0           |

Companion files:
- `clip_l.safetensors`: 246 MB
- `t5xxl_fp8_e4m3fn.safetensors`: 4.89 GB (lower memory, 8-12GB)
- `t5xxl_fp16.safetensors`: 9.79 GB (better results, 32GB+)
- `ae.safetensors`: 335 MB

Known issues:
- FLUX.1-dev: Chin generation issues ("flux chin")
- FLUX.1-Krea-dev: Finger generation issues, but better faces/skin

## Stable Diffusion Family

| Version   | Date    | Size        | Notes                  |
| --------- | ------- | ----------- | ---------------------- |
| SD 3.5    | 2024-10 | 2.5B, 8B   | Turbo/Large/Medium     |
| SD 3.0    | 2024-02 | 800M, 8B   |                        |
| SDXL 1.0  | 2023-07 | 3.5B        |                        |
| SDXL Turbo | 2023-11 |            | Fast                   |
| SD 2.1    | 2022-12 |             |                        |
| SD 1.5    | 2022-10 | 983M        | RunwayML, huge ecosystem |

## Qwen-Image

- 20B parameters, Apache-2.0
- MMDiT architecture
- T2I, Image editing, Text rendering
- HF: [Qwen/Qwen-Image](https://huggingface.co/Qwen/Qwen-Image)

## GLM-Image

- Hybrid AR + Diffusion architecture (9B AR + 7B Diffusion)
- MIT license
- T2I, I2I, Text rendering
- HF: [zai-org/GLM-Image](https://huggingface.co/zai-org/GLM-Image)

## References

- FLUX: https://comfyui-wiki.com/en/tutorial/advanced/flux1-comfyui-guide-workflow-and-examples
- SD models: https://huggingface.co/stabilityai
