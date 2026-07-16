# Video Generation Models

> Last verified: 2026-07-16. This is a manual snapshot. Video APIs and weights have model-specific duration, resolution, audio, editing, safety, pricing, and license constraints.

## Hosted APIs

### OpenAI Sora 2

The OpenAI Videos API and all listed Sora 2 IDs are deprecated and scheduled to shut down on **2026-09-24**.

| Exact API ID | Capability | Standard price |
| --- | --- | ---: |
| `sora-2`; snapshots `sora-2-2025-12-08`, `sora-2-2025-10-06` | Text or first-frame image input; video with synchronized audio; documented 8/16/20-second workflows | 720p $0.10/second |
| `sora-2-pro`; snapshot `sora-2-pro-2025-10-06` | Higher-resolution generation, reference/character assets, extension and editing | 720p $0.30/s; 1024-class $0.50/s; 1080p $0.70/s |

Do not adopt Sora 2 as a new long-term dependency without a migration plan.

Official sources: <https://developers.openai.com/api/docs/guides/video-generation>, <https://developers.openai.com/api/docs/models/sora-2>, <https://developers.openai.com/api/docs/models/sora-2-pro>, <https://developers.openai.com/api/docs/deprecations>.

### Google Veo And Gemini Omni

| Lifecycle | Exact API ID | Capability | Standard price |
| --- | --- | --- | ---: |
| Preview | `veo-3.1-generate-preview` | Text/image input; video with audio; one video/request | 720p/1080p with audio $0.40/second |
| Preview | `veo-3.1-fast-generate-preview` | Faster Veo 3.1 generation | 720p with audio $0.10/s; 1080p $0.12/s |
| Preview | `gemini-omni-flash-preview` | Interactions API conversational video generation/editing; 3-10s 720p/24 FPS | About $0.10/second video output at documented token rate |
| Shut down 2026-06-30 | `veo-3.0-generate-001` | Historical stable Veo 3 | Not callable |

Check the Veo page for exact aspect ratio, resolution, reference-image, duration, audio, and safety constraints. Preview IDs can change.

Official sources: <https://ai.google.dev/gemini-api/docs/veo>, <https://ai.google.dev/gemini-api/docs/models/veo-3.1-generate-preview>, <https://ai.google.dev/gemini-api/docs/pricing>, <https://ai.google.dev/gemini-api/docs/deprecations>.

## Current Open Weights

| Family / date | Exact official weight ID | Params / capability | Weight license | Lifecycle |
| --- | --- | --- | --- | --- |
| Wan 2.2 | `Wan-AI/Wan2.2-T2V-A14B`, `...-I2V-A14B` | 27B MoE total / 14B active per step; T2V/I2V | Apache-2.0 | Current Wan open mainline |
| Wan 2.2 TI2V | `Wan-AI/Wan2.2-TI2V-5B` | 5B dense text+image-to-video | Apache-2.0 | Current |
| Wan 2.2 specialized | `Wan2.2-S2V-14B`, `Wan2.2-Animate-14B` | Audio-driven video; character animation/replacement | Apache-2.0 | Current specialized branches |
| HunyuanVideo 1.5 | `tencent/HunyuanVideo-1.5` | 8.3B DiT; T2V/I2V, 480p/720p, separate SR weights | Tencent Hunyuan Community License | Current HunyuanVideo mainline |
| LTX-2.3 | `Lightricks/LTX-2.3` | 22B synchronized audio/video; T2V/I2V/V2V/A2V/editing | LTX-2 Community License | Current, replaces original ~19B LTX-2 |
| LongCat-Video | `meituan-longcat/LongCat-Video` | 13.6B dense; T2V/I2V/video continuation | MIT including weights | Current base generation model |
| LongCat Avatar 1.5 | `meituan-longcat/LongCat-Video-Avatar-1.5` | Audio-driven portrait branch | Check exact card | Specialized, not base replacement |

### Historical / Compatibility Weights

| Model | Status |
| --- | --- |
| `zai-org/CogVideoX1.5-5B`, `...-I2V` | Latest official CogVideoX1.5 cards but 2024-era; retain for compatibility, not current overall recommendation |
| `hpcai-tech/Open-Sora-v2` | 11B T2V/I2V research release, Apache-2.0; no newer official checkpoint confirmed after 2025-03 |
| Wan 2.1, original HunyuanVideo, original LTX-Video/LTX-2 | Superseded within their own families by the current rows above |

## Abbreviations

| Abbreviation | Meaning |
| --- | --- |
| T2V | Text-to-video |
| I2V | Image-to-video |
| TI2V | Text-and-image-to-video |
| V2V | Video-to-video |
| A2V / S2V | Audio/speech-to-video |
| FLF2V | First/last-frame-to-video |

## Deployment And License Notes

- Video VRAM depends on frames, duration, resolution, temporal tiling, precision, text/audio encoders, VAE, and offload. Preserve the exact official pipeline when quoting a minimum.
- Wan A14B active parameters describe per-step compute; full MoE weights still affect storage/residency.
- HunyuanVideo 1.5 uses a custom community license with regional and large-service conditions; it is not Apache-2.0.
- LTX-2.3 uses a revenue-threshold community license; it is not MIT.
- Hunyuan3D and SongGeneration are not video-generation model rows and were removed.

## Official Open-Weight Sources

- Wan 2.2: <https://github.com/Wan-Video/Wan2.2>, <https://huggingface.co/Wan-AI>
- HunyuanVideo 1.5: <https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5>, <https://huggingface.co/tencent/HunyuanVideo-1.5>
- LTX-2.3: <https://github.com/Lightricks/LTX-2>, <https://huggingface.co/Lightricks/LTX-2.3>
- LongCat Video: <https://github.com/meituan-longcat/LongCat-Video>, <https://huggingface.co/meituan-longcat/LongCat-Video>
- CogVideoX: <https://github.com/zai-org/CogVideo>
- Open-Sora: <https://github.com/hpcaitech/Open-Sora>, <https://huggingface.co/hpcai-tech/Open-Sora-v2>
