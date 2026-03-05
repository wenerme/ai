# Shell

The shell tool gives models the ability to work inside a complete terminal environment. We support shell for local execution and for hosted execution through the Responses API.

The shell tool lets models run commands through either:

- Hosted shell containers managed by OpenAI.
- [A local shell runtime](#local-shell-mode) that you host and execute yourself.

Shell is available through the [Responses API](https://developers.openai.com/api/docs/guides/responses-vs-chat-completions). It's not available via the Chat Completions API.

Running arbitrary shell commands can be dangerous. Always sandbox execution,
  apply allowlists or denylists where possible, and log tool activity for
  auditing.

## Hosted shell quickstart

Hosted shell is a native and streamlined option for tasks that need richer, deterministic processing, from running calculations to working with multimedia.

Use `container_auto` when you want OpenAI to provision and manage a container for the request.

Shell tool with container_auto

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.2",
  tools: [{ type: "shell", environment: { type: "container_auto" } }],
  input: [
    {
      type: "message",
      role: "user",
      content: [
        {
          type: "input_text",
          text: "Execute: ls -lah /mnt/data && python --version && node --version",
        },
      ],
    },
  ],
  tool_choice: "auto",
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    tools=[{"type": "shell", "environment": {"type": "container_auto"}}],
    input=[
        {
            "type": "message",
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Execute: ls -lah /mnt/data && python --version && node --version",
                }
            ],
        }
    ],
    tool_choice="auto",
)

print(response.output_text)
```


## Hosted runtime details

- Runtime is currently based on `Debian 12` and may change over time.
- Default working directory is `/mnt/data`.
- `/mnt/data` is always present and is the supported path for user-downloadable artifacts.
- Hosted shell doesn't support interactive TTY sessions.
- Hosted shell commands don't run with `sudo`.
- You can run services inside the container when your workflow needs them.

Current preinstalled languages include:

- Python `3.11`
- Node.js `22.16`
- Java `17.0`
- PHP `8.2`
- Ruby `3.1`
- Go `1.23`

## Reuse a container across requests

If you need a long-running environment for iterative workflows, create a container and then reference it in subsequent Responses API calls.

### 1. Create a container

Create a reusable container

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const container = await client.containers.create({
  name: "analysis-container",
  memory_limit: "1g",
  expires_after: { anchor: "last_active_at", minutes: 20 },
});

console.log(container.id);
```

```python
from openai import OpenAI

client = OpenAI()

container = client.containers.create(
    name="analysis-container",
    memory_limit="1g",
    expires_after={"anchor": "last_active_at", "minutes": 20},
)

print(container.id)
```


### 2. Reference the container in Responses

Use shell with container_reference

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.2",
  tools: [
    {
      type: "shell",
      environment: {
        type: "container_reference",
        container_id: "cntr_08f3d96c87a585390069118b594f7481a088b16cda7d9415fe",
      },
    },
  ],
  input: "List files in the container and show disk usage.",
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    tools=[
        {
            "type": "shell",
            "environment": {
                "type": "container_reference",
                "container_id": "cntr_08f3d96c87a585390069118b594f7481a088b16cda7d9415fe",
            },
        }
    ],
    input="List files in the container and show disk usage.",
)

print(response.output_text)
```


## Attach skills

Skills are reusable, versioned bundles that you can mount in hosted shell environments. This defines the available skills, and at shell execution time the model decides whether to invoke them.

Use the [Skills guide](https://developers.openai.com/api/docs/guides/tools-skills) for upload and versioning details.

Create a container with attached skills

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const container = await client.containers.create({
  name: "skill-container",
  skills: [
    { type: "skill_reference", skill_id: "skill_4db6f1a2c9e73508b41f9da06e2c7b5f" },
    { type: "skill_reference", skill_id: "openai-spreadsheets", version: "latest" },
  ],
});

console.log(container.id);
```

```python
from openai import OpenAI

client = OpenAI()

container = client.containers.create(
    name="skill-container",
    skills=[
        {"type": "skill_reference", "skill_id": "skill_4db6f1a2c9e73508b41f9da06e2c7b5f"},
        {"type": "skill_reference", "skill_id": "openai-spreadsheets", "version": "latest"},
    ],
)

print(container.id)
```


## Network access

Hosted containers don't have outbound network access by default.

To enable it:

