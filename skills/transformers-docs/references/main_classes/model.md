

# Models

The base class [`PreTrainedModel`] implements the common methods for loading/saving a model either from a local
file or directory, or from a pretrained model configuration provided by the library (downloaded from HuggingFace's Hub).

[`PreTrainedModel`] also implements a few methods which are common among all the models to:

- resize the input token embeddings when new tokens are added to the vocabulary

The other methods that are common to each model are defined in [`~modeling_utils.ModuleUtilsMixin`] and [`~generation.GenerationMixin`].

## PreTrainedModel

[[autodoc]] PreTrainedModel
    - push_to_hub
    - all

Custom models should also include a `_supports_assign_param_buffer`, which determines if superfast init can apply
on the particular model. Signs that your model needs this are if `test_save_and_load_from_pretrained` fails. If so,
set this to `False`.

## ModuleUtilsMixin

[[autodoc]] modeling_utils.ModuleUtilsMixin

## Pushing to the Hub

[[autodoc]] utils.PushToHubMixin
