

# Cohere

> [!TIP]
> All supported Cohere models can be found [here](https://huggingface.co/models?inference_provider=cohere&sort=trending)

<div class="flex justify-center">
    <a href="https://cohere.com/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/CohereLabs" target="_blank">


    </a>
</div>

Cohere brings you cutting-edge multilingual models, advanced retrieval, and an AI workspace tailored for the modern enterprise — all within a single, secure platform.

Cohere is the first model creator to share and serve their models directly on the Hub as an Inference Provider.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"cohere":{"modelId":"CohereLabs/tiny-aya-global","providerModelId":"tiny-aya-global"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cohere":{"modelId":"CohereLabs/aya-vision-32b","providerModelId":"c4ai-aya-vision-32b"} } }
conversational />
