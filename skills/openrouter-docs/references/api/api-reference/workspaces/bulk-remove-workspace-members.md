> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/workspaces/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/api/api-reference/workspaces/llms-full.txt.

# Bulk remove members from a workspace

POST https://openrouter.ai/api/v1/workspaces/{id}/members/remove
Content-Type: application/json

Remove multiple members from a workspace. Members with active API keys in the workspace cannot be removed. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/workspaces/bulk-remove-workspace-members

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /workspaces/{id}/members/remove:
    post:
      operationId: bulk-remove-workspace-members
      summary: Bulk remove members from a workspace
      description: >-
        Remove multiple members from a workspace. Members with active API keys
        in the workspace cannot be removed. [Management
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
          description: Members removed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BulkRemoveWorkspaceMembersResponse'
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
              $ref: '#/components/schemas/BulkRemoveWorkspaceMembersRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    BulkRemoveWorkspaceMembersRequest:
      type: object
      properties:
        user_ids:
          type: array
          items:
            type: string
          description: List of user IDs to remove from the workspace
      required:
        - user_ids
      title: BulkRemoveWorkspaceMembersRequest
    BulkRemoveWorkspaceMembersResponse:
      type: object
      properties:
        removed_count:
          type: integer
          description: Number of members removed
      required:
        - removed_count
      title: BulkRemoveWorkspaceMembersResponse
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

url = "https://openrouter.ai/api/v1/workspaces/production/members/remove"

payload = { "user_ids": ["user_abc123", "user_def456"] }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/workspaces/production/members/remove';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"user_ids":["user_abc123","user_def456"]}'
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

	url := "https://openrouter.ai/api/v1/workspaces/production/members/remove"

	payload := strings.NewReader("{\n  \"user_ids\": [\n    \"user_abc123\",\n    \"user_def456\"\n  ]\n}")

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

url = URI("https://openrouter.ai/api/v1/workspaces/production/members/remove")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"user_ids\": [\n    \"user_abc123\",\n    \"user_def456\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/workspaces/production/members/remove")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"user_ids\": [\n    \"user_abc123\",\n    \"user_def456\"\n  ]\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/workspaces/production/members/remove', [
  'body' => '{
  "user_ids": [
    "user_abc123",
    "user_def456"
  ]
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

var client = new RestClient("https://openrouter.ai/api/v1/workspaces/production/members/remove");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"user_ids\": [\n    \"user_abc123\",\n    \"user_def456\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["user_ids": ["user_abc123", "user_def456"]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/workspaces/production/members/remove")! as URL,
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