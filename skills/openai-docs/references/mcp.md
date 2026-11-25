# Building MCP servers for plugins and API integrations

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is an open protocol that's becoming the industry standard for extending AI models with additional tools and knowledge. Remote MCP servers can be used to connect models over the Internet to new data sources and capabilities.

In this guide, we'll cover how to build a remote MCP server that reads data from a private data source (a [vector store](https://developers.openai.com/api/docs/guides/retrieval)) and makes it available through a plugin in ChatGPT and Codex, through ChatGPT deep research and company knowledge, and [through the API](https://developers.openai.com/api/docs/guides/tools-connectors-mcp).

**Note**: To build a plugin with an MCP server, start with the plugin docs: [Quickstart](https://developers.openai.com/plugins/quickstart), [Build your MCP server](https://developers.openai.com/plugins/build/mcp-server), [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt), and [Authentication](https://developers.openai.com/plugins/build/auth). If your MCP server doesn't need UI, you can expose tools without UI resources.

## Configure a data source

You can use data from any source to power a remote MCP server, but for simplicity, we will use [vector stores](https://developers.openai.com/api/docs/guides/retrieval) in the OpenAI API. Begin by uploading a PDF document to a new vector store - [you can use this public domain 19th century book about cats](https://cdn.openai.com/API/docs/cats.pdf) for an example.

You can upload files and create a vector store [in the dashboard here](https://platform.openai.com/storage/vector_stores), or you can create vector stores and upload files via API. [Follow the vector store guide](https://developers.openai.com/api/docs/guides/retrieval) to set up a vector store and upload a file to it.

Make a note of the vector store's unique ID to use in the example to follow.

![vector store configuration](https://cdn.openai.com/API/docs/images/vector_store.png)

## Create an MCP server

Next, let's create a remote MCP server that will do search queries against our vector store, and be able to return document content for files with a given ID.

In this example, we are going to build our MCP server using Python and [FastMCP](https://github.com/jlowin/fastmcp). A full implementation of the server appears at the end of this section, along with instructions for running it in a [browser-based development environment](https://replit.com/).

Note that there are a number of other MCP server frameworks you can use in a variety of programming languages. Whichever framework you use though, the tool definitions in your server will need to conform to the shape described here.

To work with ChatGPT deep research and company knowledge, your MCP server
should implement two read-only tools: `search` and `fetch`, using the
compatibility schema in [Company knowledge compatibility](https://developers.openai.com/plugins/build/mcp-server#company-knowledge-compatibility).
The same interface is useful for research workflows via API.

Declare an output schema for each tool so clients can validate the result shape.
In FastMCP, typed return models can generate this schema automatically; the
example below passes `output_schema` explicitly from the same models.

### `search` tool

The `search` tool is responsible for returning a list of relevant search results from your MCP server's data source, given a user's query.

_Arguments:_

A single query string.

_Returns:_

An object with a single key, `results`, whose value is an array of result objects. Each result object should include:

- `id` - a unique ID for the document or search result item
- `title` - human-readable title.
- `url` - canonical URL for citation.

In MCP, return this object as `structuredContent` and include the same value as
a JSON-encoded string in the [content array](https://modelcontextprotocol.io/docs/learn/architecture#understanding-the-tool-execution-response)
for compatibility.

The final tool response should look like:

```json
{
  "structuredContent": {
    "results": [{ "id": "doc-1", "title": "...", "url": "..." }]
  },
  "content": [
    {
      "type": "text",
      "text": "{\"results\":[{\"id\":\"doc-1\",\"title\":\"...\",\"url\":\"...\"}]}"
    }
  ]
}
```


### `fetch` tool

The fetch tool is used to retrieve the full contents of a search result document or item.

_Arguments:_

A string which is a unique identifier for the search document.

_Returns:_

A single object with the following properties:

- `id` - a unique ID for the document or search result item
- `title` - a string title for the search result item
- `text` - The full text of the document or item
- `url` - a URL to the document or search result item. Useful for citing
  specific resources in research.
- `metadata` - an optional key/value pairing of data about the result

In MCP, return this object as `structuredContent` and include the same value as
a JSON-encoded string in the content array for compatibility.

The final tool response should look like:

```json
{
  "structuredContent": {
    "id": "doc-1",
    "title": "...",
    "text": "full text...",
    "url": "https://example.com/doc",
    "metadata": { "source": "vector_store" }
  },
  "content": [
    {
      "type": "text",
      "text": "{\"id\":\"doc-1\",\"title\":\"...\",\"text\":\"full text...\",\"url\":\"https://example.com/doc\",\"metadata\":{\"source\":\"vector_store\"}}"
    }
  ]
}
```


### Citation behavior

For both `search` results and `fetch` responses, ChatGPT creates citation
metadata only when `url` is a non-empty string. A result with a `title` but no
usable `url` remains ordinary tool output instead of becoming an empty
citation. To make a result citable, return its canonical `url`.

For example, ChatGPT might call `search` with:

```json
{ "query": "What is the quarterly plan?" }
```


The MCP server can respond with a URL-backed result:

```json
{
  "structuredContent": {
    "results": [
      {
        "id": "quarterly-plan",
        "title": "Quarterly plan",
        "url": "https://example.com/quarterly-plan"
      }
    ]
  },
  "content": [
    {
      "type": "text",
      "text": "{\"results\":[{\"id\":\"quarterly-plan\",\"title\":\"Quarterly plan\",\"url\":\"https://example.com/quarterly-plan\"}]}"
    }
  ]
}
```


In this response, the `url` field has a value, which makes the result eligible
for citation metadata. The query itself does not trigger citation handling. If
the result omits `url`, or provides an empty or non-string value, ChatGPT
preserves the result as ordinary tool output.

### Server example

You can try this example MCP server in a [browser-based development environment](https://replit.com/). Configure the sample with your own API credentials and vector store information.

[Example MCP server on Replit](https://replit.com/@kwhinnery-oai/DeepResearchServer?v=1#README.md)

Remix the server example on Replit to test live.



The examples below implement both the `search` and `fetch` tools. The Python example uses FastMCP. The Java example uses `com.openai:openai-java:4.105.0`, `io.modelcontextprotocol.sdk:mcp-core:1.1.5`, `io.modelcontextprotocol.sdk:mcp-json-jackson2:1.1.5`, and `org.eclipse.jetty.ee10:jetty-ee10-servlet:12.0.41`. Put the Java setup inside the `main` method of a server class, set `OPENAI_API_KEY`, and replace `vs_123` with your vector store ID. The Java server exposes its SSE endpoint at `/sse`.



#### Search and fetch server implementation



Create a document search MCP server

```typescript
import OpenAI from "openai";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { z } from "zod";

const client = new OpenAI();
// Replace this illustrative ID with your existing document store ID.
const vectorStoreID = "vs_123";
const citation = (id: string) =>
  `https://platform.openai.com/storage/files/${encodeURIComponent(id)}`;
function createServer() {
  const server = new McpServer(
    { name: "Sample MCP Server", version: "1.0.0" },
    {
      instructions:
        "Search for relevant documents, then fetch complete content with citations.",
    }
  );
  server.registerTool(
    "search",
    {
      description:
        "Search documents and return identities, titles, and citation URLs.",
      inputSchema: { query: z.string() },
      outputSchema: {
        results: z.array(
          z.object({ id: z.string(), title: z.string(), url: z.string() })
        ),
      },
    },
    async ({ query }) => {
      const results: { id: string; title: string; url: string }[] = [];
      if (query.trim()) {
        const page = await client.vectorStores.search(vectorStoreID, { query });
        for (const item of page.data)
          results.push({
            id: item.file_id,
            title: item.filename,
            url: citation(item.file_id),
          });
      }
      const result = { results };
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
        structuredContent: result,
      };
    }
  );
  server.registerTool(
    "fetch",
    {
      description:
        "Retrieve a complete document with its citation and metadata.",
      inputSchema: { id: z.string().min(1) },
      outputSchema: {
        id: z.string(),
        title: z.string(),
        text: z.string(),
        url: z.string(),
        metadata: z.record(z.string(), z.unknown()),
      },
    },
    async ({ id }) => {
      const parts: string[] = [];
      for await (const item of client.vectorStores.files.content(id, {
        vector_store_id: vectorStoreID,
      })) {
        if (typeof item.text !== "string")
          throw new Error("Document content omitted text");
        parts.push(item.text);
      }
      const attachment = await client.vectorStores.files.retrieve(id, {
        vector_store_id: vectorStoreID,
      });
      const file = await client.files.retrieve(id);
      const result = {
        id,
        title: file.filename,
        text: parts.join("\n"),
        url: citation(id),
        metadata: attachment.attributes ?? {},
      };
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
        structuredContent: result,
      };
    }
  );
  return server;
}
// Loopback binding and SDK Host validation protect this local example.
const app = createMcpExpressApp({ host: "127.0.0.1" });
app.all("/mcp", async (request, response) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  response.on("close", () => {
    void transport.close();
    void server.close();
  });
  try {
    await server.connect(transport);
    await transport.handleRequest(request, response, request.body);
  } catch (error) {
    console.error("MCP request failed", error);
    if (!response.headersSent)
      response.status(500).end("Internal server error");
  }
});
const httpServer = app.listen(8000, "127.0.0.1");
```

```python
# Replace the illustrative IDs and URLs below with your own resource values.
"""
Sample MCP Server for ChatGPT Integration

This server implements the Model Context Protocol (MCP) with search and fetch
capabilities designed to work with ChatGPT's chat and deep research features.
"""

import logging
import os
from typing import Any

from fastmcp import FastMCP
from openai import OpenAI
from pydantic import BaseModel


class SearchResult(BaseModel):
    id: str
    title: str
    url: str


class SearchOutput(BaseModel):
    results: list[SearchResult]


class FetchOutput(BaseModel):
    id: str
    title: str
    text: str
    url: str
    metadata: dict[str, Any] | None = None


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# OpenAI configuration
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
VECTOR_STORE_ID = "vs_123"

# Initialize OpenAI client
openai_client = OpenAI(api_key=OPENAI_API_KEY)

server_instructions = """
This MCP server provides search and document retrieval capabilities
for ChatGPT Apps and deep research. Use the search tool to find relevant documents
based on keywords, then use the fetch tool to retrieve complete
document content with citations.
"""


def create_server():
    """Create and configure the MCP server with search and fetch tools."""

    # Initialize the FastMCP server
    mcp = FastMCP(name="Sample MCP Server", instructions=server_instructions)

    @mcp.tool(output_schema=SearchOutput.model_json_schema())
    async def search(query: str) -> SearchOutput:
        """
        Search for documents using OpenAI Vector Store search.

        This tool searches through the vector store to find semantically relevant matches.
        Returns a list of search results with basic information. Use the fetch tool to get
        complete document content.

        Args:
            query: Search query string. Natural language queries work best for semantic search.

        Returns:
            Dictionary with 'results' key containing list of matching documents.
            Each result includes id, title, and URL.
        """
        if not query or not query.strip():
            return SearchOutput(results=[])

        if not openai_client:
            logger.error("OpenAI client not initialized - API key missing")
            raise ValueError("OpenAI API key is required for vector store search")

        # Search the vector store using OpenAI API
        logger.info(f"Searching {VECTOR_STORE_ID} for query: '{query}'")

        response = openai_client.vector_stores.search(
            vector_store_id=VECTOR_STORE_ID, query=query
        )

        results = []

        # Process the vector store search results
        if hasattr(response, "data") and response.data:
            for i, item in enumerate(response.data):
                # Extract file_id, filename, and content
                item_id = getattr(item, "file_id", f"vs_{i}")
                item_filename = getattr(item, "filename", f"Document {i + 1}")

                result = SearchResult(
                    id=item_id,
                    title=item_filename,
                    url=f"https://platform.openai.com/storage/files/{item_id}",
                )

                results.append(result)

        logger.info(f"Vector store search returned {len(results)} results")
        return SearchOutput(results=results)

    @mcp.tool(output_schema=FetchOutput.model_json_schema())
    async def fetch(id: str) -> FetchOutput:
        """
        Retrieve complete document content by ID for detailed
        analysis and citation. This tool fetches the full document
        content from OpenAI Vector Store. Use this after finding
        relevant documents with the search tool to get complete
        information for analysis and proper citation.

        Args:
            id: File ID from vector store (file-xxx) or local document ID

        Returns:
            Complete document with id, title, full text content,
            optional URL, and metadata

        Raises:
            ValueError: If the specified ID is not found
        """
        if not id:
            raise ValueError("Document ID is required")

        if not openai_client:
            logger.error("OpenAI client not initialized - API key missing")
            raise ValueError(
                "OpenAI API key is required for vector store file retrieval"
            )

        logger.info(f"Fetching content from vector store for file ID: {id}")

        # Fetch file content from vector store
        content_response = openai_client.vector_stores.files.content(
            vector_store_id=VECTOR_STORE_ID, file_id=id
        )

        # Get file metadata
        file_info = openai_client.vector_stores.files.retrieve(
            vector_store_id=VECTOR_STORE_ID, file_id=id
        )

        # Extract content from paginated response
        file_content = ""
        if hasattr(content_response, "data") and content_response.data:
            # Combine all content chunks from FileContentResponse objects
            content_parts = []
            for content_item in content_response.data:
                if hasattr(content_item, "text"):
                    content_parts.append(content_item.text)
            file_content = "\n".join(content_parts)
        else:
            file_content = "No content available"

        # Use filename as title and create proper URL for citations
        filename = openai_client.files.retrieve(file_id=id).filename

        result = FetchOutput(
            id=id,
            title=filename,
            text=file_content,
            url=f"https://platform.openai.com/storage/files/{id}",
        )

        # Add metadata if available from file info
        if hasattr(file_info, "attributes") and file_info.attributes:
            result.metadata = dict(file_info.attributes)

        logger.info(f"Fetched vector store file: {id}")
        return result

    return mcp


def main():
    """Main function to start the MCP server."""
    logger.info(f"Using vector store: {VECTOR_STORE_ID}")

    # Create the MCP server
    server = create_server()

    # Configure and start the server
    logger.info("Starting MCP server on 0.0.0.0:8000")
    logger.info("Server will be accessible via SSE transport")

    try:
        # Use FastMCP's built-in run method with SSE transport
        port = int(os.environ.get("OPENAI_EXAMPLE_PORT", "8000"))
        server.run(
            transport="sse",
            host="0.0.0.0",
            port=port,
            uvicorn_config={"loop": "asyncio"},
        )
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server error: {e}")
        raise


if __name__ == "__main__":
    main()
```

```go
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	"github.com/openai/openai-go/v3"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
)

type searchInput struct {
	Query string `json:"query"`
}
type searchResult struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
}
type searchOutput struct {
	Results []searchResult `json:"results"`
}
type fetchInput struct {
	ID string `json:"id"`
}
type fetchOutput struct {
	ID       string         `json:"id"`
	Title    string         `json:"title"`
	Text     string         `json:"text"`
	URL      string         `json:"url"`
	Metadata map[string]any `json:"metadata,omitempty"`
}

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()
	client := openai.NewClient()
	// Replace this illustrative ID with your existing document store ID.
	store := "vs_123"
	server := mcp.NewServer(&mcp.Implementation{Name: "Sample MCP Server", Version: "1.0.0"}, &mcp.ServerOptions{Instructions: "Search for relevant documents, then fetch complete content with citations."})
	mcp.AddTool(server, &mcp.Tool{Name: "search", Description: "Search documents and return identities, titles, and citation URLs."}, func(ctx context.Context, _ *mcp.CallToolRequest, input searchInput) (*mcp.CallToolResult, searchOutput, error) {
		result := searchOutput{Results: []searchResult{}}
		if strings.TrimSpace(input.Query) == "" {
			return nil, result, nil
		}
		page, err := client.VectorStores.Search(ctx, store, openai.VectorStoreSearchParams{Query: openai.VectorStoreSearchParamsQueryUnion{OfString: openai.String(input.Query)}})
		if err != nil {
			return nil, result, err
		}
		for _, item := range page.Data {
			result.Results = append(result.Results, searchResult{ID: item.FileID, Title: item.Filename, URL: "https://platform.openai.com/storage/files/" + item.FileID})
		}
		return nil, result, nil
	})
	mcp.AddTool(server, &mcp.Tool{Name: "fetch", Description: "Retrieve a complete document with its citation and metadata."}, func(ctx context.Context, _ *mcp.CallToolRequest, input fetchInput) (*mcp.CallToolResult, fetchOutput, error) {
		if input.ID == "" {
			return &mcp.CallToolResult{IsError: true, Content: []mcp.Content{&mcp.TextContent{Text: "Document ID is required"}}}, fetchOutput{}, nil
		}
		content := client.VectorStores.Files.ContentAutoPaging(ctx, store, input.ID)
		var parts []string
		for content.Next() {
			parts = append(parts, content.Current().Text)
		}
		if err := content.Err(); err != nil {
			return nil, fetchOutput{}, err
		}
		info, err := client.VectorStores.Files.Get(ctx, store, input.ID)
		if err != nil {
			return nil, fetchOutput{}, err
		}
		file, err := client.Files.Get(ctx, input.ID)
		if err != nil {
			return nil, fetchOutput{}, err
		}
		metadata := map[string]any{}
		for name, value := range info.Attributes {
			var decoded any
			if err := json.Unmarshal([]byte(value.RawJSON()), &decoded); err != nil {
				return nil, fetchOutput{}, err
			}
			metadata[name] = decoded
		}
		return nil, fetchOutput{ID: input.ID, Title: file.Filename, Text: strings.Join(parts, "\n"), URL: "https://platform.openai.com/storage/files/" + input.ID, Metadata: metadata}, nil
	})

	handler := mcp.NewStreamableHTTPHandler(func(*http.Request) *mcp.Server { return server }, &mcp.StreamableHTTPOptions{Stateless: true, JSONResponse: true})
	mux := http.NewServeMux()
	mux.Handle("/mcp", handler)
	port := "8000"
	host := "127.0.0.1"
	listener, err := net.Listen("tcp", net.JoinHostPort(host, port))
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
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.ObjectMappers;
import com.openai.models.vectorstores.VectorStoreSearchParams;
import com.openai.models.vectorstores.files.*;
import io.modelcontextprotocol.json.jackson2.JacksonMcpJsonMapper;
import io.modelcontextprotocol.server.*;
import io.modelcontextprotocol.server.transport.DefaultServerTransportSecurityValidator;
import io.modelcontextprotocol.server.transport.HttpServletSseServerTransportProvider;
import io.modelcontextprotocol.spec.McpSchema;
import java.util.*;
import org.eclipse.jetty.ee10.servlet.*;
import org.eclipse.jetty.server.*;



var client = OpenAIOkHttpClient.fromEnv();
    String vectorStoreId = "vs_123";
    var mapper = new JacksonMcpJsonMapper(JsonMapper.builder().build());
    var transport =
        HttpServletSseServerTransportProvider.builder()
            .jsonMapper(mapper)
            .sseEndpoint("/sse")
            .messageEndpoint("/messages/")
            // Allow local clients and the local MCP Inspector. Add trusted hosts and origins
            // explicitly when deploying this server behind a proxy.
            .securityValidator(
                DefaultServerTransportSecurityValidator.builder()
                    .allowedHosts(List.of("localhost:*", "127.0.0.1:*"))
                    .allowedOrigins(List.of("http://localhost:6274", "http://127.0.0.1:6274"))
                    .build())
            .build();
    var search =
        McpSchema.Tool.builder()
            .name("search")
            .description("Search documents, then fetch complete content with citations.")
            .inputSchema(
                mapper,
"""
{"type":"object","properties":{"query":{"type":"string"}},"required":["query"]}
""")
            .outputSchema(
                mapper,
"""
{"type":"object","properties":{"results":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"title":{"type":"string"},"url":{"type":"string"}},"required":["id","title","url"]}}},"required":["results"]}
""")
            .build();
    var fetch =
        McpSchema.Tool.builder()
            .name("fetch")
            .description("Retrieve complete document text, metadata, and citation by file ID.")
            .inputSchema(
                mapper,
"""
{"type":"object","properties":{"id":{"type":"string"}},"required":["id"]}
""")
            .outputSchema(
                mapper,
"""
{"type":"object","properties":{"id":{"type":"string"},"title":{"type":"string"},"text":{"type":"string"},"url":{"type":"string"},"metadata":{"type":["object","null"]}},"required":["id","title","text","url"]}
""")
            .build();
    var server =
        McpServer.sync(transport)
            .serverInfo("Sample MCP Server", "1.0.0")
            .capabilities(McpSchema.ServerCapabilities.builder().tools(false).build())
            .toolCall(
                search,
                (exchange, request) -> {
                  try {
                    String query = (String) request.arguments().get("query");
                    var results = new ArrayList<Map<String, String>>();
                    if (query != null && !query.isBlank()) {
                      var page =
                          client
                              .vectorStores()
                              .search(
                                  vectorStoreId,
                                  VectorStoreSearchParams.builder().query(query).build());
                      for (var item : page.data())
                        results.add(
                            Map.of(
                                "id",
                                item.fileId(),
                                "title",
                                item.filename(),
                                "url",
                                "https://platform.openai.com/storage/files/" + item.fileId()));
                    }
                    return result(Map.of("results", results));
                  } catch (Exception error) {
                    return failure(error);
                  }
                })
            .toolCall(
                fetch,
                (exchange, request) -> {
                  try {
                    String id = (String) request.arguments().get("id");
                    if (id == null || id.isBlank())
                      throw new IllegalArgumentException("Document ID is required");
                    var content =
                        client
                            .vectorStores()
                            .files()
                            .content(
                                id,
                                FileContentParams.builder().vectorStoreId(vectorStoreId).build());
                    var file =
                        client
                            .vectorStores()
                            .files()
                            .retrieve(
                                id,
                                FileRetrieveParams.builder().vectorStoreId(vectorStoreId).build());
                    var parts = new ArrayList<String>();
                    for (var item : content.data()) item.text().ifPresent(parts::add);
                    String title = client.files().retrieve(id).filename();
                    var document = new LinkedHashMap<String, Object>();
                    document.put("id", id);
                    document.put("title", title);
                    document.put("text", String.join("\n", parts));
                    document.put("url", "https://platform.openai.com/storage/files/" + id);
                    document.put(
                        "metadata",
                        file.attributes()
                            .map(value -> ObjectMappers.jsonMapper().valueToTree(value))
                            .orElse(null));
                    return result(document);
                  } catch (Exception error) {
                    return failure(error);
                  }
                })
            .build();
    var httpServer = new Server();
    var connector = new ServerConnector(httpServer);
    connector.setHost("127.0.0.1");
    connector.setPort(8000);
    httpServer.addConnector(connector);
    var context = new ServletContextHandler();
    context.setContextPath("/");
    context.addServlet(new ServletHolder(transport), "/*");
    httpServer.setHandler(context);
    try {
      httpServer.start();
      httpServer.join();
    } finally {
      server.closeGracefully();
      httpServer.stop();
      client.close();
    }

static McpSchema.CallToolResult result(Map<String, ?> value) throws Exception {
  String encoded = ObjectMappers.jsonMapper().writeValueAsString(value);
  return McpSchema.CallToolResult.builder()
      .structuredContent(value)
      .addTextContent(encoded)
      .isError(false)
      .build();
}

static McpSchema.CallToolResult failure(Exception error) {
  return McpSchema.CallToolResult.builder()
      .isError(true)
      .addTextContent(
          error.getMessage() == null ? error.getClass().getSimpleName() : error.getMessage())
      .build();
}
```

```ruby
require "openai"
require "mcp"
require "json"

class SearchDocuments < MCP::Tool
  tool_name "search"
  description "Search documents and return identities, titles, and citation URLs."
  input_schema(type: "object", properties: { query: { type: "string" } }, required: ["query"])
  output_schema(
    type: "object", properties: {
      results: {
        type: "array",

        items: {
          type: "object",

          properties: {
            id: { type: "string" },
            title: { type: "string" },
            url: { type: "string" }
          },
          required: %w[id title url]
        }
      }
    }, required: ["results"]
  )

  def self.call(query:, server_context:)
    results = []
    unless query.strip.empty?
      response = server_context.fetch(:client).vector_stores.search(server_context.fetch(:store), query: query)
      results = response.data.map do |item|
        {
          id: item.file_id,
          title: item.filename,
          url: "https://platform.openai.com/storage/files/#{item.file_id}"
        }
      end
    end
    result = { results: results }
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

class FetchDocument < MCP::Tool
  tool_name "fetch"
  description "Retrieve a complete document with its citation and metadata."
  input_schema(type: "object", properties: { id: { type: "string" } }, required: ["id"])
  output_schema(
    type: "object", properties: {
      id: { type: "string" },

      title: { type: "string" },

      text: { type: "string" },

      url: { type: "string" },
      metadata: { type: ["object", "null"] }
    }, required: %w[id title text url]
  )

  def self.call(id:, server_context:)
    if id.empty?
      return MCP::Tool::Response.new(
        [
          {
            type: "text",
            text: "Document ID is required"
          }
        ], error: true
      )
    end

    client = server_context.fetch(:client)
    store = server_context.fetch(:store)
    content = client.vector_stores.files.content(id, vector_store_id: store)
    info = client.vector_stores.files.retrieve(id, vector_store_id: store)
    file = client.files.retrieve(id)
    text = content.data.map(&:text).join("\n")
    result = {
      id: id,

      title: file.filename,

      text: text,
      url: "https://platform.openai.com/storage/files/#{id}"
    }
    result[:metadata] = info.attributes unless info.attributes.nil? || info.attributes.empty?
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

server = MCP::Server.new(
  name: "Sample MCP Server", version: "1.0.0", tools: [SearchDocuments, FetchDocument],
  instructions: "Search for relevant documents, then fetch complete content with citations.",
  server_context: {
    client: OpenAI::Client.new,
    store: ENV.fetch("OPENAI_VECTOR_STORE_ID", "vs_123")
  }
)
if ARGV.first == "stdio"
  MCP::Server::Transports::StdioTransport.new(server).open
  exit
end

require "rackup"
require "rackup/handler/webrick"
transport = MCP::Server::Transports::StreamableHTTPTransport.new(server, stateless: true, enable_json_response: true)
app = Rack::URLMap.new("/mcp" => transport)
Rackup::Handler::WEBrick.run(app, Host: ENV.fetch("MCP_HOST", "127.0.0.1"), Port: Integer(ENV.fetch("PORT", "8000"))) do |http_server|
  trap("INT") { http_server.shutdown }
  trap("TERM") { http_server.shutdown }
end
```








#### Replit setup



On Replit, configure `OPENAI_API_KEY` with your OpenAI API key in the Secrets UI. In the sample, replace `vs_123` with the ID of the vector store you created earlier for search.

On free Replit accounts, server URLs are active for as long as the editor is active, so while you are testing, you'll need to keep the browser tab open. Select the link icon to get a URL for your MCP server:

![replit configuration](https://cdn.openai.com/API/docs/images/replit.png)




For the Python server, ensure the long dev URL ends with `/sse/`, which is the server-sent events (streaming) interface to the MCP server. This is the URL you will use to connect your app in ChatGPT and call it via API. An example Replit URL looks like:

```text
https://777xxx.janeway.replit.dev/sse/
```








For Ruby, install the `openai`, `mcp`, `rackup`, and `webrick` gems, save the Ruby source as `server.rb`, and run `ruby server.rb`. Set `OPENAI_VECTOR_STORE_ID` to your vector store ID and `MCP_HOST` to `0.0.0.0` on Replit. The Ruby server uses Streamable HTTP at `/mcp`; use that path instead of `/sse/` in the connection URL. The Ruby server uses port 8000 by default or the port specified by `PORT`.







Download and extract the [TypeScript samples and locked dependencies](https://developers.openai.com/api/docs/samples/typescript.tar.gz): OpenAI, the MCP SDK, and Zod. Set `OPENAI_API_KEY` and replace `vs_123` with your vector store ID. From the sample project directory, run `pnpm install --ignore-workspace --frozen-lockfile`, then start the server with `node --experimental-strip-types mcp/mcp-server.ts`.

The local server uses Streamable HTTP at `http://127.0.0.1:8000/mcp`. For a hosted deployment, change the `app.listen` binding to `0.0.0.0` and set the `createMcpExpressApp` options to `host: "0.0.0.0"` with `allowedHosts` containing your exact deployment hostname. Keep Host validation enabled, configure HTTPS and access controls at your hosting boundary, and use the `/mcp` path in the connection URL. Change the port number if your host requires a different port.







For Go, use `github.com/openai/openai-go/v3` and `github.com/modelcontextprotocol/go-sdk`. Set `OPENAI_API_KEY`, replace the illustrative `vs_123` value with your existing vector store ID, save the source as `main.go` in your module, and run `go run .`. The server uses Streamable HTTP at `/mcp` on port 8000. Edit the `port` literal to use another port and the `host` literal to bind the server to `0.0.0.0` on Replit.








## Test and connect your MCP server

You can test your MCP server with `gpt-6.2-sol` [in the prompts dashboard](https://platform.openai.com/chat). Create a new prompt, or edit an existing one, and add a new MCP tool to the prompt configuration. This compatibility example exposes only read-only `search` and `fetch` tools, so its API request skips approval for those tools. Keep approval enabled for tools that can modify data or take other consequential actions.

If you are testing this server as part of a plugin, follow [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt).

![prompts configuration](https://cdn.openai.com/API/docs/images/prompts_mcp.png)

Once you have configured your MCP server, you can chat with a model using it via the Prompts UI.

![prompts chat](https://cdn.openai.com/API/docs/images/chat_prompts_mcp.png)

You can test the MCP server using the Responses API directly with a request like this one:

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-6.2-sol",
  "input": [
    {
      "role": "developer",
      "content": [
        {
          "type": "input_text",
          "text": "You are a research assistant that searches MCP servers to find answers to your questions."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Are cats attached to their homes? Give a succinct one page overview."
        }
      ]
    }
  ],
  "reasoning": {
    "summary": "auto"
  },
  "tools": [
    {
      "type": "mcp",
      "server_label": "cats",
      "server_url": "https://777ff573-9947-4b9c-8982-658fa40c7d09-00-3le96u7wsymx.janeway.replit.dev/sse/",
      "allowed_tools": [
        "search",
        "fetch"
      ],
      "require_approval": "never"
    }
  ]
}'
```


### Handle authentication

As someone building a custom remote MCP server, authorization and authentication help you protect your data. We recommend using OAuth with [Client ID Metadata Documents](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization#client-id-metadata-documents) for client registration when your authorization server supports CIMD and the plugin creator chooses it. ChatGPT supports CIMD with public-client token exchange (`none`) or signed client assertion token exchange (`private_key_jwt`). Dynamic client registration remains supported when configured. For plugin authentication requirements, see [Authentication](https://developers.openai.com/plugins/build/auth). For protocol details, read the [MCP user guide](https://modelcontextprotocol.io/docs/concepts/transports#authentication-and-authorization) or the [authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization).

If you connect your custom remote MCP server through a plugin, users in your workspace will get an OAuth flow to your service.

### Connect in ChatGPT

1. Go to [ChatGPT Plugins](https://chatgpt.com/plugins), select the plus button, then **Add custom MCP server**.
1. Enter your server URL and authentication details. Review the risk warning and select **I understand and want to continue**, then **Create as a plugin**.
1. Install your plugin and test it by running prompts in chat and deep research.

For detailed setup steps, see [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt).

## Risks and safety

Custom MCP servers enable you to connect your ChatGPT workspace to external applications, which allows ChatGPT to access, send and receive data in these applications. Please note that custom MCP servers are not developed or verified by OpenAI, and are third-party services that are subject to their own terms and conditions.

If you come across a malicious MCP server, please report it to security@openai.com.

### Prompt injection-related risks

Prompt injections are a form of attack where an attacker embeds malicious instructions in content that one of our models is likely to encounter–such as a webpage–with the intention that the instructions override ChatGPT’s intended behavior. If the model obeys the injected instructions it may take actions the user and developer never intended—including sending private data to an external destination.

For example, you might ask ChatGPT to find a restaurant for a group dinner by checking your calendar and recent emails. While researching, it might encounter a malicious comment—essentially a harmful piece of content designed to trick the agent into performing unintended actions—directing it to retrieve a password reset code from Gmail and send it to a malicious website.

Below is a table of specific scenarios to consider. We recommend reviewing this table carefully to inform your decision about whether to use custom MCPs.

| Scenario / Risk                                                                                                                                                                                                                                                                                                                                                                                                                       | Is it safe if I trust the MCP’s developer?                                                                                                                                                                                                                                                       | What can I do to reduce risk?                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| An attacker may somehow insert a prompt injection attack into data accessible via the MCP. <br /><br />_Examples:_<br />• For a customer support MCP, an attacker could send you a customer support request with a prompt injection attack.                                                                                                                                                                                           | Trusting a MCP’s developer does not make this safe.<br /><br />For this to be safe you need to trust _all content that can be accessed within the MCP_.                                                                                                                                          | • Do not use a MCP if it could contain malicious or untrusted user input, even if you trust the developer of the MCP.<br />• Configure access to minimize how many people have access to the MCP.                                                                                                                              |
| A malicious MCP may request excessive parameters to a read or write action. <br /><br />_Example:_<br />• An employee flight booking MCP could expose a read action to get a flight schedule, but request parameters including `summaryOfConversation`, `userAnnualIncome`, `userHomeAddress`.                                                                                                                                        | Trusting a MCP’s developer does not necessarily make this safe.<br /><br />A MCP’s developer may consider it reasonable to be requesting certain data that you do not consider acceptable to share.                                                                                              | • When installing MCP servers manually, review the parameters requested for each action and ensure there is no privacy overreach.                                                                                                                                                                                              |
| An attacker may use a prompt injection attack to trick ChatGPT into fetching sensitive data from a custom MCP, to then be sent to the attacker. <br /><br />_Example:_<br />• An attacker may deliver a prompt injection attack to one of the enterprise users via a different MCP (for example, email), where the attack attempts to trick ChatGPT into reading sensitive data from an internal tool and sending it to the attacker. | Trusting a MCP’s developer does not make this safe.<br /><br />Everything within the new MCP could be safe and trusted since the risk is this data being stolen by attacks coming from a different malicious source.                                                                             | • _ChatGPT is designed to protect users_, but attackers may attempt to steal your data, so be aware of the risk and consider whether taking it makes sense.<br />• Configure access to minimize how many people have access to MCPs with particularly sensitive data.                                                          |
| An attacker may use a prompt injection attack to leak sensitive information through a write action to a custom MCP. <br /><br />_Example:_<br />• An attacker uses a prompt injection attack through a different MCP to trick ChatGPT into fetching sensitive data, then using an MCP for a customer support system to send it to the attacker.                                                                                       | Trusting a MCP’s developer does not make this safe.<br /><br />Even if you fully trust the MCP, if write actions have any consequences that can be observed by an attacker, they could attempt to take advantage of it.                                                                          | • Users should review write actions carefully when they happen (to ensure they were intended and do not contain any data that shouldn’t be shared).                                                                                                                                                                            |
| An attacker may use a prompt injection attack to leak sensitive information through a read action to a malicious custom MCP because the MCP can log these actions.                                                                                                                                                                                                                                                                    | This attack only works if the MCP is malicious, or if the MCP incorrectly marks write actions as read actions.<br /><br />If you trust a MCP’s developer to correctly only mark read actions as _read_, and trust that developer to not attempt to steal data, then this risk is likely minimal. | • Only use MCPs from developers that you trust (though note this isn’t sufficient to make it safe).                                                                                                                                                                                                                            |
| An attacker may use a prompt injection attack to trick ChatGPT into taking a harmful or destructive write action via a custom MCP that users did not intend.                                                                                                                                                                                                                                                                          | Trusting a MCP’s developer does not make this safe.<br /><br />Everything within the new MCP could be safe and trusted, and this risk still exists since the attack comes from a different malicious source.                                                                                     | • Users should carefully review write actions to ensure they are intended and correct.<br />• ChatGPT is designed to protect users, but attackers may attempt to trick ChatGPT into taking unintended write actions.<br />• Configure access to minimize how many people have access to MCPs with particularly sensitive data. |

### Non-prompt injection related risks

Custom MCPs introduce other risks unrelated to prompt injection attacks:

- **Write actions can increase both the usefulness and the risks of MCP servers**, because they make it possible for the server to take potentially destructive actions rather than only providing information back to ChatGPT. ChatGPT currently requires manual confirmation in any conversation before write actions can be taken. The confirmation will flag potentially sensitive data but you should only use write actions in situations where you have carefully considered, and are comfortable with, the possibility that ChatGPT might make a mistake involving such an action. It is possible for write actions to occur even if the MCP server has tagged the action as read only, making it even more important that you trust the custom MCP server before deploying to ChatGPT.
- **Any MCP server may receive sensitive data as part of querying**. Even when the server is not malicious, it will have access to whatever data ChatGPT supplies during the interaction, potentially including sensitive data the user may earlier have provided to ChatGPT. For instance, such data could be included in queries ChatGPT sends to the MCP server when using deep research or chat app tools.

### Connecting to trusted servers

We recommend that you do not connect to a custom MCP server unless you know and trust the underlying application.

For example, choose official servers hosted by the service providers themselves. Connect to the Stripe server hosted by Stripe at `mcp.stripe.com` instead of an unofficial Stripe MCP server hosted by a third party. Because few official MCP servers are available today, you may consider a server hosted by an organization that proxies requests to another service through an API. Only connect after you have reviewed how the organization uses your data and verified that you can trust the server. When building and connecting to your own MCP server, double-check that it's the correct server. Be careful about the data you provide in response to requests and how you treat data sent to you when OpenAI calls your MCP server.

Your remote MCP server permits others to connect OpenAI to your services and allows OpenAI to access, send and receive data, and take action in these services. Avoid putting any sensitive information in the JSON for your tools, and avoid storing any sensitive information from ChatGPT users accessing your remote MCP server.

As someone building an MCP server, don't put anything malicious in your tool definitions.