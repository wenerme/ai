> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/analytics/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/api/api-reference/analytics/llms-full.txt.

# Get user activity grouped by endpoint

GET https://openrouter.ai/api/v1/activity

Returns user activity data grouped by endpoint for the last 30 (completed) UTC days. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/analytics/get-user-activity

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /activity:
    get:
      operationId: get-user-activity
      summary: Get user activity grouped by endpoint
      description: >-
        Returns user activity data grouped by endpoint for the last 30
        (completed) UTC days. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_analytics
      parameters:
        - name: date
          in: query
          description: Filter by a single UTC date in the last 30 days (YYYY-MM-DD format).
          required: false
          schema:
            type: string
        - name: api_key_hash
          in: query
          description: >-
            Filter by API key hash (SHA-256 hex string, as returned by the keys
            API).
          required: false
          schema:
            type: string
        - name: user_id
          in: query
          description: >-
            Filter by org member user ID. Only applicable for organization
            accounts.
          required: false
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
          description: Returns user activity data grouped by endpoint
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ActivityResponse'
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
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    ActivityItem:
      type: object
      properties:
        byok_usage_inference:
          type: number
          format: double
          description: BYOK inference cost in USD (external credits spent)
        completion_tokens:
          type: integer
          description: Total completion tokens generated
        date:
          type: string
          description: Date of the activity (YYYY-MM-DD format)
        endpoint_id:
          type: string
          description: Unique identifier for the endpoint
        model:
          type: string
          description: Model slug (e.g., "openai/gpt-4.1")
        model_permaslug:
          type: string
          description: Model permaslug (e.g., "openai/gpt-4.1-2025-04-14")
        prompt_tokens:
          type: integer
          description: Total prompt tokens used
        provider_name:
          type: string
          description: Name of the provider serving this endpoint
        reasoning_tokens:
          type: integer
          description: Total reasoning tokens used
        requests:
          type: integer
          description: Number of requests made
        usage:
          type: number
          format: double
          description: Total cost in USD (OpenRouter credits spent)
      required:
        - byok_usage_inference
        - completion_tokens
        - date
        - endpoint_id
        - model
        - model_permaslug
        - prompt_tokens
        - provider_name
        - reasoning_tokens
        - requests
        - usage
      title: ActivityItem
    ActivityResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/ActivityItem'
          description: List of activity items
      required:
        - data
      title: ActivityResponse
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

url = "https://openrouter.ai/api/v1/activity"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/activity';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/activity"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://openrouter.ai/api/v1/activity")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/activity")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/activity', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/activity");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/activity")! as URL,
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