Llama is a collection of open models developed by Meta that you can fine-tune
and deploy on Gemini Enterprise Agent Platform. Llama offers pre-trained and instruction-tuned
generative text and multimodal models.

## Llama 4

The Llama 4 family of models is a collection of multimodal models that use the
Mixture-of-Experts (MoE) architecture. By using the MoE architecture, models
with very large parameter counts can activate a subset of those parameters for
any given input, which leads to more efficient inferences. Additionally, Llama
4 uses early fusion, which integrates text and vision information from the
initial processing stages. This method enables Llama 4 models to more
effectively grasp complex, nuanced relationships between text and images.
Model Garden on Gemini Enterprise Agent Platform offers two Llama 4 models: Llama 4
Scout and Llama 4 Maverick.

For more information, see the [Llama
4](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama4) model card in
Model Garden or view the [Introducing Llama 4 on Gemini Enterprise Agent Platform
blog post](https://www.googlecloudcommunity.com/gc/Community-Blogs/Introducing-Llama-4-on-Vertex-AI/ba-p/892578).

### Llama 4 Maverick

Llama 4 Maverick is the largest and most capable Llama 4 model, offering
industry-leading capabilities on coding, reasoning, and image benchmarks. It
features 17 billion active parameters out of 400 billion total parameters with
128 experts. Llama 4 Maverick uses alternating dense and MoE layers, where each
token activates a shared expert plus one of the 128 routed experts. You can use
the model as a pretrained (PT) model or instruction-tuned (IT) model with FP8
support. The model is pretrained on 200 languages and optimized for high-quality
chat interactions through a refined post-training pipeline.

Llama 4 Maverick is multimodal and has a 1M context length. It is suited for
advanced image captioning, analysis, precise image understanding, visual
Q\&A, creative text generation, general-purpose AI assistants, and sophisticated
chatbots requiring top-tier intelligence and image understanding.

### Llama 4 Scout

Llama 4 Scout delivers state-of-the-art results for its size class with a large
10 million token context window, outperforming previous Llama generations and
other open and proprietary models on several benchmarks. It features 17 billion
active parameters out of the 109 billion total parameters with 16 experts and is
available as a pretrained (PT) or instruction-tuned (IT) model. Llama 4 Scout is
suited for retrieval tasks within long contexts and tasks that demand reasoning
over large amounts of information, such as summarizing multiple large documents,
analyzing extensive user interaction logs for personalization and reasoning
across large codebases.

## Llama 3.3

Llama 3.3 is a text-only 70B instruction-tuned model that provides enhanced
performance relative to Llama 3.1 70B and to Llama 3.2 90B when used for
text-only applications. Moreover, for some applications, Llama 3.3 70B
approaches the performance of Llama 3.1 405B.

For more information, see the [Llama
3.3](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama3-3) model card in
Model Garden.

## Llama 3.2

Llama 3.2 enables developers to build and deploy the latest generative AI models
and applications that use Llama's capabilities to ignite new innovations,
such as image reasoning. Llama 3.2 is also designed to be more accessible for
on-device applications. The following list highlights Llama 3.2 features:

- Offers a more private and personalized AI experience, with on-device processing for smaller models.
- Offers models that are designed to be more efficient, with reduced latency and improved performance, making them suitable for a wide range of applications.
- Built on top of the Llama Stack, which makes building and deploying applications easier. Llama Stack is a standardized interface for building canonical toolchain components and agentic applications.
- Supports vision tasks, with a new model architecture that integrates image encoder representations into the language model.

The 1B and 3B models are lightweight text-only models that support on-device use
cases such as multilingual local knowledge retrieval, summarization, and
rewriting.

Llama 11B and 90B models are small and medium-sized multimodal models with image
reasoning. For example, they can analyze visual data from charts to provide more
accurate responses and extract details from images to generate text
descriptions.

For more information, see the [Llama
3.2](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama3-2) model card in
Model Garden.

### Considerations

When using the 11B and 90B, there are no restriction when you send
text-only prompts. However, if you include an image in your prompt, the image
must be at beginning of your prompt, and you can include only one image. You
cannot, for example, include some text and then an image.

## Llama 3.1

Llama 3.1 collection of multilingual large language models (LLMs) is a
collection of pre-trained and instruction-tuned generative models in 8B, 70B and
405B sizes (text in/text out). The Llama 3.1 instruction tuned text-only models
(8B, 70B, 405B) are optimized for multilingual dialogue use cases and outperform
many of the available open source and closed chat models on common industry
benchmarks.

For more information, see the [Llama
3.1](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama3_1) model card in
Model Garden.

## Llama 3

The Llama 3 instruction-tuned models are a collection of LLMs optimized for
dialogue use cases. Llama 3 models outperform many of the available open source
chat models on common industry benchmarks.

For more information, see the [Llama
3](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama3) model card in
Model Garden.

## Llama 2

The Llama 2 LLMs is a collection of pre-trained and fine-tuned generative text
models, ranging in size from 7B to 70B parameters.

For more information, see the [Llama
2](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama2) model card in
Model Garden.

## Code Llama

Meta's Code Llama models are designed for code synthesis,
understanding, and instruction.

For more information, see the [Code
Llama](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/codellama-7b-hf) model card in
Model Garden.

## Llama Guard 3

Llama Guard 3 builds on the capabilities of Llama Guard 2, adding
three new categories: Defamation, Elections, and Code Interpreter Abuse.
Additionally, this model is multilingual and has a prompt format that is
consistent with Llama 3 or later instruct models.

For more information, see the [Llama
Guard](https://console.cloud.google.com/agent-platform/publishers/meta/model-garden/llama-guard) model card in
Model Garden.

## Resources

For more information about Model Garden, see
[Explore AI models in Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models).
