

# Replicate

> [!TIP]
> All supported Replicate models can be found [here](https://huggingface.co/models?inference_provider=replicate&sort=trending)

<div class="flex justify-center">
    <a href="https://replicate.com/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/replicate" target="_blank">


    </a>
</div>

Replicate is building tools so all software engineers can use AI as if it were normal software. You should be able to import an image generator the same way you import an npm package. You should be able to customize a model as easily as you can fork something on GitHub.

## Supported tasks

### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"replicate":{"modelId":"openai/whisper-large-v3","providerModelId":"openai/whisper:8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e"} } }
/>

### Image To Image

Find out more about Image To Image [here](../tasks/image-to-image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"replicate":{"modelId":"black-forest-labs/FLUX.2-dev","providerModelId":"black-forest-labs/flux-2-dev"} } }
/>

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"replicate":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/flux-dev"} } }
/>

### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"replicate":{"modelId":"Wan-AI/Wan2.2-TI2V-5B","providerModelId":"wan-video/wan-2.2-5b-fast"} } }
/>
