> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Query analytics data

POST https://openrouter.ai/api/v1/analytics/query
Content-Type: application/json

Execute an analytics query with specified metrics, dimensions, filters, and time range. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/beta-analytics/query-analytics

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /analytics/query:
    post:
      operationId: query-analytics
      summary: Query analytics data
      description: >-
        Execute an analytics query with specified metrics, dimensions, filters,
        and time range. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_betaAnalytics
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Analytics query results
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/beta.Analytics_queryAnalytics_Response_200
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
        '408':
          description: Request Timeout - Operation exceeded time limit
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestTimeoutResponse'
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
              type: object
              properties:
                dimensions:
                  type: array
                  items:
                    type: string
                filters:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItems
                granularity:
                  type: string
                  description: Time granularity
                group_limit:
                  type: integer
                  description: >-
                    Maximum rows per distinct combination of dimensions
                    (ClickHouse LIMIT n BY). When omitted on time-series queries
                    (granularity + dimensions), auto-computed to avoid
                    truncating time windows. Explicit values override the
                    default and may truncate time buckets if set lower than the
                    number of buckets in the range. Ignored when no dimensions
                    are specified.
                limit:
                  type: integer
                  description: >-
                    Maximum total rows returned. Defaults to 1000. On
                    time-series queries with dimensions and no explicit
                    group_limit, the server may raise this to accommodate the
                    expected number of unique time-bucket/dimension
                    combinations.
                metrics:
                  type: array
                  items:
                    type: string
                order_by:
                  $ref: >-
                    #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaOrderBy
                time_range:
                  $ref: >-
                    #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaTimeRange
              required:
                - metrics
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValueOneOf2Items:
      oneOf:
        - type: string
        - type: number
          format: double
      title: >-
        AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValueOneOf2Items
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValue2:
      type: array
      items:
        $ref: >-
          #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValueOneOf2Items
      title: >-
        AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValue2
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValue:
      oneOf:
        - type: string
        - type: number
          format: double
        - $ref: >-
            #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValue2
      description: Filter value (scalar or array depending on operator)
      title: >-
        AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValue
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItems:
      type: object
      properties:
        field:
          type: string
          description: Dimension to filter on
        operator:
          type: string
          description: Filter operator
        value:
          $ref: >-
            #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItemsValue
          description: Filter value (scalar or array depending on operator)
      required:
        - field
        - operator
        - value
      title: AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaFiltersItems
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaOrderByDirection:
      type: string
      enum:
        - asc
        - desc
      title: >-
        AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaOrderByDirection
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaOrderBy:
      type: object
      properties:
        direction:
          $ref: >-
            #/components/schemas/AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaOrderByDirection
        field:
          type: string
          description: Field to order by
      required:
        - direction
        - field
      title: AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaOrderBy
    AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaTimeRange:
      type: object
      properties:
        end:
          type: string
          format: date-time
        start:
          type: string
          format: date-time
      required:
        - end
        - start
      title: AnalyticsQueryPostRequestBodyContentApplicationJsonSchemaTimeRange
    AnalyticsQueryPostResponsesContentApplicationJsonSchemaDataDataItems:
      type: object
      properties: {}
      description: A row of analytics data with metric/dimension values
      title: AnalyticsQueryPostResponsesContentApplicationJsonSchemaDataDataItems
    AnalyticsQueryPostResponsesContentApplicationJsonSchemaDataMetadata:
      type: object
      properties:
        query_time_ms:
          type: number
          format: double
        row_count:
          type: integer
        truncated:
          type: boolean
      required:
        - query_time_ms
        - row_count
        - truncated
      title: AnalyticsQueryPostResponsesContentApplicationJsonSchemaDataMetadata
    AnalyticsQueryPostResponsesContentApplicationJsonSchemaData:
      type: object
      properties:
        cachedAt:
          type: number
          format: double
        data:
          type: array
          items:
            $ref: >-
              #/components/schemas/AnalyticsQueryPostResponsesContentApplicationJsonSchemaDataDataItems
        metadata:
          $ref: >-
            #/components/schemas/AnalyticsQueryPostResponsesContentApplicationJsonSchemaDataMetadata
      required:
        - data
        - metadata
      title: AnalyticsQueryPostResponsesContentApplicationJsonSchemaData
    beta.Analytics_queryAnalytics_Response_200:
      type: object
      properties:
        data:
          $ref: >-
            #/components/schemas/AnalyticsQueryPostResponsesContentApplicationJsonSchemaData
      required:
        - data
      title: beta.Analytics_queryAnalytics_Response_200
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
    RequestTimeoutResponseErrorData:
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
      description: Error data for RequestTimeoutResponse
      title: RequestTimeoutResponseErrorData
    RequestTimeoutResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/RequestTimeoutResponseErrorData'
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
      description: Request Timeout - Operation exceeded time limit
      title: RequestTimeoutResponse
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
  "metrics": [
    "request_count"
  ],
  "dimensions": [
    "model"
  ],
  "granularity": "day",
  "limit": 100,
  "time_range": {
    "end": "2025-01-08T00:00:00Z",
    "start": "2025-01-01T00:00:00Z"
  }
}
```

**Response**

```json
{
  "data": {
    "data": [
      {
        "date__day": "2025-01-01T00:00:00.000Z",
        "request_count": 1500
      }
    ],
    "metadata": {
      "query_time_ms": 42,
      "row_count": 1,
      "truncated": false
    }
  }
}
```

**SDK Code**

```python beta.Analytics_queryAnalytics_example
import requests

