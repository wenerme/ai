# MCP connections

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

An MCP server publishes tool definitions and runs tool calls. The Agents API discovers the tools, calls the server, and returns results to the agent. Your application does not need to handle each call.

Choose where the connection runs based on where the server is reachable:

| Connection                                         | Where it runs                           | Requires an environment |
| -------------------------------------------------- | --------------------------------------- | ----------------------- |
| HTTP with `connection_origin: "service"` (default) | OpenAI                                  | No                      |
| HTTP with `connection_origin: "environment"`       | Your session's environment              | Yes                     |
| stdio                                              | A process in your session's environment | Yes                     |






## Connect from OpenAI

Add an HTTP MCP server to `agent.tools`. The server must be reachable from OpenAI. This works with or without a session environment.

For example, the OpenAI documentation MCP allows anonymous access:

```json
{
  "type": "mcp",
  "server_label": "openai_docs",
  "transport": {
    "type": "http",
    "server_url": "https://developers.openai.com/mcp"
  },
  "connection_origin": "service",
  "required": true
}
```

<picture>
  <source
    media="(max-width: 640px)"
    srcSet="/images/api/agents-api/remote-mcps-1-mobile.webp"
    width="680"
    height="956"
  />
  <img src="https://developers.openai.com/images/api/agents-api/remote-mcps-1.webp"
    width="1400"
    height="624"
    alt="The Agents API service connects to a remote MCP server and exchanges calls and results. An optional attached vault supplies a credential matched to the server URL."
    loading="lazy"
  />
</picture>






## Connect from your environment

An executor MCP connects from the session's environment. Use it for servers on a private network or software installed in that environment.

Set the session's `environment.type` to `self_hosted` or `openai_hosted`. For a self-hosted environment, [connect the executor](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted) before the agent uses its tools.

### Connect over HTTP

Use HTTP for a server that is already running. Add this entry to `agent.tools`, replacing the URL with an address your environment can reach:

```json
{
  "type": "mcp",
  "server_label": "internal_search",
  "transport": {
    "type": "http",
    "server_url": "https://mcp.internal.example.com/search"
  },
  "connection_origin": "environment",
  "required": true
}
```

Here, a localhost URL refers to the session's environment. If you omit `connection_origin`, OpenAI makes the connection instead.






### Start a server over stdio

Use stdio to let the executor start a server process. Install the server and its dependencies in the environment first.




For the Python version of this customer lookup example, install the MCP SDK:

```bash
python3 -m venv /workspace/mcp-demo
/workspace/mcp-demo/bin/python -m pip install 'mcp==1.26.0'
```







Save the Python server as `/workspace/lookup_mcp.py`.







For Ruby, install the `mcp` gem and save the Ruby server as `/workspace/lookup_mcp.rb`.







In `/workspace`, install `@modelcontextprotocol/sdk` and `zod`, then save the TypeScript server as `/workspace/lookup_mcp.ts`. In the configuration below, set `transport.command` to the absolute path of your Node executable and `transport.args` to `["--experimental-strip-types", "/workspace/lookup_mcp.ts"]`. This server uses stdio without a transport argument.






The Java version uses `io.modelcontextprotocol.sdk:mcp-core:1.1.5`, `io.modelcontextprotocol.sdk:mcp-json-jackson2:1.1.5`, and `com.fasterxml.jackson.core:jackson-databind:2.18.11`. It serves the same tool over standard input and output:




