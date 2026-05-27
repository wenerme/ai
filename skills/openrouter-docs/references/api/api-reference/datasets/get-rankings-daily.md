> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Daily token totals for top 50 models

GET https://openrouter.ai/api/v1/datasets/rankings-daily

Returns the top 50 public models per day by total token usage on OpenRouter, plus a
single aggregated `other` row per day that sums every model outside that top 50.
Token totals are `prompt_tokens + completion_tokens`, matching the public rankings
chart on openrouter.ai/rankings.

Each row is a distinct `(date, model_permaslug)` pair. The `other` row uses the
reserved permaslug `other` and is always returned last within its date, so callers
can compute `top-50 traffic / total daily traffic` without a second request.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."

Token counts come from each upstream provider's own tokenizer (Anthropic counts
are as reported by Anthropic, OpenAI counts are as reported by OpenAI, etc.), so
a token in one row is not directly comparable to a token in another row from a
different provider.

Reference: https://openrouter.ai/docs/api/api-reference/datasets/get-rankings-daily

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /datasets/rankings-daily:
    get:
      operationId: get-rankings-daily
      summary: Daily token totals for top 50 models
      description: >-
        Returns the top 50 public models per day by total token usage on
        OpenRouter, plus a

        single aggregated `other` row per day that sums every model outside that
        top 50.

        Token totals are `prompt_tokens + completion_tokens`, matching the
        public rankings

        chart on openrouter.ai/rankings.


        Each row is a distinct `(date, model_permaslug)` pair. The `other` row
        uses the

        reserved permaslug `other` and is always returned last within its date,
        so callers

        can compute `top-50 traffic / total daily traffic` without a second
        request.


        Authenticate with any valid OpenRouter API key (same key used for
        inference).

        Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.


        When republishing or quoting this dataset, OpenRouter must be cited as:

        "Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."


        Token counts come from each upstream provider's own tokenizer (Anthropic
        counts

        are as reported by Anthropic, OpenAI counts are as reported by OpenAI,
        etc.), so

        a token in one row is not directly comparable to a token in another row
        from a

        different provider.
      tags:
        - subpackage_datasets
      parameters:
        - name: start_date
          in: query
          description: >-
            Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
            30 days before `end_date`. The dataset begins at 2025-01-01; earlier
            values are clamped forward to that floor and the resolved value is
            echoed in `meta.start_date`.
          required: false
          schema:
            type: string
        - name: end_date
          in: query
          description: >-
            End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
            the most recent completed UTC day. Must be on or after 2025-01-01;
            earlier values are rejected with a 400.
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
          description: >-
            Up to 51 rows per day — the top 50 public models by `total_tokens`
            plus a single aggregated `other` row covering every model outside
            that top 50. Sorted by `date` ascending, then by `total_tokens`
            descending, with `other` pinned last within its date.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RankingsDailyResponse'
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
components:
  schemas:
    RankingsDailyItem:
      type: object
      properties:
        date:
          type: string
          description: UTC calendar date the row is aggregated over (YYYY-MM-DD).
        model_permaslug:
          type: string
          description: >-
            Model variant permaslug (e.g. `openai/gpt-4o-2024-05-13`,
            `openai/gpt-4o-2024-05-13:free`). Non-default variants include a
            `:variant` suffix and are ranked as their own entry. The reserved
            value `other` denotes the aggregated row covering every model
            outside the daily top 50 for that date — always sorted last within
            its date.
        total_tokens:
          type: string
          description: >-
            Sum of `prompt_tokens + completion_tokens` for the day, returned as
            a decimal string so 64-bit values are not truncated.
      required:
        - date
        - model_permaslug
        - total_tokens
      title: RankingsDailyItem
    RankingsDailyMetaVersion:
      type: string
      enum:
        - v1
      description: Dataset version. Field names and grain are stable for the life of `v1`.
      title: RankingsDailyMetaVersion
    RankingsDailyMeta:
      type: object
      properties:
        as_of:
          type: string
          description: >-
            ISO-8601 timestamp of when the response was generated. Reflects
            data-freshness because the underlying materialized view continuously
            ingests upstream events.
        end_date:
          type: string
          description: Resolved end of the date window (UTC, inclusive).
        start_date:
          type: string
          description: Resolved start of the date window (UTC, inclusive).
        version:
          $ref: '#/components/schemas/RankingsDailyMetaVersion'
          description: >-
            Dataset version. Field names and grain are stable for the life of
            `v1`.
      required:
        - as_of
        - end_date
        - start_date
        - version
      title: RankingsDailyMeta
    RankingsDailyResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/RankingsDailyItem'
          description: >-
            Up to 51 rows per day — the top 50 public models by `total_tokens`
            for each UTC calendar date in the window, plus one aggregated
            `other` row summing every model outside that top 50 (omitted when
            the long tail is empty). Rows are sorted by `date` ascending, then
            by `total_tokens` descending, with `other` pinned last within its
            date. Ties between real models break alphabetically on
            `model_permaslug` so the order is stable across requests.
        meta:
          $ref: '#/components/schemas/RankingsDailyMeta'
      required:
        - data
        - meta
      title: RankingsDailyResponse
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

## SDK Code Examples

```python Datasets_getRankingsDaily_example
import requests

url = "https://openrouter.ai/api/v1/datasets/rankings-daily"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Datasets_getRankingsDaily_example
const url = 'https://openrouter.ai/api/v1/datasets/rankings-daily';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Datasets_getRankingsDaily_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/datasets/rankings-daily"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Datasets_getRankingsDaily_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/datasets/rankings-daily")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Datasets_getRankingsDaily_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/datasets/rankings-daily")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Datasets_getRankingsDaily_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/datasets/rankings-daily', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Datasets_getRankingsDaily_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/datasets/rankings-daily");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Datasets_getRankingsDaily_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/datasets/rankings-daily")! as URL,
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