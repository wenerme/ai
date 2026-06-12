> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Design Arena Benchmark Rankings

GET https://openrouter.ai/api/v1/datasets/benchmarks/design-arena

Returns ELO ratings from head-to-head arena battles on Design Arena. Filterable by arena (models/builders/agents) and category. Includes OpenRouter pricing per model. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

Reference: https://openrouter.ai/docs/api/api-reference/datasets/get-benchmarks-design-arena

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /datasets/benchmarks/design-arena:
    get:
      operationId: get-benchmarks-design-arena
      summary: Design Arena Benchmark Rankings
      description: >-
        Returns ELO ratings from head-to-head arena battles on Design Arena.
        Filterable by arena (models/builders/agents) and category. Includes
        OpenRouter pricing per model. Authenticate with any valid OpenRouter API
        key. Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.
      tags:
        - subpackage_datasets
      parameters:
        - name: arena
          in: query
          description: Arena to query. Defaults to `models`.
          required: false
          schema:
            $ref: >-
              #/components/schemas/DatasetsBenchmarksDesignArenaGetParametersArena
        - name: category
          in: query
          description: >-
            Category within the arena (e.g. `codecategories`, `uicomponent`,
            `gamedev`, `3d`, `dataviz`, `image`, `video`, `svg`). When omitted,
            returns all categories.
          required: false
          schema:
            type: string
        - name: max_results
          in: query
          description: >-
            Max results to return: per category when no category filter is
            applied (1–100, default 50).
          required: false
          schema:
            type: integer
            default: 50
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Design Arena ELO rankings with pricing and attribution metadata.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BenchmarksDAResponse'
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
    DatasetsBenchmarksDesignArenaGetParametersArena:
      type: string
      enum:
        - models
        - builders
        - agents
      default: models
      description: Arena to query. Defaults to `models`.
      title: DatasetsBenchmarksDesignArenaGetParametersArena
    BenchmarkPricing:
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
      title: BenchmarkPricing
    BenchmarksDaItemTournamentStats:
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
      title: BenchmarksDaItemTournamentStats
    BenchmarksDAItem:
      type: object
      properties:
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
            Stable OpenRouter model identifier when the model is on OpenRouter;
            otherwise the upstream Design Arena model id. Use pricing != null to
            detect OpenRouter-mapped models.
        pricing:
          $ref: '#/components/schemas/BenchmarkPricing'
        tournament_stats:
          $ref: '#/components/schemas/BenchmarksDaItemTournamentStats'
          description: Placement distribution from tournament matches.
        win_rate:
          type: number
          format: double
          description: Win rate as a percentage (0–100).
      required:
        - arena
        - avg_generation_time_ms
        - category
        - display_name
        - elo
        - model_permaslug
        - pricing
        - tournament_stats
        - win_rate
      title: BenchmarksDAItem
    BenchmarksDaMetaEloBounds:
      type: object
      properties:
        max:
          type: number
          format: double
          description: Maximum ELO in the result set.
        min:
          type: number
          format: double
          description: Minimum ELO in the result set.
      required:
        - max
        - min
      description: ELO range across all returned models for normalization.
      title: BenchmarksDaMetaEloBounds
    BenchmarksDaMetaSource:
      type: string
      enum:
        - design-arena
      description: Data source identifier.
      title: BenchmarksDaMetaSource
    BenchmarksDaMetaSourceUrl:
      type: string
      enum:
        - https://www.designarena.ai
      description: URL of the upstream data source.
      title: BenchmarksDaMetaSourceUrl
    BenchmarksDaMetaVersion:
      type: string
      enum:
        - v1
      description: Dataset version.
      title: BenchmarksDaMetaVersion
    BenchmarksDAMeta:
      type: object
      properties:
        arena:
          type: string
          description: The arena filter applied.
        as_of:
          type: string
          description: ISO-8601 timestamp of when this data was generated.
        category:
          type:
            - string
            - 'null'
          description: The category filter applied, or null if showing all.
        citation:
          type: string
          description: Required attribution when republishing this data.
        elo_bounds:
          $ref: '#/components/schemas/BenchmarksDaMetaEloBounds'
          description: ELO range across all returned models for normalization.
        model_count:
          type: integer
          description: Number of unique models in the response.
        source:
          $ref: '#/components/schemas/BenchmarksDaMetaSource'
          description: Data source identifier.
        source_url:
          $ref: '#/components/schemas/BenchmarksDaMetaSourceUrl'
          description: URL of the upstream data source.
        version:
          $ref: '#/components/schemas/BenchmarksDaMetaVersion'
          description: Dataset version.
      required:
        - arena
        - as_of
        - category
        - citation
        - elo_bounds
        - model_count
        - source
        - source_url
        - version
      title: BenchmarksDAMeta
    BenchmarksDAResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/BenchmarksDAItem'
        meta:
          $ref: '#/components/schemas/BenchmarksDAMeta'
      required:
        - data
        - meta
      title: BenchmarksDAResponse
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
      "arena": "models",
      "avg_generation_time_ms": 3200,
      "category": "codecategories",
      "display_name": "Claude Sonnet 4",
      "elo": 1423,
      "model_permaslug": "anthropic/claude-sonnet-4",
      "pricing": {
        "completion": "0.000015",
        "prompt": "0.000003"
      },
      "tournament_stats": {
        "first_place": 12,
        "fourth_place": 2,
        "second_place": 8,
        "third_place": 5,
        "total": 27
      },
      "win_rate": 72
    }
  ],
  "meta": {
    "arena": "models",
    "as_of": "2026-06-03T12:00:00Z",
    "category": null,
    "citation": "Source: Design Arena (www.designarena.ai) via OpenRouter (openrouter.ai/rankings).",
    "elo_bounds": {
      "max": 1600,
      "min": 900
    },
    "model_count": 1,
    "source": "design-arena",
    "source_url": "https://www.designarena.ai",
    "version": "v1"
  }
}
```

**SDK Code**

```python Datasets_getBenchmarksDesignArena_example
import requests

url = "https://openrouter.ai/api/v1/datasets/benchmarks/design-arena"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Datasets_getBenchmarksDesignArena_example
const url = 'https://openrouter.ai/api/v1/datasets/benchmarks/design-arena';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Datasets_getBenchmarksDesignArena_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/datasets/benchmarks/design-arena"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Datasets_getBenchmarksDesignArena_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/datasets/benchmarks/design-arena")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Datasets_getBenchmarksDesignArena_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/datasets/benchmarks/design-arena")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Datasets_getBenchmarksDesignArena_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/datasets/benchmarks/design-arena', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Datasets_getBenchmarksDesignArena_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/datasets/benchmarks/design-arena");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Datasets_getBenchmarksDesignArena_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/datasets/benchmarks/design-arena")! as URL,
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