Large language models (LLMs) can translate language, summarize text, generate
creative writing, generate code, power chatbots and virtual assistants, and
complement search engines and recommendation systems. However its evolving
capabilities and uses create potential for misapplication, misuse, and
unintended or unforeseen consequences. LLMs can generate output that you don't
expect, including text that's offensive, insensitive, or factually incorrect.

The versatility of LLMs makes it difficult to predict exactly what kinds of
unintended or unforeseen outputs they might produce. Given these risks and
complexities, Gemini Enterprise Agent Platform generative AI APIs are designed with [Google's AI
Principles](https://ai.google/principles/)
in mind. However, it is important for developers to understand and test their
models to deploy safely and responsibly. To aid developers, the
Vertex AI Studio has built-in content filtering, and our generative AI
APIs have safety attribute scoring to help customers test Google's safety
filters and define confidence thresholds that are right for their use case and
business. To learn how to use safety filters and attributes for an API, see [Gemini API in
Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters).

When our generative APIs are integrated into your unique use case and context,
additional responsible AI considerations and [limitations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai#limitations) might
need to be considered. We encourage customers to promote fairness,
interpretability, privacy and security [recommended
practices](https://ai.google/responsibilities/responsible-ai-practices/)
. Customers also remain responsible for adherence to Google Cloud's [Acceptable
Use Policy](https://cloud.google.com/terms/aup) (AUP), [Generative AI Prohibited
Use Policy](https://policies.google.com/terms/generative-ai/use-policy), and any
other [Service Specific Terms](http://cloud.google.com/terms/service-terms) or
relevant requirements for the use of AI/ML and Generative AI services.

## Model limitations

*Limitations you can encounter when using generative AI models include (but are
not limited to):*

- **Edge cases**: Edge cases refer to unusual, rare, or exceptional situations
  that are not well-represented in the training data. These cases can lead to
  limitations in the performance of the model, such as model overconfidence,
  misinterpretation of context, or inappropriate outputs.

- **Model hallucinations, grounding, and factuality** : Generative AI models
  require context grounded in real-world information, physical properties, and
  accurate understanding of your specific data in order to reduce the chance
  of the model producing inaccurate, irrelevant, or nonsensical outputs. To
  learn more about grounding in Agent Platform, see [Grounding
  overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview).

- **Data quality and tuning**: The quality, accuracy, and bias of the prompt
  or data input into a model can have a significant impact on the quality of
  its responses. If users enter inaccurate or incorrect data or prompts, the
  model can have suboptimal performance or false model outputs.

- **Bias amplification**: Generative AI models can inadvertently amplify
  existing biases in their training data, leading to outputs that can further
  reinforce societal prejudices and unequal treatment of certain groups.

- **Language quality** : While the models yield impressive multilingual
  capabilities on the benchmarks we evaluated against, the majority of our
  benchmarks (including all of fairness evaluations) are in the English
  language. For more information, see the [Google Research
  blog](https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html).

  - Generative AI models can provide inconsistent service quality to different users. For example, text generation might not be as effective for some dialects or language varieties due to underrepresentation in the training data. Performance can be worse for non-English languages or English language varieties with less representation.
- **Fairness benchmarks and subgroups** : Google Research's fairness analyses
  of our generative AI models don't provide an exhaustive account of the
  various potential risks. For example, we focus on biases along gender, race,
  ethnicity and religion axes, but perform the analysis only on the English
  language data and model outputs. For more information, see the [Google
  Research
  blog](https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html).

- **Limited domain expertise**: Generative AI models can lack the depth of
  information required to provide accurate and detailed responses on highly
  specialized or technical topics, leading to superficial or incorrect
  information. For specialized, complex use cases, models should be tuned on
  domain-specific data, and there must be meaningful human supervision in
  contexts with the potential to materially impact individual rights.

- **Length and structure of inputs and outputs**: Generative AI models have a
  maximum input and output token limit. If the input or output exceeds this
  limit, our safety classifiers are not applied, which could ultimately lead
  to poor model performance. While models hosted on Agent Platform are
  designed to handle a wide range of text formats, their performance can be
  affected if the input data has an unusual or complex structure.

## Recommended practices

To utilize this technology safely and responsibly, it is also important to
consider other risks specific to your use case, users, and business context in
addition to built-in technical safeguards.

We recommend taking the following steps:

1. Assess your application's security risks.
2. Perform safety testing appropriate to your use case.
3. Configure safety filters if required.
4. Solicit user feedback and monitor content.

## Abuse monitoring

Google Cloud has created processes that may be utilized to help detect potential
abuse and violations of our terms relating to the use of Generative AI Services.
You can learn more about these processes, as well as the more rigorous
requirements specifically for models or features designated as "Advanced AI",
in our [abuse monitoring
documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring).

## Report abuse

You can report suspected abuse of the Service or any generated output that
contains inappropriate material or inaccurate information by using the following
form: [Report suspected abuse on
Google Cloud](https://support.google.com/code/contact/cloud_platform_report).

## Additional resources

- Learn more about Google's recommendations for [Responsible AI
  practices](https://ai.google/responsibilities/responsible-ai-practices/?category=general).
- Read our blog, [A shared agenda for responsible AI progress](https://blog.google/technology/ai/a-shared-agenda-for-responsible-ai-progress/)
