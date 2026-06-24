> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List endpoints for an image model

GET https://openrouter.ai/api/v1/images/models/{author}/{slug}/endpoints

Returns the full per-endpoint records for an image model: each endpoint's definitive supported parameters, pricing, and passthrough allowlist.

Reference: https://openrouter.ai/docs/api/api-reference/images/list-image-model-endpoints

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /images/models/{author}/{slug}/endpoints:
    get:
      operationId: list-image-model-endpoints
      summary: List endpoints for an image model
      description: >-
        Returns the full per-endpoint records for an image model: each
        endpoint's definitive supported parameters, pricing, and passthrough
        allowlist.
      tags:
        - subpackage_images
      parameters:
        - name: author
          in: path
          description: Model author/organization
          required: true
          schema:
            type: string
        - name: slug
          in: path
          description: Model slug
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
          description: The full per-endpoint records for an image model
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ImageModelEndpointsResponse'
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
    ImagePricingEntryBillable:
      type: string
      enum:
        - output_image
        - input_image
        - input_font
        - input_reference
        - input_text
      title: ImagePricingEntryBillable
    ImagePricingEntryUnit:
      type: string
      enum:
        - image
        - megapixel
        - token
      title: ImagePricingEntryUnit
    ImagePricingEntry:
      type: object
      properties:
        billable:
          $ref: '#/components/schemas/ImagePricingEntryBillable'
        cost_usd:
          type: number
          format: double
        unit:
          $ref: '#/components/schemas/ImagePricingEntryUnit'
        variant:
          type: string
      required:
        - billable
        - cost_usd
        - unit
      description: One billable pricing line for an image provider.
      title: ImagePricingEntry
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
    ImageEndpoint:
      type: object
      properties:
        allowed_passthrough_parameters:
          type: array
          items:
            type: string
          description: >-
            Provider-specific options accepted under
            provider.options[provider_slug].
        pricing:
          type: array
          items:
            $ref: '#/components/schemas/ImagePricingEntry'
          description: Billable pricing lines for this endpoint.
        provider_name:
          type: string
          description: Provider display name
        provider_slug:
          type: string
          description: Provider slug
        provider_tag:
          type:
            - string
            - 'null'
          description: Provider tag for request-side selection
        supported_parameters:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/CapabilityDescriptor'
        supports_streaming:
          type: boolean
          description: >-
            Whether this endpoint supports native SSE streaming (`stream: true`
            in the request).
      required:
        - allowed_passthrough_parameters
        - pricing
        - provider_name
        - provider_slug
        - provider_tag
        - supported_parameters
        - supports_streaming
      description: An endpoint that serves a given image model.
      title: ImageEndpoint
    ImageModelEndpointsResponse:
      type: object
      properties:
        endpoints:
          type: array
          items:
            $ref: '#/components/schemas/ImageEndpoint'
        id:
          type: string
          description: Model slug
      required:
        - endpoints
        - id
      description: The full per-endpoint records for an image model.
      title: ImageModelEndpointsResponse
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
  "endpoints": [
    {
      "allowed_passthrough_parameters": [],
      "pricing": [
        {
          "billable": "output_image",
          "cost_usd": 0.05,
          "unit": "image"
        }
      ],
      "provider_name": "Bytedance",
      "provider_slug": "bytedance",
      "provider_tag": "bytedance",
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
  ],
  "id": "bytedance-seed/seedream-4.5"
}
```

**SDK Code**

```python Images_listImageModelEndpoints_example
import requests

url = "https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Images_listImageModelEndpoints_example
const url = 'https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Images_listImageModelEndpoints_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Images_listImageModelEndpoints_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Images_listImageModelEndpoints_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Images_listImageModelEndpoints_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Images_listImageModelEndpoints_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Images_listImageModelEndpoints_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints")! as URL,
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