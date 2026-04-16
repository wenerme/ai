

# Add vision processing components

Adding a vision model requires two image processor classes on top of the standard [modular](./modular_transformers) approach.

> [!NOTE]
> For the modeling and config steps, follow the [modular](./modular_transformers) guide first.

- [torchvision](https://docs.pytorch.org/vision/stable/index.html) backend is the default and supports GPU acceleration.
- [PIL](https://pillow.readthedocs.io/en/stable/index.html) backend is a fallback when no GPU is available.

Both classes share the same preprocessing logic but have different backends. Their constructor signatures and default values must be identical. [`AutoImageProcessor.from_pretrained()`] selects the backend at load time and falls back to PIL when torchvision isn't available. Mismatched signatures cause the same saved config to behave differently across environments.

## torchvision

Create `image_processing_<model_name>.py` with a class that inherits from [`TorchvisionBackend`]. Define a kwargs class first if your processor needs custom parameters beyond the standard [`ImagesKwargs`].

```py
from ...image_processing_backends import TorchvisionBackend
from ...image_utils import OPENAI_CLIP_MEAN, OPENAI_CLIP_STD, PILImageResampling
from ...processing_utils import ImagesKwargs, Unpack
from ...utils import auto_docstring

class MyModelImageProcessorKwargs(ImagesKwargs, total=False):
    tile_size: int  # any model-specific kwargs

@auto_docstring
class MyModelImageProcessor(TorchvisionBackend):
    resample = PILImageResampling.BICUBIC
    image_mean = OPENAI_CLIP_MEAN
    image_std = OPENAI_CLIP_STD
    size = {"shortest_edge": 224}
    do_resize = True
    do_rescale = True
    do_normalize = True
    do_convert_rgb = True

    def __init__(self, **kwargs: Unpack[MyModelImageProcessorKwargs]):
        super().__init__(**kwargs)
```

## PIL

Create `image_processing_pil_<model_name>.py` with a class that inherits from [`PilBackend`]. Duplicate the kwargs class here instead of importing it from the torchvision file because it can fail when torchvision isn't installed. Add an `# Adapted from` comment so the two stay in sync. For processors with no custom parameters, use [`ImagesKwargs`] directly.

```py
from ...image_processing_backends import PilBackend
from ...image_utils import OPENAI_CLIP_MEAN, OPENAI_CLIP_STD, PILImageResampling
from ...processing_utils import ImagesKwargs, Unpack
from ...utils import auto_docstring

# Adapted from transformers.models.my_model.image_processing_my_model.MyModelImageProcessorKwargs
class MyModelImageProcessorKwargs(ImagesKwargs, total=False):
    tile_size: int  # any model-specific kwargs

@auto_docstring
class MyModelImageProcessorPil(PilBackend):
    resample = PILImageResampling.BICUBIC
    image_mean = OPENAI_CLIP_MEAN
    image_std = OPENAI_CLIP_STD
    size = {"shortest_edge": 224}
    do_resize = True
    do_rescale = True
    do_normalize = True
    do_convert_rgb = True

    def __init__(self, **kwargs: Unpack[MyModelImageProcessorKwargs]):
        super().__init__(**kwargs)
```

> [!TIP]
> See [`CLIPImageProcessor`]/[`CLIPImageProcessorPil`] and [`LlavaOnevisionImageProcessor`]/[`LlavaOnevisionImageProcessorPil`] for reference.

## Next steps

- Read the [Auto-generating docstrings](./auto_docstring) guide to auto-generate consistent docstrings with `@auto_docstring`.
- Read the [Writing model tests](./testing) guide to write integration tests for your model.
