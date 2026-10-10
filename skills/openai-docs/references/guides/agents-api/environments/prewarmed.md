# Pre-warm sandboxes

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Pre-warmed environments let you create an OpenAI-hosted sandbox, install packages, load files, and run setup commands before creating an agent session. When a task arrives, attach the prepared environment to a session and start the agent.

Use pre-warming when low latency is a core requirement. For example, a reporting app can prepare its Python dependencies while a user chooses a dataset, or a coding workflow can prepare its workspace while a user writes a request. Starting setup earlier can reduce how much of that work the user waits for.

## How it works

An environment is the workspace where the agent runs tools. A session holds the agent configuration and conversation. Pre-warming lets you prepare the workspace independently, then attach it when you need a session.

The workflow has three steps:

1. **Create an environment.** Supply the packages, files, and setup commands your task needs.
2. **Wait for readiness.** Retrieve the environment until its status is `ready`, or use a webhook.
3. **Start a session.** Pass the environment ID when creating the session.

You can also attach an environment while setup is still running. The agent's access to the workspace waits for setup to finish.

## Pricing

Pre-warming a sandbox is free, including container usage before attachment. Unattached pre-warmed sandboxes expire after five minutes.

After you attach a pre-warmed sandbox to a session, standard [container pricing](https://developers.openai.com/api/docs/pricing#container-usage-pricing) applies.

## Prepare a reporting workspace

This example installs pandas and loads a small CSV before starting an agent. The agent then uses the prepared workspace to calculate the total.

The create and attach examples require Python SDK 3.27.0, Node.js SDK 7.31.0, Java SDK 4.79.0, or Ruby SDK 0.102.0 or later. Upgrade your SDK if these methods are unavailable.

### 1. Create the environment

Send the workspace configuration to `POST /v1/agents/environments`:

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const environment = await client.beta.agents.environments.create({
  environment: {
    type: "openai_hosted",
    packages: { python: ["pandas==2.2.3"] },
    files: [
      {
        type: "inline",
        path: "/workspace/amounts.csv",
        data: "YW1vdW50CjEwCjIwCjMwCg==",
      },
    ],
    setup_commands: [
      {
        command: 'python -c "import pandas; print(pandas.__version__)"',
        cwd: "/workspace",
      },
    ],
  },
});
const environmentId = environment.id;
console.log(environmentId);
```

```python
from openai import OpenAI

client = OpenAI()
environment = client.beta.agents.environments.create(
    environment={
        "type": "openai_hosted",
        "packages": {"python": ["pandas==2.2.3"]},
        "files": [
            {
                "type": "inline",
                "path": "/workspace/amounts.csv",
                "data": "YW1vdW50CjEwCjIwCjMwCg==",
            }
        ],
        "setup_commands": [
            {
                "command": 'python -c "import pandas; print(pandas.__version__)"',
                "cwd": "/workspace",
            }
        ],
    }
)
environment_id = environment.id
print(environment_id)
```

```java
import com.openai.client.okhttp.OpenAIOkHttpClient;

import com.openai.models.beta.agents.HostedEnvironmentFileParam;
import com.openai.models.beta.agents.SetupCommandParam;
import com.openai.models.beta.agents.environments.EnvironmentCreateParams;

var client = OpenAIOkHttpClient.fromEnv();
var environment =
    client
        .beta()
        .agents()
        .environments()
        .create(
            EnvironmentCreateParams.builder()
                .environment(
                    EnvironmentCreateParams.Environment.builder()
                        .packages(
                            EnvironmentCreateParams.Environment.Packages.builder()
                                .addPython("pandas==2.2.3")
                                .build())
                        .addFile(
                            HostedEnvironmentFileParam.Inline.builder()
                                .path("/workspace/amounts.csv")
                                .data("YW1vdW50CjEwCjIwCjMwCg==")
                                .build())
                        .addSetupCommand(
                            SetupCommandParam.builder()
                                .command(
                                    "python -c \"import pandas; print(pandas.__version__)\"")
                                .cwd("/workspace")
                                .build())
                        .build())
                .build());
String environmentId = environment.id();
System.out.println(environmentId);
```

```ruby
require "openai"

client = OpenAI::Client.new
environment = client.beta.agents.environments.create(
  environment: {
    type: :openai_hosted,
    packages: { python: ["pandas==2.2.3"] },
    files: [
      {
        type: :inline,
        path: "/workspace/amounts.csv",
        data: "YW1vdW50CjEwCjIwCjMwCg=="
      }
    ],
    setup_commands: [
      {
        command: 'python -c "import pandas; print(pandas.__version__)"',
        cwd: "/workspace"
      }
    ]
  }
)
environment_id = environment.id
puts environment_id
```

```bash
curl https://api.openai.com/v1/agents/environments \\\n  -H "OpenAI-Beta: agents=v1" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "environment": {\n      "type": "openai_hosted",\n      "packages": {\n        "python": ["pandas==2.2.3"]\n      },\n      "files": [\n        {\n          "type": "inline",\n          "path": "/workspace/amounts.csv",\n          "data": "YW1vdW50CjEwCjIwCjMwCg=="\n        }\n      ],\n      "setup_commands": [\n        {\n          "command": "python -c \\"import pandas; print(pandas.__version__)\\"",\n          "cwd": "/workspace"\n        }\n      ]\n    }\n  }\'
```


The SDK examples save the returned `id` for the next steps. If you use cURL, save it in a shell variable:

```bash
ENVIRONMENT_ID="ccarenv_REPLACE_WITH_RETURNED_ID"
```

Set `environment.type` to `openai_hosted` when creating a standalone environment.

### 2. Check readiness

Retrieve the environment using the ID saved in step 1:

```javascript
const current = await client.beta.agents.environments.retrieve(environmentId);
console.log(current.status);
```

```python
current = client.beta.agents.environments.retrieve(environment_id)
print(current.status)
```

```go
current, err := client.Beta.Agents.Environments.Get(context.Background(), environmentID)
if err != nil {
	panic(err)
}
fmt.Println(current.Status)
```

```java
var current = client.beta().agents().environments().retrieve(environmentId);
System.out.println(current.status());
```

```ruby
current = client.beta.agents.environments.retrieve(environment_id)
puts current.status
```

```bash
curl \\\n  "https://api.openai.com/v1/agents/environments/$ENVIRONMENT_ID" \\\n  -H "OpenAI-Beta: agents=v1" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY"
```


While setup is running, the status is `pending`. When it becomes `ready`, the workspace is prepared and can be attached to a session.

Readiness does not mean an agent is connected. The environment can be `ready` before a session exists.

To avoid polling, subscribe a project webhook endpoint to:

- `agent.environment.ready`
- `agent.environment.failed`

If you attach the environment before setup finishes, follow the session's `agent.session.environment.ready` or `agent.session.environment.failed` events for setup status. Use the response stream from creating the session with `"stream": true`, or open `GET /v1/agents/sessions/{session_id}/events`. See [Session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events) for streaming details.

### 3. Attach the environment and run a task

Create a session with the saved environment ID, an agent, and its first input:

```javascript
const stream = await client.beta.agents.sessions.create({
  agent: { model: "gpt-6-astra" },
  environment: { type: "openai_hosted", environment_id: environmentId },
  input:
    "Use pandas to read /workspace/amounts.csv, calculate the sum of the amount column, and report the total.",
  stream: true,
});
try {
  for await (const event of stream) {
    console.log(event);
  }
} finally {
  stream.controller.abort();
}
```

```python
stream = client.beta.agents.sessions.create(
    agent={"model": "gpt-6-astra"},
    environment={"type": "openai_hosted", "environment_id": environment_id},
    input="Use pandas to read /workspace/amounts.csv, calculate the sum of the amount column, and report the total.",
    stream=True,
)
with stream:
    for event in stream:
        print(event.model_dump_json())
```

```java
import com.openai.models.beta.agents.EnvironmentParam;

import com.openai.models.beta.agents.sessions.SessionCreateParams;

var params =
    SessionCreateParams.builder()
        .agent(SessionCreateParams.Agent.builder().model("gpt-6-astra").build())
        .environment(
            EnvironmentParam.OpenAIHosted.builder().environmentId(environmentId).build())
        .input(
            "Use pandas to read /workspace/amounts.csv, calculate the sum of the amount column, and report the total.")
        .build();
try (var stream = client.beta().agents().sessions().createStreaming(params)) {
  stream.stream().forEach(System.out::println);
}
```

```ruby
stream = client.beta.agents.sessions.create_streaming(
  agent: { model: "gpt-6-astra" },
  environment: {
    type: :openai_hosted,
    environment_id: environment_id
  },
  input: "Use pandas to read /workspace/amounts.csv, calculate the sum of the amount column, and report the total."
)
begin
  stream.each { |event| puts event.to_json }
ensure
  stream.close
end
```

```bash
curl --no-buffer https://api.openai.com/v1/agents/sessions \\\n  -H "OpenAI-Beta: agents=v1" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  --data-binary @- <<EOF\n{\n  "agent": {\n    "model": "gpt-6-astra"\n  },\n  "environment": {\n    "type": "openai_hosted",\n    "environment_id": "$ENVIRONMENT_ID"\n  },\n  "input": "Use pandas to read /workspace/amounts.csv, calculate the sum of the amount column, and report the total.",\n  "stream": true\n}\nEOF
```


## Common errors

Use the error message and the environment's current status to choose a recovery step.

A newly created shared environment supports up to 128 attached sessions. Reusing it across sessions is supported; those sessions share the workspace. Older environments can still have a single-session lifecycle.

| Error or symptom                                         | How to resolve                                                                                                                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Attaching an expired environment.                        | Create a new environment and use its new ID. Unused environments expire after approximately five minutes. Retrying an expired ID will not restore its workspace.                            |
| `404`: environment not found.                            | Check the environment ID and use the same organization, project, and creating identity as the creation request. If the environment has expired or is no longer available, create a new one. |
| `409`: shared environment has reached its session limit. | A shared environment supports up to 128 attached sessions. Reuse an existing session or create another environment for additional sessions.                                                 |

## Use a saved environment template

If multiple tasks need the same packages and setup, [save an environment configuration as a template](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/environments/subresources/templates/methods/create), then supply its ID when creating each pre-warmed environment:

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const environment = await client.beta.agents.environments.create({
  environment: {
    type: "openai_hosted",
    environment_template_id: "envtmpl_REPLACE_WITH_TEMPLATE_ID",
  },
});
console.log(environment.id);
```

```python
from openai import OpenAI

client = OpenAI()
environment = client.beta.agents.environments.create(
    environment={
        "type": "openai_hosted",
        "environment_template_id": "envtmpl_REPLACE_WITH_TEMPLATE_ID",
    }
)
print(environment.id)
```

```java
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.environments.EnvironmentCreateParams;

var client = OpenAIOkHttpClient.fromEnv();
var environment =
    client
        .beta()
        .agents()
        .environments()
        .create(
            EnvironmentCreateParams.builder()
                .environment(
                    EnvironmentCreateParams.Environment.builder()
                        .environmentTemplateId("envtmpl_REPLACE_WITH_TEMPLATE_ID")
                        .build())
                .build());
System.out.println(environment.id());
```

```ruby
require "openai"

client = OpenAI::Client.new
environment = client.beta.agents.environments.create(
  environment: {
    type: :openai_hosted,
    environment_template_id: "envtmpl_REPLACE_WITH_TEMPLATE_ID"
  }
)
puts environment.id
```

```bash
curl https://api.openai.com/v1/agents/environments \\\n  -H "OpenAI-Beta: agents=v1" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n  "environment": {\n    "type": "openai_hosted",\n    "environment_template_id": "envtmpl_REPLACE_WITH_TEMPLATE_ID"\n  }\n}\'
```


## Prewarm a sandbox for computer use

For browser tasks, prepare the managed browser and virtual display before the session starts. Include `desktop.enabled` when creating the environment:

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const environment = await client.beta.agents.environments.create({
  environment: {
    type: "openai_hosted",
    desktop: { enabled: true },
  },
});
console.log(environment.id);
```

```python
from openai import OpenAI

client = OpenAI()
environment = client.beta.agents.environments.create(
    environment={
        "type": "openai_hosted",
        "desktop": {"enabled": True},
    }
)
print(environment.id)
```

```java
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.environments.EnvironmentCreateParams;

var client = OpenAIOkHttpClient.fromEnv();
var environment =
    client
        .beta()
        .agents()
        .environments()
        .create(
            EnvironmentCreateParams.builder()
                .environment(
                    EnvironmentCreateParams.Environment.builder()
                        .desktop(
                            EnvironmentCreateParams.Environment.Desktop.builder()
                                .enabled(true)
                                .build())
                        .build())
                .build());
System.out.println(environment.id());
```

```ruby
require "openai"

client = OpenAI::Client.new
environment = client.beta.agents.environments.create(
  environment: {
    type: :openai_hosted,
    desktop: { enabled: true }
  }
)
puts environment.id
```

```bash
curl https://api.openai.com/v1/agents/environments \\\n  -H "OpenAI-Beta: agents=v1" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n  "environment": {\n    "type": "openai_hosted",\n    "desktop": {\n      "enabled": true\n    }\n  }\n}\'
```


When creating a session, attach the saved environment ID and give the agent the `computer_use` tool. The session uses the environment's saved desktop configuration. See [Computer use](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use) for tool configuration and browser-origin approvals.

## List your environments

Use `GET /v1/agents/environments` to find active environments created by your identity in the current organization and project:

```javascript
const environments = await client.beta.agents.environments.list({
  limit: 20,
  order: "desc",
});
console.log(environments.data);
```

```python
environments = client.beta.agents.environments.list(limit=20, order="desc")
for item in environments.data:
    print(item.model_dump_json())
```

```java
import com.openai.models.beta.agents.environments.EnvironmentListParams;

var environments =
    client
        .beta()
        .agents()
        .environments()
        .list(
            EnvironmentListParams.builder()
                .limit(20L)
                .order(EnvironmentListParams.Order.DESC)
                .build());
System.out.println(environments);
```

```ruby
environments = client.beta.agents.environments.list(
  limit: 20,
  order: :desc
)
(environments.data || []).each { |item| puts item.to_json }
```

```bash
curl \\\n  "https://api.openai.com/v1/agents/environments?limit=20&order=desc" \\\n  -H "OpenAI-Beta: agents=v1" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY"
```


The list includes environments before and after session attachment, with statuses `pending`, `ready`, `connected`, or `disconnected`. It excludes failed, expired, deleted, and terminated environments. An environment appearing in the list may already be attached to one or more sessions.

Results are newest first by default. If `has_more` is true, set `after` to the previous response's `last_id` to fetch the next page. `limit` accepts 1–100 and defaults to 20; `order` accepts `asc` or `desc`.

## Lifetime and reuse

- **Multiple sessions can share one environment.** Pass the same `environment_id` when creating each session. They share the running workspace, including files, processes, installed packages, and environment configuration. Each session keeps its own conversation history. Changes to the workspace are visible to other attached sessions, so create separate environments when tasks need separate workspaces. A shared environment supports up to 128 attached sessions. This behavior applies to newly created standalone environments; older environments retain their original lifecycle.
- **Unused environments expire.** An environment that remains unattached expires after approximately 5 minutes. Prewarm close to when you expect a task to start.
- **Keep the creating identity consistent.** Retrieval, listing, and attachment require the same organization, project, and authenticated identity that created the environment. Different API keys for that identity can access the same environments, including after key rotation.
- **Shared environments expire after inactivity.** The first attachment starts a 20-minute idle lifetime. Activity in any attached session or through the environment file API extends it; pending work and active turns prevent idle expiry. Deleting a session removes that session from the environment without deleting the shared workspace. Even after the last session is deleted, the environment remains available for attachment until its idle deadline. The API has no standalone environment deletion endpoint.

## Retry creation safely

When creating an environment, you can send an `Idempotency-Key` header. If the request times out or its response is lost, retry with the **same key and the same request body** to avoid creating an additional environment.

While the original environment remains available, a completed retry returns its ID with its current state. A retained key can return `409` if creation is still in progress, its outcome is uncertain, the environment is no longer available, or the parameters differ. These conflicts do not create a replacement environment. Keys are retained for 24 hours; after that window, the same key may create a new environment. Use a new key when you intentionally want a new environment.