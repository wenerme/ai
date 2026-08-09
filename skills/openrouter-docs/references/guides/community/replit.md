> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Replit

> Using OpenRouter with Replit Agent and Replit Apps

## Using OpenRouter with Replit

[Replit](https://replit.com/) lets you build, deploy, and host applications directly in the browser. You can use OpenRouter with Replit in two ways:

1. **Replit Agent (BYOK)**, which lets you use your own OpenRouter API key when Replit Agent builds AI features for you, instead of the Replit-managed default.
2. **Replit Apps (project Secrets)**, which let you store your OpenRouter API key as a Secret in any Replit App and call OpenRouter from your code.

For background on Replit's managed AI options, see Replit's [AI Integrations documentation](https://docs.replit.com/replitai/replit-ai-integrations).

### Prerequisites

You'll need an OpenRouter API key. Create one at [openrouter.ai/keys](https://openrouter.ai/settings/keys) and copy the key (it starts with `sk-or-v1-`).

## Using your OpenRouter API key with Replit Agent

By default, when Replit Agent detects that your prompt needs AI functionality, it uses Replit-managed credentials and bills usage to your Replit account. If you'd rather use your own OpenRouter account (for direct billing, a custom rate limit, or access to a wider set of models), you can bring your own API key.

### For new Replit Apps

When you submit your initial prompt to create a new app, include that you want to use your own OpenRouter API key. For example:

> Build a chat app that uses my own OpenRouter API key.

In the Agent's response, the provider name will appear without the "(Replit managed)" suffix, which indicates Agent will request your OpenRouter API key. Agent typically builds through the first checkpoint and then prompts you for the key.

### For existing Replit Apps

When Agent detects that you want to add AI functionality to an existing app, it shows a confirmation prompt asking to use Replit AI Integrations with Replit-managed credentials. To use OpenRouter directly instead:

1. Click **Dismiss** on the integration prompt.
2. Let Agent build through the first checkpoint.
3. When Agent asks for an API key, paste your OpenRouter key from [openrouter.ai/keys](https://openrouter.ai/settings/keys).

Agent will store the key as a Secret in your project (typically named `OPENROUTER_API_KEY`) and wire it into the generated code.

<Tip>
  Usage made with your own OpenRouter API key is billed by OpenRouter, not by Replit. You can monitor spend and set per-key limits from the [API Keys page](https://openrouter.ai/settings/keys).
</Tip>

## Adding your OpenRouter API key as a Replit Secret

If you're writing code in a Replit App yourself (without going through Agent), add your OpenRouter API key as a project Secret so it's available as an environment variable at runtime.

1. Open your Replit App.
2. In the left sidebar, open the **Secrets** tool (it looks like a padlock icon).
3. Click **New Secret**.
4. Set the **Key** to `OPENROUTER_API_KEY`.
5. Set the **Value** to your OpenRouter API key (for example, `sk-or-v1-...`).
6. Click **Add Secret**.

The secret is now available to your app as `process.env.OPENROUTER_API_KEY` (Node.js) or `os.environ["OPENROUTER_API_KEY"]` (Python). Secrets are not exposed in your source files and are scoped per project.

### Calling OpenRouter from your code

Once the secret is configured, you can call OpenRouter using any OpenAI-compatible SDK by pointing it at `https://openrouter.ai/api/v1`.

<CodeGroup>
  ```typescript title="TypeScript" lines theme={null}
  import OpenAI from "openai";

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const completion = await client.chat.completions.create({
    model: "anthropic/claude-sonnet-4.5",
    messages: [{ role: "user", content: "Hello from Replit!" }],
  });

  console.log(completion.choices[0].message);
  ```

  ```python title="Python" lines theme={null}
  import os
  from openai import OpenAI

  client = OpenAI(
      base_url="https://openrouter.ai/api/v1",
      api_key=os.environ["OPENROUTER_API_KEY"],
  )

  completion = client.chat.completions.create(
      model="anthropic/claude-sonnet-4.5",
      messages=[{"role": "user", "content": "Hello from Replit!"}],
  )

  print(completion.choices[0].message)
  ```
</CodeGroup>

For framework-specific examples (Vercel AI SDK, LangChain, Anthropic SDK, and more), see the [Frameworks and Integrations](/docs/guides/community/frameworks-and-integrations-overview) overview.

## Replit Deployments and Teams

When you publish a Replit App as a Deployment, the Secrets you configure in your Replit App carry over to the deployed app. Update the `OPENROUTER_API_KEY` secret in the Deployment's settings if you want to rotate keys without redeploying code.

For Teams and Enterprise organizations on Replit, your organization admin controls whether Replit AI Integrations is enabled. If it's disabled (or if you prefer not to use Replit-managed credentials), every member can still bring their own OpenRouter API key using the steps above.

## Resources

* [Replit AI Integrations documentation](https://docs.replit.com/replitai/replit-ai-integrations)
* [Replit Secrets documentation](https://docs.replit.com/replit-workspace/workspace-features/secrets)
* [OpenRouter Quick Start](/docs/quickstart)
* [Browse OpenRouter models](https://openrouter.ai/models)
* [Manage your API keys](https://openrouter.ai/settings/keys)
