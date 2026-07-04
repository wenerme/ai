Generative AI models like Gemini require robust safety measures to
mitigate risks such as generating harmful content, leaking sensitive
information, or being misused. Google Cloud's Gemini Enterprise Agent Platform
provides a suite of tools and practices to implement holistic safety for your
Gemini models.

## Potential safety risks and mitigation strategies

When deploying Gemini models, it's crucial to identify and mitigate
various potential risks. A proactive approach to understanding these risks
allows for more effective implementation of safety measures. A multi-layered
approach to safety is critical, as it can mitigate or prevent:

- **Content risks:** These can include content that's harmful, profanity and sexualization, and violence and gore.
- **Brand safety risks:** Generated content may not align with your brand's tone or values, it may endorse competitors or inappropriate products, or generate content that can result in reputational damage.
- **Alignment risks:** Generated content may be irrelevant or inaccurate.
- **Security and privacy risks:** Generated content may leak sensitive training data or prompts, or adversarial users may attempt to force the model to override safety protocols or behave in unintended ways.

Our deployed models offer various features to address these potential issues:

- The default model and non-configurable filters provide a general safety net.
- [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/safety-system-instructions) provide direct guidance to the model on preferred behavior and topics to avoid.
- [Content filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters) allow you to set specific thresholds for common harm types.
- [Gemini as a filter](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-for-filtering-and-moderation) offers an advanced, customizable checkpoint for complex or nuanced safety concerns that might be missed by the preceding layers or require more context-aware evaluation.
- [Model Armor](https://docs.cloud.google.com/model-armor/overview) provides enterprise-grade protection against prompt injection and jailbreaks, content harms, sensitive data protection, and malware detection and safe browsing.
- [DLP](https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview#api) specifically addresses the critical risk of sensitive data leakage, in case the model has access to sensitive data. It also enables the ability to create custom block lists.
- [Content Credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) add cryptographically signed C2PA metadata to images generated using the Gemini 3 Pro Image model, indicating that they are AI-generated and providing a verifiable history of their origin.

### Available safety tools in Gemini Enterprise Agent Platform for Gemini

Gemini Enterprise Agent Platform offers several tools to manage the safety of your
Gemini models. Understanding how each works, their considerations, and
ideal use cases will help you build a tailored safety solution.

| Approach | How it works | Protection provided | Risks | When to use |
|---|---|---|---|---|
| Default settings: Gemini + non-configurable filters | Gemini models are inherently designed with safety and fairness in mind, even when faced with adversarial prompts. Google has invested in comprehensive safety evaluations, including for bias and toxicity. The default settings include an independent protection layer designed to prevent the generation of content related to Child Sexual Abuse Material (CSAM) or Copyrighted Content (Recitation). | Baseline protection against Child sexual abuse material and copyright (Recitation) | Gemini's default safety might not meet your organization's needs. The model can hallucinate or not follow instructions. Motivated attackers may still succeed in jailbreaks and prompt injection | Workflows where no malicious input is expected |
| Configurable Filters | Gemini's prebuilt content filters provide additional protection against various categories of harmful content, such as sexual, hate, harassment, or dangerous content. You can configure blocking thresholds for each harm category (e.g., `BLOCK_LOW_AND_ABOVE`, `BLOCK_MEDIUM_AND_ABOVE`, `BLOCK_ONLY_HIGH`) based on the probability and/or severity of the harmful content. These are an independent layer from the model so are robust against jailbreaks. | Robust against violations for predefined categories, adjustable sensitivity | Lacks fine-grained customization beyond threshold settings for predefined categories. May occasionally block benign content (false positives) or miss some harmful content (false negatives). Only available for response filtering, not prompt filtering. | Provide a base level of safety for user facing applications or agents. If your goal is to ensure content and brand safety, content filters should be paired with system instructions. |
| System Instructions | You can instruct the model on your brand and content safety guidelines through system instructions or preambles. For example, you can tell the model "don't answer questions related to politics" or to adhere to specific brand voice and tone guidelines. System instructions directly guide the model's behavior. | Customizable for content/brand safety, can be highly effective. | The model can hallucinate or not follow instructions. Motivated attackers may still succeed in jailbreaks and prompt injection | Applications or agents requiring adherence to specific brand guidelines or nuanced content policies. If your goal is to ensure content and brand safety, system instructions should be paired with content filters. |
| Model Armor | Model Armor is a Google Cloud service designed to enhance the security and safety of your AI applications. It works by proactively screening LLM prompts and responses, protecting against various risks and ensuring responsible AI practices. Whether you are deploying AI in Google Cloud or other cloud providers, Model Armor can help you prevent malicious input, verify content safety, protect sensitive data, maintain compliance, and enforce your AI safety and security policies consistently across your AI applications. | Prompt injection and jailbreak filtering, content filters, sensitive data protection, and malware detection and safe browsing. | Cost and latency. | Paid offering for customers with enterprise needs. |
| DLP for custom block lists and Sensitive data protection | The DLP API can inspect text to identify and classify sensitive information based on a wide range of predefined and custom infoType detectors. Once identified, it can apply de-identification techniques such as redaction, masking, or tokenization. The DLP API can also be used to block keywords. Input Protection: Before sending user prompts or data to Gemini, you can pass the text through the DLP API to redact or mask any sensitive information. This prevents sensitive data from being processed or logged by the model. Output Protection: If there's a risk that Gemini might inadvertently generate or reveal sensitive information (e.g., if it's summarizing source documents containing PII), the model's output can be scanned by the DLP API before being sent to the user. | Robust filtering for profanities or custom words. Robust filtering for sensitive data. | Adds latency. Can lead to over-blocking. | Data loss protection for agents that have access to sensitive data. |
| Gemini as a Filter | You can use Gemini to filter prompts and responses for your agent or app. This involves making a second call to a fast and cost-effective Gemini model (such as Gemini Flash or Flash Lite) to evaluate whether the input from a user or tool, or the output from your primary Gemini model, is safe. The filter model is given instructions to decide if the content is safe or unsafe based on your defined policies including content safety, brand safety, and agent misalignment. This offers robust and highly customizable protection against content safety violations, brand safety issues, model drift, and hallucinations and can analyze text, images, video, and audio for a holistic understanding. | Highly robust and customizable for content/brand safety, drift, hallucination; multimodal understanding. | Additional cost and latency. Chance of extremely rare false negatives. | Provide a custom level of safety for user facing applications or agents |
| Multi-layered approach: configurable filters + system instructions + DLP + Gemini as a filter |   | Highly robust and customizable for content/brand safety, drift, hallucination; multimodal understanding | Additional cost and latency. | Provide a robust level of safety for user-facing applications or agents, especially where adversarial and malicious use is expected |
| C2PA Content Credentials | For supported models, Gemini Enterprise Agent Platform automatically adds cryptographically signed Content Credentials to generated images, indicating they are AI-generated and providing a verifiable history of their origin according to the [C2PA](https://www.c2pa.org/) standard. For more information, see [Content Credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials). | Transparency about content origin; helps users identify AI-generated images. | Use of non-compliant tools can compromise file authenticity; does not guarantee trustworthiness of media source. | Media generation use cases, where transparency about the origin and history of the file is important for user trust. |

### Continuous safety evaluation

Continuous safety evaluation is crucial for AI systems, as the AI landscape and
misuse methods are constantly evolving. Regular evaluations help identify
vulnerabilities, assess mitigation effectiveness, adapt to evolving risks,
ensure alignment with policies and values, build trust, and maintain compliance.
Various evaluation types, including development evaluations, assurance
evaluations, red teaming, external evaluations, and benchmark testing, help
achieve this. The scope of evaluation should cover content safety, brand safety,
relevance, bias and fairness, truthfulness, and robustness to adversarial
attacks. Tools like Gemini Enterprise Agent Platform's [Gen AI evaluation
service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview) can assist in
these efforts, emphasizing that iterative improvements based on evaluation
findings are essential for responsible AI development.
