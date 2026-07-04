## When to use Deep Research

Deep Research is an agent, not just a model. It is best suited
for workloads that allow an asynchronous analysis approach rather than
low-latency chat.

Consider the following strengths of Deep Research as you plan
your project:

- Iterative process : Instead of generating instant responses like
standard chat models, Deep Research follows a methodical,
multi-step workflow: Plan > Multi-source search >
Iterate > Output.
- Advanced workloads: Deep Research is specifically
designed to handle complex tasks such as due diligence, market analysis,
and competitive landscaping.
- Extensive data grounding: The Gemini Deep Research Agent can reason across
various data sources simultaneously. This includes remote MCP servers,
internal institutional knowledge, and direct context from uploaded files or
folders.
- Polished reporting: It produces comprehensive, cited reports that can
feature presentation-ready visuals. These include financial graphs,
inline infographics, and market positioning matrixes, which are generated
using HTML and an image model.
- High steerability: You can heavily customize the final output directly
in your prompt. This includes setting a specific tone (for example,
technical or executive), defining strict formats, or requesting
structured data tables.

The following table compares the Gemini Deep Research Agent to standard
Gemini models across several different metrics, including
latency, outputs, and what each is best for:

| Feature | Standard Gemini models | Gemini Deep Research Agent |
| --- | --- | --- |
| Latency | Seconds | Minutes |
| Process | Generate → Output | Plan → Multi-source search → Iterate → Output |
| Output | Conversational style text and code | Detailed, cited reports with inline charts and images |
| Best for | Chatbots, information extraction, summarization | Market analysis, in-depth research, competitive landscaping |

## Key capabilities

Deep Research comes with the following features and
capabilities:

- Grounding on multiple sources , including: Remote MCP servers Grounding with Agent Search Grounding with Google Search or Web Grounding for
Enterprise, which are backed by strict privacy and filtering standards suitable for enterprise workloads Inline file and folder uploads (such as PDFs and spreadsheets), allowing you to put context directly into the research workflow and get citations
- Image and chart outputs: Generate detailed reports containing presentation-ready assets such as inline infographics, market positioning matrix charts, and financial performance graphs
- Inline citations

## How to use Deep Research

You can access the Gemini Deep Research Agent using the global endpoint
(v1beta1 ) by using either the Google Gen AI SDK or direct REST API
requests. For an example usage, see the Introduction to
Gemini Deep Research Pro notebook on
GitHub.

## Before you begin

## Start a Deep Research task

Research tasks involve iterative searching and reading, and can take several
minutes to complete. You must run the Gemini Deep Research Agent asynchronously.

You must use background execution and streaming mode. To do this, set
the `background` and `stream` fields to `True` in the response
configuration when you run the agent. The API returns a partial
`Interaction` object immediately. You can use the `id` property to retrieve
an interaction for polling. The interaction state will transition from
`in_progress` to `completed` or `failed`.

### Python

```
import time
from google import genai

client = genai.Client(enterprise=True, project="PROJECT_ID", location="global")

interaction = client.interactions.create(
  input="Analyze competitive positioning for solar energy providers.",
  agent="deep-research-preview-04-2026",
  background=True,
  stream=True
)

print(f"Research started: {interaction.id}")

while True:
  interaction = client.interactions.get(interaction.id)
  if interaction.status == "completed":
    print(interaction.steps[-1].content[0].text)
    break
  elif interaction.status == "failed":
    print(f"Research failed: {interaction.error}")
  time.sleep(10)

```

### REST

```
PROJECT_ID=PROJECT_ID;
curl --max-time 3600 --keepalive-time 10 -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/interactions" \
    -d '{
      "input": "Research the history of Google TPUs.",
      "agent": "deep-research-preview-04-2026",
      "background": true,
      "stream": true
    }'

```

The API returns an `interaction_id` immediately. This ID is required to
reconnect to the stream.

## Streaming

Deep Research supports streaming to receive real-time updates
on research progress including thought summaries, text output, and
generated images. You must set `background=True` and `stream=True`.

The following example starts a research task and processes the stream
with automatic reconnection. It tracks the `interaction_id` and
`last_event_id` so that if the connection drops, it can resume from where
it left off.

```

interaction_id = None
last_event_id = None
is_complete = False

def process_stream(stream):
  global interaction_id, last_event_id, is_complete
  for event in stream:
    if event.event_type == "interaction.created":
      interaction_id = event.interaction.id
    if event.event_id:
      last_event_id = event.event_id
    if event.event_type == "step.delta":
      if event.delta.type == "text":
        print(event.delta.text, end="", flush=True)
      elif event.delta.type == "thought":
        print(f"Thought: {event.delta.text}", flush=True)
    elif event.event_type in ("interaction.completed", "error"):
      is_complete = True

stream = client.interactions.create(
  input="Research the history of Google TPUs.",
  stream=True,
  agent_config={"type": "deep-research", "thinking_summaries": "auto"},

process_stream(stream)

while not is_complete and interaction_id:
  status = client.interactions.get(interaction_id)
  if status.status != "in_progress":
  stream = client.interactions.get(
    id=interaction_id, stream=True, last_event_id=last_event_id,

```

