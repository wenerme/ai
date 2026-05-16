> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List all endpoints for a model

GET https://openrouter.ai/api/v1/models/{author}/{slug}/endpoints

Reference: https://openrouter.ai/docs/api/api-reference/endpoints/list-endpoints

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /models/{author}/{slug}/endpoints:
    get:
      operationId: list-endpoints
      summary: List all endpoints for a model
      tags:
        - subpackage_endpoints
      parameters:
        - name: author
          in: path
          description: The author/organization of the model
          required: true
          schema:
            type: string
        - name: slug
          in: path
          description: The model slug
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
          description: Returns a list of endpoints
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Endpoints_listEndpoints_Response_200'
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
    InstructType:
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
      title: InstructType
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
    ListEndpointsResponseArchitecture:
      type: object
      properties:
        input_modalities:
          type: array
          items:
            $ref: '#/components/schemas/InputModality'
          description: Supported input modalities
        instruct_type:
          oneOf:
            - $ref: '#/components/schemas/InstructType'
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
        - instruct_type
        - modality
        - output_modalities
        - tokenizer
      description: Model architecture information
      title: ListEndpointsResponseArchitecture
    PercentileStats:
      type: object
      properties:
        p50:
          type: number
          format: double
          description: Median (50th percentile)
        p75:
          type: number
          format: double
          description: 75th percentile
        p90:
          type: number
          format: double
          description: 90th percentile
        p99:
          type: number
          format: double
          description: 99th percentile
      required:
        - p50
        - p75
        - p90
        - p99
      description: >-
        Latency percentiles in milliseconds over the last 30 minutes. Latency
        measures time to first token. Only visible when authenticated with an
        API key or cookie; returns null for unauthenticated requests.
      title: PercentileStats
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    PublicEndpointPricing:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/BigNumberUnion'
        audio_output:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/BigNumberUnion'
        discount:
          type: number
          format: double
        image:
          $ref: '#/components/schemas/BigNumberUnion'
        image_output:
          $ref: '#/components/schemas/BigNumberUnion'
        image_token:
          $ref: '#/components/schemas/BigNumberUnion'
        input_audio_cache:
          $ref: '#/components/schemas/BigNumberUnion'
        input_cache_read:
          $ref: '#/components/schemas/BigNumberUnion'
        input_cache_write:
          $ref: '#/components/schemas/BigNumberUnion'
        internal_reasoning:
          $ref: '#/components/schemas/BigNumberUnion'
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        request:
          $ref: '#/components/schemas/BigNumberUnion'
        web_search:
          $ref: '#/components/schemas/BigNumberUnion'
      required:
        - completion
        - prompt
      title: PublicEndpointPricing
    ProviderName:
      type: string
      enum:
        - AkashML
        - AI21
        - AionLabs
        - Alibaba
        - Ambient
        - Baidu
        - Amazon Bedrock
        - Amazon Nova
        - Anthropic
        - Arcee AI
        - AtlasCloud
        - Avian
        - Azure
        - BaseTen
        - BytePlus
        - Black Forest Labs
        - Cerebras
        - Chutes
        - Cirrascale
        - Clarifai
        - Cloudflare
        - Cohere
        - Crucible
        - Crusoe
        - DeepInfra
        - DeepSeek
        - DekaLLM
        - Featherless
        - Fireworks
        - Friendli
        - GMICloud
        - Google
        - Google AI Studio
        - Groq
        - Hyperbolic
        - Inception
        - Inceptron
        - InferenceNet
        - Ionstream
        - Infermatic
        - Io Net
        - Inflection
        - Liquid
        - Mara
        - Mancer 2
        - Minimax
        - ModelRun
        - Mistral
        - Modular
        - Moonshot AI
        - Morph
        - NCompass
        - Nebius
        - Nex AGI
        - NextBit
        - Novita
        - Nvidia
        - OpenAI
        - OpenInference
        - Parasail
        - Poolside
        - Perceptron
        - Perplexity
        - Phala
        - Recraft
        - Reka
        - Relace
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Together
        - Upstage
        - Venice
        - WandB
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      title: ProviderName
    Quantization:
      type: string
      enum:
        - int4
        - int8
        - fp4
        - fp6
        - fp8
        - fp16
        - bf16
        - fp32
        - unknown
      title: Quantization
    EndpointStatus:
      type: string
      enum:
        - '0'
        - '-1'
        - '-2'
        - '-3'
        - '-5'
        - '-10'
      title: EndpointStatus
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
    PublicEndpointThroughputLast30M:
      type: object
      properties:
        p50:
          type: number
          format: double
          description: Median (50th percentile)
        p75:
          type: number
          format: double
          description: 75th percentile
        p90:
          type: number
          format: double
          description: 90th percentile
        p99:
          type: number
          format: double
          description: 99th percentile
      required:
        - p50
        - p75
        - p90
        - p99
      description: >-
        Throughput percentiles in tokens per second over the last 30 minutes.
        Throughput measures output token generation speed. Only visible when
        authenticated with an API key or cookie; returns null for
        unauthenticated requests.
      title: PublicEndpointThroughputLast30M
    PublicEndpoint:
      type: object
      properties:
        context_length:
          type: integer
        latency_last_30m:
          $ref: '#/components/schemas/PercentileStats'
        max_completion_tokens:
          type:
            - integer
            - 'null'
        max_prompt_tokens:
          type:
            - integer
            - 'null'
        model_id:
          type: string
          description: The unique identifier for the model (permaslug)
        model_name:
          type: string
        name:
          type: string
        pricing:
          $ref: '#/components/schemas/PublicEndpointPricing'
        provider_name:
          $ref: '#/components/schemas/ProviderName'
        quantization:
          $ref: '#/components/schemas/Quantization'
        status:
          $ref: '#/components/schemas/EndpointStatus'
        supported_parameters:
          type: array
          items:
            $ref: '#/components/schemas/Parameter'
        supports_implicit_caching:
          type: boolean
        tag:
          type: string
        throughput_last_30m:
          $ref: '#/components/schemas/PublicEndpointThroughputLast30M'
        uptime_last_1d:
          type:
            - number
            - 'null'
          format: double
          description: >-
            Uptime percentage over the last 1 day, calculated as successful
            requests / (successful + error requests) * 100. Rate-limited
            requests are excluded. Returns null if insufficient data.
        uptime_last_30m:
          type:
            - number
            - 'null'
          format: double
        uptime_last_5m:
          type:
            - number
            - 'null'
          format: double
          description: >-
            Uptime percentage over the last 5 minutes, calculated as successful
            requests / (successful + error requests) * 100. Rate-limited
            requests are excluded. Returns null if insufficient data.
      required:
        - context_length
        - latency_last_30m
        - max_completion_tokens
        - max_prompt_tokens
        - model_id
        - model_name
        - name
        - pricing
        - provider_name
        - quantization
        - supported_parameters
        - supports_implicit_caching
        - tag
        - throughput_last_30m
        - uptime_last_1d
        - uptime_last_30m
        - uptime_last_5m
      description: Information about a specific model endpoint
      title: PublicEndpoint
    ListEndpointsResponse:
      type: object
      properties:
        architecture:
          $ref: '#/components/schemas/ListEndpointsResponseArchitecture'
        created:
          type: integer
          description: Unix timestamp of when the model was created
        description:
          type: string
          description: Description of the model
        endpoints:
          type: array
          items:
            $ref: '#/components/schemas/PublicEndpoint'
          description: List of available endpoints for this model
        id:
          type: string
          description: Unique identifier for the model
        name:
          type: string
          description: Display name of the model
      required:
        - architecture
        - created
        - description
        - endpoints
        - id
        - name
      description: List of available endpoints for a model
      title: ListEndpointsResponse
    Endpoints_listEndpoints_Response_200:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/ListEndpointsResponse'
      required:
        - data
      title: Endpoints_listEndpoints_Response_200
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

## SDK Code Examples

```python Endpoints_listEndpoints_example
import requests

url = "https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Endpoints_listEndpoints_example
const url = 'https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Endpoints_listEndpoints_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Endpoints_listEndpoints_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Endpoints_listEndpoints_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Endpoints_listEndpoints_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Endpoints_listEndpoints_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Endpoints_listEndpoints_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/models/openai/gpt-4/endpoints")! as URL,
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