1. An admin must configure your org allow list in the dashboard.
2. You must explicitly set `network_policy` on the container environment in your request.

Shell tool with network allowlist

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.2",
  tool_choice: "required",
  tools: [
    {
      type: "shell",
      environment: {
        type: "container_auto",
        network_policy: {
          type: "allowlist",
          allowed_domains: ["pypi.org", "files.pythonhosted.org", "github.com"],
        },
      },
    },
  ],
  input: [
    {
      role: "user",
      content:
        "In the container, pip install httpx beautifulsoup4, fetch release pages, and write /mnt/data/release_digest.md.",
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    tool_choice="required",
    tools=[
        {
            "type": "shell",
            "environment": {
                "type": "container_auto",
                "network_policy": {
                    "type": "allowlist",
                    "allowed_domains": ["pypi.org", "files.pythonhosted.org", "github.com"],
                },
            },
        }
    ],
    input=[
        {
            "role": "user",
            "content": "In the container, pip install httpx beautifulsoup4, fetch release pages, and write /mnt/data/release_digest.md.",
        }
    ],
)

print(response.output_text)
```


Allowlisting domains introduces security risks such as prompt
  injection-driven data exfiltration. Only allowlist domains you trust and that
  attackers cannot use to receive exfiltrated data. Carefully review the [Risks
  and safety](#risks-and-safety) section below before using this tool.

## Network policy precedence

When multiple controls are present:

- Your org allow list defines the full set of `allowed_domains`.
- Request-level `network_policy` further restricts access.
- Requests fail if `allowed_domains` includes domains outside your org allow list.

## Domain secrets

Use `domain_secrets` when a domain in your `allowed_domains` list requires private authorization headers, such as `Authorization: Bearer <token>`.

Each secret entry includes:

- Target domain
- Friendly secret name
- Secret value

At runtime:

- The model and runtime see placeholder names (for example, `$API_KEY`) instead of raw credentials.
- The auth-translation sidecar applies raw secret values only for approved destinations.
- Raw secret values don't persist on API servers and don't appear in model-visible context.

This lets the assistant call protected services while reducing leakage risk.

Shell tool with domain_secrets

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.2",
  input: [
    {
      role: "user",
      content:
        "Use curl to call https://httpbin.org/headers with header Authorization: Bearer $API_KEY. Tell me what you see in the final text response.",
    },
  ],
  tool_choice: "required",
  tools: [
    {
      type: "shell",
      environment: {
        type: "container_auto",
        network_policy: {
          type: "allowlist",
          allowed_domains: ["httpbin.org"],
          domain_secrets: [
            {
              domain: "httpbin.org",
              name: "API_KEY",
              value: "debug-secret-123",
            },
          ],
        },
      },
    },
  ],
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    input=[
        {
            "role": "user",
            "content": "Use curl to call https://httpbin.org/headers with header Authorization: Bearer $API_KEY. Tell me what you see in the final text response.",
        }
    ],
    tool_choice="required",
    tools=[
        {
            "type": "shell",
            "environment": {
                "type": "container_auto",
                "network_policy": {
                    "type": "allowlist",
                    "allowed_domains": ["httpbin.org"],
                    "domain_secrets": [
                        {
                            "domain": "httpbin.org",
                            "name": "API_KEY",
                            "value": "debug-secret-123",
                        }
                    ],
                },
            },
        }
    ],
)

print(response.output_text)
```


## Multi-turn workflows

To continue work in the same hosted environment, reuse the container and pass `previous_response_id`.

Continue a shell workflow

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.2",
  previous_response_id: "resp_2a8e5c9174d63b0f18a4c572de9f64a1b3c76d508e12f9ab47",
  tools: [
    {
      type: "shell",
      environment: {
        type: "container_reference",
        container_id: "cntr_f19c2b51e4a06793d82d54a7be0fc9154d3361ab28ce7f6041",
      },
    },
  ],
  input: "Read /mnt/data/top5.csv and report the top candidate.",
});

console.log(response.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    previous_response_id="resp_2a8e5c9174d63b0f18a4c572de9f64a1b3c76d508e12f9ab47",
    tools=[
        {
            "type": "shell",
            "environment": {
                "type": "container_reference",
                "container_id": "cntr_f19c2b51e4a06793d82d54a7be0fc9154d3361ab28ce7f6041",
            },
        }
    ],
    input="Read /mnt/data/top5.csv and report the top candidate.",
)

