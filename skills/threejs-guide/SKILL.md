---
name: threejs-guide
description: >-
  Comprehensive Three.js development guide covering scene setup, cameras,
  renderer, geometry, materials, PBR, shaders, GLSL, textures, UV mapping,
  lighting, shadows, animation, skeletal animation, morph targets,
  post-processing, bloom, DOF, loaders, GLTF, interaction, raycasting,
  OrbitControls, 3D, WebGL. USE THIS SKILL WHEN the user asks about Three.js,
  3D web development, WebGL rendering, or any Three.js API topic.
---

# Three.js Guide

Comprehensive reference for Three.js 3D web development. Covers 10 core topics
with detailed code examples and best practices.

Source: [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills)

## Core Concepts

Three.js is a JavaScript library for creating 3D graphics in the browser using
WebGL. The fundamental pipeline: **Scene** (container) + **Camera** (viewpoint)
+ **Renderer** (draws to canvas). Objects are built from **Geometry** (shape) +
**Material** (appearance) = **Mesh**.

## Reference Index

| File | Topic | Description |
|------|-------|-------------|
| `references/fundamentals.md` | Fundamentals | Scene, cameras, renderer, Object3D, coordinate system, math utilities, cleanup patterns |
| `references/geometry.md` | Geometry | Built-in shapes, BufferGeometry, custom vertices, InstancedMesh, points, lines |
| `references/materials.md` | Materials | MeshBasicMaterial through MeshPhysicalMaterial, PBR, ShaderMaterial, material properties |
| `references/textures.md` | Textures | Texture loading, color space, wrapping, filtering, UV mapping, cube/HDR textures, render targets |
| `references/lighting.md` | Lighting | Light types (ambient, directional, point, spot, area), shadows, IBL, environment maps |
| `references/shaders.md` | Shaders | GLSL, ShaderMaterial, uniforms, varyings, vertex displacement, fresnel, noise, extending built-in materials |
| `references/animation.md` | Animation | Keyframe animation, AnimationMixer, skeletal animation, morph targets, blending, procedural motion |
| `references/postprocessing.md` | Post-Processing | EffectComposer, bloom, DOF, SSAO, FXAA/SMAA, custom ShaderPass, multi-pass rendering |
| `references/loaders.md` | Loaders | GLTF/GLB, Draco, KTX2, OBJ, FBX, texture loading, async patterns, caching |
| `references/interaction.md` | Interaction | Raycasting, OrbitControls, FlyControls, PointerLockControls, drag, selection, coordinate conversion |

## Usage

CRITICAL RULE: Before answering any Three.js question, MUST grep `references/`
for relevant keywords to find the most specific guidance. Do not rely on general
knowledge when detailed reference material is available.

```
# Example: user asks about bloom effect
grep -l "bloom" references/
# -> references/postprocessing.md
```

NEVER guess at Three.js API details. Always check the reference files for exact
constructor signatures, property names, and import paths.

## Quick Links by Task

- **Setting up a scene** -> fundamentals.md
- **Creating 3D shapes** -> geometry.md
- **Styling meshes / PBR** -> materials.md
- **Adding images to surfaces** -> textures.md
- **Adding lights / shadows** -> lighting.md
- **Custom visual effects** -> shaders.md
- **Moving things / playing animations** -> animation.md
- **Bloom, blur, screen effects** -> postprocessing.md
- **Loading models / assets** -> loaders.md
- **Click detection / camera controls** -> interaction.md
