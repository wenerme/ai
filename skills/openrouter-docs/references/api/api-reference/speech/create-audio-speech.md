> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Create speech

POST https://openrouter.ai/api/v1/audio/speech
Content-Type: application/json

Synthesizes audio from the input text. Returns a raw audio bytestream in the requested format (e.g. mp3, pcm, wav).

Reference: https://openrouter.ai/docs/api/api-reference/speech/create-audio-speech

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /audio/speech:
    post:
      operationId: create-audio-speech
      summary: Create speech
      description: >-
        Synthesizes audio from the input text. Returns a raw audio bytestream in
        the requested format (e.g. mp3, pcm, wav).
      tags:
        - subpackage_tts
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Audio bytes stream
          content:
            application/octet-stream:
              schema:
                type: string
                format: binary
        '400':
          description: Bad Request - Invalid request parameters or malformed input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
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
        '503':
          description: Service Unavailable - Service temporarily unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SpeechRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    ProviderOptions:
      type: object
      properties:
        01ai:
          type: object
          additionalProperties:
            description: Any type
        ai21:
          type: object
          additionalProperties:
            description: Any type
        aion-labs:
          type: object
          additionalProperties:
            description: Any type
        akashml:
          type: object
          additionalProperties:
            description: Any type
        alibaba:
          type: object
          additionalProperties:
            description: Any type
        amazon-bedrock:
          type: object
          additionalProperties:
            description: Any type
        amazon-nova:
          type: object
          additionalProperties:
            description: Any type
        ambient:
          type: object
          additionalProperties:
            description: Any type
        anthropic:
          type: object
          additionalProperties:
            description: Any type
        anyscale:
          type: object
          additionalProperties:
            description: Any type
        arcee-ai:
          type: object
          additionalProperties:
            description: Any type
        atlas-cloud:
          type: object
          additionalProperties:
            description: Any type
        atoma:
          type: object
          additionalProperties:
            description: Any type
        avian:
          type: object
          additionalProperties:
            description: Any type
        azure:
          type: object
          additionalProperties:
            description: Any type
        baidu:
          type: object
          additionalProperties:
            description: Any type
        baseten:
          type: object
          additionalProperties:
            description: Any type
        black-forest-labs:
          type: object
          additionalProperties:
            description: Any type
        byteplus:
          type: object
          additionalProperties:
            description: Any type
        centml:
          type: object
          additionalProperties:
            description: Any type
        cerebras:
          type: object
          additionalProperties:
            description: Any type
        chutes:
          type: object
          additionalProperties:
            description: Any type
        cirrascale:
          type: object
          additionalProperties:
            description: Any type
        clarifai:
          type: object
          additionalProperties:
            description: Any type
        cloudflare:
          type: object
          additionalProperties:
            description: Any type
        cohere:
          type: object
          additionalProperties:
            description: Any type
        crofai:
          type: object
          additionalProperties:
            description: Any type
        crucible:
          type: object
          additionalProperties:
            description: Any type
        crusoe:
          type: object
          additionalProperties:
            description: Any type
        darkbloom:
          type: object
          additionalProperties:
            description: Any type
        deepinfra:
          type: object
          additionalProperties:
            description: Any type
        deepseek:
          type: object
          additionalProperties:
            description: Any type
        dekallm:
          type: object
          additionalProperties:
            description: Any type
        digitalocean:
          type: object
          additionalProperties:
            description: Any type
        enfer:
          type: object
          additionalProperties:
            description: Any type
        fake-provider:
          type: object
          additionalProperties:
            description: Any type
        featherless:
          type: object
          additionalProperties:
            description: Any type
        fireworks:
          type: object
          additionalProperties:
            description: Any type
        friendli:
          type: object
          additionalProperties:
            description: Any type
        gmicloud:
          type: object
          additionalProperties:
            description: Any type
        google-ai-studio:
          type: object
          additionalProperties:
            description: Any type
        google-vertex:
          type: object
          additionalProperties:
            description: Any type
        gopomelo:
          type: object
          additionalProperties:
            description: Any type
        groq:
          type: object
          additionalProperties:
            description: Any type
        huggingface:
          type: object
          additionalProperties:
            description: Any type
        hyperbolic:
          type: object
          additionalProperties:
            description: Any type
        hyperbolic-quantized:
          type: object
          additionalProperties:
            description: Any type
        inception:
          type: object
          additionalProperties:
            description: Any type
        inceptron:
          type: object
          additionalProperties:
            description: Any type
        inference-net:
          type: object
          additionalProperties:
            description: Any type
        infermatic:
          type: object
          additionalProperties:
            description: Any type
        inflection:
          type: object
          additionalProperties:
            description: Any type
        inocloud:
          type: object
          additionalProperties:
            description: Any type
        io-net:
          type: object
          additionalProperties:
            description: Any type
        ionstream:
          type: object
          additionalProperties:
            description: Any type
        klusterai:
          type: object
          additionalProperties:
            description: Any type
        lambda:
          type: object
          additionalProperties:
            description: Any type
        lepton:
          type: object
          additionalProperties:
            description: Any type
        liquid:
          type: object
          additionalProperties:
            description: Any type
        lynn:
          type: object
          additionalProperties:
            description: Any type
        lynn-private:
          type: object
          additionalProperties:
            description: Any type
        mancer:
          type: object
          additionalProperties:
            description: Any type
        mancer-old:
          type: object
          additionalProperties:
            description: Any type
        mara:
          type: object
          additionalProperties:
            description: Any type
        meta:
          type: object
          additionalProperties:
            description: Any type
        minimax:
          type: object
          additionalProperties:
            description: Any type
        mistral:
          type: object
          additionalProperties:
            description: Any type
        modal:
          type: object
          additionalProperties:
            description: Any type
        modelrun:
          type: object
          additionalProperties:
            description: Any type
        modular:
          type: object
          additionalProperties:
            description: Any type
        moonshotai:
          type: object
          additionalProperties:
            description: Any type
        morph:
          type: object
          additionalProperties:
            description: Any type
        ncompass:
          type: object
          additionalProperties:
            description: Any type
        nebius:
          type: object
          additionalProperties:
            description: Any type
        nex-agi:
          type: object
          additionalProperties:
            description: Any type
        nextbit:
          type: object
          additionalProperties:
            description: Any type
        nineteen:
          type: object
          additionalProperties:
            description: Any type
        novita:
          type: object
          additionalProperties:
            description: Any type
        nvidia:
          type: object
          additionalProperties:
            description: Any type
        octoai:
          type: object
          additionalProperties:
            description: Any type
        open-inference:
          type: object
          additionalProperties:
            description: Any type
        openai:
          type: object
          additionalProperties:
            description: Any type
        parasail:
          type: object
          additionalProperties:
            description: Any type
        perceptron:
          type: object
          additionalProperties:
            description: Any type
        perplexity:
          type: object
          additionalProperties:
            description: Any type
        phala:
          type: object
          additionalProperties:
            description: Any type
        poolside:
          type: object
          additionalProperties:
            description: Any type
        recraft:
          type: object
          additionalProperties:
            description: Any type
        recursal:
          type: object
          additionalProperties:
            description: Any type
        reflection:
          type: object
          additionalProperties:
            description: Any type
        reka:
          type: object
          additionalProperties:
            description: Any type
        relace:
          type: object
          additionalProperties:
            description: Any type
        replicate:
          type: object
          additionalProperties:
            description: Any type
        sambanova:
          type: object
          additionalProperties:
            description: Any type
        sambanova-cloaked:
          type: object
          additionalProperties:
            description: Any type
        seed:
          type: object
          additionalProperties:
            description: Any type
        sf-compute:
          type: object
          additionalProperties:
            description: Any type
        siliconflow:
          type: object
          additionalProperties:
            description: Any type
        sourceful:
          type: object
          additionalProperties:
            description: Any type
        stealth:
          type: object
          additionalProperties:
            description: Any type
        stepfun:
          type: object
          additionalProperties:
            description: Any type
        streamlake:
          type: object
          additionalProperties:
            description: Any type
        switchpoint:
          type: object
          additionalProperties:
            description: Any type
        targon:
          type: object
          additionalProperties:
            description: Any type
        together:
          type: object
          additionalProperties:
            description: Any type
        together-lite:
          type: object
          additionalProperties:
            description: Any type
        ubicloud:
          type: object
          additionalProperties:
            description: Any type
        upstage:
          type: object
          additionalProperties:
            description: Any type
        venice:
          type: object
          additionalProperties:
            description: Any type
        wandb:
          type: object
          additionalProperties:
            description: Any type
        xai:
          type: object
          additionalProperties:
            description: Any type
        xiaomi:
          type: object
          additionalProperties:
            description: Any type
        z-ai:
          type: object
          additionalProperties:
            description: Any type
      description: >-
        Provider-specific options keyed by provider slug. The options for the
        matched provider are spread into the upstream request body.
      title: ProviderOptions
    SpeechRequestProvider:
      type: object
      properties:
        options:
          $ref: '#/components/schemas/ProviderOptions'
      description: Provider-specific passthrough configuration
      title: SpeechRequestProvider
    SpeechRequestResponseFormat:
      type: string
      enum:
        - mp3
        - pcm
      default: pcm
      description: Audio output format
      title: SpeechRequestResponseFormat
    SpeechRequest:
      type: object
      properties:
        input:
          type: string
          description: Text to synthesize
        model:
          type: string
          description: TTS model identifier
        provider:
          $ref: '#/components/schemas/SpeechRequestProvider'
          description: Provider-specific passthrough configuration
        response_format:
          $ref: '#/components/schemas/SpeechRequestResponseFormat'
          description: Audio output format
        speed:
          type: number
          format: double
          description: >-
            Playback speed multiplier. Only used by models that support it (e.g.
            OpenAI TTS). Ignored by other providers.
        voice:
          type: string
          description: Voice identifier (provider-specific).
      required:
        - input
        - model
        - voice
      description: Text-to-speech request input
      title: SpeechRequest
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
      description: Bad Request - Invalid request parameters or malformed input
      title: BadRequestResponse
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
    ServiceUnavailableResponseErrorData:
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
      description: Error data for ServiceUnavailableResponse
      title: ServiceUnavailableResponseErrorData
    ServiceUnavailableResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
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
      description: Service Unavailable - Service temporarily unavailable
      title: ServiceUnavailableResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python
