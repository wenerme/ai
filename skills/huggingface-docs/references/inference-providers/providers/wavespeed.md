

# WaveSpeed

> [!TIP]
> All supported WaveSpeed models can be found [here](https://huggingface.co/models?inference_provider=wavespeed&sort=trending)

<div class="flex justify-center">
    <a href="https://wavespeed.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/wavespeed" target="_blank">


    </a>
</div>

[WaveSpeedAI](https://wavespeed.ai/) is a high-performance AI inference platform specializing in image and video generation. Built with cutting-edge infrastructure and optimization techniques, [WaveSpeedAI](https://wavespeed.ai/) provides fast, scalable, and cost-effective model serving for creative AI applications.

## Supported tasks

### Image To Image

Find out more about Image To Image [here](../tasks/image-to-image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"wavespeed":{"modelId":"black-forest-labs/FLUX.2-dev","providerModelId":"wavespeed-ai/flux-2-dev/edit"} } }
/>

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"wavespeed":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"wavespeed-ai/flux-dev"} } }
/>

### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"wavespeed":{"modelId":"Wan-AI/Wan2.2-TI2V-5B","providerModelId":"wavespeed-ai/wan-2.2/t2v-5b-720p"} } }
/>
