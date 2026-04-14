For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/video-generation/llms.txt. For full documentation content, see https://openrouter.ai/docs/api/api-reference/video-generation/llms-full.txt.

# Submit a video generation request

POST https://openrouter.ai/api/v1/videos
Content-Type: application/json

Submits a video generation request and returns a polling URL to check status

Reference: https://openrouter.ai/docs/api/api-reference/video-generation/create-videos

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /videos:
    post:
      operationId: create-videos
      summary: Submit a video generation request
      description: >-
        Submits a video generation request and returns a polling URL to check
        status
      tags:
        - subpackage_videoGeneration
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Video generation request accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VideoGenerationResponse'
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
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VideoGenerationRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    VideoGenerationRequestAspectRatio:
      type: string
      enum:
        - '16:9'
        - '9:16'
        - '1:1'
        - '4:3'
        - '3:4'
        - '21:9'
        - '9:21'
      description: Aspect ratio of the generated video
      title: VideoGenerationRequestAspectRatio
    ContentPartImageImageUrl:
      type: object
      properties:
        url:
          type: string
      required:
        - url
      title: ContentPartImageImageUrl
    ContentPartImageType:
      type: string
      enum:
        - image_url
      title: ContentPartImageType
    FrameImageFrameType:
      type: string
      enum:
        - first_frame
        - last_frame
      description: Whether this image represents the first or last frame of the video
      title: FrameImageFrameType
    FrameImage:
      type: object
      properties:
        image_url:
          $ref: '#/components/schemas/ContentPartImageImageUrl'
        type:
          $ref: '#/components/schemas/ContentPartImageType'
        frame_type:
          $ref: '#/components/schemas/FrameImageFrameType'
          description: Whether this image represents the first or last frame of the video
      required:
        - image_url
        - type
        - frame_type
      title: FrameImage
    ContentPartImage:
      type: object
      properties:
        image_url:
          $ref: '#/components/schemas/ContentPartImageImageUrl'
        type:
          $ref: '#/components/schemas/ContentPartImageType'
      required:
        - image_url
        - type
      title: ContentPartImage
    VideoGenerationRequestProviderOptions:
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
        perplexity:
          type: object
          additionalProperties:
            description: Any type
        phala:
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
      title: VideoGenerationRequestProviderOptions
    VideoGenerationRequestProvider:
      type: object
      properties:
        options:
          $ref: '#/components/schemas/VideoGenerationRequestProviderOptions'
          description: >-
            Provider-specific options keyed by provider slug. The options for
            the matched provider are spread into the upstream request body.
      description: Provider-specific passthrough configuration
      title: VideoGenerationRequestProvider
    VideoGenerationRequestResolution:
      type: string
      enum:
        - 480p
        - 720p
        - 1080p
        - 1K
        - 2K
        - 4K
      description: Resolution of the generated video
      title: VideoGenerationRequestResolution
    VideoGenerationRequest:
      type: object
      properties:
        aspect_ratio:
          $ref: '#/components/schemas/VideoGenerationRequestAspectRatio'
          description: Aspect ratio of the generated video
        duration:
          type: integer
          description: Duration of the generated video in seconds
        frame_images:
          type: array
          items:
            $ref: '#/components/schemas/FrameImage'
          description: >-
            Images to use as the first and/or last frame of the generated video.
            Each image must specify a frame_type of first_frame or last_frame.
        generate_audio:
          type: boolean
          description: >-
            Whether to generate audio alongside the video. Defaults to the
            endpoint's generate_audio capability flag, false if not set.
        input_references:
          type: array
          items:
            $ref: '#/components/schemas/ContentPartImage'
          description: Reference images to guide video generation
        model:
          type: string
        prompt:
          type: string
        provider:
          $ref: '#/components/schemas/VideoGenerationRequestProvider'
          description: Provider-specific passthrough configuration
        resolution:
          $ref: '#/components/schemas/VideoGenerationRequestResolution'
          description: Resolution of the generated video
        seed:
          type: integer
          description: >-
            If specified, the generation will sample deterministically, such
            that repeated requests with the same seed and parameters should
            return the same result. Determinism is not guaranteed for all
            providers.
        size:
          type: string
          description: >-
            Exact pixel dimensions of the generated video in "WIDTHxHEIGHT"
            format (e.g. "1280x720"). Interchangeable with resolution +
            aspect_ratio.
      required:
        - model
        - prompt
      title: VideoGenerationRequest
    VideoGenerationResponseStatus:
      type: string
      enum:
        - pending
        - in_progress
        - completed
        - failed
        - cancelled
        - expired
      title: VideoGenerationResponseStatus
    VideoGenerationUsage:
      type: object
      properties:
        cost:
          type: number
          format: double
          description: The cost of the video generation in USD.
        is_byok:
          type: boolean
          description: >-
            Whether the request was made using a Bring Your Own Key
            configuration.
      description: >-
        Usage and cost information for the video generation. Available once the
        job has completed.
      title: VideoGenerationUsage
    VideoGenerationResponse:
      type: object
      properties:
        error:
          type: string
        generation_id:
          type: string
          description: >-
            The generation ID associated with this video generation job.
            Available once the job has been processed.
        id:
          type: string
        polling_url:
          type: string
        status:
          $ref: '#/components/schemas/VideoGenerationResponseStatus'
        unsigned_urls:
          type: array
          items:
            type: string
        usage:
          $ref: '#/components/schemas/VideoGenerationUsage'
      required:
        - id
        - polling_url
        - status
      title: VideoGenerationResponse
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

url = "https://openrouter.ai/api/v1/videos"

payload = {
    "model": "google/veo-3.1",
    "prompt": "A serene mountain landscape at sunset",
    "aspect_ratio": "16:9",
    "duration": 8,
    "resolution": "720p"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/videos';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"model":"google/veo-3.1","prompt":"A serene mountain landscape at sunset","aspect_ratio":"16:9","duration":8,"resolution":"720p"}'
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

	url := "https://openrouter.ai/api/v1/videos"

	payload := strings.NewReader("{\n  \"model\": \"google/veo-3.1\",\n  \"prompt\": \"A serene mountain landscape at sunset\",\n  \"aspect_ratio\": \"16:9\",\n  \"duration\": 8,\n  \"resolution\": \"720p\"\n}")

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

url = URI("https://openrouter.ai/api/v1/videos")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"model\": \"google/veo-3.1\",\n  \"prompt\": \"A serene mountain landscape at sunset\",\n  \"aspect_ratio\": \"16:9\",\n  \"duration\": 8,\n  \"resolution\": \"720p\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/videos")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"model\": \"google/veo-3.1\",\n  \"prompt\": \"A serene mountain landscape at sunset\",\n  \"aspect_ratio\": \"16:9\",\n  \"duration\": 8,\n  \"resolution\": \"720p\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/videos', [
  'body' => '{
  "model": "google/veo-3.1",
  "prompt": "A serene mountain landscape at sunset",
  "aspect_ratio": "16:9",
  "duration": 8,
  "resolution": "720p"
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

var client = new RestClient("https://openrouter.ai/api/v1/videos");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"model\": \"google/veo-3.1\",\n  \"prompt\": \"A serene mountain landscape at sunset\",\n  \"aspect_ratio\": \"16:9\",\n  \"duration\": 8,\n  \"resolution\": \"720p\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "model": "google/veo-3.1",
  "prompt": "A serene mountain landscape at sunset",
  "aspect_ratio": "16:9",
  "duration": 8,
  "resolution": "720p"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/videos")! as URL,
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