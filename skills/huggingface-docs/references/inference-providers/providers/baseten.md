

# Baseten

> [!TIP]
> All supported Baseten models can be found [here](https://huggingface.co/models?inference_provider=baseten&sort=trending)

<div class="flex justify-center">
    <a href="https://www.baseten.co/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/baseten" target="_blank">


    </a>
</div>

Baseten provides on-demand frontier model APIs designed for production applications, not just experimentation. Built on the Baseten Inference Stack, these APIs deliver enterprise-grade performance and reliability with optimized inference for leading open-source models.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"baseten":{"modelId":"zai-org/GLM-5.2","providerModelId":"zai-org/GLM-5.2"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"baseten":{"modelId":"moonshotai/Kimi-K3","providerModelId":"moonshotai/Kimi-K3"} } }
conversational />
