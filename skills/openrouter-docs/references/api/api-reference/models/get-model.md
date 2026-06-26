> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get a model by its slug

GET https://openrouter.ai/api/v1/model/{author}/{slug}

Returns full details for a single model identified by its author and slug (e.g. openai/gpt-4). Supports variant suffixes (e.g. openai/gpt-4:free) and resolves known slug aliases.

Reference: https://openrouter.ai/docs/api/api-reference/models/get-model

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /model/{author}/{slug}:
    get:
      operationId: get-model
      summary: Get a model by its slug
      description: >-
        Returns full details for a single model identified by its author and
        slug (e.g. openai/gpt-4). Supports variant suffixes (e.g.
        openai/gpt-4:free) and resolves known slug aliases.
      tags:
        - subpackage_models
      parameters:
        - name: author
          in: path
          description: The author/organization of the model
          required: true
          schema:
            type: string
        - name: slug
          in: path
          description: >-
            The model slug, optionally including a variant suffix (e.g. gpt-4 or
            gpt-4:free)
          required: true
          schema:
            type: string
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Returns the model details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ModelResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    InputModality:
      type: string
      enum:
        - text
        - image
        - file
        - audio
        - video
      title: InputModality
    ModelArchitectureInstructType:
      type: string
      enum:
        - none
        - airoboros
        - alpaca
        - alpaca-modif
        - chatml
        - claude
        - code-llama
        - gemma
        - llama2
        - llama3
        - mistral
        - nemotron
        - neural
        - openchat
        - phi3
        - rwkv
        - vicuna
        - zephyr
        - deepseek-r1
        - deepseek-v3.1
        - qwq
        - qwen3
      description: Instruction format type
      title: ModelArchitectureInstructType
    OutputModality:
      type: string
      enum:
        - text
        - image
        - embeddings
        - audio
        - video
        - rerank
        - speech
        - transcription
      title: OutputModality
    ModelGroup:
      type: string
      enum:
        - Router
        - Media
        - Other
        - GPT
        - Claude
        - Gemini
        - Gemma
        - Grok
        - Cohere
        - Nova
        - Qwen
        - Yi
        - DeepSeek
        - Mistral
        - Llama2
        - Llama3
        - Llama4
        - PaLM
        - RWKV
        - Qwen3
      description: Tokenizer type used by the model
      title: ModelGroup
    ModelArchitecture:
      type: object
      properties:
        input_modalities:
          type: array
          items:
            $ref: '#/components/schemas/InputModality'
          description: Supported input modalities
        instruct_type:
          oneOf:
            - $ref: '#/components/schemas/ModelArchitectureInstructType'
            - type: 'null'
          description: Instruction format type
        modality:
          type:
            - string
            - 'null'
          description: Primary modality of the model
        output_modalities:
          type: array
          items:
            $ref: '#/components/schemas/OutputModality'
          description: Supported output modalities
        tokenizer:
          $ref: '#/components/schemas/ModelGroup'
      required:
        - input_modalities
        - modality
        - output_modalities
      description: Model architecture information
      title: ModelArchitecture
    AABenchmarkEntry:
      type: object
      properties:
        agentic_index:
          type:
            - number
            - 'null'
          format: double
          description: Artificial Analysis Agentic Index score
        coding_index:
          type:
            - number
            - 'null'
          format: double
          description: Artificial Analysis Coding Index score
        intelligence_index:
          type:
            - number
            - 'null'
          format: double
          description: Artificial Analysis Intelligence Index score
      required:
        - agentic_index
        - coding_index
        - intelligence_index
      description: Artificial Analysis benchmark index scores.
      title: AABenchmarkEntry
    DABenchmarkEntry:
      type: object
      properties:
        arena:
          type: string
          description: Arena type (e.g. models, builders, agents)
        category:
          type: string
          description: Category within the arena (e.g. website, gamedev, uicomponent)
        elo:
          type: number
          format: double
          description: ELO rating from head-to-head arena battles
        rank:
          type: integer
          description: >-
            Rank position within this arena+category among models available on
            OpenRouter (1 = highest ELO)
        win_rate:
          type: number
          format: double
          description: Win rate percentage in arena battles
      required:
        - arena
        - category
        - elo
        - rank
        - win_rate
      description: A single Design Arena benchmark entry for a specific arena+category
      title: DABenchmarkEntry
    ModelBenchmarks:
      type: object
      properties:
        artificial_analysis:
          $ref: '#/components/schemas/AABenchmarkEntry'
        design_arena:
          type: array
          items:
            $ref: '#/components/schemas/DABenchmarkEntry'
          description: Design Arena ELO rankings across arena+category pairs.
      required:
        - design_arena
      description: >-
        Third-party benchmark rankings for this model. Omitted when no benchmark
        data is available.
      title: ModelBenchmarks
    DefaultParameters:
      type: object
      properties:
        frequency_penalty:
          type:
            - number
            - 'null'
          format: double
        presence_penalty:
          type:
            - number
            - 'null'
          format: double
        repetition_penalty:
          type:
            - number
            - 'null'
          format: double
        temperature:
          type:
            - number
            - 'null'
          format: double
        top_k:
          type:
            - integer
            - 'null'
        top_p:
          type:
            - number
            - 'null'
          format: double
      description: Default parameters for this model
      title: DefaultParameters
    ModelLinks:
      type: object
      properties:
        details:
          type: string
          description: URL for the model details/endpoints API
      required:
        - details
      description: Related API endpoints and resources for this model.
      title: ModelLinks
    PerRequestLimits:
      type: object
      properties:
        completion_tokens:
          type: number
          format: double
          description: Maximum completion tokens per request
        prompt_tokens:
          type: number
          format: double
          description: Maximum prompt tokens per request
      required:
        - completion_tokens
        - prompt_tokens
      description: Per-request token limits
      title: PerRequestLimits
    PublicPricing:
      type: object
      properties:
        audio:
          type: string
          description: Price in USD per audio input token
        audio_output:
          type: string
          description: Price in USD per audio output token
        completion:
          type: string
          description: Price in USD per token for completion (output) generation
        discount:
          type: number
          format: double
          description: >-
            Fractional discount applied to this endpoint's pricing; the price is
            multiplied by (1 - discount) (0 = no discount, 1 = free)
        image:
          type: string
          description: Price in USD per input image
        image_output:
          type: string
          description: Price in USD per output image
        image_token:
          type: string
          description: Price in USD per image token
        input_audio_cache:
          type: string
          description: Price in USD per cached audio input token
        input_cache_read:
          type: string
          description: Price in USD per cached input token (read)
        input_cache_write:
          type: string
          description: >-
            Price per cache-write token, in USD per token. For providers with
            multiple cache TTLs (e.g. Anthropic), this is the default (5-minute)
            cache-write rate.
        input_cache_write_1h:
          type: string
          description: >-
            Price per 1-hour cache-write token, in USD per token. Only present
            for providers that price an extended (1-hour) cache TTL separately,
            such as Anthropic.
        internal_reasoning:
          type: string
          description: Price in USD per internal reasoning token
        prompt:
          type: string
          description: Price in USD per token for prompt (input) processing
        request:
          type: string
          description: Price in USD per request
        web_search:
          type: string
          description: Price in USD per web search
      required:
        - completion
        - prompt
      description: Pricing information for the model
      title: PublicPricing
    ReasoningEffort:
      type: string
      enum:
        - max
        - xhigh
        - high
        - medium
        - low
        - minimal
        - none
      title: ReasoningEffort
    ModelReasoning:
      type: object
      properties:
        default_effort:
          $ref: '#/components/schemas/ReasoningEffort'
        default_enabled:
          type: boolean
          description: >-
            Default reasoning enabled state when the client does not set
            `reasoning.enabled`.
        mandatory:
          type: boolean
          description: >-
            When true, reasoning cannot be disabled and effort "none" is
            rejected.
        supported_efforts:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningEffort'
          description: >-
            Allowed reasoning effort values for this model, in descending effort
            order (highest first). Null means no allowlist — all gateway effort
            values are accepted.
        supports_max_tokens:
          type: boolean
          description: >-
            Present and `true` when the model accepts `reasoning.max_tokens` in
            requests (Anthropic-style) instead of or in addition to
            `reasoning.effort`. Omitted otherwise.
      required:
        - mandatory
      description: >-
        Reasoning effort configuration. Omitted for non-reasoning models and
        dynamic router models.
      title: ModelReasoning
    Parameter:
      type: string
      enum:
        - temperature
        - top_p
        - top_k
        - min_p
        - top_a
        - frequency_penalty
        - presence_penalty
        - repetition_penalty
        - max_tokens
        - max_completion_tokens
        - logit_bias
        - logprobs
        - top_logprobs
        - seed
        - response_format
        - structured_outputs
        - stop
        - tools
        - tool_choice
        - parallel_tool_calls
        - include_reasoning
        - reasoning
        - reasoning_effort
        - web_search_options
        - verbosity
      title: Parameter
    TopProviderInfo:
      type: object
      properties:
        context_length:
          type:
            - integer
            - 'null'
          description: Context length from the top provider
        is_moderated:
          type: boolean
          description: Whether the top provider moderates content
        max_completion_tokens:
          type:
            - integer
            - 'null'
          description: Maximum completion tokens from the top provider
      required:
        - is_moderated
      description: Information about the top provider for this model
      title: TopProviderInfo
    Model:
      type: object
      properties:
        architecture:
          $ref: '#/components/schemas/ModelArchitecture'
        benchmarks:
          $ref: '#/components/schemas/ModelBenchmarks'
        canonical_slug:
          type: string
          description: Canonical slug for the model
        context_length:
          type:
            - integer
            - 'null'
          description: Maximum context length in tokens
        created:
          type: integer
          description: Unix timestamp of when the model was created
        default_parameters:
          $ref: '#/components/schemas/DefaultParameters'
        description:
          type: string
          description: Description of the model
        expiration_date:
          type:
            - string
            - 'null'
          description: >-
            The date after which the model may be removed. ISO 8601 date string
            (YYYY-MM-DD) or null if no expiration.
        hugging_face_id:
          type:
            - string
            - 'null'
          description: Hugging Face model identifier, if applicable
        id:
          type: string
          description: Unique identifier for the model
        knowledge_cutoff:
          type:
            - string
            - 'null'
          description: >-
            The date up to which the model was trained on data. ISO 8601 date
            string (YYYY-MM-DD) or null if unknown.
        links:
          $ref: '#/components/schemas/ModelLinks'
        name:
          type: string
          description: Display name of the model
        per_request_limits:
          $ref: '#/components/schemas/PerRequestLimits'
        pricing:
          $ref: '#/components/schemas/PublicPricing'
        reasoning:
          $ref: '#/components/schemas/ModelReasoning'
        supported_parameters:
          type: array
          items:
            $ref: '#/components/schemas/Parameter'
          description: List of supported parameters for this model
        supported_voices:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            List of supported voice identifiers for TTS models. Null for non-TTS
            models.
        top_provider:
          $ref: '#/components/schemas/TopProviderInfo'
      required:
        - architecture
        - canonical_slug
        - context_length
        - created
        - default_parameters
        - id
        - links
        - name
        - per_request_limits
        - pricing
        - supported_parameters
        - supported_voices
        - top_provider
      description: Information about an AI model available on OpenRouter
      title: Model
    ModelResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/Model'
      required:
        - data
      description: Single model response
      title: ModelResponse
    NotFoundResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for NotFoundResponse
      title: NotFoundResponseErrorData
    NotFoundResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Not Found - Resource does not exist
      title: NotFoundResponse
    InternalServerResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for InternalServerResponse
      title: InternalServerResponseErrorData
    InternalServerResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Internal Server Error - Unexpected server error
      title: InternalServerResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## Examples



