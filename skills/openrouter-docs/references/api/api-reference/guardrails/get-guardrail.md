> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get a guardrail

GET https://openrouter.ai/api/v1/guardrails/{id}

Get a single guardrail by ID. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/guardrails/get-guardrail

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /guardrails/{id}:
    get:
      operationId: get-guardrail
      summary: Get a guardrail
      description: >-
        Get a single guardrail by ID. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_guardrails
      parameters:
        - name: id
          in: path
          description: The unique identifier of the guardrail to retrieve
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
          description: Guardrail details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetGuardrailResponse'
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
    ContentFilterBuiltinAction:
      type: string
      enum:
        - redact
        - block
        - flag
      description: Action taken when the builtin filter triggers
      title: ContentFilterBuiltinAction
    ContentFilterBuiltinSlug:
      type: string
      enum:
        - email
        - phone
        - ssn
        - credit-card
        - ip-address
        - person-name
        - address
        - regex-prompt-injection
      description: The builtin filter identifier
      title: ContentFilterBuiltinSlug
    ContentFilterBuiltinEntry:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/ContentFilterBuiltinAction'
        label:
          type: string
          description: >-
            Optional label used in redaction placeholders (e.g.
            "[PROMPT_INJECTION]")
        slug:
          $ref: '#/components/schemas/ContentFilterBuiltinSlug'
      required:
        - action
        - slug
      description: >-
        A builtin content filter entry. Builtin filters include PII detectors
        and the regex-based prompt injection detector.
      title: ContentFilterBuiltinEntry
    ContentFilterAction:
      type: string
      enum:
        - redact
        - block
      description: Action taken when the pattern matches
      title: ContentFilterAction
    ContentFilterEntry:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/ContentFilterAction'
        label:
          type:
            - string
            - 'null'
          description: Optional label used in redaction placeholders or error messages
        pattern:
          type: string
          description: A regex pattern to match against request content
      required:
        - action
        - pattern
      description: >-
        A custom regex content filter that scans request messages for matching
        patterns.
      title: ContentFilterEntry
    GuardrailInterval:
      type: string
      enum:
        - daily
        - weekly
        - monthly
      description: Interval at which the limit resets (daily, weekly, monthly)
      title: GuardrailInterval
    GetGuardrailResponseData:
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
        content_filter_builtins:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ContentFilterBuiltinEntry'
          description: >-
            Builtin content filters applied to requests. Includes PII detectors
            and the regex-based prompt injection detector.
        content_filters:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ContentFilterEntry'
          description: Custom regex content filters applied to request messages
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
          description: >-
            Deprecated. Use enforce_zdr_anthropic, enforce_zdr_openai,
            enforce_zdr_google, and enforce_zdr_other instead. When provided,
            its value is copied into any of those per-provider fields that are
            not explicitly specified on the request.
        enforce_zdr_anthropic:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to enforce zero data retention for Anthropic models. Falls
            back to enforce_zdr when not provided.
        enforce_zdr_google:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to enforce zero data retention for Google models. Falls back
            to enforce_zdr when not provided.
        enforce_zdr_openai:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to enforce zero data retention for OpenAI models. Falls back
            to enforce_zdr when not provided.
        enforce_zdr_other:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to enforce zero data retention for models that are not from
            Anthropic, OpenAI, or Google. Falls back to enforce_zdr when not
            provided.
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
      description: The guardrail
      title: GetGuardrailResponseData
    GetGuardrailResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/GetGuardrailResponseData'
      required:
        - data
      title: GetGuardrailResponse
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

```python Guardrails_getGuardrail_example
import requests

url = "https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Guardrails_getGuardrail_example
const url = 'https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Guardrails_getGuardrail_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Guardrails_getGuardrail_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Guardrails_getGuardrail_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Guardrails_getGuardrail_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Guardrails_getGuardrail_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Guardrails_getGuardrail_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/guardrails/550e8400-e29b-41d4-a716-446655440000")! as URL,
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