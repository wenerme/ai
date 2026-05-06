> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Create transcription

POST https://openrouter.ai/api/v1/audio/transcriptions
Content-Type: application/json

Transcribes audio into text. Accepts base64-encoded audio input and returns the transcribed text.

Reference: https://openrouter.ai/docs/api/api-reference/transcriptions/create-audio-transcriptions

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /audio/transcriptions:
    post:
      operationId: create-audio-transcriptions
      summary: Create transcription
      description: >-
        Transcribes audio into text. Accepts base64-encoded audio input and
        returns the transcribed text.
      tags:
        - subpackage_stt
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Transcription result
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/STTResponse'
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
              $ref: '#/components/schemas/STTRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    STTInputAudio:
      type: object
      properties:
        data:
          type: string
          description: Base64-encoded audio data (raw bytes, not a data URI)
        format:
          type: string
          description: >-
            Audio format (e.g., wav, mp3, flac, m4a, ogg, webm, aac). Supported
            formats vary by provider.
      required:
        - data
        - format
      description: Base64-encoded audio to transcribe
      title: STTInputAudio
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
        crusoe:
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
    SttRequestProvider:
      type: object
      properties:
        options:
          $ref: '#/components/schemas/ProviderOptions'
      description: Provider-specific passthrough configuration
      title: SttRequestProvider
    STTRequest:
      type: object
      properties:
        input_audio:
          $ref: '#/components/schemas/STTInputAudio'
        language:
          type: string
          description: >-
            ISO-639-1 language code (e.g., "en", "ja"). Auto-detected if
            omitted.
        model:
          type: string
          description: STT model identifier
        provider:
          $ref: '#/components/schemas/SttRequestProvider'
          description: Provider-specific passthrough configuration
        temperature:
          type: number
          format: double
          description: Sampling temperature for transcription
      required:
        - input_audio
        - model
      description: >-
        Speech-to-text request input. Accepts a JSON body with input_audio
        containing base64-encoded audio.
      title: STTRequest
    STTUsage:
      type: object
      properties:
        cost:
          type: number
          format: double
          description: Total cost of the request in USD
        input_tokens:
          type: integer
          description: Number of input tokens billed for this request
        output_tokens:
          type: integer
          description: Number of output tokens generated
        seconds:
          type: number
          format: double
          description: Duration of the input audio in seconds
        total_tokens:
          type: integer
          description: Total number of tokens used (input + output)
      description: Aggregated usage statistics for the request
      title: STTUsage
    STTResponse:
      type: object
      properties:
        text:
          type: string
          description: The transcribed text
        usage:
          $ref: '#/components/schemas/STTUsage'
      required:
        - text
      description: STT response containing transcribed text and optional usage statistics
      title: STTResponse
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

```python STT_createAudioTranscriptions_example
import requests

url = "https://openrouter.ai/api/v1/audio/transcriptions"

payload = {
    "input_audio": {
        "data": "UklGRiQA...",
        "format": "wav"
    },
    "model": "openai/whisper-large-v3",
    "language": "en"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript STT_createAudioTranscriptions_example
const url = 'https://openrouter.ai/api/v1/audio/transcriptions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"input_audio":{"data":"UklGRiQA...","format":"wav"},"model":"openai/whisper-large-v3","language":"en"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go STT_createAudioTranscriptions_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/audio/transcriptions"

	payload := strings.NewReader("{\n  \"input_audio\": {\n    \"data\": \"UklGRiQA...\",\n    \"format\": \"wav\"\n  },\n  \"model\": \"openai/whisper-large-v3\",\n  \"language\": \"en\"\n}")

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

```ruby STT_createAudioTranscriptions_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/audio/transcriptions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"input_audio\": {\n    \"data\": \"UklGRiQA...\",\n    \"format\": \"wav\"\n  },\n  \"model\": \"openai/whisper-large-v3\",\n  \"language\": \"en\"\n}"

response = http.request(request)
puts response.read_body
```

```java STT_createAudioTranscriptions_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/audio/transcriptions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"input_audio\": {\n    \"data\": \"UklGRiQA...\",\n    \"format\": \"wav\"\n  },\n  \"model\": \"openai/whisper-large-v3\",\n  \"language\": \"en\"\n}")
  .asString();
```

```php STT_createAudioTranscriptions_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/audio/transcriptions', [
  'body' => '{
  "input_audio": {
    "data": "UklGRiQA...",
    "format": "wav"
  },
  "model": "openai/whisper-large-v3",
  "language": "en"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp STT_createAudioTranscriptions_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/audio/transcriptions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"input_audio\": {\n    \"data\": \"UklGRiQA...\",\n    \"format\": \"wav\"\n  },\n  \"model\": \"openai/whisper-large-v3\",\n  \"language\": \"en\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift STT_createAudioTranscriptions_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "input_audio": [
    "data": "UklGRiQA...",
    "format": "wav"
  ],
  "model": "openai/whisper-large-v3",
  "language": "en"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/audio/transcriptions")! as URL,
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