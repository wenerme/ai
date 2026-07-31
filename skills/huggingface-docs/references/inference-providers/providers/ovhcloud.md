

# OVHcloud AI Endpoints

> [!TIP]
> All supported OVHcloud AI Endpoints models can be found [here](https://huggingface.co/models?inference_provider=ovhcloud&sort=trending)

<div class="flex justify-center">
    <a href="https://www.ovhcloud.com/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/ovhcloud" target="_blank">


    </a>
</div>

[OVHcloud AI Endpoints](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/) is a managed AI inference service that provides access to a wide range of state-of-the-art machine learning models. As part of OVHcloud's Public Cloud offering, AI Endpoints enables developers to easily integrate AI capabilities into their applications with data sovereignty, privacy, and GDPR compliance.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"ovhcloud":{"modelId":"openai/gpt-oss-120b","providerModelId":"gpt-oss-120b"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"ovhcloud":{"modelId":"Qwen/Qwen3.6-27B","providerModelId":"Qwen3.6-27B"} } }
conversational />
