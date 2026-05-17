> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Delete an observability destination

DELETE https://openrouter.ai/api/v1/observability/destinations/{id}

Delete an existing observability destination. This performs a soft delete. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/observability/delete-observability-destination

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /observability/destinations/{id}:
    delete:
      operationId: delete-observability-destination
      summary: Delete an observability destination
      description: >-
        Delete an existing observability destination. This performs a soft
        delete. [Management key](/docs/guides/overview/auth/management-api-keys)
        required.
      tags:
        - subpackage_observability
      parameters:
        - name: id
          in: path
          description: The destination ID (UUID).
          required: true
          schema:
            type: string
            format: uuid
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Destination deleted successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DeleteObservabilityDestinationResponse'
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
    DeleteObservabilityDestinationResponse:
      type: object
      properties:
        deleted:
          type: boolean
          enum:
            - true
          description: Always `true` on success.
      required:
        - deleted
      title: DeleteObservabilityDestinationResponse
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

```python Observability_deleteObservabilityDestination_example
import requests

url = "https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.delete(url, json=payload, headers=headers)

print(response.json())
```

```javascript Observability_deleteObservabilityDestination_example
const url = 'https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd';
const options = {
  method: 'DELETE',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Observability_deleteObservabilityDestination_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("DELETE", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Observability_deleteObservabilityDestination_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java Observability_deleteObservabilityDestination_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.delete("https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php Observability_deleteObservabilityDestination_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Observability_deleteObservabilityDestination_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Observability_deleteObservabilityDestination_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
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