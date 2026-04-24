# Update a workspace

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/workspaces/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/api/api-reference/workspaces/llms-full.txt.

PATCH https://openrouter.ai/api/v1/workspaces/{id}
Content-Type: application/json

Update an existing workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/workspaces/update-workspace

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /workspaces/{id}:
    patch:
      operationId: update-workspace
      summary: Update a workspace
      description: >-
        Update an existing workspace by ID or slug. [Management
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
          description: Workspace updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UpdateWorkspaceResponse'
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
        '403':
          description: Forbidden - Authentication successful but insufficient permissions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
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
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateWorkspaceRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    UpdateWorkspaceRequest:
      type: object
      properties:
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
          description: New description for the workspace
        io_logging_api_key_ids:
          type:
            - array
            - 'null'
          items:
            type: integer
          description: Optional array of API key IDs to filter I/O logging
        io_logging_sampling_rate:
          type: number
          format: double
          description: Sampling rate for I/O logging (0.0001-1)
        is_data_discount_logging_enabled:
          type: boolean
          description: Whether data discount logging is enabled
        is_observability_broadcast_enabled:
          type: boolean
          description: Whether broadcast is enabled
        is_observability_io_logging_enabled:
          type: boolean
          description: Whether private logging is enabled
        name:
          type: string
          description: New name for the workspace
        slug:
          type: string
          description: New URL-friendly slug
      title: UpdateWorkspaceRequest
    UpdateWorkspaceResponseData:
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
      title: UpdateWorkspaceResponseData
    UpdateWorkspaceResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/UpdateWorkspaceResponseData'
      required:
        - data
      title: UpdateWorkspaceResponse
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
    ForbiddenResponseErrorData:
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
      description: Error data for ForbiddenResponse
      title: ForbiddenResponseErrorData
    ForbiddenResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Forbidden - Authentication successful but insufficient permissions
      title: ForbiddenResponse
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

url = "https://openrouter.ai/api/v1/workspaces/production"

payload = {
    "name": "Updated Workspace",
    "slug": "updated-workspace"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.patch(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/workspaces/production';
const options = {
  method: 'PATCH',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"name":"Updated Workspace","slug":"updated-workspace"}'
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

	url := "https://openrouter.ai/api/v1/workspaces/production"

	payload := strings.NewReader("{\n  \"name\": \"Updated Workspace\",\n  \"slug\": \"updated-workspace\"\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

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

url = URI("https://openrouter.ai/api/v1/workspaces/production")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"name\": \"Updated Workspace\",\n  \"slug\": \"updated-workspace\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.patch("https://openrouter.ai/api/v1/workspaces/production")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"name\": \"Updated Workspace\",\n  \"slug\": \"updated-workspace\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://openrouter.ai/api/v1/workspaces/production', [
  'body' => '{
  "name": "Updated Workspace",
  "slug": "updated-workspace"
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

var client = new RestClient("https://openrouter.ai/api/v1/workspaces/production");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"name\": \"Updated Workspace\",\n  \"slug\": \"updated-workspace\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "name": "Updated Workspace",
  "slug": "updated-workspace"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/workspaces/production")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
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