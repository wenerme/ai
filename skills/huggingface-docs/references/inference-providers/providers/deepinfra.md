

# DeepInfra

> [!TIP]
> All supported DeepInfra models can be found [here](https://huggingface.co/models?inference_provider=deepinfra&sort=trending)

<div class="flex justify-center">
    <a href="https://deepinfra.com/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/DeepInfra" target="_blank">


    </a>
</div>

DeepInfra is a serverless AI inference platform offering one of the most cost-effective pricing per token in the industry. With a catalog of over 100 models spanning LLMs, text-to-image, text-to-speech, speech-to-text, video generation, OCR, and more, DeepInfra makes it easy for developers to integrate a wide range of AI capabilities into their applications with minimal setup.

## Resources
- **Website**: https://deepinfra.com/
- **Documentation**: https://docs.deepinfra.com

## Supported tasks

### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"deepinfra":{"modelId":"nvidia/nemotron-3.5-asr-streaming-0.6b","providerModelId":"nvidia/Nemotron-3.5-ASR-Streaming-Multilingual-0.6b"} } }
/>

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"deepinfra":{"modelId":"zai-org/GLM-5.2","providerModelId":"zai-org/GLM-5.2"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"deepinfra":{"modelId":"thinkingmachines/Inkling","providerModelId":"thinkingmachines/Inkling"} } }
conversational />
