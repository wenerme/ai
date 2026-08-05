

## Image-Text to Text

Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.

> [!TIP]
> For more details about the `image-text-to-text` task, check out its [dedicated page](https://huggingface.co/tasks/image-text-to-text)! You will find examples and related materials.

### Recommended models

- [zai-org/GLM-4.5V](https://huggingface.co/zai-org/GLM-4.5V): Cutting-edge reasoning vision language model.
- [Qwen/Qwen2.5-VL-3B-Instruct](https://huggingface.co/Qwen/Qwen2.5-VL-3B-Instruct): Small yet powerful model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=image-text-to-text&sort=trending), or from the terminal with the [`hf` CLI](https://huggingface.co/docs/huggingface_hub/package_reference/cli#hf-models-list):

```bash
hf models ls --warm --pipeline-tag image-text-to-text --sort trending_score
```

### Using the API

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cerebras":{"modelId":"google/gemma-4-31B-it","providerModelId":"gemma-4-31b"},"cohere":{"modelId":"CohereLabs/aya-vision-32b","providerModelId":"c4ai-aya-vision-32b"},"deepinfra":{"modelId":"thinkingmachines/Inkling","providerModelId":"thinkingmachines/Inkling"},"featherless-ai":{"modelId":"moonshotai/Kimi-K3","providerModelId":"moonshotai/Kimi-K3"},"fireworks-ai":{"modelId":"moonshotai/Kimi-K3","providerModelId":"accounts/fireworks/models/kimi-k3"},"novita":{"modelId":"moonshotai/Kimi-K2.7-Code","providerModelId":"moonshotai/kimi-k2.7-code"},"nscale":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"},"ovhcloud":{"modelId":"Qwen/Qwen3.6-27B","providerModelId":"Qwen3.6-27B"},"publicai":{"modelId":"swiss-ai/Apertus-v1.5-70B","providerModelId":"swiss-ai/apertus-v1.5-70b"},"scaleway":{"modelId":"Qwen/Qwen3.6-35B-A3B","providerModelId":"qwen3.6-35b-a3b"},"together":{"modelId":"moonshotai/Kimi-K3","providerModelId":"moonshotai/Kimi-K3"},"zai-org":{"modelId":"zai-org/GLM-4.6V","providerModelId":"glm-4.6v"}} }
conversational />

### API specification

For the API specification of conversational image-text-to-text models, please refer to the [Chat Completion API documentation](https://huggingface.co/docs/inference-providers/tasks/chat-completion#api-specification).
