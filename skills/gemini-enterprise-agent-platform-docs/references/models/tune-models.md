[Video](https://www.youtube.com/watch?v=4A4W03qUTsw)

*Model tuning* is a crucial process in adapting Gemini to perform specific tasks
with greater precision and accuracy. Model tuning works by providing a model
with a training dataset that contains a set of examples of specific downstream
tasks.

This page provides an overview of model tuning for Gemini, describes
the tuning options available for Gemini, and helps you determine when
each tuning option should be used.

## Benefits of model tuning

Model tuning is an effective way to customize large models to your tasks. It's a
key step to improve the model's quality and efficiency. Model tuning provides the
following benefits:

- Higher quality for your specific tasks
- Increased model robustness
- Lower inference latency and cost due to shorter prompts

## Tuning compared to prompt design

- **Prompting with pre-trained Gemini models** : Prompting is the art of crafting effective instructions to guide AI models like Gemini in generating the outputs you want. It involves designing prompts that clearly convey the task, format you want, and any relevant context. You can use Gemini's capabilities with minimal setup. It's best suited for:
  - Limited labeled data: If you have a small amount of labeled data or can't afford a lengthy fine-tuning process.
  - Rapid prototyping: When you need to quickly test a concept or get a baseline performance without heavy investment in fine-tuning.
- **Customized fine-tuning of Gemini models** : For more tailored results, Gemini lets you fine-tune its models on your specific datasets. To create an AI model that excels in your specific domain, consider fine-tuning. This involves retraining the base model on your own labeled dataset, adapting its weights to your task and data. You can adapt Gemini to your use cases. Fine-tuning is most effective when:
  - You have labeled data: A sizable dataset to train on (think 100 examples or more), which allows the model to deeply learn your task's specifics.
  - Complex or unique tasks: For scenarios where advanced prompting strategies are not sufficient, and a model tailored to your data is essential.

We recommend starting with prompting to find the optimal prompt. Then, move on to
fine-tuning (if required) to further boost performances or fix recurrent errors.
While adding more examples might be beneficial, it is important to evaluate where
the model makes mistakes before adding more data. High-quality, well-labeled data
is crucial for good performance and better than quantity. Also, the data you use
for fine-tuning should reflect the prompt distribution, format and context the
model will encounter in production.

Tuning provides the following benefits over prompt design:

- Allows deep customization on the model and results in better performance on specific tasks.
- Align the model with custom syntax, instructions, domain specific semantic rules.
- Offers more consistent and reliable results.
- Capable of handling more examples at once.
- Save cost at inference by removing few-shot examples, long instructions in the prompts

## Tuning approaches

Parameter-efficient tuning and full fine-tuning are two approaches to
customizing large models. Both methods have their advantages and implications in
terms of model quality and resource efficiency.

### Parameter efficient tuning

Parameter-efficient tuning, also called adapter tuning, enables efficient
adaptation of large models to your specific tasks or domain. Parameter-efficient tuning
updates a relatively small subset of the model's parameters during the tuning
process.

To understand how Gemini Enterprise Agent Platform supports adapter tuning and serving, you
can find more details in the following whitepaper, [Adaptation of Large Foundation Models](https://services.google.com/fh/files/misc/adaptation_of_foundation_models_whitepaper_google_cloud.pdf).

### Full fine-tuning

Full fine-tuning updates all parameters of the model, making it suitable for
adapting the model to highly complex tasks, with the potential of achieving higher
quality. However full fine tuning demands higher computational resources for both
tuning and serving, leading to higher overall costs.

### Parameter efficient tuning compared to full fine tuning

Parameter-efficient tuning is more resource efficient and cost effective compared
to full fine-tuning. It uses significantly lower computational resources to train.
It's able to adapt the model faster with a smaller dataset. The flexibility of
parameter-efficient tuning offers a solution for multi-task learning without the need
for extensive retraining.

## Supported tuning methods

Agent Platform supports supervised fine-tuning to customize foundational models.

### Supervised fine-tuning

Supervised fine-tuning improves the performance of the model by teaching it a new
skill. Data that contains hundreds of labeled examples is used to teach the
model to mimic a desired behavior or task. Each labeled example demonstrates
what you want the model to output during inference.

When you run a supervised fine-tuning job, the model learns additional parameters
that help it encode the necessary information to perform the desired task or
learn the desired behavior. These parameters are used during inference. The
output of the tuning job is a new model that combines the newly learned
parameters with the original model.

Supervised fine-tuning of a text model is a good option when the output of your model
isn't complex and is relatively easy to define. Supervised fine-tuning is recommended
for classification, sentiment analysis, entity extraction, summarization of
content that's not complex, and writing domain-specific queries. For code
models, supervised tuning is the only option.

#### Models that support supervised fine-tuning

The following Gemini models support supervised tuning:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For more information on using supervised fine-tuning with each respective model,
see the following pages: Tune [text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/text_tune), [image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/image_tune), [audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/audio_tune), and [document](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/doc_tune) data types.

### Preference tuning

Gemini Enterprise Agent Platform preference tuning builds on supervised fine-tuning by
letting you tune your Gemini models with human feedback data.

Preference tuning enables the model to learn from subjective user
preferences that are hard to define by using specific labels and supervised
fine-tuning alone.

#### Models that support preference tuning

The following Gemini models support preference tuning:

#### Click to expand supported models

- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For more information on preference tuning, see
[About preference tuning for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning).

### Tuning checkpoints

Tuning checkpoints let you save tuning progress, compare checkpoint performance,
and choose the best performing checkpoint.

#### Models that support tuning checkpoints

The following Gemini models support tuning checkpoints:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For more information on tuning checkpoints, see
[Use checkpoints in Gemini tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints).

### Continuous tuning

Continuous tuning lets you continue tuning an already tuned model or model
checkpoint by adding more epochs or training examples.

#### Models that support continuous tuning

The following Gemini models support continuous tuning:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For more information on continuous tuning, see
[About continuous tuning for Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning).

## What's next

- Learn about [supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning).
- Learn about [preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning).
- To start tuning, see [Tune Gemini models by using supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning)
- To learn how supervised fine-tuning can be used in a solution that builds a generative AI knowledge base, see [Jump Start Solution: Generative AI
  knowledge base](https://docs.cloud.google.com/architecture/ai-ml/generative-ai-knowledge-base).
- To learn about tuning costs, see [Pricing](https://cloud.google.com/gemini-enterprise-agent-platform/pricing#model-tuning).
