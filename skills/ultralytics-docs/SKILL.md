---
name: ultralytics-docs
description: "Use when working with Ultralytics YOLO, including YOLO26/YOLO11/YOLOv8 models, detect/segment/classify/pose/OBB tasks, train/val/predict/export/track/benchmark modes, dataset YAML formats, HUB/platform workflows, integrations, solutions, or ultralytics Python API behavior."
---

# Ultralytics Docs

Official Ultralytics YOLO docs synced from [`ultralytics/ultralytics/docs`](https://github.com/ultralytics/ultralytics/tree/main/docs).

Use this skill for Ultralytics YOLO models, tasks, modes, datasets, Python API, integrations, HUB/platform docs, solutions, deployment/export formats, and YOLOv5 legacy docs.

## Directory Optimization

The upstream docs tree contains English content in `docs/en/`, reusable MkDocs/Jinja snippets in `docs/macros/`, and theme/static overrides under `docs/overrides/`. This skill intentionally syncs:

- `docs/en/**` to `references/**` without the `en/` prefix.
- `docs/macros/**` to `references/macros/**` because it contains shared argument tables used by train/predict/export/track/solution pages.
- No `docs/overrides/**`, static assets, or local-build documentation noise.

## Hard Rules

- MUST search `references/` before giving version-sensitive Ultralytics YOLO model, CLI, Python API, dataset format, training, validation, prediction, export, tracking, or HUB/platform guidance.
- MUST distinguish Ultralytics package behavior from generic PyTorch, OpenCV, ONNX Runtime, TensorRT, or Hugging Face guidance.
- MUST call out model family and task scope when relevant: YOLO26, YOLO11, YOLOv8, YOLOv5, SAM/FastSAM, RT-DETR, YOLO-World, detect, segment, classify, pose, OBB, or track.
- NEVER invent mode arguments, dataset YAML keys, export formats, model filenames, result object attributes, or API signatures without checking references.

## Fast Lookup

```bash
rg -n "YOLO26|YOLO11|YOLOv8|YOLOv5|RT-DETR|SAM|FastSAM|YOLO-World" skills/ultralytics-docs/references
rg -n "train|predict|val|export|track|benchmark|Results|Boxes|Masks|Keypoints|OBB" skills/ultralytics-docs/references
rg -n "dataset.yaml|data.yaml|names:|nc:|detect|segment|classify|pose|obb" skills/ultralytics-docs/references
rg -n "ONNX|TensorRT|OpenVINO|CoreML|TFLite|Edge TPU|HUB|Platform" skills/ultralytics-docs/references
```

## Reference Map

- `references/quickstart.md` — installation and first-use entry point.
- `references/models/` — model families including YOLO26, YOLO11, YOLOv8, YOLOv5, SAM/FastSAM, RT-DETR, YOLO-World.
- `references/tasks/` — task guides for detection, segmentation, classification, pose, OBB, and tracking.
- `references/modes/` — train, predict, validate, export, track, benchmark, and tuning modes.
- `references/datasets/` — dataset format and dataset-specific YAML guidance.
- `references/reference/` — Python API reference stubs for `ultralytics` package modules.
- `references/macros/` — shared argument tables and performance tables included by upstream docs.

## Workflow

1. Identify whether the question is model selection, task/data format, mode arguments, Python API, export/deployment, HUB/platform, integration, or solution workflow.
2. Search the relevant subtree and `references/macros/` for argument tables.
3. Prefer exact documented argument names, model filenames, dataset YAML fields, result attributes, and export backend limitations.
4. Route generic deep learning, PyTorch runtime, CUDA, ONNX Runtime, TensorRT, or OpenCV questions to more specific docs when Ultralytics docs are not the source of truth.
