[Video](https://www.youtube.com/watch?v=ccSxk-AcYss)

Llama models are available for use as managed APIs and self-deployed
models on Gemini Enterprise Agent Platform. You can stream your responses to reduce the
end-user latency perception. A streamed response uses *server-sent events* (SSE)
to incrementally stream the response.

## Managed Llama models

Llama models offer fully managed and serverless models as APIs. To
use a Llama model on Agent Platform, send a request directly
to the Agent Platform API endpoint. When using Llama models as a
managed API, there's no need to provision or manage infrastructure.

The following models are available from Llama to use in
Gemini Enterprise Agent Platform. To access a Llama model, go to its
Model Garden model card.

### Llama 4 Maverick 17B-128E

Llama 4 Maverick 17B-128E is the largest and most capable Llama 4 model that
offers coding, reasoning, and image capabilities. It features Mixture-of-Experts
(MoE) architecture with 17 billion active parameters out of 400 billion total
parameters and 128 experts. Llama 4 Maverick 17B-128E uses alternating dense and
MoE layers, where each token activates a shared expert plus one of the 128
routed experts. The model is pretrained on 200 languages and optimized for
high-quality chat interactions through a refined post-training pipeline.

Llama 4 Maverick 17B-128E is multimodal and is suited for advanced image
captioning, analysis, precise image understanding, visual questions and answers,
creative text generation, general-purpose AI assistants, and sophisticated
chatbots requiring top-tier intelligence and image understanding.

#### Considerations

- You can include a maximum of three images per request.
- The MaaS endpoint doesn't use Llama Guard, unlike previous versions. To use Llama Guard, deploy Llama Guard from Model Garden and then send the prompts and responses to that endpoint. However, compared to Llama 4, Llama Guard has a more limited context (128,000) and can only process requests with a single image at the beginning of the prompt.
- Batch predictions aren't supported.

[Go to the Llama 4 model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)

### Llama 4 Scout 17B-16E

Llama 4 Scout 17B-16E delivers state-of-the-art results for its size class that
outperforms previous Llama generations and other open and proprietary models on
several benchmarks. It features MoE architecture with 17 billion active
parameters out of the 109 billion total parameters and 16 experts.

Llama 4 Scout 17B-16E is suited for retrieval tasks within long contexts and
tasks that demand reasoning over large amounts of information, such as
summarizing multiple large documents, analyzing extensive user interaction logs
for personalization, and reasoning across large codebases.

[Go to the Llama 4 model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)

#### Considerations

- You can include a maximum of three images per request.
- The MaaS endpoint doesn't use Llama Guard, unlike previous versions. To use Llama Guard, deploy Llama Guard from Model Garden and then send the prompts and responses to that endpoint. However, compared to Llama 4, Llama Guard has a more limited context (128,000) and can only process requests with a single image at the beginning of the prompt.
- Batch predictions aren't supported.

[Go to the Llama 4 model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-4-maverick-17b-128e-instruct-maas)

### Llama 3.3

Llama 3.3 is a text-only 70B instruction-tuned model that provides enhanced
performance relative to Llama 3.1 70B and to Llama 3.2 90B when used for
text-only applications.

[Go to the Llama 3.3 70B model card](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-3.3-70b-instruct-maas)

## Use Llama models

For managed models, you can use curl commands to send requests to the
Gemini Enterprise Agent Platform endpoint using the following model names. To learn how to make
streaming and non-streaming calls to Llama
models, see [Call open model
APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/call-open-model-apis).

To use a self-deployed Gemini Enterprise Agent Platform model:

1. Navigate to the [Model Garden console](https://console.cloud.google.com/agent-platform/model-garden).
2. Find the relevant Gemini Enterprise Agent Platform model.
3. Click **Enable** and complete the provided form to get the necessary commercial use licenses.

For more information about deploying and using partner models, see [Deploy a
partner model and make prediction
requests](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models#deploy_a_partner_model_and_make_prediction_requests).

## What's next

[Learn how to use Llama models](https://docs.cloud.google.com/vertex-ai/docs/partner-models/llama/use-llama).
