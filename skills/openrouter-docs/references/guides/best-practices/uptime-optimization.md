> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Uptime Optimization

> OpenRouter tracks provider availability

export const UptimeChart = ({permaslug}) => {
  const [graphs, setGraphs] = useState(null);
  const [didError, setDidError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const url = `https://openrouter.ai/api/frontend/v1/uptime-graphs?permaslug=${encodeURIComponent(permaslug)}`;
    fetch(url, {
      signal: controller.signal
    }).then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))).then(body => setGraphs(body.data ?? null)).catch(err => {
      if (err.name !== "AbortError") setDidError(true);
    });
    return () => controller.abort();
  }, [permaslug]);
  if (didError || graphs !== null && !graphs.comparisonGraphUrl) {
    return <p>Uptime data could not be retrieved at this time.</p>;
  }
  if (graphs === null) {
    return <div className="bg-muted h-80 w-full animate-pulse rounded-lg" />;
  }
  return <div className="border-border h-80 w-full overflow-hidden rounded-lg border">
      <iframe title="uptime comparison" src={`${graphs.comparisonGraphUrl}&height=320&width=800`} width="800" height="320" />
    </div>;
};

OpenRouter continuously monitors the health and availability of AI providers to ensure maximum uptime for your applications. We track response times, error rates, and availability across all providers in real-time, and route based on this feedback.

## How It Works

OpenRouter tracks response times, error rates, and availability across all providers in real-time. This data helps us make intelligent routing decisions and provides transparency about service reliability.

## Uptime Example: Claude Sonnet 4.6

<UptimeChart permaslug="anthropic/claude-4.6-sonnet-20260217" />

## Uptime Example: GLM 5.1

<UptimeChart permaslug="z-ai/glm-5.1-20260406" />

## Customizing Provider Selection

While our smart routing helps maintain high availability, you can also customize provider selection using request parameters. This gives you control over which providers handle your requests while still benefiting from automatic fallback when needed.

Learn more about customizing provider selection in our [Provider Routing documentation](/guides/routing/provider-selection).
