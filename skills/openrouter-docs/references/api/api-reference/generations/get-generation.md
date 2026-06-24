> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get request & usage metadata for a generation

GET https://openrouter.ai/api/v1/generation

Reference: https://openrouter.ai/docs/api/api-reference/generations/get-generation

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /generation:
    get:
      operationId: get-generation
      summary: Get request & usage metadata for a generation
      tags:
        - subpackage_generations
      parameters:
        - name: id
          in: query
          description: The generation ID
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
          description: Returns the request metadata for this generation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerationResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '402':
          description: Payment Required - Insufficient credits or quota to complete request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentRequiredResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '429':
          description: Too Many Requests - Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
        '502':
          description: Bad Gateway - Provider/upstream API failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    GenerationResponseDataApiType:
      type: string
      enum:
        - completions
        - embeddings
        - rerank
        - tts
        - stt
        - video
        - image
      description: Type of API used for the generation
      title: GenerationResponseDataApiType
    GenerationResponseDataDataRegion:
      type: string
      enum:
        - global
        - europe
      description: >-
        The data region this generation was routed through. 'europe' for
        EU-routed requests, 'global' otherwise.
      title: GenerationResponseDataDataRegion
    ProviderResponseProviderName:
      type: string
      enum:
        - AnyScale
        - Atoma
        - Cent-ML
        - CrofAI
        - Enfer
        - GoPomelo
        - HuggingFace
        - Hyperbolic
        - Hyperbolic 2
        - InoCloud
        - Kluster
        - Lambda
        - Lepton
        - Lynn 2
        - Lynn
        - Mancer
        - Meta
        - Modal
        - Nineteen
        - OctoAI
        - Recursal
        - Reflection
        - Replicate
        - SambaNova 2
        - SF Compute
        - Targon
        - Together 2
        - Ubicloud
        - 01.AI
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
        - Darkbloom
        - Decart
        - DeepInfra
        - DeepSeek
        - DekaLLM
        - DigitalOcean
        - Featherless
        - Fireworks
        - Friendli
        - GMICloud
        - Google
        - Google AI Studio
        - Groq
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
        - Sakana AI
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Tenstorrent
        - Together
        - Upstage
        - Venice
        - Wafer
        - WandB
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      description: Name of the provider
      title: ProviderResponseProviderName
    ProviderResponse:
      type: object
      properties:
        endpoint_id:
          type: string
          description: Internal endpoint identifier
        id:
          type: string
          description: Upstream provider response identifier
        is_byok:
          type: boolean
          description: Whether the request used a bring-your-own-key
        latency:
          type: number
          format: double
          description: Response latency in milliseconds
        model_permaslug:
          type: string
          description: Canonical model slug
        provider_name:
          $ref: '#/components/schemas/ProviderResponseProviderName'
          description: Name of the provider
        status:
          type:
            - integer
            - 'null'
          description: HTTP status code from the provider
      required:
        - status
      description: Details of a provider response for a generation attempt
      title: ProviderResponse
    GenerationResponseData:
      type: object
      properties:
        api_type:
          oneOf:
            - $ref: '#/components/schemas/GenerationResponseDataApiType'
            - type: 'null'
          description: Type of API used for the generation
        app_id:
          type:
            - integer
            - 'null'
          description: ID of the app that made the request
        cache_discount:
          type:
            - number
            - 'null'
          format: double
          description: Discount applied due to caching
        cancelled:
          type:
            - boolean
            - 'null'
          description: Whether the generation was cancelled
        created_at:
          type: string
          description: ISO 8601 timestamp of when the generation was created
        data_region:
          $ref: '#/components/schemas/GenerationResponseDataDataRegion'
          description: >-
            The data region this generation was routed through. 'europe' for
            EU-routed requests, 'global' otherwise.
        external_user:
          type:
            - string
            - 'null'
          description: External user identifier
        finish_reason:
          type:
            - string
            - 'null'
          description: Reason the generation finished
        generation_time:
          type:
            - number
            - 'null'
          format: double
          description: Time taken for generation in milliseconds
        http_referer:
          type:
            - string
            - 'null'
          description: Referer header from the request
        id:
          type: string
          description: Unique identifier for the generation
        is_byok:
          type: boolean
          description: Whether this used bring-your-own-key
        latency:
          type:
            - number
            - 'null'
          format: double
          description: Total latency in milliseconds
        model:
          type: string
          description: Model used for the generation
        moderation_latency:
          type:
            - number
            - 'null'
          format: double
          description: Moderation latency in milliseconds
        native_finish_reason:
          type:
            - string
            - 'null'
          description: Native finish reason as reported by provider
        native_tokens_cached:
          type:
            - integer
            - 'null'
          description: Native cached tokens as reported by provider
        native_tokens_completion:
          type:
            - integer
            - 'null'
          description: Native completion tokens as reported by provider
        native_tokens_completion_images:
          type:
            - integer
            - 'null'
          description: Native completion image tokens as reported by provider
        native_tokens_prompt:
          type:
            - integer
            - 'null'
          description: Native prompt tokens as reported by provider
        native_tokens_reasoning:
          type:
            - integer
            - 'null'
          description: Native reasoning tokens as reported by provider
        num_fetches:
          type:
            - integer
            - 'null'
          description: Number of web fetches performed
        num_input_audio_prompt:
          type:
            - integer
            - 'null'
          description: Number of audio inputs in the prompt
        num_media_completion:
          type:
            - integer
            - 'null'
          description: Number of media items in the completion
        num_media_prompt:
          type:
            - integer
            - 'null'
          description: Number of media items in the prompt
        num_search_results:
          type:
            - integer
            - 'null'
          description: Number of search results included
        origin:
          type: string
          description: Origin URL of the request
        preset_id:
          type:
            - string
            - 'null'
          description: >-
            ID of the preset used for this generation, null if no preset was
            used
        provider_name:
          type:
            - string
            - 'null'
          description: Name of the provider that served the request
        provider_responses:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderResponse'
          description: >-
            List of provider responses for this generation, including fallback
            attempts
        request_id:
          type:
            - string
            - 'null'
          description: Unique identifier grouping all generations from a single API request
        response_cache_source_id:
          type:
            - string
            - 'null'
          description: >-
            If this generation was served from response cache, contains the
            original generation ID. Null otherwise.
        router:
          type:
            - string
            - 'null'
          description: Router used for the request (e.g., openrouter/auto)
        service_tier:
          type:
            - string
            - 'null'
          description: >-
            Service tier the upstream provider reported running this request on,
            or null if it did not report one.
        session_id:
          type:
            - string
            - 'null'
          description: Session identifier grouping multiple generations in the same session
        streamed:
          type:
            - boolean
            - 'null'
          description: Whether the response was streamed
        tokens_completion:
          type:
            - integer
            - 'null'
          description: Number of tokens in the completion
        tokens_prompt:
          type:
            - integer
            - 'null'
          description: Number of tokens in the prompt
        total_cost:
          type: number
          format: double
          description: Total cost of the generation in USD
        upstream_id:
          type:
            - string
            - 'null'
          description: Upstream provider's identifier for this generation
        upstream_inference_cost:
          type:
            - number
            - 'null'
          format: double
          description: Cost charged by the upstream provider
        usage:
          type: number
          format: double
          description: Usage amount in USD
        user_agent:
          type:
            - string
            - 'null'
          description: User-Agent header from the request
        web_search_engine:
          type:
            - string
            - 'null'
          description: >-
            The resolved web search engine used for this generation (e.g. exa,
            firecrawl, parallel)
      required:
        - api_type
        - app_id
        - cache_discount
        - cancelled
        - created_at
        - data_region
        - external_user
        - finish_reason
        - generation_time
        - http_referer
        - id
        - is_byok
        - latency
        - model
        - moderation_latency
        - native_finish_reason
        - native_tokens_cached
        - native_tokens_completion
        - native_tokens_completion_images
        - native_tokens_prompt
        - native_tokens_reasoning
        - num_fetches
        - num_input_audio_prompt
        - num_media_completion
        - num_media_prompt
        - num_search_results
        - origin
        - preset_id
        - provider_name
        - provider_responses
        - router
        - service_tier
        - streamed
        - tokens_completion
        - tokens_prompt
        - total_cost
        - upstream_id
        - upstream_inference_cost
        - usage
        - user_agent
        - web_search_engine
      description: Generation data
      title: GenerationResponseData
    GenerationResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/GenerationResponseData'
          description: Generation data
      required:
        - data
      description: Generation response
      title: GenerationResponse
    UnauthorizedResponseErrorData:
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
      description: Error data for UnauthorizedResponse
      title: UnauthorizedResponseErrorData
    UnauthorizedResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
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
      description: Unauthorized - Authentication required or invalid credentials
      title: UnauthorizedResponse
    PaymentRequiredResponseErrorData:
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
      description: Error data for PaymentRequiredResponse
      title: PaymentRequiredResponseErrorData
    PaymentRequiredResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/PaymentRequiredResponseErrorData'
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
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
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
    TooManyRequestsResponseErrorData:
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
      description: Error data for TooManyRequestsResponse
      title: TooManyRequestsResponseErrorData
    TooManyRequestsResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
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
      description: Too Many Requests - Rate limit exceeded
      title: TooManyRequestsResponse
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
    BadGatewayResponseErrorData:
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
      description: Error data for BadGatewayResponse
      title: BadGatewayResponseErrorData
    BadGatewayResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
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
      description: Bad Gateway - Provider/upstream API failure
      title: BadGatewayResponse
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
    "api_type": "completions",
    "app_id": 12345,
    "cache_discount": null,
    "cancelled": false,
    "created_at": "2024-07-15T23:33:19.433273+00:00",
    "data_region": "global",
    "external_user": "user-123",
    "finish_reason": "stop",
    "generation_time": 1200,
    "http_referer": "https://openrouter.ai/",
    "id": "gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG",
    "is_byok": false,
    "latency": 1250,
    "model": "sao10k/l3-stheno-8b",
    "moderation_latency": 50,
    "native_finish_reason": "stop",
    "native_tokens_cached": 3,
    "native_tokens_completion": 25,
    "native_tokens_completion_images": 0,
    "native_tokens_prompt": 10,
    "native_tokens_reasoning": 5,
    "num_fetches": 0,
    "num_input_audio_prompt": 0,
    "num_media_completion": 0,
    "num_media_prompt": 1,
    "num_search_results": 5,
    "origin": "https://openrouter.ai/",
    "preset_id": "a9e8d400-592a-494f-908c-375efa66cafd",
    "provider_name": "Infermatic",
    "provider_responses": null,
    "router": "openrouter/auto",
    "service_tier": "priority",
    "streamed": true,
    "tokens_completion": 25,
    "tokens_prompt": 10,
    "total_cost": 0.0015,
    "upstream_id": "chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946",
    "upstream_inference_cost": 0.0012,
    "usage": 0.0015,
    "user_agent": "Mozilla/5.0",
    "web_search_engine": "exa",
    "request_id": "req-1727282430-aBcDeFgHiJkLmNoPqRsT",
    "session_id": null
  }
}
```

**SDK Code**

```python Generations_getGeneration_example
import requests

url = "https://openrouter.ai/api/v1/generation"

querystring = {"id":"gen-1234567890"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Generations_getGeneration_example
const url = 'https://openrouter.ai/api/v1/generation?id=gen-1234567890';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Generations_getGeneration_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/generation?id=gen-1234567890"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Generations_getGeneration_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/generation?id=gen-1234567890")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Generations_getGeneration_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/generation?id=gen-1234567890")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Generations_getGeneration_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/generation?id=gen-1234567890', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Generations_getGeneration_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/generation?id=gen-1234567890");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Generations_getGeneration_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/generation?id=gen-1234567890")! as URL,
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