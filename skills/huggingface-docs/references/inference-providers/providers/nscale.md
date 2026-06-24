

# Nscale

> [!TIP]
> All supported Nscale models can be found [here](https://huggingface.co/models?inference_provider=nscale&sort=trending)

<div class="flex justify-center">
    <a href="https://www.nscale.com/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/nscale" target="_blank">


    </a>
</div>

Nscale is a vertically integrated AI cloud that delivers bespoke, sovereign AI infrastructure at scale.

Built on this foundation, Nscale's inference service empowers developers with a wide range of models and ready-to-use inference services that integrate into workflows without the need to manage the underlying infrastructure.

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"nscale":{"modelId":"meta-llama/Llama-3.1-8B-Instruct","providerModelId":"meta-llama/Llama-3.1-8B-Instruct"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"nscale":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"} } }
conversational />

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"nscale":{"modelId":"black-forest-labs/FLUX.1-schnell","providerModelId":"black-forest-labs/FLUX.1-schnell"} } }
/>
