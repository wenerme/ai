

# Processors

## Multi-modal processors

Any multi-modal model will require an object to encode or decode the data that groups several modalities (among text,
vision and audio). This is handled by objects called processors, which group together two or more processing objects
such as tokenizers (for the text modality), image processors (for vision) and feature extractors (for audio).

Those processors inherit from the following base class that implements the saving and loading functionality:

[[autodoc]] ProcessorMixin
    - __call__
    - prepare_inputs_layout
    - validate_inputs
    - get_text_with_replacements
    - create_mm_token_type_ids
    - apply_chat_template

### Processing kwargs

Processor `__call__` methods accept keyword arguments organized by modality. The following TypedDict classes define
the available keyword arguments for each modality. Model-specific processors may subclass these to add or override
fields.

[[autodoc]] ProcessingKwargs

[[autodoc]] TextKwargs

[[autodoc]] ImagesKwargs

[[autodoc]] VideosKwargs

[[autodoc]] AudioKwargs
