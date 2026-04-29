> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Uptime Optimization

OpenRouter continuously monitors the health and availability of AI providers to ensure maximum uptime for your applications. We track response times, error rates, and availability across all providers in real-time, and route based on this feedback.

## How It Works

OpenRouter tracks response times, error rates, and availability across all providers in real-time. This data helps us make intelligent routing decisions and provides transparency about service reliability.

## Uptime Example: Claude 4 Sonnet

<UptimeChart permaslug="anthropic/claude-4-sonnet-20250522" />

## Uptime Example: Llama 3.3 70B Instruct

<UptimeChart permaslug="meta-llama/llama-3.3-70b-instruct" />

## Customizing Provider Selection

While our smart routing helps maintain high availability, you can also customize provider selection using request parameters. This gives you control over which providers handle your requests while still benefiting from automatic fallback when needed.

Learn more about customizing provider selection in our [Provider Routing documentation](/docs/guides/routing/provider-selection).