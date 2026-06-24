

# Scaleway

> [!TIP]
> All supported Scaleway models can be found [here](https://huggingface.co/models?inference_provider=scaleway&sort=trending)

<div class="flex justify-center">
    <a href="https://www.scaleway.com" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/scaleway" target="_blank">


    </a>
</div>

Scaleway is a European cloud provider, serving latest LLM models through its [Generative APIs](https://www.scaleway.com/en/generative-apis/) alongside a complete cloud ecosystem.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"scaleway":{"modelId":"meta-llama/Llama-3.1-8B-Instruct","providerModelId":"llama-3.1-8b-instruct"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"scaleway":{"modelId":"Qwen/Qwen3.5-397B-A17B","providerModelId":"qwen3.5-397b-a17b"} } }
conversational />

### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature-extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"scaleway":{"modelId":"Qwen/Qwen3-Embedding-8B","providerModelId":"qwen3-embedding-8b"} } }
/>
