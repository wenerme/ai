> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# List all video generation models

GET https://openrouter.ai/api/v1/videos/models

Returns a list of all available video generation models and their properties

Reference: https://openrouter.ai/docs/api/api-reference/video-generation/list-videos-models

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /videos/models:
    get:
      operationId: list-videos-models
      summary: List all video generation models
      description: >-
        Returns a list of all available video generation models and their
        properties
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
        '200':
          description: Returns a list of video generation models
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VideoModelsListResponse'
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
    VideoModelSupportedAspectRatiosItems:
      type: string
      enum:
        - '16:9'
        - '9:16'
        - '1:1'
        - '4:3'
        - '3:4'
        - '3:2'
        - '2:3'
        - '21:9'
        - '9:21'
      title: VideoModelSupportedAspectRatiosItems
    VideoModelSupportedFrameImagesItems:
      type: string
      enum:
        - first_frame
        - last_frame
      title: VideoModelSupportedFrameImagesItems
    VideoModelSupportedResolutionsItems:
      type: string
      enum:
        - 480p
        - 720p
        - 1080p
        - 1K
        - 2K
        - 4K
      title: VideoModelSupportedResolutionsItems
    VideoModelSupportedSizesItems:
      type: string
      enum:
        - 480x480
        - 480x640
        - 480x720
        - 480x854
        - 480x1120
        - 640x480
        - 720x480
        - 720x720
        - 720x960
        - 720x1080
        - 720x1280
        - 720x1680
        - 854x480
        - 960x720
        - 1080x720
        - 1080x1080
        - 1080x1440
        - 1080x1620
        - 1080x1920
        - 1080x2520
        - 1120x480
        - 1280x720
        - 1440x1080
        - 1620x1080
        - 1680x720
        - 1920x1080
        - 2160x2160
        - 2160x2880
        - 2160x3240
        - 2160x3840
        - 2160x5040
        - 2520x1080
        - 2880x2160
        - 3240x2160
        - 3840x2160
        - 5040x2160
      title: VideoModelSupportedSizesItems
    VideoModel:
      type: object
      properties:
        allowed_passthrough_parameters:
          type: array
          items:
            type: string
          description: >-
            List of parameters that are allowed to be passed through to the
            provider
        canonical_slug:
          type: string
          description: Canonical slug for the model
        created:
          type: integer
          description: Unix timestamp of when the model was created
        description:
          type: string
          description: Description of the model
        generate_audio:
          type:
            - boolean
            - 'null'
          description: Whether the model supports generating audio alongside video
        hugging_face_id:
          type:
            - string
            - 'null'
          description: Hugging Face model identifier, if applicable
        id:
          type: string
          description: Unique identifier for the model
        name:
          type: string
          description: Display name of the model
        pricing_skus:
          type:
            - object
            - 'null'
          additionalProperties:
            type: string
          description: Pricing SKUs with provider prefix stripped, values as strings
        seed:
          type:
            - boolean
            - 'null'
          description: >-
            Whether the model supports deterministic generation via seed
            parameter
        supported_aspect_ratios:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/VideoModelSupportedAspectRatiosItems'
          description: Supported output aspect ratios
        supported_durations:
          type:
            - array
            - 'null'
          items:
            type: integer
          description: Supported video durations in seconds
        supported_frame_images:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/VideoModelSupportedFrameImagesItems'
          description: Supported frame image types (e.g. first_frame, last_frame)
        supported_resolutions:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/VideoModelSupportedResolutionsItems'
          description: Supported output resolutions
        supported_sizes:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/VideoModelSupportedSizesItems'
          description: Supported output sizes (width x height)
      required:
        - allowed_passthrough_parameters
        - canonical_slug
        - created
        - generate_audio
        - id
        - name
        - seed
        - supported_aspect_ratios
        - supported_durations
        - supported_frame_images
        - supported_resolutions
        - supported_sizes
      title: VideoModel
    VideoModelsListResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/VideoModel'
      required:
        - data
      title: VideoModelsListResponse
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

```python Video Generation_listVideosModels_example
import requests

url = "https://openrouter.ai/api/v1/videos/models"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Video Generation_listVideosModels_example
const url = 'https://openrouter.ai/api/v1/videos/models';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Video Generation_listVideosModels_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/videos/models"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Video Generation_listVideosModels_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/videos/models")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Video Generation_listVideosModels_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/videos/models")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Video Generation_listVideosModels_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/videos/models', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Video Generation_listVideosModels_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/videos/models");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Video Generation_listVideosModels_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/videos/models")! as URL,
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