

# Novita

> [!TIP]
> All supported Novita models can be found [here](https://huggingface.co/models?inference_provider=novita&sort=trending)

<div class="flex justify-center">
    <a href="https://novita.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/novita" target="_blank">


    </a>
</div>

[Novita](https://novita.ai) is the go-to inference platform for AI developers seeking a low-cost, reliable, and simple solution for shipping AI models.

Offering 200+ APIs (LLMs, image, video, audio) with fully managed deployment — enterprise-grade, scalable, and maintenance-free.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"novita":{"modelId":"deepseek-ai/DeepSeek-V4-Flash-0731","providerModelId":"deepseek/deepseek-v4-flash-0731"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"novita":{"modelId":"zai-org/GLM-5.3-Flash","providerModelId":"zai-org/glm-5.3-flash"} } }
conversational />