**Response**

```json
{
  "data": {
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "modality": "text->text",
      "output_modalities": [
        "text"
      ],
      "instruct_type": "chatml",
      "tokenizer": "GPT"
    },
    "canonical_slug": "openai/gpt-4",
    "context_length": 8192,
    "created": 1692901234,
    "default_parameters": {
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "repetition_penalty": 1,
      "temperature": 0.7,
      "top_k": 0,
      "top_p": 0.9
    },
    "id": "openai/gpt-4",
    "links": {
      "details": "/api/v1/models/openai/gpt-5.4/endpoints"
    },
    "name": "GPT-4",
    "per_request_limits": null,
    "pricing": {
      "completion": "0.00006",
      "prompt": "0.00003",
      "image": "0",
      "request": "0"
    },
    "supported_parameters": [
      "temperature",
      "top_p",
      "max_tokens"
    ],
    "supported_voices": null,
    "top_provider": {
      "is_moderated": true,
      "context_length": 8192,
      "max_completion_tokens": 4096
    },
    "description": "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy."
  }
}
```

**SDK Code**

```python Models_getModel_example
import requests

url = "https://openrouter.ai/api/v1/model/openai/gpt-4"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Models_getModel_example
const url = 'https://openrouter.ai/api/v1/model/openai/gpt-4';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Models_getModel_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/model/openai/gpt-4"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Models_getModel_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/model/openai/gpt-4")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Models_getModel_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/model/openai/gpt-4")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Models_getModel_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/model/openai/gpt-4', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Models_getModel_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/model/openai/gpt-4");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Models_getModel_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/model/openai/gpt-4")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```