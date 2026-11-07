# OpenAI on Google Cloud

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Access to OpenAI models through Google Cloud is currently in **private preview**. To use them in your project, [request access](https://openai.com/form/openai-on-google-cloud/).

OpenAI models are available on the Gemini platform through Google Cloud, with usage billed to your Google Cloud account. The models run within Google Cloud’s security perimeter, and your organization manages access through Google Cloud IAM.

This guide covers how to make a Responses API request through Google Cloud and how feature support differs from the first-party OpenAI API.

The following models are available:

| Model         | Model ID        |
| ------------- | --------------- |
| GPT-6 Luna    | `gpt-6-luna`    |
| GPT-6.1 Sol   | `gpt-6.1-sol`   |
| GPT-6.1 Terra | `gpt-6.1-terra` |
| GPT-6 Astra   | `gpt-6-astra`   |

## Before you begin

Before you can make requests, your Google Cloud administrator needs to:

- Enable billing for the project, arrange project approval, and coordinate acceptance of the Marketplace private offer with your billing administrator.
- Enable the Vertex AI API (`aiplatform.googleapis.com`) and the model in Model Garden, including acceptance of the model terms.
- If your organization’s policy restricts model access, [allow the model in that policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access).
- Grant the user or service account making requests permission to call the model, for example by assigning the `roles/aiplatform.user` role.

Once the project is ready, ask your administrator for the project ID.

## Make your first API call

For local development, install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk) and sign in with the Google account that has access to your project:

```bash
gcloud auth application-default login
```

Get an access token in the terminal where you’ll run the request:

```bash
export GOOGLE_CLOUD_ACCESS_TOKEN="$(gcloud auth application-default print-access-token)"
```

When the access token expires, run this command again to get a new one using your saved sign-in.

Send the request with cURL or the [OpenAI SDK](https://developers.openai.com/api/docs/libraries#install-an-official-sdk), replacing `your-project-id` with your project ID.

Responses API request on Google Cloud

```bash
PROJECT_ID="your-project-id"
PROJECT_URL="https://aiplatform.googleapis.com/v1/projects/$PROJECT_ID"

curl --fail-with-body "$PROJECT_URL/locations/global/publishers/openai/v1/responses" \
  -H "Authorization: Bearer $GOOGLE_CLOUD_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-luna",
    "input": "Write a one-sentence bedtime story about a unicorn.",
    "store": false
  }'
```

```javascript
import OpenAI from "openai";

const projectId = "your-project-id";

const client = new OpenAI({
  apiKey: process.env.GOOGLE_CLOUD_ACCESS_TOKEN,
  baseURL: `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/openai/v1`,
});

const response = await client.responses.create({
  model: "gpt-6-luna",
  input: "Write a one-sentence bedtime story about a unicorn.",
  store: false,
});

console.log(response.output_text);
```

```python
import os

from openai import OpenAI

project_id = "your-project-id"

client = OpenAI(
    api_key=os.environ["GOOGLE_CLOUD_ACCESS_TOKEN"],
    base_url=(
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/openai/v1"
    ),
)
response = client.responses.create(
    model="gpt-6-luna",
    input="Write a one-sentence bedtime story about a unicorn.",
    store=False,
)
print(response.output_text)
```

```go
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	ctx := context.Background()
	projectID := "your-project-id"
	client := openai.NewClient(
		option.WithAPIKey(os.Getenv("GOOGLE_CLOUD_ACCESS_TOKEN")),
		option.WithBaseURL("https://aiplatform.googleapis.com/v1/projects/"+projectID+"/locations/global/publishers/openai/v1"),
	)

	response, err := client.Responses.New(ctx, responses.ResponseNewParams{
		Model: "gpt-6-luna",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Write a one-sentence bedtime story about a unicorn."),
		},
		Store: openai.Bool(false),
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(response.OutputText())
}
```


To get access tokens through Google’s authentication library instead of exporting them in your terminal, follow Google’s [getting-started guide](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/openai_gpt_intro.ipynb), which explains how to use Application Default Credentials (ADC) and troubleshoot API errors.

## Feature availability

The table compares feature support on Google Cloud with the first-party OpenAI API.



  <table aria-label="Feature availability">
    <thead>
      <tr>
        <th scope="col">Capability</th>
        <th scope="col">OpenAI API</th>
        <th scope="col">Google Cloud</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="rowgroup" colSpan="3">
          API requests
        </th>
      </tr>
      <tr>
        <td>Text generation</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Streaming responses over HTTP (SSE)</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Responses API endpoint</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Response token usage</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Input token count endpoint</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Realtime WebSocket connections</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Background requests</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Background stream resume</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Chat Completions API</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Batch processing</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope="rowgroup" colSpan="3">
          Output and reasoning
        </th>
      </tr>
      <tr>
        <td>Structured outputs with JSON Schema</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>JSON mode</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Reasoning effort</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Encrypted reasoning</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Reasoning summaries</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope="rowgroup" colSpan="3">
          Tools and integrations
        </th>
      </tr>
      <tr>
        <td>Client-side function calling</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Parallel tool calls</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Structured function arguments</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Custom tools</td>
        <td>Available</td>
        <td>Available with freeform input or regex constraints</td>
      </tr>
      <tr>
        <td>Client-side tool search</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Client-run MCP and namespaced tools</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Client-side shell tool</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Hosted web search</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Hosted file search and vector stores</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Hosted code execution</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
      <tr>
        <td>Server-side remote MCP</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope="rowgroup" colSpan="3">
          Documents and media
        </th>
      </tr>
      <tr>
        <td>PDF text extraction</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Inline image input</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Image generation</td>
        <td>Available</td>
        <td>Not available</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope="rowgroup" colSpan="3">
          Conversation state
        </th>
      </tr>
      <tr>
        <td>Saved conversation continuation</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Stateless conversation continuation</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Conversation compaction</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
      <tr>
        <td>Explicit prompt-cache controls</td>
        <td>Available</td>
        <td>Available</td>
      </tr>
    </tbody>
  </table>


## Data retention

Your prompts and responses are not used to train OpenAI models. Default retention is up to 30 days.

If you require Zero Data Retention (ZDR), contact your OpenAI or Google Cloud representative during onboarding and wait for confirmation of support. Setting `store: false` on a request does not enable ZDR.