url = "https://openrouter.ai/api/v1/analytics/query"

payload = {
    "metrics": ["request_count"],
    "dimensions": ["model"],
    "granularity": "day",
    "limit": 100,
    "time_range": {
        "end": "2025-01-08T00:00:00Z",
        "start": "2025-01-01T00:00:00Z"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript beta.Analytics_queryAnalytics_example
const url = 'https://openrouter.ai/api/v1/analytics/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"metrics":["request_count"],"dimensions":["model"],"granularity":"day","limit":100,"time_range":{"end":"2025-01-08T00:00:00Z","start":"2025-01-01T00:00:00Z"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go beta.Analytics_queryAnalytics_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/analytics/query"

	payload := strings.NewReader("{\n  \"metrics\": [\n    \"request_count\"\n  ],\n  \"dimensions\": [\n    \"model\"\n  ],\n  \"granularity\": \"day\",\n  \"limit\": 100,\n  \"time_range\": {\n    \"end\": \"2025-01-08T00:00:00Z\",\n    \"start\": \"2025-01-01T00:00:00Z\"\n  }\n}")

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

```ruby beta.Analytics_queryAnalytics_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/analytics/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"metrics\": [\n    \"request_count\"\n  ],\n  \"dimensions\": [\n    \"model\"\n  ],\n  \"granularity\": \"day\",\n  \"limit\": 100,\n  \"time_range\": {\n    \"end\": \"2025-01-08T00:00:00Z\",\n    \"start\": \"2025-01-01T00:00:00Z\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java beta.Analytics_queryAnalytics_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/analytics/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"metrics\": [\n    \"request_count\"\n  ],\n  \"dimensions\": [\n    \"model\"\n  ],\n  \"granularity\": \"day\",\n  \"limit\": 100,\n  \"time_range\": {\n    \"end\": \"2025-01-08T00:00:00Z\",\n    \"start\": \"2025-01-01T00:00:00Z\"\n  }\n}")
  .asString();
```

```php beta.Analytics_queryAnalytics_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/analytics/query', [
  'body' => '{
  "metrics": [
    "request_count"
  ],
  "dimensions": [
    "model"
  ],
  "granularity": "day",
  "limit": 100,
  "time_range": {
    "end": "2025-01-08T00:00:00Z",
    "start": "2025-01-01T00:00:00Z"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp beta.Analytics_queryAnalytics_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/analytics/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"metrics\": [\n    \"request_count\"\n  ],\n  \"dimensions\": [\n    \"model\"\n  ],\n  \"granularity\": \"day\",\n  \"limit\": 100,\n  \"time_range\": {\n    \"end\": \"2025-01-08T00:00:00Z\",\n    \"start\": \"2025-01-01T00:00:00Z\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift beta.Analytics_queryAnalytics_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "metrics": ["request_count"],
  "dimensions": ["model"],
  "granularity": "day",
  "limit": 100,
  "time_range": [
    "end": "2025-01-08T00:00:00Z",
    "start": "2025-01-01T00:00:00Z"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/analytics/query")! as URL,
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