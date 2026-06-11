> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get a preset

GET https://openrouter.ai/api/v1/presets/{slug}

Retrieves a preset by its slug with its currently designated version inline.

Reference: https://openrouter.ai/docs/api/api-reference/presets/get-preset

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /presets/{slug}:
    get:
      operationId: get-preset
      summary: Get a preset
      description: >-
        Retrieves a preset by its slug with its currently designated version
        inline.
      tags:
        - subpackage_presets
      parameters:
        - name: slug
          in: path
          description: URL-safe slug identifying the preset.
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
          description: Preset with its designated version.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetPresetResponse'
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
    PresetStatus:
      type: string
      enum:
        - active
        - disabled
        - archived
      description: The status of a preset.
      title: PresetStatus
    PresetDesignatedVersion:
      type: object
      properties:
        config:
          type: object
          additionalProperties:
            description: Any type
        created_at:
          type: string
        creator_id:
          type: string
        id:
          type: string
        preset_id:
          type: string
        system_prompt:
          type:
            - string
            - 'null'
        updated_at:
          type: string
        version:
          type: integer
      required:
        - config
        - created_at
        - creator_id
        - id
        - preset_id
        - system_prompt
        - updated_at
        - version
      description: >-
        A specific version of a preset, containing config and optional system
        prompt.
      title: PresetDesignatedVersion
    PresetWithDesignatedVersion:
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
        designated_version:
          $ref: '#/components/schemas/PresetDesignatedVersion'
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
        - designated_version
      description: A preset with its currently designated version.
      title: PresetWithDesignatedVersion
    GetPresetResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/PresetWithDesignatedVersion'
      required:
        - data
      description: A preset with its currently designated version.
      title: GetPresetResponse
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
  "data": {
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
    "workspace_id": "750e8400-e29b-41d4-a716-446655440002",
    "designated_version": {
      "config": {
        "model": "openai/gpt-4o",
        "temperature": 0.7
      },
      "created_at": "2026-04-20T10:00:00Z",
      "creator_id": "user_2dHFtVWx2n56w6HkM0000000000",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "preset_id": "650e8400-e29b-41d4-a716-446655440001",
      "system_prompt": "You are a helpful assistant.",
      "updated_at": "2026-04-20T10:00:00Z",
      "version": 1
    }
  }
}
```

**SDK Code**

```python Presets_getPreset_example
import requests

url = "https://openrouter.ai/api/v1/presets/my-preset"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Presets_getPreset_example
const url = 'https://openrouter.ai/api/v1/presets/my-preset';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Presets_getPreset_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/presets/my-preset"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Presets_getPreset_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/presets/my-preset")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Presets_getPreset_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/presets/my-preset")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Presets_getPreset_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/presets/my-preset', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Presets_getPreset_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/presets/my-preset");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Presets_getPreset_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/presets/my-preset")! as URL,
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