> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Junie CLI

> Using OpenRouter with JetBrains Junie CLI

## Using Junie CLI with OpenRouter

[Junie CLI](https://junie.jetbrains.com/) is an agentic coding tool by JetBrains that provides an interactive terminal interface for developers to review, write, and modify code. By connecting Junie to OpenRouter, you can access hundreds of AI models from a single API key instead of managing separate keys for each provider.

### Why Use OpenRouter with Junie?

* **Access to hundreds of models** -- Use models from Anthropic, OpenAI, Google, SpaceXAI, Meta, and many more through a single API key
* **Provider failover** -- If one provider is unavailable or rate-limited, OpenRouter automatically routes to another
* **Centralized billing** -- Track and manage spending across all models from your [OpenRouter dashboard](https://openrouter.ai/activity)
* **Team controls** -- Set budgets and monitor usage across your organization

### Prerequisites

* [Junie CLI](https://junie.jetbrains.com/) installed (see [Step 1](#step-1-install-junie-cli) below)
* An [OpenRouter API key](https://openrouter.ai/settings/keys)

### Step 1: Install Junie CLI

<Tabs>
  <Tab title="Linux / macOS">
    ```bash lines theme={null}
    curl -fsSL https://junie.jetbrains.com/install.sh | bash
    ```
  </Tab>

  <Tab title="Windows">
    ```powershell lines theme={null}
    powershell -NoProfile -ExecutionPolicy Bypass -Command "iex (irm 'https://junie.jetbrains.com/install.ps1')"
    ```
  </Tab>

  <Tab title="Homebrew">
    ```bash lines theme={null}
    brew tap jetbrains-junie/junie
    brew update
    brew install junie
    ```
  </Tab>
</Tabs>

Verify the installation:

```bash lines theme={null}
junie --version
```

### Step 2: Configure OpenRouter

Junie supports OpenRouter as a built-in BYOK (Bring Your Own Key) provider. Set the `JUNIE_OPENROUTER_API_KEY` environment variable to connect Junie to OpenRouter:

<Tabs>
  <Tab title="Shell Profile (Recommended)">
    Add the environment variable to your shell profile for persistent configuration:

    ```bash lines theme={null}
    # Open your shell profile
    nano ~/.zshrc  # or ~/.bashrc for Bash users

    # Add this line:
    export JUNIE_OPENROUTER_API_KEY="<your-openrouter-api-key>"
    ```

    After saving, restart your terminal or run `source ~/.zshrc` for changes to take effect.
  </Tab>

  <Tab title="Inline">
    You can also pass the API key directly when running Junie:

    ```bash lines theme={null}
    junie --openrouter-api-key "<your-openrouter-api-key>"
    ```
  </Tab>

  <Tab title="CI/CD">
    In CI/CD pipelines, set the environment variable in your runner configuration:

    ```bash lines theme={null}
    export JUNIE_OPENROUTER_API_KEY="<your-openrouter-api-key>"
    junie "Review and fix any code quality issues in the latest commit"
    ```
  </Tab>
</Tabs>

<Note>
  Replace `<your-openrouter-api-key>` with your actual OpenRouter API key from the [API Keys page](https://openrouter.ai/settings/keys). Keys start with `sk-or-v1-`.
</Note>

### Step 3: Start Coding

Navigate to your project directory and start Junie:

```bash lines theme={null}
cd /path/to/your/project
junie
```

Type your prompt in the interactive CLI:

```text lines theme={null}
> give me an overview of this codebase
```

Use `@` to attach files or folders to the request context, and type `/` to see available slash commands.

### Headless Mode (CI/CD)

Junie supports a headless mode for non-interactive use in CI/CD pipelines. Combined with OpenRouter, this gives you centralized billing and model access for automated coding tasks:

```bash lines theme={null}
# Install Junie CLI
curl -fsSL https://junie.jetbrains.com/install.sh | bash

# Run Junie with OpenRouter in headless mode
export JUNIE_OPENROUTER_API_KEY="$OPENROUTER_API_KEY"
junie "Review and fix any code quality issues in the latest commit"
```

#### GitHub Actions Example

```yaml lines theme={null}
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 1
      - uses: JetBrains/junie-github-action@v0
        with:
          openrouter_api_key: ${{ secrets.OPENROUTER_API_KEY }}
          prompt: "code-review"
```

#### GitLab CI/CD Example

Follow the
[setup instructions](https://junie.jetbrains.com/docs/junie-gitlab-ci-cd.html)
to configure the Junie Workspace project, then add
`JUNIE_OPENROUTER_API_KEY` as a CI/CD variable. Once
set up, trigger reviews by commenting on any MR:

```text lines theme={null}
#junie code-review
```

### Verify Your Connection

After starting a session, check the [OpenRouter Activity Dashboard](https://openrouter.ai/activity) to confirm your requests are being routed through OpenRouter.

### Learn More

* **Junie CLI Documentation**: [junie.jetbrains.com/docs](https://junie.jetbrains.com/docs/junie-cli.html)
* **Junie Environment Variables**: [Environment Variables Reference](https://junie.jetbrains.com/docs/environment-variables.html)
* **OpenRouter Quick Start**: [Getting Started with OpenRouter](https://openrouter.ai/docs/quickstart)
* **Available Models**: [Browse OpenRouter Models](https://openrouter.ai/models)
