---
name: threejs-docs
description: "Three.js API reference documentation — 769 class/module docs covering Scene, Camera (Perspective/Orthographic/Array), Renderer (WebGLRenderer, WebGPURenderer), Mesh, BufferGeometry, Materials (MeshStandardMaterial, ShaderMaterial, NodeMaterial), Lights, Shadows, Animation (AnimationMixer, AnimationClip, AnimationAction), Loaders (GLTFLoader, DRACOLoader, TextureLoader), Controls (OrbitControls, MapControls, FlyControls), Math (Vector2/3/4, Matrix3/4, Quaternion, Euler, Box3, Ray, Frustum), Helpers, Audio, Raycaster, postprocessing passes, and TSL shader nodes. USE THIS SKILL WHEN the user asks about Three.js class API, constructor parameters, methods, properties, or inheritance."
version: 0.1.0
---

# Three.js API Documentation

Official API reference for [Three.js](https://threejs.org) — the most popular JavaScript 3D library (WebGL/WebGPU).

CRITICAL: grep `references/` for the class name before answering. Files are named by class (e.g., `PerspectiveCamera.md`, `MeshStandardMaterial.md`).

## Reference Index (769 docs)

Each file documents one Three.js class with inheritance chain, constructor, properties, and methods.

### Core
`Scene` `Object3D` `Raycaster` `Clock` `EventDispatcher` `BufferGeometry` `BufferAttribute` `InterleavedBufferAttribute`

### Cameras
`PerspectiveCamera` `OrthographicCamera` `ArrayCamera` `CubeCamera` `StereoCamera`

### Renderers
`WebGLRenderer` `WebGPURenderer` `WebGLRenderTarget` `WebGLCubeRenderTarget`

### Geometries
`BoxGeometry` `SphereGeometry` `PlaneGeometry` `CylinderGeometry` `TorusGeometry` `TorusKnotGeometry` `CircleGeometry` `RingGeometry` `CapsuleGeometry` `ExtrudeGeometry` `LatheGeometry` `ShapeGeometry` `TubeGeometry` `EdgesGeometry` `WireframeGeometry`

### Materials
`MeshBasicMaterial` `MeshStandardMaterial` `MeshPhysicalMaterial` `MeshPhongMaterial` `MeshLambertMaterial` `MeshToonMaterial` `MeshNormalMaterial` `MeshDepthMaterial` `ShaderMaterial` `RawShaderMaterial` `PointsMaterial` `SpriteMaterial` `LineBasicMaterial` `LineDashedMaterial`

### Lights & Shadows
`AmbientLight` `DirectionalLight` `PointLight` `SpotLight` `HemisphereLight` `RectAreaLight` `LightProbe` `DirectionalLightShadow` `PointLightShadow` `SpotLightShadow`

### Animation
`AnimationMixer` `AnimationClip` `AnimationAction` `AnimationObjectGroup` `AnimationUtils` `KeyframeTrack` `PropertyBinding` `PropertyMixer`

### Loaders
`GLTFLoader` `DRACOLoader` `KTX2Loader` `OBJLoader` `FBXLoader` `PLYLoader` `STLLoader` `ColladaLoader` `TextureLoader` `CubeTextureLoader` `ImageLoader` `FileLoader` `LoadingManager`

### Controls
`OrbitControls` `MapControls` `TrackballControls` `FlyControls` `FirstPersonControls` `PointerLockControls` `ArcballControls` `TransformControls` `DragControls`

### Math
`Vector2` `Vector3` `Vector4` `Matrix3` `Matrix4` `Quaternion` `Euler` `Color` `Box2` `Box3` `Sphere` `Ray` `Plane` `Frustum` `Triangle` `MathUtils` `Interpolant` `SphericalHarmonics3`

### Helpers
`AxesHelper` `BoxHelper` `GridHelper` `ArrowHelper` `CameraHelper` `DirectionalLightHelper` `PointLightHelper` `SpotLightHelper` `SkeletonHelper`

### Postprocessing
`EffectComposer` `RenderPass` `UnrealBloomPass` `SSAOPass` `SMAAPass` `OutlinePass` `AfterimagePass` `BokehPass` `FilmPass` `GlitchPass`

### TSL Shader Nodes
`ShaderNode` `NodeMaterial` `MeshStandardNodeMaterial` — plus 100+ node types for the Three.js Shading Language
