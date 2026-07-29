

# Z.ai

> [!TIP]
> All supported Z.ai models can be found [here](https://huggingface.co/models?inference_provider=zai-org&sort=trending)

<div class="flex justify-center">
    <a href="https://z.ai/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/zai-org" target="_blank">


    </a>
</div>

Z.ai is an AI platform that provides cutting-edge large language models powered by GLM series. Their flagship models feature Mixture-of-Experts (MoE) architecture with advanced reasoning, coding, and agentic capabilities.

For latest pricing, visit the [pricing page](https://docs.z.ai/guides/overview/pricing).

## Resources
 - **Website**: https://z.ai/
 - **Documentation**: https://docs.z.ai/
 - **API Documentation**: https://docs.z.ai/api-reference/introduction
 - **GitHub**: https://github.com/zai-org
 - **Hugging Face**: https://huggingface.co/zai-org

## Supported tasks

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"zai-org":{"modelId":"zai-org/GLM-5.2","providerModelId":"glm-5.2"} } }
conversational />

### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"zai-org":{"modelId":"zai-org/GLM-4.6V-Flash","providerModelId":"glm-4.6v-flash"} } }
conversational />
