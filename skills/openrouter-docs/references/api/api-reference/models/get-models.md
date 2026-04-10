For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/models/llms.txt. For full documentation content, see https://openrouter.ai/docs/api/api-reference/models/llms-full.txt.

# List all models and their properties

GET https://openrouter.ai/api/v1/models

Reference: https://openrouter.ai/docs/api/api-reference/models/get-models

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /models:
    get:
      operationId: get-models
      summary: List all models and their properties
      tags:
        - subpackage_models
      parameters:
        - name: category
          in: query
          description: Filter models by use case category
          required: false
          schema:
            $ref: '#/components/schemas/ModelsGetParametersCategory'
        - name: supported_parameters
          in: query
          description: Filter models by supported parameter (comma-separated)
          required: false
          schema:
            type: string
        - name: output_modalities
          in: query
          description: >-
            Filter models by output modality. Accepts a comma-separated list of
            modalities (text, image, audio, embeddings) or "all" to include all
            models. Defaults to "text".
          required: false
          schema:
            type: string
        - name: use_rss
          in: query
          description: Return results as RSS feed
          required: false
          schema:
            type: string
        - name: use_rss_chat_links
          in: query
          description: Use chat links in RSS feed items
          required: false
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
          description: Returns a list of models or RSS feed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ModelsListResponse'
        '400':
          description: Bad Request - Invalid request parameters or malformed input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
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
    ModelsGetParametersCategory:
      type: string
      enum:
        - programming
        - roleplay
        - marketing
        - marketing/seo
        - technology
        - science
        - translation
        - legal
        - finance
        - health
        - trivia
        - academia
      description: Filter models by use case category
      title: ModelsGetParametersCategory
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
    DefaultParameters:
      type: object
      properties:
        frequency_penalty:
          type: number
          format: double
        presence_penalty:
          type: number
          format: double
        repetition_penalty:
          type: number
          format: double
        temperature:
          type: number
          format: double
        top_k:
          type:
            - integer
            - 'null'
        top_p:
          type: number
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
    PublicPricingAudio:
      type: object
      properties: {}
      title: PublicPricingAudio
    PublicPricingAudioOutput:
      type: object
      properties: {}
      title: PublicPricingAudioOutput
    PublicPricingCompletion:
      type: object
      properties: {}
      title: PublicPricingCompletion
    PublicPricingImage:
      type: object
      properties: {}
      title: PublicPricingImage
    PublicPricingImageOutput:
      type: object
      properties: {}
      title: PublicPricingImageOutput
    PublicPricingImageToken:
      type: object
      properties: {}
      title: PublicPricingImageToken
    PublicPricingInputAudioCache:
      type: object
      properties: {}
      title: PublicPricingInputAudioCache
    PublicPricingInputCacheRead:
      type: object
      properties: {}
      title: PublicPricingInputCacheRead
    PublicPricingInputCacheWrite:
      type: object
      properties: {}
      title: PublicPricingInputCacheWrite
    PublicPricingInternalReasoning:
      type: object
      properties: {}
      title: PublicPricingInternalReasoning
    PublicPricingPrompt:
      type: object
      properties: {}
      title: PublicPricingPrompt
    PublicPricingRequest:
      type: object
      properties: {}
      title: PublicPricingRequest
    PublicPricingWebSearch:
      type: object
      properties: {}
      title: PublicPricingWebSearch
    PublicPricing:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/PublicPricingAudio'
        audio_output:
          $ref: '#/components/schemas/PublicPricingAudioOutput'
        completion:
          $ref: '#/components/schemas/PublicPricingCompletion'
        discount:
          type: number
          format: double
        image:
          $ref: '#/components/schemas/PublicPricingImage'
        image_output:
          $ref: '#/components/schemas/PublicPricingImageOutput'
        image_token:
          $ref: '#/components/schemas/PublicPricingImageToken'
        input_audio_cache:
          $ref: '#/components/schemas/PublicPricingInputAudioCache'
        input_cache_read:
          $ref: '#/components/schemas/PublicPricingInputCacheRead'
        input_cache_write:
          $ref: '#/components/schemas/PublicPricingInputCacheWrite'
        internal_reasoning:
          $ref: '#/components/schemas/PublicPricingInternalReasoning'
        prompt:
          $ref: '#/components/schemas/PublicPricingPrompt'
        request:
          $ref: '#/components/schemas/PublicPricingRequest'
        web_search:
          $ref: '#/components/schemas/PublicPricingWebSearch'
      required:
        - completion
        - prompt
      description: Pricing information for the model
      title: PublicPricing
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
          type: integer
          description: Context length from the top provider
        is_moderated:
          type: boolean
          description: Whether the top provider moderates content
        max_completion_tokens:
          type: integer
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
        canonical_slug:
          type: string
          description: Canonical slug for the model
        context_length:
          type: integer
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
        supported_parameters:
          type: array
          items:
            $ref: '#/components/schemas/Parameter'
          description: List of supported parameters for this model
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
        - top_provider
      description: Information about an AI model available on OpenRouter
      title: Model
    ModelsListResponseData:
      type: array
      items:
        $ref: '#/components/schemas/Model'
      description: List of available models
      title: ModelsListResponseData
    ModelsListResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/ModelsListResponseData'
      required:
        - data
      description: List of available models
      title: ModelsListResponse
    BadRequestResponseErrorData:
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
      description: Error data for BadRequestResponse
      title: BadRequestResponseErrorData
    BadRequestResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadRequestResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Request - Invalid request parameters or malformed input
      title: BadRequestResponse
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

```python
import requests

url = "https://openrouter.ai/api/v1/models"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/models';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/models"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/models")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/models")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/models', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/models");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/models")! as URL,
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