Run a customer lookup MCP server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "customer-lookup", version: "1.0.0" });
server.registerTool(
  "get_customer",
  {
    description: "Look up a customer in the example data.",
    inputSchema: { customer_id: z.string() },
  },
  async ({ customer_id }) => {
    const customers = new Map([
      ["123", { name: "Example Customer", plan: "pro" }],
    ]);
    const result = { customer: customers.get(customer_id) ?? null };
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

await server.connect(new StdioServerTransport());
```

```python
import sys

from mcp.server.fastmcp import FastMCP

server = FastMCP("customer-lookup", host="127.0.0.1", port=8765, stateless_http=True)


@server.tool()
def get_customer(customer_id: str) -> dict:
    """Look up a customer in the example data."""
    customers = {"123": {"name": "Example Customer", "plan": "pro"}}
    return {"customer": customers.get(customer_id)}


if __name__ == "__main__":
    transport = sys.argv[1] if len(sys.argv) > 1 else "streamable-http"
    server.run(transport=transport)
```

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

type lookupInput struct {
	CustomerID string `json:"customer_id" jsonschema:"Customer ID to look up"`
}
type customer struct {
	Name string `json:"name"`
	Plan string `json:"plan"`
}
type lookupOutput struct {
	Customer *customer `json:"customer"`
}

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()
	server := mcp.NewServer(&mcp.Implementation{Name: "customer-lookup", Version: "1.0.0"}, nil)
	mcp.AddTool(server, &mcp.Tool{Name: "get_customer", Description: "Look up a customer in the example data."},
		func(_ context.Context, _ *mcp.CallToolRequest, input lookupInput) (*mcp.CallToolResult, lookupOutput, error) {
			customers := map[string]*customer{"123": {Name: "Example Customer", Plan: "pro"}}
			return nil, lookupOutput{Customer: customers[input.CustomerID]}, nil
		})
	// Default to stdio. Run `go run . http` to expose /mcp over HTTP.
	if len(os.Args) < 2 || os.Args[1] != "http" {
		if err := server.Run(ctx, &mcp.StdioTransport{}); err != nil && ctx.Err() == nil {
			log.Fatal(err)
		}
		return
	}
	port := "8765"
	handler := mcp.NewStreamableHTTPHandler(func(*http.Request) *mcp.Server { return server }, &mcp.StreamableHTTPOptions{Stateless: true, JSONResponse: true})
	mux := http.NewServeMux()
	mux.Handle("/mcp", handler)
	listener, err := net.Listen("tcp", "127.0.0.1:"+port)
	if err != nil {
		log.Fatal(err)
	}
	httpServer := &http.Server{Handler: mux, ReadHeaderTimeout: 5 * time.Second}
	fmt.Println("Listening on http://" + listener.Addr().String())
	shutdownDone := make(chan struct{})
	go func() {
		defer close(shutdownDone)
		<-ctx.Done()
		shutdownCtx, stop := context.WithTimeout(context.Background(), 5*time.Second)
		defer stop()
		if err := httpServer.Shutdown(shutdownCtx); err != nil {
			log.Print(err)
		}
	}()
	if err := httpServer.Serve(listener); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
	<-shutdownDone
}
```

```java
import com.fasterxml.jackson.databind.json.JsonMapper;
import io.modelcontextprotocol.json.jackson2.JacksonMcpJsonMapper;
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.transport.StdioServerTransportProvider;
import io.modelcontextprotocol.spec.McpSchema;
import java.io.FilterInputStream;
import java.io.IOException;
import java.util.concurrent.CountDownLatch;

var mapper = new JacksonMcpJsonMapper(JsonMapper.builder().build());
var closed = new CountDownLatch(1);
var input =
    new FilterInputStream(System.in) {
      @Override
      public int read(byte[] bytes, int offset, int length) throws IOException {
        int count = super.read(bytes, offset, length);
        if (count == -1) closed.countDown();
        return count;
      }
    };
var transport = new StdioServerTransportProvider(mapper, input, System.out);
var tool =
    McpSchema.Tool.builder()
        .name("get_customer")
        .description("Look up a customer in the example data.")
        .inputSchema(
            mapper,
            """
  {"type":"object","properties":{"customer_id":{"type":"string"}},"required":["customer_id"],"additionalProperties":false}
  """)
        .build();
var server =
    McpServer.sync(transport)
        .serverInfo("customer-lookup", "1.0.0")
        .capabilities(McpSchema.ServerCapabilities.builder().tools(false).build())
        .toolCall(
            tool,
            (exchange, request) -> {
              String text =
                  "123".equals(request.arguments().get("customer_id"))
                      ? "{\"customer\":{\"name\":\"Example Customer\",\"plan\":\"pro\"}}"
                      : "{\"customer\":null}";
              return McpSchema.CallToolResult.builder()
                  .addTextContent(text)
                  .isError(false)
                  .build();
            })
        .build();
try {
  closed.await();
} finally {
  server.closeGracefully();
}
```

```ruby
require "mcp"
require "json"

class GetCustomer < MCP::Tool
  tool_name "get_customer"
  description "Look up a customer in the example data."
  input_schema(type: "object", properties: { customer_id: { type: "string" } }, required: ["customer_id"])

  def self.call(customer_id:, server_context:)
    customers = {
      "123" => {
        name: "Example Customer",
        plan: "pro"
      }
    }
    result = { customer: customers[customer_id] }
    MCP::Tool::Response.new(
      [
        {
          type: "text",
          text: JSON.generate(result)
        }
      ], structured_content: result
    )
  end
end

server = MCP::Server.new(name: "customer-lookup", version: "1.0.0", tools: [GetCustomer])
# Use `ruby main.rb http` for the HTTP endpoint at /mcp; default to stdio.
if ARGV.first == "http"
  require "rackup"
  require "rackup/handler/webrick"
  transport = MCP::Server::Transports::StreamableHTTPTransport.new(server, stateless: true, enable_json_response: true)
  app = Rack::URLMap.new("/mcp" => transport)
  Rackup::Handler::WEBrick.run(app, Host: "127.0.0.1", Port: Integer(ENV.fetch("PORT", "8765")))
else
  MCP::Server::Transports::StdioTransport.new(server).open
end
```


Add the server to `agent.tools`.




The following configuration starts the Python server.







For Ruby, set `transport.command` to the absolute path of your Ruby executable and `transport.args` to `["/workspace/lookup_mcp.rb", "stdio"]`. Install the gem for that Ruby runtime. The `stdio` argument selects the script's transport:




```json
{
  "type": "mcp",
  "server_label": "customer_lookup",
  "transport": {
    "type": "stdio",
    "command": "/workspace/mcp-demo/bin/python",
    "args": ["/workspace/lookup_mcp.py", "stdio"],
    "cwd": "/workspace"
  },
  "required": true
}
```

For stdio, `command` and an absolute `cwd` are required; `args` is optional. Omit `connection_origin`.

Send a message asking the agent to look up customer `123`. The tool returns `Example Customer` on the `pro` plan.

For OpenAI-hosted stdio MCPs, omit the network policy or set it to `enabled`. The `disabled` and `restricted` network policies are not supported for these connections.












## Add authentication

For a server that allows anonymous access, omit authentication fields and `vault_ids`. Otherwise, choose the credential source for your connection:

- **HTTP credentials for one session:** Set `transport.authorization` or `transport.headers` when creating the session. The Agents API encrypts these values and omits them from the returned session resource.
- **Reusable HTTP credentials:** Store MCP credentials in a [vault](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults) and attach it through `vault_ids`. Vault-backed MCP authentication applies only to connections from OpenAI. Credentials match the server URL; use `credential_id` to select one when several match.
- **Stdio credentials:** Supply values in the environment and list their names in `transport.env_vars`. These values can be read by code running in the environment. Self-hosted sessions do not accept inline values in `transport.env`.

For example, an HTTP transport can include a bearer token and another header:

```json
{
  "type": "http",
  "server_url": "https://mcp.example.com/mcp",
  "authorization": "Bearer YOUR_MCP_ACCESS_TOKEN",
  "headers": { "X-Tenant-ID": "tenant_123" }
}
```

Use one source for `Authorization`: inline configuration or a matching vault credential. Other headers can accompany vault authentication. Environment-origin HTTP does not use vault credentials; use inline authentication or a trusted proxy.

Keep secrets out of reusable agent definitions, plugin archives, and logs. To keep credentials inaccessible to agent-generated code, use a [trusted proxy or server](https://developers.openai.com/api/docs/guides/agents-api/environments/security#broker-third-party-access) that supplies them outside the environment.




## Control tool access and startup

Set `allowed_tools` to limit which tools the agent can discover and call. Set `required: true` to fail the turn if the server cannot initialize. Initialization is optional by default.

See the [Create session reference](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions/methods/create) for all MCP configuration fields.






## Troubleshoot connections

If a required server cannot initialize, inspect the error in `agent.session.turn.failed`. For stdio servers, also check the MCP process logs.

- **Network access:** Check the URL and `connection_origin`. For environment connections, check that the executor is connected and its network can reach the server.
- **Credentials:** Check the token or headers. For a vault, check that the credential matches the server URL.
- **Executable and dependencies:** Check that the configured command runs inside the environment.
- **Working directory:** Use an existing absolute `cwd` for an inline stdio configuration.




## Related guides

- [Plugins](https://developers.openai.com/api/docs/guides/agents-api/tools/plugins) package MCP configuration and skills for reuse across sessions.
- [Tool search](https://developers.openai.com/api/docs/guides/tools-tool-search#agents-api) explains automatic MCP tool discovery on supported models and providers.