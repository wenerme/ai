> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Preview the impact of ZDR on the available endpoints

GET https://openrouter.ai/api/v1/endpoints/zdr

Reference: https://openrouter.ai/docs/api/api-reference/endpoints/list-endpoints-zdr

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /endpoints/zdr:
    get:
      operationId: list-endpoints-zdr
      summary: Preview the impact of ZDR on the available endpoints
      tags:
        - subpackage_endpoints
      parameters:
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
                $ref: '#/components/schemas/Endpoints_listEndpointsZdr_Response_200'
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
    Endpoints_listEndpointsZdr_Response_200:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/PublicEndpoint'
      required:
        - data
      title: Endpoints_listEndpointsZdr_Response_200
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

```python Endpoints_listEndpointsZdr_example
import requests

url = "https://openrouter.ai/api/v1/endpoints/zdr"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Endpoints_listEndpointsZdr_example
const url = 'https://openrouter.ai/api/v1/endpoints/zdr';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Endpoints_listEndpointsZdr_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/endpoints/zdr"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Endpoints_listEndpointsZdr_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/endpoints/zdr")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Endpoints_listEndpointsZdr_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/endpoints/zdr")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Endpoints_listEndpointsZdr_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/endpoints/zdr', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Endpoints_listEndpointsZdr_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/endpoints/zdr");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Endpoints_listEndpointsZdr_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/endpoints/zdr")! as URL,
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