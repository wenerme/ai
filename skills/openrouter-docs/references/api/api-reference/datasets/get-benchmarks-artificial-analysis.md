> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Artificial Analysis Benchmark Indices

GET https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis

Returns composite index scores (Intelligence, Coding, Agentic) from Artificial Analysis for LLM models. Includes OpenRouter pricing per model. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

Reference: https://openrouter.ai/docs/api/api-reference/datasets/get-benchmarks-artificial-analysis

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /datasets/benchmarks/artificial-analysis:
    get:
      operationId: get-benchmarks-artificial-analysis
      summary: Artificial Analysis Benchmark Indices
      description: >-
        Returns composite index scores (Intelligence, Coding, Agentic) from
        Artificial Analysis for LLM models. Includes OpenRouter pricing per
        model. Authenticate with any valid OpenRouter API key. Rate-limited to
        30 requests/minute per key and 500 requests/day per account.
      tags:
        - subpackage_datasets
      parameters:
        - name: max_results
          in: query
          description: Max results to return (1–100, default 50).
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
          description: >-
            Artificial Analysis composite index scores with pricing and
            attribution metadata.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BenchmarksAAResponse'
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
    BenchmarksAAItem:
      type: object
      properties:
        aa_name:
          type: string
          description: Model name as listed on Artificial Analysis.
        agentic_index:
          type:
            - number
            - 'null'
          format: double
          description: Artificial Analysis Agentic Index composite score. Higher is better.
        coding_index:
          type:
            - number
            - 'null'
          format: double
          description: Artificial Analysis Coding Index composite score. Higher is better.
        intelligence_index:
          type:
            - number
            - 'null'
          format: double
          description: >-
            Artificial Analysis Intelligence Index composite score. Higher is
            better.
        model_permaslug:
          type: string
          description: Stable OpenRouter model identifier.
        pricing:
          $ref: '#/components/schemas/BenchmarkPricing'
      required:
        - aa_name
        - agentic_index
        - coding_index
        - intelligence_index
        - model_permaslug
        - pricing
      title: BenchmarksAAItem
    BenchmarksAaMetaSource:
      type: string
      enum:
        - artificial-analysis
      description: Data source identifier.
      title: BenchmarksAaMetaSource
    BenchmarksAaMetaSourceUrl:
      type: string
      enum:
        - https://artificialanalysis.ai
      description: URL of the upstream data source.
      title: BenchmarksAaMetaSourceUrl
    BenchmarksAaMetaVersion:
      type: string
      enum:
        - v1
      description: Dataset version.
      title: BenchmarksAaMetaVersion
    BenchmarksAAMeta:
      type: object
      properties:
        as_of:
          type: string
          description: ISO-8601 timestamp of when this data was last updated.
        citation:
          type: string
          description: Required attribution when republishing this data.
        model_count:
          type: integer
          description: Number of unique models in the response.
        source:
          $ref: '#/components/schemas/BenchmarksAaMetaSource'
          description: Data source identifier.
        source_url:
          $ref: '#/components/schemas/BenchmarksAaMetaSourceUrl'
          description: URL of the upstream data source.
        version:
          $ref: '#/components/schemas/BenchmarksAaMetaVersion'
          description: Dataset version.
      required:
        - as_of
        - citation
        - model_count
        - source
        - source_url
        - version
      title: BenchmarksAAMeta
    BenchmarksAAResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/BenchmarksAAItem'
        meta:
          $ref: '#/components/schemas/BenchmarksAAMeta'
      required:
        - data
        - meta
      title: BenchmarksAAResponse
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
      "aa_name": "GPT-4o",
      "agentic_index": 58.3,
      "coding_index": 65.8,
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
    "citation": "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",
    "model_count": 1,
    "source": "artificial-analysis",
    "source_url": "https://artificialanalysis.ai",
    "version": "v1"
  }
}
```

**SDK Code**

```python Datasets_getBenchmarksArtificialAnalysis_example
import requests

url = "https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Datasets_getBenchmarksArtificialAnalysis_example
const url = 'https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Datasets_getBenchmarksArtificialAnalysis_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Datasets_getBenchmarksArtificialAnalysis_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Datasets_getBenchmarksArtificialAnalysis_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Datasets_getBenchmarksArtificialAnalysis_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Datasets_getBenchmarksArtificialAnalysis_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Datasets_getBenchmarksArtificialAnalysis_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/datasets/benchmarks/artificial-analysis")! as URL,
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