> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List workspace budgets

GET https://openrouter.ai/api/v1/workspaces/{id}/budgets

List all budgets configured for a workspace. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/workspaces/list-workspace-budgets

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /workspaces/{id}/budgets:
    get:
      operationId: list-workspace-budgets
      summary: List workspace budgets
      description: >-
        List all budgets configured for a workspace. [Management
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
          description: Budgets retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListWorkspaceBudgetsResponse'
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
    WorkspaceBudgetResetInterval:
      type: string
      enum:
        - daily
        - weekly
        - monthly
      description: Interval at which spend resets. Null means a lifetime (one-time) budget.
      title: WorkspaceBudgetResetInterval
    WorkspaceBudget:
      type: object
      properties:
        created_at:
          type: string
          description: ISO 8601 timestamp of when the budget was created
        id:
          type: string
          format: uuid
          description: Unique identifier for the budget
        limit_usd:
          type: number
          format: double
          description: Spending limit in USD for this interval
        reset_interval:
          oneOf:
            - $ref: '#/components/schemas/WorkspaceBudgetResetInterval'
            - type: 'null'
          description: >-
            Interval at which spend resets. Null means a lifetime (one-time)
            budget.
        updated_at:
          type: string
          description: ISO 8601 timestamp of when the budget was last updated
        workspace_id:
          type: string
          format: uuid
          description: ID of the workspace the budget belongs to
      required:
        - created_at
        - id
        - limit_usd
        - reset_interval
        - updated_at
        - workspace_id
      title: WorkspaceBudget
    ListWorkspaceBudgetsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/WorkspaceBudget'
          description: List of budgets configured for the workspace
      required:
        - data
      title: ListWorkspaceBudgetsResponse
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
      "created_at": "2025-08-24T10:30:00Z",
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "limit_usd": 100,
      "reset_interval": "monthly",
      "updated_at": "2025-08-24T15:45:00Z",
      "workspace_id": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

**SDK Code**

```python Workspaces_listWorkspaceBudgets_example
import requests

url = "https://openrouter.ai/api/v1/workspaces/production/budgets"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Workspaces_listWorkspaceBudgets_example
const url = 'https://openrouter.ai/api/v1/workspaces/production/budgets';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Workspaces_listWorkspaceBudgets_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/workspaces/production/budgets"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Workspaces_listWorkspaceBudgets_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/workspaces/production/budgets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Workspaces_listWorkspaceBudgets_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/workspaces/production/budgets")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Workspaces_listWorkspaceBudgets_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/workspaces/production/budgets', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Workspaces_listWorkspaceBudgets_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/workspaces/production/budgets");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Workspaces_listWorkspaceBudgets_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/workspaces/production/budgets")! as URL,
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