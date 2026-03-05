# Using tools

import {
  File,
  Functions,
  ImageSquare,
  Code,
} from "@components/react/oai/platform/ui/Icon.react";








When generating model responses, you can extend capabilities using built‑in tools and remote MCP servers. These enable the model to search the web, retrieve from your files, call your own functions, or access third‑party services.



<div data-content-switcher-pane data-value="web-search">
    <div class="hidden">Web search</div>
    </div>
  <div data-content-switcher-pane data-value="file-search" hidden>
    <div class="hidden">File search</div>
    Search your files in a response

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-4.1",
    input="What is deep research by OpenAI?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["<vector_store_id>"]
    }]
)
print(response)
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-4.1",
    input: "What is deep research by OpenAI?",
    tools: [
        {
            type: "file_search",
            vector_store_ids: ["<vector_store_id>"],
        },
    ],
});
console.log(response);
```

```csharp
using OpenAI.Responses;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
OpenAIResponseClient client = new(model: "gpt-5", apiKey: key);

ResponseCreationOptions options = new();
options.Tools.Add(ResponseTool.CreateFileSearchTool(["<vector_store_id>"]));

OpenAIResponse response = (OpenAIResponse)client.CreateResponse([
    ResponseItem.CreateUserMessageItem([
        ResponseContentPart.CreateInputTextPart("What is deep research by OpenAI?"),
    ]),
], options);

Console.WriteLine(response.GetOutputText());
```

  </div>
  <div data-content-switcher-pane data-value="function-calling" hidden>
    <div class="hidden">Function calling</div>
    </div>
  <div data-content-switcher-pane data-value="remote-mcp" hidden>
    <div class="hidden">Remote MCP</div>
    Call a remote MCP server

```bash
curl https://api.openai.com/v1/responses \\ 
-H "Content-Type: application/json" \\ 
-H "Authorization: Bearer $OPENAI_API_KEY" \\ 
-d '{
  "model": "gpt-5",
    "tools": [
      {
        "type": "mcp",
        "server_label": "dmcp",
        "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
        "server_url": "https://dmcp-server.deno.dev/sse",
        "require_approval": "never"
      }
    ],
    "input": "Roll 2d4+1"
  }'
```

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const resp = await client.responses.create({
  model: "gpt-5",
  tools: [
    {
      type: "mcp",
      server_label: "dmcp",
      server_description: "A Dungeons and Dragons MCP server to assist with dice rolling.",
      server_url: "https://dmcp-server.deno.dev/sse",
      require_approval: "never",
    },
  ],
  input: "Roll 2d4+1",
});

console.log(resp.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-5",
    tools=[
        {
            "type": "mcp",
            "server_label": "dmcp",
            "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
            "server_url": "https://dmcp-server.deno.dev/sse",
            "require_approval": "never",
        },
    ],
    input="Roll 2d4+1",
)

print(resp.output_text)
```

```csharp
using OpenAI.Responses;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
OpenAIResponseClient client = new(model: "gpt-5", apiKey: key);

ResponseCreationOptions options = new();
options.Tools.Add(ResponseTool.CreateMcpTool(
    serverLabel: "dmcp",
    serverUri: new Uri("https://dmcp-server.deno.dev/sse"),
    toolCallApprovalPolicy: new McpToolCallApprovalPolicy(GlobalMcpToolCallApprovalPolicy.NeverRequireApproval)
));

OpenAIResponse response = (OpenAIResponse)client.CreateResponse([
    ResponseItem.CreateUserMessageItem([
        ResponseContentPart.CreateInputTextPart("Roll 2d4+1")
    ])
], options);

Console.WriteLine(response.GetOutputText());
```

  </div>



## Available tools

Here's an overview of the tools available in the OpenAI platform—select one of them for further guidance on usage.

<a href="/api/docs/guides/function-calling">
  

<span slot="icon">
      </span>
    Call custom code to give the model access to additional data and
    capabilities.


</a>

<a href="/api/docs/guides/tools-web-search">
  

<span slot="icon">
      </span>
    Include data from the Internet in model response generation.


</a>

<a href="/api/docs/guides/tools-remote-mcp">
  

<span slot="icon">
      </span>
    Give the model access to new capabilities via Model Context Protocol (MCP)
    servers.


</a>

<a href="/api/docs/guides/tools-file-search">
  

<span slot="icon">
      </span>
    Search the contents of uploaded files for context when generating a
    response.


</a>

<a href="/api/docs/guides/tools-image-generation">
  

<span slot="icon">
      </span>
    Generate or edit images using GPT Image.


</a>

<a href="/api/docs/guides/tools-code-interpreter">
  

<span slot="icon">
      </span>
    Allow the model to execute code in a secure container.


</a>

<a href="/api/docs/guides/tools-computer-use">
  

<span slot="icon">
      </span>
    Create agentic workflows that enable a model to control a computer
    interface.


</a>

<a href="/api/docs/guides/tools-apply-patch">
  

<span slot="icon">
      </span>
    Allow models to propose structured diffs that your integration applies.


</a>

<a href="/api/docs/guides/tools-skills">
  

<span slot="icon">
      </span>
    Upload and reuse versioned skill bundles in hosted shell environments.


</a>

<a href="/api/docs/guides/tools-shell">
  

<span slot="icon">
      </span>
    Run shell commands in hosted containers or in your own local runtime.


</a>

## Usage in the API

When making a request to generate a [model response](https://developers.openai.com/api/docs/api-reference/responses/create), you can enable tool access by specifying configurations in the `tools` parameter. Each tool has its own unique configuration requirements—see the [Available tools](#available-tools) section for detailed instructions.

Based on the provided [prompt](https://developers.openai.com/api/docs/guides/text), the model automatically decides whether to use a configured tool. For instance, if your prompt requests information beyond the model's training cutoff date and web search is enabled, the model will typically invoke the web search tool to retrieve relevant, up-to-date information.

You can explicitly control or guide this behavior by setting the `tool_choice` parameter [in the API request](https://developers.openai.com/api/docs/api-reference/responses/create).

### Function calling

In addition to built-in tools, you can define custom functions using the `tools` array. These custom functions allow the model to call your application's code, enabling access to specific data or capabilities not directly available within the model.

Learn more in the [function calling guide](https://developers.openai.com/api/docs/guides/function-calling).