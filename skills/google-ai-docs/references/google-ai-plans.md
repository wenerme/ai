Use your Google AI subscription plan in AI Studio.

Google AI Pro and Ultra subscription plans provide greater model access and
increased rate limits for prototyping and development in AI Studio compared to
the free tier.

To sign up for a Google AI plan, you can upgrade directly from within
Google AI Studio by clicking the **Upgrade** button in the left navigation
menu. Alternatively, you can sign up by visiting the
[Google AI Plans page](https://one.google.com/about/google-ai-plans/).

## Overview

Google AI Pro and Ultra subscriptions enable developers to unlock paid
models and higher rate limits in the Google AI Studio Playground and features
like the Code Assistant in [Build mode](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)
for vibe coding. Subscribers receive baseline daily quota allowances
higher than the free tier for use across the
[Playground](https://aistudio.google.com/prompts/new_chat) and
[Build](https://aistudio.google.com/apps) interfaces. Daily limits are
enforced using resets rather than rolling time windows, ensuring a smooth
development experience before transitioning to production-scale
development with Cloud Billing.

| Plan | AI Studio usage | Model access and benefits |
|---|---|---|
| **Free** | Modest quota | Basic limits and access, with the option to upgrade for more. |
| **AI Pro** | Higher quota | Access to premium models like Gemini Pro, Nano Banana, and Lyria. |
| **AI Ultra** | Highest quota | Highest limits for prototyping, development, and advanced frontier models. |

## Gemini API usage

When daily baseline subscription quotas are exhausted in AI Studio,
you can continue your workflows using a Gemini API key with Cloud
Billing enabled for pay-per-request usage of the Gemini API directly.
Gemini API usage for projects and API keys can be observed in the
[AI Studio Dashboard](https://aistudio.google.com/projects).

Subscribers with Google Cloud Platform (GCP) projects and Cloud Billing
enabled are eligible to receive monthly Cloud credits from the
[Google Developer Program](https://developers.google.com/program)
for Cloud services, including the Gemini API. Prepay and postpay
usage and billing remain unchanged. For users on prepay billing, a
paid balance greater than $0 is required in AI Studio to activate promotional
credits. Eligible Google Cloud credits, if any, are applied first.
[Learn more](https://ai.google.dev/gemini-api/docs/billing#billing-plans).

Google AI subscription integration lowers the barrier to entry for
advanced experimentation and development. However, for production
deployments at scale, Google Cloud projects, the
[Google Cloud Starter Tier](https://cloud.google.com/blog/topics/developers-practitioners/the-starter-tier-for-google-ai-studio-explained),
and Gemini API keys are the recommended path.

## Limitations and compatibility

- **AI Studio UI only:** Google AI plan benefits for developer usage apply only within the Google AI Studio web interface. Direct use of the Gemini API (such as using API keys or external applications) is billed and managed separately. You can, however, use your subscription across other Google products (see [Google AI Plans](https://one.google.com/about/google-ai-plans/)).
- **Different from API billing:** Google AI plans for AI Studio are separate from [Gemini API usage tiers](https://ai.google.dev/gemini-api/docs/billing), which cover development and production API usage.
- **Google One credits:** [Google One AI credits](https://support.google.com/googleone/answer/16287445) are a separate credit system that isn't supported within AI Studio and don't overlap with Google Cloud credits.
- **Agent access:** Access to agents (Deep Research and Antigravity Preview) within AI Studio is not included in Google AI plans and requires a [paid API key](https://ai.google.dev/gemini-api/docs/billing#setup-billing).