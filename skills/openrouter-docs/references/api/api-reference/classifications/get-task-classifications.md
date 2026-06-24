> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Task classification market share

GET https://openrouter.ai/api/v1/classifications/task

Returns the market-share breakdown of OpenRouter traffic by task classification
(e.g. code generation, web search, summarization) over a trailing time window.

Each classification reports its share of classified sampled requests (`usage_share`)
and classified sampled token volume (`token_share`) as fractions between 0 and 1.
The unclassified `other` bucket is excluded. Absolute volumes are not exposed
because the underlying data is sampled.

Each classification also includes a `models` array listing the top models by
request volume within that classification, with their within-tag usage and token shares.

Classifications are grouped into macro-categories (Code, Data, Agent, General)
with aggregate shares provided for each.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this data, cite as:
"Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."

Reference: https://openrouter.ai/docs/api/api-reference/classifications/get-task-classifications

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /classifications/task:
    get:
      operationId: get-task-classifications
      summary: Task classification market share
      description: >-
        Returns the market-share breakdown of OpenRouter traffic by task
        classification

        (e.g. code generation, web search, summarization) over a trailing time
        window.


        Each classification reports its share of classified sampled requests
        (`usage_share`)

        and classified sampled token volume (`token_share`) as fractions between
        0 and 1.

        The unclassified `other` bucket is excluded. Absolute volumes are not
        exposed

        because the underlying data is sampled.


        Each classification also includes a `models` array listing the top
        models by

        request volume within that classification, with their within-tag usage
        and token shares.


        Classifications are grouped into macro-categories (Code, Data, Agent,
        General)

        with aggregate shares provided for each.


        Authenticate with any valid OpenRouter API key (same key used for
        inference).

        Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.


        When republishing or quoting this data, cite as:

        "Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."
      tags:
        - subpackage_classifications
      parameters:
        - name: window
          in: query
          description: >-
            Trailing time window for the classification data. Currently only
            `7d` (trailing 7 days) is supported.
          required: false
          schema:
            $ref: '#/components/schemas/ClassificationsTaskGetParametersWindow'
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: >-
            Task classification market-share data for the requested trailing
            window.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskClassificationResponse'
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
        '429':
          description: Too Many Requests - Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
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
    ClassificationsTaskGetParametersWindow:
      type: string
      enum:
        - 7d
      default: 7d
      description: >-
        Trailing time window for the classification data. Currently only `7d`
        (trailing 7 days) is supported.
      title: ClassificationsTaskGetParametersWindow
    TaskClassificationModel:
      type: object
      properties:
        id:
          type: string
          description: Model identifier (permaslug).
        tag_token_share:
          type: number
          format: double
          description: >-
            Fraction of this classification's sampled token volume attributed to
            this model (0–1). Sums to ≤1 across the returned models (only top-N
            are included and unattributed requests are excluded).
        tag_usage_share:
          type: number
          format: double
          description: >-
            Fraction of this classification's sampled requests attributed to
            this model (0–1). Sums to ≤1 across the returned models (only top-N
            are included and unattributed requests are excluded).
      required:
        - id
        - tag_token_share
        - tag_usage_share
      title: TaskClassificationModel
    TaskClassificationItem:
      type: object
      properties:
        category_token_share:
          type: number
          format: double
          description: >-
            Fraction of this classification's token volume within its
            macro-category (0–1). Sums to 1 across all classifications sharing
            the same `macro_category`.
        category_usage_share:
          type: number
          format: double
          description: >-
            Fraction of this classification's usage within its macro-category
            (0–1). Sums to 1 across all classifications sharing the same
            `macro_category`.
        display_name:
          type: string
          description: Human-readable label for the classification.
        macro_category:
          type: string
          description: >-
            Coarse grouping derived from the tag prefix: `code`, `data`,
            `agent`, or `general`.
        models:
          type: array
          items:
            $ref: '#/components/schemas/TaskClassificationModel'
          description: >-
            Top models for this classification by request volume, sorted
            descending. Each entry reports the model's share of this
            classification's requests and tokens.
        tag:
          type: string
          description: >-
            Classification tag identifier (e.g. `code:general_impl`,
            `agent:web_search`).
        token_share:
          type: number
          format: double
          description: >-
            Fraction of classified sampled token volume (prompt + completion)
            attributed to this classification (0–1). The unclassified `other`
            bucket is excluded from the denominator.
        usage_share:
          type: number
          format: double
          description: >-
            Fraction of classified sampled requests attributed to this
            classification (0–1). The unclassified `other` bucket is excluded
            from the denominator.
      required:
        - category_token_share
        - category_usage_share
        - display_name
        - macro_category
        - models
        - tag
        - token_share
        - usage_share
      title: TaskClassificationItem
    TaskClassificationMacroCategory:
      type: object
      properties:
        key:
          type: string
          description: Macro-category identifier.
        label:
          type: string
          description: Human-readable label for the macro-category.
        token_share:
          type: number
          format: double
          description: >-
            Combined token share of all classifications in this macro-category
            (0–1).
        usage_share:
          type: number
          format: double
          description: >-
            Combined usage share of all classifications in this macro-category
            (0–1).
      required:
        - key
        - label
        - token_share
        - usage_share
      title: TaskClassificationMacroCategory
    TaskClassificationResponseData:
      type: object
      properties:
        as_of:
          type: string
          description: >-
            UTC date (YYYY-MM-DD) of the window upper bound (yesterday). Data is
            exclusive of the current incomplete UTC day. This is the expected
            latest date in the snapshot; it does not confirm data presence for
            that date.
        classifications:
          type: array
          items:
            $ref: '#/components/schemas/TaskClassificationItem'
          description: >-
            Per-task classification market-share data, sorted by usage_share
            descending.
        macro_categories:
          type: array
          items:
            $ref: '#/components/schemas/TaskClassificationMacroCategory'
          description: >-
            Aggregate market-share data per macro-category (code, data, agent,
            general).
        window_days:
          type: integer
          description: Number of trailing days covered by this snapshot.
      required:
        - as_of
        - classifications
        - macro_categories
        - window_days
      title: TaskClassificationResponseData
    TaskClassificationResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/TaskClassificationResponseData'
      required:
        - data
      title: TaskClassificationResponse
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
    TooManyRequestsResponseErrorData:
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
      description: Error data for TooManyRequestsResponse
      title: TooManyRequestsResponseErrorData
    TooManyRequestsResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
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
      description: Too Many Requests - Rate limit exceeded
      title: TooManyRequestsResponse
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
  "data": {
    "as_of": "2026-06-17",
    "classifications": [
      {
        "category_token_share": 0.48,
        "category_usage_share": 0.51,
        "display_name": "Code Generation",
        "macro_category": "code",
        "models": [
          {
            "id": "openai/gpt-4.1-mini",
            "tag_token_share": 0.75,
            "tag_usage_share": 0.55
          }
        ],
        "tag": "code:general_impl",
        "token_share": 0.31,
        "usage_share": 0.23
      }
    ],
    "macro_categories": [
      {
        "key": "code",
        "label": "Code",
        "token_share": 0.52,
        "usage_share": 0.45
      }
    ],
    "window_days": 7
  }
}
```

**SDK Code**

```python Classifications_getTaskClassifications_example
import requests

url = "https://openrouter.ai/api/v1/classifications/task"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Classifications_getTaskClassifications_example
const url = 'https://openrouter.ai/api/v1/classifications/task';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Classifications_getTaskClassifications_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/classifications/task"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Classifications_getTaskClassifications_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/classifications/task")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Classifications_getTaskClassifications_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/classifications/task")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Classifications_getTaskClassifications_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/classifications/task', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Classifications_getTaskClassifications_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/classifications/task");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Classifications_getTaskClassifications_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/classifications/task")! as URL,
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