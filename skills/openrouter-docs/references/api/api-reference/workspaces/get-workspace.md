> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get a workspace

GET https://openrouter.ai/api/v1/workspaces/{id}

Get a single workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/workspaces/get-workspace

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /workspaces/{id}:
    get:
      operationId: get-workspace
      summary: Get a workspace
      description: >-
        Get a single workspace by ID or slug. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_workspaces
      parameters:
        - name: id
          in: path
          description: The workspace ID (UUID) or slug
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
          description: Workspace details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetWorkspaceResponse'
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
components:
  schemas:
    GetWorkspaceResponseData:
      type: object
      properties:
        created_at:
          type: string
          description: ISO 8601 timestamp of when the workspace was created
        created_by:
          type:
            - string
            - 'null'
          description: User ID of the workspace creator
        default_image_model:
          type:
            - string
            - 'null'
          description: Default image model for this workspace
        default_provider_sort:
          type:
            - string
            - 'null'
          description: >-
            Default provider sort preference (price, throughput, latency,
            exacto)
        default_text_model:
          type:
            - string
            - 'null'
          description: Default text model for this workspace
        description:
          type:
            - string
            - 'null'
          description: Description of the workspace
        id:
          type: string
          format: uuid
          description: Unique identifier for the workspace
        io_logging_api_key_ids:
          type:
            - array
            - 'null'
          items:
            type: integer
          description: >-
            Optional array of API key IDs to filter I/O logging. Null means all
            keys are logged.
        io_logging_sampling_rate:
          type: number
          format: double
          description: >-
            Sampling rate for I/O logging (0.0001-1). 1 means 100% of requests
            are logged.
        is_data_discount_logging_enabled:
          type: boolean
          description: Whether data discount logging is enabled for this workspace
        is_observability_broadcast_enabled:
          type: boolean
          description: Whether broadcast is enabled for this workspace
        is_observability_io_logging_enabled:
          type: boolean
          description: Whether private logging is enabled for this workspace
        name:
          type: string
          description: Name of the workspace
        slug:
          type: string
          description: URL-friendly slug for the workspace
        updated_at:
          type:
            - string
            - 'null'
          description: ISO 8601 timestamp of when the workspace was last updated
      required:
        - created_at
        - created_by
        - default_image_model
        - default_provider_sort
        - default_text_model
        - description
        - id
        - io_logging_api_key_ids
        - io_logging_sampling_rate
        - is_data_discount_logging_enabled
        - is_observability_broadcast_enabled
        - is_observability_io_logging_enabled
        - name
        - slug
        - updated_at
      description: The workspace
      title: GetWorkspaceResponseData
    GetWorkspaceResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/GetWorkspaceResponseData'
      required:
        - data
      title: GetWorkspaceResponse
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

## SDK Code Examples

```python Workspaces_getWorkspace_example
import requests

url = "https://openrouter.ai/api/v1/workspaces/production"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Workspaces_getWorkspace_example
const url = 'https://openrouter.ai/api/v1/workspaces/production';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Workspaces_getWorkspace_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/workspaces/production"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Workspaces_getWorkspace_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/workspaces/production")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Workspaces_getWorkspace_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/workspaces/production")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Workspaces_getWorkspace_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/workspaces/production', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Workspaces_getWorkspace_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/workspaces/production");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Workspaces_getWorkspace_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/workspaces/production")! as URL,
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