print(response.output_text)
```


## Download artifacts

Hosted shell can produce downloadable files. Use the same container/files APIs as code interpreter to retrieve artifacts written under `/mnt/data`.

### Data retention and container lifecycle

Hosted shell runs in OpenAI-hosted containers. If your org or project enables Zero Data Retention (ZDR), OpenAI-hosted containers aren't available, so hosted shell can't run in ZDR mode. Hosted shell and Code Interpreter work with Modified Abuse Monitoring (MAM) instead.

If you need shell execution while using ZDR, use [local shell mode](#local-shell-mode) so commands run in infrastructure you manage.

For data controls details, see [ZDR and data residency](https://developers.openai.com/api/docs/guides/your-data).

Hosted shell uses the same container lifecycle as Code Interpreter. Treat hosted containers as ephemeral and store any data you need on your own systems. Files and artifacts created or uploaded in hosted shell live in the container filesystem (for example, under `/mnt/data`) while the container is active so you can reuse the container and download artifacts.

- A hosted shell container expires after 20 minutes of inactivity. Download any files you need while the container is active. When the container expires, OpenAI discards the container data and you can't recover it.
- You can't reactivate an expired container. Create a new container and upload files again.

## Shell output in Responses

Hosted shell and local shell use the same output item types. Shell runs are represented by paired output items:

- `shell_call`: commands requested by the model.
- `shell_call_output`: command output and exit outcomes.

## Local shell mode

You can also run shell commands in your own local runtime by executing `shell_call` actions and sending `shell_call_output` back to the model.

Use this mode when you need full control over execution environment, filesystem access, or existing internal tooling.

When you receive `shell_call` output items:

- Execute requested commands in your runtime.
- Capture `stdout`, `stderr`, and outcome.
- Return results as `shell_call_output` in the next request.

For legacy migration details, see the older [Local shell guide](https://developers.openai.com/api/docs/guides/tools-local-shell).

## Use local shell with Agents SDK

If you are using the [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk), you can pass your own shell executor implementation to the shell tool helper.

You can find working examples in the SDK repositories.

<a href="https://github.com/openai/openai-agents-js/blob/main/examples/tools/shell.ts" target="_blank" rel="noreferrer">
  

<span slot="icon">
      </span>
    TypeScript example for the shell tool in the Agents SDK.


</a>

<a href="https://github.com/openai/openai-agents-python/blob/main/examples/tools/shell.py" target="_blank" rel="noreferrer">
  

<span slot="icon">
      </span>
    Python example for the shell tool in the Agents SDK.


</a>

## Handling common errors

- If a command exceeds your execution timeout, return a timeout outcome and include partial captured output.
- If `max_output_length` is present on `shell_call`, include it in `shell_call_output`.
- Don't rely on interactive commands; shell tool execution should be non-interactive.
- Preserve non-zero exit outputs so the model can reason about recovery steps.

## Risks and safety

Enabling network access in the Containers API is a powerful capability, and it introduces meaningful security and data-governance risk. By default, network access isn't enabled. When enabled, outbound access should remain tightly scoped to trusted domains needed for the task.

Network-enabled containers can interact with third-party services and package registries. That creates risks including data leakage, prompt-injection-driven tool misuse, and accidental access beyond intended boundaries. These risks increase when policies are broad, static, or inconsistently enforced.

#### Understand prompt injection risks from network-retrieved content

Any external content fetched over the network may contain hidden instructions intended to manipulate model behavior. Treat untrusted network content as potentially adversarial, and require additional caution for actions that can modify data or systems.

#### Connect only to trusted destinations

Allow only domains you trust and actively maintain. Be cautious with intermediaries and aggregators that proxy to other services, and review their data handling and retention practices before you add them to your allowed domains list.

#### Build in reviews before and after requests are executed

Review the shell tool command and execution output, which are provided in the Responses API response. Capture requested hosts and actual outbound destinations for each session. Periodically review logs to verify access patterns match expectations, detect drift, and identify suspicious behavior.

#### Validate data residency and retention requirements

[OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data) apply within OpenAI boundaries. However, data transmitted to third-party services over network connections is subject to their data retention policies. Ensure external endpoints meet your residency, retention, and compliance requirements.