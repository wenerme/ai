

# Fireworks AI

> [!TIP]
> All supported Fireworks AI models can be found [here](https://huggingface.co/models?inference_provider=fireworks-ai&sort=trending)

<div class="flex justify-center">
    <a href="https://fireworks.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/fireworks-ai" target="_blank">


    </a>
</div>

Fireworks AI is a developer-centric platform that delivers high-performance generative AI solutions, enabling efficient deployment and fine-tuning of large language models (LLMs) and image models.
## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"fireworks-ai":{"modelId":"deepseek-ai/DeepSeek-V4-Pro","providerModelId":"accounts/fireworks/models/deepseek-v4-pro"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"fireworks-ai":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"accounts/fireworks/models/minimax-m3"} } }
conversational />
