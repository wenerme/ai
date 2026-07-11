

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
    providersMapping={ {"together":{"modelId":"deepseek-ai/DeepSeek-V4-Pro","providerModelId":"deepseek-ai/DeepSeek-V4-Pro"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"together":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"MiniMaxAI/MiniMax-M3"} } }
conversational />

### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature-extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"together":{"modelId":"intfloat/multilingual-e5-large-instruct","providerModelId":"intfloat/multilingual-e5-large-instruct"} } }
/>

### Image To Image

Find out more about Image To Image [here](../tasks/image-to-image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"together":{"modelId":"black-forest-labs/FLUX.2-dev","providerModelId":"black-forest-labs/FLUX.2-dev"} } }
/>

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"together":{"modelId":"black-forest-labs/FLUX.1-schnell","providerModelId":"black-forest-labs/FLUX.1-schnell"} } }
/>

### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"together":{"modelId":"Wan-AI/Wan2.2-T2V-A14B","providerModelId":"Wan-AI/Wan2.2-T2V-A14B"} } }
/>
