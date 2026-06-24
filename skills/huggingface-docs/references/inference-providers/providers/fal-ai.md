

# Fal

> [!TIP]
> All supported Fal models can be found [here](https://huggingface.co/models?inference_provider=fal-ai&sort=trending)

<div class="flex justify-center">
    <a href="https://fal.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/fal" target="_blank">


    </a>
</div>

Founded in 2021 by [Burkay Gur](https://huggingface.co/burkaygur) and [Gorkem Yurtseven](https://huggingface.co/gorkemyurt), fal.ai was born out of a shared passion for AI and a desire to address the challenges in AI infrastructure observed during their tenures at Coinbase and Amazon.

## Supported tasks

### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"fal-ai":{"modelId":"openai/whisper-large-v3","providerModelId":"fal-ai/whisper"} } }
/>

### Image Segmentation

Find out more about Image Segmentation [here](../tasks/image-segmentation).

<InferenceSnippet
    pipeline=image-segmentation
    providersMapping={ {"fal-ai":{"modelId":"briaai/RMBG-2.0","providerModelId":"fal-ai/bria/background/remove"} } }
/>

### Image To Image

Find out more about Image To Image [here](../tasks/image-to-image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"fal-ai":{"modelId":"black-forest-labs/FLUX.2-dev","providerModelId":"fal-ai/flux-2/edit"} } }
/>

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"fal-ai":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"fal-ai/flux/dev"} } }
/>

### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"fal-ai":{"modelId":"meituan-longcat/LongCat-Video","providerModelId":"fal-ai/longcat-video/text-to-video/480p"} } }
/>
