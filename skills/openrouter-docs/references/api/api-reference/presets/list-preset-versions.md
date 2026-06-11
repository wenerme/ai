> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List versions of a preset

GET https://openrouter.ai/api/v1/presets/{slug}/versions

Lists all versions of a preset, ordered by version number ascending (oldest first).

Reference: https://openrouter.ai/docs/api/api-reference/presets/list-preset-versions

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /presets/{slug}/versions:
    get:
      operationId: list-preset-versions
      summary: List versions of a preset
      description: >-
        Lists all versions of a preset, ordered by version number ascending
        (oldest first).
      tags:
        - subpackage_presets
      parameters:
        - name: slug
          in: path
          description: URL-safe slug identifying the preset.
          required: true
          schema:
            type: string
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
          description: Paginated list of preset versions.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListPresetVersionsResponse'
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
    ListPresetVersionsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/PresetDesignatedVersion'
        total_count:
          type: integer
      required:
        - data
        - total_count
      description: A paginated list of preset versions.
      title: ListPresetVersionsResponse
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
  "data": [
    {
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
  ],
  "total_count": 1
}
```

**SDK Code**

```python Presets_listPresetVersions_example
import requests

url = "https://openrouter.ai/api/v1/presets/my-preset/versions"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Presets_listPresetVersions_example
const url = 'https://openrouter.ai/api/v1/presets/my-preset/versions';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Presets_listPresetVersions_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/presets/my-preset/versions"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Presets_listPresetVersions_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/presets/my-preset/versions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Presets_listPresetVersions_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/presets/my-preset/versions")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Presets_listPresetVersions_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/presets/my-preset/versions', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Presets_listPresetVersions_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/presets/my-preset/versions");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Presets_listPresetVersions_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/presets/my-preset/versions")! as URL,
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