import requests

url = "https://openrouter.ai/api/v1/audio/speech"

payload = {
    "input": "Hello world",
    "model": "elevenlabs/eleven-turbo-v2",
    "voice": "alloy",
    "response_format": "pcm",
    "speed": 1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/audio/speech';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"input":"Hello world","model":"elevenlabs/eleven-turbo-v2","voice":"alloy","response_format":"pcm","speed":1}'
};

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
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/audio/speech"

	payload := strings.NewReader("{\n  \"input\": \"Hello world\",\n  \"model\": \"elevenlabs/eleven-turbo-v2\",\n  \"voice\": \"alloy\",\n  \"response_format\": \"pcm\",\n  \"speed\": 1\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

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

url = URI("https://openrouter.ai/api/v1/audio/speech")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"input\": \"Hello world\",\n  \"model\": \"elevenlabs/eleven-turbo-v2\",\n  \"voice\": \"alloy\",\n  \"response_format\": \"pcm\",\n  \"speed\": 1\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/audio/speech")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"input\": \"Hello world\",\n  \"model\": \"elevenlabs/eleven-turbo-v2\",\n  \"voice\": \"alloy\",\n  \"response_format\": \"pcm\",\n  \"speed\": 1\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/audio/speech', [
  'body' => '{
  "input": "Hello world",
  "model": "elevenlabs/eleven-turbo-v2",
  "voice": "alloy",
  "response_format": "pcm",
  "speed": 1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/audio/speech");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"input\": \"Hello world\",\n  \"model\": \"elevenlabs/eleven-turbo-v2\",\n  \"voice\": \"alloy\",\n  \"response_format\": \"pcm\",\n  \"speed\": 1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "input": "Hello world",
  "model": "elevenlabs/eleven-turbo-v2",
  "voice": "alloy",
  "response_format": "pcm",
  "speed": 1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/audio/speech")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

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