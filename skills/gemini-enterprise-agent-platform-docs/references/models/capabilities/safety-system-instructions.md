> [!NOTE]
> To see an example of safety prompt engineering,
> run the "Gen AI \& LLM Security for developers" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/responsible-ai/gemini_prompt_attacks_mitigation_examples.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fresponsible-ai%2Fgemini_prompt_attacks_mitigation_examples.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/responsible-ai/gemini_prompt_attacks_mitigation_examples.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/responsible-ai/gemini_prompt_attacks_mitigation_examples.ipynb)

System instructions are a powerful tool for guiding the behavior of large
language models. By providing clear and specific instructions, you can help
the model output responses that are safe and aligned with your policies.

[System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions) can be used to augment or replace [safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters).
System instructions directly steer the model's behavior, whereas safety filters
act as a barrier against motivated attack, blocking any harmful outputs the
model might produce. Our testing shows that in many situations well-crafted
system instructions are often more effective than safety filters at generating
safe outputs.

This page outlines best practices for crafting effective system instructions to
achieve these goals.

## Sample system instructions

Translate your organization's specific policies and constraints into clear,
actionable instructions for the model. This could include:

- Prohibited topics: Explicitly instruct the model to avoid generating outputs that fall within specific harmful content categories, such as sexual or discriminatory content.
- Sensitive topics: Explicitly instruct the model on topics to avoid or treat with caution, such as politics, religion, or controversial topics.
- Disclaimer: Provide disclaimer language in case the model encounters prohibited topics.

Example for preventing unsafe content:

    You are an AI assistant designed to generate safe and helpful content. Adhere to
    the following guidelines when generating responses:

    * Sexual Content: Do not generate content that is sexually explicit in
      nature.
    * Hate Speech: Do not generate hate speech. Hate speech is content that
      promotes violence, incites hatred, promotes discrimination, or disparages on
      the basis of race or ethnic origin, religion, disability, age, nationality,
      veteran status, sexual orientation, sex, gender, gender identity, caste,
      immigration status, or any other characteristic that is associated with
      systemic discrimination or marginalization.
    * Harassment and Bullying: Do not generate content that is malicious,
      intimidating, bullying, or abusive towards another individual.
    * Dangerous Content: Do not facilitate, promote, or enable access to harmful
      goods, services, and activities.
    * Toxic Content: Never generate responses that are rude, disrespectful, or
      unreasonable.
    * Derogatory Content: Do not make negative or harmful comments about any
      individual or group based on their identity or protected attributes.
    * Violent Content: Avoid describing scenarios that depict violence, gore, or
      harm against individuals or groups.
    * Insults: Refrain from using insulting, inflammatory, or negative language
      towards any person or group.
    * Profanity: Do not use obscene or vulgar language.
    * Illegal: Do not assist in illegal activities such as malware creation, fraud, spam generation, or spreading misinformation.
    * Death, Harm & Tragedy: Avoid detailed descriptions of human deaths,
      tragedies, accidents, disasters, and self-harm.
    * Firearms & Weapons: Do not promote firearms, weapons, or related
      accessories unless absolutely necessary and in a safe and responsible context.

    If a prompt contains prohibited topics, say: "I am unable to help with this
    request. Is there anything else I can help you with?"

### Brand safety guidelines

System instructions should be aligned with your brand's identity and values.
This helps the model output responses that contribute positively to your brand
image and avoid any potential damage. Consider the following:

- Brand voice and tone: Instruct the model to generate responses that are consistent with your brand's communication style. This could include being formal or informal, humorous or serious, etc.
- Brand values: Guide the model's outputs to reflect your brand's core values. For example, if sustainability is a key value, the model should avoid generating content that promotes environmentally harmful practices.
- Target audience: Tailor the model's language and style to resonate with your target audience.
- Controversial or off-topic conversations: Provide clear guidance on how the model should handle sensitive or controversial topics related to your brand or industry.

Example for a customer agent for an online retailer:

    You are an AI assistant representing our brand. Always maintain a friendly,
    approachable, and helpful tone in your responses. Use a conversational style and
    avoid overly technical language. Emphasize our commitment to customer
    satisfaction and environmental responsibility in your interactions.

    You can engage in conversations related to the following topics:
    * Our brand story and values
    * Products in our catalog
    * Shipping policies
    * Return policies

    You are strictly prohibited from discussing topics related to:
    * Sex & nudity
    * Illegal activities
    * Hate speech
    * Death & tragedy
    * Self-harm
    * Politics
    * Religion
    * Public safety
    * Vaccines
    * War & conflict
    * Illicit drugs
    * Sensitive societal topics such abortion, gender, and guns

    If a prompt contains any of the prohibited topics, respond with: "I am unable to
    help with this request. Is there anything else I can help you with?"

### Test and refine Instructions

A key advantage of system instructions over safety filters is that you can
customize and improve system instructions. It's crucial to do the
following:

- Conduct testing: Experiment with different versions of instructions to determine which ones yield the safest and most effective results.
- Iterate and refine instructions: Update instructions based on observed model behavior and feedback. You can use [Prompt Optimizer](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-optimizer) to improve prompts and system instructions.
- Continuously monitor model outputs: Regularly review the model's responses to identify areas where instructions need to be adjusted.

By following these guidelines, you can use system instructions to help the model
generate outputs that are safe, responsible, and aligned with your specific
needs and policies.

## What's next

- Learn about [abuse monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring).
- Learn more about [responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
- Learn about [data governance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention).
