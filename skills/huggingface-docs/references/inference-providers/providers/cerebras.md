

# Cerebras

> [!TIP]
> All supported Cerebras models can be found [here](https://huggingface.co/models?inference_provider=cerebras&sort=trending)

<div class="flex justify-center">
    <a href="https://www.cerebras.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/cerebras" target="_blank">


    </a>
</div>

Cerebras stands alone as the world’s fastest AI inference and training platform. Organizations across fields like medical research, cryptography, energy, and agentic AI use our CS-2 and CS-3 systems to build on-premise supercomputers, while developers and enterprises everywhere can access the power of Cerebras through our pay-as-you-go cloud offerings.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"cerebras":{"modelId":"openai/gpt-oss-120b","providerModelId":"gpt-oss-120b"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cerebras":{"modelId":"google/gemma-4-31B-it","providerModelId":"gemma-4-31b"} } }
conversational />
