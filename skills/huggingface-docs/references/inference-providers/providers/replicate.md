

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

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"replicate":{"modelId":"stabilityai/stable-diffusion-3.5-medium","providerModelId":"stability-ai/stable-diffusion-3.5-medium"} } }
/>
