# Video Generation Models

## Model Timeline

| Date    | Model                  | Size       | Creator       | License      | Notes                               |
| ------- | ---------------------- | ---------- | ------------- | ------------ | ----------------------------------- |
| 2026-01 | LTX-2                 | 19B        | Lightricks    | MIT          | T2V, I2V, V2V                      |
| 2025-11 | HunyuanVideo-1.5      |            | Tencent       | Apache-2.0   | T2V, I2V                           |
| 2025-10 | LongCat-Video         |            | Meituan       | MIT          | T2V, I2V, Video continuation       |
| 2025-07 | Wan2.2 T2V-A14B       | 14B        | Alibaba       | Apache-2.0   | T2V, MoE                           |
| 2025-07 | Wan2.2 TI2V-5B        | 5B         | Alibaba       | Apache-2.0   | I2V, Fast                           |
| 2025-07 | Wan2.2 (full)         |            | Alibaba       | Apache-2.0   | + FLF2V, VACE, Reasoning           |
| 2025-03 | HunyuanVideo-I2V      |            | Tencent       |              | I2V, 720P, vRAM 60-80GB            |
| 2025-02 | Wan2.1                | 1.3B, 14B  | Alibaba       | Apache-2.0   | T2V, 480P, 720P                    |
| 2025-03 | Open-Sora-v2          |            | hpcai-tech    | Apache-2.0   | T2V                                |
| 2024-12 | HunyuanVideo          |            | Tencent       |              | T2V                                |
| 2024-11 | LTX-Video             | 2B, 13B   | Lightricks    |              | T2V                                |
| 2024-08 | CogVideoX             | 2B, 5B    | ZhipuAI       | Apache-2.0   | T2V                                |

## Wan Family (Alibaba)

Wan 2.2 models:
- **T2V-A14B**: Text-to-video, MoE 27B total / 14B active
- **TI2V-5B**: Image-to-video, 5B, fast generation
- **I2V-14B**: Image-to-video, 720P/480P variants
- **FLF2V-14B**: First-Last-Frame to Video (generate transitions)
- **VACE-14B**: Video Animation, Composition, and Editing
- **Reasoning**: Text-based video reasoning

GitHub: [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1)

### VACE (Video Animation, Composition, and Editing)

- All-in-one video processing framework
- Capabilities: R2V, MV2V, V2V
- Available for both Wan2.1 and LTX-Video
- GitHub: [ali-vilab/VACE](https://github.com/ali-vilab/VACE)

## HunyuanVideo (Tencent / 混元)

- T2V and I2V capabilities
- HunyuanVideo-Avatar: Image-to-Video (5s, 129 frames)
- I2V: 720P, requires 60-80GB vRAM
- Hunyuan3D-2: 3D generation (2025-01)
- SongGeneration: Music generation

GitHub: [Tencent-Hunyuan](https://github.com/Tencent-Hunyuan)

## Abbreviations

| Abbr. | Full                                      |
| ----- | ----------------------------------------- |
| T2V   | Text-to-Video                             |
| I2V   | Image-to-Video                            |
| V2V   | Video-to-Video                            |
| R2V   | Reference-to-Video                        |
| MV2V  | Masked Video-to-Video                     |
| FLF2V | First-Last-Frame-to-Video                 |
| VACE  | Video Animation, Composition, and Editing |

## References

- [Wan-AI on HuggingFace](https://huggingface.co/Wan-AI)
- [tencent on HuggingFace](https://huggingface.co/tencent)
- [Lightricks on HuggingFace](https://huggingface.co/Lightricks)