## Reconnect to the interaction stream

To recover a dropped stream, submit a GET request using the original
`interaction_id`. The API will replay all past events from the start of the
session before continuing with real-time updates.

### Python

```
response = client.interactions.get(
  id = 'INTERACTION_ID',
for chunk in response:
  print(chunk)

```

### REST

```
INTERACTION_ID=INTERACTION_ID

curl -X GET \
    "https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/interactions/${INTERACTION_ID}"

```

## Tools

Deep Research supports multiple built-in and external tools.
By default (when no tools parameter is provided), the agent has access to
Google Search and URL Context. You can explicitly specify tools to restrict
or extend the agent's capabilities. Supported tools include the following:

| Tool | Key | Note |
| Google Search | `google_search` | Search the public web. Enabled by default. |
| MCP servers | `mcp_server` | Connect to remote MCP servers for external tool access. |
| Enterprise Web Search | `enterprise_web_search` | Web search with additional compliance controls. |
| Agent Search | `vertex_ai_search` | Search your website data or your sets of documents. |

### Google Search

The following enables Google Search as the only tool:

```
  input="What are the latest developments in quantum computing?",
  tools=[{"type": "google_search"}],

```

### MCP servers

Provide the server name and URL in the tools configuration. You can also pass
authentication credentials and restrict which tools the agent can call.

See the following reference:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | Yes | Must be `"mcp_server"`. |
| `name` | string | No | A display name for the MCP server. |
| `url` | string | No | The full URL for the MCP server endpoint. |
| `headers` | object | No | Key-value pairs sent as HTTP headers with every request to the server (for example, authentication tokens). |
| `allowed_tools` | array | No | Restrict which tools from the server that the agent may call. |

See the following example:

```
  input="How to deploy an app to Cloud Run on Google Cloud?",
  tools=[
    {
      "type": "mcp_server",
      "name": "Google Cloud Developer Knowledge",
      "url": "https://developerknowledge.googleapis.com/mcp",
      "headers": {"Authorization": "Bearer token"},
    }
  ],

```

### Enterprise Web Search

Enterprise Web Search lets organizations ground generative AI responses in
secure, compliant, up-to-date web data. It enables developers and businesses
to connect AI models to the internet without compromising data privacy or
regulatory compliance.

```
  input="Research on the latest trend on AI",
      "type": "google_search",
      "search_type": ["enterprise_web_search"],

```

## Multimodal inputs

Deep Research supports multimodal inputs, including images
and documents (PDFs), allowing the agent to analyze visual content
and conduct web-based research contextualized by the provided inputs.

```
prompt = """
Analyze the interspecies dynamics and behavioral risks present
in the provided image of the African watering hole. Specifically, investigate
the symbiotic relationship between the avian species and the pachyderms
shown, and conduct a risk assessment for the reticulated giraffes based on
their drinking posture relative to the specific predator visible in the
foreground.
"""

  input=[
    {"type": "text", "text": prompt},
      "type": "image",
      "uri": "https://storage.googleapis.com/generativeai-downloads/images/generated_elephants_giraffes_zebras_sunset.jpg"

```

## Document understanding

You can pass documents directly as multimodal input. The agent analyzes
the provided documents and conducts research grounded in their content.

```
    {"type": "text", "text": "What is this document about?"},
      "type": "document",
      "uri": "https://arxiv.org/pdf/1706.03762",
      "mime_type": "application/pdf",
    },

```

## Steerability and formatting

You can steer the agent's output by providing specific formatting
instructions in your prompt. This lets you structure reports into specific
sections and subsections, include data tables, or adjust tone for
different audiences, for example, "technical," "executive," or "casual".

Define the output explicitly in your input text. See the following example:

```
Research the competitive landscape of EV batteries.

Format the output as a technical report with the following structure:
1. Executive Summary
2. Key Players (Must include a data table comparing capacity and chemistry)
3. Supply Chain Risks

    input=prompt,

```

## API reference

This section provides API reference information for using
the Gemini Deep Research Agent.

For more information, see
Interactions API.

### Method: interactions.create

Full name: `projects.locations.interactions.create`

Initiates a new Deep Research session.

#### Endpoint

post `https://aiplatform.googleapis.com/v1beta1/{parent}/interactions`

#### Request body parameters

Request body parameters can include the following:

| Parameter | Type | Description |
| `agent` | `string` | Required. Specifies the agent ID code (such as `deep-research-preview-04-2026`). |
| `background` | `boolean` | Required. Runs the interaction asynchronously. Must be set to `true`. |
| `stream` | `boolean` | Required. Enables streaming. Must be set to `true`. |
| `input` | `array` or `string` | Required. A list containing user input. Only a single object is supported. |
| `tools` | `array` | Overrides the default tools. Supports `google_search`, `external_data_mcp`, `vertex_search`, etc. |

## Timeouts and error handling

When you interact with an agent, you might encounter connection timeouts or
system errors. This section explains how to identify and resolve soft timeouts
and hard failures.

### Soft timeouts

