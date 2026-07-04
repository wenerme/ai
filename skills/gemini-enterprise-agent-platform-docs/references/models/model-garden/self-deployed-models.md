Model Garden lets you self-deploy and serve open, partner, and custom
models on Gemini Enterprise Agent Platform. Unlike
[model-as-a-service (MaaS)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models) offerings, which are serverless and don't
require manual deployment, self-deployed models run securely within
your Google Cloud project and VPC network, giving you full
control over the deployment environment.

## Self-deploy open models

Open models provide pretrained capabilities for various AI tasks, including
Gemma models that excel in multimodal processing. These models are
freely available for use, and you are free to publish their outputs as long as
you adhere to their licensing terms. Gemini Enterprise Agent Platform offers both open weight
and open source models.

When you use an open model with Gemini Enterprise Agent Platform, you use Gemini Enterprise Agent Platform for
your infrastructure. You can also use open models with other infrastructure
products, such as PyTorch or Jax.

### Open weight models

Many open models are considered open weight large language models (LLMs). Open
weight models provide more transparency than models that aren't open weight. A
model's weights are the numerical values stored in the model's neural network
architecture that represent learned patterns and relationships from the data a
model is trained on. The pretrained parameters, or weights, of open weight
models are released. You can use an open weight model for inference and tuning.
Details such as the original dataset, model architecture, and training code
aren't always provided.

### Open source models

Open models differ from open source AI models. While open models often expose
the weights and the core numerical representation of learned patterns, they
don't necessarily provide the full source code or training details. Open source
models, on the other hand, typically make the entire codebase, including
training scripts and data, publicly available. Providing weights offers a level
of AI model transparency, allowing you to understand the model's capabilities
without needing to build it yourself.

## Self-deployed partner models

Model Garden helps you purchase and manage model licenses from partners
who offer proprietary models as a self-deploy option. You can get access to
these models through Cloud Marketplace. After you have a license, you
can choose to deploy on on-demand hardware or use your existing
Compute Engine reservations and committed use discounts to manage
costs. With self-deployed partner models, you are billed for both the model
usage and the underlying Gemini Enterprise Agent Platform infrastructure consumed.

To request usage of a self-deployed partner model:

1. Navigate to the [Model Garden console](https://console.cloud.google.com/agent-platform/model-garden).
2. Find the relevant partner model.
3. Click **Enable** and complete the provided form to get the necessary commercial use licenses.

For more information about deploying and using partner models, see [Deploy a
partner model and make prediction requests](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models#deploy_a_partner_model_and_make_prediction_requests).

### Considerations

When using self-deployed partner models, keep the following in mind:

- **Weight Export:** Unlike with some open models, you cannot export the weights of self-deployed partner models.
- **Endpoint Type:** Only the [shared public endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/choose-endpoint-type) type is supported for these deployments.

> [!NOTE]
> **Note:** Support for model-specific issues is provided directly by the partner. To contact a partner for model performance or other related issues, use the contact details found in the "Support" section of their Model Garden model card.

## Learn more about self-deployed models in Gemini Enterprise Agent Platform

- To learn more about custom weights, see [Deploy models with custom
  weights](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/deploy-models-with-custom-weights).
- For more information about Model Garden, see [Overview of
  Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models).
- For more information about deploying models, see [Use models in
  Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models).
- [Use Gemma open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-gemma)
- [Use Llama open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-llama)
- [Use Hugging Face open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hugging-face-models)
