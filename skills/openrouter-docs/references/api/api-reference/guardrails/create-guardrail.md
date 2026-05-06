> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Create a guardrail

POST https://openrouter.ai/api/v1/guardrails
Content-Type: application/json

Create a new guardrail for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/guardrails/create-guardrail

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /guardrails:
    post:
      operationId: create-guardrail
      summary: Create a guardrail
      description: >-
        Create a new guardrail for the authenticated user. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_guardrails
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '201':
          description: Guardrail created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateGuardrailResponse'
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
              $ref: '#/components/schemas/CreateGuardrailRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    GuardrailInterval:
      type: string
      enum:
        - daily
        - weekly
        - monthly
      description: Interval at which the limit resets (daily, weekly, monthly)
      title: GuardrailInterval
    CreateGuardrailRequest:
      type: object
      properties:
        allowed_models:
          type:
            - array
            - 'null'
          items:
            type: string
          description: Array of model identifiers (slug or canonical_slug accepted)
        allowed_providers:
          type:
            - array
            - 'null'
          items:
            type: string
          description: List of allowed provider IDs
        description:
          type:
            - string
            - 'null'
          description: Description of the guardrail
        enforce_zdr:
          type:
            - boolean
            - 'null'
          description: Whether to enforce zero data retention
        ignored_models:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            Array of model identifiers to exclude from routing (slug or
            canonical_slug accepted)
        ignored_providers:
          type:
            - array
            - 'null'
          items:
            type: string
          description: List of provider IDs to exclude from routing
        limit_usd:
          type:
            - number
            - 'null'
          format: double
          description: Spending limit in USD
        name:
          type: string
          description: Name for the new guardrail
        reset_interval:
          $ref: '#/components/schemas/GuardrailInterval'
        workspace_id:
          type: string
          format: uuid
          description: >-
            The workspace to create the guardrail in. Defaults to the default
            workspace if not provided.
      required:
        - name
      title: CreateGuardrailRequest
    CreateGuardrailResponseData:
      type: object
      properties:
        allowed_models:
          type:
            - array
            - 'null'
          items:
            type: string
          description: Array of model canonical_slugs (immutable identifiers)
        allowed_providers:
          type:
            - array
            - 'null'
          items:
            type: string
          description: List of allowed provider IDs
        created_at:
          type: string
          description: ISO 8601 timestamp of when the guardrail was created
        description:
          type:
            - string
            - 'null'
          description: Description of the guardrail
        enforce_zdr:
          type:
            - boolean
            - 'null'
          description: Whether to enforce zero data retention
        id:
          type: string
          format: uuid
          description: Unique identifier for the guardrail
        ignored_models:
          type:
            - array
            - 'null'
          items:
            type: string
          description: Array of model canonical_slugs to exclude from routing
        ignored_providers:
          type:
            - array
            - 'null'
          items:
            type: string
          description: List of provider IDs to exclude from routing
        limit_usd:
          type:
            - number
            - 'null'
          format: double
          description: Spending limit in USD
        name:
          type: string
          description: Name of the guardrail
        reset_interval:
          $ref: '#/components/schemas/GuardrailInterval'
        updated_at:
          type:
            - string
            - 'null'
          description: ISO 8601 timestamp of when the guardrail was last updated
        workspace_id:
          type: string
          description: The workspace ID this guardrail belongs to.
      required:
        - created_at
        - id
        - name
        - workspace_id
      description: The created guardrail
      title: CreateGuardrailResponseData
    CreateGuardrailResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/CreateGuardrailResponseData'
      required:
        - data
      title: CreateGuardrailResponse
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
      description: Forbidden - Authentication successful but insufficient permissions
      title: ForbiddenResponse
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

```python Guardrails_createGuardrail_example
import requests

url = "https://openrouter.ai/api/v1/guardrails"

payload = {
    "name": "My New Guardrail",
    "allowed_models": None,
    "allowed_providers": ["openai", "anthropic", "deepseek"],
    "description": "A guardrail for limiting API usage",
    "enforce_zdr": False,
    "ignored_models": None,
    "ignored_providers": None,
    "limit_usd": 50,
    "reset_interval": "monthly"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Guardrails_createGuardrail_example
const url = 'https://openrouter.ai/api/v1/guardrails';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"name":"My New Guardrail","allowed_models":null,"allowed_providers":["openai","anthropic","deepseek"],"description":"A guardrail for limiting API usage","enforce_zdr":false,"ignored_models":null,"ignored_providers":null,"limit_usd":50,"reset_interval":"monthly"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Guardrails_createGuardrail_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/guardrails"

	payload := strings.NewReader("{\n  \"name\": \"My New Guardrail\",\n  \"allowed_models\": null,\n  \"allowed_providers\": [\n    \"openai\",\n    \"anthropic\",\n    \"deepseek\"\n  ],\n  \"description\": \"A guardrail for limiting API usage\",\n  \"enforce_zdr\": false,\n  \"ignored_models\": null,\n  \"ignored_providers\": null,\n  \"limit_usd\": 50,\n  \"reset_interval\": \"monthly\"\n}")

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

```ruby Guardrails_createGuardrail_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/guardrails")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"name\": \"My New Guardrail\",\n  \"allowed_models\": null,\n  \"allowed_providers\": [\n    \"openai\",\n    \"anthropic\",\n    \"deepseek\"\n  ],\n  \"description\": \"A guardrail for limiting API usage\",\n  \"enforce_zdr\": false,\n  \"ignored_models\": null,\n  \"ignored_providers\": null,\n  \"limit_usd\": 50,\n  \"reset_interval\": \"monthly\"\n}"

response = http.request(request)
puts response.read_body
```

```java Guardrails_createGuardrail_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/guardrails")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"name\": \"My New Guardrail\",\n  \"allowed_models\": null,\n  \"allowed_providers\": [\n    \"openai\",\n    \"anthropic\",\n    \"deepseek\"\n  ],\n  \"description\": \"A guardrail for limiting API usage\",\n  \"enforce_zdr\": false,\n  \"ignored_models\": null,\n  \"ignored_providers\": null,\n  \"limit_usd\": 50,\n  \"reset_interval\": \"monthly\"\n}")
  .asString();
```

```php Guardrails_createGuardrail_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/guardrails', [
  'body' => '{
  "name": "My New Guardrail",
  "allowed_models": null,
  "allowed_providers": [
    "openai",
    "anthropic",
    "deepseek"
  ],
  "description": "A guardrail for limiting API usage",
  "enforce_zdr": false,
  "ignored_models": null,
  "ignored_providers": null,
  "limit_usd": 50,
  "reset_interval": "monthly"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Guardrails_createGuardrail_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/guardrails");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"name\": \"My New Guardrail\",\n  \"allowed_models\": null,\n  \"allowed_providers\": [\n    \"openai\",\n    \"anthropic\",\n    \"deepseek\"\n  ],\n  \"description\": \"A guardrail for limiting API usage\",\n  \"enforce_zdr\": false,\n  \"ignored_models\": null,\n  \"ignored_providers\": null,\n  \"limit_usd\": 50,\n  \"reset_interval\": \"monthly\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Guardrails_createGuardrail_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "name": "My New Guardrail",
  "allowed_models": ,
  "allowed_providers": ["openai", "anthropic", "deepseek"],
  "description": "A guardrail for limiting API usage",
  "enforce_zdr": false,
  "ignored_models": ,
  "ignored_providers": ,
  "limit_usd": 50,
  "reset_interval": "monthly"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/guardrails")! as URL,
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