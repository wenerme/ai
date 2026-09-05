

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
    providersMapping={ {"featherless-ai":{"modelId":"OBLITERATUS/Qwen3.8-27B-OBLITERATED","providerModelId":"OBLITERATUS/Qwen3.8-27B-OBLITERATED"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"featherless-ai":{"modelId":"Qwen/Qwen3.8-27B","providerModelId":"Qwen/Qwen3.8-27B"} } }
conversational />
