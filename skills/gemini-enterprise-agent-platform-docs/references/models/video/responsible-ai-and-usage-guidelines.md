Veo on Gemini Enterprise Agent Platform is designed with Google's [AI
principles](https://ai.google/responsibility/principles/) in mind. However, it
is important for developers to understand how to test and deploy Google's models
safely and responsibly. To aid developers, Veo on Gemini Enterprise Agent Platform has built-in safety
features to help customers block potentially harmful outputs within their use
cases. For more information, see [safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/responsible-ai-and-usage-guidelines#safety-filters).

We encourage customers to use fairness, interpretability, privacy, and security
best practices when developing AI applications. For more information, see [The
People + AI Guidebook](https://pair.withgoogle.com/guidebook/).

## Safety filters

Veo on Gemini Enterprise Agent Platform offers several ways to input prompts to generate videos, including
text, video, and images. Prompts that are provided to Veo are
assessed against a list of safety filters, which include *harmful categories*
(for example, `violence`, `sexual`, `derogatory`, and `toxic`). These safety
filters aim to filter out input images and videos that violate the [Google Cloud
Platform Acceptable Use Policy](https://cloud.google.com/terms/aup?e=48754805),
[Generative AI Prohibited Use
Policy](https://policies.google.com/terms/generative-ai/use-policy), or [Our AI
Principles](https://ai.google/responsibility/principles/).

If the model responds to a request with an error message, such as `The
prompt couldn't be submitted` or `it might violate our
policies`, then the input is triggering a safety filter. If fewer videos
than requested are returned, then some generated output is being blocked for not
meeting safety requirements.

## Safety filter code categories

Depending on the safety filters that you configure, your output may contain a
safety code similar to: "Veo could not generate videos because the input image
violates Agent Platform's usage guidelines. If you think this was an error, send
feedback. Support codes: **15236754**"

The code listed in the output corresponds to a specific harmful category.

The following table displays the support code to safety category mappings:

| Support code | Safety category | Description |
|---|---|---|
| `58061214` `17301594` | Child | Rejects requests to generate content depicting children if `personGeneration` isn't set to `"allow_all"` or if the project isn't on the allowlist for this feature. |
| `29310472` `15236754` | Celebrity | Rejects requests to generate a photorealistic representation of a prominent person or if the project isn't on the allowlist for this feature. |
| `64151117` `42237218` | Video safety violation | General safety violation. |
| `62263041` | Dangerous content | Potentially dangerous content. |
| `57734940` `22137204` | Hate | Hate-related content. |
| `74803281` `29578790` `42876398` | Other | Miscellaneous safety issues with the request |
| `89371032` `49114662` `63429089` `72817394` `60599140` | Prohibited content | Prohibited content related to child safety or other sensitive content. |
| `35561574` `35561575` | Third-party content | Guardrails related to third-party content. |
| `90789179` `43188360` | Sexual | Sexual or suggestive content. |
| `78610348` | Toxic | Toxic content. |
| `61493863` `56562880` | Violence | Violent content. |
| `32635315` | Vulgar | Vulgar content. |

## What's next

- Learn about [Responsible AI for Large Language Models
  (LLMs)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai)

- Learn more about Google's recommendations for [Responsible AI
  practices](https://ai.google/responsibilities/responsible-ai-practices/?category=general)

- Read our blog, [A shared agenda for responsible AI
  progress](https://blog.google/technology/ai/a-shared-agenda-for-responsible-ai-progress/)