A soft timeout occurs when the Interactions API connection drops while the agent
is still processing a request. The agent continues to execute the request in the
background.

To resume the session and view replayed events, reconnect to the stream using
your `interaction_id`. See Reconnect to the interaction stream.

### Hard failures

A hard failure occurs when an agent or internal system error terminates the
agent context completely. These errors typically return an `HTTP 500` status
code. Common causes include exceeding the 120-minute execution limit or
experiencing a system failure.

To resolve this failure, stop the current session and refine your query before
you start a new session.

## Best practices

Giving an autonomous agent access to the web and your files introduces
unique dynamics. Consider the following best practices when implementing

- Prompt for unknowns: Explicitly instruct the agent on how to handle
missing data. For example, tell it to state if a figure is unavailable
rather than estimating it.
- Avoid prompt injection risks: Ensure that uploaded files come
from trusted sources, as malicious files could contain hidden text designed
to manipulate an agent's output.
- Avoid data exfiltration: Be extremely cautious when asking the agent to
summarize sensitive internal data while simultaneously giving it access
to browse the public web.
- Verify citations: While enterprise-grade filtering is applied, always
verify the citations provided in the response to ensure web sources are
reputable.

## Limitations

Consider the following limitations as you plan your project:

- Single-turn only : Only single-turn queries are supported. Usage of
the API's `previous_interaction_id` field isn't supported.
- Enterprise security: During Preview, customer-managed encryption keys
(CMEK) and VPC Service Controls aren't supported. Multi-region data residency
constraints are under evaluation.
- Caching: Implicit caching is enabled by default for this service.
It cannot be turned off.
- Data retention: Prompts and generated output are stored for seven days
for standard processing. When using Grounding with Google Search,
Google stores prompts, contextual information, and generated output for
three days for debugging and testing. If you use
Grounding with Google Search, you can't turn off the storage of this
information. If you require zero data retention, it is recommended to use
Grounding with Enterprise Web Search.

## Pricing

Deep Research uses Gemini's advanced reasoning
features to perform multi-step agentic research tasks. Billing comprises model
usage (tokens) and tool execution (search and grounding).

Pricing.

### Cost Tracking

By default, the Gemini Deep Research Agent automatically applies the
`is_deep_research` user label to its operations. In Google Cloud, labels are
lightweight key-value pairs used to organize resources and track costs
across your infrastructure.

- Automated labeling : You don't need to manually configure this label
in your API requests; the agent includes the `is_deep_research` label
by default for all executed tasks.
- Billing filtration : Deep Research billing reports are
filterable using the `is_deep_research` billing label.
- Comprehensive tracking : The `is_deep_research` billing label applies
to both your model usage (input and output tokens) and your tool execution
(search and grounding usage). This helps you aggregate and calculate the
total cost of your asynchronous research workflows.

> [!NOTE]
> Note: For broader strategies on using labels for resource organization and cost allocation across your Google Cloud environment, see the Resource Manager documentation on
> Labels.

## Quota

To accommodate higher traffic, concurrent background tasks, or heavier
research loads, you can request a quota increase for the Agent Platform API
directly within your Google Cloud project.

To increase your quota, do the following:

1. In the Google Cloud console, go to the Quotas & system limits page. Go to Quotas and system limits
2. Ensure you have selected the correct project that is running your
Deep Research workloads.
3. In the filter search box, search for Agent Platform API
(`aiplatform.googleapis.com`) to find your relevant agent and
interaction quotas.
4. Select the specific quota limit that you need to adjust.
5. Click Edit quotas.
6. In the Quota changes dialog, in the New value field, enter your
requested limit. Provide a clear justification in the request description.
Mentioning your specific Deep Research use case,
background execution needs, and expected traffic patterns can help
expedite the approval process.
7. Click Submit request.

> Note: Quota increase requests generally take a few business days to process. It is highly recommended to monitor your usage and submit increase requests proactively before production launches or anticipated usage spikes.

## Compliance and security

This section explains how your data is retained and cached, and lists the
security controls that are unsupported during Preview.

### Data retention

Prompts and Generated Output are stored for seven (7) days for standard
processing.

As outlined in Section 19 "Generative AI Services: Grounding with Google Search"
of the Service Specific Terms,
Google stores prompts and contextual information that customers may provide, and
generated output for three (3) days for the purposes of creating grounded
results and search suggestions, and this stored information may be used for
debugging and testing of systems that support grounding with Google Search.
There is no way to disable the storage of this information if you use Grounding
with Google Search. If you require zero data retention, we recommend using
Web Grounding for
Enterprise.

### Caching

Implicit caching
is enabled by default for Deep Research and can't be turned off.

### Security controls

The following security controls aren't supported during Preview:

- Customer-managed encryption keys (CMEK)
- VPC-Service Controls (VPC-SC)
- Access Transparency (AXT)
- Data residency
- Multi-region data residency

## What's next

Reference

### Interactions API reference

Learn about the Interactions API, which lets you interact with an agent.

Tutorial

### Notebook: Introduction to Gemini Deep Research Agent

Get started with this Deep Research Python notebook on GitHub.
