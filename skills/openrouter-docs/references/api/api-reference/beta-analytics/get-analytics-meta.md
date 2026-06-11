> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get available analytics metrics and dimensions

GET https://openrouter.ai/api/v1/analytics/meta

Returns the available metrics, dimensions, filter operators, and granularities for the analytics query endpoint. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/beta-analytics/get-analytics-meta

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /analytics/meta:
    get:
      operationId: get-analytics-meta
      summary: Get available analytics metrics and dimensions
      description: >-
        Returns the available metrics, dimensions, filter operators, and
        granularities for the analytics query endpoint. [Management
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
          description: Returns analytics query metadata
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/beta.Analytics_getAnalyticsMeta_Response_200
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
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataDimensionsItems:
      type: object
      properties:
        display_label:
          type: string
          description: Human-readable label
        name:
          type: string
          description: Dimension identifier used in query requests
      required:
        - display_label
        - name
      title: AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataDimensionsItems
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataGranularitiesItemsName:
      type: string
      enum:
        - minute
        - hour
        - day
        - week
        - month
      description: Granularity identifier
      title: >-
        AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataGranularitiesItemsName
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataGranularitiesItems:
      type: object
      properties:
        display_label:
          type: string
          description: Human-readable label
        name:
          $ref: >-
            #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataGranularitiesItemsName
          description: Granularity identifier
      required:
        - display_label
        - name
      title: >-
        AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataGranularitiesItems
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataMetricsItemsDisplayFormat:
      type: string
      enum:
        - number
        - currency
        - percent
        - latency
        - throughput
      description: >-
        How this metric value should be formatted for display (e.g. percent →
        multiply by 100 and append %, currency → prefix with $)
      title: >-
        AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataMetricsItemsDisplayFormat
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataMetricsItems:
      type: object
      properties:
        display_format:
          $ref: >-
            #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataMetricsItemsDisplayFormat
          description: >-
            How this metric value should be formatted for display (e.g. percent
            → multiply by 100 and append %, currency → prefix with $)
        display_label:
          type: string
          description: Human-readable label
        is_rate:
          type: boolean
          description: Whether this metric is a rate/ratio (averaged, not summed)
        name:
          type: string
          description: Metric identifier used in query requests
      required:
        - display_format
        - display_label
        - is_rate
        - name
      title: AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataMetricsItems
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItemsName:
      type: string
      enum:
        - eq
        - neq
        - in
        - not_in
        - gt
        - gte
        - lt
        - lte
      description: Operator identifier used in filter definitions
      title: >-
        AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItemsName
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItemsValueType:
      type: string
      enum:
        - scalar
        - array
      description: Whether the operator expects a single value or an array
      title: >-
        AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItemsValueType
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItems:
      type: object
      properties:
        name:
          $ref: >-
            #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItemsName
          description: Operator identifier used in filter definitions
        value_type:
          $ref: >-
            #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItemsValueType
          description: Whether the operator expects a single value or an array
      required:
        - name
        - value_type
      title: AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItems
    AnalyticsMetaGetResponsesContentApplicationJsonSchemaData:
      type: object
      properties:
        dimensions:
          type: array
          items:
            $ref: >-
              #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataDimensionsItems
        granularities:
          type: array
          items:
            $ref: >-
              #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataGranularitiesItems
        metrics:
          type: array
          items:
            $ref: >-
              #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataMetricsItems
        operators:
          type: array
          items:
            $ref: >-
              #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaDataOperatorsItems
      required:
        - dimensions
        - granularities
        - metrics
        - operators
      title: AnalyticsMetaGetResponsesContentApplicationJsonSchemaData
    beta.Analytics_getAnalyticsMeta_Response_200:
      type: object
      properties:
        data:
          $ref: >-
            #/components/schemas/AnalyticsMetaGetResponsesContentApplicationJsonSchemaData
      required:
        - data
      title: beta.Analytics_getAnalyticsMeta_Response_200
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

## Examples



**Response**

```json
{
  "data": {
    "dimensions": [
      {
        "display_label": "Model",
        "name": "model"
      }
    ],
    "granularities": [
      {
        "display_label": "Day",
        "name": "day"
      }
    ],
    "metrics": [
      {
        "display_format": "number",
        "display_label": "Request Count",
        "is_rate": false,
        "name": "request_count"
      }
    ],
    "operators": [
      {
        "name": "eq",
        "value_type": "scalar"
      }
    ]
  }
}
```

**SDK Code**

```python beta.Analytics_getAnalyticsMeta_example
import requests

url = "https://openrouter.ai/api/v1/analytics/meta"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript beta.Analytics_getAnalyticsMeta_example
const url = 'https://openrouter.ai/api/v1/analytics/meta';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go beta.Analytics_getAnalyticsMeta_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/analytics/meta"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby beta.Analytics_getAnalyticsMeta_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/analytics/meta")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java beta.Analytics_getAnalyticsMeta_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/analytics/meta")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php beta.Analytics_getAnalyticsMeta_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/analytics/meta', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp beta.Analytics_getAnalyticsMeta_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/analytics/meta");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift beta.Analytics_getAnalyticsMeta_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/analytics/meta")! as URL,
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