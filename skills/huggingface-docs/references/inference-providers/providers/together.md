

# Together

> [!TIP]
> All supported Together models can be found [here](https://huggingface.co/models?inference_provider=together&sort=trending)

<div class="flex justify-center">
    <a href="https://together.xyz/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/togethercomputer" target="_blank">


    </a>
</div>

Together decentralized cloud services empower developers and researchers at organizations of all sizes to train, fine-tune, and deploy generative AI models.

## Supported tasks

### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"together":{"modelId":"nvidia/nemotron-3.5-asr-streaming-0.6b","providerModelId":"nvidia/nemotron-3.5-asr-streaming-0.6b"} } }
/>

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"together":{"modelId":"zai-org/GLM-5.3","providerModelId":"zai-org/GLM-5.3"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"together":{"modelId":"deepseek-ai/DeepSeek-V4.1-Flash-1017","providerModelId":"deepseek-ai/DeepSeek-V4.1-Flash-1017"} } }
conversational />
