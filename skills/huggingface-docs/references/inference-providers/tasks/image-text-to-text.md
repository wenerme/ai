

## Image-Text to Text

Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.

> [!TIP]
> For more details about the `image-text-to-text` task, check out its [dedicated page](https://huggingface.co/tasks/image-text-to-text)! You will find examples and related materials.

### Recommended models

- [zai-org/GLM-4.5V](https://huggingface.co/zai-org/GLM-4.5V): Cutting-edge reasoning vision language model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=image-text-to-text&sort=trending).

### Using the API

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cerebras":{"modelId":"google/gemma-4-31B-it","providerModelId":"gemma-4-31b"},"cohere":{"modelId":"CohereLabs/aya-vision-32b","providerModelId":"c4ai-aya-vision-32b"},"deepinfra":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"MiniMaxAI/MiniMax-M3"},"featherless-ai":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"MiniMaxAI/MiniMax-M3"},"fireworks-ai":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"accounts/fireworks/models/minimax-m3"},"groq":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/llama-4-scout-17b-16e-instruct"},"novita":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"minimax/minimax-m3"},"nscale":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"},"ovhcloud":{"modelId":"Qwen/Qwen3.6-27B","providerModelId":"Qwen3.6-27B"},"scaleway":{"modelId":"Qwen/Qwen3.5-397B-A17B","providerModelId":"qwen3.5-397b-a17b"},"together":{"modelId":"MiniMaxAI/MiniMax-M3","providerModelId":"MiniMaxAI/MiniMax-M3"},"zai-org":{"modelId":"zai-org/GLM-4.6V","providerModelId":"glm-4.6v"}} }
conversational />

### API specification

For the API specification of conversational image-text-to-text models, please refer to the [Chat Completion API documentation](https://huggingface.co/docs/inference-providers/tasks/chat-completion#api-specification).
