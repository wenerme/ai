> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List image generation models

GET https://openrouter.ai/api/v1/images/models

Lists every image generation model with its top-level supported-parameter superset and a URL to its full per-endpoint records.

Reference: https://openrouter.ai/docs/api/api-reference/images/list-image-models

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /images/models:
    get:
      operationId: list-image-models
      summary: List image generation models
      description: >-
        Lists every image generation model with its top-level
        supported-parameter superset and a URL to its full per-endpoint records.
      tags:
        - subpackage_images
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: List of image generation models
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ImageModelsListResponse'
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
    ImageOutputModality:
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
      title: ImageOutputModality
    ImageModelArchitecture:
      type: object
      properties:
        input_modalities:
          type: array
          items:
            $ref: '#/components/schemas/InputModality'
          description: Supported input modalities
        output_modalities:
          type: array
          items:
            $ref: '#/components/schemas/ImageOutputModality'
          description: Supported output modalities
      required:
        - input_modalities
        - output_modalities
      title: ImageModelArchitecture
    EnumCapabilityType:
      type: string
      enum:
        - enum
      title: EnumCapabilityType
    RangeCapabilityType:
      type: string
      enum:
        - range
      title: RangeCapabilityType
    CapabilityDescriptor:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - boolean
              description: 'Discriminator value: boolean'
          required:
            - type
          description: A supported-or-not flag. Present means the parameter is accepted.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/EnumCapabilityType'
            values:
              type: array
              items:
                type: string
          required:
            - type
            - values
          description: A parameter that accepts one of a discrete set of string values.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/RangeCapabilityType'
            max:
              type: number
              format: double
            min:
              type: number
              format: double
          required:
            - type
            - max
            - min
          description: >-
            A parameter that accepts any value within an inclusive numeric
            range.
      discriminator:
        propertyName: type
      description: A typed descriptor for one supported request parameter.
      title: CapabilityDescriptor
    SupportedParameters:
      type: object
      additionalProperties:
        $ref: '#/components/schemas/CapabilityDescriptor'
      description: >-
        Union of supported parameters across every endpoint of this model.
        Coarse discovery aid; the definitive per-endpoint set is behind the
        endpoints URL.
      title: SupportedParameters
    ImageModelListItem:
      type: object
      properties:
        architecture:
          $ref: '#/components/schemas/ImageModelArchitecture'
        created:
          type: integer
          description: Unix timestamp (seconds) of when the model was created
        description:
          type: string
        endpoints:
          type: string
          description: Relative URL to the full per-endpoint records for this model
        id:
          type: string
          description: Model slug
        name:
          type: string
          description: Display name
        supported_parameters:
          $ref: '#/components/schemas/SupportedParameters'
        supports_streaming:
          type: boolean
          description: >-
            Whether any endpoint of this model supports native SSE streaming on
            the dedicated Image API (i.e. `stream: true` in the request). OR
            across endpoints.
      required:
        - architecture
        - created
        - description
        - endpoints
        - id
        - name
        - supported_parameters
        - supports_streaming
      description: A single image model in the discovery listing.
      title: ImageModelListItem
    ImageModelsListResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/ImageModelListItem'
      required:
        - data
      description: List of image generation models.
      title: ImageModelsListResponse
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
  "data": [
    {
      "architecture": {
        "input_modalities": [
          "text"
        ],
        "output_modalities": [
          "image"
        ]
      },
      "created": 1692901234,
      "description": "A text-to-image model.",
      "endpoints": "/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints",
      "id": "bytedance-seed/seedream-4.5",
      "name": "Seedream 4.5",
      "supported_parameters": {
        "resolution": {
          "type": "enum",
          "values": [
            "1K",
            "2K",
            "4K"
          ]
        }
      },
      "supports_streaming": false
    }
  ]
}
```

**SDK Code**

```python Images_listImageModels_example
import requests

url = "https://openrouter.ai/api/v1/images/models"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Images_listImageModels_example
const url = 'https://openrouter.ai/api/v1/images/models';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Images_listImageModels_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/images/models"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Images_listImageModels_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/images/models")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Images_listImageModels_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/images/models")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Images_listImageModels_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/images/models', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Images_listImageModels_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/images/models");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Images_listImageModels_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/images/models")! as URL,
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