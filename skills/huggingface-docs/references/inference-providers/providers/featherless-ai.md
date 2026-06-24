

# Featherless AI

> [!TIP]
> All supported Featherless AI models can be found [here](https://huggingface.co/models?inference_provider=featherless-ai&sort=trending)

<div class="flex justify-center">
    <a href="https://featherless.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/featherless-ai" target="_blank">


    </a>
</div>

[Featherless AI](https://featherless.ai) is a serverless AI inference platform that offers access to thousands of open-source models.

Our goal is to make all AI models available for serverless inference. We provide inference via API to a continually expanding library of open-weight models.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"featherless-ai":{"modelId":"zai-org/GLM-5.2","providerModelId":"zai-org/GLM-5.2"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"featherless-ai":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"MiniMaxAI/MiniMax-M3"} } }
conversational />

### Text Generation

Find out more about Text Generation [here](../tasks/text-generation).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"featherless-ai":{"modelId":"zai-org/GLM-5.2","providerModelId":"zai-org/GLM-5.2"} } }
/>
