---
title: "Enable LLM features | Grafana Plugins documentation"
description: "Install and configure this plugin to enable LLM-powered features across Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Enable LLM features

## Before you begin

To activate Grafana LLM features, you need an [Admin role](/docs/grafana/latest/administration/roles-and-permissions/) in a Grafana Cloud account, including the free tier.

Enterprise or OSS versions of Grafana can also use the LLM app, but won’t have access to the LLM provider built into Cloud. Install the Grafana LLM plugin using the standard plugin installation method for your Grafana version, and bring API authentication for LLM access from an OpenAI compatible service. You can obtain an OpenAI API key from [OpenAI’s platform](https://platform.openai.com/), or Azure OpenAI authentication from the [Azure OpenAI service](https://azure.microsoft.com/products/ai-services/openai-service/).

For more information, refer to the [Plugin management documentation](/docs/grafana/latest/administration/plugin-management/).

> Note
>
> Grafana’s LLM features depend on Grafana Live being enabled (this is the default). If you attempt to enable the features without Grafana Live enabled you’ll see a warning in the plugin.
>
> See the [`max_connections` setting](/docs/grafana/latest/setup-grafana/configure-grafana/#max_connections) for details on how to ensure Grafana Live is enabled.

## Configure the LLM plugin

1. In Grafana Cloud, click **Administration** &gt; **Plugins and data** &gt; **Plugins** in the side navigation menu.
2. Browse or search for the **LLM** plugin and click to open it.
3. On the **Configuration** tab, select **Enable OpenAI access via Grafana**.
4. Click to permit Grafana Labs to share limited data with OpenAI’s API (not for training, and only to provide these features).
5. Click **Save settings**.

## Use a custom LLM provider

> Support for custom LLM providers was added in 0.10.0.

You have several options for configuring LLM providers in Grafana:

1. **Install the Plugin**: [Download the Grafana LLM plugin](/grafana/plugins/grafana-llm-app/).
2. **Choose your provider and set up API access**:

   - **OpenAI (Grafana provided)**: Use OpenAI’s services through Grafana Cloud
   - **OpenAI API**: Obtain an API key from [OpenAI’s platform](https://platform.openai.com/)
   - **OpenAI-compatible API**: Set up authentication for services like Azure OpenAI
   - **Anthropic API**: Obtain an API key from [Anthropic’s platform](https://console.anthropic.com/)
   - **Custom API**: Prepare your OpenAI-compatible API server (e.g., vLLM, ollama, LMStudio, or LiteLLM)
3. **Configure the Plugin**:

   - For OpenAI-compatible or Custom APIs: Set the API URL (e.g., `https://your-azure-endpoint` or `http://vllm.internal.url:8000/`)
   - Enter your API key when required
   - In Model Settings &gt; Model mappings, configure the `Base` and `Large` models with your preferred ones (e.g. `gpt-4o` and `gpt-4o-mini`, `claude-3-5-sonnet` and `claude-3-5-haiku` or `llama3-8b-8192` and `llama3-70b-8192`)
