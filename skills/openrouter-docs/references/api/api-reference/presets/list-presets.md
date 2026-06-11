> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List presets

GET https://openrouter.ai/api/v1/presets

Lists all presets for the authenticated user, ordered by most recently updated first.

Reference: https://openrouter.ai/docs/api/api-reference/presets/list-presets

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /presets:
    get:
      operationId: list-presets
      summary: List presets
      description: >-
        Lists all presets for the authenticated user, ordered by most recently
        updated first.
      tags:
        - subpackage_presets
      parameters:
        - name: offset
          in: query
          description: Number of records to skip for pagination
          required: false
          schema:
            type: integer
        - name: limit
          in: query
          description: Maximum number of records to return (max 100)
          required: false
          schema:
            type: integer
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Paginated list of presets.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListPresetsResponse'
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
    PresetStatus:
      type: string
      enum:
        - active
        - disabled
        - archived
      description: The status of a preset.
      title: PresetStatus
    Preset:
      type: object
      properties:
        created_at:
          type: string
        creator_user_id:
          type:
            - string
            - 'null'
        description:
          type:
            - string
            - 'null'
        designated_version_id:
          type:
            - string
            - 'null'
        id:
          type: string
        name:
          type: string
        slug:
          type: string
        status:
          $ref: '#/components/schemas/PresetStatus'
        status_updated_at:
          type:
            - string
            - 'null'
        updated_at:
          type: string
        workspace_id:
          type:
            - string
            - 'null'
      required:
        - created_at
        - creator_user_id
        - description
        - designated_version_id
        - id
        - name
        - slug
        - status
        - status_updated_at
        - updated_at
        - workspace_id
      description: A preset without version details.
      title: Preset
    ListPresetsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Preset'
        total_count:
          type: integer
      required:
        - data
        - total_count
      description: A paginated list of presets.
      title: ListPresetsResponse
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
      "created_at": "2026-04-20T10:00:00Z",
      "creator_user_id": "user_2dHFtVWx2n56w6HkM0000000000",
      "description": null,
      "designated_version_id": "550e8400-e29b-41d4-a716-446655440000",
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "name": "my-preset",
      "slug": "my-preset",
      "status": "active",
      "status_updated_at": null,
      "updated_at": "2026-04-20T10:00:00Z",
      "workspace_id": "750e8400-e29b-41d4-a716-446655440002"
    }
  ],
  "total_count": 1
}
```

**SDK Code**

```python Presets_listPresets_example
import requests

url = "https://openrouter.ai/api/v1/presets"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Presets_listPresets_example
const url = 'https://openrouter.ai/api/v1/presets';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Presets_listPresets_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/presets"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Presets_listPresets_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/presets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Presets_listPresets_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/presets")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Presets_listPresets_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/presets', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Presets_listPresets_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/presets");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Presets_listPresets_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/presets")! as URL,
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