

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
    providersMapping={ {"together":{"modelId":"openai/whisper-large-v3","providerModelId":"openai/whisper-large-v3"} } }
/>

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"together":{"modelId":"deepseek-ai/DeepSeek-V4-Flash-0731","providerModelId":"deepseek-ai/DeepSeek-V4-Flash-0731"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"together":{"modelId":"moonshotai/Kimi-K3","providerModelId":"moonshotai/Kimi-K3"} } }
conversational />

### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature-extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"together":{"modelId":"intfloat/multilingual-e5-large-instruct","providerModelId":"intfloat/multilingual-e5-large-instruct"} } }
/>
