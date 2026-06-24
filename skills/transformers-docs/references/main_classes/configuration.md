

# Configuration

The base class [`PreTrainedConfig`] implements the common methods for loading/saving a configuration
either from a local file or directory, or from a pretrained model configuration provided by the library (downloaded
from HuggingFace's AWS S3 repository).

Each derived config class implements model specific attributes. Common attributes present in all config classes are:
`hidden_size`, `num_attention_heads`, and `num_hidden_layers`. Text models further implement:
`vocab_size`.

## PreTrainedConfig

[[autodoc]] PreTrainedConfig
    - push_to_hub
    - all
