> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Provider Logging

> Provider logging and data retention policies

export const ProviderDataRetentionTable = () => {
  const formatRetention = policy => {
    if (!policy || policy.retentionDays === undefined && policy.retainsPrompts === undefined) {
      return "Unknown retention policy";
    }
    if (policy.retainsPrompts) {
      if (policy.retentionDays === undefined) {
        return "Prompts are retained for unknown period";
      }
      return `Retained for ${policy.retentionDays} days`;
    }
    return "Zero retention";
  };
  const renderTrainingStatus = isTraining => isTraining ? <>
        <span className="text-red-500">✕</span> May train
      </> : <>
        <span className="text-green-500">✓</span> Does not train
      </>;
  const [providers, setProviders] = useState(null);
  const [didError, setDidError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://openrouter.ai/api/frontend/v1/all-providers", {
      signal: controller.signal
    }).then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))).then(body => setProviders(body.data ?? [])).catch(err => {
      if (err.name !== "AbortError") setDidError(true);
    });
    return () => controller.abort();
  }, []);
  if (didError) {
    return <p>Provider data-retention policies could not be retrieved at this time.</p>;
  }
  if (providers === null) {
    return <div className="bg-muted h-40 w-full animate-pulse rounded-lg" />;
  }
  const rows = [...providers].sort((a, b) => a.displayName.localeCompare(b.displayName));
  return <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>Data Retention</th>
          <th>Train on Prompts</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(provider => <tr key={provider.name}>
            <td>{provider.displayName}</td>
            <td>{formatRetention(provider.dataPolicy)}</td>
            <td>{renderTrainingStatus(Boolean(provider.dataPolicy?.training))}</td>
          </tr>)}
      </tbody>
    </table>;
};

Each AI provider on OpenRouter has its own data handling policies for logging and retention. This page explains how to control which providers can access your data.

## Provider Policies

### Training on Prompts

Each provider on OpenRouter has its own data handling policies. We reflect those policies in structured data on each AI endpoint that we offer.

On your account settings page, you can set whether you would like to allow routing to providers that may train on your data (according to their own policies). There are separate settings for paid and free models.

Wherever possible, OpenRouter works with providers to ensure that prompts will not be trained on, but there are exceptions. If you opt out of training in your account settings, OpenRouter will not route to providers that train. This setting has no bearing on OpenRouter's own policies and what we do with your prompts.

<Tip>
  **Data Policy Filtering**

  You can [restrict individual requests](/docs/guides/routing/provider-selection#requiring-providers-to-comply-with-data-policies)
  to only use providers with a certain data policy.

  This is also available as an account-wide setting in [your privacy settings](https://openrouter.ai/settings/privacy).
</Tip>

### Data Retention & Logging

Providers also have their own data retention policies, often for compliance reasons. OpenRouter does not have routing rules that change based on data retention policies of providers, but the retention policies as reflected in each provider's terms are shown below. Any user of OpenRouter can ignore providers that don't meet their own data retention requirements.

The full terms of service for each provider are linked from the provider's page, and aggregated in the [documentation](/docs/guides/routing/provider-selection#terms-of-service).

<ProviderDataRetentionTable />

<a id="enterprise-eu-in-region-routing" />

## Enterprise in-region routing

For enterprise customers, OpenRouter supports in-region routing in the EU and US. When enabled for your account, your prompts and completions are processed within the selected region and do not leave it. Use `https://eu.openrouter.ai` for EU requests or `https://us.openrouter.ai` for US requests. This feature is only enabled for enterprise customers by request.

<Info>
  **Regional models list**

  To see which models are available for regional routing, call `/api/v1/models/user` through the corresponding regional hostname. [Learn more](/docs/api/api-reference/models/list-models-filtered-by-user-provider-preferences-privacy-settings-and-guardrails)
</Info>

If you're interested, please contact our enterprise team at [https://openrouter.ai/enterprise/form](https://openrouter.ai/enterprise/form).
