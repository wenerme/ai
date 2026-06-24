> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# List Benchmarks

GET https://openrouter.ai/api/v1/benchmarks

Unified benchmark endpoint that aggregates scores from multiple benchmark sources (Artificial Analysis, Design Arena). Filter by source to reproduce the exact shapes from the legacy per-source endpoints, or use task_type to find models suited for specific workloads. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

Reference: https://openrouter.ai/docs/api/api-reference/benchmarks/get-benchmarks

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /benchmarks:
    get:
      operationId: get-benchmarks
      summary: List Benchmarks
      description: >-
        Unified benchmark endpoint that aggregates scores from multiple
        benchmark sources (Artificial Analysis, Design Arena). Filter by source
        to reproduce the exact shapes from the legacy per-source endpoints, or
        use task_type to find models suited for specific workloads. Authenticate
        with any valid OpenRouter API key. Rate-limited to 30 requests/minute
        per key and 500 requests/day per account.
      tags:
        - subpackage_benchmarks
      parameters:
        - name: source
          in: query
          description: >-
            Benchmark source to query. Determines the shape of the returned
            items. When omitted, returns results from all sources.
          required: false
          schema:
            $ref: '#/components/schemas/BenchmarksGetParametersSource'
        - name: task_type
          in: query
          description: >-
            Filter results by task type. For Artificial Analysis, maps to the
            corresponding index. For Design Arena, maps to the matching
            category.
          required: false
          schema:
            $ref: '#/components/schemas/BenchmarksGetParametersTaskType'
        - name: arena
          in: query
          description: >-
            Design Arena only: arena to query. Defaults to `models` when source
            is `design-arena`.
          required: false
          schema:
            $ref: '#/components/schemas/BenchmarksGetParametersArena'
        - name: category
          in: query
          description: >-
            Design Arena only: category within the arena (e.g. `codecategories`,
            `uicomponent`, `gamedev`, `3d`, `dataviz`, `image`, `video`, `svg`).
            When omitted, returns all categories.
          required: false
          schema:
            type: string
        - name: max_results
          in: query
          description: >-
            Maximum number of items to return. When omitted, all matching
            results are returned.
          required: false
          schema:
            type: integer
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: >-
            Benchmark results filtered by the specified source and optional task
            type.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnifiedBenchmarksResponse'
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
    BenchmarksGetParametersSource:
      type: string
      enum:
        - artificial-analysis
        - design-arena
      description: >-
        Benchmark source to query. Determines the shape of the returned items.
        When omitted, returns results from all sources.
      title: BenchmarksGetParametersSource
    BenchmarksGetParametersTaskType:
      type: string
      enum:
        - coding
        - intelligence
        - agentic
      description: >-
        Filter results by task type. For Artificial Analysis, maps to the
        corresponding index. For Design Arena, maps to the matching category.
      title: BenchmarksGetParametersTaskType
    BenchmarksGetParametersArena:
      type: string
      enum:
        - models
        - builders
        - agents
      description: >-
        Design Arena only: arena to query. Defaults to `models` when source is
        `design-arena`.
      title: BenchmarksGetParametersArena
    UnifiedBenchmarkPricing:
      type: object
      properties:
        completion:
          type: string
          description: Cost per output token (USD, decimal string).
        prompt:
          type: string
          description: Cost per input token (USD, decimal string).
      required:
        - completion
        - prompt
      description: >-
        OpenRouter pricing per token for this model. Null if pricing is
        unavailable.
      title: UnifiedBenchmarkPricing
    UnifiedBenchmarksResponseDataItemsDiscriminatorMappingDesignArenaTournamentStats:
      type: object
      properties:
        first_place:
          type:
            - integer
            - 'null'
        fourth_place:
          type:
            - integer
            - 'null'
        second_place:
          type:
            - integer
            - 'null'
        third_place:
          type:
            - integer
            - 'null'
        total:
          type:
            - integer
            - 'null'
      required:
        - first_place
        - fourth_place
        - second_place
        - third_place
        - total
      description: Placement distribution from tournament matches.
      title: >-
        UnifiedBenchmarksResponseDataItemsDiscriminatorMappingDesignArenaTournamentStats
    UnifiedBenchmarksResponseDataItems:
      oneOf:
        - type: object
          properties:
            source:
              type: string
              enum:
                - artificial-analysis
              description: 'Discriminator value: artificial-analysis'
            agentic_index:
              type:
                - number
                - 'null'
              format: double
              description: >-
                Artificial Analysis Agentic Index composite score. Higher is
                better.
            coding_index:
              type:
                - number
                - 'null'
              format: double
              description: >-
                Artificial Analysis Coding Index composite score. Higher is
                better.
            display_name:
              type: string
              description: Model name as listed on Artificial Analysis.
            intelligence_index:
              type:
                - number
                - 'null'
              format: double
              description: >-
                Artificial Analysis Intelligence Index composite score. Higher
                is better.
            model_permaslug:
              type: string
              description: Stable OpenRouter model identifier.
            pricing:
              $ref: '#/components/schemas/UnifiedBenchmarkPricing'
          required:
            - source
            - agentic_index
            - coding_index
            - display_name
            - intelligence_index
            - model_permaslug
            - pricing
          description: artificial-analysis variant
        - type: object
          properties:
            source:
              type: string
              enum:
                - design-arena
              description: 'Discriminator value: design-arena'
            arena:
              type: string
              description: Arena this ranking belongs to.
            avg_generation_time_ms:
              type:
                - number
                - 'null'
              format: double
              description: Average generation time in milliseconds.
            category:
              type: string
              description: Category within the arena.
            display_name:
              type: string
              description: Human-readable model name from Design Arena.
            elo:
              type: number
              format: double
              description: ELO rating from head-to-head arena battles.
            model_permaslug:
              type: string
              description: >-
                Stable OpenRouter model identifier when mapped; otherwise the
                upstream Design Arena model id.
            pricing:
              $ref: '#/components/schemas/UnifiedBenchmarkPricing'
            tournament_stats:
              $ref: >-
                #/components/schemas/UnifiedBenchmarksResponseDataItemsDiscriminatorMappingDesignArenaTournamentStats
              description: Placement distribution from tournament matches.
            win_rate:
              type: number
              format: double
              description: Win rate as a percentage (0–100).
          required:
            - source
            - arena
            - avg_generation_time_ms
            - category
            - display_name
            - elo
            - model_permaslug
            - pricing
            - tournament_stats
            - win_rate
          description: design-arena variant
      discriminator:
        propertyName: source
      title: UnifiedBenchmarksResponseDataItems
    UnifiedBenchmarksMetaSource:
      type: string
      enum:
        - artificial-analysis
        - design-arena
      description: The source filter applied, or null when all sources are returned.
      title: UnifiedBenchmarksMetaSource
    UnifiedBenchmarksMetaVersion:
      type: string
      enum:
        - v1
      description: Dataset version.
      title: UnifiedBenchmarksMetaVersion
    UnifiedBenchmarksMeta:
      type: object
      properties:
        as_of:
          type: string
          description: ISO-8601 timestamp of when this data was last updated.
        citation:
          type:
            - string
            - 'null'
          description: >-
            Required attribution when republishing this data, or null when
            results span multiple sources (attribute each item individually by
            its `source` discriminator).
        model_count:
          type: integer
          description: Number of unique models in the response.
        source:
          oneOf:
            - $ref: '#/components/schemas/UnifiedBenchmarksMetaSource'
            - type: 'null'
          description: The source filter applied, or null when all sources are returned.
        source_url:
          type:
            - string
            - 'null'
          description: >-
            URL of the upstream data source, or null when results span multiple
            sources.
        task_type:
          type:
            - string
            - 'null'
          description: The task_type filter applied, or null if showing all.
        version:
          $ref: '#/components/schemas/UnifiedBenchmarksMetaVersion'
          description: Dataset version.
      required:
        - as_of
        - citation
        - model_count
        - source
        - source_url
        - task_type
        - version
      title: UnifiedBenchmarksMeta
    UnifiedBenchmarksResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/UnifiedBenchmarksResponseDataItems'
        meta:
          $ref: '#/components/schemas/UnifiedBenchmarksMeta'
      required:
        - data
        - meta
      title: UnifiedBenchmarksResponse
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
  "data": [
    {
      "source": "artificial-analysis",
      "agentic_index": 58.3,
      "coding_index": 65.8,
      "display_name": "GPT-4o",
      "intelligence_index": 71.2,
      "model_permaslug": "openai/gpt-4o",
      "pricing": {
        "completion": "0.00001",
        "prompt": "0.0000025"
      }
    }
  ],
  "meta": {
    "as_of": "2026-06-03T12:00:00Z",
    "citation": null,
    "model_count": 1,
    "source": null,
    "source_url": null,
    "task_type": null,
    "version": "v1"
  }
}
```

**SDK Code**

```python Benchmarks_getBenchmarks_example
import requests

url = "https://openrouter.ai/api/v1/benchmarks"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Benchmarks_getBenchmarks_example
const url = 'https://openrouter.ai/api/v1/benchmarks';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Benchmarks_getBenchmarks_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/benchmarks"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Benchmarks_getBenchmarks_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/benchmarks")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Benchmarks_getBenchmarks_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/benchmarks")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Benchmarks_getBenchmarks_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/benchmarks', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Benchmarks_getBenchmarks_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/benchmarks");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Benchmarks_getBenchmarks_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/benchmarks")! as URL,
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