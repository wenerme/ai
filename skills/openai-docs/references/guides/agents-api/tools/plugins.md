# Plugins

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

A plugin packages skills, MCP configuration, or both. Load its files into your own environment or upload a ZIP to an OpenAI-hosted environment.

## Package the plugin

This plugin combines a documentation-search skill with the OpenAI documentation MCP. It needs network access but no credentials or local server dependencies.

```text
docs-helper/
├── .codex-plugin/plugin.json
├── .mcp.json
└── skills/docs-search/SKILL.md
```

Declare the skill directory and MCP configuration in `.codex-plugin/plugin.json`:

```json
{
  "name": "docs-helper",
  "version": "1.0.0",
  "description": "Find answers in OpenAI developer documentation.",
  "skills": "./skills/",
  "mcpServers": "./.mcp.json"
}
```

Paths resolve from the plugin root. They must start with `./`, stay inside the plugin, and contain no `..` components. See [Package your plugin](https://developers.openai.com/plugins/build/plugins) for the full manifest format.

Add the server to `.mcp.json`. This file uses the plugin format, which differs from `agent.tools`:

```json
{
  "mcpServers": {
    "openai_docs": {
      "type": "http",
      "url": "https://developers.openai.com/mcp"
    }
  }
}
```

Add the instructions to `skills/docs-search/SKILL.md`:

```markdown
---
name: docs-search
description: Find answers in OpenAI developer documentation.
---

Use the openai_docs MCP server to find relevant documentation.
Answer the question and link to the sources you used.
```

## Register plugins in a self-hosted sandbox

Copy the plugin to `/workspace/plugins/docs-helper` and add that absolute path to `environment.capability_directories`. Select the plugin root, which contains `.codex-plugin/plugin.json`.

Register a plugin

```typescript
import OpenAI from "openai";
const client = new OpenAI();

const result = await client.beta.agents.sessions.create({
  agent: {
    model: "gpt-6-astra",
  },
  environment: {
    type: "self_hosted",
    workspace_directory: "/workspace",
    capability_directories: ["/workspace/plugins/docs-helper"],
  },
});
console.log(result.id);
```

```python
from openai import OpenAI

client = OpenAI()

result = client.beta.agents.sessions.create(
    agent={"model": "gpt-6-astra"},
    environment={
        "type": "self_hosted",
        "workspace_directory": "/workspace",
        "capability_directories": ["/workspace/plugins/docs-helper"],
    },
)
print(result.id)
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
result, err := client.Beta.Agents.Sessions.New(ctx,
	openai.BetaAgentSessionNewParams{
		Agent: openai.BetaAgentSessionNewParamsAgent{Model: openai.String("gpt-6-astra")},
		Environment: openai.EnvironmentParamUnion{
			OfParamSelfHosted: &openai.EnvironmentParamSelfHosted{
				WorkspaceDirectory:    "/workspace",
				CapabilityDirectories: []string{"/workspace/plugins/docs-helper"},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(result.ID)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.sessions.SessionCreateParams;
import java.util.List;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var result =
    client
        .beta()
        .agents()
        .sessions()
        .create(
            SessionCreateParams.builder()
                .agent(SessionCreateParams.Agent.builder().model("gpt-6-astra").build())
                .environment(
                    EnvironmentParam.SelfHosted.builder()
                        .workspaceDirectory("/workspace")
                        .capabilityDirectories(List.of("/workspace/plugins/docs-helper"))
                        .build())
                .build());
System.out.println(result.id());
```

```ruby
require "openai"

client = OpenAI::Client.new
result = client.beta.agents.sessions.create(
  agent: { model: "gpt-6-astra" },
  environment: {
    type: "self_hosted",
    workspace_directory: "/workspace",
    capability_directories: ["/workspace/plugins/docs-helper"]
  }
)
puts result.id
```


[Connect the executor](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted) before the agent uses the plugin. Allow the environment to reach `https://developers.openai.com/mcp`.

For multiple plugins, list each root. A parent directory can discover nested skills, but does not load every child plugin's MCP configuration.

## Upload plugins to an OpenAI-hosted sandbox

Supply one ZIP per plugin in `environment.plugins`. Each ZIP must contain one plugin folder with `.codex-plugin/plugin.json` inside it. The request's name and description must match the manifest.

This helper packages your folder and creates a session. Pass your API client and the path to `docs-helper`. OpenAI extracts and registers the plugin automatically.




The Go program uses the OpenAI SDK and standard-library ZIP support. It creates a temporary example plugin, uploads it, and removes the local directory. To upload your own plugin, call `uploadPlugin` with its directory. The program rejects symbolic links and other non-regular files when creating the archive.







The Ruby helper requires the `openai` and `rubyzip` gems. Install them with `gem install openai rubyzip` and set `OPENAI_API_KEY` before creating the client.




Upload a plugin folder

```python
import base64
import json
import shutil
from pathlib import Path
from tempfile import TemporaryDirectory


def upload_plugin(client, plugin_directory):
    plugin_directory = Path(plugin_directory).resolve()
    manifest = json.loads((plugin_directory / ".codex-plugin/plugin.json").read_text())
    with TemporaryDirectory() as temporary:
        archive = shutil.make_archive(
            str(Path(temporary) / "plugin"),
            "zip",
            root_dir=plugin_directory.parent,
            base_dir=plugin_directory.name,
        )
        return client.beta.agents.sessions.create(
            agent={"model": "gpt-6-astra"},
            environment={
                "type": "openai_hosted",
                "plugins": [
                    {
                        "type": "inline",
                        "name": manifest["name"],
                        "description": manifest["description"],
                        "source": {
                            "type": "base64",
                            "media_type": "application/zip",
                            "data": base64.b64encode(
                                Path(archive).read_bytes()
                            ).decode(),
                        },
                    }
                ],
            },
        )
```

```go
package main

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/openai/openai-go/v3"
	"io"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"time"
)

func uploadPlugin(ctx context.Context, client *openai.Client, directory string) (*openai.AgentSession, error) {
	directory, err := filepath.Abs(directory)
	if err != nil {
		return nil, err
	}
	data, err := os.ReadFile(filepath.Join(directory, ".codex-plugin/plugin.json"))
	if err != nil {
		return nil, err
	}
	var manifest struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}
	if err := json.Unmarshal(data, &manifest); err != nil {
		return nil, err
	}
	if manifest.Name == "" || manifest.Description == "" {
		return nil, fmt.Errorf("plugin manifest requires name and description")
	}
	var buffer bytes.Buffer
	archive := zip.NewWriter(&buffer)
	err = filepath.WalkDir(directory, func(path string, entry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if entry.IsDir() {
			return nil
		}
		if !entry.Type().IsRegular() {
			return fmt.Errorf("plugin archive requires regular files: %s", path)
		}
		relative, err := filepath.Rel(directory, path)
		if err != nil {
			return err
		}
		member, err := archive.Create(filepath.ToSlash(filepath.Join(filepath.Base(directory), relative)))
		if err != nil {
			return err
		}
		file, err := os.Open(path)
		if err != nil {
			return err
		}
		defer file.Close()
		_, err = io.Copy(member, file)
		return err
	})
	closeErr := archive.Close()
	if err != nil {
		return nil, err
	}
	if closeErr != nil {
		return nil, closeErr
	}
	return client.Beta.Agents.Sessions.New(ctx, openai.BetaAgentSessionNewParams{Agent: openai.BetaAgentSessionNewParamsAgent{Model: openai.String("gpt-6-astra")}, Environment: openai.EnvironmentParamUnion{OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{Plugins: []openai.HostedPluginParam{{Name: manifest.Name, Description: manifest.Description, Source: openai.InlineCapabilitySourceParam{Data: base64.StdEncoding.EncodeToString(buffer.Bytes())}}}}}})
}
func run() error {
	temporary, err := os.MkdirTemp("", "docs-plugin-")
	if err != nil {
		return err
	}
	defer os.RemoveAll(temporary)
	directory := filepath.Join(temporary, "docs-helper")
	files := map[string]string{
		".codex-plugin/plugin.json":   `{"name":"docs-helper","version":"1.0.0","description":"Find answers in OpenAI developer documentation.","skills":"./skills/","mcpServers":"./.mcp.json"}`,
		".mcp.json":                   `{"mcpServers":{"openai_docs":{"type":"http","url":"https://developers.openai.com/mcp"}}}`,
		"skills/docs-search/SKILL.md": "---\nname: docs-search\ndescription: Find answers in OpenAI developer documentation.\n---\n\nUse the openai_docs MCP server to find relevant documentation.\nAnswer the question and link to the sources you used.\n",
	}
	for name, content := range files {
		path := filepath.Join(directory, name)
		if err := os.MkdirAll(filepath.Dir(path), 0700); err != nil {
			return err
		}
		if err := os.WriteFile(path, []byte(content), 0600); err != nil {
			return err
		}
	}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()
	client := openai.NewClient()
	session, err := uploadPlugin(ctx, &client, directory)
	if err != nil {
		return err
	}
	fmt.Println(session.ID)
	return nil
}
func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
require "openai"
require "json"
require "base64"
require "tmpdir"
require "fileutils"
require "zip"

def upload_plugin(client, plugin_directory)
  plugin_directory = File.expand_path(plugin_directory)
  manifest = JSON.parse(File.read(File.join(plugin_directory, ".codex-plugin/plugin.json")))
  Dir.mktmpdir do |temporary|
    archive = File.join(temporary, "plugin.zip")
    Zip::File.open(archive, create: true) do |zip|
      Dir.glob("**/*", File::FNM_DOTMATCH, base: plugin_directory).sort.each do |relative|
        source = File.join(plugin_directory, relative)
        next unless File.file?(source)

        zip.add(File.join(File.basename(plugin_directory), relative), source)
      end
    end
    client.beta.agents.sessions.create(
      agent: { model: "gpt-6-astra" },
      environment: {
        type: :openai_hosted,
        plugins: [
          {
            type: :inline,
            name: manifest.fetch("name"),
            description: manifest.fetch("description"),
            source: {
              type: :base64,
              media_type: "application/zip",
              data: Base64.strict_encode64(File.binread(archive))
            }
          }
        ]
      }
    )
  end
end
```


## Reuse a hosted plugin setup

[Create an environment template](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/environments/subresources/templates/methods/create) with the plugin list. For later sessions, set `environment.environment_template_id` to the saved template ID.

Omit `environment.plugins` to inherit the template's plugin list. Supplying a list replaces it. Each session gets its own environment; the root agent and its subagents share it.

## Authenticate MCP servers

The example needs no authentication. For other plugin MCP servers:

- **HTTP:** `bearer_token_env_var` reads an environment variable and sends its value as a bearer token. Other `http_headers` values are literal; `env_http_headers` is not supported.
- **Stdio:** `env_vars` lists environment variables to pass to the server process. Install the executable and its dependencies in the environment. A relative `cwd` resolves from the plugin root.

Keep secrets out of plugin files and archives. Plugin MCP connections run from the session's environment. See [MCP authentication](https://developers.openai.com/api/docs/guides/agents-api/tools/mcp#add-authentication) for credential boundaries.

For hosted stdio MCPs, omit the network policy or set it to `enabled`. The `disabled` and `restricted` network policies are not supported for these connections.

## Test a plugin

Send a normal session message that asks for the skill:

> Use docs-search to explain how to stream Responses API output. Include links to the documentation.

Check that the turn completed and that its [saved items](https://developers.openai.com/api/docs/guides/agents-api/sessions/events#fetch-items-and-turns) include a successful call to `openai_docs`. The answer should follow the skill's instructions and cite the documentation. For a skill-only plugin, check its output against the instructions; an MCP call is not required.

Create a new session after changing plugin files or a template. Existing sessions do not reload the tools. For connection errors, see [MCP troubleshooting](https://developers.openai.com/api/docs/guides/agents-api/tools/mcp#troubleshoot-connections). [Delete test sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage) and stop self-hosted compute when finished.