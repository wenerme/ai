> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Create or update a workspace budget

PUT https://openrouter.ai/api/v1/workspaces/{id}/budgets/{interval}
Content-Type: application/json

Create or update the budget for a given interval. Budget limits must strictly decrease as the interval narrows (lifetime > monthly > weekly > daily). [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/workspaces/upsert-workspace-budget

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /workspaces/{id}/budgets/{interval}:
    put:
      operationId: upsert-workspace-budget
      summary: Create or update a workspace budget
      description: >-
        Create or update the budget for a given interval. Budget limits must
        strictly decrease as the interval narrows (lifetime > monthly > weekly >
        daily). [Management key](/docs/guides/overview/auth/management-api-keys)
        required.
      tags:
        - subpackage_workspaces
      parameters:
        - name: id
          in: path
          description: The workspace ID (UUID) or slug
          required: true
          schema:
            type: string
        - name: interval
          in: path
          description: >-
            Budget reset interval. Use "lifetime" for a one-time budget that
            never resets.
          required: true
          schema:
            $ref: '#/components/schemas/WorkspaceBudgetInterval'
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Budget created or updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UpsertWorkspaceBudgetResponse'
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
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpsertWorkspaceBudgetRequest'
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    WorkspaceBudgetInterval:
      type: string
      enum:
        - daily
        - weekly
        - monthly
        - lifetime
      description: >-
        Budget reset interval. Use "lifetime" for a one-time budget that never
        resets.
      title: WorkspaceBudgetInterval
    UpsertWorkspaceBudgetRequest:
      type: object
      properties:
        limit_usd:
          type: number
          format: double
          description: Spending limit in USD. Must be greater than 0.
      required:
        - limit_usd
      title: UpsertWorkspaceBudgetRequest
    UpsertWorkspaceBudgetResponseDataResetInterval:
      type: string
      enum:
        - daily
        - weekly
        - monthly
      description: Interval at which spend resets. Null means a lifetime (one-time) budget.
      title: UpsertWorkspaceBudgetResponseDataResetInterval
    UpsertWorkspaceBudgetResponseData:
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
            - $ref: >-
                #/components/schemas/UpsertWorkspaceBudgetResponseDataResetInterval
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
      description: The created or updated budget
      title: UpsertWorkspaceBudgetResponseData
    UpsertWorkspaceBudgetResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/UpsertWorkspaceBudgetResponseData'
      required:
        - data
      title: UpsertWorkspaceBudgetResponse
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



**Request**

```json
{
  "limit_usd": 100
}
```

**Response**

```json
{
  "data": {
    "created_at": "2025-08-24T10:30:00Z",
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "limit_usd": 100,
    "reset_interval": "monthly",
    "updated_at": "2025-08-24T15:45:00Z",
    "workspace_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**SDK Code**

```python Workspaces_upsertWorkspaceBudget_example
import requests

url = "https://openrouter.ai/api/v1/workspaces/production/budgets/monthly"

payload = { "limit_usd": 100 }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.put(url, json=payload, headers=headers)

print(response.json())
```

```javascript Workspaces_upsertWorkspaceBudget_example
const url = 'https://openrouter.ai/api/v1/workspaces/production/budgets/monthly';
const options = {
  method: 'PUT',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"limit_usd":100}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Workspaces_upsertWorkspaceBudget_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/workspaces/production/budgets/monthly"

	payload := strings.NewReader("{\n  \"limit_usd\": 100\n}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Workspaces_upsertWorkspaceBudget_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/workspaces/production/budgets/monthly")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"limit_usd\": 100\n}"

response = http.request(request)
puts response.read_body
```

```java Workspaces_upsertWorkspaceBudget_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://openrouter.ai/api/v1/workspaces/production/budgets/monthly")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"limit_usd\": 100\n}")
  .asString();
```

```php Workspaces_upsertWorkspaceBudget_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://openrouter.ai/api/v1/workspaces/production/budgets/monthly', [
  'body' => '{
  "limit_usd": 100
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Workspaces_upsertWorkspaceBudget_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/workspaces/production/budgets/monthly");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"limit_usd\": 100\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Workspaces_upsertWorkspaceBudget_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["limit_usd": 100] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/workspaces/production/budgets/monthly")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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