

# PEFT

The [`~integrations.PeftAdapterMixin`] provides functions from the [PEFT](https://huggingface.co/docs/peft/index) library for managing adapters with Transformers. This mixin currently supports LoRA, IA3, and AdaLora. Prefix tuning methods (prompt tuning, prompt learning) aren't supported because they can't be injected into a torch module.

[[autodoc]] integrations.PeftAdapterMixin
    - load_adapter
    - add_adapter
    - set_adapter
    - disable_adapters
    - enable_adapters
    - active_adapters
    - get_adapter_state_dict
