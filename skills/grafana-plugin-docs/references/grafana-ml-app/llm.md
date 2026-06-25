---
title: "LLM plugin | Grafana Plugins documentation"
description: "Install and configure this plugin to enable LLM-powered features across Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# LLM plugin

Grafana Cloud offers a range of optional features that leverage Large Language Model (LLM) services. These features are not enabled by default, but you can easily activate them in the Grafana LLM app plugin by approving limited data sharing with the OpenAI API.

The Grafana LLM app centralizes access to Large Language Model (LLM) services across Grafana to secure and simplify your LLM interactions.

The Grafana LLM application plugin serves several key functions:

- Acts as a proxy, handling authenticated requests to LLMs. This eliminates the requirement for other Grafana components to manage API keys.
- Enables real-time streaming interactions on the Grafana front end by offering live streams of responses from the LLM provider.

If you prefer, you may also configure your own API authentication using one of these options:

- OpenAI API directly
- OpenAI-compatible services (such as Azure OpenAI)
- Anthropic’s Claude models
- Custom APIs with OpenAI-like signatures (e.g. vLLM, ollama, LMStudio, or LiteLLM)

With any of these options, the LLM app securely stores your API keys.

## What can it do?

Unlock the potential of Grafana LLM plugin with features like:

- [AI-powered flamegraph interpretation](https://pyroscope.io/blog/ai-powered-flamegraph-interpreter/)
- [Incident Auto-summary](/docs/grafana-cloud/alerting-and-irm/incident/configure/integrations/configure-open-ai/)
- Dashboard panel title and description generation
- Explanations of error log lines in [Sift](/docs/grafana-cloud/alerting-and-irm/machine-learning/sift/)

## Data privacy and storage for Grafana OpenAI integrations

At Grafana Labs, we take your data privacy very seriously and have built-in processes in place to safeguard your data. Still, be sure to align its usage with your organization’s internal policies before configuring an OpenAI integration.

**Data sharing details:** When you click **Generate auto-summary**, Grafana Labs sanitizes and compresses the incident’s timeline before processing it with OpenAI, an external third party. OpenAI does not share this data with any third parties or use it for model training purposes.

**Data usage and storage:** As per OpenAI’s API [data usage policy](https://openai.com/policies/api-data-usage-policies), your data is only temporarily stored to monitor and prevent abuse or misuse.
